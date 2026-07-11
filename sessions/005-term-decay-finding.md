# Session 005 — The term-decay finding · toolkit rebuild
**Date:** 2026-07-11 · **Gap since S4:** **29 days** · **Module 1 — Networking**

> ⚠️ **THIS LOG WAS RECONSTRUCTED AFTER THE FACT, in Session 6.**
> S5 was committed (`09cb3a9 "Session 005: term-decay finding + toolkit rebuild"`) **with no session log** — the one file the `/session` protocol exists to produce. It is rebuilt here from `MISTAKE_JOURNAL.md` Entry 005, `TEACHING_LOG.md` Entries 001–004, `BEHAVIOR_LEARNING.md` and `GLOSSARY.md`.
> **The per-question grades below are therefore partial**, because the questions themselves were never written down. That loss is permanent and it is Jimmy's. See `TEACHING_LOG.md` Entry 005.

---

## What happened

A **29-day gap**. Hema asked to skip the decay check ("don't waste time on old topics"). The check was run anyway. **Cold sweep: 1.5 / 6.** After re-teaching: ~3.5 / 6 — which, per the same-session rule, **measures working memory, not retention**, and banks nothing.

## ⭐ THE FINDING — concepts survived, terms did not

Every miss had the **same shape**: he described the machinery correctly and **could not name it.**

| Mechanism | He could explain it | He could name it |
|---|---|---|
| Head-of-line blocking (which he *derived UDP from* in S4) | ✅ described packets 3/4/5 frozen behind a missing 2 | ❌ **no name** |
| Fast retransmit | ✅ **re-derived it from scratch, unaided** | ❌ *"I don't know what the other mechanism is"* |
| RTO | ✅ described the timer perfectly | ❌ **no name** |
| Exponential backoff | ✅ described the doubling | ❌ **no name** |
| Certificate Authority | ✅ described its role correctly | ❌ called it **"the middle man"** — *the attacker's name* |
| Idempotent | ❌ "same **response**" | — it is same end **STATE** |

**Root cause: what he DERIVES survives; what he is HANDED rots.** His behaviour file has said *"learns by deriving, not receiving"* since Session 1 — and the consequence was never drawn for **vocabulary**. The terms were the one thing he never derived. They were handed to him as labels in a recall-anchors list, so after a month the concepts came back and the names did not.

His own words, and they are the diagnosis: *"who in their right mind would come up with fast retransmit or head-of-line blocking"* — **he had concluded the names were arbitrary and stopped trying to hold them.** They are not arbitrary. They are the concept, compressed.

## Genuine wins, cold

- **The DNS chain repaired** — root → TLD → authoritative, no longer collapsed. He had previously had the root NS holding authoritative IPs (deleting a whole tier).
- **Fast retransmit re-derived from scratch.** Given "packet 2 lost, 3/4/5 arrive," he produced cumulative ACKs → 3 duplicate ACKs → resend immediately. Unaided.
- **He destroyed his own wrong discriminator.** He proposed "data-lost vs ACK-lost"; handed the *packet-5-is-the-last-packet* counterexample, he broke it himself and arrived at the correct one — **flowing vs silent**. This is the method working exactly as designed.
- **Encrypted ≠ safe** — he held MITM apart from Diffie–Hellman cleanly, and spotted the MITM hole before being shown it.
- **He walked DNS → TCP → HTTP unaided.** Layer-fusion is **shrinking**.

## Blind spots observed

- **Term decay** — 5 instances. *The live problem.* → `MISTAKE_JOURNAL.md` Entry 005.
- **Discriminator-dodging** — recurred **4×**. Now understood as largely a **symptom** of the term gap: he is reaching for a word that isn't there, and description is the fallback.
- **Layer-fusion** — 2 instances, but trend **shrinking**.

## Jimmy's failures this session (all logged in `TEACHING_LOG.md`)

1. **Entry 001** — terms were never taught, only mentioned. Four sessions of it, invisible because nothing was looking.
2. **Entry 002** — a same-session re-gate was graded as *retention* and written into the permanent file as **8/10**. It was fiction; 29 days later he didn't know the mechanism existed. Real score: 2/10.
3. **Entry 003** — the discriminator-dodging diagnosis was **already on disk** from Session 2, with the fix beside it. Jimmy re-diagnosed it from scratch after Hema had failed four questions.
4. **Entry 004 ⭐** — Jimmy tried to fix the term problem with a **standalone 10-question term exam**, as the *opening act* of the session. Hema scored 3/10 and **disengaged**: *"I am losing interest because of these accurate hundred percent exact terms tests."* **A derivation problem was answered with an examination** — the one mode that teaches him nothing.

## What Hema was RIGHT about, and pushed until it changed the method

**Grade the referent, not the spelling.** "fast retransmission," "middleman," "exponent" — all land on the right object, all are passes. Docking him for letter-perfection is pedantry, it kills engagement, and engagement is the scarce resource. → now **CLAUDE.md §1, the synonym rule** and **no-echo-grading**.

**What he was wrong about, and where the line held:** *"any word that describes it is enough."* No. A word that names the **wrong object** is a **concept error wearing a term gap as a costume** — *"UDP is fast and **accurate**"* (accuracy is what it *sold*) and *"**sequence number**"* for an HTTP retry (TCP machinery answering an HTTP question). Both fail *his own* proposed test.

## Rules adopted (CLAUDE.md)

**Name-at-birth** · **synonym rule** · **no echo-grading** · **NO standalone term exam** · **teach-by-connection** · **real-world anchor** · **source-grounded teaching** · same-session re-gates **cap at 5/10**.

## Outcome

- **Nothing banked.** Every score in this session was same-session and therefore caps at 5/10.
- `1.5` TCP loss recovery: mechanism 7/10, **terms 0/10** → demoted to ⚠️ TERMS LOST in S6.
- `GLOSSARY.md` created. Every Module-1 term entered as **LOST** or **WARM**. None is COLD.
