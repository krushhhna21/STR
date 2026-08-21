import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TaskItemProps {
  title: string;
  time: string;
  initialCompleted?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({ title, time, initialCompleted = false }) => {
  const [completed, setCompleted] = useState(initialCompleted);

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer",
        completed 
          ? "bg-gray-50/50 border-gray-100 opacity-60" 
          : "bg-white border-gray-100 hover:border-indigo-100 hover:shadow-sm"
      )}
      onClick={() => setCompleted(!completed)}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors",
          completed 
            ? "bg-indigo-500 border-indigo-500 text-white" 
            : "border-gray-200 text-transparent"
        )}>
          <Check size={14} strokeWidth={3} />
        </div>
        <span className={cn(
          "font-semibold transition-all",
          completed ? "text-gray-400 line-through" : "text-gray-700"
        )}>
          {title}
        </span>
      </div>
      <span className={cn(
        "text-xs font-medium px-2.5 py-1 rounded-lg",
        completed ? "bg-gray-100 text-gray-400" : "bg-indigo-50 text-indigo-600"
      )}>
        {time}
      </span>
    </div>
  );
};
