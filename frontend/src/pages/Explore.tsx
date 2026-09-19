import React, { useState } from 'react';
import { TopBar } from '../components/layout/TopBar';
import { ResourceCard } from '../components/ui/ResourceCard';
import { Search, Flame, Sparkles, BookOpen, Video, FileText } from 'lucide-react';
import { cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '../config/api';

const getTypeIcon = (type: string) => {
  if (type === 'video') return Video;
  if (type === 'resource' || type === 'document') return FileText;
  return BookOpen;
};

const getTypeColor = (type: string) => {
  if (type === 'video') return 'bg-rose-500';
  if (type === 'resource' || type === 'document') return 'bg-emerald-500';
  return 'bg-indigo-500';
};

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categoriesData = [] } = useQuery({
    queryKey: ['publicCategories'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/catalog/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    }
  });

  const { data: contentData = [], isLoading } = useQuery({
    queryKey: ['publicContent'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/catalog/content`);
      if (!res.ok) throw new Error('Failed to fetch content');
      return res.json();
    }
  });

  const categoryNames = ['All', ...categoriesData.map((c: any) => c.name)];

  const mappedResources = contentData.map((item: any) => ({
    id: item.id,
    title: item.title,
    topic: categoriesData.find((c: any) => c.id === item.category)?.name || item.subject || 'General',
    type: item.type === 'resource' ? 'document' : item.type,
    color: getTypeColor(item.type),
    icon: getTypeIcon(item.type),
    path: item.linkOrFile.startsWith('http') ? item.linkOrFile : `/app/study/${item.id}`,
    isExternal: item.linkOrFile.startsWith('http')
  }));

  const filteredResources = mappedResources.filter((res: any) => {
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
          {categoryNames.map((category) => (
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
          
          {isLoading ? (
            <div className="text-center py-12 text-gray-500 font-medium">Loading amazing resources...</div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-medium">No resources found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((res: any) => (
                <div key={res.id} onClick={() => res.isExternal ? window.open(res.path, '_blank') : navigate(res.path)} className="cursor-pointer">
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
          )}
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
