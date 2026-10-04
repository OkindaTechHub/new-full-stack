import { Module } from '../../types/course';

export const module09AdvancedReactTypescript: Module = {
  id: 'module-09',
  moduleNumber: 9,
  title: 'Advanced React & TypeScript Integration',
  slug: 'advanced-react-typescript',
  durationWeeks: 'Week 9',
  level: 'Intermediate → Advanced',
  phase: 'Phase 2: Modern Frontend',
  overview: {
    whatItTeaches: 'Advanced React architecture (React Router 6/7, nested layouts, client-side routing, Context API for global state, custom hooks, code splitting with React.lazy and Suspense) paired with end-to-end static type safety using TypeScript (primitives, interfaces, type aliases, generics, union types, type narrowing, and typing React component props, state, event handlers, and API responses).',
    whyItMatters: 'As applications scale past 10,000 lines of code, vanilla JavaScript lacks compile-time verification, leading to frequent runtime crashes like "Cannot read property of undefined". Combining React with TypeScript provides compile-time guarantees, automated refactoring confidence, self-documenting codebases, and superior developer velocity.',
    prerequisites: ['Module 08: React Fundamentals'],
    estimatedHours: 18,
    skillsAcquired: [
      'Configuring client-side routing with React Router (BrowserRouter, Routes, Route, Link, NavLink, useParams)',
      'Designing nested layouts with `<Outlet />` for consistent navigation shells',
      'Implementing global state without prop-drilling using the React Context API (`createContext`, `useContext`)',
      'Extracting reusable business logic into Custom Hooks (e.g. `useFetch`, `useLocalStorage`, `useDebounce`)',
      'Optimizing rendering performance with `useMemo`, `useCallback`, and code splitting via `React.lazy()` and `<Suspense>`',
      'Defining strict TypeScript interfaces, type aliases, union types, and Generics (`<T>`)',
      'Typing React components, Props, useState, useRef, and synthetic event handlers (`React.MouseEvent`, `React.ChangeEvent`)',
      'Typing asynchronous REST API responses and enforcing runtime validation contracts'
    ]
  },
  lessons: [
    {
      id: 'm09-l01',
      number: 1,
      title: 'TypeScript Essentials for Modern Frontend Engineering',
      durationMinutes: 55,
      learningObjectives: [
        'Explain why TypeScript is essential for large-scale enterprise development.',
        'Declare primitive types, arrays, tuples, interfaces, and type aliases.',
        'Use union types, literal types, and optional properties to model domain logic.',
        'Write generic functions and interfaces (`<T>`) for flexible, type-safe data handling.',
        'Apply type narrowing using `typeof`, `instanceof`, and custom type guards.'
      ],
      introduction: 'TypeScript is a strongly typed superset of JavaScript developed by Microsoft that compiles down to plain JavaScript. By analyzing types at compile-time, TypeScript catches typo bugs, missing arguments, and invalid object shapes before code ever runs in the browser.',
      detailedNotes: `Type Annotations vs Type Inference:
TypeScript automatically infers types when initialization is unambiguous ('let count = 0' is inferred as 'number'). When types cannot be inferred or need strict contracts, you provide explicit annotations.

Interfaces vs Type Aliases:
- 'interface': Best for defining the shape of objects, easily extensible via declaration merging and 'extends'.
- 'type': More versatile; can define object shapes, union types ('type Status = "idle" | "loading" | "error"'), tuples, and primitives.

Generics (<T>):
Allow you to write flexible, reusable code that works with any data type while preserving type safety.
Instead of using 'any' (which disables TypeScript checking), Generics act as a type variable:
'function getFirstItem<T>(items: T[]): T | undefined { return items[0]; }'

Type Narrowing:
The process of refining a broader type (like 'string | number') into a more specific type within a conditional block using:
- 'typeof val === "string"'
- 'if ("role" in user)'
- 'if (err instanceof Error)'`,
      concepts: [
        {
          name: 'Union Types and Discriminated Unions',
          description: 'Modeling distinct state variants safely using a shared literal tag.',
          table: {
            headers: ['State Tag', 'Specific Payload Fields', 'TypeScript Safety Guarantee'],
            rows: [
              ['status: "idle"', 'None', 'Prevents accessing error or data before fetch'],
              ['status: "loading"', 'None', 'Disables buttons, shows spinner'],
              ['status: "success"', 'data: Product[]', 'Guarantees data exists when status is success'],
              ['status: "error"', 'error: string', 'Guarantees error string exists when status is error']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'typescript',
          title: 'Discriminated Unions & Generic API Response Pattern',
          code: `// Generic API Response Container
export interface ApiResponse<TData> {
  success: boolean;
  statusCode: number;
  payload: TData;
  timestamp: string;
}

// Domain Model
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'engineer' | 'viewer';
  avatarUrl?: string; // Optional property
}

// Discriminated Union for Network Fetch State
export type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

// Type Narrowing in Action
export function renderStateBadge<T>(state: FetchState<T>): string {
  switch (state.status) {
    case 'idle':
      return 'Waiting to initialize...';
    case 'loading':
      return 'Syncing telemetry...';
    case 'success':
      // TypeScript GUARANTEES state.data exists here!
      return 'Data synchronized successfully.';
    case 'error':
      // TypeScript GUARANTEES state.message exists here!
      return \`Failed: \${state.message}\`;
  }
}`,
          explanation: 'Demonstrates generics with <TData>, strict string literal unions, and discriminated union narrowing where TypeScript guarantees property existence inside each switch case.'
        }
      ],
      realWorldExample: {
        scenario: 'API schema contract changes in production',
        industryApplication: 'A backend team renames a field from `user_id` to `userId`. In plain JavaScript, the frontend silently breaks with `undefined` in production. In TypeScript, updating the shared interface immediately produces 43 red compiler errors across the codebase, identifying every single line that must be updated before merging.',
        takeaway: 'TypeScript eliminates silent regressions during refactoring.'
      },
      practicalExercise: {
        title: 'Model a Flexible Key-Value Cache with TypeScript Generics',
        objective: 'Build a generic In-Memory Cache class that preserves item types.',
        requirements: ['TypeScript compiler (tsc) or tsx runner'],
        steps: [
          'Create a class `CacheStore<T>` with a private `Map<string, T>`.',
          'Implement `set(key: string, value: T): void`.',
          'Implement `get(key: string): T | undefined`.',
          'Instantiate `const userCache = new CacheStore<UserProfile>();` and verify that calling `userCache.set("u1", { id: "1" })` flags compiler errors for missing required fields.'
        ],
        expectedResult: 'Strong type enforcement catching invalid object shapes at compile time.'
      },
      commonMistakes: [
        {
          mistake: 'Using `any` whenever a type is difficult to write.',
          whyItHappens: 'Frustration with compiler error messages.',
          howToFix: 'Avoid `any`. It turns off all TypeScript checking for that variable and propagates through your app. Use `unknown` if the type is truly uncertain, and narrow it using `typeof` or Zod validation.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm09-l1-q1',
          type: 'multiple-choice',
          question: 'What is the key benefit of a Discriminated Union in TypeScript?',
          options: [
            'It makes the code run 10x faster in Google Chrome',
            'It uses a common literal property (like `status`) that allows TypeScript to reliably narrow down the exact object shape inside conditional blocks',
            'It converts JSON into SQL automatically',
            'It eliminates the need for functions'
          ],
          correctAnswerIndex: 1,
          explanation: 'A discriminated union uses a common literal discriminator tag (e.g. `type: "success"`) allowing TypeScript to guarantee property existence safely.'
        }
      ],
      summary: [
        'TypeScript provides static compile-time type verification, catching bugs before runtime.',
        'Use interfaces for object contracts and type aliases for unions and complex compositions.',
        'Generics `<T>` enable reusable, type-safe functions and data structures without resorting to `any`.'
      ],
      additionalResources: [
        {
          name: 'TypeScript Official Handbook',
          description: 'The comprehensive guide to TypeScript types and generics.',
          url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
          usefulFor: 'Mastering narrowing, utility types (Partial, Omit, Pick), and generics.'
        }
      ]
    },
    {
      id: 'm09-l02',
      number: 2,
      title: 'React Router, Context API & Custom Hooks in TypeScript',
      durationMinutes: 65,
      learningObjectives: [
        'Architect client-side multi-page routing with React Router 6/7 using `<Routes>`, `<Route>`, and `<Outlet>`.',
        'Extract route URL parameters using the typed `useParams` hook.',
        'Eliminate prop-drilling for global concerns (theming, user preferences) using the React Context API.',
        'Author reusable, fully typed Custom Hooks (e.g. `useLocalStorage`, `useFetch`).',
        'Optimize large application bundle sizes using `React.lazy()` and `<Suspense>` for code splitting.'
      ],
      introduction: 'Real-world web applications rarely fit on a single page or rely solely on local component state. They require structured URL navigation, deep linking, global shared state without prop-drilling, and modular custom hooks that package reusable logic.',
      detailedNotes: `React Router Mechanics:
Client-side routing intercepts browser navigation so URL changes swap components in and out without triggering full page HTTP reloads.
- '<BrowserRouter>': Context provider wrapping the application that syncs UI with the browser address bar.
- '<Routes>' and '<Route path="/catalog" element={<CatalogPage />} />': Route matching engine.
- Nested Routes with '<Outlet />': Allows a parent layout (e.g., dashboard shell with sidebar) to remain mounted while nested child pages swap inside the '<Outlet />' slot.
- 'useParams<{ id: string }>()': Extracts route parameters (e.g. '/product/:id').

The React Context API:
Solves "Prop Drilling" (passing props down 6 intermediate components that do not need them just to reach a deeply nested child).
Three steps:
1. 'const ThemeContext = createContext<ThemeContextType | undefined>(undefined);'
2. '<ThemeContext.Provider value={value}>...children...</ThemeContext.Provider>'
3. 'const { theme, toggleTheme } = useTheme();' (via custom hook calling 'useContext').

Custom Hooks:
JavaScript functions whose names start with 'use' (e.g. 'useDebounce', 'useWindowSize') that can call other React hooks.
Enables extracting complex stateful logic out of UI components into clean, testable units.

Performance Optimization:
- 'React.lazy(() => import("./AnalyticsDashboard"))': Code-splits large components into separate JavaScript chunk bundles downloaded on demand.
- '<Suspense fallback={<LoadingSkeleton />}>': Renders a fallback UI while the lazy chunk is being downloaded over the network.`,
      concepts: [
        {
          name: 'Prop Drilling vs Context API',
          description: 'Providing direct access to global state across deep component trees.',
          diagram: `[App (Holds Theme State)]
       │
       ▼ (Prop Drilling passes through intermediate nodes)
[Dashboard Layout]
       │
       ▼
[Metrics Grid]
       │
       ▼
[Metric Card (Needs Theme)]

──► WITH CONTEXT API:
[ThemeContext.Provider (At App root)] ══════════════╗ Direct
       │                                            ║ Subscription
       ▼                                            ▼
[Metric Card] ◄─────────────────────────────────────╝ (useContext)`
        }
      ],
      codeExamples: [
        {
          language: 'tsx',
          title: 'Typed Custom Hook: useLocalStorage with React & TypeScript',
          code: `import { useState, useEffect } from 'react';

/**
 * A type-safe hook that syncs React state with browser localStorage.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Read initial stored value or use fallback
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Usage in Component
export function SettingsToggle() {
  const [isCompact, setIsCompact] = useLocalStorage<boolean>('pref_compact_view', false);

  return (
    <button
      onClick={() => setIsCompact(prev => !prev)}
      className="px-3 py-1.5 bg-slate-800 text-white rounded text-xs"
    >
      Compact View: {isCompact ? 'Enabled' : 'Disabled'}
    </button>
  );
}`,
          explanation: 'Demonstrates a robust, generic custom hook in TypeScript. It handles JSON serialization, error boundaries, lazy state initialization, and returns a typed tuple matching the useState API.'
        }
      ],
      realWorldExample: {
        scenario: 'Global notification / toast alert engine',
        industryApplication: 'Instead of passing `showToast` props through every button in an app, modern apps wrap the root with `<ToastProvider>`. Any component anywhere in the tree calls `const { addToast } = useToast();` to trigger a non-blocking notification.',
        takeaway: 'Context + Custom Hooks provide clean, decoupled global services.'
      },
      practicalExercise: {
        title: 'Build a Nested Dashboard Layout with React Router & Outlet',
        objective: 'Construct a multi-route dashboard application with persistent sidebar navigation and dynamic child pages.',
        requirements: ['React Router package installed'],
        steps: [
          'Create `<DashboardLayout />` containing a sidebar and `<Outlet />`.',
          'Define nested routes: `/dashboard/overview`, `/dashboard/analytics`, and `/dashboard/settings`.',
          'Use `<NavLink to="/dashboard/analytics">` and apply active styles (`isActive ? "text-indigo-400 font-bold" : "text-slate-400"`).',
          'Add a dynamic detail route `/dashboard/services/:serviceId` and read the parameter using `useParams()`.',
          'Wrap the analytics page in `React.lazy()` and `<Suspense>`.'
        ],
        expectedResult: 'Seamless client-side navigation where the sidebar stays mounted while child content swaps instantly.'
      },
      commonMistakes: [
        {
          mistake: 'Putting high-frequency, rapidly changing state inside Context API (e.g. mouse move coordinates).',
          whyItHappens: 'Assuming Context is a replacement for all state management.',
          howToFix: 'Every component consuming a Context re-renders whenever the Context value updates. Keep high-frequency state local or use dedicated state managers; reserve Context for low-frequency global data (theme, auth state, user language).'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm09-l2-q1',
          type: 'multiple-choice',
          question: 'What is the role of `<Outlet />` in React Router?',
          options: [
            'It provides an electrical power connection to the browser',
            'It serves as a placeholder slot inside a parent route layout component where matching child route components are rendered',
            'It sends error logs to the server',
            'It connects to a database'
          ],
          correctAnswerIndex: 1,
          explanation: '`<Outlet />` renders the matching child route elements within a parent layout component.'
        }
      ],
      summary: [
        'React Router enables client-side multi-page navigation with nested layouts via `<Outlet />`.',
        'The Context API shares low-frequency global state without prop-drilling.',
        'Custom hooks encapsulate reusable stateful logic into clean, testable functions.'
      ],
      additionalResources: [
        {
          name: 'React Router Official Documentation',
          description: 'The standard routing library for React applications.',
          url: 'https://reactrouter.com/',
          usefulFor: 'Mastering loaders, nested routes, and route actions.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm09-lab-1',
      title: 'Lab 9.1: Architecting a Type-Safe Global Theme & Settings Context',
      durationMinutes: 60,
      objective: 'Build an end-to-end type-safe Context and custom hook for application-wide theme and accessibility settings.',
      prerequisites: ['Module 08 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Define Context Interface and Types',
          instructions: 'Specify theme types and context contract:',
          code: `export type ThemeMode = 'dark' | 'light' | 'system';
export interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedTheme: 'dark' | 'light';
}`
        }
      ],
      verificationChecklist: [
        'Attempting to call useTheme outside ThemeProvider throws a descriptive descriptive error',
        'State is persisted to localStorage and correctly updates the `<html>` root class',
        'TypeScript enforces strict typing across all consumer components'
      ],
      deliverables: ['Type-safe Context provider and custom hook module']
    }
  ],
  moduleProject: {
    id: 'm09-project',
    title: 'React + TypeScript Analytics & System Dashboard',
    difficulty: 'Intermediate → Advanced',
    estimatedHours: 14,
    overview: 'Build an enterprise-grade, fully typed Analytics and Operations Dashboard using React, TypeScript, and Tailwind CSS. The dashboard features nested routing with React Router, a global Settings Context, custom data-fetching hooks with loading/error handling, an interactive telemetry table with sorting and search, metric trend cards with sparkline placeholders, and modal configuration drawers. Every single component, prop, state variable, and event handler must be strictly typed without using `any`.',
    requirements: [
      'Strict TypeScript configuration: zero `any` types; all Props, State, and API interfaces clearly defined',
      'React Router navigation: persistent dashboard layout with nested sub-pages (`/overview`, `/services`, `/services/:id`, `/analytics`, `/settings`)',
      'Global Context: Theme and workspace settings managed through a type-safe Context and custom hook (`useWorkspace`)',
      'Custom Hooks: implement at least two custom hooks (e.g. `useFetchTelemetry`, `useDebounce`)',
      'Services Table: dynamic sortable table displaying mock server instances (CPU, Memory, Latency, Status), with search filter and pagination',
      'Service Detail View: deep-linked route (`/services/:id`) reading parameters via `useParams` to render specific telemetry',
      'Code Splitting: Route components dynamically loaded via `React.lazy()` and wrapped in `<Suspense fallback={<LoadingSkeleton />}>`'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'TypeScript Type Declarations & Domain Models',
        tasks: ['Define ServiceInstance, MetricRecord, and WorkspaceSettings types']
      },
      {
        milestone: 2,
        title: 'Routing Shell & Nested Outlet Layout',
        tasks: ['Configure BrowserRouter and nested routes', 'Build DashboardLayout with sidebar and outlet']
      },
      {
        milestone: 3,
        title: 'Custom Hooks & Telemetry Services Table',
        tasks: ['Implement useFetchTelemetry', 'Build sortable, filterable table component']
      },
      {
        milestone: 4,
        title: 'Global Settings Context & Performance Audit',
        tasks: ['Build WorkspaceContext', 'Add React.lazy code splitting', 'Verify zero TypeScript compilation errors']
      }
    ],
    starterCodeStructure: [
      {
        path: 'dashboard-ts/src/types/index.ts',
        description: 'Central domain types',
        sampleContent: `export type ServiceStatus = 'healthy' | 'degraded' | 'offline';

export interface ServiceInstance {
  id: string;
  name: string;
  region: string;
  status: ServiceStatus;
  uptimePercentage: number;
  avgLatencyMs: number;
  lastDeployedAt: string;
}`
      }
    ],
    acceptanceCriteria: [
      'Application compiles cleanly with `tsc --noEmit` with zero errors and zero `any` bypasses',
      'Nested routing works seamlessly with browser back/forward buttons and deep linking',
      'Table supports multi-column sorting and instant client-side filtering'
    ],
    rubric: [
      { criteria: 'TypeScript Type Safety & Rigor', points: 35, description: 'Exemplary typing, generics, discriminated unions, and zero `any` usage' },
      { criteria: 'React Router & Nested Architecture', points: 30, description: 'Clean nested routes with `<Outlet />`, `<NavLink>`, and typed `useParams`' },
      { criteria: 'Custom Hooks & Context Design', points: 20, description: 'Reusable custom hooks and performant context providers' },
      { criteria: 'Code Splitting & UI Craft', points: 15, description: 'React.lazy code splitting, loading skeletons, and polished Tailwind styling' }
    ]
  },
  quiz: [
    {
      id: 'm09-qz-01',
      question: 'Which TypeScript utility type constructs a type with all properties of `Type` set to optional (`?`)?',
      options: ['Required<Type>', 'Partial<Type>', 'Readonly<Type>', 'Pick<Type, Keys>'],
      correctAnswerIndex: 1,
      explanation: 'Partial<Type> marks all properties in an interface or object type as optional.'
    },
    {
      id: 'm09-qz-02',
      question: 'What is the standard React TypeScript type for an `onChange` event listener on an HTML text input?',
      options: [
        'React.MouseEvent<HTMLButtonElement>',
        'React.ChangeEvent<HTMLInputElement>',
        'React.KeyboardEvent',
        'Function'
      ],
      correctAnswerIndex: 1,
      explanation: '`React.ChangeEvent<HTMLInputElement>` accurately types input change events, providing full autocomplete on `e.target.value`.'
    },
    {
      id: 'm09-qz-03',
      question: 'Why should you wrap dynamic component imports with `React.lazy()` in a `<Suspense>` boundary?',
      options: [
        'To prevent CSS styling errors',
        'Because lazy-loaded components download asynchronously over the network; Suspense specifies the fallback UI (spinner, skeleton) to show while downloading',
        'It is required by TypeScript to compile',
        'Suspense converts components into Web Workers'
      ],
      correctAnswerIndex: 1,
      explanation: 'React.lazy suspends rendering until the remote script bundle arrives; <Suspense fallback={...}> provides the fallback view.'
    }
  ],
  assignment: {
    id: 'm09-assign',
    title: 'Module 09 Assignment: Fully Typed Reusable Data Grid Component',
    problemStatement: 'Author a generic, reusable `<DataGrid<T>>` component in React and TypeScript. The table must accept an array of generic items (`data: T[]`) and a column definition array (`columns: ColumnDef<T>[]`). Each column defines a header label, an accessor key, and an optional custom render function `(item: T) => React.ReactNode`. The component must support column sorting and pagination while guaranteeing 100% type safety for any data model passed into it.',
    specifications: [
      'Generic component signature using `<T extends { id: string | number }>`',
      'Column definitions strongly typed against keys of `T` using `keyof T`',
      'Sorting state machine toggling between Ascending, Descending, and None',
      'Passes `tsc --noEmit` with strictNullChecks enabled'
    ],
    deliverables: ['`DataGrid.tsx`, `types.ts`, and a test demonstration harness using two different data types.'],
    evaluationRubric: [
      { category: 'Generics & Type Precision', weight: '45%', description: 'Exemplary usage of `<T>` and `keyof T` without type assertions (`as any`)' },
      { category: 'Component Reusability', weight: '35%', description: 'Works seamlessly with completely different data models' },
      { category: 'Sorting & Pagination Logic', weight: '20%', description: 'Pure, immutable sorting and pagination calculation' }
    ],
    submissionFormat: 'TypeScript files submitted in repository'
  },
  resources: [
    {
      name: 'React TypeScript Cheatsheet',
      description: 'The gold-standard reference for typing React components and hooks.',
      url: 'https://react-typescript-cheatsheet.netlify.app/',
      usefulFor: 'Looking up types for events, refs, context, and higher-order components.'
    }
  ],
  summary: 'Module 09 combined React with TypeScript: static type safety, interfaces, discriminated unions, generics, React Router nested layouts, Context API global state, and custom hooks.'
};
