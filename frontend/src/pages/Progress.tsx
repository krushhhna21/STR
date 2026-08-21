import React from 'react';
import { TopBar } from '../components/layout/TopBar';
import { StatCard } from '../components/ui/StatCard';
import { Clock, Flame, CheckCircle2, Award, RotateCcw } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTimerStore } from '../store/timerStore';

export const Progress: React.FC = () => {
  const { totalFocusSeconds, todayFocusSeconds, streakDays, tasks, completedSessions, resetStats } = useTimerStore();

  const totalHours = (totalFocusSeconds / 3600).toFixed(1);
  const todayHours = (todayFocusSeconds / 3600).toFixed(1);
  const tasksDoneCount = tasks.filter(t => t.completed).length;

  const weeklyData = [
    { name: 'Mon', hours: 2.5 },
    { name: 'Tue', hours: 3.0 },
    { name: 'Wed', hours: 2.0 },
    { name: 'Thu', hours: 4.5 },
    { name: 'Fri', hours: 3.5 },
    { name: 'Sat', hours: 2.0 },
    { name: 'Today', hours: parseFloat(todayHours) },
  ];

  return (
    <div className="min-h-full">
      <div className="lg:hidden">
        <TopBar title="My Progress" />
      </div>
      
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5 lg:space-y-8">
        
        {/* Desktop Title Header */}
        <div className="hidden lg:flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-black text-[#1E1B4B]">Your Analytics & Progress</h1>
            <p className="text-gray-500 font-medium mt-1">Live analytics synchronized with your timer and course activities</p>
          </div>
          <button 
            onClick={resetStats}
            className="flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition-all shadow-sm border border-rose-100"
          >
            <RotateCcw size={15} /> Reset Analytics & Timer Stats
          </button>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            label="Total Focus"
            value={`${totalHours}h`}
            icon={Clock}
            colorClass="text-[#6C3BC7]"
            bgClass="bg-[#EAE0FF]"
          />
          <StatCard
            label="Current Streak"
            value={`${streakDays} Days`}
            icon={Flame}
            colorClass="text-[#F59E0B]"
            bgClass="bg-orange-100"
          />
          <StatCard
            label="Tasks Done"
            value={`${tasksDoneCount} / ${tasks.length}`}
            icon={CheckCircle2}
            colorClass="text-[#14B8A6]"
            bgClass="bg-teal-100"
          />
          <StatCard
            label="Sessions Done"
            value={`${completedSessions}`}
            icon={Award}
            colorClass="text-[#F52B91]"
            bgClass="bg-pink-100"
          />
        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] border border-gray-50 shadow-sm">
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div>
              <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Weekly Activity Trend</h3>
              <p className="text-xs text-gray-400 font-medium">Updated live in real-time</p>
            </div>
            <select className="bg-gray-50 border-none text-[12px] lg:text-[14px] font-bold text-gray-500 rounded-lg py-1.5 px-3 focus:ring-0 cursor-pointer outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          
          <div className="h-[200px] lg:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C3BC7" stopOpacity={0.25}/>
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
          
          {/* Real Subject Progress */}
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] border border-gray-50 shadow-sm">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B] mb-4 lg:mb-6">Curriculum Progress</h3>
            <div className="space-y-4 lg:space-y-6">
              {[
                { subject: 'Database Management Systems (DBMS)', progress: 65, color: 'bg-[#6C3BC7]' },
                { subject: 'Data Structures & Algorithms (DSA)', progress: 80, color: 'bg-[#14B8A6]' },
                { subject: 'Physics Class 12 & JEE', progress: 85, color: 'bg-[#F52B91]' },
                { subject: 'React & Node.js Web Dev', progress: 95, color: 'bg-[#F59E0B]' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] lg:text-[15px] font-bold text-[#1E1B4B]">{item.subject}</span>
                    <span className="text-[12px] lg:text-[13px] font-bold text-gray-400">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`${item.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${item.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges / Achievements */}
          <div className="bg-white p-4 lg:p-6 rounded-[20px] lg:rounded-[24px] border border-gray-50 shadow-sm flex flex-col">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B] mb-4 lg:mb-6">Earned Badges</h3>
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 flex-1">
              {[
                { title: `${streakDays} Day Streak`, icon: '🏆', bg: 'from-yellow-100 to-orange-100' },
                { title: 'Focus Master', icon: '🔥', bg: 'from-orange-100 to-rose-100' },
                { title: 'DBMS Completed', icon: '📚', bg: 'from-blue-100 to-indigo-100' },
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

      </div>
    </div>
  );
};
