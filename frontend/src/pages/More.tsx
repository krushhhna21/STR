import React from 'react';
import { TopBar } from '../components/layout/TopBar';
import { Button } from '../components/ui/Button';
import {
  Settings, Shield, Bell, HelpCircle, Sparkles, ChevronRight,
  BookOpenCheck, CircleUserRound, LaptopMinimal
} from 'lucide-react';

const actions = [
  { title: 'Account Settings', subtitle: 'Manage profile, preferences, and security', icon: Settings },
  { title: 'Study Preferences', subtitle: 'Tune reminders and focus sessions', icon: BookOpenCheck },
  { title: 'Notifications', subtitle: 'Control alerts and important updates', icon: Bell },
  { title: 'Support & Help', subtitle: 'Find answers and contact support', icon: HelpCircle },
  { title: 'Privacy', subtitle: 'Review data and account visibility', icon: Shield },
  { title: 'Personal Profile', subtitle: 'Edit student details and academic setup', icon: CircleUserRound },
];

export const More: React.FC = () => {
  return (
    <div className="min-h-full bg-[#F9F7FF]">
      <div className="lg:hidden">
        <TopBar title="More" />
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6 lg:py-10 space-y-6">
        <div className="rounded-[28px] bg-gradient-to-r from-[#1E1B4B] via-indigo-900 to-[#6C3BC7] p-6 lg:p-8 text-white shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-indigo-100 mb-3">
                <Sparkles size={14} /> Student Workspace
              </div>
              <h1 className="text-2xl lg:text-4xl font-black tracking-tight">Everything in one place</h1>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-2xl border border-white/10">
              <LaptopMinimal className="text-indigo-200" size={22} />
              <span className="text-sm font-semibold text-indigo-100">Smart study tools</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {actions.map(({ title, subtitle, icon: Icon }) => (
            <button
              key={title}
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
      </div>
    </div>
  );
};
