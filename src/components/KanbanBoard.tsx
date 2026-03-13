import { type ApplicationStatus, statusLabels, type JobApplication } from "@/lib/data";
import { ApplicationCard } from "@/components/ApplicationCard";

interface KanbanBoardProps {
  applications: JobApplication[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const columns: ApplicationStatus[] = ["saved", "applied", "interviewing", "offer", "rejected"];

export function KanbanBoard({ applications, selectedId, onSelect }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full">
      {columns.map((status) => {
        const items = applications.filter((a) => a.status === status);
        return (
          <div key={status} className="min-w-[260px] flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-3 px-1">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: `hsl(var(--status-${status}))` }}
              />
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {statusLabels[status]}
              </h3>
              <span className="text-xs text-muted-foreground ml-auto">{items.length}</span>
            </div>
            <div className="space-y-2 flex-1 bg-muted/30 rounded-lg p-2">
              {items.map((app) => (
                <ApplicationCard
                  key={app.id}
                  application={app}
                  isSelected={selectedId === app.id}
                  onClick={() => onSelect(app.id)}
                />
              ))}
              {items.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-8">No applications</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
