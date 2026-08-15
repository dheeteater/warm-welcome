import { createFileRoute } from "@tanstack/react-router";
import { ChangelogTable } from "@/components/ChangelogTable";
import { ScrollToTop } from "@/components/ScrollToTop";

const LOGO_DARK =
  "https://cdn.jsdelivr.net/gh/poundeater/23@main/website/dao-logo-on-dark.png";
const PDF_REPORT =
  "https://cdn.jsdelivr.net/gh/poundeater/23@main/website/Redbelly-DAO-Governance-Changelog.pdf";
const DOCS_VIEWER =
  "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/poundeater/23/main/website/Redbelly-DAO-Governance-Changelog.docx&embedded=true";
const GITHUB = "https://github.com/poundeater/23";
const DEVTO_ARTICLE =
  "https://dev.to/poundeater/redbelly-community-dao-what-is-actually-in-force-right-now-published-false-tags-dao-governance-49i9";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Redbelly DAO Governance Changelog" },
      {
        name: "description",
        content:
          "Verification dossier of Redbelly Community DAO structural changes: 30 Snapshot proposals, 15 structural, sourced to primary vote records.",
      },
      { property: "og:title", content: "Redbelly DAO Governance Changelog" },
      {
        property: "og:description",
        content:
          "The single reference for what is currently in force in the Redbelly Community DAO, 3 Sep 2025 to 24 Jul 2026.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: LOGO_DARK },
      { name: "twitter:image", content: LOGO_DARK },
    ],
    links: [{ rel: "icon", type: "image/png", href: LOGO_DARK }],
  }),
  component: Index,
});

function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-foreground/20 py-10">
      <p className="label-caps text-muted-foreground">{index}</p>
      <h2 className="headline-lg mt-2">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function ExternalButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: string;
  variant?: "primary" | "ghost";
}) {
  const base =
    "inline-flex flex-1 items-center justify-center rounded-[4px] px-5 py-3 text-sm font-medium tracking-wide transition-colors";
  const style =
    variant === "primary"
      ? "bg-accent-red text-accent-foreground hover:bg-accent-red/90"
      : "border border-border bg-transparent text-foreground hover:border-link hover:text-link";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${style}`}
    >
      {children}
    </a>
  );
}


function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-background/80 transition-colors hover:text-background"
    >
      <span aria-hidden="true">{children}</span>
      <span>{label}</span>
    </a>
  );
}

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-foreground text-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <img
            src={LOGO_DARK}
            alt="Redbelly DAO Task Board logo"
            className="h-9 w-auto"
          />
          <p className="text-xs uppercase tracking-[0.2em] text-background/70">
            Governance record
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        {/* 1. Hero */}
        <section className="py-12">
          <h1 className="headline-xl max-w-3xl">
            Redbelly DAO Governance Changelog
          </h1>
          <p className="body-lg mt-4 max-w-2xl text-foreground/80">
            The single reference for what is currently in force. Every entry
            sourced to a primary vote, poll, or proposal record.
          </p>
          <div className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
            <ExternalButton href={PDF_REPORT}>
              Read Full PDF Report
            </ExternalButton>
            <ExternalButton href={DOCS_VIEWER} variant="ghost">
              Read Full Docs
            </ExternalButton>
            <ExternalButton href={DEVTO_ARTICLE} variant="ghost">
              Read Full Article
            </ExternalButton>
          </div>
          <p className="label-mono mt-6 text-muted-foreground">
            Covers 3 Sep 2025 to 24 Jul 2026. 30 Snapshot proposals reviewed, 15
            structural.
          </p>

        </section>

        {/* 2. Current state */}
        <Section id="current-state" index="Section 01" title="Current-State Summary">
          <div className="border border-border bg-card p-5 sm:p-7 rounded-[8px]">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              As of publication
            </p>
            <ul className="body-md mt-4 space-y-4">
              <li>
                <span className="font-semibold">Governing documents.</span>{" "}
                Redbelly Community DAO operates under two ratified governing
                documents: Constitution v1.2 (ratified via Snapshot proposal #2,
                20 Sep 2025, 100% For, 1.8m RBNT voted) and Code of Conduct v1.0
                (ratified via Snapshot proposal #9, 6 Oct 2025, 92.97% For).
              </li>
              <li>
                <span className="font-semibold">Proposal record.</span> Of 30
                Snapshot proposals on record, 18 passed, 6 were rejected, 6
                closed without a Snapshot-assigned pass/reject label (elections
                plus a small set where the Discord announcement supplied the
                final call rather than Snapshot's own UI).
              </li>
              <li>
                <span className="font-semibold">Voting duration.</span> 5 days
                for standard proposals (since the Oct 2025 Snapshot Voting
                Duration proposal), 3 days for elections, which is an unwritten
                convention nowhere in the ratified constitution text.
              </li>
              <li>
                <span className="font-semibold">Voter eligibility.</span> The
                general-member voting whitelist and geographic restriction were
                both removed by the Jun 2026 proposal "Increase Governance
                Accessibility and Protect Contributor Privacy." Geographic
                limits remain only for High Council and DAO Leadership.
                Constitution v1.2 predates this change entirely and still
                describes the old restricted eligibility.
              </li>
              <li>
                <span className="font-semibold">Leadership structure.</span> Set
                by "Amendment to Leadership Structure" (Jul 2026) and the High
                Council Elections that closed the same month, superseding both
                Constitution Section 2 and the Nov 2025 Leadership document.
              </li>
            </ul>
            <p className="mt-5 border-t border-foreground/30 pt-4 text-sm font-semibold text-destructive">
              Constitution v1.2, dated Sep 2025, has NOT been re-ratified and is
              behind current practice on voting duration, voter eligibility, and
              leadership structure. The proposals listed above are what is
              actually in force, not the ratified text.
            </p>
          </div>
        </Section>

        {/* 3. Verification flag */}
        <Section id="verification-flag" index="Section 02" title="Verification Flag">
          <div className="border border-border border-l-4 border-l-destructive bg-card p-5 rounded-[8px]">
            <h3 className="text-base font-semibold text-destructive">
              Open discrepancy - whitelist removal, needs on-chain check before
              publishing as resolved
            </h3>
            <p className="body-md mt-3">
              Two conflicting claims exist for the same decision. Proposal #28,
              "DAO Proposal: Increase Governance Accessibility and Protect
              Contributor Privacy," passed and closed 5 Jul 2026, removing the
              general-member voting whitelist. One source concludes this was
              fully implemented. A separate check states both Snapshot proposals
              created after #28 still carry the whitelist voting strategy
              on-chain, meaning the change passed but was not applied in
              practice. This changelog does not pick a side. The strategy field
              on proposals #29 and #30 needs to be pulled directly from the
              Snapshot proposal JSON before this can be marked resolved either
              way.
            </p>
          </div>
        </Section>

        {/* 4. Changelog */}
        <Section
          id="changelog"
          index="Section 03"
          title="Chronological Changelog"
        >
          <ChangelogTable />
        </Section>

        {/* 5. Discord poll only */}
        <Section
          id="poll-only"
          index="Section 04"
          title="Discord Poll-Only Entry"
        >
          <div className="border border-dashed border-border bg-card p-5 rounded-[8px]">
            <p className="text-xs uppercase tracking-[0.2em] text-destructive">
              Poll-only, never reached Snapshot, unratified
            </p>
            <h3 className="mt-2 text-lg font-semibold">
              Quadratic Voting Adoption
            </h3>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Date
                </dt>
                <dd>1 Mar 2026, Discord poll</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Result
                </dt>
                <dd>Approved at 75%, announced as active by the DAO</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Constitution section
                </dt>
                <dd>
                  Section 2.3, Voting Power, would have changed RBNT-weighted
                  voting to quadratic
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs uppercase tracking-widest text-muted-foreground">
                  Applied
                </dt>
                <dd className="font-semibold text-destructive">
                  No. No proposal in the 30-item Snapshot archive uses quadratic
                  voting as a ballot type or as a strategy. Proposals created
                  after 1 Mar 2026 ran ordinary weighted ballots on unchanged
                  token-weighted voting power. This is a passed decision that
                  was never implemented.
                </dd>
              </div>
            </dl>
          </div>
        </Section>

        {/* 6. Resolved dispute */}
        <Section
          id="resolved-dispute"
          index="Section 05"
          title="Disputed Item, Resolved With Reasoning"
        >
          <div className="border border-border bg-card p-5 rounded-[8px]">
            <h3 className="text-base font-semibold">
              DAO Guild Structure, Consolidation - resolved: passed and
              implemented
            </h3>
            <p className="body-md mt-3">
              Proposal #5 closed 20 Sep 2025 with 42.95% For against a 56.71%
              Abstain plurality and 0.34% Against. On a strict
              majority-of-choices read this is ambiguous, since Abstain
              outpolled For. Reading resolved as passed and implemented for two
              reasons: first, Snapshot's own configured strategy assigned this
              proposal a Passed status, not a rejected or no-quorum status, so
              the DAO's own voting system counted Abstain as non-blocking rather
              than as a vote against. Second, Constitution Section 3, Working
              Groups (Pods), already reflects the consolidated five-pod
              structure this proposal describes, Marketing, Builder/Develop,
              Researcher, Community, Partnerships, with legacy substructures
              such as Scouts and Echo Rangers explicitly paused. The structure
              the proposal called for is the structure actually in place today.
              The high Abstain share means this passed on a simple majority of
              votes cast rather than a strong affirmative mandate, worth
              flagging for anyone treating it as high-confidence consensus, but
              the outcome itself is not in doubt.
            </p>
          </div>
        </Section>

        {/* 7 + 8 */}
        <Section
          id="open-items"
          index="Section 06"
          title="Unratified and Unresolved Items"
        >
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="border border-border bg-card p-5 rounded-[8px]">
              <h3 className="text-base font-semibold">
                Not a ratification event: Feb 2026 Google Form
              </h3>
              <p className="body-md mt-3">
                A Google Form titled "DAO Constitution Ratification, YES/NO
                Vote" ran 11 to 14 Feb 2026 with 9 to 10 respondents. This is
                not how the Constitution was ratified. The actual ratification
                is Snapshot proposal #2, closed 20 Sep 2025, matching the
                version-history line inside the Constitution document itself.
                The form used a self-defined 60% adoption threshold that appears
                nowhere in Constitution Section 9's amendment process, which
                requires 7-day notice and a 5-day token-weighted vote. Do not
                log this form's items as ratified constitutional changes.
              </p>
            </div>
            <div className="border border-border bg-card p-5 rounded-[8px]">
              <h3 className="text-base font-semibold">
                Unresolved: Constitution v1.3 reference with no located document
              </h3>
              <p className="body-md mt-3">
                Snapshot proposal #28 (Jul 2026) lists "Redbelly Community DAO
                Constitution v1.3" as a supporting document. No v1.3 file exists
                in the source repository or in the governing-resource links, all
                of which point to v1.2 as current. Either a v1.3 draft exists
                elsewhere and was not shared with this review, or the proposal
                referenced a document that had not been formally
                version-controlled under Section 9 at the time of the vote.
              </p>
            </div>
          </div>
        </Section>

        {/* 9. Data gaps */}
        <Section id="data-gaps" index="Section 07" title="Data Gaps">
          <ul className="body-md list-disc space-y-2 pl-5">
            <li>
              Exact vote-choice percentages were not available for proposals 12,
              13, 15, 16, 17, 25, 26, 27, 28, 29. Pass/reject is known from
              Snapshot's status label, margin is not, without re-export from
              Snapshot with the results sidebar visible.
            </li>
            <li>
              Day-level timestamps are confirmed for proposals 1 through 11 and
              30. Proposals 12 through 29 are known only to month-level
              precision.
            </li>
            <li>
              Constitution v1.3, referenced in proposal 28, was not located
              anywhere in the source material.
            </li>
            <li>
              Proposals 10, 18, and 30 are multi-choice or ranked-choice votes,
              not For/Against/Abstain, so they are reported as winner-by-power
              rather than Passed/Rejected.
            </li>
          </ul>
        </Section>
      </main>

      <footer className="mt-8 bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <h2 className="text-sm uppercase tracking-[0.2em] text-background/70">
            Sources
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-background/90">
            Constitution v1.2 and Code of Conduct v1.0: PDF exports from the
            Redbelly DAO dashboard. All 30 Snapshot proposals: PDF overview and
            vote-breakdown exports, cross-referenced against the Snapshot
            proposal link list. Discord-reported results for proposals 19
            through 24 used only where Snapshot's own UI did not assign a pass
            or reject label, independently cross-checked against per-voter data.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-background/20 pt-8 sm:grid-cols-4">
            <FooterLink href={GITHUB} label="GitHub">
              <svg {...iconProps}>
                <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
              </svg>
            </FooterLink>
            <FooterLink href={DOCS_VIEWER} label="Docs">
              <svg {...iconProps}>
                <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                <path d="M14 3v5h5M9 13h6M9 17h6" />
              </svg>
            </FooterLink>
            <FooterLink href={PDF_REPORT} label="PDF">
              <svg {...iconProps}>
                <path d="M15 3H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6z" />
                <path d="M15 3v3h3" />
                <path d="M9 12h1.2a1.3 1.3 0 0 1 0 2.6H9V12v5" />
              </svg>
            </FooterLink>
            <FooterLink href={DEVTO_ARTICLE} label="dev.to">
              <svg {...iconProps}>
                <rect x="2" y="5" width="20" height="14" rx="1.5" />
                <path d="M6 9.5v5h1a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 7 9.5zM11 9.5l1.2 5 1.3-5M18.5 9.5H16v5h2.5M16 12h2" />
              </svg>
            </FooterLink>
          </div>

          <p className="mt-10 text-xs text-background/60">
            Redbelly DAO Governance Changelog. Compiled record covering 3 Sep
            2025 to 24 Jul 2026.
          </p>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}
