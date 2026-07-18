// Checks every job URL in index.html and writes link-status.json.
// Verdicts: "live" (confirmed reachable / open), "dead" (404 or closure text),
// "unknown" (aggregator or JS-rendered page that returns 200 regardless).
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const jobs = [...html.matchAll(/\{r:(\d+),[^\n]*?url:"([^"]+)"/g)].map(m => ({ r: +m[1], url: m[2] }));

function curl(url) {
  try {
    const out = execSync(
      `curl -sSL --max-time 25 -A "Mozilla/5.0 (compatible; JobTrackerLinkCheck)" -w "\\n%{http_code}" "${url}"`,
      { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }
    );
    const i = out.lastIndexOf("\n");
    return { code: parseInt(out.slice(i + 1), 10), body: out.slice(0, i) };
  } catch (e) {
    return { code: 0, body: "" };
  }
}

const AGG = ["builtin.com","indeed.com","glassdoor.com","ziprecruiter.com","linkedin.com","dice.com","snagajob.com","jobgether.com","adzuna.com","tealhq.com","wellfound.com","remoterocketship.com","accel.com","insightpartners.com","dejobs.org"];
const DEAD_MARKERS = ["no longer accepting","job not found","position is no longer","not accepting applications","this job is no longer","position has been filled","posting is no longer","job has closed","job posting you are looking","page not found","couldn't find that job","job expired","this job has expired"];

const status = { checked: new Date().toISOString().slice(0, 10), jobs: {} };

for (const j of jobs) {
  let verdict = "unknown";
  try {
    const u = new URL(j.url);
    const gh = u.hostname === "job-boards.greenhouse.io" && u.pathname.match(/^\/([^/]+)\/jobs\/(\d+)/);
    if (gh) {
      // Greenhouse has a clean JSON API: 404 = the job is closed. Definitive.
      const r = curl(`https://boards-api.greenhouse.io/v1/boards/${gh[1]}/jobs/${gh[2]}`);
      verdict = r.code === 200 ? "live" : r.code === 404 ? "dead" : "unknown";
    } else {
      const agg = AGG.some(d => u.hostname === d || u.hostname.endsWith("." + d));
      const r = curl(j.url);
      const low = (r.body || "").toLowerCase();
      if (r.code === 404 || r.code === 410) verdict = "dead"; // definitively gone
      else if (r.code === 200 && DEAD_MARKERS.some(m => low.includes(m))) verdict = "dead";
      else if (r.code !== 200) verdict = "unknown"; // 403/429/5xx/timeout = checker blocked, not proof of closure
      else if (agg) verdict = "unknown"; // boards return 200 even for closed jobs
      else verdict = "live";
    }
  } catch (e) { /* keep unknown */ }
  status.jobs[j.r] = verdict;
  console.log(`#${j.r} ${verdict} ${j.url}`);
}

writeFileSync(new URL("../link-status.json", import.meta.url), JSON.stringify(status, null, 1));
console.log("wrote link-status.json");
