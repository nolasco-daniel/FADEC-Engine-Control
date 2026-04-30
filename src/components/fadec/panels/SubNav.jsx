export function SubNav() {
  return (
    <div id="subnav">
      <div className="snav-tab active">OVERVIEW</div>
      <div className="snav-tab">SENSORS</div>
      <div className="snav-tab">ALGORITHM</div>
      <div className="snav-tab">ACTUATORS</div>
      <div className="snav-tab">DIAGNOSTICS</div>
      <div className="snav-sep" />
      <div id="sys-time">SYS: FADEC-v4.2.1 | ENG: NOMINAL</div>
    </div>
  );
}
