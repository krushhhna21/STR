import React, { useEffect, useMemo, useState } from 'react';
import { studyCategories } from '../../data/studyData';
import { Upload, BookOpen, Video, FileText, Trash2, FolderOpen, Sparkles } from 'lucide-react';
import { API_BASE_URL } from '../../config/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

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
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');
  const [selectedCategory, setSelectedCategory] = useState(studyCategories[0].id);
  const [selectedStream, setSelectedStream] = useState(studyCategories[0].streams[0].id);
  const [selectedYear, setSelectedYear] = useState('Class 9');
  const [selectedSubject, setSelectedSubject] = useState(studyCategories[0].streams[0].subjects[0].id);

  const [contentType, setContentType] = useState<'book' | 'video' | 'resource'>('book');
  const [title, setTitle] = useState('');
  const [linkOrFile, setLinkOrFile] = useState('');
  const [meta, setMeta] = useState('');

  const currentCategoryObj = studyCategories.find((item) => item.id === selectedCategory) || studyCategories[0];
  const availableStreams = currentCategoryObj.streams;
  const currentStreamObj = availableStreams.find((item) => item.id === selectedStream) || availableStreams[0];
  const availableSubjects = currentStreamObj ? currentStreamObj.subjects : [];

  useEffect(() => {
    const fallbackSubject = availableSubjects[0]?.id || '';
    if (fallbackSubject && !availableSubjects.some((subject) => subject.id === selectedSubject)) {
      setSelectedSubject(fallbackSubject);
    }
  }, [availableSubjects, selectedSubject]);

  useEffect(() => {
    if (!studyCategories.some((item) => item.id === selectedCategory)) {
      const firstCategory = studyCategories[0];
      setSelectedCategory(firstCategory.id);
      setSelectedStream(firstCategory.streams[0]?.id || '');
      setSelectedSubject(firstCategory.streams[0]?.subjects[0]?.id || '');
    }
  }, [selectedCategory]);

  const { data: items = [], isLoading, error } = useQuery({
    queryKey: ['adminContent'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/admin/content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load content items');
      return Array.isArray(data) ? data : [];
    },
    enabled: !!token,
  });

  const groupedItems = useMemo(() => items.filter((item: UploadedItem) => item.category === selectedCategory), [items, selectedCategory]);

  const addMutation = useMutation({
    mutationFn: async (newItem: Omit<UploadedItem, 'id'>) => {
      const res = await fetch(`${API_BASE_URL}/api/admin/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminContent'] });
      setTitle('');
      setLinkOrFile('');
      setMeta('');
      toast.success('Content uploaded and assigned to the selected course.');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Could not upload content');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/api/admin/content/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Delete failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminContent'] });
      toast.success('Content deleted');
    },
    onError: (err: any) => {
      toast.error(err.message || 'Could not delete content');
    }
  });

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !token) {
      if (!token) toast.error('Missing auth token. Please login again.');
      return;
    }
    addMutation.mutate({
      category: selectedCategory,
      stream: selectedStream,
      year: selectedYear,
      subject: selectedSubject || 'general',
      type: contentType,
      title,
      linkOrFile: linkOrFile || 'resource-link.pdf',
      meta: meta || 'Added by Admin',
    });
  };

  const handleDelete = (id: string) => {
    if (!token) {
      toast.error('Missing auth token. Please login again.');
      return;
    }
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Content Upload Center</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Upload books, videos, and notes against the fixed course taxonomy.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-[11px] font-bold text-indigo-700">
          <Sparkles size={14} /> {studyCategories.length} learning categories active
        </div>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-100 text-red-700 font-bold text-xs rounded-2xl">{(error as Error)?.message}</div>}

      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
          <FolderOpen size={20} className="text-indigo-600" /> Choose the course to upload into
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {studyCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedStream(category.streams[0]?.id || '');
                setSelectedSubject(category.streams[0]?.subjects[0]?.id || '');
              }}
              className={`rounded-2xl border p-3 text-left transition-all ${
                selectedCategory === category.id ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="text-xs font-black text-gray-900">{category.name}</div>
              <div className="mt-1 text-[10px] text-gray-500">{category.desc}</div>
            </button>
          ))}
        </div>

        <form onSubmit={handleAddContent} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Stream / Branch</label>
              <select value={selectedStream} onChange={(e) => setSelectedStream(e.target.value)} className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none">
                {availableStreams.map((stream) => (
                  <option key={stream.id} value={stream.id}>{stream.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Year / Level</label>
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none">
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Subject</label>
              <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none">
                {availableSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Resource Type</label>
              <div className="flex gap-2">
                {[
                  { id: 'book', label: 'Book', icon: BookOpen, active: 'bg-indigo-600 text-white', idle: 'bg-gray-100 text-gray-600' },
                  { id: 'video', label: 'Video', icon: Video, active: 'bg-rose-500 text-white', idle: 'bg-gray-100 text-gray-600' },
                  { id: 'resource', label: 'Notes', icon: FileText, active: 'bg-emerald-600 text-white', idle: 'bg-gray-100 text-gray-600' },
                ].map(({ id, label, icon: Icon, active, idle }) => (
                  <button key={id} type="button" onClick={() => setContentType(id as 'book' | 'video' | 'resource')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all ${contentType === id ? active : idle}`}>
                    <Icon size={14} /> {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Class 10 Maths Chapter 1" className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">File / Link</label>
              <input type="text" value={linkOrFile} onChange={(e) => setLinkOrFile(e.target.value)} placeholder="https://drive.google.com/... or pdf-name.pdf" className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Extra metadata</label>
            <input type="text" value={meta} onChange={(e) => setMeta(e.target.value)} placeholder="Author, duration, file size, lecture number, etc." className="w-full px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-900 focus:ring-2 focus:ring-indigo-600 outline-none" />
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={addMutation.isPending} className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50">
              <Upload size={16} /> {addMutation.isPending ? 'Uploading...' : 'Upload to selected course'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Uploaded content for {currentCategoryObj.name}</h2>
          <span className="text-[11px] font-bold text-gray-500">{isLoading ? 'Loading...' : `${groupedItems.length} items`}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase">
                <th className="py-3 px-2">Type</th>
                <th className="py-3 px-2">Title</th>
                <th className="py-3 px-2">Stream</th>
                <th className="py-3 px-2">Subject</th>
                <th className="py-3 px-2">Meta</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {groupedItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">{isLoading ? 'Loading...' : 'No uploaded material for this category yet.'}</td>
                </tr>
              ) : (
                groupedItems.map((item: UploadedItem) => (
                  <tr key={item.id} className="hover:bg-gray-50/60">
                    <td className="py-3 px-2 font-bold capitalize">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] ${
                        item.type === 'book' ? 'bg-indigo-100 text-indigo-700' : item.type === 'video' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>{item.type}</span>
                    </td>
                    <td className="py-3 px-2 font-bold text-gray-900">{item.title}</td>
                    <td className="py-3 px-2 text-gray-500 font-medium">{item.stream.toUpperCase()}</td>
                    <td className="py-3 px-2 text-gray-500 font-medium uppercase">{item.subject}</td>
                    <td className="py-3 px-2 text-gray-500 font-medium">{item.meta}</td>
                    <td className="py-3 px-2 text-right">
                      <button onClick={() => handleDelete(item.id)} disabled={deleteMutation.isPending} className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 disabled:opacity-50" title="Delete Resource">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};