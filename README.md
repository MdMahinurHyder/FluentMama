# FluentMama

**AI-powered, gamified spoken English learning for Bengali speakers.**

FluentMama helps native Bengali speakers learn spoken English through interactive gameplay, a bilingual AI tutor, real-life conversation practice and lessons that adapt to each learner's level, goals and interests.

> Course project for **CSE 327 (Software Engineering)**, Section 07, Fall 2026, North South University.

## Team

| Name | Student ID |
|---|---|
| Md. Mahinur Hyder Antor | 2412755642 |
| Md. Abdullah Al Sayed | 2411439042 |

## Screenshots

<!-- Add your screenshots to a /docs folder, then uncomment these lines -->
<!-- ![Login](docs/login.png) -->
<!-- ![Onboarding](docs/onboarding.png) -->
<!-- ![Home](docs/home.png) -->

## Core platform pillars

- **Gamified mechanics:** streaks, experience points, unlockable learning worlds and competitive challenge arenas.
- **Autonomous AI agents:** a bilingual AI tutor, a real-time conversation simulator and adaptive learning recommendations.
- **Data-driven insights:** Python and ML mistake tracking for prioritized topic revision over time.

## Current status (frontend prototype)

| Feature | Status |
|---|---|
| Login and sign-up (email and Google) | Working |
| Support chatbot on login pages | Working (keyword-based, not AI yet) |
| 3-step onboarding form (level, goals, hobbies) saved to the database | Working |
| App shell: collapsible sidebar, profile menu, page transitions | Working |
| Home dashboard | Working (streak, XP and daily progress are **demo data**) |
| AI Tutor, Conversations, Challenge Arena, Learning Worlds, Mistakes, Voice Coach | Placeholder pages, in development |
| FastAPI backend and AI / ML engine | Planned |

## Planned features

1. AI-powered adaptive learning system
2. AI English tutor with Bangla explanations
3. AI conversation simulator and feedback system
4. Competitive English challenge arena
5. Progressive learning worlds and unlockable missions
6. Intelligent mistake tracking and personalized revision
7. AI voice assistant and accent correction

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Next.js, TypeScript |
| Backend (planned) | Python, FastAPI, REST APIs |
| Database | PostgreSQL (Supabase) |
| Authentication | Supabase Authentication (email and Google) |
| AI and ML (planned) | scikit-learn, OpenAI API, LangGraph |
| Testing (planned) | Pytest, Vitest, Playwright, Postman |
| CI / CD (planned) | GitHub Actions |
| Deployment (planned) | Vercel (frontend), Render (backend) |
| UI libraries | Tailwind CSS, Framer Motion, Zustand, Lucide icons |

## Getting started

### Prerequisites

- Node.js 18 or newer
- A free [Supabase](https://supabase.com) project

### 1. Install dependencies

```bash
npm install
```

### 2. Add your environment variables

Create a file named `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-PUBLISHABLE-OR-ANON-KEY
```

Find both values in your Supabase dashboard under **Connect** and **Project Settings → API Keys**. Never commit this file.

### 3. Set up the database

In Supabase, open **SQL Editor**, paste the contents of `supabase/schema.sql` and click **Run**. This creates the `profiles` table with row-level security and a trigger that creates a profile for every new user.

### 4. Configure authentication

In the Supabase dashboard:

- **Authentication → Sign In / Providers → Email:** for local testing, turn off "Confirm email".
- **Authentication → URL Configuration:** set Site URL to `http://localhost:3000` and add `http://localhost:3000/auth/callback` as a redirect URL.
- **Google (optional):** create an OAuth client in Google Cloud Console, then paste the client ID and secret into the Google provider.

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
├── app/
│   ├── (auth)/          # login and signup pages
│   ├── (onboarding)/    # 3-step onboarding form
│   ├── (app)/           # dashboard and feature pages (sidebar layout)
│   └── auth/callback/   # Google sign-in return page
├── components/
│   ├── auth/            # form fields, Google button
│   ├── brand/           # logo
│   ├── chatbot/         # support assistant
│   ├── layout/          # sidebar, top bar, profile provider
│   └── onboarding/      # step shell and option cards
├── lib/                 # Supabase client, auth helpers, navigation
└── store/               # onboarding state (Zustand)
supabase/
└── schema.sql           # database schema and policies
```

## Roadmap

| Phase | Deliverable |
|---|---|
| 1 | SRS document, database schema and authentication |
| 2 | Gamified frontend: learning worlds and challenge arena |
| 3 | AI tutor, conversation simulator and adaptive engine |
| 4 | CI/CD automated deployment and final testing |

## Security notes

- Row-level security is enabled, so each user can read and write only their own profile.
- Only the public (publishable / anon) Supabase key is used in the frontend.
- `.env.local` is git-ignored.

## License

Built for educational purposes as a university course project.
