import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { studyCategories } from '../data/studyData';
import { TopBar } from '../components/layout/TopBar';
import { BookOpen, Video, FileText, Download, Play, GraduationCap, Edit3, Search, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';

export const MyCourseResources: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'books' | 'videos' | 'resources'>('books');
  const [searchQuery, setSearchQuery] = useState('');

  const profile = user?.studentProfile || {
    category: 'engineering',
    categoryName: 'Engineering & Technology',
    stream: 'cse',
    streamName: 'Computer Science & Engineering (CSE)',
    yearGrade: '3rd Year (Degree / B.Tech)',
    phone: '+91 98765 43210'
  };

  const categoryObj = studyCategories.find(c => c.id === profile.category) || studyCategories[0];
  const streamObj = categoryObj.streams.find(s => s.id === profile.stream) || categoryObj.streams[0];
  const subjects = streamObj ? streamObj.subjects : [];

  // Fetch real content from the backend instead of hardcoded arrays
  const { data: dbContent = [] } = useQuery({
    queryKey: ['content', profile.stream, profile.category],
    queryFn: async () => {
      // Build query string based on user's enrolled stream
      const params = new URLSearchParams();
      if (profile.stream) params.append('stream', profile.stream);
      else if (profile.category) params.append('category', profile.category);
      
      const res = await fetch(`${API_BASE_URL}/api/catalog/content?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });

  // Categorize fetched content
  const allBooks = dbContent.filter((item: any) => item.type === 'book');
  const allVideos = dbContent.filter((item: any) => item.type === 'video');
  const allResources = dbContent.filter((item: any) => !['book', 'video'].includes(item.type));

  const filteredBooks = allBooks.filter((b: any) => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredVideos = allVideos.filter((v: any) => v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredResources = allResources.filter((r: any) => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.type.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-full">
      <div className="lg:hidden">
        <TopBar title="My Enrolled Course Resources" />
      </div>

      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Enrolled Course Banner Header */}
        <div className="bg-gradient-to-r from-[#6C3BC7] via-indigo-600 to-purple-700 rounded-[2rem] p-6 lg:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-[-5%] top-[-10%] opacity-15 pointer-events-none">
            <GraduationCap size={280} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white font-bold text-xs px-3.5 py-1 rounded-full backdrop-blur-md mb-3">
                <Sparkles size={14} /> Registered Student Curriculum
              </span>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight mb-1">
                {profile.streamName}
              </h1>
              <p className="text-indigo-100 font-medium text-sm lg:text-base">
                Academic Standard / Year: <strong className="text-white">{profile.yearGrade}</strong> • {profile.categoryName}
              </p>
            </div>

            <button 
              onClick={() => navigate('/onboarding/student-details')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl backdrop-blur-sm border border-white/20 transition-all shadow-sm shrink-0"
            >
              <Edit3 size={14} /> Change Enrolled Course / Year
            </button>
          </div>
        </div>

        {/* Tabbed Navigation & Search Bar */}
        <div className="bg-white rounded-[1.5rem] p-4 border border-gray-100 shadow-sm space-y-4">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            
            {/* Tabs */}
            <div className="flex gap-2 bg-gray-50 p-1.5 rounded-2xl">
              <button
                onClick={() => setActiveTab('books')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs lg:text-sm transition-all ${
                  activeTab === 'books'
                    ? 'bg-white text-[#6C3BC7] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen size={18} /> Books ({allBooks.length})
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs lg:text-sm transition-all ${
                  activeTab === 'videos'
                    ? 'bg-white text-rose-500 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Video size={18} /> Video Lectures ({allVideos.length})
              </button>

              <button
                onClick={() => setActiveTab('resources')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs lg:text-sm transition-all ${
                  activeTab === 'resources'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText size={18} /> Study Resources ({allResources.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search course materials..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#6C3BC7]"
              />
            </div>
          </div>

          {/* TAB CONTENT 1: BOOKS */}
          {activeTab === 'books' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredBooks.length === 0 && <p className="text-gray-500 text-sm col-span-full text-center py-8">No books available yet.</p>}
              {filteredBooks.map((book: any) => (
                <div key={book.id} className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-indigo-100 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-100/60 px-2.5 py-0.5 rounded-md">
                        {book.subject}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">PDF</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{book.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{book.meta || 'Study Material'}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">Book</span>
                    <a href={book.linkOrFile || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6C3BC7] text-white text-xs font-bold rounded-lg hover:bg-[#582cb5] transition-colors shadow-sm">
                      <Download size={14} /> Open
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT 2: VIDEO LECTURES */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredVideos.length === 0 && <p className="text-gray-500 text-sm col-span-full text-center py-8">No videos available yet.</p>}
              {filteredVideos.map((vid: any) => (
                <div key={vid.id} className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-rose-100 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-100/60 px-2.5 py-0.5 rounded-md">
                        {vid.subject}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">Video</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{vid.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{vid.meta || 'Lecture'}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600">Video Lesson</span>
                    <a href={vid.linkOrFile || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-lg hover:bg-rose-600 transition-colors shadow-sm">
                      <Play size={14} /> Watch
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT 3: STUDY RESOURCES */}
          {activeTab === 'resources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredResources.length === 0 && <p className="text-gray-500 text-sm col-span-full text-center py-8">No resources available yet.</p>}
              {filteredResources.map((res: any) => (
                <div key={res.id} className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-emerald-100 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-md">
                        {res.type}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">Resource</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{res.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">{res.meta || 'Notes'}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600">Study Resource</span>
                    <a href={res.linkOrFile || '#'} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                      <Download size={14} /> Open
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Subjects Grid Quick Links */}
        <div className="bg-white rounded-[1.5rem] p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-[#1E1B4B] mb-4">Enrolled Subjects in {streamObj?.name || 'Your Branch'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjects.map((subj) => (
              <div 
                key={subj.id}
                onClick={() => navigate(`/app/study/${profile.category}/${profile.stream}/${subj.id}`)}
                className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/60 cursor-pointer hover:bg-indigo-100/40 hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-[#6C3BC7]">{subj.code}</span>
                  <span className="text-xs font-bold text-gray-500">{subj.progress}%</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{subj.name}</h4>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-[#6C3BC7] h-1.5 rounded-full" style={{ width: `${subj.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
