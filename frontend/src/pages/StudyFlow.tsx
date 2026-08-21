import React from 'react';
import { useNavigate, Routes, Route, useParams } from 'react-router-dom';
import { ChevronLeft, Search, BookOpen, GraduationCap, Code, PlayCircle, FileText, ChevronRight } from 'lucide-react';
import { TopBar } from '../components/layout/TopBar';

const mockData = {
  categories: [
    { id: 'school', name: 'School (1st - 12th)', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'CBSE, ICSE, State Boards' },
    { id: 'diploma', name: 'Diploma', icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Polytechnic courses' },
    { id: 'engineering', name: 'Engineering', icon: Code, color: 'text-indigo-600', bg: 'bg-indigo-100', desc: 'B.Tech / B.E. streams' },
    { id: 'other', name: 'Other Courses', icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-100', desc: 'Language, Skills' }
  ],
  streams: [
    { id: 'cse', name: 'Computer Science (CSE)', courses: 24, icon: Code },
    { id: 'ece', name: 'Electronics (ECE)', courses: 18, icon: Code },
    { id: 'me', name: 'Mechanical (ME)', courses: 15, icon: Code }
  ],
  subjects: [
    { id: 'dbms', name: 'Database Management Systems', progress: 45 },
    { id: 'os', name: 'Operating Systems', progress: 10 },
    { id: 'cn', name: 'Computer Networks', progress: 80 }
  ],
  chapters: [
    { id: 'intro', name: 'Introduction to DBMS', completed: true },
    { id: 'relational', name: 'Relational Model & Algebra', completed: false },
    { id: 'sql', name: 'SQL Fundamentals', completed: false }
  ],
  materials: [
    { id: 'v1', type: 'video', name: 'What is a Database?', duration: '12:00', icon: PlayCircle },
    { id: 'n1', type: 'notes', name: 'Chapter 1 Summary Notes', pages: 5, icon: FileText }
  ]
};

// Generic Layout wrapper with Back button
const FlowLayout: React.FC<{ title: string; children: React.ReactNode; showSearch?: boolean }> = ({ title, children, showSearch }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full flex flex-col bg-white lg:bg-transparent">
      {/* Mobile TopBar for consistent UI */}
      <div className="lg:hidden">
        <TopBar />
      </div>
      
      <div className="px-6 py-6 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-black text-[#1E1B4B]">{title}</h1>
        </div>

        {showSearch && (
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] font-medium transition-all text-gray-900"
              placeholder="Search..."
            />
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

// Views
const CategoriesView = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full">
      <div className="lg:hidden"><TopBar /></div>
      <div className="px-6 py-6 max-w-5xl mx-auto w-full">
        <h1 className="text-2xl font-black text-[#1E1B4B] mb-6">Explore Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockData.categories.map(c => (
            <button 
              key={c.id} 
              onClick={() => navigate(`/app/study/${c.id}`)}
              className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.bg} ${c.color} mr-4 shrink-0`}>
                <c.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{c.name}</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">{c.desc}</p>
              </div>
              <ChevronRight className="text-gray-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const StreamsView = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  
  return (
    <FlowLayout title="Select Branch" showSearch>
      <div className="grid grid-cols-1 gap-3">
        {mockData.streams.map(s => (
          <button 
            key={s.id} 
            onClick={() => navigate(`/app/study/${categoryId}/${s.id}`)}
            className="flex items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#6C3BC7] transition-all text-left group"
          >
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 group-hover:text-[#6C3BC7] transition-colors">{s.name}</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">{s.courses} Courses</p>
            </div>
            <ChevronRight className="text-gray-300 group-hover:text-[#6C3BC7]" />
          </button>
        ))}
      </div>
    </FlowLayout>
  );
};

const SubjectsView = () => {
  const navigate = useNavigate();
  const { categoryId, streamId } = useParams();
  
  return (
    <FlowLayout title="Subjects" showSearch>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockData.subjects.map(s => (
          <button 
            key={s.id} 
            onClick={() => navigate(`/app/study/${categoryId}/${streamId}/${s.id}`)}
            className="flex flex-col p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all text-left"
          >
            <h3 className="font-bold text-gray-900 mb-4">{s.name}</h3>
            <div className="w-full flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#F52B91] rounded-full" style={{ width: `${s.progress}%` }}></div>
              </div>
              <span className="text-xs font-bold text-gray-500">{s.progress}%</span>
            </div>
          </button>
        ))}
      </div>
    </FlowLayout>
  );
};

const ChaptersView = () => {
  const navigate = useNavigate();
  const { categoryId, streamId, subjectId } = useParams();
  
  return (
    <FlowLayout title="Chapters">
      <div className="space-y-3">
        {mockData.chapters.map((c, i) => (
          <button 
            key={c.id} 
            onClick={() => navigate(`/app/study/${categoryId}/${streamId}/${subjectId}/${c.id}`)}
            className="w-full flex items-center p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#6C3BC7] transition-all text-left group"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${c.completed ? 'bg-[#14B8A6] text-white' : 'bg-gray-100 text-gray-500'}`}>
              {i + 1}
            </div>
            <h3 className="font-bold text-gray-900 flex-1 group-hover:text-[#6C3BC7]">{c.name}</h3>
            <ChevronRight className="text-gray-300 group-hover:text-[#6C3BC7]" />
          </button>
        ))}
      </div>
    </FlowLayout>
  );
};

const MaterialsView = () => {
  return (
    <FlowLayout title="Study Materials">
      <div className="space-y-3">
        {mockData.materials.map(m => (
          <button 
            key={m.id} 
            className="w-full flex items-center p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all text-left group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${m.type === 'video' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
              <m.icon size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{m.name}</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                {m.type === 'video' ? `Video • ${m.duration}` : `PDF • ${m.pages} pages`}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#6C3BC7] group-hover:text-white transition-colors">
              <PlayCircle size={16} />
            </div>
          </button>
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
