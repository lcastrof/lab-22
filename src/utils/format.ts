export const formatCurrency = (value: number, currency = 'brl') => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
  }).format(value);
};
