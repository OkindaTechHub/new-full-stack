import { Module } from '../../types/course';

export const module03Css: Module = {
  id: 'module-03',
  moduleNumber: 3,
  title: 'CSS & Modern Web Design',
  slug: 'css-modern-web-design',
  durationWeeks: 'Week 3',
  level: 'Beginner → Intermediate',
  phase: 'Phase 1: Web Foundations',
  overview: {
    whatItTeaches: 'Cascading Style Sheets (CSS3), selector specificity, the box model, Flexbox 1D layouts, CSS Grid 2D multidimensional systems, mobile-first responsive architecture with media queries, CSS custom properties (variables), transitions, keyframe animations, and modern layout algorithms.',
    whyItMatters: 'CSS controls visual presentation, typographic rhythm, and responsive adaptability across every device viewport. Without mastering specificity, the cascade, and modern flex/grid models, developers suffer from unpredictable layout breakage and bloated, unmaintainable stylesheets.',
    prerequisites: ['Module 02: HTML5 & Semantic Web'],
    estimatedHours: 16,
    skillsAcquired: [
      'Calculating CSS specificity scores and mastering cascade inheritance',
      'Implementing the standard and alternate (box-sizing: border-box) Box Models',
      'Architecting 1D layouts with Flexbox (main/cross axes, alignment, flex-grow/shrink/basis)',
      'Constructing complex 2D responsive grids using CSS Grid (grid-template-areas, repeat, minmax, auto-fit)',
      'Designing mobile-first responsive stylesheets with min-width media queries',
      'Crafting micro-interactions using CSS transitions, transforms, and @keyframes animations',
      'Managing design tokens using CSS Custom Properties (--variables)'
    ]
  },
  lessons: [
    {
      id: 'm03-l01',
      number: 1,
      title: 'The Cascade, Specificity & The Modern Box Model',
      durationMinutes: 50,
      learningObjectives: [
        'Calculate CSS specificity weights across inline styles, IDs, classes, and elements.',
        'Explain the resolution order of the Cascade (Origin, Specificity, Source Order).',
        'Configure `box-sizing: border-box` globally and calculate total element dimensions.',
        'Manage margin collapse phenomena in vertical document flows.'
      ],
      introduction: 'Many developers find CSS frustrating because they do not understand its governing physics: the Cascade, Specificity, and the Box Model. Once these three deterministic rules are internalized, styling becomes predictable and systematic.',
      detailedNotes: `CSS stands for Cascading Style Sheets. The "Cascade" is the algorithm browsers use to resolve competing style declarations targeting the same element.

Order of Resolution:
1. Origin and Importance: User Agent defaults < Author styles < Author !important styles < User Agent !important.
2. Specificity Score: A 3-tier tuple (A, B, C):
   - A: ID selectors (#header) = 1,0,0
   - B: Class selectors (.card), attribute selectors ([type="text"]), and pseudo-classes (:hover, :nth-child) = 0,1,0
   - C: Type / element selectors (div, p, h1) and pseudo-elements (::before) = 0,0,1
   * Inline styles ('style=""') override all sheet declarations (1,0,0,0) unless '!important' is invoked.
3. Source Order: If specificity scores tie, the rule written last in the CSS source file wins.

The Box Model:
Every rendered element is an invisible rectangular box composed of four concentric layers:
1. Content: The text, image, or video itself.
2. Padding: The transparent breathing room between content and border.
3. Border: The perimeter edge wrapping the padding.
4. Margin: The transparent spacing outside the border separating this element from sibling elements.

The Universal Box-Sizing Reset:
Under legacy 'box-sizing: content-box', setting 'width: 300px; padding: 20px; border: 5px solid black;' produces a rendered box width of 350px (300 + 40 + 10).
Under modern 'box-sizing: border-box', the padding and borders are absorbed inside the declared width, so the final rendered element remains exactly 300px wide.`,
      concepts: [
        {
          name: 'The Specificity Hierarchy Formula',
          description: 'A mathematical tuple determining declaration precedence.',
          table: {
            headers: ['Selector', 'Specificity Tuple', 'Total Weight Rank'],
            rows: [
              ['p', '(0, 0, 1)', 'Low (1 point)'],
              ['.card p', '(0, 1, 1)', 'Medium (11 points)'],
              ['#main-nav .menu-item:hover', '(1, 2, 0)', 'High (120 points)'],
              ['style="color: red;"', '(1, 0, 0, 0)', 'Inline Override']
            ]
          },
          diagram: `+-----------------------------------------------------+
|                     MARGIN                          |
|  +-----------------------------------------------+  |
|  |                  BORDER                       |  |
|  |  +-----------------------------------------+  |  |
|  |  |               PADDING                   |  |  |
|  |  |  +-----------------------------------+  |  |  |
|  |  |  |            CONTENT                |  |  |  |
|  |  |  |   (Width & Height with border-box)|  |  |  |
|  |  |  +-----------------------------------+  |  |  |
|  |  +-----------------------------------------+  |  |
|  +-----------------------------------------------+  |
+-----------------------------------------------------+`
        }
      ],
      codeExamples: [
        {
          language: 'css',
          title: 'The Modern Professional CSS Reset & Custom Properties',
          code: `/* 1. Global Box-Sizing & Margin Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 2. Accessible Design Tokens using CSS Custom Properties */
:root {
  --color-bg-primary: #020617;
  --color-bg-surface: #0f172a;
  --color-text-main: #f8fafc;
  --color-text-muted: #94a3b8;
  --color-accent: #38bdf8;
  --color-border: rgba(148, 163, 184, 0.12);

  --font-family-body: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;

  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-main);
  font-family: var(--font-family-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* 3. Container Card Demonstrating Border-Box Math */
.content-card {
  width: 100%;
  max-width: 600px;
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  background-color: var(--color-bg-surface);
  border-radius: var(--radius-lg);
  margin-inline: auto; /* Modern horizontal centering */
}`,
          explanation: 'The universal selector with box-sizing: border-box ensures predictable sizing. CSS variables establish reusable design tokens.'
        }
      ],
      realWorldExample: {
        scenario: 'Overwriting third-party UI library styles',
        industryApplication: 'When integrating an external datepicker or component library, beginners often resort to sprinkling `!important` across their CSS, causing unmaintainable cascade wars. Senior engineers instead increase specificity cleanly (e.g., `.my-app .datepicker-input`) or leverage modern CSS Cascade Layers (`@layer`).',
        takeaway: 'Understanding specificity prevents the need for destructive `!important` declarations.'
      },
      practicalExercise: {
        title: 'Compute Specificity and Fix Margin Collapse',
        objective: 'Resolve conflicting CSS rules and debug vertical margin collapse between sibling headings and paragraphs.',
        requirements: ['HTML and CSS files'],
        steps: [
          'Create two sibling elements: an `<h2>` with `margin-bottom: 30px;` and a `<p>` with `margin-top: 20px;`.',
          'Measure the computed distance between them in DevTools (observe that it collapses to 30px, not 50px).',
          'Write three competing selectors targeting the paragraph with varying classes and IDs, and predict which color declaration wins before inspecting DevTools.'
        ],
        expectedResult: 'The larger margin collapses the smaller adjacent vertical margin, and the selector with the highest specificity tuple wins.'
      },
      commonMistakes: [
        {
          mistake: 'Using `!important` to solve specificity conflicts.',
          whyItHappens: 'A quick fix when a style does not apply immediately due to existing class or ID rules.',
          howToFix: 'Inspect the computed tab in DevTools to find the winning selector, then match or cleanly supersede its specificity score.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm03-l1-q1',
          type: 'code-analysis',
          question: 'Between `.nav .item a` (Selector 1) and `#main-menu a` (Selector 2), which selector has higher specificity?',
          options: [
            'Selector 1 because it has more classes',
            'Selector 2 because it contains an ID selector (1,0,1 vs 0,2,1)',
            'They have equal specificity',
            'The browser picks randomly'
          ],
          correctAnswerIndex: 1,
          explanation: 'An ID selector (weight 1,0,0) immediately outweighs any number of class selectors (0,1,0).'
        }
      ],
      summary: [
        'The cascade resolves conflicts via Importance, Specificity, and Source Order.',
        'box-sizing: border-box includes padding and borders inside the declared width and height.',
        'CSS variables (--token) provide design consistency and runtime theming.'
      ],
      additionalResources: [
        {
          name: 'MDN: Specificity Calculator & Guide',
          description: 'Official Mozilla guide to specificity weighting.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity',
          usefulFor: 'Detailed calculation drills and rules.'
        }
      ]
    },
    {
      id: 'm03-l02',
      number: 2,
      title: 'Modern Layouts: Flexbox 1D & CSS Grid 2D Systems',
      durationMinutes: 60,
      learningObjectives: [
        'Master 1D Flexbox alignment along main (justify-content) and cross (align-items) axes.',
        'Utilize flex shorthand (`flex: 1 1 auto`) to control growth, shrinkage, and base sizes.',
        'Architect 2D multidimensional layouts with CSS Grid using `grid-template-columns` and `fr` units.',
        'Build fully fluid auto-responsive grids using `repeat(auto-fit, minmax(280px, 1fr))` without media queries.'
      ],
      introduction: 'Before Flexbox and Grid, web developers struggled with float clearfixes, inline-block whitespace hacks, and table layouts. Modern CSS provides two complementary, mathematically sound layout engines: Flexbox for one-dimensional distribution and CSS Grid for two-dimensional matrices.',
      detailedNotes: `Flexbox (Flexible Box Layout):
Designed for distributing space and aligning items along a single axis (either row or column).
- Container properties:
  - 'display: flex'
  - 'flex-direction: row | column | row-reverse | column-reverse'
  - 'justify-content': Aligns children along the Main Axis ('flex-start', 'center', 'space-between', 'space-around', 'space-evenly').
  - 'align-items': Aligns children along the Cross Axis ('stretch', 'center', 'flex-start', 'flex-end', 'baseline').
  - 'gap': Sets spacing between items without margin hackery.
- Child (item) properties:
  - 'flex-grow': Proportional ability to grow if extra space exists.
  - 'flex-shrink': Proportional ability to shrink if space is constricted.
  - 'flex-basis': Initial size before remaining space is distributed.
  - Shorthand: 'flex: 1' (equivalent to 'flex: 1 1 0%').

CSS Grid:
Designed for two-dimensional layouts where alignment is synchronized across both rows and columns simultaneously.
- Container properties:
  - 'display: grid'
  - 'grid-template-columns: repeat(3, 1fr)' (3 equal fraction tracks).
  - 'grid-template-rows'
  - 'gap: 1.5rem'
- The magic auto-responsive grid formula:
  'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));'
  This single CSS line automatically fits as many 300px columns as the screen can accommodate, expanding each to fill leftover fraction space, seamlessly adapting from mobile to ultrawide desktop screens without requiring a single media query!`,
      concepts: [
        {
          name: 'Flexbox vs CSS Grid Decision Matrix',
          description: 'Choosing the right tool for the layout problem.',
          comparison: {
            itemA: 'Flexbox (1D)',
            itemB: 'CSS Grid (2D)',
            distinction: 'Flexbox works content-outward along one dimension (ideal for navbars, buttons, toolbars); Grid works layout-inward across both dimensions simultaneously (ideal for page layouts, card galleries, dashboards).'
          },
          table: {
            headers: ['Feature', 'Flexbox', 'CSS Grid'],
            rows: [
              ['Primary Dimensionality', 'One-dimensional (Row OR Column)', 'Two-dimensional (Rows AND Columns)'],
              ['Approach', 'Content-driven distribution', 'Structural container tracks'],
              ['Item Overlapping', 'Difficult (requires absolute positioning)', 'Native (assign same grid area/coordinates)'],
              ['Best Used For', 'Navigation bars, button groups, badge lists', 'Full page layouts, dashboard cards, image galleries']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'css',
          title: 'Auto-Responsive 2D Grid with CSS Grid',
          code: `/* Auto-Responsive Card Grid (Zero Media Queries Required) */
.product-grid {
  display: grid;
  /* Automatically places as many columns as fit with min 280px width */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1280px;
  margin-inline: auto;
}

/* Individual Card using Flexbox for Internal 1D Layout */
.product-card {
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 0.75rem;
  overflow: hidden;
}

.product-card-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Pushes footer button down to bottom consistently */
  padding: 1.25rem;
}

.product-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.product-card-desc {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.product-card-footer {
  margin-top: auto; /* Sticky bottom alignment in card */
  display: flex;
  align-items: center;
  justify-content: space-between;
}`,
          explanation: 'Combining CSS Grid for the macro 2D gallery with Flexbox inside each card for 1D vertical spacing creates rock-solid, production-grade responsive cards.'
        }
      ],
      realWorldExample: {
        scenario: 'Equal height card rows with aligned footer buttons',
        industryApplication: 'In product listings, descriptions have varying sentence lengths. Setting `.card-body { display: flex; flex-direction: column; }` and `.card-action { margin-top: auto; }` guarantees that all "Buy Now" buttons align perfectly in a horizontal row across all cards regardless of text differences.',
        takeaway: 'Flexbox margin: auto absorbs remaining space along the flex direction.'
      },
      practicalExercise: {
        title: 'Build a Responsive Bento-Grid Layout',
        objective: 'Construct an asymmetric dashboard bento-box using CSS Grid column and row spans.',
        requirements: ['HTML container with 5 cards'],
        steps: [
          'Define a 4-column CSS grid: `grid-template-columns: repeat(4, 1fr);`.',
          'Make Card 1 span 2 columns and 2 rows: `grid-column: span 2; grid-row: span 2;`.',
          'Make Card 2 span 2 columns and 1 row.',
          'Add a mobile media query collapsing all cards into single-column tracks below 768px.'
        ],
        expectedResult: 'A modern, dynamic Bento layout on desktop that seamlessly stacks on mobile screens.'
      },
      commonMistakes: [
        {
          mistake: 'Using Flexbox for complete 2D page grids and manually calculating percentage widths with negative margins.',
          whyItHappens: 'Habit from legacy float frameworks like Bootstrap 3.',
          howToFix: 'Use CSS Grid for two-dimensional grids. Let the browser calculate track widths with fractional `1fr` units and `gap`.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm03-l2-q1',
          type: 'multiple-choice',
          question: 'In the CSS rule `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`, what does `auto-fit` do?',
          options: [
            'Automatically scales the image resolution',
            'Fits as many 250px columns as the container width allows, stretching them to fill leftover space',
            'Enforces fixed pixel coordinates',
            'Hides extra columns offscreen'
          ],
          correctAnswerIndex: 1,
          explanation: 'auto-fit calculates the maximum number of tracks that can fit without overflowing and stretches them via 1fr.'
        }
      ],
      summary: [
        'Flexbox is optimized for 1D flows (navbars, toolbars, component internals).',
        'CSS Grid is optimized for 2D multidimensional matrices (page layouts, dashboards).',
        'Modern responsive design relies on auto-fit minmax formulas to reduce media query complexity.'
      ],
      additionalResources: [
        {
          name: 'CSS-Tricks: A Complete Guide to Flexbox',
          description: 'The visual reference manual for all Flexbox properties.',
          url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
          usefulFor: 'Visual diagrams of justify-content, align-items, and flex-wrap.'
        },
        {
          name: 'CSS-Tricks: A Complete Guide to CSS Grid',
          description: 'The definitive guide to grid template tracks and areas.',
          url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
          usefulFor: 'Mastering grid-template-areas and fractional sizing.'
        }
      ]
    },
    {
      id: 'm03-l03',
      number: 3,
      title: 'Advanced Modern CSS: :has(), Container Queries, @layer & Math Functions',
      durationMinutes: 60,
      learningObjectives: [
        'Apply the `:has()` relational pseudo-class to style parent containers based on child state or sibling conditions.',
        'Implement component-driven responsive design using Container Queries (`@container`) instead of global viewport media queries.',
        'Structure scalable, unshakeable CSS architecture using Cascade Layers (`@layer`) to defeat specificity wars.',
        'Create fluid typographic and spatial scales using CSS math functions: `clamp()`, `min()`, `max()`, and `calc()`.'
      ],
      introduction: 'For twenty years, responsive design meant checking the browser viewport width via `@media`. But in component-driven development (React, design systems), a card might render in a 300px sidebar OR a 1200px main column on the same screen! Modern CSS solves this with Container Queries, parent styling via `:has()`, Cascade Layers, and fluid math functions.',
      detailedNotes: `The Relational Pseudo-Class (:has()):
Often called the "parent selector", ':has()' selects an element if any selector passed as an argument matches at least one element within it.
- '.card:has(img)': Styles the card with different padding if it contains an image.
- 'form:has(:invalid) button[type="submit"]': Styles or dims the submit button if any input in the form is invalid.

Container Queries (@container):
Allows an element to apply styles based on the size of its nearest designated container ancestor rather than the global browser window.
1. Designate the container:
   '.card-wrapper { container-type: inline-size; container-name: card-slot; }'
2. Query the container:
   '@container card-slot (min-width: 400px) { .card { flex-direction: row; } }'
Now the card automatically shifts to a horizontal layout whenever its slot has $\\ge 400\\text{px}$ available, whether on a tablet or an ultrawide monitor.

Cascade Layers (@layer):
Provides explicit ordering of CSS precedence regardless of selector specificity!
Declarations in later layers always beat declarations in earlier layers:
'@layer reset, base, components, utilities;'
A simple class in '@layer utilities { .hidden { display: none; } }' will override a high-specificity ID selector in '@layer components { #nav-bar { display: flex; } }' cleanly without needing '!important'.

Fluid Math with clamp():
'font-size: clamp(1rem, 0.75rem + 1.5vw, 2.5rem);'
Computes a fluid size that smoothly scales with the viewport between an absolute minimum (1rem) and an absolute maximum (2.5rem).`,
      concepts: [
        {
          name: 'Viewport Media Queries vs Container Queries',
          description: 'Decoupling component adaptability from global window dimensions.',
          comparison: {
            itemA: 'Media Query (@media)',
            itemB: 'Container Query (@container)',
            distinction: '@media checks the entire browser window width; @container checks the immediate parent container width, allowing components to adapt anywhere in the UI layout.'
          },
          diagram: `[Browser Viewport: 1440px Desktop]
  ├── Sidebar (Width: 320px)   ──► Card inside sees container < 400px  ──► Renders Vertical Stack
  └── Main Deck (Width: 1000px) ──► Card inside sees container > 400px  ──► Renders Horizontal Grid`
        }
      ],
      codeExamples: [
        {
          language: 'css',
          title: 'Complete Modern CSS: :has(), @container, @layer and clamp()',
          code: `/* 1. Establish Explicit Cascade Order */
@layer reset, base, components;

@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
  }
}

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    background-color: #020617;
    color: #f8fafc;
  }
  
  /* Fluid Responsive Headline without Media Queries */
  h1 {
    font-size: clamp(1.75rem, 1.25rem + 2.5vw, 3.5rem);
    line-height: 1.15;
  }
}

@layer components {
  /* 2. Container Query Setup */
  .profile-slot {
    container-type: inline-size;
    container-name: profile;
  }

  .profile-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border-radius: 0.75rem;
    background-color: #0f172a;
    border: 1px solid rgba(148, 163, 184, 0.1);
  }

  /* Query the container inline size */
  @container profile (min-width: 480px) {
    .profile-card {
      flex-direction: row;
      align-items: center;
    }
  }

  /* 3. Parent Styling with :has() */
  /* If the card contains an active status dot, add high-intent accent border */
  .profile-card:has(.status-online) {
    border-color: rgba(56, 189, 248, 0.4);
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.1);
  }
}`,
          explanation: 'Demonstrates modern CSS architecture: @layer guarantees reset cannot override component styles, clamp() enables fluid typography, container queries allow independent card responsiveness, and :has() styles the card when online.'
        }
      ],
      realWorldExample: {
        scenario: 'Design systems with flexible component placement',
        industryApplication: 'Design systems at modern tech companies (like Shopify Polaris or GitHub Primer) build card components using Container Queries. A product card can be placed in a narrow modal drawer, a multi-column dashboard grid, or a full-width hero without writing separate modifier classes for each location.',
        takeaway: 'Container queries make components truly modular and self-responsive.'
      },
      practicalExercise: {
        title: 'Build a Self-Responsive Card with Container Queries and :has()',
        objective: 'Construct a reusable user profile card that adjusts its layout based on container width and changes background when an interactive switch is toggled.',
        requirements: ['HTML container with resizable slider'],
        steps: [
          'Wrap a `.card` inside a container with `container-type: inline-size`.',
          'Write a `@container (min-width: 500px)` rule switching the card from column to row.',
          'Add a checkbox input `<input type="checkbox" class="theme-toggle">` inside the card.',
          'Use `.card:has(.theme-toggle:checked)` to change the card background to an elevated indigo theme.',
          'Resize the parent container to observe the card change layout independently of browser width.'
        ],
        expectedResult: 'A self-contained component that adapts to its container dimensions and responds to nested child states.'
      },
      commonMistakes: [
        {
          mistake: 'Declaring `container-type: inline-size` directly on the element you are querying.',
          whyItHappens: 'Forgetting that an element cannot query its own dimensions.',
          howToFix: 'Always declare `container-type` on the PARENT wrapper element, and query the container inside the child element rules.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm03-l3-q1',
          type: 'multiple-choice',
          question: 'In CSS, what does the rule `article:has(> img)` select?',
          options: [
            'All images that are inside an article',
            'Any article element that has a direct child `<img>` element',
            'All articles that do not have images',
            'It is a syntax error in CSS3'
          ],
          correctAnswerIndex: 1,
          explanation: '`:has(> img)` checks if the article has a direct child image and applies the styling to the article itself.'
        }
      ],
      summary: [
        'Container Queries (@container) allow components to adapt to their parent container size rather than the viewport.',
        ':has() enables parent-state styling based on nested descendants.',
        '@layer provides absolute control over the cascade, eliminating specificity wars.'
      ],
      additionalResources: [
        {
          name: 'MDN Web Docs: CSS Container Queries',
          description: 'Official guide to container query syntax and browser support.',
          url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries',
          usefulFor: 'Mastering container-type, container-name, and inline-size.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm03-lab-1',
      title: 'Lab 3.1: Mobile-First Responsive Layout Implementation',
      durationMinutes: 60,
      objective: 'Convert a static desktop layout into a mobile-first responsive web application with breakpoints at 640px, 768px, and 1024px.',
      prerequisites: ['Module 02 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Establish Mobile Baseline Styles',
          instructions: 'Write base CSS rules without media queries targeting mobile screens (375px–480px): single-column layout, touch-friendly buttons.',
          code: `.nav-menu { display: none; }
.nav-menu.open { display: flex; flex-direction: column; }`
        },
        {
          stepNumber: 2,
          title: 'Layer Progressive Desktop Breakpoints',
          instructions: 'Use min-width queries to introduce horizontal navigation and multi-column grids as the viewport expands:',
          code: `@media (min-width: 768px) {
  .nav-menu { display: flex; flex-direction: row; }
  .grid-container { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid-container { grid-template-columns: repeat(4, 1fr); }
}`
        }
      ],
      verificationChecklist: [
        'Zero horizontal scrolling at any viewport width from 320px to 2560px',
        'Touch targets are at least 44px by 44px on mobile viewports',
        'Media queries strictly use min-width (mobile-first methodology)'
      ],
      deliverables: ['Responsive stylesheet and test recording verifying smooth viewport resize']
    }
  ],
  moduleProject: {
    id: 'm03-project',
    title: 'Responsive Portfolio Website (Full Modern CSS)',
    difficulty: 'Beginner → Intermediate',
    estimatedHours: 8,
    overview: 'Transform the raw HTML5 portfolio built in Module 02 into a visually stunning, fully responsive portfolio website using modern CSS. Implement CSS custom properties for cohesive theming, Flexbox navigation, CSS Grid project showcases, smooth interactive transitions, and responsive mobile-first typography that flawlessly adapts across mobile, tablet, and desktop viewports.',
    requirements: [
      'Universal box-sizing: border-box reset and CSS custom property design system (colors, typography, spacing, radii)',
      'Mobile-first responsive design: layout operates natively on mobile (375px), tablet (768px), and desktop (1200px+)',
      'Navigation bar built with Flexbox: stacks cleanly or reveals mobile drawer on small screens, expands to clean horizontal list on desktop',
      'Projects section styled as an auto-responsive CSS Grid displaying project cards with image previews, tags, and action links',
      'Smooth micro-interactions: button hover states with cubic-bezier transitions, card elevation shadow shifts, and link underlines',
      'Accessible contact form with styled input focus rings, error states, and responsive button sizing',
      'Zero layout shifts (CLS), zero horizontal overflow at any width'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Design System & CSS Variables',
        tasks: ['Establish color palette, typography font stack, and spacing tokens in :root']
      },
      {
        milestone: 2,
        title: 'Mobile Baseline Layout',
        tasks: ['Style typography, mobile navigation, stacked sections, and card padding']
      },
      {
        milestone: 3,
        title: 'Flexbox & CSS Grid Integration',
        tasks: ['Build responsive desktop nav', 'Implement auto-fit CSS Grid for project cards']
      },
      {
        milestone: 4,
        title: 'Transitions & Polish',
        tasks: ['Add smooth hover states, focus indicators, and test across device widths']
      }
    ],
    starterCodeStructure: [
      {
        path: 'css/style.css',
        description: 'Complete production stylesheet',
        sampleContent: `:root {
  --bg-dark: #090d16;
  --bg-card: #111827;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}`
      }
    ],
    acceptanceCriteria: [
      'Passes responsive testing on 375px (iPhone), 768px (iPad), and 1440px (Desktop)',
      'No horizontal overflow scrollbar at any screen width',
      'All interactive elements have visible, high-contrast :focus-visible rings for keyboard navigation'
    ],
    rubric: [
      { criteria: 'Responsive Architecture', points: 30, description: 'Flawless mobile-first responsiveness without horizontal overflow' },
      { criteria: 'Flexbox & Grid Mastery', points: 30, description: 'Proper application of 1D and 2D layout mechanisms' },
      { criteria: 'Design System & CSS Variables', points: 20, description: 'Clean token architecture in :root with consistent spacing and typography' },
      { criteria: 'Interactivity & Accessibility', points: 20, description: 'Smooth transitions, accessible focus rings, and WCAG AA contrast' }
    ]
  },
  quiz: [
    {
      id: 'm03-qz-01',
      question: 'Under `box-sizing: border-box`, if an element has `width: 400px; padding: 20px; border: 2px solid white;`, what is its final rendered width?',
      options: ['444px', '400px', '356px', '422px'],
      correctAnswerIndex: 1,
      explanation: 'Under border-box, the padding (20px each side) and border (2px each side) are contained inside the 400px width.'
    },
    {
      id: 'm03-qz-02',
      question: 'Which CSS property defines the alignment of flex items along the Cross Axis?',
      options: ['justify-content', 'align-items', 'flex-direction', 'align-content'],
      correctAnswerIndex: 1,
      explanation: 'align-items controls cross-axis alignment, whereas justify-content governs the main axis.'
    },
    {
      id: 'm03-qz-03',
      question: 'Why is mobile-first design (using `@media (min-width: ...)` ) preferred over desktop-down design?',
      options: [
        'Mobile browsers cannot execute CSS media queries',
        'It ensures mobile devices download and parse simpler base rules first without overriding complex desktop matrices',
        'Google Chrome disables max-width media queries',
        'It is required by the W3C HTML5 validator'
      ],
      correctAnswerIndex: 1,
      explanation: 'Mobile-first starts with simple, performant baseline styles and progressively layers enhancements as screen real estate increases.'
    },
    {
      id: 'm03-qz-04',
      question: 'What is the benefit of the CSS `gap` property over traditional margin spacing between flex or grid items?',
      options: [
        'It automatically changes colors on hover',
        'It applies spacing strictly between items, eliminating the need to strip margin off the first or last child with :last-child hacks',
        'It converts inline elements into block elements',
        'It enables 3D graphics'
      ],
      correctAnswerIndex: 1,
      explanation: 'gap strictly applies gutters between elements inside grid and flex containers without touching container perimeter edges.'
    }
  ],
  assignment: {
    id: 'm03-assign',
    title: 'Module 03 Assignment: Multi-Layout Landing Page with Responsive Breakpoints',
    problemStatement: 'Develop a responsive marketing landing page for an open-source developer framework. The page must include a sticky header with flexbox navigation, a two-column hero section with call-to-actions, an auto-responsive feature matrix using CSS Grid, and a pricing table that shifts from a vertical stack on mobile to a three-column comparison grid on desktop.',
    specifications: [
      'Strict mobile-first CSS architecture with clean min-width media queries at 640px and 1024px',
      'Use CSS custom properties for all colors, typography, and container padding',
      'Implement CSS Grid `grid-template-areas` or `repeat(auto-fit, minmax(...))` for the feature showcase',
      'Ensure zero layout shift or overflow at 360px viewport width'
    ],
    deliverables: ['`index.html` and `styles.css` files along with responsive screenshots across mobile and desktop.'],
    evaluationRubric: [
      { category: 'Responsive Execution', weight: '40%', description: 'Seamless fluid behavior from 320px to 1920px' },
      { category: 'Grid & Flex Mastery', weight: '35%', description: 'Clean modern layout properties without floats or inline-block hacks' },
      { category: 'CSS Cleanliness & Variables', weight: '25%', description: 'Well-structured design tokens and zero redundant code' }
    ],
    submissionFormat: 'Code files submitted in project directory with validation checks'
  },
  resources: [
    {
      name: 'MDN CSS Layout Overview',
      description: 'The standard guide to modern web layout mechanisms.',
      url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout',
      usefulFor: 'Mastering flexbox, grid, and multi-column layouts.'
    },
    {
      name: 'Modern CSS Solutions by Stephanie Eckles',
      description: 'Practical, modern CSS patterns for common UI problems.',
      url: 'https://moderncss.dev/',
      usefulFor: 'Modern resets, centering techniques, and accessible styling.'
    }
  ],
  summary: 'Module 03 taught the core mechanics of CSS: specificity calculation, the box model, Flexbox 1D alignment, CSS Grid 2D architecture, mobile-first responsive media queries, and design token management with CSS variables.'
};
