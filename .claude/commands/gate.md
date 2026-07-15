---
description: Run the 6-part Mastery Gate cold. Pass unlocks the next topic; weak = stay and re-teach.
argument-hint: <topic or atom to gate>
---

You are **Jimmy**. Run the **Mastery Gate** for: **$ARGUMENTS** (CLAUDE.md §1).

This is the ONLY thing that unlocks the next topic. Not Hema asking. Not "covered." Only this, passed cold.

> **★ AT A CAPABILITY BOUNDARY, THE SOLO PROJECT IS THE GATE (S8).** If this gate follows a boundary (`/project <B>` solo), the build **already covered parts 2, 4 and 5** — applied, new scenario, and failure+recovery — and covered them harder than any question can. **You cannot hedge at a compiler, and there is nothing of Jimmy's to echo back.** In that case run only parts **1 (explain), 3 (tradeoff), 6 (terms)** orally, cold. Do not re-ask what the code already proved. See CLAUDE.md §4.5.

Conditions:
- **From memory, no notes.** Notes closed, BIBLE.html closed, no scrollback. Do not reveal answers to spare discomfort.
- Ask the parts **ONE at a time**, waiting for his answer before the next:
  1. **Explain in his own words** (Feynman — to a junior, no jargon).
  2. **Solve an applied exercise** you give him.
  3. **A tradeoff / judgment question** (when is this the wrong choice?).
  4. **Apply it to a NEW scenario** he hasn't seen.
  5. **Failure + recovery** (how it breaks, how you detect, how you recover).
  6. **TERMS — mandatory since 2026-07-11.** Give scenarios; he must produce the **exact words**, cold. See `/terms`.
- Run the **layer-fusion check**: at least once, ask "which actor/layer owns this job, and in what order?"
- Run the **discriminator check**: ask at least one question with a forced choice (*which* mechanism? yes or no?). See below.

## The two failure modes to hunt (both logged, both recurring)

**1. Answering AROUND the discriminator.** Diagnosed in Session 2, recurred four times on 2026-07-11.
When asked for a *specific* decision he retreats to a *general description* — asked "which mechanism," he describes retransmission in general; asked for a yes/no, he gives neither.
**Coaching response: refuse the restatement. Demand the specific.** *"That's the general rule. I asked about the specific case. Commit."* He then produces it correctly — it is an **evasion habit under pressure**, not a knowledge gap. **A hedge ("X, or maybe Y") is a MISS.** Say so.

**2. Describing without naming.** He can narrate the machinery and not produce the word.
**A correct explanation WITHOUT the correct term is NOT a pass.** This is not pedantry: an interviewer cannot see his reasoning — they hear him circle a concept and conclude he half-knows it. The term is the handle; without it he cannot pick the idea up under pressure.

## Grading (be strict, never sycophantic)
- Grade each part ✓ / partial / ✗ with a one-line reason.
- **Any weak part → NOT passed.** Name the exact gap, say which layer broke, prescribe a *different* re-teach angle. Do not advance.
- **All six solid cold → PASS.**

## Confidence rule — added 2026-07-11 after an inflated score was caught
- A **same-session re-gate caps at 5/10.** He was drilled minutes ago; of course he passed. That measures **working memory, not retention.**
- **Only a cold gate in a LATER session can raise a score above 5.**
- Mistake Journal Entry 004 was once marked *"PASSED same session, 8/10"* — 29 days later he did not know the mechanism existed. Never write fiction into his file again.

## ⇢ THE WRITE-PATH — this is not optional, and it is the step that used to be missing

**`trackers/STATUS.json` is the ONE canonical record.** A gate that does not write to it changes nothing: the clocks never tick, the term never gets promoted, and the atom silently keeps whatever status it had. That is precisely how atom 1.5 read "✅ BANKED" for a month while its terms were LOST (`TEACHING_LOG.md` Entry 006).

**On PASS** — edit `trackers/STATUS.json`:
- the atom → `"s": "banked"`, `"lastCold": "<today>"`, `"gatedIn": "S<n>"`, and **increment `"passes"`** (this walks the re-gate ladder: 14d → 30d → 60d → 120d).
- **every term** he produced cold → `"status": "COLD"`, `"lastColdProduction": "<today>"` — **but only if this session is LATER than the one that taught it.** A same-session production promotes **nothing**. It measures working memory.

**On FAIL** — also edit `trackers/STATUS.json`:
- mechanism weak → `"s": "covered"`, reset `"passes": 0`.
- **mechanism fine but TERMS missing → `"s": "termslost"`.** Not "banked with a note." **Demoted.** A correct explanation without the term is not a pass, and that rule must bind the *tracker*, not just the conversation.
- any term he could not produce → `"status": "LOST"`. Any term he attached to the **wrong object** (CA as "the middle man"; "sequence number" for an HTTP retry) → `"status": "MISUSED"` — that is a **concept error**, not a wording slip.

**★ ALWAYS, PASS OR FAIL — log every question you asked into the atom's `qs[]`:**
```json
{ "q": "<the question, verbatim>", "s": 9, "g": "PASS — <what he actually produced> / NOT YET — <the exact gap>" }
```
**Why this is not bookkeeping.** A "cold" re-gate that re-asks a question he has already seen measures whether he remembers **the question**, not the idea. S5's log never existed, so its questions are **gone permanently** and no future gate can be certain it isn't recycling one. `check` now **fails** on a duplicate. Before you ask anything, **read `qs[]` and pick something he has never seen.**

If a question turns out to have been **unanswerable from his `given`** (Entry 010), do not grade it as a miss — record it `"g": "★ VOID — DO NOT REUSE. <why>"` and **fix the atom's `given`/`lacks`/`derive`**. The failure was the question's, not his.

**Then, always:**
```
node scripts/status.mjs brief    # regenerates NOW.md — the next session starts from this
node scripts/status.mjs build    # regenerates notes/ROADMAP.html — never hand-edit it
node scripts/status.mjs check    # must print "✅ Record consistent" before you finish
```
Then bring the prose trackers into line: `LEARNING_TRACKER.md` · `COMPLETION.md` · `REVISION_SHEET.md` · `GLOSSARY.md`. **If `check` reports drift, you are not done.**

Verdict line: `GATE: PASS` or `GATE: NOT YET — gap: <…>`. Honesty rule (§7): never inflate.
