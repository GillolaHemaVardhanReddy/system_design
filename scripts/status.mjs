#!/usr/bin/env node
/**
 * status.mjs — the consistency protocol for a repo that kept lying to its owner.
 *
 * WHY THIS EXISTS (TEACHING_LOG.md Entry 006):
 * Atom status used to live in four files — SYLLABUS.md, COMPLETION.md, GLOSSARY.md
 * and ROADMAP.html — with nothing reconciling them. They drifted, and the most
 * FLATTERING replica won. Atom 1.5 read "✅ BANKED" for a month while GLOSSARY.md,
 * on the same day, recorded its terms as LOST. Four replicas, no consistency
 * protocol. That is a distributed-systems bug, in a distributed-systems curriculum.
 *
 * trackers/STATUS.json is now the ONLY canonical record. Everything else is
 * downstream of it.
 *
 *   node scripts/status.mjs check   → drift detection + the due queue (SessionStart runs this)
 *   node scripts/status.mjs build   → regenerate notes/ROADMAP.html from STATUS.json
 *   node scripts/status.mjs due     → just the due queue
 *
 * THE ONE RULE THIS FILE ENFORCES:
 *   A date moves ONLY on a RETRIEVAL EVENT — never because time passed, never
 *   because a document was written. Reading a term does not install it. Only
 *   retrieving it does.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const p = (...a) => path.join(ROOT, ...a);
const read = f => fs.readFileSync(p(f), "utf8");
const STATUS = JSON.parse(read("trackers/STATUS.json"));

// TODAY is injected so a fixed date can be tested; defaults to the real clock.
const TODAY = process.env.SD_TODAY || new Date().toISOString().slice(0, 10);
const days = (from, to) => Math.round((Date.parse(to) - Date.parse(from)) / 864e5);
const addDays = (d, n) => new Date(Date.parse(d) + n * 864e5).toISOString().slice(0, 10);

const atoms = STATUS.modules.flatMap(m => m.atoms.map(a => ({ ...a, mod: m.code })));
const count = s => atoms.filter(a => a.s === s).length;

/* ── the decay clock ─────────────────────────────────────────────────────
   Banked is NOT permanent. DNS was banked in S3, TCP in S4, HTTP in S2 —
   and 29 days killed all three. An atom with no re-gate date is a lie with
   a timer on it. Every banked atom gets one, on an expanding ladder.        */
function atomDue(a) {
  if (a.s === "locked") return null;
  if (a.s === "here") return TODAY;                       // it's the live atom
  if (a.s === "covered" || a.s === "termslost") return TODAY; // never gated / demoted → due now
  if (a.s === "banked") {
    if (!a.lastCold) return TODAY;                        // banked with no evidence = not banked
    const ladder = STATUS.policy.regateLadderDays;
    const step = ladder[Math.min(a.passes ?? 0, ladder.length - 1)];
    return addDays(a.lastCold, step);
  }
  return TODAY;
}
const termDue = t => {
  const n = STATUS.policy.termDrillDays[t.status] ?? 0;
  if (t.status === "COLD" && t.lastColdProduction) return addDays(t.lastColdProduction, n);
  return TODAY;                                            // LOST / MISUSED / WARM / NEVER_TAUGHT
};
const overdueBy = due => (due ? days(due, TODAY) : null);

/* ── drift detection ─────────────────────────────────────────────────── */
function check() {
  const problems = [];
  const banked = count("banked");
  const total = atoms.length;

  // COMPLETION.md must agree with the canonical count.
  const comp = read("trackers/COMPLETION.md");
  if (!comp.includes(`${banked} / ${total}`) && !comp.includes(`**${banked}**`))
    problems.push(`COMPLETION.md does not state the canonical banked count (${banked}/${total}).`);

  // SYLLABUS.md must not claim BANKED for an atom the canonical record demotes.
  const syl = read("trackers/../SYLLABUS.md");
  for (const a of atoms) {
    if (a.s === "banked") continue;
    const line = syl.split("\n").find(l => l.trim().startsWith(`| ${a.id} `));
    if (line && /✅\s*\*\*BANKED/.test(line))
      problems.push(`SYLLABUS.md claims atom ${a.id} is ✅ BANKED — STATUS.json says "${a.s}". The flattering replica is winning again.`);
  }

  // An atom cannot be banked without a logged cold retrieval date.
  for (const a of atoms)
    if (a.s === "banked" && !a.lastCold)
      problems.push(`Atom ${a.id} is "banked" with NO lastCold date. Banked means demonstrated cold. Prove it or demote it.`);

  // A term cannot be COLD without a logged cold production.
  for (const t of STATUS.terms)
    if (t.status === "COLD" && !t.lastColdProduction)
      problems.push(`Term "${t.term}" is COLD with no lastColdProduction date. Only retrieval promotes a term.`);

  console.log("─── CANONICAL STATUS (trackers/STATUS.json) ───");
  console.log(`Atoms: ${banked} BANKED COLD / ${total} enumerated (${(banked / total * 100).toFixed(1)}%)`);
  console.log(`  here ${count("here")} · covered-not-gated ${count("covered")} · TERMS-LOST ${count("termslost")} · locked ${count("locked")}`);
  const cold = STATUS.terms.filter(t => t.status === "COLD").length;
  console.log(`Terms: ${cold} COLD / ${STATUS.terms.length}  — the rest have NEVER been produced cold in a later session.`);
  console.log("");

  if (problems.length) {
    console.log("⛔ DRIFT DETECTED — the trackers disagree. Fix before teaching. (TEACHING_LOG Entry 006)");
    problems.forEach(x => console.log("   ✗ " + x));
  } else {
    console.log("✅ No drift. Trackers agree with the canonical record.");
  }
  console.log("");
  due();
  return problems.length;
}

/* ── the due queue ───────────────────────────────────────────────────── */
function due() {
  const da = atoms
    .map(a => ({ ...a, due: atomDue(a) }))
    .filter(a => a.due && Date.parse(a.due) <= Date.parse(TODAY))
    .sort((x, y) => Date.parse(x.due) - Date.parse(y.due));

  console.log("─── ATOMS DUE FOR A COLD RE-GATE ───");
  console.log("Banked is NOT permanent. A 29-day gap already took DNS, TCP and HTTP down to 1.5/6.");
  if (!da.length) console.log("   (none)");
  for (const a of da) {
    const od = overdueBy(a.due);
    const tag = { banked: "BANKED", termslost: "⚠ TERMS LOST", covered: "COVERED — never gated", here: "🔵 YOU ARE HERE" }[a.s] ?? a.s;
    console.log(`   ${a.id.padEnd(5)} ${tag.padEnd(22)} ${od > 0 ? `OVERDUE by ${od}d` : "due now"}  — ${a.t.slice(0, 62)}`);
    if (a.note) console.log(`         ↳ ${a.note}`);
  }

  const dt = STATUS.terms
    .map(t => ({ ...t, due: termDue(t) }))
    .filter(t => Date.parse(t.due) <= Date.parse(TODAY));

  console.log("");
  console.log("─── TERMS DUE ───");
  console.log("Terms decay FASTER than concepts for this learner. He understands the machinery");
  console.log("and cannot name the parts. Repair a LOST term by RE-DERIVING the mechanism and");
  console.log("RE-CHRISTENING it (name-at-birth) — NEVER by quizzing it harder. There is no");
  console.log("standalone term exam. Ever. (TEACHING_LOG Entry 004.)");
  for (const t of dt)
    console.log(`   [${t.status.padEnd(12)}] ${t.term}  (atom ${t.atom})${t.note ? "\n         ↳ " + t.note : ""}`);
}

/* ── regenerate the roadmap ──────────────────────────────────────────── */
function build() {
  const tpl = read("notes/_roadmap.template.html");
  const data =
    `const UPDATED = ${JSON.stringify(STATUS.meta.updated + " · Session " + STATUS.meta.session)};\n` +
    `const MODULES = ${JSON.stringify(STATUS.modules, null, 1)};\n` +
    `const EDGES = ${JSON.stringify(STATUS.edges)};\n`;
  fs.writeFileSync(p("notes/ROADMAP.html"), tpl.replace("/*__DATA__*/", data));
  console.log(`✅ notes/ROADMAP.html rebuilt from trackers/STATUS.json — ${atoms.length} atoms, ${count("banked")} banked.`);
}

const cmd = process.argv[2] ?? "check";
if (cmd === "build") build();
else if (cmd === "due") due();
else process.exit(check() ? 1 : 0);
