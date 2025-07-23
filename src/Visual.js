export class Visual {
    constructor() {
        this.running = false;
    }

    run() {
    }

    trigger(condition, body) {
        let done = false;
        let interval = setInterval(() => {
            if (done || !this.running) clearInterval(interval);
            if (condition()) {
                done = true;
                body();
            }
        }, 100);
    }

    blendTo(source) {
        let blendAmount = 0;
        let transitioning = true;
        source.out(o0);

        //setInterval(() => {
            //if (this.running && transitioning) {
                //blendAmount += 0.01;
                //if (blendAmount >= 1) {
                    //blendAmount = 1;
                    //transitioning = false;
                //}
            //}
        //}, 30);
    }
}
