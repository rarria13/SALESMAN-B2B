'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Users, Filter, X, Building2, Phone } from 'lucide-react';
import { companies } from '@/lib/mockData';
import { getScoreColor, getStatusColor, getIndustryColor } from '@/lib/utils';

const industryInitialColors: Record<string, string> = {
  'Bebidas': 'bg-blue-500',
  'Alimentos': 'bg-green-500',
  'Retail': 'bg-purple-500',
  'Supermercados': 'bg-orange-500',
  'Farmacéutica': 'bg-red-500',
  'Manufactura': 'bg-yellow-500',
  'Construcción': 'bg-gray-500',
};

function getInitialColor(industry: string): string {
  return industryInitialColors[industry] || 'bg-slate-500';
}

export default function ProspectosPage() {
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterIndustria, setFilterIndustria] = useState('');
  const [filterTamano, setFilterTamano] = useState('');
  const [filterScore, setFilterScore] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const matchSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase());
      const matchEstado = !filterEstado || c.state === filterEstado;
      const matchIndustria = !filterIndustria || c.industry === filterIndustria;
      const matchTamano = !filterTamano || c.size === filterTamano;
      const matchScore =
        !filterScore ||
        (filterScore === 'alta' && c.score >= 85) ||
        (filterScore === 'media' && c.score >= 70 && c.score < 85) ||
        (filterScore === 'baja' && c.score < 70);
      return matchSearch && matchEstado && matchIndustria && matchTamano && matchScore;
    });
  }, [search, filterEstado, filterIndustria, filterTamano, filterScore]);

  const clearFilters = () => {
    setFilterEstado('');
    setFilterIndustria('');
    setFilterTamano('');
    setFilterScore('');
    setSearch('');
  };

  const statsTotal = companies.length;
  const statsNuevos = companies.filter((c) => c.status === 'Nuevo').length;
  const statsEnProceso = companies.filter(
    (c) => !['Nuevo', 'Ganado', 'Perdido'].includes(c.status)
  ).length;
  const statsGanados = companies.filter((c) => c.status === 'Ganado').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Prospectos</h1>
        <p className="text-sm text-gray-500 mt-0.5">Base de datos de empresas</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: statsTotal, color: 'text-[#1e3a5f]', bg: 'bg-blue-50', border: 'border-blue-200' },
            { label: 'Nuevos', value: statsNuevos, color: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-200' },
            { label: 'En Proceso', value: statsEnProceso, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
            { label: 'Ganados', value: statsGanados, color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} border ${stat.border} rounded-xl p-4 text-center`}
            >
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar empresa o ciudad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]"
          />
        </div>

        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between md:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm font-medium text-[#1e3a5f] bg-white border border-gray-200 px-4 py-2 rounded-lg"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
          {(filterEstado || filterIndustria || filterTamano || filterScore) && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-red-500">
              <X className="w-4 h-4" /> Limpiar
            </button>
          )}
        </div>

        {/* Filters Panel */}
        <div className={`bg-white border border-gray-200 rounded-xl p-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Estado</label>
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
              >
                <option value="">Todos</option>
                {['Nuevo León', 'CDMX', 'Jalisco', 'Durango', 'Veracruz', 'Sonora'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Industria</label>
              <select
                value={filterIndustria}
                onChange={(e) => setFilterIndustria(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
              >
                <option value="">Todas</option>
                {['Alimentos', 'Bebidas', 'Retail', 'Supermercados', 'Farmacéutica', 'Manufactura', 'Construcción'].map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Tamaño</label>
              <select
                value={filterTamano}
                onChange={(e) => setFilterTamano(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
              >
                <option value="">Todos</option>
                {['Micro', 'Pequeña', 'Mediana', 'Grande', 'Corporativo'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Puntuación</label>
              <select
                value={filterScore}
                onChange={(e) => setFilterScore(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/30"
              >
                <option value="">Todos</option>
                <option value="alta">Alta (85+)</option>
                <option value="media">Media (70-84)</option>
                <option value="baja">Baja (&lt;70)</option>
              </select>
            </div>
            <div>
              <button
                onClick={clearFilters}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Mostrando <span className="font-semibold text-[#1e3a5f]">{filtered.length}</span> de {companies.length} empresas
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((company) => (
            <div
              key={company.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-[#1e3a5f]/20 transition-all duration-200 flex flex-col gap-4"
            >
              {/* Top */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getInitialColor(company.industry)} text-white font-bold text-lg`}
                >
                  {company.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1e3a5f] text-base leading-tight truncate">{company.name}</h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getIndustryColor(company.industry)}`}>
                    {company.industry}
                  </span>
                </div>
              </div>

              {/* Middle */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{company.city}, {company.state}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{company.employees.toLocaleString('es-MX')} empleados</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>{company.revenue}</span>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getScoreColor(company.score)}`}>
                  Score: {company.score}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 border-t border-gray-100">
                <Link
                  href={`/prospectos/${company.id}`}
                  className="flex-1 text-center text-sm font-medium text-[#1e3a5f] border border-[#1e3a5f] rounded-lg py-2 hover:bg-[#1e3a5f] hover:text-white transition-colors"
                >
                  Ver Detalle
                </Link>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium bg-[#f59e0b] text-[#0f2744] rounded-lg py-2 hover:bg-[#d97706] transition-colors">
                  <Phone className="w-4 h-4" />
                  Contactar
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-lg font-medium">Sin resultados</p>
              <p className="text-sm mt-1">Intenta con otros filtros o términos de búsqueda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
