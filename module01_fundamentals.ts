import { Module } from '../../types/course';

export const module01Fundamentals: Module = {
  id: 'module-01',
  moduleNumber: 1,
  title: 'Web Development Fundamentals',
  slug: 'web-development-fundamentals',
  durationWeeks: 'Week 1',
  level: 'Beginner',
  phase: 'Phase 1: Web Foundations',
  overview: {
    whatItTeaches: 'The foundational mechanics of how the World Wide Web operates, client-server communication protocols, browser rendering lifecycles, and professional development environment configuration including VS Code, Node.js, and version control.',
    whyItMatters: 'Before writing a single line of code, professional engineers must understand the physical and logical infrastructure underlying internet communications—otherwise debugging network bottlenecks, DNS propagation failures, or cross-origin issues becomes guesswork.',
    prerequisites: ['Basic computer literacy', 'Familiarity with file navigation and terminal basics'],
    estimatedHours: 12,
    skillsAcquired: [
      'Client-server architecture analysis',
      'HTTP/HTTPS request-response transaction lifecycle tracing',
      'DNS resolution path reconstruction',
      'Chrome DevTools DOM, Network, and Console inspection',
      'Command-line tooling with Node.js and npm',
      'Configuring a modern VS Code web development environment'
    ]
  },
  lessons: [
    {
      id: 'm01-l01',
      number: 1,
      title: 'How the Web and Internet Function',
      durationMinutes: 45,
      learningObjectives: [
        'Distinguish between the physical Internet infrastructure and the application-layer World Wide Web.',
        'Trace the lifecycle of a web request from keyboard keystroke to rendered pixel display.',
        'Articulate the roles of clients, web servers, DNS resolvers, and hosting providers in system delivery.',
        'Differentiate between static websites and interactive dynamic web applications.'
      ],
      introduction: 'Every modern digital experience—from banking portals to streaming platforms—operates atop a distributed network of interconnected computing machines communicating via standardized protocols. Understanding this foundational layer prevents confusing local browser quirks with infrastructure-level network failures.',
      detailedNotes: `The Internet is a global network of interconnected computers communicating via the Internet Protocol Suite (TCP/IP). The World Wide Web (WWW), conceived by Sir Tim Berners-Lee in 1989, is an information-sharing service built on top of this physical infrastructure using the Hypertext Transfer Protocol (HTTP).

When an end-user navigates to a domain such as 'https://developer.mozilla.org':
1. The client browser inspects its local cache for an existing DNS record.
2. If missing, it queries a recursive DNS resolver (usually provided by an ISP or cloud provider like Cloudflare 1.1.1.1 or Google 8.8.8.8).
3. The resolver travels down the DNS hierarchy (Root server → Top-Level Domain server (.org) → Authoritative Name Server) to resolve the human-readable domain into a machine-routable IP address (e.g., 104.16.249.249).
4. The client opens a TCP connection with the target server using a 3-way handshake (SYN, SYN-ACK, ACK), followed by a TLS handshake for encrypted HTTPS.
5. The client transmits an HTTP GET request header.
6. The web server (e.g., NGINX, Apache, or a Node.js process) processes the request, computes business logic, and sends back an HTTP response containing status codes, headers, and the HTML payload.`,
      concepts: [
        {
          name: 'Client-Server Architecture',
          description: 'A distributed computing model where workload is partitioned between service providers (servers) and service requesters (clients).',
          comparison: {
            itemA: 'Static Website',
            itemB: 'Dynamic Web Application',
            distinction: 'Static sites deliver pre-rendered HTML/CSS/JS files directly from storage; dynamic apps execute server-side or client-side application logic to generate personalized content upon request.'
          },
          table: {
            headers: ['Component', 'Primary Responsibility', 'Example Technology'],
            rows: [
              ['Client / User Agent', 'Renders UI, captures input, dispatches network requests', 'Chrome, Firefox, Safari'],
              ['DNS Resolver', 'Translates domain names to numerical IP addresses', 'Cloudflare (1.1.1.1), Google DNS (8.8.8.8)'],
              ['Web Server', 'Listens for HTTP requests on ports 80/443, serves payloads', 'NGINX, Caddy, Node.js http module'],
              ['Application Server', 'Executes business logic, queries database, enforces auth', 'Express.js, Django, Ruby on Rails'],
              ['Database', 'Persists structured application records', 'PostgreSQL, MySQL, SQLite']
            ]
          },
          diagram: `[User Browser (Client)]
       │ (1) User enters URL "https://example.com"
       ▼
[DNS Recursive Resolver] ──► (2) Queries Root & TLD Servers
       │
       ▼ (3) Returns Server IP: 93.184.216.34
[TCP / TLS Handshake]
       │
       ▼ (4) HTTP GET / HTTP/2
[Web Server (Nginx / Express)]
       │
       ▼ (5) Generates HTML/CSS/JS
[Client Browser] ◄── (6) HTTP 200 OK + Payload
       │
       ▼ (7) Parses DOM & CSSOM ──► Renders Pixels on Display`
        },
        {
          name: 'The Request and Response Lifecycle',
          description: 'The bidirectional exchange of formatted text packets governing all interactions between browser and host.'
        }
      ],
      codeExamples: [
        {
          language: 'http',
          title: 'Anatomy of an Raw HTTP/1.1 Request and Response',
          code: `/* --- CLIENT REQUEST --- */
GET /api/v1/curriculum HTTP/1.1
Host: api.fullstackdev.edu
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
Accept: application/json
Accept-Encoding: gzip, deflate, br
Connection: keep-alive

/* --- SERVER RESPONSE --- */
HTTP/1.1 200 OK
Date: Sun, 04 Oct 2026 08:30:00 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 142
Connection: keep-alive
Cache-Control: public, max-age=3600
Strict-Transport-Security: max-age=63072000; includeSubDomains

{
  "status": "success",
  "course": "Full-Stack Web Development",
  "modulesCount": 12,
  "curriculumReady": true
}`,
          explanation: 'The request identifies the verb (GET), resource path (/api/v1/curriculum), and required host. The server returns status code 200 OK along with security headers (HSTS) and caching directives.'
        }
      ],
      realWorldExample: {
        scenario: 'High-traffic e-commerce flash sale',
        industryApplication: 'Engineers configure Content Delivery Networks (CDNs) like Cloudflare or Fastly at edge servers closest to users so static HTML/CSS/images do not hit the origin application server, keeping response times under 50ms.',
        takeaway: 'Distinguishing static content from compute-heavy dynamic API endpoints allows deliberate architectural caching.'
      },
      practicalExercise: {
        title: 'Trace Your First Network Hop with Command-Line Tools',
        objective: 'Inspect real-world DNS records and latency using terminal diagnostics.',
        requirements: ['Terminal access (macOS/Linux/WSL)', 'curl and dig or nslookup installed'],
        steps: [
          'Run `curl -I https://www.google.com` to inspect headers returned by a production web server.',
          'Run `nslookup github.com` or `dig github.com` to observe the resolved A records and DNS TTL (Time To Live).',
          'Identify the HTTP status code, Server header, and Content-Type in the terminal output.'
        ],
        expectedResult: 'You will see HTTP/2 200 or 301 responses with complete header signatures showing server type, cookies, and cache lifetimes.',
        challengeExtension: 'Use `traceroute` or `tracert` to count the physical router hops between your workstation and a server on another continent.'
      },
      commonMistakes: [
        {
          mistake: 'Confusing DNS propagation delays with web server errors.',
          whyItHappens: 'When purchasing a new domain, DNS records are cached by intermediate resolvers according to the TTL timer (can take up to 24-48 hours globally).',
          howToFix: 'Query the authoritative nameserver directly using `dig @ns1.domainprovider.com example.com` to confirm your record is active before checking client browsers.'
        },
        {
          mistake: 'Assuming HTTPS encrypts the domain name being requested in plaintext.',
          whyItHappens: 'During the initial TLS handshake (SNI - Server Name Indication), the hostname is sent before encryption negotiates unless ESNI/ECH is configured.',
          howToFix: 'Understand that HTTPS encrypts the path, query parameters, headers, and body—but the destination IP and initial hostname can be observed on untrusted networks.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm01-q1',
          type: 'multiple-choice',
          question: 'What is the primary function of a Domain Name System (DNS) resolver?',
          options: [
            'Encrypting web traffic with SSL certificates',
            'Translating human-readable domain names into machine-routable IP addresses',
            'Storing database records for web applications',
            'Rendering HTML markup into visual screen elements'
          ],
          correctAnswerIndex: 1,
          explanation: 'DNS acts as the address book of the internet, mapping names like google.com to numerical IP addresses like 142.250.190.46.'
        },
        {
          id: 'm01-q2',
          type: 'true-false',
          question: 'In HTTP/1.1, the Host header is optional.',
          options: ['True', 'False'],
          correctAnswerIndex: 1,
          explanation: 'False. Starting in HTTP/1.1, the Host header is mandatory so a single web server can host multiple domain names on one IP address (Virtual Hosting).'
        },
        {
          id: 'm01-q3',
          type: 'multiple-choice',
          question: 'Which HTTP status code category represents server-side internal errors?',
          options: ['2xx', '3xx', '4xx', '5xx'],
          correctAnswerIndex: 3,
          explanation: '5xx status codes (such as 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable) denote server-side failures.'
        }
      ],
      summary: [
        'The Internet is the global hardware network; the Web is an application layer exchanging hypermedia via HTTP.',
        'DNS resolution turns domain names into IP addresses before any TCP/TLS handshake occurs.',
        'Client-server architecture separates presentation logic in the browser from persistent business logic on the server.',
        'Every HTTP transaction consists of standardized methods (GET, POST), headers, and optional body payloads.'
      ],
      additionalResources: [
        {
          name: 'MDN Web Docs — How the Web Works',
          description: 'The definitive architectural overview by Mozilla developers.',
          url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work',
          usefulFor: 'Visual explanations of web server pipelines and packet transmission.'
        },
        {
          name: 'IETF RFC 9110 — HTTP Semantics',
          description: 'Official internet engineering specification for HTTP.',
          url: 'https://www.rfc-editor.org/rfc/rfc9110.html',
          usefulFor: 'Authoritative standards for status codes, headers, and protocol methods.'
        }
      ]
    },
    {
      id: 'm01-l02',
      number: 2,
      title: 'Developer Tools & Professional Environment Setup',
      durationMinutes: 50,
      learningObjectives: [
        'Set up a professional local development workflow with VS Code, essential extensions, and terminal integration.',
        'Inspect and debug live web pages using Chrome/Firefox Developer Tools (DOM, CSS, Network, and Console panels).',
        'Verify correct installation and PATH configuration for Node.js, npm, and Git.',
        'Use the terminal to navigate directories, manipulate files, and inspect environment variables.'
      ],
      introduction: 'A professional software engineer does not write code blindly in plain text editors. Modern development relies on integrated toolchains: an intelligent IDE, runtime execution environments like Node.js, package managers, version control, and in-browser inspection diagnostics.',
      detailedNotes: `Your primary workspace consists of three pillars:
1. Editor / IDE (Visual Studio Code): Provides syntax highlighting, IntelliSense, linting, formatting (Prettier), and integrated terminal shells.
2. Runtime & Package Ecosystem (Node.js & npm): Enables JavaScript execution outside the browser, running local development servers, build tools (Vite), and dependency installations.
3. Browser Developer Tools (F12 or Cmd+Option+I):
   - Elements panel: Inspects and live-edits the rendered Document Object Model (DOM) and computed CSS cascade.
   - Console panel: Outputs runtime exceptions, JavaScript evaluation, and debugging logs ('console.log', 'console.table', 'console.error').
   - Network panel: Captures every HTTP request, measuring DNS lookup, SSL negotiation, Time To First Byte (TTFB), and resource download size.
   - Sources panel: Sets breakpoints to pause script execution line-by-line and inspect memory variable values.`,
      concepts: [
        {
          name: 'The Browser DevTools Panels',
          description: 'The diagnostic cockpit built directly into every modern web browser.',
          table: {
            headers: ['Panel', 'Key Capability', 'Common Debugging Use Case'],
            rows: [
              ['Elements', 'Live DOM tree and CSS computed style editor', 'Fixing layout overflows, testing color changes'],
              ['Console', 'Interactive JavaScript REPL and error log', 'Inspecting uncaught Promise rejections and API outputs'],
              ['Network', 'Waterfalls of all fetched assets and API requests', 'Diagnosing slow TTFB, 404 missing images, CORS errors'],
              ['Application / Storage', 'LocalStorage, SessionStorage, Cookies, IndexedDB', 'Inspecting auth tokens and client-persisted states']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'bash',
          title: 'Verifying Environment Tooling via Terminal',
          code: `# Verify Git installation
git --version
# Expected: git version 2.x.x

# Verify Node.js runtime (LTS recommended)
node -v
# Expected: v20.x.x or v22.x.x

# Verify npm package manager
npm -v
# Expected: 10.x.x

# Create a clean project workspace directory
mkdir -p ~/projects/web-fundamentals
cd ~/projects/web-fundamentals

# Initialize a package manifest
npm init -y`,
          explanation: 'Running these commands verifies that Node, npm, and Git binaries are correctly accessible in your system PATH variable.'
        },
        {
          language: 'javascript',
          title: 'Advanced Browser Console Diagnostics',
          code: `// Rich console debugging techniques
const modules = [
  { id: 1, title: 'Web Fundamentals', status: 'Completed' },
  { id: 2, title: 'HTML5 Semantic Web', status: 'In Progress' },
  { id: 3, title: 'CSS & Modern Design', status: 'Upcoming' }
];

// Display array of objects as a clean structured table
console.table(modules);

// Measure execution time of a code block
console.time('DOM calculation');
for (let i = 0; i < 100000; i++) {
  Math.sqrt(i);
}
console.timeEnd('DOM calculation');

// Conditional assertion warning
console.assert(modules.length === 12, 'Curriculum must contain exactly 12 modules!');`,
          explanation: 'Rather than relying solely on console.log, console.table, console.time, and console.assert offer powerful runtime inspection tools.'
        }
      ],
      realWorldExample: {
        scenario: 'Troubleshooting a broken user signup button',
        industryApplication: 'A frontend engineer opens the Network panel, filters by Fetch/XHR, clicks the button, and immediately observes a 422 Unprocessable Entity response with an explicit JSON validation error payload from the API server.',
        takeaway: 'DevTools Network inspection eliminates guesswork between frontend form code and backend API contracts.'
      },
      practicalExercise: {
        title: 'Inspect a Production Website with DevTools',
        objective: 'Analyze DOM mutations and network requests on a live production website.',
        requirements: ['Google Chrome, Microsoft Edge, or Firefox browser'],
        steps: [
          'Open your browser and navigate to https://en.wikipedia.org.',
          'Right-click the main headline and select Inspect to jump to its corresponding HTML element in the Elements panel.',
          'Double-click the headline text inside the Elements DOM tree and change it to your own name. Observe how the live page renders your change without refreshing.',
          'Switch to the Network panel, check "Preserve log", and reload the page. Sort resources by "Size" to identify the largest downloaded asset on Wikipedia.'
        ],
        expectedResult: 'You will understand that editing the DOM in DevTools only changes your local browser memory representation, not the remote web server files.',
        challengeExtension: 'In the Network panel, simulate "Fast 3G" network throttling and observe how the page layout and font loading behaves under degraded connectivity.'
      },
      commonMistakes: [
        {
          mistake: 'Editing CSS or HTML in the DevTools Elements panel and assuming the source code file is saved.',
          whyItHappens: 'DevTools modifies ephemeral browser memory state; refreshing the browser immediately wipes those edits.',
          howToFix: 'Treat DevTools as an exploratory sandbox; once you find the correct CSS rule or HTML structure, copy it into your actual project files in VS Code.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm01-l2-q1',
          type: 'multiple-choice',
          question: 'Which DevTools panel displays all HTTP requests including status codes, request headers, and response payloads?',
          options: ['Sources', 'Network', 'Elements', 'Performance'],
          correctAnswerIndex: 1,
          explanation: 'The Network panel records all network activity, showing timing waterfalls, HTTP status codes, headers, and payloads.'
        },
        {
          id: 'm01-l2-q2',
          type: 'code-analysis',
          question: 'What does `console.table(data)` output in modern browser developer consoles?',
          options: [
            'A raw text string with comma separators',
            'An interactive, sortable tabular grid representation of an array or object',
            'A markdown file downloaded to your disk',
            'A cryptographic hash of the object'
          ],
          correctAnswerIndex: 1,
          explanation: 'console.table renders arrays of objects or nested objects as a formatted two-dimensional table in the console.'
        }
      ],
      summary: [
        'VS Code provides intelligent code completion, integrated terminal execution, and Git tracking.',
        'Node.js executes JavaScript on your operating system, driving modern build tools and web servers.',
        'Browser DevTools (Elements, Console, Network, Application) are indispensable for inspecting live DOM trees, runtime errors, and network packets.'
      ],
      additionalResources: [
        {
          name: 'Chrome DevTools Official Documentation',
          description: 'Comprehensive guides for mastering web debugging.',
          url: 'https://developer.chrome.com/docs/devtools/',
          usefulFor: 'Learning performance profiling, memory leak tracking, and network throttling.'
        },
        {
          name: 'Visual Studio Code Documentation',
          description: 'Official guide to shortcuts, settings, and workspace extensions.',
          url: 'https://code.visualstudio.com/docs',
          usefulFor: 'Setting up Prettier, ESLint, and multi-cursor editing shortcuts.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm01-lab-1',
      title: 'Lab 1.1: Local Development Toolchain Initialization',
      durationMinutes: 45,
      objective: 'Configure a clean workspace folder, verify Node/Git environments, and inspect a local HTTP server.',
      prerequisites: ['Terminal access', 'VS Code installed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Create and Navigate to Project Directory',
          instructions: 'Open your terminal and create a dedicated directory for your course work:',
          code: 'mkdir -p ~/fullstack-course/module-01 && cd ~/fullstack-course/module-01'
        },
        {
          stepNumber: 2,
          title: 'Initialize Project and Create HTML Entry Point',
          instructions: 'Generate an initial index.html file with valid DOCTYPE structure:',
          code: `cat << 'EOF' > index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developer Foundation Test</title>
</head>
<body>
  <h1>System Initialized</h1>
  <p>Developer environment operational.</p>
</body>
</html>
EOF`
        },
        {
          stepNumber: 3,
          title: 'Serve Locally and Test HTTP Header Inspection',
          instructions: 'Launch a minimal web server using Node.js npx or Python to observe the local server running on port 3000/8000.',
          code: 'npx serve . -l 3000'
        }
      ],
      verificationChecklist: [
        'index.html opens in Chrome at http://localhost:3000 without file:// protocol',
        'DevTools Network panel logs HTTP status 200 OK for index.html',
        'Console reports zero fatal errors or syntax warnings'
      ],
      deliverables: ['Screenshot of running localhost server and Network panel inspection showing status 200']
    }
  ],
  moduleProject: {
    id: 'm01-project',
    title: 'Build Your First Web Page: Professional Introduction',
    difficulty: 'Beginner',
    estimatedHours: 4,
    overview: 'Create a clean, valid, professional introduction web page that showcases your development journey, developer goals, environment specs, and preferred technology stack. The project reinforces core web fundamentals: proper DOCTYPE, meta viewport configuration, client-server testing on localhost, and clean file structure.',
    requirements: [
      'Valid HTML5 document declaration and structure (html, head, body)',
      'Configured meta charset UTF-8 and responsive meta viewport',
      'Clean hierarchy with single h1, appropriate h2 sectioning, and structured paragraphs',
      'An unstyled tabular layout presenting your development workstation specs (OS, Editor, Node version, Browser)',
      'At least three verified external outbound links with target="_blank" and rel="noopener noreferrer"',
      'Zero console warnings or errors when inspected in Chrome/Firefox DevTools'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Project Scaffolding & Document Setup',
        tasks: ['Initialize project folder', 'Create index.html with meta tags and character encoding']
      },
      {
        milestone: 2,
        title: 'Content Sectioning & Typography Hierarchy',
        tasks: ['Add header with developer name and title', 'Add about section with goals', 'Add development specs table']
      },
      {
        milestone: 3,
        title: 'Network & Cross-Browser Validation',
        tasks: ['Serve over localhost', 'Inspect network headers in DevTools', 'Validate HTML on W3C Markup Validation Service']
      }
    ],
    starterCodeStructure: [
      {
        path: 'index.html',
        description: 'Primary HTML5 document entry point',
        sampleContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Rivera | Software Engineer</title>
</head>
<body>
  <header>
    <h1>Alex Rivera</h1>
    <p>Junior Full-Stack Web Developer in Training</p>
  </header>
  <main>
    <section>
      <h2>About My Journey</h2>
      <p>I am mastering full-stack web engineering from network protocols to cloud deployment.</p>
    </section>
  </main>
</body>
</html>`
      }
    ],
    acceptanceCriteria: [
      'Document passes W3C HTML5 validator without errors',
      'Served via an HTTP local server (not opened directly via file://)',
      'Includes meta viewport tag for mobile browser scaling'
    ],
    rubric: [
      { criteria: 'HTML5 Semantic Structure', points: 30, description: 'Correct DOCTYPE, head, title, meta viewport, header, and main tags' },
      { criteria: 'Technical Accuracy & Links', points: 30, description: 'Links correctly use rel="noopener noreferrer" and valid URLs' },
      { criteria: 'Local Server Verification', points: 20, description: 'Successfully served and verified via localhost with HTTP 200 responses' },
      { criteria: 'Code Cleanliness & Indentation', points: 20, description: 'Consistent 2-space indentation and descriptive naming' }
    ]
  },
  quiz: [
    {
      id: 'm01-qz-01',
      question: 'What is the role of an Authoritative DNS server in the DNS lookup process?',
      options: [
        'It stores cached web pages for fast delivery across geographic regions',
        'It holds the definitive, verified records for a specific domain name and provides the ultimate IP address',
        'It encrypts browser passwords before sending them to the backend server',
        'It compiles TypeScript code into browser-compatible JavaScript'
      ],
      correctAnswerIndex: 1,
      explanation: 'The Authoritative Name Server is the final stop in the DNS query hierarchy that holds the actual DNS records for the domain.'
    },
    {
      id: 'm01-qz-02',
      question: 'Which of the following describes the difference between HTTP and HTTPS?',
      options: [
        'HTTPS is a different programming language than HTTP',
        'HTTPS encrypts the communication channel between client and server using TLS/SSL',
        'HTTPS is only used for image files while HTTP is used for text',
        'HTTP can only be used on mobile devices'
      ],
      correctAnswerIndex: 1,
      explanation: 'HTTPS wraps HTTP traffic inside Transport Layer Security (TLS) encryption, preventing eavesdropping and tampering.'
    },
    {
      id: 'm01-qz-03',
      question: 'What happens during the TCP three-way handshake before an HTTP request is transmitted?',
      options: [
        'The client downloads the CSS file, compiles the JavaScript, and paints the screen',
        'Client and server exchange SYN, SYN-ACK, and ACK packets to establish a synchronized, reliable connection',
        'The database executes an SQL query to retrieve user credentials',
        'The browser converts the HTML document into an image'
      ],
      correctAnswerIndex: 1,
      explanation: 'TCP establishes connection reliability via a three-packet sequence: SYN (synchronize), SYN-ACK (acknowledge), and ACK.'
    },
    {
      id: 'm01-qz-04',
      question: 'What is the primary danger of serving a web page via the `file://` protocol instead of `http://localhost` during local development?',
      options: [
        'The computer screen will turn off automatically',
        'Security sandbox restrictions prevent Fetch API calls, ES modules, and absolute path asset resolution',
        'HTML files cannot display text when opened locally',
        'Local files cannot be edited in VS Code'
      ],
      correctAnswerIndex: 1,
      explanation: 'The file:// protocol enforces strict local browser origin isolation that breaks ES module imports (CORS), fetch requests, and server-relative paths.'
    },
    {
      id: 'm01-qz-05',
      question: 'What does the HTTP header `Content-Type: application/json` inform the receiving client?',
      options: [
        'The server is offline for maintenance',
        'The payload body is formatted as a JSON string and should be parsed accordingly',
        'The client must refresh the browser window',
        'The file is an MP4 video clip'
      ],
      correctAnswerIndex: 1,
      explanation: 'The Content-Type header specifies the MIME media type of the transmitted resource.'
    }
  ],
  assignment: {
    id: 'm01-assign',
    title: 'Module 01 Practical Assessment: Network Architecture Audit',
    problemStatement: 'Analyze a public web application of your choice (e.g., wikipedia.org or github.com). Generate a comprehensive technical report documenting the complete HTTP request and response chain, DNS resolution path, and client rendering steps observed in DevTools.',
    specifications: [
      'Document the resolved IPv4/IPv6 address of the target domain using nslookup or dig',
      'List all HTTP response headers returned on the initial document GET request and explain what each header does (Cache-Control, Content-Type, Server, HSTS)',
      'Identify the Total Transfer Size vs Resource Size in the DevTools Network summary bar and explain the difference (compression)',
      'Explain how the browser separates static assets from dynamic API calls based on observed URL structures'
    ],
    deliverables: [
      'A Markdown document (`network-audit.md`) containing complete terminal commands and output',
      'Two DevTools Network waterfall screenshots with annotations',
      'A 300-word written summary contrasting static asset caching with dynamic API delivery'
    ],
    evaluationRubric: [
      { category: 'DNS & Protocol Accuracy', weight: '35%', description: 'Correct mapping of DNS hierarchy, IP resolution, and TLS handshake' },
      { category: 'Header Analysis', weight: '35%', description: 'Thorough explanation of at least five standard HTTP response headers' },
      { category: 'DevTools Methodology', weight: '30%', description: 'Accurate waterfall reading and compression ratio calculations' }
    ],
    submissionFormat: 'GitHub repository or Git gist containing markdown report and embedded image diagrams'
  },
  resources: [
    {
      name: 'MDN Web Docs: Web mechanics & HTTP',
      description: 'The industry-standard reference manual for internet architecture and protocol specifications.',
      url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP',
      usefulFor: 'Looking up headers, HTTP status codes, and TLS protocol semantics.',
      category: 'official'
    },
    {
      name: 'Google Chrome DevTools Guides',
      description: 'Comprehensive tutorials for network analysis, DOM inspection, and debugging.',
      url: 'https://developer.chrome.com/docs/devtools/network',
      usefulFor: 'Mastering waterfall timing, TTFB optimization, and payload inspection.',
      category: 'docs'
    },
    {
      name: 'Cloudflare Learning Center: What is DNS?',
      description: 'Clear, illustrated explanations of domain resolution, nameservers, and records.',
      url: 'https://www.cloudflare.com/learning/dns/what-is-dns/',
      usefulFor: 'Deepening comprehension of A, AAAA, CNAME, and MX record mechanisms.',
      category: 'official'
    }
  ],
  summary: 'Module 01 established the physical and logical foundation of web engineering: internet protocols (TCP/IP), domain name resolution (DNS), client-server communication via HTTP/HTTPS, browser rendering engines, and developer environment configuration. With an operational toolchain in place, you are equipped to build semantic web applications.'
};
