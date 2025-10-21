# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Development — step-by-step

Follow these steps to set up a local development environment for this project.

### 1. Install dependencies (Required)

Use the package manager you prefer. Examples:

```powershell
# with pnpm (recommended for this repo)
pnpm install

# with npm
npm install

# with yarn
yarn install
```

Notes:

- This project uses the scripts from `package.json`. With pnpm you can run `pnpm dev` (same as `pnpm run dev`). Replace `pnpm` with `npm run` or `yarn` if you choose a different manager.

### 2. Run the dev server (Required)

```powershell
pnpm dev   # or: npm run dev  /  yarn dev
```

The app will start with Vite and provide a local URL (usually `http://localhost:5173`). HMR (hot module replacement) is enabled.

### 3. Useful scripts (Informational)

- Start dev server: `pnpm dev` (or `npm run dev`, `yarn dev`)
- Build for production: `pnpm build`
- Preview production build locally: `pnpm preview`
- Run ESLint: `pnpm lint`

### 4. Environment variables (Optional)

- Vite exposes only variables that start with `VITE_` to client code. Create a `.env.local` (gitignored) for machine-specific values.
- Example `.env.local`:

```env
# base API URL used by the client
VITE_API_URL=http://localhost:3000

# WebSocket/real-time server (if used)
VITE_WS_URL=ws://localhost:3000

# Optional: override the dev port (Vite respects PORT env variable)
PORT=5173
```

### 5. Troubleshooting & tips (Optional)

- If ports are in use, either stop the process using that port or change `PORT` in `.env.local`.
- If you see dependency resolution errors, try:

```powershell
pnpm store prune
Remove-Item -Recurse -Force node_modules    # PowerShell-safe removal
pnpm install
```

- If you're on a different shell, substitute the appropriate command to remove `node_modules`.
- If ESLint shows issues, run `pnpm lint` and follow the messages. The repo uses a lightweight ESLint config; consider running an autofix where appropriate (for files you control):

```powershell
pnpm exec eslint --fix .
```

### 6. Contributing (Optional)

- Create a feature branch from `main`.
- Keep commits small and focused; add tests for new logic when reasonable.

If you want more automation (pre-commit hooks, commitlint, CI), I can add examples and a basic GitHub Actions workflow.

---

If anything here doesn't match your local setup (for example you use npm or Yarn rather than pnpm), tell me which package manager you prefer and I will add equivalent commands.
