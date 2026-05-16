import React, { useEffect, useState, useCallback } from 'react';
import ShareButton from '../components/ShareButton';
import OnlineCourseFilter from '../components/OnlineCourseFilter';
import { onlineCourses } from '../data/onlineCourses';
import { useAuthModal } from '../context/AuthModalContext';
import PageSEO from '../components/PageSEO';
import { seoPages } from '../config/seo';

const AllOnlineCourses = () => {
  const { openLoginModal } = useAuthModal();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ category: 'All' });

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const filteredCourses = onlineCourses.filter(course => {
    if (!filters || filters.category === 'All') return true;
    return course.category === filters.category;
  });

  const coursesPerPage = 10;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageSEO {...seoPages.onlineCourses} />
    <div className="min-h-screen bg-slate-50 pb-10">
      <div
        className="relative mb-10 h-34 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="text-3xl font-[500] text-white md:text-5xl">Online Courses</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-72 lg:shrink-0">
            <OnlineCourseFilter onFilterChange={handleFilterChange} />
          </div>

          <div className="min-w-0 flex-1 lg:pr-2">
            {onlineCourses.length === 0 ? (
              <p>No courses found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                {currentCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-slate-100"
                  >
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-52 object-cover"
                      />

                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-md">
                          {course.learningMode}
                        </span>
                        <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md">
                          {course.duration}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="rounded-md bg-[#a0083d] px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-[#a0083d]/25">
                          {course.level}
                        </span>
                        <ShareButton title={course.title} />
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(course.provider)}&background=125fb9&color=ffffff&bold=true&size=96`}
                          alt={`${course.provider} logo`}
                          className="h-12 w-12 shrink-0 rounded-xl border border-slate-100 object-cover shadow-sm"
                        />
                        <div className="min-w-0">
                          <h2 className="text-base font-semibold text-slate-800 sm:text-lg line-clamp-2">
                            {course.title}
                          </h2>
                          <p className="text-xs text-slate-500 truncate">{course.provider}</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full w-fit">
                          {course.category}
                        </span>

                        <div className="flex shrink-0 items-center gap-2 text-sm text-yellow-500">
                          {'★★★★★'.slice(0, Math.round(course.rating))}
                          <span className="text-slate-500">{course.rating}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500 text-xs">{course.students} enrolled</span>
                        </div>
                      </div>

                      <div className="bg-green-600 text-white text-center py-2 rounded-lg text-sm font-medium">
                        Price - ₹{course.price}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs border border-[#dbdbdb] rounded-lg overflow-hidden">
                        <div className="bg-slate-50 p-2">Category</div>
                        <div className="p-2 font-medium">{course.category}</div>
                        <div className="bg-slate-50 p-2">Level</div>
                        <div className="p-2 font-medium">{course.level}</div>
                        <div className="bg-slate-50 p-2">Duration</div>
                        <div className="p-2 font-medium">{course.duration}</div>
                        <div className="bg-slate-50 p-2">Language</div>
                        <div className="p-2 font-medium">{course.language}</div>
                      </div>

                      <p className="text-xs text-slate-600">
                        <span className="font-semibold">About this course:</span> {course.about}
                      </p>

                      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => openLoginModal(course._id)}
                          className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm cursor-pointer"
                        >
                          Get a Call
                        </button>
                        <button
                          type="button"
                          onClick={() => openLoginModal(course._id)}
                          className="flex-1 bg-[#125fb9] text-white py-2 rounded-lg text-sm cursor-pointer"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {onlineCourses.length > coursesPerPage && (
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

export default AllOnlineCourses;
