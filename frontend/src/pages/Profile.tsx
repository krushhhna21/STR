import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { useAuthStore } from '../store/auth';
import { Button } from '../components/ui/Button';
import { GraduationCap, Mail, Phone, Edit3, Shield } from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isAdmin = (user?.role ?? '').toLowerCase() === 'admin' || (user?.role ?? '').toLowerCase() === 'administrator';

  const profile = user?.studentProfile || {
    streamName: 'Computer Science & Engineering (CSE)',
    yearGrade: '3rd Year (Degree / B.Tech)',
    categoryName: 'Engineering & Technology',
    phone: '+91 98765 43210'
  };

  return (
    <div className="min-h-full">
      <div className="lg:hidden">
        <TopBar title="My Student Profile" />
      </div>
      
      <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-3xl flex items-center justify-center shadow-md border-4 border-white">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900">{user?.name || 'Registered Student'}</h2>
                <p className="text-gray-500 font-medium text-sm flex items-center gap-1.5 mt-0.5">
                  <Mail size={14} /> {user?.email || 'student@studybuddy.com'}
                </p>
                <span className="inline-block px-3 py-1 bg-indigo-50 text-[#6C3BC7] font-bold text-xs rounded-full mt-2">
                  Role: {user?.role ? user.role.toUpperCase() : 'STUDENT'}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate('/onboarding/student-details')}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs rounded-xl border border-gray-200 transition-all"
            >
              <Edit3 size={15} /> Edit Registration Details
            </button>
          </div>

          {/* Educational Details Grid */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="text-[#6C3BC7]" size={20} /> Academic Registration Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Program Category</span>
                <p className="font-bold text-gray-900 text-sm mt-1">{profile.categoryName}</p>
              </div>

              <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stream / Branch</span>
                <p className="font-bold text-gray-900 text-sm mt-1">{profile.streamName}</p>
              </div>

              <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Standard Grade / Academic Year</span>
                <p className="font-bold text-gray-900 text-sm mt-1">{profile.yearGrade}</p>
              </div>

              <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact / WhatsApp Phone</span>
                <p className="font-bold text-gray-900 text-sm mt-1 flex items-center gap-1.5">
                  <Phone size={14} className="text-gray-400" /> {profile.phone}
                </p>
              </div>

            </div>
          </div>

          {isAdmin && (
            <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="text-indigo-600" size={24} />
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Administrator Access Granted</h4>
                  <p className="text-xs text-gray-500 font-medium">Manage streams, options, and upload course materials</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/admin')}
                className="px-4 py-2 bg-[#6C3BC7] text-white text-xs font-bold rounded-xl hover:bg-[#582cb5] transition-colors"
              >
                Go to Admin Portal
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100">
            <Button variant="outline" className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300 font-bold" onClick={logout}>
              Sign Out of Account
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};
