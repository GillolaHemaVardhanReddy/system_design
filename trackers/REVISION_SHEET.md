# Revision Command Center  (spaced repetition via /revise)
> Learned only when Hema can recall, explain, apply, identify tradeoffs, use in design, and teach it.

## Active Recall Queue
| Topic | Last Reviewed | Next Due | Confidence |
|---|---|---|---|
| DNS | repo-day | +7d | High |
| TCP | repo-day | +7d | High |
| TLS | repo-day | +3d | Medium (DH initially shaky) |
| HTTP req/resp | 2026-06-05 | 2026-06-08 (+3d) | Medium-High (passed cold; safe-vs-idempotent precision to firm up) |

## Forgotten Concepts Queue
| Topic | Forgotten Date | Times Forgotten |
|---|---|---|
| (none yet) | | |

## Weak Retention: TLS / Diffie–Hellman intuition — re-test before full mastery.

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
