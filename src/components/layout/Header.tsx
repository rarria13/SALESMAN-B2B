'use client';

import { Bell, Search, Menu, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onMobileMenuOpen: () => void;
}

export default function Header({ onMobileMenuOpen }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Left: hamburger (mobile) + search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative hidden sm:flex items-center w-full max-w-md">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar empresas, contactos, cotizaciones..."
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white font-bold text-sm">
              JA
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-gray-800">Juan Arias</p>
              <p className="text-xs text-gray-500">Vendedor Senior</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
                <Link href="/configuracion" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mi Perfil</Link>
                <Link href="/configuracion" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Configuración</Link>
                <div className="border-t border-gray-100 my-1" />
                <Link href="/" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">Cerrar Sesión</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
