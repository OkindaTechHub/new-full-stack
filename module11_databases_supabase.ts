import { Module } from '../../types/course';

export const module11DatabasesSupabase: Module = {
  id: 'module-11',
  moduleNumber: 11,
  title: 'Databases, Supabase & Full-Stack Integration',
  slug: 'databases-supabase-fullstack',
  durationWeeks: 'Week 11',
  level: 'Intermediate → Advanced',
  phase: 'Phase 3: Full-Stack & APIs',
  overview: {
    whatItTeaches: 'Database concepts as an essential web development technology: relational database management systems (RDBMS), SQL query fundamentals, table modeling, primary keys, foreign keys, table relationships (one-to-one, one-to-many, many-to-many), PostgreSQL data types, JOIN queries, Supabase cloud architecture, auto-generated REST/PostgREST APIs, Row Level Security (RLS) concepts, and connecting React frontend applications to backend database services in a complete three-tier architecture.',
    whyItMatters: 'In-memory variables vanish whenever a server process restarts. Real-world applications require durable, consistent, and performant data persistence. Understanding relational data modeling and full-stack integration separates superficial frontend builders from true full-stack engineers.',
    prerequisites: ['Module 08: React Fundamentals', 'Module 10: Backend Development with Node.js & Express'],
    estimatedHours: 18,
    skillsAcquired: [
      'Architecting relational database schemas with tables, rows, columns, and constraints',
      'Establishing data integrity using Primary Keys (`UUID`, `SERIAL`) and Foreign Keys (`REFERENCES`)',
      'Authoring declarative SQL queries: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`, `LIMIT`',
      'Querying related tables using `INNER JOIN`, `LEFT JOIN`, and aggregation functions (`COUNT`, `SUM`, `AVG`)',
      'Connecting to and configuring cloud PostgreSQL instances using Supabase',
      'Querying Supabase data programmatically using the `@supabase/supabase-js` SDK',
      'Designing three-tier full-stack architectures: Frontend (React) → API / Backend (Express) → Database (PostgreSQL/Supabase)',
      'Understanding Row Level Security (RLS) policies for multi-tenant data isolation'
    ]
  },
  lessons: [
    {
      id: 'm11-l01',
      number: 1,
      title: 'Relational Database Architecture, SQL & PostgreSQL Fundamentals',
      durationMinutes: 55,
      learningObjectives: [
        'Distinguish between Relational (SQL) and Non-Relational (NoSQL) database paradigms.',
        'Define tables, column data types, constraints (`NOT NULL`, `UNIQUE`), and Primary Keys.',
        'Model One-to-Many and Many-to-Many relationships using Foreign Keys and junction tables.',
        'Write SQL queries for filtering, sorting, and combining relational data via `INNER JOIN`.',
        'Explain ACID transactions and data consistency guarantees.'
      ],
      introduction: 'Relational databases, conceived by Edgar F. Codd in 1970, have stood as the bedrock of software engineering for over fifty years. Systems like PostgreSQL store data in structured tables with mathematical guarantees of consistency, eliminating data duplication and corruption.',
      detailedNotes: `Relational Database Concepts:
- Database: A collection of organized tables and schema rules.
- Table: A two-dimensional grid representing an entity (e.g. 'courses', 'students', 'orders').
- Column (Field): An attribute of the entity with an explicit data type ('VARCHAR(255)', 'INTEGER', 'NUMERIC(10,2)', 'BOOLEAN', 'TIMESTAMPTZ', 'UUID').
- Row (Record): A single discrete entry in the table.
- Primary Key (PK): A unique identifier for every row in a table (e.g. 'id UUID PRIMARY KEY DEFAULT gen_random_uuid()').

Foreign Keys & Table Relationships:
- Foreign Key (FK): A column in one table that points to the Primary Key of another table, enforcing referential integrity.
1. One-to-Many (1:N): A single category has many products; the 'products' table holds a 'category_id' foreign key.
2. Many-to-Many (N:M): A student can enroll in many courses, and a course has many students. Modeled using a Junction Table (e.g. 'enrollments' containing 'student_id' and 'course_id').

Core SQL Commands:
- 'SELECT column1, column2 FROM table WHERE condition ORDER BY column1 ASC LIMIT 10;'
- 'INSERT INTO table (col1, col2) VALUES ('val1', 42);'
- 'UPDATE table SET col1 = 'newVal' WHERE id = 1;'
- 'DELETE FROM table WHERE id = 1;'
- 'JOIN': Combines records from two or more tables based on a related column.`,
      concepts: [
        {
          name: 'Relational Schema: One-to-Many Entity Relationship',
          description: 'How Foreign Keys link discrete tables while preserving normalization.',
          diagram: `+-------------------------+            +----------------------------------+
|       categories        |            |             products             |
+-------------------------+            +----------------------------------+
| id (PK, UUID)           | ◄───┐      | id (PK, UUID)                    |
| name (VARCHAR)          |     │      | name (VARCHAR)                   |
| slug (VARCHAR, UNIQUE)  |     └──────┼─ category_id (FK, REFERENCES)    |
| created_at (TIMESTAMP)  |  (1 to Many) price (NUMERIC(10,2))            |
+-------------------------+            | stock (INTEGER)                  |
                                       +----------------------------------+`
        }
      ],
      codeExamples: [
        {
          language: 'sql',
          title: 'PostgreSQL Schema Definition with Constraints and Joins',
          code: `-- 1. Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Products Table with Foreign Key Reference
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Query Products with Category Details using INNER JOIN
SELECT 
  p.id AS product_id,
  p.title AS product_name,
  p.price,
  c.name AS category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE p.is_active = TRUE AND p.price < 100.00
ORDER BY p.price ASC
LIMIT 20;`,
          explanation: 'Demonstrates professional SQL: UUID primary keys, foreign key constraints with ON DELETE CASCADE, check constraints preventing negative prices, and an INNER JOIN query.'
        }
      ],
      realWorldExample: {
        scenario: 'Preventing orphaned records during data deletion',
        industryApplication: 'If an e-commerce admin deletes a product category, but products still point to that category ID, the product catalog crashes with null reference errors. Foreign Key constraints with `ON DELETE CASCADE` or `ON DELETE RESTRICT` force the database itself to enforce relationship integrity, preventing orphaned records.',
        takeaway: 'Foreign key constraints prevent database corruption at the storage engine level.'
      },
      practicalExercise: {
        title: 'Design a Relational Blog Database Schema in SQL',
        objective: 'Write SQL DDL statements for authors, articles, and article tags with a junction table.',
        requirements: ['PostgreSQL environment or online SQL fiddle'],
        steps: [
          'Create `authors` table with `id`, `name`, and `email` (UNIQUE).',
          'Create `articles` table with `id`, `author_id` (FK referencing authors), `title`, and `content`.',
          'Create `tags` table with `id` and `name`.',
          'Create `article_tags` junction table with composite primary key `(article_id, tag_id)`.',
          'Write a SELECT query joining articles with authors and tags.'
        ],
        expectedResult: 'A fully normalized relational schema modeling 1:N and N:M relationships with integrity checks.'
      },
      commonMistakes: [
        {
          mistake: 'Storing multiple IDs as a comma-separated string in a single column (e.g. `tag_ids = "1,4,7"`).',
          whyItHappens: 'Trying to avoid creating a junction table for Many-to-Many relationships.',
          howToFix: 'Never store lists of IDs in a single text column. It violates First Normal Form (1NF), makes JOIN queries impossible, and destroys index performance. Always use a proper junction table.'
        },
        {
          mistake: 'Using `FLOAT` instead of `NUMERIC` or `DECIMAL` for financial monetary values.',
          whyItHappens: 'Assuming floating-point numbers are suitable for currency.',
          howToFix: 'Binary floating-point types suffer from rounding inaccuracies (`0.1 + 0.2 !== 0.3`). Always use `NUMERIC(10, 2)` or store values in integer cents for financial transactions.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm11-l1-q1',
          type: 'multiple-choice',
          question: 'What is the purpose of a Foreign Key in a relational database?',
          options: [
            'It translates SQL commands into foreign languages',
            'It is a column that points to the Primary Key of another table, guaranteeing referential integrity between related records',
            'It speeds up JavaScript downloads',
            'It encrypts browser cookies'
          ],
          correctAnswerIndex: 1,
          explanation: 'Foreign keys establish and enforce links between tables to maintain referential integrity.'
        }
      ],
      summary: [
        'Relational databases enforce schemas, constraints, and data integrity using SQL.',
        'Use Primary Keys (UUID/Serial) for unique identity and Foreign Keys for linking tables.',
        'Never store financial currency in floating-point columns; use NUMERIC or integer cents.'
      ],
      additionalResources: [
        {
          name: 'PostgreSQL Official Documentation',
          description: 'The definitive reference manual for the world’s most advanced open-source database.',
          url: 'https://www.postgresql.org/docs/current/',
          usefulFor: 'Data types, SQL syntax, indexes, and full-text search.'
        }
      ]
    },
    {
      id: 'm11-l02',
      number: 2,
      title: 'Supabase Architecture & Full-Stack Integration',
      durationMinutes: 65,
      learningObjectives: [
        'Explain Supabase architecture: PostgreSQL, PostgREST, Auth engine, and Storage.',
        'Connect a React frontend application to Supabase using `@supabase/supabase-js`.',
        'Perform type-safe CRUD operations directly against Supabase database tables.',
        'Understand Row Level Security (RLS) policies for protecting data tables.',
        'Architect the complete three-tier flow: Frontend UI → API/Backend → Persistent Database.'
      ],
      introduction: 'Supabase is an open-source Firebase alternative built entirely on top of PostgreSQL. Unlike proprietary document stores, Supabase provides standard relational tables, auto-generated REST APIs via PostgREST, and robust security policies, making it a favorite tool for modern full-stack developers.',
      detailedNotes: `Supabase Architecture:
Every Supabase project is a dedicated PostgreSQL database container wrapped with developer tooling:
1. PostgreSQL Database: Full-featured relational engine with extensions (pgvector, PostGIS, uuid-ossp).
2. PostgREST: A standalone web server that inspects your PostgreSQL schema and automatically generates a secure, high-performance RESTful API.
3. Supabase Client SDK ('@supabase/supabase-js'): A TypeScript library providing an intuitive query builder interface.
4. Row Level Security (RLS): Native PostgreSQL security rules that inspect every SQL query and enforce permissions per row (e.g. 'auth.uid() = user_id').

Connecting React to Supabase:
1. Initialize the client using Project URL and anon public API key:
'const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);'
2. Query data with chainable filters:
'const { data, error } = await supabase.from("products").select("*").eq("is_active", true).order("price", { ascending: true });'
3. Insert data:
'const { data, error } = await supabase.from("products").insert([{ title: "New Course", price: 49.99 }]);'

The Three-Tier Full-Stack Architecture:
Tier 1: Presentation (React + TypeScript + Tailwind)
   │  (Dispatches HTTP requests / SDK calls)
   ▼
Tier 2: Application / API Layer (Node.js Express or PostgREST)
   │  (Enforces business logic, authentication, validation)
   ▼
Tier 3: Persistence Layer (PostgreSQL / Supabase)
   │  (Guarantees ACID transactions, constraints, durability)`,
      concepts: [
        {
          name: 'The Three-Tier Full-Stack Architecture',
          description: 'The standard architectural pattern separating presentation, logic, and persistence.',
          diagram: `[Client Browser (React SPA)]
       │
       ▼ (1) HTTPS REST / SDK Request
[Backend API Layer (Express / Supabase PostgREST)]
       │ (2) Validates token, sanitizes payload, checks permissions
       ▼
[Relational Database (PostgreSQL)]
       │ (3) Executes ACID query, returns rows
       ▼
[Backend API Layer]
       │ (4) Formats JSON payload
       ▼
[Client Browser] ──► (5) Updates React State & Displays UI`
        }
      ],
      codeExamples: [
        {
          language: 'tsx',
          title: 'Connecting React to Supabase with Type Safety and Loading States',
          code: `import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Environment variables (Vite client-side prefix)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

interface ProductItem {
  id: string;
  title: string;
  price: number;
  stock_quantity: number;
  created_at: string;
}

export function ProductCatalogView() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInventory() {
      setLoading(true);
      setErrorMsg(null);

      // Query database table via Supabase SDK
      const { data, error } = await supabase
        .from('products')
        .select('id, title, price, stock_quantity, created_at')
        .order('price', { ascending: true });

      if (error) {
        console.error('Supabase query error:', error);
        setErrorMsg(error.message);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    }

    fetchInventory();
  }, []);

  if (loading) return <p className="text-slate-400 p-6">Loading inventory from PostgreSQL...</p>;
  if (errorMsg) return <p className="text-red-400 p-6">Database error: {errorMsg}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-4">Course Inventory (Live Database)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map(p => (
          <div key={p.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
            <h3 className="font-semibold text-white">{p.title}</h3>
            <p className="text-indigo-400 font-mono mt-1">\${p.price.toFixed(2)}</p>
            <p className="text-xs text-slate-500 mt-2">In Stock: {p.stock_quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`,
          explanation: 'Demonstrates a complete frontend-to-database connection using Supabase client: initializing client with environment variables, performing select queries with order clauses, and rendering typed results with loading and error boundaries.'
        }
      ],
      realWorldExample: {
        scenario: 'Row Level Security (RLS) protecting multi-tenant data',
        industryApplication: 'In a multi-tenant SaaS application, every table contains an `organization_id` or `user_id`. Without RLS, a bug in an API endpoint could accidentally expose another customer’s private data. With PostgreSQL RLS enabled (`CREATE POLICY "user_view_own" ON notes FOR SELECT USING (auth.uid() = user_id);`), the database engine rejects unauthorized queries even if the application code makes a mistake.',
        takeaway: 'RLS enforces security at the lowest possible layer—the database itself.'
      },
      practicalExercise: {
        title: 'Query and Filter Supabase Records with the JS SDK',
        objective: 'Practice writing Supabase SDK queries using `.eq()`, `.gte()`, `.ilike()`, and `.order()`.',
        requirements: ['Supabase project or sandbox client'],
        steps: [
          'Create a query selecting products where `stock_quantity > 0` using `.gt("stock_quantity", 0)`.',
          'Add a text search filter on title using `.ilike("title", "%javascript%")`.',
          'Sort results by price descending with `.order("price", { ascending: false })`.',
          'Limit the response to 5 records with `.limit(5)`.',
          'Log the returned `{ data, error }`.'
        ],
        expectedResult: 'A filtered subset of database records returned as a type-safe JavaScript array.'
      },
      commonMistakes: [
        {
          mistake: 'Putting the Supabase `service_role` secret key in frontend client code.',
          whyItHappens: 'Copying the wrong key from the Supabase dashboard.',
          howToFix: 'The `service_role` key bypasses all Row Level Security and must strictly remain on backend servers. Frontend React code must ONLY ever use the public `anon` key.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm11-l2-q1',
          type: 'multiple-choice',
          question: 'What is the role of Row Level Security (RLS) in PostgreSQL and Supabase?',
          options: [
            'It formats rows with alternating background colors',
            'It enforces security rules directly inside the PostgreSQL database engine to restrict which rows a user can read or write based on their identity',
            'It backs up the database to tape drives',
            'It converts SQL queries into GraphQL'
          ],
          correctAnswerIndex: 1,
          explanation: 'Row Level Security (RLS) allows configuring database policies that evaluate row-level access permissions directly in PostgreSQL.'
        }
      ],
      summary: [
        'Supabase wraps PostgreSQL with PostgREST, providing auto-generated REST APIs and SDKs.',
        'Use the anon key on the frontend; never leak the service_role key into client bundles.',
        'Three-tier architecture partitions concerns across presentation, business logic, and database persistence.'
      ],
      additionalResources: [
        {
          name: 'Supabase Official Documentation',
          description: 'Complete guides for database configuration, PostgREST, and SDK usage.',
          url: 'https://supabase.com/docs',
          usefulFor: 'JavaScript SDK reference, RLS policies, and database migration guides.'
        }
      ]
    },
    {
      id: 'm11-l03',
      number: 3,
      title: 'Advanced SQL: Window Functions, CTEs, JSONB & Index Optimization',
      durationMinutes: 65,
      learningObjectives: [
        'Calculate partitioned ranks and running aggregates without collapsing rows using SQL Window Functions (`OVER (PARTITION BY ...)`).',
        'Break complex multi-step queries into readable, reusable Common Table Expressions (`WITH ... AS`).',
        'Store and query semi-structured document payloads natively in PostgreSQL using the `JSONB` data type.',
        'Execute atomic multi-table operations using ACID Transactions (`BEGIN`, `COMMIT`, `ROLLBACK`).',
        'Design efficient B-Tree and GIN indexes to accelerate query execution from full table scans to sub-millisecond index lookups.'
      ],
      introduction: 'Basic SQL CRUD queries retrieve raw records, but real-world engineering requires calculating financial summaries, analytical rankings, auditing user activity, and querying millions of rows without causing database CPU bottlenecks. Advanced PostgreSQL features turn your database into a high-performance analytical engine.',
      detailedNotes: `Common Table Expressions (CTEs):
A CTE is a temporary named result set defined within the execution scope of a single SELECT, INSERT, UPDATE, or DELETE statement.
Syntax:
'WITH HighValueOrders AS ('
'  SELECT customer_id, SUM(total) as total_spent FROM orders GROUP BY customer_id HAVING SUM(total) > 1000'
')'
'SELECT c.name, hvo.total_spent FROM customers c JOIN HighValueOrders hvo ON c.id = hvo.customer_id;'
Benefits: CTEs make deeply nested queries readable and maintainable.

Window Functions:
Unlike 'GROUP BY' (which collapses multiple rows into a single summary row), Window Functions perform calculations across a set of table rows related to the current row while preserving individual row identity!
- 'ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC)': Generates sequential rank 1, 2, 3 per category.
- 'AVG(price) OVER (PARTITION BY category_id)': Appends the category average to every product row.

PostgreSQL JSONB (Binary JSON):
Allows storing schemaless JSON data with indexed search speed:
- 'data->>\'field\'': Extracts JSON value as text.
- 'data->\'field\'': Extracts JSON value as JSON object.
- GIN Index: 'CREATE INDEX idx_logs_json ON logs USING GIN (metadata);' enables instant lookups inside nested JSON payloads.

Database Index Optimization:
Without an index, PostgreSQL must perform a Sequential Scan (inspecting every single disk block).
- B-Tree Index (default): Ideal for equality ('='), range queries ('<', '>', 'BETWEEN'), and sorting ('ORDER BY').
- Composite Index: 'CREATE INDEX idx_orders_user_created ON orders (user_id, created_at DESC);' optimizes queries filtering by user AND sorting by date simultaneously.`,
      concepts: [
        {
          name: 'GROUP BY Aggregation vs Window Function Partitioning',
          description: 'How window functions retain individual row identities while computing aggregates.',
          table: {
            headers: ['Operation', 'Rows Returned', 'Aggregates Possible?', 'Preserves Line Items?'],
            rows: [
              ['GROUP BY category', '1 row per distinct category', 'Yes (SUM, AVG, COUNT)', 'No (collapses original line items)'],
              ['OVER (PARTITION BY category)', 'Preserves 100% of original rows', 'Yes (computes running total/average)', 'Yes (each row shows its own price + category avg)']
            ]
          }
        }
      ],
      codeExamples: [
        {
          language: 'sql',
          title: 'Advanced PostgreSQL: Window Functions, CTE & JSONB Operations',
          code: `-- 1. Common Table Expression (CTE) & Window Functions
WITH RankedCourseSales AS (
  SELECT 
    m.id AS module_id,
    m.title AS module_title,
    m.category,
    s.sale_amount,
    -- Calculate rank of this sale within its category
    ROW_NUMBER() OVER (PARTITION BY m.category ORDER BY s.sale_amount DESC) as sale_rank,
    -- Calculate average module sale in this category
    AVG(s.sale_amount) OVER (PARTITION BY m.category) as category_avg_sale
  FROM module_sales s
  JOIN modules m ON s.module_id = m.id
)
SELECT 
  module_title,
  category,
  sale_amount,
  sale_rank,
  ROUND(category_avg_sale, 2) as category_avg
FROM RankedCourseSales
WHERE sale_rank <= 5; -- Top 5 highest sales per category

-- 2. Querying PostgreSQL JSONB Column with Indexes
-- Table schema: audit_logs (id UUID, event_type VARCHAR, payload JSONB)
CREATE INDEX idx_audit_payload_gin ON audit_logs USING GIN (payload);

SELECT 
  id,
  event_type,
  payload->>'ip_address' as client_ip,
  (payload->'metadata'->>'duration_ms')::INT as request_duration
FROM audit_logs
WHERE payload @> '{"status": "failure"}'
ORDER BY (payload->'metadata'->>'duration_ms')::INT DESC
LIMIT 10;`,
          explanation: 'Demonstrates professional enterprise SQL: CTE with ROW_NUMBER() and running AVG() window functions, alongside GIN-indexed JSONB deep payload querying.'
        }
      ],
      realWorldExample: {
        scenario: 'Generating multi-tenant SaaS billing summaries and leaderboard metrics',
        industryApplication: 'Platforms like Stripe and GitHub use Window Functions to compute monthly running totals and customer spending tiers directly in the database in under 15ms. Calculating the same logic by pulling 500,000 raw rows into Node.js would consume gigabytes of RAM and take 45 seconds.',
        takeaway: 'Compute mathematical aggregations in the database engine where the data lives.'
      },
      practicalExercise: {
        title: 'Author an Analytical Ranking Query with SQL Window Functions',
        objective: 'Write a SQL query that ranks products by price within each category and computes percentage difference from category average.',
        requirements: ['PostgreSQL environment or database client'],
        steps: [
          'Create a query against `products` selecting `id`, `title`, `category_id`, and `price`.',
          'Add `DENSE_RANK() OVER (PARTITION BY category_id ORDER BY price DESC)` as `price_rank`.',
          'Add `AVG(price) OVER (PARTITION BY category_id)` as `avg_category_price`.',
          'Calculate `ROUND(((price - AVG(price) OVER (PARTITION BY category_id)) / AVG(price) OVER (PARTITION BY category_id)) * 100, 1)` as `pct_above_average`.',
          'Filter to show only products priced above their category average.'
        ],
        expectedResult: 'A comprehensive analytical report produced in a single SQL execution.'
      },
      commonMistakes: [
        {
          mistake: 'Creating separate single-column indexes on `(user_id)` and `(created_at)` when queries always do `WHERE user_id = ? ORDER BY created_at DESC`.',
          whyItHappens: 'Assuming multiple single indexes behave like a multi-column composite index.',
          howToFix: 'Create a Composite Index `CREATE INDEX idx_orders_user_created ON orders (user_id, created_at DESC);` so the database can filter and sort in a single index traversal.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm11-l3-q1',
          type: 'multiple-choice',
          question: 'What is the primary operational difference between a standard `GROUP BY` clause and an `OVER (PARTITION BY ...)` Window Function?',
          options: [
            'GROUP BY deletes data from the disk',
            'GROUP BY collapses matching rows into a single summary row; a Window Function computes calculations across a group while keeping every individual row intact in the result set',
            'Window Functions can only be used with text',
            'There is no difference'
          ],
          correctAnswerIndex: 1,
          explanation: 'Window functions preserve all discrete rows while computing partitions and aggregates, unlike GROUP BY which aggregates rows into a single summary row.'
        }
      ],
      summary: [
        'Use CTEs (WITH ... AS) to structure complex queries into readable, maintainable steps.',
        'Window Functions (ROW_NUMBER, RANK, OVER) calculate partitioned metrics without collapsing individual rows.',
        'PostgreSQL JSONB provides document-store flexibility with relational index performance.'
      ],
      additionalResources: [
        {
          name: 'PostgreSQL Documentation — Window Functions',
          description: 'Official technical manual for window functions and syntax.',
          url: 'https://www.postgresql.org/docs/current/tutorial-window.html',
          usefulFor: 'Mastering OVER, PARTITION BY, and framing clauses.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm11-lab-1',
      title: 'Lab 11.1: Database Migration & Schema Design Walkthrough',
      durationMinutes: 60,
      objective: 'Write and apply a PostgreSQL migration script defining relational tables with primary keys, foreign keys, timestamps, and indexes.',
      prerequisites: ['Module 10 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Draft the SQL Migration Script',
          instructions: 'Create tables with constraints and indexes:',
          code: `CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_courses_slug ON courses(slug);`
        }
      ],
      verificationChecklist: [
        'Table constraints prevent inserting duplicate slugs (UNIQUE violation check)',
        'Foreign key cascades or restricts deletion as specified',
        'Indexes are created on frequently queried columns'
      ],
      deliverables: ['SQL migration script with test insertion verification']
    }
  ],
  moduleProject: {
    id: 'm11-project',
    title: 'Full-Stack Application: Frontend → API Backend → Database Integration',
    difficulty: 'Advanced',
    estimatedHours: 16,
    overview: 'Build a complete three-tier full-stack application demonstrating the end-to-end flow: Frontend (React + TypeScript + Tailwind) communicates with an API / Backend Service (Express or Supabase PostgREST), which queries and persists data to a Relational Database (PostgreSQL / Supabase). The application models an educational domain (such as a Course Management or Project Portfolio directory), supporting full CRUD operations, relationship modeling (categories to items), query filtering, and optimistic UI updates.',
    requirements: [
      'Three-Tier Architecture clearly demonstrated: Frontend (React) → API / Backend Layer → Database (PostgreSQL/Supabase)',
      'Relational Database Schema: at least two related tables (e.g. `categories` and `items`) with Primary Keys and Foreign Key relationships',
      'Data Integrity: Schema enforces NOT NULL, UNIQUE, and CHECK constraints (e.g. non-negative prices or required titles)',
      'Frontend CRUD UI: Add new item form with validation, item list with category filtering and sorting, item detail view, edit item modal, and delete confirmation dialog',
      'Asynchronous State Lifecycle: Explicit handling of loading states, network error banners, and empty list placeholders',
      'Clean Code Separation: Shared TypeScript interfaces representing database schemas and API responses'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Relational Database Schema & Migrations',
        tasks: ['Write SQL DDL statements for tables and foreign keys', 'Apply schema in PostgreSQL / Supabase']
      },
      {
        milestone: 2,
        title: 'Backend / Data Access Layer',
        tasks: ['Configure database client SDK or Express route controllers', 'Implement CRUD database queries']
      },
      {
        milestone: 3,
        title: 'React Frontend Data Integration',
        tasks: ['Build list and detail views', 'Connect frontend fetching hooks to backend database endpoints']
      },
      {
        milestone: 4,
        title: 'Full-Stack Testing & Verification',
        tasks: ['Test complete create-read-update-delete cycle across all three tiers', 'Audit error boundaries']
      }
    ],
    starterCodeStructure: [
      {
        path: 'fullstack-app/db/schema.sql',
        description: 'PostgreSQL Relational Schema',
        sampleContent: `CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`
      }
    ],
    acceptanceCriteria: [
      'Creating an item on the React frontend saves the row permanently to PostgreSQL',
      'Refreshing the browser retrieves persisted records from the database',
      'Database foreign key relationships prevent orphaned child records',
      'All three tiers communicate over standardized HTTP/REST JSON contracts'
    ],
    rubric: [
      { criteria: 'Full-Stack Three-Tier Flow', points: 35, description: 'Seamless orchestration between Frontend, API layer, and Relational Database' },
      { criteria: 'Relational Database Schema', points: 30, description: 'Sound relational design with primary keys, foreign keys, and integrity constraints' },
      { criteria: 'Frontend UI & Asynchronous UX', points: 20, description: 'Responsive React interface with loading skeletons and error states' },
      { criteria: 'Code Cleanliness & Type Sharing', points: 15, description: 'Consistent TypeScript types shared across frontend and backend boundaries' }
    ]
  },
  quiz: [
    {
      id: 'm11-qz-01',
      question: 'In SQL, what is the difference between an `INNER JOIN` and a `LEFT JOIN`?',
      options: [
        'INNER JOIN runs faster on Mondays',
        'INNER JOIN only returns rows where there is a match in BOTH tables; LEFT JOIN returns all rows from the left table, plus matched rows from the right table (filling with NULL if no match exists)',
        'LEFT JOIN deletes rows from the right table',
        'There is no difference in PostgreSQL'
      ],
      correctAnswerIndex: 1,
      explanation: 'LEFT JOIN preserves all rows from the left table regardless of whether matching records exist in the right table.'
    },
    {
      id: 'm11-qz-02',
      question: 'Why should a frontend web client NEVER contain the Supabase `service_role` key?',
      options: [
        'It increases CSS bundle size',
        'The `service_role` key possesses superuser admin privileges that bypass all Row Level Security (RLS) policies, allowing any malicious user to read or drop entire database tables',
        'Browsers do not support secret keys',
        'Supabase charges extra for client keys'
      ],
      correctAnswerIndex: 1,
      explanation: 'The service_role key has unrestricted admin access to bypass RLS and must strictly remain on secure backend servers.'
    },
    {
      id: 'm11-qz-03',
      question: 'What does the `ON DELETE CASCADE` clause on a Foreign Key definition accomplish?',
      options: [
        'It prevents the parent record from ever being deleted',
        'When a parent row is deleted, the database automatically deletes all related child rows that reference that parent',
        'It encrypts deleted records',
        'It sends an email notification to the administrator'
      ],
      correctAnswerIndex: 1,
      explanation: 'ON DELETE CASCADE automatically removes associated child records, preventing foreign key constraint violations and orphaned data.'
    }
  ],
  assignment: {
    id: 'm11-assign',
    title: 'Module 11 Assignment: Relational Database Schema & API Integration Audit',
    problemStatement: 'Design a relational database schema for an online bookstore comprising Books, Authors, and Categories. Write the SQL DDL creation script, seed 10 sample records, author 3 complex analytical queries (e.g. Total Revenue by Category, Most Prolific Author), and write a Node.js or React integration script that executes the query and renders the resulting analytical report.',
    specifications: [
      'Valid PostgreSQL SQL script containing CREATE TABLE with constraints and foreign keys',
      'At least one query utilizing an aggregation function (`COUNT` or `SUM`) and `GROUP BY` with `INNER JOIN`',
      'Integration script logging or rendering the analytical output'
    ],
    deliverables: ['`schema.sql`, `seed.sql`, and `analytics-report.ts` script.'],
    evaluationRubric: [
      { category: 'Relational Design & Constraints', weight: '45%', description: 'Exemplary foreign keys, unique constraints, and check conditions' },
      { category: 'SQL Query Complexity & Joins', weight: '35%', description: 'Proper use of JOINs, GROUP BY, and aggregations' },
      { category: 'Integration Execution', weight: '20%', description: 'Clean execution with TypeScript database client' }
    ],
    submissionFormat: 'Code files submitted in repository'
  },
  resources: [
    {
      name: 'Supabase Database Documentation',
      description: 'Official guides to tables, views, functions, and triggers.',
      url: 'https://supabase.com/docs/guides/database',
      usefulFor: 'Mastering PostgreSQL on Supabase.'
    },
    {
      name: 'SQLBolt — Learn SQL with Interactive Exercises',
      description: 'Interactive browser-based tutorials for mastering SQL queries.',
      url: 'https://sqlbolt.com/',
      usefulFor: 'Practicing SELECT, JOIN, and aggregation queries.'
    }
  ],
  summary: 'Module 11 delivered mastery over relational databases, SQL queries, table normalization, primary/foreign keys, joins, Supabase cloud architecture, Row Level Security, and the complete three-tier full-stack architecture.'
};
