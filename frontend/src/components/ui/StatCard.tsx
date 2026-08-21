import React, { type ElementType } from 'react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  label: string;
  value: string;
  subtitle?: string;
  icon: ElementType;
  colorClass: string;
  bgClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, colorClass, bgClass }) => {
  return (
    <div className="bg-white p-4 rounded-[16px] border border-gray-50 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-[12px] font-semibold text-gray-500 mb-0.5">{label}</p>
          <h3 className="text-[24px] font-extrabold text-[#1E1B4B] tracking-tight leading-none">{value}</h3>
        </div>
        <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center shrink-0", bgClass, colorClass)}>
          <Icon size={16} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};
