import { MapPin, DollarSign, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type JobApplication, statusLabels } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  application: JobApplication;
  isSelected: boolean;
  onClick: () => void;
}

export function ApplicationCard({ application, isSelected, onClick }: ApplicationCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all duration-150",
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
        <Badge variant={application.status}>{statusLabels[application.status]}</Badge>
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
