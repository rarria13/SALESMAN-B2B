'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Map,
  Kanban,
  Calendar,
  FileText,
  BarChart3,
  Bot,
  Settings,
  Truck,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/prospectos', label: 'Prospectos', icon: Users },
  { href: '/mapa', label: 'Mapa', icon: Map },
  { href: '/crm', label: 'CRM Pipeline', icon: Kanban },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
  { href: '/cotizaciones', label: 'Cotizaciones', icon: FileText },
  { href: '/reportes', label: 'Reportes', icon: BarChart3 },
  { href: '/ia-asistente', label: 'IA Asistente', icon: Bot },
  { href: '/configuracion', label: 'Configuración', icon: Settings },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300
          bg-[#0f2744] shadow-xl
          ${collapsed ? 'w-16' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-[#1e3a5f]">
          <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="flex-shrink-0 w-9 h-9 bg-[#f59e0b] rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#0f2744]" />
            </div>
            {!collapsed && (
              <div>
                <p className="text-white font-bold text-sm leading-tight">FREIGHT HUNTER</p>
                <p className="text-[#f59e0b] font-semibold text-xs">MX</p>
              </div>
            )}
          </div>
          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="lg:hidden text-gray-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                title={collapsed ? item.label : undefined}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                  ${isActive
                    ? 'bg-[#f59e0b] text-[#0f2744] font-semibold shadow-md'
                    : 'text-gray-300 hover:bg-[#1e3a5f] hover:text-white'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#0f2744]' : 'text-gray-400 group-hover:text-white'}`} />
                {!collapsed && (
                  <span className="text-sm whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button (desktop only) */}
        <div className="hidden lg:flex px-3 py-4 border-t border-[#1e3a5f]">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full px-3 py-2 rounded-lg hover:bg-[#1e3a5f]"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-sm">Colapsar</span>
              </>
            )}
          </button>
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="px-4 py-3 border-t border-[#1e3a5f]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f59e0b] flex items-center justify-center text-[#0f2744] font-bold text-sm">
                JA
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Juan Arias</p>
                <p className="text-gray-400 text-xs">Vendedor Senior</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
