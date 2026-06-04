# Session 001 — DNS, TCP, TLS  (the google.com walk, first half)

Module: 1 Networking · Atoms: name→IP, ports/demux, reliable connection, encryption+identity
Status: Mastered (signed off cold next session)

## Atoms covered
- [x] Why names must map to IPs; why push-everything fails (discovery + propagation)
- [x] Pull-on-demand + caching; distance=latency
- [x] Hierarchy & delegation (root→TLD→authoritative); right-to-left
- [x] The four players + real-world identities; bootstrap (hardcoded root IPs)
- [x] TTL freshness tradeoff; stale≠error; planned-migration playbook
- [x] Ports: IP→machine, port→program; scheme→443; routers route, OS demuxes; Nginx picks a SITE
- [x] TCP: best-effort IP; sequence numbers + ACKs + timeout/retransmit; 3-way handshake
- [x] TLS: eavesdropping/key-exchange/identity; Diffie–Hellman; certificates + CAs; ordering

## Questions asked this session (quiz log)
| # | Question | Hema's answer (gist) | Grade | Note |
|---|----------|----------------------|-------|------|
| 1 | Why can't the computer use the name directly? | internet routes on IP, name is meaningless to it | ✓ | |
| 2 | Why does storing the full map on every device fail? | can't sync millions of changes; can't know external changes | ✓ | both reasons |
| 3 | Split the map — which part of the name first? | partition by dots, last part (.com) first | ✓ | derived hierarchy |
| 4 | Bootstrap: how find the entry point? | stuck → must be known-to-all, non-circular | partial | supplied: hardcoded root IPs |
| 5 | One server down — what does the user get? | claimed HTTP 500 | ✗ | DNS fails before HTTP; name-resolution error |
| 6 | Stale cache — always an error? | only if old IP dead; else hits old server | ✓ | after correction |
| 7 | TTL for yearly vs daily-changing service? | misread daily as monthly; wrong magnitude | partial | corrected: short TTL for fast-changing; err short |
| 8 | Which layer owns name→IP / port / routing / demux / site-choice? | gave routing to resolver, demux to Nginx | ✗ | LAYER-FUSION (key blind spot) |
| 9 | What does the stranger see on plain TCP? | no privacy, packets visible | ✓ | |
| 10 | Agree on a secret with an eavesdropper watching? | thought impossible | → taught | Diffie–Hellman paint analogy |
| 11 | Why can't attacker compute the shared secret? | one-way mix can't be un-mixed | ✓ | after re-explain |
| 12 | Internet version of a police-ID? | "ip or I don't know" | → taught | certificates + CAs |
| 13 | Why does copying the cert not help the attacker? | no CA signature / no private key | ✓ | |
| 14 | Why verify identity before key exchange? | MITM otherwise | ✓ | |
| 15 | Two places the trust-anchor bootstrap appears? | said "paint mix" + DNS | partial | corrected: CA list (not paint mix) + root IPs |

## Mental models that landed
postcards (TCP) · apartment+building (ports) · paint-mixing (DH) · police-ID (certs) · relay-race (anti-fusion).

## Mistakes (→ journal): layer-fusion ×4 (entry 001).

## Win | Weakness
- Win: derived three protocols from first principles; caught the MITM hole unprompted.
- Weakness: layer-fusion under recall (shrinking across the day).

## Tomorrow's plan: cold-recall DNS+TCP+TLS, then HTTP request/response.

---
## Jimmy's Evaluation
Learning quality: high — reasoning-driven, not memorized. Strengths: derivation, transfer, self-correction. Weaknesses: cross-layer sequencing. Blind spots: layer-fusion (trend shrinking). Recommended revision: TLS/DH cold; "which layer owns each job". Next topic: HTTP request/response. Readiness to proceed: Yes — after a cold-recall warmup.
