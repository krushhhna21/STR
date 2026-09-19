import React, { useState } from 'react';
import { TopBar } from '../components/layout/TopBar';
import { Button } from '../components/ui/Button';
import {
  Settings, Shield, Bell, HelpCircle, Sparkles, ChevronRight,
  BookOpenCheck, CircleUserRound, LaptopMinimal, LayoutDashboard, LogOut
} from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';
import { toast } from 'sonner';

const actions = [
  { title: 'Account Settings', subtitle: 'Manage profile, preferences, and security', icon: Settings, route: '/onboarding/student-details' },
  { title: 'Study Preferences', subtitle: 'Tune reminders and focus sessions', icon: BookOpenCheck, route: '/onboarding/student-details' },
  { title: 'Notifications', subtitle: 'Control alerts and important updates', icon: Bell, route: '#' },
  { title: 'Support & Help', subtitle: 'Find answers and contact support', icon: HelpCircle, route: '#' },
  { title: 'Privacy', subtitle: 'Review data and account visibility', icon: Shield, route: '#' },
  { title: 'Personal Profile', subtitle: 'Edit student details and academic setup', icon: CircleUserRound, route: '/onboarding/student-details' },
];

export const More: React.FC = () => {
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.token);
  const logout = useAuthStore(state => state.logout);
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';
  const [toggling, setToggling] = useState(false);

  const handleToggleRole = async () => {
    if (!token) return;
    try {
      setToggling(true);
      const res = await fetch(`${API_BASE_URL}/api/auth/toggle-role`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      toast.success(`Role updated to ${data.user.role}!`);
    } catch (err: any) {
      alert(`Network Error: ${err.message || 'Failed to toggle role'}. Ensure adb reverse is running.`);
      toast.error(err.message || 'Failed to toggle role');
    } finally {
      setToggling(false);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/login', { replace: true });
    toast.success('Signed out successfully');
  };

  return (
    <div className="min-h-full bg-[#F9F7FF]">
      <div className="lg:hidden">
        <TopBar title="More" />
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-10 space-y-6">
        <div className="rounded-[28px] bg-gradient-to-r from-[#1E1B4B] via-indigo-900 to-[#6C3BC7] p-6 lg:p-8 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <button 
                onClick={handleToggleRole}
                disabled={toggling}
                className="inline-flex items-center gap-2 bg-indigo-500/40 border border-indigo-300/50 px-4 py-2 rounded-full text-xs font-bold text-white mb-3 hover:bg-indigo-500/60 transition-all cursor-pointer shadow-lg animate-pulse"
              >
                <Sparkles size={14} className={toggling ? "animate-spin" : ""} /> 
                {isAdmin ? 'Admin Workspace' : 'Student Workspace'}
              </button>
              <h1 className="text-2xl lg:text-4xl font-black tracking-tight mb-2">Everything in one place</h1>
              <p className="text-indigo-200 font-medium">Logged in as: {user?.email}</p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl border border-white/10">
              <LaptopMinimal className="text-indigo-200" size={22} />
              <span className="text-sm font-semibold text-indigo-100">Smart study tools</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="group text-left rounded-[24px] border-2 border-indigo-200 bg-indigo-50 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
                  <LayoutDashboard size={20} />
                </div>
                <ChevronRight className="text-indigo-300 group-hover:text-indigo-500 transition-colors" size={18} />
              </div>
              <h3 className="text-base font-black text-indigo-900">Admin Portal</h3>
              <p className="mt-2 text-sm text-indigo-700 font-medium">Manage categories, content, and system settings</p>
            </button>
          )}
          
          {actions.map(({ title, subtitle, icon: Icon, route }) => (
            <button
              key={title}
              onClick={() => route !== '#' ? navigate(route) : toast.info(`${title} is coming soon!`)}
              className="group text-left rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-indigo-500 transition-colors" size={18} />
              </div>
              <h3 className="text-base font-bold text-[#1E1B4B]">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 font-medium">{subtitle}</p>
            </button>
          ))}
        </div>

        <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Upgrade</p>
              <h2 className="mt-1 text-2xl font-black text-[#1E1B4B]">Unlock the premium study experience</h2>
            </div>
            <Button variant="primary" className="px-6 py-3 rounded-2xl shadow-xl shadow-pink-200/50">
              Upgrade to Pro
            </Button>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="pt-4 pb-8 flex justify-center">
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 px-6 py-3 bg-rose-50 text-rose-600 font-bold rounded-2xl hover:bg-rose-100 transition-colors"
          >
            <LogOut size={18} /> Sign Out of Study Buddy
          </button>
        </div>
      </div>
    </div>
  );
};
