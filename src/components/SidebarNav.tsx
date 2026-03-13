import { Briefcase, LayoutDashboard, Calendar, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  activeView: string;
  onViewChange: (view: string) => void;
  collapsed: boolean;
  onToggle: () => void;
  onAddNew: () => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "applications", label: "Applications", icon: Briefcase },
  { id: "calendar", label: "Calendar", icon: Calendar },
];

export function SidebarNav({ activeView, onViewChange, collapsed, onToggle, onAddNew }: SidebarNavProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h1 className="text-lg font-heading font-semibold text-foreground">JobTrack</h1>}
        <Button variant="ghost" size="icon" onClick={onToggle} className="ml-auto">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="px-3 mb-4">
        <Button onClick={onAddNew} className="w-full gap-2" size={collapsed ? "icon" : "default"}>
          <Plus className="h-4 w-4" />
          {!collapsed && "Add Job"}
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              activeView === item.id
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
