<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1EizFDVbQgKXKkt2kY7ExnmluthXxwupn

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Phase 1 Production Release Checklist
1. Install dependencies: `npm install`
2. Verify Airtable configuration (required env variables below) and run `npm run build`
3. Deploy the contents of `dist/` to Vercel (or your preferred static host)
4. Confirm the waitlist endpoint (`/api/waitlist`) is returning 200 responses in production
5. Send the release summary + Airtable health screenshot to the #ceu channel before inviting waitlist architects

_Required environment variables_
- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME`
- `AIRTABLE_TOKEN`
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` (Phase 1 demo login)

## Phase 1.5 · Studio Access Alignment
- Landing page now includes the “Studio Access” dark-mode preview section
- Module grid mirrors the actual studio acts and advertises readiness states
- Compliance panel summarizes AIA telemetry, time-on-task tracking, and certificate automation
- All CTAs inherit the MR design system tokens so light/dark mode stay on brand

## Phase 2 · Backend Scaffolding
Phase 2 work starts with lightweight service contracts so we can wire real data sources without breaking Phase 1.0.

### New API surfaces
| Route | Methods | Purpose |
| --- | --- | --- |
| `/api/courses` | `GET`, `POST` | Registers and lists CEU courses + modules | 
| `/api/ingest/pdf` | `GET`, `POST` | Queues PDF/spec ingestion jobs for the documentation store |
| `/api/intelligence/session` | `POST` | Talks to the Architect Intelligence layer (Gemini when an API key is present) |

### Additional environment variables
- `GOOGLE_GENAI_API_KEY` – enables live Gemini responses (Phase 2)
- `GOOGLE_GENAI_MODEL` – override the default `gemini-1.5-flash`
- `ADMIN_SESSION_VALUE` – optional cookie check for admin endpoints

All routes currently keep their data in-memory so they can be deployed immediately and backed with PlanetScale, Firestore, or Airtable when ready. Each response includes rich metadata so observability hooks (Datadog, OpenTelemetry) can plug in once Phase 2 storage is chosen.
