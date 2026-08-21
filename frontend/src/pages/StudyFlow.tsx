import React, { useState } from 'react';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { ChevronLeft, Search, PlayCircle, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import { TopBar } from '../components/layout/TopBar';
import { studyCategories } from '../data/studyData';

// Generic Flow Layout container with Navigation & Search
const FlowLayout: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; showSearch?: boolean; onSearch?: (query: string) => void }> = ({ 
  title, subtitle, children, showSearch, onSearch 
}) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full flex flex-col bg-white lg:bg-transparent">
      <div className="lg:hidden">
        <TopBar />
      </div>
      
      <div className="px-4 lg:px-8 py-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-[#1E1B4B]">{title}</h1>
            {subtitle && <p className="text-xs lg:text-sm text-gray-500 font-medium">{subtitle}</p>}
          </div>
        </div>

        {showSearch && (
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              onChange={(e) => onSearch?.(e.target.value)}
              className="block w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] font-medium transition-all text-gray-900 shadow-sm"
              placeholder="Search streams, subjects, or topics..."
            />
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

// 1. Categories View
const CategoriesView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = studyCategories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FlowLayout title="Explore Educational Streams" subtitle="Select your program, degree or board level" showSearch onSearch={setSearchTerm}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCategories.map(c => (
          <button 
            key={c.id} 
            onClick={() => navigate(`/app/study/${c.id}`)}
            className="flex items-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all text-left group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${c.bg} ${c.color} mr-4 shrink-0 font-bold text-2xl group-hover:scale-105 transition-transform`}>
              🎓
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#6C3BC7] transition-colors">{c.name}</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium leading-relaxed">{c.desc}</p>
              <span className="inline-block text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md mt-2">
                {c.streams.length} Streams Available
              </span>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-[#6C3BC7] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </FlowLayout>
  );
};

// 2. Streams / Branches View
const StreamsView = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const category = studyCategories.find(c => c.id === categoryId) || studyCategories[0];
  const filteredStreams = category.streams.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FlowLayout 
      title={category.name} 
      subtitle={`Choose your branch or specialized stream under ${category.name}`} 
      showSearch 
      onSearch={setSearchTerm}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStreams.map(s => (
          <button 
            key={s.id} 
            onClick={() => navigate(`/app/study/${categoryId}/${s.id}`)}
            className="flex flex-col p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6C3BC7] transition-all text-left group"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <h3 className="font-bold text-gray-900 text-base group-hover:text-[#6C3BC7] transition-colors">{s.name}</h3>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
                {s.subjects.length} Subjects
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium mb-4">{s.description}</p>
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 text-xs font-bold text-[#6C3BC7]">
              <span>View Curriculum</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </FlowLayout>
  );
};

// 3. Subjects View
const SubjectsView = () => {
  const navigate = useNavigate();
  const { categoryId, streamId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  const category = studyCategories.find(c => c.id === categoryId) || studyCategories[0];
  const stream = category.streams.find(s => s.id === streamId) || category.streams[0];
  
  const filteredSubjects = stream.subjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <FlowLayout 
      title={stream.name} 
      subtitle={`Enrolled Subjects & Syllabus for ${stream.name}`} 
      showSearch 
      onSearch={setSearchTerm}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSubjects.map(s => (
          <button 
            key={s.id} 
            onClick={() => navigate(`/app/study/${categoryId}/${streamId}/${s.id}`)}
            className="flex flex-col p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6C3BC7] transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">{s.code}</span>
              <span className="text-xs font-bold text-gray-400">{s.chapters.length} Chapters</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-4 group-hover:text-[#6C3BC7] transition-colors">{s.name}</h3>
            
            <div className="w-full mt-auto">
              <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                <span className="text-gray-500">Subject Progress</span>
                <span className="text-[#6C3BC7]">{s.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#6C3BC7] rounded-full transition-all duration-500" style={{ width: `${s.progress}%` }}></div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </FlowLayout>
  );
};

// 4. Chapters View
const ChaptersView = () => {
  const navigate = useNavigate();
  const { categoryId, streamId, subjectId } = useParams();

  const category = studyCategories.find(c => c.id === categoryId) || studyCategories[0];
  const stream = category.streams.find(s => s.id === streamId) || category.streams[0];
  const subject = stream.subjects.find(s => s.id === subjectId) || stream.subjects[0];

  return (
    <FlowLayout 
      title={subject.name} 
      subtitle={`${subject.code} • ${subject.chapters.length} Module Chapters`}
    >
      <div className="space-y-3">
        {subject.chapters.map((c, i) => (
          <button 
            key={c.id} 
            onClick={() => navigate(`/app/study/${categoryId}/${streamId}/${subjectId}/${c.id}`)}
            className="w-full flex items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6C3BC7] transition-all text-left group"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${c.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
              {c.completed ? <CheckCircle2 size={20} /> : i + 1}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 group-hover:text-[#6C3BC7] transition-colors">{c.name}</h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">{c.materials.length} Learning Resources</p>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-[#6C3BC7] group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>
    </FlowLayout>
  );
};

// 5. Materials View
const MaterialsView = () => {
  const { categoryId, streamId, subjectId, chapterId } = useParams();

  const category = studyCategories.find(c => c.id === categoryId) || studyCategories[0];
  const stream = category.streams.find(s => s.id === streamId) || category.streams[0];
  const subject = stream.subjects.find(s => s.id === subjectId) || stream.subjects[0];
  const chapter = subject.chapters.find(c => c.id === chapterId) || subject.chapters[0];

  return (
    <FlowLayout 
      title={chapter.name} 
      subtitle={`Study Notes, Video Lectures & Practice Sheets for ${chapter.name}`}
    >
      <div className="space-y-3">
        {chapter.materials.map(m => (
          <div 
            key={m.id} 
            className="w-full flex items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${m.type === 'video' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
              {m.type === 'video' ? <PlayCircle size={26} /> : <FileText size={26} />}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-base">{m.name}</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                {m.type === 'video' ? `Video Lecture • ${m.duration}` : `Study Notes PDF • ${m.pages} Pages`}
              </p>
            </div>
            <button className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-[#6C3BC7] hover:text-white font-bold text-xs rounded-xl transition-colors">
              {m.type === 'video' ? 'Watch Now' : 'Open PDF'}
            </button>
          </div>
        ))}
      </div>
    </FlowLayout>
  );
};

export const StudyFlow: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriesView />} />
      <Route path="/:categoryId" element={<StreamsView />} />
      <Route path="/:categoryId/:streamId" element={<SubjectsView />} />
      <Route path="/:categoryId/:streamId/:subjectId" element={<ChaptersView />} />
      <Route path="/:categoryId/:streamId/:subjectId/:chapterId" element={<MaterialsView />} />
    </Routes>
  );
};
