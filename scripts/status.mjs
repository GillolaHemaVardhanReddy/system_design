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
 *   node scripts/status.mjs brief   → regenerate NOW.md — the ONE file a session opens with
 *   node scripts/status.mjs check   → drift detection + the due queue
 *   node scripts/status.mjs build   → regenerate notes/ROADMAP.html from STATUS.json
 *   node scripts/status.mjs due     → just the due queue
 *
 * THE ONE RULE THIS FILE ENFORCES:
 *   A date moves ONLY on a RETRIEVAL EVENT — never because time passed, never
 *   because a document was written. Reading a term does not install it. Only
 *   retrieving it does.
 *
 * THE SPLIT (S9). NOW.md = STATE, generated, never hand-edited. CLAUDE.md = RULES,
 * hand-written, no state in it. They do not overlap, so they CANNOT drift. Every
 * previous version of this repo kept state in prose in four places and the most
 * flattering copy won (Entry 006). Prose about status is how the lying starts.
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

/* ── drift detection ─────────────────────────────────────────────────────
   QUIET mode (S9): the SessionStart hook prints NOW.md, which already carries
   the frontier + due queue. Re-printing the full queue underneath it is the
   duplication this whole refactor exists to kill. Quiet prints ONLY what NOW.md
   cannot: whether the record contradicts itself.                              */
function check(quiet = false) {
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

  /* ── build-tier invariants (added S8) ───────────────────────────────────
     The build tier obeys the same law as the atoms. You cannot build on an
     atom you have not banked — you would be pasting, not deriving. And you
     cannot publish what you have not proven, because that debt compounds in
     public, under his own name.                                             */
  for (const b of STATUS.boundaries ?? []) {
    const missing = b.requires.filter(id => (atoms.find(a => a.id === id) ?? {}).s !== "banked");
    if (b.guided.status !== "locked" && missing.length)
      problems.push(`Boundary ${b.id} (${b.name}) is OPEN but atoms [${missing.join(", ")}] are not banked. You cannot build on an atom you have not banked.`);
    if (b.solo.status === "gated" && b.guided.status !== "shipped")
      problems.push(`Boundary ${b.id}: the SOLO project is gated but the GUIDED project never shipped. The solo build is the gate — it does not come first.`);
    if (b.article.status === "published" && b.solo.status !== "gated")
      problems.push(`Boundary ${b.id}: an ARTICLE is published but the solo project is "${b.solo.status}", not gated. He has published material he has not proven he owns. Retract or gate it.`);
  }

  /* ── the primitive invariant (added S9, TEACHING_LOG Entry 010) ──────────
     S9 asked him to derive asymmetric digital signatures — a primitive nobody
     has ever handed him, and one that took three MIT cryptographers months to
     invent. He was set up to fail and he called it out.

     Root cause: this record tracked what he ANSWERED and never what he was
     GIVEN. "He failed to derive it" and "nobody ever taught him the primitive"
     were INDISTINGUISHABLE in the file, and they need opposite responses.

     A live atom now cannot be taught without declaring what he holds.          */
  for (const a of atoms) {
    if (a.s === "locked") continue;
    const need = ["pri", "derive", "given", "real"].filter(k => a[k] == null || (Array.isArray(a[k]) && !a[k].length));
    if (need.length)
      problems.push(`Atom ${a.id} is live ("${a.s}") but has no [${need.join(", ")}]. You are about to teach an atom without declaring what he already HOLDS — which is exactly how S9 asked him to derive a primitive he was never given. Fill it or lock it. (TEACHING_LOG Entry 010.)`);
    if (a.derive === "yes" && a.lacks?.length)
      problems.push(`Atom ${a.id} is derive:"yes" but lists ${a.lacks.length} missing primitive(s) in \`lacks\`. Contradiction — if he lacks a primitive it needs, it is "need-only", not "yes".`);
    if (!["yes", "need-only", "no", undefined].includes(a.derive))
      problems.push(`Atom ${a.id} has derive:"${a.derive}" — must be yes | need-only | no.`);
  }

  /* ── the question bank invariant (added S9) ──────────────────────────────
     Known hole since S6 (CLAUDE.md §9.1), unfixed for three sessions: nothing
     stopped a "cold re-gate" from re-asking a question he had already seen —
     which measures whether he remembers THE QUESTION, not the idea. S5's log
     never existed, so its questions are gone permanently. This is the backstop. */
  for (const a of atoms) {
    if (!a.qs?.length) continue;
    const seen = new Set();
    for (const q of a.qs) {
      const k = q.q.trim().toLowerCase();
      if (seen.has(k)) problems.push(`Atom ${a.id}: question asked twice — "${q.q.slice(0, 60)}…". A re-asked question measures recall of the QUESTION, not the idea.`);
      seen.add(k);
      if (q.s == null || !q.g) problems.push(`Atom ${a.id}: a question in \`qs\` has no session or no grade. An ungraded question is not a record.`);
    }
  }

  if (quiet) {
    if (problems.length) {
      console.log("⛔ DRIFT / INVARIANT VIOLATION — the record contradicts itself. FIX BEFORE TEACHING.");
      problems.forEach(x => console.log("   ✗ " + x));
    } else {
      console.log(`✅ Record consistent — ${banked}/${total} banked, no drift, every live atom declares its primitives.`);
    }
    return problems.length;
  }

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

  buildQueue();
}

/* ── the build queue ─────────────────────────────────────────────────────
   Seven sessions in, he had run ZERO commands and written ZERO lines of code,
   and said: "I'm not even seeing what I am learning." He was right, and it was
   a teaching failure, not a motivation failure. The governing law of this repo
   is *what he DERIVES survives* — and RUNNING THE THING IS DERIVING.
   TEACHING_LOG Entry 008.                                                    */
function buildQueue() {
  console.log("");
  console.log("─── LABS: atoms taught but NEVER SEEN ───");
  console.log("A lab does not bank an atom — only a cold gate does. But an atom he has never");
  console.log("watched happen is an atom that lives only in his head, and his head is where");
  console.log("terms go to rot. Fire the lab at the END of the atom, before the gate.");
  const unseen = atoms.filter(a => a.lab && !a.lab.done && a.s !== "locked");
  if (!unseen.length) console.log("   (none — every live atom has been seen)");
  for (const a of unseen)
    console.log(`   ${a.id.padEnd(5)} ${a.lab.cmd.slice(0, 68)}${a.lab.cmd.length > 68 ? "…" : ""}`);

  /* ATOM BUILDS — RETIRED S14 2026-07-23 at Hema's call, reaffirmed twice.
     They were HIS S8 correction and they were right then; S14 swung it back. Labs now
     OBSERVE with tools that already exist; code waits for a capability boundary.
     The list is kept VISIBLE, not deleted — an idea deleted is an idea that cannot be
     re-argued, and this rule removed a derivation surface. See CLAUDE.md §5 / #014.   */
  console.log("");
  console.log("─── ATOM BUILDS: ⛔ RETIRED S14 — kept visible, not deleted ───");
  console.log("His call, reaffirmed twice: labs OBSERVE with existing tools; implementation");
  console.log("waits for a capability boundary. He types a COMMAND, not code.");
  console.log("⚠️ This removed a derivation surface. Predict-before-run now carries the whole");
  console.log("tier alone — no prediction committed = not a lab, just a screenshot. (#014)");
  const ab = atoms.filter(a => a.build);
  for (const a of ab)
    console.log(`   ⛔ ${a.id.padEnd(5)} ${(a.build.status === "retired" ? "RETIRED" : "shelved").padEnd(7)} — ${a.build.name}`);

  console.log("");
  console.log("─── BUILD QUEUE: capability boundaries ───");
  console.log("A project fires where the banked atoms ADD UP to something he could not have");
  console.log("built before. The project is DECIDED AT THE BOUNDARY, never in advance.");
  console.log("GUIDED = Jimmy architects & reviews, HEMA TYPES EVERY LINE.  SOLO = the gate.");
  for (const b of STATUS.boundaries ?? []) {
    const missing = b.requires.filter(id => (atoms.find(a => a.id === id) ?? {}).s !== "banked");
    const have = b.requires.length - missing.length;
    if (!missing.length && b.guided.status === "locked") {
      console.log(`   🟢 ${b.id} ${b.name.padEnd(18)} READY TO DESIGN — all ${b.requires.length} atoms banked. Run /project ${b.id}`);
    } else if (missing.length) {
      console.log(`   🔒 ${b.id} ${b.name.padEnd(18)} ${have}/${b.requires.length} atoms banked — blocked on: ${missing.join(", ")}`);
    } else {
      console.log(`   🔨 ${b.id} ${b.name.padEnd(18)} guided:${b.guided.status} · solo:${b.solo.status} · article:${b.article.status}`);
      if (b.guided.name) console.log(`         ↳ guided: ${b.guided.name}`);
      if (b.solo.name) console.log(`         ↳ solo:   ${b.solo.name}`);
    }
  }
}

/* ── NOW.md — the one file ───────────────────────────────────────────────
   Hema, S9: "there must be single file always claude sees first to know where
   everything stands ... so it wont load all files which burns tokens."

   He was right about the cost. Before this existed, a session loaded a 40 KB
   CLAUDE.md plus three trackers (40 KB more) — ~22,000 tokens before a single
   question was asked. And the first question asked with all that context was
   ILLEGAL (Entry 010): it required a primitive he had never been given.

   Volume was never the problem. The record tracked what he ANSWERED and never
   what he was GIVEN, so no amount of reading could have caught it.

   STATE ONLY. No rules live here — rules are CLAUDE.md's job. Two files, two
   jobs, no overlap, no drift.                                                 */
function brief() {
  const L = [];
  const w = s => L.push(s);
  const live = atoms.filter(a => a.s !== "locked");
  const here = live.filter(a => a.s === "here");

  w("# NOW — the only file a session needs to open");
  w("");
  w("> **GENERATED. Never hand-edit.** `node scripts/status.mjs brief` · source `trackers/STATUS.json`");
  w("> **This file is STATE. `CLAUDE.md` is RULES.** They do not overlap, so they cannot drift.");
  w(`> Written ${STATUS.meta.updated} · after Session ${STATUS.meta.session}`);
  w("");

  for (const a of here) {
    w(`## ⇢ START HERE — atom ${a.id}: ${a.short}`);
    w("");
    w(`\`${a.t}\``);
    w("");
    w(`**priority** \`${a.pri ?? "?"}\` · **derive** \`${a.derive ?? "?"}\` · **source** ${a.ref}`);
    if (a.trap) w(`\n> ⚠️ **TRAP** — ${a.trap}`);
    w("");
    if (a.beat) {
      w(`### The open beat — this is where you start, cold`);
      w(a.beat.open);
      w("");
      if (a.beat.closed?.length) {
        w("**Already closed — do NOT re-teach:**");
        a.beat.closed.forEach(c => w(`- ${c}`));
        w("");
      }
      if (a.beat.next) { w(`**Next moves:** ${a.beat.next}`); w(""); }
    }
    if (a.given?.length) {
      w("### ✅ He HOLDS these — you MAY ask him to derive FROM them");
      a.given.forEach(g => w(`- ${g}`));
      w("");
    }
    if (a.lacks?.length) {
      w("### ⛔ He does NOT hold these — HAND them. Asking is ILLEGAL.");
      a.lacks.forEach(g => w(`- ${g}`));
      w("");
    }
    if (a.real) { w(`### Real-world anchor`); w(a.real); w(""); }
    if (a.qs?.length) {
      w("### Questions already asked — a *cold* gate may NOT reuse these");
      a.qs.forEach(q => w(`- **[S${q.s}]** ${q.q}\n  - ↳ ${q.g}`));
      w("");
    }
    if (a.lab && !a.lab.done) { w(`### Lab — not yet run`); w(`\`${a.lab.cmd}\``); w(`↳ ${a.lab.see}`); w(""); }
  }

  const da = live.map(a => ({ ...a, due: atomDue(a) }))
    .filter(a => a.due && Date.parse(a.due) <= Date.parse(TODAY) && a.s !== "here")
    .sort((x, y) => Date.parse(x.due) - Date.parse(y.due));
  w("## Queue behind it");
  const banked = count("banked");
  w(`**${banked}/${atoms.length} atoms banked cold (${(banked / atoms.length * 100).toFixed(1)}%).** Banked is not permanent — 29 days once took DNS+TCP+HTTP to 1.5/6.`);
  w("");
  for (const a of da) {
    const od = overdueBy(a.due);
    const tag = { banked: "re-gate", termslost: "⚠ TERMS LOST", covered: "never gated" }[a.s] ?? a.s;
    w(`- \`${a.id}\` **${a.short}** — ${tag}${od > 0 ? `, overdue ${od}d` : ""}${a.pri ? ` · \`${a.pri}\`` : ""}`);
  }
  w("");

  const bad = STATUS.terms.filter(t => ["LOST", "MISUSED"].includes(t.status));
  w("## Terms in the red");
  w("*Repair by RE-DERIVING the mechanism and RE-CHRISTENING it. Never by quizzing it harder. No standalone term exam, ever.*");
  w("");
  bad.forEach(t => w(`- **${t.term}** \`${t.status}\` (atom ${t.atom}) — ${t.note ?? t.concept}`));
  w("");

  w("## Everything else — read ON DEMAND, not now");
  w("`trackers/STATUS.json` full record · `TEACHING_LOG.md` Jimmy's failures · `MISTAKE_JOURNAL.md` Hema's · `BEHAVIOR_LEARNING.md` how he learns · `notes/ROADMAP.html` the map");
  w("");
  w("**Open these only when the atom in front of you needs them.** Loading all of it costs ~22k tokens and did not once prevent a mistake.");

  const out = L.join("\n") + "\n";
  fs.writeFileSync(p("NOW.md"), out);
  console.log(`✅ NOW.md rebuilt — ${(out.length / 1024).toFixed(1)} KB, ${here.length} live atom(s), ${da.length} queued.`);
}

/* ── regenerate the roadmap ──────────────────────────────────────────── */
function build() {
  const tpl = read("notes/_roadmap.template.html");
  const data =
    `const UPDATED = ${JSON.stringify(STATUS.meta.updated + " · Session " + STATUS.meta.session)};\n` +
    `const PHASES  = ${JSON.stringify(STATUS.phases, null, 1)};\n` +
    `const MODULES = ${JSON.stringify(STATUS.modules, null, 1)};\n` +
    `const EDGES   = ${JSON.stringify(STATUS.edges)};\n`;
  fs.writeFileSync(p("notes/ROADMAP.html"), tpl.replace("/*__DATA__*/", data));
  console.log(`✅ notes/ROADMAP.html rebuilt from trackers/STATUS.json — ${atoms.length} atoms, ${count("banked")} banked.`);
}

const cmd = process.argv[2] ?? "check";
const quiet = process.argv.includes("--quiet");
if (cmd === "build") build();
else if (cmd === "due") due();
else if (cmd === "brief") brief();
else process.exit(check(quiet) ? 1 : 0);
