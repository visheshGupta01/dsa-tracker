# DSA Journey implementation plan

## Product outcome
Replace the starter screen with a working personal DSA tracker, using the existing TanStack Start project and browser storage only. Preserve the brief's one-user, no-backend constraint.

## Build
- Add the five linked sections: Dashboard, Roadmap, Problems, Revision, and Analytics, with a responsive dark navigation shell and section-specific page metadata.
- Define the visual system centrally, then use it for a focused developer-oriented interface, status badges, charts, contribution heatmap, and mobile navigation.
- Add Striver-inspired roadmap data and sample problems, plus reusable problem editing/detail flows, filters, search, status updates, and revision scheduling.
- Keep data access behind a local-storage service and put calculations for topic progress, study streaks, sessions, and analytics in reusable helpers.
- Make daily tasks, adjustable study minutes, finish-day recording, revision confidence, reset confirmation, and session/problem history work end to end.

## Validation
Run the existing routing test and the app's available checks, inspect the preview and browser console, then exercise navigation, edits, persisted data, revision scheduling, streak/session recording, and mobile layout.

## Technical decisions
- Retain TanStack Start, TypeScript, and its file-based routes because these are already the project's supported framework; map the requested experience onto that structure rather than replacing the project scaffold.
- Use localStorage through a single storage abstraction and seed sample content on first visit, with no authentication, backend, or GitHub API.
