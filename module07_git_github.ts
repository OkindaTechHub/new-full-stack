import { Module } from '../../types/course';

export const module07GitGithub: Module = {
  id: 'module-07',
  moduleNumber: 7,
  title: 'Git & GitHub: Professional Version Control',
  slug: 'git-github',
  durationWeeks: 'Week 7',
  level: 'Intermediate',
  phase: 'Phase 2: Modern Frontend',
  overview: {
    whatItTeaches: 'Distributed version control systems with Git, repository architecture, the three trees (Working Directory, Staging Area, Git Repository), commit hygiene, branch management and feature-branch workflows, resolving merge conflicts, remote repository synchronization on GitHub, Pull Requests, code reviews, and writing professional README documentation.',
    whyItMatters: 'Software engineering is fundamentally a collaborative team sport. Without version control, teams overwrite each other’s code, lose historical milestones, and cannot audit production bugs. Every full-stack developer must be fluent in the Git command line and GitHub pull request lifecycle.',
    prerequisites: ['Module 01: Web Development Fundamentals'],
    estimatedHours: 12,
    skillsAcquired: [
      'Initializing repositories and configuring global developer credentials (`git config`)',
      'Staging and committing snapshot changes with conventional commit messages (`git add`, `git commit`)',
      'Inspecting commit logs, diffs, and repository status (`git status`, `git log --oneline --graph`, `git diff`)',
      'Branching, switching, and merging feature branches (`git branch`, `git switch`, `git merge`)',
      'Diagnosing and resolving merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`)',
      'Synchronizing local and remote repositories on GitHub (`git remote`, `git push`, `git pull`, `git clone`)',
      'Opening Pull Requests with descriptive summaries, issue linking, and code review etiquette',
      'Authoring professional open-source README files with shields, architecture overviews, and setup guides'
    ]
  },
  lessons: [
    {
      id: 'm07-l01',
      number: 1,
      title: 'Git Architecture: The Three Trees & Commit Mechanics',
      durationMinutes: 45,
      learningObjectives: [
        'Explain the internal architecture of Git (Working Directory, Staging Index, Commit History).',
        'Configure Git identity (user.name, user.email, default branch main).',
        'Track, stage, and commit file snapshots using `git add` and `git commit`.',
        'Inspect differences and historical logs using `git diff` and `git log`.'
      ],
      introduction: 'Git was created by Linus Torvalds in 2005 to manage the Linux kernel. Unlike older systems that store file diffs, Git models project history as a directed acyclic graph of immutable filesystem snapshots.',
      detailedNotes: `The Three Trees of Git:
1. Working Directory: The actual files currently sitting on your hard disk that you edit in VS Code.
2. Staging Area (Index): The intermediate staging deck where you curate exactly which changes will be recorded in the next snapshot.
3. Git Repository (.git folder): The permanent cryptographic database of commits stored as SHA-1/SHA-256 hashes.

The Commit Lifecycle:
- 'git init': Initializes a new local '.git' hidden directory.
- 'git status': Reports modified, staged, and untracked files.
- 'git add <file>': Moves changes from the Working Directory into the Staging Index.
- 'git commit -m "feat: implement shopping cart total calculation"': Packages staged files into an immutable commit object containing author info, timestamp, commit message, and pointer to parent commit.

The .gitignore File:
Crucial security and cleanliness practice. Tells Git never to track:
- 'node_modules/' (can be reinstalled via npm install; gigabytes in size).
- '.env' (holds secret API keys and database passwords; NEVER commit to Git!).
- 'dist/' or 'build/' (generated artifacts).
- '.DS_Store' (macOS system files).`,
      concepts: [
        {
          name: 'The Three States of Git',
          description: 'How files move from disk edits into version-controlled history.',
          diagram: `[Working Directory] ──( git add )──► [Staging Area / Index] ──( git commit )──► [Local Repository]
 (Modified Files)                       (Curated Snapshot)                      (Permanent History)
        │                                                                               │
        └──────────────────────────────( git checkout / git restore )───────────────────┘`
        }
      ],
      codeExamples: [
        {
          language: 'bash',
          title: 'Professional Git Initialization & Commit Flow',
          code: `# 1. Configure global Git author credentials
git config --global user.name "Alex Rivera"
git config --global user.email "alex.rivera@example.com"
git config --global init.defaultBranch main

# 2. Initialize a repository inside your project folder
git init

# 3. Create a rigorous .gitignore
cat << 'EOF' > .gitignore
node_modules/
.env
.env.local
dist/
*.log
.DS_Store
EOF

# 4. Check initial status
git status

# 5. Stage files selectively
git add index.html src/ styles.css .gitignore

# 6. Commit with Conventional Commits format
git commit -m "feat(core): initialize semantic application structure with responsive header"

# 7. View visual commit tree
git log --oneline --graph --decorate`,
          explanation: 'Demonstrates proper setup: establishing author metadata, generating an exhaustive .gitignore, staging files selectively, and using the industry-standard Conventional Commits format.'
        }
      ],
      realWorldExample: {
        scenario: 'Accidental leak of production database passwords',
        industryApplication: 'A developer accidentally committed `.env` containing AWS and Stripe secret keys to a public GitHub repo. Automated bots scraped the key within 45 seconds, spinning up unauthorized crypto-mining servers. Teams enforce `.gitignore` and use pre-commit hooks (`husky`) to block secrets from ever entering Git.',
        takeaway: 'Never commit .env files; always maintain a sanitized .env.example instead.'
      },
      practicalExercise: {
        title: 'Initialize a Local Repository and Inspect Diffs',
        objective: 'Practice staging, modifying, viewing line-by-line diffs, and committing.',
        requirements: ['Terminal with git installed'],
        steps: [
          'Create a directory `git-lab` and run `git init`.',
          'Create `app.js` with `console.log("v1.0");`. Stage and commit it.',
          'Edit `app.js` to change the log to `"v1.1 - production"`.',
          'Run `git diff` to inspect the green addition and red deletion lines before staging.',
          'Stage and commit the change with `git commit -m "chore: bump version string"`.',
          'Run `git log --stat` to inspect files changed in each commit.'
        ],
        expectedResult: 'Clear terminal visual confirmation of exact line additions and subtractions across commits.'
      },
      commonMistakes: [
        {
          mistake: 'Running `git add .` without checking `git status` first.',
          whyItHappens: 'In a rush, developers accidentally stage `node_modules/`, secret `.env` files, or large binary temporary files.',
          howToFix: 'Always configure `.gitignore` first, run `git status` to verify what will be staged, or use `git add -p` to stage changes interactively.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm07-l1-q1',
          type: 'multiple-choice',
          question: 'What is the Staging Area (Index) in Git?',
          options: [
            'A cloud server hosted by Microsoft',
            'An intermediate preview deck where changes are collected and organized before being permanently committed',
            'The folder where compiled CSS files are stored',
            'A backup drive on your local computer'
          ],
          correctAnswerIndex: 1,
          explanation: 'The staging area allows you to selectively choose which modified files are packaged into the next atomic commit snapshot.'
        }
      ],
      summary: [
        'Git manages three trees: Working Directory, Staging Area, and Local Repository.',
        '.gitignore prevents committing secrets, build artifacts, and massive dependencies.',
        'Use Conventional Commits (feat, fix, docs, chore, refactor) to maintain readable project logs.'
      ],
      additionalResources: [
        {
          name: 'Pro Git Book by Scott Chacon and Ben Straub',
          description: 'The official, comprehensive open-source book on Git internals and commands.',
          url: 'https://git-scm.com/book/en/v2',
          usefulFor: 'Mastering Git architecture, plumbing commands, and branching.'
        }
      ]
    },
    {
      id: 'm07-l02',
      number: 2,
      title: 'Branching, Conflict Resolution & The GitHub Workflow',
      durationMinutes: 55,
      learningObjectives: [
        'Create, switch, and delete branches using modern `git switch` and `git branch`.',
        'Execute fast-forward and recursive 3-way merges into the main branch.',
        'Diagnose and manually resolve merge conflicts using conflict markers.',
        'Connect local repositories to remote GitHub repositories via SSH/HTTPS.',
        'Open, review, and merge Pull Requests following industry code review best practices.'
      ],
      introduction: 'In professional software teams, developers never commit directly to the `main` production branch. Instead, every new feature, bugfix, or refactoring task is isolated on its own lightweight branch and merged via GitHub Pull Requests after automated tests and peer reviews pass.',
      detailedNotes: `Branching Mechanics:
In Git, a branch is merely a lightweight, movable pointer to a specific commit. Creating a branch takes 1 millisecond and consumes 41 bytes of disk space.
- 'git branch <branch-name>': Creates a branch.
- 'git switch -c <branch-name>' (or 'git checkout -b'): Creates and switches to the new branch immediately.
- 'git switch main': Switches back to the main branch.

Merging and Merge Conflicts:
- Fast-Forward Merge: Occurs when the target branch has not received any new commits since the feature branch diverged. Git simply slides the pointer forward.
- 3-Way Merge: Occurs when both branches have diverged with independent commits.
- Merge Conflicts: If two developers edit the exact same lines of code in the same file, Git halts the merge and injects conflict markers:
  '<<<<<<< HEAD'
  (your current branch code)
  '======='
  (incoming branch code)
  '>>>>>>> feature-branch'
  The developer must manually resolve the conflict, remove the markers, stage the file, and complete the merge.

GitHub Remote Collaboration:
- 'git remote add origin https://github.com/username/repo.git': Links local repo to remote host.
- 'git push -u origin main': Uploads local commits to remote origin.
- 'git pull origin main': Fetches remote changes and merges them into the current local branch.`,
      concepts: [
        {
          name: 'Feature Branch Workflow',
          description: 'Isolating feature development from production releases.',
          diagram: `(main)      o─────────o───────────────────o───────────o (v1.1 Release)
                       \\                 / (Pull Request Merge)
(feature)               o───────o───────o`
        }
      ],
      codeExamples: [
        {
          language: 'bash',
          title: 'Complete Feature-Branch & Pull Request Lifecycle',
          code: `# 1. Ensure you have the latest production code
git switch main
git pull origin main

# 2. Branch out for a new feature
git switch -c feat/shopping-cart-summary

# 3. Write code, test, stage, and commit
git add src/cart.js src/cart.test.js
git commit -m "feat(cart): calculate sales tax and discount codes"

# 4. Push branch to GitHub remote
git push -u origin feat/shopping-cart-summary

# 5. (On GitHub) Open Pull Request -> Peer Review -> Automated CI Checks Pass

# 6. Merge PR on GitHub, then clean up local branches
git switch main
git pull origin main
git branch -d feat/shopping-cart-summary`,
          explanation: 'Demonstrates the standard industry lifecycle: branch from updated main, atomic commit, push branch, open PR, and delete merged local branch.'
        }
      ],
      realWorldExample: {
        scenario: 'Simultaneous edits to API route definitions',
        industryApplication: 'Developer A adds `/api/products` while Developer B adds `/api/checkout` to the same `routes.js` file on different branches. When Developer B merges, Git flags a conflict on lines 15-20. The developers review the diff together, preserve both route definitions, and complete the merge.',
        takeaway: 'Merge conflicts are not errors; they are Git asking for human confirmation before altering ambiguous code.'
      },
      practicalExercise: {
        title: 'Intentionally Trigger and Resolve a Merge Conflict',
        objective: 'Experience how Git flags conflicts and practice resolving conflict markers.',
        requirements: ['Local Git repository'],
        steps: [
          'On `main`, create `readme.txt` with line: `Course Name: Web Development`. Commit it.',
          'Create branch `branch-a`: edit line to `Course Name: Full-Stack Web Development`. Commit.',
          'Switch back to `main`. Create branch `branch-b`: edit same line to `Course Name: Modern Web Engineering`. Commit.',
          'Switch to `main`. Run `git merge branch-a` (fast-forwards cleanly).',
          'Run `git merge branch-b`. Observe Git merge conflict alert.',
          'Open `readme.txt`, inspect `<<<<<<<`, choose the best final wording, delete markers, run `git add readme.txt` and `git commit`.'
        ],
        expectedResult: 'A completed 3-way merge commit resolving the conflict cleanly.'
      },
      commonMistakes: [
        {
          mistake: 'Pushing changes with `--force` (`git push -f`) on shared branches like `main`.',
          whyItHappens: 'Attempting to overwrite a rejected push after local rebase or commit amending.',
          howToFix: 'Never force-push to shared branches. It rewrites history and destroys teammates’ work. Use `git pull --rebase` or resolve differences with forward commits.'
        }
      ],
      knowledgeCheck: [
        {
          id: 'm07-l2-q1',
          type: 'multiple-choice',
          question: 'What do the `<<<<<<< HEAD` and `>>>>>>>` markers represent in a file during a Git merge conflict?',
          options: [
            'Syntax errors generated by the Node.js compiler',
            'Demarcation markers inserted by Git showing your local branch changes (HEAD) versus the incoming branch changes',
            'HTML tags for formatting headers',
            'A network connection timeout warning'
          ],
          correctAnswerIndex: 1,
          explanation: 'Git inserts conflict delimiters to clearly delineate the conflicting code lines between the current branch (HEAD) and incoming branch.'
        }
      ],
      summary: [
        'Branches provide lightweight, isolated sandboxes for building features without affecting production.',
        'Merge conflicts occur when conflicting changes touch the same lines; resolve them manually by editing conflict markers.',
        'Use the GitHub Feature Branch Workflow with Pull Requests for peer code review and CI verification.'
      ],
      additionalResources: [
        {
          name: 'GitHub Docs: Collaborating with pull requests',
          description: 'Official GitHub documentation on code reviews and pull requests.',
          url: 'https://docs.github.com/en/pull-requests',
          usefulFor: 'Learning draft PRs, review assignments, and protected branches.'
        }
      ]
    }
  ],
  practicalLabs: [
    {
      id: 'm07-lab-1',
      title: 'Lab 7.1: Open-Source README & Project Showcase Creation',
      durationMinutes: 45,
      objective: 'Author an industry-standard open-source README.md file equipped with shields, architectural diagrams, prerequisites, installation steps, and MIT license.',
      prerequisites: ['Module 06 completed'],
      stepByStepGuide: [
        {
          stepNumber: 1,
          title: 'Structure Markdown Badges and Header',
          instructions: 'Include project title, badges (build status, license), and elevator pitch.',
          code: `# Distributed Web Services Engine

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)

> High-throughput, event-driven REST API for processing e-commerce telemetry.`
        }
      ],
      verificationChecklist: [
        'README includes Prerequisites, Quickstart (`npm install`, `npm run dev`), Architecture diagram, and License',
        'All links and badges render properly in GitHub Markdown preview',
        'Includes screenshots/gifs illustrating application functionality'
      ],
      deliverables: ['Pristine README.md file adhering to open-source repository standards']
    }
  ],
  moduleProject: {
    id: 'm07-project',
    title: 'Professional GitHub Project Showcase Repository',
    difficulty: 'Intermediate',
    estimatedHours: 6,
    overview: 'Organize, document, and publish your prior course projects into a professional, portfolio-grade GitHub repository. The repository serves as tangible proof of engineering competence to hiring managers and senior technical leads. It must feature clean directory architecture, an exhaustive .gitignore, an atomic commit history reflecting conventional commits, and an exemplary README.md complete with live demo links, architecture explanations, technology breakdowns, installation guides, and MIT licensing.',
    requirements: [
      'Initialize and publish a clean public GitHub repository',
      'Clean directory structure housing project codebases (e.g. `/projects/calculator`, `/projects/api-app`)',
      'Comprehensive root `.gitignore` file preventing node_modules, .env, and build artifacts from ever being tracked',
      'Commit history containing at least 8 atomic commits following Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`)',
      'At least one merged feature branch demonstrating branch creation and clean pull request merging',
      'Professional `README.md` containing: Project Banner/Title, One-line summary, Technologies Used table, Local Installation Steps, Environment Variables guide, Screenshots, and License'
    ],
    milestones: [
      {
        milestone: 1,
        title: 'Repository Structure & Gitignore',
        tasks: ['Initialize Git repo', 'Configure .gitignore', 'Structure project directories']
      },
      {
        milestone: 2,
        title: 'Commit History & Feature Branching',
        tasks: ['Commit base projects with conventional commit messages', 'Create feature branch, make enhancement, merge back']
      },
      {
        milestone: 3,
        title: 'Authoring the Professional README',
        tasks: ['Write installation steps', 'Add architecture diagram', 'Document environment variables and license']
      }
    ],
    starterCodeStructure: [
      {
        path: 'README.md',
        description: 'Portfolio repository README blueprint',
        sampleContent: `# Full-Stack Web Development Portfolio

A curated collection of production-grade web applications demonstrating modern frontend architecture, API integration, and performance optimization.

## 🛠️ Tech Stack
- **Languages:** JavaScript (ES6+), HTML5, CSS3
- **Frameworks & Libraries:** Tailwind CSS
- **Tools:** Git, GitHub, Chrome DevTools, Node.js`
      }
    ],
    acceptanceCriteria: [
      'Repository is hosted publicly on GitHub with zero tracked .env or node_modules files',
      'README renders perfectly with markdown headings, tables, and code blocks',
      'Commit history displays clear, descriptive, professional conventional commit messages'
    ],
    rubric: [
      { criteria: 'Documentation & README Quality', points: 35, description: 'Exemplary clarity, tech stack breakdown, installation commands, and visual layout' },
      { criteria: 'Git Hygiene & Conventional Commits', points: 30, description: 'Clean atomic commits with conventional commit prefixes and zero secret leaks' },
      { criteria: 'Branching & Repository Organization', points: 20, description: 'Demonstrated feature branch merge and structured multi-project layout' },
      { criteria: 'Security & Ignore Rules', points: 15, description: 'Bulletproof .gitignore covering dependencies, OS files, and environment files' }
    ]
  },
  quiz: [
    {
      id: 'm07-qz-01',
      question: 'Which Git command switches to a new branch and creates it simultaneously?',
      options: ['git branch -new <name>', 'git switch -c <name>', 'git commit -b <name>', 'git merge --create <name>'],
      correctAnswerIndex: 1,
      explanation: '`git switch -c <name>` (or `git checkout -b <name>`) creates a branch and immediately checks it out.'
    },
    {
      id: 'm07-qz-02',
      question: 'Why should `node_modules/` always be listed in `.gitignore`?',
      options: [
        'Node.js refuses to execute code if node_modules is tracked by Git',
        'Dependencies are redundant in Git history; they can be deterministically installed on any machine via `npm install` and bloat repository download size',
        'GitHub automatically deletes repositories containing node_modules',
        'Git cannot handle folders with more than 10 files'
      ],
      correctAnswerIndex: 1,
      explanation: 'Dependencies should never be tracked in source control because package-lock.json allows any collaborator to reinstall them cleanly.'
    },
    {
      id: 'm07-qz-03',
      question: 'What is a GitHub Pull Request (PR)?',
      options: [
        'A request sent to GitHub to download your code onto their hard drives',
        'A dedicated interface for proposing, reviewing, discussing, and testing branch changes before merging them into a target branch',
        'A command that restarts your local computer',
        'An error message when your internet disconnects'
      ],
      correctAnswerIndex: 1,
      explanation: 'Pull requests notify team members that a feature branch is ready for review, automated testing, and merging.'
    }
  ],
  assignment: {
    id: 'm07-assign',
    title: 'Module 07 Assignment: Team Conflict Resolution & Git Rebase Simulation',
    problemStatement: 'Simulate a real-world multi-developer collaboration scenario. Create a repository with a shared configuration file. Create two conflicting branches that both update the database connection timeout and port. Merge Branch A into main, then attempt to merge Branch B, trigger the conflict, resolve it using VS Code merge conflict editor, and record a screen capture or step-by-step markdown documentation of the exact terminal commands and resolution decisions.',
    specifications: [
      'Trigger an authentic Git conflict on a shared file',
      'Resolve the conflict by merging the two differing requirements (e.g. keeping updated timeout while adopting the new port)',
      'Document the conflict markers before resolution and the final clean git log tree graph'
    ],
    deliverables: ['`conflict-resolution-report.md` detailing the incident and resolved code commit hash.'],
    evaluationRubric: [
      { category: 'Technical Accuracy', weight: '50%', description: 'Accurate command sequence and proper resolution of conflict markers' },
      { category: 'Documentation & Log Clarity', weight: '30%', description: 'Clear presentation of git log --graph and diffs' },
      { category: 'Commit Hygiene', weight: '20%', description: 'Descriptive merge commit message explaining the resolution rationale' }
    ],
    submissionFormat: 'Markdown report submitted in repository'
  },
  resources: [
    {
      name: 'Git Official Reference Documentation',
      description: 'The authoritative reference for all Git commands.',
      url: 'https://git-scm.com/docs',
      usefulFor: 'Detailed flags and options for rebase, cherry-pick, and stash.'
    },
    {
      name: 'Conventional Commits 1.0.0 Specification',
      description: 'The industry-standard specification for structured commit messages.',
      url: 'https://www.conventionalcommits.org/',
      usefulFor: 'Standardizing commit messages for automated changelog generation.'
    }
  ],
  summary: 'Module 07 covered professional version control with Git and GitHub: repository internals (Three Trees), commit hygiene, feature branching workflows, conflict resolution, Pull Requests, and open-source documentation standards.'
};
