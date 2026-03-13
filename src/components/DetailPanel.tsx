import { X, MapPin, DollarSign, Calendar, ExternalLink, StickyNote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type JobApplication, type ApplicationStatus, statusLabels } from "@/lib/data";

interface DetailPanelProps {
  application: JobApplication;
  onClose: () => void;
  onStatusChange: (id: string, status: ApplicationStatus) => void;
}

const allStatuses: ApplicationStatus[] = ["saved", "applied", "interviewing", "offer", "rejected"];

export function DetailPanel({ application, onClose, onStatusChange }: DetailPanelProps) {
  return (
    <div className="w-80 border-l border-border bg-card animate-slide-in-right flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-heading font-semibold text-foreground">Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">{application.position}</h3>
          <p className="text-sm text-muted-foreground">{application.company}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {application.location}
          </div>
          {application.salary && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              {application.salary}
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(application.dateApplied).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Status</p>
          <div className="flex flex-wrap gap-1.5">
            {allStatuses.map((status) => (
              <button
                key={status}
                onClick={() => onStatusChange(application.id, status)}
                className="focus:outline-none"
              >
                <Badge
                  variant={status}
                  className={
                    application.status === status
                      ? "ring-2 ring-ring ring-offset-1"
                      : "opacity-50 hover:opacity-80"
                  }
                >
                  {statusLabels[status]}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {application.notes && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Notes</p>
            <div className="flex items-start gap-2 bg-accent/40 p-3 rounded-lg">
              <StickyNote className="h-4 w-4 text-accent-foreground mt-0.5 shrink-0" />
              <p className="text-sm text-foreground">{application.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
