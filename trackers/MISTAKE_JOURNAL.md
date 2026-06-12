# Engineering Failure & Mistake Journal  (append via /mistake)
> Goal: the same mistake never happens twice.

## Recurring Mistake Tracker
| Mistake | Times Repeated | Last Seen |
|---|---|---|
| Layer-fusion (wrong layer / pipeline collapsed) | 6 | Session 4 (TCP re-gate Q5: assigned the **duplicate-ACK** mechanism to a **total-silence** condition where it physically can't fire — right concept, wrong condition. Caught under gate pressure, repaired cold on targeted re-gate, no discriminator fed) |
| Retreat-to-structure (restates the message skeleton instead of committing to the specific decision asked) | 1 | Session 2 (HTTP gate Part 2: described headers instead of naming method + status codes) |
| Idempotency / safe-method mis-assignment | 1 | Session 2 (HTTP gate Part 5: attached "idempotency key" to GET; GET is safe because it's a read) |

## Weakest Topics: 1. Cross-layer sequencing (which actor, which job, what order). 2. Protocol-vs-actor distinction (a format doesn't *do* things; a program does).

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

## Entry 002 — Protocol named as the actor (5th layer-fusion instance)
- **Topic:** HTTP request/response (Mastery Gate, Session 2)
- **Instance:** Asked "what *actor* decides `/users/99/profile` → fetch-profile code, and who emits 401?" — answered "http req type" and "http response."
- **Category:** incorrect mental model — fuses the **message format** with the **program that acts on it.**
- **Root cause:** same family as Entry 001. HTTP is an envelope/format; it never *decides* or *does*. The **server** routes the path and the **server** checks the token and chooses the status. Under pressure, grabbed the protocol's name instead of the actor. Recovered only when pointed.
- **Correct model:** "HTTP is a format. The server is who acts." Envelope vs. program.
- **Memory anchor:** "The letter doesn't decide anything — the person reading it does."
- **Mitigation:** rapid-fire "name the actor" drill — job in, one-word actor out, no nudge.
- **Retest:** DONE (Session 2 re-gate). Unfused cold, no nudge: DNS→TCP→TLS→server→server, zero "http" as actor. Drill worked — fusion reflex broken on header-field and method triggers after ~6 reps. **Confidence: 8/10 → 9/10. Keep spot-checking on each new layered topic.**

## Entry 003 — Idempotency / safe-method mis-assignment
- **Topic:** HTTP methods (surfaced in HTTP gate Part 5, Session 2)
- **Instance:** "GET is safe to retry because we'll have an idempotency key... maybe." Wrong direction.
- **Category:** knowledge gap (untaught sub-atom) + concept mis-binding.
- **Root cause:** GET is safe to retry because it's a **read — it changes no server state** (idempotent + safe *by nature*). An **idempotency key** is the *opposite*: a tool bolted onto a **POST** to make a state-changing call safe to repeat. Attached the POST fix to GET.
- **Correct model:** GET/PUT/DELETE idempotent; POST not. GET also "safe" (no side effects). Idempotency keys = the POST/retry fix, not a GET feature.
- **Mitigation:** teach **safe vs idempotent vs neither** as its own atom before re-gating HTTP.
- **Retest:** Yes — fold into the HTTP re-teach.

## Entry 004 — Recovery-path conflation (dup-ACK assigned to a silent connection)
- **Topic:** TCP loss recovery (full cold re-gate, Session 4)
- **Instance:** Gate Q5 (tunnel: 8s of total silence). Said the connection survives & resumes "because it sends duplicate acknowledgments asking for the missing data." Impossible — a dup-ACK is *provoked by the arrival of a later packet*; during total silence nothing arrives, so no dup-ACK can fire. Correct answer is **retransmission timeout (RTO) + exponential backoff**.
- **Category:** layer-fusion family — wrong *mechanism* for the *condition* (cousin of Entry 001's wrong-actor-for-the-job).
- **Root cause:** under gate pressure he reached for the **most recently drilled** mechanism (dup-ACK/fast-retransmit, hammered earlier the same night) and applied it to a condition it can't operate in. Salience override, not knowledge gap — he *had* both mechanisms.
- **Correct model:** **Packets still arriving → fast retransmit (3 duplicate ACKs). Total silence → retransmission timeout (timer expiry + backoff).** The discriminator is "is anything still arriving to provoke an ACK?"
- **Memory anchor:** "No traffic, no dup-ACKs — silence is the timer's job, not the ACK's."
- **Mitigation:** before naming a recovery/repair mechanism, ask "what condition is the wire in *right now* — flowing or silent?" then pick.
- **Retest:** PASSED same session on targeted 2-question re-gate — separated RTO vs fast-retransmit cold, explicitly stated dup-ACK *can't* fire in silence, no nudge. **Confidence 8/10. Spot-check the condition→mechanism mapping when TLS/HTTP retries come up.**
