export function DiagnosticsLog({ logText, reset }) {
  return (
    <div id="diaglog">
      <div className="dl-prefix">FADEC LOG &gt;</div>
      <div className="dl-text">
        {logText}
        <span id="log-cursor" />
      </div>
      <button className="reset-btn" id="reset-btn" type="button" onClick={reset}>
        RESET
      </button>
    </div>
  );
}
