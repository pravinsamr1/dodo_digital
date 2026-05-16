import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Globe,
  GraduationCap,
  Info,
  Phone,
  Star,
  Users,
  Video,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { onlineCourses } from '../data/onlineCourses';
import ShareButton from '../components/ShareButton';
import PageSEO from '../components/PageSEO';

const detailTabs = [
  { icon: BookOpen, label: 'Curriculum' },
  { icon: Info, label: 'Course Info' },
  { icon: ShieldCheck, label: 'Certification' },
  { icon: Users, label: 'Instructors' },
  { icon: Star, label: 'Reviews' },
];

const OnlineCourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Course Info');

  const course = useMemo(() => {
    return onlineCourses.find((c) => c._id === id);
  }, [id]);

  const syllabus = [
    { module: "Module 1: Introduction", duration: "2 Weeks", topics: ["Basic concepts", "Environment setup", "First steps"] },
    { module: "Module 2: Core Concepts", duration: "4 Weeks", topics: ["Fundamental principles", "Deep dive into architecture", "Advanced syntax"] },
    { module: "Module 3: Project Work", duration: "6 Weeks", topics: ["Building real-world apps", "Database integration", "Deployment"] },
    { module: "Module 4: Final Certification", duration: "2 Weeks", topics: ["Review", "Final Exam", "Project submission"] }
  ];

  const activeTabContent = useMemo(() => {
    if (!course) return null;

    const content = {
      'Course Info': {
        icon: Info,
        title: 'Course Information',
        subtitle: 'Key Highlights',
        items: [
          ['Duration', course.duration],
          ['Level', course.level],
          ['Learning Mode', course.learningMode],
          ['Language', course.language],
          ['Total Students', course.students],
          ['Provider', course.provider],
        ],
      },
      Curriculum: {
        icon: BookOpen,
        title: 'Course Curriculum',
        subtitle: 'Module-wise Breakdown',
        isTable: true,
      },
      Certification: {
        icon: ShieldCheck,
        title: 'Certification',
        subtitle: 'What you get',
        items: [
          ['Verified Certificate', 'Get a shareable certificate upon completion'],
          ['Industry Recognized', 'Accepted by top tech companies'],
          ['Lifetime Access', 'Keep the materials forever'],
          ['LMS Access', '24/7 access to our learning platform'],
        ],
      },
      Instructors: {
        icon: Users,
        title: 'Instructors',
        subtitle: 'Learn from the best',
        items: [
          ['Expert Guidance', 'Mentors from top universities'],
          ['Doubt Clearing', 'Weekly live sessions with industry experts'],
          ['Community Support', 'Access to exclusive student forums'],
        ],
      },
      Reviews: {
        icon: Star,
        title: 'Reviews',
        subtitle: 'What students say',
        items: [
          ['Rating', `${course.rating}/5.0`],
          ['Trust Score', 'Highly Recommended'],
          ['Success Stories', 'Over 1000+ alumni placed in top companies'],
        ],
      },
    };

    return content[activeTab];
  }, [activeTab, course]);

  const courseSeo = useMemo(() => {
    if (!course) return { title: 'Course Not Found' };
    return {
      title: `${course.title} - Online Course by ${course.provider}`,
      description: course.about,
    };
  }, [course]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course]);

  if (!course) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl text-center max-w-md w-full">
          <h1 className="text-2xl font-[500] text-slate-900">Course not found</h1>
          <p className="mt-2 text-slate-500">The course you are looking for doesn't exist.</p>
          <Link to="/online-education" className="mt-6 inline-block bg-[#125fb9] text-white px-6 py-2 rounded-xl font-bold">
            Browse Courses
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <PageSEO {...courseSeo} />
      <main className="min-h-screen bg-slate-50 pb-12">
        <section className="mx-auto max-w-[1400px] px-4 sm:px-6 pt-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Left Column: Media & Header */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl bg-white p-3">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-[300px] sm:h-[450px] w-full rounded-2xl object-cover"
                />
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="bg-[#a0083d] text-white px-4 py-1.5 rounded-full text-xs font-bold">
                    {course.category}
                  </span>
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold">
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-[500] text-slate-950 sm:text-3xl md:text-4xl leading-tight">
                      {course.title}
                    </h1>
                    <p className="mt-2 text-lg text-slate-500 font-medium">
                      Offered by <span className="text-[#125fb9] font-bold">{course.provider}</span>
                    </p>
                  </div>
                  <ShareButton title={course.title} className="h-12 w-12 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50" />
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Clock, label: 'Duration', value: course.duration },
                    { icon: Video, label: 'Format', value: course.learningMode },
                    { icon: Globe, label: 'Language', value: course.language },
                    { icon: Users, label: 'Students', value: course.students },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-2xl">
                      <item.icon size={20} className="text-[#125fb9] mb-2" />
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{item.label}</p>
                      <p className="font-bold text-slate-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200">
                <h3 className="text-xl font-[500] text-slate-900 mb-4">About this Course</h3>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {course.about}
                </p>
              </div>

              {/* Tabs Section */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {detailTabs.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setActiveTab(label)}
                    className={`flex items-center gap-2 shrink-0 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                      activeTab === label
                        ? 'bg-[#125fb9] text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                ))}
              </div>

              <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-[#125fb9]/10 flex items-center justify-center text-[#125fb9]">
                    {activeTabContent && <activeTabContent.icon size={24} />}
                  </div>
                  <div>
                    <h2 className="text-2xl font-[500] text-slate-900">{activeTabContent?.title}</h2>
                    <p className="text-slate-500 font-medium">{activeTabContent?.subtitle}</p>
                  </div>
                </div>

                {activeTabContent?.isTable ? (
                  <div className="space-y-4">
                    {syllabus.map((item, idx) => (
                      <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
                        <div className="bg-slate-50 p-4 flex justify-between items-center border-b border-slate-100">
                          <h4 className="font-[500] text-slate-800">{item.module}</h4>
                          <span className="text-xs font-bold text-[#125fb9] bg-white px-3 py-1 rounded-full">
                            {item.duration}
                          </span>
                        </div>
                        <div className="p-4 bg-white">
                          <ul className="space-y-2">
                            {item.topics.map((topic, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {activeTabContent?.items.map(([label, value]) => (
                      <div key={label} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                        <p className="text-slate-800 font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Pricing & Counseling */}
            <div className="space-y-6">
              <aside className="sticky top-24 space-y-6">
                <div className="rounded-3xl bg-[#a0083d] p-8 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="relative z-10">
                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Enrollment Fee</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <h2 className="text-5xl font-[500]">₹{course.price}</h2>
                      <span className="text-sm font-medium opacity-80">Full Course</span>
                    </div>
                    <p className="mt-4 text-xs font-medium opacity-90 leading-relaxed">
                      Includes 24/7 access, mentor support, and certification.
                    </p>
                    <button className="mt-8 w-full bg-white text-[#a0083d] py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-[0.98]">
                      Enroll Now
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 border border-slate-100">
                  <h3 className="text-xl font-[500] text-slate-900 text-center">Inquiry Form</h3>
                  <p className="mt-2 text-sm text-slate-500 text-center font-medium">Interested? Let our experts call you.</p>
                  
                  <form className="mt-6 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Course</label>
                      <input type="text" value={course.title} readOnly className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold text-slate-400 cursor-not-allowed" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Your Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:bg-white focus:border-[#125fb9] outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">Mobile</label>
                      <input type="tel" placeholder="+91" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:bg-white focus:border-[#125fb9] outline-none transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">City</label>
                      <input type="text" placeholder="Your City" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm focus:bg-white focus:border-[#125fb9] outline-none transition-all" />
                    </div>
                    <button className="w-full bg-[#125fb9] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest mt-2 transition-all hover:bg-[#125fb9]/90">
                      Request a Call
                    </button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OnlineCourseDetail;
