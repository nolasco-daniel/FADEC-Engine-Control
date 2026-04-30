'use client';

import { useFadecController } from '../../hooks/useFadecController.js';
import { AlgorithmPanel, CodePanel, DiagnosticsLog, FeedbackPanel, HardwarePanel, OutputPanel, SensorsPanel, SubNav, TopBar } from './panels/index.js';

export function FadecDashboard() {
  const { state, computed, clock, logText, canvasRef, updateField, reset } = useFadecController();
  const n1Percent = Math.round((state.n1Actual / 8500) * 100);
  const tempClass = computed.overtemp ? 'crit' : computed.hightemp ? 'warn' : 'ok';
  const tempLabel = computed.overtemp
    ? `TEMP OVER LIMIT (${computed.currentTemp} C)`
    : computed.hightemp
      ? `TEMP HIGH (${computed.currentTemp} C)`
      : `TEMP NOMINAL (${computed.currentTemp} C)`;

  return (
    <>
      <TopBar tempClass={tempClass} tempLabel={tempLabel} clock={clock} />
      <SubNav />

      <div id="main">
        <SensorsPanel state={state} computed={computed} updateField={updateField} />

        <div id="center">
          <AlgorithmPanel state={state} computed={computed} />

          <div className="panel" id="tfmap" style={{ minHeight: 200 }}>
            <div className="ph">
              <span className="ph-icon">O</span>
              <span className="ph-title">Throttle-to-Fuel Map</span>
              <span className="ph-badge live">LIVE</span>
            </div>
            <div className="tfmap-inner">
              <canvas id="fuel-map-canvas" ref={canvasRef} />
              <div className="tfmap-bottom">
                <div>
                  <span className="tfmap-dot" />
                  Operating Point
                </div>
                <div>
                  Throttle: <span style={{ color: 'var(--cyan)' }}>{state.throttle}%</span> Wf:{' '}
                  <span style={{ color: 'var(--cyan)' }}>{computed.wf.toFixed(2)} kg/s</span>
                </div>
              </div>
            </div>
          </div>

          <OutputPanel computed={computed} n1Percent={n1Percent} state={state} />
        </div>

        <div id="right">
          <FeedbackPanel computed={computed} state={state} />
          <HardwarePanel />
          <CodePanel computed={computed} />
        </div>

        <DiagnosticsLog logText={logText} reset={reset} />
      </div>
    </>
  );
}
