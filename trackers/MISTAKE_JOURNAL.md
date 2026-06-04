# Engineering Failure & Mistake Journal  (append via /mistake)
> Goal: the same mistake never happens twice.

## Recurring Mistake Tracker
| Mistake | Times Repeated | Last Seen |
|---|---|---|
| Layer-fusion (wrong layer / pipeline collapsed) | 4 | Session 1 (Nginx "choosing a port") |

## Weakest Topics: 1. Cross-layer sequencing (which actor, which job, what order).

## Entry 001 — Layer-fusion blind spot
- **Topic:** Networking (DNS/TCP/TLS/web-server routing)
- **4 instances:** (1) HTTP-500 for a DNS failure (500 needs a reached web server; DNS fails before HTTP exists). (2) "port comes from DNS" (DNS gives only IP; port = scheme `https`→443, chosen by browser). (3) routing vs demux mislabeled (gave routing to resolver—already gone—and demux to Nginx—not yet involved). (4) Nginx "chooses a port" (virtual hosting picks a SITE/backend, never a port).
- **Category:** incorrect mental model · assumption error
- **Root cause:** under recall pressure, flattens an ordered pipeline and grabs the nearest familiar actor. Sequencing failure, not knowledge gap.
- **Correct model:** DNS(name→IP, exits) → browser(scheme→port) → routers(IP→machine) → OS(port→program, demux) → Nginx(domain→site). Five actors, one job each, in order.
- **Red flags:** two ideas "merging" into one sentence; "DNS…port…Nginx" together; stating a guess as a conclusion.
- **Memory anchor:** "Relay race, not a scrum — one runner per leg."
- **Mitigation:** label guesses as guesses; list actors-in-order before answering.
- **Confidence:** 4/10 → 8/10. Trend: shrinking.
- **Retest:** Yes — re-ask "which layer owns each job" next session.
