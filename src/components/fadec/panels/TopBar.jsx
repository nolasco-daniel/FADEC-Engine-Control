export function TopBar({ tempClass, tempLabel, clock }) {
  return (
    <div id="topbar">
      <div className="tb-logo">FADEC Control Unit</div>
      <div className="tb-center">
        <div className="tb-id">
          <span id="reg-num">A-7741-X</span>
          REGISTRATION
        </div>
        <div className="tb-id">
          <span>CFM56-7B</span>
          ENGINE TYPE
        </div>
        <div className="tb-id">
          <span>AUTO</span>
          MODE
        </div>
      </div>
      <div className="tb-right">
        <div className={`tb-warn ${tempClass}`} id="egt-warn-badge">
          {tempLabel}
        </div>
        <div className="tb-badge active" id="active-badge">
          ACTIVE
        </div>
        <div className="tb-badge" id="clock-badge">
          {clock}
        </div>
      </div>
    </div>
  );
}
