'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Filter, MapPin, Building2 } from 'lucide-react';
import { companies } from '@/lib/mockData';
import { getIndustryColor, getStatusColor } from '@/lib/utils';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const industries = Array.from(new Set(companies.map((c) => c.industry)));
const states = Array.from(new Set(companies.map((c) => c.state)));
const sizes = Array.from(new Set(companies.map((c) => c.size)));

const legendItems = [
  { label: 'Nuevo', color: 'bg-gray-400' },
  { label: 'Contactado', color: 'bg-yellow-400' },
  { label: 'Reunión', color: 'bg-orange-400' },
  { label: 'Cotización', color: 'bg-purple-400' },
  { label: 'Ganado', color: 'bg-green-400' },
];

export default function MapaPage() {
  const [industria, setIndustria] = useState('');
  const [estado, setEstado] = useState('');
  const [tamano, setTamano] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = companies.filter((c) => {
    if (industria && c.industry !== industria) return false;
    if (estado && c.state !== estado) return false;
    if (tamano && c.size !== tamano) return false;
    return true;
  });

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4 p-4">
      {/* Left Panel */}
      <div className="w-72 flex-shrink-0 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-4 border-b border-gray-100" style={{ background: '#1e3a5f' }}>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-yellow-400" />
            <h2 className="font-bold text-white text-base">Mapa de Prospectos</h2>
          </div>
          <p className="text-xs text-blue-200">{filtered.length} empresas encontradas</p>
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-gray-100 space-y-2 bg-gray-50">
          <div className="flex items-center gap-1 mb-1">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Filtros</span>
          </div>
          <select
            value={industria}
            onChange={(e) => setIndustria(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Todas las industrias</option>
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Todos los estados</option>
            {states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={tamano}
            onChange={(e) => setTamano(e.target.value)}
            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Todos los tamaños</option>
            {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Company List */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((company) => (
            <button
              key={company.id}
              onClick={() => setSelected(company.id === selected ? null : company.id)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-blue-50 transition-colors ${selected === company.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#1e3a5f' }}>
                    <Building2 className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{company.name}</p>
                    <p className="text-xs text-gray-400">{company.city}</p>
                  </div>
                </div>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${getIndustryColor(company.industry)}`}>
                  {company.industry}
                </span>
                <span className="text-xs text-gray-400">Score: {company.score}</span>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center h-32 text-gray-400">
              <MapPin className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-sm">Sin resultados</p>
            </div>
          )}
        </div>

        {/* Footer count */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 font-medium">{filtered.length} empresas en el mapa</p>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="flex-1 relative min-h-[400px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <MapComponent filteredCompanies={filtered} />

          {/* Legend overlay */}
          <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Estado</p>
            <div className="space-y-1.5">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-xs text-gray-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
