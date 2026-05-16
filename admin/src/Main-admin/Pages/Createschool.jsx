import React, { useState } from 'react';
import {
  School,
  Upload,
  MapPin,
  ImagePlus,
  Phone,
  Mail,
  Globe,
  IndianRupee,
  BookOpen,
  Building2,
  Users,
} from 'lucide-react';

const CreateSchool = () => {
  const [schoolData, setSchoolData] = useState({
    name: '',
    board: '',
    type: '',
    category: '',
    description: '',
    city: '',
    locality: '',
    address: '',
    latitude: '',
    longitude: '',
    phone: '',
    email: '',
    website: '',
    establishedYear: '',
    studentCount: '',
    annualFees: '',
    boardingFees: '',
    applicationFees: '',
    paymentMode: '',
    grade: '',
    gender: '',
    rating: '',
    votes: '',
    studentTeacherRatio: '',
    languages: '',
    assessmentStyle: '',
    learningSupport: '',
    sports: '',
    clubs: '',
    events: '',
    studentCare: '',
    admissionStatus: '',
    eligibility: '',
    documentsRequired: '',
    admissionInteraction: '',
    expertComment: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    logo: null,
    bannerImage: null,
    galleryImages: [],
    admissionOpen: false,
    hostelAvailable: false,
    transportAvailable: false,
    smartClassAvailable: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSchoolData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('School Data:', schoolData);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Create School
            </h1>

            <p className="mt-2 text-sm font-medium text-slate-500">
              Add complete school details, images, facilities and geo location.
            </p>
          </div>

          <button
            type="button"
            className="rounded-2xl bg-[#125fb9] px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#0d4a91]"
          >
            Save School
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#125fb9]/10 text-[#125fb9]">
                <School size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Basic Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Main school details visible in frontend.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  School Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={schoolData.name}
                  onChange={handleChange}
                  placeholder="Enter school name"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none transition-all focus:border-[#125fb9]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Board
                </label>

                <select
                  name="board"
                  value={schoolData.board}
                  onChange={handleChange}
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                >
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="IB">IB</option>
                  <option value="State Board">State Board</option>
                  <option value="IGCSE">IGCSE</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  School Type
                </label>

                <select
                  name="type"
                  value={schoolData.type}
                  onChange={handleChange}
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                >
                  <option value="">Select Type</option>
                  <option value="Day School">Day School</option>
                  <option value="Boarding School">Boarding School</option>
                  <option value="International School">International School</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Gender
                </label>

                <select
                  name="gender"
                  value={schoolData.gender}
                  onChange={handleChange}
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                >
                  <option value="">Select Gender</option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                  <option value="Co-Ed">Co-Ed</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Grade Range
                </label>

                <input
                  type="text"
                  name="grade"
                  value={schoolData.grade}
                  onChange={handleChange}
                  placeholder="LKG - 12"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Rating
                </label>

                <input
                  type="text"
                  name="rating"
                  value={schoolData.rating}
                  onChange={handleChange}
                  placeholder="4.8"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Total Votes
                </label>

                <input
                  type="number"
                  name="votes"
                  value={schoolData.votes}
                  onChange={handleChange}
                  placeholder="128"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={schoolData.category}
                  onChange={handleChange}
                  placeholder="e.g Government School"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Established Year
                </label>

                <input
                  type="number"
                  name="establishedYear"
                  value={schoolData.establishedYear}
                  onChange={handleChange}
                  placeholder="1998"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Student Count
                </label>

                <input
                  type="number"
                  name="studentCount"
                  value={schoolData.studentCount}
                  onChange={handleChange}
                  placeholder="2500"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold text-slate-700">
                School Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={schoolData.description}
                onChange={handleChange}
                placeholder="Write school overview..."
                className="w-full rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />
            </div>
          </div>

          {/* Contact & Location */}
          <div className="grid gap-8 xl:grid-cols-2">
            <div className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <MapPin size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Location Details
                  </h2>
                </div>
              </div>

              <div className="space-y-5">
                <input
                  type="text"
                  name="city"
                  value={schoolData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                />

                <input
                  type="text"
                  name="locality"
                  value={schoolData.locality}
                  onChange={handleChange}
                  placeholder="Local Area / Locality"
                  className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                />

                <textarea
                  rows="4"
                  name="address"
                  value={schoolData.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  className="w-full rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="latitude"
                    value={schoolData.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                    className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                  />

                  <input
                    type="text"
                    name="longitude"
                    value={schoolData.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <Phone size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Contact Information
                  </h2>
                </div>
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <Phone size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="phone"
                    value={schoolData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-5 outline-none focus:border-[#125fb9]"
                  />
                </div>

                <div className="relative">
                  <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="email"
                    name="email"
                    value={schoolData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-5 outline-none focus:border-[#125fb9]"
                  />
                </div>

                <div className="relative">
                  <Globe size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="website"
                    value={schoolData.website}
                    onChange={handleChange}
                    placeholder="Website URL"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-5 outline-none focus:border-[#125fb9]"
                  />
                </div>

                <div className="relative">
                  <IndianRupee size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    name="annualFees"
                    value={schoolData.annualFees}
                    onChange={handleChange}
                    placeholder="Annual Fees"
                    className="h-14 w-full rounded-2xl border border-slate-200 pl-14 pr-5 outline-none focus:border-[#125fb9]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-[#125fb9]">
                <BookOpen size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Academic Information
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <input
                type="text"
                name="studentTeacherRatio"
                value={schoolData.studentTeacherRatio}
                onChange={handleChange}
                placeholder="Student Teacher Ratio"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />

              <input
                type="text"
                name="languages"
                value={schoolData.languages}
                onChange={handleChange}
                placeholder="Languages"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />

              <input
                type="text"
                name="assessmentStyle"
                value={schoolData.assessmentStyle}
                onChange={handleChange}
                placeholder="Assessment Style"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />

              <input
                type="text"
                name="learningSupport"
                value={schoolData.learningSupport}
                onChange={handleChange}
                placeholder="Learning Support"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />
            </div>
          </div>

          {/* Fees Section */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <IndianRupee size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Fee Structure
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <input
                type="text"
                name="annualFees"
                value={schoolData.annualFees}
                onChange={handleChange}
                placeholder="Day School Fees"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />

              <input
                type="text"
                name="boardingFees"
                value={schoolData.boardingFees}
                onChange={handleChange}
                placeholder="Boarding Fees"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />

              <input
                type="text"
                name="applicationFees"
                value={schoolData.applicationFees}
                onChange={handleChange}
                placeholder="Application Fees"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />

              <input
                type="text"
                name="paymentMode"
                value={schoolData.paymentMode}
                onChange={handleChange}
                placeholder="Payment Mode"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />
            </div>
          </div>

          {/* Activities Section */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                <Users size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Activities & Campus Life
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <textarea
                rows="4"
                name="sports"
                value={schoolData.sports}
                onChange={handleChange}
                placeholder="Sports"
                className="rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />

              <textarea
                rows="4"
                name="clubs"
                value={schoolData.clubs}
                onChange={handleChange}
                placeholder="Clubs"
                className="rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />

              <textarea
                rows="4"
                name="events"
                value={schoolData.events}
                onChange={handleChange}
                placeholder="Events"
                className="rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />

              <textarea
                rows="4"
                name="studentCare"
                value={schoolData.studentCare}
                onChange={handleChange}
                placeholder="Student Care"
                className="rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />
            </div>
          </div>

          {/* Admission Section */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <School size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Admission Information
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <textarea
                rows="4"
                name="admissionStatus"
                value={schoolData.admissionStatus}
                onChange={handleChange}
                placeholder="Admission Status"
                className="rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />

              <textarea
                rows="4"
                name="eligibility"
                value={schoolData.eligibility}
                onChange={handleChange}
                placeholder="Eligibility"
                className="rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />

              <textarea
                rows="4"
                name="documentsRequired"
                value={schoolData.documentsRequired}
                onChange={handleChange}
                placeholder="Documents Required"
                className="rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />

              <textarea
                rows="4"
                name="admissionInteraction"
                value={schoolData.admissionInteraction}
                onChange={handleChange}
                placeholder="Admission Interaction"
                className="rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
              />
            </div>
          </div>

          {/* Facilities */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <Building2 size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Facilities & Features
                </h2>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: 'Admission Open',
                  name: 'admissionOpen',
                },
                {
                  label: 'Hostel Available',
                  name: 'hostelAvailable',
                },
                {
                  label: 'Transport Available',
                  name: 'transportAvailable',
                },
                {
                  label: 'Smart Class Available',
                  name: 'smartClassAvailable',
                },
              ].map((item) => (
                <label
                  key={item.name}
                  className="flex cursor-pointer items-center justify-between rounded-3xl border border-slate-200 px-5 py-5"
                >
                  <span className="font-semibold text-slate-700">
                    {item.label}
                  </span>

                  <input
                    type="checkbox"
                    name={item.name}
                    checked={schoolData[item.name]}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#125fb9]"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                <ImagePlus size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  School Images
                </h2>
              </div>
            </div>

            <div className="rounded-[28px] border-2 border-dashed border-slate-300 p-12 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#125fb9]/10 text-[#125fb9]">
                <Upload size={36} />
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-800">
                Upload School Images
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Upload banner image, gallery images and school logo.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div>
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    School Logo
                  </label>

                  <input
                    type="file"
                    className="block w-full rounded-2xl border border-slate-200 p-4"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    Banner Image
                  </label>

                  <input
                    type="file"
                    className="block w-full rounded-2xl border border-slate-200 p-4"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-bold text-slate-700">
                    Gallery Images
                  </label>

                  <input
                    type="file"
                    multiple
                    className="block w-full rounded-2xl border border-slate-200 p-4"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">
              SEO Information
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <input
                type="text"
                name="seoTitle"
                value={schoolData.seoTitle}
                onChange={handleChange}
                placeholder="SEO Title"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />

              <input
                type="text"
                name="seoKeywords"
                value={schoolData.seoKeywords}
                onChange={handleChange}
                placeholder="SEO Keywords"
                className="h-14 rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
              />
            </div>

            <textarea
              rows="5"
              name="seoDescription"
              value={schoolData.seoDescription}
              onChange={handleChange}
              placeholder="SEO Description"
              className="mt-6 w-full rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
            />
          </div>

          {/* Expert Comment */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900">
              Expert Comment
            </h2>

            <textarea
              rows="5"
              name="expertComment"
              value={schoolData.expertComment}
              onChange={handleChange}
              placeholder="Write expert review/comment shown in frontend card"
              className="mt-6 w-full rounded-3xl border border-slate-200 p-5 outline-none focus:border-[#125fb9]"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-2xl bg-[#125fb9] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#0d4a91]"
            >
              Create School
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSchool;
