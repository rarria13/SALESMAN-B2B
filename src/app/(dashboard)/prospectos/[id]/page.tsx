'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Globe,
  Phone,
  Mail,
  Building2,
  Calendar,
  Link2,
  Package,
  TrendingUp,
  ChevronRight,
  FileText,
  User,
} from 'lucide-react';
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

const TABS = ['Resumen', 'Contactos', 'Historial', 'Oportunidades'] as const;
type Tab = (typeof TABS)[number];

const mockHistory = [
  { id: 'h1', type: 'Llamada', icon: Phone, date: '30 Ene 2024', description: 'Llamada de seguimiento con Director de Logística. Se confirmó interés en propuesta.', agent: 'Carlos M.', color: 'bg-blue-100 text-blue-600' },
  { id: 'h2', type: 'Email', icon: Mail, date: '25 Ene 2024', description: 'Envío de presentación comercial y tarifas de referencia.', agent: 'Ana R.', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'h3', type: 'Reunión', icon: Calendar, date: '20 Ene 2024', description: 'Primera reunión presencial en instalaciones del cliente. Levantamiento de necesidades logísticas.', agent: 'Carlos M.', color: 'bg-green-100 text-green-600' },
  { id: 'h4', type: 'Email', icon: Mail, date: '15 Ene 2024', description: 'Contacto inicial vía email. Presentación de Freight Hunter MX.', agent: 'Carlos M.', color: 'bg-yellow-100 text-yellow-600' },
  { id: 'h5', type: 'Nota', icon: FileText, date: '10 Ene 2024', description: 'Prospecto identificado como alta prioridad. Volumen estimado 400+ embarques/mes.', agent: 'Sistema', color: 'bg-gray-100 text-gray-600' },
];

const mockOpportunities = [
  { id: 'op1', route: 'Monterrey → CDMX', description: 'Transporte refrigerado semanal - 40 viajes/mes', amount: 85000, status: 'En Negociación', statusColor: 'bg-red-100 text-red-700' },
  { id: 'op2', route: 'Monterrey → Guadalajara', description: 'Carga seca - distribución zona occidente', amount: 48000, status: 'Cotización Enviada', statusColor: 'bg-purple-100 text-purple-700' },
];

export default function ProspectoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('Resumen');

  const company = companies.find((c) => c.id === id);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-700">Empresa no encontrada</h2>
          <p className="text-gray-500 mt-1 mb-6">No existe un prospecto con ese identificador.</p>
          <Link
            href="/prospectos"
            className="inline-flex items-center gap-2 text-[#1e3a5f] border border-[#1e3a5f] px-5 py-2.5 rounded-lg font-medium hover:bg-[#1e3a5f] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Prospectos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <Link
          href="/prospectos"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1e3a5f] transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Prospectos
        </Link>
      </div>

      {/* Company Header */}
      <div className="bg-[#0f2744] text-white px-6 py-8">
        <div className="flex items-start gap-5 max-w-6xl mx-auto">
          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${getInitialColor(company.industry)} text-white font-bold text-3xl shadow-lg`}
          >
            {company.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">{company.name}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getIndustryColor(company.industry)}`}>
                {company.industry}
              </span>
              <span className="flex items-center gap-1 text-blue-200 text-sm">
                <MapPin className="w-4 h-4" />
                {company.city}, {company.state}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getScoreColor(company.score)}`}>
                Score: {company.score}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(company.status)}`}>
                {company.status}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 max-w-6xl mx-auto border-b border-white/20">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'bg-white text-[#1e3a5f]'
                  : 'text-blue-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-6 py-6 max-w-6xl mx-auto">
        {/* RESUMEN TAB */}
        {activeTab === 'Resumen' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Información de la Empresa */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-base font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Información de la Empresa
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'RFC', value: company.rfc || 'N/D' },
                    { label: 'Giro / Industria', value: company.industry },
                    { label: 'Empleados', value: company.employees.toLocaleString('es-MX') },
                    { label: 'Facturación', value: company.revenue },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{item.label}</p>
                      <p className="text-sm text-gray-800 font-medium mt-0.5">{item.value}</p>
                    </div>
                  ))}
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Sitio Web</p>
                    {company.website ? (
                      <a
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#1e3a5f] font-medium mt-0.5 flex items-center gap-1 hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        {company.website}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-800 font-medium mt-0.5">N/D</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Dirección</p>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">{company.address || 'N/D'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Teléfono</p>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">{company.phone || 'N/D'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Email</p>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">{company.email || 'N/D'}</p>
                  </div>
                </div>
              </div>

              {/* Perfil Logístico */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h2 className="text-base font-bold text-[#1e3a5f] mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Perfil Logístico
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Embarques Est./Mes</p>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">
                      {company.shipmentsPerMonth ? `${company.shipmentsPerMonth} embarques` : 'N/D'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Tipo de Carga</p>
                    <p className="text-sm text-gray-800 font-medium mt-0.5">{company.cargoType || 'N/D'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-2">Zonas de Distribución</p>
                    {company.distributionZones && company.distributionZones.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {company.distributionZones.map((zone) => (
                          <span
                            key={zone}
                            className="px-2.5 py-1 bg-[#1e3a5f]/10 text-[#1e3a5f] rounded-full text-xs font-medium"
                          >
                            {zone}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">N/D</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Carriers Actuales</p>
                    <p className="text-sm text-gray-400 italic mt-0.5">Información no disponible</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* Estado CRM */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#1e3a5f] mb-3">Estado CRM</h3>
                <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
                <p className="text-xs text-gray-400 mt-2">Etapa actual en el pipeline de ventas</p>
              </div>

              {/* Agente Asignado */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#1e3a5f] mb-3">Agente Asignado</h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    CM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Carlos Martínez</p>
                    <p className="text-xs text-gray-500">Vendedor Senior</p>
                  </div>
                </div>
              </div>

              {/* Próxima Acción */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#1e3a5f] mb-3">Próxima Acción</h3>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Llamada de seguimiento</p>
                    <p className="text-xs text-amber-700 mt-0.5 font-medium">Mañana 10:00 AM</p>
                  </div>
                </div>
              </div>

              {/* Puntuación Lead */}
              <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#1e3a5f] mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Puntuación Lead
                </h3>
                <div className={`text-4xl font-black mb-2 ${
                  company.score >= 85 ? 'text-green-600' : company.score >= 70 ? 'text-yellow-600' : 'text-orange-500'
                }`}>
                  {company.score}
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full ${
                      company.score >= 85 ? 'bg-green-500' : company.score >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${company.score}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-gray-500">
                  {company.score >= 85 ? 'Lead de Alta Prioridad' : company.score >= 70 ? 'Lead de Prioridad Media' : 'Lead de Baja Prioridad'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACTOS TAB */}
        {activeTab === 'Contactos' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#1e3a5f]">
              Contactos ({company.contacts?.length || 0})
            </h2>
            {company.contacts && company.contacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.contacts.map((contact) => (
                  <div key={contact.id} className="bg-white border border-gray-200 rounded-xl p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{contact.name}</p>
                        <p className="text-sm text-gray-500">{contact.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2 text-sm text-[#1e3a5f] hover:underline"
                      >
                        <Mail className="w-4 h-4 text-gray-400" />
                        {contact.email}
                      </a>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {contact.phone}
                      </div>
                      {contact.linkedin && (
                        <a
                          href={`https://${contact.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                        >
                          <Link2 className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <User className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>No hay contactos registrados</p>
              </div>
            )}
          </div>
        )}

        {/* HISTORIAL TAB */}
        {activeTab === 'Historial' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#1e3a5f]">Historial de Actividades</h2>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-4">
                {mockHistory.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex gap-4 relative">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4 ml-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-gray-500 uppercase">{item.type}</span>
                            <p className="text-sm text-gray-800 mt-1">{item.description}</p>
                            <p className="text-xs text-gray-400 mt-1">Por {item.agent}</p>
                          </div>
                          <span className="text-xs text-gray-400 whitespace-nowrap">{item.date}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* OPORTUNIDADES TAB */}
        {activeTab === 'Oportunidades' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#1e3a5f]">Oportunidades ({mockOpportunities.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockOpportunities.map((opp) => (
                <div key={opp.id} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-[#1e3a5f] font-bold text-sm">
                      <MapPin className="w-4 h-4" />
                      {opp.route}
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${opp.statusColor}`}>
                      {opp.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{opp.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400 uppercase font-semibold">Monto Estimado</span>
                    <span className="text-lg font-black text-[#1e3a5f]">
                      ${opp.amount.toLocaleString('es-MX')} MXN
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
