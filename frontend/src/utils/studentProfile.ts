import { studyCategories } from '../data/studyData';
import type { StudentProfile } from '../store/auth';

export type StudentEducationType = 'school' | 'engineering' | 'medical' | 'other';

export const defaultStudentProfile: StudentProfile = {
  category: 'cbse',
  categoryName: 'CBSE',
  stream: 'class9',
  streamName: 'Class 9th',
  yearGrade: 'Class 9',
  phone: '+91 98765 43210',
  educationType: 'school',
  classLevel: 'Class 9',
  board: 'CBSE',
  state: 'Karnataka',
  streamTag: 'PCM',
  branch: 'CSE',
  scheme: 'AICTE 2024',
  course: 'B.Pharm',
};

export const normalizeStudentProfile = (profile?: Partial<StudentProfile>): StudentProfile => ({
  ...defaultStudentProfile,
  ...profile,
  category: profile?.category || defaultStudentProfile.category,
  categoryName: profile?.categoryName || defaultStudentProfile.categoryName,
  stream: profile?.stream || defaultStudentProfile.stream,
  streamName: profile?.streamName || defaultStudentProfile.streamName,
  yearGrade: profile?.yearGrade || defaultStudentProfile.yearGrade,
  phone: profile?.phone || defaultStudentProfile.phone,
  educationType: (profile?.educationType as StudentEducationType) || defaultStudentProfile.educationType,
  classLevel: profile?.classLevel || defaultStudentProfile.classLevel,
  board: profile?.board || defaultStudentProfile.board,
  state: profile?.state || defaultStudentProfile.state,
  streamTag: profile?.streamTag || defaultStudentProfile.streamTag,
  branch: profile?.branch || defaultStudentProfile.branch,
  scheme: profile?.scheme || defaultStudentProfile.scheme,
  course: profile?.course || defaultStudentProfile.course,
});

const resolveCbseStream = (profile: StudentProfile) => {
  const category = studyCategories.find((item) => item.id === 'cbse') || studyCategories[0];
  const streamKey =
    profile.classLevel?.includes('9') ? 'class9' :
    profile.classLevel?.includes('10') ? 'class10' :
    profile.classLevel?.includes('11') && profile.streamTag === 'PCB' ? 'class11-pcb' :
    profile.classLevel?.includes('11') && profile.streamTag === 'PCMB' ? 'class11-pcmb' :
    profile.classLevel?.includes('11') ? 'class11-pcm' :
    profile.classLevel?.includes('12') && profile.streamTag === 'PCB' ? 'class12-pcb' :
    profile.classLevel?.includes('12') && profile.streamTag === 'PCMB' ? 'class12-pcmb' :
    'class12-pcm';

  const stream = category.streams.find((item) => item.id === streamKey) || category.streams[0];

  return {
    category: category.id,
    categoryName: category.name,
    stream: stream.id,
    streamName: stream.name,
    defaultPath: `/app/study/${category.id}/${stream.id}`,
  };
};

const resolveDiplomaStream = (profile: StudentProfile) => {
  const category = studyCategories.find((item) => item.id === 'diploma') || studyCategories[0];
  const branchId =
    profile.branch === 'ECE' ? 'ece' :
    profile.branch === 'ME' ? 'me' :
    profile.branch === 'EEE' ? 'eee' :
    profile.branch === 'Civil' ? 'civil' :
    profile.branch === 'AI & DS' ? 'ai-ds' :
    'cse';

  const stream = category.streams.find((item) => item.id === branchId) || category.streams[0];

  return {
    category: category.id,
    categoryName: category.name,
    stream: stream.id,
    streamName: stream.name,
    defaultPath: `/app/study/${category.id}/${stream.id}`,
  };
};

const resolvePharmacyStream = (profile: StudentProfile) => {
  const category = studyCategories.find((item) => item.id === 'pharmacy') || studyCategories[0];
  const streamId =
    profile.course === 'Pharm D' ? 'pharmd' :
    profile.course === 'D.Pharm' ? 'dpharm' :
    'bpharm';

  const stream = category.streams.find((item) => item.id === streamId) || category.streams[0];

  return {
    category: category.id,
    categoryName: category.name,
    stream: stream.id,
    streamName: stream.name,
    defaultPath: `/app/study/${category.id}/${stream.id}`,
  };
};

export const getAcademicContext = (profile?: Partial<StudentProfile>) => {
  const normalized = normalizeStudentProfile(profile);

  if (normalized.category === 'diploma' || normalized.educationType === 'engineering') {
    return resolveDiplomaStream(normalized);
  }

  if (normalized.category === 'pharmacy' || normalized.educationType === 'medical') {
    return resolvePharmacyStream(normalized);
  }

  return resolveCbseStream(normalized);
};

export const getStudentRecommendations = (profile?: Partial<StudentProfile>) => {
  const ctx = getAcademicContext(profile);
  const defaultCourses = [
    { title: 'Core Curriculum', progress: 68, path: ctx.defaultPath, icon: 'BookOpen', colorClass: 'text-[#4F46E5]', bgClass: 'bg-indigo-50' },
    { title: 'Progress Tracker', progress: 72, path: '/app/progress', icon: 'BarChart2', colorClass: 'text-[#F52B91]', bgClass: 'bg-pink-50' },
    { title: 'Study Flow', progress: 54, path: '/app/study', icon: 'BookOpen', colorClass: 'text-[#14B8A6]', bgClass: 'bg-teal-50' },
  ];

  if (ctx.category === 'cbse') {
    return [
      { title: 'Board Prep', progress: 82, path: `/app/study/cbse/${ctx.stream}`, icon: 'BookOpen', colorClass: 'text-[#4F46E5]', bgClass: 'bg-indigo-50' },
      { title: 'Concept Practice', progress: 70, path: `/app/study/cbse/${ctx.stream}/${ctx.stream.includes('pcb') ? 'bio-12-pcb' : 'maths-9'}`, icon: 'FlaskConical', colorClass: 'text-[#F52B91]', bgClass: 'bg-pink-50' },
      { title: 'Weekly Revision', progress: 64, path: '/app/progress', icon: 'BarChart2', colorClass: 'text-[#14B8A6]', bgClass: 'bg-teal-50' },
    ];
  }

  if (ctx.category === 'pharmacy') {
    return [
      { title: 'Pharmaceutics', progress: 74, path: `/app/study/pharmacy/${ctx.stream}/pharmaceutics`, icon: 'Stethoscope', colorClass: 'text-[#F52B91]', bgClass: 'bg-rose-50' },
      { title: 'Pharmacology', progress: 81, path: `/app/study/pharmacy/${ctx.stream}/pharmacology`, icon: 'BookOpen', colorClass: 'text-[#4F46E5]', bgClass: 'bg-indigo-50' },
      { title: 'Exam Readiness', progress: 69, path: '/app/progress', icon: 'BarChart2', colorClass: 'text-[#14B8A6]', bgClass: 'bg-teal-50' },
    ];
  }

  return defaultCourses;
};