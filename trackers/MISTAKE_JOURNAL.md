# Engineering Failure & Mistake Journal  (append via /mistake)
> Goal: the same mistake never happens twice.

## Recurring Mistake Tracker
| Mistake | Times Repeated | Last Seen |
|---|---|---|
| **TERM DECAY — describes the machinery correctly, cannot NAME it** | **5 terms in one session** | **Session 5 (2026-07-11) — see Entry 005. The biggest live problem.** |
| Retreat-to-structure / **discriminator-dodging** (answers *around* a specific question with a general description) | **5** | Session 5 (4×: named a mechanism without the condition · described HOL without naming it · hedged "not chosen *or* impossible" · restated the general rule instead of answering the packet-5 case) |
| Layer-fusion (wrong layer / pipeline collapsed) | 8 | Session 5 (root NS "holds authoritative IPs" — deleted the TLD tier; and "sender must test if the receiver is ready" — imported the **handshake's** job into **loss recovery**). *But:* walked DNS→TCP→HTTP correctly unaided in the same session. **Trend: shrinking.** |
| Idempotency mis-definition | 2 | Session 5 ("idempotency means same **response**" — it is same end **STATE**) |

## Weakest Topics: 1. **Vocabulary — naming what he can already explain.** 2. Cross-layer sequencing (which actor, which job, what order). 3. Protocol-vs-actor distinction (a format doesn't *do* things; a program does).

---

## Entry 005 — TERM DECAY: understands the machinery, cannot name the parts ⭐ *the finding*
- **Topic:** all of Module 1. Surfaced 2026-07-11 (Session 5), cold sweep after a **29-day gap**.
- **Instances, all in one session:**
  1. Described packets 3/4/5 frozen behind a missing 2 — **could not name head-of-line blocking.** (He *derived UDP from it* in S4.)
  2. *"I don't know what the other mechanism is"* — **fast retransmit**, which he then re-derived from scratch minutes later.
  3. Described the timer + doubling perfectly — **never said RTO / exponential backoff.**
  4. Described the CA's role correctly — **called it "the middle man."** That is the **attacker's** name.
  5. *"Idempotency means the same **response**"* — it is the same end **STATE**.
- **Category:** vocabulary gap. **NOT a knowledge gap** — the reasoning was intact and, once prompted, he rebuilt every mechanism unaided.
- **Root cause:** ***what he derives, survives; what he is handed, rots.*** His behaviour file has said *"learns by deriving, not receiving"* since Session 1 — and the consequence was never drawn: **the terms were the one thing he never derived.** They were handed to him as labels in a recall-anchors list. So the concepts came back after a month and the names did not. His own words: *"who in their right mind would come up with fast retransmit or head-of-line blocking"* — he had concluded the names were **arbitrary**, and stopped trying to hold them.
- **Why it also explains blind spot 2:** the "answering around the question" habit is largely a **symptom of this**. He is **reaching for a word that isn't there**, and description is what he falls back on. This reframes the S2 "retreat-to-structure" diagnosis.
- **Correct model:** **the names are the concept, compressed.** *Head of the **line** → **blocking**. Fast retransmit → a retransmit, **fast**. RTO → **R**etransmission **T**ime-**O**ut. Man-in-the-middle → literally **in the middle**. Idempotent → **idem** (same) + **potens** (power).* Every one is regenerable by a derivation learner.
- **Memory anchor:** **"The name is the handle. Without it you can't pick the idea up under pressure."**
- **Mitigation (all now in the toolkit):**
  - **Name-at-birth** (CLAUDE.md §4): derive → **he christens it** → real name **+ etymology** → **use it in a sentence**, not a definition.
  - **`/terms`** — term-first drill: scenario in, **word out**, cold. Every other command tested the opposite direction (recognition).
  - **`trackers/GLOSSARY.md`** — terms tracked separately, on a **faster clock** than concepts.
  - **Gate rule:** description **without the term** = **not a pass**.
  - ❌ **What does NOT work:** writing the terms into a document. He was given `BIBLE.html` with fast retransmit in a red box and a decision-tree diagram — and 20 minutes later did not know the mechanism existed. **Reading a term does not install it. Only retrieving it does.**
- **Retest:** `/terms due` at the **start of every session** until each term is produced **COLD in a later session.** Track in `GLOSSARY.md`.
- **Jimmy's share of the blame:** logged in `trackers/TEACHING_LOG.md` Entry 001. This is a **teaching failure** before it is a learning failure.

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
- **Retest:** ~~PASSED same session… Confidence 8/10~~ — **CORRECTED 2026-07-11. That score was fiction.**
- **⚠️ CONFIDENCE CORRECTION (2026-07-11):** the S4 "pass" was a **same-session** re-gate, minutes after being drilled on the exact point. That measures **working memory, not retention** — and it was written into this file as if it measured retention, which made the topic *look* safe so it was never re-queued. **29 days later Hema did not know fast retransmit existed** ("I don't know what the other mechanism is"). **Real confidence at S5 open: 2/10.**
- **Rule change (now in CLAUDE.md §1):** a same-session re-gate **caps at 5/10**. Only a **cold gate in a LATER session** can raise a score. See `trackers/TEACHING_LOG.md` Entry 002 — this was Jimmy's error, not Hema's.
- **S5 outcome:** **re-derived cold, from scratch, unaided.** Given "packet 2 lost, 3/4/5 arrive," he produced cumulative re-ACKing → **3 duplicate ACKs → fast retransmit**; then, handed the *packet-5-is-the-last-packet* counterexample, he **destroyed his own wrong discriminator** ("data lost vs ACK lost") and arrived at the correct one — **flowing vs silent**. The mechanism is now genuinely his; **the NAME was the thing missing.** Confidence (mechanism) **7/10**; retest cold **next session** before it goes higher.
