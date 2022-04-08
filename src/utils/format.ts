export const formatCurrency = (value: number, currency = 'brl') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value);
};
