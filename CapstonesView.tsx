import React, { useState } from 'react';
import { midCourseProject, finalCourseCapstone } from '../data/modules/capstone_projects';
import { Award, Layers, CheckCircle2, Terminal, Hammer, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const CapstonesView: React.FC = () => {
  const [selectedCapstone, setSelectedCapstone] = useState<'mid' | 'final'>('final');

  const current = selectedCapstone === 'mid' ? midCourseProject : finalCourseCapstone;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <Award className="h-4 w-4" />
            <span>Course-Wide Milestone Projects</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Major Capstone Projects
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl font-sans">
            Two monumental portfolio milestones that anchor your full-stack engineering credentials: the Mid-Course Frontend Project and the Final Full-Stack Production Capstone.
          </p>
        </div>

        {/* Project Switcher Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => setSelectedCapstone('mid')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedCapstone === 'mid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mid-Course Project
          </button>
          <button
            onClick={() => setSelectedCapstone('final')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedCapstone === 'final'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Final Capstone (Production)
          </button>
        </div>
      </header>

      {/* Capstone Card Detail */}
      <div className="space-y-10">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-mono text-amber-400 font-semibold uppercase tracking-wider">{current.stage}</span>
          <span aria-hidden="true">·</span>
          <span>{current.durationWeeks}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">Est. {current.estimatedHours} Hours</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-medium">{current.difficulty}</span>
        </div>

        <h2 className="font-display text-3xl font-bold text-white tracking-tight">
          {current.title}
        </h2>
        <p className="text-base text-slate-300 leading-relaxed font-sans max-w-4xl">
          {current.overview}
        </p>

        {/* Technologies Grid */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Technology Stack Employed
          </h3>
          <div className="flex flex-wrap gap-2">
            {current.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs font-mono text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Full System Architecture Diagram */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span>Full System Architecture &amp; Data Flow</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-500">Tier 1 → Tier 2 → Tier 3</span>
          </div>
          <div className="font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed p-2">
            <pre>{current.systemArchitecture}</pre>
          </div>
        </div>

        {/* Core Requirements Groups */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-400" />
            <span>Detailed Architectural Requirements</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.coreRequirements.map((group, gIdx) => (
              <div
                key={gIdx}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-3"
              >
                <h4 className="font-semibold text-white text-sm border-b border-slate-800 pb-2">
                  {group.category}
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {group.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Development Milestones */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <Hammer className="h-5 w-5 text-amber-400" />
            <span>Phased Implementation Roadmap</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {current.milestones.map((m) => (
              <div
                key={m.step}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-400 mb-1 block">
                    Phase {m.step}
                  </span>
                  <h4 className="font-bold text-white text-sm mb-2">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {m.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-slate-400">Deliverable: </strong>
                  {m.deliverables.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Rubric */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Evaluation &amp; Grading Rubric (100 Points)</span>
          </h3>
          <div className="divide-y divide-slate-800">
            {current.evaluationRubric.map((r, idx) => (
              <div key={idx} className="py-3.5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{r.dimension}</p>
                  <p className="text-xs text-slate-400 mt-1">{r.criteria}</p>
                </div>
                <span className="font-mono text-sm font-bold text-indigo-400 shrink-0 tabular-nums">
                  {r.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
