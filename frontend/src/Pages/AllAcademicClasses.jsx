import React, { useEffect, useMemo, useState } from 'react';
import { UserCheck, Clock, Users } from 'lucide-react';
import ShareButton from '../components/ShareButton';
import AcademicClassFilter from '../components/AcademicClassFilter';
import { academicClasses as allAcademicClasses } from '../data/academicClasses';
import { useAuthModal } from '../context/AuthModalContext';
import PageSEO from '../components/PageSEO';
import { seoPages, buildBreadcrumbSchema } from '../config/seo';

const AllAcademicClasses = () => {
  const { openLoginModal } = useAuthModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredClasses, setFilteredClasses] = useState(allAcademicClasses);

  const classesPerPage = 10;

  const handleFilterChange = (filters) => {
    let results = allAcademicClasses;

    if (filters.activity && filters.activity !== 'All') {
      results = results.filter(item => item.activityType === filters.activity);
    }
    if (filters.ageGroup && filters.ageGroup !== 'All') {
      results = results.filter(item => item.ageGroup === filters.ageGroup);
    }
    if (filters.skillLevel && filters.skillLevel !== 'All') {
      results = results.filter(item => item.skillLevel === filters.skillLevel);
    }
    if (filters.schedule && filters.schedule !== 'All') {
      results = results.filter(item => item.schedule === filters.schedule);
    }
    if (filters.monthlyFee) {
      results = results.filter(item => {
        const fee = parseInt(item.monthlyFee.replace(/,/g, ''));
        return fee <= filters.monthlyFee;
      });
    }

    setFilteredClasses(results);
    setCurrentPage(1);
  };

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(0, indexOfLastClass);
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Academic Classes', path: seoPages.academicClasses.path },
        ]),
        ...allAcademicClasses.slice(0, 5).map((item) => ({
          '@type': 'Course',
          name: item.name,
          description: item.about,
          educationalLevel: item.ageGroup,
          courseMode: item.schedule,
          offers: {
            '@type': 'Offer',
            price: item.monthlyFee.replace(/,/g, ''),
            priceCurrency: 'INR',
          },
        })),
      ],
    }),
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageSEO {...seoPages.academicClasses} jsonLd={jsonLd} />

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
            <h1 className="text-3xl font-[500] text-white md:text-5xl">Academic Classes</h1>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="mb-6 rounded-2xl border border-[#125fb9]/20 bg-[#125fb9]/5 p-4 md:p-5">
            <h2 className="text-sm font-semibold text-[#125fb9] md:text-base">How enrollment works</h2>
            <ol className="mt-2 grid gap-4 text-xs text-slate-600 md:grid-cols-3 md:text-sm">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#125fb9] text-[10px] font-bold text-white">1</span>
                <span><span className="font-semibold text-slate-800">Choose activity</span> — Pick dance, music, sports, robotics, and more.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#125fb9] text-[10px] font-bold text-white">2</span>
                <span><span className="font-semibold text-slate-800">Pay fees to admin</span> — Complete monthly batch payment through our admin desk.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#125fb9] text-[10px] font-bold text-white">3</span>
                <span><span className="font-semibold text-slate-800">Teacher allocated</span> — A qualified instructor is assigned within 48 hours.</span>
              </li>
            </ol>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="lg:w-72 lg:shrink-0">
              <AcademicClassFilter onFilterChange={handleFilterChange} />
            </div>

            <div className="min-w-0 flex-1 lg:pr-2">
              {filteredClasses.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-lg">No classes found matching your criteria.</p>
                  <button 
                    onClick={() => handleFilterChange({})} 
                    className="mt-4 text-[#125fb9] font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                  {currentClasses.map((activity) => {
                    const teacherAssigned = activity.teacherStatus === 'assigned';

                    return (
                      <article
                        key={activity._id}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-slate-100"
                      >
                        <div className="relative">
                          <img
                            src={activity.image}
                            alt={activity.name}
                            className="w-full h-52 object-cover"
                          />

                          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            <span className="bg-slate-800/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                              {activity.activityType}
                            </span>
                            <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-lg font-medium">
                              {activity.slotsLeft} slots left
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span
                              className={`rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-lg ${
                                teacherAssigned
                                  ? 'bg-emerald-600 shadow-emerald-600/25'
                                  : 'bg-amber-600 shadow-amber-600/25'
                              }`}
                            >
                              {teacherAssigned
                                ? `Teacher: ${activity.teacherName}`
                                : 'Teacher after fee payment'}
                            </span>
                            <ShareButton title={activity.name} />
                          </div>
                        </div>

                        <div className="p-4 space-y-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(activity.activityType)}&background=a0083d&color=ffffff&bold=true&size=96`}
                              alt=""
                              className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 object-cover shadow-sm"
                            />
                            <div className="min-w-0">
                              <h2 className="text-base font-semibold text-slate-800 sm:text-lg line-clamp-1">
                                {activity.name}
                              </h2>
                              <p className="text-xs text-slate-500">{activity.sessionsPerWeek}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 border border-slate-100">
                              <Users size={12} className="text-[#125fb9]" />
                              {activity.ageGroup}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 border border-slate-100">
                              <Clock size={12} className="text-[#125fb9]" />
                              {activity.schedule}
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1 border border-slate-100">
                              <UserCheck size={12} className="text-[#125fb9]" />
                              Batch of {activity.batchSize}
                            </span>
                          </div>

                          <div className="bg-green-50 text-green-700 text-center py-2.5 rounded-xl text-sm font-semibold border border-green-100">
                            Monthly fee - ₹{activity.monthlyFee}
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs border border-slate-100 rounded-xl overflow-hidden">
                            <div className="bg-slate-50 p-2.5 text-slate-500">Activity</div>
                            <div className="p-2.5 font-medium text-slate-700">{activity.activityType}</div>
                            <div className="bg-slate-50 p-2.5 text-slate-500">Age group</div>
                            <div className="p-2.5 font-medium text-slate-700">{activity.ageGroup}</div>
                            <div className="bg-slate-50 p-2.5 text-slate-500">Skill level</div>
                            <div className="p-2.5 font-medium text-slate-700">{activity.skillLevel}</div>
                            <div className="bg-slate-50 p-2.5 text-slate-500">Teacher status</div>
                            <div className="p-2.5 font-medium text-slate-700">
                              {teacherAssigned ? activity.teacherName : 'Pending allocation'}
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2">
                            <span className="font-semibold text-slate-800">About:</span> {activity.about}
                          </p>

                          {!teacherAssigned && (
                            <p className="rounded-xl bg-amber-50 px-3 py-2 text-[11px] text-amber-800 border border-amber-100">
                              Teacher assigned within 48 hours of payment.
                            </p>
                          )}

                          <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                            <button
                              type="button"
                              onClick={() => openLoginModal(activity._id)}
                              className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-slate-200"
                            >
                              Get a Call
                            </button>
                            <button
                              type="button"
                              onClick={() => openLoginModal(activity._id)}
                              className="flex-1 bg-[#125fb9] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors hover:bg-[#0d4a91] shadow-md shadow-[#125fb9]/20"
                            >
                              Enroll & Pay Fees
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {filteredClasses.length > classesPerPage && (
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

export default AllAcademicClasses;
