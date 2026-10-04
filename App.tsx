import React, { useState } from 'react';
import { 
  courseOverview, 
  allCourseModules 
} from './data/courseData';
import { Navbar } from './components/Navbar';
import { CourseOverviewHero } from './components/CourseOverviewHero';
import { ModuleCard } from './components/ModuleCard';
import { ModuleDetailView } from './components/ModuleDetailView';
import { InteractiveCodeSandbox } from './components/InteractiveCodeSandbox';
import { CapstonesView } from './components/CapstonesView';
import { CheatsheetsModal } from './components/CheatsheetsModal';
import { ElementsCodexView } from './components/ElementsCodexView';
import { SearchModal } from './components/SearchModal';
import { Terminal, Layers, BookOpen, Award, Code2, ArrowUpRight, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'module' | 'capstones' | 'sandbox' | 'cheatsheets' | 'codex'>('curriculum');
  const [selectedModuleNumber, setSelectedModuleNumber] = useState(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(undefined);
  const [phaseFilter, setPhaseFilter] = useState<'all' | 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4'>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sandboxCode, setSandboxCode] = useState<string | undefined>(undefined);

  const handleSelectModule = (modNum: number, lessonId?: string) => {
    setSelectedModuleNumber(modNum);
    setSelectedLessonId(lessonId);
    setActiveTab('module');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSandboxWithCode = (code: string) => {
    setSandboxCode(code);
    setActiveTab('sandbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredModules = allCourseModules.filter(m => {
    if (phaseFilter === 'all') return true;
    return m.phase.startsWith(phaseFilter);
  });

  const currentModule = allCourseModules.find(m => m.moduleNumber === selectedModuleNumber) || allCourseModules[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedModuleNumber={selectedModuleNumber}
      />

      {/* Main Body Content based on active tab */}
      <main className="flex-1">
        {/* TAB 1: CURRICULUM OVERVIEW & MODULE DIRECTORY */}
        {activeTab === 'curriculum' && (
          <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <CourseOverviewHero
              overview={courseOverview}
              onSelectModule={handleSelectModule}
              onExploreCapstones={() => {
                setActiveTab('capstones');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Modules Directory Container */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Directory Header & Interactive Phase Filter Bar */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
                    <Layers className="h-4 w-4" />
                    <span>The 12 Sequential Modules</span>
                  </div>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-white">
                    Curriculum Directory
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Structured progressively from physical network packets to cloud DevOps and digital payments.
                  </p>
                </div>

                {/* Interactive Filter Tabs (Segmented Control conforming to anti-slop rules) */}
                <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
                  {[
                    { id: 'all', label: 'All Modules (12)' },
                    { id: 'Phase 1', label: 'Phase 1: Foundations' },
                    { id: 'Phase 2', label: 'Phase 2: Frontend' },
                    { id: 'Phase 3', label: 'Phase 3: Full-Stack' },
                    { id: 'Phase 4', label: 'Phase 4: DevOps' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setPhaseFilter(filter.id as any)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                        phaseFilter === filter.id
                          ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    onSelect={handleSelectModule}
                    isActive={mod.moduleNumber === selectedModuleNumber}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: INDIVIDUAL MODULE DEEP-DIVE VIEW */}
        {activeTab === 'module' && (
          <ModuleDetailView
            module={currentModule}
            onNavigateModule={(num) => handleSelectModule(num)}
            totalModules={allCourseModules.length}
            initialLessonId={selectedLessonId}
            onOpenSandboxWithCode={handleOpenSandboxWithCode}
          />
        )}

        {/* TAB 3: CAPSTONE PROJECTS SPECIFICATIONS */}
        {activeTab === 'capstones' && (
          <CapstonesView />
        )}

        {/* TAB 4: INTERACTIVE CODE SANDBOX */}
        {activeTab === 'sandbox' && (
          <InteractiveCodeSandbox initialCode={sandboxCode} />
        )}

        {/* TAB 5: CHEATSHEETS & REFERENCE BLUEPRINTS */}
        {activeTab === 'cheatsheets' && (
          <CheatsheetsModal />
        )}

        {/* TAB 6: UNIVERSAL ELEMENTS & SYNTAX CODEX */}
        {activeTab === 'codex' && (
          <ElementsCodexView
            onOpenSandbox={handleOpenSandboxWithCode}
          />
        )}
      </main>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectModule}
      />

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-display font-bold text-white text-sm">
              Full-Stack Web Development Course
            </span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Comprehensive 12-Module University Curriculum</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
            <button onClick={() => handleSelectModule(1)} className="hover:text-white transition-colors">
              Module 01: Fundamentals
            </button>
            <button onClick={() => handleSelectModule(8)} className="hover:text-white transition-colors">
              Module 08: React
            </button>
            <button onClick={() => handleSelectModule(11)} className="hover:text-white transition-colors">
              Module 11: Databases &amp; Supabase
            </button>
            <button onClick={() => handleSelectModule(12)} className="hover:text-white transition-colors">
              Module 12: Payments &amp; DevOps
            </button>
            <button onClick={() => setActiveTab('cheatsheets')} className="hover:text-white transition-colors">
              Cheatsheets
            </button>
            <button onClick={() => setActiveTab('codex')} className="hover:text-white transition-colors text-emerald-400">
              Elements Codex
            </button>
          </div>

          <div className="text-slate-500">
            &copy; 2026 Developer Education Specialist. Open Technical Courseware.
          </div>
        </div>
      </footer>
    </div>
  );
}
