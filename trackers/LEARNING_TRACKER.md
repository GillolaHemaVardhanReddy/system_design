# Learning Command Center
> Single source of truth. Updated each session. Scores = "demonstrated cold".

## Student: Hema Vardhan · 4 months · FAANG-level HLD+LLD+distributed mastery.

## Current Status
- Module: **1 — Networking** · Atom **1.9 — TLS 1.3 + Diffie–Hellman.** **OPENED in S6, not taught, not answered.** S7 resumes cold on the key-exchange forcing question. Phase: Learning.
- **Banked cold: 4 / 166 atoms (2.4%)** — `1.2` IP best-effort · `1.3` DNS · `1.4` TCP 3-way handshake · `1.10` HTTP/1.1. See `notes/ROADMAP.html`.
- **⚠️ Demoted S6:** `1.5` TCP loss recovery — was BANKED, now **TERMS LOST**. Mechanism re-derived cold and unaided in S5; **named none of it.** Description without the term is not a pass.
- **Covered, never gated:** `1.7` UDP.
- **⚠️ DEBT:** Module 0 (Foundations) was skipped. **Owed before Module 2** — isolation levels are a concurrency problem in a SQL costume.
- **S6 taught nothing.** It was an infrastructure session (books indexed, roadmap built, status reconciled). Nothing here moved on evidence of learning.

## Knowledge Scores (honest, low until proven)
System Design 6/100 · LLD 0/100 · Distributed Systems 2/100 · Backend Eng 16/100 · Interview Readiness 4/100 · Overall Maturity 7/100

## Topic Mastery
| Topic | Learned | Practiced | Revised | Mastered |
|---|---|---|---|---|
| DNS (1.3) | Yes | Yes | Yes | ✅ **Banked cold** (S3) |
| TCP handshake (1.4) | Yes | Yes | Yes | ✅ **Banked cold** (S4) |
| TCP loss recovery (1.5) | Yes | Yes | Yes | ⚠️ **TERMS LOST — demoted S6.** Mechanism 7/10 cold; **terms 0/10.** Re-gate. |
| UDP (1.7) | Yes (derived) | Partial | No | 🟡 Covered — never gated. Proves nothing. |
| **TLS / DH (1.9)** | **No — opened S6, not taught** | No | No | 🔵 **CURRENT. Never gated, never taught to depth. The standing debt.** |
| HTTP req/resp (1.10) | Yes | Yes | Pending | ✅ **Banked cold** (S2) — safe/idempotent precision to re-test |

## Strengths: first-principles derivation; self-correction (he broke his own wrong discriminator with a counterexample, S5); pattern transfer; **accurate self-diagnosis of the method** — he named the term-loss problem before it was fully diagnosed, and pushed the synonym rule into CLAUDE.md against Jimmy's resistance. He was right.
## Weaknesses: layer-fusion under recall (trend: shrinking but **flared once at TCP-gate Q5** — wrong *mechanism* for the *condition*; self-repaired cold same session); safe-vs-idempotent precision; TCP polish — say "**3** dup-ACKs", security layer is **TLS not HTTP**, ACKs are the steady "got it" heartbeat (not just a loss signal).
## Revision Queue: TLS Diffie–Hellman cold; cert-vs-key-exchange ordering; HTTP safe-vs-idempotent line; TCP condition→recovery-mechanism mapping (silence→RTO, flowing→fast-retransmit).
