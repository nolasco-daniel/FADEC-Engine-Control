(function () {
  const State = window.FadecState;

  function compute() {
    const { wa, tamb, throttle, n1Actual } = State;

    const targetN1 = throttle > 50 ? 5000 : Math.round(throttle * 85);
    const n1Low = n1Actual < targetN1;
    const n1High = n1Actual > targetN1;
    const valveCmd = n1Low ? 'OPEN' : n1High ? 'CLOSE' : 'HOLD';

    const wfRaw = wa / 15;
    const fuelRatio = (wfRaw / wa) * (throttle / 100 + 0.5);
    const currentTemp = Math.round(wa * fuelRatio * 18 + tamb * 1.5 + 300);
    const maxTemp = 1000;
    const overtemp = currentTemp > maxTemp;
    const wf = overtemp ? 0 : wfRaw;
    const hightemp = currentTemp > 850 && !overtemp;
    const valvePct = overtemp
      ? 0
      : n1Low
      ? Math.min(100, Math.round((wa / 900) * 100))
      : Math.round((wa / 900) * 60);
    const eff = overtemp ? 0 : (92 + Math.random() * 4).toFixed(1);

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

  window.FadecEngine = { compute };
})();
