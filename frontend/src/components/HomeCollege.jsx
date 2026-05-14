import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';

const CollegeLocationSection = () => {
  const College = [
    {
      id: 1,
      name: "St. Xavier's International",
      location: "Upper East Side, NY",
      rating: 4.8,
      type: "Boarding",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      name: "Greenwood High School",
      location: "Austin, Texas",
      rating: 4.9,
      type: "Day School",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      name: "Oakridge Junior College",
      location: "San Francisco, CA",
      rating: 4.7,
      type: "Junior College",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 4,
      name: "Loyola College",
      location: "Chennai, India",
      rating: 4.6,
      type: "Arts & Science",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with View All Button */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 font-medium">
              Top Colleges Near You
            </h2>
            <p className="text-slate-500 font-medium">
              Explore the highest-rated educational institutions in your current location.
            </p>
          </div>
          
          <button className="group flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            View All Colleges
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {College.map((college) => (
            <div 
              key={college.id} 
              className="group cursor-pointer bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={college.image} 
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-sm">
                    {college.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-slate-700">{college.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <MapPin size={14} />
                    <span className="text-xs font-medium">{college.location.split(',')[1]}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {college.name}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-500 mb-6">
                  <MapPin size={14} className="shrink-0" />
                  <span className="text-sm truncate">{college.location}</span>
                </div>

                <button className="w-full py-3 bg-[#a0083d] text-white font-bold text-sm rounded-xl hover:bg-[#8a0734] transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeLocationSection;