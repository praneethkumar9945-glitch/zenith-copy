import { useState, ReactNode } from 'react';
import { BookOpen, LogOut, Menu, X, Bell, ChevronDown, ChevronRight } from 'lucide-react';
import { Role, ROLES } from '@/components/governance/data';
import { useApp } from '@/components/governance/context';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  category?: string;
}

interface LayoutProps {
  role: Role;
  navItems: NavItem[];
  activeModule: string;
  onModuleChange: (id: string) => void;
  children: ReactNode;
}

const roleBgGradient = {
  board: 'from-blue-600 to-blue-700',
  chancellors: 'from-cyan-600 to-cyan-700',
};

const roleAccentBg = {
  board: 'bg-blue-600',
  chancellors: 'bg-cyan-600',
};

const roleAccentHover = {
  board: 'hover:bg-blue-700/30',
  chancellors: 'hover:bg-cyan-700/30',
};

const roleActiveText = {
  board: 'text-blue-300',
  chancellors: 'text-cyan-300',
};

export default function Layout({ role, navItems, activeModule, onModuleChange, children }: LayoutProps) {
  const { setRole } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMounted, setSidebarMounted] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const roleInfo = ROLES.find(r => r.id === role)!;
  const activeNav = navItems.find(n => n.id === activeModule);

  const openSidebar = () => {
    setSidebarMounted(true);
    requestAnimationFrame(() => {
      setSidebarOpen(true);
      setSidebarVisible(true);
    });
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarVisible(false);
    setSidebarMounted(false);
  };

  const toggleSidebar = () => {
    if (sidebarVisible || sidebarOpen) {
      closeSidebar();
      return;
    }

    openSidebar();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`bg-gradient-to-br ${roleBgGradient[role]} px-5 py-6`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">VIT College</p>
            <p className="text-white/60 text-xs truncate">Management Portal</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl px-3 py-2.5">
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">{roleInfo.short}</p>
          <p className="text-white font-semibold text-sm leading-tight mt-0.5">{roleInfo.title}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">Navigation</p>
        {navItems.map((item, index) => {
          const isActive = item.id === activeModule;
          return (
            <div key={item.id}>
              {item.category && (index === 0 || item.category !== navItems[index - 1].category) && (
                <p className="text-slate-600 text-[10px] font-semibold uppercase tracking-widest px-3 mt-4 mb-2 first:mt-0">{item.category}</p>
              )}
              <button
                onClick={() => { onModuleChange(item.id); closeSidebar(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 text-left ${
                  isActive
                    ? `${roleAccentBg[role]} text-white shadow-sm`
                    : `text-slate-400 ${roleAccentHover[role]} hover:text-slate-200`
                }`}
              >
                <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>
                <span className="truncate">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto flex-shrink-0" />}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-800">
        <button
          onClick={() => setRole(null)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Switch Role</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 z-40 w-60 flex-col overflow-hidden bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <SidebarContent />
      </aside>

      <div
        className={`hidden lg:block fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-[1px] transition-opacity duration-300 ease-in-out ${sidebarVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSidebar}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarMounted && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className={`absolute inset-0 bg-slate-950/55 transition-opacity duration-300 ease-in-out ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeSidebar}
          />
          <aside
            onTransitionEnd={(event) => {
              if (event.target === event.currentTarget && event.propertyName === 'transform' && !sidebarOpen) setSidebarMounted(false);
            }}
            className={`relative w-64 bg-slate-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <button onClick={closeSidebar} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 h-14 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="text-slate-500 hover:text-slate-800"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-slate-800 font-semibold text-sm truncate">{activeNav?.label || 'Dashboard'}</p>
            <p className={`text-xs font-medium ${roleActiveText[role]}`}>{roleInfo.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className={`w-7 h-7 rounded-full ${roleAccentBg[role]} flex items-center justify-center text-white text-xs font-bold`}>
                  {roleInfo.short.charAt(0)}
                </div>
                <span className="text-slate-700 text-sm font-medium hidden sm:block">{roleInfo.short}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-20">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800">{roleInfo.title}</p>
                    <p className="text-xs text-slate-500">VIT College</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
