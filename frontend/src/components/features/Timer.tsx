import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Brain, Coffee } from 'lucide-react';
import { useTimerStore } from '../../store/timerStore';
import { cn } from '../../utils/cn';

export const Timer: React.FC = () => {
  const { isActive, timeLeft, mode, initialTime, startTimer, pauseTimer, resetTimer, tick, setMode } = useTimerStore();

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        tick();
      }, 1000);
    }
    return () => window.clearInterval(interval);
  }, [isActive, timeLeft, tick]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((initialTime - timeLeft) / initialTime) * 100;
  
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className={cn(
        "absolute top-[-50px] right-[-50px] w-40 h-40 rounded-full blur-[60px] opacity-20 transition-colors duration-1000",
        mode === 'focus' ? "bg-rose-500" : "bg-teal-500"
      )} />
      
      <div className="flex gap-2 mb-8 bg-gray-50 p-1 rounded-xl w-full z-10">
        <button
          onClick={() => setMode('focus')}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
            mode === 'focus' ? "bg-white text-rose-500 shadow-sm" : "text-gray-400 hover:text-gray-600"
          )}
        >
          <Brain size={16} /> Focus
        </button>
        <button
          onClick={() => setMode('break')}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
            mode === 'break' ? "bg-white text-teal-500 shadow-sm" : "text-gray-400 hover:text-gray-600"
          )}
        >
          <Coffee size={16} /> Break
        </button>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center mb-8 z-10">
        {/* SVG Circle Progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-md">
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-100"
          />
          <motion.circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={cn("transition-colors duration-500", mode === 'focus' ? "text-rose-500" : "text-teal-500")}
            style={{
              strokeDasharray: circumference,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </svg>

        <div className="text-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={timeLeft}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-6xl font-black text-gray-800 tracking-tighter tabular-nums"
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
          <p className="text-sm font-medium text-gray-400 mt-2">
            {mode === 'focus' ? 'Stay focused!' : 'Take a breather'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 z-10">
        <button
          onClick={resetTimer}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          <RotateCcw size={20} />
        </button>
        <button
          onClick={isActive ? pauseTimer : startTimer}
          className={cn(
            "w-20 h-20 flex items-center justify-center rounded-full text-white shadow-xl hover:scale-105 transition-all active:scale-95",
            mode === 'focus' 
              ? "bg-rose-500 shadow-rose-500/30 hover:bg-rose-600" 
              : "bg-teal-500 shadow-teal-500/30 hover:bg-teal-600"
          )}
        >
          {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
        </button>
      </div>
    </div>
  );
};
