import { Calendar, Briefcase } from "lucide-react";
import { type JobApplication, statusLabels } from "@/lib/data";

interface CalendarViewProps {
  applications: JobApplication[];
}

export function CalendarView({ applications }: CalendarViewProps) {
  const sortedByDate = [...applications].sort(
    (a, b) => new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
  );

  if (sortedByDate.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <p className="font-heading text-lg font-semibold text-foreground">No applications yet</p>
          <p className="text-sm text-muted-foreground">Add your first application to populate the timeline.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl font-semibold text-foreground">Calendar</h2>
        <p className="text-sm text-muted-foreground mt-1">Timeline by application date.</p>
      </div>

      <div className="space-y-2">
        {sortedByDate.map((app) => (
          <div key={app.id} className="rounded-lg border border-border bg-card p-4 flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Calendar className="h-4 w-4 text-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{app.position}</p>
              <p className="text-sm text-muted-foreground truncate">{app.company}</p>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" />
                <span>{statusLabels[app.status]}</span>
                <span>•</span>
                <span>{new Date(app.dateApplied).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}