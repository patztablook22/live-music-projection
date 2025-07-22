import { RnnWrapper } from './RnnWrapper.js';
import { streamRnn } from './streamRnn.js';

const peak = () => Math.max(...a.fft);

const rnn = new RnnWrapper('models/ewa.onnx');
const smoothPeak = streamRnn(rnn, () => ({x: [peak()]}), y => y.output[0]);

export default [

    () => {
        const metric = peak;

        return osc(7, 0.1).mask(shape(2, 0.5, () => metric() * 0.1))
                          .mask(shape(4, 0.8, () => metric() * 0.3));
    },

    () => {
        speed=.0222
        return osc(48,-.1,0).thresh([.3,.7].fast(.75),0).color(0,0,1)

            .add(
                osc(28,.1,0).thresh([.3,.7].fast(.75),0).rotate(3.14/4)
                .color(1,0,0)
                .modulateScale( osc(64,-.01,0).thresh([.3,.7].fast(.75),0) )
            )
            .diff(
                osc(28,.1,0).thresh([.3,.7].fast(.5),0).rotate(3.14/2)
                .color(1,0,1)
                .modulateScale( osc(64,-.015,0).thresh([.3,.7].fast(.5),0) )
            )
            .modulateRotate( osc(54,-.005,0).thresh([.3,.7].fast(.25),0) )
            .modulateScale( osc(44,-.020,0).thresh([.3,.7].fast(.25),0) )
            .colorama( ()=>Math.sin(time/27)*.01222+9.89)
            .scale(2.122)
    },

    () => {
        speed = 0.2;
        return osc(4, 0.1, 0.8).color(1.04,0, -1.1).rotate(0.30, 0.1).pixelate(2, 20).modulate(noise(2.5), () => 1.5 * Math.sin(0.08 * time))
    },

    () => {
        osc(7, 0.1).mask(shape(4)).out()
        return src(o0).rotate(() => peak() * 0.1).scale(1.01)
    },

    () => {
        osc(7, 0.1).mask(shape(4)).out()
        return src(o0).rotate(0.01).scale(1.01)
    },
]

