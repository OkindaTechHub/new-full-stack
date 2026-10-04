import { Module } from '../../types/course';

export const module12PaymentsDevops: Module = {
  id: 'module-12',
  moduleNumber: 12,
  title: 'Payments, Web Security, Performance & DevOps',
  slug: 'payments-security-devops',
  durationWeeks: 'Week 12',
  level: 'Advanced',
  phase: 'Phase 4: Production & Scale',
  overview: {
    whatItTeaches: 'Industry-standard payment gateway architectures (Safaricom M-Pesa Daraja STK Push & asynchronous callbacks; Stripe Checkout Sessions & secure webhook verification), web security hardening (sanitization, XSS, CSRF, SQL injection prevention, CORS, helmet headers, secret hygiene), web performance optimization (Core Web Vitals, Lighthouse audits, image optimization, Brotli/Gzip compression, HTTP caching), and modern DevOps deployment pipelines (CI/CD with GitHub Actions, containerization, environment variable configurations, custom domains, SSL certificates, production logging, and incident troubleshooting).',
    whyItMatters: 'Writing code that works on localhost is only the first step. Professional full-stack engineers must know how to monetize applications securely, protect sensitive customer information against cyber threats, deliver sub-second loading speeds globally, and deploy automated continuous integration pipelines with zero downtime.',
    prerequisites: ['Module 10: Backend Development with Node.js & Express', 'Module 11: Databases & Full-Stack Integration'],
    estimatedHours: 22,
    skillsAcquired: [
      'Integrating Safaricom M-Pesa Daraja API: OAuth authentication, STK Push (Lipa na M-Pesa Online), callback URL processing, and payment verification',
      'Implementing Stripe: Checkout Sessions, Payment Intents, secure webhook signatures (`stripe.webhooks.constructEvent`), and idempotency',
      'Hardening applications against OWASP Top 10 vulnerabilities (SQLi, Stored/Reflected XSS, CSRF, insecure direct object references)',
      'Optimizing Google Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)',
      'Configuring automated CI/CD deployment pipelines using GitHub Actions',
      'Deploying full-stack applications with custom domains, automated TLS/SSL certificates, and environment secrets management',
      'Monitoring application telemetry, structured JSON logging, and debugging production outages'
    ]
  },
  lessons: [
    {
      id: 'm12-l01',
      number: 1,
      title: 'Digital Payments Architecture: M-Pesa STK Push & Stripe Checkout',
      durationMinutes: 70,
      learningObjectives: [
        'Understand the mechanics of digital payment gateways and PCI-DSS compliance boundaries.',
        'Implement Safaricom M-Pesa Daraja STK Push (Lipa na M-Pesa Online) via backend API requests.',
        'Process asynchronous M-Pesa payment callback payloads securely.',
        'Create Stripe Checkout sessions and handle asynchronous webhook verification with cryptographic signatures.',
        'Prevent race conditions and double-spending using database transaction locks and idempotency keys.'
      ],
      introduction: 'Monetization is the lifeblood of commercial software. Integrating payment gateways requires extreme discipline: client devices cannot be trusted with pricing or transaction verification, and network timeouts require robust asynchronous callback architectures.',
      detailedNotes: `Payment Gateway Architecture:
Clients (browsers or mobile phones) must NEVER calculate final prices or directly initiate fund transfers.
The golden rule of payments:
1. Client requests a checkout initiation with item IDs.
2. Backend queries the database for authoritative prices, computes totals, and generates a payment session or push request to the gateway.
3. The payment gateway processes funds out-of-band (e.g. user enters M-Pesa PIN on their phone or enters credit card on Stripe hosted checkout).
4. The payment gateway fires an asynchronous HTTP Webhook/Callback to your backend server confirming success or failure.
5. Your backend cryptographically validates the webhook signature and fulfills the order.

Part A — Safaricom M-Pesa (Daraja API):
- OAuth 2.0 Token Generation: Exchange Consumer Key & Consumer Secret for a short-lived Bearer token.
- STK Push (Lipa na M-Pesa Online): Dispatches an SIM toolkit prompt directly to the customer's mobile phone requesting their M-Pesa PIN.
- Payload parameters: BusinessShortCode, Password (base64 of ShortCode + Passkey + Timestamp), Timestamp, Amount, PartyA (customer phone 2547...), PartyB (paybill), CallBackURL.
- Callback Processing: M-Pesa POSTs a JSON payload containing 'ResultCode' (0 = Success) and 'CallbackMetadata' with the M-Pesa Receipt Number.

Part B — Stripe Integration:
- Stripe Checkout: Secure hosted payment page hosted by Stripe, eliminating PCI-DSS compliance burdens from your server.
- Webhook Signatures: Stripe signs every webhook event with an 'Stripe-Signature' header. Your server verifies this using your 'STRIPE_WEBHOOK_SECRET' to guarantee the notification actually originated from Stripe and was not spoofed by an attacker.`,
      concepts: [
        {
          name: 'The Asynchronous Webhook Payment Flow',
          description: 'Why payment confirmation happens via asynchronous webhooks rather than synchronous browser redirects.',
          diagram: `[User Browser] ──(1) Clicks "Pay $50"──► [Your Backend Server]
                                              │ (2) Generates Session / STK Push
                                              ▼
                                    [Payment Gateway (Stripe / M-Pesa)]
                                              │ (3) User enters PIN / Card
                                              ▼
                                    [Payment Gateway Engine]
                                              │
              ┌───────────────────────────────┴──────────────────────────────┐
              ▼ (4. Out-of-band Asynchronous Webhook)                       ▼ (5. Browser Redirect)
     [Your Backend Server]                                         [User Browser Thank You Page]
              │ (Verifies cryptographic signature & marks paid in DB)        (Displays pending/success UI)
              ▼
     [Database: Order Paid]`
        }
      ],
      codeExamples: [
        {
          language: 'typescript',
          title: 'Safaricom M-Pesa Daraja STK Push Initiation (Express / TypeScript)',
          code: `import axios from 'axios';

interface StkPushParams {
  phoneNumber: string; // e.g. "254712345678"
  amount: number;
  orderId: string;
}

export async function initiateMpesaStkPush({ phoneNumber, amount, orderId }: StkPushParams) {
  const shortCode = process.env.MPESA_SHORTCODE!;
  const passkey = process.env.MPESA_PASSKEY!;
  const callbackUrl = process.env.MPESA_CALLBACK_URL!; // Must be public HTTPS endpoint

  // 1. Generate Timestamp: YYYYMMDDHHmmss
  const date = new Date();
  const timestamp = date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0') +
    String(date.getHours()).padStart(2, '0') +
    String(date.getMinutes()).padStart(2, '0') +
    String(date.getSeconds()).padStart(2, '0');

  // 2. Generate Base64 Password: base64(Shortcode + Passkey + Timestamp)
  const password = Buffer.from(\`\${shortCode}\${passkey}\${timestamp}\`).toString('base64');

  // 3. Obtain OAuth Token (assumed cached or retrieved from Daraja oauth endpoint)
  const token = await getDarajaAccessToken();

  // 4. Dispatch STK Push Request
  const response = await axios.post(
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: \`Order_\${orderId}\`,
      TransactionDesc: 'Course Enrollment Payment'
    },
    {
      headers: {
        Authorization: \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data; // Returns CheckoutRequestID and ResponseCode
}`,
          explanation: 'Demonstrates authentic M-Pesa Daraja integration: timestamp generation, base64 signature creation, OAuth token authorization, and STK Push payload dispatching to Safaricom sandbox.'
        },
        {
          language: 'typescript',
          title: 'Stripe Webhook Signature Verification Endpoint',
          code: `import express, { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27.acacia' as any });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const stripeWebhookRouter = express.Router();

// CRITICAL: Stripe webhooks require the RAW unparsed body buffer to verify signatures!
stripeWebhookRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];

    if (!sig) {
      return res.status(400).send('Missing stripe-signature header');
    }

    let event: Stripe.Event;

    try {
      // Cryptographically verifies that the payload came from Stripe
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(\`Webhook Error: \${err instanceof Error ? err.message : 'Unknown'}\`);
    }

    // Handle the verified event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(\`Payment verified for Order \${session.client_reference_id}!\`);
        // Fulfill order in database: UPDATE orders SET status = 'paid' WHERE id = ...
        break;
      }
      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;
        console.warn(\`Payment failed: \${intent.last_payment_error?.message}\`);
        break;
      }
    }

    res.status(200).json({ received: true });
  }
);`,
          explanation: 'Demonstrates secure Stripe webhook processing: raw body parsing, cryptographic signature verification using stripe.webhooks.constructEvent, and handling checkout.session.completed.'
        }
      ],
      realWorldExample: {
        scenario: 'Handling browser crashes during payment processing',
        industryApplication: 'A user enters their M-Pesa PIN or submits a credit card, but their phone battery dies before the browser redirects back to the confirmation page. Because payment fulfillment is triggered by asynchronous webhooks on the server rather than the client browser, the order is fulfilled successfully and an email receipt is sent automatically.',
        takeaway: 'Never rely on client-side browser redirects for order fulfillment; always use server webhooks.'
      },
      practicalExercise: {
        title: 'Inspect an M-Pesa Callback Payload in a Sandbox Environment',
        objective: 'Write an Express callback route that parses Safaricom callback JSON and extracts the receipt number.',
        requirements: ['Express server'],
        steps: [
          'Create an endpoint `POST /api/v1/payments/mpesa-callback`.',
          'Inspect `req.body.Body.stkCallback.ResultCode`.',
          'If `ResultCode === 0`, extract `MpesaReceiptNumber` from the `CallbackMetadata.Item` array.',
          'If `ResultCode !== 0`, log the failure `ResultDesc` (e.g. "Request cancelled by user").',
          'Always respond with `res.status(200).json({ ResultCode: 0, ResultDesc: "Accepted" })` so Safaricom does not retry.'
        ],
        expectedResult: 'A production-ready callback controller that logs receipts and notifies order systems.'
      },
      commonMistakes: [
        {
          mistake: 'Using `express.json()` on the Stripe webhook route instead of `express.raw({ type: "application/json" })`.',
          whyItHappens: 'Standard JSON parsers alter whitespace and key order, which breaks cryptographic signature validation.',
          howToFix: 'Mount the raw body parser specifically on the webhook route so `req.body` is an unmodified Buffer.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm12-l1-q1',
          type: 'multiple-choice',
          question: 'Why must payment fulfillment (e.g. marking an order as paid) occur in a webhook handler rather than on the frontend success redirect URL?',
          options: [
            'Frontend redirects are slower',
            'A malicious user can manually type the success URL into their browser without ever paying, or network drops can prevent the browser from reaching the redirect',
            'Stripe does not allow frontend redirects',
            'React components cannot communicate with databases'
          ],
          correctAnswerIndex: 1,
          explanation: 'The frontend cannot be trusted. Anyone can visit `/checkout/success`. Server-to-server webhooks signed with cryptographic secrets are the only authoritative proof of payment.'
        }
      ],
      summary: [
        'Never trust client devices with pricing or payment confirmation.',
        'M-Pesa uses STK Push and asynchronous callback POSTs with M-Pesa receipt metadata.',
        'Stripe webhooks must be verified using raw request buffers and secret signatures.'
      ],
      additionalResources: [
        {
          name: 'Safaricom Daraja API Portal Documentation',
          description: 'Official API documentation for M-Pesa STK Push and B2C/C2B APIs.',
          url: 'https://developer.safaricom.co.ke/docs',
          usefulFor: 'Daraja authentication, endpoints, sandbox credentials, and error codes.'
        },
        {
          name: 'Stripe Documentation — Webhooks',
          description: 'Official guide to setting up and verifying Stripe webhooks.',
          url: 'https://stripe.com/docs/webhooks',
          usefulFor: 'Event types, signature verification, and testing with the Stripe CLI.'
        }
      ]
    },
    {
      id: 'm12-l02',
      number: 2,
      title: 'Web Security Hardening, Performance Optimization & DevOps CI/CD',
      durationMinutes: 75,
      learningObjectives: [
        'Prevent the OWASP Top 10 vulnerabilities: SQL Injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF).',
        'Configure HTTP security headers using Helmet (Content Security Policy, HSTS, X-Frame-Options).',
        'Audit and optimize Core Web Vitals (LCP, INP, CLS) using Lighthouse.',
        'Implement caching headers (`Cache-Control: max-age, stale-while-revalidate`) and asset compression (Brotli/Gzip).',
        'Automate testing and deployment using GitHub Actions CI/CD workflows.',
        'Manage production secrets and monitor live application health via structured logging.'
      ],
      introduction: 'A web application that is fast and functional is still a failure if it leaks user data or crashes under production traffic. This lesson covers the engineering disciplines required to harden, optimize, deploy, and monitor full-stack systems at scale.',
      detailedNotes: `Part 1 — Web Security (OWASP):
1. SQL Injection (SQLi):
   - Flaw: Concatenating untrusted user input directly into an SQL string ('"SELECT * FROM users WHERE email = \'" + input + "\'"').
   - Defense: Always use Parameterized Queries with placeholders ('$1, $2' in PostgreSQL) or ORMs/query builders.
2. Cross-Site Scripting (XSS):
   - Flaw: Injecting malicious '<script>' tags into the DOM via 'innerHTML'.
   - Defense: Sanitize user input, use 'textContent', enable React’s automatic escaping, and configure a strict Content Security Policy (CSP).
3. Cross-Site Request Forgery (CSRF):
   - Defense: SameSite cookie attributes ('SameSite=Lax' or 'Strict') and Anti-CSRF verification tokens.
4. Security Headers with Helmet:
   - 'Strict-Transport-Security' (HSTS): Forces HTTPS.
   - 'X-Content-Type-Options: nosniff': Blocks MIME sniffing attacks.
   - 'X-Frame-Options: DENY': Prevents clickjacking by blocking iframe embedding.

Part 2 — Performance Optimization & Core Web Vitals:
- Largest Contentful Paint (LCP): Measures perceived loading speed (target: $\le 2.5\text{s}$). Optimize hero images with modern formats (WebP/AVIF) and preloading ('<link rel="preload">').
- Interaction to Next Paint (INP): Measures page responsiveness to user clicks (target: $\le 200\text{ms}$). Avoid heavy JavaScript blocking the main thread.
- Cumulative Layout Shift (CLS): Measures visual stability (target: $\le 0.1$). Always include explicit 'width' and 'height' aspect ratios on images and video containers.
- HTTP Caching Directives:
  'Cache-Control: public, max-age=31536000, immutable' for hashed static assets.
  'Cache-Control: no-cache' for dynamic API responses.

Part 3 — DevOps, CI/CD & Deployment:
- CI/CD with GitHub Actions: A '.github/workflows/deploy.yml' pipeline that automatically triggers on pushes to 'main', runs 'npm run lint', executes tests, builds production bundles ('npm run build'), and deploys to hosting platforms (Cloud Run, Vercel, AWS).
- Environment Variables: Stored securely in secret vaults; never checked into Git.`,
      concepts: [
        {
          name: 'Core Web Vitals Metrics Thresholds',
          description: 'Google’s three key metrics assessing user experience and search ranking.',
          table: {
            headers: ['Metric', 'Measures', 'Good (Target)', 'Needs Improvement', 'Poor'],
            rows: [
              ['LCP (Largest Contentful Paint)', 'Loading performance (largest visible image/block)', '≤ 2.5 s', '2.5 s – 4.0 s', '> 4.0 s'],
              ['INP (Interaction to Next Paint)', 'Interactivity latency (click/tap to visual update)', '≤ 200 ms', '200 ms – 500 ms', '> 500 ms'],
              ['CLS (Cumulative Layout Shift)', 'Visual stability (unintended layout jumping)', '≤ 0.1', '0.1 – 0.25', '> 0.25']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'typescript',
          title: 'Securing an Express API with Helmet, CORS, and Parameterized Queries',
          code: `import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
const dbPool = new Pool({ connectionString: process.env.DATABASE_URL });

// 1. Secure HTTP Headers via Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["https://js.stripe.com"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

// 2. Strict CORS Configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'https://myproductionapp.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' })); // Mitigate DoS via oversized payloads

// 3. SAFE: Parameterized SQL Query (Prevents SQL Injection)
app.get('/api/users/lookup', async (req, res) => {
  const { email } = req.query;

  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email parameter' });
  }

  try {
    // NEVER concatenate strings into SQL! Use parameterized queries ($1)
    const result = await dbPool.query(
      'SELECT id, username, email FROM users WHERE email = $1 AND is_active = TRUE',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Database query failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});`,
          explanation: 'Demonstrates security best practices: Helmet with strict Content Security Policy, restrictive CORS configuration, body size limits against DoS attacks, and parameterized SQL queries to prevent SQL Injection.'
        },
        {
          language: 'yaml',
          title: 'Production GitHub Actions CI/CD Workflow (.github/workflows/deploy.yml)',
          code: `name: Production CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Static Type Verification
        run: npm run lint

      - name: Execute Automated Test Suite
        run: npm test

      - name: Build Production Bundles
        run: npm run build
        env:
          NODE_ENV: production
          VITE_API_URL: \${{ secrets.PROD_API_URL }}`
        }
      ],
      realWorldExample: {
        scenario: 'Catastrophic SQL injection data breach at TalkTalk',
        industryApplication: 'Attackers breached TalkTalk by appending `\' OR 1=1 --` into an unescaped web search box, dumping personal information of 156,000 customers and resulting in millions in regulatory fines. Modern backend developers use parameterized queries and ORMs that treat user input strictly as literal values, rendering SQL injection structurally impossible.',
        takeaway: 'Never concatenate raw strings into database queries.'
      },
      practicalExercise: {
        title: 'Run a Lighthouse Audit & Eliminate Layout Shifts',
        objective: 'Measure performance and optimize image sizing to achieve a 0.00 CLS score.',
        requirements: ['Chrome DevTools'],
        steps: [
          'Open Chrome DevTools, click the "Lighthouse" tab, select "Performance", and click "Analyze page load".',
          'Note the initial CLS and LCP scores.',
          'Add explicit `width="800" height="450"` and `loading="lazy"` attributes to all `<img>` tags to reserve aspect-ratio space in the DOM.',
          'Rerun Lighthouse and observe CLS drop to 0.'
        ],
        expectedResult: 'A measurable improvement in Core Web Vitals metrics and Lighthouse performance score.'
      },
      commonMistakes: [
        {
          mistake: 'Using `*` (wildcard) for CORS in production while sending auth cookies with `credentials: true`.',
          whyItHappens: 'Trying to quickly bypass CORS errors during development.',
          howToFix: 'Browsers strictly reject CORS requests where `Access-Control-Allow-Origin: *` is combined with `credentials: true`. Always specify the exact trusted production frontend origin.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm12-l2-q1',
          type: 'multiple-choice',
          question: 'What is the most effective defense against SQL Injection attacks?',
          options: [
            'Installing a desktop antivirus program',
            'Using Parameterized Queries (prepared statements) where user inputs are bound separately from SQL execution commands',
            'Writing all SQL queries in uppercase letters',
            'Deleting the database backup'
          ],
          correctAnswerIndex: 1,
          explanation: 'Parameterized queries ensure the database driver treats input strictly as data values, never as executable SQL commands.'
        }
      ],
      summary: [
        'Protect apps using parameterized SQL queries, Helmet headers, CORS policies, and input sanitization.',
        'Optimize Core Web Vitals (LCP, INP, CLS) using modern image formats and layout stability.',
        'Automate build, lint, and test verification with GitHub Actions CI/CD workflows.'
      ],
      additionalResources: [
        {
          name: 'OWASP Top Ten Web Application Security Risks',
          description: 'The standard awareness document for developers and web application security.',
          url: 'https://owasp.org/www-project-top-ten/',
          usefulFor: 'Understanding injection, broken access control, and cryptographic failures.'
        },
        {
          name: 'web.dev by Google — Core Web Vitals',
          description: 'Google’s official guide to optimizing web performance and speed.',
          url: 'https://web.dev/explore/fast',
          usefulFor: 'Mastering LCP, INP, and CLS optimization techniques.'
        }
      ]
    },
    {
      id: 'm12-l03',
      number: 3,
      title: 'Production Payment Reliability, Docker Containerization & NGINX Reverse Proxy',
      durationMinutes: 70,
      learningObjectives: [
        'Poll Safaricom Daraja STK Push transaction status via the query endpoint if asynchronous callbacks are delayed.',
        'Prevent duplicate customer charges using HTTP Idempotency Keys (`Idempotency-Key`).',
        'Package full-stack web applications into minimal, secure multi-stage Docker container images.',
        'Configure NGINX as an edge reverse proxy with SSL termination, rate-limiting, and Gzip compression.',
        'Implement structured JSON logging with correlation IDs for tracing distributed production errors.'
      ],
      introduction: 'Taking a payment system live requires bulletproof resilience: cellular networks in emerging markets drop packets, users double-click "Submit Order" buttons, and production servers must restart seamlessly behind zero-downtime reverse proxies without severing active user connections.',
      detailedNotes: `Handling Delayed Payment Callbacks (M-Pesa STK Query):
While M-Pesa callbacks usually arrive within 5–15 seconds, cellular packet loss or telco maintenance can delay callback delivery.
Production resilience pattern:
1. When initiating STK Push, store 'CheckoutRequestID' with status 'PENDING'.
2. The frontend polls your backend status endpoint ('/api/orders/:id/status').
3. If after 30 seconds no callback has arrived, your backend calls Safaricom's 'stkpushquery/v1/query' endpoint using the 'CheckoutRequestID' to poll the authoritative transaction status directly.

Payment Idempotency (Preventing Double-Charging):
If a user clicks "Pay $100" twice in quick succession, or a mobile network drops before receiving the HTTP 200 response, the client retries the POST request.
Without idempotency, the customer is billed twice ($200).
- Idempotency Key: The client generates a UUID (v4) and sends it in the 'Idempotency-Key' HTTP header.
- The server checks if an operation with that UUID has already executed within the past 24 hours. If so, it returns the cached original result without re-charging the payment card.

Docker Multi-Stage Containerization:
Multi-stage Docker builds separate build dependencies (TypeScript compiler,devDependencies, 800MB) from the production runtime image (Node.js Alpine + production dist, 90MB):
- Stage 1 ('builder'): 'npm ci', 'npm run build'
- Stage 2 ('runner'): Copies only compiled '/dist' and production 'node_modules', drastically shrinking container attack surface and boot times.

NGINX Edge Reverse Proxy:
Places NGINX in front of the Node.js application to handle TLS/SSL encryption certificates, buffer slow client downloads, compress responses with Gzip/Brotli, and forward requests via 'proxy_pass http://localhost:4000'.`,
      concepts: [
        {
          name: 'The Idempotency Key Execution Flow',
          description: 'Guaranteeing that retrying a payment request never charges a customer twice.',
          diagram: `[Client] ──(1) POST /charges (Idempotency-Key: "uuid-123")──► [Server Engine]
                                                                   │
                                                                   ▼ (Checks Redis / DB Cache)
                                                         [Key "uuid-123" exists?]
                                                          ├── NO  ──► Charges card ($100), stores result in cache
                                                          └── YES ──► Returns cached $100 receipt (Card NOT charged again!)`
        }
      ],
      codeExamples: [
        {
          language: 'dockerfile',
          title: 'Production Multi-Stage Dockerfile & NGINX Reverse Proxy Config',
          code: `# --- STAGE 1: Build & Compile ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src/ ./src
COPY index.html vite.config.ts ./
RUN npm run build

# --- STAGE 2: Minimal Production Image ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
USER node
CMD ["node", "dist/server.js"]

# --- NGINX CONFIGURATION (/etc/nginx/conf.d/app.conf) ---
# server {
#   listen 80;
#   server_name api.fullstackdev.edu;
#   return 301 https://$host$request_uri;
# }
# server {
#   listen 443 ssl http2;
#   server_name api.fullstackdev.edu;
#   ssl_certificate /etc/letsencrypt/live/fullstackdev.edu/fullchain.pem;
#   ssl_certificate_key /etc/letsencrypt/live/fullstackdev.edu/privkey.pem;
#
#   location / {
#     proxy_pass http://localhost:3000;
#     proxy_set_header Host $host;
#     proxy_set_header X-Real-IP $remote_addr;
#     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#     proxy_set_header X-Forwarded-Proto $scheme;
#   }
# }`,
          explanation: 'Demonstrates a production multi-stage Docker build producing a secure, non-root 90MB image, alongside an NGINX reverse proxy configuration with automatic HTTPS redirection and SSL termination.'
        }
      ],
      realWorldExample: {
        scenario: 'Handling Black Friday checkout traffic spikes without double charges',
        industryApplication: 'During high-volume checkout periods, payment gateway timeouts spike by 400%. Companies like Shopify and Stripe use Idempotency Keys to safely retry timed-out requests in the background, ensuring 100% of legitimate purchases complete while zero customers are billed twice.',
        takeaway: 'Idempotency is the cornerstone of distributed payment reliability.'
      },
      practicalExercise: {
        title: 'Implement an Idempotent Payment Route in Express',
        objective: 'Write an Express middleware that checks incoming `Idempotency-Key` headers against an in-memory cache.',
        requirements: ['Express app'],
        steps: [
          'Create an in-memory map `idempotencyStore = new Map()`.',
          'In the checkout route, extract `req.headers["idempotency-key"]`. If missing, reject with 400 Bad Request.',
          'If the key exists in the map, return the cached response immediately with `X-Cache: HIT`.',
          'If new, simulate charging the card, store the resulting receipt in the map, and return with `X-Cache: MISS`.',
          'Send the same request twice using cURL and verify the second request does not re-execute the charge.'
        ],
        expectedResult: 'Repeat requests with identical idempotency keys return identical receipts without triggering duplicate business logic.'
      },
      commonMistakes: [
        {
          mistake: 'Running Docker containers as the root user (`USER root`).',
          whyItHappens: 'Default behavior in most base Docker images.',
          howToFix: 'If an attacker breaks out of the Node application via a vulnerability, they gain root access to the host machine. Always add `USER node` before the `CMD` directive.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm12-l3-q1',
          type: 'multiple-choice',
          question: 'What is the purpose of an HTTP `Idempotency-Key` header during payment processing?',
          options: [
            'It encrypts browser passwords',
            'It allows clients to safely retry a failed or timed-out payment request without risking duplicate charges if the server had already processed the initial attempt',
            'It generates free credit card numbers',
            'It is a required HTML5 tag'
          ],
          correctAnswerIndex: 1,
          explanation: 'Idempotency keys ensure that retrying a network request returns the cached result of the original transaction rather than processing a second charge.'
        }
      ],
      summary: [
        'Poll M-Pesa transaction status directly via STK Query if network callbacks are delayed.',
        'Use Idempotency Keys on payment endpoints to prevent double-charging on network retries.',
        'Multi-stage Docker builds shrink production image sizes and run securely as non-root users.'
      ],
      additionalResources: [
        {
          name: 'Stripe Documentation — Idempotent Requests',
          description: 'Official architecture guide to implementing idempotency keys.',
          url: 'https://stripe.com/docs/api/idempotent_requests',
          usefulFor: 'Mastering distributed transaction guarantees and retry logic.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm12-lab-1',
      title: 'Lab 12.1: Production Deployment & Health Check Configuration',
      durationMinutes: 60,
      objective: 'Configure environment variables, write a production build script, and test health check and metric endpoints.',
      prerequisites: ['Module 11 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Audit Environment Separation',
          instructions: 'Ensure all secret keys are loaded via process.env and create .env.example:',
          code: `# .env.example (Safe to commit)
PORT=4000
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
STRIPE_SECRET_KEY=sk_test_placeholder
MPESA_CONSUMER_KEY=placeholder`
        }
      ],
      verificationChecklist: [
        '.env is listed in .gitignore and never tracked by Git',
        'Production build (`npm run build`) generates optimized bundles with zero warnings',
        'Health check endpoint `/health` reports 200 OK'
      ],
      deliverables: ['Production-ready deployment config and verification output']
    }
  ],
  moduleProject: {
    id: 'm12-project',
    title: 'Final Capstone Project: Production-Ready Full-Stack E-Commerce Platform',
    difficulty: 'Capstone',
    estimatedHours: 24,
    overview: 'The definitive capstone project synthesizing all 12 modules of the course: Build a production-ready, fully responsive, secure, and performant Full-Stack E-Commerce Platform. The architecture features a React + TypeScript + Tailwind CSS frontend, an Express + TypeScript backend API, a PostgreSQL / Supabase relational database, dual digital payment processing (Safaricom M-Pesa STK Push and Stripe Checkout Sessions with webhook verification), OWASP security hardening, Core Web Vitals optimization, and a production CI/CD deployment configuration.',
    requirements: [
      'Frontend (React + TypeScript + Tailwind): Responsive product catalog, search with debouncing, category filtering, cart management, and checkout drawer',
      'Backend (Node.js + Express + TypeScript): Modular REST API with controllers, validation middleware, and global error handling',
      'Database (PostgreSQL / Supabase): Relational schema with products, categories, orders, and order_items tables enforcing foreign keys and constraints',
      'Payment Integrations: Safaricom M-Pesa STK Push flow with callback handler AND Stripe Checkout Session with cryptographically verified webhook handler',
      'Security Hardening: Parameterized SQL queries, Helmet security headers, CORS origin restriction, and secret hygiene via .env',
      'Performance Optimization: WebP/AVIF images with explicit width/height (CLS < 0.05), code splitting with React.lazy, and Lighthouse score > 90',
      'DevOps: GitHub Actions workflow for automated testing and production build verification'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Database Schema & Relational Models',
        tasks: ['Model categories, products, orders, and order_items in PostgreSQL', 'Configure constraints and indexes']
      },
      {
        milestone: 2,
        title: 'Backend REST API & Payment Gateways',
        tasks: ['Build CRUD endpoints for catalog and orders', 'Implement M-Pesa STK Push and Stripe webhook routes']
      },
      {
        milestone: 3,
        title: 'React & TypeScript Frontend Integration',
        tasks: ['Build responsive catalog and cart UI', 'Connect checkout flows to M-Pesa phone prompt and Stripe checkout']
      },
      {
        milestone: 4,
        title: 'Security, Performance & CI/CD Deployment',
        tasks: ['Audit with Lighthouse', 'Configure Helmet and CORS', 'Write GitHub Actions CI/CD deployment workflow']
      }
    ],
    starterCodeStructure: [
      {
        path: 'capstone/README.md',
        description: 'Complete capstone architectural blueprint',
        sampleContent: `# Full-Stack E-Commerce Platform (Production Capstone)

A production-grade full-stack e-commerce engine with dual payment rails (M-Pesa + Stripe).

## Architecture
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL / Supabase
- **Payments:** Safaricom M-Pesa Daraja & Stripe Webhooks
- **Security:** Helmet, CORS, Parameterized SQL, OWASP Compliant`
      }
    ],
    acceptanceCriteria: [
      'Complete end-to-end user checkout flow from product selection to payment webhook confirmation',
      'M-Pesa STK push successfully prompts phone or logs formatted sandbox response',
      'Stripe webhook verifies signature before marking order as paid in the database',
      'Lighthouse performance and accessibility scores exceed 90'
    ],
    rubric: [
      { criteria: 'Full-Stack System Architecture', points: 30, description: 'Seamless, robust integration across React frontend, Express API, and PostgreSQL database' },
      { criteria: 'Dual Payment Implementation', points: 25, description: 'Production-ready M-Pesa STK push and Stripe webhook signature verification' },
      { criteria: 'Web Security & Data Integrity', points: 20, description: 'Zero SQL injection, Helmet headers, strict CORS, and secret protection' },
      { criteria: 'Performance & Production Polish', points: 15, description: 'Core Web Vitals optimization, lazy loading, and Lighthouse excellence' },
      { criteria: 'DevOps & CI/CD Pipeline', points: 10, description: 'Automated GitHub Actions workflow and clean environment configuration' }
    ]
  },
  quiz: [
    {
      id: 'm12-qz-01',
      question: 'What is the purpose of the `SameSite=Lax` or `SameSite=Strict` cookie attribute?',
      options: [
        'It speeds up cookie loading on mobile networks',
        'It mitigates Cross-Site Request Forgery (CSRF) attacks by preventing the browser from sending the cookie in cross-site requests',
        'It converts cookies into localStorage',
        'It encrypts the user’s screen'
      ],
      correctAnswerIndex: 1,
      explanation: 'SameSite restricts when cookies are sent with cross-site requests, providing robust native defense against CSRF attacks.'
    },
    {
      id: 'm12-qz-02',
      question: 'Which Google Core Web Vital metric measures the visual stability of a webpage and prevents content from jumping around as images load?',
      options: ['Largest Contentful Paint (LCP)', 'Interaction to Next Paint (INP)', 'Cumulative Layout Shift (CLS)', 'Time To First Byte (TTFB)'],
      correctAnswerIndex: 2,
      explanation: 'Cumulative Layout Shift (CLS) quantifies how often users experience unexpected layout shifts while reading or interacting with a page.'
    },
    {
      id: 'm12-qz-03',
      question: 'In Safaricom M-Pesa Daraja STK Push, what constitutes the `Password` parameter sent in the JSON payload?',
      options: [
        'The developer personal M-Pesa PIN',
        'A Base64-encoded string combining BusinessShortCode + Passkey + Timestamp (YYYYMMDDHHmmss)',
        'An MD5 hash of the user’s phone number',
        'The word "SECRET"'
      ],
      correctAnswerIndex: 1,
      explanation: 'Daraja STK Push requires a base64 encoded concatenation of `ShortCode + Passkey + Timestamp`.'
    }
  ],
  assignment: {
    id: 'm12-assign',
    title: 'Module 12 Assignment: Production Deployment & Threat Modeling Audit',
    problemStatement: 'Perform an end-to-end security, performance, and deployment audit of your full-stack application. Generate a comprehensive Threat Model identifying potential vulnerabilities (Injection, Broken Authentication, Sensitive Data Exposure) along with technical mitigations. Run a Lighthouse audit, capture the performance report, implement optimizations to achieve >90 across all categories, and write a GitHub Actions deployment workflow with automated testing.',
    specifications: [
      'Documented Threat Model with mitigations for at least 4 OWASP categories',
      'Before-and-after Lighthouse performance audit screenshots',
      'Configured GitHub Actions CI workflow file (`.github/workflows/ci.yml`)',
      'Verified parameterized database queries and Helmet security headers'
    ],
    deliverables: ['`audit-report.md`, `.github/workflows/ci.yml`, and Lighthouse audit JSON.'],
    evaluationRubric: [
      { category: 'Security Threat Modeling', weight: '40%', description: 'Thorough vulnerability assessment and concrete mitigations' },
      { category: 'Performance Optimization & Core Web Vitals', weight: '35%', description: 'Documented improvements in LCP, CLS, and asset caching' },
      { category: 'CI/CD Automation', weight: '25%', description: 'Functional GitHub Actions configuration with build and test stages' }
    ],
    submissionFormat: 'Repository markdown and workflow submission'
  },
  resources: [
    {
      name: 'OWASP Cheat Sheet Series',
      description: 'Concise guides for developers on preventing web vulnerabilities.',
      url: 'https://cheatsheetseries.owasp.org/',
      usefulFor: 'SQL Injection prevention, XSS defense, REST security, and authentication.'
    },
    {
      name: 'GitHub Actions Documentation',
      description: 'Official guide to building CI/CD workflows.',
      url: 'https://docs.github.com/en/actions',
      usefulFor: 'Automating tests, building artifacts, and continuous deployment.'
    },
    {
      name: 'Google PageSpeed Insights',
      description: 'Online Core Web Vitals and Lighthouse analyzer.',
      url: 'https://pagespeed.web.dev/',
      usefulFor: 'Measuring real-world user metrics and performance bottlenecks.'
    }
  ],
  summary: 'Module 12 culminated in production-grade full-stack engineering: M-Pesa and Stripe payment rails, OWASP web security hardening, Core Web Vitals performance optimization, and GitHub Actions CI/CD deployment pipelines.'
};
