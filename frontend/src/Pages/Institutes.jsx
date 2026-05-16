import React, { useEffect, useState, useCallback } from 'react';
import ShareButton from '../components/ShareButton';
import InstitutesFilter from '../components/InstitutesFilter';
import { institutes } from '../data/institutes';
import { useAuthModal } from '../context/AuthModalContext';
import PageSEO from '../components/PageSEO';

const Institutes = () => {
  const { openLoginModal } = useAuthModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ category: 'All', mode: 'All' });

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const filteredItems = institutes.filter(item => {
    if (filters.category !== 'All' && item.category !== filters.category) return false;
    if (filters.mode !== 'All' && item.learningMode !== filters.mode) return false;
    if (filters.maxPrice) {
      const price = parseInt(item.price.replace(/,/g, ''));
      if (price > filters.maxPrice) return false;
    }
    return true;
  });

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageSEO title="Local Institutes" description="Find local institutes for development, electrical design, and SCADA." />
      <div className="min-h-screen bg-slate-50 pb-10">
        <div
          className="relative mb-10 h-34 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=80&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="text-3xl font-[500] text-white md:text-5xl">Institutes</h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-72 lg:shrink-0">
              <InstitutesFilter onFilterChange={handleFilterChange} />
            </div>

            <div className="min-w-0 flex-1 lg:pr-2">
              {filteredItems.length === 0 ? (
                <p>No results found.</p>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                  {currentItems.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-slate-100"
                    >
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-52 object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-md">
                            {item.learningMode}
                          </span>
                          <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md">
                            {item.duration}
                          </span>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="rounded-md bg-[#a0083d] px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#a0083d]/25">
                            {item.category}
                          </span>
                          <ShareButton title={item.name} />
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="min-w-0">
                            <h2 className="text-base font-semibold text-slate-800 sm:text-lg line-clamp-2">
                              {item.name}
                            </h2>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                          <div className="flex shrink-0 items-center gap-2 text-sm text-yellow-500">
                            {'★★★★★'.slice(0, Math.round(item.rating))}
                            <span className="text-slate-500">{item.rating}</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-500 text-xs">{item.students} students</span>
                          </div>
                        </div>

                        <div className="bg-green-600 text-white text-center py-2 rounded-lg text-sm font-medium">
                          Fees - ₹{item.price}
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2">
                          {item.about}
                        </p>

                        <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                          <button
                            type="button"
                            onClick={() => openLoginModal(item._id)}
                            className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm cursor-pointer"
                          >
                            Get a Call
                          </button>
                          <button
                            type="button"
                            onClick={() => openLoginModal(item._id)}
                            className="flex-1 bg-[#125fb9] text-white py-2 rounded-lg text-sm cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredItems.length > itemsPerPage && (
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

export default Institutes;
