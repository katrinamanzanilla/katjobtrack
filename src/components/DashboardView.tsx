import { type JobApplication, type ApplicationStatus, statusLabels } from "@/lib/data";
import { Briefcase, CheckCircle, Clock, Star, XCircle } from "lucide-react";

interface DashboardViewProps {
  applications: JobApplication[];
}

const statusIcons: Record<ApplicationStatus, React.ElementType> = {
  saved: Star,
  applied: Briefcase,
  interviewing: Clock,
  offer: CheckCircle,
  rejected: XCircle,
};

export function DashboardView({ applications }: DashboardViewProps) {
  const counts: Record<ApplicationStatus, number> = {
    saved: 0,
    applied: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
  };
  applications.forEach((a) => counts[a.status]++);

  const statuses: ApplicationStatus[] = ["saved", "applied", "interviewing", "offer", "rejected"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground mt-1">Overview of your job search progress</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {statuses.map((status) => {
          const Icon = statusIcons[status];
          return (
            <div
              key={status}
              className="rounded-lg border border-border bg-card p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `hsl(var(--status-${status}) / 0.3)` }}
                >
                  <Icon className="h-4 w-4 text-foreground" />
                </div>
              </div>
              <p className="text-2xl font-heading font-bold text-foreground">{counts[status]}</p>
              <p className="text-xs text-muted-foreground">{statusLabels[status]}</p>
            </div>
          );
        })}
      </div>

      <div>
        <h3 className="font-heading text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
        <div className="space-y-2">
          {applications
            .sort((a, b) => new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime())
            .slice(0, 5)
            .map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: `hsl(var(--status-${app.status}))` }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{app.position}</p>
                  <p className="text-xs text-muted-foreground">{app.company}</p>
                </div>
                <p className="text-xs text-muted-foreground shrink-0">
                  {new Date(app.dateApplied).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
