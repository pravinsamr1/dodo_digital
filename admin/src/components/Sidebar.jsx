import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  LayoutDashboard,
  School,
  GraduationCap,
  BookOpen, 
  Globe, 
  Laptop, 
  Settings,
  LogOut,
  Zap,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: School, label: 'All Schools', path: '/all-schools' },
  { icon: PlusCircle, label: 'Add School', path: '/add-school' },
  { icon: ShieldCheck, label: 'Add School Admin', path: '/add-school-admin' },
];

const Sidebar = () => {
  return (
    <div className="sidebar w-55 bg-slate-900 text-slate-400 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-900/40">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <span className="text-white font-black text-base tracking-tight">Dodo</span>
            <span className="text-indigo-400 font-black text-base"> Admin</span>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 font-medium pl-11">Portal Management</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-3 py-2 mb-1">Navigation</p>
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 font-medium
              ${isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
            `}
          >
            <item.icon size={17} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-5 border-t border-slate-800 mb-3" />

      {/* User Profile */}
      <div className="px-3 pb-5 space-y-0.5">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-all text-sm font-medium">
          <Settings size={17} />
          <span>Settings</span>
        </button>
        <button 
          onClick={() => {
            Cookies.remove('admin_token');
            window.location.reload();
          }}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-slate-400 hover:bg-red-900/30 hover:text-red-400 rounded-xl transition-all text-sm font-medium"
        >
          <LogOut size={17} />
          <span>Logout</span>
        </button>

        {/* Profile Card */}
        <div className="mt-3 flex items-center gap-3 p-3 bg-slate-800/60 rounded-xl">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-black shadow-md shrink-0">
            PS
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-black text-white truncate">Pravin Sam</p>
            <p className="text-[10px] text-slate-500 truncate">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
