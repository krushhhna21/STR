import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { studyCategories } from '../data/studyData';
import { TopBar } from '../components/layout/TopBar';
import { BookOpen, Video, FileText, Download, Play, GraduationCap, Edit3, Search, Sparkles } from 'lucide-react';

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

  // Extract Books, Videos, and Notes Resources from the active enrolled stream & subjects
  const allBooks = [
    { id: 'b1', title: 'Database System Concepts (Silberschatz)', subject: 'DBMS', format: 'PDF', pages: 450, author: 'Silberschatz & Korth' },
    { id: 'b2', title: 'Introduction to Algorithms (CLRS)', subject: 'DSA', format: 'PDF', pages: 1200, author: 'Cormen, Leiserson, Rivest' },
    { id: 'b3', title: 'Operating System Concepts (Galvin)', subject: 'OS', format: 'PDF', pages: 800, author: 'Silberschatz, Galvin' },
    { id: 'b4', title: 'Computer Networking: A Top-Down Approach', subject: 'CN', format: 'PDF', pages: 750, author: 'Kurose & Ross' },
    { id: 'b5', title: 'NCERT Class 12 Physics & Chemistry Complete Set', subject: 'Science', format: 'PDF', pages: 520, author: 'NCERT Board' },
  ];

  const allVideos = [
    { id: 'v1', title: 'Mastering SQL Queries, Joins & Subqueries', subject: 'DBMS', duration: '28 min', instructor: 'Prof. Turing' },
    { id: 'v2', title: '1NF, 2NF, 3NF & BCNF Normalization Step-by-Step', subject: 'DBMS', duration: '22 min', instructor: 'Prof. Turing' },
    { id: 'v3', title: 'Dynamic Programming & Graph Traversal (BFS/DFS)', subject: 'DSA', duration: '35 min', instructor: 'Dr. Knuth' },
    { id: 'v4', title: 'Process CPU Scheduling (FCFS, Round Robin, SJF)', subject: 'OS', duration: '20 min', instructor: 'Prof. Tanenbaum' },
    { id: 'v5', title: '7 Layers of OSI Model & TCP/IP Packet Architecture', subject: 'CN', duration: '25 min', instructor: 'Dr. Cerf' },
  ];

  const allResources = [
    { id: 'r1', title: 'Chapter 1-4 Complete DBMS Lecture Notes PDF', type: 'Lecture Notes', size: '4.2 MB', updated: '2 days ago' },
    { id: 'r2', title: 'Top 50 Data Structures Interview Questions & Solutions', type: 'Question Bank', size: '2.8 MB', updated: 'Yesterday' },
    { id: 'r3', title: 'Operating Systems Lab Manual & C Code Sheets', type: 'Lab Manual', size: '5.1 MB', updated: '3 days ago' },
    { id: 'r4', title: 'Computer Networks Formula Cheat Sheet & Subnetting Guide', type: 'Formula Sheet', size: '1.5 MB', updated: '4 days ago' },
    { id: 'r5', title: 'Previous 5 Years Solved End-Sem Exam Papers', type: 'Past Papers', size: '8.4 MB', updated: '1 week ago' },
  ];

  const filteredBooks = allBooks.filter(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredVideos = allVideos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredResources = allResources.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.type.toLowerCase().includes(searchQuery.toLowerCase()));

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
              {filteredBooks.map((book) => (
                <div key={book.id} className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-indigo-100 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-100/60 px-2.5 py-0.5 rounded-md">
                        {book.subject}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">{book.pages} Pages</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{book.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">Author: {book.author}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">{book.format} Book</span>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6C3BC7] text-white text-xs font-bold rounded-lg hover:bg-[#582cb5] transition-colors shadow-sm">
                      <Download size={14} /> Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT 2: VIDEO LECTURES */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredVideos.map((vid) => (
                <div key={vid.id} className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-rose-100 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-100/60 px-2.5 py-0.5 rounded-md">
                        {vid.subject}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">{vid.duration}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{vid.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">Instructor: {vid.instructor}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-600">Video Lesson</span>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-lg hover:bg-rose-600 transition-colors shadow-sm">
                      <Play size={14} /> Watch Lecture
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT 3: STUDY RESOURCES */}
          {activeTab === 'resources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredResources.map((res) => (
                <div key={res.id} className="p-5 bg-gray-50/70 border border-gray-100 rounded-2xl flex flex-col justify-between hover:shadow-md hover:border-emerald-100 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-md">
                        {res.type}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">{res.size}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{res.title}</h3>
                    <p className="text-xs text-gray-500 font-medium">Updated: {res.updated}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600">Study Resource</span>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                      <Download size={14} /> Open File
                    </button>
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
