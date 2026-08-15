import { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { proposals, PDF_BASE, type Proposal } from "@/data/proposals";
import { cn } from "@/lib/utils";

type FilterKey =
  | "all"
  | "structural"
  | "passed"
  | "rejected"
  | "closed"
  | "notapplied";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "structural", label: "Structural (15)" },
  { key: "passed", label: "Passed" },
  { key: "rejected", label: "Rejected" },
  { key: "closed", label: "Closed/Election" },
  { key: "notapplied", label: "Not Applied" },
];

function matches(p: Proposal, f: FilterKey) {
  switch (f) {
    case "structural":
      return p.structural;
    case "passed":
      return p.outcome === "Passed";
    case "rejected":
      return p.outcome === "Rejected";
    case "closed":
      return p.outcome === "Closed" || p.result.startsWith("Closed on Snapshot");
    case "notapplied":
      return p.appliedKind === "Disputed" || p.appliedKind === "No";
    default:
      return true;
  }
}

function ResultTag({ p }: { p: Proposal }) {
  const dot =
    p.outcome === "Passed"
      ? "bg-ok"
      : p.outcome === "Rejected"
        ? "bg-neutral-dot"
        : "bg-warn";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={cn("inline-block size-2 shrink-0 rounded-full", dot)}
        aria-hidden="true"
      />
      <span className="label-mono uppercase">{p.outcome}</span>
    </span>
  );
}

function AppliedTag({ p }: { p: Proposal }) {
  const flagged = p.appliedKind === "Disputed" || p.appliedKind === "No";
  return (
    <span
      className={cn(
        "text-xs",
        flagged ? "font-semibold text-destructive" : "text-muted-foreground",
      )}
    >
      {p.applied}
    </span>
  );
}

function DetailLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-[4px] border border-border bg-transparent px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-link hover:text-link"
    >
      {children}
    </a>
  );
}


export function ChangelogTable() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Proposal | null>(null);

  const rows = useMemo(
    () =>
      proposals.filter(
        (p) =>
          matches(p, filter) &&
          p.title.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [filter, query],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-[4px] border px-3 py-1.5 label-mono uppercase transition-colors",
              filter === f.key
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by title"
          aria-label="Filter by title"
          className="ml-auto w-full rounded-[4px] border border-border bg-transparent px-3 py-1.5 text-xs outline-none placeholder:text-muted-foreground focus:border-foreground sm:w-56"
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Showing {rows.length} of 30 proposals. Rows marked with a navy dot are
        the 15 structural proposals.
      </p>

      {/* Desktop table */}
      <div className="mt-4 hidden overflow-x-auto border border-foreground md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-foreground text-background">
              <th className="px-3 py-2 font-medium">#</th>
              <th className="px-3 py-2 font-medium">Date</th>
              <th className="px-3 py-2 font-medium">Title</th>
              <th className="px-3 py-2 font-medium">Result</th>
              <th className="px-3 py-2 font-medium">Constitution Section</th>
              <th className="px-3 py-2 font-medium">Applied</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr
                key={p.n}
                tabIndex={0}
                onClick={() => setActive(p)}
                onKeyDown={(e) => e.key === "Enter" && setActive(p)}
                className="cursor-pointer border-t border-border align-top outline-none hover:bg-secondary focus:bg-secondary"
              >
                <td className="whitespace-nowrap px-3 py-2 label-mono tabular-nums">
                  <span className="inline-flex items-center gap-2">
                    {p.structural ? (
                      <span
                        className="inline-block size-1.5 rounded-full bg-foreground"
                        aria-label="Structural proposal"
                      />
                    ) : (
                      <span className="inline-block size-1.5" />
                    )}
                    {p.n}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-2 label-mono text-muted-foreground">
                  {p.date}
                </td>
                <td className="max-w-[22rem] px-3 py-2 font-medium">
                  {p.title}
                </td>
                <td className="px-3 py-2">
                  <ResultTag p={p} />
                </td>
                <td className="max-w-[16rem] px-3 py-2 label-mono text-muted-foreground">
                  {p.section}
                </td>
                <td className="px-3 py-2">
                  <AppliedTag p={p} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="mt-4 space-y-2 md:hidden">
        {rows.map((p) => (
          <button
            key={p.n}
            onClick={() => setActive(p)}
            className="block w-full rounded-[8px] border border-border bg-card p-3 text-left hover:border-foreground"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 label-mono tabular-nums text-muted-foreground">
                {p.structural && (
                  <span className="inline-block size-1.5 rounded-full bg-foreground" />
                )}
                #{p.n} · {p.date}
              </span>
              <ResultTag p={p} />
            </div>
            <p className="mt-1.5 text-sm font-medium">{p.title}</p>
            <p className="mt-1 label-mono text-muted-foreground">{p.section}</p>
            <p className="mt-1">
              <AppliedTag p={p} />
            </p>
          </button>
        ))}
      </div>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto bg-background sm:max-w-lg">
          {active && (
            <>
              <SheetHeader className="border-b border-border pb-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Proposal #{active.n} · {active.date}
                  {active.structural ? " · Structural" : ""}
                </p>
                <SheetTitle className="font-[family-name:var(--font-display)] text-xl leading-snug">
                  {active.title}
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Detail record for proposal {active.n}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-5 px-4 pb-8 text-sm">
                <section>
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                    Result
                  </h4>
                  <p className="mt-1">{active.result}</p>
                </section>

                <section>
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                    Constitution mapping
                  </h4>
                  <p className="mt-1">{active.section}</p>
                  {active.note && (
                    <p className="mt-2 text-muted-foreground">{active.note}</p>
                  )}
                </section>

                <section>
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                    Applied
                  </h4>
                  <p
                    className={cn(
                      "mt-1",
                      (active.appliedKind === "Disputed" ||
                        active.appliedKind === "No") &&
                        "font-semibold text-destructive",
                    )}
                  >
                    {active.applied}
                  </p>
                </section>

                <section className="border-t border-border pt-4">
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                    Primary records
                  </h4>
                  <div className="mt-2 flex flex-col gap-2">
                    <DetailLink href={`${PDF_BASE}/${active.n}.pdf`}>
                      View Proposal Overview (PDF)
                    </DetailLink>
                    <DetailLink href={`${PDF_BASE}/${active.n}voted.pdf`}>
                      View Full Vote Breakdown (PDF)
                    </DetailLink>
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-link underline underline-offset-4"
                    >
                      Open live Snapshot page
                    </a>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    The vote-breakdown PDF is the per-voter export listing each
                    voter wallet and its RBNT voting power.
                  </p>
                </section>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
