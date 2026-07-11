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
