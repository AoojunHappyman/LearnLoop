# LearnLoop

LearnLoop is a responsive, browser-local university learning prototype built with the Next.js App Router, React, TypeScript, and Tailwind CSS. ITDS120 has 12 proposed modules and 24 exercises across five exercise types. The four additional subjects are marked as upcoming.

## Run locally

Use Node.js 22 or later and npm. From this directory run

```sh
npm ci
npm run dev
```

Open **http://localhost:3000**. Dependencies include the editor runtime. The predev and prebuild scripts copy the required Monaco assets into the local public directory. Fonts and illustrations are served locally.

## Production build

```sh
npm run build
npm run typecheck
npm start
```

The build produces a static export in `out/`. The start command prints the local preview URL. Deployment requires a static host that serves directory index files.

## Explore

- Start at `/courses/itds120` and open a module or visit `/practice/hello-loop` directly.
- In Monaco, Ctrl/Cmd + Enter runs a sample case. Ctrl/Cmd + Shift + Enter submits. The reference solution is available in the problem panel.
- Each accepted exercise awards XP once. Dashboard activity, mastery, recommendations, and achievements use completed exercises.
- Start the 20-question timed exam at `/exams`. Answers and the deadline survive reloads. Submission shows the score, answer review, and practice links by topic.
- Login and registration create a local demo identity. Use sample credentials. The display name, progress, drafts, and exam attempt live in browser storage. Passwords are discarded. The browser shares learning progress across its demo display names.

## Implementation

| Directory           | Purpose                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `app/`              | Server-rendered route entries, static parameters, layout, fallbacks, and design tokens          |
| `components/`       | Reusable Neo-Brutalist UI, course views, Monaco workspace, dashboard, exam, and account screens |
| `lib/content.ts`    | Typed course, module, exercise, test case, and progress entities                                |
| `lib/evaluation.ts` | Local reference-pattern and answer-key evaluation                                               |
| `lib/progress.tsx`  | Browser persistence and one-time XP awards                                                      |
| `lib/exam.ts`       | Independent practice exam content                                                               |
| `public/`           | Self-hosted fonts, licenses, and hero artwork                                                   |

The Python simulator compares normalized source against a reference pattern and supplies a canned example output. Other valid Python solutions can receive a mismatch. Error outcomes illustrate runner states. No submitted code executes. A future execution service can replace the evaluator through its typed result contract.

The community rankings contain sample learners. Course material and the practice exam are independent learning resources. They represent proposed practice content.

## Artwork

The hero illustration in `public/hero.webp` was created using built-in ImageGen. The prompt called for a smiling lavender CRT on programming textbooks, with a matching keyboard, a dark terminal tile, code-brace sticker, and graph-paper background in a limited ink-and-pastel palette. Font licenses are in `public/fonts/`.
