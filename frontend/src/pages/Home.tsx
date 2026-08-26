import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { CourseCard } from '../components/ui/CourseCard';
import { TaskItem } from '../components/ui/TaskItem';
import { Timer } from '../components/features/Timer';
import { 
  Calculator, FlaskConical, Code2, BookText, TreePine, 
  BookOpen, Bot, Clock, BarChart2, FileText, GraduationCap, LayoutGrid, RotateCcw,
  Sparkles, ArrowRight, UserCheck, Stethoscope
} from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { useTimerStore } from '../store/timerStore';
import { getStudentRecommendations } from '../utils/studentProfile';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { todayFocusSeconds, tasks, toggleTask, resetStats } = useTimerStore();

  const profile = user?.studentProfile || {
    streamName: 'Class 12th PCM',
    yearGrade: 'Class 12',
    categoryName: 'CBSE',
    educationType: 'school',
    branch: 'CSE',
    streamTag: 'PCM',
    classLevel: 'Class 12',
  };

  const recommendationCards = getStudentRecommendations(user?.studentProfile || profile) as Array<{
    title: string;
    progress: number;
    path: string;
    icon: any;
    colorClass: string;
    bgClass: string;
  }>;

  const targetSeconds = 4 * 3600;
  const focusPercentage = Math.min(100, Math.round((todayFocusSeconds / targetSeconds) * 100));
  const todayHoursFormatted = (todayFocusSeconds / 3600).toFixed(1);

  const quickAccessItems = [
    { name: 'My Course', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-100', path: '/app/my-course' },
    { name: 'Study Flow', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-100', path: '/app/study' },
    { name: 'AI Tutor', icon: Bot, color: 'text-blue-600', bg: 'bg-blue-100', path: '/app/explore' },
    { name: 'Timer', icon: Clock, color: 'text-rose-600', bg: 'bg-rose-100', path: '/app' },
    { name: 'Progress', icon: BarChart2, color: 'text-orange-600', bg: 'bg-orange-100', path: '/app/progress' },
    { name: 'Notes', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100', path: '/app/study' },
    { name: 'Explore', icon: LayoutGrid, color: 'text-gray-600', bg: 'bg-gray-100', path: '/app/explore' },
  ];

  return (
    <div className="min-h-full">
      <TopBar />
      
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
        
        {/* Desktop Greeting */}
        <div className="hidden lg:flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-black text-[#1E1B4B]">Hi, {user?.name?.split(' ')[0] || 'Student'} 👋</h1>
            <p className="text-gray-500 font-medium mt-1">{profile.educationType ? `Your ${profile.educationType} learning path is ready.` : 'Welcome back to your personalized study portal!'}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/onboarding/student-details')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-[#6C3BC7] font-bold text-xs rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100"
            >
              <UserCheck size={14} /> Registered: {profile.yearGrade}
            </button>
            <button 
              onClick={resetStats}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all shadow-sm"
              title="Reset focus numbers and session counters"
            >
              <RotateCcw size={14} /> Reset Metrics
            </button>
          </div>
        </div>

        {/* Registered Course Hero Bar */}
        <div className="bg-gradient-to-r from-[#1E1B4B] via-indigo-900 to-[#6C3BC7] rounded-[24px] p-5 lg:p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-900">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
              <Sparkles size={14} className="text-amber-400" /> Enrolled Curriculum
            </div>
            <h2 className="text-xl lg:text-2xl font-black text-white">
              {profile.streamName}
            </h2>
            <p className="text-xs lg:text-sm text-indigo-200 font-medium mt-0.5">
              {profile.educationType === 'school' ? `${profile.classLevel} • ${profile.board} • ${profile.streamTag}` : `${profile.yearGrade} • ${profile.branch || profile.streamTag || 'Academic Path'}`} • Personalized resources for your track
            </p>
          </div>

          <button
            onClick={() => navigate('/app/my-course')}
            className="px-5 py-3 bg-[#F52B91] hover:bg-[#d8217d] text-white font-bold text-xs lg:text-sm rounded-2xl shadow-lg shadow-[#F52B91]/30 transition-all flex items-center gap-2 shrink-0"
          >
            Access Course Books, Videos & Resources <ArrowRight size={16} />
          </button>
        </div>

        {/* Top Section: Progress & Timer */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Main Focus / Tree Card */}
          <div className="xl:col-span-2 bg-[#6C3BC7] rounded-[24px] p-6 lg:p-8 text-white relative overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="absolute right-[-10%] top-[-10%] opacity-20 pointer-events-none">
              <TreePine size={300} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-white/20 text-indigo-100 font-bold text-xs px-3 py-1 rounded-full">
                    Active Session Tracker
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-black mt-3 mb-2 tracking-tight">
                    {todayHoursFormatted} hrs Focused Today 🚀
                  </h2>
                  <p className="text-indigo-100 text-sm lg:text-base max-w-md font-medium">
                    Your focus numbers sync live with your timer. Keep going to grow your study streak tree!
                  </p>
                </div>
                <button 
                  onClick={resetStats}
                  className="lg:hidden text-white/80 hover:text-white p-2 rounded-lg bg-white/10 text-xs font-bold flex items-center gap-1"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>

            <div className="relative z-10 mt-8">
              <div className="flex justify-between text-xs font-bold text-indigo-100 mb-2">
                <span>Daily Target ({todayHoursFormatted}h / 4.0h)</span>
                <span>{focusPercentage}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3.5 overflow-hidden">
                <div 
                  className="bg-white h-3.5 rounded-full transition-all duration-500" 
                  style={{ width: `${focusPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Timer Widget */}
          <div className="hidden xl:block xl:col-span-1">
            <Timer />
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-[24px] border border-gray-50 p-4 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Quick Access Navigation</h3>
            <span className="text-xs font-bold text-gray-400">Tabs & Modules</span>
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4">
            {quickAccessItems.map((item, i) => (
              <button 
                key={i} 
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center gap-2 group"
              >
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-[16px] flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-105 transition-transform shadow-sm`}>
                  <item.icon size={24} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] lg:text-[12px] font-bold text-[#1E1B4B] whitespace-nowrap">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Continue Studying Section with Real Subjects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Continue Active Streams & Subjects</h3>
            <button onClick={() => navigate('/app/study')} className="text-xs font-bold text-[#F52B91] hover:underline">
              View All Courses
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendationCards.map((item, index) => {
              const iconMap: Record<string, any> = {
                BookOpen,
                Calculator,
                FlaskConical,
                Code2,
                BookText,
                Stethoscope,
              };
              const Icon = iconMap[item.title.includes('Physics') ? 'FlaskConical' : item.title.includes('Anatomy') ? 'Stethoscope' : item.title.includes('Progress') ? 'BarChart2' : 'BookOpen'];

              return (
                <div key={`${item.title}-${index}`} onClick={() => navigate(item.path)} className="cursor-pointer">
                  <CourseCard 
                    title={item.title}
                    progress={item.progress}
                    icon={Icon}
                    colorClass={item.colorClass}
                    bgClass={item.bgClass}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Today's Study Plan</h3>
            <span className="text-xs font-bold text-[#6C3BC7]">
              {tasks.filter(t => t.completed).length} / {tasks.length} Completed
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {tasks.map((t) => (
              <div key={t.id} onClick={() => toggleTask(t.id)} className="cursor-pointer">
                <TaskItem 
                  title={t.title} 
                  time={t.time} 
                  initialCompleted={t.completed} 
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
