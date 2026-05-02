import { PanelHeader } from '../ui/index.js';

export function CodePanel({ computed }) {
  return (
    <div className="panel code-panel" style={{ flexShrink: 0 }}>
      <PanelHeader icon="CODE" title="CBT Code (JavaScript Logic)" badge="LIVE" />
      <div style={{ padding: 8, fontFamily: 'var(--mono)', fontSize: 9, lineHeight: 1.7 }}>
        <span className="token-comment">{'// FADEC fuel schedule logic'}</span>
        <br />
        <span className="token-keyword">const</span> <span>targetN1</span> <span className="token-operator">=</span>{' '}
        <span>throttle</span> <span className="token-operator">{'>'}</span> <span className="token-number">50</span>{' '}
        <span className="token-operator">?</span> <span className="token-number">5000</span> <span className="token-operator">:</span>{' '}
        <span className="token-number">0</span>
        <br />
        <span className="token-keyword">const</span> <span>fuelFlow</span> <span className="token-operator">=</span> <span>airVolume</span>{' '}
        <span className="token-operator">/</span> <span className="token-number">15</span>
        <br />
        <span className="token-keyword">const</span> <span>valveCmd</span> <span className="token-operator">=</span> <span>overtemp</span>{' '}
        <span className="token-operator">?</span> <span className="token-string">'REDUCE'</span>{' '}
        <span className="token-operator">:</span> <span>targetN1</span> <span className="token-operator">===</span>{' '}
        <span className="token-number">0</span> <span className="token-operator">?</span> <span className="token-string">'HOLD'</span>{' '}
        <span className="token-operator">:</span> <span>actualN1</span> <span className="token-operator">{'<'}</span>{' '}
        <span>targetN1</span> <span className="token-operator">?</span> <span className="token-string">'OPEN'</span>{' '}
        <span className="token-operator">:</span> <span>actualN1</span> <span className="token-operator">{'>'}</span>{' '}
        <span>targetN1</span> <span className="token-operator">?</span> <span className="token-string">'CLOSE'</span>{' '}
        <span className="token-operator">:</span> <span className="token-string">'HOLD'</span>
        <br />
        <span className="token-keyword">if</span> <span>current_temp</span> <span className="token-operator">{'>'}</span>{' '}
        <span className="token-number">max_temp</span>
        <span className="token-operator">:</span>
        <br />
        &nbsp;&nbsp;adjustedFuelFlow <span className="token-operator">=</span> fuelFlow <span className="token-operator">*</span>{' '}
        <span className="token-number">0.8</span>
        <br />
        <span className="token-keyword">else</span>
        <span className="token-operator">:</span>
        <br />
        &nbsp;&nbsp;adjustedFuelFlow <span className="token-operator">=</span> fuelFlow
        <br />
        <span className="token-success">
          {computed.overtemp ? '-> "FADEC WARNING: Reducing fuel flow to prevent melt-down!"' : '-> "Engine Stable. Fuel Flow optimized."'}
        </span>
      </div>
    </div>
  );
}
