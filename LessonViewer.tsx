import React, { useState } from 'react';
import { Lesson } from '../types/course';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  HelpCircle, 
  AlertTriangle, 
  ExternalLink, 
  Terminal, 
  BookOpen, 
  Sparkles, 
  Play, 
  Clock,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface LessonViewerProps {
  lesson: Lesson;
  moduleNumber: number;
  onOpenSandboxWithCode?: (code: string, language: string) => void;
}

export const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  moduleNumber,
  onOpenSandboxWithCode
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setRevealedAnswers(prev => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-6">
      {/* 1. Lesson Title & Metadata Header */}
      <header className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
          <span>Module 0{moduleNumber}</span>
          <span aria-hidden="true">·</span>
          <span>Lesson 0{lesson.number}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Clock className="h-3 w-3" />
            <span className="tabular-nums">{lesson.durationMinutes} min</span>
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          {lesson.title}
        </h1>
      </header>

      {/* 2. Learning Objectives */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Learning Objectives</span>
        </h2>
        <ul className="space-y-2.5">
          {lesson.learningObjectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Introduction */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Introduction &amp; Industry Context
        </h2>
        <p className="text-base text-slate-300 leading-relaxed font-sans">
          {lesson.introduction}
        </p>
      </section>

      {/* 4. Detailed Notes */}
      <section className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Comprehensive Technical Notes
        </h2>
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line font-sans bg-slate-900/20 p-6 rounded-xl border border-slate-800/80">
          {lesson.detailedNotes}
        </div>
      </section>

      {/* 5. Key Concepts, Comparisons & Architectural Diagrams */}
      {lesson.concepts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Core Architectural Concepts &amp; Diagrams
          </h2>

          {lesson.concepts.map((concept, idx) => (
            <div key={idx} className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {concept.name}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {concept.description}
              </p>

              {/* Comparison Box */}
              {concept.comparison && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                    <p className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wide">
                      {concept.comparison.itemA}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {concept.comparison.distinction.split(';')[0] || concept.comparison.distinction}
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                    <p className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wide">
                      {concept.comparison.itemB}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {concept.comparison.distinction.split(';')[1] || concept.comparison.distinction}
                    </p>
                  </div>
                </div>
              )}

              {/* Data Table */}
              {concept.table && (
                <div className="overflow-x-auto rounded-lg border border-slate-800 mt-4">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono tracking-wider">
                      <tr>
                        {concept.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="px-4 py-3 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-200">
                      {concept.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-800/40">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-4 py-3">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ASCII / Monospace Flow Diagram */}
              {concept.diagram && (
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 overflow-x-auto font-mono text-xs text-indigo-300 leading-relaxed">
                  <pre>{concept.diagram}</pre>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* 6. Code Examples */}
      <section className="space-y-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Production Code Demonstrations
        </h2>

        {lesson.codeExamples.map((example, idx) => (
          <div key={idx} className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-900/70">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-slate-300">{example.title}</span>
                <span className="text-[10px] font-mono text-indigo-400 uppercase bg-indigo-950/60 border border-indigo-800/40 px-1.5 py-0.5 rounded">
                  {example.language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onOpenSandboxWithCode && (
                  <button
                    onClick={() => onOpenSandboxWithCode(example.code, example.language)}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded bg-indigo-950/40 border border-indigo-800/30 transition-colors"
                  >
                    <Play className="h-3 w-3" />
                    <span>Run in Sandbox</span>
                  </button>
                )}
                <button
                  onClick={() => handleCopyCode(example.code, idx)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/60 transition-colors"
                >
                  {copiedIndex === idx ? (
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
              </div>
            </div>

            {/* Code block */}
            <div className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed">
              <pre><code>{example.code}</code></pre>
            </div>

            {/* Explanation footer */}
            <div className="border-t border-slate-800/80 bg-slate-900/30 p-3.5 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200 font-semibold">Line Analysis: </strong>
              {example.explanation}
            </div>
          </div>
        ))}
      </section>

      {/* 7. Real-World Industry Application */}
      <section className="rounded-xl border border-indigo-900/30 bg-indigo-950/20 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
          <Sparkles className="h-4 w-4" />
          <span>Real-World Engineering Scenario</span>
        </h2>
        <h3 className="text-base font-bold text-white mb-2">
          {lesson.realWorldExample.scenario}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-3">
          {lesson.realWorldExample.industryApplication}
        </p>
        <div className="text-xs text-indigo-300 font-medium pt-3 border-t border-indigo-900/40">
          <strong>Key Takeaway:</strong> {lesson.realWorldExample.takeaway}
        </div>
      </section>

      {/* 8. Practical Exercise */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Terminal className="h-4 w-4" />
            <span>Practical Exercise</span>
          </h2>
          <span className="text-xs text-slate-400">Hands-on Code Drill</span>
        </div>

        <h3 className="text-lg font-bold text-white">
          {lesson.practicalExercise.title}
        </h3>
        <p className="text-sm text-slate-300">
          <strong>Objective: </strong>{lesson.practicalExercise.objective}
        </p>

        {/* Steps */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold uppercase text-slate-400">Execution Steps:</p>
          <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside pl-1">
            {lesson.practicalExercise.steps.map((step, idx) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        {/* Expected Result */}
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300">
          <strong className="text-emerald-400">Expected Result: </strong>
          {lesson.practicalExercise.expectedResult}
        </div>

        {/* Challenge Extension */}
        <div className="rounded-lg border border-indigo-900/40 bg-indigo-950/20 p-3 text-xs text-slate-300">
          <strong className="text-indigo-400">Challenge Extension: </strong>
          {lesson.practicalExercise.challengeExtension}
        </div>
      </section>

      {/* 9. Common Mistakes & Antipatterns */}
      {lesson.commonMistakes.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" />
            <span>Common Beginner Mistakes &amp; Fixes</span>
          </h2>

          <div className="space-y-3">
            {lesson.commonMistakes.map((m, idx) => (
              <div key={idx} className="rounded-xl border border-rose-900/30 bg-rose-950/10 p-5 space-y-2">
                <h3 className="text-sm font-bold text-rose-300">
                  {idx + 1}. {m.mistake}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-400">Why it happens: </strong>{m.whyItHappens}
                </p>
                <p className="text-xs text-emerald-300 leading-relaxed pt-1">
                  <strong className="text-emerald-400">How to fix: </strong>{m.howToFix}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Knowledge Check (Interactive Self-Assessment) */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            <span>Lesson Knowledge Check</span>
          </h2>
          <span className="text-xs text-slate-400">Instant Verification</span>
        </div>

        <div className="space-y-6">
          {lesson.knowledgeCheck.map((q, qIdx) => {
            const isAnswered = revealedAnswers[q.id];
            const chosenIndex = selectedAnswers[q.id];
            const isCorrect = chosenIndex === q.correctAnswerIndex;

            return (
              <div key={q.id} className="space-y-3 border-b border-slate-800/80 pb-6 last:border-b-0 last:pb-0">
                <p className="text-sm font-semibold text-white">
                  {qIdx + 1}. {q.question}
                </p>

                {q.codeSnippet && (
                  <div className="rounded bg-slate-950 p-3 font-mono text-xs text-slate-300">
                    <pre><code>{q.codeSnippet}</code></pre>
                  </div>
                )}

                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    let optionStyle = "border-slate-800 bg-slate-950/80 hover:border-slate-700 text-slate-300";
                    if (isAnswered) {
                      if (oIdx === q.correctAnswerIndex) {
                        optionStyle = "border-emerald-500 bg-emerald-950/30 text-emerald-200 font-semibold";
                      } else if (chosenIndex === oIdx && !isCorrect) {
                        optionStyle = "border-rose-500 bg-rose-950/30 text-rose-300";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`w-full text-left rounded-lg border p-3 text-xs transition-colors ${optionStyle}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {isAnswered && oIdx === q.correctAnswerIndex && (
                            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className={`rounded-lg p-3 text-xs leading-relaxed ${
                    isCorrect ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-900/40' : 'bg-slate-950 text-slate-300 border border-slate-800'
                  }`}>
                    <strong>{isCorrect ? '✓ Correct! ' : 'Explanation: '}</strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Lesson Summary */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Key Takeaways &amp; Lesson Summary
        </h2>
        <ul className="space-y-2 text-xs text-slate-300">
          {lesson.summary.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <Check className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 12. Additional Official Resources */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/20 p-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
          <BookOpen className="h-4 w-4" />
          <span>Recommended Official Documentation &amp; Standards</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {lesson.additionalResources.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950 p-4 transition hover:border-indigo-500/50 hover:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                  <span>{res.name}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-400" />
                </div>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                  {res.description}
                </p>
              </div>
              <div className="mt-3 text-[11px] text-indigo-400 font-mono">
                Useful for: {res.usefulFor}
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
