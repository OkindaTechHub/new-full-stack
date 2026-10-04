import React, { useState } from 'react';
import { ModuleProject } from '../types/course';
import { Hammer, CheckCircle, Copy, Check, FileCode, Layers, ListChecks, Award } from 'lucide-react';

interface ModuleProjectViewProps {
  project: ModuleProject;
  moduleNumber: number;
  onOpenSandbox?: (starterCode: string) => void;
}

export const ModuleProjectView: React.FC<ModuleProjectViewProps> = ({
  project,
  moduleNumber,
  onOpenSandbox
}) => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleCopy = (content: string, path: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(path);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto py-6">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
          <span>Module 0{moduleNumber} Practical Project</span>
          <span aria-hidden="true">·</span>
          <span>{project.difficulty} Level</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">Est. {project.estimatedHours} Hours</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-sm text-slate-300 leading-relaxed font-sans">
          {project.overview}
        </p>
      </header>

      {/* Architecture Diagram if available */}
      {project.architectureDiagram && (
        <section className="rounded-xl border border-slate-800 bg-slate-950 p-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            System Architecture
          </h2>
          <div className="font-mono text-xs text-indigo-300 overflow-x-auto leading-relaxed">
            <pre>{project.architectureDiagram}</pre>
          </div>
        </section>
      )}

      {/* Project Requirements */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
          <ListChecks className="h-4 w-4" />
          <span>Core Engineering Requirements</span>
        </h2>
        <ul className="space-y-2.5">
          {project.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Development Milestones */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers className="h-4 w-4" />
          <span>Sequential Development Milestones</span>
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {project.milestones.map((m) => (
            <div key={m.milestone} className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400 text-xs font-mono font-bold border border-indigo-500/30">
                  {m.milestone}
                </span>
                <h3 className="font-bold text-white text-base">
                  {m.title}
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5 pl-9 text-xs text-slate-300">
                {m.tasks.map((task, tIdx) => (
                  <li key={tIdx} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-slate-500" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Starter Code Blueprint */}
      {project.starterCodeStructure.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <FileCode className="h-4 w-4" />
            <span>Starter Code Blueprint</span>
          </h2>

          {project.starterCodeStructure.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 bg-slate-900/80">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-indigo-400 font-semibold">{item.path}</span>
                  <span className="text-xs text-slate-500 font-sans">· {item.description}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.sampleContent && onOpenSandbox && (
                    <button
                      onClick={() => onOpenSandbox(item.sampleContent!)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-800/30"
                    >
                      Run in Sandbox
                    </button>
                  )}
                  {item.sampleContent && (
                    <button
                      onClick={() => handleCopy(item.sampleContent!, item.path)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800/60"
                    >
                      {copiedFile === item.path ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {item.sampleContent && (
                <div className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed max-h-72 overflow-y-auto">
                  <pre><code>{item.sampleContent}</code></pre>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Acceptance Criteria */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Acceptance Criteria Checklist</span>
        </h2>
        <ul className="space-y-2 text-xs text-slate-300">
          {project.acceptanceCriteria.map((crit, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="h-4 w-4 rounded border border-slate-700 bg-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3 w-3 text-emerald-400" />
              </span>
              <span>{crit}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Grading Rubric */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
          <Award className="h-4 w-4" />
          <span>Evaluation Rubric (100 Points Total)</span>
        </h2>
        <div className="divide-y divide-slate-800">
          {project.rubric.map((r, idx) => (
            <div key={idx} className="py-3.5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">{r.criteria}</p>
                <p className="text-xs text-slate-400 mt-1">{r.description}</p>
              </div>
              <span className="font-mono text-sm font-bold text-indigo-400 shrink-0 tabular-nums">
                {r.points} pts
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
