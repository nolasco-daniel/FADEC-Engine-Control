(function () {
  const State = window.FadecState;
  const Engine = window.FadecEngine;
  const Canvas = window.FadecCanvas;

  const $ = (id) => document.getElementById(id);

  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    const clock = $('clock-badge');
    if (clock) clock.textContent = `${h}:${m}:${s}`;
  }

  function pushLog(msg) {
    const logText = $('log-text');
    if (logText) {
      logText.innerHTML = `${msg}<span id="log-cursor"></span>`;
    }
  }

  function update() {
    const {
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
    } = Engine.compute();

    $('wa-val').textContent = State.wa;
    $('tamb-val').textContent = State.tamb;
    $('throttle-display').textContent = State.throttle;
    $('n1-display').textContent = n1Actual.toLocaleString();

    const trl = $('throttle-rule-label');
    if (trl) {
      if (State.throttle > 50) {
        trl.textContent = `✓ Throttle ${State.throttle}% > 50% → Target N₁ = 5,000 RPM`;
        trl.style.color = 'var(--green2)';
      } else {
        trl.textContent = `Throttle ${State.throttle}% ≤ 50% → Target N₁ = ${targetN1.toLocaleString()} RPM`;
        trl.style.color = 'var(--muted)';
      }
    }

    const nvl = $('n1-valve-label');
    if (nvl) {
      if (n1Low) {
        nvl.textContent = `N₁ ${n1Actual.toLocaleString()} < ${targetN1.toLocaleString()} RPM → OPEN Fuel Valve ▲`;
        nvl.style.color = 'var(--green2)';
      } else if (n1High) {
        nvl.textContent = `N₁ ${n1Actual.toLocaleString()} > ${targetN1.toLocaleString()} RPM → CLOSE Fuel Valve ▼`;
        nvl.style.color = 'var(--amber)';
      } else {
        nvl.textContent = `N₁ ${n1Actual.toLocaleString()} = ${targetN1.toLocaleString()} RPM → HOLD Valve ◼`;
        nvl.style.color = 'var(--cyan)';
      }
    }

    const tambBlock = $('sb-tamb');
    if (tambBlock) {
      tambBlock.className = State.tamb > 40 ? 'sensor-block warn-block' : 'sensor-block active-block';
    }
    const tambVal = $('tamb-val');
    if (tambVal) {
      tambVal.className = State.tamb > 40 ? 'sb-value amber' : 'sb-value cyan';
    }

    $('calc-wf').textContent = wf.toFixed(2);
    $('calc-wa').textContent = State.wa;
    $('algo-eff').textContent = `${eff}%`;
    $('algo-mode').textContent = overtemp ? 'FAULT' : State.throttle === 0 ? 'IDLE' : 'AUTO';
    $('algo-mode').style.color = overtemp ? 'var(--red)' : 'var(--cyan)';

    $('out-fuel-val').textContent = wf.toFixed(3);
    $('out-fuel-val').style.color = overtemp ? 'var(--red)' : 'var(--amber)';
    $('out-fuel-sub').textContent = overtemp
      ? 'Wf = fuel_flow × 0.0 (MELT-DOWN PREVENTION)'
      : `Wf = ${State.wa} ÷ 15 = ${wfRaw.toFixed(3)} kg/s`;

    $('fv-fill').style.height = `${valvePct}%`;
    $('fv-fill').style.background = overtemp
      ? 'linear-gradient(180deg, #ff3d3d, #b71c1c)'
      : valvePct > 70
      ? 'linear-gradient(180deg, var(--amber), #e65100)'
      : 'linear-gradient(180deg, var(--amber), #ff6f00)';
    $('fv-pct').textContent = `${valvePct}%`;

    const n1Pct = Math.round(n1Actual / 85);
    $('out-n1-pct').textContent = `${n1Pct}%`;
    $('out-n1-bar').style.width = `${n1Pct}%`;

    const oc = $('ostat-comb');
    const ov = $('ostat-valve');
    const oe = $('ostat-egt');
    if (overtemp) {
      oc.textContent = 'OVER LIMIT';
      oc.className = 'ostat-val crit';
      ov.textContent = 'CUT OFF';
      ov.className = 'ostat-val crit';
      oe.textContent = `${currentTemp}°C`;
      oe.className = 'ostat-val crit';
    } else if (hightemp) {
      oc.textContent = 'CAUTION';
      oc.className = 'ostat-val warn';
      ov.textContent = valveCmd;
      ov.className = 'ostat-val warn';
      oe.textContent = `${currentTemp}°C`;
      oe.className = 'ostat-val warn';
    } else {
      oc.textContent = 'OK LIMIT';
      oc.className = 'ostat-val ok';
      ov.textContent = valveCmd;
      ov.className = 'ostat-val ok';
      oe.textContent = `${currentTemp}°C`;
      oe.className = 'ostat-val ok';
    }

    const warnBadge = $('egt-warn-badge');
    if (overtemp) {
      warnBadge.textContent = `⚠ TEMP OVER LIMIT (${currentTemp}°C)`;
      warnBadge.className = 'tb-warn crit';
    } else if (hightemp) {
      warnBadge.textContent = `⚠ TEMP HIGH (${currentTemp}°C)`;
      warnBadge.className = 'tb-warn warn';
    } else {
      warnBadge.textContent = `TEMP NOMINAL (${currentTemp}°C)`;
      warnBadge.className = 'tb-warn ok';
    }

    const fb1 = $('fb1');
    const fb2 = $('fb2');
    const fb3 = $('fb3');
    const fb1s = $('fb1-status');
    const fb2s = $('fb2-status');
    const fb3s = $('fb3-status');

    if (overtemp) {
      fb1.className = 'fb-step crit';
      fb1s.textContent = 'fuel_flow × 0.0 — MELT-DOWN PREVENTION';
      fb2.className = 'fb-step crit';
      fb2s.textContent = `N₁: ${n1Actual.toLocaleString()} RPM — ENGINE FAULT`;
      fb3.className = 'fb-step crit';
      fb3s.textContent = `current_temp ${currentTemp}°C > max_temp ${maxTemp}°C!`;
    } else if (hightemp) {
      fb1.className = 'fb-step warn';
      fb1s.textContent = `Wf: ${wf.toFixed(2)} kg/s — REDUCING`;
      fb2.className = 'fb-step warn';
      fb2s.textContent = `N₁: ${n1Actual.toLocaleString()} RPM → ${valveCmd} valve`;
      fb3.className = 'fb-step warn';
      fb3s.textContent = `current_temp ${currentTemp}°C — approaching ${maxTemp}°C`;
    } else {
      fb1.className = 'fb-step active';
      fb1s.textContent = `fuel_flow = air_volume / 15 = ${wf.toFixed(2)} kg/s`;
      fb2.className = 'fb-step active';
      fb2s.textContent = `N₁: ${n1Actual.toLocaleString()} vs target ${targetN1.toLocaleString()} → ${valveCmd} valve`;
      fb3.className = 'fb-step active';
      fb3s.textContent = `current_temp ${currentTemp}°C ≤ max_temp ${maxTemp}°C ✓`;
    }

    const dr = $('decision-result');
    if (overtemp) {
      dr.textContent = 'REQUIRES MAINT.';
      dr.className = 'dg-result fault';
      pushLog(`⚠ FADEC WARNING: current_temp ${currentTemp}°C > ${maxTemp}°C. fuel_flow × 0.0. ENGINE REQUIRES MAINTENANCE.`);
    } else if (hightemp) {
      dr.textContent = 'CAUTION';
      dr.className = 'dg-result maintain';
      pushLog(`⚡ CAUTION: current_temp ${currentTemp}°C approaching limit. Wf reduced to ${wf.toFixed(2)} kg/s.`);
    } else if (State.throttle === 0) {
      dr.textContent = 'STANDBY';
      dr.className = 'dg-result airworthy';
      pushLog('◉ Engine at ground idle. All systems nominal. Awaiting throttle input.');
    } else {
      dr.textContent = 'AIRWORTHY';
      dr.className = 'dg-result airworthy';
      if (Math.random() < 0.3) {
        pushLog(`✓ AIRWORTHY — fuel_flow: ${wf.toFixed(2)} kg/s | temp: ${currentTemp}°C | N₁: ${n1Actual.toLocaleString()} RPM`);
      }
    }

    $('code-temp').textContent = `current_temp(${currentTemp})`;
    $('code-result').textContent = overtemp
      ? '→ "FADEC WARNING: Reducing fuel to prevent melt-down!"'
      : '→ "Engine Stable. Fuel Flow optimized."';
    $('code-result').style.color = overtemp ? 'var(--red)' : 'var(--green2)';

    $('map-n1').textContent = `${n1Pct}%`;
    $('map-wf').textContent = `${wf.toFixed(2)} kg/s`;

    $('out-mode').textContent = overtemp ? 'TEMP OVER LIMIT' : hightemp ? 'TEMP CAUTION' : 'TEMP NOMINAL';
    $('out-mode').style.color = overtemp ? 'var(--red)' : hightemp ? 'var(--amber)' : 'var(--muted)';

    Canvas.drawFuelMap(n1Pct, wf.toFixed(2));
  }

  window.FadecUI = {
    updateClock,
    pushLog,
    update,
  };
})();
