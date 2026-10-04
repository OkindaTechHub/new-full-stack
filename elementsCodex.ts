export interface LanguageElementItem {
  id: string;
  name: string;
  category: 'HTML5 Semantic' | 'HTML5 Forms & Inputs' | 'HTML5 Media & Tables' | 'HTML5 Interactive' | 'CSS Layout & Selectors' | 'CSS Modern (has, container, layers)' | 'JavaScript Syntax & APIs' | 'TypeScript Types' | 'SQL & PostgreSQL' | 'Express & Node.js' | 'Payment Rails';
  syntax: string;
  description: string;
  exampleCode: string;
  attributesOrOptions?: string[];
  bestPractices: string;
  runnable?: boolean;
}

export const completeLanguageElementsCodex: LanguageElementItem[] = [
  // --- HTML5 SEMANTIC ELEMENTS ---
  {
    id: 'html-header',
    name: '<header>',
    category: 'HTML5 Semantic',
    syntax: '<header>...</header>',
    description: 'Represents introductory content or a set of navigational links for its nearest ancestor section or page root.',
    exampleCode: `<header class="site-header">
  <a href="/" class="brand-logo">DevCampus</a>
  <nav aria-label="Primary">
    <ul>
      <li><a href="/courses">Curriculum</a></li>
      <li><a href="/docs">Docs</a></li>
    </ul>
  </nav>
</header>`,
    attributesOrOptions: ['id', 'class', 'role="banner" (implicit on page header)'],
    bestPractices: 'Can appear multiple times in a page (e.g. inside <article> or <section>), but only the top-level header has implicit banner landmark role.',
    runnable: true
  },
  {
    id: 'html-nav',
    name: '<nav>',
    category: 'HTML5 Semantic',
    syntax: '<nav aria-label="...">...</nav>',
    description: 'A section of a page that links to other pages or to parts within the page (navigation landmark).',
    exampleCode: `<nav aria-label="Main Navigation">
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#lessons">Lessons</a></li>
    <li><a href="#projects">Projects</a></li>
  </ul>
</nav>`,
    attributesOrOptions: ['aria-label', 'aria-labelledby'],
    bestPractices: 'Always supply an aria-label if multiple <nav> elements exist on the same page (e.g. "Primary Navigation" vs "Footer Navigation").',
    runnable: true
  },
  {
    id: 'html-main',
    name: '<main>',
    category: 'HTML5 Semantic',
    syntax: '<main id="main-content">...</main>',
    description: 'Represents the dominant, unique content of the <body>. There must not be more than one visible <main> element per document.',
    exampleCode: `<main id="main-content">
  <h1>Full-Stack Web Development Course</h1>
  <p>Learn end-to-end full-stack engineering.</p>
</main>`,
    attributesOrOptions: ['id="main-content"'],
    bestPractices: 'Provide an id so a skip-to-content link (<a href="#main-content">Skip to content</a>) can bypass repetitive navigation.',
    runnable: true
  },
  {
    id: 'html-article',
    name: '<article>',
    category: 'HTML5 Semantic',
    syntax: '<article>...</article>',
    description: 'A self-contained composition in a document intended to be independently distributable or reusable (e.g. blog post, card, forum post).',
    exampleCode: `<article class="lesson-card">
  <header>
    <h2>Understanding Asynchronous Event Loops</h2>
    <time datetime="2026-10-04">October 4, 2026</time>
  </header>
  <p>The event loop continuously dequeues microtasks and macrotasks...</p>
  <footer>
    <a href="/lessons/event-loop">Read Complete Lesson &rarr;</a>
  </footer>
</article>`,
    attributesOrOptions: ['class', 'id', 'aria-labelledby'],
    bestPractices: 'Always contain its own heading (h2-h6) to maintain document outline integrity.',
    runnable: true
  },
  {
    id: 'html-section',
    name: '<section>',
    category: 'HTML5 Semantic',
    syntax: '<section aria-labelledby="...">...</section>',
    description: 'Represents a standalone thematic grouping of content, typically with a heading.',
    exampleCode: `<section id="curriculum-phases" aria-labelledby="phases-title">
  <h2 id="phases-title">Curriculum Phases</h2>
  <p>Four distinct phases spanning web fundamentals to cloud deployment.</p>
</section>`,
    attributesOrOptions: ['aria-labelledby', 'id'],
    bestPractices: 'Do not use as a generic wrapper for styling (use <div> for styling hooks). Every <section> should have a heading.',
    runnable: true
  },
  {
    id: 'html-aside',
    name: '<aside>',
    category: 'HTML5 Semantic',
    syntax: '<aside>...</aside>',
    description: 'Represents content tangentially related to the content around it (sidebars, callout boxes, related links).',
    exampleCode: `<aside class="callout-box" aria-label="Key Takeaway">
  <h3>Pro-Tip: Microtask Priority</h3>
  <p>Promise callbacks always execute before setTimeout timers in JavaScript.</p>
</aside>`,
    attributesOrOptions: ['aria-label'],
    bestPractices: 'Use for glossaries, sidebars, related reading, or quote pullouts.',
    runnable: true
  },
  {
    id: 'html-footer',
    name: '<footer>',
    category: 'HTML5 Semantic',
    syntax: '<footer>...</footer>',
    description: 'Represents a footer for its nearest sectioning content or page root.',
    exampleCode: `<footer class="page-footer">
  <p>&copy; 2026 Developer Education Specialist.</p>
  <nav aria-label="Legal">
    <a href="/privacy">Privacy Policy</a>
    <a href="/terms">Terms of Service</a>
  </nav>
</footer>`,
    attributesOrOptions: ['id', 'class'],
    bestPractices: 'Contains author information, copyright data, or links to related documents.',
    runnable: true
  },
  {
    id: 'html-figure',
    name: '<figure> & <figcaption>',
    category: 'HTML5 Semantic',
    syntax: '<figure><img ... /><figcaption>...</figcaption></figure>',
    description: 'Represents self-contained content with an optional caption, referenced as a single unit from the main flow.',
    exampleCode: `<figure class="diagram-figure">
  <img src="client-server.svg" alt="Client sends HTTP request to web server, which queries database and returns JSON response." />
  <figcaption>Figure 1.1: The Three-Tier Client-Server Architecture Lifecycle.</figcaption>
</figure>`,
    attributesOrOptions: ['class'],
    bestPractices: 'Pairs images, code listings, or diagrams with an authoritative textual caption for assistive technologies.',
    runnable: true
  },
  {
    id: 'html-time',
    name: '<time>',
    category: 'HTML5 Semantic',
    syntax: '<time datetime="2026-10-04T08:30:00Z">...</time>',
    description: 'Encodes a specific period in time or a date in human- and machine-readable formats.',
    exampleCode: `<p>Lesson published on <time datetime="2026-10-04">October 4, 2026</time>.</p>
<p>Duration: <time datetime="PT45M">45 minutes</time>.</p>`,
    attributesOrOptions: ['datetime (ISO 8601 format)'],
    bestPractices: 'Enables search engines and calendar apps to parse publication dates and durations reliably.',
    runnable: true
  },
  {
    id: 'html-details-dialog',
    name: '<details>, <summary> & <dialog>',
    category: 'HTML5 Interactive',
    syntax: '<details><summary>...</summary>...</details>',
    description: 'Native disclosure widgets and modal dialogs without requiring custom JavaScript.',
    exampleCode: `<!-- 1. Native Accordion / Disclosure -->
<details class="faq-item">
  <summary class="font-bold cursor-pointer">What is the prerequisite for Module 08?</summary>
  <p class="mt-2 text-sm text-slate-400">You must complete JavaScript Fundamentals and Modern ES6+ REST APIs.</p>
</details>

<!-- 2. Native Modal Dialog -->
<dialog id="payment-modal" class="rounded-xl p-6 bg-slate-900 text-white border border-slate-700 backdrop:bg-black/60">
  <h3>Confirm M-Pesa STK Push</h3>
  <p>A payment prompt of KES 1,500 will be sent to your phone.</p>
  <button onclick="this.closest('dialog').close()" class="mt-4 px-3 py-1 bg-indigo-600 rounded">Close</button>
</dialog>`,
    attributesOrOptions: ['open', 'showModal()', 'close()'],
    bestPractices: '<dialog> handles focus trapping, Escape key closing, and inert backdrop automatically via dialog.showModal().',
    runnable: true
  },

  // --- HTML5 FORMS & ALL INPUT TYPES ---
  {
    id: 'html-inputs-all',
    name: 'HTML5 Complete Form Input Types (All 22 Types)',
    category: 'HTML5 Forms & Inputs',
    syntax: '<input type="..." />',
    description: 'The complete set of modern HTML5 input controls with automatic mobile keyboard triggers and native constraints.',
    exampleCode: `<form class="space-y-4">
  <!-- Text & Alphanumeric -->
  <input type="text" name="username" placeholder="Username" required minlength="3" autocomplete="username">
  <input type="email" name="email" placeholder="name@domain.com" required autocomplete="email">
  <input type="password" name="pwd" minlength="8" autocomplete="current-password">
  <input type="search" name="q" placeholder="Search curriculum...">
  <input type="tel" name="phone" pattern="[0-9]{10,12}" placeholder="254712345678">
  <input type="url" name="repo" placeholder="https://github.com/user/repo">

  <!-- Numeric & Ranges -->
  <input type="number" name="amount" min="1" max="10000" step="0.01">
  <input type="range" name="volume" min="0" max="100" value="75">

  <!-- Dates & Times -->
  <input type="date" name="start_date">
  <input type="time" name="session_time">
  <input type="datetime-local" name="event_ts">
  <input type="month" name="cohort_month">
  <input type="week" name="sprint_week">

  <!-- Selectors & Pickers -->
  <input type="color" name="theme_color" value="#4f46e5">
  <input type="file" name="resume" accept=".pdf,.doc,.docx" multiple>
  <input type="checkbox" id="terms" name="terms" required>
  <input type="radio" name="plan" value="monthly" checked>

  <!-- Special Controls -->
  <input type="hidden" name="csrf_token" value="abc123xyz">
</form>`,
    attributesOrOptions: ['required', 'pattern', 'min', 'max', 'step', 'maxlength', 'autocomplete', 'disabled', 'readonly', 'aria-describedby'],
    bestPractices: 'Pair every input with an explicit <label for="id">. Use autocomplete tokens (e.g. "email", "new-password", "tel") for browser keychain integration.',
    runnable: true
  },
  {
    id: 'html-form-special',
    name: '<select>, <datalist>, <meter>, <progress> & <output>',
    category: 'HTML5 Forms & Inputs',
    syntax: '<datalist id="...">, <meter value="...">, <progress value="...">',
    description: 'Specialized native form controls for auto-complete suggestions, gauges, progress indicators, and calculated outputs.',
    exampleCode: `<!-- 1. Datalist Auto-Complete Search -->
<label for="tech-input">Choose Tech Stack:</label>
<input list="tech-options" id="tech-input" name="tech">
<datalist id="tech-options">
  <option value="React"></option>
  <option value="TypeScript"></option>
  <option value="Node.js"></option>
  <option value="PostgreSQL"></option>
  <option value="Tailwind CSS"></option>
</datalist>

<!-- 2. Progress Indicator (Task completion) -->
<label for="course-prog">Curriculum Progress (9 of 12 modules):</label>
<progress id="course-prog" max="12" value="9">75%</progress>

<!-- 3. Meter (Disk/Quota/Gauge) -->
<label for="cpu-usage">Server CPU Load:</label>
<meter id="cpu-usage" min="0" max="100" low="30" high="80" optimum="20" value="45">45%</meter>

<!-- 4. Calculated Output -->
<form oninput="total.value = parseInt(a.value) + parseInt(b.value)">
  <input type="range" id="a" value="50"> +
  <input type="number" id="b" value="25"> =
  <output name="total" for="a b">75</output>
</form>`,
    attributesOrOptions: ['min', 'max', 'low', 'high', 'optimum', 'value', 'for'],
    bestPractices: 'Provides native semantic representation of percentages, measurements, and auto-complete with zero JavaScript library overhead.',
    runnable: true
  },

  // --- HTML5 MEDIA & TABLES ---
  {
    id: 'html-media-all',
    name: '<picture>, <source>, <video> & <audio>',
    category: 'HTML5 Media & Tables',
    syntax: '<picture><source srcset="..." /><img ... /></picture>',
    description: 'Modern responsive multimedia with art direction, Next-Gen image formats (AVIF, WebP), captions, and fallbacks.',
    exampleCode: `<!-- 1. Responsive Picture Element with AVIF/WebP Fallbacks -->
<picture>
  <source srcset="hero-dark.avif" type="image/avif" media="(prefers-color-scheme: dark)">
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Developer coding at workstation with three monitors." width="1200" height="675" loading="lazy" decoding="async">
</picture>

<!-- 2. Accessible Video with Subtitles / Captions -->
<video controls width="640" height="360" poster="thumb.jpg" preload="metadata">
  <source src="lesson-intro.webm" type="video/webm">
  <source src="lesson-intro.mp4" type="video/mp4">
  <track src="captions-en.vtt" kind="captions" srclang="en" label="English Captions" default>
  <p>Your browser does not support HTML5 video. <a href="lesson-intro.mp4">Download video</a>.</p>
</video>`,
    attributesOrOptions: ['loading="lazy"', 'decoding="async"', 'srcset', 'media', 'poster', 'controls', 'kind="captions"'],
    bestPractices: 'Always include explicit width and height attributes on images and videos to eliminate Cumulative Layout Shift (CLS). Always include captions for WCAG AA compliance.',
    runnable: true
  },
  {
    id: 'html-table-complete',
    name: 'Complete Accessible <table> with thead, tbody, tfoot, th scope',
    category: 'HTML5 Media & Tables',
    syntax: '<table><thead><tr><th scope="col">...</th></tr></thead>...</table>',
    description: 'A fully accessible tabular data grid with column and row header scopes, captions, and summary footers.',
    exampleCode: `<table class="w-full text-left border-collapse">
  <caption class="text-sm font-semibold mb-2">Table 1.2: Cloud Infrastructure Latency Comparison</caption>
  <thead>
    <tr class="border-b border-slate-700 bg-slate-900">
      <th scope="col" class="p-3">Region</th>
      <th scope="col" class="p-3">Provider</th>
      <th scope="col" class="p-3">Avg Latency (ms)</th>
      <th scope="col" class="p-3">Uptime</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-slate-800">
    <tr>
      <th scope="row" class="p-3 font-medium">us-east-1</th>
      <td class="p-3">AWS</td>
      <td class="p-3 font-mono">18ms</td>
      <td class="p-3 text-emerald-400">99.99%</td>
    </tr>
    <tr>
      <th scope="row" class="p-3 font-medium">europe-west1</th>
      <td class="p-3">GCP</td>
      <td class="p-3 font-mono">22ms</td>
      <td class="p-3 text-emerald-400">99.98%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr class="border-t border-slate-700 font-semibold bg-slate-900/50">
      <th scope="row" colspan="2" class="p-3">Global Average</th>
      <td class="p-3 font-mono">20ms</td>
      <td class="p-3 text-emerald-400">99.985%</td>
    </tr>
  </tfoot>
</table>`,
    attributesOrOptions: ['scope="col"', 'scope="row"', 'colspan', 'rowspan', '<caption>'],
    bestPractices: 'Never use tables for page layout. Always include <caption> and scope="col"/"row" so screen reader users can navigate row by row.',
    runnable: true
  },

  // --- MODERN CSS SELECTORS & FEATURES ---
  {
    id: 'css-has-container',
    name: 'CSS :has(), :is(), :where(), and Container Queries (@container)',
    category: 'CSS Modern (has, container, layers)',
    syntax: ':has(), @container (min-width: ...)',
    description: 'Modern CSS features that revolutionized responsive design and parent-state styling.',
    exampleCode: `/* 1. Parent Selector with :has() */
/* Style the card differently if it contains an active alert badge */
.card:has(.alert-badge) {
  border-color: #ef4444;
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.2);
}

/* Style form label when adjacent input is focused */
.form-group:has(input:focus-visible) label {
  color: #6366f1;
}

/* 2. Container Queries (Component-Driven Responsiveness) */
.card-wrapper {
  container-type: inline-size;
  container-name: card-container;
}

@container card-container (min-width: 450px) {
  .card-inner {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
  }
}

/* 3. Logical Selectors :is() and :where() */
/* Matches any heading inside article, section, or aside with 0 specificity penalty */
:where(article, section, aside) :is(h1, h2, h3) {
  line-height: 1.25;
  letter-spacing: -0.02em;
}`,
    attributesOrOptions: [':has()', '@container', 'container-type', ':is()', ':where()', ':not()'],
    bestPractices: 'Container queries allow a component to respond to its OWN container width rather than the global browser viewport width.',
    runnable: false
  },
  {
    id: 'css-cascade-layers',
    name: 'CSS Cascade Layers (@layer) & Math Functions (clamp, min, max)',
    category: 'CSS Modern (has, container, layers)',
    syntax: '@layer base, components, utilities;',
    description: 'Explicit control over the cascade and fluid typography calculations without media queries.',
    exampleCode: `/* 1. Cascade Layers Declaration */
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; }
}

@layer components {
  /* Lower priority than utilities, higher than base */
  .btn-primary {
    background-color: #4f46e5;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
  }
}

@layer utilities {
  .hidden { display: none !important; }
}

/* 2. Fluid Typography Math with clamp() */
/* Scales smoothly from 1.5rem on 320px screens to 3rem on 1440px screens */
h1 {
  font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem);
}`,
    attributesOrOptions: ['@layer', 'clamp(min, preferred, max)', 'min()', 'max()', 'calc()'],
    bestPractices: '@layer stops third-party library specificity wars forever. clamp() replaces hundreds of lines of breakpoint font size overrides.',
    runnable: false
  },

  // --- MODERN JAVASCRIPT & WEB APIS ---
  {
    id: 'js-modern-operators',
    name: 'Modern JavaScript Operators (??, ?., &&=, ||=, ??=)',
    category: 'JavaScript Syntax & APIs',
    syntax: 'obj?.prop, a ?? b, x ??= defaultVal',
    description: 'Modern ECMAScript operators for safe property navigation and assignment without boilerplate null checks.',
    exampleCode: `const user = {
  profile: {
    displayName: 'Jordan'
    // settings is undefined
  }
};

// 1. Optional Chaining (?.)
const theme = user?.profile?.settings?.theme ?? 'dark';
console.log(theme); // "dark" (Does NOT throw TypeError!)

// 2. Nullish Coalescing (??) vs OR (||)
const userCount = 0;
// || treats 0 as falsy, incorrectly falling back to 10:
const buggyLimit = userCount || 10; // 10
// ?? strictly checks for null or undefined, preserving 0:
const correctLimit = userCount ?? 10; // 0

// 3. Logical Assignment Operators
let config = { timeout: 0 };
config.timeout ??= 3000; // Remains 0!
config.retries ??= 3;    // Sets retries = 3

// 4. Object.groupBy (ES2024 native)
const inventory = [
  { name: 'Course A', phase: 'Frontend' },
  { name: 'Course B', phase: 'Backend' },
  { name: 'Course C', phase: 'Frontend' }
];
const grouped = Object.groupBy(inventory, item => item.phase);
/* Result: { Frontend: [A, C], Backend: [B] } */`,
    attributesOrOptions: ['?.', '??', '&&=', '||=', '??=', 'Object.groupBy()', 'structuredClone()'],
    bestPractices: 'Always use ?? when checking numerical, boolean, or empty string values where 0, false, or "" are valid values.',
    runnable: true
  },
  {
    id: 'js-intersection-observer',
    name: 'Modern Web APIs: IntersectionObserver & AbortController',
    category: 'JavaScript Syntax & APIs',
    syntax: 'new IntersectionObserver(callback, options)',
    description: 'High-performance browser APIs for scroll tracking, lazy loading, and network request cancellation without layout thrashing.',
    exampleCode: `// 1. IntersectionObserver for Infinite Scroll / Lazy Reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// 2. AbortController for Canceling In-Flight Fetch Requests
const controller = new AbortController();

async function fetchWithTimeout(url, timeoutMs = 5000) {
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn('Network request timed out and was aborted.');
    }
    throw err;
  }
}`,
    attributesOrOptions: ['threshold', 'rootMargin', 'signal', 'abort()'],
    bestPractices: 'Replaces window.addEventListener("scroll") which causes heavy main-thread layout thrashing.',
    runnable: false
  },

  // --- TYPESCRIPT ADVANCED TYPE SYSTEM ---
  {
    id: 'ts-advanced-types',
    name: 'Advanced TypeScript: Conditional Types, Mapped Types & satisfies',
    category: 'TypeScript Types',
    syntax: 'T extends U ? X : Y, [K in keyof T]: ...',
    description: 'The advanced mechanics of the TypeScript type-level programming language.',
    exampleCode: `// 1. Conditional Types & Infer Keyword
type IsArray<T> = T extends any[] ? true : false;
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type ResolvedData = UnpackPromise<Promise<{ id: string }>>; // { id: string }

// 2. Mapped Types with Template Literals
type Events = 'click' | 'focus' | 'blur';
type EventHandlers = {
  [K in Events as \`on\${Capitalize<K>}\`]: (event: any) => void;
};
/* Result: { onClick: ..., onFocus: ..., onBlur: ... } */

// 3. The 'satisfies' Operator (Type check without widening)
type ColorPalettes = Record<string, string | number[]>;

const theme = {
  primary: '#4f46e5',
  secondary: [99, 102, 241]
} satisfies ColorPalettes;

// Preserves exact literal types!
theme.primary.toUpperCase(); // Allowed! No union type error!`,
    attributesOrOptions: ['infer', 'keyof', 'typeof', 'satisfies', 'Capitalize<T>', 'Exclude<T, U>', 'Extract<T, U>'],
    bestPractices: 'Use `satisfies` whenever you want to validate that an object conforms to a contract without losing its specific literal type inference.',
    runnable: false
  },

  // --- SQL & POSTGRESQL COMPLETE CODEX ---
  {
    id: 'sql-window-ctes',
    name: 'PostgreSQL: CTEs (WITH), Window Functions & JSONB',
    category: 'SQL & PostgreSQL',
    syntax: 'WITH ... AS (...), ROW_NUMBER() OVER (...)',
    description: 'Advanced relational SQL capabilities for analytical reporting and hierarchical data structures.',
    exampleCode: `-- 1. Common Table Expression (CTE) & Window Function
WITH RankedStudentScores AS (
  SELECT 
    student_id,
    course_id,
    score,
    ROW_NUMBER() OVER (PARTITION BY course_id ORDER BY score DESC) as rank_in_course,
    AVG(score) OVER (PARTITION BY course_id) as course_average
  FROM module_quiz_submissions
)
SELECT * 
FROM RankedStudentScores
WHERE rank_in_course <= 3; -- Get Top 3 students per course

-- 2. PostgreSQL JSONB Querying
SELECT 
  id,
  metadata->>'browser' as client_browser,
  (metadata->'device'->>'screen_width')::INT as viewport_width
FROM telemetry_logs
WHERE metadata @> '{"status": "error"}';

-- 3. ACID Transaction with Rollback
BEGIN;
  UPDATE accounts SET balance = balance - 1500 WHERE id = 'sender_uuid';
  UPDATE accounts SET balance = balance + 1500 WHERE id = 'recipient_uuid';
  INSERT INTO audit_log (action, amount) VALUES ('TRANSFER', 1500);
COMMIT; -- Or ROLLBACK if any error occurs`,
    attributesOrOptions: ['WITH', 'OVER (PARTITION BY ...)', 'ROW_NUMBER()', 'JSONB ->>', 'BEGIN / COMMIT / ROLLBACK'],
    bestPractices: 'CTEs make complex nested subqueries readable. Transactions prevent partial database updates during financial transfers.',
    runnable: false
  },

  // --- EXPRESS & NODE.JS SYSTEM CODEX ---
  {
    id: 'node-express-streams',
    name: 'Node.js & Express: Streaming, Multer Uploads & Zod Validation',
    category: 'Express & Node.js',
    syntax: 'pipeline(readStream, writeStream), z.object(...)',
    description: 'High-performance streaming I/O, secure file upload pipelines, and schema validation middleware.',
    exampleCode: `import express from 'express';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { z } from 'zod';

const app = express();

// 1. Zod Request Body Validation Schema
const CreateProductSchema = z.object({
  title: z.string().min(3).max(100),
  price: z.number().positive(),
  category: z.enum(['Frontend', 'Backend', 'DevOps'])
});

// Validation Middleware Factory
const validateBody = (schema: z.ZodSchema) => (req: any, res: any, next: any) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: 'ValidationError', issues: parsed.error.issues });
  }
  req.body = parsed.data;
  next();
};

// 2. High-Performance Stream Response (Memory Efficient)
app.get('/api/reports/download', async (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="large-dataset.csv"');
  
  const fileStream = createReadStream('/var/data/large-export.csv');
  await pipeline(fileStream, res); // Streams chunks directly without loading 500MB into RAM
});`,
    attributesOrOptions: ['pipeline', 'createReadStream', 'safeParse', 'safeParseAsync'],
    bestPractices: 'Streaming prevents Node.js from running out of heap memory when serving or downloading large files.',
    runnable: false
  },

  // --- DIGITAL PAYMENT RAILS (M-PESA & STRIPE) ---
  {
    id: 'payments-mpesa-stripe-complete',
    name: 'Digital Payments: M-Pesa Daraja STK Push & Query + Stripe Webhooks',
    category: 'Payment Rails',
    syntax: 'stkpush/v1/processrequest, stripe.webhooks.constructEvent',
    description: 'Production payloads and verification contracts for African (M-Pesa) and Global (Stripe) monetization.',
    exampleCode: `// 1. Safaricom M-Pesa STK Push Query (Check transaction status if callback delayed)
const queryResponse = await axios.post(
  'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
  {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: generatePassword(), // base64(shortcode + passkey + timestamp)
    Timestamp: getFormattedTimestamp(),
    CheckoutRequestID: "ws_CO_04102026_987654321"
  },
  { headers: { Authorization: \`Bearer \${token}\` } }
);

// 2. Complete M-Pesa Successful Callback Payload Format
/*
{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "29115-34620561-1",
      "CheckoutRequestID": "ws_CO_04102026_987654321",
      "ResultCode": 0,
      "ResultDesc": "The service request is processed successfully.",
      "CallbackMetadata": {
        "Item": [
          { "Name": "Amount", "Value": 1500.00 },
          { "Name": "MpesaReceiptNumber", "Value": "QHK293847" },
          { "Name": "TransactionDate", "Value": 20261004083000 },
          { "Name": "PhoneNumber", "Value": 254712345678 }
        ]
      }
    }
  }
}
*/`,
    attributesOrOptions: ['CheckoutRequestID', 'ResultCode: 0', 'MpesaReceiptNumber', 'stripe.webhooks.constructEvent'],
    bestPractices: 'Store CheckoutRequestID in the pending order row immediately upon initiating STK Push so the callback can find and fulfill the order.',
    runnable: false
  }
];
