import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Link as LinkIcon, Copy, CheckCircle2, Building2, Pencil, Trash2, Users, X } from 'lucide-react';

const AddSchoolAdmin = () => {
  const [schoolName, setSchoolName] = useState('');
  const [generatedCreds, setGeneratedCreds] = useState(null);
  const [copied, setCopied] = useState(false);
  const [createdAdmins, setCreatedAdmins] = useState([
    { id: 1, schoolName: "Delhi Public School", username: "admin_dps_m4x9", url: `${window.location.origin}/school-portal/login?token=m4x9` },
    { id: 2, schoolName: "Ryan International", username: "admin_ryan_k2p7", url: `${window.location.origin}/school-portal/login?token=k2p7` }
  ]);
  const [editModal, setEditModal] = useState({ isOpen: false, admin: null });
  const [editForm, setEditForm] = useState({ username: '', password: '' });

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!schoolName) return;

    // Generate mock credentials
    const uniqueId = Math.random().toString(36).substring(2, 10);
    const password = Math.random().toString(36).substring(2, 10) + Math.floor(Math.random() * 1000);
    const username = `admin_${schoolName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${uniqueId.substring(0,4)}`;
    const url = `${window.location.origin}/school-portal/login?token=${uniqueId}`;

    const newAdmin = {
      id: Date.now(),
      schoolName,
      username,
      password,
      url
    };

    setGeneratedCreds(newAdmin);
    setCreatedAdmins([newAdmin, ...createdAdmins]);
    setCopied(false);
    setSchoolName('');
  };

  const handleEditClick = (admin) => {
    setEditModal({ isOpen: true, admin });
    setEditForm({ username: admin.username, password: '' });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setCreatedAdmins(createdAdmins.map(a => 
      a.id === editModal.admin.id 
        ? { ...a, username: editForm.username, password: editForm.password || a.password }
        : a
    ));
    setEditModal({ isOpen: false, admin: null });
    alert("Credentials updated successfully!");
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to revoke this admin's access?")) {
      setCreatedAdmins(createdAdmins.filter(a => a.id !== id));
    }
  };

  const copyToClipboard = () => {
    if (!generatedCreds) return;
    const textToCopy = `School Admin Access for ${generatedCreds.schoolName}\n\nLogin URL: ${generatedCreds.url}\nUsername: ${generatedCreds.username}\nPassword: ${generatedCreds.password}\n\nPlease keep these credentials secure.`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-5xl mx-auto min-h-screen min-w-0">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center border border-indigo-100 shrink-0">
            <ShieldCheck className="text-indigo-600 w-5 h-5" />
          </div>
          Create School Admin
        </h1>
        <p className="text-slate-500 text-sm mt-2 ml-1">Generate dedicated portal access for school representatives to manage their own profile.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 p-6 sm:p-8 h-fit">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-indigo-600" />
            Admin Details
          </h2>
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Target School Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                  placeholder="e.g., St. Xavier's International"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">This will automatically generate a secure login portal and temporary credentials for the school representative.</p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Generate Credentials
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="relative h-full">
          {!generatedCreds ? (
            <div className="h-full bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center min-h-[350px]">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                <LinkIcon className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-400">No Credentials Yet</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-[250px]">Fill out the form to generate a secure access link and password.</p>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-3xl shadow-xl border border-slate-800 p-6 sm:p-8">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Access Granted
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">Share these details securely.</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    copied ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Login URL</label>
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 font-mono text-sm text-blue-400 break-all select-all">
                    {generatedCreds.url}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Username</label>
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 font-mono text-sm text-slate-200 select-all">
                    {generatedCreds.username}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Temporary Password</label>
                  <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 font-mono text-sm text-slate-200 select-all">
                    {generatedCreds.password}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <p className="text-xs text-indigo-300 leading-relaxed">
                  <strong>Note:</strong> The school admin will be prompted to change this temporary password upon their first login. This link provides access <em>only</em> to the profile for <strong className="text-indigo-200">{generatedCreds.schoolName}</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Existing Admins Section */}
      <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Active School Admins
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold">School Name</th>
                <th className="p-4 font-bold">Username</th>
                <th className="p-4 font-bold">Login URL</th>
                <th className="p-4 font-bold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {createdAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{admin.schoolName}</td>
                  <td className="p-4 font-mono text-slate-600">{admin.username}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-blue-500 truncate max-w-[200px] sm:max-w-[300px]">{admin.url}</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(admin.url);
                          alert("URL Copied!");
                        }}
                        className="text-slate-400 hover:text-indigo-600"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleEditClick(admin)}
                        className="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                        title="Edit Credentials"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(admin.id)}
                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        title="Revoke Access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {createdAdmins.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">No school admins created yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Pencil className="w-5 h-5 text-indigo-600" />
                Edit Credentials
              </h3>
              <button onClick={() => setEditModal({ isOpen: false, admin: null })} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">School Target</label>
                <div className="px-4 py-3 bg-slate-50 rounded-xl text-slate-600 font-medium border border-slate-200 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {editModal.admin?.schoolName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
                <input 
                  type="text" 
                  required
                  value={editForm.username}
                  onChange={e => setEditForm({...editForm, username: e.target.value})}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">New Password (Optional)</label>
                <input 
                  type="text" 
                  value={editForm.password}
                  onChange={e => setEditForm({...editForm, password: e.target.value})}
                  placeholder="Leave blank to keep current password"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="pt-2 flex gap-3">
                <button 
                  type="submit" 
                  className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                >
                  Save Changes
                </button>
                <button 
                  type="button" 
                  onClick={() => setEditModal({ isOpen: false, admin: null })}
                  className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSchoolAdmin;
