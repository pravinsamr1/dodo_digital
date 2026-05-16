import React, { useEffect, useState } from 'react';
import { MapPin, Star, ChevronDown } from 'lucide-react';

const CollegeLocationSection = () => {
  const [userCoords, setUserCoords] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });

  const colleges = [
    {
      id: 1,
      name: "Loyola College",
      location: "Chennai, India",
      rating: 4.8,
      type: "Arts & Science",
      courses: "UG - PG",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=600",
      latitude: 13.0620,
      longitude: 80.2345
    },
    {
      id: 2,
      name: "Madras Christian College",
      location: "Tambaram, Chennai",
      rating: 4.9,
      type: "Autonomous",
      courses: "UG - PG",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600",
      latitude: 12.9216,
      longitude: 80.1214
    },
    {
      id: 3,
      name: "SRM Institute of Science",
      location: "Kattankulathur, Chennai",
      rating: 4.7,
      type: "Engineering",
      courses: "UG - PhD",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600",
      latitude: 12.8230,
      longitude: 80.0444
    },
    {
      id: 4,
      name: "Stella Maris College",
      location: "Teynampet, Chennai",
      rating: 4.6,
      type: "Women's College",
      courses: "UG - PG",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600",
      latitude: 13.0446,
      longitude: 80.2534
    }
  ];

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setUserCoords({
          latitude: 13.0827,
          longitude: 80.2707,
        });
      }
    );
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(1);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with View All Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-2xl font-[500] text-slate-900 mb-3 md:font-[500]">
              Top Colleges Near You
            </h2>
            <p className="text-slate-500 font-medium">
              Explore the highest-rated educational institutions in your current location.
            </p>
          </div>
          
          <div className="relative group w-fit">
            <button className="flex items-center gap-2 px-5 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all duration-300 border border-indigo-100">
              Filter By
              <ChevronDown size={18} className="transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div className="absolute right-0 top-full mt-3 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <button className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Engineering
              </button>

              <button className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100">
                Arts & Science
              </button>

              <button className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100">
                All Colleges
              </button>
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {colleges.map((college) => {
            const distance = calculateDistance(
              userCoords.latitude,
              userCoords.longitude,
              college.latitude,
              college.longitude
            );
            return (
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

                    <div className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full whitespace-nowrap">
                      {distance} km
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      {college.courses}
                    </span>
                  </div>
                </div>

                <h4 className="text-[16px] font-[500] text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {college.name}
                </h4>
                
                <div className="flex items-center justify-between text-slate-500 mb-6">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <MapPin size={14} className="shrink-0" />
                    <span className="text-sm truncate">{college.location}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-[#a0083d] text-white font-[500] text-sm rounded-xl hover:bg-[#8a0734] transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default CollegeLocationSection;
