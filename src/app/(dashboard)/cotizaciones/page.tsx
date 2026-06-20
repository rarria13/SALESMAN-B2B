'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, FileText, TrendingUp, CheckCircle, XCircle, Download, Eye } from 'lucide-react';
import { quotes } from '@/lib/mockData';
import { formatCurrency, getQuoteStatusColor } from '@/lib/utils';

const statCards = [
  { label: 'Total Cotizaciones', value: 8, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Enviadas', value: 2, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Aceptadas', value: 2, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Rechazadas', value: 1, icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
];

export default function CotizacionesPage() {
  const [search, setSearch] = useState('');

  const filtered = quotes.filter((q) =>
    q.folio.toLowerCase().includes(search.toLowerCase()) ||
    q.company.toLowerCase().includes(search.toLowerCase()) ||
    q.origin.toLowerCase().includes(search.toLowerCase()) ||
    q.destination.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = quotes.reduce((sum, q) => sum + q.amount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cotizaciones</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gestiona y da seguimiento a tus propuestas comerciales</p>
        </div>
        <Link
          href="/cotizaciones/nueva"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-yellow-500 transition-colors"
          style={{ background: '#f59e0b', color: '#0f2744' }}
        >
          <Plus className="w-4 h-4" />
          Nueva Cotización
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Value Banner */}
      <div className="rounded-xl px-6 py-4 flex items-center justify-between" style={{ background: '#1e3a5f' }}>
        <div>
          <p className="text-blue-200 text-sm">Valor Total en Pipeline</p>
          <p className="text-3xl font-bold text-white mt-0.5">{formatCurrency(totalValue)}</p>
        </div>
        <div className="text-right">
          <p className="text-blue-200 text-sm">Tasa de Conversión</p>
          <p className="text-2xl font-bold text-yellow-400 mt-0.5">25%</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por folio, empresa, ruta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} cotizaciones</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Folio</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Empresa</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ruta</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Monto</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Estado</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Fecha</th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#1e3a5f' }}>
                        <FileText className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="text-sm font-semibold text-blue-700">{quote.folio}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-800">{quote.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <span className="truncate max-w-[120px]">{quote.origin}</span>
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <span className="truncate max-w-[120px]">{quote.destination}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(quote.amount)}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full font-semibold ${getQuoteStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{new Date(quote.date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Ver detalle">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Descargar PDF">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <FileText className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">Sin cotizaciones</p>
              <p className="text-xs mt-1">Ajusta tu búsqueda o crea una nueva cotización</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
