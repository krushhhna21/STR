import { create } from 'zustand';

export interface StudentProfile {
  category: string;     // e.g. 'engineering'
  categoryName: string; // e.g. 'Engineering & Technology'
  stream: string;       // e.g. 'cse'
  streamName: string;   // e.g. 'Computer Science & Engineering (CSE)'
  yearGrade: string;    // e.g. '3rd Year' or 'Class 12th'
  phone: string;
  educationType?: 'school' | 'engineering' | 'diploma' | 'medical' | 'commerce' | 'other';
  classLevel?: string;
  board?: string;
  state?: string;
  streamTag?: string;
  branch?: string;
  scheme?: string;
  course?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  studentProfile?: StudentProfile;
}

const normalizeRole = (role?: string) => (role ? role.toString().trim().toLowerCase() : 'student');

const normalizeUser = (user: User): User => ({
  ...user,
  role: normalizeRole(user.role),
});

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  updateStudentProfile: (profile: StudentProfile) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: (() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      return storedUser ? normalizeUser(storedUser) : null;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  })(),
  token: localStorage.getItem('token') || null,
  setAuth: (user, token) => {
    const normalizedUser = normalizeUser(user);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    localStorage.setItem('token', token);
    set({ user: normalizedUser, token });
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
