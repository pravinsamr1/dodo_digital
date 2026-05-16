import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, Filter, X } from 'lucide-react';

const OnlineCourseFilter = ({ onFilterChange }) => {
  const [duration, setDuration] = useState('3 Months');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [level, setLevel] = useState('Beginner');
  const [learningMode, setLearningMode] = useState('Self-paced');
  const [price, setPrice] = useState(4999);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filterOptions = {
    categories: ['All', 'Languages', 'Tuition Class', 'Skill Development'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    durations: ['1 Month', '3 Months', '6 Months', '9 Months', '12 Months'],
    learningModes: ['Self-paced', 'Live Classes', 'Hybrid'],
  };

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({ category: selectedCategory, duration, level, learningMode, price });
    }
    setIsMobileOpen(false);
  };

  const clearFilters = () => {
    setDuration('3 Months');
    setSelectedCategory('All');
    setLevel('Beginner');
    setLearningMode('Self-paced');
    setPrice(4999);
    if (onFilterChange) {
      onFilterChange({ category: 'All', duration: '3 Months', level: 'Beginner', learningMode: 'Self-paced', price: 4999 });
    }
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR',
    }).format(amount);

  const filterFields = (
    <>
      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Category</p>
        <div className="grid grid-cols-1 gap-2">
          {filterOptions.categories.map((category) => {
            const isSelected = selectedCategory === category;

            return (
              <label
                key={category}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-1 text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'border-[#125fb9] bg-[#125fb9]/10 text-[#125fb9] shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#125fb9]/40 hover:bg-[#125fb9]/5'
                }`}
              >
                <input
                  type="radio"
                  name="course-category"
                  checked={isSelected}
                  onChange={() => setSelectedCategory(category)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-4xl border transition-all ${
                    isSelected
                      ? 'border-[#125fb9] bg-[#125fb9] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check size={13} strokeWidth={3} />}
                </span>
                {category}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Level</p>
        <div className="grid grid-cols-1 gap-2">
          {filterOptions.levels.map((item) => {
            const isSelected = level === item;

            return (
              <label
                key={item}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-1 text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'border-[#a0083d] bg-[#a0083d]/10 text-[#a0083d] shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#a0083d]/40 hover:bg-[#a0083d]/5'
                }`}
              >
                <input
                  type="radio"
                  name="course-level"
                  checked={isSelected}
                  onChange={() => setLevel(item)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-4xl border transition-all ${
                    isSelected
                      ? 'border-[#a0083d] bg-[#a0083d] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check size={13} strokeWidth={3} />}
                </span>
                {item}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Duration</p>
        <div className="relative">
          <select
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-4 py-2 pr-12 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-[#125fb9] focus:bg-white focus:shadow-md focus:shadow-[#125fb9]/10"
          >
            {filterOptions.durations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-xl bg-[#125fb9]/10 text-[#125fb9]">
            <ChevronDown size={17} />
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Learning Mode</p>
        <div className="relative">
          <select
            value={learningMode}
            onChange={(event) => setLearningMode(event.target.value)}
            className="w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-4 py-2 pr-12 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-[#125fb9] focus:bg-white focus:shadow-md focus:shadow-[#125fb9]/10"
          >
            {filterOptions.learningModes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-xl bg-[#125fb9]/10 text-[#125fb9]">
            <ChevronDown size={17} />
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Course Price</p>
          <span className="rounded-full bg-[#a0083d]/10 px-3 py-1 text-xs font-semibold text-[#a0083d]">
            {formatPrice(price)}
          </span>
        </div>
        <input
          type="range"
          min="499"
          max="50000"
          step="500"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 outline-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#a0083d] [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#a0083d] [&::-webkit-slider-thumb]:shadow-md"
          style={{
            background: `linear-gradient(to right, #a0083d 0%, #a0083d ${((price - 499) / (50000 - 499)) * 100}%, #e2e8f0 ${((price - 499) / (50000 - 499)) * 100}%, #e2e8f0 100%)`,
          }}
        />
        <div className="flex justify-between text-[11px] font-medium text-slate-400">
          <span>{formatPrice(499)}</span>
          <span>{formatPrice(50000)}</span>
        </div>
      </div>

      <div className="pt-6 pb-2">
        <button
          type="button"
          onClick={handleApply}
          className="w-full bg-[#125fb9] text-white py-3 rounded-xl text-sm font-bold shadow-md shadow-[#125fb9]/20 transition-all hover:bg-[#0d4a91]"
        >
          Apply Filters
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Floating Action Button (FAB) */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#125fb9] text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-transform hover:scale-105 lg:hidden"
        aria-label="Open Filters"
      >
        <Filter size={24} />
      </button>

      {/* Mobile Modal Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl animate-in slide-in-from-bottom duration-300">
            <div className="sticky top-0 z-10 -mx-6 -mt-6 mb-4 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900">Filters</h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full bg-[#125fb9]/10 px-3 py-1.5 text-xs font-semibold text-[#125fb9] transition-all hover:bg-[#125fb9] hover:text-white"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            {filterFields}
          </div>
        </div>
      )}

      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden thin-scrollbar w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:w-72 lg:overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-700">Filters</h2>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full bg-[#125fb9]/10 px-3 py-1 text-xs font-semibold text-[#125fb9] transition-all hover:bg-[#125fb9] hover:text-white"
          >
            Clear all
          </button>
        </div>
        {filterFields}
      </div>
    </>
  );
};

export default OnlineCourseFilter;