'use client';

import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import {
  TrendingUp, Users, Phone, Calendar, FileText,
  Trophy, DollarSign, ArrowUpRight,
} from 'lucide-react';
import { recentActivity } from '@/lib/mockData';

const funnelData = [
  { name: 'Prospectos', value: 248 },
  { name: 'Contactados', value: 89 },
  { name: 'Reuniones', value: 34 },
  { name: 'Cotizaciones', value: 67 },
  { name: 'Ganados', value: 18 },
];

const industryData = [
  { name: 'Alimentos', value: 35, color: '#22c55e' },
  { name: 'Bebidas', value: 22, color: '#3b82f6' },
  { name: 'Retail', value: 18, color: '#a855f7' },
  { name: 'Farmacéutica', value: 12, color: '#ef4444' },
  { name: 'Supermercados', value: 8, color: '#f59e0b' },
  { name: 'Otros', value: 5, color: '#6b7280' },
];

const salesData = [
  { month: 'Jul', ventas: 1200000 },
  { month: 'Ago', ventas: 1800000 },
  { month: 'Sep', ventas: 1500000 },
  { month: 'Oct', ventas: 2100000 },
  { month: 'Nov', ventas: 1900000 },
  { month: 'Dic', ventas: 2800000 },
  { month: 'Ene', ventas: 2400000 },
];

const statesData = [
  { state: 'Nuevo León', value: 45 },
  { state: 'CDMX', value: 38 },
  { state: 'Jalisco', value: 29 },
  { state: 'Querétaro', value: 22 },
  { state: 'Puebla', value: 18 },
  { state: 'Chihuahua', value: 14 },
];

const kpiCards = [
  {
    label: 'Prospectos Nuevos',
    value: '248',
    delta: '+12%',
    icon: Users,
    colorClass: 'text-blue-600',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-500',
  },
  {
    label: 'Contactados',
    value: '89',
    delta: '+8%',
    icon: Phone,
    colorClass: 'text-green-600',
    bgClass: 'bg-green-50',
    borderClass: 'border-green-500',
  },
  {
    label: 'Reuniones',
    value: '34',
    delta: '+15%',
    icon: Calendar,
    colorClass: 'text-orange-600',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-500',
  },
  {
    label: 'Cotizaciones',
    value: '67',
    delta: '+22%',
    icon: FileText,
    colorClass: 'text-purple-600',
    bgClass: 'bg-purple-50',
    borderClass: 'border-purple-500',
  },
  {
    label: 'Clientes Ganados',
    value: '18',
    delta: '+5%',
    icon: Trophy,
    colorClass: 'text-yellow-600',
    bgClass: 'bg-yellow-50',
    borderClass: 'border-yellow-500',
  },
  {
    label: 'Valor Pipeline',
    value: '$4.2M MXN',
    delta: null,
    icon: DollarSign,
    colorClass: 'text-red-600',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-500',
  },
];

const FUNNEL_COLORS = ['#1e3a5f', '#1e5fa8', '#3b82f6', '#60a5fa', '#f59e0b'];

function SectionTitle({ children, color = '#1e3a5f' }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-6 rounded-full" style={{ backgroundColor: color }} />
      <h2 className="font-bold text-gray-800 text-lg">{children}</h2>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function formatMXN(value: any) {
  const n = Number(value);
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`;
  return `$${n}`;
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  Completado: { label: 'Completado', classes: 'bg-green-100 text-green-800' },
  Pendiente: { label: 'Pendiente', classes: 'bg-yellow-100 text-yellow-800' },
  'En progreso': { label: 'En progreso', classes: 'bg-blue-100 text-blue-800' },
};

export default function DashboardPage() {
  const activities = recentActivity.slice(0, 6);

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard General</h1>
          <p className="text-sm text-gray-500 mt-1">Resumen ejecutivo · Enero 2024</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-gray-700">Q1 2024</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-lg ${card.bgClass} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${card.colorClass}`} />
                </div>
                {card.delta && (
                  <span className="flex items-center gap-0.5 text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {card.delta}
                  </span>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 leading-tight">{card.value}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-tight">{card.label}</p>
              </div>
              <div className={`h-0.5 w-full rounded-full ${card.borderClass} opacity-30`} style={{ backgroundColor: 'currentColor' }} />
            </div>
          );
        })}
      </div>

      {/* Charts Row 1: Funnel + Industry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Funnel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <SectionTitle color="#1e3a5f">Embudo de Ventas</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={funnelData} layout="vertical" margin={{ left: 16, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#374151' }} width={80} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                cursor={{ fill: '#f9fafb' }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {funnelData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={FUNNEL_COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <SectionTitle color="#f59e0b">Distribución por Industria</SectionTitle>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={220}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Participación']}
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 flex-1">
              {industryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600 flex-1 truncate">{item.name}</span>
                  <span className="text-xs font-semibold text-gray-800">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2: Sales Trend + States */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <SectionTitle color="#1e3a5f">Tendencia de Ventas</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis
                tick={{ fontSize: 10, fill: '#6b7280' }}
                tickFormatter={(v) => formatMXN(v)}
                width={52}
              />
              <Tooltip
                formatter={(value) => [formatMXN(Number(value)), 'Ventas']}
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="ventas"
                stroke="#1e3a5f"
                strokeWidth={2.5}
                dot={{ fill: '#1e3a5f', r: 4 }}
                activeDot={{ r: 6, fill: '#f59e0b' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* States Distribution */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <SectionTitle color="#3b82f6">Prospectos por Estado</SectionTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={statesData} margin={{ left: 0, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="state" tick={{ fontSize: 10, fill: '#6b7280' }} angle={-20} textAnchor="end" height={45} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 12 }}
                cursor={{ fill: '#f9fafb' }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Prospectos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <SectionTitle color="#f59e0b">Actividad Reciente</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Empresa', 'Tipo', 'Descripción', 'Fecha', 'Agente', 'Estado'].map((col) => (
                  <th
                    key={col}
                    className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {activities.map((item) => {
                const status = statusConfig[item.status] ?? { label: item.status, classes: 'bg-gray-100 text-gray-700' };
                return (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 font-semibold text-gray-800 whitespace-nowrap">{item.company}</td>
                    <td className="py-3 pr-4">
                      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-medium">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-600 max-w-xs truncate">{item.description}</td>
                    <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">{item.date}</td>
                    <td className="py-3 pr-4 text-gray-700 whitespace-nowrap font-medium">{item.agent}</td>
                    <td className="py-3">
                      <span className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-semibold ${status.classes}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
