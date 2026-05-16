import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  Heart,
  IndianRupee,
  Info,
  MapPin,
  Phone,
  Share2,
  Users,
} from 'lucide-react';
import { schools } from '../data/schools';
import PageSEO from '../components/PageSEO';
import { buildSchoolDetailSeo, buildBreadcrumbSchema } from '../config/seo';

const detailTabs = [
  { icon: GraduationCap, label: 'Admission' },
  { icon: Building2, label: 'School Details' },
  { icon: BookOpen, label: 'Academics' },
  { icon: IndianRupee, label: 'Fees' },
  { icon: Users, label: 'Activities' },
];

const SchoolDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('School Details');
  const school = useMemo(
    () => schools.find((currentSchool) => currentSchool._id === id),
    [id]
  );

  const activeTabContent = useMemo(() => {
    if (!school) return null;

    const content = {
      'School Details': {
        icon: Building2,
        title: 'School Details',
        subtitle: 'Common Details',
        items: [
          ['Student teacher ratio', '30:1'],
          ['Language of instruction', 'English, Hindi'],
          ['Grade', school.grade],
          ['Board', school.board],
        ],
      },
      Academics: {
        icon: BookOpen,
        title: 'Academics',
        subtitle: 'Learning Approach',
        items: [
          ['Curriculum', school.board],
          ['Academic level', school.grade],
          ['Assessment style', 'Term exams, projects, activities'],
          ['Learning support', 'Mentoring and remedial sessions'],
        ],
      },
      Fees: {
        icon: IndianRupee,
        title: 'Fees',
        subtitle: 'Estimated Fee Details',
        items: [
          ['Day school fee', `₹ ${school.dayFee} / year`],
          ['Boarding fee', `₹ ${school.boardingFee} / year`],
          ['Application fee', '₹ 1,000'],
          ['Payment mode', 'Term-wise and annual'],
        ],
      },
      Activities: {
        icon: Users,
        title: 'Activities',
        subtitle: 'Campus Life',
        items: [
          ['Sports', 'Football, basketball, athletics'],
          ['Clubs', 'Science, arts, debate, robotics'],
          ['Events', 'Annual day, exhibitions, competitions'],
          ['Student care', 'Counselling and wellness support'],
        ],
      },
      Admission: {
        icon: GraduationCap,
        title: 'Admission',
        subtitle: 'Admission Process',
        items: [
          ['Admission status', 'Open'],
          ['Eligibility', school.grade],
          ['Documents', 'Birth certificate, transfer certificate, marksheet'],
          ['Interaction', 'Parent counselling and student assessment'],
        ],
      },
    };

    return content[activeTab];
  }, [activeTab, school]);

  const schoolSeo = useMemo(() => buildSchoolDetailSeo(school), [school]);

  const schoolJsonLd = useMemo(() => {
    if (!school) return null;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Schools', path: '/allschools' },
          { name: school.name, path: `/schools/${school._id}` },
        ]),
        {
          '@type': 'School',
          name: school.name,
          description: school.about,
          address: school.location,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: school.rating,
            reviewCount: school.votes,
          },
        },
      ],
    };
  }, [school]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [school]);

  if (!school) {
    return (
      <>
        <PageSEO {...schoolSeo} jsonLd={schoolJsonLd} />
      <main className="min-h-screen bg-slate-50 px-4 sm:px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 sm:p-10 text-center shadow-sm">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">School not found</h1>
          <p className="mt-3 text-sm text-slate-500">
            The school you are looking for may have been moved or removed.
          </p>
          <Link
            to="/allschools"
            className="mt-6 inline-flex rounded-xl bg-[#125fb9] px-5 py-3 text-sm font-bold text-white"
          >
            Back to All Schools
          </Link>
        </div>
      </main>
      </>
    );
  }

  return (
    <>
      <PageSEO {...schoolSeo} jsonLd={schoolJsonLd} />
    <main className="min-h-screen bg-slate-50 pb-12">
      
      <section className="mx-auto mt-4 sm:mt-6 max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white p-2 sm:p-3 shadow-sm">
          <div className="grid gap-2 sm:gap-3 lg:grid-cols-[1.55fr_1fr]">
            <div className="relative">
              <img
                src={school.gallery[0]}
                alt={`${school.name} campus`}
                className="h-[250px] sm:h-[400px] lg:h-[500px] w-full rounded-2xl object-cover"
              />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-full bg-[#a0083d] px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold text-white shadow-lg shadow-[#a0083d]/25">
                Managed by School
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1">
              {school.gallery.slice(1).map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={`${school.name} gallery`}
                  className="h-[80px] sm:h-[130px] lg:h-[244px] w-full rounded-2xl object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
          <div className="grid gap-5 sm:gap-6 xl:grid-cols-[1.2fr_1.4fr_0.8fr] xl:items-center">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(school.name)}&background=125fb9&color=ffffff&bold=true&size=160`}
                alt={`${school.name} logo`}
                className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl border border-slate-100 object-cover shadow-sm"
              />
              <div className="flex flex-col items-center sm:items-start">
                <h1 className="text-xl font-bold text-slate-950 sm:text-2xl md:text-3xl">
                  {school.name}
                </h1>
                <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-[#a0083d]" />
                    {school.location}
                  </span>
                  <span className="flex items-center gap-1 text-amber-500">
                    {'★★★★★'.slice(0, Math.round(school.rating))}
                    <span className="ml-1 text-slate-500">
                      {school.rating} ({school.votes} votes)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 sm:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                <Building2 size={18} className="mb-1.5 sm:mb-2 text-[#125fb9] mx-auto sm:mx-0" />
                <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">Type</p>
                <p className="font-bold text-center sm:text-left">{school.type}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                <BookOpen size={18} className="mb-1.5 sm:mb-2 text-[#125fb9] mx-auto sm:mx-0" />
                <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">Board</p>
                <p className="font-bold text-center sm:text-left">{school.board}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                <Users size={18} className="mb-1.5 sm:mb-2 text-[#125fb9] mx-auto sm:mx-0" />
                <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">Gender</p>
                <p className="font-bold text-center sm:text-left">{school.gender}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                <GraduationCap size={18} className="mb-1.5 sm:mb-2 text-[#125fb9] mx-auto sm:mx-0" />
                <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">Grade</p>
                <p className="font-bold text-center sm:text-left">{school.grade}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row xl:flex-col gap-4 items-center sm:items-stretch xl:items-end">
              <div className="flex gap-3 w-full sm:w-auto justify-center xl:justify-end">
                <button className="flex flex-1 sm:flex-none h-11 w-11 sm:w-11 items-center justify-center rounded-xl border border-[#125fb9]/30 text-[#125fb9] transition-all hover:bg-[#125fb9] hover:text-white">
                  <Heart size={19} />
                </button>
                <button className="flex flex-1 sm:flex-none h-11 w-11 sm:w-11 items-center justify-center rounded-xl border border-[#125fb9]/30 text-[#125fb9] transition-all hover:bg-[#125fb9] hover:text-white">
                  <Share2 size={19} />
                </button>
              </div>
              <div className="grid w-full grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-emerald-600 xl:grid-cols-1">
                <p className="rounded-2xl bg-emerald-50 px-3 py-2 sm:px-4 sm:py-3 text-center xl:text-left">₹ {school.dayFee} <span className="font-medium block sm:inline">Day</span></p>
                <p className="rounded-2xl bg-emerald-50 px-3 py-2 sm:px-4 sm:py-3 text-center xl:text-left">₹ {school.boardingFee} <span className="font-medium block sm:inline">Boarding</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 rounded-2xl bg-white p-4 sm:p-5 text-sm leading-7 text-slate-600 shadow-sm">
          <span className="font-bold text-slate-800">About School: </span>
          {school.about}
          <button className="ml-2 font-semibold text-[#a0083d]">Read More</button>
        </div>

        <div className="mt-4 sm:mt-5 flex w-full gap-2 sm:gap-3 overflow-x-auto rounded-2xl bg-white p-2 sm:p-3 shadow-sm md:grid md:grid-cols-5 md:overflow-visible">
          {detailTabs.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveTab(label)}
              className={`flex min-w-[90px] shrink-0 md:min-w-0 md:shrink flex-col items-center gap-1.5 sm:gap-2 rounded-xl p-2 sm:p-3 text-[10px] sm:text-xs font-semibold transition-all ${
                activeTab === label
                  ? 'bg-[#125fb9] text-white shadow-md shadow-[#125fb9]/20'
                  : 'text-slate-600 hover:bg-[#125fb9]/10 hover:text-[#125fb9]'
              }`}
            >
              <Icon size={20} className="sm:h-6 sm:w-6" />
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-5 sm:mt-7 grid max-w-[1400px] gap-5 sm:gap-7 px-4 sm:px-6 lg:px-8 lg:grid-cols-[2fr_0.85fr]">
        <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold text-slate-900">
            {activeTabContent && <activeTabContent.icon className="text-[#125fb9] h-5 w-5 sm:h-6 sm:w-6" />}
            {activeTabContent?.title}
          </h2>

          <div className="mt-4 sm:mt-6 rounded-2xl border border-slate-200 p-4 sm:p-5">
            <h3 className="mb-4 sm:mb-5 flex items-center gap-2 text-base sm:text-lg font-bold text-slate-800">
              <Info size={18} className="text-[#125fb9] sm:h-5 sm:w-5" />
              {activeTabContent?.subtitle}
            </h3>

            <div className="grid gap-3 sm:gap-4 text-xs sm:text-sm md:grid-cols-2">
              {activeTabContent?.items.map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3 sm:p-4">
                  {label}: <span className="font-bold text-[#125fb9] block sm:inline mt-0.5 sm:mt-0">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-center text-lg sm:text-xl font-bold text-slate-900">
            Schedule a counselling meeting
          </h2>
          <form className="mt-5 sm:mt-6 space-y-4">
            <label className="block text-xs sm:text-sm font-semibold text-slate-700">
              Parent Name
              <input
                type="text"
                placeholder="Type name"
                className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#125fb9] focus:bg-white"
              />
            </label>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700">
              Mobile Number
              <input
                type="tel"
                placeholder="+91"
                className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#125fb9] focus:bg-white"
              />
            </label>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700">
              Date & Time Slot
              <div className="mt-1.5 sm:mt-2 flex items-center gap-2 sm:gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-slate-500">
                <CalendarDays size={16} className="sm:h-4 sm:w-4" />
                Select preferred slot
              </div>
            </label>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#125fb9] px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white transition-all hover:bg-[#0d4a91]"
            >
              <Phone size={16} className="sm:h-[18px] sm:w-[18px]" />
              Request a Call
            </button>
          </form>
        </aside>
      </section>
    </main>
    </>
  );
};

export default SchoolDetail;
