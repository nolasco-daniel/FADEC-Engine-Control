export function HardwareItem({ num, name, desc }) {
  return (
    <div className="hw-item">
      <div className="hw-item-num">{num}</div>
      <div className="hw-item-name">{name}</div>
      <div className="hw-item-desc">{desc}</div>
    </div>
  );
}
