import { Module } from '../../types/course';

export const module05Javascript: Module = {
  id: 'module-05',
  moduleNumber: 5,
  title: 'JavaScript Fundamentals & DOM Manipulation',
  slug: 'javascript-fundamentals',
  durationWeeks: 'Week 5',
  level: 'Beginner → Intermediate',
  phase: 'Phase 2: Modern Frontend',
  overview: {
    whatItTeaches: 'Core programming concepts in JavaScript (ECMAScript): variables (let, const), data types, control flow, loops, functions, lexical scope, Document Object Model (DOM) traversal and manipulation, event handling, form validation, error handling with try/catch, and client-side data persistence with localStorage.',
    whyItMatters: 'HTML gives structure and CSS provides styling, but JavaScript is the programming language of the web that brings applications to life. Mastering core syntax, execution flow, and DOM manipulation is mandatory before tackling advanced frameworks like React.',
    prerequisites: ['Module 02: HTML5', 'Module 03: CSS'],
    estimatedHours: 18,
    skillsAcquired: [
      'Declaring immutable and mutable data using const and let with block scoping',
      'Operating on primitives (string, number, boolean, null, undefined) and reference types (objects, arrays)',
      'Structuring conditional logic and loops (if/else, switch, for...of, while)',
      'Writing pure functions, understanding return values, parameters, and arrow functions',
      'Querying, updating, creating, and removing DOM elements dynamically (`querySelector`, `createElement`, `appendChild`)',
      'Attaching event listeners, managing event bubbling and event delegation (`addEventListener`, `event.target`)',
      'Persisting and serializing state using browser `localStorage` and `JSON.stringify`/`parse`'
    ]
  },
  lessons: [
    {
      id: 'm05-l01',
      number: 1,
      title: 'Variables, Types, Operators & Lexical Scope',
      durationMinutes: 50,
      learningObjectives: [
        'Differentiate between `const`, `let`, and legacy `var` in terms of hoisting and block scoping.',
        'Distinguish primitive values (immutable, passed by value) from reference objects (mutable, passed by reference).',
        'Use strict equality (`===`) instead of loose equality (`==`) to avoid type coercion pitfalls.',
        'Trace lexical variable scope from inner blocks to outer and global scopes.'
      ],
      introduction: 'JavaScript is a dynamically typed, prototype-based, single-threaded programming language. Understanding how JavaScript manages memory, variable scoping, and data types prevents the most common bugs in modern web applications.',
      detailedNotes: `Variable Declarations:
- 'const': Declares a block-scoped constant reference. Must be initialized immediately and cannot be reassigned. (Default choice for 95% of variables).
- 'let': Declares a block-scoped mutable variable. Reassignable, useful for counters and accumulator loops.
- 'var': Legacy function-scoped declaration. Prone to bugs due to variable hoisting. Avoid in modern code.

Data Types in JavaScript:
1. Primitives (stored directly in execution stack):
   - 'string': e.g. "Full-Stack Development"
   - 'number': 64-bit float (IEEE 754), e.g. 42, 3.14
   - 'boolean': true / false
   - 'null': intentional absence of an object value
   - 'undefined': variable declared but not assigned a value
   - 'symbol' & 'bigint'
2. Reference Types (stored in memory heap; variable holds a memory address pointer):
   - 'Object': { id: 1, name: "Node.js" }
   - 'Array': [1, 2, 3]
   - 'Function': () => {}

Equality and Coercion:
- '==' (Loose Equality): Attempts implicit type conversion before comparison ('"5" == 5' returns true). Dangerous!
- '===' (Strict Equality): Checks both type and value without coercion ('"5" === 5' returns false). Always use strict equality.`,
      concepts: [
        {
          name: 'Primitives vs Reference Types',
          description: 'Memory allocation and mutation mechanics.',
          comparison: {
            itemA: 'Primitive (Pass by Value)',
            itemB: 'Reference (Pass by Pointer)',
            distinction: 'Reassigning a primitive copies the literal value; mutating an object or array alters the underlying heap memory, reflecting changes across all variables holding that reference.'
          },
          table: {
            headers: ['Keyword', 'Scope', 'Reassignable?', 'Hoisted?', 'Temporal Dead Zone?'],
            rows: [
              ['const', 'Block { }', 'No (frozen reference)', 'Yes (uninitialized)', 'Yes'],
              ['let', 'Block { }', 'Yes', 'Yes (uninitialized)', 'Yes'],
              ['var (legacy)', 'Function / Global', 'Yes', 'Yes (initialized undefined)', 'No (dangerous)']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'javascript',
          title: 'Reference Mutation vs Immutability',
          code: `// 1. Primitive copy (pass by value)
let scoreA = 100;
let scoreB = scoreA;
scoreB = 150;
console.log(scoreA); // Output: 100 (Unchanged!)

// 2. Reference mutation (pass by reference)
const userA = { name: "Sarah", role: "Engineer" };
const userB = userA; // Both point to identical memory address in heap
userB.role = "Lead Architect";
console.log(userA.role); // Output: "Lead Architect" (Mutated!)

// 3. Immutability via shallow copy (Modern pattern)
const userC = { ...userA, role: "Principal Engineer" };
console.log(userA.role); // "Lead Architect"
console.log(userC.role); // "Principal Engineer" (Safe!)`,
          explanation: 'Using the spread operator {...userA} creates a shallow copy, preventing accidental mutations of the original object.'
        }
      ],
      realWorldExample: {
        scenario: 'State mutation bug in shopping cart calculations',
        industryApplication: 'Directly mutating an existing cart array (`cart.push(item)`) instead of creating a new copy causes React or frontend state engines to fail to detect changes, resulting in checkout screens showing stale prices.',
        takeaway: 'Adopting immutable data patterns prevents silent state synchronization bugs.'
      },
      practicalExercise: {
        title: 'Deep Copy vs Shallow Copy Experiment',
        objective: 'Observe how nested objects behave during spread copying vs JSON cloning.',
        requirements: ['Browser DevTools Console or Node.js REPL'],
        steps: [
          'Create an object: `const config = { app: "API", details: { port: 3000 } };`.',
          'Make a shallow copy using spread: `const shallow = { ...config };`.',
          'Mutate `shallow.details.port = 8080;`. Check `config.details.port` (it changed to 8080!).',
          'Now create a deep copy using structuredClone: `const deep = structuredClone(config);`.',
          'Mutate `deep.details.port = 9000;`. Check `config.details.port` (it remains 8080!).'
        ],
        expectedResult: 'You will understand why nested reference types require deep cloning or immutable updates.'
      },
      commonMistakes: [
        {
          mistake: 'Using `var` inside a for-loop and expecting loop-scoped variables inside asynchronous callbacks.',
          whyItHappens: 'Because `var` is function-scoped, the variable leaks and is overwritten on every iteration.',
          howToFix: 'Always use `let` or `const`, which provide true block scoping within `{}` blocks.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm05-l1-q1',
          type: 'code-analysis',
          question: 'What is the evaluated output of `typeof null` in JavaScript?',
          options: ['"null"', '"undefined"', '"object"', '"boolean"'],
          correctAnswerIndex: 2,
          explanation: '`typeof null === "object"` is a famous historical bug in the original 1995 JavaScript engine that persists today for backwards compatibility.'
        },
        {
          id: 'm05-l1-q2',
          type: 'multiple-choice',
          question: 'Why does `const arr = [1, 2]; arr.push(3);` succeed without throwing a TypeError?',
          options: [
            'push() is an asynchronous operation',
            '`const` prevents variable reassignment, but does not freeze the internal properties or contents of the referenced object/array',
            '`const` converts arrays into strings',
            'JavaScript ignores const rules for arrays'
          ],
          correctAnswerIndex: 1,
          explanation: '`const` locks the variable binding to that specific array instance in memory; it does not make the object deeply immutable.'
        }
      ],
      summary: [
        'Always default to `const`; use `let` only when reassignment is strictly necessary; eliminate `var`.',
        'Always use strict equality (`===`) to avoid silent type conversion bugs.',
        'Understand that primitives pass by value, while objects and arrays pass by reference.'
      ],
      additionalResources: [
        {
          name: 'MDN JavaScript Data Types and Structures',
          description: 'Official guide to language primitives and memory types.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures',
          usefulFor: 'Understanding IEEE 754 numbers, Symbol, and BigInt.'
        }
      ]
    },
    {
      id: 'm05-l02',
      number: 2,
      title: 'DOM Manipulation, Event Handling & LocalStorage',
      durationMinutes: 60,
      learningObjectives: [
        'Query DOM nodes safely using `document.querySelector` and `document.querySelectorAll`.',
        'Create and attach new elements using `document.createElement`, `textContent`, and `appendChild`.',
        'Attach click, submit, and input event handlers via `addEventListener`.',
        'Implement event delegation to handle dynamic list items efficiently.',
        'Persist and retrieve structured data across browser refreshes using `localStorage` and JSON methods.'
      ],
      introduction: 'The Document Object Model (DOM) is an object-oriented tree representation of the HTML document. JavaScript interacts with this tree to read user inputs, update text, animate UI elements, and handle user clicks.',
      detailedNotes: `Querying the DOM:
- 'document.querySelector(".target")': Returns the first matching Element node or null.
- 'document.querySelectorAll(".item")': Returns a static NodeList of all matching elements (iterable with forEach).

Updating the DOM:
- 'element.textContent = "Safe Text"': Safe method to update text (prevents XSS vulnerabilities).
- 'element.innerHTML = "<p>...</p>"': Parses string into HTML elements. Danger: Never use with untrusted user input without sanitization!
- 'element.classList.add("hidden") / .remove("hidden") / .toggle("active")': Modifies CSS classes cleanly.

Creating Elements Programmatically:
const card = document.createElement('div');
card.className = 'p-4 bg-slate-900 rounded-lg';
card.textContent = 'Dynamically generated card';
document.getElementById('container').appendChild(card);

Event Handling and Delegation:
When an event fires (e.g. click), it travels in two phases: Capture (top down) and Bubbling (bottom up).
Event Delegation leverages bubbling: instead of attaching 1,000 event listeners to 1,000 list items, you attach a single listener to the parent '<ul>' and inspect 'event.target'.

Client-Side Persistence (LocalStorage):
- 'localStorage.setItem(key, value)': Stores a string value.
- 'localStorage.getItem(key)': Retrieves a string value or null.
- Storing objects requires JSON serialization:
  'localStorage.setItem("tasks", JSON.stringify(tasksArray));'
  'const tasks = JSON.parse(localStorage.getItem("tasks")) || [];'`,
      concepts: [
        {
          name: 'Event Bubbling and Event Delegation',
          description: 'How browser events propagate up the DOM tree.',
          diagram: `[Document Root]
      ▲ (3. Bubbles up to Window)
[Parent <ul id="task-list">]  ◄── Event Listener attached HERE (Delegation)
      ▲ (2. Bubbles up to parent)
[Child <li class="task-item">]
      ▲ (1. Click event triggered on button)
[Button <button class="delete-btn">]`
        }
      ],
      codeExamples: [
        {
          language: 'javascript',
          title: 'Complete LocalStorage To-Do Controller with Event Delegation',
          code: `// Application State
let todos = JSON.parse(localStorage.getItem('todos_app')) || [];

// DOM Element References
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Save State to LocalStorage
function persist() {
  localStorage.setItem('todos_app', JSON.stringify(todos));
}

// Render DOM Tree
function render() {
  list.innerHTML = ''; // Clear existing items

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'flex items-center justify-between p-3 bg-slate-800 rounded mb-2';
    
    // Safe text injection
    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) span.className = 'line-through text-slate-500';

    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.className = 'delete-btn px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded';
    btn.dataset.index = index;

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// Add Item Handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  input.value = '';
  persist();
  render();
});

// Event Delegation for Deleting Items
list.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    const index = Number(e.target.dataset.index);
    todos.splice(index, 1);
    persist();
    render();
  }
});

// Initial Render
render();`,
          explanation: 'Demonstrates complete CRUD cycle: form submission with e.preventDefault(), programmatic DOM creation, event delegation on the parent list, and state persistence with localStorage.'
        }
      ],
      realWorldExample: {
        scenario: 'High-performance interactive data tables',
        industryApplication: 'In a real-time analytics table with 5,000 rows, attaching individual click handlers to every row button causes noticeable memory consumption and stutter. Using event delegation on the table body handles all row clicks with a single listener.',
        takeaway: 'Event delegation dramatically improves runtime memory efficiency.'
      },
      practicalExercise: {
        title: 'Build an Interactive Counter with LocalStorage',
        objective: 'Construct an increment/decrement counter that remembers its value after page refresh.',
        requirements: ['HTML file with two buttons (+ and -) and an `<h2>` display'],
        steps: [
          'Read starting count from `localStorage.getItem("counter_val") || 0`.',
          'Display current count in the `<h2>`.',
          'Add click listeners to increment and decrement buttons, updating the DOM and localStorage on every click.',
          'Add a "Reset" button that clears the stored key with `localStorage.removeItem("counter_val")`.'
        ],
        expectedResult: 'Reloading or closing and reopening the browser retains the exact counter value.'
      },
      commonMistakes: [
        {
          mistake: 'Passing an object directly to `localStorage.setItem("user", userObj)` without stringifying.',
          whyItHappens: 'LocalStorage only accepts strings; passing an object converts it into the string `"[object Object]"`.',
          howToFix: 'Always wrap objects in `JSON.stringify(userObj)` when saving, and `JSON.parse(...)` when reading.'
        },
        {
          mistake: 'Forgetting `event.preventDefault()` inside a form submit listener.',
          whyItHappens: 'The browser default form action is to submit an HTTP GET/POST and reload the page, immediately clearing your JavaScript state.',
          howToFix: 'Always invoke `e.preventDefault()` at the top of your form submit callback.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm05-l2-q1',
          type: 'multiple-choice',
          question: 'What is the primary benefit of Event Delegation in JavaScript DOM programming?',
          options: [
            'It enables GPU 3D acceleration',
            'It allows one event listener on a parent element to handle events from many current or dynamically added child elements via event bubbling',
            'It prevents the user from clicking links',
            'It encrypts browser passwords'
          ],
          correctAnswerIndex: 1,
          explanation: 'Event delegation leverages event bubbling to handle actions from many child items with a single parent listener.'
        }
      ],
      summary: [
        'Query the DOM using querySelector; modify text safely using textContent.',
        'Use addEventListener with event.preventDefault() to handle form submissions without page reloads.',
        'Persist application state across browser reloads using localStorage with JSON serialization.'
      ],
      additionalResources: [
        {
          name: 'MDN Web Docs: Introduction to the DOM',
          description: 'Official Mozilla guide to the DOM tree and node interfaces.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction',
          usefulFor: 'Mastering Element, Node, and Document APIs.'
        }
      ]
    },
    {
      id: 'm05-l03',
      number: 3,
      title: 'Modern ECMAScript (ES2020–ES2024) & Performance Web APIs',
      durationMinutes: 65,
      learningObjectives: [
        'Utilize modern operators (`?.`, `??`, `&&=`, `||=`, `??=`) for safe evaluation and logical assignments.',
        'Perform native deep object cloning using `structuredClone()` and group arrays with `Object.groupBy()`.',
        'Employ `WeakMap` and `WeakSet` to associate metadata with objects without causing memory leaks.',
        'Implement scroll-driven animations and image lazy-loading using the high-performance `IntersectionObserver` API.'
      ],
      introduction: 'JavaScript continues to evolve annually through the TC39 standards committee. Modern ECMAScript (ES2020 through ES2024) introduced expressive syntax that eliminates hundreds of lines of defensive boilerplate checks and memory management pitfalls.',
      detailedNotes: `Modern ECMAScript Operators:
1. Optional Chaining ('?.'):
   Short-circuits returning 'undefined' if an intermediate property is 'null' or 'undefined'.
   - 'const city = user?.address?.city;'
   - 'const result = callback?.();'
2. Nullish Coalescing Operator ('??'):
   Returns the right-hand operand only when the left-hand operand is 'null' or 'undefined' (unlike '||', which also falls back for '0', 'false', and '""').
3. Logical Assignment Operators:
   - 'x ??= defaultValue;' (assigns only if x is null or undefined).
   - 'x ||= fallback;' (assigns if x is falsy).
   - 'x &&= modifier;' (assigns if x is truthy).

Deep Object Cloning with structuredClone():
Historically, developers used 'JSON.parse(JSON.stringify(obj))', which loses dates, regexes, Maps, Sets, and throws on circular references. Modern JavaScript provides 'structuredClone(obj)', which performs a true deep clone while correctly preserving complex types.

High-Performance Browser Web APIs:
- 'IntersectionObserver':
  Allows asynchronously observing changes in the intersection of a target element with an ancestor element or viewport. Replaces scroll listeners ('window.onscroll') which trigger severe browser layout thrashing and 60fps frame drops.
- 'Web Workers':
  Enables running heavy computation (e.g. image processing, cryptographic hashing) in background threads without freezing the main browser UI thread.`,
      concepts: [
        {
          name: 'Logical Operators vs Nullish Coalescing Comparison',
          description: 'Why `??` is mandatory for numeric and boolean configurations.',
          table: {
            headers: ['Expression', 'Result with `||`', 'Result with `??`', 'Explanation'],
            rows: [
              ['0 || 50 vs 0 ?? 50', '50 (Buggy fallback)', '0 (Correct)', '0 is falsy for ||, but defined for ??'],
              ['false || true vs false ?? true', 'true (Buggy fallback)', 'false (Correct)', 'false is falsy for ||, but defined for ??'],
              ['"" || "N/A" vs "" ?? "N/A"', '"N/A"', '""', 'Empty string preserved with ??'],
              ['null || 10 vs null ?? 10', '10', '10', 'Both fall back for null']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'javascript',
          title: 'Modern ES2020-ES2024 Operators & IntersectionObserver Demo',
          code: `// 1. Safe Navigation and Nullish Assignment
const serverSettings = {
  port: 0, // Port 0 means randomly assigned OS port
  retries: null
};

// With ||, port 0 would be overwritten to 3000! With ??, 0 is preserved:
const activePort = serverSettings.port ?? 3000;
console.log('Active Port:', activePort); // Output: 0

// Nullish Assignment
serverSettings.retries ??= 5;
console.log('Retries configured:', serverSettings.retries); // Output: 5

// 2. High-Performance IntersectionObserver for Scroll Animations
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target); // Fire once, eliminate memory overhead
      }
    });
  },
  {
    root: null, // Relative to viewport
    threshold: 0.15 // Trigger when 15% of element is visible
  }
);

document.querySelectorAll('.lesson-section').forEach(section => {
  revealObserver.observe(section);
});`,
          explanation: 'Demonstrates modern ES operators preserving legitimate zero/false values and using IntersectionObserver for lag-free scroll tracking without polling scroll events.'
        }
      ],
      realWorldExample: {
        scenario: 'Lag-free infinite scroll in social feeds and developer portals',
        industryApplication: 'Twitter and GitHub inspect scroll position using `IntersectionObserver` attached to an invisible bottom sentinel `<div>`. When the sentinel enters the viewport, the next batch of items is fetched without attaching performance-degrading scroll listeners.',
        takeaway: 'IntersectionObserver eliminates main-thread CPU spikes during page scrolling.'
      },
      practicalExercise: {
        title: 'Build a Lag-Free Image Lazy-Loader with IntersectionObserver',
        objective: 'Construct an image lazy-loader that swaps `data-src` into `src` only when an image scrolls near the viewport.',
        requirements: ['HTML page with 5 placeholder images'],
        steps: [
          'Create 5 `<img data-src="real-image.jpg" src="placeholder-blur.jpg" class="lazy-load">` elements.',
          'Create an `IntersectionObserver` with `rootMargin: "200px"` so images load 200px before reaching the screen.',
          'When intersecting, set `img.src = img.dataset.src` and unobserve the image.',
          'Scroll down in DevTools Network tab to observe images downloading just in time.'
        ],
        expectedResult: 'Images download on-demand as you scroll rather than all 5 blocking the initial page load.'
      },
      commonMistakes: [
        {
          mistake: 'Using `window.addEventListener("scroll", ...)` without requestAnimationFrame or throttling.',
          whyItHappens: 'Scroll events fire dozens of times per second, recalculating DOM layout (layout thrashing) and causing page stutter.',
          howToFix: 'Use `IntersectionObserver` for element visibility tracking; it runs asynchronously outside the main render loop.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm05-l3-q1',
          type: 'code-analysis',
          question: 'What is the evaluated result of `const limit = 0; const final = limit ?? 25;`?',
          options: ['25', '0', 'undefined', 'NaN'],
          correctAnswerIndex: 1,
          explanation: 'Nullish coalescing (??) only checks for null or undefined; 0 is a defined number, so it is preserved.'
        }
      ],
      summary: [
        'Use ?. and ?? for defensive programming without verbose if-statements.',
        'Use structuredClone() for true deep copying without JSON serialization bugs.',
        'IntersectionObserver delivers 60fps scroll-based triggers without layout thrashing.'
      ],
      additionalResources: [
        {
          name: 'MDN: Intersection Observer API',
          description: 'Official technical specification and examples.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API',
          usefulFor: 'Mastering rootMargin, thresholds, and lazy loading.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm05-lab-1',
      title: 'Lab 5.1: Form Validation & Interactive State Machine',
      durationMinutes: 60,
      objective: 'Build a client-side form validation script that displays real-time inline errors and disables submit buttons until all criteria pass.',
      prerequisites: ['Module 04 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Capture Input Events in Real Time',
          instructions: 'Listen to input events on password and email fields:',
          code: `const email = document.getElementById('email');
email.addEventListener('input', () => {
  const isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value);
  document.getElementById('email-error').textContent = isValid ? '' : 'Please enter a valid email.';
});`
        }
      ],
      verificationChecklist: [
        'Form prevents submission if any required field is invalid',
        'Error messages dynamically appear and clear on input events',
        'Valid states update button disabled attribute'
      ],
      deliverables: ['Validated form code and demonstration of error handling']
    }
  ],
  moduleProject: {
    id: 'm05-project',
    title: 'Progressive JavaScript Suite: Calculator, To-Do App & Expense Tracker',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    overview: 'Build a suite of three progressively challenging client-side JavaScript applications that solidify programming fundamentals: (1) An interactive mathematical Calculator supporting chained operations, decimal points, and clear functions; (2) A full-featured To-Do Application with task categories, filter tabs (All, Active, Completed), and localStorage persistence; (3) A comprehensive personal Expense Tracker that calculates running balances, income vs expense breakdowns, and stores transaction histories.',
    requirements: [
      'Project 1 (Calculator): Handles addition, subtraction, multiplication, division, decimal precision, backspace, and syntax error prevention (e.g., preventing two consecutive operators)',
      'Project 2 (To-Do App): Supports adding tasks, toggling completion, inline editing or deletion, filter tabs, and full localStorage persistence',
      'Project 3 (Expense Tracker): Allows adding income/expense records with description, amount, and category; computes Total Balance, Total Income, and Total Expenses dynamically; renders formatted currency values with tabular-nums; persists records to localStorage',
      'Clean modular JavaScript architecture: separation of state, pure calculation functions, DOM rendering, and event handlers',
      'Zero console errors, robust input validation, and prevention of negative expense edge cases'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Project 1: Mathematical Calculator Engine',
        tasks: ['Build keyboard/grid UI', 'Implement calculation state machine', 'Handle decimal edge cases and division by zero']
      },
      {
        milestone: 2,
        title: 'Project 2: Categorized To-Do Application',
        tasks: ['Implement state array', 'Build render function with textContent', 'Add filter tabs and localStorage synchronization']
      },
      {
        milestone: 3,
        title: 'Project 3: Dynamic Expense Tracker',
        tasks: ['Implement balance arithmetic', 'Build transaction log with color-coded positive/negative rows', 'Add category filtering and reset options']
      }
    ],
    starterCodeStructure: [
      {
        path: 'expense-tracker/app.js',
        description: 'Expense tracker state controller',
        sampleContent: `// Pure state data model
let transactions = JSON.parse(localStorage.getItem('expenses_v1')) || [];

function calculateTotals(items) {
  const income = items
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = items
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);
  return { income, expense, balance: income - expense };
}`
      }
    ],
    acceptanceCriteria: [
      'All three applications run entirely in the browser without external dependencies',
      'All calculations are mathematically accurate and gracefully handle division by zero and invalid strings',
      'State is preserved across browser tabs and page reloads via localStorage'
    ],
    rubric: [
      { criteria: 'JavaScript Architecture & Clean Code', points: 35, description: 'Modular functions, immutability, meaningful names, zero global leaks' },
      { criteria: 'State & LocalStorage Sync', points: 25, description: 'Seamless JSON serialization and persistence without data corruption' },
      { criteria: 'DOM Manipulation & Event Handling', points: 20, description: 'Safe textContent usage, event delegation, and accessible controls' },
      { criteria: 'Edge Case & Error Handling', points: 20, description: 'Handling decimals, empty inputs, negative numbers, and boundary values' }
    ]
  },
  quiz: [
    {
      id: 'm05-qz-01',
      question: 'What is the key difference between `document.querySelector` and `document.querySelectorAll`?',
      options: [
        'querySelector only works with ID selectors',
        'querySelector returns the first matching Element node (or null); querySelectorAll returns a static NodeList of all matching elements',
        'querySelectorAll modifies the HTML document on the server',
        'querySelector is deprecated in ES6'
      ],
      correctAnswerIndex: 1,
      explanation: 'querySelector yields the first single match; querySelectorAll returns an iterable NodeList of all matches.'
    },
    {
      id: 'm05-qz-02',
      question: 'Why is `element.textContent` preferred over `element.innerHTML` when displaying untrusted user-submitted text?',
      options: [
        'textContent is slower but supports 3D graphics',
        'textContent treats all input as literal text, preventing Cross-Site Scripting (XSS) script injection attacks',
        'innerHTML only works with numbers',
        'textContent removes all CSS styles'
      ],
      correctAnswerIndex: 1,
      explanation: 'innerHTML parses HTML markup, which allows attackers to inject malicious <script> tags or onerror attributes (XSS). textContent renders characters safely as plain text.'
    },
    {
      id: 'm05-qz-03',
      question: 'What is the return value of `localStorage.getItem("nonExistentKey")`?',
      options: ['undefined', 'null', '"" (empty string)', 'false'],
      correctAnswerIndex: 1,
      explanation: 'When a requested key does not exist in localStorage, getItem() returns null.'
    },
    {
      id: 'm05-qz-04',
      question: 'In JavaScript arrays, which method mutates the original array by removing the last item and returning it?',
      options: ['slice()', 'pop()', 'filter()', 'map()'],
      correctAnswerIndex: 1,
      explanation: 'pop() mutates the array by removing the final element and returning that element.'
    }
  ],
  assignment: {
    id: 'm05-assign',
    title: 'Module 05 Assignment: Interactive Quiz Application with Persistent Scoring',
    problemStatement: 'Develop a complete client-side interactive quiz engine using vanilla JavaScript. The application must present a sequence of 5 multiple-choice questions one at a time, track the user’s score, provide immediate visual feedback on answer selection (green for correct, red for incorrect with an explanation), display a final score summary card at completion, and record the user’s highest score in localStorage.',
    specifications: [
      'Questions stored as an array of structured objects with question, options, correctIndex, and explanation',
      'Dynamic DOM updates without full page reloads',
      'A progress bar indicating current question number (e.g. Question 3 of 5)',
      'A "Play Again" button that resets state without clearing the stored high score'
    ],
    deliverables: ['`quiz.html`, `quiz.css`, and `quiz.js` files with complete working implementation.'],
    evaluationRubric: [
      { category: 'JavaScript Logic & Data Modeling', weight: '40%', description: 'Clean state machine controlling question transitions and score tallying' },
      { category: 'DOM Manipulation & Feedback', weight: '35%', description: 'Instant, clear visual feedback and dynamic summary generation' },
      { category: 'LocalStorage High-Score Sync', weight: '25%', description: 'Correct comparison and persistence of all-time high scores' }
    ],
    submissionFormat: 'Code files submitted in repository'
  },
  resources: [
    {
      name: 'MDN Web Docs: JavaScript Guide',
      description: 'The definitive technical guide to the JavaScript programming language.',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
      usefulFor: 'Grammar, control flow, functions, and object prototypes.'
    },
    {
      name: 'Eloquent JavaScript by Marijn Haverbeke',
      description: 'A modern introduction to programming and web architecture.',
      url: 'https://eloquentjavascript.net/',
      usefulFor: 'Deepening comprehension of functional programming and the DOM.'
    }
  ],
  summary: 'Module 05 covered JavaScript fundamentals: data types, immutability, scoping, control flow, DOM querying and creation, event delegation, and state persistence with localStorage. These foundational skills prepare you for asynchronous programming and modern REST APIs.'
};
