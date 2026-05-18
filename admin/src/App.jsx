import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AllSchools from './pages/AllSchools';
import AddSchool from './pages/AddSchool';
import AddSchoolAdmin from './pages/AddSchoolAdmin';
import Login from './pages/Login';
import SchoolAdminLogin from './pages/SchoolAdminLogin';
import { LogOut, Building2 } from 'lucide-react';
import logo from './assets/logo.png';

// Layout for the Master Admin
const MasterAdminLayout = () => (
  <div className="admin-layout">
    <Sidebar />
    <main className="flex-1 bg-slate-50 min-h-screen">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/all-schools" element={<AllSchools />} />
        <Route path="/add-school" element={<AddSchool />} />
        <Route path="/add-school-admin" element={<AddSchoolAdmin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
);

// Layout strictly for School Admins (no master navigation)
const SchoolAdminLayout = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col">
    {/* Simple Topbar for School Admin */}
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="h-8 object-contain drop-shadow-sm" />
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1.5 rounded-full">
          <Building2 className="w-4 h-4" />
          School Representative
        </div>
      </div>
      <button 
        onClick={() => {
          Cookies.remove('school_admin_token');
          window.location.reload();
        }}
        className="flex items-center gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors font-semibold text-sm"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </header>

    <main className="flex-1 py-8">
      <Routes>
        {/* They only have access to add/edit their specific school */}
        <Route path="/manage" element={<AddSchool />} />
        <Route path="*" element={<Navigate to="/school-portal/manage" replace />} />
      </Routes>
    </main>
  </div>
);

const App = () => {
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [isSchoolAuth, setIsSchoolAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsAdminAuth(!!Cookies.get('admin_token'));
    setIsSchoolAuth(!!Cookies.get('school_admin_token'));
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* --- Authentication Routes --- */}
        <Route 
          path="/login" 
          element={isAdminAuth ? <Navigate to="/" replace /> : <Login onLogin={() => setIsAdminAuth(true)} />} 
        />
        
        <Route 
          path="/school-portal/login" 
          element={isSchoolAuth ? <Navigate to="/school-portal/manage" replace /> : <SchoolAdminLogin onLogin={() => setIsSchoolAuth(true)} />} 
        />

        {/* --- School Admin Protected Area --- */}
        <Route 
          path="/school-portal/*" 
          element={isSchoolAuth ? <SchoolAdminLayout /> : <Navigate to="/school-portal/login" replace />} 
        />

        {/* --- Master Admin Protected Area --- */}
        <Route 
          path="/*" 
          element={isAdminAuth ? <MasterAdminLayout /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </Router>
  );
};

export default App;