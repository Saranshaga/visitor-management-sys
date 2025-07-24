import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Folder, FileText, Database, Code, Download } from "lucide-react";

export const ProjectStructure = () => {
  const downloadStructure = () => {
    const structureData = `
# Visitor Management System - Complete Project Structure

## 📁 Frontend Structure (React + TypeScript)
\`\`\`
src/
├── components/           # Business components
│   ├── AdminDashboard.tsx
│   ├── CheckInOut.tsx
│   ├── HostManagement.tsx
│   ├── Reports.tsx
│   ├── VisitorForm.tsx
│   ├── VisitorTable.tsx
│   └── ui/              # 42 UI components (shadcn)
├── models/              # Data models
│   ├── VisitorModel.ts
│   ├── HostModel.ts
│   └── VisitModel.ts
├── services/
│   └── VisitorService.ts
├── types/
│   └── vms.ts
├── hooks/
├── lib/
└── pages/
\`\`\`

## 🗄️ Database Structure (SQL Server)
\`\`\`
database/
├── sql/
│   ├── 01_create_tables.sql
│   ├── 02_insert_sample_data.sql
│   └── 03_views_and_procedures.sql
└── models/
    ├── VisitorModel (C#)
    ├── HostModel (C#)
    └── VisitModel (C#)
\`\`\`

## 📊 Key Statistics
- Total Files: 65+
- React Components: 48
- Database Tables: 3
- SQL Views: 3
- Stored Procedures: 3
- TypeScript Models: 3

## 🔗 Technology Stack
- Frontend: React 18 + TypeScript + Vite
- UI Framework: shadcn/ui + Tailwind CSS
- Backend Ready: C# ASP.NET Core Web API
- Database: SQL Server with Entity Framework
- State Management: React Query
- Form Validation: React Hook Form + Zod
`;

    const blob = new Blob([structureData], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project-structure.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const folders = [
    { name: "Components", count: 48, icon: <Code className="h-4 w-4" />, type: "React Components" },
    { name: "Models", count: 3, icon: <Database className="h-4 w-4" />, type: "Data Models" },
    { name: "Services", count: 1, icon: <FileText className="h-4 w-4" />, type: "API Services" },
    { name: "Database", count: 3, icon: <Database className="h-4 w-4" />, type: "SQL Tables" },
    { name: "Views", count: 3, icon: <FileText className="h-4 w-4" />, type: "SQL Views" },
    { name: "Procedures", count: 3, icon: <FileText className="h-4 w-4" />, type: "Stored Procedures" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Project Structure Overview</h2>
          <p className="text-muted-foreground">Complete file and folder organization</p>
        </div>
        <Button onClick={downloadStructure} className="gap-2">
          <Download className="h-4 w-4" />
          Download Structure
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {folders.map((folder, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-lg">{folder.name}</CardTitle>
              </div>
              <CardDescription>{folder.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {folder.icon}
                  <span className="text-sm text-muted-foreground">Files</span>
                </div>
                <Badge variant="secondary">{folder.count}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Frontend Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>React Components</span>
              <Badge>48</Badge>
            </div>
            <div className="flex justify-between">
              <span>TypeScript Files</span>
              <Badge>65+</Badge>
            </div>
            <div className="flex justify-between">
              <span>UI Components (shadcn)</span>
              <Badge>42</Badge>
            </div>
            <div className="flex justify-between">
              <span>Business Components</span>
              <Badge>6</Badge>
            </div>
            <div className="flex justify-between">
              <span>Pages</span>
              <Badge>2</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Database Tables</span>
              <Badge>3</Badge>
            </div>
            <div className="flex justify-between">
              <span>SQL Views</span>
              <Badge>3</Badge>
            </div>
            <div className="flex justify-between">
              <span>Stored Procedures</span>
              <Badge>3</Badge>
            </div>
            <div className="flex justify-between">
              <span>Indexes</span>
              <Badge>7</Badge>
            </div>
            <div className="flex justify-between">
              <span>Sample Records</span>
              <Badge>25+</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
          <CardDescription>Complete technology overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Badge variant="outline" className="mb-2">Frontend</Badge>
              <div className="text-sm space-y-1">
                <div>React 18</div>
                <div>TypeScript</div>
                <div>Vite</div>
                <div>Tailwind CSS</div>
              </div>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="mb-2">UI/UX</Badge>
              <div className="text-sm space-y-1">
                <div>shadcn/ui</div>
                <div>Lucide Icons</div>
                <div>Responsive Design</div>
                <div>Dark Mode</div>
              </div>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="mb-2">Backend Ready</Badge>
              <div className="text-sm space-y-1">
                <div>C# ASP.NET Core</div>
                <div>Entity Framework</div>
                <div>REST API</div>
                <div>CORS Enabled</div>
              </div>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="mb-2">Database</Badge>
              <div className="text-sm space-y-1">
                <div>SQL Server</div>
                <div>Normalized Schema</div>
                <div>Indexed Tables</div>
                <div>Sample Data</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};