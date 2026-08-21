import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1E1B4B] via-[#4A2094] to-[#6C3BC7] text-white relative overflow-hidden">
      
      {/* Decorative stars/background elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white opacity-50 blur-[1px]"></div>
      <div className="absolute top-1/3 right-1/4 w-3 h-3 rounded-full bg-pink-400 opacity-70 blur-[2px]"></div>
      <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-yellow-300 opacity-60 blur-[3px]"></div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg mx-auto px-8 z-10">
        <div className="w-64 h-64 mb-8">
          <img src="/hero.png" alt="Student Studying" className="w-full h-full object-contain drop-shadow-2xl" />
        </div>
        
        <h1 className="text-4xl font-black mb-2 tracking-tight">Study Buddy</h1>
        <p className="text-indigo-200 text-lg font-medium tracking-wide">Focus • Learn • Achieve</p>
      </div>

      <div className="w-full px-12 pb-16 z-10 max-w-lg mx-auto">
        <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-[#F52B91] rounded-full w-2/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
