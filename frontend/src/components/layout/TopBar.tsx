import React, { useState } from 'react';
import { Bell, Search as SearchIcon, X, BookOpen, Video, FileText } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../../config/api';

interface TopBarProps {
  title?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const { user } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch search results
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const res = await fetch(`${API_BASE_URL}/api/catalog/content?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Search failed');
      return res.json();
    },
    enabled: searchQuery.trim().length > 0,
  });

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-50 h-[64px] flex items-center">
        <div className="flex items-center justify-between w-full px-4 relative">
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
            <button 
              onClick={() => setShowSearch(true)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors"
            >
              <SearchIcon className="w-5 h-5" strokeWidth={2.5} />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors relative"
              >
                <Bell className="w-5 h-5" strokeWidth={2.5} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#F52B91] rounded-full ring-2 ring-white"></span>
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-[#1E1B4B]">Notifications</h3>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">New</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                      <Bell className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">You're all caught up!</p>
                    <p className="text-xs text-gray-500 font-medium">No new alerts or messages.</p>
                  </div>
                </div>
              )}
            </div>

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

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm p-4 pt-20 animate-in fade-in">
          <div className="max-w-2xl mx-auto bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <SearchIcon className="text-gray-400" />
              <input 
                type="text" 
                autoFocus
                placeholder="Search courses, videos, notes..." 
                className="flex-1 bg-transparent border-none focus:outline-none text-lg font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => { setShowSearch(false); setSearchQuery(''); }} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 bg-gray-50/50">
              {searchQuery.trim() === '' ? (
                <div className="p-8 text-center text-gray-400 font-medium text-sm">
                  Type to start searching across the entire catalog...
                </div>
              ) : isLoading ? (
                <div className="p-8 text-center text-indigo-500 font-bold text-sm animate-pulse">
                  Searching...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-2 space-y-2">
                  {searchResults.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md cursor-pointer transition-all">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-600">
                        {item.type === 'video' ? <Video size={18} /> : item.type === 'book' ? <BookOpen size={18} /> : <FileText size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500 truncate">{item.subject} • {item.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500 font-medium text-sm">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
