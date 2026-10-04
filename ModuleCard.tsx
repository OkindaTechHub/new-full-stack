import React from 'react';
import { Module } from '../types/course';
import { Clock, BookOpen, Hammer, ArrowRight, Check } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  onSelect: (moduleNumber: number) => void;
  isActive?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  onSelect,
  isActive
}) => {
  const formattedNum = module.moduleNumber < 10 ? `0${module.moduleNumber}` : module.moduleNumber;

  return (
    <article
      className={`group flex flex-col justify-between rounded-xl border p-6 transition-all duration-150 ${
        isActive
          ? 'border-indigo-500 bg-slate-900/90 shadow-md ring-1 ring-indigo-500/50'
          : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900/80'
      }`}
    >
      <div>
        {/* Top unboxed metadata line */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-indigo-400">
              Module {formattedNum}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{module.durationWeeks}</span>
          </div>
          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
            {module.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
          {module.title}
        </h3>

        {/* Overview summary */}
        <p className="mt-2.5 text-xs text-slate-400 line-clamp-3 leading-relaxed">
          {module.overview.whatItTeaches}
        </p>

        {/* Key skills preview */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Core Competencies
          </p>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {module.overview.skillsAcquired.slice(0, 3).map((skill, idx) => (
              <li key={idx} className="flex items-start gap-2 truncate">
                <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="truncate">{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Hammer className="h-3.5 w-3.5 text-amber-400" />
          <span className="truncate max-w-[150px] sm:max-w-[180px] font-medium text-slate-300">
            {module.moduleProject.title}
          </span>
        </div>

        <button
          onClick={() => onSelect(module.moduleNumber)}
          className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-600 active:scale-[0.98]"
        >
          <span>Explore</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
};
