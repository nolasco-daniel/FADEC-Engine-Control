import { PanelHeader } from '../ui/index.js';

export function AlgorithmPanel({ computed, state }) {
  return (
    <div className="panel" id="algo">
      <PanelHeader icon=">" title="Algorithm Core" badge="GOLDEN STAT" />
      <div className="algo-inner">
        <div className="algo-formula-box">
          <div className="af-label">FUEL FLOW FORMULA</div>
          <div className="af-formula">
            <span>Wf</span>
            <span style={{ color: 'var(--muted)' }}>=</span>
            <div className="af-frac">
              <div className="af-frac-top">Wa</div>
              <div className="af-frac-line" />
              <div className="af-frac-bot">15</div>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(0,229,255,0.4)' }}>
            Stoichiometric ratio for jet fuel
          </div>
        </div>

        <div className="algo-calc-box">
          <div className="ac-label">LIVE CALCULATION</div>
          <div className="ac-row">
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--muted)', textAlign: 'center' }}>Wf</div>
              <div className="ac-val">{computed.wf.toFixed(2)}</div>
              <div className="ac-unit">kg/s</div>
            </div>
            <div className="ac-op">=</div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--muted)', textAlign: 'center' }}>Wa</div>
              <div className="ac-val">{state.wa}</div>
              <div className="ac-unit">kg/s</div>
            </div>
            <div className="ac-op">/</div>
            <div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--muted)', textAlign: 'center' }}>Const</div>
              <div className="ac-val" style={{ color: 'var(--muted)' }}>
                15
              </div>
              <div className="ac-unit">ratio</div>
            </div>
          </div>
        </div>

        <div className="algo-stats">
          <div className="astat">
            <div className="astat-val">15:1</div>
            <div className="astat-lbl">Air:Fuel Ratio</div>
          </div>
          <div className="astat">
            <div className="astat-val" id="algo-eff">
              {computed.eff}%
            </div>
            <div className="astat-lbl">Combustion Eff</div>
          </div>
          <div className="astat">
            <div className="astat-val" id="algo-mode">
              {computed.overtemp ? 'FAULT' : state.throttle === 0 ? 'IDLE' : 'AUTO'}
            </div>
            <div className="astat-lbl">Op. Status</div>
          </div>
        </div>
      </div>
    </div>
  );
}
