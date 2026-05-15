import React, { useEffect, useState } from 'react';
import { Search, MapPin, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useUserLocation } from '../context/LocationContext';

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderText, setPlaceholderText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userLocation } = useUserLocation();

  const navigate = useNavigate();

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
    { name: 'Online Schools (NIOS)', badge: 'New', url: '/allschools' },
    { name: 'Schools', url: '/boarding-schools' },
    { name: 'Colleges', url: '/junior-colleges' },
    { name: 'Online Courses', url: '/nios' },
    { name: 'Online Courses', url: '/nios' },
  ];

return (
    <header className="w-full flex flex-col bg-slate-100 font-sans sticky top-0 z-50">
      
      {/* ROW 1: Branding & Porimary Navigation */}
      <div className="max-w-7xl mx-auto w-full px-6 h-16 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-12">
          {/* Brand Logo */}
          <img 
            src={logo} 
            alt="Logo" 
            className="h-16 w-auto object-contain cursor-pointer transition-opacity hover:opacity-80 md:h-20" onClick={()=>navigate('/')} 
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
        <div className="flex items-center gap-3 md:gap-5">
          <button className="hidden items-center gap-2 text-slate-600 hover:text-[#125fb9] px-3 py-2 rounded-xl transition-all hover:bg-slate-100 sm:flex">
            <MapPin size={18} strokeWidth={2.5} />
            <span className="text-sm font-medium">{userLocation}</span>
          </button>
          <div className="relative hidden group sm:block">
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

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:text-[#125fb9] lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-b border-slate-200 bg-white transition-all duration-300 ease-out lg:hidden ${
          isMobileMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 border-transparent opacity-0'
        }`}
      >
        <div
          className={`px-6 py-4 transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-3'
          }`}
        >
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm font-medium text-slate-600">
            <MapPin size={17} className="text-[#125fb9]" />
            <span className="truncate">{userLocation}</span>
          </div>

          <nav className="grid gap-2">
            {menuItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold text-slate-700 transition-all hover:bg-[#125fb9]/10 hover:text-[#125fb9]"
                onClick={() => {
                  if (item.url) navigate(item.url);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[9px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-md uppercase tracking-wider font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* ROW 2: Command Center (Search & Auth) */}
      <div className="bg-[#fcfcfd] border-t border-slate-200 py-2">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          
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
              className="w-full bg-white border border-[#dbdbdb] rounded-4xl py-3 pl-12 pr-28 md:pr-40 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-700  text-sm font-medium"
            />

            {/* Quick Filter inside Search */}
            <div className="absolute right-2 top-2 bottom-2 flex items-center">
              <button className="h-full bg-[#125fb9] hover:bg-[#0d4a91] text-white px-4 md:px-8 rounded-4xl text-[11px] font-medium tracking-[0.1em] transition-all flex items-center justify-center active:scale-95">
                Search
              </button>
            </div>
          </div>

          {/* Authentication Actions */}
          <div className="hidden items-center gap-3 w-full md:flex md:w-auto">
            <button className="flex-1 md:flex-none px-10 py-2.5 text-sm font-bold text-[#125fb9] border-[2px] border-[#125fb9] rounded-4xl transition-all hover:bg-[#125fb9] hover:text-white">
              Login
            </button>
            <button className="flex-1 md:flex-none bg-[#a0083d] text-white px-10 py-3 rounded-4xl text-sm font-bold  hover:bg-[#8a0734] transition-all active:scale-[0.98]">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;
