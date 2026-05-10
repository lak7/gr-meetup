# AGENTS.MD

## Project Overview

This repository is a small **Next.js 14 App Router prototype** for an emergency assistance product called **FireShield**.

The current app is intentionally narrow in scope:

- A single landing page renders one interactive desktop-first emergency workflow.
- A single API route calls Groq's chat completions API to generate a structured incident plan.
- Styling is handled through one global stylesheet.
- There is no database, auth layer, background job system, or test suite in the repo right now.

Treat this as a **product prototype** rather than a production emergency platform.

## Stack

- Next.js `14.2.5`
- React `18.3.1`
- TypeScript `5.5`
- App Router
- Plain CSS in `app/globals.css`
- Groq API via `fetch` in `app/api/agent/route.ts`

## Repository Map

- `app/page.tsx`
  - Home page entrypoint. Only renders the main emergency flow component.
- `components/EmergencyDesktopFlow.tsx`
  - Core UI and client-side state machine.
  - Handles need selection, notes entry, AI plan request, and success state.
- `app/api/agent/route.ts`
  - Server route for AI incident-plan generation.
  - Expects JSON input and returns structured JSON output in `{ plan: ... }`.
- `app/layout.tsx`
  - Root layout and page metadata.
- `app/globals.css`
  - Entire visual system for the prototype.
- `README.md`
  - Product-level overview. Useful for intent, but some structure notes are broader than the actual codebase.

## Current Product Behavior

The UI is a 3-stage flow:

1. Choose emergency type: `medical` or `evacuation`
2. Review static location/contact details and optionally request an AI action plan
3. Send request and show a static success state

Important implementation details:

- `location` and `contact` are currently hardcoded in `EmergencyDesktopFlow.tsx`.
- The request ID and ETA in the success state are also hardcoded.
- The "Live Response Queue" is mock UI with static entries.
- The AI plan is optional; users can continue without generating it.

## AI Contract

The API route currently depends on:

- `GROQ_API_KEY`
- Optional `GROQ_MODEL`

Default model:

- `llama-3.1-8b-instant`

Expected request body:

```ts
{
  need: "medical" | "evacuation";
  location: string;
  contact: string;
  notes?: string;
}
```

Expected response shape:

```ts
{
  plan: {
    summary: string;
    priority: "low" | "medium" | "high" | "critical";
    immediate_actions: string[];
    responder_brief: string;
    safety_checks: string[];
  };
}
```

The route instructs the model to return JSON and rejects missing, empty, or invalid JSON responses.

## Working Rules For Agents

When changing this repo, optimize for **clarity and prototype stability** over abstraction.

- Preserve the existing simple architecture unless the task clearly requires expansion.
- Do not introduce a large state library, ORM, auth framework, or component system without a concrete need.
- Keep the API response contract aligned with the frontend `CopilotPlan` type.
- If you change the model prompt or output shape in `app/api/agent/route.ts`, update the frontend expectations in `components/EmergencyDesktopFlow.tsx` in the same change.
- Keep the UI emergency-focused: fast to scan, obvious primary actions, minimal friction.
- Prefer small, explicit components over speculative abstractions.
- Preserve TypeScript strictness and explicit unions for workflow state.

## UI Guidance

The current design language is:

- light background
- dark navy hero
- red for emergency actions
- green for safe/evacuation actions
- card-based layout

When editing UI:

- maintain strong contrast and obvious action hierarchy
- keep copy concise and operational
- avoid decorative complexity that slows comprehension
- preserve usable mobile behavior; the existing CSS collapses to single-column below `900px`

## Safe Change Boundaries

Low-risk places to work:

- copy changes in the UI
- visual changes in `app/globals.css`
- flow adjustments inside `EmergencyDesktopFlow.tsx`
- metadata updates in `app/layout.tsx`
- prompt tuning and error handling in `app/api/agent/route.ts`

Higher-risk changes that require extra care:

- changing the JSON schema returned by the AI route
- introducing server/client boundary changes
- replacing hardcoded prototype data with dynamic sources
- adding dependencies to a codebase this small

## Local Commands

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`

Note:

- `package.json` defines `lint`, but this repo does not currently include a separate ESLint config file in the visible root.
- There is no automated test suite at the moment.

## Known Gaps

Agents should be aware that the current app has prototype limitations:

- no persistence
- no authentication or authorization
- no real responder backend
- no live queue data
- no request validation beyond basic runtime assumptions
- no retry/backoff logic for Groq failures
- no loading skeletons or optimistic state beyond simple button disablement
- no tests

## Preferred Agent Output

For future work in this repo:

- explain changes in terms of user flow and API contract impact
- call out any env var requirements explicitly
- mention when behavior remains mocked or static
- verify with `npm run build` or `npm run lint` when feasible

## File-Specific Notes

### `components/EmergencyDesktopFlow.tsx`

- This is the main product surface.
- Keep stage transitions easy to follow.
- Avoid over-engineering the state model unless the flow becomes materially more complex.

### `app/api/agent/route.ts`

- Keep responses machine-readable and stable.
- Favor defensive error messages because frontend handling is minimal.
- Any external API dependency change should preserve the outward JSON contract unless the task explicitly changes it.

### `app/globals.css`

- This stylesheet defines the whole app look.
- Prefer extending the existing token-like CSS variables in `:root` instead of scattering raw colors.

## If You Need To Expand The App

Recommended order of evolution:

1. Extract reusable UI pieces only after duplication appears
2. Add request validation for `/api/agent`
3. Replace static location/contact/request data with real inputs
4. Add tests around the API contract and main UI states
5. Add real backend integrations only after the prototype flow is settled
