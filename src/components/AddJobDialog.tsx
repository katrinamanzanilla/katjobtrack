import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type JobApplication } from "@/lib/data";

interface AddJobDialogProps {
  onAdd: (app: JobApplication) => void;
  onClose: () => void;
}

export function AddJobDialog({ onAdd, onClose }: AddJobDialogProps) {
  const [form, setForm] = useState({
    company: "",
    position: "",
    location: "",
    salary: "",
    notes: "",
    url: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.position) return;
    onAdd({
      id: Date.now().toString(),
      company: form.company,
      position: form.position,
      location: form.location || "Remote",
      status: "saved",
      dateApplied: new Date().toISOString().split("T")[0],
      salary: form.salary || undefined,
      notes: form.notes || undefined,
      url: form.url || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 animate-fade-in">
      <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md shadow-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-foreground">Add New Application</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Company name *"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <Input
            placeholder="Position *"
            value={form.position}
            onChange={(e) => setForm({ ...form, position: e.target.value })}
          />
          <Input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <Input
            placeholder="Salary range"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
          <Input
            placeholder="Notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
                <Input
            type="url"
            placeholder="Job posting URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
