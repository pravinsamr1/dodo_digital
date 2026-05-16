import React, { useState } from 'react';
import { Star, Clock, Users, ChevronDown } from 'lucide-react';

const HomeOnlineCourse = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const courses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      category: 'Development',
      rating: 4.9,
      students: '12k+',
      duration: '6 Months',
      level: 'Beginner',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass',
      category: 'Design',
      rating: 4.8,
      students: '8k+',
      duration: '4 Months',
      level: 'Intermediate',
      image:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Digital Marketing Bootcamp',
      category: 'Marketing',
      rating: 4.7,
      students: '10k+',
      duration: '3 Months',
      level: 'Advanced',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Python & AI Fundamentals',
      category: 'Programming',
      rating: 4.9,
      students: '15k+',
      duration: '5 Months',
      level: 'Beginner',
      image:
        'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-3">
              Online Learning
            </p>

            <h2 className="text-3xl md:text-3xl font-medium text-slate-900 leading-tight mb-4">
              Explore Popular Online Courses
            </h2>

            <p className="text-slate-500 max-w-2xl text-base md:text-lg leading-relaxed">
              Upgrade your skills with industry-leading online courses designed by experts.
            </p>
          </div>

          <div className="relative w-fit">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all duration-300 shadow-sm"
            >
              All Categories
              <ChevronDown size={18} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute right-0 top-full mt-3 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl transition-all duration-300 z-50 overflow-hidden ${isFilterOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <button onClick={() => setIsFilterOpen(false)} className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Development
              </button>

              <button onClick={() => setIsFilterOpen(false)} className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100">
                Design
              </button>

              <button onClick={() => setIsFilterOpen(false)} className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100">
                Marketing
              </button>
            </div>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden h-56">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-4 py-2 rounded-full">
                  {course.level}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                    {course.category}
                  </span>

                  <div className="flex items-center gap-1 text-yellow-500 text-sm font-bold">
                    <Star size={16} fill="currentColor" />
                    {course.rating}
                  </div>
                </div>

                <h3 className="text-[16px] font-[500] text-slate-900 mb-5 leading-snug group-hover:text-indigo-600 transition-colors duration-300">
                  {course.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                    <Users size={16} />
                    <span>{course.students} Students</span>
                  </div>
                </div>

                <button className="w-full py-3 rounded-2xl bg-[#a0083d] text-white font-[500] hover:bg-[#850632] transition-all duration-300">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeOnlineCourse;
