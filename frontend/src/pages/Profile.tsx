import React from 'react';
import { TopBar } from '../components/layout/TopBar';
import { useAuthStore } from '../store/auth';
import { Button } from '../components/ui/Button';

export const Profile: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-full">
      <TopBar title="Profile" />
      <div className="px-6 py-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
              {user?.name ? (
                <span className="text-indigo-600 font-bold text-2xl">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <img src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=c7d2fe&color=4f46e5`} alt="Profile" className="w-full h-full object-cover" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name || 'Student'}</h2>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </div>
          </div>
          
          <Button variant="outline" className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};
