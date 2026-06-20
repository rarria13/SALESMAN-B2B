'use client';
import { useState } from 'react';
import { User, Building2, Plug, Users, Bell, Shield, Camera, Check, X, Save } from 'lucide-react';

const TABS = [
  { id: 'perfil', label: 'Perfil', icon: User },
  { id: 'empresa', label: 'Empresa', icon: Building2 },
  { id: 'integraciones', label: 'Integraciones', icon: Plug },
  { id: 'usuarios', label: 'Usuarios', icon: Users },
  { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
  { id: 'seguridad', label: 'Seguridad', icon: Shield },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors focus:outline-none ${enabled ? '' : 'bg-gray-200'}`}
      style={enabled ? { background: '#f59e0b' } : {}}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}

const inputClass = 'w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white';
const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5';

function SaveButton({ label = 'Guardar Cambios' }: { label?: string }) {
  return (
    <button
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors shadow-sm"
      style={{ background: '#f59e0b', color: '#0f2744' }}
    >
      <Save className="w-4 h-4" />
      {label}
    </button>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ---- TAB: PERFIL ----
function PerfilTab() {
  const [form, setForm] = useState({
    nombre: 'Juan Arias',
    email: 'juan.arias@freighthunter.mx',
    telefono: '+52 81 1234 5678',
    rol: 'Vendedor Senior',
    zona: 'Noreste',
  });
  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <SectionHeader title="Perfil de Usuario" subtitle="Administra tu información personal y preferencias" />
      {/* Avatar */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold" style={{ background: '#1e3a5f' }}>
            JA
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md hover:bg-yellow-500 transition-colors">
            <Camera className="w-4 h-4 text-yellow-900" />
          </button>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{form.nombre}</p>
          <p className="text-sm text-gray-500">{form.rol} · {form.zona}</p>
          <button className="mt-2 text-xs text-blue-600 hover:underline">Cambiar foto de perfil</button>
        </div>
      </div>
      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nombre Completo</label>
            <input type="text" value={form.nombre} onChange={(e) => update('nombre', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Correo Electrónico</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Teléfono</label>
            <input type="tel" value={form.telefono} onChange={(e) => update('telefono', e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Rol</label>
            <select value={form.rol} onChange={(e) => update('rol', e.target.value)} className={inputClass}>
              {['Vendedor Junior', 'Vendedor Senior', 'Gerente de Ventas', 'Director Comercial', 'Administrador'].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Zona Asignada</label>
            <select value={form.zona} onChange={(e) => update('zona', e.target.value)} className={inputClass}>
              {['Noreste', 'Norte', 'Centro', 'Occidente', 'Sur', 'Sureste', 'Nacional'].map((z) => (
                <option key={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton />
        </div>
      </div>
    </div>
  );
}

// ---- TAB: EMPRESA ----
function EmpresaTab() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Datos de la Empresa" subtitle="Información corporativa y configuración general" />
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {/* Logo upload */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors">
            <Camera className="w-6 h-6 text-gray-300" />
            <span className="text-xs text-gray-400 mt-1">Logo</span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Freight Hunter MX</p>
            <p className="text-sm text-gray-500">Transporte y Logística</p>
            <button className="mt-1 text-xs text-blue-600 hover:underline">Subir logo</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Nombre de la Empresa', value: 'Freight Hunter MX SA de CV', type: 'text' },
            { label: 'RFC', value: 'FHM230101AA1', type: 'text' },
            { label: 'Industria', value: 'Transporte', type: 'text' },
            { label: 'Tamaño', value: 'Mediana empresa', type: 'text' },
          ].map(({ label, value, type }) => (
            <div key={label}>
              <label className={labelClass}>{label}</label>
              <input type={type} defaultValue={value} className={inputClass} />
            </div>
          ))}
          <div className="col-span-2">
            <label className={labelClass}>Dirección Fiscal</label>
            <input type="text" defaultValue="Av. Revolución 1234, Col. Del Valle, Monterrey, NL, 64000" className={inputClass} />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton label="Guardar Empresa" />
        </div>
      </div>
    </div>
  );
}

// ---- TAB: INTEGRACIONES ----
const integrations = [
  { name: 'Google Workspace', desc: 'Gmail, Calendar y Drive', connected: true, icon: '🔵', color: 'text-blue-500' },
  { name: 'Microsoft 365', desc: 'Outlook, Teams y OneDrive', connected: false, icon: '🟦', color: 'text-blue-600' },
  { name: 'WhatsApp Business', desc: 'Mensajería directa con clientes', connected: true, icon: '🟢', color: 'text-green-500' },
  { name: 'LinkedIn API', desc: 'Prospección y conexiones', connected: false, icon: '🔗', color: 'text-blue-700' },
  { name: 'Salesforce', desc: 'CRM empresarial avanzado', connected: false, icon: '☁️', color: 'text-blue-400' },
  { name: 'SAP', desc: 'ERP y gestión empresarial', connected: false, icon: '🔷', color: 'text-blue-800' },
];

function IntegracionesTab() {
  const [states, setStates] = useState(integrations.map((i) => i.connected));
  const toggle = (idx: number) => setStates((prev) => prev.map((s, i) => (i === idx ? !s : s)));

  return (
    <div className="space-y-6">
      <SectionHeader title="Integraciones" subtitle="Conecta Freight Hunter MX con tus herramientas favoritas" />
      <div className="grid grid-cols-2 gap-4">
        {integrations.map((intg, idx) => (
          <div key={intg.name} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{intg.icon}</span>
                <div>
                  <p className="font-semibold text-gray-800">{intg.name}</p>
                  <p className="text-xs text-gray-500">{intg.desc}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${states[idx] ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {states[idx] ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => toggle(idx)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  states[idx]
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                    : 'text-white hover:opacity-90'
                }`}
                style={states[idx] ? {} : { background: '#1e3a5f' }}
              >
                {states[idx] ? 'Desconectar' : 'Conectar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- TAB: USUARIOS ----
const sampleUsers = [
  { name: 'Juan Arias', email: 'juan.arias@freighthunter.mx', rol: 'Vendedor Senior', active: true },
  { name: 'Ana Rodríguez', email: 'ana.rodriguez@freighthunter.mx', rol: 'Vendedor Junior', active: true },
  { name: 'Luis Torres', email: 'luis.torres@freighthunter.mx', rol: 'Gerente de Ventas', active: true },
  { name: 'María García', email: 'maria.garcia@freighthunter.mx', rol: 'Vendedor Senior', active: false },
  { name: 'Carlos Méndez', email: 'carlos.mendez@freighthunter.mx', rol: 'Administrador', active: true },
];

function UsuariosTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader title="Gestión de Usuarios" subtitle="Administra accesos y roles del equipo" />
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors"
          style={{ background: '#f59e0b', color: '#0f2744' }}
        >
          + Invitar Usuario
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Nombre', 'Email', 'Rol', 'Estado', 'Acciones'].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sampleUsers.map((u, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#1e3a5f' }}>
                      {u.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">{u.rol}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${u.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {u.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors text-xs">Editar</button>
                    <button className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors text-xs">Remover</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ---- TAB: NOTIFICACIONES ----
const notifItems = [
  { label: 'Nuevos prospectos', desc: 'Cuando se agregue un nuevo prospecto al CRM' },
  { label: 'Actualizaciones CRM', desc: 'Cambios de estado en oportunidades' },
  { label: 'Recordatorios de agenda', desc: 'Alertas 30 min antes de tus reuniones' },
  { label: 'Cotizaciones aceptadas', desc: 'Cuando un cliente acepta una propuesta' },
  { label: 'Reportes semanales', desc: 'Resumen de actividad cada lunes' },
];

function NotificacionesTab() {
  const [toggles, setToggles] = useState(notifItems.map(() => true));
  const flip = (i: number) => setToggles((p) => p.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="space-y-6">
      <SectionHeader title="Notificaciones" subtitle="Configura cómo y cuándo recibir alertas" />
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {notifItems.map((item, i) => (
          <div key={i} className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
            <Toggle enabled={toggles[i]} onChange={() => flip(i)} />
          </div>
        ))}
      </div>
      {/* Email notifications */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Notificaciones por Email</h3>
        <div className="space-y-3">
          {['Resumen diario', 'Alertas críticas', 'Newsletter Freight Hunter'].map((label) => (
            <label key={label} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton label="Guardar Preferencias" />
        </div>
      </div>
    </div>
  );
}

// ---- TAB: SEGURIDAD ----
function SeguridadTab() {
  const [twoFactor, setTwoFactor] = useState(false);
  const sessions = [
    { device: 'Chrome · Mac OS', location: 'Monterrey, NL', time: 'Ahora', current: true },
    { device: 'Safari · iPhone', location: 'Monterrey, NL', time: 'Hace 2h', current: false },
    { device: 'Chrome · Windows', location: 'Ciudad de México', time: 'Hace 3 días', current: false },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Seguridad" subtitle="Gestiona tu contraseña y accesos activos" />

      {/* Change password */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Cambiar Contraseña</h3>
        <div className="space-y-3 max-w-sm">
          {[
            { label: 'Contraseña Actual', placeholder: '••••••••' },
            { label: 'Nueva Contraseña', placeholder: '••••••••' },
            { label: 'Confirmar Nueva Contraseña', placeholder: '••••••••' },
          ].map(({ label, placeholder }) => (
            <div key={label}>
              <label className={labelClass}>{label}</label>
              <input type="password" placeholder={placeholder} className={inputClass} />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <SaveButton label="Cambiar Contraseña" />
        </div>
      </div>

      {/* 2FA */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">Autenticación de Dos Factores</h3>
            <p className="text-sm text-gray-500 mt-0.5">Agrega una capa extra de seguridad a tu cuenta</p>
          </div>
          <Toggle enabled={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
        </div>
        {twoFactor && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-medium">2FA activado correctamente</span>
            </div>
          </div>
        )}
      </div>

      {/* Sessions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Sesiones Activas</h3>
          <p className="text-xs text-gray-500 mt-0.5">{sessions.length} dispositivos conectados</p>
        </div>
        <div className="divide-y divide-gray-50">
          {sessions.map((s, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${s.current ? 'bg-green-400' : 'bg-gray-300'}`} />
                <div>
                  <p className="text-sm font-semibold text-gray-800">{s.device}</p>
                  <p className="text-xs text-gray-500">{s.location} · {s.time}</p>
                </div>
              </div>
              {s.current ? (
                <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">Sesión actual</span>
              ) : (
                <button className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                  <X className="w-3 h-3" /> Cerrar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TAB_CONTENT: Record<string, React.ReactNode> = {
  perfil: <PerfilTab />,
  empresa: <EmpresaTab />,
  integraciones: <IntegracionesTab />,
  usuarios: <UsuariosTab />,
  notificaciones: <NotificacionesTab />,
  seguridad: <SeguridadTab />,
};

export default function ConfiguracionPage() {
  const [activeTab, setActiveTab] = useState('perfil');

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <div className="w-60 flex-shrink-0 border-r border-gray-100 py-6" style={{ background: '#0f2744' }}>
        <div className="px-5 mb-6">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Configuración</p>
        </div>
        <nav className="space-y-0.5 px-3">
          {TABS.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  active ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${active ? 'text-yellow-400' : ''}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
        {TAB_CONTENT[activeTab]}
      </div>
    </div>
  );
}
