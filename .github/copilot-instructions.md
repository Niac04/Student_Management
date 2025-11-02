## Quick orientation

This Node.js/Express project is a small Student Management API. Key entry points and conventions:

- Entry: `src/app.js` (ES module). Use `npm run dev` for local development (`nodemon`) or `npm start` to run directly.
- Routes are defined under `src/routes/*` and mounted in `src/app.js` (currently `app.use("/students", studentRoutes)`).
- Controllers live in `src/controllers/*` and contain handler functions (exported named defaults). Example: `getStudents` in `src/controllers/studentController.js`.
- Models are in `src/models/*` and currently use Mongoose schemas (e.g. `Student`, `Course`).
- DB connection is implemented in `src/config/db.js` using Sequelize (MySQL) — NOTE: there is a stack mismatch: models use Mongoose while `connectDB` uses Sequelize. Address this before adding persistence logic.
- Environment configuration via `.env` and `dotenv`. Common env vars: `PORT`, `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `EMAIL_USER`, `EMAIL_PASS`.

## Important project-specific details agents must know

- Module system: project uses ES modules (`"type": "module"` in `package.json`). Use `import`/`export` (no `require`).
- Route prefixes: endpoints are mounted at the path used in `app.js` (e.g. `/students`). Do not assume `/api/...` unless you update `app.js`.
- Commented scaffolding: many places (routes, controllers, course features) are scaffolded but commented out or empty. For example, `src/routes/courseRoutes.js` and `src/controllers/courseController.js` are empty — implement cautiously.
- Error handling: central middleware is `src/middleware/errorHandler.js` (simple 500 JSON). `authMiddleware.js` is a placeholder — implement auth only if you wire it into routes.
- Email service: `src/utils/emailService.js` uses `nodemailer` and expects `EMAIL_USER`/`EMAIL_PASS` in env. Treat credentials as secrets.

## How to add or modify endpoints (concrete pattern)

1. Add handlers in `src/controllers/<resource>Controller.js` as named exports. Example:

   - `export const addStudent = async (req, res, next) => { /* logic */ }`

2. Wire the handler into `src/routes/<resource>Routes.js` using the existing router pattern:

   - `router.route("/").get(getStudents).post(addStudent)`

3. Mount the route in `src/app.js` (follow existing `app.use("/students", studentRoutes)`).

4. If you need persistence, first fix the DB stack mismatch: choose MongoDB + Mongoose or MySQL + Sequelize and update `src/config/db.js` and `src/models/*` accordingly.

## Quick run / debug steps

- Install deps: `npm install`.
- Create a `.env` with the variables above (for dev you can use safe local values). Example minimal `.env`:

  PORT=5000
  DB_HOST=localhost
  DB_NAME=testdb
  DB_USER=root
  DB_PASSWORD=password
  EMAIL_USER=you@example.com
  EMAIL_PASS=yourpassword

- Start dev server: `npm run dev` (nodemon) — server prints `Server running on port ...`.

## Patterns & gotchas discovered in code

- Mixed DB libraries: both `mongoose` and `sequelize` are installed and used in different places. Do not add new Sequelize models while controllers expect Mongoose documents (and vice-versa).
- Routes are simple: many controller functions are placeholders that return static JSON; tests or Postman collections aren't included.
- Use `express.json()` middleware (already enabled) for parsing JSON bodies.
- Project uses a simple global error handler; when adding async route handlers, call `next(err)` or wrap with try/catch.

## Files to inspect when changing behavior

- `src/app.js` — route mounting, global middleware, server startup.
- `src/config/db.js` — DB connection (Sequelize) — check or replace for Mongoose if needed.
- `src/controllers/*` — business logic for endpoints.
- `src/routes/*` — router wiring and route-level middleware.
- `src/models/*` — current Mongoose schemas (Student, Course).
- `src/middleware/errorHandler.js` — central error handler.
- `src/utils/emailService.js` — nodemailer usage and environment secrets.

## Example: add a new POST /students endpoint

1. Implement `addStudent` in `src/controllers/studentController.js`.
2. Update `src/routes/studentRoutes.js` to include `.post(addStudent)` on the `/` route.
3. Test via `POST http://localhost:5000/students` in Postman with JSON body.

## Final notes for agents

- Keep changes small and local: follow existing file patterns (ES modules, default exports for routers, named exports for controllers).
- Before implementing DB-backed features, clarify whether the project will use MongoDB (Mongoose) or SQL (Sequelize) and update `src/config/db.js` and `package.json` accordingly.
- Ask the maintainer if you plan to change the route prefix (from `/students` to `/api/students`) since frontend or API consumers may rely on the current paths.

If anything above is unclear or you'd like me to update the project to consistently use MongoDB or MySQL, tell me which DB you prefer and I will implement the change and wire models/controllers accordingly.
