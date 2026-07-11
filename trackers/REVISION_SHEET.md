# Revision Command Center  (spaced repetition via /revise)
> Learned only when Hema can recall, explain, apply, identify tradeoffs, use in design, and teach it.

## Active Recall Queue
> ⚠️ **Reset 2026-07-11 (S6).** The old dates were June and every row read OVERDUE — a queue nobody re-arms is a queue nobody reads. **Nothing was drilled in S6**, so no date below was pushed forward on merit. **A "next due" date only moves when a RETRIEVAL EVENT happens** — never because time passed, and never because a document was written.

| # | Topic | Last **retrieved cold** | Next due | Confidence |
|---|---|---|---|---|
| 1.3 | DNS | 2026-07-11 (S5, repaired cold) | **+7d → 2026-07-18** | High — but root→TLD→authoritative had collapsed once; re-check the tiers |
| 1.4 | TCP 3-way handshake | 2026-06-12 (S4) | **OVERDUE — 29d gap already proved decay** | Medium-High. *Purpose = sync seq numbers both directions; liveness is a side-effect.* |
| 1.5 | TCP loss recovery | 2026-07-11 (S5, mechanism only) | **NEXT SESSION — re-gate** | ⚠️ **Mechanism 7/10 · TERMS 0/10.** Demoted. Repair = **re-derive + re-christen**, never re-quiz. |
| 1.7 | UDP | 2026-06-12 (S4) | **OVERDUE — never gated** | Medium. Derived from head-of-line blocking, which he then could not name. |
| **1.9** | **TLS / Diffie–Hellman** | **2026-06-12 — 4/5 gate dimensions, cold. Beat 5 (active MITM) never closed.** | **NOW — S7: cold re-gate, all 5 beats** | ⚠️ **31 days at 4/5 with the gate held open.** DH math was firm *that day*. His terms decay in 29 — assume nothing survived; re-derive, re-christen, then close the MITM beat. |
| 1.10 | HTTP req/resp | 2026-06-05 (S2) | **OVERDUE** | Medium-High. Idempotent = same end **STATE**, not same response — he got this wrong in S5. |

## Forgotten Concepts Queue
| Topic | Forgotten Date | Times Forgotten |
|---|---|---|
| **Head-of-line blocking** (the term; he derived UDP *from* it) | 2026-07-11 | 1 |
| **Fast retransmit** (the term) | 2026-07-11 | 1 |
| **RTO / exponential backoff** (the terms) | 2026-07-11 | 1 |
| **Certificate Authority** (called it "the middle man" — the *attacker's* name) | 2026-07-11 | 1 |
| **Idempotent** (defined as "same response"; it is same end **STATE**) | 2026-07-11 | 2 |

## Weak Retention
1. **⚠️ Terms, across the board.** Not one Module-1 term has been produced **COLD in a later session**. This is the live problem — `MISTAKE_JOURNAL.md` Entry 005.
2. **TLS / Diffie–Hellman** — taught 2026-06-12, **4/5 cold, gate held open on the active-MITM beat, then abandoned for 31 days.** The one specific thing to re-test: the attacker runs **two separate handshakes** and **never computes `g^(ab)`** — that is why encryption alone doesn't authenticate, and why the **certificate** (identity) is a separate job from **DH** (secrecy).
3. **Banked ≠ permanent.** DNS, TCP and HTTP were banked and then decayed over 29 days. **A banked atom with no re-gate clock is a lie with a timer on it.**
4. **An open gate is not a bookmark.** 1.9 was left one ten-minute beat from closing and sat for a month. *A gate held open decays exactly as fast as a gate never opened.*

## Mental Models Library — Networking
- Names for humans, addresses for machines (DNS bridges).
- Push-everything fails at scale → pull on demand + cache (TTL-bounded).
- Each tier ignorant of the tier below → keeps the map distributed (delegation).
- Routing ≠ secrecy: destination IP delivers, doesn't hide.
- DH: shared secret is built on both ends, never sent.
- Trust anchors: hardcoded root DNS IPs ≅ pre-installed CAs.
- Relay race, not a scrum: each layer does one leg, hands off (anti-fusion anchor).
- HTTP is paper; the server/browser is the hand that writes it (protocol ≠ actor).
- Safe ⊂ idempotent ⊂ all: GET safe+idempotent · PUT/DELETE idempotent · POST neither.
- Idempotent ⇒ blindly retry-safe; POST needs an idempotency key. Idempotency = same end STATE, not same status code.
- 4xx = your fault (don't retry) · 5xx = server's fault (retry w/ backoff, page on-call).
- **TCP would rather be late than wrong; UDP would rather be wrong than late.** (reliability+ordering vs raw speed)
- **Head-of-line blocking:** one stuck item at the front of an in-order queue freezes every *ready* item behind it. TCP's cost = **latency**, not privacy.
- Drop ordering alone ≠ enough; reliability still forces the re-fetch round trip. To never freeze you drop **both** ordering *and* reliability → that's **UDP**.
- Handshake = **synchronize starting sequence numbers, both directions** (SYN / SYN-ACK / ACK). Liveness is a side effect; numbering is the point — that's why a tunneled connection *resumes*, not restarts.
- **No traffic, no dup-ACKs.** Silence → **retransmission timeout** (timer + backoff). Packets still arriving past a gap → **fast retransmit** (3 duplicate ACKs). Pick by asking "is the wire flowing or silent?"
