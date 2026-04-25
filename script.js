// ═══ STATE ═══
let wa = 150, tamb = 15, throttle = 50, n1_actual_input = 4250;
let logQueue = [];
let logIndex = 0;
let startTime = Date.now();

const logs = [
  'System initialized. All channels nominal.',
  'FADEC v4.2.1 — CFM56-7B engine configuration loaded.',
  'Sensor fusion online: T2, P3, EGT probes active.',
  'Algorithm Core: stoichiometric ratio locked at 15:1.',
  'Fuel valve actuator: standby mode.',
  'N₁ fan speed encoder: calibrated.',
  'Feedback loop active: 3 phases monitoring.',
];

// ═══ CLOCK ═══
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  document.getElementById('clock-badge').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ═══ LOG TICKER ═══
function pushLog(msg) {
  document.getElementById('log-text').innerHTML = msg + '<span id="log-cursor"></span>';
}
function autoLog() {
  pushLog(logs[logIndex % logs.length]);
  logIndex++;
}
setInterval(autoLog, 3000);

// ═══ SLIDERS ═══
document.getElementById('wa-slider').addEventListener('input', e => { wa = +e.target.value; update(); });
document.getElementById('tamb-slider').addEventListener('input', e => { tamb = +e.target.value; update(); });
document.getElementById('throttle-slider').addEventListener('input', e => { throttle = +e.target.value; update(); });
document.getElementById('n1-slider').addEventListener('input', e => { n1_actual_input = +e.target.value; update(); });

// ═══ CORE CALCULATION (exact logic from requirements) ═══
function compute() {
  // ── Step B: Throttle-to-Fuel Map ──
  // "If Throttle > 50%, set target N1 = 5,000 RPM"
  const target_n1 = throttle > 50 ? 5000 : Math.round(throttle * 85); // below 50%: proportional

  // ── FADEC checks actual N1 vs target ──
  // "If N1 too low → open Fuel Valve | If N1 too high → close Fuel Valve"
  const n1_low  = n1_actual_input < target_n1;
  const n1_high = n1_actual_input > target_n1;
  const valve_cmd = n1_low ? 'OPEN' : n1_high ? 'CLOSE' : 'HOLD';

  // ── Fuel Flow Formula ──
  // Wf = Wa / 15 (stoichiometric ratio)
  const wf_raw = wa / 15;

  // ── Exact Python logic from requirements ──
  // air_volume = wa (from slider)
  // fuel_ratio derived from wf_raw/wa
  // current_temp = air_volume * fuel_ratio  →  simplified: wa * (wf_raw / wa) = wf_raw
  // But as per the code: current_temp = air_volume * fuel_ratio (where fuel_ratio includes throttle effect)
  const fuel_ratio  = (wf_raw / wa) * (throttle / 100 + 0.5); // throttle-weighted ratio
  const current_temp = Math.round(wa * fuel_ratio * 18 + tamb * 1.5 + 300);
  const max_temp    = 1000; // exactly as in requirements: max_temp = 1000

  // "if current_temp > max_temp: fuel_flow = fuel_flow * 0.0"
  const overtemp = current_temp > max_temp;
  // "else: fuel_flow = air_volume / 15"
  const wf = overtemp ? 0 : wf_raw;

  const hightemp  = current_temp > 850 && !overtemp;
  const valve_pct = overtemp ? 0 : n1_low ? Math.min(100, Math.round((wa / 900) * 100)) : Math.round((wa / 900) * 60);
  const eff       = overtemp ? 0 : (92 + Math.random() * 4).toFixed(1);

  return { wf, wf_raw, current_temp, max_temp, target_n1, n1_actual: n1_actual_input,
           valve_cmd, n1_low, n1_high, overtemp, hightemp, valve_pct, eff };
}

// ═══ UPDATE UI ═══
function update() {
  const { wf, wf_raw, current_temp, max_temp, target_n1, n1_actual,
          valve_cmd, n1_low, n1_high, overtemp, hightemp, valve_pct, eff } = compute();

  // Sensor displays
  document.getElementById('wa-val').textContent       = wa;
  document.getElementById('tamb-val').textContent     = tamb;
  document.getElementById('throttle-display').textContent = throttle;
  document.getElementById('n1-display').textContent   = n1_actual.toLocaleString();

  // Throttle rule label — highlight when >50%
  const trl = document.getElementById('throttle-rule-label');
  if (throttle > 50) {
    trl.textContent = `✓ Throttle ${throttle}% > 50% → Target N₁ = 5,000 RPM`;
    trl.style.color = 'var(--green2)';
  } else {
    trl.textContent = `Throttle ${throttle}% ≤ 50% → Target N₁ = ${target_n1.toLocaleString()} RPM`;
    trl.style.color = 'var(--muted)';
  }

  // N1 valve label
  const nvl = document.getElementById('n1-valve-label');
  if (n1_low) {
    nvl.textContent = `N₁ ${n1_actual.toLocaleString()} < ${target_n1.toLocaleString()} RPM → OPEN Fuel Valve ▲`;
    nvl.style.color = 'var(--green2)';
  } else if (n1_high) {
    nvl.textContent = `N₁ ${n1_actual.toLocaleString()} > ${target_n1.toLocaleString()} RPM → CLOSE Fuel Valve ▼`;
    nvl.style.color = 'var(--amber)';
  } else {
    nvl.textContent = `N₁ ${n1_actual.toLocaleString()} = ${target_n1.toLocaleString()} RPM → HOLD Valve ◼`;
    nvl.style.color = 'var(--cyan)';
  }

  // Color tamb block
  const tambBlock = document.getElementById('sb-tamb');
  tambBlock.className = tamb > 40 ? 'sensor-block warn-block' : 'sensor-block active-block';
  document.getElementById('tamb-val').className = tamb > 40 ? 'sb-value amber' : 'sb-value cyan';

  // Algorithm Core live calc — shows exact Wf = Wa/15
  document.getElementById('calc-wf').textContent = wf.toFixed(2);
  document.getElementById('calc-wa').textContent = wa;
  document.getElementById('algo-eff').textContent = eff + '%';
  document.getElementById('algo-mode').textContent = overtemp ? 'FAULT' : throttle === 0 ? 'IDLE' : 'AUTO';
  document.getElementById('algo-mode').style.color = overtemp ? 'var(--red)' : 'var(--cyan)';

  // Output
  document.getElementById('out-fuel-val').textContent = wf.toFixed(3);
  document.getElementById('out-fuel-val').style.color = overtemp ? 'var(--red)' : 'var(--amber)';
  document.getElementById('out-fuel-sub').textContent = overtemp
    ? 'Wf = fuel_flow × 0.0 (MELT-DOWN PREVENTION)'
    : `Wf = ${wa} ÷ 15 = ${wf_raw.toFixed(3)} kg/s`;

  document.getElementById('fv-fill').style.height = valve_pct + '%';
  document.getElementById('fv-fill').style.background = overtemp
    ? 'linear-gradient(180deg, #ff3d3d, #b71c1c)'
    : valve_pct > 70
    ? 'linear-gradient(180deg, var(--amber), #e65100)'
    : 'linear-gradient(180deg, var(--amber), #ff6f00)';
  document.getElementById('fv-pct').textContent = valve_pct + '%';

  document.getElementById('out-n1-pct').textContent = Math.round(n1_actual / 85) + '%';
  document.getElementById('out-n1-bar').style.width  = Math.round(n1_actual / 85) + '%';

  // Stat badges
  const oc = document.getElementById('ostat-comb');
  const ov = document.getElementById('ostat-valve');
  const oe = document.getElementById('ostat-egt');
  if (overtemp) {
    oc.textContent = 'OVER LIMIT'; oc.className = 'ostat-val crit';
    ov.textContent = 'CUT OFF';   ov.className = 'ostat-val crit';
    oe.textContent = current_temp + '°C';  oe.className = 'ostat-val crit';
  } else if (hightemp) {
    oc.textContent = 'CAUTION';   oc.className = 'ostat-val warn';
    ov.textContent = valve_cmd;   ov.className = 'ostat-val warn';
    oe.textContent = current_temp + '°C';  oe.className = 'ostat-val warn';
  } else {
    oc.textContent = 'OK LIMIT';   oc.className = 'ostat-val ok';
    ov.textContent = valve_cmd;    ov.className = 'ostat-val ok';
    oe.textContent = current_temp + '°C'; oe.className = 'ostat-val ok';
  }

  // Top bar warning — uses current_temp vs max_temp = 1000 (exact from requirements)
  const warnBadge = document.getElementById('egt-warn-badge');
  if (overtemp) {
    warnBadge.textContent = '⚠ TEMP OVER LIMIT (' + current_temp + '°C)';
    warnBadge.className = 'tb-warn crit';
  } else if (hightemp) {
    warnBadge.textContent = '⚠ TEMP HIGH (' + current_temp + '°C)';
    warnBadge.className = 'tb-warn warn';
  } else {
    warnBadge.textContent = 'TEMP NOMINAL (' + current_temp + '°C)';
    warnBadge.className = 'tb-warn ok';
  }

  // Feedback loop — 3 questions from requirements
  const fb1 = document.getElementById('fb1');
  const fb2 = document.getElementById('fb2');
  const fb3 = document.getElementById('fb3');
  const fb1s= document.getElementById('fb1-status');
  const fb2s= document.getElementById('fb2-status');
  const fb3s= document.getElementById('fb3-status');

  if (overtemp) {
    fb1.className = 'fb-step crit';
    fb1s.textContent = 'fuel_flow × 0.0 — MELT-DOWN PREVENTION';
    fb2.className = 'fb-step crit';
    fb2s.textContent = `N₁: ${n1_actual.toLocaleString()} RPM — ENGINE FAULT`;
    fb3.className = 'fb-step crit';
    fb3s.textContent = `current_temp ${current_temp}°C > max_temp ${max_temp}°C!`;
  } else if (hightemp) {
    fb1.className = 'fb-step warn';
    fb1s.textContent = `Wf: ${wf.toFixed(2)} kg/s — REDUCING`;
    fb2.className = 'fb-step warn';
    fb2s.textContent = `N₁: ${n1_actual.toLocaleString()} RPM → ${valve_cmd} valve`;
    fb3.className = 'fb-step warn';
    fb3s.textContent = `current_temp ${current_temp}°C — approaching ${max_temp}°C`;
  } else {
    fb1.className = 'fb-step active';
    fb1s.textContent = `fuel_flow = air_volume / 15 = ${wf.toFixed(2)} kg/s`;
    fb2.className = 'fb-step active';
    fb2s.textContent = `N₁: ${n1_actual.toLocaleString()} vs target ${target_n1.toLocaleString()} → ${valve_cmd} valve`;
    fb3.className = 'fb-step active';
    fb3s.textContent = `current_temp ${current_temp}°C ≤ max_temp ${max_temp}°C ✓`;
  }

  // Decision gate — AIRWORTHY vs REQUIRES MAINTENANCE
  const dr = document.getElementById('decision-result');
  if (overtemp) {
    dr.textContent = 'REQUIRES MAINT.'; dr.className = 'dg-result fault';
    pushLog(`⚠ FADEC WARNING: current_temp ${current_temp}°C > ${max_temp}°C. fuel_flow × 0.0. ENGINE REQUIRES MAINTENANCE.`);
  } else if (hightemp) {
    dr.textContent = 'CAUTION';         dr.className = 'dg-result maintain';
    pushLog(`⚡ CAUTION: current_temp ${current_temp}°C approaching limit. Wf reduced to ${wf.toFixed(2)} kg/s.`);
  } else if (throttle === 0) {
    dr.textContent = 'STANDBY';         dr.className = 'dg-result airworthy';
    pushLog('◉ Engine at ground idle. All systems nominal. Awaiting throttle input.');
  } else {
    dr.textContent = 'AIRWORTHY';       dr.className = 'dg-result airworthy';
    if(Math.random() < 0.3) pushLog(`✓ AIRWORTHY — fuel_flow: ${wf.toFixed(2)} kg/s | temp: ${current_temp}°C | N₁: ${n1_actual.toLocaleString()} RPM`);
  }

  // Code preview — exact Python from requirements, live values
  document.getElementById('code-temp').textContent = `current_temp(${current_temp})`;
  document.getElementById('code-result').textContent = overtemp
    ? '→ "FADEC WARNING: Reducing fuel to prevent melt-down!"'
    : '→ "Engine Stable. Fuel Flow optimized."';
  document.getElementById('code-result').style.color = overtemp ? 'var(--red)' : 'var(--green2)';

  // Map display
  document.getElementById('map-n1').textContent = Math.round(n1_actual / 85) + '%';
  document.getElementById('map-wf').textContent = wf.toFixed(2) + ' kg/s';

  // Out mode
  document.getElementById('out-mode').textContent = overtemp ? 'TEMP OVER LIMIT' : hightemp ? 'TEMP CAUTION' : 'TEMP NOMINAL';
  document.getElementById('out-mode').style.color = overtemp ? 'var(--red)' : hightemp ? 'var(--amber)' : 'var(--muted)';

  drawFuelMap(Math.round(n1_actual / 85), wf.toFixed(2));
}

// ═══ FUEL MAP CANVAS ═══
function drawFuelMap(n1, wf) {
  const canvas = document.getElementById('fuel-map-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width  = canvas.offsetWidth;
  const H = canvas.height = canvas.offsetHeight;

  ctx.clearRect(0, 0, W, H);

  const pad = { l: 30, r: 12, t: 10, b: 24 };
  const cw = W - pad.l - pad.r;
  const ch = H - pad.t - pad.b;

  // grid
  ctx.strokeStyle = 'rgba(0,229,255,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 5; i++) {
    const x = pad.l + (i / 5) * cw;
    const y = pad.t + (i / 5) * ch;
    ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t + ch); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cw, y); ctx.stroke();
  }

  // axis labels
  ctx.font = '8px "Share Tech Mono"';
  ctx.fillStyle = 'rgba(0,229,255,0.35)';
  ctx.textAlign = 'center';
  for (let i = 0; i <= 5; i++) {
    ctx.fillText(i * 20, pad.l + (i / 5) * cw, pad.t + ch + 14);
  }
  ctx.textAlign = 'right';
  for (let i = 0; i <= 5; i++) {
    ctx.fillText((i * 1.2).toFixed(1), pad.l - 4, pad.t + ch - (i / 5) * ch + 3);
  }

  // ideal line (Wf = N1/14)
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0,229,255,0.6)';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = 'rgba(0,229,255,0.4)';
  ctx.shadowBlur = 6;
  ctx.moveTo(pad.l, pad.t + ch);
  ctx.lineTo(pad.l + cw, pad.t);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // operating point
  const px = pad.l + (n1 / 100) * cw;
  const py = pad.t + ch - (n1 / 100) * ch;

  // crosshairs
  ctx.strokeStyle = 'rgba(0,229,255,0.25)';
  ctx.lineWidth = 0.8;
  ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(px, pad.t); ctx.lineTo(px, pad.t + ch); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad.l, py); ctx.lineTo(pad.l + cw, py); ctx.stroke();
  ctx.setLineDash([]);

  // point
  ctx.fillStyle = 'var(--cyan)';
  ctx.shadowColor = 'rgba(0,229,255,0.8)';
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(px, py, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

// ═══ RESET ═══
function resetAll() {
  wa = 150; tamb = 15; throttle = 50; n1_actual_input = 4250;
  document.getElementById('wa-slider').value       = 150;
  document.getElementById('tamb-slider').value     = 15;
  document.getElementById('throttle-slider').value = 50;
  document.getElementById('n1-slider').value       = 4250;
  update();
  pushLog('◉ System reset. All values returned to default.');
}

// ═══ INIT ═══
update();
setInterval(() => {
  const noise = (Math.random() - 0.5) * 0.5;
  drawFuelMap(
    Math.round(n1_actual_input / 85),
    ((wa + noise) / 15).toFixed(2)
  );
}, 800);
