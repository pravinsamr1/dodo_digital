import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  GraduationCap, 
  IndianRupee, 
  Image as ImageIcon, 
  AlignLeft,
  Star,
  Users,
  CheckCircle2,
  Save,
  Plus,
  Trash2,
  Navigation,
  UploadCloud,
  BookOpen,
  X
} from 'lucide-react';

const TABS = [
  { id: 'general', label: 'General Info', icon: Building2 },
  { id: 'academic', label: 'Academic & Admission', icon: GraduationCap },
  { id: 'facilities', label: 'Facilities', icon: BookOpen },
  { id: 'activities', label: 'Extra Activities', icon: Users },
  { id: 'fees', label: 'Fees & Stats', icon: IndianRupee },
  { id: 'media', label: 'Media & About', icon: ImageIcon }
];

const AddSchool = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [actionModal, setActionModal] = useState({ isOpen: false });
  const [showModal, setShowModal] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  React.useEffect(() => {
    if (actionModal.isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => setShowModal(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [actionModal.isOpen]);

  const [formData, setFormData] = useState({
    // General
    name: '', location: '', city: '', latitude: '', longitude: '', type: 'Boarding', gender: 'Co-Ed',
    // Academic & Admission
    board: 'CBSE', grade: '', ratio: '', languages: '', admissionStatus: 'Open', documents: '', interaction: '',
    // Facilities
    smartClasses: '', labs: '', library: '', sports: '', transport: '', medical: '',
    // Extra Activities
    performingArts: '', clubs: '', sportsTraining: '', outdoorTrips: '', competitions: '',
    // Fees & Stats
    dayFee: '', boardingFee: '', rating: '', votes: '',
    // Media & About
    image: null, gallery: [], about: ''
  });

  const MAX_FILE_SIZE = 300 * 1024; // 300KB

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("Main image size should be below 300KB");
        e.target.value = '';
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    let hasError = false;

    files.forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        hasError = true;
      } else {
        validFiles.push(file);
      }
    });

    if (hasError) {
      alert("Some gallery images were larger than 300KB and were skipped.");
    }

    if (validFiles.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        gallery: [...prev.gallery, ...validFiles] 
      }));
    }
    
    e.target.value = '';
  };

  const removeGalleryImage = (index) => {
    const newGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, gallery: newGallery }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActionModal({ isOpen: true });
  };

  const confirmSubmit = () => {
    console.log('Submitted Data:', formData);
    alert('School data ready for backend submission (check console)!');
    setActionModal({ isOpen: false });
  };

  return (
    <div className="p-2 sm:p-2  lg:p-3 w-full max-w-7xl mx-auto min-h-screen min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 shrink-0">
              <Building2 className="text-indigo-600 w-5 h-5" />
            </div>
            Add New School
          </h1>
          <p className="text-slate-500 text-sm mt-2 ml-1">Complete all details across tabs to list a new school in the directory</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] shrink-0"
        >
          <Save size={18} />
          Save School Profile
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col min-h-[700px] min-w-0">
        {/* Tabs Top Navigation */}
        <div className="w-full bg-slate-50/50 border-b border-slate-200/60 p-3 sm:p-4 shrink-0 min-w-0">
          <nav className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar px-2">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-3 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
                  {tab.label}
                  {isActive && <CheckCircle2 size={16} className="ml-2 text-indigo-600 hidden sm:block" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 bg-white min-w-0">
          <form id="school-form" onSubmit={handleSubmit} className="h-full">
            
            {/* General Info Tab */}
            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Basic Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">School Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          type="text" name="name" value={formData.name} onChange={handleInputChange}
                          placeholder="e.g. St. Xavier's International" 
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          type="text" name="city" value={formData.city} onChange={handleInputChange}
                          placeholder="e.g. Chennai" 
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Location</label>
                      <input 
                        type="text" name="location" value={formData.location} onChange={handleInputChange}
                        placeholder="e.g. 123 Education Avenue, Chennai, Tamil Nadu, India" 
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Geo-Location
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Latitude</label>
                      <div className="relative">
                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          type="text" name="latitude" value={formData.latitude} onChange={handleInputChange}
                          placeholder="e.g. 13.0827" 
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                        />
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-2">Used to calculate distance for users</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Longitude</label>
                      <div className="relative">
                        <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          type="text" name="longitude" value={formData.longitude} onChange={handleInputChange}
                          placeholder="e.g. 80.2707" 
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                        />
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-2">Used to calculate distance for users</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Classification
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">School Type</label>
                      <select 
                        name="type" value={formData.type} onChange={handleInputChange}
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium appearance-none"
                      >
                        <option value="Boarding">Boarding</option>
                        <option value="Day School">Day School</option>
                        <option value="Day Cum Boarding">Day Cum Boarding</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Gender Category</label>
                      <select 
                        name="gender" value={formData.gender} onChange={handleInputChange}
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium appearance-none"
                      >
                        <option value="Co-Ed">Co-Ed</option>
                        <option value="Boys">Boys Only</option>
                        <option value="Girls">Girls Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Academic & Admission Tab */}
            {activeTab === 'academic' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Academic Profile
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Education Board</label>
                      <select 
                        name="board" value={formData.board} onChange={handleInputChange}
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium appearance-none"
                      >
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="State Board">State Board</option>
                        <option value="IB">IB</option>
                        <option value="IGCSE">IGCSE</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Grades Offered</label>
                      <input 
                        type="text" name="grade" value={formData.grade} onChange={handleInputChange}
                        placeholder="e.g. LKG - 12" 
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Student Teacher Ratio</label>
                      <input 
                        type="text" name="ratio" value={formData.ratio} onChange={handleInputChange}
                        placeholder="e.g. 30:1" 
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Language of Instruction</label>
                      <input 
                        type="text" name="languages" value={formData.languages} onChange={handleInputChange}
                        placeholder="e.g. English, Hindi" 
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Admission Details
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    <div className="lg:col-span-1">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Admission Status</label>
                      <select 
                        name="admissionStatus" value={formData.admissionStatus} onChange={handleInputChange}
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium appearance-none"
                      >
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                        <option value="Waitlist">Waitlist</option>
                      </select>
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Documents Required</label>
                      <textarea 
                        name="documents" value={formData.documents} onChange={handleInputChange}
                        placeholder="e.g. Birth certificate, transfer certificate, marksheet" rows={2}
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium resize-y"
                      />
                    </div>
                    <div className="lg:col-span-3">
                      <label className="block text-sm font-bold text-slate-700 mb-2">Interaction / Admission Process</label>
                      <textarea 
                        name="interaction" value={formData.interaction} onChange={handleInputChange}
                        placeholder="e.g. Parent counselling and student assessment..." rows={3}
                        className="w-full px-5 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium resize-y"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Facilities Tab */}
            {activeTab === 'facilities' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Campus & Infrastructure
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {[
                    { name: 'smartClasses', label: 'Smart Classrooms', placeholder: 'e.g. Available with interactive boards' },
                    { name: 'labs', label: 'Laboratories', placeholder: 'e.g. Physics, Chemistry, Biology, Computer' },
                    { name: 'library', label: 'Library', placeholder: 'e.g. Well-stocked with 10,000+ books' },
                    { name: 'sports', label: 'Sports Complex', placeholder: 'e.g. Indoor stadium, swimming pool' },
                    { name: 'transport', label: 'Transport', placeholder: 'e.g. GPS-enabled AC buses' },
                    { name: 'medical', label: 'Medical Room', placeholder: 'e.g. Full-time nurse on call' }
                  ].map(field => (
                    <div key={field.name} className="bg-slate-50 p-5 rounded-3xl border border-slate-100 focus-within:border-indigo-200 focus-within:bg-indigo-50/30 transition-all">
                      <label className="block text-sm font-bold text-slate-700 mb-2">{field.label}</label>
                      <textarea 
                        name={field.name} value={formData[field.name]} onChange={handleInputChange}
                        placeholder={field.placeholder} rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-sm font-medium resize-none shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Activities Tab */}
            {activeTab === 'activities' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Co-curricular & Extracurricular
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {[
                    { name: 'performingArts', label: 'Performing Arts', placeholder: 'e.g. Classical Dance, Western Music, Drama' },
                    { name: 'clubs', label: 'Clubs & Societies', placeholder: 'e.g. Robotics, Coding, Eco Club' },
                    { name: 'sportsTraining', label: 'Sports Training', placeholder: 'e.g. Cricket, Football, Basketball, Tennis' },
                    { name: 'outdoorTrips', label: 'Outdoor Trips', placeholder: 'e.g. Annual educational tours and camping' },
                    { name: 'competitions', label: 'Competitions', placeholder: 'e.g. Inter-school debates, Olympiads' }
                  ].map(field => (
                    <div key={field.name} className="bg-slate-50 p-5 rounded-3xl border border-slate-100 focus-within:border-indigo-200 focus-within:bg-indigo-50/30 transition-all">
                      <label className="block text-sm font-bold text-slate-700 mb-2">{field.label}</label>
                      <textarea 
                        name={field.name} value={formData[field.name]} onChange={handleInputChange}
                        placeholder={field.placeholder} rows={2}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200/60 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-sm font-medium resize-none shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fees & Stats Tab */}
            {activeTab === 'fees' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Fees Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                      <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
                        Day School Fee 
                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-lg">Per Year</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100">
                          <IndianRupee className="text-slate-600 w-4 h-4" />
                        </div>
                        <input 
                          type="text" name="dayFee" value={formData.dayFee} onChange={handleInputChange}
                          placeholder="e.g. 1,24,000" 
                          className="w-full pl-16 pr-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-lg font-bold shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                      <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
                        Boarding Fee
                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-lg">Per Year</span>
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100">
                          <IndianRupee className="text-slate-600 w-4 h-4" />
                        </div>
                        <input 
                          type="text" name="boardingFee" value={formData.boardingFee} onChange={handleInputChange}
                          placeholder="e.g. 2,95,000" 
                          className="w-full pl-16 pr-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-lg font-bold shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Statistics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">School Rating</label>
                      <div className="relative">
                        <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          type="number" step="0.1" max="5" name="rating" value={formData.rating} onChange={handleInputChange}
                          placeholder="e.g. 4.8" 
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Total Votes/Reviews</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                          type="number" name="votes" value={formData.votes} onChange={handleInputChange}
                          placeholder="e.g. 128" 
                          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Media & About Tab */}
            {activeTab === 'media' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> Media Uploads
                  </h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Image */}
                    <div className="lg:col-span-1">
                      <label className="block text-sm font-bold text-slate-700 mb-3">Main Cover Image</label>
                      <label className="block w-full cursor-pointer group">
                        <div className="w-full aspect-video rounded-3xl border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50/50 transition-all text-center flex flex-col items-center justify-center relative overflow-hidden">
                          {formData.image ? (
                            <>
                              <img src={URL.createObjectURL(formData.image)} alt="Cover preview" className="absolute inset-0 w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white/90 text-slate-900 text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2">
                                  <UploadCloud className="w-4 h-4" /> Replace Image
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="p-6">
                              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 text-indigo-500 group-hover:scale-110 transition-transform">
                                <UploadCloud className="w-6 h-6" />
                              </div>
                              <span className="text-sm font-bold text-slate-700 block">Upload Main Image</span>
                              <span className="text-xs font-medium text-slate-400 mt-1 block">JPG, PNG up to 300KB</span>
                            </div>
                          )}
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </div>
                      </label>
                    </div>

                    {/* Gallery Images */}
                    <div className="lg:col-span-2">
                      <div className="flex items-end justify-between mb-3">
                        <div>
                          <label className="block text-sm font-bold text-slate-700">Gallery Images</label>
                          <span className="text-xs font-medium text-slate-500 mt-0.5 block">Select multiple images (Max 300KB each)</span>
                        </div>
                        <label className="cursor-pointer text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hover:border-indigo-200 transition-all active:scale-95">
                          <Plus size={16} /> Add Photos
                          <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                        </label>
                      </div>
                      
                      <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-4 sm:p-6 min-h-[200px]">
                        {formData.gallery.length > 0 ? (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {formData.gallery.map((file, index) => (
                              <div key={index} className="relative group aspect-square rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                                <img src={URL.createObjectURL(file)} alt="Gallery preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    type="button" onClick={() => removeGalleryImage(index)}
                                    className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg transform scale-90 group-hover:scale-100"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="w-full h-full min-h-[150px] flex flex-col items-center justify-center text-center">
                            <ImageIcon className="w-10 h-10 text-slate-300 mb-2" />
                            <p className="text-slate-400 text-sm font-medium">No gallery images uploaded yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100">
                  <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> About the School
                  </h2>
                  <div className="relative">
                    <AlignLeft className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                    <textarea 
                      name="about" value={formData.about} onChange={handleInputChange}
                      placeholder="Write a comprehensive description about the school's facilities, culture, history, and achievements..." 
                      rows={6}
                      className="w-full pl-12 pr-6 py-4 rounded-3xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50 focus:bg-white transition-colors text-sm font-medium resize-y leading-relaxed shadow-sm"
                    />
                  </div>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isRendered && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showModal ? 'bg-slate-900/60 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none pointer-events-none'}`}>
          <div className={`bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden transition-all duration-300 transform ${showModal ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}>
            <div className="relative p-8 flex flex-col items-center text-center">
              {/* Close Button */}
              <button 
                onClick={() => setActionModal({ isOpen: false })}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon Container with glowing rings */}
              <div className="relative mb-6 mt-2">
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-400"></div>
                <div className="absolute -inset-3 rounded-full opacity-20 bg-indigo-200"></div>
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-inner bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600">
                  <Save className="w-10 h-10 animate-bounce" />
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Save School?
              </h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed px-2">
                Are you sure you want to add <strong className="text-slate-800">{formData.name || 'this school'}</strong> to the directory?
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={confirmSubmit}
                  className="w-full py-3.5 text-sm font-black text-white rounded-2xl shadow-lg transition-all active:scale-[0.98] bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30"
                >
                  Yes, save it!
                </button>
                <button 
                  onClick={() => setActionModal({ isOpen: false })}
                  className="w-full py-3.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSchool;
