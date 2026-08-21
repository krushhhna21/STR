import React, { useState } from 'react';
import { TopBar } from '../components/layout/TopBar';
import { ResourceCard } from '../components/ui/ResourceCard';
import { Search, Flame, Sparkles, Calculator, FlaskConical, Globe, Code2 } from 'lucide-react';
import { cn } from '../utils/cn';

const categories = ['All', 'Mathematics', 'Science', 'Languages', 'Coding', 'History'];

const recommendedResources = [
  { id: 1, title: 'Calculus Fundamentals', topic: 'Mathematics', type: 'video' as const, color: 'bg-blue-500', icon: Calculator },
  { id: 2, title: 'Organic Chemistry Basics', topic: 'Science', type: 'document' as const, color: 'bg-purple-500', icon: FlaskConical },
  { id: 3, title: 'Spanish A1 Grammar', topic: 'Languages', type: 'document' as const, color: 'bg-rose-500', icon: Globe },
  { id: 4, title: 'Python for Beginners', topic: 'Coding', type: 'video' as const, color: 'bg-green-500', icon: Code2 },
];

export const Explore: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-full">
      <TopBar title="Explore" />
      <div className="px-6 py-6 max-w-7xl mx-auto">
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm shadow-sm transition-all"
            placeholder="Search subjects, topics, or AI tutors..."
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-white text-gray-600 border border-gray-100 hover:border-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Trending Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="text-orange-500" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Trending Now</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedResources.map((res) => (
              <ResourceCard
                key={res.id}
                title={res.title}
                topic={res.topic}
                type={res.type}
                color={res.color}
                icon={res.icon}
              />
            ))}
          </div>
        </div>

        {/* AI Tutors Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-indigo-500" size={24} />
            <h3 className="text-xl font-bold text-gray-900">Top AI Tutors</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-indigo-100 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm text-2xl">
                👨‍🔬
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Dr. Albert (Physics)</h4>
                <p className="text-sm font-medium text-gray-500">Expert in Mechanics & Thermodynamics</p>
              </div>
              <div className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg">
                Online
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 cursor-pointer hover:border-indigo-100 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm text-2xl">
                👩‍🏫
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Ms. Clara (Literature)</h4>
                <p className="text-sm font-medium text-gray-500">Essay reviews & classic literature</p>
              </div>
              <div className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-bold rounded-lg">
                Offline
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
