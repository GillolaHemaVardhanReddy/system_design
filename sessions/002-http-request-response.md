# Session 002 — HTTP request/response (incl. methods & idempotency)  (2026-06-05)

Duration: ~one long block | Energy before/after: 7/10 → 6/10 (dipped mid-session, recovered) | Focus: 8/10
Module / Topic / Atoms targeted: Module 1 Networking — HTTP request/response; method semantics (safe/idempotent); idempotency keys
Status: Mastered (gated cold on 2nd attempt)

## Atoms covered this session
- [x] HTTP request/response structure — **banked cold (gate #2)**
- [x] Method semantics: safe ⊂ idempotent ⊂ all — **taught + applied in gate**
- [x] Idempotency keys (POST retry-safety) — **taught + applied**
- [x] Layer-fusion remediation: "name the actor" drill — **reflex broken cold**

## Questions asked this session (the actual quiz log)
| # | Question | Hema's answer (gist) | Grade | Note |
|---|----------|----------------------|-------|------|
| **Teaching phase** | | | | |
| 1 | What must the request contain? | "return source IP; JSON body" | ✗ | Layer-fusion — source IP already done by TCP/IP |
| 2 | Derive the "what action" piece | "keep req type — fetch/accept/delete/update" | ✓ | Derived the **method** cold |
| 3 | The "which resource" piece (after domain) | "route" | partial | Right idea, wrong term — it's the **path**; route is server-side |
| 4 | Why announce the version on line 1? | "different versions → different formats to parse" | ✓ | Parsing contract |
| 5 | Shape for header metadata | "key-value pairs" | ✓ | Predicted Host/Accept-Encoding/Cookie |
| 6 | Why the blank line? | "server knows where header ends" | ✓ | Terminator |
| 7 | Status: why a number + which families? | named codes 200/404/500/401 | ✓ | Codes right (after first "codes exist" dodge) |
| 8 | Why a number not English? | "machines only understand 0s/1s" | ✗ | Wrong reason — it's a fixed enumeration, not "numbers only" |
| 9 | 4xx vs 5xx? | "4xx client fault, 5xx server fault" | ✓ | The blame split |
| 10 | Why Content-Type? | "could mislead, doc/object" | partial | Right instinct, muddy — bytes have no inherent type |
| **GATE #1 — NOT YET** | | | | |
| G1.1 | Feynman: what is HTTP? | pipe gives bytes, HTTP gives meaning | ✓ | |
| G1.2 | Build login request + status codes | restated headers, dodged specifics → then POST/2xx/4xx | partial | Retreat-to-structure; correct only after push |
| G1.3 | When is req/resp the wrong tool? | messaging → polling, not real-time | ✓ | |
| G1.4 | Expired token: code + actor ownership | 401 ✓; actor = "http req type / http response" | partial | **Protocol-vs-actor fusion** (5th instance) |
| G1.5 | POST timeout: detect + retry danger | timeout ✓, dup-order ✓, "GET has idempotency key" | ✗ | Idempotency **mis-assigned to GET** |
| **Remediation** | | | | |
| D | "Name the actor" drill (17 jobs) | fused on Content-Type→"http" (#9) & method→"http" (#14); broke by #15 ("coder") | ✓ | Reflex fixed in ~6 reps |
| I | Run-twice → same end state? (GET/POST/DELETE/PUT) | no/yes/no/no | ✓ | Derived idempotency cleanly |
| **GATE #2 — PASS** | | | | |
| G2.1 | Feynman: request vs response | browser writes req, server writes resp; covered both | ✓ | Actors named right |
| G2.2 | Build update-name request + defend method | PUT /user/99, body, 200; idempotent (1 nudge) | ✓ | Surfaced property after pointing |
| G2.3 | Why not GET for money transfer? | bots auto-fire GETs; GET should be read-only | ✓ | Corrected backwards idempotency tail |
| G2.4 | DELETE photo: code + actor order + double-tap | 200; DNS→TCP→TLS→server→server; idempotent | ✓ | **Actor check cold, no nudge** |
| G2.5 | Truncated body: detect + retry-safe? | Content-Length mismatch; GET retry safe (idempotent) | ✓ | Clean |

## What Hema learned (own words)
- HTTP gives meaning to a pipe that otherwise just moves bytes.
- Request = method · path · version · headers · (body); response mirrors it with a status line.
- 4xx = your fault (don't retry); 5xx = server's fault (retry + backoff).
- safe ⊂ idempotent ⊂ all; idempotent ⇒ blindly retry-safe; POST needs an idempotency key.

## Mental models / analogies that landed
- **Mango farm** — you can reason what a plant *needs* without having farmed; same for deriving HTTP from need.
- **HTTP is paper; the server/browser is the hand that writes it** (protocol ≠ actor) — the anchor that broke the fusion.
- **Dictionary vs speaker** — HTTP lists legal methods; the browser *chooses* one.

## Tradeoffs learned
- Request/response can't push → wrong tool for real-time (messaging).
- Method choice is a property decision (idempotent/safe), not just a CRUD label.
- Never hide a state change behind GET (auto-fired/auto-retried by infra).

## Failure scenarios learned
- Silent timeout → client-side timeout detection.
- Truncated body → bytes-received vs Content-Length mismatch.
- Retry safety: GET/PUT/DELETE blind-retry OK; POST needs idempotency key.

## Mistakes (→ MISTAKE_JOURNAL)
- Entry 002: protocol named as the actor (5th layer-fusion instance) — **retested & fixed cold**.
- Entry 003: idempotency/safe-method mis-assignment (idempotency key bolted onto GET).

## Win | Weakness
- **Win:** Killed the protocol-vs-actor fusion under cold gate pressure with **no nudge** (Gate #2, Part 4) — the single habit that's tripped him 5 times. The "name the actor" drill worked.
- **Weakness:** Safe-vs-idempotent precision still ~85% — needs a nudge to surface a method's *property* unprompted; briefly equated "same status code" with idempotency.

## Tomorrow's plan
- `/teach browser rendering` — final leg of the google.com walk (DOM → CSSOM → render tree → layout → paint → composite; render-blocking resources).
- Then resume syllabus depth: HTTP/2 vs HTTP/3, cookies/sessions.
- Spot-check (cold): safe vs idempotent line; idempotency = end-state not status code (revision due 2026-06-08).

---
## Jimmy's Evaluation
Learning quality: High — derived HTTP's full shape from need, not memorization. | Strengths: first-principles derivation, self-correction when shown contradictions, pattern transfer, willingness to label guesses. | Weaknesses: retreat-to-structure when pressed for a specific decision; safe-vs-idempotent precision under recall. | Blind spots: layer-fusion (protocol↔actor) — fired twice early, then **held cold after the drill**; trend strongly shrinking (8→9/10). | Recommended revision: HTTP safe-vs-idempotent (+3d, due 2026-06-08); TLS Diffie–Hellman still pending. | Next topic: browser rendering. | Readiness to proceed: **Yes** — HTTP req/resp banked cold via Gate #2; one focused atom (rendering) closes the walk.
