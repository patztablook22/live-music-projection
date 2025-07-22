export function streamRnn(rnn, inputFn, outputFn, samplingRate = 40) {
    let state = null;
    let lastOutput = null;
    let timerId = null;
    let running = false;

    async function init() {
        if (!rnn.session) await rnn.init();
        state = rnn.createState();
    }

    async function step() {
        try {
            const inputs = inputFn();
            const { outputs, nextState } = await rnn.call(inputs, state);
            state = nextState;
            lastOutput = outputFn(outputs);
        } catch (e) {
            console.error('streamRnn step error:', e);
        }
    }

    async function start() {
        if (running) return;
        running = true;
        if (!state) await init();
        timerId = setInterval(step, 1000 / samplingRate);
    }

    function stop() {
        if (!running) return;
        clearInterval(timerId);
        timerId = null;
        running = false;
    }

    start();

    function getLastOutput() {
        return lastOutput;
    }
    getLastOutput.stop = stop;

    return getLastOutput;
}
