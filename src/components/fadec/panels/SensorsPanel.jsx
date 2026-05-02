import { PanelHeader, SensorBlock } from '../ui/index.js';
import { formatInteger } from '../../../lib/fadec/format.js';

export function SensorsPanel({ state, computed, updateField }) {
  return (
    <div className="panel" id="sensors">
      <PanelHeader icon="O" title="Sensor Inputs" badge="3/3ENS" badgeClass="ph-badge live" />

      <SensorBlock
        id="sb-wa"
        icon="P4"
        iconClass="cyan"
        name="Air Mass Flow"
        sub="Total pressure probe"
        value={state.wa}
        unit="kg/s"
        variable="Wa"
        sliderProps={{
          id: 'wa-slider',
          className: 'cyan',
          min: 1,
          max: 900,
          value: state.wa,
          onChange: (event) => updateField('wa', event.target.value),
        }}
        rangeStart="1"
        rangeEnd="900"
      />

      <SensorBlock
        id="sb-tamb"
        blockClass={`sensor-block ${state.tamb > 40 ? 'warn-block' : 'active-block'}`}
        icon="T2"
        iconClass="amber"
        name="Ambient Temperature"
        sub="Total temperature probe"
        value={state.tamb}
        unit="C"
        variable="Tamb THRESHOLD"
        variableLabel="Tamb THRESHOLD"
        valueClass={`sb-value ${state.tamb > 40 ? 'amber' : 'cyan'}`}
        sliderProps={{
          id: 'tamb-slider',
          className: 'amber',
          min: -40,
          max: 55,
          value: state.tamb,
          onChange: (event) => updateField('tamb', event.target.value),
        }}
        rangeStart="-40"
        rangeEnd="55"
      />

      <SensorBlock
        id="sb-throttle"
        icon="THR"
        iconClass="cyan"
        name="Throttle Position"
        sub="Cockpit lever input"
        value={state.throttle}
        unit="%"
        variable="Throttle -> if >50%: target N1 = 5,000 RPM"
        variableLabel={
          state.throttle > 50
            ? `OK Throttle ${state.throttle}% > 50% -> Target N1 = 5,000 RPM`
            : `Throttle ${state.throttle}% <= 50% -> Standby / Target N1 inactive`
        }
        sliderProps={{
          id: 'throttle-slider',
          className: 'cyan',
          min: 0,
          max: 100,
          value: state.throttle,
          onChange: (event) => updateField('throttle', event.target.value),
        }}
        rangeStart="0%"
        rangeEnd="100%"
      />

      <SensorBlock
        id="sb-n1"
        icon="N1"
        iconClass="cyan"
        name="Fan Speed (Actual)"
        sub="Speed probe - encoder"
        value={formatInteger(state.n1Actual)}
        unit="RPM"
        variable="N1 vs Target -> valve open/close"
        variableLabel={
          computed.n1Low
            ? `N1 ${formatInteger(state.n1Actual)} < ${formatInteger(computed.targetN1)} RPM -> OPEN Fuel Valve`
            : computed.n1High
              ? `N1 ${formatInteger(state.n1Actual)} > ${formatInteger(computed.targetN1)} RPM -> CLOSE Fuel Valve`
              : state.throttle > 50
                ? `N1 ${formatInteger(state.n1Actual)} = ${formatInteger(computed.targetN1)} RPM -> HOLD Valve`
                : `Throttle below threshold -> HOLD Valve`
        }
        sliderProps={{
          id: 'n1-slider',
          className: 'cyan',
          min: 0,
          max: 8500,
          step: 50,
          value: state.n1Actual,
          onChange: (event) => updateField('n1Actual', event.target.value),
        }}
        rangeStart="0"
        rangeEnd="8,500 RPM"
      />

      <div style={{ flex: 1 }} />

      <div
        className="objective-card"
        style={{
          margin: 8,
          background: 'rgba(0,229,255,0.04)',
          border: '1px solid var(--border)',
          borderRadius: 4,
          padding: '10px 12px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--orb)',
            fontSize: 7,
            letterSpacing: '0.2em',
            color: 'var(--cyan)',
            marginBottom: 6,
          }}
        >
          OBJECTIVE
        </div>
        <div style={{ fontSize: 9, color: 'var(--muted)', lineHeight: 1.5 }}>
          Interpret real-time sensor data triggered by changing air volumes. Use FADEC diagnostic logic to determine if engine is{' '}
          <span className="objective-highlight-airworthy">Airworthy</span> or requires{' '}
          <span className="objective-highlight-maintenance">Maintenance</span>.
        </div>
      </div>
    </div>
  );
}
