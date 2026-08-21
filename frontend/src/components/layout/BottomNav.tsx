import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, TreePine, BarChart2, LayoutGrid } from 'lucide-react';
import { cn } from '../../utils/cn';

const navItems = [
  { name: 'Home', path: '/app', icon: Home },
  { name: 'Study', path: '/app/study', icon: BookOpen },
  { name: 'Tree', path: '/app/tree', icon: TreePine },
  { name: 'Progress', path: '/app/progress', icon: BarChart2 },
  { name: 'More', path: '/app/more', icon: LayoutGrid },
];

export const BottomNav: React.FC = () => {
  return (
    <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-gray-50 pb-safe pt-2 px-6 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-50">
      <nav className="flex justify-between items-center mb-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/app'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 relative',
                isActive ? 'text-[#4F46E5]' : 'text-gray-400 hover:text-gray-600'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "absolute inset-0 bg-[#4F46E5]/10 rounded-2xl transition-transform duration-300 scale-0",
                  isActive && "scale-100"
                )} />
                <item.icon className={cn('w-6 h-6 relative z-10 transition-transform duration-300', isActive && '-translate-y-0.5')} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn(
                  "text-[10px] font-bold relative z-10 transition-all duration-300 opacity-0 translate-y-2",
                  isActive && "opacity-100 translate-y-0.5"
                )}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
