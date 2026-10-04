import React from 'react';
import { CourseOverview } from '../types/course';
import { CheckCircle2, ArrowRight, Sparkles, BookOpen, Layers, Clock, Laptop } from 'lucide-react';

interface CourseOverviewHeroProps {
  overview: CourseOverview;
  onSelectModule: (moduleNumber: number) => void;
  onExploreCapstones: () => void;
}

export const CourseOverviewHero: React.FC<CourseOverviewHeroProps> = ({
  overview,
  onSelectModule,
  onExploreCapstones
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/40 to-slate-950 py-16 md:py-24">
      {/* Background subtle radial glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Course Metadata: clean unboxed text with typographic separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-4">
          <span className="text-indigo-400 font-semibold uppercase tracking-wider">University &amp; Industry Syllabus</span>
          <span aria-hidden="true">·</span>
          <span>{overview.duration}</span>
          <span aria-hidden="true">·</span>
          <span>{overview.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">12 Deep Modules</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">14 Production Projects</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Full-Stack Web Development
          </h1>
          <p className="mt-4 text-lg text-slate-300 font-sans leading-relaxed">
            {overview.description}
          </p>
        </div>

        {/* Quick CTA Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onSelectModule(1)}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            <span>Start Module 01: Fundamentals</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={onExploreCapstones}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:text-white"
          >
            <span>View Capstone Projects</span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </button>
        </div>

        {/* 4 Curriculum Phases */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overview.curriculumPhases.map((phase, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-slate-700"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono text-indigo-400 font-medium">0{idx + 1}</span>
                <span className="tabular-nums">{phase.weeks}</span>
              </div>
              <h3 className="font-semibold text-white text-base leading-snug">
                {phase.phase}
              </h3>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                {phase.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                {phase.modules.map(modNum => (
                  <button
                    key={modNum}
                    onClick={() => onSelectModule(modNum)}
                    className="text-[11px] font-mono rounded bg-slate-800/90 px-2 py-0.5 text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    M{modNum < 10 ? `0${modNum}` : modNum}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack Grid */}
        <div className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Complete Technology Stack Taught
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero legacy cruft. Curated to reflect modern commercial engineering standards.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
              <Laptop className="h-4 w-4 text-indigo-400" />
              <span>Full-Stack Modern Toolchain</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overview.stack.map((group, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                  {group.category}
                </h3>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  {group.technologies.map((tech, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">
            Graduate Engineering Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {overview.learningOutcomes.map((outcome, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 rounded-lg border border-slate-800/60 bg-slate-900/40 p-3.5 text-xs text-slate-300"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
