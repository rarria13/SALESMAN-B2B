export interface Company {
  id: string;
  name: string;
  commercial: string;
  industry: string;
  size: string;
  state: string;
  city: string;
  employees: number;
  revenue: string;
  score: number;
  status: string;
  lat: number;
  lng: number;
  rfc?: string;
  website?: string;
  address?: string;
  phone?: string;
  email?: string;
  shipmentsPerMonth?: number;
  cargoType?: string;
  distributionZones?: string[];
  contacts?: Contact[];
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin?: string;
}

export interface Quote {
  id: string;
  folio: string;
  company: string;
  origin: string;
  destination: string;
  amount: number;
  status: 'Borrador' | 'Enviada' | 'Aceptada' | 'Rechazada';
  date: string;
}

export interface Activity {
  id: string;
  company: string;
  type: string;
  description: string;
  date: string;
  agent: string;
  status: string;
}

export const companies: Company[] = [
  {
    id: '1',
    name: 'FEMSA',
    commercial: 'FEMSA',
    industry: 'Bebidas',
    size: 'Corporativo',
    state: 'Nuevo León',
    city: 'Monterrey',
    employees: 280000,
    revenue: '500+ MDP',
    score: 95,
    status: 'Contactado',
    lat: 25.6866,
    lng: -100.3161,
    rfc: 'FEM930101AA1',
    website: 'www.femsa.com',
    address: 'Av. FEMSA 555, Monterrey, NL',
    phone: '+52 81 8328 6000',
    email: 'logistica@femsa.com',
    shipmentsPerMonth: 450,
    cargoType: 'Refrigerado / Seco',
    distributionZones: ['Noreste', 'Norte', 'Centro', 'Occidente'],
    contacts: [
      { id: 'c1', name: 'Carlos Rodríguez', role: 'Director de Logística', email: 'c.rodriguez@femsa.com', phone: '+52 81 1234 5678', linkedin: 'linkedin.com/in/carlosrodriguez' },
      { id: 'c2', name: 'Ana Martínez', role: 'Gerente de Compras', email: 'a.martinez@femsa.com', phone: '+52 81 1234 5679' },
    ],
  },
  {
    id: '2',
    name: 'Grupo Bimbo',
    commercial: 'Bimbo',
    industry: 'Alimentos',
    size: 'Corporativo',
    state: 'CDMX',
    city: 'Ciudad de México',
    employees: 150000,
    revenue: '500+ MDP',
    score: 92,
    status: 'Reunión',
    lat: 19.4326,
    lng: -99.1332,
    rfc: 'GBI880714AB3',
    website: 'www.grupobimbo.com',
    address: 'Prolongación Paseo de la Reforma 1000, CDMX',
    phone: '+52 55 5268 6600',
    email: 'supply@grupobimbo.com',
    shipmentsPerMonth: 620,
    cargoType: 'Alimentos Perecederos',
    distributionZones: ['Centro', 'Sur', 'Oriente', 'Occidente'],
    contacts: [
      { id: 'c3', name: 'Luis Torres', role: 'VP Supply Chain', email: 'l.torres@grupobimbo.com', phone: '+52 55 2345 6789' },
      { id: 'c4', name: 'María Sánchez', role: 'Directora de Operaciones', email: 'm.sanchez@grupobimbo.com', phone: '+52 55 2345 6790' },
    ],
  },
  {
    id: '3',
    name: 'Sigma Alimentos',
    commercial: 'Sigma',
    industry: 'Alimentos',
    size: 'Grande',
    state: 'Nuevo León',
    city: 'Monterrey',
    employees: 40000,
    revenue: '500+ MDP',
    score: 88,
    status: 'Cotización',
    lat: 25.6866,
    lng: -100.3161,
    rfc: 'SAL920301BC5',
    website: 'www.sigma-alimentos.com',
    address: 'Galeana 400 Sur, San Pedro Garza García, NL',
    phone: '+52 81 8625 8000',
    email: 'logistica@sigma.com.mx',
    shipmentsPerMonth: 280,
    cargoType: 'Refrigerado / Congelado',
    distributionZones: ['Noreste', 'Norte', 'Centro'],
    contacts: [
      { id: 'c5', name: 'Roberto García', role: 'Director Logística', email: 'r.garcia@sigma.com.mx', phone: '+52 81 3456 7890' },
    ],
  },
  {
    id: '4',
    name: 'Liverpool',
    commercial: 'Liverpool',
    industry: 'Retail',
    size: 'Corporativo',
    state: 'CDMX',
    city: 'Ciudad de México',
    employees: 60000,
    revenue: '500+ MDP',
    score: 85,
    status: 'Nuevo',
    lat: 19.4326,
    lng: -99.1332,
    rfc: 'LIV820915CD7',
    website: 'www.liverpool.com.mx',
    address: 'Venustiano Carranza 92, Centro, CDMX',
    phone: '+52 55 9999 2000',
    email: 'supply.chain@liverpool.com.mx',
    shipmentsPerMonth: 340,
    cargoType: 'Seco / General',
    distributionZones: ['Centro', 'Occidente', 'Noreste'],
    contacts: [
      { id: 'c6', name: 'Patricia Flores', role: 'Gerente Supply Chain', email: 'p.flores@liverpool.com.mx', phone: '+52 55 4567 8901' },
    ],
  },
  {
    id: '5',
    name: 'Soriana',
    commercial: 'Soriana',
    industry: 'Supermercados',
    size: 'Corporativo',
    state: 'Nuevo León',
    city: 'Monterrey',
    employees: 90000,
    revenue: '500+ MDP',
    score: 82,
    status: 'Investigando',
    lat: 25.6866,
    lng: -100.3161,
    rfc: 'SOR780401DE9',
    website: 'www.soriana.com',
    address: 'Alejandro de Rodas 3102, Monterrey, NL',
    phone: '+52 81 8329 0000',
    email: 'logistica@soriana.com',
    shipmentsPerMonth: 510,
    cargoType: 'Mixto / Refrigerado',
    distributionZones: ['Norte', 'Noreste', 'Centro', 'Sur'],
    contacts: [
      { id: 'c7', name: 'Jorge Hernández', role: 'Director de Cadena de Suministro', email: 'j.hernandez@soriana.com', phone: '+52 81 5678 9012' },
    ],
  },
  {
    id: '6',
    name: 'Lala',
    commercial: 'Grupo Lala',
    industry: 'Alimentos',
    size: 'Grande',
    state: 'Durango',
    city: 'Gómez Palacio',
    employees: 23000,
    revenue: '200-500 MDP',
    score: 79,
    status: 'Contactado',
    lat: 25.5581,
    lng: -103.4877,
    rfc: 'GLA900601EF1',
    website: 'www.lala.com.mx',
    address: 'Av. Industria Lechera 100, Gómez Palacio, Dgo',
    phone: '+52 871 710 2200',
    email: 'supply@lala.com.mx',
    shipmentsPerMonth: 180,
    cargoType: 'Refrigerado',
    distributionZones: ['Norte', 'Noreste', 'Occidente'],
    contacts: [
      { id: 'c8', name: 'Sandra López', role: 'Gerente Logística', email: 's.lopez@lala.com.mx', phone: '+52 871 234 5678' },
    ],
  },
  {
    id: '7',
    name: 'Gruma',
    commercial: 'GRUMA',
    industry: 'Alimentos',
    size: 'Corporativo',
    state: 'Nuevo León',
    city: 'Monterrey',
    employees: 20000,
    revenue: '500+ MDP',
    score: 77,
    status: 'Nuevo',
    lat: 25.6866,
    lng: -100.3161,
    rfc: 'GRU870901FG3',
    website: 'www.gruma.com',
    address: 'Río de la Plata 407, Del Valle, San Pedro, NL',
    phone: '+52 81 8399 3300',
    email: 'compras@gruma.com',
    shipmentsPerMonth: 220,
    cargoType: 'Seco / Granel',
    distributionZones: ['Nacional'],
    contacts: [
      { id: 'c9', name: 'Miguel Ángel Ruiz', role: 'Director Compras y Logística', email: 'm.ruiz@gruma.com', phone: '+52 81 6789 0123' },
    ],
  },
  {
    id: '8',
    name: 'Arca Continental',
    commercial: 'Arca',
    industry: 'Bebidas',
    size: 'Corporativo',
    state: 'Nuevo León',
    city: 'Monterrey',
    employees: 45000,
    revenue: '500+ MDP',
    score: 90,
    status: 'Negociación',
    lat: 25.6866,
    lng: -100.3161,
    rfc: 'ACO920101GH5',
    website: 'www.arcacontal.com',
    address: 'Av. Senda Eterna 225, Monterrey, NL',
    phone: '+52 81 1519 6800',
    email: 'logistica@arcacontal.com',
    shipmentsPerMonth: 390,
    cargoType: 'Bebidas / Refrigerado',
    distributionZones: ['Norte', 'Noreste', 'Occidente', 'Sur'],
    contacts: [
      { id: 'c10', name: 'Alejandra Vega', role: 'Directora Distribución', email: 'a.vega@arcacontal.com', phone: '+52 81 7890 1234' },
    ],
  },
  {
    id: '9',
    name: 'Office Depot MX',
    commercial: 'Office Depot',
    industry: 'Retail',
    size: 'Grande',
    state: 'CDMX',
    city: 'Ciudad de México',
    employees: 5000,
    revenue: '200-500 MDP',
    score: 65,
    status: 'Nuevo',
    lat: 19.4326,
    lng: -99.1332,
    rfc: 'ODM950201HI7',
    website: 'www.officedepot.com.mx',
    address: 'Periferico Sur 4349, CDMX',
    phone: '+52 55 5688 0800',
    email: 'supply@officedepot.com.mx',
    shipmentsPerMonth: 95,
    cargoType: 'Seco / General',
    distributionZones: ['Centro', 'Noreste'],
    contacts: [
      { id: 'c11', name: 'Fernando Castillo', role: 'Gerente de Compras', email: 'f.castillo@officedepot.com.mx', phone: '+52 55 8901 2345' },
    ],
  },
  {
    id: '10',
    name: 'Pisa Farmacéutica',
    commercial: 'PISA',
    industry: 'Farmacéutica',
    size: 'Grande',
    state: 'Jalisco',
    city: 'Guadalajara',
    employees: 10000,
    revenue: '200-500 MDP',
    score: 72,
    status: 'Contactado',
    lat: 20.6597,
    lng: -103.3496,
    rfc: 'PFA850301IJ9',
    website: 'www.pisa.com.mx',
    address: 'Av. del Pinar 2723, Guadalajara, Jal',
    phone: '+52 33 3678 1800',
    email: 'logistica@pisa.com.mx',
    shipmentsPerMonth: 120,
    cargoType: 'Farmacéutico / Controlado',
    distributionZones: ['Occidente', 'Centro', 'Norte'],
    contacts: [
      { id: 'c12', name: 'Claudia Morales', role: 'Directora de Distribución', email: 'c.morales@pisa.com.mx', phone: '+52 33 9012 3456' },
    ],
  },
  {
    id: '11',
    name: 'Chedraui',
    commercial: 'Chedraui',
    industry: 'Supermercados',
    size: 'Corporativo',
    state: 'Veracruz',
    city: 'Xalapa',
    employees: 55000,
    revenue: '500+ MDP',
    score: 81,
    status: 'Investigando',
    lat: 19.5438,
    lng: -96.9102,
    rfc: 'CHE780101JK1',
    website: 'www.chedraui.com.mx',
    address: 'Av. Manuel Ávila Camacho 2535, Xalapa, Ver',
    phone: '+52 228 812 1100',
    email: 'logistica@chedraui.com.mx',
    shipmentsPerMonth: 320,
    cargoType: 'Mixto',
    distributionZones: ['Sur', 'Oriente', 'Centro'],
    contacts: [
      { id: 'c13', name: 'Ernesto Núñez', role: 'VP Logística', email: 'e.nunez@chedraui.com.mx', phone: '+52 228 012 3456' },
    ],
  },
  {
    id: '12',
    name: 'Vitro',
    commercial: 'Vitro',
    industry: 'Manufactura',
    size: 'Grande',
    state: 'Nuevo León',
    city: 'San Pedro Garza García',
    employees: 18000,
    revenue: '200-500 MDP',
    score: 74,
    status: 'Nuevo',
    lat: 25.6585,
    lng: -100.4026,
    rfc: 'VIT620101KL3',
    website: 'www.vitro.com',
    address: 'Av. Ricardo Margáin Zozaya 400, San Pedro, NL',
    phone: '+52 81 8863 1200',
    email: 'compras@vitro.com',
    shipmentsPerMonth: 145,
    cargoType: 'Vidrio / Especializado',
    distributionZones: ['Norte', 'Noreste', 'Centro'],
    contacts: [
      { id: 'c14', name: 'Héctor Ramírez', role: 'Gerente Logística', email: 'h.ramirez@vitro.com', phone: '+52 81 1234 9876' },
    ],
  },
  {
    id: '13',
    name: 'Cemex',
    commercial: 'CEMEX',
    industry: 'Construcción',
    size: 'Corporativo',
    state: 'Nuevo León',
    city: 'San Pedro Garza García',
    employees: 45000,
    revenue: '500+ MDP',
    score: 87,
    status: 'Reunión',
    lat: 25.6585,
    lng: -100.4026,
    rfc: 'CEM930101LM5',
    website: 'www.cemex.com',
    address: 'Av. Ricardo Margáin Zozaya 325, San Pedro, NL',
    phone: '+52 81 8888 8888',
    email: 'supply@cemex.com',
    shipmentsPerMonth: 870,
    cargoType: 'Granel / Pesado',
    distributionZones: ['Nacional', 'Internacional'],
    contacts: [
      { id: 'c15', name: 'Isabel Guerrero', role: 'Directora Supply Chain', email: 'i.guerrero@cemex.com', phone: '+52 81 2345 0987' },
    ],
  },
  {
    id: '14',
    name: 'Grupo Herdez',
    commercial: 'Herdez',
    industry: 'Alimentos',
    size: 'Grande',
    state: 'CDMX',
    city: 'Ciudad de México',
    employees: 8500,
    revenue: '200-500 MDP',
    score: 76,
    status: 'Contactado',
    lat: 19.4326,
    lng: -99.1332,
    rfc: 'GHE820301MN7',
    website: 'www.herdez.com.mx',
    address: 'Xola 24, Del Valle, CDMX',
    phone: '+52 55 5628 1000',
    email: 'logistica@herdez.com.mx',
    shipmentsPerMonth: 160,
    cargoType: 'Alimentos / Seco',
    distributionZones: ['Centro', 'Sur', 'Oriente'],
    contacts: [
      { id: 'c16', name: 'Ricardo Jiménez', role: 'Gerente Distribución', email: 'r.jimenez@herdez.com.mx', phone: '+52 55 3456 1098' },
    ],
  },
  {
    id: '15',
    name: 'Bachoco',
    commercial: 'Bachoco',
    industry: 'Alimentos',
    size: 'Corporativo',
    state: 'Sonora',
    city: 'Hermosillo',
    employees: 32000,
    revenue: '500+ MDP',
    score: 84,
    status: 'Investigando',
    lat: 29.0729,
    lng: -110.9559,
    rfc: 'BAC690101NO9',
    website: 'www.bachoco.com.mx',
    address: 'Blvd. Luis Encinas 49, Hermosillo, Son',
    phone: '+52 662 259 0200',
    email: 'supply@bachoco.com.mx',
    shipmentsPerMonth: 240,
    cargoType: 'Refrigerado / Aves',
    distributionZones: ['Noroeste', 'Norte', 'Nacional'],
    contacts: [
      { id: 'c17', name: 'Diana Palomino', role: 'Directora Logística', email: 'd.palomino@bachoco.com.mx', phone: '+52 662 456 2109' },
    ],
  },
];

export const quotes: Quote[] = [
  { id: 'q1', folio: 'COT-2024-001', company: 'FEMSA', origin: 'Monterrey, NL', destination: 'Ciudad de México', amount: 85000, status: 'Aceptada', date: '2024-01-15' },
  { id: 'q2', folio: 'COT-2024-002', company: 'Grupo Bimbo', origin: 'CDMX', destination: 'Guadalajara, Jal', amount: 62000, status: 'Enviada', date: '2024-01-18' },
  { id: 'q3', folio: 'COT-2024-003', company: 'Sigma Alimentos', origin: 'Monterrey, NL', destination: 'Querétaro, Qro', amount: 48000, status: 'Borrador', date: '2024-01-20' },
  { id: 'q4', folio: 'COT-2024-004', company: 'Arca Continental', origin: 'Monterrey, NL', destination: 'Tijuana, BC', amount: 145000, status: 'Negociación' as 'Enviada', date: '2024-01-22' },
  { id: 'q5', folio: 'COT-2024-005', company: 'Liverpool', origin: 'CDMX', destination: 'Monterrey, NL', amount: 78000, status: 'Rechazada', date: '2024-01-10' },
  { id: 'q6', folio: 'COT-2024-006', company: 'Soriana', origin: 'Monterrey, NL', destination: 'Puebla, Pue', amount: 56000, status: 'Aceptada', date: '2024-01-25' },
  { id: 'q7', folio: 'COT-2024-007', company: 'PISA Farmacéutica', origin: 'Guadalajara, Jal', destination: 'CDMX', amount: 38000, status: 'Enviada', date: '2024-01-28' },
  { id: 'q8', folio: 'COT-2024-008', company: 'Cemex', origin: 'Monterrey, NL', destination: 'Mérida, Yuc', amount: 195000, status: 'Borrador', date: '2024-01-30' },
];

export const recentActivity: Activity[] = [
  { id: 'a1', company: 'FEMSA', type: 'Llamada', description: 'Llamada de seguimiento con Director de Logística', date: '2024-01-30', agent: 'Carlos M.', status: 'Completado' },
  { id: 'a2', company: 'Grupo Bimbo', type: 'Reunión', description: 'Presentación de propuesta de transporte refrigerado', date: '2024-01-29', agent: 'Ana R.', status: 'Pendiente' },
  { id: 'a3', company: 'Sigma Alimentos', type: 'Email', description: 'Envío de cotización COT-2024-003', date: '2024-01-29', agent: 'Luis T.', status: 'Completado' },
  { id: 'a4', company: 'Arca Continental', type: 'Negociación', description: 'Mesa de negociación tarifas anuales', date: '2024-01-28', agent: 'Carlos M.', status: 'En progreso' },
  { id: 'a5', company: 'Liverpool', type: 'Email', description: 'Seguimiento rechazo de cotización', date: '2024-01-27', agent: 'Ana R.', status: 'Completado' },
  { id: 'a6', company: 'Cemex', type: 'Reunión', description: 'Visita a planta para levantamiento de necesidades', date: '2024-01-26', agent: 'Luis T.', status: 'Completado' },
];

export const crmColumns = [
  { id: 'nuevo', label: 'Nuevo', color: 'bg-gray-500' },
  { id: 'investigando', label: 'Investigando', color: 'bg-blue-500' },
  { id: 'contactado', label: 'Contactado', color: 'bg-yellow-500' },
  { id: 'reunion', label: 'Reunión', color: 'bg-orange-500' },
  { id: 'cotizacion', label: 'Cotización', color: 'bg-purple-500' },
  { id: 'negociacion', label: 'Negociación', color: 'bg-red-500' },
  { id: 'ganado', label: 'Ganado', color: 'bg-green-500' },
  { id: 'perdido', label: 'Perdido', color: 'bg-gray-700' },
];

export const statusToColumn: Record<string, string> = {
  'Nuevo': 'nuevo',
  'Investigando': 'investigando',
  'Contactado': 'contactado',
  'Reunión': 'reunion',
  'Cotización': 'cotizacion',
  'Negociación': 'negociacion',
  'Ganado': 'ganado',
  'Perdido': 'perdido',
};
