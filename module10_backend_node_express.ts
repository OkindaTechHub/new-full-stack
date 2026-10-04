import { Module } from '../../types/course';

export const module10BackendNodeExpress: Module = {
  id: 'module-10',
  moduleNumber: 10,
  title: 'Backend Development with Node.js & Express',
  slug: 'backend-node-express',
  durationWeeks: 'Week 10',
  level: 'Intermediate → Advanced',
  phase: 'Phase 3: Full-Stack & APIs',
  overview: {
    whatItTeaches: 'Server-side web development using Node.js and the Express.js framework, non-blocking asynchronous I/O, creating HTTP servers, routing, middleware execution pipelines, parsing JSON request bodies, designing RESTful CRUD APIs, managing HTTP status codes, structured error handling, environment configuration with dotenv, and API testing.',
    whyItMatters: 'Frontend interfaces cannot securely process financial transactions, authenticate passwords, or manage shared business records alone. The backend server acts as the trusted orchestrator: validating inputs, enforcing permissions, and protecting databases from malicious clients.',
    prerequisites: ['Module 06: Modern JavaScript & REST APIs', 'Module 07: Git & GitHub'],
    estimatedHours: 18,
    skillsAcquired: [
      'Understanding the Node.js runtime, V8 engine, Libuv event loop, and asynchronous thread pool',
      'Structuring scalable server codebases with the Controller-Service-Repository architectural pattern',
      'Configuring Express applications, routing parameters (`req.params`, `req.query`, `req.body`)',
      'Writing custom Express middleware for logging, rate limiting, and request validation',
      'Implementing complete RESTful CRUD operations (GET, POST, PUT, PATCH, DELETE)',
      'Assigning semantically accurate HTTP status codes (200, 201, 400, 401, 403, 404, 422, 500)',
      'Centralizing server error handling with Express error-handling middleware (`(err, req, res, next)`)',
      'Securing secrets and environment variables using `.env` and `dotenv`',
      'Testing API endpoints programmatically using curl, Postman, or Vitest/Supertest'
    ]
  },
  lessons: [
    {
      id: 'm10-l01',
      number: 1,
      title: 'Node.js Architecture & The Express Server Pipeline',
      durationMinutes: 50,
      learningObjectives: [
        'Explain how Node.js achieves high concurrency using a single main thread backed by Libuv’s event loop and worker pool.',
        'Initialize a production Node.js project with `package.json`, TypeScript, and execution scripts.',
        'Instantiate an Express server listening on configurable network ports.',
        'Trace the sequential execution of Express middleware functions via `next()`.',
        'Load environment configurations securely without leaking credentials.'
      ],
      introduction: 'Created by Ryan Dahl in 2009, Node.js brought JavaScript out of browser sandboxes onto backend servers. Powered by Google’s high-performance V8 engine and the Libuv C library, Node handles thousands of concurrent I/O connections efficiently using an event-driven, non-blocking architecture.',
      detailedNotes: `Node.js Architecture:
Unlike traditional multi-threaded web servers (like Apache) that spawn an entire OS thread for each incoming connection (which consumes megabytes of memory per thread), Node.js executes all JavaScript code on a single event-driven thread.
- I/O operations (file system reads, database queries, network sockets) are offloaded to Libuv’s background C++ worker pool.
- Once the I/O completes, the callback or Promise resolution is queued in the event loop and executed on the main thread without blocking other requests.

Express.js Fundamentals:
Express is the minimalist, unopinionated web framework for Node.js.
At its core, an Express app is a pipeline of Middleware functions.

What is Middleware?
A function with access to the Request object ('req'), the Response object ('res'), and the 'next' function in the application’s request-response cycle.
Tasks performed by middleware:
- Execute arbitrary code (e.g. logging incoming requests).
- Make changes to the request and response objects (e.g., 'express.json()' parsing raw incoming byte streams into 'req.body').
- End the request-response cycle (e.g. 'res.status(401).json({ error: "Unauthorized" })').
- Call the next middleware in the stack via 'next()'. If a middleware does not call 'next()' or end the response, the client hangs indefinitely!`,
      concepts: [
        {
          name: 'The Express Middleware Execution Pipeline',
          description: 'How requests pass through a sequence of filters before reaching controllers.',
          diagram: `[Incoming Client HTTP Request]
              │
              ▼
[Middleware 1: Request Logger (morgan / custom)] ──► Calls next()
              │
              ▼
[Middleware 2: Body Parser (express.json())]    ──► Parses JSON into req.body ──► Calls next()
              │
              ▼
[Middleware 3: Route Matcher (/api/courses)]    ──► Controller handles business logic
              │
              ▼
[Response Sent: res.status(200).json(...)]      ──► Request cycle terminates and returns to client`
        }
      ],
      codeExamples: [
        {
          language: 'typescript',
          title: 'Production Express Server Setup with TypeScript & Middleware',
          code: `import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 1. Built-in body-parser middleware for parsing application/json
app.use(express.json());

// 2. Custom Logging Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] \${req.method} \${req.originalUrl}\`);
  next(); // Pass control to the next middleware in the pipeline
});

// 3. Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// 4. Centralized 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'NotFound',
    message: \`Cannot \${req.method} \${req.originalUrl}\`
  });
});

// 5. Global Error Handling Middleware (Must have 4 parameters!)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled server exception:', err);
  res.status(500).json({
    error: 'InternalServerError',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred.' 
      : err.message
  });
});

app.listen(PORT, () => {
  console.log(\`Server operational on http://localhost:\${PORT}\`);
});`,
          explanation: 'Demonstrates an enterprise Express architecture: environment variable loading, JSON body parsing, custom logging middleware, health-check endpoint, 404 handler, and 4-argument global error handler.'
        }
      ],
      realWorldExample: {
        scenario: 'Protecting private backend APIs from runaway compute crashes',
        industryApplication: 'If an unhandled exception occurs inside an asynchronous route handler without a global error middleware, the entire Node.js process crashes, terminating connections for all connected users. Using centralized error handling guarantees that an error in one request returns a clean 500 response while keeping the server online for everyone else.',
        takeaway: 'Global error middleware prevents unhandled exceptions from taking down the server.'
      },
      practicalExercise: {
        title: 'Build a Request Timing Middleware',
        objective: 'Write a custom Express middleware that measures and logs how many milliseconds each request takes to process.',
        requirements: ['Express server project'],
        steps: [
          'Create a middleware function that records `const start = Date.now();`.',
          'Listen to the `res.on("finish", ...)` event.',
          'Calculate `const duration = Date.now() - start;`.',
          'Set a response header: `res.setHeader("X-Response-Time", \`\${duration}ms\`);`.',
          'Call `next()`. Test by curling an endpoint and inspecting headers.'
        ],
        expectedResult: 'Every HTTP response returns an accurate `X-Response-Time` header reflecting server execution time.'
      },
      commonMistakes: [
        {
          mistake: 'Forgetting `app.use(express.json())` before defining route handlers.',
          whyItHappens: 'Express does not parse JSON request bodies by default.',
          howToFix: 'Always mount `express.json()` at the top of your middleware chain, otherwise `req.body` will be `undefined` in POST and PUT handlers.'
        },
        {
          mistake: 'Forgetting `next()` inside a custom middleware.',
          whyItHappens: 'If a middleware does not send a response AND does not call `next()`, the client request hangs until browser timeout.',
          howToFix: 'Always call `next()` or send a response with `res.json()`.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm10-l1-q1',
          type: 'multiple-choice',
          question: 'How does Express identify an error-handling middleware versus a regular middleware?',
          options: [
            'By naming the function `errorHandler`',
            'By checking if the function accepts exactly four arguments: `(err, req, res, next)`',
            'By using the `@error` decorator',
            'Express cannot handle errors'
          ],
          correctAnswerIndex: 1,
          explanation: 'Express inspects function arity (`fn.length === 4`). A function with four parameters is uniquely registered as an error handler.'
        }
      ],
      summary: [
        'Node.js uses an event-driven, single-threaded model backed by Libuv for non-blocking I/O.',
        'Express processes incoming HTTP traffic through a sequential chain of middleware functions.',
        'Centralized error handling and 404 handlers ensure graceful server operation.'
      ],
      additionalResources: [
        {
          name: 'Express.js Official Documentation',
          description: 'The definitive guide to Express routing, middleware, and API reference.',
          url: 'https://expressjs.com/en/guide/routing.html',
          usefulFor: 'Mastering Router instances and middleware.'
        }
      ]
    },
    {
      id: 'm10-l02',
      number: 2,
      title: 'RESTful API Architecture, CRUD Operations & Status Codes',
      durationMinutes: 65,
      learningObjectives: [
        'Design resource-oriented RESTful API URL endpoints following standard REST conventions.',
        'Implement complete CRUD operations matching HTTP verbs (GET, POST, PUT, PATCH, DELETE).',
        'Assign semantically accurate HTTP status codes (200, 201, 204, 400, 404, 422, 500).',
        'Validate incoming request bodies and reject invalid payloads with structured error messages.',
        'Separate concerns cleanly using Routers, Controllers, and Service layers.'
      ],
      introduction: 'REST (Representational State Transfer) is the architectural pattern that governs communication between web clients and backend services. Designing clear, predictable REST APIs ensures that any frontend client, mobile app, or external partner can integrate with your services effortlessly.',
      detailedNotes: `REST Architectural Principles:
1. Resource-Oriented URLs: Use nouns (plural), not verbs.
   - Good: 'GET /api/courses', 'POST /api/courses', 'DELETE /api/courses/:id'
   - Bad: '/api/getAllCourses', '/api/deleteCourseById?id=5'
2. HTTP Methods map directly to CRUD:
   - Create: 'POST /api/courses' -> returns '201 Created'
   - Read (List): 'GET /api/courses' -> returns '200 OK'
   - Read (Single): 'GET /api/courses/:id' -> returns '200 OK' (or '404 Not Found')
   - Update (Full Replace): 'PUT /api/courses/:id' -> returns '200 OK'
   - Update (Partial Patch): 'PATCH /api/courses/:id' -> returns '200 OK'
   - Delete: 'DELETE /api/courses/:id' -> returns '204 No Content'

HTTP Status Code Taxonomy:
- 2xx Success:
  - 200 OK: Standard successful response.
  - 201 Created: Resource successfully created (pair with Location header).
  - 204 No Content: Action succeeded with nothing to return (common for DELETE).
- 4xx Client Errors:
  - 400 Bad Request: Malformed JSON syntax.
  - 401 Unauthorized: Missing or invalid authentication token.
  - 403 Forbidden: Authenticated user lacks permission to access resource.
  - 404 Not Found: Resource does not exist.
  - 422 Unprocessable Entity: Valid JSON, but fails business validation rules (e.g. negative price).
- 5xx Server Errors:
  - 500 Internal Server Error: Unhandled code exception or database crash.`,
      concepts: [
        {
          name: 'The RESTful CRUD Mapping Matrix',
          description: 'Standard correspondence between HTTP verbs, paths, and status codes.',
          table: {
            headers: ['Operation', 'HTTP Verb', 'Endpoint Path', 'Success Code', 'Idempotent?'],
            rows: [
              ['List Resources', 'GET', '/api/v1/products', '200 OK', 'Yes'],
              ['Retrieve Single', 'GET', '/api/v1/products/:id', '200 OK', 'Yes'],
              ['Create Resource', 'POST', '/api/v1/products', '201 Created', 'No'],
              ['Replace Resource', 'PUT', '/api/v1/products/:id', '200 OK', 'Yes'],
              ['Partial Update', 'PATCH', '/api/v1/products/:id', '200 OK', 'No'],
              ['Delete Resource', 'DELETE', '/api/v1/products/:id', '204 No Content', 'Yes']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'typescript',
          title: 'Complete RESTful Router with In-Memory CRUD & Validation',
          code: `import { Router, Request, Response } from 'express';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
}

// In-Memory Data Store (Educational Domain)
let books: Book[] = [
  { id: '1', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', price: 45.00 },
  { id: '2', title: 'Clean Architecture', author: 'Robert C. Martin', price: 38.50 }
];

export const booksRouter = Router();

// 1. GET ALL with optional search filtering
booksRouter.get('/', (req: Request, res: Response) => {
  const { search } = req.query;
  if (typeof search === 'string') {
    const filtered = books.filter(b => 
      b.title.toLowerCase().includes(search.toLowerCase())
    );
    return res.status(200).json({ count: filtered.length, data: filtered });
  }
  res.status(200).json({ count: books.length, data: books });
});

// 2. GET BY ID
booksRouter.get('/:id', (req: Request, res: Response) => {
  const book = books.find(b => b.id === req.params.id);
  if (!book) {
    return res.status(404).json({ error: 'NotFound', message: 'Book with specified ID does not exist.' });
  }
  res.status(200).json({ data: book });
});

// 3. POST (Create) with input validation
booksRouter.post('/', (req: Request, res: Response) => {
  const { title, author, price } = req.body;

  // Validation
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(422).json({ error: 'ValidationError', message: 'Valid title string is required.' });
  }
  if (!author || typeof author !== 'string') {
    return res.status(422).json({ error: 'ValidationError', message: 'Valid author string is required.' });
  }
  if (typeof price !== 'number' || price < 0) {
    return res.status(422).json({ error: 'ValidationError', message: 'Price must be a positive number.' });
  }

  const newBook: Book = {
    id: (books.length + 1).toString(),
    title: title.trim(),
    author: author.trim(),
    price
  };

  books.push(newBook);
  res.status(201).json({ message: 'Book created successfully.', data: newBook });
});

// 4. PATCH (Partial Update)
booksRouter.patch('/:id', (req: Request, res: Response) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'NotFound', message: 'Book not found.' });
  }

  const { title, author, price } = req.body;
  if (price !== undefined && (typeof price !== 'number' || price < 0)) {
    return res.status(422).json({ error: 'ValidationError', message: 'Invalid price.' });
  }

  books[index] = {
    ...books[index],
    ...(title ? { title: title.trim() } : {}),
    ...(author ? { author: author.trim() } : {}),
    ...(price !== undefined ? { price } : {})
  };

  res.status(200).json({ message: 'Book updated.', data: books[index] });
});

// 5. DELETE
booksRouter.delete('/:id', (req: Request, res: Response) => {
  const index = books.findIndex(b => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'NotFound', message: 'Book not found.' });
  }

  books.splice(index, 1);
  res.status(204).send(); // 204 No Content
});`,
          explanation: 'Demonstrates a complete, clean REST implementation: GET list/detail, POST with validation and 201 status, PATCH with partial merge, and DELETE with 204 No Content.'
        }
      ],
      realWorldExample: {
        scenario: 'Stripe API idempotency and status code predictability',
        industryApplication: 'The Stripe API is widely considered the gold standard of RESTful engineering. Every endpoint maps to intuitive nouns (`/v1/charges`, `/v1/refunds`), uses standard HTTP status codes, returns structured JSON error envelopes, and supports idempotent retries.',
        takeaway: 'Predictable REST semantics enable effortless client integration.'
      },
      practicalExercise: {
        title: 'Implement and Test CRUD Endpoints with cURL',
        objective: 'Test all 5 REST endpoints using terminal cURL commands.',
        requirements: ['Running Express server'],
        steps: [
          'Run `curl -X GET http://localhost:4000/api/books` to verify initial list.',
          'Run `curl -X POST http://localhost:4000/api/books -H "Content-Type: application/json" -d \'{"title":"Refactoring","author":"Martin Fowler","price":49.99}\'` and verify 201 Created.',
          'Run `curl -X PATCH http://localhost:4000/api/books/1 -H "Content-Type: application/json" -d \'{"price":39.99}\'`.',
          'Run `curl -i -X DELETE http://localhost:4000/api/books/1` and verify HTTP/1.1 204 No Content.'
        ],
        expectedResult: 'All terminal cURL requests return correct HTTP status codes and JSON payloads.'
      },
      commonMistakes: [
        {
          mistake: 'Returning HTTP 200 OK when a resource is not found (e.g. `{ error: "Not found" }` with status 200).',
          whyItHappens: 'Forgetting to set `res.status(404)`.',
          howToFix: 'Frontend libraries like React Query or Axios treat HTTP 200 as a success, masking errors. Always set `res.status(404).json(...)` so client error handlers fire properly.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm10-l2-q1',
          type: 'multiple-choice',
          question: 'Which HTTP status code should be returned after successfully creating a new resource via a POST request?',
          options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
          correctAnswerIndex: 1,
          explanation: '201 Created explicitly indicates that the request succeeded and resulted in the creation of a new resource.'
        }
      ],
      summary: [
        'REST APIs use resource-based plural nouns and standard HTTP verbs for CRUD operations.',
        'Use appropriate status codes: 201 for creation, 204 for deletion, 404 for missing items, and 422 for validation errors.',
        'Always validate request bodies before processing to safeguard backend data integrity.'
      ],
      additionalResources: [
        {
          name: 'Microsoft REST API Guidelines',
          description: 'Industry-standard guidelines for designing robust RESTful APIs.',
          url: 'https://github.com/microsoft/api-guidelines',
          usefulFor: 'Naming conventions, pagination standards, and error payloads.'
        }
      ]
    },
    {
      id: 'm10-l03',
      number: 3,
      title: 'Advanced Backend Engineering: Stream Pipelines, File Uploads & Zod Validation',
      durationMinutes: 65,
      learningObjectives: [
        'Stream large files and dataset exports efficiently using Node.js stream pipelines without exhausting server RAM.',
        'Validate incoming HTTP request parameters, queries, and bodies strictly using Zod schemas.',
        'Process multipart/form-data image and document uploads safely using Multer with disk or memory storage.',
        'Architect bidirectional real-time communications using the WebSocket protocol.'
      ],
      introduction: 'In production systems, backend servers do much more than return simple JSON arrays. They process 500MB CSV exports, validate complex payload contracts, accept user avatar uploads, and push real-time event updates to connected clients.',
      detailedNotes: `Node.js Stream Architecture:
When a client requests a 1GB file, reading it with 'fs.readFile()' loads the entire 1GB into Node.js V8 memory heap, instantly crashing the server under multiple concurrent users.
Streams break data into chunks (typically 64kB) processed in sequence:
- 'Readable Stream': Produces data (e.g. 'fs.createReadStream()').
- 'Writable Stream': Consumes data (e.g. the Express 'res' object).
- 'Transform Stream': Modifies data chunk-by-chunk (e.g. zlib gzip compression).
- 'stream/promises pipeline()': Automatically manages backpressure and safely closes streams if network connections abort.

Request Validation with Zod:
Instead of writing 50 lines of manual 'if (!req.body.title)' checks, Zod provides declarative schema validation that also generates TypeScript types:
'const schema = z.object({ email: z.string().email(), age: z.number().int().min(18) });'
'const result = schema.safeParse(req.body);'

Multipart File Uploads with Multer:
Standard 'express.json()' cannot parse binary files. Multer parses 'multipart/form-data' requests, enforcing file size limits, MIME type verification (magic number checking), and storing files in cloud buckets (S3, Supabase Storage) or local disks.`,
      concepts: [
        {
          name: 'Memory Buffering vs Streaming Backpressure',
          description: 'Why streaming is mandatory for large datasets and exports.',
          table: {
            headers: ['Approach', 'RAM Consumption', 'Latency to First Byte', 'Concurrency Capacity'],
            rows: [
              ['Buffering (fs.readFile)', 'O(N) - Scales linearly with file size (1GB file = 1GB RAM)', 'High (must read full file before sending byte 1)', 'Low (3 concurrent downloads crash server)'],
              ['Streaming (fs.createReadStream)', 'O(1) - Constant memory (~64kB buffer)', 'Instant (sends chunks immediately as read)', 'High (thousands of concurrent streams supported)']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'typescript',
          title: 'Complete Stream Pipeline & Zod Validation Middleware',
          code: `import express, { Request, Response, NextFunction } from 'express';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { z } from 'zod';

const app = express();
app.use(express.json());

// 1. Zod Course Registration Schema
const EnrollmentSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Valid email address required"),
  phone: z.string().regex(/^254[0-9]{9}$/, "Must be valid Kenyan mobile format (2547XXXXXXXX)"),
  tier: z.enum(['standard', 'pro', 'enterprise'])
});

// Generic Validation Middleware Generator
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(422).json({
        error: 'ValidationError',
        details: result.error.format()
      });
    }
    req.body = result.data; // Replaces body with stripped, validated data
    next();
  };
};

app.post('/api/enroll', validate(EnrollmentSchema), (req: Request, res: Response) => {
  res.status(201).json({ message: "Registration validated successfully!", data: req.body });
});

// 2. High-Performance Stream Response
app.get('/api/export/curriculum', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="curriculum-syllabus.csv"');

  const fileStream = createReadStream('/var/exports/syllabus.csv');
  
  try {
    // Automatically manages backpressure and cleans up handles
    await pipeline(fileStream, res);
  } catch (err) {
    console.error('Stream transmission failed:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: "ExportStreamFailed" });
    }
  }
});`,
          explanation: 'Demonstrates declarative Zod validation middleware rejecting invalid payloads with 422 Unprocessable Entity, alongside a memory-efficient stream pipeline serving large data exports.'
        }
      ],
      realWorldExample: {
        scenario: 'Exporting millions of transaction records in financial platforms',
        industryApplication: 'When finance teams click "Export 5 Years of Transactions", an app like Stripe or PayPal does not build a 2GB JSON array in server RAM. Instead, a database cursor streams rows directly into a CSV transform stream piped to the client HTTP response, consuming less than 20MB of server memory total.',
        takeaway: 'Streams allow small server instances to handle massive datasets.'
      },
      practicalExercise: {
        title: 'Build a Zod-Validated API Route with Custom Sanitization',
        objective: 'Write an Express route that parses and sanitizes a multi-field payment initiation payload using Zod.',
        requirements: ['Express app with zod installed'],
        steps: [
          'Define a Zod schema requiring `amount` (positive number) and `currency` (enum "USD" or "KES").',
          'Add a `.transform()` method to lowercase the currency code automatically.',
          'Test by sending invalid payloads with cURL and observe formatted 422 validation error trees.',
          'Send a valid payload and verify that `req.body` contains the sanitized, transformed data.'
        ],
        expectedResult: 'Robust schema enforcement preventing corrupted data from ever reaching database layers.'
      },
      commonMistakes: [
        {
          mistake: 'Using `res.send(fs.readFileSync(filePath))` for downloadable files.',
          whyItHappens: 'Quick prototyping shortcut.',
          howToFix: 'Synchronous file reads block the single-threaded Node.js event loop completely until the disk finishes reading. Always use `createReadStream()` with `pipeline()` or `res.download()`.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm10-l3-q1',
          type: 'multiple-choice',
          question: 'What is "backpressure" in Node.js stream architectures?',
          options: [
            'A physical pressure gauge on the server fan',
            'A flow-control mechanism where a slow data consumer (e.g. slow client download) signals a fast data producer (e.g. fast disk read) to pause reading until buffers drain, preventing out-of-memory crashes',
            'An error caused by CSS margins',
            'A database lock'
          ],
          correctAnswerIndex: 1,
          explanation: 'Backpressure prevents memory overflow when data is generated faster than it can be transmitted or consumed.'
        }
      ],
      summary: [
        'Streams process data in sequential chunks, keeping server RAM consumption constant regardless of file size.',
        'Use Zod schemas for declarative request body validation and automatic TypeScript type inference.',
        'Multer enables secure file uploads with size and MIME type restrictions.'
      ],
      additionalResources: [
        {
          name: 'Node.js Official Documentation — Stream API',
          description: 'Comprehensive technical guide to streams and pipeline().',
          url: 'https://nodejs.org/api/stream.html',
          usefulFor: 'Mastering readable, writable, and transform stream pipelines.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm10-lab-1',
      title: 'Lab 10.1: Building a Modular Controller-Route Express Architecture',
      durationMinutes: 60,
      objective: 'Refactor a monolithic server.ts into clean controllers, routes, and middleware modules using TypeScript.',
      prerequisites: ['Module 09 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Establish Directory Structure',
          instructions: 'Structure backend project: `src/controllers/`, `src/routes/`, `src/middleware/`, `src/server.ts`.'
        },
        {
          stepNumber: 2,
          title: 'Mount Router on Application',
          instructions: 'Export Router and mount with URL prefix:',
          code: `import { Router } from 'express';
export const router = Router();
// in server.ts:
app.use('/api/v1/tasks', router);`
        }
      ],
      verificationChecklist: [
        'Controllers contain purely business logic and do not define routes directly',
        'All endpoints prefixed with `/api/v1/` for API versioning',
        'TypeScript compiles with zero errors'
      ],
      deliverables: ['Modular Express architecture codebase']
    }
  ],
  moduleProject: {
    id: 'm10-project',
    title: 'Production-Grade REST API (Products / Course Catalog Domain)',
    difficulty: 'Advanced',
    estimatedHours: 14,
    overview: 'Build a production-grade, modular RESTful API using Node.js, Express, and TypeScript around an educational domain (such as Products, Courses, or Books). The API must implement complete CRUD operations, query parameter filtering (e.g. search, category, minPrice, maxPrice), input validation middleware that rejects invalid types with detailed 422 error maps, centralized 4-parameter error handling, request logging, and environment variable configuration via dotenv. NOTE: Uses in-memory or file-backed storage to focus purely on backend API mechanics.',
    requirements: [
      'Built with Node.js, Express, and TypeScript with strict type definitions',
      'Modular architecture: `/src/routes/`, `/src/controllers/`, `/src/middleware/`, `/src/types/`, `/src/server.ts`',
      'Complete CRUD operations: GET /items, GET /items/:id, POST /items, PUT /items/:id, PATCH /items/:id, DELETE /items/:id',
      'Query string filtering: support filtering by category, search term, and sorting (e.g., `?sort=price_asc`)',
      'Comprehensive validation: POST and PATCH reject invalid strings, negative prices, or missing required attributes with 422 Unprocessable Entity',
      'Centralized 4-argument error handling middleware catching unexpected errors and returning clean JSON error envelopes',
      'Health check endpoint at `GET /health` reporting system uptime and timestamp'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Project Setup & Server Scaffolding',
        tasks: ['Configure package.json, tsconfig.json, dotenv, and Express server shell']
      },
      {
        milestone: 2,
        title: 'Data Modeling & Validation Middleware',
        tasks: ['Define TypeScript interfaces', 'Create validation middleware for request bodies']
      },
      {
        milestone: 3,
        title: 'CRUD Route & Controller Implementation',
        tasks: ['Build GET, POST, PUT, PATCH, DELETE handlers with proper status codes']
      },
      {
        milestone: 4,
        title: 'Error Handling, Logging & API Testing',
        tasks: ['Add request logger', 'Implement global error middleware', 'Verify with cURL or test suite']
      }
    ],
    starterCodeStructure: [
      {
        path: 'rest-api/src/server.ts',
        description: 'Server entry point',
        sampleContent: `import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`API running on port \${PORT}\`));`
      }
    ],
    acceptanceCriteria: [
      'All endpoints respond with appropriate HTTP status codes (200, 201, 204, 400, 404, 422, 500)',
      'Submitting empty or invalid JSON payloads returns a 422 with a structured error array',
      'Server stays online and recovers gracefully if a route throws an unhandled exception'
    ],
    rubric: [
      { criteria: 'REST Semantics & Status Codes', points: 35, description: 'Accurate HTTP verbs, nouns, idempotency, and status codes (201, 204, 422)' },
      { criteria: 'Validation & Error Handling', points: 30, description: 'Strict request payload validation and 4-parameter global error middleware' },
      { criteria: 'Code Architecture & Modularity', points: 20, description: 'Clean separation between routes, controllers, and types' },
      { criteria: 'TypeScript Precision', points: 15, description: 'Strong typing on Request and Response objects with zero `any` usage' }
    ]
  },
  quiz: [
    {
      id: 'm10-qz-01',
      question: 'What is the key difference between HTTP PUT and HTTP PATCH?',
      options: [
        'PUT is used for deleting files; PATCH is used for reading them',
        'PUT replaces the entire resource with the provided representation; PATCH applies partial modifications to specific fields of the existing resource',
        'PUT only works with numbers',
        'There is no difference'
      ],
      correctAnswerIndex: 1,
      explanation: 'PUT implies a complete replacement of the entity; PATCH updates only the specific fields supplied in the request body.'
    },
    {
      id: 'm10-qz-02',
      question: 'Which HTTP status code should be returned if a client sends a syntactically valid JSON body that violates domain validation rules (e.g. negative product price)?',
      options: ['200 OK', '404 Not Found', '422 Unprocessable Entity', '502 Bad Gateway'],
      correctAnswerIndex: 2,
      explanation: '422 Unprocessable Entity indicates the server understands the content type and syntax, but was unable to process the contained instructions due to semantic validation failure.'
    },
    {
      id: 'm10-qz-03',
      question: 'Why should environment variables (`process.env`) be used instead of hardcoding database connection strings or ports?',
      options: [
        'JavaScript cannot read numbers directly',
        'It allows configuring different settings per environment (Local Development, Staging, Production) without modifying source code and keeps confidential credentials out of Git',
        'It increases the download speed of the browser',
        'It is required by the CSS validator'
      ],
      correctAnswerIndex: 1,
      explanation: 'Environment variables keep secrets secure and allow seamless configuration across development and production environments.'
    }
  ],
  assignment: {
    id: 'm10-assign',
    title: 'Module 10 Assignment: Rate-Limiting & Request Audit Middleware',
    problemStatement: 'Develop a custom rate-limiting middleware in Express without using third-party packages. The middleware tracks requests by client IP address in an in-memory map. If an IP exceeds 10 requests within a 60-second sliding window, immediately terminate the request with HTTP 429 Too Many Requests, set the `Retry-After: 60` header, and return a JSON payload `{ error: "RateLimitExceeded", message: "Too many requests. Please wait." }`.',
    specifications: [
      'In-memory IP address tracking with timestamp arrays',
      'Pruning of timestamps older than 60 seconds',
      'Setting `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After` response headers',
      'Test script demonstrating 10 successful requests followed by blocked 429 requests'
    ],
    deliverables: ['`rateLimiter.ts` middleware and test demonstration script.'],
    evaluationRubric: [
      { category: 'Rate Limiting Algorithm', weight: '45%', description: 'Accurate sliding window timestamp tracking per IP' },
      { category: 'HTTP Header & Status Compliance', weight: '35%', description: 'Proper headers (429 status, Retry-After, X-RateLimit)' },
      { category: 'Memory Cleanliness', weight: '20%', description: 'Pruning old timestamps to prevent in-memory memory leaks' }
    ],
    submissionFormat: 'Code files submitted in repository'
  },
  resources: [
    {
      name: 'Node.js Official Documentation',
      description: 'The authoritative reference for the Node runtime and standard libraries.',
      url: 'https://nodejs.org/docs/latest/api/',
      usefulFor: 'Event loop, HTTP module, and file system APIs.'
    },
    {
      name: 'Express.js Guide',
      description: 'Official Express documentation on routing and error handling.',
      url: 'https://expressjs.com/',
      usefulFor: 'Middleware patterns, router composition, and best practices.'
    }
  ],
  summary: 'Module 10 established backend engineering proficiency: Node.js runtime architecture, Libuv event loop, Express server pipeline, custom middleware, RESTful API design, HTTP status codes, request validation, and centralized error handling.'
};
