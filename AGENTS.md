# SIGPQ Backend — AGENTS.md

## Tech stack

- **Framework:** AdonisJS v5 (TypeScript), `tsconfig.json` extends `adonis-preset-ts`
- **Auth:** JWT (asymmetric RSA keys via `adonis5-jwt`), primary guard is `jwt` in `config/auth.ts:21`
- **Database:** MySQL via Lucid ORM (primary), MongoDB (audit `MongoLogService`), Redis (bull queue)
- **Object storage:** MinIO (`config/minio.ts`)
- **Task queue:** Bull via `@rlanz/bull-queue`
- **Test runner:** Japa v2 (`@japa/runner` + `@japa/preset-adonis`), **not** Jest

## Project structure

| Directory | Purpose |
|---|---|
| `app/Models/` | Lucid ORM models |
| `app/Controllers/Http/` | Route handlers |
| `app/Repositories/` | Data access layer (repository pattern) |
| `app/Validators/` | Adonis validator schemas |
| `app/Middleware/` | HTTP middleware (Auth, Can, Is, etc.) |
| `app/Service/` | Business services (MinioService, MongoLogService, HttpService) |
| `app/Helper/` | Utilities (UserHelper, String, logger, etc.) |
| `app/@piips/` | Internal private package (core, files, shared, templates) |
| `addons/` | Feature modules auto-loaded by the route system (gitignored except `addons/config/`) |
| `config/` | Adonis config files |
| `start/` | App bootstrap: `routes.ts` (entry), `kernel.ts` (middleware), events, logs, socket |
| `start/api/v1/` | Route files (`*.routes.ts`), auto-discovered by `start/api/v1.ts` |
| `contracts/` | TypeScript declaration merging for IoC bindings |
| `database/migrations/` | Lucid migrations |
| `database/seeders/` | Seeders (numbered sequentially: `049*.ts`, `050*.ts`, etc.) |
| `providers/` | Custom Adonis service providers |
| `commands/` | Ace commands (`run:migrations_from_sigpq`) |
| `tests/` | Test suites (see below) |

## Key commands

```sh
# dev server with file watch
node ace serve --watch

# build for production
node ace build --production

# start production build
node server.js

# run all tests
node test.ts

# run a specific test suite (names from .adonisrc.json)
node test.ts --suite=Geral

# lint
npm run lint           # prettier --check .
npx prettier --write . # auto-format (config in prettier.json)
npx eslint .           # lint with ESLint

# typecheck
npm run check-tsc      # tsc

# database
node ace migration:run
node ace migration:rollback
node ace db:seed
node ace db:wipe

# queue
node ace queue:listen
node ace queue:clear

# other
node ace list:routes
node ace repl
```

## Tests (Japa)

- Entrypoint: `node test.ts` (not an ace command)
- Suites defined in `.adonisrc.json:tests.suites`: Geral, Entidades, repositories-webservice, config
- Global test match pattern: `tests/**/*.spec(.ts|.js)`
- All suites have 60s timeout
- Test setup loads ace commands but does **not** start an HTTP server (the `configureSuite` check for `'functional'` never triggers)
- Helper text in `tests/dica.txt` shows old Adonis v4-style test patterns — ignore, current tests use Japa

## Config quirks

- **prettier.json** has a typo: `"trailingComa"` — Prettier ignores it silently; trailing commas are off (default). Run `npx prettier --write .` to apply formatting.
- **ESLint** config exists in both `package.json` (`eslintConfig`) and `.eslintrc.json` — these may conflict. `.eslintrc.json` overrides at the file level. The `package.json` one extends `plugin:adonis/typescriptApp`, the rc file extends `airbnb-base` + `prettier`.
- **`tsconfig.json`** has a top-level `"rules"` object (invalid there, belongs in `compilerOptions`). TypeScript ignores it.
- **`.nvmrc` / `.tool-versions`** say Node 14.20.0, but `package.json` `"engines"` / `"node": "^21.2.0"`. Use Node 21+.
- **`.env`** is **not** in `.gitignore` — be careful not to commit secrets. Use `.env.example` as template.
- Password hashing prepends a salt from config (`SALT` env var) before `phc-bcrypt` hashing, done in `UserHelper.getSalt()`.

## Architecture notes

- **Route discovery:** `start/api/v1.ts` auto-imports `*.routes.ts` files from `start/api/v1/`, `addons/`, and `start/api/extra/` using a webpack-like `context` helper — each route file exports a function `(ApiRoute, Route) => { ... }`
- **Repository pattern:** Controllers call repositories (not models directly). Repositories extend `BaseRepository.ts` and follow CRUD naming: `index`, `store`, `show`, `update`, `destroy`
- **Auth:** JWT guard with asymmetric keys. `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` env vars. Tokens stored in `jwt_tokens` table. Middleware chain: `auth:jwt` → `is` (role check) → `can` (permission check)
- **Seeders** are numbered sequentially (e.g., `049AdicionarUsuariosRH.ts`) — run in order. Generated module seeders (`modulo_*.ts`) are gitignored
- **Migrations** were mostly moved to `database/migrations_old/` — only 4 recent migrations remain
- **Logging:** Custom Winston provider (`providers/WinstonLoggerProvider.ts`) logs to MySQL via `winston-mysql`
- **WebSocket:** Socket.IO server via `start/socket.ts`, booted after HTTP server in `server.ts:32-33`

## PM2 production deployment

Config in `ecosystem.config.js` reads `TOTAL_MEMORY`, `INSTANCES`, `EXEC_MODE`, `WATCH_MODE` from env. Default: fork mode, 4 instances (dev) / 15 (prod), 4048 MB memory limit.

```sh
pm2 start ecosystem.config.js
```

## Git conventions

- Commits follow conventional commits (`@commitlint/config-conventional`)
- Pre-commit hook runs `lint-staged` (Prettier + ESLint on staged `*.ts`)
- Husky v8 for git hooks
