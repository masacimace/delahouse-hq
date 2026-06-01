export function formatDate(date?: string, month: "short" | "long" = "short") {
  if (!date) return null;

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month,
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateRange(dateStart?: string, dateEnd?: string) {
  const startDate = formatDate(dateStart);
  const endDate = formatDate(dateEnd);

  if (startDate && endDate && startDate !== endDate) {
    return `${startDate} — ${endDate}`;
  }

  return startDate;
}

export function getWhatsAppUrl(number?: string) {
  if (!number) return null;

  const cleanNumber = number.replace(/\D/g, "");

  return `https://wa.me/${cleanNumber}`;
}
