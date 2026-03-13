import { MapPin, DollarSign, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type JobApplication, statusLabels } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  application: JobApplication;
  isSelected: boolean;
  onClick: () => void;
  onDelete: (id: string) => void;
}

export function ApplicationCard({ application, isSelected, onClick, onDelete }: ApplicationCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group w-full text-left p-4 rounded-lg border transition-all duration-150",
        isSelected
          ? "border-primary bg-secondary/50"
          : "border-border bg-card hover:border-primary/40"
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground">{application.position}</h3>
          <p className="text-sm text-muted-foreground">{application.company}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onDelete(application.id); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); onDelete(application.id); } }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </span>
          <Badge variant={application.status}>{statusLabels[application.status]}</Badge>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {application.location}
        </span>
        {application.salary && (
          <span className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            {application.salary}
          </span>
        )}
      </div>
    </button>
  );
}
