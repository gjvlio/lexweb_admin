# LexWeb Admin — Developer Guide & Team Standards

Welcome to the **LexWeb Admin** project. This guide outlines the project setup, design system specifications, Git collaboration workflow, branch naming rules, and Pull Request (PR) policies for all team members and group lead developers.

---

## 1. Getting Started & Installation

Follow these steps to set up and run the development environment:

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Execution

```bash
# 1. Clone the repository
git clone <repository-url>
cd lexweb-admin

# 2. Install project dependencies
npm install

# 3. Start the local development server (with HMR)
npm run dev

# The app will run locally at http://localhost:5173

# 4. Run production build validation before submitting PRs
npm run build
```

---

## 2. GitHub Collaboration & PR Workflow

Because multiple members and development groups work on this repository simultaneously, all contributors must strictly adhere to the following workflow:

> [!CAUTION]
> ### 🛑 STRICT RULE: PROTECTED MAIN BRANCH & AUTOMATED VERCEL DEPLOYMENT
> **NO ONE IS ALLOWED TO PUSH DIRECTLY TO THE `main` BRANCH.**  
> Direct pushes to `main` are strictly prohibited because the `main` branch is connected directly to **Vercel** for live production deployment. Any push to `main` immediately triggers an automatic build and auto-updates the live production site on Vercel. All code changes must first be thoroughly reviewed, tested, and merged through a Pull Request (PR).

### Focal Person / Main Developer Role
- Each group has a designated **Main Developer (Focal Person)**.
- Main Developers are responsible for filtering, reviewing, and testing all Pull Requests (PRs) submitted for their group's assigned pages and features before merging into `main`.

### Pull Request (PR) & Branch Lifecycle

1. **Creating a Feature Branch**: Always create a fresh feature branch off the latest `main` branch before starting work.
   ```bash
   git checkout main
   git pull origin main
   git checkout -b [page name]/[feature]
   ```
2. **Submitting a PR**: Once your feature is complete and verified with `npm run build`, push your branch to origin and open a PR targeting `main`. Assign your group's Main Developer as the reviewer.
3. **Branch Cleanup (Recommended)**:
   - After your PR is successfully approved and merged into `main`, **create a new branch** for your next task.
   - Ask your group's Main Developer to **delete the merged remote branch** to prevent branch cluttering and stacking.
4. **Keeping a Branch (Alternative)**:
   - If you must continue working on an existing branch after a merge, you **MUST** immediately fetch and pull latest changes from `origin main`:
   ```bash
   git fetch origin
   git pull origin main
   ```

---

## 3. Naming Conventions

### Branch Naming Convention
Branches must strictly follow the `[page name]/[feature]` pattern:

```text
[page name]/[feature]
```

#### Examples:
- `dashboard/hero-banner`
- `lawfirms/filter-modal`
- `websites/domain-list`
- `products/template-grid`
- `products/asset-card`
- `orders/summary-table`
- `transactions/payout-queue`
- `reports/monthly-chart`

### Commit Message Formatting
Use clear, descriptive conventional commit messages:

```text
type(scope): concise description of changes
```

#### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation updates
- `style`: Layout, Tailwind CSS, typography, or UI tweaks
- `refactor`: Code restructuring without changing functionality
- `chore`: Dependency updates or build configuration changes

#### Examples:
- `feat(dashboard): add statistics card component`
- `fix(navbar): update icon dimensions to exact 25x25px`
- `docs(dev-guide): update git PR workflow and branch naming rules`

---

## 4. Design System & Layout Specifications

| Property | Value / Specification | Tailwind Class / Style |
| :--- | :--- | :--- |
| **Max Canvas Width** | `1440px` | `max-w-[1440px]` |
| **Header Height** | `68px` | `h-[68px]` |
| **Navbar (Side Drawer) Width** | `230px` (Expanded) / `80px` (Collapsed) | `w-[230px]` / `w-20` |
| **Global Icon Dimensions** | `25px x 25px` | `w-[25px] h-[25px]` |
| **"LEXWEB ADMIN" Font** | `Roboto Slab`, Bold, `21px` | `font-heading font-bold text-[21px]` |
| **Page Indicator Font** | `Lato`, Regular, `12px`, `2px` letter-spacing | `font-sans font-normal text-[12px] tracking-[2px]` |
| **Navbar Link Font** | `Lato`, Regular, `16px` | `font-sans font-normal text-[16px]` |

### Brand Color Tokens

- **Striking Orange:** `#F4512C` (`bg-brand-orange`, `text-brand-orange`)
- **Light Orange:** `#FF7F4D` (`bg-brand-orange-light`)
- **Lawful Purple:** `#5E1B89` (`bg-brand-purple`, `text-brand-purple`)
- **Soft Purple:** `#9D71BC` (`bg-brand-purple-soft`)
- **Off-White Canvas Background:** `#F8FFFE` (`bg-brand-bg`)
- **LexMeet Gradient:** `linear-gradient(135deg, #F4512C 0%, #5E1B89 100%)` (`bg-lexmeet-gradient`)

---

## 5. Project Directory Layout

```text
lexweb-admin/
├── docs/
│   ├── DEV_GUIDE.md          # Developer guide & Git PR workflow (this file)
│   └── PROGRESS.md           # Scaffolding checklist
├── public/                   # Static public assets
├── src/
│   ├── assets/
│   │   ├── header/           # lexweb-logo.png, notification-icon.png, profile-icon.png
│   │   └── navbar/           # PNG menu icons (dashboard, law-firm, websites, etc.)
│   ├── components/
│   │   ├── layout/           # MainLayout.jsx, Header.jsx, Navbar.jsx
│   │   └── ui/               # Button.jsx, Card.jsx, Icons.jsx
│   ├── pages/
│   │   ├── Home/             # Dashboard / Starter page
│   │   └── PlaceholderPage   # Route placeholders
│   ├── App.jsx               # Main router assembly
│   ├── index.css             # Tailwind base directives & typography imports
│   └── main.jsx              # DOM entry point
├── index.html                # LexWeb Admin title & tab icon configuration
├── package.json              # Project dependencies & scripts
└── tailwind.config.js        # LexMeet brand color & font tokens
```
