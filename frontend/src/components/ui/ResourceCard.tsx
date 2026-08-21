import React, { type ElementType } from 'react';
import { Play, FileText, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ResourceCardProps {
  title: string;
  topic: string;
  type: 'video' | 'document';
  color: string;
  icon: ElementType;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ title, topic, type, color, icon: Icon }) => {
  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden flex flex-col h-full">
      <div className={cn(
        "absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full opacity-10 transition-transform group-hover:scale-150",
        color
      )} />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm", color)}>
          <Icon size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 line-clamp-1">{title}</h4>
          <p className="text-xs font-medium text-gray-500">{topic}</p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
          {type === 'video' ? <Play size={14} className="fill-gray-400" /> : <FileText size={14} />}
          <span className="capitalize">{type}</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};
