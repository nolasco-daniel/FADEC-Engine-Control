import { HardwareItem, PanelHeader } from '../ui/index.js';

export function HardwarePanel() {
  return (
    <div className="panel" id="hardware">
      <PanelHeader icon="[]" title="Hardware Components" badge="3/3 ONLINE" />
      <div className="hw-grid">
        <HardwareItem num="01 / ECU" name="Control Unit" desc="The brain. Dual-redundant computer chip running FADEC logic." />
        <HardwareItem num="02 / SEN" name="Sensors" desc="T2, P3, EGT probes. The eyes feeding data to ECU." />
        <HardwareItem num="03 / ACT" name="Actuators" desc="FCU fuel valve. The hands physically controlling fuel flow." />
      </div>
    </div>
  );
}
