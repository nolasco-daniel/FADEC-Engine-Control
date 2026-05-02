export function formatInteger(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return '0';
  }

  return Math.trunc(numeric)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
