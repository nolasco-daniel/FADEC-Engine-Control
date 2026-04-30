import { PanelHeader } from '../ui/index.js';

export function CodePanel({ computed }) {
  return (
    <div className="panel" style={{ flexShrink: 0 }}>
      <PanelHeader icon="CODE" title="CBT Code (Python)" badge="LIVE" />
      <div style={{ padding: 8, fontFamily: 'var(--mono)', fontSize: 9, lineHeight: 1.7, color: 'rgba(150,200,210,0.7)' }}>
        <span style={{ color: '#546e7a' }}># FADEC fuel schedule logic</span>
        <br />
        <span style={{ color: '#c792ea' }}>if</span> <span>current_temp</span> <span style={{ color: 'var(--cyan)' }}>{'>'}</span>{' '}
        <span style={{ color: '#f78c6c' }}>max_temp</span>
        <span style={{ color: 'var(--cyan)' }}>:</span>
        <br />
        &nbsp;&nbsp;fuel_flow <span style={{ color: 'var(--cyan)' }}>=</span> fuel_flow <span style={{ color: 'var(--cyan)' }}>*</span>{' '}
        <span style={{ color: '#f78c6c' }}>0.0</span>
        <br />
        <span style={{ color: '#c792ea' }}>else</span>
        <span style={{ color: 'var(--cyan)' }}>:</span>
        <br />
        &nbsp;&nbsp;fuel_flow <span style={{ color: 'var(--cyan)' }}>=</span> air_volume <span style={{ color: 'var(--cyan)' }}>/</span>{' '}
        <span style={{ color: '#f78c6c' }}>15</span>
        <br />
        <span style={{ color: 'var(--green2)' }}>
          {computed.overtemp ? '-> "FADEC WARNING: Reducing fuel to prevent melt-down!"' : '-> "Engine Stable. Fuel Flow optimized."'}
        </span>
      </div>
    </div>
  );
}
