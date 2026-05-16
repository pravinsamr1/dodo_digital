import React, { useEffect, useMemo, useState } from 'react';
import ShareButton from '../components/ShareButton';
import { Link } from 'react-router-dom';
import CollegeFilter from '../components/CollegeFilter';
import { colleges } from '../data/colleges';
import { useAuthModal } from '../context/AuthModalContext';
import { useUserLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';
import { seoPages } from '../config/seo';

const AllColleges = () => {
  const { openLoginModal } = useAuthModal();
  const { userLocation } = useUserLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const collegesPerPage = 10;

  const indexOfLastCollege = currentPage * collegesPerPage;
  const currentColleges = colleges.slice(0, indexOfLastCollege);

  const totalPages = Math.ceil(colleges.length / collegesPerPage);

  const getDynamicDistance = useMemo(() => {
    return (college) => {
      if (!userLocation) {
        return 'Nearby';
      }

      const normalizedUserLocation = userLocation.toLowerCase();
      const normalizedCollegeLocation = `${college.location} ${college.city}`.toLowerCase();

      if (
        normalizedCollegeLocation.includes('ambattur') &&
        normalizedUserLocation.includes('ambattur')
      ) {
        return '2.1 km';
      }

      if (
        normalizedCollegeLocation.includes('chennai') &&
        normalizedUserLocation.includes('chennai')
      ) {
        return `${(Math.random() * 8 + 3).toFixed(1)} km`;
      }

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
            <CollegeFilter />
          </div>

          <div className="min-w-0 flex-1 lg:pr-2">
            {colleges.length === 0 ? (
              <p>No colleges found.</p>
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
                        <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md">
                          {getDynamicDistance(college)}
                        </span>
                        <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-md">
                          Admission Open
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="rounded-md bg-[#a0083d] px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#a0083d]/25">
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

                      <div className="bg-green-600 text-white text-center py-2 rounded-lg text-sm font-medium">
                        Fees - ₹{college.annualFee} / per annum
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs border border-[#dbdbdb] rounded-lg overflow-hidden">
                        <div className="bg-slate-50 p-2">Stream</div>
                        <div className="p-2 font-medium">{college.stream}</div>
                        <div className="bg-slate-50 p-2">College type</div>
                        <div className="p-2 font-medium">{college.collegeType}</div>
                        <div className="bg-slate-50 p-2">Program</div>
                        <div className="p-2 font-medium">{college.program}</div>
                        <div className="bg-slate-50 p-2">City</div>
                        <div className="p-2 font-medium">{college.city}</div>
                      </div>

                      <p className="text-xs text-slate-600">
                        <span className="font-semibold">Expert Comment:</span>{' '}
                        {college.about}
                      </p>

                      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                        <button
                          type="button"
                          className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm cursor-pointer hover:bg-slate-300 transition-colors"
                        >
                          Get a Call
                        </button>
                        <Link
                          to={`/colleges/${college._id}`}
                          className="flex-1 bg-[#125fb9] text-white py-2 rounded-lg text-sm cursor-pointer text-center flex items-center justify-center hover:bg-[#0d4a91] transition-colors"
                        >
                          View College
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {colleges.length > collegesPerPage && (
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

export default AllColleges;
