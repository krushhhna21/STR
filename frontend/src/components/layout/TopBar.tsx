import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '../../store/auth';

interface TopBarProps {
  title?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-50 h-[64px] flex items-center">
      <div className="flex items-center justify-between w-full px-4">
        <div>
          {title ? (
            <h1 className="text-[20px] font-bold text-[#1E1B4B]">{title}</h1>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[20px] font-bold text-[#1E1B4B]">Hi, {user?.name?.split(' ')[0] || 'Student'}</span>
              <span className="text-xl">👋</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
            <Search className="w-5 h-5" strokeWidth={2.5} />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors relative">
            <Bell className="w-5 h-5" strokeWidth={2.5} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#F52B91] rounded-full ring-2 ring-white"></span>
          </button>
          <div className="w-[36px] h-[36px] rounded-full bg-[#EAE0FF] ml-1 overflow-hidden flex items-center justify-center shrink-0">
            {user?.name ? (
              <span className="text-[#6C3BC7] font-bold text-sm">{user.name.charAt(0).toUpperCase()}</span>
            ) : (
              <img src={`https://ui-avatars.com/api/?name=${user?.email || 'User'}&background=c7d2fe&color=4f46e5`} alt="Profile" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
