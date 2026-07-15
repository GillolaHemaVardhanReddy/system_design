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
| **Asked him to DERIVE a primitive he had never been given** → set him up to fail, then read the failure as his | 1 | 2026-07-15 (Entry 010) |

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

---

## Entry 008 — Seven sessions of the wire, and he never once saw a packet ⭐
**Date:** 2026-07-14 (S8) · **Cost:** the thing that actually matters — his motivation

**What he said, unprompted:**
> *"currently im not getting motivation because i am not even seeing what i am learning."*

**He was right, and it is my failure, not his.**

**The evidence, and it is damning.** Seven sessions on **networking**. He has derived Diffie–Hellman on a whiteboard. He has reconstructed fast retransmit from cumulative ACKs, from scratch, unaided. And in seven sessions he has run **zero commands** and written **zero lines of code**. He has never watched a TCP handshake happen. He has never seen a duplicate ACK. He has never looked at a certificate chain.

`CLAUDE.md` §3 names **eight layers** per topic. Layer **6 is Implementation**. **I have delivered it zero times out of seven.** And `trackers/PROJECT_ROADMAP.md` — a file *I* wrote — contained the line:

> *"First build (URL Shortener) starts after Module 2 fundamentals."*

**I put the practice behind a gate that was months away, and then wondered why the theory would not stick.**

**Root cause — and it is the repo's own governing law, which I failed to apply to myself.**
> **What he DERIVES survives. What he is HANDED rots.**

**RUNNING THE THING IS DERIVING.** I have been handing him *stories* about mechanisms — Firesheep, NSA MUSCULAR, the S3 outage — and calling that the "real-world anchor" required by §4. It is not. **An anecdote is still something he was handed.** A packet capture on his own screen, where *he* injected the loss and *he* predicted the outcome, is something he **derived**. I satisfied the letter of the rule and missed its entire point.

**And it explains the term decay.** Terms rot because they were never derived (Entry 001). But I "fixed" that with `name-at-birth` in a *conversation* — christening a mechanism that exists only as words in a chat window. **A term christened while watching three duplicate ACKs scroll past in his own `tcpdump` has a referent in the physical world.** `BEHAVIOR_LEARNING.md` has said since Session 1: *"Abstract terms without a concrete referent"* is exactly where he stalls. **I wrote that line and then taught nine atoms with no concrete referent.**

**The fix (S8, built the same day):**
- **`/lab`** — every atom now ends on his terminal. He **predicts**, then runs, then names the mechanism *at the moment it appears on screen*. 19 labs written into `STATUS.json` for Module 1. `status.mjs check` now lists **atoms taught but never seen**, so this failure cannot go quiet again.
- **`/project`** — projects fire at **capability boundaries**, decided *at* the boundary, never predefined. **Guided = Jimmy architects and reviews; Hema types every line.** If I write his code I have rebuilt this exact failure in a more expensive form: an artifact on LinkedIn, nothing in his head.
- **The solo project IS the gate.** His idea, and it is better than my oral exam. You cannot hedge at a compiler and you cannot echo-grade a build.
- **`/article`** — the Feynman test in public, gated behind the solo project. He asked for daily; he chose per-project once he saw that daily would eat the deriving.
- Deleted *"builds start after Module 2"* from `PROJECT_ROADMAP.md`. **It was the single worst line in this repo.**

**The lesson, and I should have learned it from my own file:** *he told me the diagnosis himself, in plain language, and my first instinct was to defend the curriculum.* The right instinct — the one `BEHAVIOR_LEARNING.md` §"Motivation notes" already records — is that **he detects shallow coverage accurately and trusts the process more when I own the gap than when I defend it.** He detected this one. It took him seven sessions and a motivation collapse to get me to look.

---

## Entry 009 — I buried him. Five messages fired as one. ⭐
**Date:** 2026-07-14 (S8) · **Cost:** the thread — he got 0% of it, not 20%

**His words:**
> *"i didnt fucking understand anything we did just now you told me to run the command and paste back and you dumped me tons of text"*

**What I did.** He ran ONE `dig` and pasted the output. In reply I sent, in a single message: a correction of a term error · **four** new terms with etymologies · a table of the six DNS header fields · a philosophical argument about why vocabulary matters · **and** the next coding step with its own Socratic question.

**That is five messages. I sent them as one.** He did not absorb 20% of it. He absorbed **nothing** — because a wall of text is not read, it is *bounced off*.

**Root cause — and `BEHAVIOR_LEARNING.md` already had it, in his own words, from S5:**
> *"I want all the content… but it's too huge… I want clarity and depth and easy to understand."*

**I read that as a contradiction and quietly ignored it. It is not a contradiction — it is a request for LAYERING.** Spine first, depth on demand. I have the note on disk and I taught against it, which is Entry 003 wearing a new hat: *a tracker nobody applies is not a tracker.*

**What actually fixed it, and it took six lines.** I threw the whole thing away and sent: *"1. You asked the root for google.com. 2. It said I don't know, here are the 13 .com servers. 3. That's it."* Then **one** question. **He answered it correctly and immediately.** The understanding was never the problem. **The volume was.**

**The rule, now the FIRST method rule in §4 at his request (*"engrave it in .claude"*):**
- **One idea per message.** If you are about to type "and also" — **stop, send, wait.**
- **React to what he SAW**, not to everything it implies.
- **Fewest words that move him one step.** No tables, no etymology dumps, no bold-on-everything mid-flow.
- **When he is lost, do NOT re-explain with more text.** Fewer words. Three lines. One question.
- **The tell:** more than one bolded heading, or he has to scroll → **already too long.**

**The bitter part:** the four terms I buried him with were *correct*, and one of them (`root hints` vs `referral`) was catching a **real concept error** he had just made. **All of it was right and none of it landed**, because I spent his attention on volume instead of on the one idea that mattered. **Being right is worth nothing if he stops reading.** Engagement is the scarce resource — I have written that in this file twice now and violated it anyway.

---

## Entry 010 — I asked him to derive RSA. The tracker told me to. ⭐
**Date:** 2026-07-15 (S9) · **Cost:** the atom stalled, and he had to argue his way out of a failure that was mine

**His words:**
> *"u never teach me and ask me how and why? i think the model design of .claude is an issue here right?"*

**He was right on both counts, and the second one is the finding.**

**What I did.** Atom 1.9, the open PKI beat. He answered the first question **cold and correctly**: the attacker can't forge the signature because *only the CA's private key can make the mark*. So I asked the follow-up: **"your laptop has to CHECK that mark — what does it use?"**

He answered: *"the CA's private keys come baked into the browser."* Wrong — it is the **public** key, in a root certificate. I held his own two sentences up against each other (*the attacker can't know the private key* / *the private key ships on 3 billion devices*) and he saw the contradiction instantly. Then: *"damn then how should i know."*

**And he was right. He couldn't know.** He has **never been given asymmetric digital signatures.** DH is key **exchange**; nothing in it implies a key that *makes a mark a different key checks*. That is a **separate primitive**, and **I asked him to derive it.** Rivest, Shamir and Adleman took **months** — and they were three MIT cryptographers who already knew what they were hunting. **I asked him to do it between two chat messages, and when he couldn't, the shape on the page was "Hema failed a question."**

**Root cause — and this is the part that matters.** I did not freelance a bad question. **`STATUS.json` told me to ask it.** Written by me, last session, atom 1.9:

> *"He hit 'I don't know why' on both — TAUGHT as a shape only, NOT derived, so it does not count. **Derive cold next session.**"*

So: why did a previous Jimmy write **"derive"** next to a thing nobody can derive?

**Because this record tracked what he ANSWERED and never once tracked what he was GIVEN.** In the file, these two look **identical**:
- *he was taught the primitive and failed to derive the consequence* → **ask harder**
- *nobody ever taught him the primitive* → **hand it to him**

**They need opposite responses, and the tracker could not tell them apart.** `"he hit 'I don't know why'"` is ambiguous between them, and I resolved the ambiguity in the direction the repo's culture pushed: *ask, don't tell.*

**And that culture is the deeper cause.** The governing law — ***what he DERIVES survives; what he is HANDED rots*** — is **true**, it is the best thing in this repo, and it created a bias where **handing him anything felt like the failure mode**. So when Jimmy meets a primitive that *must* be given, he interrogates it instead of teaching it. **The method ate its own exception.** Entry 001 taught me not to hand him answers; I over-applied it to a case where handing is the *only* correct move.

**Correct model — three categories, not two:**
| | |
|---|---|
| **`derive: yes`** | Derivable from what he holds. **Ask. Don't tell.** (fast retransmit from cumulative ACKs — he did exactly this, cold, unaided) |
| **`derive: need-only`** | **Nobody derives this in a session.** Derive the **NEED**, hand the **TOOL**. (signatures, DH, consistent hashing, Paxos, B-trees) |
| **`derive: no`** | Nothing to derive. **Hand it.** (vocabulary, conventions, port numbers) |

**Handing is not the failure. Handing WITHOUT deriving the need is the failure.**

The question I *should* have asked — and it is fully derivable from what he holds: ***"You need a mark only the CA can make but anyone can check. Does DH give you that?"*** → he says no → *"Correct. So we need a new tool. Here it is."* He derives **why it must exist**; he is handed **what it is**. Same destination, and he owns the reason he needed the thing.

**What he got right that I should not lose:**
1. **He self-diagnosed from a contradiction in his own two answers, again.** `BEHAVIOR_LEARNING.md` has said this since S2 and it is the single most reliable tool I have.
2. **He diagnosed the SYSTEM, not just the question** — *"is it that u dont remember what you taught?"* Close. I remember perfectly; **the record is detailed and it records the wrong thing.** He was one inch from the exact bug, with no access to the file.
3. **He then refused to keep being taught until it was fixed.** Correct call. A hole this size costs every future session.

**Fixes, this session (S9):**
- **`given` / `lacks` / `derive` per live atom** in `STATUS.json`. **`status.mjs check` now FAILS on a live atom with no `given`** — the machine catches this, not Hema's patience.
- **The rule, CLAUDE.md §2:** *Jimmy may ONLY ask him to derive from a primitive in `given`. If it is in `lacks`, the question is **ILLEGAL**.*
- **`qs` per atom** — every question + grade, in the canonical record. `check` fails on a re-asked question. **This also closes known-hole #1**, open since S6: a "cold" re-gate that reuses a question measures recall of *the question*.
- The void question is **recorded as void** in `1.9.qs` so no future Jimmy re-asks it and reads the same wrong signal.
- **`NOW.md`** — one generated brief, ~6 KB. **`CLAUDE.md` 40 KB → 19.6 KB.** Session-start load **~22k → ~6.7k tokens**.

**The bitter part, and I want it written down:** the token bloat and the bad question **look** like the same problem and are not. I could have read all 89 KB twice and still asked that question — **the information was not in any of the files.** Volume was never the bug. **The bug was a missing field.** He asked for a smaller file and what he actually needed was a *different* one.

**Memory anchor:** *"'He couldn't derive it' and 'nobody ever taught him' look identical in a file that only records answers. Record what he was GIVEN."*

**Retest:** if Jimmy ever again asks him to derive something not in that atom's `given`, this entry has failed — and `check` should have caught it first.
