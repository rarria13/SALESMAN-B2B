'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User, Sparkles, RefreshCw, Copy, ThumbsUp } from 'lucide-react';

interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: '¡Hola! Soy tu asistente de IA especializado en logística y transporte en México. Puedo ayudarte a redactar correos, analizar prospectos, generar propuestas y mucho más. ¿En qué te puedo ayudar hoy?',
    time: '09:00',
  },
];

const suggestedPrompts = [
  'Genera un correo para el Director de Logística de FEMSA ofreciendo transporte refrigerado Monterrey-CDMX',
  '¿Cuáles son las empresas farmacéuticas más grandes en Guadalajara?',
  'Crea un mensaje de LinkedIn para prospectar a Sigma Alimentos',
  'Analiza el potencial de embarques de Liverpool',
];

const fakeResponses: Record<string, string> = {
  default: 'Entendido. Basándome en los datos de nuestra plataforma, te puedo dar la siguiente información...',
  femsa:
    'Aquí tienes un correo profesional para el Director de Logística de FEMSA:\n\nEstimado [Director],\n\nMe permito contactarle para presentarle nuestra propuesta de servicio de transporte refrigerado en la ruta Monterrey-CDMX.\n\nContamos con unidades refrigeradas de última generación, GPS en tiempo real y un historial de 98% de entregas a tiempo. Nuestras tarifas son competitivas con condiciones de pago flexibles.\n\n¿Podríamos agendar una llamada esta semana?\n\nAtentamente,\nFreight Hunter MX',
  farmaceutica:
    'Las principales empresas farmacéuticas en Guadalajara son:\n1. PISA Farmacéutica (10,000 empleados)\n2. Laboratorios Liomont\n3. Grupo Neolpharma\n4. Chinoin\n5. Laboratorios Senosian\n\nTodas requieren transporte especializado con cadena de frío certificada.',
  linkedin:
    'Aquí un mensaje efectivo para LinkedIn:\n\nHola [Nombre], vi tu perfil y me parece muy interesante tu rol en Sigma Alimentos. En Freight Hunter MX nos especializamos en transporte de alimentos con cadena de frío en todo México. ¿Tienes 15 minutos para conversar sobre cómo podemos optimizar su logística?',
  liverpool:
    'Análisis de Liverpool:\n• Embarques estimados: 340/mes\n• Tipo de carga: Seco/General\n• Zonas: Centro, Occidente, Noreste\n• Score potencial: 85/100\n• Decisor clave: Director de Supply Chain\n• Mejor momento para contactar: Q1 y Q3',
};

const conversations = [
  { id: 1, title: 'Estrategia FEMSA', date: 'Hoy', active: true },
  { id: 2, title: 'Análisis farmacéuticas GDL', date: 'Ayer', active: false },
  { id: 3, title: 'Correos prospección Q1', date: '18 Ene', active: false },
];

function getTime() {
  return new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

function getAIResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('femsa') || lower.includes('refrigerado')) return fakeResponses.femsa;
  if (lower.includes('farmac') || lower.includes('guadalajara')) return fakeResponses.farmaceutica;
  if (lower.includes('linkedin') || lower.includes('sigma')) return fakeResponses.linkedin;
  if (lower.includes('liverpool')) return fakeResponses.liverpool;
  return fakeResponses.default;
}

export default function IAAsistentePage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const hasUserMessages = messages.some((m) => m.role === 'user');

  const sendMessage = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim(), time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        text: getAIResponse(text),
        time: getTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1000);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Left Sidebar */}
      <div className="w-72 flex-shrink-0 border-r border-gray-100 flex flex-col" style={{ background: '#0f2744' }}>
        <div className="p-4 border-b border-blue-900">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h2 className="font-bold text-white">IA Asistente</h2>
          </div>
          <button
            onClick={() => setMessages(initialMessages)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold hover:bg-yellow-500 transition-colors"
            style={{ background: '#f59e0b', color: '#0f2744' }}
          >
            <RefreshCw className="w-4 h-4" />
            Nueva Conversación
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide px-2 mb-2">Conversaciones</p>
          {conversations.map((conv) => (
            <button
              key={conv.id}
              className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                conv.active ? 'bg-blue-800 text-white' : 'text-blue-200 hover:bg-blue-900 hover:text-white'
              }`}
            >
              <p className="text-sm font-medium truncate">{conv.title}</p>
              <p className="text-xs opacity-60 mt-0.5">{conv.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#1e3a5f' }}>
            <Bot className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Asistente IA</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-xs text-gray-500">En línea · Especialista en logística MX</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#1e3a5f' }}>
                  <Bot className="w-4 h-4 text-yellow-400" />
                </div>
              )}
              <div className={`max-w-[70%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                    msg.role === 'assistant'
                      ? 'rounded-tl-sm text-white'
                      : 'rounded-tr-sm'
                  }`}
                  style={
                    msg.role === 'assistant'
                      ? { background: '#1e3a5f' }
                      : { background: '#f59e0b', color: '#0f2744' }
                  }
                >
                  {msg.text}
                </div>
                <div className={`flex items-center gap-2 mt-1 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1">
                      <button className="p-0.5 rounded text-gray-400 hover:text-gray-600 transition-colors" title="Copiar">
                        <Copy className="w-3 h-3" />
                      </button>
                      <button className="p-0.5 rounded text-gray-400 hover:text-green-500 transition-colors" title="Útil">
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-200">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1e3a5f' }}>
                <Bot className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm text-white shadow-sm" style={{ background: '#1e3a5f' }}>
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Suggested Prompts */}
        {!hasUserMessages && (
          <div className="px-6 pb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Sugerencias</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left px-3 py-2.5 rounded-lg border border-gray-200 bg-white hover:border-blue-400 hover:bg-blue-50 transition-colors text-xs text-gray-600 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-yellow-500 inline mr-1.5 flex-shrink-0" />
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white border-t border-gray-100 px-6 py-4">
          <div className="flex items-end gap-3">
            <button className="p-2.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu mensaje... (Enter para enviar)"
                rows={1}
                className="w-full px-4 py-3 pr-4 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none bg-gray-50"
                style={{ maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              style={{ background: '#f59e0b' }}
            >
              <Send className="w-5 h-5" style={{ color: '#0f2744' }} />
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Freight Hunter IA · Especializado en logística y transporte México</p>
        </div>
      </div>
    </div>
  );
}
