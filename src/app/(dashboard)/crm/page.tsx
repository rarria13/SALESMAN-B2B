'use client';

import Link from 'next/link';
import { TrendingUp, DollarSign, BarChart3, Target } from 'lucide-react';
import { companies, crmColumns, statusToColumn } from '@/lib/mockData';
import { getScoreColor, getIndustryColor } from '@/lib/utils';

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

// Map column color class to a dot color
const dotColorMap: Record<string, string> = {
  'bg-gray-500': 'bg-gray-400',
  'bg-blue-500': 'bg-blue-500',
  'bg-yellow-500': 'bg-yellow-500',
  'bg-orange-500': 'bg-orange-500',
  'bg-purple-500': 'bg-purple-500',
  'bg-red-500': 'bg-red-500',
  'bg-green-500': 'bg-green-500',
  'bg-gray-700': 'bg-gray-600',
};

export default function CrmPage() {
  // Group companies by column
  const columnMap: Record<string, typeof companies> = {};
  crmColumns.forEach((col) => {
    columnMap[col.id] = [];
  });
  companies.forEach((company) => {
    const colId = statusToColumn[company.status];
    if (colId && columnMap[colId] !== undefined) {
      columnMap[colId].push(company);
    }
  });

  const totalDeals = companies.length;
  void totalDeals;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 flex-shrink-0">
        <h1 className="text-2xl font-bold text-[#1e3a5f]">CRM Pipeline</h1>
        <p className="text-sm text-gray-500 mt-0.5">Gestión visual del pipeline de ventas</p>
      </div>

      <div className="px-6 py-6 space-y-6 flex-1 flex flex-col overflow-hidden">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Total Pipeline</p>
              <DollarSign className="w-4 h-4 text-[#f59e0b]" />
            </div>
            <p className="text-2xl font-black text-[#1e3a5f]">$4.2M</p>
            <p className="text-xs text-gray-400 mt-0.5">MXN acumulado</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Deals Activos</p>
              <BarChart3 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-black text-[#1e3a5f]">42</p>
            <p className="text-xs text-gray-400 mt-0.5">en pipeline</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Ticket Promedio</p>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-black text-[#1e3a5f]">$100K</p>
            <p className="text-xs text-gray-400 mt-0.5">MXN por deal</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide">Tasa Conversión</p>
              <Target className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-2xl font-black text-[#1e3a5f]">12%</p>
            <p className="text-xs text-gray-400 mt-0.5">prospectos ganados</p>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 overflow-hidden">
          <div className="flex flex-nowrap overflow-x-auto gap-4 pb-4 h-full" style={{ minHeight: '480px' }}>
            {crmColumns.map((col) => {
              const colCompanies = columnMap[col.id] || [];
              const dotColor = dotColorMap[col.color] || 'bg-gray-400';

              return (
                <div
                  key={col.id}
                  className="min-w-[240px] w-[240px] flex-shrink-0 bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColor}`} />
                      <span className="text-sm font-bold text-[#1e3a5f]">{col.label}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f59e0b] text-[#0f2744]">
                      {colCompanies.length}
                    </span>
                  </div>

                  {/* Cards */}
                  <div className="flex-1 space-y-2 overflow-y-auto">
                    {colCompanies.length === 0 ? (
                      <div className="text-center py-6 text-gray-300">
                        <p className="text-xs">Sin prospectos</p>
                      </div>
                    ) : (
                      colCompanies.map((company) => (
                        <div
                          key={company.id}
                          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm hover:border-[#1e3a5f]/20 transition-all duration-150"
                        >
                          {/* Avatar + Name */}
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getInitialColor(company.industry)} text-white font-bold text-sm`}
                            >
                              {company.name.charAt(0)}
                            </div>
                            <p className="font-bold text-[#1e3a5f] text-sm leading-tight truncate">
                              {company.name}
                            </p>
                          </div>

                          {/* Industry + Score */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getIndustryColor(company.industry)}`}>
                              {company.industry}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${getScoreColor(company.score)}`}>
                              {company.score}
                            </span>
                          </div>

                          {/* Link */}
                          <Link
                            href={`/prospectos/${company.id}`}
                            className="text-xs text-[#1e3a5f] font-medium hover:underline flex items-center gap-1"
                          >
                            Ver detalle →
                          </Link>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
