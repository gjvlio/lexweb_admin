# LexWeb Admin Portal

The official administrative management application for LexMeet. Built with **React 18 + Vite 5 + Tailwind CSS v3 + React Router v6**.

---

## 🚀 Quick Start

```bash
# 1. Clone repository & navigate to folder
git clone <repository-url>
cd lexweb-admin

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Verify production build
npm run build
```

---

## 📖 Developer Guide & Git Workflow

Before contributing, all team members and group developers **MUST** review the developer guide:

👉 **[`docs/DEV_GUIDE.md`](docs/DEV_GUIDE.md)**

### Key Rules:
- **No Pushing to Main**: Direct pushes to `main` are strictly prohibited because `main` is connected directly to **Vercel** and automatically deploys live to production on every push.
- **Branch Naming Rule**: Must follow `[page name]/[feature]` (e.g. `dashboard/hero-banner`).
- **PR Review**: All PRs must be filtered and approved by your group's Main Developer (Focal Person).
- **Design Tokens**: Max Canvas Width `1440px`, Header Height `68px`, Navigation Width `230px`, Icon size `25x25px`.
