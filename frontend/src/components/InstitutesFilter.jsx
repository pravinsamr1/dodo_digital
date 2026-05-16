import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

const InstitutesFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [learningMode, setLearningMode] = useState('All');

  const categories = ['All', 'Software Development', 'Electrical Design', 'SCADA & PLC', 'Cyber Security', 'Mechanical Design', 'Data Science'];
  const learningModes = ['All', 'Online', 'Offline', 'Hybrid'];

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({ category: selectedCategory, mode: learningMode });
    }
  }, [selectedCategory, learningMode, onFilterChange]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setLearningMode('All');
  };

  return (
    <div className="thin-scrollbar w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:w-72 lg:overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-slate-700">Filters</h2>
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-full bg-[#125fb9]/10 px-3 py-1 text-xs font-semibold text-[#125fb9] transition-all hover:bg-[#125fb9] hover:text-white"
        >
          Clear all
        </button>
      </div>

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
    </div>
  );
};

export default InstitutesFilter;
