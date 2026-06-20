'use client';

import { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import {
  TrendingUp, Users, ArrowUpRight, DollarSign,
  Calendar, BarChart2, Percent,
} from 'lucide-react';

// ── Data ──────────────────────────────────────────────────────────────────────

const monthlySales = [
  { month: 'Feb', ventas: 620000 },
  { month: 'Mar', ventas: 780000 },
  { month: 'Abr', ventas: 910000 },
  { month: 'May', ventas: 740000 },
  { month: 'Jun', ventas: 1050000 },
  { month: 'Jul', ventas: 1200000 },
  { month: 'Ago', ventas: 1800000 },
  { month: 'Sep', ventas: 1500000 },
  { month: 'Oct', ventas: 2100000 },
  { month: 'Nov', ventas: 1900000 },
  { month: 'Dic', ventas: 2800000 },
  { month: 'Ene', ventas: 2400000 },
];

const salesBySeller = [
  { name: 'Carlos M.', ventas: 2100000 },
  { name: 'Ana R.', ventas: 1800000 },
  { name: 'Luis T.', ventas: 1600000 },
  { name: 'Pedro S.', ventas: 1400000 },
  { name: 'María G.', ventas: 1500000 },
];

const prospectsByMonth = [
  { month: 'Ago', prospectos: 28 },
  { month: 'Sep', prospectos: 34 },
  { month: 'Oct', prospectos: 41 },
  { month: 'Nov', prospectos: 38 },
  { month: 'Dic', prospectos: 29 },
  { month: 'Ene', prospectos: 48 },
  { month: 'Feb', prospectos: 30 },
];

const prospectsByState = [
  { name: 'Nuevo León', value: 45, color: '#1e3a5f' },
  { name: 'CDMX', value: 38, color: '#3b82f6' },
  { name: 'Jalisco', value: 29, color: '#f59e0b' },
  { name: 'Querétaro', value: 22, color: '#22c55e' },
  { name: 'Puebla', value: 18, color: '#a855f7' },
  { name: 'Chihuahua', value: 14, color: '#ef4444' },
];

const marginByIndustry = [
  { industria: 'Alimentos', margen: 18.5 },
  { industria: 'Bebidas', margen: 21.2 },
  { industria: 'Retail', margen: 15.8 },
  { industria: 'Farmacéutica', margen: 26.4 },
  { industria: 'Supermercados', margen: 12.1 },
];

const roiByAgent = [
  { agent: 'Carlos M.', roi: 340 },
  { agent: 'Ana R.', roi: 295 },
  { agent: 'Luis T.', roi: 260 },
  { agent: 'Pedro S.', roi: 215 },
  { agent: 'María G.', roi: 280 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatMXN(value: any) {
  const n = Number(value);
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

function SectionTitle({ children, color = '#1e3a5f' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-6 rounded-full" style={{ backgroundColor: color }} />
      <h2 className="font-bold text-gray-800 text-lg">{children}</h2>
    </div>
  );
}

// ── KPI Cards ─────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    label: 'Total Ventas',
    value: '$8.4M MXN',
    delta: '+18%',
    icon: DollarSign,
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
  },
  {
    label: 'Nuevos Prospectos',
    value: '248',
    delta: '+12%',
    icon: Users,
    colorClass: 'text-green-600',
    bgClass: 'bg-green-50',
  },
  {
    label: 'Tasa Conversión',
    value: '7.2%',
    delta: '+1.4pp',
    icon: Percent,
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
  },
  {
    label: 'Ticket Promedio',
    value: '$125K',
    delta: '+6%',
    icon: BarChart2,
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
  },
];

// ── Tab Components ─────────────────────────────────────────────────────────────

function VentasTab() {
  return (
    <div className="space-y-6">
      {/* Monthly Line Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <SectionTitle color="#1e3a5f">Ventas Mensuales — 12 Meses</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={monthlySales} margin={{ left: 0, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis
              tick={{ fontSize: 10, fill: '#6b7280' }}
              tickFormatter={formatMXN}
              width={56}
            />
            <Tooltip
              formatter={(v) => [formatMXN(v), 'Ventas']}
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="ventas"
              stroke="#1e3a5f"
              strokeWidth={2.5}
              dot={{ fill: '#1e3a5f', r: 3.5 }}
              activeDot={{ r: 6, fill: '#f59e0b' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sales by Seller */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <SectionTitle color="#f59e0b">Ventas por Vendedor</SectionTitle>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={salesBySeller} margin={{ left: 0, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#374151' }} />
            <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} tickFormatter={formatMXN} width={56} />
            <Tooltip
              formatter={(v) => [formatMXN(v), 'Ventas']}
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              cursor={{ fill: '#f9fafb' }}
            />
            <Bar dataKey="ventas" radius={[5, 5, 0, 0]} name="Ventas">
              {salesBySeller.map((_, i) => (
                <Cell key={i} fill={i % 2 === 0 ? '#1e3a5f' : '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ProspectosTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Prospects by Month */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <SectionTitle color="#1e3a5f">Prospectos por Mes</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={prospectsByMonth} margin={{ left: 0, right: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              cursor={{ fill: '#f9fafb' }}
            />
            <Bar dataKey="prospectos" fill="#3b82f6" radius={[5, 5, 0, 0]} name="Prospectos" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Prospects by State */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <SectionTitle color="#f59e0b">Distribución por Estado</SectionTitle>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="55%" height={240}>
            <PieChart>
              <Pie
                data={prospectsByState}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {prospectsByState.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v}`, 'Prospectos']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2.5 flex-1">
            {prospectsByState.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600 flex-1 truncate">{item.name}</span>
                <span className="text-xs font-bold text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RentabilidadTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Margin by Industry */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <SectionTitle color="#22c55e">Margen por Industria (%)</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={marginByIndustry} layout="vertical" margin={{ left: 8, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
            <XAxis type="number" tick={{ fontSize: 10, fill: '#6b7280' }} unit="%" />
            <YAxis dataKey="industria" type="category" tick={{ fontSize: 11, fill: '#374151' }} width={90} />
            <Tooltip
              formatter={(v) => [`${v}%`, 'Margen']}
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              cursor={{ fill: '#f9fafb' }}
            />
            <Bar dataKey="margen" radius={[0, 5, 5, 0]} name="Margen">
              {marginByIndustry.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.margen >= 20 ? '#22c55e' : entry.margen >= 15 ? '#f59e0b' : '#ef4444'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ROI by Agent */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <SectionTitle color="#a855f7">ROI por Agente (%)</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={roiByAgent} margin={{ left: 0, right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="agent" tick={{ fontSize: 10, fill: '#6b7280' }} />
            <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} unit="%" />
            <Tooltip
              formatter={(v) => [`${v}%`, 'ROI']}
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="roi"
              stroke="#a855f7"
              strokeWidth={2.5}
              dot={{ fill: '#a855f7', r: 5 }}
              activeDot={{ r: 7, fill: '#f59e0b' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const TABS = ['Ventas', 'Prospectos', 'Rentabilidad'] as const;
type Tab = typeof TABS[number];

export default function ReportesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Ventas');

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reportes &amp; Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Análisis de rendimiento del equipo comercial</p>
        </div>

        {/* Date Range (static display) */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2.5 shadow-sm w-fit">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700 font-medium">Ene 2024 — Ene 2025</span>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-xs text-green-600 font-semibold">+18% vs año anterior</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${card.bgClass} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.colorClass}`} />
                </div>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  {card.delta}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Tab Nav */}
        <div className="flex border-b border-gray-100">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === tab
                  ? 'text-[#1e3a5f]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 rounded-t-full"
                  style={{ backgroundColor: '#f59e0b' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'Ventas' && <VentasTab />}
          {activeTab === 'Prospectos' && <ProspectosTab />}
          {activeTab === 'Rentabilidad' && <RentabilidadTab />}
        </div>
      </div>
    </div>
  );
}
