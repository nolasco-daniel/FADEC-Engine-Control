import { FeedbackStep, PanelHeader } from '../ui/index.js';

export function FeedbackPanel({ computed, state }) {
  return (
    <div className="panel" id="feedback" style={{ flex: 1 }}>
      <PanelHeader icon="->" title="Feedback Loop" badge="3/PHASE" />
      <div className="fb-steps">
        <FeedbackStep
          id="fb1"
          className={computed.overtemp ? 'crit' : computed.hightemp ? 'warn' : 'active'}
          dot="O"
          title="FUEL ADDED"
          desc='"I added fuel... did the engine speed up?"'
          status={
            computed.overtemp
              ? 'fuel_flow * 0.0 - MELT-DOWN PREVENTION'
              : computed.hightemp
                ? `Wf: ${computed.wf.toFixed(2)} kg/s - REDUCING`
                : `fuel_flow = air_volume / 15 = ${computed.wf.toFixed(2)} kg/s`
          }
        />
        <div className="fb-connector" />
        <FeedbackStep
          id="fb2"
          className={computed.overtemp ? 'crit' : computed.hightemp ? 'warn' : 'active'}
          dot="O"
          title="ENGINE RESPONSE"
          desc='"Is it too hot?"'
          status={
            computed.overtemp
              ? `N1: ${state.n1Actual.toLocaleString()} RPM - ENGINE FAULT`
              : computed.hightemp
                ? `N1: ${state.n1Actual.toLocaleString()} RPM -> ${computed.valveCmd} valve`
                : `N1: ${state.n1Actual.toLocaleString()} vs target ${computed.targetN1.toLocaleString()} -> ${computed.valveCmd} valve`
          }
        />
        <div className="fb-connector" />
        <FeedbackStep
          id="fb3"
          className={computed.overtemp ? 'crit' : computed.hightemp ? 'warn' : 'active'}
          dot="T"
          title="TEMPERATURE CHECK"
          desc='"If yes, stop adding fuel."'
          status={
            computed.overtemp
              ? `current_temp ${computed.currentTemp} C > max_temp ${computed.maxTemp} C!`
              : computed.hightemp
                ? `current_temp ${computed.currentTemp} C - approaching ${computed.maxTemp} C`
                : `current_temp ${computed.currentTemp} C <= max_temp ${computed.maxTemp} C`
          }
        />
      </div>

      <div className="decision-gate">
        <div className="dg-label">DECISION GATE</div>
        <div
          className={`dg-result ${computed.overtemp ? 'fault' : computed.hightemp ? 'maintain' : 'airworthy'}`}
          id="decision-result"
        >
          {computed.overtemp ? 'REQUIRES MAINT.' : computed.hightemp ? 'CAUTION' : state.throttle === 0 ? 'STANDBY' : 'AIRWORTHY'}
        </div>
      </div>
    </div>
  );
}
