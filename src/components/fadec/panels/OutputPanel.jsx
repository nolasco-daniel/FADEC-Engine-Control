import { PanelHeader, StatRow } from '../ui/index.js';

export function OutputPanel({ computed, n1Percent, state }) {
  return (
    <div className="panel" id="output" style={{ minHeight: 110 }}>
      <PanelHeader icon="O" title="Output / Actuator" badge="RESET" badgeClass="ph-badge" />
      <div className="out-inner">
        <div className="out-fuel-num">
          <div className="ofn-label">FUEL FLOW</div>
          <div className="ofn-val" style={{ color: computed.overtemp ? 'var(--red)' : 'var(--amber)' }}>
            {computed.wf.toFixed(3)}
          </div>
          <div className="ofn-unit">kg/s</div>
          <div className="ofn-sub">
            {computed.overtemp
              ? 'Wf = fuel_flow * 0.0 (MELT-DOWN PREVENTION)'
              : `Wf = ${state.wa} / 15 = ${computed.wfRaw.toFixed(3)} kg/s`}
          </div>
        </div>

        <div className="fuel-valve-wrap">
          <div className="fv-label">FUEL VALVE</div>
          <div className="fv-body">
            <div
              className="fv-fill"
              id="fv-fill"
              style={{
                height: `${computed.valvePct}%`,
                background: computed.overtemp
                  ? 'linear-gradient(180deg, #ff3d3d, #b71c1c)'
                  : computed.valvePct > 70
                    ? 'linear-gradient(180deg, var(--amber), #e65100)'
                    : 'linear-gradient(180deg, var(--amber), #ff6f00)',
              }}
            />
          </div>
          <div className="fv-pct">{computed.valvePct}%</div>
        </div>

        <div className="out-stats">
          <div style={{ fontFamily: 'var(--mono)', fontSize: 8, color: 'var(--muted)', letterSpacing: '0.1em' }}>
            N1 Speed &nbsp;
            <span style={{ color: 'var(--cyan)', fontSize: 9 }}>{n1Percent}%</span>
          </div>
          <div style={{ height: 4, background: 'rgba(0,229,255,0.15)', borderRadius: 2, overflow: 'hidden' }}>
            <div
              id="out-n1-bar"
              style={{
                height: '100%',
                background: 'var(--cyan)',
                borderRadius: 2,
                transition: 'width .4s',
                width: `${n1Percent}%`,
              }}
            />
          </div>
          <StatRow
            label="COMBUSTION"
            value={computed.overtemp ? 'OVER LIMIT' : computed.hightemp ? 'CAUTION' : 'OK LIMIT'}
            className={`ostat-val ${computed.overtemp ? 'crit' : computed.hightemp ? 'warn' : 'ok'}`}
          />
          <StatRow
            label="FUEL VALVE"
            value={computed.valveCmd}
            className={`ostat-val ${computed.overtemp ? 'crit' : computed.hightemp ? 'warn' : 'ok'}`}
          />
          <StatRow
            label="EGT STATUS"
            value={`${computed.currentTemp} C`}
            className={`ostat-val ${computed.overtemp ? 'crit' : computed.hightemp ? 'warn' : 'ok'}`}
          />
        </div>
      </div>
    </div>
  );
}
