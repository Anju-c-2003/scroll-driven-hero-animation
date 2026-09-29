'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  trend?: string;
  badgeText?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  description,
  icon: Icon,
  trend,
  badgeText,
  className = '',
}) => {
  return (
    <article
      className={`glass-panel glass-panel-hover rounded-2xl p-5 md:p-6 flex flex-col justify-between border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 relative overflow-hidden group shadow-xl ${className}`}
    >
      {/* Background Accent Glow */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/25 transition-all duration-500 pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/50 group-hover:text-cyan-300 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        {badgeText && (
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full">
            {badgeText}
          </span>
        )}
      </div>

      {/* Value & Label */}
      <div className="space-y-1">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-[var(--font-display)] tracking-tight text-white group-hover:text-cyan-300 transition-colors">
            {value}
          </span>
          {trend && (
            <span className="text-xs font-mono font-medium text-emerald-400">
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-slate-200 tracking-wide">
          {label}
        </h3>
      </div>

      {/* Short Description */}
      <p className="mt-3 text-xs text-slate-400 leading-relaxed font-normal">
        {description}
      </p>

      {/* Bottom Subtle Progress Accent Line */}
      <div className="mt-4 w-full h-1 bg-slate-800/60 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-4/5 group-hover:w-full transition-all duration-700 ease-out" />
      </div>
    </article>
  );
};
