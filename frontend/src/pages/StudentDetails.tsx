import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { studyCategories } from '../data/studyData';
import { API_BASE_URL } from '../config/api';
import { GraduationCap, User, Mail, Phone, CheckCircle2, ArrowRight, BookOpenCheck } from 'lucide-react';

interface CategoryOption {
  id: string;
  name: string;
  description?: string;
  streams: Array<{
    id: string;
    name: string;
    subjects?: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

const educationTypes = [
  { id: 'school', label: 'School Student', description: 'Class 9-12, CBSE/ICSE/State Board' },
  { id: 'engineering', label: 'Engineering', description: 'B.Tech / B.E. / Diploma' },
  { id: 'medical', label: 'Medical', description: 'MBBS / BDS / NEET / Healthcare' },
  { id: 'diploma', label: 'Diploma', description: 'Polytechnic / Technical Courses' },
  { id: 'commerce', label: 'Commerce', description: 'B.Com / BBA / CA / Business' },
  { id: 'other', label: 'Other', description: 'Competitive / Career / Skill-based' },
];

const schoolBoards = ['CBSE', 'ICSE', 'State Board', 'IB', 'Others'];
const states = ['Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Telangana', 'Kerala', 'Uttar Pradesh', 'West Bengal', 'Gujarat', 'Other'];
const classOptions = ['Class 9', 'Class 10', 'Class 11', 'Class 12'];
const schoolStreams = ['PCM', 'PCB', 'PCMB', 'Commerce', 'Arts'];
const engineeringBranches = ['CSE', 'ECE', 'ME', 'EEE', 'Civil', 'Mechanical', 'AI & DS'];
const schemes = ['AICTE 2024', 'State Scheme', 'VTU', 'Anna University', 'Autonomous'];

export const StudentDetails: React.FC = () => {
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();

  const [catalogCategories, setCatalogCategories] = useState<CategoryOption[]>([]);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.studentProfile?.phone || '');
  const [educationType, setEducationType] = useState<'school' | 'engineering' | 'diploma' | 'medical' | 'commerce' | 'other'>(user?.studentProfile?.educationType || 'engineering');
  const [selectedCategory, setSelectedCategory] = useState(user?.studentProfile?.category || 'engineering');
  const [selectedStream, setSelectedStream] = useState(user?.studentProfile?.stream || 'cse');
  const [selectedYearGrade, setSelectedYearGrade] = useState(user?.studentProfile?.yearGrade || '3rd Year (Degree / B.Tech)');
  const [board, setBoard] = useState(user?.studentProfile?.board || 'CBSE');
  const [state, setState] = useState(user?.studentProfile?.state || 'Karnataka');
  const [classLevel, setClassLevel] = useState(user?.studentProfile?.classLevel || 'Class 12');
  const [streamTag, setStreamTag] = useState(user?.studentProfile?.streamTag || 'PCM');
  const [branch, setBranch] = useState(user?.studentProfile?.branch || 'CSE');
  const [scheme, setScheme] = useState(user?.studentProfile?.scheme || 'AICTE 2024');
  const [course, setCourse] = useState(user?.studentProfile?.course || 'B.Tech');

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const mergedCategories = useMemo<CategoryOption[]>(() => {
    const builtInCategories: CategoryOption[] = studyCategories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.desc,
      streams: category.streams.map((stream) => ({
        id: stream.id,
        name: stream.name,
        subjects: stream.subjects.map((subject) => ({
          id: subject.id,
          name: subject.name,
        })),
      })),
    }));

    const extraCategories = catalogCategories.filter(
      (category) => !builtInCategories.some((existing) => existing.id === category.id)
    );

    return [...builtInCategories, ...extraCategories];
  }, [catalogCategories]);

  const currentCategoryObj = mergedCategories.find(c => c.id === selectedCategory) || mergedCategories[0];
  const availableStreams = currentCategoryObj.streams;

  const studentSummary = useMemo(() => {
    if (educationType === 'school') {
      return `${classLevel} • ${board} • ${streamTag}`;
    }
    if (educationType === 'engineering' || educationType === 'diploma') {
      return `${branch} • ${scheme} • ${selectedYearGrade}`;
    }
    if (educationType === 'medical') {
      return `${streamTag} • ${course} • ${selectedYearGrade}`;
    }
    return `${selectedYearGrade}`;
  }, [educationType, classLevel, board, streamTag, branch, scheme, selectedYearGrade, course]);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/catalog/categories`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load course catalog');

        const backendCategories: CategoryOption[] = Array.isArray(data)
          ? data.map((category: any) => ({
              id: category.id,
              name: category.name,
              description: category.description || '',
              streams: Array.isArray(category.streams)
                ? category.streams.map((stream: any) => ({
                    id: stream.id,
                    name: stream.name,
                    subjects: Array.isArray(stream.subjects)
                      ? stream.subjects.map((subject: any) => ({
                          id: subject.id,
                          name: subject.name,
                        }))
                      : [],
                  }))
                : [],
            }))
          : [];

        setCatalogCategories(backendCategories);
      } catch {
        setCatalogCategories([]);
      }
    };

    loadCatalog();
  }, []);

  useEffect(() => {
    if (!mergedCategories.some((category) => category.id === selectedCategory)) {
      const firstCategory = mergedCategories[0];
      if (firstCategory) {
        setSelectedCategory(firstCategory.id);
        setSelectedStream(firstCategory.streams[0]?.id || '');
      }
    }
  }, [mergedCategories, selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('Please fill in your name, email, and contact number.');
      setStep(1);
      return;
    }

    const streamObj = availableStreams.find(s => s.id === selectedStream) || availableStreams[0];

    const studentProfile = {
      category: selectedCategory,
      categoryName: currentCategoryObj.name,
      stream: selectedStream,
      streamName: streamObj ? streamObj.name : 'General Stream',
      yearGrade: selectedYearGrade,
      phone,
      educationType,
      classLevel,
      board,
      state,
      streamTag,
      branch,
      scheme,
      course,
    };

    try {
      const token = localStorage.getItem('token');

      if (user && token) {
        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email, studentProfile }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not save academic profile');

        setAuth(data.user, token);
      } else {
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          role: 'student',
          studentProfile,
        };
        setAuth(newUser, 'mock-token-xyz');
      }

      navigate('/app');
    } catch (error: any) {
      setError(error.message || 'Unable to save your student profile.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 lg:p-8">
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 lg:p-10 w-full max-w-3xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#6C3BC7]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#6C3BC7]/10 text-[#6C3BC7] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <GraduationCap size={36} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-[#1E1B4B]">Academic Profile Setup</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Tell us about your learning path so your dashboard stays personalized
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <button type="button" onClick={() => setStep(1)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${step === 1 ? 'bg-[#6C3BC7] text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>
            1. Contact
          </button>
          <div className="w-6 h-0.5 bg-gray-200" />
          <button type="button" onClick={() => setStep(2)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${step === 2 ? 'bg-[#6C3BC7] text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>
            2. Education
          </button>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7]" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Contact / WhatsApp Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7]" />
                </div>
              </div>

              <button type="button" onClick={() => { if (!name || !email || !phone) { setError('Please fill in your contact information first.'); } else { setError(''); setStep(2); } }} className="w-full py-4 rounded-2xl bg-[#6C3BC7] text-white font-bold text-base shadow-lg shadow-[#6C3BC7]/30 hover:bg-[#582cb5] transition-all flex items-center justify-center gap-2 mt-6">
                Continue to Academic Details <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Choose Your Education Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {educationTypes.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        const nextEducationType = option.id as typeof educationType;
                        setEducationType(nextEducationType);

                        const mappedCategory = nextEducationType === 'school' ? 'school' : nextEducationType === 'medical' ? 'medical' : nextEducationType === 'commerce' ? 'commerce' : 'engineering';
                        setSelectedCategory(mappedCategory);

                        const defaultStreamMap: Record<string, string> = {
                          school: 'class12-jee',
                          engineering: 'cse',
                          medical: 'mbbs-phase1',
                          commerce: 'finance-bba',
                        };
                        setSelectedStream(defaultStreamMap[nextEducationType] || mergedCategories.find((category) => category.id === 'engineering')?.streams[0]?.id || 'cse');
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${educationType === option.id ? 'border-[#6C3BC7] bg-indigo-50/60 shadow-sm' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{option.label}</p>
                          <p className="text-[11px] text-gray-500 mt-1">{option.description}</p>
                        </div>
                        {educationType === option.id && <CheckCircle2 size={18} className="text-[#6C3BC7] shrink-0" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Category / Course Area</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      const nextCategory = e.target.value;
                      setSelectedCategory(nextCategory);
                      const nextCategoryObj = mergedCategories.find((category) => category.id === nextCategory);
                      if (nextCategoryObj && nextCategoryObj.streams.length > 0) {
                        setSelectedStream(nextCategoryObj.streams[0].id);
                      } else {
                        setSelectedStream('');
                        setEducationType('other');
                      }
                    }}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer"
                  >
                    {mergedCategories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Focus Stream</label>
                  <select
                    value={selectedStream}
                    onChange={(e) => setSelectedStream(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer"
                  >
                    {availableStreams.length === 0 ? (
                      <option value="">No streams available</option>
                    ) : (
                      availableStreams.map((stream) => (
                        <option key={stream.id} value={stream.id}>{stream.name}</option>
                      ))
                    )}
                  </select>
                </div>
              </div>

              {educationType === 'school' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Class</label>
                    <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {classOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Board</label>
                    <select value={board} onChange={(e) => setBoard(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {schoolBoards.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">State</label>
                    <select value={state} onChange={(e) => setState(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {states.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Stream</label>
                    <select value={streamTag} onChange={(e) => setStreamTag(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {schoolStreams.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {(educationType === 'engineering' || educationType === 'diploma') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Branch</label>
                    <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {engineeringBranches.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Course</label>
                    <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.E.">B.E.</option>
                      <option value="Diploma">Diploma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Scheme</label>
                    <select value={scheme} onChange={(e) => setScheme(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {schemes.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Year</label>
                    <select value={selectedYearGrade} onChange={(e) => setSelectedYearGrade(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                </div>
              )}

              {educationType === 'medical' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Course</label>
                    <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      <option value="MBBS">MBBS</option>
                      <option value="BDS">BDS</option>
                      <option value="BAMS">BAMS</option>
                      <option value="Nursing">Nursing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Stream</label>
                    <select value={streamTag} onChange={(e) => setStreamTag(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      <option value="NEET">NEET</option>
                      <option value="PCB">PCB</option>
                      <option value="Health Sciences">Health Sciences</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Academic Year</label>
                    <select value={selectedYearGrade} onChange={(e) => setSelectedYearGrade(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Final Year">Final Year</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
                <div className="flex items-center gap-2 text-[#6C3BC7] font-bold text-xs uppercase tracking-wider mb-2">
                  <BookOpenCheck size={16} /> Personalized Summary
                </div>
                <p className="text-sm font-medium text-gray-700">{studentSummary}</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-all">
                  Back
                </button>
                <button type="submit" className="flex-1 py-4 rounded-2xl bg-[#F52B91] text-white font-bold text-base shadow-lg shadow-[#F52B91]/30 hover:bg-[#d8217d] transition-all flex items-center justify-center gap-2">
                  Complete Setup & Open Dashboard
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
