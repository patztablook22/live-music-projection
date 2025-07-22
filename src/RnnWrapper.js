import * as ort from 'onnxruntime-web';


function baseName(name) {
  // Remove suffixes like '.1', '.2' etc.
  return name.replace(/\.\d+$/, '');
}

function resolveDimsForState(dims, batchSize) {
  return dims.map(d => (d === 'batch' ? batchSize : d === -1 ? 1 : d));
}

export class RnnWrapper {
    constructor(path) {
        this.path = path;
        this.session = null;
        this.hStateInfo = {};
    }

    async init() {
        this.session = await ort.InferenceSession.create(this.path);

        // Create map from input name -> metadata when metadata is array
        // Assuming:
        // this.session.inputNames: string[]
        // this.session.inputMetadata: array of metadata objects, aligned by index

        this.hStateInfo = {};

        for (let i = 0; i < this.session.inputNames.length; i++) {
            const name = this.session.inputNames[i];
            const meta = this.session.inputMetadata[i]; // metadata object for this input

            if (baseName(name).startsWith('h')) {
                const dims = meta.shape.map(d => (d === -1 ? 1 : d));
                this.hStateInfo[name] = dims;
            }
        }

        this.createState();

    }

    createState(batchSize = 1) {
        if (!this.session) throw new Error('Call init() first');
        const state = {};
        for (const [name, dims] of Object.entries(this.hStateInfo)) {
            const resolvedDims = resolveDimsForState(dims, batchSize);
            const size = resolvedDims.reduce((a, b) => a * b, 1);
            const data = new Float32Array(size);
            state[name] = new ort.Tensor('float32', data, resolvedDims);
        }
        return state;
    }

    async call(inputs, prevState) {
        if (!this.session) throw new Error('Call init() first');

        const feeds = {};

        // Prepare feeds: convert normal inputs (non-hidden states) to tensors
        for (const [name, arr] of Object.entries(inputs)) {
            if (baseName(name).startsWith('h')) {
                // Hidden states come from prevState, ignore here
                continue;
            }
            const metaIndex = this.session.inputNames.indexOf(name);
            if (metaIndex === -1) throw new Error(`Unknown input '${name}'`);
            const meta = this.session.inputMetadata[metaIndex];
            const dims = meta.shape.map(d => (d === 'batch' ? 1 : d === -1 ? 1 : d));
            feeds[name] = new ort.Tensor('float32', Float32Array.from(arr), dims);
        }

        // Add hidden states from prevState
        for (const [name, tensor] of Object.entries(prevState)) {
            feeds[name] = tensor;
        }

        // Run session
        const outputMap = await this.session.run(feeds);

        const outputs = {};
        const nextState = {};

        // Group outputs by base name if hidden state (starting with 'h')
        const outputHNames = Object.entries(outputMap)
            .filter(([name]) => baseName(name).startsWith('h'))
            .reduce((acc, [name]) => {
                const bname = baseName(name);
                if (!acc[bname]) acc[bname] = [];
                acc[bname].push(name);
                return acc;
            }, {});

        // For each hidden state input (with suffix), find matching output and save in nextState
        for (const inputHName of Object.keys(this.hStateInfo)) {
            const bname = baseName(inputHName);
            const candidates = outputHNames[bname];
            if (!candidates || candidates.length === 0) {
                throw new Error(`No output hidden state matches input hidden state base '${bname}'`);
            }
            // Try exact suffix match, else fallback to first candidate
            let match = candidates.find(oname => oname === inputHName);
            if (!match) match = candidates[0];
            nextState[inputHName] = outputMap[match];
        }

        // Collect non-hidden outputs as JS arrays
        for (const [name, tensor] of Object.entries(outputMap)) {
            if (!baseName(name).startsWith('h')) {
                outputs[name] = Array.from(tensor.data);
            }
        }

        return { outputs, nextState };
    }
}
