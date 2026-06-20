'use client';
import { useState } from 'react';
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, Phone, Users, Bell, CheckSquare } from 'lucide-react';

const events = [
  { id: 1, date: 15, title: 'Reunión FEMSA', type: 'Reunión', time: '10:00', company: 'FEMSA' },
  { id: 2, date: 17, title: 'Llamada Bimbo', type: 'Llamada', time: '14:30', company: 'Grupo Bimbo' },
  { id: 3, date: 20, title: 'Presentación Sigma', type: 'Reunión', time: '09:00', company: 'Sigma Alimentos' },
  { id: 4, date: 22, title: 'Follow-up Liverpool', type: 'Recordatorio', time: '11:00', company: 'Liverpool' },
  { id: 5, date: 25, title: 'Negociación Arca', type: 'Reunión', time: '16:00', company: 'Arca Continental' },
  { id: 6, date: 28, title: 'Demo Soriana', type: 'Llamada', time: '10:00', company: 'Soriana' },
  { id: 7, date: 10, title: 'Cotización Cemex', type: 'Tarea', time: 'Todo el día', company: 'Cemex' },
  { id: 8, date: 5, title: 'Visita PISA', type: 'Reunión', time: '09:30', company: 'PISA' },
];

const eventTypeColors: Record<string, string> = {
  'Reunión': 'bg-blue-500 text-white',
  'Llamada': 'bg-green-500 text-white',
  'Recordatorio': 'bg-yellow-500 text-white',
  'Tarea': 'bg-gray-500 text-white',
};

const eventTypeDot: Record<string, string> = {
  'Reunión': 'bg-blue-500',
  'Llamada': 'bg-green-500',
  'Recordatorio': 'bg-yellow-500',
  'Tarea': 'bg-gray-500',
};

const eventTypeIcon: Record<string, React.ReactNode> = {
  'Reunión': <Users className="w-3.5 h-3.5" />,
  'Llamada': <Phone className="w-3.5 h-3.5" />,
  'Recordatorio': <Bell className="w-3.5 h-3.5" />,
  'Tarea': <CheckSquare className="w-3.5 h-3.5" />,
};

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

// January 2024 starts on Monday (day index 0)
const MONTH_NAME = 'Enero 2024';
const FIRST_DAY_OF_WEEK = 0; // Monday
const DAYS_IN_MONTH = 31;

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Build calendar grid: 6 rows x 7 cols
  const cells: (number | null)[] = [];
  for (let i = 0; i < FIRST_DAY_OF_WEEK; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const getEventsForDay = (day: number) => events.filter((e) => e.date === day);

  const upcomingEvents = [...events].sort((a, b) => a.date - b.date);

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 p-4">
      {/* Main Calendar */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
            <p className="text-sm text-gray-500">Gestiona tus reuniones y actividades</p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors hover:bg-yellow-500"
            style={{ background: '#f59e0b', color: '#0f2744' }}
          >
            <Plus className="w-4 h-4" />
            Agregar Evento
          </button>
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          {/* Month Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100" style={{ background: '#1e3a5f' }}>
            <button className="p-1.5 rounded-lg hover:bg-blue-800 text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <h2 className="text-lg font-bold text-white">{MONTH_NAME}</h2>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-blue-800 text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {DAYS.map((day) => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="flex-1 grid grid-cols-7" style={{ gridAutoRows: '1fr' }}>
            {cells.map((day, idx) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              const isSelected = day === selectedDate;
              const isToday = false; // Static month
              return (
                <div
                  key={idx}
                  onClick={() => day && setSelectedDate(day === selectedDate ? null : day)}
                  className={`border-r border-b border-gray-50 p-1.5 cursor-pointer transition-colors min-h-[80px] ${
                    day ? 'hover:bg-blue-50' : 'bg-gray-50/30'
                  } ${isSelected ? 'bg-blue-50 ring-2 ring-inset ring-blue-400' : ''}`}
                >
                  {day && (
                    <>
                      <span
                        className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-semibold mb-1 ${
                          isToday
                            ? 'text-white'
                            : 'text-gray-700'
                        }`}
                        style={isToday ? { background: '#f59e0b' } : {}}
                      >
                        {day}
                      </span>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((evt) => (
                          <div
                            key={evt.id}
                            className={`text-xs px-1 py-0.5 rounded truncate font-medium ${eventTypeColors[evt.type]}`}
                            title={evt.title}
                          >
                            {evt.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-400 px-1">+{dayEvents.length - 2} más</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 flex-shrink-0 flex flex-col gap-4">
        {/* Selected Day Events */}
        {selectedDate && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100" style={{ background: '#1e3a5f' }}>
              <h3 className="font-bold text-white text-sm">Día {selectedDate} de Enero</h3>
            </div>
            <div className="p-3 space-y-2">
              {getEventsForDay(selectedDate).length > 0 ? (
                getEventsForDay(selectedDate).map((evt) => (
                  <div key={evt.id} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50">
                    <span className={`mt-0.5 p-1 rounded-md text-white ${eventTypeColors[evt.type]}`}>
                      {eventTypeIcon[evt.type]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{evt.title}</p>
                      <p className="text-xs text-gray-500">{evt.company}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{evt.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">Sin eventos</p>
              )}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-100" style={{ background: '#1e3a5f' }}>
            <h3 className="font-bold text-white text-sm">Próximos Eventos</h3>
            <p className="text-xs text-blue-200 mt-0.5">{events.length} eventos en Enero</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedDate(evt.date)}
              >
                <div className="flex items-start gap-2">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${eventTypeDot[evt.type]}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{evt.title}</p>
                    <p className="text-xs text-gray-500">{evt.company}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">Ene {evt.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">{evt.time}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${eventTypeColors[evt.type]}`}>
                    {evt.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tipos de Evento</p>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.entries(eventTypeDot).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                <span className="text-xs text-gray-600">{type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
