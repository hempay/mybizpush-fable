import { useEffect, useMemo, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useToast } from "@/lib/toast";
import { useScrollTriggerRefresh } from "@/lib/anim";

interface ConsultationRequest {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  timestamp: string;
  status: "new" | "contacted" | "completed";
}

type Status = ConsultationRequest["status"];
type Filter = "all" | Status;

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-volt/20 text-volt border-volt/40",
  contacted: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",
  completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40",
};

export default function AdminConsultations() {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const { toast } = useToast();
  useScrollTriggerRefresh();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("consultationRequests");
      if (stored) setRequests(JSON.parse(stored));
    } catch (error) {
      console.error("Error loading consultation requests:", error);
      toast({
        title: "Error loading requests",
        description: "Failed to load consultation requests from storage.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const persist = (updated: ConsultationRequest[]) => {
    setRequests(updated);
    localStorage.setItem("consultationRequests", JSON.stringify(updated));
  };

  const updateStatus = (id: string, status: Status) => {
    persist(requests.map((r) => (r.id === id ? { ...r, status } : r)));
    toast({ title: "Status updated", description: `Request status changed to ${status}.` });
  };

  const remove = (id: string) => {
    persist(requests.filter((r) => r.id !== id));
    toast({ title: "Request deleted", description: "Consultation request has been deleted." });
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(requests, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `consultation-requests-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: "Data downloaded", description: "Consultation requests exported successfully." });
  };

  const counts = useMemo(
    () => ({
      all: requests.length,
      new: requests.filter((r) => r.status === "new").length,
      contacted: requests.filter((r) => r.status === "contacted").length,
      completed: requests.filter((r) => r.status === "completed").length,
    }),
    [requests]
  );

  const visible =
    filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const formatDate = (timestamp: string) =>
    new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="bg-ink min-h-screen">
      <Nav />
      <main className="pt-36 sm:pt-44 pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-body text-xs tracking-[0.35em] uppercase text-magenta mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-magenta/50 inline-block" />
                Admin
              </p>
              <h1 className="font-display font-extrabold text-bone tracking-tight text-4xl sm:text-6xl mb-3">
                Consultation Requests
              </h1>
              <p className="text-ash">
                Manage and track consultation requests from your website.
              </p>
            </div>
            <button
              onClick={exportData}
              className="btn-solid rounded-full px-7 py-3 font-display font-bold text-sm text-bone hover:opacity-90 transition-opacity"
            >
              ↓ Export Data
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-10">
            {(["all", "new", "contacted", "completed"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 font-body text-sm capitalize transition-all duration-300 border ${
                  filter === f
                    ? "btn-solid border-transparent text-bone"
                    : "border-bone/15 text-ash hover:border-magenta/50 hover:text-bone"
                }`}
              >
                {f} ({counts[f]})
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <div className="border border-bone/10 rounded-2xl bg-ink-2/50 p-16 text-center">
              <p className="font-display font-bold text-bone text-xl mb-2">
                No consultation requests
              </p>
              <p className="text-ash text-sm">
                {filter === "all"
                  ? "No consultation requests have been submitted yet."
                  : `No requests with "${filter}" status.`}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {visible.map((r) => (
                <article
                  key={r.id}
                  className="border border-bone/10 rounded-2xl bg-ink-2/50 p-6 sm:p-8"
                >
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
                    <div>
                      <h2 className="font-display font-bold text-bone text-xl mb-1.5">
                        {r.fullName}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-ash">
                        <span>{formatDate(r.timestamp)}</span>
                        <span
                          className={`border rounded-full px-3 py-0.5 capitalize ${STATUS_STYLES[r.status]}`}
                        >
                          {r.status}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => remove(r.id)}
                      className="text-red-400/80 hover:text-red-400 text-xs font-body tracking-widest uppercase transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm mb-5">
                    <a href={`mailto:${r.email}`} className="text-magenta hover:underline">
                      {r.email}
                    </a>
                    <a href={`tel:${r.phoneNumber}`} className="text-magenta hover:underline">
                      {r.phoneNumber}
                    </a>
                  </div>

                  <p className="text-ash text-sm leading-relaxed bg-ink rounded-xl border border-bone/5 p-4 mb-6">
                    {r.message}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(["new", "contacted", "completed"] as Status[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(r.id, s)}
                        className={`rounded-full px-4 py-1.5 text-xs font-body capitalize transition-all border ${
                          r.status === s
                            ? "btn-solid border-transparent text-bone"
                            : "border-bone/15 text-ash hover:border-magenta/50 hover:text-bone"
                        }`}
                      >
                        Mark as {s}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
