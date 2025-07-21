class EnvelopeFollower {
  constructor(getterFn, {
    attack = 0.8,
    decay = 0.5,
    sustain = 0.3,
    release = 0.9,
    interval = 100
  } = {}) {
    this.get = getterFn;
    this.attack = attack;
    this.decay = decay;
    this.sustain = sustain;
    this.release = release;
    this.interval = interval;
    this.value = 0;
    this._start();
  }

  _start() {
    this._interval = setInterval(() => {
      const input = this.get();

      if (input > this.value) {
        // Attack phase: rising to new input
        this.value = this.value * this.attack + input * (1 - this.attack);
      } else if (this.value > this.sustain) {
        // Decay phase: falling towards sustain level
        this.value = this.value * this.decay + this.sustain * (1 - this.decay);
      } else {
        // Release phase: falling below sustain level towards 0
        this.value = this.value * this.release;
      }

    }, this.interval);
  }

  stop() {
    clearInterval(this._interval);
  }
}
