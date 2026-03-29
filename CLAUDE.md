# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Barkeeper is a cocktail recipe and bar inventory management app. The repository is a monorepo with two top-level directories:

- `api/` — .NET ASP.NET Core Web API (C#)
- `web/` — React + TypeScript frontend (Vite)

## Commands

### Frontend (`web/`)

```bash
cd web
npm run dev      # Start dev server (HTTPS via mkcert, default port 5173)
npm run build    # Type-check and build for production
npm run lint     # Run ESLint
```

### Backend (`api/`)

```bash
cd api
dotnet run --project Barkeeper.API   # Start API server (https://localhost:7115)
```

### Database Migrations (EF Core)

```bash
cd api
dotnet ef migrations add <MigrationName> --project Barkeeper.Data --startup-project Barkeeper.API
dotnet ef database update --project Barkeeper.Data --startup-project Barkeeper.API
```

Migrations run automatically on startup in the Development environment.

## Environment Variables

**`web/.env.local`** (not committed):
- `VITE_AUTH_DOMAIN` — Auth0 domain
- `VITE_AUTH_CLIENTID` — Auth0 client ID
- `VITE_AUTH_AUDIENCE` — Auth0 API audience

**`api/Barkeeper.API/appsettings.Development.json`** (not committed, must be created locally):
```json
{
  "ConnectionStrings": { "Database": "<postgres connection string>" },
  "Auth0": {
    "Domain": "<auth0-domain>",
    "Authority": "https://<auth0-domain>/",
    "Audience": "<auth0-audience>"
  }
}
```

## Architecture

### Backend (`api/`)

Four projects in a single solution:

| Project | Role |
|---|---|
| `Barkeeper.API` | Controllers, entry point, DI setup |
| `Barkeeper.Data` | `BarkeeperContext` (EF Core), Repositories, Migrations |
| `Barkeeper.Models` | Database entity models, ViewModels, request/utility types |
| `Barkeeper.Services` | Business logic services |

**Request flow**: Controller → Service → Repository → EF Core → PostgreSQL

**Controller conventions**: All controllers extend `BarkeeperControllerBase`, which applies `[Authorize]`, `[ApiController]`, and `[Route("[controller]/[action]")]`. It also exposes `CurrentUserId`, `CurrentUserName`, and `CurrentUserPermissions` from the JWT claims.

**Auth**: Auth0 JWT Bearer. Two policies: `Admin` and `User`, enforced via a custom `PermissionRequirement`.

### Frontend (`web/`)

**Routing**: TanStack Router with file-based routing. Routes live in `src/routes/`. The router has `auth` (Auth0 context) and `queryClient` in its context. `routeTree.gen.ts` is auto-generated — do not edit it manually.

**Data fetching pattern**: `src/data/` files (e.g., `Cocktail.ts`, `Ingredient.ts`) define:
1. URL constants (`cocktailUrls`)
2. Query key factories (`cocktailKeys`)
3. `queryOptions` factories (`cocktailQueries`) — used for prefetching in route loaders
4. `useQuery`-based hooks (e.g., `useRecentCocktails`) — used in components

All requests are built via `constructGetRequest` / `constructPostRequest` in `src/data/Utility.ts`, which attach the Auth0 bearer token and use `ky` as the HTTP client. The API base URL is hardcoded to `https://localhost:7115/`.

**Component structure**:
- `src/components/ui/` — shadcn/ui primitives (Radix UI based)
- `src/components/<domain>/` — feature components (e.g., `cocktails/`, `header/`)
- `src/components/page/` and `src/components/utility/` — shared layout/utility components

**Types**: `src/types/` mirrors the backend models (`Models.ts`, `ViewModels.ts`, `Request.ts`, `Utility.ts`). TypeScript property names use PascalCase to match the C# JSON serialization policy (`PropertyNamingPolicy = null`).

**Auth**: `Auth0Provider` wraps the app in `main.tsx`. The router is re-created when auth state changes. `AuthenticatedRoot` and `UnauthenticatedRoot` provide layout shells for protected vs. public routes.

## UI & Styling

- **Component library**: shadcn/ui (in `src/components/ui/`) for primitive components; HeroUI (`@heroui/react`) for richer components
- **Tailwind CSS v4** configured via `@tailwindcss/vite` plugin
- **Path alias**: `@/` resolves to `src/`

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Hierarchy: Use size, color, weight, etc. to great good contrast and hierarchy in layouts.

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>

### Typography

Three font families with distinct roles:
- `font-display` / `font-serif` → **Playfair Display** — cocktail names, elegant headings
- `font-sans` → **Inter** — UI elements, body text, descriptions
- `font-mono` → **JetBrains Mono** — measurements and quantities only

### Color Theme

- **Primary** (amber `#D97706` light / `#F59E0B` dark) — premium spirits, warmth
- **Secondary** (emerald `#059669` light / `#10B981` dark) — botanical, fresh elements
- Dark mode supported; always test components in both modes
