export class FadecEngine {
  clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));ssssss
  }

  compute(state) {
    const { wa, tamb, throttle, n1Actual } = state;

    const targetActive = throttle > 50;
    const targetN1 = targetActive ? 5000 : 0;
    const n1Low = targetActive && n1Actual < targetN1;
    const n1High = targetActive && n1Actual > targetN1;

    const wfRaw = wa / 15;
    const maxTemp = 1000;
    const currentTemp = Math.round(280 + tamb * 2 + wfRaw * 8 + throttle * 3);
    const overtemp = currentTemp > maxTemp;
    const wf = overtemp ? wfRaw * 0.8 : wfRaw;
    const hightemp = currentTemp > 850 && !overtemp;
    const valveCmd = overtemp ? 'REDUCE' : !targetActive ? 'HOLD' : n1Low ? 'OPEN' : n1High ? 'CLOSE' : 'HOLD';
    const valvePct = overtemp
      ? Math.max(10, Math.round((wa / 900) * 30))
      : !targetActive
        ? Math.max(10, Math.round((wa / 900) * 20))
        : n1Low
        ? Math.min(100, Math.round((wa / 900) * 100))
        : Math.round((wa / 900) * 60);
    const eff = overtemp ? '0.0' : this.clamp(100 - (currentTemp - 280) / 15, 55, 99.9).toFixed(1);

    return {
      wf,
      wfRaw,
      currentTemp,
      maxTemp,
      targetN1,
      n1Actual,
      valveCmd,
      n1Low,
      n1High,
      overtemp,
      hightemp,
      valvePct,
      eff,
    };
  }
}
