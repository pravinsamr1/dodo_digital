import React from 'react';
import {
  GraduationCap,
  School,
  BookOpen,
  Users,
  Bell,
  Search,
  ArrowUpRight,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const stats = [
  {
    title: 'Total Schools',
    value: '1,245',
    icon: School,
    growth: '+12%',
  },
  {
    title: 'Total Colleges',
    value: '842',
    icon: GraduationCap,
    growth: '+8%',
  },
  {
    title: 'Online Courses',
    value: '2,148',
    icon: BookOpen,
    growth: '+18%',
  },
  {
    title: 'Active Users',
    value: '28.4K',
    icon: Users,
    growth: '+22%',
  },
];

const recentActivities = [
  {
    title: 'New school added',
    subtitle: 'Velammal International School',
    time: '2 mins ago',
  },
  {
    title: 'New college enquiry',
    subtitle: 'SRM University',
    time: '15 mins ago',
  },
  {
    title: 'Course updated',
    subtitle: 'Full Stack Development',
    time: '1 hour ago',
  },
  {
    title: 'New user registered',
    subtitle: 'Student account created',
    time: '3 hours ago',
  },
];

const Dashboard = () => {
  return (
    <div className="flex-1 px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Monitor schools, colleges, courses and platform analytics.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search dashboard..."
              className="h-12 rounded-2xl border border-slate-200 bg-white pl-12 pr-5 text-sm font-medium outline-none transition-all focus:border-[#125fb9] focus:ring-4 focus:ring-[#125fb9]/10"
            />
          </div>

          <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
            <Bell size={20} className="text-slate-700" />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-[30px] bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-4 text-4xl font-black text-slate-900">
                    {item.value}
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#125fb9]/10 text-[#125fb9]">
                  <Icon size={28} />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <ArrowUpRight size={16} />
                {item.growth} this month
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard Grid */}
      <div className="mt-8 grid gap-8 xl:grid-cols-[1.5fr_0.8fr]">
        {/* Analytics Section */}
        <div className="rounded-[32px] bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Frontend Platform Summary
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-500">
                Overview of frontend homepage content and platform growth.
              </p>
            </div>

            <div className="rounded-2xl bg-[#125fb9]/10 px-4 py-2 text-sm font-semibold text-[#125fb9]">
              Live Data
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M3 18h18M3 6h18" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Featured Institutions
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Trending schools & colleges
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-700">
                    DAV Public School
                  </span>

                  <span className="text-sm font-semibold text-[#125fb9]">
                    CBSE
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="font-semibold text-slate-700">
                    Loyola College
                  </span>

                  <span className="text-sm font-semibold text-[#125fb9]">
                    Arts & Science
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <BookOpen size={28} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Popular Courses
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Most viewed online programs
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <h4 className="font-bold text-slate-800">
                    Full Stack Development
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    1,245 enrolled students
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <h4 className="font-bold text-slate-800">
                    Digital Marketing
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    864 enrolled students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-[32px] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">
            Recent Activities
          </h2>

          <div className="mt-8 space-y-5">
            {recentActivities.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 p-5 transition-all hover:border-[#125fb9]/30"
              >
                <h3 className="font-bold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {item.subtitle}
                </p>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#125fb9]">
                  {item.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;