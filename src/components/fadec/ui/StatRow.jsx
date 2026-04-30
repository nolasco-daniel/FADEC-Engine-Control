export function StatRow({ label, value, className }) {
  return (
    <div className="ostat-row">
      <span className="ostat-lbl">{label}</span>
      <span className={className}>{value}</span>
    </div>
  );
}
