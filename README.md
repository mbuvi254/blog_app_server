# BlogIT_App

Lightweight backend for BlogIT — an Express + TypeScript API using Prisma for the database and JWT-based auth.

This README covers quick setup, environment variables, development scripts, and notes about authentication and CORS (important for cookies).

## Prerequisites

- Node.js (v18+ recommended)
- npm
- A SQL Server instance and a connection string (this project uses SQL Server via Prisma)

## Environment variables

Create a `.env` file at the project root with at least the following values:

```
PORT=5000
DATABASE_URL="sqlserver://USER:PASSWORD@HOST:PORT;database=DB_NAME;encrypt=true"
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Adjust values for your environment. Keep `JWT_SECRET` private.

## Install & build

Install dependencies:

```bash
npm install
```

Compile TypeScript to `dist/`:

```bash
npm run build
```

Run the compiled server (example using nodemon in this repo):

```bash
npm run server
```

Notes:
- The project uses `type: "module"` in package.json and `module: nodenext` in tsconfig.

## Prisma (database)

The Prisma schema is at `prisma/schema.prisma`. The project expects a SQL Server datasource configured via `DATABASE_URL`.

Typical Prisma workflow:

```bash
# generate client
npx prisma generate

# create a migration (if schema changed)
npx prisma migrate dev --name init

# inspect database
npx prisma studio
```

## Key files and structure

- `src/app.ts` - app bootstrap, CORS and cookie parser setup, route wiring
- `src/controllers/authController.ts` - register, login, logout, profile
- `src/controllers/tokenHelpers.ts` - JWT generation and verification middleware
- `src/controllers/passwordHelpers.ts` - bcrypt password hashing and zxcvbn strength check
- `src/routes/authRoutes.ts` - `/auth` routes (register, login, profile)
- `src/routes/usersRoutes.ts` - `/users` CRUD routes

## API (important endpoints)

- POST /auth/register — register a new user
- POST /auth/login — login; sets an HTTP-only cookie named `accessToken`
- GET /auth/profile — protected route; reads JWT from cookie or Authorization header

## Authentication & Cookies (CORS considerations)

This project sets an httpOnly cookie named `accessToken` on login. A common issue when the login succeeds but the profile endpoint returns 401 is that the browser does not send the cookie on subsequent requests. To make cookies work across ports/origins during development follow these steps:

1. Make sure the server CORS `origin` matches your frontend origin. For example, if your frontend runs at `http://localhost:3000`, set `origin: 'http://localhost:3000'` in `src/app.ts`.
2. The server must enable credentials: `credentials: true` (already set in `src/app.ts`).
3. The frontend must send requests with credentials enabled:

   - fetch: `fetch('/auth/profile', { credentials: 'include' })`
   - axios: `axios.get('/auth/profile', { withCredentials: true })`

4. Cookie `sameSite` and `secure` settings affect whether the browser accepts/sends cookies across origins:

   - For local development across different localhost ports, set `sameSite: 'lax'` on the cookie (the code currently uses `sameSite: 'strict'`, which can block cookie sending). If you need third-party cross-site cookies in production, use `sameSite: 'none'` with `secure: true`.

5. Use browser devtools -> Network -> request -> Cookies and Response headers to debug `Set-Cookie` and whether the browser is sending the cookie on requests.

## Troubleshooting

- If login returns success but `/auth/profile` returns 401:
  - Confirm the login response included a `Set-Cookie` header for `accessToken`.
  - Confirm subsequent profile requests include the `Cookie` header with `accessToken`.
  - Ensure the frontend uses `credentials: 'include'` or `withCredentials: true`.
  - Consider changing the cookie `sameSite` to `'lax'` in `src/controllers/authController.ts` during dev.

- If you get `JWT_SECRET is not found` on startup, ensure `JWT_SECRET` is defined in `.env`.

## Useful commands

```bash
npm install
npm run build      # compile TypeScript
npm run server     # run compiled server (nodemon expected in repo)
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio
```

## Notes & next steps

- The server currently uses `sameSite: 'strict'` for cookies; for cross-port local development update it to `lax` to allow the browser to send the cookie from the frontend origin. In production use `sameSite: 'none'` and `secure: true` when frontend and backend are on different domains.
- If you'd like, I can make a small README tweak to document the exact cookie change and also apply the dev-friendly change in code and run a TypeScript build.

---

If you want, I can also:
- apply the development cookie change (sameSite -> 'lax')
- update CORS origin to use `FRONTEND_URL` from env
- run `npm run build` to verify TypeScript compiles

Tell me which of those you'd like me to do next.

Install Prisma ORM package

```bash
npm init -y
nmp i prisma --save-dev
```
Initialise Prisma with SQL SERVER provider
```bash
npx  prisma init --datasource-provider sqlserver
```
Install Typescript 
```bash
npm install -D typescript ts-node @types/node @types/express nodemon
```

Install dotenv to use .env files
```bash
npm i dotenv
```

For Login
```bash
npm install bcryptjs
npm i -D @types/bcryptjs
```
use the zxcvbn package to check for the strength of a password.
```bash
npm install zxcvbn
npm i --save-dev @types/zxcvbn
```
For JWT
```bash
npm install jsonwebtoken
```

Fix Types Cors and JWT Errors ,types
```bash
npm i --save-dev @types/cors @types/jsonwebtoken
```