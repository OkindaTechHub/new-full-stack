import { Module } from '../../types/course';

export const module08React: Module = {
  id: 'module-08',
  moduleNumber: 8,
  title: 'React Fundamentals & Component Architecture',
  slug: 'react-fundamentals',
  durationWeeks: 'Week 8',
  level: 'Intermediate',
  phase: 'Phase 2: Modern Frontend',
  overview: {
    whatItTeaches: 'Declarative component-driven UI architecture with React 19/18, JSX syntax, unidirectional data flow, Props, State management with `useState`, handling side-effects with `useEffect`, conditional rendering, rendering lists with unique keys, controlled form inputs, and component composition.',
    whyItMatters: 'React powers the majority of modern enterprise web applications. By decoupling UI state from manual DOM manipulation through a virtual representation and declarative rendering model, React eliminates entire classes of UI synchronization bugs.',
    prerequisites: ['Module 05: JavaScript Fundamentals', 'Module 06: Modern JavaScript & REST APIs'],
    estimatedHours: 18,
    skillsAcquired: [
      'Deconstructing complex UI layouts into reusable, composable functional components',
      'Authoring declarative markup using JSX (JavaScript XML) and embedding dynamic expressions',
      'Passing read-only configuration and data down component hierarchies via Props',
      'Managing reactive component state using the `useState` hook with immutable state updates',
      'Synchronizing with external systems (APIs, timers, event listeners) using `useEffect` with clean dependency arrays',
      'Handling user input through controlled components and synthetic event handlers',
      'Rendering dynamic lists with stable, unique `key` identifiers to maintain reconciliation performance',
      'Structuring projects using standard React directory conventions'
    ]
  },
  lessons: [
    {
      id: 'm08-l01',
      number: 1,
      title: 'The React Paradigm: Components, JSX & Unidirectional Data Flow',
      durationMinutes: 50,
      learningObjectives: [
        'Contrast imperative vanilla DOM manipulation with React’s declarative component model.',
        'Explain the role of JSX and how compilers (Babel/Vite) transform it into `React.createElement` calls.',
        'Pass and destructure Props to create flexible, configurable UI components.',
        'Understand unidirectional data flow (data flows down, events flow up).'
      ],
      introduction: 'In vanilla JavaScript, updating the UI when data changes requires finding DOM nodes, updating text, toggling classes, and managing state across dozens of variables. As apps grow, these manual steps inevitably fall out of sync. React solved this by introducing declarative components: you declare what the UI should look like for a given state, and React handles updating the screen.',
      detailedNotes: `Imperative vs Declarative:
- Imperative (Vanilla JS): Step-by-step instructions on HOW to change the DOM.
- Declarative (React): You describe WHAT the UI should look like based on the current state. React computes the minimal DOM diff and updates the real browser DOM.

JSX (JavaScript XML):
A syntax extension for JavaScript that allows you to write HTML-like markup inside JavaScript files.
- It is NOT HTML: JSX compiles down to standard JavaScript function calls ('jsx()' or 'React.createElement()').
- Expressions inside JSX: Any valid JavaScript expression can be embedded inside curly braces '{ expression }'.
- Rules of JSX:
  1. Return a single root element (or use a Fragment '<>...</>').
  2. Close all tags (e.g. '<input />', '<img />').
  3. Use camelCase attributes ('className' instead of 'class', 'htmlFor' instead of 'for', 'tabIndex').

Props (Properties):
Arguments passed into React components, similar to HTML attributes.
- Props are strictly read-only (immutable): A component must never mutate its own props.
- Unidirectional Data Flow: Data flows strictly down from parent to child via props. When a child needs to notify a parent of an event, it calls a callback function passed down as a prop.`,
      concepts: [
        {
          name: 'The Declarative Reconciliation Loop',
          description: 'How state changes trigger virtual DOM comparisons and real DOM updates.',
          diagram: `[State / Props Change]
         │
         ▼
[Component Function Reruns] ──► Generates New Virtual DOM Tree
         │
         ▼
[Reconciliation / Diffing]  ──► Compares New Tree with Previous Tree
         │
         ▼
[Commit Phase]              ──► Batched minimal updates written to Real Browser DOM`
        }
      ],
      codeExamples: [
        {
          language: 'tsx',
          title: 'Configurable React Component with TypeScript Props',
          code: `import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  changePercentage: number;
  trend: 'up' | 'down' | 'neutral';
  onInspect?: () => void;
}

export function MetricCard({
  label,
  value,
  changePercentage,
  trend,
  onInspect
}: MetricCardProps) {
  const isPositive = trend === 'up';

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <span
          className={\`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium \${
            isPositive
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-rose-500/10 text-rose-400'
          }\`}
        >
          {isPositive ? '+' : ''}{changePercentage}%
        </span>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <p className="text-2xl font-bold tracking-tight text-white tabular-nums">
          {value}
        </p>

        {onInspect && (
          <button
            type="button"
            onClick={onInspect}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Inspect details &rarr;
          </button>
        )}
      </div>
    </article>
  );
}`,
          explanation: 'Demonstrates a clean, reusable React component: typed props interface, conditional styling based on trend, safe expression interpolation in JSX, and optional callback invocation on click.'
        }
      ],
      realWorldExample: {
        scenario: 'Large scale design system at Airbnb or Meta',
        industryApplication: 'Design system engineers publish atomic components (`<Button>`, `<Modal>`, `<TextInput>`) used by hundreds of feature teams. By keeping components pure and configurable via props, an entire application maintains consistent branding and accessibility standards.',
        takeaway: 'Props make components predictable, reusable building blocks.'
      },
      practicalExercise: {
        title: 'Deconstruct a Product Card into Composable React Components',
        objective: 'Split a monolithic JSX snippet into `<ProductImage>`, `<ProductDetails>`, and `<ProductPrice>` sub-components.',
        requirements: ['React environment'],
        steps: [
          'Create a parent `<ProductCard>` component accepting a product object prop.',
          'Extract the image rendering into a child component that handles missing image fallbacks.',
          'Extract pricing into a child component that calculates discounts.',
          'Assemble the parent component using composition: `<ProductCard><ProductImage .../><ProductDetails .../></ProductCard>`.'
        ],
        expectedResult: 'A clean, modular component tree where each sub-component has a single responsibility.'
      },
      commonMistakes: [
        {
          mistake: 'Directly modifying a prop inside a child component (e.g. `props.count = 5`).',
          whyItHappens: 'Treating props like standard mutable JavaScript object properties.',
          howToFix: 'Props are strictly read-only. If a child needs to change a value, the parent must pass down an updater function (e.g., `onCountChange={(newVal) => setCount(newVal)}`).'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm08-l1-q1',
          type: 'multiple-choice',
          question: 'Why can a React component function return only ONE top-level root element?',
          options: [
            'Web browsers can only render one element at a time',
            'JSX translates into `React.createElement()` function calls; a JavaScript function can only return a single value/object without wrapping or Fragments (`<>...</>`)',
            'Tailwind CSS requires single roots',
            'It is a restriction imposed by the HTML5 validator'
          ],
          correctAnswerIndex: 1,
          explanation: 'Behind the scenes, JSX compiles into function calls like `React.createElement(...)`. A function can only return one value, so multiple siblings must be wrapped in a container or Fragment.'
        }
      ],
      summary: [
        'React uses declarative components that compute what the UI should look like based on state.',
        'JSX combines markup and JavaScript expressions within curly braces.',
        'Props pass immutable data down from parent to child; events flow back up via callbacks.'
      ],
      additionalResources: [
        {
          name: 'React Official Documentation (react.dev)',
          description: 'The modern, interactive official guide to React.',
          url: 'https://react.dev/learn',
          usefulFor: 'Learning components, passing props, and conditional rendering.'
        }
      ]
    },
    {
      id: 'm08-l02',
      number: 2,
      title: 'State Management with useState & Side-Effects with useEffect',
      durationMinutes: 65,
      learningObjectives: [
        'Manage component memory and trigger re-renders using the `useState` hook.',
        'Update state immutably, especially when dealing with objects and arrays.',
        'Use functional state updates (`setCount(prev => prev + 1)`) to avoid stale closure bugs.',
        'Synchronize components with external systems (fetching data, timers) using `useEffect`.',
        'Configure the `useEffect` dependency array accurately and implement cleanup functions.'
      ],
      introduction: 'Props allow a component to receive data from its parent, but to make an interface truly interactive—handling typing, toggling menus, or fetching data—components need their own private memory: State. Managing state and orchestrating side-effects are the core responsibilities of a React developer.',
      detailedNotes: `The useState Hook:
'const [state, setState] = useState(initialValue);'
- Calling 'setState(newValue)' schedules a re-render of the component with the new state value.
- State is preserved across re-renders by React’s internal fiber nodes.

Immutable State Updates:
Never mutate state directly!
- Wrong: 'todos.push(newTodo); setTodos(todos);' (React sees the same array reference and will NOT re-render!).
- Right: 'setTodos([...todos, newTodo]);' (Creates a new array reference).
- Updating an object: 'setUser(prev => ({ ...prev, name: 'Alice' }));'

The useEffect Hook:
'useEffect(setupFunction, dependencyArray);'
Lets you synchronize a component with an external system (outside React’s rendering flow).
- Dependency Array scenarios:
  1. No dependency array ('useEffect(() => {})'): Runs after EVERY render. (Rarely desired).
  2. Empty array ('useEffect(() => {}, [])'): Runs ONCE when the component mounts. (Ideal for initial data fetches).
  3. With dependencies ('useEffect(() => {}, [userId, query])'): Runs on mount AND whenever 'userId' or 'query' changes.
- Cleanup Function:
  If the effect subscribes to a WebSocket, sets an interval timer, or adds a window event listener, the effect MUST return a cleanup function to prevent memory leaks when the component unmounts.`,
      concepts: [
        {
          name: 'The Lifecycle of a useEffect Side-Effect',
          description: 'Mounting, updating, and cleanup execution order.',
          diagram: `[Component Mounts] ──► Runs Effect Callback
        │
        ▼ (Dependencies change)
[Component Updates] ──► (1) Runs Cleanup of Previous Effect
                    ──► (2) Runs New Effect Callback
        │
        ▼
[Component Unmounts] ──► Runs Final Cleanup Function (Clears timers/listeners)`
        }
      ],
      codeExamples: [
        {
          language: 'tsx',
          title: 'Complete Controlled Search & Data Fetching Component',
          code: `import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
}

export function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Synchronize with external API on mount
  useEffect(() => {
    let isCancelled = false; // Prevents updating state if unmounted
    setIsLoading(true);

    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP Error \${res.status}\`);
        return res.json();
      })
      .then((data: Product[]) => {
        if (!isCancelled) {
          setProducts(data);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch');
          setIsLoading(false);
        }
      });

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, []); // Empty array = mount only

  // Derived state (no extra state variable needed!)
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Controlled Input */}
      <input
        type="search"
        placeholder="Filter products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white mb-6"
      />

      {isLoading && <p className="text-slate-400">Loading catalog...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
            <h4 className="font-semibold text-white truncate">{product.title}</h4>
            <p className="text-indigo-400 font-mono mt-2">\${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
          explanation: 'Demonstrates core React patterns: controlled search input, useEffect with cancellation cleanup, derived state computation without redundant useState, and mapping lists with stable key attributes.'
        }
      ],
      realWorldExample: {
        scenario: 'Debounced search typeahead with race-condition prevention',
        industryApplication: 'When users type in a search bar, multiple API requests fire in rapid succession. Without proper cleanup or AbortController in useEffect, a slow older request can resolve after a newer faster request, overwriting current results with stale data.',
        takeaway: 'Proper useEffect cleanup functions guarantee that in-flight network requests do not corrupt active state.'
      },
      practicalExercise: {
        title: 'Build a Live Digital Clock Component with Window Resize Tracker',
        objective: 'Practice setting up and cleaning up interval timers and window event listeners in useEffect.',
        requirements: ['React project'],
        steps: [
          'Create a component `<SystemStatus />` that stores `currentTime` and `windowWidth` in state.',
          'In useEffect, set an interval updating `currentTime` every 1,000ms. In the cleanup function, call `clearInterval()`.',
          'In another useEffect, attach a `"resize"` listener to `window` updating `windowWidth`. In the cleanup, call `window.removeEventListener()`.',
          'Unmount and remount the component in a parent toggle to verify zero memory leaks in the console.'
        ],
        expectedResult: 'A live updating time and viewport tracker that cleanly tears down subscriptions on unmount.'
      },
      commonMistakes: [
        {
          mistake: 'Putting state variables that are read inside useEffect into the dependency array without thinking, causing an infinite render loop.',
          whyItHappens: 'If an effect updates state `setCount(count + 1)` and depends on `[count]`, the state change triggers a re-render, which triggers the effect, which updates state forever.',
          howToFix: 'Use functional state updates `setCount(prev => prev + 1)` to eliminate the state variable from the effect dependency array.'
        },
        {
          mistake: 'Using array index as a `key` prop in dynamic lists (`key={index}`).',
          whyItHappens: 'Quick shortcut when an object does not have an obvious ID.',
          howToFix: 'Never use array index for lists where items can be reordered, inserted, or deleted; it confuses React’s reconciliation algorithm, causing form inputs or focus to jump to the wrong row. Always use stable unique IDs (`key={item.id}`).'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm08-l2-q1',
          type: 'multiple-choice',
          question: 'What is the consequence of passing an empty dependency array `[]` to `useEffect`?',
          options: [
            'The effect never runs',
            'The effect runs once when the component initially mounts and never runs on subsequent re-renders',
            'The effect causes an infinite loop',
            'The component cannot render'
          ],
          correctAnswerIndex: 1,
          explanation: 'An empty dependency array indicates that the effect depends on zero reactive values from component scope, so it runs strictly once on mount.'
        }
      ],
      summary: [
        'useState gives components private reactive memory; always update state immutably.',
        'useEffect synchronizes with external systems; always supply accurate dependencies and cleanup functions.',
        'Compute derived data during render rather than synchronizing redundant state variables.'
      ],
      additionalResources: [
        {
          name: 'React Docs: Synchronizing with Effects',
          description: 'The definitive guide to when and how to use useEffect correctly.',
          url: 'https://react.dev/learn/synchronizing-with-effects',
          usefulFor: 'Understanding effect lifecycles, dependencies, and cleanup.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm08-lab-1',
      title: 'Lab 8.1: Interactive Shopping Cart State Machine',
      durationMinutes: 60,
      objective: 'Build an immutable shopping cart manager supporting item addition, quantity adjustments, item removal, and subtotal calculation in React.',
      prerequisites: ['Module 07 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Design Cart Item Model and Actions',
          instructions: 'Define cart state as an array of items with quantity:',
          code: `interface CartItem { id: string; name: string; price: number; qty: number; }
// Increment quantity immutably
setCart(prev => prev.map(item => 
  item.id === targetId ? { ...item, qty: item.qty + 1 } : item
));`
        }
      ],
      verificationChecklist: [
        'Adding existing item increments quantity rather than duplicating row',
        'Decreasing quantity to 0 removes item from cart',
        'Subtotal, taxes, and grand total compute accurately using useMemo or derived variables'
      ],
      deliverables: ['Working React shopping cart component with test suite']
    }
  ],
  moduleProject: {
    id: 'm08-project',
    title: 'React E-Commerce Frontend Platform (Complete Client App)',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    overview: 'Build a production-grade, highly responsive E-Commerce Frontend application using React. The application features a dynamic product catalog, category tabs, real-time keyword search, sorting controls (price low-high, high-low, rating), a detailed product drawer or modal view, an interactive slide-over Shopping Cart with quantity controls and promo code calculation, and responsive mobile-first navigation. NOTE: This is strictly an educational frontend React project and does not implement real payment gateways or backend databases.',
    requirements: [
      'Componentized React architecture: ProductGrid, ProductCard, CartDrawer, SearchBar, CategoryFilter, and Navbar',
      'Dynamic catalog rendering from a mock or public API dataset (at least 12 distinct products with titles, categories, ratings, images, and prices)',
      'Search and Filter controls: Instant search filtering by title, category pill filtering, and price range sorting',
      'Shopping Cart state management: Add to cart, adjust quantities (+/-), remove item, clear cart, and calculate subtotal/taxes',
      'Cart slide-over drawer: Animated panel opening from screen edge with backdrop blur',
      'Zero DOM mutations outside React rendering; 100% immutable state operations'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Catalog Data & Shell Components',
        tasks: ['Model product types', 'Build Navbar and ProductCard components']
      },
      {
        milestone: 2,
        title: 'Search & Category Filtering Engine',
        tasks: ['Implement search input state', 'Add category filtering and price sorting']
      },
      {
        milestone: 3,
        title: 'Interactive Shopping Cart Drawer',
        tasks: ['Build cart state with addItem, updateQty, removeItem', 'Create slide-over cart UI']
      },
      {
        milestone: 4,
        title: 'Product Quick-View Modal & Polish',
        tasks: ['Add product detail modal', 'Audit accessibility and test responsive behavior']
      }
    ],
    starterCodeStructure: [
      {
        path: 'ecommerce-app/src/App.tsx',
        description: 'Main application container orchestrating catalog and cart state',
        sampleContent: `import React, { useState } from 'react';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation, Catalog, and Cart Drawer */}
    </div>
  );
}`
      }
    ],
    acceptanceCriteria: [
      'Users can search, filter by category, sort by price, and inspect product details',
      'Adding products correctly updates cart quantity and floating badge count in the header',
      'Cart drawer allows incrementing/decrementing quantities with live price recalculation',
      'Zero console errors, warnings, or missing key prop alerts'
    ],
    rubric: [
      { criteria: 'Component Architecture & Props', points: 30, description: 'Clean decomposition into modular, single-responsibility components' },
      { criteria: 'State Management & Immutability', points: 30, description: 'Robust cart and filter state manipulation with zero direct mutations' },
      { criteria: 'Cart & Interactivity Polish', points: 25, description: 'Seamless slide-over cart drawer with accurate subtotal calculations' },
      { criteria: 'Responsive Design & Accessibility', points: 15, description: 'Fluid layout on mobile/desktop, accessible keyboard controls, and visible focus rings' }
    ]
  },
  quiz: [
    {
      id: 'm08-qz-01',
      question: 'Why should you NOT call `useState` conditionally inside an `if` statement?',
      options: [
        'It causes the CSS styles to fail',
        'React relies on the order in which Hooks are called across re-renders to track which state belongs to which hook; conditional hooks break the call order',
        'JavaScript does not support if statements inside functions',
        'It is an HTML5 validator violation'
      ],
      correctAnswerIndex: 1,
      explanation: 'The Rules of Hooks mandate calling hooks at the top level because React tracks hook state by internal index order across renders.'
    },
    {
      id: 'm08-qz-02',
      question: 'How should you update an object stored in state `const [user, setUser] = useState({ name: "Alex", role: "Dev" })` so that only `role` changes?',
      options: [
        'user.role = "Lead"; setUser(user);',
        'setUser(prev => ({ ...prev, role: "Lead" }));',
        'setUser({ role: "Lead" });',
        'delete user.role; user.role = "Lead";'
      ],
      correctAnswerIndex: 1,
      explanation: 'Using the spread operator `{ ...prev, role: "Lead" }` creates a new object preserving existing fields while overriding role immutably.'
    },
    {
      id: 'm08-qz-03',
      question: 'What is a "Controlled Component" in React?',
      options: [
        'A component that is controlled by a remote server via WebSockets',
        'A form input whose current value is driven directly by React state via `value={state}` and `onChange={e => setState(...)}`',
        'A component that cannot be deleted',
        'A component with no props'
      ],
      correctAnswerIndex: 1,
      explanation: 'A controlled component ties an input’s display value directly to React state, making React the single source of truth.'
    }
  ],
  assignment: {
    id: 'm08-assign',
    title: 'Module 08 Assignment: Multi-Step Interactive Checkout Form',
    problemStatement: 'Construct a 3-step checkout form in React (Step 1: Shipping Address, Step 2: Delivery Speed Options, Step 3: Order Review & Confirmation). The application must maintain current step index, validate required fields before allowing progression to the next step, allow users to navigate back to previous steps to edit information, and summarize all entered details on the final confirmation screen.',
    specifications: [
      'Single parent state holding all form fields across steps',
      'Step progress bar indicating Step 1 of 3 with visual indicators',
      'Validation preventing advancing to Step 2 if required address fields are blank',
      'Back button on Steps 2 and 3 that preserves previously entered inputs'
    ],
    deliverables: ['React component suite demonstrating multi-step form state management.'],
    evaluationRubric: [
      { category: 'State Orchestration', weight: '40%', description: 'Preserving form data cleanly across step transitions' },
      { category: 'Validation & Gatekeeping', weight: '35%', description: 'Preventing progression when required inputs are missing' },
      { category: 'UX & Accessibility', weight: '25%', description: 'Clear step progression, back navigation, and final summary presentation' }
    ],
    submissionFormat: 'Repository code submission'
  },
  resources: [
    {
      name: 'React Official Documentation (react.dev)',
      description: 'The interactive documentation with deep dive guides.',
      url: 'https://react.dev/',
      usefulFor: 'Rules of Hooks, state management, and component lifecycles.'
    }
  ],
  summary: 'Module 08 delivered comprehensive training in React fundamentals: component decomposition, JSX, Props, immutable state updates with useState, side-effect synchronization with useEffect, list rendering with keys, and controlled form inputs.'
};
