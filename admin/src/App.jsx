import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AdminLayout from './Main-admin/Layout/AdminLayout';

import Dashboard from './Main-admin/Pages/Dashboard';
import CreateSchool from './Main-admin/Pages/Createschool';

// Temporary pages
const Schools = () => <div className="p-8 text-3xl font-black">Schools Page</div>;
const Colleges = () => <div className="p-8 text-3xl font-black">Colleges Page</div>;
const Courses = () => <div className="p-8 text-3xl font-black">Courses Page</div>;
const Categories = () => <div className="p-8 text-3xl font-black">Categories Page</div>;
const Users = () => <div className="p-8 text-3xl font-black">Users Page</div>;
const Settings = () => <div className="p-8 text-3xl font-black">Settings Page</div>;
const AdminLogin = () => (
  <div className="flex min-h-screen items-center justify-center bg-slate-100">
    <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-black text-slate-900">
        Admin Login
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Login to access the administration panel.
      </p>

      <div className="mt-8 space-y-5">
        <input
          type="email"
          placeholder="Admin Email"
          className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
        />

        <input
          type="password"
          placeholder="Password"
          className="h-14 w-full rounded-2xl border border-slate-200 px-5 outline-none focus:border-[#125fb9]"
        />

        <button className="h-14 w-full rounded-2xl bg-[#125fb9] text-sm font-bold text-white transition-all hover:bg-[#0d4a91]">
          Login
        </button>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect */}
        <Route
          path="/"
          element={<Navigate to="/admin/dashboard" replace />}
        />

        {/* Login Page */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="schools" element={<Schools />} />
          <Route path="schools/create" element={<CreateSchool />} />
          <Route path="colleges" element={<Colleges />} />
          <Route path="courses" element={<Courses />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;