'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, FileText, Truck, Package, MapPin, User, DollarSign, Printer } from 'lucide-react';

export default function NuevaCotizacionPage() {
  const [form, setForm] = useState({
    cliente: '',
    origen: '',
    destino: '',
    km: '',
    peso: '',
    tipoUnidad: 'Torton',
    tarifaBase: '',
    maniobras: '',
    seguro: '',
    notas: '',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const num = (v: string) => parseFloat(v) || 0;
  const subtotal = num(form.tarifaBase) + num(form.maniobras) + num(form.seguro);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const fmt = (n: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 }).format(n);

  const calcKm = () => update('km', String(Math.floor(Math.random() * 601) + 200));

  const quickCities = [
    { label: 'Monterrey', value: 'Monterrey, NL' },
    { label: 'CDMX', value: 'Ciudad de México, CDMX' },
    { label: 'Guadalajara', value: 'Guadalajara, Jal' },
  ];

  const inputClass = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white';
  const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5';

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/cotizaciones" className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Cotización</h1>
          <p className="text-sm text-gray-500">Folio: <span className="font-semibold text-blue-700">COT-2024-009</span></p>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Left Form */}
        <div className="flex-1 space-y-5 min-w-0">

          {/* Datos del Cliente */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2" style={{ background: '#1e3a5f' }}>
              <User className="w-4 h-4 text-yellow-400" />
              <h3 className="font-semibold text-white text-sm">Datos del Cliente</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className={labelClass}>Nombre del Cliente / Empresa</label>
                <input
                  type="text"
                  placeholder="Ej. FEMSA, Grupo Bimbo..."
                  value={form.cliente}
                  onChange={(e) => update('cliente', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Ciudad de Origen</label>
                <div className="flex gap-2 mb-2">
                  {quickCities.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => update('origen', c.value)}
                      className="px-3 py-1 text-xs rounded-full border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors text-gray-600 font-medium"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Ciudad de origen"
                  value={form.origen}
                  onChange={(e) => update('origen', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Ruta */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2" style={{ background: '#1e3a5f' }}>
              <MapPin className="w-4 h-4 text-yellow-400" />
              <h3 className="font-semibold text-white text-sm">Ruta</h3>
            </div>
            <div className="p-5 grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Origen</label>
                <input
                  type="text"
                  placeholder="Ciudad origen"
                  value={form.origen}
                  onChange={(e) => update('origen', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Destino</label>
                <input
                  type="text"
                  placeholder="Ciudad destino"
                  value={form.destino}
                  onChange={(e) => update('destino', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Distancia (km)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="0"
                    value={form.km}
                    onChange={(e) => update('km', e.target.value)}
                    className={inputClass}
                  />
                  <button
                    onClick={calcKm}
                    className="flex items-center gap-1.5 px-3 py-2.5 text-sm rounded-lg font-semibold whitespace-nowrap hover:bg-yellow-500 transition-colors"
                    style={{ background: '#f59e0b', color: '#0f2744' }}
                  >
                    <Calculator className="w-4 h-4" />
                    Calc
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carga */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2" style={{ background: '#1e3a5f' }}>
              <Package className="w-4 h-4 text-yellow-400" />
              <h3 className="font-semibold text-white text-sm">Carga</h3>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Peso (kg)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={form.peso}
                  onChange={(e) => update('peso', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Tipo de Unidad</label>
                <select
                  value={form.tipoUnidad}
                  onChange={(e) => update('tipoUnidad', e.target.value)}
                  className={inputClass}
                >
                  {['Torton', 'Trailer', 'Rabón', 'Full', 'Caja Seca', 'Caja Refrigerada'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tarifas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2" style={{ background: '#1e3a5f' }}>
              <DollarSign className="w-4 h-4 text-yellow-400" />
              <h3 className="font-semibold text-white text-sm">Tarifas (MXN)</h3>
            </div>
            <div className="p-5 grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Tarifa Base</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.tarifaBase}
                  onChange={(e) => update('tarifaBase', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Maniobras</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.maniobras}
                  onChange={(e) => update('maniobras', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Seguro</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.seguro}
                  onChange={(e) => update('seguro', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2" style={{ background: '#1e3a5f' }}>
              <FileText className="w-4 h-4 text-yellow-400" />
              <h3 className="font-semibold text-white text-sm">Notas Adicionales</h3>
            </div>
            <div className="p-5">
              <textarea
                placeholder="Condiciones especiales, observaciones, tiempos de entrega..."
                value={form.notas}
                onChange={(e) => update('notas', e.target.value)}
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* Right Sticky Summary */}
        <div className="w-80 flex-shrink-0 sticky top-6 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100" style={{ background: '#0f2744' }}>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white">Resumen de Cotización</h3>
              </div>
              <p className="text-xs text-blue-300 mt-1">Folio: COT-2024-009</p>
            </div>

            {/* Route Summary */}
            {(form.origen || form.destino) && (
              <div className="px-5 py-3 bg-blue-50 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="font-medium truncate">{form.origen || '—'}</span>
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="font-medium truncate">{form.destino || '—'}</span>
                </div>
                {form.km && <p className="text-xs text-gray-500 mt-0.5">{form.km} km · {form.tipoUnidad}</p>}
              </div>
            )}

            {/* Breakdown */}
            <div className="p-5 space-y-3">
              {[
                { label: 'Tarifa Base', value: num(form.tarifaBase) },
                { label: 'Maniobras', value: num(form.maniobras) },
                { label: 'Seguro', value: num(form.seguro) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-800">{fmt(value)}</span>
                </div>
              ))}

              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-800">{fmt(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">IVA (16%)</span>
                  <span className="text-gray-600">{fmt(iva)}</span>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold" style={{ color: '#1e3a5f' }}>{fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 space-y-2">
              <button
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors"
                style={{ background: '#f59e0b', color: '#0f2744' }}
              >
                <Printer className="w-4 h-4" />
                Generar PDF
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors">
                <FileText className="w-4 h-4" />
                Guardar Borrador
              </button>
            </div>
          </div>

          {/* Info card */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-800 mb-1">Tip</p>
            <p className="text-xs text-blue-600">Completa la tarifa base y los costos adicionales para ver el desglose automático con IVA.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
