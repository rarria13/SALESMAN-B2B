export function getScoreColor(score: number): string {
  if (score >= 85) return 'bg-green-100 text-green-800';
  if (score >= 70) return 'bg-yellow-100 text-yellow-800';
  if (score >= 50) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Nuevo': 'bg-gray-100 text-gray-700',
    'Investigando': 'bg-blue-100 text-blue-700',
    'Contactado': 'bg-yellow-100 text-yellow-800',
    'Reunión': 'bg-orange-100 text-orange-700',
    'Cotización': 'bg-purple-100 text-purple-700',
    'Negociación': 'bg-red-100 text-red-700',
    'Ganado': 'bg-green-100 text-green-700',
    'Perdido': 'bg-gray-200 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

export function getQuoteStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'Borrador': 'bg-gray-100 text-gray-700',
    'Enviada': 'bg-blue-100 text-blue-700',
    'Aceptada': 'bg-green-100 text-green-700',
    'Rechazada': 'bg-red-100 text-red-700',
    'Negociación': 'bg-yellow-100 text-yellow-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function getIndustryColor(industry: string): string {
  const colors: Record<string, string> = {
    'Bebidas': 'bg-blue-100 text-blue-800',
    'Alimentos': 'bg-green-100 text-green-800',
    'Retail': 'bg-purple-100 text-purple-800',
    'Supermercados': 'bg-orange-100 text-orange-800',
    'Farmacéutica': 'bg-red-100 text-red-800',
    'Manufactura': 'bg-yellow-100 text-yellow-800',
    'Construcción': 'bg-gray-100 text-gray-800',
  };
  return colors[industry] || 'bg-gray-100 text-gray-700';
}
