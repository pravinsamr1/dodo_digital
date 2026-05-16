import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, Filter, X } from 'lucide-react';

const AcademicClassFilter = ({ onFilterChange }) => {
  const [schedule, setSchedule] = useState('Weekday Evening');
  const [selectedActivity, setSelectedActivity] = useState('Dance');
  const [ageGroup, setAgeGroup] = useState('9-12 years');
  const [skillLevel, setSkillLevel] = useState('Beginner');
  const [monthlyFee, setMonthlyFee] = useState(2500);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const filterOptions = {
    activities: [
      'Dance',
      'Music',
      'Art & Craft',
      'Chess',
      'Robotics',
      'Sports',
      'Drama',
      'Language',
      'Academics',
    ],
    ageGroups: ['5-8 years', '9-12 years', '13-16 years', '17+ years'],
    skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
    schedules: ['Weekday Morning', 'Weekday Evening', 'Weekend'],
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

  const formatFee = (amount) =>
    new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR',
    }).format(amount);

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({ activity: selectedActivity, ageGroup, skillLevel, schedule, monthlyFee });
    }
    setIsMobileOpen(false);
  };

  const clearFilters = () => {
    setSchedule('Weekday Evening');
    setSelectedActivity('Dance');
    setAgeGroup('9-12 years');
    setSkillLevel('Beginner');
    setMonthlyFee(2500);
    if (onFilterChange) {
      onFilterChange({ activity: 'Dance', ageGroup: '9-12 years', skillLevel: 'Beginner', schedule: 'Weekday Evening', monthlyFee: 2500 });
    }
  };

  const filterFields = (
    <>
      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Activity</p>
        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto thin-scrollbar">
          {filterOptions.activities.map((activity) => {
            const isSelected = selectedActivity === activity;

            return (
              <label
                key={activity}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-1 text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'border-[#125fb9] bg-[#125fb9]/10 text-[#125fb9] shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#125fb9]/40 hover:bg-[#125fb9]/5'
                }`}
              >
                <input
                  type="radio"
                  name="class-activity"
                  checked={isSelected}
                  onChange={() => setSelectedActivity(activity)}
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
                {activity}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Age Group</p>
        <div className="grid grid-cols-1 gap-2">
          {filterOptions.ageGroups.map((item) => {
            const isSelected = ageGroup === item;

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
                  name="class-age"
                  checked={isSelected}
                  onChange={() => setAgeGroup(item)}
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
        <p className="text-sm text-slate-500">Skill Level</p>
        <div className="grid grid-cols-1 gap-2">
          {filterOptions.skillLevels.map((item) => {
            const isSelected = skillLevel === item;

            return (
              <label
                key={item}
                className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-1 text-sm font-semibold transition-all duration-300 ${
                  isSelected
                    ? 'border-[#125fb9] bg-[#125fb9]/10 text-[#125fb9] shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-[#125fb9]/40 hover:bg-[#125fb9]/5'
                }`}
              >
                <input
                  type="radio"
                  name="class-skill"
                  checked={isSelected}
                  onChange={() => setSkillLevel(item)}
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
                {item}
              </label>
            );
          })}
        </div>
      </div>

      <div className="space-y-2 pt-5">
        <p className="text-sm text-slate-500">Schedule</p>
        <div className="relative">
          <select
            value={schedule}
            onChange={(event) => setSchedule(event.target.value)}
            className="w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-4 py-2 pr-12 text-sm font-semibold text-slate-700 outline-none transition-all focus:border-[#125fb9] focus:bg-white focus:shadow-md focus:shadow-[#125fb9]/10"
          >
            {filterOptions.schedules.map((item) => (
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
          <p className="text-sm text-slate-500">Monthly Fee</p>
          <span className="rounded-full bg-[#a0083d]/10 px-3 py-1 text-xs font-semibold text-[#a0083d]">
            {formatFee(monthlyFee)}
          </span>
        </div>
        <input
          type="range"
          min="1000"
          max="10000"
          step="100"
          value={monthlyFee}
          onChange={(event) => setMonthlyFee(Number(event.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 outline-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#a0083d] [&::-moz-range-thumb]:shadow-md [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#a0083d] [&::-webkit-slider-thumb]:shadow-md"
          style={{
            background: `linear-gradient(to right, #a0083d 0%, #a0083d ${((monthlyFee - 1000) / (10000 - 1000)) * 100}%, #e2e8f0 ${((monthlyFee - 1000) / (10000 - 1000)) * 100}%, #e2e8f0 100%)`,
          }}
        />
        <div className="flex justify-between text-[11px] font-medium text-slate-400">
          <span>{formatFee(1000)}</span>
          <span>{formatFee(10000)}</span>
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

export default AcademicClassFilter;
