import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { CourseCard } from '../components/ui/CourseCard';
import { TaskItem } from '../components/ui/TaskItem';
import { Timer } from '../components/features/Timer';
import { 
  Calculator, FlaskConical, Code2, BookText, TreePine, 
  BookOpen, Bot, Clock, BarChart2, FileText, GraduationCap, LayoutGrid, RotateCcw
} from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { useTimerStore } from '../store/timerStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { todayFocusSeconds, tasks, toggleTask, resetStats } = useTimerStore();

  // Dynamic progress calculations based on real timer state
  const targetSeconds = 4 * 3600; // 4 Hours target
  const focusPercentage = Math.min(100, Math.round((todayFocusSeconds / targetSeconds) * 100));
  const todayHoursFormatted = (todayFocusSeconds / 3600).toFixed(1);

  const quickAccessItems = [
    { name: 'Study', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-100', path: '/app/study' },
    { name: 'AI Help', icon: Bot, color: 'text-blue-600', bg: 'bg-blue-100', path: '/app/explore' },
    { name: 'Timer', icon: Clock, color: 'text-rose-600', bg: 'bg-rose-100', path: '/app' },
    { name: 'Progress', icon: BarChart2, color: 'text-orange-600', bg: 'bg-orange-100', path: '/app/progress' },
    { name: 'Notes', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100', path: '/app/study/engineering' },
    { name: 'Courses', icon: GraduationCap, color: 'text-teal-600', bg: 'bg-teal-100', path: '/app/study' },
    { name: 'Explore', icon: LayoutGrid, color: 'text-gray-600', bg: 'bg-gray-100', path: '/app/explore' },
  ];

  return (
    <div className="min-h-full">
      <TopBar />
      
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
        
        {/* Desktop Greeting */}
        <div className="hidden lg:flex items-center justify-between mb-2">
          <div>
            <h1 className="text-3xl font-black text-[#1E1B4B]">Hi, {user?.name?.split(' ')[0] || 'Krishna'} 👋</h1>
            <p className="text-gray-500 font-medium mt-1">Let's make today productive with your active curriculum!</p>
          </div>
          <button 
            onClick={resetStats}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all shadow-sm"
            title="Reset focus numbers and session counters"
          >
            <RotateCcw size={14} /> Reset Today's Metrics
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
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Quick Access</h3>
            <span className="text-xs font-bold text-gray-400">Curriculum Navigation</span>
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
            <div onClick={() => navigate('/app/study/engineering/cse/dbms')} className="cursor-pointer">
              <CourseCard 
                title="Database Systems (DBMS)" 
                progress={65} 
                icon={Code2} 
                colorClass="text-[#4F46E5]" 
                bgClass="bg-indigo-50" 
              />
            </div>
            <div onClick={() => navigate('/app/study/school/class12-jee/phy12')} className="cursor-pointer">
              <CourseCard 
                title="Physics Class 12 & JEE" 
                progress={85} 
                icon={FlaskConical} 
                colorClass="text-[#F52B91]" 
                bgClass="bg-pink-50" 
              />
            </div>
            <div onClick={() => navigate('/app/study/engineering/cse/dsa')} className="cursor-pointer">
              <CourseCard 
                title="Data Structures & Algorithms" 
                progress={80} 
                icon={Calculator} 
                colorClass="text-[#14B8A6]" 
                bgClass="bg-teal-50" 
              />
            </div>
            <div onClick={() => navigate('/app/study/skills/web-dev/react-node')} className="cursor-pointer">
              <CourseCard 
                title="Full-Stack Web Dev" 
                progress={95} 
                icon={BookText} 
                colorClass="text-[#F59E0B]" 
                bgClass="bg-orange-50" 
              />
            </div>
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
