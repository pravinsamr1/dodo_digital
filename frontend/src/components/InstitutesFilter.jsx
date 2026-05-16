import React, { useState, useEffect } from 'react';
import { Check, Filter, X } from 'lucide-react';

const InstitutesFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [learningMode, setLearningMode] = useState('All');
  const [maxPrice, setMaxPrice] = useState(100000);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const categories = ['All', 'Software Development', 'Electrical Design', 'SCADA & PLC', 'Cyber Security', 'Mechanical Design', 'Data Science'];
  const learningModes = ['All', 'Online', 'Offline', 'Hybrid'];

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({ category: selectedCategory, mode: learningMode, maxPrice });
    }
    setIsMobileOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setLearningMode('All');
    setMaxPrice(100000);
    if (onFilterChange) {
      onFilterChange({ category: 'All', mode: 'All', maxPrice: 100000 });
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

  const filterFields = (
    <>
      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Category</p>
        <div className="grid grid-cols-1 gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <label
                key={cat}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-1 text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'border-[#125fb9] bg-[#125fb9]/10 text-[#125fb9] shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#125fb9]/40 hover:bg-[#125fb9]/5'
                }`}
              >
                <input
                  type="radio"
                  name="institute-category"
                  checked={isSelected}
                  onChange={() => setSelectedCategory(cat)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-4xl border transition-all ${
                    isSelected ? 'border-[#125fb9] bg-[#125fb9] text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check size={13} strokeWidth={3} />}
                </span>
                {cat}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Learning Mode</p>
        <div className="grid grid-cols-1 gap-2">
          {learningModes.map((mode) => {
            const isSelected = learningMode === mode;
            return (
              <label
                key={mode}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-1 text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'border-[#a0083d] bg-[#a0083d]/10 text-[#a0083d] shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#a0083d]/40 hover:bg-[#a0083d]/5'
                }`}
              >
                <input
                  type="radio"
                  name="institute-mode"
                  checked={isSelected}
                  onChange={() => setLearningMode(mode)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-4xl border transition-all ${
                    isSelected ? 'border-[#a0083d] bg-[#a0083d] text-white' : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check size={13} strokeWidth={3} />}
                </span>
                {mode}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">Max Fees</p>
          <span className="text-sm font-bold text-[#a0083d]">
            ₹{maxPrice.toLocaleString()}
          </span>
        </div>
        <div className="px-1">
          <input
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 outline-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#a0083d] [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#a0083d] [&::-webkit-slider-thumb]:shadow-md"
            style={{
              background: `linear-gradient(to right, #a0083d 0%, #a0083d ${((maxPrice - 10000) / (100000 - 10000)) * 100}%, #e2e8f0 ${((maxPrice - 10000) / (100000 - 10000)) * 100}%, #e2e8f0 100%)`,
            }}
          />
          <div className="flex justify-between pt-2 text-[10px] font-medium text-slate-400">
            <span>₹10k</span>
            <span>₹100k</span>
          </div>
        </div>
      </div>

      <div className="pt-6 pb-2">
        <button
          type="button"
          onClick={handleApply}
          className="w-full rounded-xl bg-[#125fb9] py-3 text-sm font-bold text-white transition-all hover:bg-[#125fb9]/90 active:scale-[0.98]"
        >
          Apply Filter
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

export default InstitutesFilter;
