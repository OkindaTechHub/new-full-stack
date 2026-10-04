import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink, X, BookOpen } from 'lucide-react';

const CHEATSHEETS = [
  {
    id: 'git-commands',
    category: 'Version Control',
    title: 'Git Essential Command Reference',
    content: `# Initialize & Identity
git init
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Snapshot Cycle
git status
git add <file>
git commit -m "feat(scope): concise description"

# Inspection
git log --oneline --graph --decorate
git diff

# Branching & Merging
git branch <branch-name>
git switch <branch-name>
git switch -c <new-branch>
git merge <branch-name>

# Remote GitHub Operations
git remote add origin https://github.com/user/repo.git
git push -u origin main
git pull origin main`
  },
  {
    id: 'css-layout',
    category: 'CSS & Design',
    title: 'Flexbox & CSS Grid Cheatsheet',
    content: `/* --- FLEXBOX 1D LAYOUT --- */
.flex-container {
  display: flex;
  flex-direction: row; /* row | column */
  justify-content: space-between; /* center | flex-start | space-around */
  align-items: center; /* stretch | flex-start | flex-end */
  gap: 1.5rem;
}
.flex-item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
}

/* --- CSS GRID 2D AUTO-RESPONSIVE --- */
.grid-container {
  display: grid;
  /* Auto-fits columns without media queries */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`
  },
  {
    id: 'typescript-types',
    category: 'TypeScript',
    title: 'TypeScript Generics & Discriminated Unions',
    content: `// Generic API Response Container
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Discriminated Union Pattern
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Utility Types
type PartialUser = Partial<User>; // All optional
type UserContact = Pick<User, 'email' | 'phone'>;
type SafeUser = Omit<User, 'passwordHash'>;`
  },
  {
    id: 'express-rest',
    category: 'Backend & APIs',
    title: 'Express REST CRUD Route Template',
    content: `import { Router, Request, Response } from 'express';

export const itemsRouter = Router();

// GET ALL
itemsRouter.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ data: [] });
});

// GET SINGLE
itemsRouter.get('/:id', async (req: Request, res: Response) => {
  res.status(200).json({ data: item });
});

// CREATE (POST)
itemsRouter.post('/', async (req: Request, res: Response) => {
  res.status(201).json({ message: 'Created', data: newItem });
});

// PARTIAL UPDATE (PATCH)
itemsRouter.patch('/:id', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Updated', data: updatedItem });
});

// DELETE
itemsRouter.delete('/:id', async (req: Request, res: Response) => {
  res.status(204).send();
});`
  },
  {
    id: 'payments-payloads',
    category: 'Payments',
    title: 'M-Pesa STK Push & Stripe Webhook Payloads',
    content: `// 1. Safaricom M-Pesa STK Push Payload
{
  "BusinessShortCode": "174379",
  "Password": "base64(Shortcode+Passkey+Timestamp)",
  "Timestamp": "20261004120000",
  "TransactionType": "CustomerPayBillOnline",
  "Amount": 1500,
  "PartyA": "254712345678",
  "PartyB": "174379",
  "PhoneNumber": "254712345678",
  "CallBackURL": "https://api.yourdomain.com/api/v1/payments/mpesa-callback",
  "AccountReference": "INV_8921",
  "TransactionDesc": "Course Payment"
}

// 2. Stripe Webhook Signature Verification
const event = stripe.webhooks.constructEvent(
  rawBodyBuffer,
  req.headers['stripe-signature'],
  process.env.STRIPE_WEBHOOK_SECRET
);`
  }
];

export const CheatsheetsModal: React.FC = () => {
  const [selectedSheet, setSelectedSheet] = useState(CHEATSHEETS[0].id);
  const [copied, setCopied] = useState(false);

  const active = CHEATSHEETS.find(c => c.id === selectedSheet) || CHEATSHEETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(active.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
          <Terminal className="h-4 w-4" />
          <span>Engineering Reference Blueprints</span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Developer Cheatsheets &amp; Boilerplates
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Instant copyable snippets and architectural reference sheets for daily software engineering workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Selector */}
        <div className="space-y-1.5">
          {CHEATSHEETS.map((sheet) => (
            <button
              key={sheet.id}
              onClick={() => setSelectedSheet(sheet.id)}
              className={`w-full text-left rounded-lg p-3 text-xs transition-colors flex flex-col ${
                selectedSheet === sheet.id
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider opacity-80 mb-0.5">
                {sheet.category}
              </span>
              <span className="text-sm">{sheet.title}</span>
            </button>
          ))}
        </div>

        {/* Content Preview Box */}
        <div className="md:col-span-3 rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-900/80">
            <div>
              <span className="text-xs font-mono text-indigo-400">{active.category}</span>
              <h3 className="text-sm font-bold text-white">{active.title}</h3>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto flex-1">
            <pre><code>{active.content}</code></pre>
          </div>
        </div>
      </div>
    </div>
  );
};
