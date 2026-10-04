import { Module } from '../../types/course';

export const module06ModernJsApis: Module = {
  id: 'module-06',
  moduleNumber: 6,
  title: 'Modern JavaScript (ES6+) & REST APIs',
  slug: 'modern-javascript-rest-apis',
  durationWeeks: 'Week 6',
  level: 'Intermediate',
  phase: 'Phase 2: Modern Frontend',
  overview: {
    whatItTeaches: 'Modern ECMAScript (ES6–ES2024) features, array transformation methods (map, filter, reduce), ES modules (import/export), JavaScript runtime Event Loop and asynchronous programming, Promises, async/await syntax, consuming RESTful APIs with the Fetch API, error boundary handling, and managing loading and empty states.',
    whyItMatters: 'Web applications do not exist in isolation; they fetch live data from remote web services across the globe. Modern asynchronous JavaScript and array transformations represent 80% of day-to-day frontend development work in modern React, Vue, and Node ecosystems.',
    prerequisites: ['Module 05: JavaScript Fundamentals'],
    estimatedHours: 16,
    skillsAcquired: [
      'Applying modern ES6+ features: destructuring, rest/spread operators, template literals, and arrow functions',
      'Transforming complex data structures with functional array methods: map, filter, reduce, find, some, and every',
      'Modularity with native ES Modules (`export`, `import`, named vs default exports)',
      'Understanding the JavaScript concurrency model: Call Stack, Web APIs, Microtask Queue, and Event Loop',
      'Writing clean asynchronous workflows with Promises and async/await syntax',
      'Executing network HTTP requests (GET, POST, PUT, DELETE) using the native Fetch API',
      'Implementing resilient UI states: Loading skeletons, Error alerts, Empty states, and Data displays'
    ]
  },
  lessons: [
    {
      id: 'm06-l01',
      number: 1,
      title: 'Modern ES6+ Syntax & Functional Array Processing',
      durationMinutes: 50,
      learningObjectives: [
        'Unpack objects and arrays cleanly using object and array destructuring with default fallbacks.',
        'Apply the spread (`...`) operator for shallow copying and immutable data updates.',
        'Master functional non-mutating array methods: `map()`, `filter()`, and `reduce()`.',
        'Organize codebases using native ES Modules (`export` and `import`).'
      ],
      introduction: 'Before ES2015 (ES6), JavaScript code was verbose, repetitive, and plagued by boilerplate loops. Modern ECMAScript introduced expressive declarative syntax and powerful array transformations that allow developers to transform complex data sets in clean, single-expression pipelines.',
      detailedNotes: `Destructuring Assignment:
Enables unpacking properties from objects or items from arrays directly into distinct variables.
- Object destructuring:
  'const { id, title, price = 0 } = product;'
- Array destructuring:
  'const [firstModule, secondModule] = courseModules;'

Spread and Rest Operators ('...'):
- Spread: Expands an iterable into individual elements.
  'const merged = [...arrayA, ...arrayB];'
  'const updatedUser = { ...user, role: "admin" };'
- Rest: Condenses multiple elements into a single array parameter.
  'function sum(...numbers) { return numbers.reduce((a, b) => a + b, 0); }'

Functional Array Methods:
1. 'map(fn)': Transforms every element in an array and returns a brand-new array of identical length. Never mutates the original array.
2. 'filter(fn)': Evaluates every element with a boolean predicate; returns a new array containing only elements that evaluated to true.
3. 'reduce(fn, initialValue)': Accumulates all elements into a single resulting value (number, object, or grouped array).
4. 'find(fn)': Returns the first element that satisfies the condition, or undefined.
5. 'some(fn)' & 'every(fn)': Return boolean checks across array elements.`,
      concepts: [
        {
          name: 'Imperative For-Loop vs Declarative Array Pipeline',
          description: 'Comparing legacy loop iteration with modern functional data pipelines.',
          comparison: {
            itemA: 'Imperative Loop',
            itemB: 'Declarative Pipeline (filter + map)',
            distinction: 'Imperative loops describe HOW to iterate with index counters and mutable accumulator arrays; declarative pipelines describe WHAT transformation to perform immutably.'
          },
          table: {
            headers: ['Method', 'Input', 'Output', 'Mutates Original Array?'],
            rows: [
              ['map()', 'Array + transform function', 'New array of identical length', 'No'],
              ['filter()', 'Array + boolean predicate', 'New array of matching elements (length <= original)', 'No'],
              ['reduce()', 'Array + accumulator function', 'Single accumulated result (any type)', 'No'],
              ['forEach()', 'Array + callback', 'undefined (used only for side-effects)', 'No']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'javascript',
          title: 'Transforming API Data with Filter, Map, and Reduce',
          code: `const apiProducts = [
  { id: 101, name: 'Cloud Server Tier 1', category: 'Infrastructure', price: 40, active: true },
  { id: 102, name: 'Managed Database', category: 'Storage', price: 90, active: true },
  { id: 103, name: 'Legacy Cron Service', category: 'Infrastructure', price: 15, active: false },
  { id: 104, name: 'Redis Cache Cluster', category: 'Storage', price: 65, active: true }
];

// 1. Filter: Get only active infrastructure and storage products
const activeServices = apiProducts.filter(item => item.active);

// 2. Map: Format into clean UI view models
const formattedCards = activeServices.map(({ id, name, price }) => ({
  id,
  displayName: name.toUpperCase(),
  monthlyFormatted: \`$\${price.toFixed(2)}/mo\`
}));

// 3. Reduce: Calculate total monthly cost of active infrastructure
const totalActiveSpend = activeServices.reduce((accumulator, current) => {
  return accumulator + current.price;
}, 0);

console.log('Total Spend:', totalActiveSpend); // Output: 195
console.table(formattedCards);`,
          explanation: 'Demonstrates a real-world pipeline: filtering active items, formatting display data via destructuring, and accumulating a financial sum with reduce.'
        }
      ],
      realWorldExample: {
        scenario: 'Filtering e-commerce products by multiple criteria',
        industryApplication: 'When a user checks "In Stock", selects "Under $100", and types "Keyboard" in a search bar, modern web apps chain declarative array methods (`products.filter(stockFilter).filter(priceFilter).filter(searchFilter)`) to produce instant search results.',
        takeaway: 'Chaining pure array methods creates readable, bug-free data filtering layers.'
      },
      practicalExercise: {
        title: 'Compute Grouped Metrics using Array.reduce',
        objective: 'Group an array of transactions by category and calculate total spend per category.',
        requirements: ['JavaScript runtime'],
        steps: [
          'Create an array of 6 transactions with properties: id, category ("Food", "Hosting", "Transport"), and amount.',
          'Use `reduce()` with an initial value of an empty object `{}`.',
          'For each transaction, add its amount to `acc[curr.category] || 0`.',
          'Log the resulting summary object.'
        ],
        expectedResult: 'An object of the format `{ Food: 140, Hosting: 85, Transport: 45 }` computed dynamically.'
      },
      commonMistakes: [
        {
          mistake: 'Using `map()` when you do not need the returned array (using it like `forEach`).',
          whyItHappens: 'Treating `map()` simply as a loop mechanism.',
          howToFix: 'If you are performing side-effects (like logging or modifying the DOM) without creating a new array, use `forEach()` or `for...of`. Reserve `map()` strictly for transforming data.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm06-l1-q1',
          type: 'code-analysis',
          question: 'What is the return value of `[1, 2, 3, 4].filter(num => num > 10)`?',
          options: ['undefined', 'null', '[] (empty array)', 'false'],
          correctAnswerIndex: 2,
          explanation: 'filter() always returns an array; if no elements match the predicate, it returns an empty array `[]`.'
        }
      ],
      summary: [
        'Destructuring and spread operators eliminate repetitive data manipulation boilerplate.',
        'map, filter, and reduce enable declarative, immutable data transformation.',
        'Never mutate source arrays when computing derived UI states.'
      ],
      additionalResources: [
        {
          name: 'MDN: Array Methods Reference',
          description: 'Complete specification of all JavaScript array prototype methods.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
          usefulFor: 'Detailed interactive examples of map, reduce, flatMap, and sort.'
        }
      ]
    },
    {
      id: 'm06-l02',
      number: 2,
      title: 'Asynchronous JavaScript: Promises, Async/Await & The Fetch API',
      durationMinutes: 65,
      learningObjectives: [
        'Explain the JavaScript concurrency model (Call Stack, Web APIs, Microtask Queue, Event Loop).',
        'Manage asynchronous operations using Promises (`resolve`, `reject`, `.then()`, `.catch()`).',
        'Write clean asynchronous code using modern `async` and `await` syntax with `try...catch` blocks.',
        'Make HTTP requests (GET, POST) using the native browser `fetch()` API and check `response.ok`.',
        'Handle complete UI lifecycles: Loading skeletons, Error messaging, and Empty search states.'
      ],
      introduction: 'JavaScript is single-threaded, meaning it can only execute one command at a time. Yet web apps must download multi-megabyte images, fetch database records, and listen to keystrokes simultaneously without freezing the user interface. Understanding the Event Loop and Async/Await unlocks this asynchronous power.',
      detailedNotes: `The Event Loop Mechanics:
1. Call Stack: Executes synchronous JavaScript functions one at a time (LIFO).
2. Web APIs: Browser-managed background threads (Fetch network requests, setTimeout timers, DOM events).
3. Microtask Queue: Highest priority queue for Promise callbacks (async/await resumes).
4. Callback (Macrotask) Queue: Queue for timers (setTimeout) and UI events.
5. Event Loop: Continuously checks if the Call Stack is empty; if so, it dequeues Microtasks first, then Macrotasks, pushing them onto the stack.

Promises:
An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.
Three states:
- 'Pending': Initial state, neither fulfilled nor rejected.
- 'Fulfilled': Operation completed successfully ('resolve(value)').
- 'Rejected': Operation failed ('reject(error)').

Async / Await:
Syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code.
- 'async' keyword: Designates a function that automatically returns a Promise.
- 'await' keyword: Pauses execution of the async function until the Promise settles, unpacking its resolved value. Must be placed inside an async function.

The Fetch API:
'const response = await fetch("https://api.example.com/data");'
Critical gotcha: 'fetch()' only rejects a Promise on network failure (DNS error, offline). If the server returns an HTTP 404 or 500 error, 'fetch()' fulfills the Promise! You MUST inspect 'response.ok' (true for status 200–299).`,
      concepts: [
        {
          name: 'The JavaScript Concurrency Model & Event Loop',
          description: 'How non-blocking I/O operates on a single execution thread.',
          diagram: `+--------------------+      +-------------------------+
|     CALL STACK     |      |        WEB APIs         |
|  (Single Threaded) |      | (HTTP Fetch, Timers)    |
|  - console.log()   | ───► | - fetch('/api/data')    |
|  - processData()   |      +------------+------------+
+---------+----------+                   │ Completes
          ▲                              ▼
          │ Checks if       +-------------------------+
          │ Stack is empty  |     MICROTASKS QUEUE    |
          └──────────────── |  (Promise callbacks,    |
             EVENT LOOP     |   async/await resumes)  |
                            +-------------------------+`
        }
      ],
      codeExamples: [
        {
          language: 'javascript',
          title: 'Production-Grade API Client with Full Error Handling',
          code: `/**
 * Fetches data from a REST endpoint with timeout, status checking, and error handling.
 */
async function fetchCourseModules() {
  const endpoint = 'https://jsonplaceholder.typicode.com/posts?_limit=5';
  
  // Set UI to loading state
  updateUI({ loading: true, error: null, data: [] });

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // HTTP 4xx or 5xx status codes do NOT throw automatically in fetch!
    if (!response.ok) {
      throw new Error(\`Network response was not ok: HTTP \${response.status} \${response.statusText}\`);
    }

    const payload = await response.json();
    
    // Check for empty data state
    if (!Array.isArray(payload) || payload.length === 0) {
      updateUI({ loading: false, error: null, data: [], isEmpty: true });
      return;
    }

    // Success state
    updateUI({ loading: false, error: null, data: payload, isEmpty: false });

  } catch (err) {
    // Catches network disconnects, DNS errors, or thrown HTTP errors
    console.error('API Fetch failed:', err);
    updateUI({ 
      loading: false, 
      error: err instanceof Error ? err.message : 'Unknown network failure occurred', 
      data: [] 
    });
  }
}

function updateUI(state) {
  const container = document.getElementById('api-content');
  if (state.loading) {
    container.innerHTML = '<p class="text-slate-400 animate-pulse">Loading course modules...</p>';
    return;
  }
  if (state.error) {
    container.innerHTML = \`<div class="p-4 bg-red-900/30 border border-red-800 text-red-200 rounded">
      <p class="font-semibold">Error Loading Data</p>
      <p class="text-sm mt-1">\${state.error}</p>
    </div>\`;
    return;
  }
  if (state.isEmpty) {
    container.innerHTML = '<p class="text-slate-500">No records found matching query.</p>';
    return;
  }
  
  // Render records
  container.innerHTML = state.data
    .map(item => \`<div class="p-4 bg-slate-900 border border-slate-800 rounded mb-2">
      <h3 class="font-bold text-white">\${item.title}</h3>
      <p class="text-sm text-slate-400 mt-1">\${item.body}</p>
    </div>\`)
    .join('');
}`,
          explanation: 'Demonstrates the gold standard of API integration: explicit response.ok validation, comprehensive try/catch boundaries, and dedicated UI states for loading, error, empty, and data.'
        }
      ],
      realWorldExample: {
        scenario: 'Handling mobile network dropouts during payment checkout',
        industryApplication: 'When an app submits a credit card token or M-Pesa push, poor connectivity can sever the HTTP connection. Production code configures `AbortController` with a 15-second timeout and exponential backoff retry algorithms to handle network fluctuations cleanly.',
        takeaway: 'Never assume network requests succeed; always design for latency and failure.'
      },
      practicalExercise: {
        title: 'Build a Live Search Filter Consuming a Public REST API',
        objective: 'Fetch an array of posts/users from a public API and filter the results dynamically as the user types.',
        requirements: ['HTML container with input search box and results div'],
        steps: [
          'Fetch a list of users from `https://jsonplaceholder.typicode.com/users` on page load.',
          'Store the fetched array in a module variable `allUsers`.',
          'Listen to `input` events on the search box.',
          'Filter `allUsers` where `user.name.toLowerCase().includes(searchTerm.toLowerCase())`.',
          'Re-render the filtered subset in the DOM; if empty, render a "No users found" empty state.'
        ],
        expectedResult: 'Instant, responsive client-side filtering over fetched remote API data.'
      },
      commonMistakes: [
        {
          mistake: 'Assuming `fetch()` throws an error when the server returns 404 Not Found or 500 Internal Server Error.',
          whyItHappens: 'Thinking `fetch()` behaves like Axios or jQuery AJAX.',
          howToFix: 'Always check `if (!response.ok) throw new Error(...)` immediately after `await fetch()`. Only physical network disconnects reject automatically.'
        },
        {
          mistake: 'Forgetting `await` before `response.json()`.',
          whyItHappens: 'Forgetting that reading the response stream payload is itself an asynchronous operation.',
          howToFix: 'Always write `const data = await response.json();`.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm06-l2-q1',
          type: 'multiple-choice',
          question: 'When does the native browser `fetch()` promise reject?',
          options: [
            'Whenever the server returns HTTP 404 Not Found',
            'Whenever the server returns HTTP 500 Internal Server Error',
            'Strictly on physical network errors, DNS failure, or if the request was aborted',
            'Whenever the JSON payload contains a null value'
          ],
          correctAnswerIndex: 2,
          explanation: 'fetch() only rejects when the network request could not be physically executed; HTTP 4xx/5xx responses resolve normally with `response.ok === false`.'
        }
      ],
      summary: [
        'The Event Loop processes synchronous stack calls first, then Microtasks (Promises), then Macrotasks (timers).',
        'async/await provides clean, readable syntax for handling asynchronous workflows.',
        'Always check response.ok and implement loading, error, and empty states for every network request.'
      ],
      additionalResources: [
        {
          name: 'MDN: Using the Fetch API',
          description: 'Official Mozilla guide to making HTTP requests with fetch.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch',
          usefulFor: 'Headers, POST payloads, CORS modes, and streaming.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm06-lab-1',
      title: 'Lab 6.1: Asynchronous Request Pipeline with AbortController',
      durationMinutes: 60,
      objective: 'Implement an auto-canceling search input using the Fetch API and `AbortController` to cancel in-flight network requests when new keystrokes arrive.',
      prerequisites: ['Module 05 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Configure AbortController Instance',
          instructions: 'Create an AbortController and pass its signal to fetch:',
          code: `let controller = null;

async function searchAPI(query) {
  if (controller) controller.abort(); // Cancel previous request
  controller = new AbortController();

  try {
    const res = await fetch(\`https://api.github.com/search/repositories?q=\${encodeURIComponent(query)}\`, {
      signal: controller.signal
    });
    const data = await res.json();
    return data.items;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Previous request safely canceled');
      return null;
    }
    throw err;
  }
}`
        }
      ],
      verificationChecklist: [
        'Rapid typing cancels prior pending requests in DevTools Network tab',
        'Zero race conditions where an older, slower request overwrites newer search results',
        'Errors are caught cleanly without unhandled rejections in the console'
      ],
      deliverables: ['Working search script with AbortController cancellation']
    }
  ],
  moduleProject: {
    id: 'm06-project',
    title: 'API-Powered Web Application (Public REST API Consumer)',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    overview: 'Build a production-grade, API-powered web application that consumes a live public REST API (such as GitHub Repositories, Open Library Books, or OpenWeather). The application must feature real-time search, category and tag filtering, dynamic card rendering, paginated or infinite data fetching, loading skeleton placeholders, robust error banners with retry buttons, and responsive modal dialogs displaying detailed resource telemetry.',
    requirements: [
      'Integrate with a live public REST API using modern async/await and the Fetch API',
      'Interactive search bar that queries the API dynamically with input debouncing or submit triggers',
      'Filter controls allowing users to filter fetched data by tags, categories, or sort orders (e.g. Most Stars, Alphabetical)',
      'Four distinct UI states: Loading Skeleton, Data Presentation Grid, Empty Results ("No results found"), and Network Error state with an interactive "Retry Request" button',
      'Clean modular architecture: `api.js` (network layer), `ui.js` (DOM rendering), and `app.js` (state and event orchestration)',
      '100% responsive design using Tailwind CSS or modern CSS'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'API Client & Service Layer',
        tasks: ['Build reusable fetch wrapper with status checking and error handling']
      },
      {
        milestone: 2,
        title: 'UI Shell & State Handlers',
        tasks: ['Create loading skeleton markup', 'Build error state alert box with retry handler']
      },
      {
        milestone: 3,
        title: 'Search & Filter Integration',
        tasks: ['Bind search inputs to query params', 'Implement client or server-side filtering']
      },
      {
        milestone: 4,
        title: 'Detail Modal & Polish',
        tasks: ['Add click handler to inspect individual items', 'Test error boundary by simulating offline mode']
      }
    ],
    starterCodeStructure: [
      {
        path: 'api-app/services/api.js',
        description: 'Network communication service',
        sampleContent: `export async function fetchRepositories(query = 'javascript', page = 1) {
  const url = \`https://api.github.com/search/repositories?q=\${encodeURIComponent(query)}&page=\${page}&per_page=12\`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`Failed to fetch repositories (HTTP \${response.status})\`);
  }
  return response.json();
}`
      }
    ],
    acceptanceCriteria: [
      'App renders real-time data from a live remote API without CORS or network errors',
      'Displays a clear loading skeleton during in-flight network requests',
      'Displays an actionable error banner when network fails or airplane mode is enabled',
      'Allows searching and category filtering smoothly'
    ],
    rubric: [
      { criteria: 'Async Architecture & Fetching', points: 35, description: 'Flawless async/await handling, response.ok checks, and AbortController integration' },
      { criteria: 'State Handling (Loading/Error/Empty)', points: 30, description: 'High-craft UI transitions for skeleton loading, empty state, and retryable error state' },
      { criteria: 'Search & Data Filtering', points: 20, description: 'Accurate querying, debouncing, and responsive card rendering' },
      { criteria: 'Code Organization & Modularity', points: 15, description: 'Clean ES module separation between API service and presentation layer' }
    ]
  },
  quiz: [
    {
      id: 'm06-qz-01',
      question: 'What is the purpose of `Promise.all([p1, p2, p3])` in modern JavaScript?',
      options: [
        'It executes promises one after the other sequentially, waiting for each to finish before starting the next',
        'It runs multiple promises concurrently in parallel and resolves only when ALL promises have resolved, or rejects immediately if ANY promise rejects',
        'It converts synchronous code into a service worker',
        'It cancels all pending promises'
      ],
      correctAnswerIndex: 1,
      explanation: 'Promise.all initiates promises concurrently and fulfills when all succeed, or rejects as soon as one fails.'
    },
    {
      id: 'm06-qz-02',
      question: 'Which array method should be used to find out if at least one item in an array matches a condition?',
      options: ['every()', 'some()', 'map()', 'reduce()'],
      correctAnswerIndex: 1,
      explanation: 'some() returns true as soon as one element satisfies the predicate, whereas every() requires all elements to match.'
    },
    {
      id: 'm06-qz-03',
      question: 'What happens if you do not use `encodeURIComponent()` when interpolating user search terms into an API query URL?',
      options: [
        'The computer freezes',
        'Special characters (spaces, &, ?, #) can corrupt the URL syntax, leading to 400 Bad Request errors or security vulnerabilities',
        'JavaScript converts the query into uppercase',
        'The request automatically uses HTTPS'
      ],
      correctAnswerIndex: 1,
      explanation: 'Special characters must be percent-encoded to prevent breaking HTTP query string delimiters.'
    }
  ],
  assignment: {
    id: 'm06-assign',
    title: 'Module 06 Assignment: Public Weather & Geocoding Dashboard',
    problemStatement: 'Construct a weather forecast dashboard that consumes the free Open-Meteo or WeatherAPI REST endpoints. The user enters a city name; the app converts the city into latitude/longitude via geocoding, queries the 7-day weather forecast, and renders an interactive forecast cards grid with daily high/low temperatures, precipitation chances, and weather condition icons.',
    specifications: [
      'Two-step asynchronous chain: Geocoding API query followed by Forecast API query',
      'Display animated or pulse loading skeleton while network requests are active',
      'Handle invalid city names with a friendly "City not found" error alert',
      'Allow toggling between Celsius and Fahrenheit using purely functional calculations'
    ],
    deliverables: ['`weather.html`, `weather.js`, and documentation of API contracts.'],
    evaluationRubric: [
      { category: 'Asynchronous Chaining', weight: '40%', description: 'Sequential resolution of coordinates to forecast data without race conditions' },
      { category: 'Error & Loading States', weight: '35%', description: 'Friendly handling of 404 cities and network disconnects' },
      { category: 'UI & Temperature Calculation', weight: '25%', description: 'Accurate unit conversion and clean responsive card layout' }
    ],
    submissionFormat: 'Repository code with live testing instructions'
  },
  resources: [
    {
      name: 'MDN Web Docs: Promises and Async/Await',
      description: 'Comprehensive guide to asynchronous JavaScript programming.',
      url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
      usefulFor: 'Mastering the Microtask queue, Promise methods, and async patterns.'
    },
    {
      name: 'JavaScript.info: The Event Loop',
      description: 'Illustrated guide to microtasks and macrotasks.',
      url: 'https://javascript.info/event-loop',
      usefulFor: 'Deepening comprehension of execution stacks and browser task scheduling.'
    }
  ],
  summary: 'Module 06 mastered modern JavaScript (ES6+): destructuring, array pipelines (map/filter/reduce), the Event Loop, Promises, async/await, and consuming REST APIs with the Fetch API while managing loading, error, and empty UI states.'
};
