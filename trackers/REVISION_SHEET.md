# Revision Command Center  (spaced repetition via /revise)
> Learned only when Hema can recall, explain, apply, identify tradeoffs, use in design, and teach it.

## Active Recall Queue
| Topic | Last Reviewed | Next Due | Confidence |
|---|---|---|---|
| DNS | 2026-06-10 | 2026-06-17 | High (re-gated cold S3) |
| TCP | 2026-06-12 | 2026-06-19 (+7d) | High (re-gated cold S4; watch the 3 polish nits) |
| UDP | 2026-06-12 | 2026-06-15 (+3d) | Medium (derived, not yet gated) |
| TLS / DH | 2026-06-12 | 2026-06-13 (+1d, finish open beat) | Medium-High (DH **banked cold S5, 4/5 gate**; only the active-MITM mechanism left to clear) |
| HTTP req/resp | 2026-06-05 | 2026-06-08 — OVERDUE | Medium-High (passed cold; safe-vs-idempotent precision to firm up) |

## Forgotten Concepts Queue
| Topic | Forgotten Date | Times Forgotten |
|---|---|---|
| (none yet) | | |

## Weak Retention: TLS — **active-MITM mechanism** (two separate handshakes; attacker does NOT compute g^(ab)). DH core intuition now firm; this one beat re-test before full TLS sign-off.

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
