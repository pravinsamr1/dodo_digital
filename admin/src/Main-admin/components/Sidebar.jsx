import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  School,
  BookOpen,
  Users,
  Settings,
  Layers3,
  TrendingUp,
  LogOut,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin/dashboard',
  },
  {
    title: 'Schools',
    icon: School,
    path: '/admin/schools',
  },
  {
    title: 'Colleges',
    icon: GraduationCap,
    path: '/admin/colleges',
  },
  {
    title: 'Courses',
    icon: BookOpen,
    path: '/admin/courses',
  },
  {
    title: 'Categories',
    icon: Layers3,
    path: '/admin/categories',
  },
  {
    title: 'Users',
    icon: Users,
    path: '/admin/users',
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/admin/settings',
  },
];

const Sidebar = () => {
  return (
    <aside className="sticky top-0 flex h-screen w-[280px] flex-col border-r border-slate-200 bg-white px-6 py-8">
      {/* Logo */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Dodo Admin
        </h1>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Main administration panel
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col gap-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-4 py-4 transition-all ${
                  isActive
                    ? 'bg-[#125fb9] text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon
                size={20}
                className="transition-transform group-hover:scale-110"
              />

              <span className="text-sm font-semibold">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>


      {/* Logout */}
      <button className="mt-5 flex items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-4 text-sm font-semibold text-red-600 transition-all hover:bg-red-100">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;