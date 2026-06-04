# Revision Command Center  (spaced repetition via /revise)
> Learned only when Hema can recall, explain, apply, identify tradeoffs, use in design, and teach it.

## Active Recall Queue
| Topic | Last Reviewed | Next Due | Confidence |
|---|---|---|---|
| DNS | repo-day | +7d | High |
| TCP | repo-day | +7d | High |
| TLS | repo-day | +3d | Medium (DH initially shaky) |

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
