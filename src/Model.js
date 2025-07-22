import * as ort from 'onnxruntime-web';


export class Model {
    constructor(path) {
        this.path = path;
        this.session = null;
    }

    async init() {
        this.session = await ort.InferenceSession.create(this.path, {
            //executionProviders: ['wasm'] // or 'cpu'
        });
    }

    /**
     * Run inference with all input tensors.
     * @param {Object<string, ort.Tensor>} allInputs
     * @returns {Promise<Object<string, ort.Tensor>>}
     */
    async forward(inputs) {
        if (!this.session) throw new Error("Model not initialized. Call init() first.");
        return await this.session.run(inputs);
    }
}
