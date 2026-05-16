import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import SchoolFilter from '../components/SchoolFilter';
import { schools } from '../data/schools';
import { useAuthModal } from '../context/AuthModalContext';
import PageSEO from '../components/PageSEO';

const SearchResults = () => {
  const { openLoginModal } = useAuthModal();
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const filteredSchools = schools.filter(school => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    return (
      (school.name && school.name.toLowerCase().includes(lowerQuery)) ||
      (school.location && school.location.toLowerCase().includes(lowerQuery)) ||
      (school.type && school.type.toLowerCase().includes(lowerQuery)) ||
      (school.board && school.board.toLowerCase().includes(lowerQuery))
    );
  });

  const schoolsPerPage = 10;
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = filteredSchools.slice(indexOfFirstSchool, indexOfLastSchool);
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query, currentPage]);

  return (
    <>
      <PageSEO title={`Search Results for "${query}"`} description="Search results for schools, colleges, and courses." />
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
            Search Results
          </h1>
          {query && (
            <p className="mt-2 text-lg text-slate-200">
              Showing results for "{query}"
            </p>
          )}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-72 lg:shrink-0">
          <SchoolFilter />
        </div>

        <div className="min-w-0 flex-1 lg:pr-2">
        {filteredSchools.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800">No results found</h2>
            <p className="text-slate-500 mt-2">Try adjusting your search query or filters.</p>
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
                    <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md">
                      19.15 km
                    </span>
                    <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-md">
                      Admission Open
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="rounded-md bg-[#a0083d] px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#a0083d]/25">
                      Managed by School
                    </span>
                    <ShareButton title={school.name} url={`${window.location.origin}/schools/${school._id}`} />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-3">

                  {/* TITLE */}
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

                    {/* RATING */}
                    <div className="flex shrink-0 items-center gap-2 text-sm text-yellow-500">
                      {'★★★★★'.slice(0, Math.round(school.rating || 5))}
                      <span className="text-slate-500">{school.rating || 5}</span>
                    </div>
                  </div>

                  {/* FEES BAR */}
                  <div className="bg-green-600 text-white text-center py-2 rounded-lg text-sm font-medium">
                    Fees - ₹{school.dayFee || 'N/A'} / per annum
                  </div>

                  {/* DETAILS GRID */}
                  <div className="grid grid-cols-2 gap-2 text-xs border border-[#dbdbdb] rounded-lg overflow-hidden">
                    <div className="bg-slate-50 p-2">School type</div>
                    <div className="p-2 font-medium">{school.type || 'N/A'}</div>
                    <div className="bg-slate-50 p-2">Board</div>
                    <div className="p-2 font-medium">{school.board || 'N/A'}</div>
                    <div className="bg-slate-50 p-2">Gender</div>
                    <div className="p-2 font-medium">{school.gender || 'N/A'}</div>
                    <div className="bg-slate-50 p-2">Grade</div>
                    <div className="p-2 font-medium">{school.grade || 'N/A'}</div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold">Expert Comment:</span> This is a top-rated school offering quality education and modern infrastructure.
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => openLoginModal(school._id)}
                      className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm"
                    >
                      Get a Call
                    </button>
                    <button
                      type="button"
                      onClick={() => openLoginModal(school._id)}
                      className="flex-1 bg-[#125fb9] text-white py-2 rounded-lg text-sm"
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
              onClick={() => {
                const previousPage = Math.max(currentPage - 1, 1);
                setCurrentPage(previousPage);
              }}
              disabled={currentPage === 1}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index + 1);
                }}
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
              onClick={() => {
                const nextPage = Math.min(currentPage + 1, totalPages);
                setCurrentPage(nextPage);
              }}
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

export default SearchResults;
