import React from 'react';
import { Search, Code2, BookOpen, Layers, Award, Terminal } from 'lucide-react';

interface NavbarProps {
  activeTab: 'curriculum' | 'module' | 'capstones' | 'sandbox' | 'cheatsheets' | 'codex';
  onSelectTab: (tab: 'curriculum' | 'module' | 'capstones' | 'sandbox' | 'cheatsheets' | 'codex') => void;
  onOpenSearch: () => void;
  selectedModuleNumber?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSearch,
  selectedModuleNumber
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark in display face */}
        <button
          onClick={() => onSelectTab('curriculum')}
          className="flex items-center gap-2.5 text-left text-white transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Terminal className="h-4 w-4" />
          </div>
          <div>
            <span className="font-display text-lg font-semibold tracking-tight text-white block leading-tight">
              Full-Stack Web Dev
            </span>
            <span className="text-[11px] text-slate-400 font-sans tracking-wide block leading-none">
              12-Week Master Curriculum
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('curriculum')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeTab === 'curriculum' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Curriculum</span>
          </button>

          <button
            onClick={() => onSelectTab('module')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeTab === 'module' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Modules {selectedModuleNumber ? `(M0${selectedModuleNumber})` : ''}</span>
          </button>

          <button
            onClick={() => onSelectTab('capstones')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeTab === 'capstones' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>Capstones</span>
          </button>

          <button
            onClick={() => onSelectTab('sandbox')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeTab === 'sandbox' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Code Sandbox</span>
          </button>

          <button
            onClick={() => onSelectTab('cheatsheets')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeTab === 'cheatsheets' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="h-4 w-4" />
            <span>Cheatsheets</span>
          </button>

          <button
            onClick={() => onSelectTab('codex')}
            className={`transition-colors flex items-center gap-1.5 ${
              activeTab === 'codex' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="h-4 w-4 text-emerald-400" />
            <span>Elements Codex</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-slate-700 hover:text-white"
            title="Search curriculum"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search curriculum...</span>
            <kbd className="hidden sm:inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
              /
            </kbd>
          </button>

          <button
            onClick={() => onSelectTab('sandbox')}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Live Playground</span>
          </button>
        </div>
      </div>
    </header>
  );
};
