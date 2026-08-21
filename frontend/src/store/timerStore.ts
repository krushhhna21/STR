import { create } from 'zustand';

interface TimerState {
  isActive: boolean;
  timeLeft: number;
  mode: 'focus' | 'break';
  initialTime: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  setMode: (mode: 'focus' | 'break') => void;
}

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export const useTimerStore = create<TimerState>((set) => ({
  isActive: false,
  timeLeft: FOCUS_TIME,
  mode: 'focus',
  initialTime: FOCUS_TIME,
  
  startTimer: () => set({ isActive: true }),
  
  pauseTimer: () => set({ isActive: false }),
  
  resetTimer: () => set((state) => ({ 
    isActive: false, 
    timeLeft: state.mode === 'focus' ? FOCUS_TIME : BREAK_TIME,
    initialTime: state.mode === 'focus' ? FOCUS_TIME : BREAK_TIME
  })),
  
  tick: () => set((state) => {
    if (state.timeLeft <= 0) {
      const nextMode = state.mode === 'focus' ? 'break' : 'focus';
      const nextTime = nextMode === 'focus' ? FOCUS_TIME : BREAK_TIME;
      return { 
        isActive: false, 
        mode: nextMode, 
        timeLeft: nextTime,
        initialTime: nextTime 
      };
    }
    return { timeLeft: state.timeLeft - 1 };
  }),
  
  setMode: (mode) => set({
    mode,
    isActive: false,
    timeLeft: mode === 'focus' ? FOCUS_TIME : BREAK_TIME,
    initialTime: mode === 'focus' ? FOCUS_TIME : BREAK_TIME
  }),
}));
