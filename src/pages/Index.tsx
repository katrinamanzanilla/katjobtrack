import { useState } from "react";
import { SidebarNav } from "@/components/SidebarNav";
import { KanbanBoard } from "@/components/KanbanBoard";
import { DetailPanel } from "@/components/DetailPanel";
import { DashboardView } from "@/components/DashboardView";
import { AddJobDialog } from "@/components/AddJobDialog";
import { CalendarView } from "@/components/CalendarView";
import { sampleApplications, type JobApplication, type ApplicationStatus } from "@/lib/data";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [applications, setApplications] = useState<JobApplication[]>(sampleApplications);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState("applications");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedApp = applications.find((a) => a.id === selectedId) ?? null;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredApps = applications.filter((a) => {
    if (!normalizedQuery) return true;

    return (
      a.company.toLowerCase().includes(normalizedQuery) ||
      a.position.toLowerCase().includes(normalizedQuery) ||
      a.location.toLowerCase().includes(normalizedQuery)
    );
  });

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleAddJob = (app: JobApplication) => {
    setApplications((prev) => [app, ...prev]);
    setShowAddDialog(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SidebarNav
        activeView={activeView}
        onViewChange={setActiveView}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onAddNew={() => setShowAddDialog(true)}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center gap-4 px-6 py-4 border-b border-border">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <p className="text-sm text-muted-foreground ml-auto">
            {applications.length} application{applications.length !== 1 && "s"}
          </p>
        </header>

        <div className="flex-1 overflow-auto p-6">
          {activeView === "dashboard" && <DashboardView applications={filteredApps} />}
          {activeView === "applications" && (
            <KanbanBoard
              applications={filteredApps}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onDelete={handleDelete}
            />
          )}
                    {activeView === "calendar" && <CalendarView applications={filteredApps} />}
        </div>
      </main>

      {selectedApp && (
        <DetailPanel
          application={selectedApp}
          onClose={() => setSelectedId(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {showAddDialog && (
        <AddJobDialog onAdd={handleAddJob} onClose={() => setShowAddDialog(false)} />
      )}
    </div>
  );
};

export default Index;
