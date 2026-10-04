import React, { useState } from 'react';
import { completeLanguageElementsCodex, LanguageElementItem } from '../data/elementsCodex';
import { 
  Code2, 
  Search, 
  Copy, 
  Check, 
  Play, 
  Layers, 
  Terminal, 
  Sparkles, 
  FileCode,
  Tag
} from 'lucide-react';

interface ElementsCodexViewProps {
  onOpenSandbox?: (code: string) => void;
}

export const ElementsCodexView: React.FC<ElementsCodexViewProps> = ({
  onOpenSandbox
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'all',
    'HTML5 Semantic',
    'HTML5 Forms & Inputs',
    'HTML5 Media & Tables',
    'HTML5 Interactive',
    'CSS Modern (has, container, layers)',
    'JavaScript Syntax & APIs',
    'TypeScript Types',
    'SQL & PostgreSQL',
    'Express & Node.js',
    'Payment Rails'
  ];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = completeLanguageElementsCodex.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = searchQuery.trim() === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.syntax.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <header className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <Code2 className="h-4 w-4" />
            <span>Universal Language &amp; API Compendium</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Universal Elements &amp; Syntax Codex
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl font-sans leading-relaxed">
            An exhaustive, searchable reference cataloging every HTML5 semantic element, all 22 form input types, modern CSS features (:has, container queries, @layer), modern JavaScript/TypeScript patterns, SQL clauses, and payment API schemas.
          </p>
        </div>

        {/* Live Item Counter */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-right shrink-0">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Total Cataloged</p>
          <p className="text-xl font-bold text-white font-mono mt-0.5 tabular-nums">
            {completeLanguageElementsCodex.length} Standard Elements &amp; APIs
          </p>
        </div>
      </header>

      {/* Filter & Search Bar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search elements by name, tag, or syntax (<dialog>, :has, CTEs, STK push)..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Category Pills / Segmented Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Languages & Elements' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-500 rounded-xl border border-slate-800 bg-slate-900/30">
            No matching language elements found for "{searchQuery}".
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4 hover:border-slate-700 transition-colors"
            >
              {/* Item Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-2 py-0.5 rounded">
                    {item.name}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {item.syntax}
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-mono">
                  {item.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Attributes / Options Chips */}
              {item.attributesOrOptions && item.attributesOrOptions.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-slate-500 font-mono mr-1">Supported Attributes / Clauses:</span>
                  {item.attributesOrOptions.map((attr, aIdx) => (
                    <span
                      key={aIdx}
                      className="text-[11px] font-mono text-slate-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded"
                    >
                      {attr}
                    </span>
                  ))}
                </div>
              )}

              {/* Code Snippet Box */}
              <div className="rounded-lg border border-slate-800 bg-slate-950 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800/80 px-3.5 py-2 bg-slate-900/80">
                  <span className="text-[11px] font-mono text-slate-400">Complete Production Example</span>
                  <div className="flex items-center gap-2">
                    {item.runnable && onOpenSandbox && (
                      <button
                        onClick={() => onOpenSandbox(item.exampleCode)}
                        className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-800/30 transition-colors"
                      >
                        <Play className="h-3 w-3" />
                        <span>Run in Sandbox</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleCopy(item.exampleCode, item.id)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800/70 transition-colors"
                    >
                      {copiedId === item.id ? (
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
                <div className="p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed max-h-80 overflow-y-auto">
                  <pre><code>{item.exampleCode}</code></pre>
                </div>
              </div>

              {/* Best Practices Note */}
              <div className="rounded-lg border border-indigo-950/60 bg-indigo-950/20 p-3 text-xs text-indigo-200 leading-relaxed">
                <strong className="text-indigo-300">Engineering Best Practice: </strong>
                {item.bestPractices}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
