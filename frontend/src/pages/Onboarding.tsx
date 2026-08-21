import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between px-6 pt-12 pb-8">
      
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg mx-auto mt-10">
        <h1 className="text-3xl font-black text-[#1E1B4B] text-center mb-4 leading-tight">
          Smart Study<br />
          <span className="text-[#6C3BC7]">Better Future</span>
        </h1>
        
        <p className="text-[#4a4273] text-center font-medium px-4 mb-12 leading-relaxed">
          All the tools you need to study better, stay focused and achieve your goals.
        </p>

        <div className="w-72 h-72 mb-10">
          <img src="/hero.png" alt="Student studying" className="w-full h-full object-contain" />
        </div>
        
        {/* Page Indicators */}
        <div className="flex gap-2 mb-8">
          <div className="w-8 h-2.5 rounded-full bg-[#F52B91]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-pink-100"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-pink-100"></div>
        </div>
      </div>

      <div className="w-full max-w-sm mx-auto">
        <button 
          onClick={() => navigate('/login')}
          className="w-full py-4 rounded-2xl bg-[#F52B91] text-white font-bold text-lg shadow-lg shadow-[#F52B91]/30 hover:bg-[#d8217d] transition-colors flex items-center justify-center gap-2"
        >
          Next <span>→</span>
        </button>
      </div>

    </div>
  );
};
