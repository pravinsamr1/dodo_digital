import React, { useEffect, useMemo, useState } from 'react';
import ShareButton from '../components/ShareButton';
import { Link } from 'react-router-dom';
import CollegeFilter from '../components/CollegeFilter';
import { colleges as allColleges } from '../data/colleges';
import { useAuthModal } from '../context/AuthModalContext';
import { useUserLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';
import { seoPages } from '../config/seo';

const AllColleges = () => {
  const { openLoginModal } = useAuthModal();
  const { userLocation } = useUserLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredColleges, setFilteredColleges] = useState(allColleges);

  const collegesPerPage = 10;

  const handleFilterChange = (filters) => {
    let results = allColleges;

    if (filters.stream && filters.stream !== 'All') {
      results = results.filter(college => college.stream === filters.stream);
    }
    if (filters.type && filters.type !== 'All') {
      results = results.filter(college => college.collegeType === filters.type);
    }
    if (filters.program && filters.program !== 'All' && filters.program !== 'UG - PG') {
      results = results.filter(college => college.program === filters.program);
    }
    if (filters.fees) {
      results = results.filter(college => college.annualFee <= filters.fees);
    }

    setFilteredColleges(results);
    setCurrentPage(1);
  };

  const indexOfLastCollege = currentPage * collegesPerPage;
  const currentColleges = filteredColleges.slice(0, indexOfLastCollege);

  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);

  const getDynamicDistance = useMemo(() => {
    return (college) => {
      if (!userLocation) return 'Nearby';
      const normalizedUserLocation = userLocation.toLowerCase();
      const normalizedCollegeLocation = `${college.location} ${college.city}`.toLowerCase();
      if (normalizedCollegeLocation.includes('ambattur') && normalizedUserLocation.includes('ambattur')) return '2.1 km';
      if (normalizedCollegeLocation.includes('chennai') && normalizedUserLocation.includes('chennai')) return `${(Math.random() * 8 + 3).toFixed(1)} km`;
      return `${(Math.random() * 25 + 10).toFixed(1)} km`;
    };
  }, [userLocation]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageSEO {...seoPages.allColleges} />
      <div className="min-h-screen bg-slate-50 pb-10">
        <div
          className="relative mb-10 h-34 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="text-3xl font-[500] text-white md:text-5xl">All Colleges</h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-72 lg:shrink-0">
              <CollegeFilter onFilterChange={handleFilterChange} />
            </div>

            <div className="min-w-0 flex-1 lg:pr-2">
              {filteredColleges.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-lg">No colleges found matching your criteria.</p>
                  <button 
                    onClick={() => handleFilterChange({})} 
                    className="mt-4 text-[#125fb9] font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                  {currentColleges.map((college) => (
                    <div
                      key={college._id}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-slate-100"
                    >
                      <div className="relative">
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-52 object-cover"
                        />

                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="bg-slate-800/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                            {getDynamicDistance(college)}
                          </span>
                          <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                            Admission Open
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="rounded-lg bg-[#a0083d] px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#a0083d]/25">
                            {college.collegeType}
                          </span>
                          <ShareButton title={college.name} />
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(college.name)}&background=125fb9&color=ffffff&bold=true&size=96`}
                            alt={`${college.name} logo`}
                            className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 object-cover shadow-sm"
                          />
                          <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
                            {college.name}
                          </h2>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                          <p className="truncate text-sm text-slate-500">{college.location}</p>
                          <div className="flex shrink-0 items-center gap-2 text-sm text-yellow-500">
                            {'★★★★★'.slice(0, Math.round(college.rating))}
                            <span className="text-slate-500">{college.rating}</span>
                          </div>
                        </div>

                        <div className="bg-green-50 text-green-700 text-center py-2.5 rounded-xl text-sm font-semibold border border-green-100">
                          Fees - ₹{college.annualFee.toLocaleString()} / per annum
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs border border-slate-100 rounded-xl overflow-hidden">
                          <div className="bg-slate-50 p-2.5 text-slate-500">Stream</div>
                          <div className="p-2.5 font-medium text-slate-700">{college.stream}</div>
                          <div className="bg-slate-50 p-2.5 text-slate-500">College type</div>
                          <div className="p-2.5 font-medium text-slate-700">{college.collegeType}</div>
                          <div className="bg-slate-50 p-2.5 text-slate-500">Program</div>
                          <div className="p-2.5 font-medium text-slate-700">{college.program}</div>
                          <div className="bg-slate-50 p-2.5 text-slate-500">City</div>
                          <div className="p-2.5 font-medium text-slate-700">{college.city}</div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2">
                          <span className="font-semibold text-slate-800">Expert Comment:</span>{' '}
                          {college.about || "This is a top-rated college offering quality education and modern infrastructure."}
                        </p>

                        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => openLoginModal(college._id)}
                            className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-200"
                          >
                            Get a Call
                          </button>
                          <Link
                            to={`/colleges/${college._id}`}
                            className="flex-1 bg-[#125fb9] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#0d4a91] shadow-md shadow-[#125fb9]/20 flex items-center justify-center"
                          >
                            View College
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredColleges.length > collegesPerPage && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`h-10 w-10 rounded-xl text-sm font-semibold transition-all ${
                        currentPage === index + 1
                          ? 'bg-[#125fb9] text-white shadow-lg shadow-[#125fb9]/20'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllColleges;
