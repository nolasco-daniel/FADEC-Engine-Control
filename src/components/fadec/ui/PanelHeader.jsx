export function PanelHeader({ icon, title, badge, badgeClass = 'ph-badge' }) {
  return (
    <div className="ph">
      <span className="ph-icon">{icon}</span>
      <span className="ph-title">{title}</span>
      <span className={badgeClass}>{badge}</span>
    </div>
  );
}
