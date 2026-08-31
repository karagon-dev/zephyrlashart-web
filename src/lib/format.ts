export const DATE_LOCALE = "es-CR";

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours > 0 && rest > 0) {
    return `${hours}h ${rest}m`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  return `${rest} min`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat(DATE_LOCALE, {
    style: "currency",
    currency: "USD",
  }).format(price);
}
