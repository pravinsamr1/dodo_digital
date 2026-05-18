import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Building2, MapPin, Search, ChevronLeft, ChevronRight, AlertTriangle, X } from 'lucide-react';

const baseSchools = [
  { logo: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=100', name: "St. Xavier's International", city: 'Chennai' },
  { logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100', name: 'Delhi Public School', city: 'Bangalore' },
  { logo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100', name: 'Ryan International', city: 'Mumbai' },
  { logo: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100', name: 'The Doon School', city: 'Dehradun' },
  { logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100', name: 'Kendriya Vidyalaya', city: 'New Delhi' },
];

const MOCK_SCHOOLS = Array.from({ length: 120 }, (_, i) => {
  const base = baseSchools[i % baseSchools.length];
  return {
    id: i + 1,
    logo: base.logo,
    name: i < 5 ? base.name : `${base.name} (Branch ${i + 1})`,
    city: base.city
  };
});

const AllSchools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [actionModal, setActionModal] = useState({ isOpen: false, type: null, school: null });
  const [showModal, setShowModal] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const ITEMS_PER_PAGE = 50;

  const filteredSchools = useMemo(() => {
    return MOCK_SCHOOLS.filter(school => 
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      school.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredSchools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentSchools = filteredSchools.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handle Modal Animation States
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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto min-h-screen min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 shrink-0">
              <Building2 className="text-indigo-600 w-5 h-5" />
            </div>
            All Schools
          </h1>
          <p className="text-slate-500 text-sm mt-2 ml-1">Manage and view all registered schools in the directory</p>
        </div>
        <Link 
          to="/add-school"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-600/20 transition-all text-sm font-bold active:scale-[0.98] shrink-0"
        >
          + Add School
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/60 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by school name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm text-sm font-medium transition-colors"
            />
          </div>
          <div className="text-sm font-bold text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm shrink-0">
            Total Records: <span className="text-indigo-600">{filteredSchools.length}</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 pl-6 font-bold w-16 text-center">Sl.No</th>
                <th className="p-4 font-bold w-24">Logo</th>
                <th className="p-4 font-bold">School Name</th>
                <th className="p-4 font-bold">City</th>
                <th className="p-4 pr-6 font-bold text-center w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSchools.map((school, index) => (
                <tr key={school.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <td className="p-4 pl-6 text-center font-bold text-slate-400">
                    {startIndex + index + 1}
                  </td>
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200/60 shadow-sm bg-white">
                      <img src={school.logo} alt={`${school.name} logo`} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="p-4 font-bold text-slate-800">
                    {school.name}
                  </td>
                  <td className="p-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100/80 w-fit px-3 py-1.5 rounded-lg border border-slate-200/50">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {school.city}
                    </span>
                  </td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => setActionModal({ isOpen: true, type: 'edit', school })}
                        className="group p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors shadow-sm" 
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 group-hover:animate-writing" />
                      </button>
                      <button 
                        onClick={() => setActionModal({ isOpen: true, type: 'delete', school })}
                        className="group p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors shadow-sm" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 group-hover:animate-trashing" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentSchools.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400 font-medium">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search className="w-8 h-8 text-slate-300" />
                      <p>No schools found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 border-t border-slate-200/60 bg-slate-50/50 shrink-0">
            <span className="text-sm font-medium text-slate-500">
              Showing <span className="font-bold text-slate-700">{startIndex + 1}</span> to <span className="font-bold text-slate-700">{Math.min(startIndex + ITEMS_PER_PAGE, filteredSchools.length)}</span> of <span className="font-bold text-slate-700">{filteredSchools.length}</span> entries
            </span>
            
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1 hidden sm:flex">
                {getPageNumbers().map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof page === 'number' && setCurrentPage(page)}
                    disabled={page === '...'}
                    className={`min-w-[40px] h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                      currentPage === page 
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                        : page === '...' 
                          ? 'text-slate-400 cursor-default bg-transparent' 
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 sm:hidden text-sm font-bold text-slate-600 px-2">
                Page {currentPage} of {totalPages}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isRendered && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showModal ? 'bg-slate-900/60 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none pointer-events-none'}`}>
          <div className={`bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden transition-all duration-300 transform ${showModal ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8'}`}>
            <div className="relative p-8 flex flex-col items-center text-center">
              {/* Close Button */}
              <button 
                onClick={() => setActionModal({ isOpen: false, type: null, school: null })}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon Container with glowing rings */}
              <div className="relative mb-6 mt-2">
                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${actionModal.type === 'delete' ? 'bg-red-400' : 'bg-blue-400'}`}></div>
                <div className={`absolute -inset-3 rounded-full opacity-20 ${actionModal.type === 'delete' ? 'bg-red-200' : 'bg-blue-200'}`}></div>
                <div className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-inner ${actionModal.type === 'delete' ? 'bg-gradient-to-br from-red-100 to-red-50 text-red-600' : 'bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600'}`}>
                  {actionModal.type === 'delete' ? <Trash2 className="w-10 h-10 animate-trashing" /> : <Pencil className="w-10 h-10 animate-writing" />}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                {actionModal.type === 'delete' ? 'Delete School?' : 'Edit Profile?'}
              </h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed px-2">
                {actionModal.type === 'delete' 
                  ? <>You are about to delete <strong className="text-slate-800">{actionModal.school?.name}</strong>. This action is permanent and cannot be undone.</>
                  : <>Are you sure you want to modify the details for <strong className="text-slate-800">{actionModal.school?.name}</strong>?</>
                }
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={() => {
                    alert(`Successfully ${actionModal.type}ed ${actionModal.school?.name}`);
                    setActionModal({ isOpen: false, type: null, school: null });
                  }}
                  className={`w-full py-3.5 text-sm font-black text-white rounded-2xl shadow-lg transition-all active:scale-[0.98] ${
                    actionModal.type === 'delete' 
                      ? 'bg-red-600 hover:bg-red-700 shadow-red-600/30' 
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
                  }`}
                >
                  Yes, {actionModal.type} it!
                </button>
                <button 
                  onClick={() => setActionModal({ isOpen: false, type: null, school: null })}
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

export default AllSchools;