import React, { useEffect, useState } from 'react';
import { MapPin, Star, ChevronDown } from 'lucide-react';

const SchoolLocationSection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userCoords, setUserCoords] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
  });

  const schools = [
    {
      id: 1,
      name: "St. Xavier's International",
      location: "Upper East Side, NY",
      rating: 4.8,
      type: "CBSE",
      classes: "Pre - 12",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
      ,
      latitude: 13.0878,
      longitude: 80.2785
    },
    {
      id: 2,
      name: "Greenwood High School",
      location: "Austin, Texas",
      rating: 4.9,
      type: "Matriculation",
      classes: "Pre - 10",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
      ,
      latitude: 13.0500,
      longitude: 80.2121
    },
    {
      id: 3,
      name: "Oakridge Junior College",
      location: "San Francisco, CA",
      rating: 4.7,
      type: "CBSE",
      classes: "Pre - 5",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
      ,
      latitude: 13.0330,
      longitude: 80.2456
    },
    {
      id: 4,
      name: "Delhi Public School",
      location: "Chennai, India",
      rating: 4.6,
      type: "Matriculation",
      classes: "Pre - 12",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600"
      ,
      latitude: 13.1067,
      longitude: 80.2206
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
              Schools Near You
            </h2>
            <p className="text-slate-500 font-medium">
              Explore the highest-rated educational institutions in your current location.
            </p>
          </div>
          
          <div className="relative w-fit">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-5 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-[500] hover:bg-indigo-100 transition-all duration-300 border border-indigo-100"
            >
              Filter By
              <ChevronDown size={18} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute right-0 top-full mt-3 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl transition-all duration-300 z-50 overflow-hidden ${isFilterOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
              <button onClick={() => setIsFilterOpen(false)} className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                CBSE
              </button>

              <button onClick={() => setIsFilterOpen(false)} className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100">
                Matriculation
              </button>

              <button onClick={() => setIsFilterOpen(false)} className="w-full text-left px-5 py-4 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100">
                All Schools
              </button>
            </div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {schools.map((school) => {
            const distance = calculateDistance(
              userCoords.latitude,
              userCoords.longitude,
              school.latitude,
              school.longitude
            );
            return (
            <div 
              key={school.id} 
              className="group cursor-pointer bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={school.image} 
                  alt={school.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-sm">
                    {school.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold text-slate-700">{school.rating}</span>

                    <div className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full whitespace-nowrap">
                    {distance} km
                  </div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      {school.classes}
                    </span>
                  </div>
                </div>

                <h4 className="text-[16px] font-[500] text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {school.name}
                </h4>
                
                <div className="flex items-center justify-between text-slate-500 mb-6">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <MapPin size={14} className="shrink-0" />
                    <span className="text-sm truncate">{school.location}</span>
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

export default SchoolLocationSection;