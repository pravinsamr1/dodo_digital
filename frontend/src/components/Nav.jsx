import React, { useEffect, useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState('Chennai, India');
  const [placeholderText, setPlaceholderText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation('Chennai, India');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          const data = await response.json();

          const area =
            data.address?.suburb ||
            data.address?.neighbourhood ||
            data.address?.quarter ||
            data.address?.city_district ||
            data.address?.town ||
            data.address?.village;

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.state_district;

          setUserLocation(area && city ? `${area}, ${city}` : 'Exact location unavailable');
        } catch (error) {
          setUserLocation('Chennai, India');
        }
      },
      (error) => {
        setUserLocation('Chennai, India');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  useEffect(() => {
    const texts = [
      'Find the best CBSE schools...',
      'Search schools near you...',
      'Compare top schools...',
      'Explore boarding schools...',
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        setPlaceholderText(currentText.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1500);
          return;
        }
      } else {
        setPlaceholderText(currentText.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }
      }

      setTimeout(typeEffect, isDeleting ? 40 : 80);
    };

    typeEffect();
  }, []);

  const menuItems = [
    { name: 'Online Schools', badge: 'New', url: '/allschools' },
    { name: 'Boarding Schools', url: '/boarding-schools' },
    { name: 'Junior Colleges', url: '/junior-colleges' },
    { name: 'NIOS(Online Schools)', url: '/nios' },
  ];

return (
    <header className="w-full flex flex-col bg-slate-100 font-sans sticky top-0 z-50">
      
      {/* ROW 1: Branding & Porimary Navigation */}
      <div className="max-w-8xl mx-auto w-full px-6 h-16 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-12">
          {/* Brand Logo */}
          <img 
            src={logo} 
            alt="Logo" 
            className="h-20 w-auto object-contain cursor-pointer transition-opacity hover:opacity-80" onClick={()=>navigate('/')} 
          />
          
          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button 
                key={item.name}
                className="group px-4 py-2 text-[14px] cursor-pointer font-bold text-slate-600 hover:text-indigo-600 rounded-xl transition-all flex items-center gap-2" onClick={() => item.url && navigate(item.url)}
              >
                {item.name}
                {item.badge && (
                  <span className="text-[9px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Top Utility Icons */}
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-slate-600 hover:text-[#125fb9] px-3 py-2 rounded-xl transition-all hover:bg-slate-100">
            <MapPin size={18} strokeWidth={2.5} />
            <span className="text-sm font-medium">{userLocation}</span>
          </button>
          <div className="relative group">
            <button className="flex items-center gap-2 text-slate-600 hover:text-[#125fb9] px-4 py-2 rounded-xl transition-all hover:bg-slate-100 border border-slate-200 bg-white">
              <span className="text-lg">🇮🇳</span>
              <span className="text-sm font-medium">India</span>
              <ChevronDown size={16} strokeWidth={2.5} className="transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div className="absolute right-0 top-full mt-3 w-44 bg-white border border-slate-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
              <button className="w-full flex items-center gap-3 text-left px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <span className="text-lg">🇮🇳</span>
                India
              </button>

              <button className="w-full flex items-center gap-3 text-left px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100">
                <span className="text-lg">🇸🇬</span>
                Singapore
              </button>

              <button className="w-full flex items-center gap-3 text-left px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-t border-slate-100">
                <span className="text-lg">🇦🇪</span>
                UAE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2: Command Center (Search & Auth) */}
      <div className="bg-[#fcfcfd] border-t border-slate-200 py-2">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Integrated Search Bar with Location Context */}
          <div className="relative flex-1 group w-full">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none gap-3">
              <Search size={18} className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholderText}
              className="w-full bg-white border border-[#dbdbdb] rounded-4xl py-3 pl-12 pr-40 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-700  text-sm font-medium"
            />

            {/* Quick Filter inside Search */}
            <div className="absolute right-2 top-2 bottom-2 flex items-center">
              <button className="h-full bg-[#125fb9] hover:bg-[#0d4a91] text-white px-8 rounded-4xl text-[11px] font-medium tracking-[0.1em] transition-all flex items-center justify-center active:scale-95">
                Search
              </button>
            </div>
          </div>

          {/* Authentication Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-10 py-2.5 text-sm font-bold text-[#125fb9] border-[2px] border-[#125fb9] rounded-4xl transition-all hover:bg-[#125fb9] hover:text-white">
              Login
            </button>
            <button className="flex-1 md:flex-none bg-[#a0083d] text-white px-10 py-3 rounded-4xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-[#8a0734] transition-all active:scale-[0.98]">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;