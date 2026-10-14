# DSA Journey

A personal, local-first tracker for studying Data Structures & Algorithms in C++ with Striver's A2Z practice sheet and linked video lessons. Track problem status and lesson progress, revisit difficult concepts, and see your consistency over time.

## Features

- **Dashboard** — daily focus, streak, overall completion, and revision reminders.
- **DSA Sheet** — 402 practice problems across 20 modules, plus a Videos tab grouping distinct source-linked lessons by topic with Watched / Not Watched / Revisit tracking.
- **Progress** — study-time, solved-problem trends, and module completion analytics.
- **Problem statuses** — Not Started, Solved, and Needs Revision.
- **Video tracking** — independent lesson statuses persisted in local storage and included in JSON backups.
- **Private by default** — progress is stored in this browser with `localStorage`; there is no account or backend.
- **JSON backup/restore** — export progress or import it on another browser/device.
- **Official practice resources** — links to TakeUForward, LeetCode, and GeeksforGeeks where available; optional editorial/video links are shown when present.

## About the sheet data

The problem index is derived from TakeUForward's Striver A2Z sheet, using a dated **20 September 2026** snapshot of problem titles, order, module grouping, and primary practice links. The 402 entries are practice problems, not every theory/learning item counted on the current Prep Hub page. The app groups the 10 basic/medium string problems into the separate **Strings (Basic and Medium)** module to match the current 20-module syllabus.

- Official sheet: https://takeuforward.org/prep-hub/strivers-a2z-dsa-sheet
- Source snapshot and link-validation notes: https://github.com/geckguy/striver-a2z-sheet
- Difficulty is not published for every entry; those are shown as **Unrated**, rather than guessing a difficulty.
- This is a local tracker, not an official TakeUForward product. The official sheet may change, so use the links above to verify the latest curriculum.

## Tech stack

React, TypeScript, TanStack Start/Router, Vite, Tailwind CSS, shadcn/ui, Lucide React, Recharts, and browser `localStorage`.

## Run locally

Requirements: a recent Node.js version and npm (or Bun).

```bash
git clone https://github.com/visheshGupta01/dsa-tracker.git
cd dsa-tracker
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

Built DSA Journey, a responsive C++ practice tracker for Striver's A2Z sheet, with 402 practice problems, distinct linked Striver course videos, lesson tracking, module-wise progress, revision statuses, local-first persistence, JSON backup/restore, and analytics.
