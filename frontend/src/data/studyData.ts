export interface Material {
  id: string;
  type: 'video' | 'notes';
  name: string;
  duration?: string;
  pages?: number;
  url?: string;
}

export interface Chapter {
  id: string;
  name: string;
  completed: boolean;
  materials: Material[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  progress: number;
  chapters: Chapter[];
}

export interface Stream {
  id: string;
  name: string;
  description: string;
  coursesCount: number;
  subjects: Subject[];
}

export interface Category {
  id: string;
  name: string;
  desc: string;
  iconName: string;
  color: string;
  bg: string;
  streams: Stream[];
}

const makeChapter = (id: string, name: string, completed: boolean, materials: Material[]): Chapter => ({
  id,
  name,
  completed,
  materials,
});

const makeSubject = (id: string, name: string, code: string, progress: number, chapters: Chapter[]): Subject => ({
  id,
  name,
  code,
  progress,
  chapters,
});

const makeStream = (id: string, name: string, description: string, subjects: Subject[]): Stream => ({
  id,
  name,
  description,
  coursesCount: subjects.length,
  subjects,
});

const cbseSubjects9 = [
  makeSubject('maths-9', 'Mathematics', 'CBSE-9-MATH', 72, [
    makeChapter('cbse9-m1', 'Number Systems and Polynomials', true, [
      { id: 'cbse9-m1a', type: 'video', name: 'Number System Basics', duration: '18:20' },
      { id: 'cbse9-m1b', type: 'notes', name: 'Polynomials Practice Sheet', pages: 10 },
    ]),
  ]),
  makeSubject('science-9', 'Science', 'CBSE-9-SCI', 70, [
    makeChapter('cbse9-s1', 'Matter in Our Surroundings', true, [
      { id: 'cbse9-s1a', type: 'video', name: 'States of Matter', duration: '17:40' },
      { id: 'cbse9-s1b', type: 'notes', name: 'Chapter Notes', pages: 8 },
    ]),
  ]),
  makeSubject('english-9', 'English', 'CBSE-9-ENG', 80, [
    makeChapter('cbse9-e1', 'Grammar and Reading Skills', true, [
      { id: 'cbse9-e1a', type: 'notes', name: 'Grammar Rules Guide', pages: 12 },
      { id: 'cbse9-e1b', type: 'video', name: 'Comprehension Strategy', duration: '14:00' },
    ]),
  ]),
];

const cbseSubjects10 = [
  makeSubject('maths-10', 'Mathematics', 'CBSE-10-MATH', 74, [
    makeChapter('cbse10-m1', 'Real Numbers and Quadratic Equations', true, [
      { id: 'cbse10-m1a', type: 'video', name: 'Quadratic Equation Solving', duration: '19:10' },
      { id: 'cbse10-m1b', type: 'notes', name: 'Real Numbers Revision Notes', pages: 9 },
    ]),
  ]),
  makeSubject('science-10', 'Science', 'CBSE-10-SCI', 75, [
    makeChapter('cbse10-s1', 'Chemical Reactions and Equations', true, [
      { id: 'cbse10-s1a', type: 'video', name: 'Balancing Chemical Equations', duration: '21:00' },
      { id: 'cbse10-s1b', type: 'notes', name: 'Reaction Types Summary', pages: 11 },
    ]),
  ]),
  makeSubject('social-10', 'Social Science', 'CBSE-10-SOC', 68, [
    makeChapter('cbse10-so1', 'History and Civics Overview', true, [
      { id: 'cbse10-so1a', type: 'notes', name: 'Important Dates and Events', pages: 15 },
      { id: 'cbse10-so1b', type: 'video', name: 'Civics Overview', duration: '16:30' },
    ]),
  ]),
];

const cbseSubjects11Pcm = [
  makeSubject('phy-11-pcm', 'Physics', 'CBSE-11-PHY', 76, [
    makeChapter('cbse11-p1', 'Motion in a Straight Line', true, [
      { id: 'cbse11-p1a', type: 'video', name: 'Kinematics Foundations', duration: '23:00' },
      { id: 'cbse11-p1b', type: 'notes', name: 'Motion Formula Sheet', pages: 10 },
    ]),
  ]),
  makeSubject('chem-11-pcm', 'Chemistry', 'CBSE-11-CHEM', 71, [
    makeChapter('cbse11-c1', 'Structure of Atom', true, [
      { id: 'cbse11-c1a', type: 'video', name: 'Atomic Models', duration: '18:50' },
      { id: 'cbse11-c1b', type: 'notes', name: 'Quantum Numbers Notes', pages: 9 },
    ]),
  ]),
  makeSubject('math-11-pcm', 'Mathematics', 'CBSE-11-MATH', 74, [
    makeChapter('cbse11-m1', 'Sets, Relations and Functions', true, [
      { id: 'cbse11-m1a', type: 'video', name: 'Domain and Range', duration: '20:20' },
      { id: 'cbse11-m1b', type: 'notes', name: 'Function Practice Set', pages: 12 },
    ]),
  ]),
];

const cbseSubjects11Pcb = [
  makeSubject('phy-11-pcb', 'Physics', 'CBSE-11-PHY', 75, [
    makeChapter('cbse11b-p1', 'Physical World and Measurement', true, [
      { id: 'cbse11b-p1a', type: 'video', name: 'Units and Measurements', duration: '17:20' },
      { id: 'cbse11b-p1b', type: 'notes', name: 'Physics Lab Notes', pages: 8 },
    ]),
  ]),
  makeSubject('bio-11-pcb', 'Biology', 'CBSE-11-BIO', 78, [
    makeChapter('cbse11-b1', 'Living World and Classification', true, [
      { id: 'cbse11-b1a', type: 'video', name: 'Biological Classification', duration: '20:30' },
      { id: 'cbse11-b1b', type: 'notes', name: 'Taxonomy Notes', pages: 11 },
    ]),
  ]),
  makeSubject('chem-11-pcb', 'Chemistry', 'CBSE-11-CHEM', 70, [
    makeChapter('cbse11-c2', 'Some Basic Concepts of Chemistry', true, [
      { id: 'cbse11-c2a', type: 'video', name: 'Mole Concept', duration: '21:10' },
      { id: 'cbse11-c2b', type: 'notes', name: 'Stoichiometry Worksheet', pages: 9 },
    ]),
  ]),
];

const cbseSubjects11Pcmb = [...cbseSubjects11Pcm, ...cbseSubjects11Pcb];

const cbseSubjects12Pcm = [
  makeSubject('phy-12-pcm', 'Physics', 'CBSE-12-PHY', 79, [
    makeChapter('cbse12-p1', 'Electrostatics', true, [
      { id: 'cbse12-p1a', type: 'video', name: 'Electric Charges and Fields', duration: '24:10' },
      { id: 'cbse12-p1b', type: 'notes', name: 'Electrostatics Formula Sheet', pages: 10 },
    ]),
  ]),
  makeSubject('chem-12-pcm', 'Chemistry', 'CBSE-12-CHEM', 73, [
    makeChapter('cbse12-c1', 'Solutions and Electrochemistry', true, [
      { id: 'cbse12-c1a', type: 'video', name: 'Electrochemistry Basics', duration: '22:00' },
      { id: 'cbse12-c1b', type: 'notes', name: 'Chemical Kinetics Notes', pages: 12 },
    ]),
  ]),
  makeSubject('math-12-pcm', 'Mathematics', 'CBSE-12-MATH', 82, [
    makeChapter('cbse12-m1', 'Calculus and Applications of Derivatives', true, [
      { id: 'cbse12-m1a', type: 'video', name: 'Integrals and Applications', duration: '27:30' },
      { id: 'cbse12-m1b', type: 'notes', name: 'Calculus Practice Pack', pages: 14 },
    ]),
  ]),
];

const cbseSubjects12Pcb = [
  makeSubject('phy-12-pcb', 'Physics', 'CBSE-12-PHY', 80, [
    makeChapter('cbse12b-p1', 'Ray Optics and Wave Optics', true, [
      { id: 'cbse12b-p1a', type: 'video', name: 'Optics Overview', duration: '23:30' },
      { id: 'cbse12b-p1b', type: 'notes', name: 'Optics Notes', pages: 10 },
    ]),
  ]),
  makeSubject('bio-12-pcb', 'Biology', 'CBSE-12-BIO', 83, [
    makeChapter('cbse12b-b1', 'Genetics and Evolution', true, [
      { id: 'cbse12b-b1a', type: 'video', name: 'Mendelian Inheritance', duration: '25:10' },
      { id: 'cbse12b-b1b', type: 'notes', name: 'Genetics Revision Notes', pages: 13 },
    ]),
  ]),
  makeSubject('chem-12-pcb', 'Chemistry', 'CBSE-12-CHEM', 74, [
    makeChapter('cbse12b-c1', 'Organic Chemistry Basics', true, [
      { id: 'cbse12b-c1a', type: 'video', name: 'Aldehydes and Ketones', duration: '24:40' },
      { id: 'cbse12b-c1b', type: 'notes', name: 'Organic Chemistry Summary', pages: 12 },
    ]),
  ]),
];

const cbseSubjects12Pcmb = [...cbseSubjects12Pcm, ...cbseSubjects12Pcb];

const diplomaYearSubjects = (yearLabel: string, branchLabel: string): Subject[] => [
  makeSubject(`${branchLabel.toLowerCase()}-${yearLabel.toLowerCase().replace(/\s+/g, '-')}-eng`, 'Engineering Mathematics', 'DIP-MATH', 70, [
    makeChapter(`${branchLabel}-math-ch1`, 'Applied Mathematics', true, [
      { id: `${branchLabel}-math-m1`, type: 'video', name: 'Matrices and Calculus', duration: '21:00' },
      { id: `${branchLabel}-math-m2`, type: 'notes', name: 'Math Practice Notes', pages: 10 },
    ]),
  ]),
  makeSubject(`${branchLabel.toLowerCase()}-${yearLabel.toLowerCase().replace(/\s+/g, '-')}-core`, 'Core Engineering', 'DIP-CORE', 73, [
    makeChapter(`${branchLabel}-core-ch1`, 'Workshop Practice and Engineering Drawing', true, [
      { id: `${branchLabel}-core-m1`, type: 'video', name: 'Technical Drawing Fundamentals', duration: '19:40' },
      { id: `${branchLabel}-core-m2`, type: 'notes', name: 'Workshop Notes', pages: 9 },
    ]),
  ]),
];

const pharmacyYearSubjects = (yearLabel: string): Subject[] => [
  makeSubject(`pharm-${yearLabel.toLowerCase()}-pharmaceutics`, 'Pharmaceutics', 'PHARM-101', 71, [
    makeChapter(`pharm-${yearLabel}-ch1`, 'Dosage Forms and Drug Delivery', true, [
      { id: `pharm-${yearLabel}-m1`, type: 'video', name: 'Pharmacy Fundamentals', duration: '21:10' },
      { id: `pharm-${yearLabel}-m2`, type: 'notes', name: 'Dosage Form Notes', pages: 9 },
    ]),
  ]),
  makeSubject(`pharm-${yearLabel.toLowerCase()}-pharmacology`, 'Pharmacology', 'PHARM-102', 76, [
    makeChapter(`pharm-${yearLabel}-ch2`, 'Drug Actions and Therapeutics', true, [
      { id: `pharm-${yearLabel}-m3`, type: 'video', name: 'Drug Mechanism Basics', duration: '24:30' },
      { id: `pharm-${yearLabel}-m4`, type: 'notes', name: 'Therapeutics Summary', pages: 11 },
    ]),
  ]),
];

export const studyCategories: Category[] = [
  {
    id: 'cbse',
    name: 'CBSE',
    desc: 'Class 9th, 10th, 11th and 12th with PCM, PCB and PCMB subcategories',
    iconName: 'BookOpen',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    streams: [
      makeStream('class9', 'Class 9th', 'Foundation track for Class 9 CBSE students', cbseSubjects9),
      makeStream('class10', 'Class 10th', 'Foundation track for Class 10 CBSE students', cbseSubjects10),
      makeStream('class11-pcm', 'Class 11 PCM', 'Physics, Chemistry, Mathematics', cbseSubjects11Pcm),
      makeStream('class11-pcb', 'Class 11 PCB', 'Physics, Chemistry, Biology', cbseSubjects11Pcb),
      makeStream('class11-pcmb', 'Class 11 PCMB', 'PCM plus Biology combined track', cbseSubjects11Pcmb),
      makeStream('class12-pcm', 'Class 12 PCM', 'Physics, Chemistry, Mathematics', cbseSubjects12Pcm),
      makeStream('class12-pcb', 'Class 12 PCB', 'Physics, Chemistry, Biology', cbseSubjects12Pcb),
      makeStream('class12-pcmb', 'Class 12 PCMB', 'PCM plus Biology combined track', cbseSubjects12Pcmb),
    ],
  },
  {
    id: 'diploma',
    name: 'Diploma Engineering',
    desc: 'All diploma engineering branches with year-wise structure',
    iconName: 'Code',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
    streams: [
      makeStream('cse', 'Computer Science Engineering', 'CSE diploma branch with year-wise curriculum', diplomaYearSubjects('Year 1', 'CSE')),
      makeStream('ece', 'Electronics and Communication', 'ECE diploma branch with year-wise curriculum', diplomaYearSubjects('Year 1', 'ECE')),
      makeStream('me', 'Mechanical Engineering', 'Mechanical diploma branch with year-wise curriculum', diplomaYearSubjects('Year 1', 'ME')),
      makeStream('eee', 'Electrical and Electronics', 'EEE diploma branch with year-wise curriculum', diplomaYearSubjects('Year 1', 'EEE')),
      makeStream('civil', 'Civil Engineering', 'Civil diploma branch with year-wise curriculum', diplomaYearSubjects('Year 1', 'CIVIL')),
      makeStream('ai-ds', 'AI & Data Science', 'AI and DS diploma branch with year-wise curriculum', diplomaYearSubjects('Year 1', 'AIDS')),
    ],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    desc: 'B.Pharm, Pharm D and D.Pharm with year-wise subcategories',
    iconName: 'Stethoscope',
    color: 'text-rose-600',
    bg: 'bg-rose-100',
    streams: [
      makeStream('bpharm', 'B.Pharm', 'Bachelor of Pharmacy with year-wise curriculum', pharmacyYearSubjects('Year 1')),
      makeStream('pharmd', 'Pharm D', 'Doctor of Pharmacy with year-wise curriculum', pharmacyYearSubjects('Year 1')),
      makeStream('dpharm', 'D.Pharm', 'Diploma in Pharmacy with year-wise curriculum', pharmacyYearSubjects('Year 1')),
    ],
  },
];