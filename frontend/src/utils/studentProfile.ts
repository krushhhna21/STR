import { studyCategories } from '../data/studyData';
import type { StudentProfile } from '../store/auth';

export type StudentEducationType = 'school' | 'engineering' | 'diploma' | 'medical' | 'commerce' | 'other';

export const defaultStudentProfile: StudentProfile = {
  category: 'engineering',
  categoryName: 'Engineering & Technology',
  stream: 'cse',
  streamName: 'Computer Science & Engineering (CSE)',
  yearGrade: '3rd Year (Degree / B.Tech)',
  phone: '+91 98765 43210',
  educationType: 'engineering',
  classLevel: '12th',
  board: 'CBSE',
  state: 'Karnataka',
  streamTag: 'PCM',
  branch: 'CSE',
  scheme: 'AICTE 2024',
  course: 'B.Tech',
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

export const getAcademicContext = (profile?: Partial<StudentProfile>) => {
  const normalized = normalizeStudentProfile(profile);

  if (normalized.educationType === 'school') {
    const schoolStream = normalized.streamTag === 'PCB' || normalized.streamTag === 'PCMB' || normalized.streamTag === 'Biology'
      ? 'class12-neet'
      : 'class12-jee';

    const category = studyCategories.find((item) => item.id === 'school') || studyCategories[0];
    const stream = category.streams.find((item) => item.id === schoolStream) || category.streams[0];

    return {
      category: 'school',
      categoryName: category.name,
      stream: stream.id,
      streamName: stream.name,
      defaultPath: `/app/study/${category.id}/${stream.id}`,
    };
  }

  if (normalized.educationType === 'medical') {
    const category = studyCategories.find((item) => item.id === 'medical') || studyCategories[0];
    const stream = category.streams.find((item) => item.id === 'mbbs-phase1') || category.streams[0];

    return {
      category: 'medical',
      categoryName: category.name,
      stream: stream.id,
      streamName: stream.name,
      defaultPath: `/app/study/${category.id}/${stream.id}`,
    };
  }

  if (normalized.educationType === 'diploma') {
    const category = studyCategories.find((item) => item.id === 'engineering') || studyCategories[0];
    const stream = category.streams.find((item) => item.id === 'me') || category.streams[0];

    return {
      category: 'engineering',
      categoryName: category.name,
      stream: stream.id,
      streamName: stream.name,
      defaultPath: `/app/study/engineering/${stream.id}`,
    };
  }

  if (normalized.educationType === 'commerce') {
    const category = studyCategories.find((item) => item.id === 'commerce') || studyCategories[0];
    const stream = category.streams.find((item) => item.id === 'finance-bba') || category.streams[0];

    return {
      category: 'commerce',
      categoryName: category.name,
      stream: stream.id,
      streamName: stream.name,
      defaultPath: `/app/study/${category.id}/${stream.id}`,
    };
  }

  const branchId =
    normalized.branch === 'ECE' ? 'ece' :
    normalized.branch === 'ME' ? 'me' :
    normalized.branch === 'CSE' ? 'cse' :
    'cse';

  const category = studyCategories.find((item) => item.id === 'engineering') || studyCategories[0];
  const stream = category.streams.find((item) => item.id === branchId) || category.streams[0];

  return {
    category: 'engineering',
    categoryName: category.name,
    stream: stream.id,
    streamName: stream.name,
    defaultPath: `/app/study/${category.id}/${stream.id}`,
  };
};

export const getStudentRecommendations = (profile?: Partial<StudentProfile>) => {
  const ctx = getAcademicContext(profile);
  const defaultCourses = [
    { title: 'Core Curriculum', progress: 68, path: ctx.defaultPath, icon: 'BookOpen', colorClass: 'text-[#4F46E5]', bgClass: 'bg-indigo-50' },
    { title: 'Progress Tracker', progress: 72, path: '/app/progress', icon: 'BarChart2', colorClass: 'text-[#F52B91]', bgClass: 'bg-pink-50' },
    { title: 'Study Flow', progress: 54, path: '/app/study', icon: 'BookOpen', colorClass: 'text-[#14B8A6]', bgClass: 'bg-teal-50' },
  ];

  if (ctx.category === 'school') {
    return [
      { title: 'Board + Stream Prep', progress: 82, path: `/app/study/school/${ctx.stream}`, icon: 'BookOpen', colorClass: 'text-[#4F46E5]', bgClass: 'bg-indigo-50' },
      { title: 'Concept Practice', progress: 70, path: `/app/study/school/${ctx.stream}/phy12`, icon: 'FlaskConical', colorClass: 'text-[#F52B91]', bgClass: 'bg-pink-50' },
      { title: 'Weekly Revision', progress: 64, path: '/app/progress', icon: 'BarChart2', colorClass: 'text-[#14B8A6]', bgClass: 'bg-teal-50' },
    ];
  }

  if (ctx.category === 'medical') {
    return [
      { title: 'Anatomy & Physiology', progress: 74, path: `/app/study/medical/${ctx.stream}/anatomy`, icon: 'Stethoscope', colorClass: 'text-[#F52B91]', bgClass: 'bg-rose-50' },
      { title: 'Biology Revision', progress: 81, path: `/app/study/medical/${ctx.stream}/pharmacology`, icon: 'BookOpen', colorClass: 'text-[#4F46E5]', bgClass: 'bg-indigo-50' },
      { title: 'Exam Readiness', progress: 69, path: '/app/progress', icon: 'BarChart2', colorClass: 'text-[#14B8A6]', bgClass: 'bg-teal-50' },
    ];
  }

  return defaultCourses;
};
