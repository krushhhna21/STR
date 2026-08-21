import { create } from 'zustand';

export interface StudentProfile {
  category: string;     // e.g. 'engineering'
  categoryName: string; // e.g. 'Engineering & Technology'
  stream: string;       // e.g. 'cse'
  streamName: string;   // e.g. 'Computer Science & Engineering (CSE)'
  yearGrade: string;    // e.g. '3rd Year' or 'Class 12th'
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  studentProfile?: StudentProfile;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  updateStudentProfile: (profile: StudentProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },
  updateStudentProfile: (profile) => set((state) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, studentProfile: profile };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return { user: updatedUser };
  }),
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
}));
