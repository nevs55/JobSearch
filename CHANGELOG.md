# Changelog

Every change to the job tracker, in order, with the notes a pull request would have carried.
From **July 23 2026** onward, changes land as real pull requests — see the
[closed PRs](https://github.com/nevs55/JobSearch/pulls?q=is%3Apr+is%3Aclosed) for newer history.
Commit links point at the exact change.

---

## Jul 17 2026 — From static files to a living site

- **Initial import** ([123852f](https://github.com/nevs55/JobSearch/commit/123852f)) — Erik's five local tracker HTML dashboards brought into the repo.
- **Live search** ([46c3c65](https://github.com/nevs55/JobSearch/commit/46c3c65)) — instant search across title, company, notes, tags.
- **Editable tracker + auto-deploy** ([fb4eac7](https://github.com/nevs55/JobSearch/commit/fb4eac7), [e24ca65](https://github.com/nevs55/JobSearch/commit/e24ca65)) — add/edit/delete jobs, status pipeline (Applied/Interview/Offer/Rejected), and a GitHub Actions workflow that publishes every push to GitHub Pages.
- **Sources tab, aggregator flags, backup** ([86341bb](https://github.com/nevs55/JobSearch/commit/86341bb)) — job-board bookmarks, ⚠ aggregator warnings on third-party links, JSON export/import.
- **Typography** ([80feca5](https://github.com/nevs55/JobSearch/commit/80feca5)) — Archivo / Inter / JetBrains Mono.
- **Cloud sync** ([8b11afa](https://github.com/nevs55/JobSearch/commit/8b11afa)) — Supabase Postgres behind magic-link email sign-in; archive, statuses, added jobs and sources follow you across devices.

## Jul 18 2026 — Automation: research, validation, contacts

- **Contact tracking** ([d3b43c9](https://github.com/nevs55/JobSearch/commit/d3b43c9)) — name/email per job, shown on cards.
- **Link freshness checking** ([7f5c018](https://github.com/nevs55/JobSearch/commit/7f5c018)) — `scripts/check-links.mjs` verifies every job URL (Greenhouse API is definitive); verdicts rendered as link ✓ / ✗ tags.
- **Archive + NEW badges** ([f3ffaaa](https://github.com/nevs55/JobSearch/commit/f3ffaaa)) — manual archive, ★ NEW tag on fresh finds, official-site links on every card.
- **Auto-archive dead jobs** ([c74fe90](https://github.com/nevs55/JobSearch/commit/c74fe90)) — confirmed-dead links archive themselves; jobs you've applied to are exempt and stay visible with a dead-link warning.
- **AI research workflow** ([dc8cf6c](https://github.com/nevs55/JobSearch/commit/dc8cf6c), [bc38abf](https://github.com/nevs55/JobSearch/commit/bc38abf), [47846d9](https://github.com/nevs55/JobSearch/commit/47846d9)) — Claude sweeps the market three times daily (8am/12pm/4pm ET) via GitHub Actions, verifying every role on the employer's own site before adding it. Early runs quit too fast — fixed with a 300-turn budget and mandatory-work prompt language.
- **One-click Research button** ([8037bda](https://github.com/nevs55/JobSearch/commit/8037bda)) — fires the workflow straight from the site (one-time GitHub token setup, stored only in your browser).
- **Job detail popup** ([66f62df](https://github.com/nevs55/JobSearch/commit/66f62df)) — click any card for the full note, links, status, and metadata.
- **Official-links-only rule** ([d8e5629](https://github.com/nevs55/JobSearch/commit/d8e5629), [5be6721](https://github.com/nevs55/JobSearch/commit/5be6721)) — every research run must hunt down aggregator links (LinkedIn/Indeed/BuiltIn/…) and replace them with the employer's own posting, or remove roles that no longer exist.
- **Resume-driven criteria** ([5b5c5cf](https://github.com/nevs55/JobSearch/commit/5b5c5cf)) — 📄 Profile upload (PDF/text) writes `profile.md`, which every research run reads first.
- **Data quality fixes** ([c4aca41](https://github.com/nevs55/JobSearch/commit/c4aca41), [9c5eab0](https://github.com/nevs55/JobSearch/commit/9c5eab0)) — removed a Wasabi listing that wasn't real; manual-override mechanism for links that 403 bots but 404 humans (Nutanix n2317).

## Jul 19–21 2026 — Coverage, layout, sync hardening

- **Research breadth** ([32deb0f](https://github.com/nevs55/JobSearch/commit/32deb0f)) — not limited to tracked companies: Boston-wide, startups/growth-stage, and AI companies (platforms, GPU clouds, vector DBs, applied AI) explicitly in scope; ≥10 untracked companies evaluated per run.
- **Cloudflare deploy** ([700a61d](https://github.com/nevs55/JobSearch/commit/700a61d)) — main auto-deploys to Cloudflare Pages → jobs.eclnetwork.com, alongside GitHub Pages.
- **Newest first, permanent found dates** ([46ba90f](https://github.com/nevs55/JobSearch/commit/46ba90f)) — every job carries the date it was discovered, forever; list sorts newest to top.
- **3-across card grid** ([7df2f5d](https://github.com/nevs55/JobSearch/commit/7df2f5d)) and **readability pass** ([bf051e7](https://github.com/nevs55/JobSearch/commit/bf051e7)) — larger type, higher contrast.
- **Applied tab** ([4dfa5ea](https://github.com/nevs55/JobSearch/commit/4dfa5ea)).
- **Password sign-in** ([d722ccd](https://github.com/nevs55/JobSearch/commit/d722ccd)) — set a password once, no more email round-trips per device.
- **Statused jobs leave browse views** ([abaf0b4](https://github.com/nevs55/JobSearch/commit/abaf0b4)) — pick a status and the job moves to its tab; research runs also hunt a named recruiting contact per role (published emails only, never guessed).

## Jul 22 2026 — Sync integrity, sidebar, filters, demo

- **Sync data-loss fix** ([adc67f5](https://github.com/nevs55/JobSearch/commit/adc67f5)) — replaced newest-timestamp-wins with a true union merge so a fresh browser can never wipe cloud data; unit-tested against the exact failure scenario.
- **Sticky left sidebar** ([db67b90](https://github.com/nevs55/JobSearch/commit/db67b90)).
- **True found dates + every-other-day validation** ([f1b0e6f](https://github.com/nevs55/JobSearch/commit/f1b0e6f)) — backfilled real discovery dates; link checks run on a 2-day cron; View To-Review / View Everything toggle.
- **Filter panel** ([a50fed2](https://github.com/nevs55/JobSearch/commit/a50fed2)) — stackable sidebar filters (Fit/Type/Focus/Location/Found/Link Check), company dropdown, jobs-per-page (12/24/48/All), AUTO-ARCHIVED vs ARCHIVED-BY-YOU tags.
- **Clickable card tags** ([d33d742](https://github.com/nevs55/JobSearch/commit/d33d742)) — every tag on a card toggles the matching filter.
- **Collapsible sidebar groups** ([5bbadd6](https://github.com/nevs55/JobSearch/commit/5bbadd6)) — Jobs / Filters / Resources roll-ups with a persisted open/closed state and an active-filter count badge.
- **Custom tags + link-first Add Job** ([745dd69](https://github.com/nevs55/JobSearch/commit/745dd69)) — free-text My Tags (filterable, searchable, synced); Add Job opens with one link field that auto-fills from Greenhouse/Lever/Ashby/SmartRecruiters.
- **Company watch list** ([e4234a8](https://github.com/nevs55/JobSearch/commit/e4234a8)) — add companies with fuzzy duplicate discard (case/punctuation/corporate-suffix insensitive).
- **Paste-to-fill** ([2506e3d](https://github.com/nevs55/JobSearch/commit/2506e3d)) — pasting a link fetches instantly; unknown sites fall back to reading the title out of the URL slug; LinkedIn "title-at-company" slugs split into both fields.
- **Public demo sandbox** ([7ff3d15](https://github.com/nevs55/JobSearch/commit/7ff3d15)) — `/demo` regenerates from the real site on every deploy; own storage sandbox, sync/research/profile disabled, safe to share.
- **Branded login** ([d1f51f1](https://github.com/nevs55/JobSearch/commit/d1f51f1)) — ECL Network logo for the Cloudflare Access sign-in page. Access itself (approve-first email allowlist, public demo bypass) is configured in Cloudflare, not the repo.

## Jul 23 2026 — Company editing, review flow, salary

- **Company rename + notes** ([de33386](https://github.com/nevs55/JobSearch/commit/de33386)) — ✎ renames a company everywhere (cards, filter, search; keyed to original name so future research inherits the fix); 📝 inline notes on company cards, searchable and synced.
- **One-press Sync** ([f4d761e](https://github.com/nevs55/JobSearch/commit/f4d761e)) — ⟳ Sync button syncs directly with inline feedback; the ☁ account button keeps the popup for password/sign-out only.
- **Salary chips** ([6866167](https://github.com/nevs55/JobSearch/commit/6866167)) — 💰 range beside the match %, extracted from notes or set explicitly; research records comp going forward.
- **Card menu + Review tab** ([f9edca2](https://github.com/nevs55/JobSearch/commit/f9edca2)) — per-card ⋯ dropdown (Review/Edit/Archive/Delete); 🔍 Review section under Jobs collects flagged roles and they leave the browse view.
- **Location enforcement** ([79bdc98](https://github.com/nevs55/JobSearch/commit/79bdc98)) — removed CoreWeave (DC) and AvePoint (NYC) office-only roles; research prompt now hard-forbids office roles outside Greater Boston/NE. Every card gains a ↗ job link tag opening the posting directly.

## Ongoing automated commits

- `claude[bot]` — thrice-daily research sweeps (new verified roles, link conversions, closures).
- `github-actions[bot]` — every-other-day link status updates and demo regeneration.
