import React, { useState } from 'react';
import { studyCategories } from '../../data/studyData';
import { Plus, Upload, BookOpen, Video, FileText, Trash2, CheckCircle2 } from 'lucide-react';

interface UploadedItem {
  id: string;
  category: string;
  stream: string;
  year: string;
  subject: string;
  type: 'book' | 'video' | 'resource';
  title: string;
  linkOrFile: string;
  meta: string;
}

export const ContentManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(studyCategories[0].id);
  const [selectedStream, setSelectedStream] = useState(studyCategories[0].streams[0].id);
  const [selectedYear, setSelectedYear] = useState('3rd Year (Degree / B.Tech)');
  const [selectedSubject, setSelectedSubject] = useState('dbms');
  
  const [contentType, setContentType] = useState<'book' | 'video' | 'resource'>('book');
  const [title, setTitle] = useState('');
  const [linkOrFile, setLinkOrFile] = useState('');
  const [meta, setMeta] = useState(''); // e.g. "Author: Silberschatz" or "25 min"

  const [items, setItems] = useState<UploadedItem[]>([
    { id: '1', category: 'engineering', stream: 'cse', year: '3rd Year', subject: 'dbms', type: 'book', title: 'Database System Concepts', linkOrFile: 'dbms-silberschatz.pdf', meta: 'Silberschatz & Korth' },
    { id: '2', category: 'engineering', stream: 'cse', year: '3rd Year', subject: 'dbms', type: 'video', title: 'Mastering SQL Queries & Joins', linkOrFile: 'https://youtube.com/watch?v=sample', meta: 'Duration: 28 min' },
    { id: '3', category: 'engineering', stream: 'cse', year: '3rd Year', subject: 'dbms', type: 'resource', title: 'Chapter 1-4 DBMS Notes PDF', linkOrFile: 'dbms-notes.pdf', meta: 'Lecture Notes • 4.2 MB' }
  ]);

  const [successMsg, setSuccessMsg] = useState('');

  const currentCategoryObj = studyCategories.find(c => c.id === selectedCategory) || studyCategories[0];
  const availableStreams = currentCategoryObj.streams;
  const currentStreamObj = availableStreams.find(s => s.id === selectedStream) || availableStreams[0];
  const availableSubjects = currentStreamObj ? currentStreamObj.subjects : [];

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newItem: UploadedItem = {
      id: `item-${Date.now()}`,
      category: selectedCategory,
      stream: selectedStream,
      year: selectedYear,
      subject: selectedSubject,
      type: contentType,
      title,
      linkOrFile: linkOrFile || 'resource-link.pdf',
      meta: meta || 'Added by Admin'
    };

    setItems([newItem, ...items]);
    setTitle('');
    setLinkOrFile('');
    setMeta('');
    setSuccessMsg('Content resource uploaded & assigned successfully to target course!');

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Admin Course Content & Upload Manager</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Manage streams, options, and upload books, videos, and study resources for specific student courses.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs rounded-2xl flex items-center gap-2">
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Upload size={20} className="text-indigo-600" /> Upload / Assign Resource to Course
        </h2>

        <form onSubmit={handleAddContent} className="space-y-6">
          
          {/* Target Course Filter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  const cat = studyCategories.find(c => c.id === e.target.value);
                  if (cat && cat.streams.length > 0) {
                    setSelectedStream(cat.streams[0].id);
                  }
                }}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none"
              >
                {studyCategories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Stream */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Stream / Branch</label>
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none"
              >
                {availableStreams.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Year / Grade */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Standard / Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none"
              >
                <option value="Class 10th">Class 10th</option>
                <option value="Class 12th">Class 12th</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year (Degree / B.Tech)">3rd Year (Degree / B.Tech)</option>
                <option value="4th Year / Final Year">4th Year / Final Year</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none"
              >
                {availableSubjects.map(subj => (
                  <option key={subj.id} value={subj.id}>{subj.name}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Resource Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Resource Type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setContentType('book')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    contentType === 'book' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <BookOpen size={16} /> Book
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('video')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    contentType === 'video' ? 'bg-rose-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Video size={16} /> Video
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('resource')}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    contentType === 'resource' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <FileText size={16} /> Notes
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Resource Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Advanced DBMS Normalization PDF"
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">File URL / Download Link</label>
              <input
                type="text"
                value={linkOrFile}
                onChange={(e) => setLinkOrFile(e.target.value)}
                placeholder="https://drive.google.com/... or file.pdf"
                className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>

          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Plus size={16} /> Save Resource to Course Database
            </button>
          </div>

        </form>
      </div>

      {/* Uploaded Materials Table */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Uploaded Course Content List</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2">Title</th>
                <th className="py-3 px-2">Stream / Year</th>
                <th className="py-3 px-2">Subject</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="py-3 px-2 font-bold capitalize">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] ${
                      item.type === 'book' ? 'bg-indigo-100 text-indigo-700' :
                      item.type === 'video' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-bold text-gray-900">{item.title}</td>
                  <td className="py-3 px-2 text-gray-500 font-medium">{item.stream.toUpperCase()} • {item.year}</td>
                  <td className="py-3 px-2 text-gray-500 font-medium uppercase">{item.subject}</td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete Resource"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
