import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, ExternalLink, Code2 } from 'lucide-react';

const PRESETS = [
  {
    id: 'html-semantic',
    title: 'HTML5 Semantic Web',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Foundation</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; }
    header { border-bottom: 1px solid #334155; padding-bottom: 1rem; margin-bottom: 1.5rem; }
    nav ul { display: flex; gap: 1rem; list-style: none; padding: 0; }
    nav a { color: #38bdf8; text-decoration: none; }
    .card { background: #1e293b; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #334155; }
  </style>
</head>
<body>
  <header>
    <h1>Sarah Lin, Full-Stack Engineer</h1>
    <nav aria-label="Main Navigation">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article class="card">
      <h2>Distributed API Architecture</h2>
      <p>Building resilient, horizontally scalable microservices with Node.js and PostgreSQL.</p>
    </article>
  </main>
</body>
</html>`
  },
  {
    id: 'tailwind-card',
    title: 'Tailwind CSS Metric Card',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="bg-slate-950 p-8 text-slate-100 antialiased font-sans">
  <div class="max-w-md mx-auto rounded-xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg">
    <div class="flex items-center justify-between text-xs text-slate-400">
      <span class="font-semibold uppercase tracking-wider">Total Active API Nodes</span>
      <span class="rounded bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400">+14.2%</span>
    </div>
    <div class="mt-4">
      <p class="text-3xl font-bold tracking-tight text-white font-mono">1,842</p>
      <p class="mt-1 text-xs text-slate-400">Average response time: 24ms across 8 regions</p>
    </div>
    <div class="mt-6 pt-4 border-t border-slate-800 flex justify-end">
      <button onclick="alert('Scaling node cluster initiated!')" class="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
        Deploy Cluster
      </button>
    </div>
  </div>
</body>
</html>`
  },
  {
    id: 'js-array-pipeline',
    title: 'JavaScript Array Transformation',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: monospace; background: #020617; color: #38bdf8; padding: 2rem; }
    .output { background: #0f172a; padding: 1.5rem; border-radius: 0.5rem; border: 1px solid #1e293b; color: #f8fafc; }
  </style>
</head>
<body>
  <h2>Array Pipeline: Filter, Map & Reduce</h2>
  <div id="output" class="output">Processing...</div>

  <script>
    const transactions = [
      { id: 1, type: 'income', amount: 5400, desc: 'Enterprise SaaS License' },
      { id: 2, type: 'expense', amount: 450, desc: 'Cloud Infrastructure' },
      { id: 3, type: 'expense', amount: 120, desc: 'Domain Names & SSL' },
      { id: 4, type: 'income', amount: 1200, desc: 'Consulting Retainer' }
    ];

    // Pipeline: Calculate Net Balance
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const net = income - expense;

    document.getElementById('output').innerHTML = \`
      <p><strong>Total Inbound Revenue:</strong> $\${income.toLocaleString()}</p>
      <p><strong>Total Operational Spend:</strong> $\${expense.toLocaleString()}</p>
      <p style="color: #4ade80; font-size: 1.25rem;"><strong>Net Operating Margin:</strong> $\${net.toLocaleString()}</p>
    \`;
  </script>
</body>
</html>`
  }
];

interface InteractiveCodeSandboxProps {
  initialCode?: string;
}

export const InteractiveCodeSandbox: React.FC<InteractiveCodeSandboxProps> = ({
  initialCode
}) => {
  const [code, setCode] = useState(initialCode || PRESETS[0].code);
  const [copied, setCopied] = useState(false);
  const [srcDoc, setSrcDoc] = useState(code);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      setSrcDoc(initialCode);
    }
  }, [initialCode]);

  const handleRun = () => {
    setSrcDoc(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPreset = (presetCode: string) => {
    setCode(presetCode);
    setSrcDoc(presetCode);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
            <Code2 className="h-4 w-4" />
            <span>Interactive Live Environment</span>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white">
            Course Web Sandbox
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Write or paste HTML, CSS, Tailwind, or JavaScript code and run it directly in a live sandboxed frame.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 mr-1">Load Preset:</span>
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p.code)}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-700 hover:text-white transition-colors"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Preview Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[550px]">
        {/* Left Column: Code Editor */}
        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
          {/* Editor Action Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 bg-slate-900/80">
            <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-indigo-400" />
              <span>Source Document (HTML/CSS/JS)</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 transition-colors"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleRun}
                className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-colors active:scale-[0.98]"
              >
                <Play className="h-3 w-3" />
                <span>Run Code</span>
              </button>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full p-4 font-mono text-xs text-slate-100 bg-slate-950 focus:outline-none resize-none leading-relaxed selection:bg-indigo-500"
            spellCheck={false}
            placeholder="Type or paste HTML/CSS/JavaScript..."
          />
        </div>

        {/* Right Column: Live Sandboxed Iframe Preview */}
        <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5 bg-slate-900/80">
            <span className="text-xs font-mono text-slate-300 font-semibold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Render Output</span>
            </span>
            <button
              onClick={() => setSrcDoc(code)}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
              title="Refresh frame"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reload Frame</span>
            </button>
          </div>

          <div className="flex-1 w-full bg-white overflow-hidden relative">
            <iframe
              srcDoc={srcDoc}
              title="Sandbox Output"
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-0 absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
