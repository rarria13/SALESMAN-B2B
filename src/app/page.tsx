'use client';

import { useState } from 'react';
import { Truck, CheckCircle, Mail, Lock, Eye, EyeOff, ArrowRight, Globe, Shield, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/dashboard';
  };

  const features = [
    { icon: Globe, text: 'Base de datos de +50,000 empresas mexicanas' },
    { icon: TrendingUp, text: 'Análisis predictivo de oportunidades' },
    { icon: Shield, text: 'CRM especializado en logística y transporte' },
    { icon: Zap, text: 'IA para generar correos y propuestas al instante' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0f2744] via-[#1e3a5f] to-[#0f2744] flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e0b]/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f59e0b]/5 rounded-full translate-y-48 -translate-x-24"></div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#f59e0b] rounded-xl flex items-center justify-center shadow-lg">
              <Truck className="w-7 h-7 text-[#0f2744]" />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl leading-none">FREIGHT HUNTER</h1>
              <p className="text-[#f59e0b] font-bold text-lg leading-none">MX</p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            La plataforma{' '}
            <span className="text-[#f59e0b]">#1</span>
            {' '}para prospectar clientes de transporte en México
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Conecta con los directores de logística de las empresas más importantes del país. Cierra más contratos, más rápido.
          </p>

          <div className="space-y-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#f59e0b]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <span className="text-gray-200 text-sm">{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
          <div>
            <p className="text-[#f59e0b] font-bold text-2xl">50K+</p>
            <p className="text-gray-400 text-xs">Empresas en BD</p>
          </div>
          <div>
            <p className="text-[#f59e0b] font-bold text-2xl">93%</p>
            <p className="text-gray-400 text-xs">Tasa de contacto</p>
          </div>
          <div>
            <p className="text-[#f59e0b] font-bold text-2xl">3.2x</p>
            <p className="text-gray-400 text-xs">Más cierres</p>
          </div>
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-[#0f2744] rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#f59e0b]" />
            </div>
            <div>
              <p className="font-bold text-[#0f2744] leading-none">FREIGHT HUNTER MX</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido de vuelta</h2>
          <p className="text-gray-500 mb-8">Inicia sesión en tu cuenta</p>

          {/* Social login buttons */}
          <div className="space-y-3 mb-6">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-3 w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar con Google
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-[#0078D4] rounded-xl text-sm font-semibold text-white hover:bg-[#006CBF] transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M11.5 2v9.5H2V2h9.5zm1 0H22v9.5h-9.5V2zm-1 10.5V22H2v-9.5h9.5zm1 0H22V22h-9.5v-9.5z" />
              </svg>
              Continuar con Microsoft
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-black rounded-xl text-sm font-semibold text-white hover:bg-gray-900 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continuar con Apple
            </Link>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-400">o ingresa con email</span>
            </div>
          </div>

          {/* Email/password form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juan@empresa.com"
                  className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl w-full text-sm focus:outline-none focus:border-[#1e3a5f] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl w-full text-sm focus:outline-none focus:border-[#1e3a5f] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-[#1e3a5f] hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2744] font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              Iniciar Sesión
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿No tienes cuenta?{' '}
            <a href="#" className="text-[#1e3a5f] font-semibold hover:underline">
              Solicitar demo
            </a>
          </p>

          <div className="mt-8 flex items-center gap-2 text-xs text-gray-400 justify-center">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            <span>Datos protegidos con cifrado SSL de 256 bits</span>
          </div>
        </div>
      </div>
    </div>
  );
}
