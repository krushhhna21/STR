import React, { useState } from 'react';
import { TopBar } from '../components/layout/TopBar';
import { ResourceCard } from '../components/ui/ResourceCard';
import { Search, Flame, Sparkles, Calculator, FlaskConical, Code2, Stethoscope, Briefcase } from 'lucide-react';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Computer Science', 'Class 12 JEE/NEET', 'Medical', 'Commerce', 'Web Dev & AI'];

const recommendedResources = [
  { id: 1, title: 'Database Normalization & 3NF/BCNF', topic: 'Computer Science', type: 'video' as const, color: 'bg-indigo-500', icon: Code2, path: '/app/study/engineering/cse/dbms' },
  { id: 2, title: 'Electrostatics & Gauss Law Notes', topic: 'Class 12 JEE/NEET', type: 'document' as const, color: 'bg-rose-500', icon: FlaskConical, path: '/app/study/school/class12-jee/phy12' },
  { id: 3, title: 'Human Anatomy 3D Heart Model', topic: 'Medical', type: 'video' as const, color: 'bg-red-500', icon: Stethoscope, path: '/app/study/medical/mbbs-phase1/anatomy' },
  { id: 4, title: 'React Hooks & State Management Guide', topic: 'Web Dev & AI', type: 'video' as const, color: 'bg-teal-500', icon: Sparkles, path: '/app/study/skills/web-dev/react-node' },
  { id: 5, title: 'Calculus Definite Integrals Booklet', topic: 'Class 12 JEE/NEET', type: 'document' as const, color: 'bg-blue-500', icon: Calculator, path: '/app/study/school/class12-jee/math12' },
  { id: 6, title: 'Corporate Financial Accounting', topic: 'Commerce', type: 'document' as const, color: 'bg-amber-500', icon: Briefcase, path: '/app/study/commerce/finance-bba/fin-acc' },
];

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = recommendedResources.filter(res => {
    const matchesCategory = activeCategory === 'All' || res.topic === activeCategory;
    const matchesQuery = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         res.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-full">
      <TopBar title="Explore Courses & Resources" />
      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto space-y-6">
        
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl leading-5 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] font-medium sm:text-sm shadow-sm transition-all text-gray-900"
            placeholder="Search subjects, streams (DBMS, Physics, React, Anatomy)..."
          />
        </div>

        {/* Categories Pills */}
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                activeCategory === category
                  ? "bg-[#6C3BC7] text-white shadow-md shadow-indigo-200"
                  : "bg-white text-gray-600 border border-gray-100 hover:border-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Trending Curriculum Resources Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="text-orange-500" size={24} />
              <h3 className="text-xl font-black text-[#1E1B4B]">Top Curriculum Resources</h3>
            </div>
            <span className="text-xs font-bold text-gray-400">{filteredResources.length} items found</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((res) => (
              <div key={res.id} onClick={() => navigate(res.path)} className="cursor-pointer">
                <ResourceCard
                  title={res.title}
                  topic={res.topic}
                  type={res.type}
                  color={res.color}
                  icon={res.icon}
                />
              </div>
            ))}
          </div>
        </div>

        {/* AI Tutors Section */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-[#6C3BC7]" size={24} />
            <h3 className="text-xl font-black text-[#1E1B4B]">Specialized AI Curriculum Tutors</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-indigo-100 hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm text-2xl">
                👨‍💻
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-base">Prof. Turing (Computer Science & AI)</h4>
                <p className="text-xs font-medium text-gray-500 mt-0.5">DBMS, DSA, Algorithms & Code Debugging</p>
              </div>
              <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg">
                Online
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-indigo-100 hover:shadow-sm transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-orange-100 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm text-2xl">
                👨‍🔬
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-base">Dr. Feynman (Physics & JEE)</h4>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Electrostatics, Quantum Mechanics & Optics</p>
              </div>
              <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-lg">
                Online
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
