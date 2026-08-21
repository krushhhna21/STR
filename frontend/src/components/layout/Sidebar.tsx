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

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex flex-col w-[260px] bg-white border-r border-gray-100 h-screen sticky top-0 px-4 py-6 shrink-0 z-50">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">
          Study Buddy
        </span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/app'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200',
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('w-5 h-5', isActive ? 'text-indigo-600' : 'text-gray-400')} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-2">
        <div className="p-4 bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 text-sm mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-indigo-700/70 mb-3 leading-relaxed">
            Get unlimited AI tutors and advanced analytics.
          </p>
          <button className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
};
