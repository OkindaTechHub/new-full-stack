import { Module } from '../../types/course';

export const module02Html5: Module = {
  id: 'module-02',
  moduleNumber: 2,
  title: 'HTML5 & Semantic Web',
  slug: 'html5-semantic-web',
  durationWeeks: 'Week 2',
  level: 'Beginner',
  phase: 'Phase 1: Web Foundations',
  overview: {
    whatItTeaches: 'Professional semantic markup, document architecture, accessible forms, audio/video multimedia integration, ARIA landmarks, search engine optimization (SEO) metadata, and web accessibility (WCAG AA) standards.',
    whyItMatters: 'HTML provides the structural skeleton and accessibility foundation of every web application. Search engines, screen readers for visually impaired users, and browser layout engines rely strictly on semantic markup rather than visual styling.',
    prerequisites: ['Module 01: Web Development Fundamentals'],
    estimatedHours: 14,
    skillsAcquired: [
      'Architecting valid HTML5 documents with semantic elements (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>)',
      'Designing accessible, validated web forms with inputs, labels, fieldsets, and regex patterns',
      'Implementing multimedia elements (<audio>, <video>, <iframe>) with fallbacks and captions',
      'Configuring essential SEO metadata, Open Graph social share tags, and JSON-LD structured data',
      'Applying WAI-ARIA roles, attributes, and keyboard navigability standards',
      'Validating markup using the W3C Nu HTML Checker'
    ]
  },
  lessons: [
    {
      id: 'm02-l01',
      number: 1,
      title: 'HTML5 Document Anatomy & Semantic Architecture',
      durationMinutes: 50,
      learningObjectives: [
        'Construct a standards-compliant HTML5 document with complete doctype, language attributes, and head metadata.',
        'Distinguish semantic elements (<main>, <article>, <section>) from non-semantic division containers (<div>, <span>).',
        'Structure information using proper heading hierarchy without skipping levels (h1 through h6).',
        'Explain how accessibility trees and screen readers parse semantic landmarks.'
      ],
      introduction: 'In early web design, developers composed entire websites out of hundreds of uninformative `<div>` tags (a syndrome known as "div soup"). HTML5 introduced semantic elements that communicate the meaning, structure, and intent of content to search engine bots, screen readers, and assistive technology.',
      detailedNotes: `Semantic HTML means using HTML markup to reinforce the meaning of the content on web pages rather than merely defining its presentation or appearance.

The fundamental document skeleton:
- '<!DOCTYPE html>': The document type declaration instructing the browser rendering engine to use modern standards mode rather than quirks mode.
- '<html lang="en">': The root element declaring the natural language of the document, critical for screen reader speech synthesis and search indexing.
- '<head>': Contains machine-readable metadata that is not directly rendered on the page canvas (character encoding, title, viewport scaling, external stylesheets, SEO tags).
- '<body>': Contains all visible content displayed to end users.

Semantic Structural Landmarks:
- '<header>': Represents introductory content or introductory navigational links for its nearest ancestor section or page root.
- '<nav>': A section containing primary navigation links. Screen readers allow users to skip directly to this landmark.
- '<main>': Represents the dominant, unique content of the body. There must not be more than one visible '<main>' element per document.
- '<article>': A self-contained composition intended to be independently distributable or reusable (e.g., blog post, forum comment, news story, product card).
- '<section>': A thematic grouping of content, typically with a heading.
- '<aside>': Content tangentially related to the content around it (sidebars, callout boxes, related links).
- '<footer>': Represents a footer for its nearest sectioning root, containing author info, copyright data, or legal links.`,
      concepts: [
        {
          name: 'The HTML5 Semantic Hierarchy',
          description: 'Landmark elements partition a webpage into navigable cognitive zones.',
          comparison: {
            itemA: '<section>',
            itemB: '<article>',
            distinction: '<article> is a complete, self-contained standalone entity that makes sense if syndicated on an RSS reader alone; <section> is a thematic sub-grouping of a larger topic.'
          },
          diagram: `+-------------------------------------------------------+
|  <header>                                             |
|    <h1>Site Logo / Title</h1>                         |
|    <nav>Navigation Links</nav>                        |
+-------------------------------------------------------+
|  <main>                                               |
|    <section>                                          |
|      <h2>Featured Articles</h2>                       |
|      <article>                                        |
|        <h3>Deep Dive into Web Protocols</h3>          |
|        <p>Article body content...</p>                 |
|      </article>                                       |
|    </section>                                         |
|    <aside>                                            |
|      <h3>Related Documentation</h3>                   |
|    </aside>                                           |
+-------------------------------------------------------+
|  <footer>                                             |
|    <p>&copy; 2026 Developer Curriculum. MIT Licensed.</p>
+-------------------------------------------------------+`
        }
      ],
      codeExamples: [
        {
          language: 'html',
          title: 'Semantic HTML5 Document Template with Head Metadata',
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- Critical: viewport ensures proper scaling on mobile devices -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Master professional full-stack web engineering from fundamentals to cloud deployment.">
  <title>Developer Portfolio &amp; Case Studies</title>
  
  <!-- Open Graph Protocol for rich social media cards -->
  <meta property="og:title" content="Developer Portfolio &amp; Case Studies">
  <meta property="og:description" content="High-craft engineering portfolio with full-stack projects.">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
</head>
<body>
  <header>
    <a href="/" class="brand-link">DevCampus</a>
    <nav aria-label="Main Navigation">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="about" aria-labelledby="about-heading">
      <h1 id="about-heading">Software Engineering Curriculum</h1>
      <p>A rigorous, project-grounded path for full-stack practitioners.</p>
    </section>

    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading">Selected Projects</h2>
      
      <article>
        <h3>Distributed API Gateway</h3>
        <p>Built with Node.js, Express, and Redis caching layers.</p>
        <a href="/projects/gateway">Read Case Study</a>
      </article>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 DevCampus. All rights reserved.</p>
  </footer>
</body>
</html>`,
          explanation: 'Every element serves a specific purpose: aria-labelledby links headings to sections, meta viewport ensures mobile scaling, and header/nav/main/footer provide accessibility landmarks.'
        }
      ],
      realWorldExample: {
        scenario: 'Screen reader accessibility for visually impaired engineers',
        industryApplication: 'Blind users using JAWS or VoiceOver press landmark navigation shortcuts ("D" or "H") to jump instantly to `<main>` or step through `<h2>` headings. If the page is composed only of `<div>` tags, the user must listen to every navigation link on every single page load.',
        takeaway: 'Semantic landmarks provide critical keyboard and screen reader accessibility without requiring extra JavaScript.'
      },
      practicalExercise: {
        title: 'Refactor Div Soup into Semantic HTML5',
        objective: 'Convert a legacy non-semantic layout into accessible HTML5 markup.',
        requirements: ['A code editor (VS Code)'],
        steps: [
          'Take a legacy snippet containing `<div id="header">`, `<div id="menu">`, `<div class="content">`, and `<div class="sidebar">`.',
          'Replace each generic division with its semantic counterpart: `<header>`, `<nav>`, `<main>`, and `<aside>`.',
          'Ensure there is strictly one `<h1>` per page and all subheadings follow logical sequential order (`<h2>`, then `<h3>`).',
          'Validate the output on validator.w3.org.'
        ],
        expectedResult: 'A clean document tree where every container has semantic purpose and W3C validation passes with zero errors.',
        challengeExtension: 'Add a "Skip to Content" link at the top of the body that allows keyboard users to bypass the navigation directly to `<main id="main-content">`.'
      },
      commonMistakes: [
        {
          mistake: 'Using multiple `<main>` elements or placing `<main>` inside a `<header>` or `<footer>`.',
          whyItHappens: 'Misunderstanding that `<main>` must represent the unique core content of the document.',
          howToFix: 'Ensure there is only one visible `<main>` tag per page, placed directly as a top-level child of `<body>`.'
        },
        {
          mistake: 'Skipping heading levels (e.g., using `<h1>` followed immediately by `<h4>` because you want smaller text).',
          whyItHappens: 'Using HTML tags for visual font size rather than semantic document structure.',
          howToFix: 'Maintain strict structural hierarchy: h1 → h2 → h3. Control visual text size exclusively via CSS.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm02-l1-q1',
          type: 'multiple-choice',
          question: 'Which HTML5 element represents an independent, self-contained piece of content that could be distributed in an RSS feed?',
          options: ['<section>', '<article>', '<aside>', '<div>'],
          correctAnswerIndex: 1,
          explanation: '<article> is designed for standalone syndicatable content such as blog posts, news stories, and forum threads.'
        },
        {
          id: 'm02-l1-q2',
          type: 'true-false',
          question: 'The `<meta name="viewport">` tag is required for responsive websites to scale correctly on mobile devices.',
          options: ['True', 'False'],
          correctAnswerIndex: 0,
          explanation: 'True. Without `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, mobile browsers assume a desktop width (typically 980px) and shrink the page down to fit the screen.'
        }
      ],
      summary: [
        'HTML5 elements provide semantic meaning to search engines and assistive screen readers.',
        'Core landmarks include <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer>.',
        'Never skip heading levels for visual styling—use CSS for presentation and HTML for hierarchy.'
      ],
      additionalResources: [
        {
          name: 'MDN: HTML Semantic Elements',
          description: 'In-depth reference on all HTML5 structural landmarks.',
          url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html',
          usefulFor: 'Understanding when to use <section> vs <article> vs <div>.'
        }
      ]
    },
    {
      id: 'm02-l02',
      number: 2,
      title: 'Accessible Forms, Inputs & Client-Side Validation',
      durationMinutes: 55,
      learningObjectives: [
        'Build accessible forms where every input is explicitly bound to a <label> via the for/id attribute relationship.',
        'Leverage native HTML5 input types (email, tel, url, number, date) for automatic mobile keyboard optimization.',
        'Enforce form constraints using required, min, max, maxlength, and pattern regex attributes.',
        'Group related form controls using <fieldset> and <legend>.'
      ],
      introduction: 'Forms are the primary interactive vehicle for gathering user data—from login credentials to payment details. Inaccessible or poorly validated forms result in abandoned shopping carts, user frustration, and corrupted database entries.',
      detailedNotes: `A web form is encapsulated within the '<form action="/submit" method="POST">' element.

Key accessibility rule:
Every interactive form control must have an associated '<label>'. Clicking a label focuses the corresponding input (enlarging the effective touch target for mobile users and announcing the purpose to screen readers).

There are two methods of association:
1. Explicit binding (Recommended):
'<label for="user-email">Email Address</label>'
'<input type="email" id="user-email" name="email" required>'

2. Implicit wrapping:
'<label>Email Address <input type="email" name="email"></label>'

Native HTML5 Validation Attributes:
- 'required': Prevents submission if the field is empty.
- 'type="email"': Validates email syntax and displays email-optimized keyboard (@ and .com) on smartphones.
- 'type="tel"': Prompts numeric dial pad on mobile.
- 'min' / 'max': Specifies numerical or date boundaries.
- 'pattern="[0-9]{5}"': Validates input against a regular expression.`,
      concepts: [
        {
          name: 'Form Control Association and Fieldsets',
          description: 'Grouping controls logically with fieldset and legend prevents cognitive overload.',
          table: {
            headers: ['Input Type', 'Mobile Keyboard Triggered', 'Built-in Browser Validation'],
            rows: [
              ['type="text"', 'Standard alphanumeric', 'Length constraints (minlength, maxlength)'],
              ['type="email"', 'Alphabetical with @ and . keys', 'Validates user@domain email syntax'],
              ['type="tel"', 'Numeric telephone keypad', 'None natively; pair with pattern attribute'],
              ['type="number"', 'Numeric keypad with minus/period', 'Enforces numeric step, min, and max limits'],
              ['type="date"', 'Native OS date picker', 'Enforces valid calendar dates']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'html',
          title: 'Production-Ready Accessible Contact Form',
          code: `<form action="/api/contact" method="POST" novalidate>
  <fieldset>
    <legend>Personal Details</legend>

    <div class="form-group">
      <label for="full-name">Full Name <span aria-hidden="true">*</span></label>
      <input 
        type="text" 
        id="full-name" 
        name="fullName" 
        required 
        minlength="2"
        maxlength="60"
        autocomplete="name"
        aria-required="true"
      >
    </div>

    <div class="form-group">
      <label for="work-email">Work Email <span aria-hidden="true">*</span></label>
      <input 
        type="email" 
        id="work-email" 
        name="workEmail" 
        required 
        autocomplete="email"
        aria-describedby="email-hint"
      >
      <small id="email-hint">We will never share your email address.</small>
    </div>
  </fieldset>

  <fieldset>
    <legend>Inquiry Type</legend>

    <div class="radio-group">
      <input type="radio" id="inquiry-general" name="inquiryType" value="general" checked>
      <label for="inquiry-general">General Inquiry</label>

      <input type="radio" id="inquiry-consulting" name="inquiryType" value="consulting">
      <label for="inquiry-consulting">Consulting &amp; Architecture</label>
    </div>
  </fieldset>

  <div class="form-group">
    <label for="message">Project Description <span aria-hidden="true">*</span></label>
    <textarea 
      id="message" 
      name="message" 
      rows="5" 
      required
      placeholder="Outline your technical requirements..."
    ></textarea>
  </div>

  <button type="submit">Submit Inquiry</button>
</form>`,
          explanation: 'Notice how every input is linked to a label via id/for, fieldsets group related radios, aria-describedby links help text, and autocomplete attributes assist password managers and browser autofill.'
        }
      ],
      realWorldExample: {
        scenario: 'E-commerce checkout completion rate',
        industryApplication: 'Adding `autocomplete="cc-number"` and `autocomplete="email"` to checkout inputs reduces mobile checkout friction by 35%, allowing users to tap one button to fill credit card and shipping details from their browser keychain.',
        takeaway: 'Proper form attributes directly boost user conversion and reduce input error rates.'
      },
      practicalExercise: {
        title: 'Build a Validated Registration Form',
        objective: 'Create an accessible, multi-input registration form with HTML5 constraints.',
        requirements: ['Text editor'],
        steps: [
          'Create a form with fields for Username, Email, Password, Age, and Terms Checkbox.',
          'Enforce that Username must be between 3 and 20 alphanumeric characters using pattern="[a-zA-Z0-9]{3,20}".',
          'Enforce that Age must be a number between 18 and 120.',
          'Provide clear labels and helper text linked with aria-describedby.'
        ],
        expectedResult: 'Submitting an empty form or invalid email triggers native browser tooltip warnings preventing submission.',
        challengeExtension: 'Add a custom regex pattern to validate a postal/zip code format (e.g., 5 digits).'
      },
      commonMistakes: [
        {
          mistake: 'Using placeholder text as a replacement for `<label>`.',
          whyItHappens: 'Developers attempt a minimalist UI by putting "Enter your name" inside the input placeholder.',
          howToFix: 'Placeholders disappear as soon as the user types, leaving people with cognitive impairments or screen reader users unable to verify what the field asks for. Always use persistent `<label>` tags.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm02-l2-q1',
          type: 'multiple-choice',
          question: 'What is the purpose of the `for` attribute on an HTML `<label>` element?',
          options: [
            'It loops through an array of items like a for-loop',
            'It matches the `id` of an `<input>` element to programmatically bind them together',
            'It sends the form to an external server',
            'It sets the CSS font family'
          ],
          correctAnswerIndex: 1,
          explanation: 'The `for` attribute on a label must match the unique `id` of the input control, enabling screen readers to read the label when the input is focused.'
        }
      ],
      summary: [
        'Forms must always pair inputs with explicit <label> elements.',
        'HTML5 input types (email, tel, number) provide native validation and optimize mobile touch keyboards.',
        'Use <fieldset> and <legend> to group related sets of options (like radio buttons or checkboxes).'
      ],
      additionalResources: [
        {
          name: 'W3C WAI Web Accessibility Tutorials — Forms',
          description: 'Official W3C guidelines for creating accessible forms.',
          url: 'https://www.w3.org/WAI/tutorials/forms/',
          usefulFor: 'Mastering form labeling, error notification, and multi-step forms.'
        }
      ]
    },
    {
      id: 'm02-l03',
      number: 3,
      title: 'Multimedia, Tables & Interactive HTML5 Elements',
      durationMinutes: 60,
      learningObjectives: [
        'Implement responsive art direction with `<picture>` and `<source>` utilizing AVIF and WebP image formats.',
        'Integrate accessible video and audio players with custom fallbacks and subtitle tracks (`<track kind="captions">`).',
        'Build accessible tabular datasets with `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, and scoped headers (`<th scope="col|row">`).',
        'Leverage native browser disclosure widgets and modal dialogs using `<details>`, `<summary>`, and `<dialog>`.'
      ],
      introduction: 'Beyond static headings and paragraphs, modern web applications handle complex data: responsive multi-density photography, streaming video, tabular reports, expandable accordions, and native dialogs without requiring heavy third-party JavaScript libraries.',
      detailedNotes: `Modern Responsive Images (<picture> and <source>):
In high-performance web engineering, delivering a single large 2000px JPEG to a 375px mobile phone wastes cellular bandwidth and damages Core Web Vitals.
The '<picture>' element enables:
1. Media condition switching (serving a tight crop for mobile viewports and a wide landscape for desktop monitors).
2. Format negotiation: Browsers automatically choose the modern, ultra-compressed AVIF format if supported, falling back to WebP, and finally to standard JPEG/PNG.

Accessible Native Video (<video>):
Modern video tags require multiple sources ('video/webm' and 'video/mp4') and closed-captioning tracks ('<track kind="captions">') encoded in WebVTT (.vtt) format for deaf or hard-of-hearing users.

Accessible Data Tables:
Tables should NEVER be used for visual page layout. When presenting structured relational data:
- '<caption>': Announces the summary title of the table to screen readers.
- 'scope="col"': Declares a column header.
- 'scope="row"': Declares a row header.
- '<thead>', '<tbody>', '<tfoot>': Separate column definitions, table records, and aggregate summary calculations.

Native Interactive Widgets:
- '<details>' and '<summary>': Creates an accessible, keyboard-operable accordion/disclosure box natively.
- '<dialog>': Provides a top-layer modal window with native backdrop dimming, automatic focus trapping, and Escape key dismissal when invoked via 'dialog.showModal()'.`,
      concepts: [
        {
          name: 'The Responsive Picture Format Negotiation Pipeline',
          description: 'How browsers pick the best image asset based on format support and viewport width.',
          table: {
            headers: ['Format', 'Compression Efficiency', 'Browser Support', 'Best Used For'],
            rows: [
              ['AVIF', 'Highest (~50% smaller than JPEG)', 'All modern browsers (Chrome, Firefox, Safari 16+)', 'Hero images, detailed photography'],
              ['WebP', 'High (~30% smaller than JPEG)', 'Universal (97%+ global)', 'Thumbnails, illustrations, product cards'],
              ['JPEG / PNG', 'Legacy baseline', '100% universal', 'Final fallback if AVIF/WebP fails']
            ]
          },
          diagram: `<picture>
   ├── <source type="image/avif" srcset="hero.avif">  ──► (Browser supports AVIF? YES -> Downloads 80kB AVIF)
   ├── <source type="image/webp" srcset="hero.webp">  ──► (Fallback 1: Downloads 120kB WebP)
   └── <img src="hero.jpg" alt="...">                 ──► (Fallback 2: Downloads 250kB JPEG)`
        }
      ],
      codeExamples: [
        {
          language: 'html',
          title: 'Complete Multimedia, Native Modal Dialog & Accessible Table Implementation',
          code: `<!-- 1. High-Performance Responsive Picture -->
<picture>
  <source media="(max-width: 640px)" srcset="product-mobile.avif" type="image/avif">
  <source media="(min-width: 641px)" srcset="product-desktop.avif" type="image/avif">
  <img 
    src="product-fallback.jpg" 
    alt="Mechanical keyboard with custom keycaps on walnut desk." 
    width="800" 
    height="450" 
    loading="lazy" 
    decoding="async"
  >
</picture>

<!-- 2. Accessible Native Dialog Element -->
<button type="button" onclick="document.getElementById('spec-dialog').showModal()">
  View Technical Specs
</button>

<dialog id="spec-dialog" aria-labelledby="dialog-title" class="modal-box">
  <h2 id="dialog-title">System Specifications</h2>
  <p>Dual-core isolated execution sandbox with 8GB RAM.</p>
  <button type="button" onclick="this.closest('dialog').close()">Close Modal</button>
</dialog>

<!-- 3. Accessible Data Table with Scopes & Caption -->
<table>
  <caption>Quarterly Server Resource Allocation</caption>
  <thead>
    <tr>
      <th scope="col">Instance Name</th>
      <th scope="col">vCPUs</th>
      <th scope="col">Memory</th>
      <th scope="col">Monthly Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">api-gateway-01</th>
      <td>4</td>
      <td>16 GB</td>
      <td>$80.00</td>
    </tr>
    <tr>
      <th scope="row">db-primary-replica</th>
      <td>8</td>
      <td>32 GB</td>
      <td>$160.00</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row" colspan="3">Total Dedicated Infrastructure</th>
      <td>$240.00</td>
    </tr>
  </tfoot>
</table>`,
          explanation: 'Demonstrates modern HTML5 mastery: next-gen responsive image negotiation with lazy loading, native accessible dialog, and full tabular accessibility with scope="col" and scope="row".'
        }
      ],
      realWorldExample: {
        scenario: 'Lighthouse mobile performance audit for an international retail store',
        industryApplication: 'Replacing legacy uncompressed PNG hero images with `<picture>` serving AVIF and explicit width/height dimensions reduced page weight from 4.2MB to 380kB, lifting mobile Lighthouse performance scores from 42 to 98 and directly lowering bounce rates.',
        takeaway: 'Responsive multimedia formatting is the single highest-impact optimization for mobile load times.'
      },
      practicalExercise: {
        title: 'Construct an Interactive FAQ Accordion and Native Dialog',
        objective: 'Build an interactive FAQ section using only HTML `<details>` and `<summary>` without a single line of JavaScript.',
        requirements: ['HTML editor'],
        steps: [
          'Create three `<details>` blocks, each wrapping a `<summary>` with the question and a paragraph answer.',
          'Add the `open` attribute to the first item so it is expanded by default on initial page load.',
          'Add a `<dialog>` element containing license terms and link it to an opening button using native `showModal()`.',
          'Test with keyboard: Tab to the summary, press Enter to toggle expansion, and press Escape to dismiss the dialog.'
        ],
        expectedResult: 'Fully interactive, accessible accordion and modal functioning with zero external scripts.'
      },
      commonMistakes: [
        {
          mistake: 'Omitting explicit `width` and `height` attributes on `<img>` and `<video>` tags.',
          whyItHappens: 'Assuming CSS will handle dimensions.',
          howToFix: 'Without width/height in HTML, the browser cannot calculate the aspect ratio before the file finishes downloading, causing massive Cumulative Layout Shift (CLS). Always supply HTML width and height.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm02-l3-q1',
          type: 'multiple-choice',
          question: 'What is the advantage of opening an HTML5 `<dialog>` using `dialog.showModal()` instead of adding the `open` attribute?',
          options: [
            'It changes the text color to purple',
            '`showModal()` automatically places the dialog in the browser Top Layer, creates a dimmable `::backdrop`, locks keyboard focus inside the modal, and enables Escape key closing',
            'It encrypts the modal content',
            'It sends an email notification'
          ],
          correctAnswerIndex: 1,
          explanation: 'showModal() activates true modal behavior: rendering in the top layer, trapping focus, dimming the backdrop, and enabling ESC key dismissal.'
        }
      ],
      summary: [
        'Use <picture> and <source> to serve next-gen formats (AVIF, WebP) with art-direction.',
        'Never use <table> for layout; always provide <caption>, thead, tbody, and th scope="col|row".',
        'Take advantage of native interactive elements like <details>, <summary>, and <dialog> to avoid redundant JavaScript.'
      ],
      additionalResources: [
        {
          name: 'MDN: Responsive Images with Picture',
          description: 'Official guide to art direction and format negotiation.',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images',
          usefulFor: 'Mastering picture, srcset, and sizes.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm02-lab-1',
      title: 'Lab 2.1: Semantic Document & Accessibility Audit',
      durationMinutes: 60,
      objective: 'Build a multi-section technical document, validate with W3C, and test keyboard accessibility with Tab indexing.',
      prerequisites: ['Module 01 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Structure the Document Landmarks',
          instructions: 'Create an index.html file with header, main, two sections with articles, an aside, and a footer.',
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Engineering Standards Documentation</title>
</head>
<body>
  <header>
    <h1>Engineering Standards &amp; Architecture</h1>
  </header>
  <main>
    <section>
      <h2>Section 1: Semantic Markup</h2>
      <article>
        <h3>WCAG Compliance Guidelines</h3>
        <p>Accessible HTML guarantees universal accessibility.</p>
      </article>
    </section>
  </main>
  <footer>
    <p>Last revised: 2026</p>
  </footer>
</body>
</html>`
        },
        {
          stepNumber: 2,
          title: 'W3C Markup Validation',
          instructions: 'Upload the markup to https://validator.w3.org/#validate_by_input to verify zero syntax warnings.'
        }
      ],
      verificationChecklist: [
        'Document passes W3C Nu HTML Checker with zero errors',
        'All interactive elements are reachable using only the Tab key',
        'Images contain descriptive alt attributes'
      ],
      deliverables: ['Validated index.html file and W3C validation confirmation']
    }
  ],
  moduleProject: {
    id: 'm02-project',
    title: 'Personal Portfolio Website (Semantic HTML Structure)',
    difficulty: 'Beginner',
    estimatedHours: 6,
    overview: 'Construct the complete, standards-compliant, semantic HTML5 structure of a professional software developer portfolio. Focus entirely on rock-solid semantic hierarchy, comprehensive SEO head metadata, accessible project showcase articles, a contact form with complete native validation, and an accessible navigation landmark with skip links.',
    requirements: [
      'Strict HTML5 DOCTYPE and semantic landmarks (<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>)',
      'Complete SEO head metadata: description, keywords, Open Graph (og:title, og:description, og:image), Twitter cards',
      'One clean <h1> representing the developer identity, followed by logical <h2> and <h3> sectioning',
      'A Projects section containing at least three <article> elements, each with project title, tech stack description, and links',
      'An accessible Skills section containing a semantic <table> or structured list detailing technical competencies',
      'A Contact Form with fields for Name, Email, Subject, Project Budget range (<select>), and Message with HTML5 validation constraints',
      'WCAG AA accessible: all images have meaningful alt attributes; all form controls have linked <label> tags'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Metadata & Document Head Setup',
        tasks: ['Configure UTF-8, viewport, title, and Open Graph meta tags']
      },
      {
        milestone: 2,
        title: 'Navigation & Hero Landmark',
        tasks: ['Add skip-to-content anchor', 'Build header with brand and aria-labeled navigation list']
      },
      {
        milestone: 3,
        title: 'Project Articles & Skills Table',
        tasks: ['Structure three distinct project articles with semantic figure/figcaption elements', 'Create tabular skills breakdown']
      },
      {
        milestone: 4,
        title: 'Accessible Contact Form & Validation',
        tasks: ['Build contact form with fieldset, legend, labels, required attributes, and submit button']
      }
    ],
    starterCodeStructure: [
      {
        path: 'portfolio/index.html',
        description: 'Complete semantic portfolio markup',
        sampleContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Senior Full-Stack Web Engineer specializing in distributed architectures and modern React ecosystems.">
  <title>Jordan Taylor | Full-Stack Software Engineer</title>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>
  
  <header>
    <p>Jordan Taylor</p>
    <nav aria-label="Primary Navigation">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <!-- Main portfolio sections -->
  </main>
</body>
</html>`
      }
    ],
    acceptanceCriteria: [
      'Document passes W3C HTML validator with zero errors',
      'Zero unlabeled input fields',
      'All image tags feature descriptive alt attributes',
      'Tab key allows full sequential navigation through links and form inputs'
    ],
    rubric: [
      { criteria: 'Semantic HTML5 Architecture', points: 30, description: 'Exemplary use of landmarks, sectioning, and article boundaries' },
      { criteria: 'Accessibility & Forms', points: 30, description: 'Proper labels, aria landmarks, skip link, and native validation' },
      { criteria: 'SEO & Metadata', points: 20, description: 'Comprehensive Open Graph, Twitter cards, and viewport tags' },
      { criteria: 'Cleanliness & Standards', points: 20, description: 'Flawless indentation, semantic tags, zero W3C errors' }
    ]
  },
  quiz: [
    {
      id: 'm02-qz-01',
      question: 'Which of the following elements is an accessibility landmark that should appear only once per HTML document?',
      options: ['<nav>', '<header>', '<main>', '<section>'],
      correctAnswerIndex: 2,
      explanation: 'The <main> element represents the central unique content of the document and must not be duplicated.'
    },
    {
      id: 'm02-qz-02',
      question: 'Why should image `alt` text not begin with the words "Image of" or "Picture of"?',
      options: [
        'It causes CSS styling errors in WebKit browsers',
        'Screen readers already announce "graphic" or "image" before reading the alt text, making it redundant',
        'It triggers Google search spam penalties',
        'HTML5 deprecates the alt attribute'
      ],
      correctAnswerIndex: 1,
      explanation: 'Screen readers automatically declare the element as an image before announcing its alt text; redundant prefixes waste the user’s time.'
    },
    {
      id: 'm02-qz-03',
      question: 'What is the effect of placing `novalidate` on an HTML `<form>` tag?',
      options: [
        'It disables form submissions permanently',
        'It prevents the browser from executing native HTML5 constraint validation upon submission',
        'It automatically sends the form data to an external email service',
        'It disables JavaScript event listeners'
      ],
      correctAnswerIndex: 1,
      explanation: 'novalidate suppresses the browser native popup validation balloons, commonly used when custom JavaScript validation logic is applied.'
    },
    {
      id: 'm02-qz-04',
      question: 'Which input type displays a numerical keypad with a decimal point on mobile touch devices?',
      options: ['type="text"', 'type="number"', 'type="tel"', 'type="password"'],
      correctAnswerIndex: 1,
      explanation: 'type="number" instructs mobile operating systems to present a numeric keyboard with decimal support.'
    },
    {
      id: 'm02-qz-05',
      question: 'What does Open Graph metadata (e.g., `og:image`, `og:title`) provide?',
      options: [
        '3D WebGL graphics rendering inside the canvas',
        'Rich preview cards (thumbnail, headline, description) when a URL is shared on platforms like Slack, LinkedIn, or Twitter',
        'Direct connection to an SQL database',
        'Automatic dark mode color switching'
      ],
      correctAnswerIndex: 1,
      explanation: 'The Open Graph protocol standardizes how social networks and messaging apps scrape rich link preview cards.'
    }
  ],
  assignment: {
    id: 'm02-assign',
    title: 'Accessible Form & Semantic Document Specification',
    problemStatement: 'Design and code a comprehensive Job Application Form for a technical role. The form must include text inputs, file upload, radio groups, date selector, multi-select checkboxes for skills, and a terms agreement checkbox—with complete semantic labeling, helper descriptions, and error prevention.',
    specifications: [
      'Include fieldsets for "Applicant Information", "Work Experience", and "Consent"',
      'Bind all inputs to <label> elements with explicit `for` attributes',
      'Use `aria-describedby` to link helper instructions to input fields',
      'Configure native validation attributes (required, pattern, minlength, accept for file types)',
      'Include a submit button with type="submit"'
    ],
    deliverables: ['A single standalone `job-application.html` file meeting all WCAG AA form requirements.'],
    evaluationRubric: [
      { category: 'Accessibility & Label Binding', weight: '40%', description: '100% of controls have linked labels and aria descriptors' },
      { category: 'Semantic Grouping', weight: '30%', description: 'Proper usage of fieldsets, legends, and input types' },
      { category: 'Validation Quality', weight: '30%', description: 'Robust regex patterns, constraints, and mobile-friendly types' }
    ],
    submissionFormat: 'HTML file submitted to repository with W3C validation badge'
  },
  resources: [
    {
      name: 'W3C Nu HTML Checker',
      description: 'Official W3C markup validator.',
      url: 'https://validator.w3.org/nu/',
      usefulFor: 'Validating HTML documents against modern living standards.'
    },
    {
      name: 'WebAIM Screen Reader Survey & Guidance',
      description: 'The premier web accessibility organization guidelines.',
      url: 'https://webaim.org/techniques/semanticstructure/',
      usefulFor: 'Learning how assistive technology parses headings, lists, and tables.'
    },
    {
      name: 'MDN Web Docs: HTML Elements Reference',
      description: 'Complete catalog of all HTML elements and attributes.',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
      usefulFor: 'Detailed technical reference for every HTML tag.'
    }
  ],
  summary: 'Module 02 delivered mastery over HTML5 semantic architecture, accessible form controls, SEO metadata, and WCAG AA standards. You can now craft structural blueprints that are universally accessible to both human users and automated search engine scrapers.'
};
