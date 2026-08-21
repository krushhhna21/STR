import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-white lg:bg-[#F9F7FF] overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <main className="flex-1 overflow-y-auto pb-[84px] lg:pb-0 w-full">
          <div className="w-full max-w-7xl mx-auto bg-white min-h-full lg:my-4 lg:rounded-3xl lg:shadow-sm lg:border lg:border-gray-100">
            <Outlet />
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};
