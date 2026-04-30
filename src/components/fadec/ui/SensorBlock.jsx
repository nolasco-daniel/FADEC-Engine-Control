export function SensorBlock({
  id,
  icon,
  iconClass,
  name,
  sub,
  value,
  unit,
  variable,
  variableLabel,
  sliderProps,
  rangeStart,
  rangeEnd,
  blockClass = 'sensor-block active-block',
  valueClass = 'sb-value cyan',
}) {
  return (
    <div className={blockClass} id={id}>
      <div className="sb-top">
        <div className={`sb-icon ${iconClass}`}>{icon}</div>
        <div className="sb-meta">
          <div className="sb-name">{name}</div>
          <div className="sb-sub">{sub}</div>
        </div>
        <div>
          <div className={valueClass}>{value}</div>
          <div className="sb-unit">{unit}</div>
        </div>
      </div>
      <div className="sb-var">{variableLabel || variable}</div>
      <div className="sb-slider">
        <input type="range" {...sliderProps} />
      </div>
      <div className="sb-range">
        <span>{rangeStart}</span>
        <span>{rangeEnd}</span>
      </div>
    </div>
  );
}
