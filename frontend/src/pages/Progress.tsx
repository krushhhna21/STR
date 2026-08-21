import React from 'react';
import { TopBar } from '../components/layout/TopBar';
import { StatCard } from '../components/ui/StatCard';
import { Clock, Flame, CheckCircle2, Award, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 3.0 },
  { name: 'Wed', hours: 2.0 },
  { name: 'Thu', hours: 4.5 },
  { name: 'Fri', hours: 3.5 },
  { name: 'Sat', hours: 2.0 },
  { name: 'Sun', hours: 1.5 },
];

export const Progress: React.FC = () => {
  return (
    <div className="min-h-full">
      <div className="lg:hidden">
        <TopBar title="My Progress" />
      </div>
      
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5 lg:space-y-8">
        
        {/* Desktop Title */}
        <div className="hidden lg:block mb-2">
          <h1 className="text-3xl font-black text-[#1E1B4B]">Your Progress</h1>
          <p className="text-gray-500 font-medium mt-1">Keep track of your study journey</p>
        </div>

        {/* Top Stats Grid - 2x2 on mobile, 4x1 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            label="Total Focus"
            value="42.5h"
            icon={Clock}
            colorClass="text-[#6C3BC7]"
            bgClass="bg-[#EAE0FF]"
          />
          <StatCard
            label="Current Streak"
            value="14 days"
            icon={Flame}
            colorClass="text-[#F59E0B]"
            bgClass="bg-orange-100"
          />
          <StatCard
            label="Tasks Done"
            value="128"
            icon={CheckCircle2}
            colorClass="text-[#14B8A6]"
            bgClass="bg-teal-100"
          />
          <StatCard
            label="Badges"
            value="12"
            icon={Award}
            colorClass="text-[#F52B91]"
            bgClass="bg-pink-100"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] border border-gray-50 shadow-sm">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Weekly Activity</h3>
            <select className="bg-gray-50 border-none text-[12px] lg:text-[14px] font-bold text-gray-500 rounded-lg py-1.5 px-3 focus:ring-0 cursor-pointer outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          
          <div className="h-[180px] lg:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C3BC7" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6C3BC7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }}
                  itemStyle={{ color: '#6C3BC7', fontWeight: 'bold', fontSize: '14px' }}
                  labelStyle={{ fontSize: '12px', color: '#6b7280' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#6C3BC7" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
          
          {/* Subject Progress */}
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] border border-gray-50 shadow-sm">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B] mb-4 lg:mb-6">Subject Progress</h3>
            <div className="space-y-4 lg:space-y-6">
              {[
                { subject: 'Physics', progress: 80, color: 'bg-[#6C3BC7]' },
                { subject: 'Chemistry', progress: 65, color: 'bg-[#F52B91]' },
                { subject: 'Mathematics', progress: 72, color: 'bg-[#14B8A6]' },
                { subject: 'Biology', progress: 90, color: 'bg-[#F59E0B]' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] lg:text-[15px] font-bold text-[#1E1B4B]">{item.subject}</span>
                    <span className="text-[12px] lg:text-[13px] font-bold text-gray-400">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 lg:h-2.5">
                    <div className={`${item.color} h-2 lg:h-2.5 rounded-full`} style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges / Achievements */}
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] border border-gray-50 shadow-sm flex flex-col">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B] mb-4 lg:mb-6">Achievements</h3>
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
              {[
                { title: '7 Day Streak', icon: '🏆', bg: 'from-yellow-100 to-orange-100' },
                { title: 'Focus Master', icon: '🔥', bg: 'from-orange-100 to-rose-100' },
                { title: '10 Topics', icon: '📚', bg: 'from-blue-100 to-indigo-100' },
                { title: 'Early Bird', icon: '⭐', bg: 'from-teal-100 to-green-100' },
              ].map((badge, i) => (
                <div key={i} className="bg-gray-50/50 p-4 rounded-[16px] border border-gray-100 text-center shadow-sm flex flex-col items-center justify-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${badge.bg} rounded-full flex items-center justify-center text-2xl shadow-inner border border-white mb-3`}>
                    {badge.icon}
                  </div>
                  <h4 className="font-bold text-[#1E1B4B] text-[13px] leading-tight">{badge.title}</h4>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* View Detailed Report */}
        <button className="w-full bg-white border border-gray-50 shadow-sm py-4 rounded-[16px] lg:rounded-[20px] flex items-center justify-center gap-2 text-[#6C3BC7] font-bold text-[14px] lg:text-[16px] hover:bg-gray-50 transition-colors">
          View Detailed Report
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
};
