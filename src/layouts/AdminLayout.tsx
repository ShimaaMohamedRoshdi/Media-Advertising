import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  MapPin,
  FileText,
  Globe,
  Menu,
  X,
  Database,
  ChevronRight,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { Badge } from '../components/ui/Badge';
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import logoImg from '../assets/Logo.jpg';

export const AdminLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('aldar_admin_auth') === 'true';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('aldar_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Manage Projects', path: '/admin/projects', icon: <FolderKanban className="w-4 h-4" /> },
    { name: 'Manage Locations', path: '/admin/locations', icon: <MapPin className="w-4 h-4" /> },
    { name: 'Quotation Requests', path: '/admin/quotations', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain rounded-md" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="p-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 flex items-center gap-1"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 rounded-lg bg-slate-100 border border-slate-200"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 transform shadow-sm ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-200">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImg} alt="Aldar Media Logo" className="h-12 w-auto object-contain rounded-lg" />
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-4 flex flex-col gap-1.5">
            <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Content Management
            </div>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-200 flex flex-col gap-3">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Database</span>
              </span>
              <Badge variant={isSupabaseConfigured ? 'emerald' : 'gold'} size="sm">
                {isSupabaseConfigured ? 'Connected' : 'Demo Sync'}
              </Badge>
            </div>
            <p className="text-[10px] text-slate-500 leading-tight font-medium">
              {isSupabaseConfigured
                ? 'Supabase cloud database connected'
                : 'Local dev fallback active'}
            </p>
          </div>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-blue-700" />
            <span>Return to Live Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-red-700 hover:bg-red-50 bg-white border border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
              {navItems.find((n) => n.path === location.pathname)?.name || 'Admin Console'}
            </h1>
            <Badge variant="emerald" size="sm" className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Authenticated Admin</span>
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <span>Sheikh Zayed Road Boulevard Zone CMS</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
