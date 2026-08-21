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

export const studyCategories: Category[] = [
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    desc: 'B.Tech, B.E., and Diploma Polytechnic streams',
    iconName: 'Code',
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
    streams: [
      {
        id: 'cse',
        name: 'Computer Science & Engineering (CSE)',
        description: 'Software development, systems, algorithms, and databases',
        coursesCount: 32,
        subjects: [
          {
            id: 'dbms',
            name: 'Database Management Systems',
            code: 'CS301',
            progress: 65,
            chapters: [
              {
                id: 'dbms-ch1',
                name: 'Introduction to Database Systems & ER Modeling',
                completed: true,
                materials: [
                  { id: 'm1', type: 'video', name: 'Database Concepts & DBMS Architecture', duration: '18:45' },
                  { id: 'm2', type: 'notes', name: 'ER Diagrams & Relational Schema Guide', pages: 12 }
                ]
              },
              {
                id: 'dbms-ch2',
                name: 'SQL Queries, Joins & Subqueries',
                completed: true,
                materials: [
                  { id: 'm3', type: 'video', name: 'Mastering SQL SELECT, GROUP BY & JOINs', duration: '25:10' },
                  { id: 'm4', type: 'notes', name: 'SQL Query Cheat Sheet & Lab Exercises', pages: 8 }
                ]
              },
              {
                id: 'dbms-ch3',
                name: 'Normalization & Functional Dependencies',
                completed: false,
                materials: [
                  { id: 'm5', type: 'video', name: '1NF, 2NF, 3NF & BCNF Explained', duration: '22:30' },
                  { id: 'm6', type: 'notes', name: 'Decomposition Algorithms & Normal Forms', pages: 10 }
                ]
              },
              {
                id: 'dbms-ch4',
                name: 'Transactions, ACID Properties & Concurrency',
                completed: false,
                materials: [
                  { id: 'm7', type: 'video', name: 'ACID Properties & Two-Phase Locking Protocol', duration: '30:15' },
                  { id: 'm8', type: 'notes', name: 'Concurrency Control & Deadlock Handling', pages: 14 }
                ]
              }
            ]
          },
          {
            id: 'dsa',
            name: 'Data Structures & Algorithms',
            code: 'CS201',
            progress: 80,
            chapters: [
              {
                id: 'dsa-ch1',
                name: 'Arrays, Linked Lists & Dynamic Memory',
                completed: true,
                materials: [
                  { id: 'm9', type: 'video', name: 'Singly, Doubly & Circular Linked Lists', duration: '21:00' },
                  { id: 'm10', type: 'notes', name: 'Memory Allocation & Pointer Operations', pages: 9 }
                ]
              },
              {
                id: 'dsa-ch2',
                name: 'Stacks, Queues & Recursion',
                completed: true,
                materials: [
                  { id: 'm11', type: 'video', name: 'Infix to Postfix Conversion using Stacks', duration: '16:40' },
                  { id: 'm12', type: 'notes', name: 'Queue Implementation & Priority Queues', pages: 7 }
                ]
              },
              {
                id: 'dsa-ch3',
                name: 'Binary Trees & Binary Search Trees (BST)',
                completed: true,
                materials: [
                  { id: 'm13', type: 'video', name: 'Tree Traversals (Inorder, Preorder, Postorder)', duration: '24:50' },
                  { id: 'm14', type: 'notes', name: 'AVL Trees & Red-Black Tree Rotations', pages: 15 }
                ]
              },
              {
                id: 'dsa-ch4',
                name: 'Dynamic Programming & Graph Algorithms',
                completed: false,
                materials: [
                  { id: 'm15', type: 'video', name: 'BFS, DFS & Dijkstra Shortest Path Algorithm', duration: '35:00' },
                  { id: 'm16', type: 'notes', name: 'Top 20 DP Problems Solution Guide', pages: 18 }
                ]
              }
            ]
          },
          {
            id: 'os',
            name: 'Operating Systems',
            code: 'CS302',
            progress: 40,
            chapters: [
              {
                id: 'os-ch1',
                name: 'Process Management & CPU Scheduling',
                completed: true,
                materials: [
                  { id: 'm17', type: 'video', name: 'FCFS, SJF & Round Robin Scheduling', duration: '20:15' },
                  { id: 'm18', type: 'notes', name: 'Process Control Block & Context Switching', pages: 6 }
                ]
              },
              {
                id: 'os-ch2',
                name: 'Memory Management & Virtual Memory',
                completed: false,
                materials: [
                  { id: 'm19', type: 'video', name: 'Paging, Segmentation & Page Replacement Algorithms', duration: '28:30' },
                  { id: 'm20', type: 'notes', name: 'Virtual Memory & Thrashing Notes', pages: 11 }
                ]
              }
            ]
          },
          {
            id: 'cn',
            name: 'Computer Networks',
            code: 'CS303',
            progress: 55,
            chapters: [
              {
                id: 'cn-ch1',
                name: 'OSI & TCP/IP Layered Architecture',
                completed: true,
                materials: [
                  { id: 'm21', type: 'video', name: '7 Layers of OSI Model Explained', duration: '19:40' },
                  { id: 'm22', type: 'notes', name: 'Packet Encapulation & Protocol Suite', pages: 10 }
                ]
              },
              {
                id: 'cn-ch2',
                name: 'IP Addressing, Subnetting & Routing',
                completed: false,
                materials: [
                  { id: 'm23', type: 'video', name: 'IPv4 Subnetting & CIDR Calculations', duration: '32:00' },
                  { id: 'm24', type: 'notes', name: 'Routing Protocols (RIP, OSPF, BGP)', pages: 13 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ece',
        name: 'Electronics & Communication (ECE)',
        description: 'Microprocessors, signal processing, and communication systems',
        coursesCount: 22,
        subjects: [
          {
            id: 'digital-elec',
            name: 'Digital Circuits & Logic Design',
            code: 'EC201',
            progress: 70,
            chapters: [
              {
                id: 'dig-ch1',
                name: 'Number Systems & Boolean Algebra',
                completed: true,
                materials: [
                  { id: 'em1', type: 'video', name: 'Karnaugh Maps (K-Maps) Minimization', duration: '22:15' },
                  { id: 'em2', type: 'notes', name: 'Logic Gates & Boolean Identities', pages: 8 }
                ]
              },
              {
                id: 'dig-ch2',
                name: 'Flip-Flops, Counters & Shift Registers',
                completed: false,
                materials: [
                  { id: 'em3', type: 'video', name: 'SR, JK, D, T Flip-Flops & Asynchronous Counters', duration: '27:00' },
                  { id: 'em4', type: 'notes', name: 'Sequential Circuit Design Lab Sheet', pages: 12 }
                ]
              }
            ]
          },
          {
            id: 'signals',
            name: 'Signals & Systems',
            code: 'EC301',
            progress: 45,
            chapters: [
              {
                id: 'sig-ch1',
                name: 'Continuous & Discrete Time Signals',
                completed: true,
                materials: [
                  { id: 'em5', type: 'video', name: 'Signal Transformations & LTI System Properties', duration: '24:00' },
                  { id: 'em6', type: 'notes', name: 'Convolution Integral & Sum Guide', pages: 11 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'me',
        name: 'Mechanical Engineering (ME)',
        description: 'Thermodynamics, mechanics, machine design, and manufacturing',
        coursesCount: 18,
        subjects: [
          {
            id: 'thermo',
            name: 'Engineering Thermodynamics',
            code: 'ME201',
            progress: 60,
            chapters: [
              {
                id: 'th-ch1',
                name: 'Laws of Thermodynamics & Carnot Engine',
                completed: true,
                materials: [
                  { id: 'mm1', type: 'video', name: 'First & Second Law Applications', duration: '26:30' },
                  { id: 'mm2', type: 'notes', name: 'Entropy & Availability Lecture Notes', pages: 14 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'school',
    name: 'School (Class 9th - 12th & Competitive)',
    desc: 'CBSE, ICSE, JEE Main/Advanced, and NEET curriculum',
    iconName: 'BookOpen',
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    streams: [
      {
        id: 'class12-jee',
        name: 'Class 12 Science (PCM - JEE)',
        description: 'Physics, Chemistry, and Mathematics for Class 12 & Engineering Entrance',
        coursesCount: 28,
        subjects: [
          {
            id: 'phy12',
            name: 'Physics Class 12',
            code: 'PHY12',
            progress: 85,
            chapters: [
              {
                id: 'phy-ch1',
                name: 'Electric Charges & Fields (Electrostatics)',
                completed: true,
                materials: [
                  { id: 'pm1', type: 'video', name: 'Gauss Law & Electric Field Intensity', duration: '28:10' },
                  { id: 'pm2', type: 'notes', name: 'Coulomb Law & Capacitance Formulas', pages: 10 }
                ]
              },
              {
                id: 'phy-ch2',
                name: 'Ray & Wave Optics',
                completed: true,
                materials: [
                  { id: 'pm3', type: 'video', name: 'Young double Slit Experiment & Interference', duration: '31:45' },
                  { id: 'pm4', type: 'notes', name: 'Refraction & Lens Maker Formula Notes', pages: 12 }
                ]
              }
            ]
          },
          {
            id: 'chem12',
            name: 'Chemistry Class 12',
            code: 'CHEM12',
            progress: 75,
            chapters: [
              {
                id: 'chm-ch1',
                name: 'Organic Chemistry & Reaction Mechanisms',
                completed: true,
                materials: [
                  { id: 'cm1', type: 'video', name: 'Haloalkanes, Alcohols & Aldehydes Reactions', duration: '34:20' },
                  { id: 'cm2', type: 'notes', name: 'Name Reactions Summary Chart', pages: 15 }
                ]
              }
            ]
          },
          {
            id: 'math12',
            name: 'Mathematics Class 12',
            code: 'MATH12',
            progress: 90,
            chapters: [
              {
                id: 'mat-ch1',
                name: 'Calculus: Differentiation & Integration',
                completed: true,
                materials: [
                  { id: 'mm1', type: 'video', name: 'Definite Integrals & Area under Curves', duration: '40:00' },
                  { id: 'mm2', type: 'notes', name: 'Integration Formula Booklet', pages: 8 }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'class12-neet',
        name: 'Class 12 Biology (PCB - NEET)',
        description: 'Physics, Chemistry, and Biology tailored for NEET Medical Exam',
        coursesCount: 25,
        subjects: [
          {
            id: 'bio12',
            name: 'Biology & Genetics',
            code: 'BIO12',
            progress: 88,
            chapters: [
              {
                id: 'bio-ch1',
                name: 'Genetics & Principles of Inheritance',
                completed: true,
                materials: [
                  { id: 'bm1', type: 'video', name: 'Mendelian Genetics & DNA Replication', duration: '30:00' },
                  { id: 'bm2', type: 'notes', name: 'NEET Mindmap for Molecular Biology', pages: 16 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'medical',
    name: 'Medical & Healthcare',
    desc: 'MBBS, BDS, Nursing, and Pharmacy Curriculum',
    iconName: 'Stethoscope',
    color: 'text-rose-600',
    bg: 'bg-rose-100',
    streams: [
      {
        id: 'mbbs-phase1',
        name: 'MBBS Phase 1 (Pre-Clinical)',
        description: 'Anatomy, Physiology, and Biochemistry',
        coursesCount: 16,
        subjects: [
          {
            id: 'anatomy',
            name: 'Human Anatomy & Neuroanatomy',
            code: 'ANAT101',
            progress: 50,
            chapters: [
              {
                id: 'anat-ch1',
                name: 'Cardiovascular & Respiratory Anatomy',
                completed: true,
                materials: [
                  { id: 'am1', type: 'video', name: '3D Heart Anatomy & Coronary Circulation', duration: '29:00' },
                  { id: 'am2', type: 'notes', name: 'Histology Diagram Atlas', pages: 20 }
                ]
              }
            ]
          },
          {
            id: 'pharmacology',
            name: 'Pharmacology & Therapeutics',
            code: 'PHARM201',
            progress: 60,
            chapters: [
              {
                id: 'pharm-ch1',
                name: 'Autonomic Nervous System Drugs',
                completed: true,
                materials: [
                  { id: 'phm1', type: 'video', name: 'Adrenergic & Cholinergic Agonists', duration: '33:15' },
                  { id: 'phm2', type: 'notes', name: 'Drug Classification & Dosage Tables', pages: 14 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'commerce',
    name: 'Commerce & Management',
    desc: 'B.Com, BBA, CA, CS, and Business Administration',
    iconName: 'Briefcase',
    color: 'text-amber-600',
    bg: 'bg-amber-100',
    streams: [
      {
        id: 'finance-bba',
        name: 'Business Administration (BBA / MBA)',
        description: 'Financial Accounting, Marketing, Economics, and Management',
        coursesCount: 20,
        subjects: [
          {
            id: 'fin-acc',
            name: 'Financial Accounting & Reporting',
            code: 'BBA101',
            progress: 75,
            chapters: [
              {
                id: 'acc-ch1',
                name: 'Balance Sheet, Trial Balance & Ledger Entry',
                completed: true,
                materials: [
                  { id: 'fm1', type: 'video', name: 'Double Entry System & Financial Statements', duration: '25:00' },
                  { id: 'fm2', type: 'notes', name: 'Corporate Accounting Worksheets', pages: 12 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'skills',
    name: 'AI & Tech Career Skills',
    desc: 'Python, Full-Stack Web Development, Data Science & Cybersecurity',
    iconName: 'Sparkles',
    color: 'text-teal-600',
    bg: 'bg-teal-100',
    streams: [
      {
        id: 'web-dev',
        name: 'Full-Stack Web Development',
        description: 'React, Node.js, Express, TypeScript, and Cloud Deployment',
        coursesCount: 15,
        subjects: [
          {
            id: 'react-node',
            name: 'Modern Web Stack (React + Node + Express)',
            code: 'DEV101',
            progress: 95,
            chapters: [
              {
                id: 'web-ch1',
                name: 'React Hooks, Zustand & REST Integration',
                completed: true,
                materials: [
                  { id: 'wm1', type: 'video', name: 'Building Full Stack Web Apps from Scratch', duration: '45:00' },
                  { id: 'wm2', type: 'notes', name: 'Production Deployment & Render Blueprint Guide', pages: 10 }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
