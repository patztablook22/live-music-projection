import { RnnWrapper } from './RnnWrapper.js';
import { streamRnn } from './streamRnn.js';
import { Visual } from './Visual.js';

const rnnSmoothPeak = new RnnWrapper('models/smooth_peak.onnx');
const smoothPeak = streamRnn(rnnSmoothPeak, () => ({x: a.fft}), y => y.output[0]);

const rnnMomentum = new RnnWrapper('models/momentum.onnx');
const momentum = streamRnn(rnnMomentum, () => ({x: a.fft}), y => y.output[0]);
//const momentum = () => 1;

export const metrics = {
    smoothPeak: smoothPeak, 
    momentum: momentum,
};

class NoVisual extends Visual {
    run() {
        this.blendTo(solid(0, 0, 0, 1));
    }
}

class RectangleVisual extends Visual {
    run() {
        let vis = osc(7, 0.1).mask(shape(2, 0.5, () => momentum() * 0.033 + smoothPeak() * 0.1))
                       .mask(shape(4, 0.8, () => momentum() * 0.03 + smoothPeak() * 0.1))
                       .brightness(() => -0.4 + 0.5 * momentum())
        this.blendTo(
            vis
        );

        this.trigger(() => momentum() == 1, () => {
            let time0 = time;
            vis.blend(src(o0),()=> 0.2 + smoothPeak()*0.3).color(()=> 1 - 0.8 * Math.sin(0.1 * (time - time0)), 1, 1).modulate(noise(10), () => (time - time0) * 0.005)
               .scale(() => 1 + 0.0001 * (time - time0))
               .rotate(() => 0.001 * (time - time0)).out()
        });
    }
};

class ChillVisual extends Visual {
    run() {
        speed=.0222
        let vis = osc(48,() => -.1 - 0.5 * momentum(),0).thresh([.3,.7].fast(.75),0).color(0,0,1)

            .add(
                osc(28,() => .1 + 0.2 * momentum(),0).thresh([.3,.7].fast(.75),0).rotate(3.14/4)
                .color(1,0,0)
                .modulateScale( osc(() => smoothPeak() * 0.8 + momentum(),-.01,0).thresh([.3,.7].fast(.75),0) )
            )
            .diff(
                osc(28,() => .1 + 0.3 * momentum(),0).thresh([.3,.7].fast(.5),0).rotate(3.14/2)
                .color(1,0,1)
                .modulateScale( osc(() => 64 + smoothPeak() *0.8 + momentum() * 5,-.015,0).thresh([.3,.7].fast(.5),0) )
            )
            .modulateRotate( osc(54,-.005,0).thresh([.3,.7].fast(.25),0) )
            .modulateScale( osc(44,-.020,0).thresh([.3,.7].fast(.25),0) )
            .colorama( ()=>Math.sin(time/27)*.01222+9.89)
            .scale(() => smoothPeak() * 0.1 + 2.122).brightness(() => -0.2 * momentum());

        vis.out();

        this.trigger(() => momentum() == 1, () => {
            let time0 = time;
            vis.blend(src(o0), () => 0.1 + 0.3 * smoothPeak()).modulate(noise(10), () => (time - time0) * 0.005)
               .scale(() => 1 - 0.001 * (time - time0))
               .rotate(() => 0.01 * (time - time0)).out()
        });
    }
}

export const visuals = [
    NoVisual, 
    ChillVisual, 
    RectangleVisual,
]


    //() => {
        //speed=.0222
        //return osc(48,-.1,0).thresh([.3,.7].fast(.75),0).color(0,0,1)

            //.add(
                //osc(28,.1,0).thresh([.3,.7].fast(.75),0).rotate(3.14/4)
                //.color(1,0,0)
                //.modulateScale( osc(64,-.01,0).thresh([.3,.7].fast(.75),0) )
            //)
            //.diff(
                //osc(28,.1,0).thresh([.3,.7].fast(.5),0).rotate(3.14/2)
                //.color(1,0,1)
                //.modulateScale( osc(64,-.015,0).thresh([.3,.7].fast(.5),0) )
            //)
            //.modulateRotate( osc(54,-.005,0).thresh([.3,.7].fast(.25),0) )
            //.modulateScale( osc(44,-.020,0).thresh([.3,.7].fast(.25),0) )
            //.colorama( ()=>Math.sin(time/27)*.01222+9.89)
            //.scale(2.122)
    //},

    //() => {
        //speed = 0.2;
        //return osc(4, 0.1, 0.8).color(1.04,0, -1.1).rotate(0.30, 0.1).pixelate(2, 20).modulate(noise(2.5), () => 1.5 * Math.sin(0.08 * time))
    //},

    //() => {
        //osc(7, 0.1).mask(shape(4)).out()
        //return src(o0).rotate(() => peak() * 0.1).scale(1.01)
    //},

    //() => {
        //osc(7, 0.1).mask(shape(4)).out()
        //return src(o0).rotate(0.01).scale(1.01)
    //},
