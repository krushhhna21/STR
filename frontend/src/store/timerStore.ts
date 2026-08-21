import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface TimerState {
  isActive: boolean;
  timeLeft: number;
  mode: 'focus' | 'break';
  initialTime: number;
  totalFocusSeconds: number;
  todayFocusSeconds: number;
  completedSessions: number;
  streakDays: number;
  tasks: Task[];
  
  // Actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  resetStats: () => void;
  tick: () => void;
  setMode: (mode: 'focus' | 'break') => void;
  toggleTask: (id: string) => void;
  addTask: (title: string, time: string) => void;
}

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const initialTasks: Task[] = [
  { id: 't1', title: 'Complete Physics Chapter 4 - Optics', time: '10:00 AM', completed: true },
  { id: 't2', title: 'Math Assignment - Calculus Definite Integrals', time: '02:30 PM', completed: false },
  { id: 't3', title: 'DBMS SQL Join & Subqueries Exercises', time: '05:00 PM', completed: false },
  { id: 't4', title: 'Practice React & State Management Code', time: '08:00 PM', completed: false },
];

export const useTimerStore = create<TimerState>()(
  persist(
    (set) => ({
      isActive: false,
      timeLeft: FOCUS_TIME,
      mode: 'focus',
      initialTime: FOCUS_TIME,
      totalFocusSeconds: 76200, // Default baseline ~21.1 hours
      todayFocusSeconds: 9000,   // Default ~2.5 hours today
      completedSessions: 14,
      streakDays: 7,
      tasks: initialTasks,

      startTimer: () => set({ isActive: true }),
      
      pauseTimer: () => set({ isActive: false }),
      
      resetTimer: () => set((state) => ({ 
        isActive: false, 
        timeLeft: state.mode === 'focus' ? FOCUS_TIME : BREAK_TIME,
        initialTime: state.mode === 'focus' ? FOCUS_TIME : BREAK_TIME
      })),

      resetStats: () => set((state) => ({
        totalFocusSeconds: 0,
        todayFocusSeconds: 0,
        completedSessions: 0,
        timeLeft: state.mode === 'focus' ? FOCUS_TIME : BREAK_TIME,
        isActive: false
      })),

      tick: () => set((state) => {
        if (state.timeLeft <= 0) {
          const nextMode = state.mode === 'focus' ? 'break' : 'focus';
          const nextTime = nextMode === 'focus' ? FOCUS_TIME : BREAK_TIME;
          const isFocusCompleted = state.mode === 'focus';
          
          return { 
            isActive: false, 
            mode: nextMode, 
            timeLeft: nextTime,
            initialTime: nextTime,
            completedSessions: isFocusCompleted ? state.completedSessions + 1 : state.completedSessions
          };
        }

        const isFocusing = state.mode === 'focus' && state.isActive;
        return { 
          timeLeft: state.timeLeft - 1,
          totalFocusSeconds: isFocusing ? state.totalFocusSeconds + 1 : state.totalFocusSeconds,
          todayFocusSeconds: isFocusing ? state.todayFocusSeconds + 1 : state.todayFocusSeconds,
        };
      }),

      setMode: (mode) => set({
        mode,
        isActive: false,
        timeLeft: mode === 'focus' ? FOCUS_TIME : BREAK_TIME,
        initialTime: mode === 'focus' ? FOCUS_TIME : BREAK_TIME
      }),

      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map((task) => 
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      })),

      addTask: (title, time) => set((state) => ({
        tasks: [
          ...state.tasks,
          { id: `task-${Date.now()}`, title, time: time || '12:00 PM', completed: false }
        ]
      }))
    }),
    {
      name: 'studybuddy_timer_stats_v1',
      partialize: (state) => ({
        totalFocusSeconds: state.totalFocusSeconds,
        todayFocusSeconds: state.todayFocusSeconds,
        completedSessions: state.completedSessions,
        streakDays: state.streakDays,
        tasks: state.tasks
      })
    }
  )
);
