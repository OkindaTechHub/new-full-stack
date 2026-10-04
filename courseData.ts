import { CourseOverview, Module } from '../types/course';
import { module01Fundamentals } from './modules/module01_fundamentals';
import { module02Html5 } from './modules/module02_html5';
import { module03Css } from './modules/module03_css';
import { module04Tailwind } from './modules/module04_tailwind';
import { module05Javascript } from './modules/module05_javascript';
import { module06ModernJsApis } from './modules/module06_modern_js_apis';
import { module07GitGithub } from './modules/module07_git_github';
import { module08React } from './modules/module08_react';
import { module09AdvancedReactTypescript } from './modules/module09_advanced_react_typescript';
import { module10BackendNodeExpress } from './modules/module10_backend_node_express';
import { module11DatabasesSupabase } from './modules/module11_databases_supabase';
import { module12PaymentsDevops } from './modules/module12_payments_devops';
import { midCourseProject, finalCourseCapstone } from './modules/capstone_projects';

export const courseOverview: CourseOverview = {
  title: 'Full-Stack Web Development',
  subtitle: 'The Complete University & Industry-Grade Master Curriculum',
  duration: '8–12 Weeks (Self-Paced / Cohort)',
  difficulty: 'Beginner → Advanced',
  totalModules: 12,
  totalProjects: 14, // 12 module projects + 1 mid-course milestone + 1 final capstone
  description: 'A comprehensive, practical, project-based Full-Stack Web Development curriculum taking learners from the fundamental mechanics of the internet to architecting, securing, and deploying production-ready full-stack applications with modern React, TypeScript, Node.js, Express, PostgreSQL/Supabase, M-Pesa, and Stripe.',
  stack: [
    {
      category: 'Frontend & UI',
      technologies: ['HTML5 Semantic Web', 'Modern CSS3', 'Flexbox & CSS Grid', 'Tailwind CSS', 'React 19/18', 'React Router']
    },
    {
      category: 'Languages & Typing',
      technologies: ['JavaScript (ES6–ES2024)', 'TypeScript (Strict Mode)', 'JSON', 'SQL']
    },
    {
      category: 'Backend & APIs',
      technologies: ['Node.js (LTS)', 'Express.js', 'RESTful API Architecture', 'Middleware Pipelines', 'Fetch API']
    },
    {
      category: 'Databases & Storage',
      technologies: ['PostgreSQL', 'Supabase PostgREST', 'Row Level Security (RLS)', 'Relational Schema Modeling']
    },
    {
      category: 'Payment Gateways',
      technologies: ['Safaricom M-Pesa (Daraja API & STK Push)', 'Stripe Checkout & Webhooks']
    },
    {
      category: 'DevOps, Security & Tools',
      technologies: ['Git & GitHub', 'GitHub Actions CI/CD', 'OWASP Web Security', 'Lighthouse & Core Web Vitals', 'Docker & Cloud Deployment']
    }
  ],
  learningOutcomes: [
    'Architect semantic, accessible HTML5 documents complying with WCAG AA accessibility guidelines',
    'Design modern, mobile-first responsive interfaces using advanced CSS Grid, Flexbox, and Tailwind CSS',
    'Write clean, asynchronous JavaScript (ES6+) and consume RESTful APIs using Promises and async/await',
    'Collaborate professionally using Git branches, conventional commits, and GitHub Pull Requests',
    'Build complex, component-driven client applications using React, custom hooks, and the Context API',
    'Enforce end-to-end static type safety across frontend and backend codebases using TypeScript',
    'Develop robust backend REST APIs using Node.js and Express with validation and global error handling',
    'Design normalized relational database schemas in PostgreSQL and integrate via Supabase',
    'Integrate digital payment processing with Safaricom M-Pesa STK Push and Stripe Checkout Webhooks',
    'Harden full-stack applications against OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, CORS)',
    'Optimize Google Core Web Vitals (LCP, INP, CLS) and achieve >90 Lighthouse performance audits',
    'Deploy and monitor production web applications using automated GitHub Actions CI/CD pipelines'
  ],
  curriculumPhases: [
    {
      phase: 'Phase 1: Web Foundations',
      weeks: 'Weeks 1–4',
      description: 'Master internet protocols, semantic HTML5, modern CSS3 layout engines, and utility-first Tailwind CSS.',
      modules: [1, 2, 3, 4]
    },
    {
      phase: 'Phase 2: Modern Frontend',
      weeks: 'Weeks 5–8',
      description: 'Deep dive into JavaScript programming, asynchronous REST APIs, Git version control, and React component architecture.',
      modules: [5, 6, 7, 8]
    },
    {
      phase: 'Phase 3: Full-Stack & APIs',
      weeks: 'Weeks 9–11',
      description: 'Layer strict TypeScript type safety, advanced React routing, Node.js Express backend servers, and PostgreSQL/Supabase databases.',
      modules: [9, 10, 11]
    },
    {
      phase: 'Phase 4: Production & Scale',
      weeks: 'Week 12',
      description: 'Monetize with M-Pesa and Stripe, enforce OWASP security, optimize Core Web Vitals, and deploy via automated CI/CD.',
      modules: [12]
    }
  ]
};

export const allCourseModules: Module[] = [
  module01Fundamentals,
  module02Html5,
  module03Css,
  module04Tailwind,
  module05Javascript,
  module06ModernJsApis,
  module07GitGithub,
  module08React,
  module09AdvancedReactTypescript,
  module10BackendNodeExpress,
  module11DatabasesSupabase,
  module12PaymentsDevops
];

export { midCourseProject, finalCourseCapstone };

/**
 * Global search index helper across all modules, lessons, and topics.
 */
export function searchCurriculum(query: string) {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  const results: {
    moduleId: string;
    moduleNumber: number;
    moduleTitle: string;
    lessonId?: string;
    lessonTitle?: string;
    matchType: 'module' | 'lesson' | 'concept' | 'code';
    snippet: string;
  }[] = [];

  for (const mod of allCourseModules) {
    if (mod.title.toLowerCase().includes(q) || mod.overview.whatItTeaches.toLowerCase().includes(q)) {
      results.push({
        moduleId: mod.id,
        moduleNumber: mod.moduleNumber,
        moduleTitle: mod.title,
        matchType: 'module',
        snippet: mod.overview.whatItTeaches.slice(0, 160) + '...'
      });
    }

    for (const lesson of mod.lessons) {
      if (lesson.title.toLowerCase().includes(q)) {
        results.push({
          moduleId: mod.id,
          moduleNumber: mod.moduleNumber,
          moduleTitle: mod.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          matchType: 'lesson',
          snippet: lesson.introduction.slice(0, 160) + '...'
        });
      }

      for (const concept of lesson.concepts) {
        if (concept.name.toLowerCase().includes(q) || concept.description.toLowerCase().includes(q)) {
          results.push({
            moduleId: mod.id,
            moduleNumber: mod.moduleNumber,
            moduleTitle: mod.title,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            matchType: 'concept',
            snippet: `${concept.name}: ${concept.description.slice(0, 140)}...`
          });
        }
      }

      for (const code of lesson.codeExamples) {
        if (code.title.toLowerCase().includes(q) || code.code.toLowerCase().includes(q)) {
          results.push({
            moduleId: mod.id,
            moduleNumber: mod.moduleNumber,
            moduleTitle: mod.title,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            matchType: 'code',
            snippet: `${code.title} (${code.language})`
          });
        }
      }
    }
  }

  return results;
}
