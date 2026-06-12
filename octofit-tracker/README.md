# OctoFit Tracker

Modern multi-tier starter setup:

- Frontend: React 19 + Vite (`5173`)
- Backend: Node.js + Express + TypeScript (`8000`)
- Data: MongoDB + Mongoose (`27017`)

## Quick start

```bash
npm --prefix "/home/vnnot01586/Project/Github copilot/skills-build-applications-w-copilot-agent-mode/octofit-tracker/frontend" install
npm --prefix "/home/vnnot01586/Project/Github copilot/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend" install
```

```bash
npm --prefix "/home/vnnot01586/Project/Github copilot/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend" run dev
npm --prefix "/home/vnnot01586/Project/Github copilot/skills-build-applications-w-copilot-agent-mode/octofit-tracker/frontend" run dev
```

## Backend defaults

- `PORT=8000`
- `MONGODB_URI=mongodb://127.0.0.1:27017/octofit_db`

Health endpoint:

- `GET /api/health`

