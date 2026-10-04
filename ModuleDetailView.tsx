import React, { useState } from 'react';
import { Module } from '../types/course';
import { LessonViewer } from './LessonViewer';
import { ModuleProjectView } from './ModuleProjectView';
import { ModuleQuizView } from './ModuleQuizView';
import { 
  BookOpen, 
  Layers, 
  Hammer, 
  HelpCircle, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  GraduationCap
} from 'lucide-react';

interface ModuleDetailViewProps {
  module: Module;
  onNavigateModule: (moduleNumber: number) => void;
  totalModules: number;
  initialLessonId?: string;
  onOpenSandboxWithCode?: (code: string, language?: string) => void;
}

export const ModuleDetailView: React.FC<ModuleDetailViewProps> = ({
  module,
  onNavigateModule,
  totalModules,
  initialLessonId,
  onOpenSandboxWithCode
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'lessons' | 'labs' | 'project' | 'quiz' | 'assignment' | 'resources'>('overview');
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(() => {
    if (initialLessonId) {
      const idx = module.lessons.findIndex(l => l.id === initialLessonId);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  const formattedNum = module.moduleNumber < 10 ? `0${module.moduleNumber}` : module.moduleNumber;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Next/Prev Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Curriculum</span>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="font-mono text-indigo-400 font-semibold">Module {formattedNum}</span>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-white truncate font-medium">{module.title}</span>
        </div>

        {/* Previous / Next Module Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateModule(module.moduleNumber - 1)}
            disabled={module.moduleNumber <= 1}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:border-slate-700 hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            <span>Prev Module</span>
          </button>
          <button
            onClick={() => onNavigateModule(module.moduleNumber + 1)}
            disabled={module.moduleNumber >= totalModules}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 disabled:opacity-40 disabled:pointer-events-none hover:border-slate-700 hover:text-white"
          >
            <span>Next Module</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Module Title Banner */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-mono text-indigo-400 font-semibold">{module.phase}</span>
          <span aria-hidden="true">·</span>
          <span>{module.durationWeeks}</span>
          <span aria-hidden="true">·</span>
          <span>{module.level}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">Est. {module.overview.estimatedHours} Hours</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          Module {formattedNum}: {module.title}
        </h1>
      </div>

      {/* Main Module Tab Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-800 pb-px scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: BookOpen },
          { id: 'lessons', label: `Lessons (${module.lessons.length})`, icon: Layers },
          { id: 'labs', label: `Practical Labs (${module.practicalLabs.length})`, icon: GraduationCap },
          { id: 'project', label: 'Module Project', icon: Hammer },
          { id: 'quiz', label: `Interactive Quiz (${module.quiz.length})`, icon: HelpCircle },
          { id: 'assignment', label: 'Assignment & Rubric', icon: FileText },
          { id: 'resources', label: 'Resources', icon: ExternalLink }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-indigo-500 text-white bg-slate-900/60 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Area */}
      <div>
        {/* OVERVIEW TAB */}
        {activeSection === 'overview' && (
          <div className="space-y-8 max-w-4xl">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white tracking-tight">
                What This Module Teaches
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {module.overview.whatItTeaches}
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 space-y-4">
              <h2 className="text-lg font-bold text-white tracking-tight">
                Why It Matters in Software Engineering
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {module.overview.whyItMatters}
              </p>
            </div>

            {/* Prerequisites & Acquired Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                  Prerequisites
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {module.overview.prerequisites.map((pre, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5" />
                      <span>{pre}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3">
                  Skills &amp; Capabilities Acquired
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {module.overview.skillsAcquired.map((skill, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Module Summary */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Module Summary
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {module.summary}
              </p>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveSection('lessons')}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
              >
                <span>Proceed to Lessons</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* LESSONS TAB */}
        {activeSection === 'lessons' && (
          <div className="space-y-6">
            {/* Sub-lesson switcher if multiple lessons */}
            {module.lessons.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
                <span className="text-xs text-slate-400 font-medium mr-2">Select Lesson:</span>
                {module.lessons.map((les, idx) => (
                  <button
                    key={les.id}
                    onClick={() => setSelectedLessonIndex(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                      selectedLessonIndex === idx
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    0{les.number}. {les.title}
                  </button>
                ))}
              </div>
            )}

            {/* Render selected lesson */}
            {module.lessons[selectedLessonIndex] && (
              <LessonViewer
                lesson={module.lessons[selectedLessonIndex]}
                moduleNumber={module.moduleNumber}
                onOpenSandboxWithCode={onOpenSandboxWithCode}
              />
            )}
          </div>
        )}

        {/* PRACTICAL LABS TAB */}
        {activeSection === 'labs' && (
          <div className="space-y-8 max-w-4xl">
            {module.practicalLabs.map((lab) => (
              <div key={lab.id} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
                    <span>Guided Walkthrough Lab</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{lab.durationMinutes} Minutes</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{lab.title}</h2>
                  <p className="text-sm text-slate-300 mt-2"><strong>Objective: </strong>{lab.objective}</p>
                </div>

                {/* Step by Step Guide */}
                <div className="space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Step-by-Step Instructions
                  </h3>
                  <div className="space-y-4">
                    {lab.stepByStepGuide.map((step) => (
                      <div key={step.stepNumber} className="rounded-lg border border-slate-800 bg-slate-950 p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600/30 text-[11px] font-mono font-bold text-indigo-400">
                            {step.stepNumber}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                        </div>
                        <p className="text-xs text-slate-300 pl-7">{step.instructions}</p>
                        {step.code && (
                          <div className="mt-2 ml-7 rounded bg-slate-900 p-3 font-mono text-xs text-slate-200 overflow-x-auto">
                            <pre><code>{step.code}</code></pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Checklist */}
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                    Verification Checklist
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {lab.verificationChecklist.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECT TAB */}
        {activeSection === 'project' && (
          <ModuleProjectView
            project={module.moduleProject}
            moduleNumber={module.moduleNumber}
            onOpenSandbox={(code) => onOpenSandboxWithCode && onOpenSandboxWithCode(code, 'html')}
          />
        )}

        {/* QUIZ TAB */}
        {activeSection === 'quiz' && (
          <ModuleQuizView
            quiz={module.quiz}
            moduleTitle={module.title}
            moduleNumber={module.moduleNumber}
          />
        )}

        {/* ASSIGNMENT TAB */}
        {activeSection === 'assignment' && (
          <div className="space-y-8 max-w-4xl py-6">
            <header className="border-b border-slate-800 pb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
                <span>Independent Practical Assignment</span>
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight text-white">
                {module.assignment.title}
              </h1>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed font-sans">
                {module.assignment.problemStatement}
              </p>
            </header>

            {/* Specifications */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Technical Specifications
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {module.assignment.specifications.map((spec, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Required Deliverables
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {module.assignment.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Evaluation Rubric */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Evaluation Rubric
              </h3>
              <div className="divide-y divide-slate-800">
                {module.assignment.evaluationRubric.map((r, idx) => (
                  <div key={idx} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{r.category}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{r.description}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-indigo-400 tabular-nums">
                      {r.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESOURCES TAB */}
        {activeSection === 'resources' && (
          <div className="space-y-6 max-w-4xl py-6">
            <h2 className="font-display text-2xl font-bold text-white tracking-tight">
              Curated Official Documentation &amp; Standards
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {module.resources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5 hover:border-indigo-500/50 hover:bg-slate-900/60 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-sm font-bold text-white group-hover:text-indigo-400">
                      <span>{res.name}</span>
                      <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-indigo-400" />
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {res.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-indigo-400 font-mono">
                    Useful for: {res.usefulFor}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
