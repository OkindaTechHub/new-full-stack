import React, { useState, useEffect, useRef } from 'react';
import { searchCurriculum } from '../data/courseData';
import { Search, X, BookOpen, Layers, Code, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (moduleNumber: number, lessonId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchCurriculum(query);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3.5 bg-slate-950">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search concepts, modules, REST APIs, TypeScript, M-Pesa, CSS Grid..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {query.trim().length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              <p>Type keywords to search across all 12 modules, lessons, and code examples.</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {['M-Pesa STK', 'Stripe Webhooks', 'CSS Grid', 'PostgreSQL', 'TypeScript Generics', 'useEffect'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-400 hover:text-white"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No matching curriculum topics found for "{query}".
            </div>
          ) : (
            results.map((res, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectResult(res.moduleNumber, res.lessonId);
                  onClose();
                }}
                className="w-full text-left rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 hover:border-indigo-500/50 hover:bg-slate-950 transition-colors group flex items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-400 mb-1">
                    <span>M0{res.moduleNumber}: {res.moduleTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase text-slate-500 font-sans">{res.matchType}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    {res.lessonTitle || res.moduleTitle}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {res.snippet}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 shrink-0 mt-2" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 px-4 py-2.5 bg-slate-950 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Press ESC to close</span>
          <span>{results.length} results found</span>
        </div>
      </div>
    </div>
  );
};
