import React from 'react';
import { TopBar } from '../components/layout/TopBar';
import { CourseCard } from '../components/ui/CourseCard';
import { TaskItem } from '../components/ui/TaskItem';
import { Timer } from '../components/features/Timer';
import { 
  Calculator, FlaskConical, Code2, BookText, TreePine, 
  BookOpen, Bot, Moon, Clock, BarChart2, FileText, GraduationCap, LayoutGrid
} from 'lucide-react';
import { useAuthStore } from '../store/auth';

const quickAccessItems = [
  { name: 'Study', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  { name: 'AI Help', icon: Bot, color: 'text-blue-600', bg: 'bg-blue-100' },
  { name: 'Mood On', icon: Moon, color: 'text-purple-600', bg: 'bg-purple-100' },
  { name: 'Timer', icon: Clock, color: 'text-rose-600', bg: 'bg-rose-100' },
  { name: 'Progress', icon: BarChart2, color: 'text-orange-600', bg: 'bg-orange-100' },
  { name: 'Notes', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { name: 'Gate Pass', icon: GraduationCap, color: 'text-teal-600', bg: 'bg-teal-100' },
  { name: 'More', icon: LayoutGrid, color: 'text-gray-600', bg: 'bg-gray-100' },
];

export const Home: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-full">
      {/* Mobile TopBar, hidden on Desktop since Sidebar has branding and we can add a Desktop Header here if needed, but AppLayout gives us a clean slate. Let's use TopBar but make it adapt. */}
      <TopBar />
      
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
        
        {/* Desktop Greeting (Mobile greeting is in TopBar) */}
        <div className="hidden lg:block mb-2">
          <h1 className="text-3xl font-black text-[#1E1B4B]">Hi, {user?.name?.split(' ')[0] || 'Krishna'} 👋</h1>
          <p className="text-gray-500 font-medium mt-1">Let's make today productive!</p>
        </div>

        {/* Top Section: Progress & Timer */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Main Focus / Tree Card */}
          <div className="xl:col-span-2 bg-[#6C3BC7] rounded-[24px] p-6 lg:p-8 text-white relative overflow-hidden shadow-sm">
            {/* Decorative background tree */}
            <div className="absolute right-[-10%] top-[-10%] opacity-20 pointer-events-none">
              <TreePine size={300} />
            </div>
            
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div>
                <h2 className="text-2xl lg:text-3xl font-black mb-2 tracking-tight">Keep Going! 🚀</h2>
                <p className="text-indigo-100 text-sm lg:text-base max-w-[200px] lg:max-w-md font-medium">
                  You are doing great. Keep up the focus to grow your tree!
                </p>
              </div>
              
              <div className="mt-6 lg:mt-8 w-full max-w-md">
                <div className="flex justify-between text-xs font-bold text-indigo-100 mb-2">
                  <span>Focus Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Timer Widget - Only on Desktop, Mobile has it as a Quick Access or separate tab */}
          <div className="hidden xl:block xl:col-span-1">
            <Timer />
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-[24px] border border-gray-50 p-4 lg:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Quick Access</h3>
            <button className="text-xs font-bold text-[#F52B91] hover:underline">Edit</button>
          </div>
          <div className="grid grid-cols-4 lg:grid-cols-8 gap-3 lg:gap-4">
            {quickAccessItems.map((item, i) => (
              <button key={i} className="flex flex-col items-center justify-center gap-2 group">
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-[16px] flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-105 transition-transform shadow-sm`}>
                  <item.icon size={24} strokeWidth={2.5} />
                </div>
                <span className="text-[10px] lg:text-[12px] font-bold text-[#1E1B4B] whitespace-nowrap">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Continue Studying Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Continue Studying</h3>
            <button className="text-xs font-bold text-[#F52B91] hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <CourseCard 
              title="Mathematics" 
              progress={75} 
              icon={Calculator} 
              colorClass="text-[#4F46E5]" 
              bgClass="bg-indigo-50" 
            />
            <CourseCard 
              title="Physics" 
              progress={40} 
              icon={FlaskConical} 
              colorClass="text-[#F52B91]" 
              bgClass="bg-pink-50" 
            />
            <CourseCard 
              title="Computer Sci" 
              progress={90} 
              icon={Code2} 
              colorClass="text-[#14B8A6]" 
              bgClass="bg-teal-50" 
            />
            <CourseCard 
              title="Literature" 
              progress={15} 
              icon={BookText} 
              colorClass="text-[#F59E0B]" 
              bgClass="bg-orange-50" 
            />
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="pb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[16px] lg:text-[18px] font-bold text-[#1E1B4B]">Today's Tasks</h3>
            <button className="text-xs font-bold text-[#F52B91] hover:underline">Add New</button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <TaskItem title="Complete Physics Chapter 4" time="10:00 AM" initialCompleted={true} />
            <TaskItem title="Math Assignment - Calculus" time="02:30 PM" />
            <TaskItem title="Review Literature Essay" time="05:00 PM" />
            <TaskItem title="Practice Coding Algorithms" time="08:00 PM" />
          </div>
        </div>

      </div>
    </div>
  );
};
