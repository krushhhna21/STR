import React, { type ElementType } from 'react';
import { cn } from '../../utils/cn';

interface CourseCardProps {
  title: string;
  progress: number;
  icon: ElementType;
  colorClass: string;
  bgClass: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ title, progress, icon: Icon, colorClass, bgClass }) => {
  return (
    <div className="flex-shrink-0 w-48 bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-4', bgClass, colorClass)}>
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <h3 className="font-bold text-gray-900 mb-4">{title}</h3>
      
      <div>
        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
          <span>Progress</span>
          <span className={colorClass}>{progress}%</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-1000", bgClass.replace('100', '500'), colorClass.replace('text-', 'bg-'))}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
