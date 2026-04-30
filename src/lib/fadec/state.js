import { DEFAULTS } from './constants.js';

export class FadecState {
  constructor(initial = DEFAULTS) {
    this.defaults = { ...initial };
    this.reset();
  }

  setField(key, value) {
    this[key] = Number(value);
  }

  reset() {
    this.wa = this.defaults.wa;
    this.tamb = this.defaults.tamb;
    this.throttle = this.defaults.throttle;
    this.n1Actual = this.defaults.n1Actual;
  }

  snapshot() {
    return {
      wa: this.wa,
      tamb: this.tamb,
      throttle: this.throttle,
      n1Actual: this.n1Actual,
    };
  }
}
