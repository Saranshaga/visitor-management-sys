# Visitor Management System - Project Structure

## 📁 Complete Project Structure

```
visitor-management-system/
├── 📁 public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── AdminDashboard.tsx      # Main admin dashboard component
│   │   ├── CheckInOut.tsx          # Visitor check-in/out functionality
│   │   ├── HostManagement.tsx      # Host management interface
│   │   ├── Reports.tsx             # Reporting and analytics
│   │   ├── VisitorForm.tsx         # New visitor registration form
│   │   ├── VisitorTable.tsx        # Visitor listing and management
│   │   └── 📁 ui/                  # Reusable UI components (shadcn)
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       └── use-toast.ts
│   │
│   ├── 📁 hooks/
│   │   ├── use-mobile.tsx          # Mobile device detection hook
│   │   └── use-toast.ts            # Toast notification hook
│   │
│   ├── 📁 lib/
│   │   └── utils.ts                # Utility functions (cn, etc.)
│   │
│   ├── 📁 pages/
│   │   ├── Index.tsx               # Main application page
│   │   └── NotFound.tsx            # 404 error page
│   │
│   ├── 📁 services/
│   │   └── VisitorService.ts       # Data service layer (currently mock data)
│   │
│   ├── 📁 types/
│   │   └── vms.ts                  # TypeScript type definitions
│   │
│   ├── App.css                     # Application styles
│   ├── App.tsx                     # Root component with routing
│   ├── index.css                   # Global styles and design tokens
│   ├── main.tsx                    # Application entry point
│   └── vite-env.d.ts              # Vite environment types
│
├── 📁 Configuration Files/
│   ├── .gitignore                  # Git ignore rules
│   ├── bun.lockb                   # Bun package lock file
│   ├── components.json             # shadcn component configuration
│   ├── eslint.config.js            # ESLint configuration
│   ├── index.html                  # HTML entry point
│   ├── package.json                # NPM dependencies and scripts
│   ├── package-lock.json           # NPM lock file
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tailwind.config.ts          # Tailwind CSS configuration
│   ├── tsconfig.app.json           # TypeScript config for app
│   ├── tsconfig.json               # Main TypeScript configuration
│   ├── tsconfig.node.json          # TypeScript config for Node
│   └── vite.config.ts              # Vite build configuration
│
├── 📁 Documentation/
│   ├── README.md                   # Project documentation
│   ├── PROJECT_REPORT_HR.md        # HR project report
│   ├── PROJECT_STRUCTURE.md        # This file - project structure
│   └── BACKEND                     # Backend API documentation
│
└── 📁 Database Models & SQL/
    ├── models/                     # Database models (to be created)
    └── sql/                        # SQL scripts (to be created)
```

## 🎯 Key Components Overview

### Frontend Components
- **AdminDashboard**: Main dashboard with navigation and statistics
- **VisitorForm**: Registration form for new visitors
- **VisitorTable**: List and manage existing visitors
- **CheckInOut**: Handle visitor check-in and check-out processes
- **HostManagement**: Manage company hosts/employees
- **Reports**: Generate and view visitor reports

### Core Services
- **VisitorService**: Data management service (currently mock, ready for API integration)

### Type Definitions
- **vms.ts**: Complete type definitions for Visitor, Host, Visit entities

## 🗃️ Current Data Flow
1. **Frontend** → VisitorService (mock data)
2. **Ready for** → VisitorService → REST API → SQL Database

## 📊 Statistics
- **Total Files**: 65+
- **Components**: 42 UI components + 6 business components
- **Services**: 1 data service
- **Pages**: 2 main pages
- **Configuration Files**: 12
- **Documentation Files**: 4