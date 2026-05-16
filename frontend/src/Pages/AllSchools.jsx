import React, { useEffect, useState } from 'react';
import ShareButton from '../components/ShareButton';
import SchoolFilter from '../components/SchoolFilter';
import { schools as allSchools } from '../data/schools';
import { useAuthModal } from '../context/AuthModalContext';
import PageSEO from '../components/PageSEO';
import { seoPages } from '../config/seo';

const AllSchools = () => {
  const { openLoginModal } = useAuthModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredSchools, setFilteredSchools] = useState(allSchools);

  const schoolsPerPage = 10;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFilterChange = (filters) => {
    let results = allSchools;

    if (filters.category && filters.category !== 'All') {
      results = results.filter(school => school.type === filters.category);
    }
    if (filters.board && filters.board !== 'All') {
      results = results.filter(school => school.board === filters.board);
    }
    if (filters.gender && filters.gender !== 'All' && filters.gender !== 'Co-education') {
      results = results.filter(school => school.gender === filters.gender);
    }
    if (filters.fees) {
      results = results.filter(school => school.dayFee <= filters.fees);
    }

    setFilteredSchools(results);
    setCurrentPage(1);
  };

  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = filteredSchools.slice(0, indexOfLastSchool);

  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

  return (
    <>
      <PageSEO {...seoPages.allSchools} />
      <div className="min-h-screen bg-slate-50 pb-10">
        <div
          className="relative mb-10 h-34 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="text-3xl font-[500] text-white md:text-5xl">
              All Schools
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-72 lg:shrink-0">
              <SchoolFilter onFilterChange={handleFilterChange} />
            </div>

            <div className="min-w-0 flex-1 lg:pr-2">
              {filteredSchools.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-lg">No schools found matching your criteria.</p>
                  <button 
                    onClick={() => handleFilterChange({})} 
                    className="mt-4 text-[#125fb9] font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                  {currentSchools.map((school) => (
                    <div
                      key={school._id}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-slate-100"
                    >
                      {/* IMAGE + BADGES */}
                      <div className="relative">
                        <img
                          src={school.image}
                          alt={school.name}
                          className="w-full h-52 object-cover"
                        />

                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="bg-slate-800/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                            19.15 km
                          </span>
                          <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                            Admission Open
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="rounded-lg bg-[#a0083d] px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#a0083d]/25">
                            Managed by School
                          </span>
                          <ShareButton title={school.name} url={`${window.location.origin}/schools/${school._id}`} />
                        </div>
                      </div>

                      {/* CONTENT */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(school.name)}&background=125fb9&color=ffffff&bold=true&size=96`}
                            alt={`${school.name} logo`}
                            className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 object-cover shadow-sm"
                          />
                          <h2 className="text-base font-semibold text-slate-800 sm:text-lg">
                            {school.name}
                          </h2>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                          <p className="truncate text-sm text-slate-500">
                            {school.location}
                          </p>
                          <div className="flex shrink-0 items-center gap-2 text-sm text-yellow-500">
                            {'★★★★★'.slice(0, Math.round(school.rating))}
                            <span className="text-slate-500">{school.rating}</span>
                          </div>
                        </div>

                        <div className="bg-green-50 text-green-700 text-center py-2.5 rounded-xl text-sm font-semibold border border-green-100">
                          Fees - ₹{school.dayFee.toLocaleString()} / per annum
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs border border-slate-100 rounded-xl overflow-hidden">
                          <div className="bg-slate-50 p-2.5 text-slate-500">School type</div>
                          <div className="p-2.5 font-medium text-slate-700">{school.type}</div>
                          <div className="bg-slate-50 p-2.5 text-slate-500">Board</div>
                          <div className="p-2.5 font-medium text-slate-700">{school.board}</div>
                          <div className="bg-slate-50 p-2.5 text-slate-500">Gender</div>
                          <div className="p-2.5 font-medium text-slate-700">{school.gender}</div>
                          <div className="bg-slate-50 p-2.5 text-slate-500">Grade</div>
                          <div className="p-2.5 font-medium text-slate-700">{school.grade}</div>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2">
                          <span className="font-semibold text-slate-800">Expert Comment:</span> {school.description || "This is a top-rated school offering quality education and modern infrastructure."}
                        </p>

                        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => openLoginModal(school._id)}
                            className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-200"
                          >
                            Get a Call
                          </button>
                          <button
                            type="button"
                            onClick={() => openLoginModal(school._id)}
                            className="flex-1 bg-[#125fb9] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#0d4a91] shadow-md shadow-[#125fb9]/20"
                          >
                            View School
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              {filteredSchools.length > schoolsPerPage && (
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

export default AllSchools;
