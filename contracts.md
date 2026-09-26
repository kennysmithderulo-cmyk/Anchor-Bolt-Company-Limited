# API Contract — Anchor-Bolt Company Limited

Source of truth for backend routes and data shapes. Update this file BEFORE changing backend models or frontend callers.

Base: FastAPI, all routes prefixed `/api`, served by `backend/server.py` (`uvicorn server:app`). Storage: MongoDB via Motor, `MONGO_URL` / `DB_NAME` from env.

## Conventions
- Responses always expose `id` (string). MongoDB `_id` is excluded via the `PROJECTION = {"_id": 0}` used on every read.
- Datetimes are stored tz-aware (UTC) — the Motor client is created with `tz_aware=True`.
- Frontend calls use `API_URL` from `@/config` (`frontend/src/lib/api.ts`); never a bare `/api` URL.

## Routes

| Method | Path | Body | Response | Notes |
| --- | --- | --- | --- | --- |
| GET | `/api/` | — | `{ message: string }` | Deployment health check — must never be removed |
| GET | `/api/services` | — | `Service[]` (8, sorted by `index`) | Service lines ledger |
| GET | `/api/services/{slug}` | — | `Service` \| 404 | Single service line |
| GET | `/api/projects?category=` | — | `Project[]` | `category` optional; `all`/empty = no filter; case-insensitive exact match; unknown category returns `[]` |
| GET | `/api/projects/{id}` | — | `Project` \| 404 | Single project by uuid `id` |
| GET | `/api/pillars` | — | `Pillar[]` (4) | Company commitments |
| GET | `/api/process` | — | `ProcessStage[]` (4) | Consultation, Planning, Construction, Completion |
| POST | `/api/consultations` | `ConsultationCreate` | `Consultation` (201) \| 422 | Creates a consultation enquiry and persists it to `consultations` |

## Models

```ts
Service = { id, index, slug, title, line, summary, description, deliverables: string[], image, image_alt, category }
Project = { id, index, title, category, location, year, scope, details: string[], image, image_alt, is_placeholder: boolean }
Pillar  = { id, index, title, description, icon }        // icon ∈ quality | management | reliable | client
ProcessStage = { id, index, title, description, deliverable }

ConsultationCreate = {
  full_name: string        (2–80)
  phone: string            (7–40)
  email: EmailStr
  project_type: string     (2–80)   // matches PROJECT_TYPES in frontend/src/lib/site.ts
  project_location: string (2–120)
  message: string          (10–2000)
}

Consultation = ConsultationCreate + { id, reference: "AB-YYMMDD-XXXX", status: "received", created_at: ISO datetime }
```

## Collections and seeding
`db.services`, `db.projects`, `db.pillars`, `db.process_stages`, `db.consultations`.
Seed content lives in `backend/server.py` and is inserted once on startup when a collection is empty (`seed_database()`). Project entries are seeded with `is_placeholder: true`; the UI marks them "Sample".

Company figures (years of experience, project counts, certifications, awards, client numbers) are deliberately NOT present anywhere — they must not be invented. Only qualitative commitments are published.
