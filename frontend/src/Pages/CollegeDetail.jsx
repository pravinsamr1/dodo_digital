import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  IndianRupee,
  Info,
  MapPin,
  Phone,
  Users,
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { colleges } from '../data/colleges';
import ShareButton from '../components/ShareButton';
import PageSEO from '../components/PageSEO';
import { buildBreadcrumbSchema } from '../config/seo';

const detailTabs = [
  { icon: GraduationCap, label: 'Admission' },
  { icon: Building2, label: 'College Details' },
  { icon: BookOpen, label: 'Facilities' },
  { icon: IndianRupee, label: 'Fees Structure' },
  { icon: Users, label: 'Extra Activities' },
  { icon: ImageIcon, label: 'Gallery' },
];

// Fallback dummy data for college if fields are missing
const dummyGallery = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
];

const dummyFees = {
  ug: [
    { stream: "B.Sc. Computer Science", fee: "₹ 45,000 / year" },
    { stream: "B.Com General", fee: "₹ 38,000 / year" },
    { stream: "B.A. English Literature", fee: "₹ 30,000 / year" },
    { stream: "BCA", fee: "₹ 42,000 / year" }
  ],
  pg: [
    { stream: "M.Sc. Data Science", fee: "₹ 65,000 / year" },
    { stream: "MBA", fee: "₹ 1,20,000 / year" },
    { stream: "M.Com", fee: "₹ 45,000 / year" },
    { stream: "M.A. English", fee: "₹ 35,000 / year" }
  ],
  hostel: [
    { type: "Boys Hostel (AC)", fee: "₹ 1,20,000 / year" },
    { type: "Boys Hostel (Non-AC)", fee: "₹ 80,000 / year" },
    { type: "Girls Hostel (AC)", fee: "₹ 1,25,000 / year" },
    { type: "Girls Hostel (Non-AC)", fee: "₹ 85,000 / year" }
  ]
};

const CollegeDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('College Details');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const college = useMemo(() => {
    const found = colleges.find((c) => c._id === id);
    if (!found) return null;
    return {
      ...found,
      gallery: found.gallery || [found.image, ...dummyGallery].slice(0, 4),
      dayFee: found.dayFee || found.annualFee || "40,000",
      boardingFee: found.boardingFee || "60,000",
      fees: found.fees || dummyFees,
      type: found.stream || 'Arts & Science',
      board: found.collegeType || 'Autonomous',
      gender: found.gender || 'Co-Ed',
      grade: found.program || 'UG & PG'
    };
  }, [id]);

  const activeTabContent = useMemo(() => {
    if (!college) return null;

    const content = {
      'College Details': {
        icon: Building2,
        title: 'College Details',
        subtitle: 'Common Details',
        items: [
          ['Student faculty ratio', '20:1'],
          ['Affiliation', college.board],
          ['Courses', college.grade],
          ['Type', college.type],
        ],
      },
      Facilities: {
        icon: BookOpen,
        title: 'Facilities',
        subtitle: 'Campus & Infrastructure',
        items: [
          ['Smart Classrooms', 'Available with interactive boards'],
          ['Laboratories', 'Advanced Research & Computer Labs'],
          ['Library', 'Well-stocked with 50,000+ books & e-journals'],
          ['Sports Complex', 'Indoor stadium, swimming pool, football ground'],
          ['Hostel', 'Separate AC/Non-AC blocks for boys and girls'],
          ['Cafeteria', 'Multi-cuisine food court'],
        ],
      },
      'Fees Structure': {
        icon: IndianRupee,
        title: 'Fees Structure',
        subtitle: 'Course-wise Annual Fees',
        isTable: true,
      },
      'Extra Activities': {
        icon: Users,
        title: 'Extra Activities',
        subtitle: 'Co-curricular & Extracurricular',
        items: [
          ['Cultural Fests', 'Annual inter-college cultural events'],
          ['Tech Symposiums', 'Hackathons, coding challenges, workshops'],
          ['Sports Tournaments', 'Zonal and state-level participation'],
          ['NSS/NCC', 'Active units for social service and training'],
          ['Entrepreneurship Cell', 'Incubation and startup support'],
        ],
      },
      Admission: {
        icon: GraduationCap,
        title: 'Admission',
        subtitle: 'Admission Process',
        items: [
          ['Admission status', 'Open'],
          ['Eligibility', '10+2 with required cutoff'],
          ['Documents', '12th Marksheet, Transfer Certificate, ID Proof'],
          ['Process', 'Merit-based counseling / Entrance Exam'],
        ],
      },
      Gallery: {
        icon: ImageIcon,
        title: 'Gallery',
        subtitle: 'Campus Images',
        items: [],
      },
    };

    return content[activeTab];
  }, [activeTab, college]);

  const collegeSeo = useMemo(() => {
    if (!college) return { title: 'College Not Found' };
    return {
      title: `${college.name} - Details & Fees`,
      description: college.about,
    };
  }, [college]);

  const collegeJsonLd = useMemo(() => {
    if (!college) return null;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Colleges', path: '/junior-colleges' },
          { name: college.name, path: `/colleges/${college._id}` },
        ]),
        {
          '@type': 'CollegeOrUniversity',
          name: college.name,
          description: college.about,
          address: college.location,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: college.rating,
            reviewCount: college.votes,
          },
        },
      ],
    };
  }, [college]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [college]);

  // Handle keyboard navigation for the modal
  useEffect(() => {
    if (selectedImageIndex === null || !college) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev === 0 ? college.gallery.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev === college.gallery.length - 1 ? 0 : prev + 1));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImageIndex, college]);

  if (!college) {
    return (
      <>
        <PageSEO {...collegeSeo} jsonLd={collegeJsonLd} />
        <main className="min-h-screen bg-slate-50 px-4 sm:px-6 py-16">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 sm:p-10 text-center shadow-sm">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">College not found</h1>
            <p className="mt-3 text-sm text-slate-500">
              The college you are looking for may have been moved or removed.
            </p>
            <Link
              to="/junior-colleges"
              className="mt-6 inline-flex rounded-xl bg-[#125fb9] px-5 py-3 text-sm font-bold text-white"
            >
              Back to All Colleges
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <PageSEO {...collegeSeo} jsonLd={collegeJsonLd} />
      <main className="min-h-screen bg-slate-50 pb-12">
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-3 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-white p-2 sm:p-3 shadow-sm">
            <div className="grid gap-2 sm:gap-3 lg:grid-cols-[1.55fr_1fr]">
              <div className="relative">
                <img
                  src={college.gallery[0]}
                  alt={`${college.name} campus`}
                  className="h-[250px] sm:h-[400px] lg:h-[500px] w-full rounded-2xl object-cover cursor-pointer"
                  onClick={() => setSelectedImageIndex(0)}
                />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-full bg-[#a0083d] px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold text-white shadow-lg shadow-[#a0083d]/25 pointer-events-none">
                  Verified Institution
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-1">
                {college.gallery.slice(1, 3).map((image, idx) => (
                  <img
                    key={image}
                    src={image}
                    alt={`${college.name} gallery`}
                    className="h-[120px] sm:h-[195px] lg:h-[244px] w-full rounded-2xl object-cover cursor-pointer"
                    onClick={() => setSelectedImageIndex(idx + 1)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-5 rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
            <div className="grid gap-5 sm:gap-6 xl:grid-cols-[1.2fr_1.4fr_0.8fr] xl:items-center">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(college.name)}&background=125fb9&color=ffffff&bold=true&size=160`}
                  alt={`${college.name} logo`}
                  className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-2xl border border-slate-100 object-cover shadow-sm"
                />
                <div className="flex flex-col items-center sm:items-start">
                  <h1 className="text-xl font-bold text-slate-950 sm:text-2xl md:text-3xl">
                    {college.name}
                  </h1>
                  <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-[#a0083d]" />
                      {college.location}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500">
                      {'★★★★★'.slice(0, Math.round(college.rating))}
                      <span className="ml-1 text-slate-500">
                        {college.rating} ({college.votes} votes)
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 sm:grid-cols-4">
                <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                  <Building2 size={18} className="mb-1.5 sm:mb-2 text-[#125fb9] mx-auto sm:mx-0" />
                  <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">Type</p>
                  <p className="font-bold text-center sm:text-left">{college.type}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                  <BookOpen size={18} className="mb-1.5 sm:mb-2 text-[#125fb9] mx-auto sm:mx-0" />
                  <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">Board</p>
                  <p className="font-bold text-center sm:text-left">{college.board}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                  <Users size={18} className="mb-1.5 sm:mb-2 text-[#125fb9] mx-auto sm:mx-0" />
                  <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">Gender</p>
                  <p className="font-bold text-center sm:text-left">{college.gender}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 sm:p-4">
                  <GraduationCap size={18} className="mb-1.5 sm:mb-2 text-[#125fb9] mx-auto sm:mx-0" />
                  <p className="text-[10px] sm:text-xs text-slate-400 text-center sm:text-left">Grade</p>
                  <p className="font-bold text-center sm:text-left">{college.grade}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row xl:flex-col gap-4 items-center sm:items-stretch xl:items-end">
                <div className="flex gap-3 w-full sm:w-auto justify-center xl:justify-end">
                  <ShareButton title={college.name} className="flex flex-1 sm:flex-none h-11 w-11 sm:w-11 items-center justify-center rounded-xl border border-[#125fb9]/30 text-[#125fb9] transition-all hover:bg-[#125fb9] hover:text-white" iconSize={19} />
                </div>
                <div className="grid w-full grid-cols-2 gap-3 text-xs sm:text-sm font-bold text-emerald-600 xl:grid-cols-1">
                  <p className="rounded-2xl bg-emerald-50 px-3 py-2 sm:px-4 sm:py-3 text-center xl:text-left">₹ {college.dayFee} <span className="font-medium block sm:inline">Tuition</span></p>
                  <p className="rounded-2xl bg-emerald-50 px-3 py-2 sm:px-4 sm:py-3 text-center xl:text-left">₹ {college.boardingFee} <span className="font-medium block sm:inline">Hostel</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-5 rounded-2xl bg-white p-4 sm:p-5 text-sm leading-7 text-slate-600 shadow-sm">
            <span className="font-bold text-slate-800">About College: </span>
            {college.about}
            <button className="ml-2 font-semibold text-[#a0083d]">Read More</button>
          </div>

          <div className="mt-4 sm:mt-5 flex w-full gap-2 sm:gap-3 overflow-x-auto rounded-2xl bg-white p-2 sm:p-3 shadow-sm md:grid md:grid-cols-6 md:overflow-visible">
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

              {activeTab === 'Gallery' ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                  {college.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="group relative cursor-pointer overflow-hidden rounded-xl"
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <img
                        src={img}
                        alt={`Gallery view ${idx + 1}`}
                        className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-110 sm:h-40"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                    </div>
                  ))}
                </div>
              ) : activeTabContent?.isTable ? (
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-[#125fb9] mb-3">UG Fees Structure</h4>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-[#f8fafc] text-slate-800 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3 font-bold">Stream / Course</th>
                            <th className="px-4 py-3 font-bold">Annual Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {college.fees.ug.map((fee, idx) => (
                            <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                              <td className="px-4 py-3 font-medium text-slate-700">{fee.stream}</td>
                              <td className="px-4 py-3 font-bold text-emerald-600">{fee.fee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#125fb9] mb-3">PG Fees Structure</h4>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-[#f8fafc] text-slate-800 border-b border-slate-200">
                          <tr>
                            <th className="px-4 py-3 font-bold">Stream / Course</th>
                            <th className="px-4 py-3 font-bold">Annual Fee</th>
                          </tr>
                        </thead>
                        <tbody>
                          {college.fees.pg.map((fee, idx) => (
                            <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                              <td className="px-4 py-3 font-medium text-slate-700">{fee.stream}</td>
                              <td className="px-4 py-3 font-bold text-emerald-600">{fee.fee}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {college.fees.hostel && (
                    <div>
                      <h4 className="text-lg font-bold text-[#125fb9] mb-3">Hostel Fees Structure</h4>
                      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                        <table className="w-full text-left text-sm text-slate-600">
                          <thead className="bg-[#f8fafc] text-slate-800 border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-3 font-bold">Accommodation Type</th>
                              <th className="px-4 py-3 font-bold">Annual Fee</th>
                            </tr>
                          </thead>
                          <tbody>
                            {college.fees.hostel.map((fee, idx) => (
                              <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                                <td className="px-4 py-3 font-medium text-slate-700">{fee.type}</td>
                                <td className="px-4 py-3 font-bold text-emerald-600">{fee.fee}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid gap-3 sm:gap-4 text-xs sm:text-sm md:grid-cols-2">
                  {activeTabContent?.items.map(([label, value]) => (
                    <div key={label} className="rounded-xl bg-slate-50 p-3 sm:p-4">
                      {label}: <span className="font-bold text-[#125fb9] block sm:inline mt-0.5 sm:mt-0">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="text-center text-lg sm:text-xl font-bold text-slate-900">
              Schedule a counseling meeting
            </h2>
            <form className="mt-5 sm:mt-6 space-y-4">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                College Name
                <input
                  type="text"
                  value={college.name}
                  readOnly
                  className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-slate-600 outline-none cursor-not-allowed"
                />
              </label>
              <label className="block text-xs sm:text-sm font-semibold text-slate-700">
                Student Name
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
                City
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-[#125fb9] focus:bg-white"
                />
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

        {/* Fullscreen Image Modal */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <X size={24} />
            </button>

            {college.gallery.length > 1 && (
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === 0 ? college.gallery.length - 1 : prev - 1
                  )
                }
                className="absolute left-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-8"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            <div className="relative flex max-h-screen w-full items-center justify-center px-12 sm:px-20">
              <img
                src={college.gallery[selectedImageIndex]}
                alt={`Fullscreen gallery ${selectedImageIndex + 1}`}
                className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
              />
            </div>

            {college.gallery.length > 1 && (
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) =>
                    prev === college.gallery.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-8"
              >
                <ChevronRight size={32} />
              </button>
            )}
            
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium text-white/70">
              {selectedImageIndex + 1} / {college.gallery.length}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default CollegeDetail;
