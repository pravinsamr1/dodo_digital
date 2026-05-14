import React from 'react';
import { Send, Phone, ArrowRight } from 'lucide-react';

const ContactSection = () => {
  return (
    <section className="py-16 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row border border-white">
          
          {/* LEFT COLUMN: Visual Image with Overlay */}
          <div className="lg:w-5/12 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
              alt="Counselling"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient Overlay for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/20 to-transparent" />
            
            {/* Floating Info Card */}
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <p className="text-white/80 text-xs font-black uppercase tracking-widest mb-1">Direct Line</p>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-lg">+91 98765 43210</span>
                <div className="p-2 bg-indigo-500 rounded-lg text-white">
                  <Phone size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Compact Form */}
          <div className="lg:w-7/12 p-8 lg:p-12">
            <header className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Book a Session</h3>
              <p className="text-slate-500 text-sm font-medium">Fill in your details and we'll handle the rest.</p>
            </header>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Parent Name */}
              <div className="md:col-span-2">
                <label className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">Parent Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Date & Time */}
              <div>
                <label className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">Date</label>
                <input 
                  type="date"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm text-slate-600"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">Mobile</label>
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
                />
              </div>

              {/* Query */}
              <div className="md:col-span-2">
                <label className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">Your Message</label>
                <textarea 
                  rows="3"
                  placeholder="How can we help?"
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 px-5 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="md:col-span-2 pt-2">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-indigo-100 transition-all active:scale-[0.97] flex items-center justify-center gap-3 group">
                  Confirm Booking
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
