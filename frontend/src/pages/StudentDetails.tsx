import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { studyCategories } from '../data/studyData';
import { API_BASE_URL } from '../config/api';
import { GraduationCap, User, Mail, Phone, CheckCircle2, ArrowRight, BookOpenCheck } from 'lucide-react';

const educationTypes = [
  { id: 'school', label: 'CBSE School', description: 'Class 9th, 10th, 11th, 12th' },
  { id: 'engineering', label: 'Diploma Engineering', description: 'All branches with year-wise path' },
  { id: 'medical', label: 'Pharmacy', description: 'B.Pharm, Pharm D, D.Pharm' },
  { id: 'other', label: 'Other', description: 'Competitive / Career / Skill-based' },
] as const;

const schoolBoards = ['CBSE', 'ICSE', 'State Board', 'IB', 'Others'];
const states = ['Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Telangana', 'Kerala', 'Uttar Pradesh', 'West Bengal', 'Gujarat', 'Other'];
const classOptions = ['Class 9', 'Class 10', 'Class 11', 'Class 12'];
const schoolStreams = ['PCM', 'PCB', 'PCMB'];
const diplomaBranches = ['CSE', 'ECE', 'ME', 'EEE', 'Civil', 'Mechanical', 'AI & DS'];
const pharmacyCourses = ['B.Pharm', 'Pharm D', 'D.Pharm'];
const pharmacyYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const resolveCategory = (educationType: string) => {
  if (educationType === 'school') return 'cbse';
  if (educationType === 'engineering') return 'diploma';
  if (educationType === 'medical') return 'pharmacy';
  return 'cbse';
};

const defaultStreamForCategory = (categoryId: string) => {
  const category = studyCategories.find((item) => item.id === categoryId) || studyCategories[0];
  return category.streams[0]?.id || '';
};

export const StudentDetails: React.FC = () => {
  const navigate = useNavigate();
  const { user, setAuth } = useAuthStore();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.studentProfile?.phone || '');
  const [educationType, setEducationType] = useState<'school' | 'engineering' | 'diploma' | 'medical' | 'commerce' | 'other'>(user?.studentProfile?.educationType || 'school');
  const [selectedCategory, setSelectedCategory] = useState(user?.studentProfile?.category || 'cbse');
  const [selectedStream, setSelectedStream] = useState(user?.studentProfile?.stream || defaultStreamForCategory('cbse'));
  const [selectedYearGrade, setSelectedYearGrade] = useState(user?.studentProfile?.yearGrade || 'Class 9');
  const [board, setBoard] = useState(user?.studentProfile?.board || 'CBSE');
  const [state, setState] = useState(user?.studentProfile?.state || 'Karnataka');
  const [classLevel, setClassLevel] = useState(user?.studentProfile?.classLevel || 'Class 9');
  const [streamTag, setStreamTag] = useState(user?.studentProfile?.streamTag || 'PCM');
  const [branch, setBranch] = useState(user?.studentProfile?.branch || 'CSE');
  const [scheme, setScheme] = useState(user?.studentProfile?.scheme || 'AICTE 2024');
  const [course, setCourse] = useState(user?.studentProfile?.course || 'B.Pharm');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const currentCategoryObj = studyCategories.find((item) => item.id === selectedCategory) || studyCategories[0];
  const availableStreams = currentCategoryObj.streams;

  const studentSummary = useMemo(() => {
    if (selectedCategory === 'cbse') {
      return `${classLevel} • ${board} • ${streamTag}`;
    }
    if (selectedCategory === 'diploma') {
      return `${branch} • ${scheme} • ${selectedYearGrade}`;
    }
    if (selectedCategory === 'pharmacy') {
      return `${course} • ${selectedYearGrade}`;
    }
    return selectedYearGrade;
  }, [board, branch, classLevel, course, scheme, selectedCategory, selectedYearGrade, streamTag]);

  const handleEducationTypeChange = (nextType: typeof educationType) => {
    setEducationType(nextType);
    const nextCategory = resolveCategory(nextType);
    setSelectedCategory(nextCategory);
    setSelectedStream(defaultStreamForCategory(nextCategory));

    if (nextType === 'school') {
      setClassLevel('Class 9');
      setBoard('CBSE');
      setStreamTag('PCM');
      setSelectedYearGrade('Class 9');
    }

    if (nextType === 'engineering') {
      setBranch('CSE');
      setScheme('AICTE 2024');
      setCourse('Diploma');
      setSelectedYearGrade('1st Year');
    }

    if (nextType === 'medical') {
      setCourse('B.Pharm');
      setSelectedYearGrade('1st Year');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      setError('Please fill in your name, email, and contact number.');
      setStep(1);
      return;
    }

    const streamObj = availableStreams.find((item) => item.id === selectedStream) || availableStreams[0];
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
    } catch (submissionError: any) {
      setError(submissionError.message || 'Unable to save your student profile.');
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
          <p className="text-gray-500 font-medium text-sm mt-1">Tell us your board and track so your dashboard stays focused</p>
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
                      onClick={() => handleEducationTypeChange(option.id)}
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
                      const nextCategoryObj = studyCategories.find((category) => category.id === nextCategory);
                      setSelectedStream(nextCategoryObj?.streams[0]?.id || '');
                    }}
                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer"
                  >
                    {studyCategories.map((category) => (
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
                    {availableStreams.map((stream) => (
                      <option key={stream.id} value={stream.id}>{stream.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedCategory === 'cbse' && (
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

              {selectedCategory === 'diploma' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Branch</label>
                    <select value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {diplomaBranches.map((item) => <option key={item} value={item}>{item}</option>)}
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

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Scheme</label>
                    <select value={scheme} onChange={(e) => setScheme(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      <option value="AICTE 2024">AICTE 2024</option>
                      <option value="State Scheme">State Scheme</option>
                      <option value="Autonomous">Autonomous</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedCategory === 'pharmacy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Course</label>
                    <select value={course} onChange={(e) => setCourse(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {pharmacyCourses.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Year</label>
                    <select value={selectedYearGrade} onChange={(e) => setSelectedYearGrade(e.target.value)} className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer">
                      {pharmacyYears.map((item) => <option key={item} value={item}>{item}</option>)}
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