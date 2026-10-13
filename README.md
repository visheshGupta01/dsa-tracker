# DSA Journey

A personal, local-first tracker for studying Data Structures & Algorithms in C++ with Striver's A2Z Sheet. Keep your next steps visible, track problem status, revisit problems that need work, and see your consistency over time.

## Features

- **Dashboard** — daily focus, streak, overall completion, and revision reminders.
- **DSA Sheet** — search and filter problems by topic, difficulty, and status.
- **Progress** — study-time, solved-problem trends, and topic completion analytics.
- **Simple statuses** — Not Started, Solved, and Needs Revision.
- **Private by default** — progress is stored in this browser with `localStorage`; there is no account or backend.
- **JSON backup/restore** — export progress or import it on another browser/device.

> **Roadmap note:** the bundled topic/problem list is a starter subset inspired by Striver's A2Z roadmap, not a verified complete copy of the official sheet. Review the data before treating it as exhaustive.

## Tech stack

React, TypeScript, TanStack Start/Router, Vite, Tailwind CSS, shadcn/ui, Lucide React, Recharts, and browser `localStorage`.

## Run locally

Requirements: a recent Node.js version and npm (or Bun).

```bash
git clone https://github.com/visheshGupta01/pixel-perfect-replica.git
cd pixel-perfect-replica
npm install
npm run dev
```

## Validate

```bash
npm test
npm run lint
npm run build
```

## Deploy

Import the repository into Vercel and use the detected build settings. Progress remains in the browser where it was saved; use JSON backup/restore to move it between browsers.

## Portfolio / LinkedIn

Built DSA Journey, a responsive C++ practice tracker inspired by Striver's A2Z sheet, with daily study tracking, revision statuses, local-first persistence, JSON backups, and progress analytics.
