import React, { useState } from 'react';
import { Building2, CheckCircle, ArrowRight, UserPlus, Phone, Mail } from 'lucide-react';

const JoinPartner = () => {
  const [formData, setFormData] = useState({
    institutionName: '',
    contactName: '',
    email: '',
    phone: '',
    type: 'school'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

    <div
          className="relative mb-10 h-34 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=80&w=1600')",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/70" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="text-3xl font-[500] text-white md:text-5xl">Join Partners</h1>
          </div>
        </div>

      <main className="flex-1 max-w-[1200px] mx-auto w-full pt-3 pb-13 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ">
        
        {/* Left Side Form */}
        <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 flex flex-col justify-center">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Partner Application</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Institution Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#125fb9] outline-none transition-all"
                  >
                    <option value="school">School</option>
                    <option value="college">College / University</option>
                    <option value="institute">Coaching Institute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Institution Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      value={formData.institutionName}
                      onChange={(e) => setFormData({...formData, institutionName: e.target.value})}
                      placeholder="e.g. St. Xavier's"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#125fb9] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contact Person Name</label>
                  <div className="relative">
                    <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="text" 
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      placeholder="Your name"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#125fb9] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Email"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#125fb9] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Phone Number"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#125fb9] outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#125fb9] hover:bg-[#0f519f] text-white font-bold rounded-xl shadow-lg shadow-[#125fb9]/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 md:col-span-2"
                >
                  Submit Application <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h2>
              <p className="text-slate-600 mb-8">
                Thank you for applying. Our onboarding team will contact you at <strong>{formData.email}</strong> within 24 hours to set up your admin portal.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
              >
                Return to Home
              </button>
            </div>
          )}
        </div>

        {/* Right Side Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] lg:h-auto min-h-[500px] w-full border border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&q=80&w=1600" 
            alt="Happy students on campus" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-white font-bold text-2xl md:text-3xl leading-snug">"Joining Dodo completely transformed our admissions process."</p>
            <p className="text-white/80 font-medium mt-3">- Sarah Jenkins, Director of Admissions</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinPartner;
