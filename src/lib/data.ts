export type ApplicationStatus = "saved" | "applied" | "interviewing" | "offer" | "rejected";

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  status: ApplicationStatus;
  dateApplied: string;
  salary?: string;
  notes?: string;
  url?: string;
}

export const statusLabels: Record<ApplicationStatus, string> = {
  saved: "Saved",
  applied: "Applied",
  interviewing: "Interviewing",
  offer: "Offer",
  rejected: "Rejected",
};

export const sampleApplications: JobApplication[] = [
  {
    id: "1",
    company: "Stripe",
    position: "Frontend Engineer",
    location: "San Francisco, CA",
    status: "interviewing",
    dateApplied: "2026-03-01",
    salary: "$150k - $180k",
    notes: "Had first round, waiting for second.",
  },
  {
    id: "2",
    company: "Notion",
    position: "Full Stack Developer",
    location: "Remote",
    status: "applied",
    dateApplied: "2026-03-05",
    salary: "$130k - $160k",
  },
  {
    id: "3",
    company: "Linear",
    position: "Product Designer",
    location: "Remote",
    status: "offer",
    dateApplied: "2026-02-20",
    salary: "$140k - $165k",
    notes: "Offer received! Deadline March 20.",
  },
  {
    id: "4",
    company: "Vercel",
    position: "Software Engineer",
    location: "Remote",
    status: "saved",
    dateApplied: "2026-03-10",
  },
  {
    id: "5",
    company: "Figma",
    position: "UI Engineer",
    location: "New York, NY",
    status: "rejected",
    dateApplied: "2026-02-15",
    salary: "$145k - $175k",
    notes: "Didn't pass the design challenge.",
  },
  {
    id: "6",
    company: "Airbnb",
    position: "React Developer",
    location: "San Francisco, CA",
    status: "applied",
    dateApplied: "2026-03-08",
    salary: "$160k - $200k",
  },
  {
    id: "7",
    company: "Shopify",
    position: "Senior Frontend Dev",
    location: "Remote",
    status: "interviewing",
    dateApplied: "2026-02-28",
    salary: "$155k - $185k",
    notes: "Technical interview scheduled for March 15.",
  },
];
