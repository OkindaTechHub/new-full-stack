import React, { useState } from 'react';
import { ModuleQuizQuestion } from '../types/course';
import { HelpCircle, Check, RotateCcw, Award } from 'lucide-react';

interface ModuleQuizViewProps {
  quiz: ModuleQuizQuestion[];
  moduleTitle: string;
  moduleNumber: number;
}

export const ModuleQuizView: React.FC<ModuleQuizViewProps> = ({
  quiz,
  moduleTitle,
  moduleNumber
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const handleSelect = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setRevealed(prev => ({ ...prev, [questionId]: true }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = quiz.filter(
    q => selectedAnswers[q.id] === q.correctAnswerIndex
  ).length;

  const handleReset = () => {
    setSelectedAnswers({});
    setRevealed({});
  };

  const percentage = quiz.length > 0 ? Math.round((correctCount / quiz.length) * 100) : 0;

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <span>Module 0{moduleNumber} Assessment</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{quiz.length} Questions</span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            {moduleTitle} Comprehensive Quiz
          </h1>
        </div>

        {/* Live Score Tally */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-right shrink-0">
          <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
            Score Progress
          </p>
          <p className="text-2xl font-bold text-white font-mono mt-1 tabular-nums">
            {correctCount} / {quiz.length}
            <span className="text-xs text-indigo-400 ml-2 font-sans font-normal">
              ({percentage}%)
            </span>
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            {answeredCount} of {quiz.length} answered
          </p>
        </div>
      </header>

      {/* Completion Banner if all answered */}
      {answeredCount === quiz.length && (
        <div className="rounded-xl border border-indigo-900/60 bg-indigo-950/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Module Assessment Completed!
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                You achieved a final score of <strong className="text-emerald-400">{percentage}%</strong> ({correctCount} of {quiz.length} correct).
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:border-slate-600 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Retake Quiz</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.map((q, idx) => {
          const isAnswered = revealed[q.id];
          const chosenOption = selectedAnswers[q.id];
          const isCorrect = chosenOption === q.correctAnswerIndex;

          return (
            <div
              key={q.id}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base font-semibold text-white leading-snug">
                  <span className="font-mono text-indigo-400 mr-2">{idx + 1}.</span>
                  {q.question}
                </h3>
                {isAnswered && (
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded shrink-0 ${
                      isCorrect
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                )}
              </div>

              {q.codeSnippet && (
                <div className="rounded-lg bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
                  <pre><code>{q.codeSnippet}</code></pre>
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {q.options.map((opt, oIdx) => {
                  let buttonStyle = "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300";
                  if (isAnswered) {
                    if (oIdx === q.correctAnswerIndex) {
                      buttonStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold ring-1 ring-emerald-500/40";
                    } else if (chosenOption === oIdx && !isCorrect) {
                      buttonStyle = "border-rose-500 bg-rose-950/40 text-rose-300";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full text-left rounded-lg border p-3.5 text-xs transition-all ${buttonStyle}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="leading-relaxed">{opt}</span>
                        {isAnswered && oIdx === q.correctAnswerIndex && (
                          <Check className="h-4 w-4 text-emerald-400 shrink-0 ml-2" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Dropdown */}
              {isAnswered && (
                <div
                  className={`rounded-lg p-3.5 text-xs leading-relaxed border ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <p className="font-semibold mb-1">
                    {isCorrect ? '✓ Verified Answer' : 'Explanation:'}
                  </p>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
