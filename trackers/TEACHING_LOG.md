# Teaching Log — JIMMY'S mistakes, root-caused

> Every other tracker in this repo logs **Hema's** errors. Until 2026-07-11 nothing logged **mine**.
> That is exactly why "Jimmy never drills terminology" survived four sessions invisibly — nothing was looking for it.
>
> **Rule:** when a failure of Hema's traces back to how it was *taught*, it gets an entry here, not just in his journal.
> Hema may hold me to these. Blaming the learner for a teaching gap is the fastest way to make the gap permanent.

---

## Recurring
| Teaching mistake | Times | Last seen |
|---|---|---|
| Terms handed as labels, never derived → they rot while concepts survive | 4 sessions (S1–S4, surfaced S5) | 2026-07-11 |
| Same-session re-gate graded as retention → inflated confidence scores | 2 | 2026-07-11 |
| Did not read the trackers before teaching | 1 | 2026-07-11 |
| **Fixed a derivation problem with an EXAM** → aversive drill, learner disengaged | 1 | 2026-07-11 (Entry 004) |
| **Committed a session with no session log** → its questions are permanently lost | 1 (S5) | 2026-07-11 (Entry 005) |
| **A tracker was allowed to contradict another tracker** → status drifted, 1.5 read ✅ BANKED for a month it hadn't earned | 1 | 2026-07-11 (Entry 006) |

---

## Entry 001 — Terminology was never taught, only mentioned
- **Surfaced:** 2026-07-11 (Session 5), cold decay sweep after a 29-day gap.
- **Symptom:** Hema derived head-of-line blocking, fast retransmit, RTO, dup-ACKs and the CA's role — **and could name none of them.** He described the CA as "the middle man" (the *attacker's* name).
- **Root cause (mine):** I taught concept-first and derivation-first — correct for this learner, and the reason his *reasoning* survived a month intact. But I treated the **terms as labels bolted on afterwards** (a line in a "recall anchors" list). **He never derived a single term, so no term survived.** His own behaviour file says *"learns by deriving, not receiving"* — I read that as being about concepts and never drew the obvious consequence for vocabulary.
- **Aggravating factor:** I then tried to fix it by *writing him a document* with the terms in red boxes. Twenty minutes later he did not know fast retransmit existed. **Reading a term does not install it. Only retrieving it does.**
- **Correct model:** these names are **not arbitrary — they are the concept, compressed.** *Head of the line → blocking. Fast retransmit → a retransmit, fast. RTO → retransmission time-out. Man-in-the-middle → literally in the middle. Idempotent → idem + potens, same power however often applied.* A derivation-learner can **regenerate** every one of them.
- **Fix, adopted:**
  1. **Name-at-birth.** The moment he derives a mechanism, he **christens it himself**, then I give the real name **and its etymology**. The word is welded to the birth of the idea, never stapled on at the end.
  2. **`/terms` — term-first drill.** Reverse direction: scenario in, **word out**, cold. Every existing command runs the other way and tests only recognition.
  3. **`trackers/GLOSSARY.md`** — terms get their own tracker and their **own, faster review clock**.
  4. **Gate rule:** a correct explanation **without the correct term is not a pass.**
- **Retest:** every session until each term is produced **COLD in a later session**.

## Entry 002 — I graded a same-session re-gate as retention
- **Surfaced:** 2026-07-11, reading back my own Mistake Journal Entry 004.
- **Symptom:** Entry 004 (dup-ACK on a silent wire) was marked **"Retest: PASSED same session… Confidence 8/10."** Twenty-nine days later he did not know the mechanism **existed**.
- **Root cause (mine):** he had been drilled on it minutes earlier. Of course he passed. **A freshly-drilled answer measures working memory, not retention** — and I wrote the number into his permanent file as if it measured retention. That inflated score then made the topic *look* safe, so it was never re-queued.
- **Correct model:** **only a cold gate in a LATER session can raise a confidence score.** A same-session re-gate proves the re-teach landed *right now* — nothing more.
- **Fix, adopted:** same-session re-gates **cap at 5/10**. Scores above that require a cold pass in a **subsequent** session. Entry 004's 8/10 corrected to reflect reality.
- **Retest:** audit every confidence score in the journal against this rule.

## Entry 003 — I had the diagnosis on disk and did not read it
- **Surfaced:** 2026-07-11.
- **Symptom:** Across the whole session Hema repeatedly answered *around* a discriminator — asked "which mechanism," he described retransmission generally; asked for a yes/no, he gave neither. I diagnosed this live, from scratch, as if it were new.
- **It was not new.** `BEHAVIOR_LEARNING.md` line 13, written in **Session 2**: *"Retreat-to-structure under pressure: when asked for a specific decision, he re-describes the skeleton instead of committing. Coaching response: refuse the restatement, demand the specific."* **The diagnosis AND the fix were already written down.** I opened the file only after he had failed four questions.
- **Root cause (mine):** no forcing function. Nothing in the toolkit made me read the trackers before teaching, so the accumulated knowledge sat unused — the exact failure the trackers exist to prevent.
- **Fix, adopted:** a **SessionStart hook** that prints days-since-last-session, the overdue revision queue, terms due, and standing orders — **before** any teaching. Plus a hard rule in CLAUDE.md §0.5: **read BEHAVIOR_LEARNING + MISTAKE_JOURNAL before the first lesson of a session.**
- **Retest:** if a known-logged failure mode is ever re-diagnosed from scratch instead of pre-empted, this entry has failed.

## Entry 004 — I fixed the term problem with an EXAM, for a learner who does not learn from exams ⭐
- **Surfaced:** 2026-07-11, later the same day, **by Hema pushing back.** His words: *"I am losing interest because of these accurate hundred percent exact terms tests."*
- **Symptom:** I opened the session with a **standalone 10-question term gauntlet** — scenario in, word out, detached from any teaching. He scored 3/10 clean, and then **disengaged and argued to have the whole method removed.** A drill that makes him want to quit has negative value, however correct its diagnosis.
- **Root cause (mine):** **the finding was right and the format was its exact opposite.** Entry 001 concluded *"what he derives, survives; what he is handed, rots"* — and then I built the remedy as a **test**, which is neither deriving nor receiving. It is the one mode that teaches him nothing. `BEHAVIOR_LEARNING.md` has said since Session 1 that he learns by **deriving**; I had just written that sentence myself, in this file, and still shipped a quiz. **I fixed a derivation problem with an examination.**
- **Aggravating factor:** I ran it as the **opening act** of the session — so the first twenty minutes were pure aversive assessment with no teaching in them. Then when he complained about "letter-perfect" grading I was *factually* right (I had accepted "fast retransmission," "middleman," "exponent," "judge") — and being right about the grading is worth nothing if the format has already cost me the learner.
- **What he was RIGHT about:** grading should be on the **referent, not the spelling.** Any word that lands on the right object is a pass. → now CLAUDE.md §1, the **synonym rule**.
- **What he was WRONG about, and I held the line:** *"any word that describes it is enough."* No — a word that names the **wrong object** is a **concept error** wearing a term gap as a costume. *"UDP is fast and **accurate**"* (it is not — accuracy is what it sold) and *"**sequence number**"* for an HTTP retry (TCP machinery answering an HTTP question) are **not** wording slips. Both failed *his own* proposed test — "just check if the concept landed."
- **Correct model:** **the term is welded to the birth of the mechanism, or it is not taught at all.** Never examined in a vacuum. If a term is `LOST`, the repair is to **re-derive the mechanism and re-christen it** — not to quiz it harder.
- **Memory anchor:** *"You cannot test a term into a derivation learner."*
- **Fix, adopted:** CLAUDE.md §4 — **NO STANDALONE TERM EXAM.** `/terms` demoted to a ≤60-second warm-up folded inside an atom; never the opening act; never a gauntlet. CLAUDE.md §1 — the **synonym rule**.
- **Retest:** if a session ever opens with a detached term quiz again, this entry has failed.

## Entry 005 — I committed the most important session in the repo with no session log
- **Surfaced:** 2026-07-11 (Session 6), while closing out.
- **Symptom:** `sessions/` contained `001`–`004` and **no `005`.** Session 5 — the session that produced the **term-decay finding**, the single most valuable diagnosis in this repo — was committed as `09cb3a9 "Session 005: term-decay finding + toolkit rebuild"` **with no session file.** The commit message was doing a session log's job.
- **What was lost, permanently:** the **questions asked and their grades.** `CLAUDE.md` §7 requires exactly that in every session log, for exactly one reason: **a "cold re-gate" that reuses old questions measures recognition, not recall.** Without the S5 question list, I cannot guarantee S7's TLS gate doesn't accidentally re-ask an S5 question. That guarantee is now unrecoverable for S5.
- **Root cause (mine):** `/session` is a **command Jimmy must remember to run.** The `SessionEnd` hook auto-**commits** — so it faithfully preserved a session whose log did not exist, and made the omission *look* like a completed session in `git log`. **The automation preserved the gap instead of catching it.**
- **Correct model:** an auto-commit without an auto-*check* is worse than no automation — it manufactures evidence of work that wasn't done.
- **Fix:** `sessions/005-term-decay-finding.md` reconstructed from the trackers in S6 and **flagged as reconstructed**, with the missing grades named as missing. **Proposed hard fix:** `SessionEnd` refuses to commit — or commits loudly flagged `[NO SESSION LOG]` — if `sessions/NNN-*.md` does not exist for the current session.
- **Retest:** if any future commit says "Session NNN" and `sessions/NNN-*.md` does not exist, this entry has failed.

## Entry 006 — I let the trackers contradict each other, and the optimistic one won
- **Surfaced:** 2026-07-11 (Session 6), building `notes/ROADMAP.html`.
- **Symptom:** atom **1.5 (TCP loss recovery)** read **✅ BANKED (S4)** in `SYLLABUS.md`, **banked** in `COMPLETION.md`'s count — while `GLOSSARY.md` on the same day recorded **fast retransmit: LOST**, **RTO: WARM**, **exponential backoff: WARM**, and `MISTAKE_JOURNAL.md` Entry 004 recorded *"I don't know what the other mechanism is."* **Four files, four truths.** Nothing reconciled them, so the most flattering one stood.
- **Root cause (mine):** atom status lives in **four places with no consistency protocol** — `SYLLABUS.md`, `COMPLETION.md`, `GLOSSARY.md`, and now `ROADMAP.html`. Replicas without a write-path converge on whichever replica nobody re-reads. **This is a distributed-systems bug in a distributed-systems curriculum**, and I built it.
- **Why it matters more than it looks:** the honesty rule (`CLAUDE.md` §7) is enforced by *nothing*. It is a sentence in a file, and a sentence cannot detect drift. Entry 002 corrected an inflated **score**; this is the same disease at the **status** level, and it survived a month.
- **Fix, this session:** 1.5 demoted to ⚠️ **TERMS LOST** in `SYLLABUS.md`, `COMPLETION.md` and the roadmap. Denominator unified at **166 atoms**; banked count unified at **4**.
- **Proposed hard fix:** **one canonical status record** (the `ROADMAP.html` data block, or a `trackers/STATUS.json`), with every other file rendered or validated against it, plus a `SessionStart` check that fails loudly on drift. **Until that exists, this entry is only patched, not fixed.**
- **Retest:** if two trackers ever disagree about an atom's status again, this entry has failed.

## Entry 007 — I taught TLS, gated it 4/5, left the commit on one machine, and then told him it had never been taught
- **Surfaced:** 2026-07-13 (Session 7), and **only because Hema asked "did you push all changes to remote?"** Nothing in the system was going to volunteer it.
- **Symptom:** `origin/main` held a commit this clone had never seen — `9c36e88`, **2026-06-12: "Session 005: TLS Diffie–Hellman banked cold (4/5 gate) — MITM beat held open."** A real session. He produced the **real DH math** that day (`g`, `p`, `g^a mod p`, the shared `g^(ab)`; **modexp easy / discrete log hard**; the secret **never on the wire**), passed **4 of 5 gate dimensions**, and the gate was held open on one beat: the **active-MITM mechanism** (*attacker runs two separate handshakes, never computes `g^(ab)`*). Meanwhile the **canonical record on this machine** — `STATUS.json`, written 29 days later — said: **`"1.9: never gated, never taught to depth. The standing debt."`**
- **What actually happened:** the 2026-06-12 work was committed and pushed from **one machine**. This clone **never pulled it**. On 2026-07-11 (S5/S6) I audited a repo that was **missing a session**, found no trace of TLS, and concluded it had never been taught — then **rebuilt the entire tracking system on top of that conclusion.** `STATUS.json`, `COMPLETION.md`, `REVISION_SHEET.md` and `ROADMAP.html` all inherited the falsehood. The S6 headline — *"the standing debt"* — was **the audit mistaking its own blind spot for his.**
- **Root cause (mine):** **an unpushed/unpulled commit is an unreplicated write, and I never checked for divergence.** The `SessionEnd` hook **committed but did not push**. `SessionStart` printed decay clocks, drift detection across four trackers — **and never once ran `git fetch`.** It policed consistency *inside* one replica while the replicas themselves silently forked.
- **This is Entry 006 again, one layer up, and I should have seen it.** Entry 006: *four files, no consistency protocol, the flattering replica won.* I fixed that with `STATUS.json` — and then let **two clones of the whole repo** diverge with no protocol at all. I built a canonical record and left it **unreplicated**. **The bug I keep making is the bug I am employed to teach.**
- **The cruelty of the specific failure:** I did not merely lose a session. I **overwrote a 4/5 pass with "never taught,"** and then wrote a lesson plan telling S7 to **teach TLS from scratch** — which would have handed him, as new material, a derivation **he had already produced himself.** That is `TEACHING_LOG` Entry 001's error (hand him the answer) reached by a new road. *What he derives, survives — unless the mentor forgets he derived it.*
- **What the real state is, now recovered:** 1.9 is **not virgin ground and not banked.** It is **31 days stale at 4/5, with one beat open.** S7 = **cold re-gate, not first teach.** Assume the terms are gone; the mechanism was his once — **ask, do not tell.** Then close the MITM beat. *A gate held open decays exactly as fast as a gate never opened.*
- **Fixes, this session:** (1) `SessionEnd` hook now **commits AND pushes**, retries once via rebase, never force-pushes, and **shouts to stderr** if the push fails. (2) `SessionStart` hook now runs **`git fetch`** and refuses to be quiet about **ahead/behind** — a remote-ahead clone must **pull before it audits anything**. (3) `CLAUDE.md` §7 — **PUSH EVERY COMMIT**, standing order 7. (4) `STATUS.json`, `COMPLETION.md`, `REVISION_SHEET.md` corrected to the recovered truth, with the provenance written beside it so nobody "re-corrects" it back.
- **Memory anchor:** *"A commit that is not pushed is not a record — it is a rumour on one disk. `git push` is the `fsync`."*
- **Retest:** if a session ever begins on a clone that is behind `origin` and teaching starts anyway, this entry has failed.
