a.setBins(8)


const peak = () => Math.max(...a.fft);

const smoothPeak = new EnvelopeFollower(peak, {
    attack: 0.9,
    decay: 0.9,
    sustain: 0.5,
    release: 0.95,
    interval: 30
});

const heat = new EnvelopeFollower(peak, {
    attack: 0.05,
    decay: 0.99,
    sustain: 0.7,
    release: 0.995,
    interval: 100
});



const arts = [
    () => {
        return shape([4,5,6].fast(0.1),0.01,0.5)
            .color(0.2,0.4,0.3)
            .modulate(voronoi(15, () => 0 + 1 * smoothPeak.value,10)).modulate(noise(10))
            .colorama(0.9)
            .color(0.2, 0.4, 0.3)
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

