# Completion Tracker — how much is actually done
> "Banked" = passed the Mastery Gate cold. "Covered" = taught but not gated. Never inflate.

## Headline
> **Atom numbering is now `SYLLABUS.md`'s** (1.1–1.19), and the honest denominator is **166 atoms enumerated across 15 modules** — see `notes/ROADMAP.html`. That is fewer than the ~250 estimated, because **Modules 2–14 have not been `/breakdown`-decomposed yet**; the count will *rise* as the map gets more honest, which is **not** progress.

- Modules touched: 2 of 15 (Foundations = **DEBT, skipped**; Networking in progress)
- **Atoms banked cold: 4 / 166 (2.4%)** — `1.2` IP/best-effort · `1.3` DNS (S3) · `1.4` TCP 3-way handshake (S4) · `1.10` HTTP/1.1 req-resp (S2)
- **Demoted S6:** `1.5` TCP loss recovery — was ✅ BANKED, now ⚠️ **TERMS LOST**. Mechanism re-derived cold and unaided in S5; **named none of it.** Description without the term is not a pass.
- **Covered, never gated:** `1.7` UDP (derived from TCP's head-of-line cost, S4). Covered proves nothing.
- **Current frontier:** `1.9` **TLS 1.3 + Diffie–Hellman** — ⚠️ **TAUGHT AND PART-GATED 2026-06-12, THEN LEFT FOR 31 DAYS.** DH passed 4/5 gate dimensions cold that day (real math: `g`, `p`, `g^a mod p`, shared `g^(ab)`; modular exponentiation easy / discrete log hard; the secret never goes on the wire). The gate was **held open on one beat — the active-MITM mechanism** (two separate handshakes; the attacker never computes `g^(ab)`). **It was never closed.** 31 days at 4/5 with an open beat, against a learner whose terms decay in 29 — treat the whole atom as **due for a cold re-gate**, not as banked. Not counted in the 4.
  > **Provenance note (S7):** this fact was recovered from git on 2026-07-13. The 2026-06-12 session was committed from another machine and **this clone never had it**, so the S6 audit wrote *"never gated, never taught"* — which was false. See `TEACHING_LOG.md` Entry 007. The record was wrong because it was **local-only**; that is the whole reason for the push rule.

## Module-by-module
| Module | Atoms banked | Atoms enumerated | % banked | Status |
|---|---|---|---|---|
| 0 Foundations | 0 | 11 | 0% | ⚠️ **DEBT — owed before Module 2** |
| 1 Networking | **4** | 19 | **21%** | In Progress (+1 terms-lost, +1 covered, 1 current) |
| 2 Databases | 0 | 14 | 0% | Locked (needs M0 · 0.5–0.7) |
| 3 Caching | 0 | 8 | 0% | Locked |
| 4 Scalability | 0 | 9 | 0% | Locked |
| 5 Distributed Systems | 0 | 13 | 0% | Locked |
| 6 Messaging | 0 | 11 | 0% | Locked |
| 7 Storage | 0 | 7 | 0% | Locked |
| 8 Observability | 0 | 5 | 0% | Locked |
| 9 Security | 0 | 8 | 0% | Locked |
| 10 Infrastructure | 0 | 8 | 0% | Locked |
| 11 HLD | 0 | 16 | 0% | Locked |
| 12 LLD | 0 | 23 | 0% | Locked |
| 13 Advanced | 0 | 8 | 0% | Locked |
| 14 Interview | 0 | 6 | 0% | Locked |
| **TOTAL** | **4** | **166** | **2.4%** | |

## Projects: 0 / 10 started.

> Update at every /gate pass. This is the only file allowed to state "% done", and only as a rough banked-atoms ratio — never as program-wide vanity progress.
> **The atom-status numbers here MUST match the data block in `notes/ROADMAP.html`.** They are two replicas of one truth with no consistency protocol between them — which is a distributed-systems bug, in a distributed-systems curriculum. Until that is fixed, reconcile them by hand at every `/gate`.
