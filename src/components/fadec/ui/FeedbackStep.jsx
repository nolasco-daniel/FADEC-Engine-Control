export function FeedbackStep({ id, className, dot, title, desc, status }) {
  return (
    <div className={`fb-step ${className}`} id={id}>
      <div className="fb-dot">{dot}</div>
      <div className="fb-content">
        <div className="fb-title">{title}</div>
        <div className="fb-desc">{desc}</div>
        <div className="fb-status">{status}</div>
      </div>
    </div>
  );
}
