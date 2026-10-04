export interface CapstoneProjectSpec {
  id: string;
  title: string;
  stage: 'Mid-Course Milestone' | 'Final Course Capstone';
  durationWeeks: string;
  estimatedHours: number;
  difficulty: 'Intermediate' | 'Production Capstone';
  technologies: string[];
  overview: string;
  systemArchitecture: string;
  coreRequirements: {
    category: string;
    items: string[];
  }[];
  milestones: {
    step: number;
    title: string;
    description: string;
    deliverables: string[];
  }[];
  evaluationRubric: {
    dimension: string;
    points: number;
    criteria: string;
  }[];
}

export const midCourseProject: CapstoneProjectSpec = {
  id: 'mid-course-capstone',
  title: 'Mid-Course Project: Interactive Frontend Engineering Suite',
  stage: 'Mid-Course Milestone',
  durationWeeks: 'Weeks 6–8',
  estimatedHours: 20,
  difficulty: 'Intermediate',
  technologies: ['HTML5 Semantic Web', 'Modern CSS & CSS Grid', 'Tailwind CSS', 'JavaScript ES6+', 'React', 'REST APIs', 'LocalStorage'],
  overview: 'The Mid-Course Milestone demonstrates comprehensive mastery of modern frontend web engineering before advancing into backend systems. The learner constructs a complete, responsive, multi-view Frontend Web Application (e.g. an Interactive Developer Portfolio & Case Study Engine or an API-driven Multimedia Explorer) combining semantic HTML5 landmarks, mobile-first responsive Tailwind CSS, declarative React component trees, immutable state management, live REST API consumption with loading/error boundaries, and client-side persistence.',
  systemArchitecture: `[User Agent / Browser]
        │
        ├──► [React Presentation Layer (Tailwind CSS)]
        │         ├── App Layout (Navbar, Responsive Drawer, Footer)
        │         ├── Filter & Search Control Bar
        │         └── Interactive Card Grid with Modal Viewers
        │
        ├──► [State & Effect Orchestrator (React Hooks)]
        │         ├── useState (Search query, active filters, selected items)
        │         ├── useEffect (API data synchronization with AbortController)
        │         └── useMemo (Derived filtered and sorted arrays)
        │
        ├──► [Persistence Layer]
        │         └── Browser LocalStorage (Bookmarks, user display preferences)
        │
        └──► [External Public REST API]
                  └── Remote Endpoint (JSON data fetching via native Fetch)`,
  coreRequirements: [
    {
      category: 'Semantic HTML & Accessibility (WCAG AA)',
      items: [
        'Strict HTML5 semantic landmarks (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>)',
        'Zero skipped heading levels (h1 -> h2 -> h3)',
        'Every interactive control has a visible :focus-visible high-contrast ring for keyboard navigation',
        'All images contain meaningful, descriptive alt text'
      ]
    },
    {
      category: 'Responsive Styling & Tailwind CSS',
      items: [
        'Mobile-first responsive architecture tested at 375px, 768px, 1024px, and 1440px',
        'Zero horizontal page overflow at any viewport size',
        'Auto-responsive 2D CSS Grid for item cards using repeat(auto-fit, minmax(...))',
        'Integrated Dark Mode with polished neutral contrast and smooth color transitions'
      ]
    },
    {
      category: 'React Architecture & State Management',
      items: [
        'Modular component architecture with single-responsibility components',
        'Unidirectional data flow with typed props and immutable state updates',
        'Controlled inputs for real-time search with input debouncing',
        'Graceful UI state machines: Loading Skeleton, Data Grid, Empty Results, and Network Error alert with retry'
      ]
    }
  ],
  milestones: [
    {
      step: 1,
      title: 'Scaffolding, Design Tokens & Routing Shell',
      description: 'Initialize the React application with Vite, configure Tailwind CSS design tokens, and establish the responsive navigation layout.',
      deliverables: ['Working Vite + React project with responsive navbar and responsive mobile drawer']
    },
    {
      step: 2,
      title: 'Data Integration & Asynchronous State Machine',
      description: 'Build the API client service layer using native Fetch and async/await with AbortController for cancellation.',
      deliverables: ['API service module and loading/error/empty state visual components']
    },
    {
      step: 3,
      title: 'Interactive Filtering, Search & Modal Inspectors',
      description: 'Implement real-time search, multi-category tag selection, sorting controls, and an accessible modal view for inspecting item details.',
      deliverables: ['Working search and filter engine with modal drawer']
    },
    {
      step: 4,
      title: 'Persistence, Accessibility & Cross-Browser Audit',
      description: 'Persist user favorites/bookmarks in localStorage and run full WCAG AA accessibility and keyboard navigation tests.',
      deliverables: ['Complete mid-course frontend submission with verified zero console warnings']
    }
  ],
  evaluationRubric: [
    { dimension: 'React Architecture & Code Quality', points: 30, criteria: 'Clean component decomposition, pure functional components, and immutable state updates' },
    { dimension: 'Responsive UI Polish & Tailwind', points: 30, criteria: 'Flawless mobile/desktop adaptability, dark mode polish, and zero layout overflow' },
    { dimension: 'API Integration & Asynchronous States', points: 25, criteria: 'Resilient loading skeletons, network retry handlers, and clean AbortController cancellation' },
    { dimension: 'Accessibility & User Experience', points: 15, criteria: 'Full keyboard navigability, high-contrast focus rings, and localStorage persistence' }
  ]
};

export const finalCourseCapstone: CapstoneProjectSpec = {
  id: 'final-course-capstone',
  title: 'Final Course Capstone: Production-Ready Full-Stack Platform',
  stage: 'Final Course Capstone',
  durationWeeks: 'Weeks 10–12',
  estimatedHours: 35,
  difficulty: 'Production Capstone',
  technologies: [
    'HTML5 Semantic Web',
    'Tailwind CSS',
    'TypeScript',
    'React',
    'React Router',
    'Node.js',
    'Express.js',
    'PostgreSQL / Supabase',
    'REST APIs',
    'Safaricom M-Pesa Daraja',
    'Stripe Checkout & Webhooks',
    'Git & GitHub',
    'CI/CD GitHub Actions',
    'OWASP Web Security',
    'Core Web Vitals Optimization'
  ],
  overview: 'The crowning achievement of the entire 12-module Full-Stack Web Development curriculum. The learner architects, builds, secures, tests, and deploys a production-ready, industry-grade Full-Stack E-Commerce Platform. The platform combines a typed React frontend, an Express REST API backend, a PostgreSQL relational database, dual digital payment processing (Safaricom M-Pesa STK Push and Stripe Checkout with cryptographic webhook verification), OWASP web security protections (parameterized SQL, Helmet, CORS, body limits), Core Web Vitals performance tuning, and an automated GitHub Actions CI/CD deployment pipeline.',
  systemArchitecture: `                                    FULL-STACK CAPSTONE ARCHITECTURE
                                    ==================================

[Client Tier: React + TypeScript + Tailwind CSS]
  ├── React Router 6/7 (Nested Layouts, Deep Links)
  ├── Typed Context API & Custom Hooks (Cart, Theme, Session)
  ├── Search & Category Filter with Debounced Query Engine
  └── Dual Payment Triggers: M-Pesa STK Modal & Stripe Checkout Redirection
                                │
                                ▼ (HTTPS / REST JSON API)
[Application Tier: Node.js + Express + TypeScript]
  ├── Security Hardening: Helmet CSP, Restrictive CORS, Rate Limiting
  ├── Middleware Pipeline: JSON Parser, Request Logger, Error Handler
  ├── RESTful CRUD Controllers: /api/v1/products, /api/v1/orders
  └── Payment Processing Subsystems:
        ├── M-Pesa Daraja Engine: OAuth Token, Base64 Signature, STK Push Dispatcher
        ├── M-Pesa Asynchronous Callback Handler (/api/v1/payments/mpesa-callback)
        ├── Stripe Session Creator (/api/v1/payments/stripe-checkout)
        └── Stripe Webhook Signature Verifier (/api/v1/payments/stripe-webhook)
                                │
                                ▼ (PostgreSQL Connection Pool / PostgREST)
[Persistence Tier: PostgreSQL / Supabase Relational Database]
  ├── Table: categories (id UUID, name, slug)
  ├── Table: products (id UUID, category_id FK, title, price NUMERIC, stock INT)
  ├── Table: orders (id UUID, total_amount NUMERIC, payment_method, payment_status, receipt_number)
  ├── Table: order_items (id UUID, order_id FK, product_id FK, quantity INT, unit_price NUMERIC)
  └── Integrity: Primary Keys, Foreign Keys (ON DELETE CASCADE), Check Constraints, RLS Policies`,
  coreRequirements: [
    {
      category: 'Three-Tier Full-Stack Architecture',
      items: [
        'Complete separation of concerns: Presentation (React), Business Logic (Express API), and Persistence (PostgreSQL)',
        'Shared TypeScript types between frontend and backend contracts',
        'Health check monitoring endpoint (/health) with uptime reporting'
      ]
    },
    {
      category: 'Relational Database Schema & Data Integrity',
      items: [
        'Normalized PostgreSQL schema modeling categories, products, orders, and order_items',
        'Foreign Keys with referential integrity constraints preventing orphaned orders',
        'Financial columns strictly defined as NUMERIC(10, 2) or integer cents (zero floating point inaccuracies)',
        'Database indexes configured on frequently queried columns (slug, category_id, order_id)'
      ]
    },
    {
      category: 'Dual Payment Processing (M-Pesa & Stripe)',
      items: [
        'Safaricom M-Pesa STK Push: initiates prompt on customer phone, handles asynchronous Safaricom callback, and records MpesaReceiptNumber',
        'Stripe Checkout: creates hosted checkout sessions, verifies webhook signatures with stripe.webhooks.constructEvent, and fulfills orders',
        'All pricing calculated strictly on the backend server—never trusted from client payloads'
      ]
    },
    {
      category: 'Web Security Hardening (OWASP Compliance)',
      items: [
        'Zero SQL Injection vulnerabilities via parameterized database queries',
        'HTTP security headers configured via Helmet (Content Security Policy, HSTS, nosniff)',
        'Strict CORS policy locking API access to trusted frontend origins',
        'Environment variables managed securely via .env with sanitized .env.example templates'
      ]
    },
    {
      category: 'Performance & Production DevOps',
      items: [
        'Lighthouse performance and accessibility score > 90',
        'Core Web Vitals optimized: LCP < 2.5s, CLS < 0.1, INP < 200ms',
        'Automated CI/CD pipeline using GitHub Actions (.github/workflows/deploy.yml) running lint, test, and build'
      ]
    }
  ],
  milestones: [
    {
      step: 1,
      title: 'Database Schema Modeling & Migration Scripts',
      description: 'Author and execute SQL DDL scripts to create categories, products, orders, and order_items tables in PostgreSQL/Supabase.',
      deliverables: ['`schema.sql` migration file with foreign keys and check constraints']
    },
    {
      step: 2,
      title: 'Backend REST API & Payment Subsystems',
      description: 'Implement Express REST controllers for catalog and order management, integrate M-Pesa STK Push and Stripe webhook routes.',
      deliverables: ['Functional backend API with verified payment endpoints']
    },
    {
      step: 3,
      title: 'React + TypeScript Frontend Client Integration',
      description: 'Build the e-commerce client UI: catalog, cart drawer, M-Pesa phone number prompt modal, and Stripe redirect handler.',
      deliverables: ['Complete React client connected to backend API']
    },
    {
      step: 4,
      title: 'Security Hardening, Performance Optimization & CI/CD Pipeline',
      description: 'Audit with Helmet, verify parameterized queries, run Lighthouse audit, and author GitHub Actions CI/CD deployment workflow.',
      deliverables: ['GitHub Actions deploy.yml, Lighthouse audit report, and final production build']
    }
  ],
  evaluationRubric: [
    { dimension: 'Full-Stack Integration & Architecture', points: 30, criteria: 'Robust three-tier communication across React, Express, and PostgreSQL' },
    { dimension: 'Dual Payment Implementation', points: 25, criteria: 'Accurate M-Pesa STK Push flow and cryptographically verified Stripe webhooks' },
    { dimension: 'Web Security & Data Integrity', points: 20, criteria: 'Zero SQLi, Helmet CSP, strict CORS, and database referential integrity' },
    { dimension: 'Performance, Polish & Accessibility', points: 15, criteria: 'Lighthouse > 90, Core Web Vitals compliance, and responsive dark mode craft' },
    { dimension: 'DevOps & CI/CD Automation', points: 10, criteria: 'Automated GitHub Actions workflow for linting, testing, and production builds' }
  ]
};
