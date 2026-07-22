// Generates demo.html from index.html: a shareable, sandboxed copy of the
// tracker. Cloud sync, AI research, and resume upload are disabled, and it
// uses its own localStorage key, so visitors can play freely without ever
// touching the owner's data. Run: node scripts/make-demo.mjs
import { readFileSync, writeFileSync } from "fs";

let html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

// Every transform must hit exactly once — a miss means index.html drifted
// and the demo build needs updating, so fail the build rather than ship a
// demo with sync silently enabled.
function replaceOnce(from, to, label) {
  const parts = html.split(from);
  if (parts.length !== 2) throw new Error(`make-demo: marker not found exactly once: ${label}`);
  html = parts.join(to);
}

replaceOnce(
  "<title>Erik Neville | Job Tracker 2026</title>",
  "<title>Job Tracker — Demo</title>",
  "title"
);

// Sandbox storage: visitors get their own scratch space, and the owner's
// real data (jobTrackerData_v1) is never read or written.
replaceOnce(
  'const LS_KEY="jobTrackerData_v1";',
  'const LS_KEY="jobTrackerDemo_v1";',
  "localStorage key"
);

// No cloud: don't load supabase-js and never create a client, so nothing in
// the demo can reach the sync backend.
replaceOnce(
  '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>\n',
  "",
  "supabase script tag"
);
replaceOnce(
  'try{if(typeof supabase!=="undefined")sb=supabase.createClient(SB_URL,SB_KEY);}catch(e){}',
  "/* demo build: cloud sync disabled */",
  "supabase client init"
);

// Hide the account-tied buttons entirely.
replaceOnce(
  "<style>",
  "<style>\n  #sync-btn,#research-btn,#profile-btn{display:none!important;}",
  "hide buttons css"
);

// Banner so nobody mistakes the sandbox for the real site.
replaceOnce(
  '<div class="header">',
  `<div style="background:linear-gradient(90deg,rgba(0,212,170,.14),rgba(201,166,255,.14));border-bottom:1px solid var(--border);padding:9px 16px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.72rem;letter-spacing:.06em;color:var(--accent)">🎬 DEMO SANDBOX — play with everything; changes stay in your browser only</div>
<div class="header">`,
  "demo banner"
);

writeFileSync(new URL("../demo.html", import.meta.url), html);
console.log("wrote demo.html");
