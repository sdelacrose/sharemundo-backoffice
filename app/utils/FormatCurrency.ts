/**
 * Format a number to European currency format (e.g., "1.234,56 €")
 * @param amount - The numeric amount to format
 * @param currency - Optional currency code (e.g., "EUR", "GBP"), defaults to "EUR"
 * @param locale - Optional locale string (defaults to "de-DE" for common European format)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = "EUR",
  locale: string = "de-DE"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}