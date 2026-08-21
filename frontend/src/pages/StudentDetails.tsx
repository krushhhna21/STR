import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { studyCategories } from '../data/studyData';
import { GraduationCap, User, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

const yearsOptions = [
  'Class 9th',
  'Class 10th',
  'Class 11th',
  'Class 12th / JEE / NEET',
  '1st Year (Diploma / Degree)',
  '2nd Year (Diploma / Degree)',
  '3rd Year (Degree / B.Tech)',
  '4th Year / Final Year (B.Tech)',
  'Postgraduate / Career Preparation'
];

export const StudentDetails: React.FC = () => {
  const navigate = useNavigate();
  const { user, setAuth, updateStudentProfile } = useAuthStore();

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.studentProfile?.phone || '');
  const [selectedCategory, setSelectedCategory] = useState(user?.studentProfile?.category || 'engineering');
  const [selectedStream, setSelectedStream] = useState(user?.studentProfile?.stream || 'cse');
  const [selectedYearGrade, setSelectedYearGrade] = useState(user?.studentProfile?.yearGrade || '3rd Year (Degree / B.Tech)');

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  const currentCategoryObj = studyCategories.find(c => c.id === selectedCategory) || studyCategories[0];
  const availableStreams = currentCategoryObj.streams;

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const catObj = studyCategories.find(c => c.id === catId);
    if (catObj && catObj.streams.length > 0) {
      setSelectedStream(catObj.streams[0].id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      phone
    };

    if (user) {
      updateStudentProfile(studentProfile);
    } else {
      // Mock user login session if registering from scratch
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'student',
        studentProfile
      };
      setAuth(newUser, 'mock-token-xyz');
    }

    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 lg:p-8">
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 lg:p-10 w-full max-w-2xl relative overflow-hidden">
        
        {/* Decorative badge */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#6C3BC7]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#6C3BC7]/10 text-[#6C3BC7] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <GraduationCap size={36} />
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-[#1E1B4B]">Student Registration & Setup</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            Customize your course, stream, and academic resources
          </p>
        </div>

        {/* Step Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button 
            type="button" 
            onClick={() => setStep(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              step === 1 ? 'bg-[#6C3BC7] text-white shadow-md' : 'bg-gray-100 text-gray-500'
            }`}
          >
            1. Contact Details
          </button>
          <div className="w-6 h-0.5 bg-gray-200" />
          <button 
            type="button" 
            onClick={() => setStep(2)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              step === 2 ? 'bg-[#6C3BC7] text-white shadow-md' : 'bg-gray-100 text-gray-500'
            }`}
          >
            2. Course & Stream
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: CONTACT DATA */}
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Contact / WhatsApp Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!name || !email || !phone) {
                    setError('Please fill in your contact information first.');
                  } else {
                    setError('');
                    setStep(2);
                  }
                }}
                className="w-full py-4 rounded-2xl bg-[#6C3BC7] text-white font-bold text-base shadow-lg shadow-[#6C3BC7]/30 hover:bg-[#582cb5] transition-all flex items-center justify-center gap-2 mt-6"
              >
                Continue to Course Selection <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: COURSE, STREAM & YEAR SELECTION */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Educational Category */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Educational Program / Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {studyCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        selectedCategory === cat.id
                          ? 'border-[#6C3BC7] bg-indigo-50/60 shadow-sm'
                          : 'border-gray-100 hover:border-gray-200 bg-white'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{cat.name}</p>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{cat.desc}</p>
                      </div>
                      {selectedCategory === cat.id && (
                        <CheckCircle2 size={18} className="text-[#6C3BC7] shrink-0 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stream / Branch */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Stream / Branch / Specialization
                </label>
                <select
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer"
                >
                  {availableStreams.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Standard Grade / Academic Year */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Standard Grade / Academic Year
                </label>
                <select
                  value={selectedYearGrade}
                  onChange={(e) => setSelectedYearGrade(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C3BC7] cursor-pointer"
                >
                  {yearsOptions.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 rounded-2xl bg-[#F52B91] text-white font-bold text-base shadow-lg shadow-[#F52B91]/30 hover:bg-[#d8217d] transition-all flex items-center justify-center gap-2"
                >
                  Complete Registration & View Course Resources 🎉
                </button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};
