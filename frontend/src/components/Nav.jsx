import React, { useEffect, useRef, useState } from 'react';
import { Search, MapPin, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserLocation } from '../context/LocationContext';
import { useAuthModal } from '../context/AuthModalContext';
import { isAuthenticated, getUser } from '../utils/auth';

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'IND',
    flag: 'https://flagcdn.com/w40/in.png',
  });
  const countryDropdownRef = useRef(null);
  const { userLocation, isLocationLoading, refreshLocation } = useUserLocation();
  const { openLoginModal } = useAuthModal();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filtered = searchableItems.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(query)
        )
      );
    });

    setSearchSuggestions(filtered.slice(0, 6));
  }, [searchQuery]);

  const menuItems = [
    { name: 'Online Schools', badge: 'NIOS', url: '/online-schools' },
    { name: 'Schools', url: '/allschools' },
    { name: 'Colleges', url: '/junior-colleges' },
    { name: 'Online Courses', url: '/online-courses' },
    { name: 'Academic Classes', url: '/academic-classes' },
    { name: 'Abroad Education', url: '/abroad-education' },
    { name: 'Institutes', url: '/institutes' },

  ];

  const countries = [
    { name: 'IND', flag: 'https://flagcdn.com/w40/in.png' },
  ];

  // Temporary searchable data
  // Replace later with backend API response
  const searchableItems = [
    {
      type: 'School',
      name: 'DAV Public School',
      category: 'CBSE School',
      location: 'Chennai',
      keywords: ['cbse', 'school', 'education', 'day school'],
      path: '/allschools',
    },
    {
      type: 'School',
      name: 'Velammal Vidyalaya',
      category: 'International School',
      location: 'Chennai',
      keywords: ['international', 'school', 'boarding'],
      path: '/allschools',
    },
    {
      type: 'College',
      name: 'Loyola College',
      category: 'Arts & Science College',
      location: 'Chennai',
      keywords: ['college', 'arts', 'science', 'degree'],
      path: '/junior-colleges',
    },
    {
      type: 'College',
      name: 'SRM University',
      category: 'Engineering College',
      location: 'Chennai',
      keywords: ['engineering', 'college', 'btech'],
      path: '/junior-colleges',
    },
    {
      type: 'Course',
      name: 'Full Stack Development',
      category: 'Programming Course',
      location: 'Online',
      keywords: ['mern', 'react', 'nodejs', 'coding'],
      path: '/online-courses',
    },
    {
      type: 'Course',
      name: 'Digital Marketing',
      category: 'Marketing Course',
      location: 'Online',
      keywords: ['seo', 'ads', 'marketing'],
      path: '/online-courses',
    },
    {
      type: 'Category',
      name: 'CBSE Schools',
      category: 'School Category',
      location: 'India',
      keywords: ['cbse', 'schools'],
      path: '/allschools',
    },
    {
      type: 'Category',
      name: 'Boarding Schools',
      category: 'School Category',
      location: 'India',
      keywords: ['boarding', 'hostel', 'residential'],
      path: '/allschools',
    },
    {
      type: 'Category',
      name: 'Academic Classes',
      category: 'Extracurricular',
      location: 'India',
      keywords: ['dance', 'music', 'sports', 'robotics'],
      path: '/academic-classes',
    },
  ];

return (
    <header className="w-full flex flex-col bg-slate-100 font-sans sticky top-0 z-50">
      
      {/* ROW 1: Branding & Porimary Navigation */}
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 h-16 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-12">
          {/* Brand Logo */}
          <img 
            src={logo} 
            alt="Logo" 
            className="h-16 w-auto object-contain cursor-pointer transition-opacity hover:opacity-80 md:h-20" onClick={()=>navigate('/')} 
          />
          
          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.url;
              return (
              <button 
                key={item.name}
                className={`group h-16 px-4 text-[15px] cursor-pointer font-[600] transition-colors flex items-center gap-2 ${isActive ? 'text-[#125fb9]' : 'text-slate-600 hover:text-[#125fb9]'}`} onClick={() => item.url && navigate(item.url)}
              >
                <div className="relative py-1">
                  {item.name}
                  {/* Animated Underline */}
                  <span className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#125fb9] transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </div>
                {item.badge && (
                  <span className="text-[12px] bg-[#125fb9]/10 text-[#125fb9] px-1.5 py-0.5 rounded-md uppercase tracking-wider font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            )})}
          </nav>
        </div>

        {/* Top Utility Icons */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:text-[#125fb9] lg:hidden"
            aria-label="Open mobile menu"
          >
            <Menu size={20} />
          </button>

          <div ref={countryDropdownRef} className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => setIsCountryOpen((prev) => !prev)}
              className="flex items-center gap-2 text-slate-600 hover:text-[#125fb9] px-3 py-1.5 rounded-full transition-all hover:bg-slate-100 border border-transparent hover:border-slate-200"
            >
              <img src={selectedCountry.flag} alt="flag" className="h-5 w-5 rounded-full object-cover shadow-sm" />
              <span className="text-sm font-medium">{selectedCountry.name}</span>
              <ChevronDown
                size={14}
                strokeWidth={2.5}
                className={`transition-transform duration-300 ${isCountryOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`absolute right-0 top-full mt-2 w-44 bg-white border border-slate-200 rounded-2xl shadow-xl transition-all duration-300 z-50 overflow-hidden ${
                isCountryOpen
                  ? 'opacity-100 visible translate-y-0'
                  : 'opacity-0 invisible -translate-y-2'
              }`}
            >
              {countries.map((country, index) => (
                <button
                  key={country.name}
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsCountryOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 text-left px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors ${
                    index !== 0 ? 'border-t border-slate-100' : ''
                  }`}
                >
                  <img src={country.flag} alt="flag" className="h-5 w-5 rounded-full object-cover shadow-sm" />
                  {country.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>



      {/* ROW 2: Command Center (Search & Auth) */}
      <div className="bg-[#fcfcfd] border-t border-slate-200 py-2">
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          
          {/* Integrated Search Bar with Location Context */}
          <div className="relative flex-1 group w-full max-w-5xl z-40">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none gap-3">
              <Search size={18} className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                setTimeout(() => {
                  setIsSearchFocused(false);
                }, 150);
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={placeholderText}
              className="w-full bg-white border border-[#dbdbdb] rounded-4xl py-3 pl-12 pr-28 md:pr-40 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5 transition-all text-slate-700  text-sm font-medium"
            />

            {/* Quick Filter inside Search */}
            <div className="absolute right-2 top-2 bottom-2 flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (searchQuery.trim()) {
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                className="h-full bg-[#125fb9] hover:bg-[#0d4a91] text-white px-4 md:px-6 py-4.5 rounded-full text-sm md:text-[15px] font-[400] transition-all flex items-center gap-2 justify-center shadow-md hover:shadow-lg active:scale-95"
              >
                {/* <Search size={16} strokeWidth={2.5} /> */}
                <span>Search</span>
                <ArrowRight size={15} strokeWidth={2.5} className="hidden md:block" />
              </button>
            </div>

            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[110%] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                {searchSuggestions.map((item, index) => (
                  <button
                    key={`${item.name}-${index}`}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item.name);
                      setIsSearchFocused(false);
                      navigate(item.path);
                    }}
                    className="flex w-full items-center justify-between border-b border-slate-100 px-5 py-4 text-left transition-all hover:bg-slate-50"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-[#125fb9]">
                        {item.type} • {item.category} • {item.location}
                      </p>
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      View
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>


          

          <div className="hidden items-center gap-3 w-full md:flex md:w-auto">

            <div className="flex items-center gap-3 md:gap-5">
              <button
                type="button"
                onClick={() => refreshLocation()}
                disabled={isLocationLoading}
                title="Click to update location"
                className="hidden items-center gap-2 text-slate-600 hover:text-[#125fb9] px-3 py-2 rounded-xl transition-all hover:bg-slate-100 sm:flex disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <MapPin size={18} strokeWidth={2.5} className={isLocationLoading ? 'animate-pulse' : ''} />
                <span className="text-sm font-medium">{isLocationLoading ? 'Updating...' : userLocation}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/join-partner')}
                className="hidden lg:flex bg-white text-[#125fb9] border-2 border-[#125fb9] px-6 py-2.5 rounded-4xl text-[15px] font-[600] hover:bg-[#125fb9]/5 transition-all active:scale-[0.98]"
              >
                Join Partner
              </button>

              {isAuthenticated() && getUser() ? (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#a0083d]/10 text-[#a0083d] cursor-pointer hover:bg-[#a0083d]/20 transition-all">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(getUser().name)}&background=a0083d&color=ffffff&bold=true`}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover shadow-sm"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openLoginModal()}
                  className="bg-[#a0083d] text-white px-10 py-3 rounded-4xl text-[15px] font-[500] hover:bg-[#8a0734] transition-all active:scale-[0.98]"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[100] flex flex-col transition-all duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100 shrink-0">
          <img src={logo} alt="Logo" className="h-14 w-auto object-contain" onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }} />
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition-all hover:text-[#125fb9] hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8">
          
          <button
            type="button"
            onClick={() => { refreshLocation(); setIsMobileMenuOpen(false); }}
            disabled={isLocationLoading}
            className="flex w-full items-center gap-3 rounded-2xl bg-[#125fb9]/5 border border-[#125fb9]/10 px-5 py-4 text-[15px] font-semibold text-[#125fb9] disabled:opacity-70"
          >
            <MapPin size={20} className={isLocationLoading ? 'animate-pulse' : ''} />
            <span className="truncate">{isLocationLoading ? 'Updating location...' : userLocation}</span>
          </button>

          <nav className="flex flex-col gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 pl-2">Navigation</h3>
            {menuItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className="flex items-center justify-between rounded-2xl px-4 py-4 text-left text-[16px] font-bold text-slate-700 transition-all hover:bg-slate-50 active:bg-slate-100 border border-transparent hover:border-slate-100"
                onClick={() => {
                  if (item.url) navigate(item.url);
                  setIsMobileMenuOpen(false);
                }}
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] bg-[#125fb9]/10 text-[#125fb9] px-2.5 py-1 rounded-md uppercase tracking-wider font-black">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-100">
            <button
              type="button"
              className="flex items-center gap-3 text-slate-700 px-4 py-4 w-full rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100"
              onClick={() => setIsCountryOpen((prev) => !prev)}
            >
              <img src={selectedCountry.flag} alt="flag" className="h-6 w-6 rounded-full object-cover shadow-sm" />
              <span className="text-[16px] font-bold flex-1 text-left">{selectedCountry.name}</span>
              <ChevronDown size={20} className={`transition-transform duration-300 text-slate-400 ${isCountryOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCountryOpen && (
              <div className="mt-2 pl-16 pr-4 flex flex-col gap-2">
                 {countries.map((country) => (
                  <button
                    key={country.name}
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsCountryOpen(false);
                    }}
                    className="w-full flex items-center gap-3 text-left py-3 px-4 rounded-xl text-[15px] font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <img src={country.flag} alt="flag" className="h-5 w-5 rounded-full object-cover shadow-sm" />
                    {country.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-col gap-4">
            {isAuthenticated() && getUser() ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#a0083d]/10 text-[#a0083d]">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(getUser().name)}&background=a0083d&color=ffffff&bold=true`}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover shadow-sm"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-lg">{getUser().name}</p>
                    <p className="text-sm text-slate-500 font-medium">Verified User</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { navigate('/join-partner'); setIsMobileMenuOpen(false); }}
                  className="w-full bg-white text-[#125fb9] border-2 border-[#125fb9] px-6 py-4 rounded-2xl text-[16px] font-bold hover:bg-[#125fb9]/5 transition-all active:scale-[0.98]"
                >
                  Join Partner
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => { openLoginModal(); setIsMobileMenuOpen(false); }}
                  className="w-full bg-[#a0083d] text-white px-6 py-4 rounded-2xl text-[16px] font-bold hover:bg-[#8a0734] transition-all active:scale-[0.98] shadow-md shadow-[#a0083d]/20"
                >
                  Login / Register
                </button>
                <button
                  type="button"
                  onClick={() => { navigate('/join-partner'); setIsMobileMenuOpen(false); }}
                  className="w-full bg-white text-[#125fb9] border-2 border-[#125fb9] px-6 py-4 rounded-2xl text-[16px] font-bold hover:bg-[#125fb9]/5 transition-all active:scale-[0.98]"
                >
                  Join Partner
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </header>
  );
};

export default Nav;
