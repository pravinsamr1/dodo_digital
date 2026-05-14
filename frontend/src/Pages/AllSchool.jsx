import React, { useState } from 'react';

const AllSchool = () => {
  const [schools] = useState([
    {
      _id: '1',
      name: "St. Xavier's International",
      location: "Chennai, India",
      rating: 4.8,
      type: "Boarding",
      image: "https://images.unsplash.com/photo-1541339907198-e08756defe03?w=600"
    },
    {
      _id: '2',
      name: "Greenwood High School",
      location: "Bangalore, India",
      rating: 4.7,
      type: "Day School",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600"
    },
    {
      _id: '3',
      name: "Delhi Public School",
      location: "Delhi, India",
      rating: 4.6,
      type: "CBSE",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600"
    },
    {
      _id: '4',
      name: "Oxford International School",
      location: "Mumbai, India",
      rating: 4.9,
      type: "International",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600"
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-[1400px] mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">
          All Schools
        </h1>
        <div className="flex gap-6">
        <div className="w-72 bg-white rounded-2xl shadow-sm p-5 space-y-6 border border-slate-100 sticky top-24 h-fit">

          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-slate-700">Filters</h2>
            <button className="text-sm text-[#125fb9]">Clear all</button>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Category</p>
            <select className="w-full bg-slate-100 rounded-xl p-2 text-sm">
              <option>Day School</option>
              <option>Boarding</option>
              <option>International</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Location</p>
            <input
              type="text"
              placeholder="Enter city"
              className="w-full bg-slate-100 rounded-xl p-2 text-sm outline-none"
            />
          </div>

          {/* Distance */}
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Distance</p>
            <input type="range" min="0" max="30" className="w-full" />
          </div>

          {/* Fees */}
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Fees</p>
            <input type="range" min="500" max="500000" className="w-full" />
          </div>

          {/* Board */}
          <div className="space-y-2">
            <p className="text-sm text-slate-500">Board</p>
            {['CBSE','IB','STATE','ICSE','IGCSE'].map((b)=>(
              <label key={b} className="flex items-center gap-2 text-sm">
                <input type="checkbox" /> {b}
              </label>
            ))}
          </div>

          <button className="w-full bg-[#125fb9] text-white py-2 rounded-xl text-sm">
            Apply
          </button>

        </div>

        <div className="flex-1 h-[calc(100vh-140px)] overflow-y-auto pr-2">
        {schools.length === 0 ? (
          <p>No schools found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schools.map((school) => (
              <div
                key={school._id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all border border-slate-100"
              >
                {/* IMAGE + BADGES */}
                <div className="relative">
                  <img
                    src={school.image}
                    alt={school.name}
                    className="w-full h-52 object-cover"
                  />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-slate-800 text-white text-xs px-2 py-1 rounded-md">
                      19.15 km
                    </span>
                    <span className="bg-slate-600 text-white text-xs px-2 py-1 rounded-md">
                      Admission Open
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded">
                    👁 41.2k
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-3">

                  {/* TITLE */}
                  <h2 className="text-lg font-semibold text-slate-800">
                    {school.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {school.location}
                  </p>

                  {/* RATING */}
                  <div className="flex items-center gap-2 text-yellow-500 text-sm">
                    {'★★★★★'.slice(0, Math.round(school.rating))}
                    <span className="text-slate-500">{school.rating}</span>
                  </div>

                  {/* FEES BAR */}
                  <div className="bg-green-600 text-white text-center py-2 rounded-lg text-sm font-medium">
                    Fees - ₹10,60,000 / per annum
                  </div>

                  {/* DETAILS GRID */}
                  <div className="grid grid-cols-2 gap-2 text-xs border rounded-lg overflow-hidden">
                    <div className="bg-slate-50 p-2">School type</div>
                    <div className="p-2 font-medium">{school.type}</div>
                    <div className="bg-slate-50 p-2">Board</div>
                    <div className="p-2 font-medium">CBSE</div>
                    <div className="bg-slate-50 p-2">Gender</div>
                    <div className="p-2 font-medium">Co-Ed</div>
                    <div className="bg-slate-50 p-2">Grade</div>
                    <div className="p-2 font-medium">LKG - 12</div>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold">Expert Comment:</span> This is a top-rated school offering quality education and modern infrastructure.
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 bg-slate-200 text-slate-700 py-2 rounded-lg text-sm">
                      Get a Call
                    </button>
                    <button className="flex-1 bg-[#125fb9] text-white py-2 rounded-lg text-sm">
                      View School
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default AllSchool; 