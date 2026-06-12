# Session 004 — TCP cold re-gate (PASS) · UDP derived · TLS cold re-gate (FAIL→rebuilt)  (2026-06-12)

Duration: long (TCP re-teach + full gate + recovery, then TLS gate + deep rebuild) | Energy before/after: 8/10 → 6/10 | Focus: 8/10
Module / Topic / Atoms targeted: Networking — TCP (re-gate), UDP (new, derived), TLS (re-gate + re-teach)
Status: TCP **Mastered (cold)** · UDP Covered · TLS Re-taught (re-gate pending)

## Atoms covered this session
- [x] TCP tradeoff — **derived the cost** (head-of-line blocking → latency); killed the S3 "privacy" mis-assignment
- [x] UDP — **derived from first principles** (strip both guarantees off TCP to avoid the freeze)
- [x] TCP handshake bidirectionality — server picks its own ISN; SYN / SYN-ACK / ACK = synchronize starting sequence numbers both directions
- [x] TCP loss recovery — dup-ACK / fast-retransmit vs retransmission-timeout; sender/receiver fixed
- [x] **TCP full cold gate — PASSED** (after one blind-spot flare at Q5, repaired cold on targeted re-gate)
- [x] TLS — **cold gate FAILED**, then rebuilt to depth: 3 jobs (confidentiality/integrity/authentication), cert=identity, DH=key-exchange, AES=bulk; DH mechanism + discrete log; MITM → why the cert is mandatory
- [ ] TLS cold re-gate — **deferred to S5** (taught ≠ gated; cold recall is the test)

## Questions asked this session (the actual quiz log)
| # | Question | Hema's answer (gist) | Grade | Note |
|---|----------|----------------------|-------|------|
| 1 | Live video: #500 dropped, #501 ready — what does TCP do, what does the human see? | TCP holds #501 (ordering); missed the "human sees freeze" half first | partial→✓ | Sharpened: holding = *ordering*, not reliability |
| 2 | TCP-way vs skip-#500 for a live call; what's TCP's real cost? | Chose skip (B) correctly; did **not** name the cost | partial | Described choice, stopped short of naming latency |
| 3 | Term for "one stuck packet blocks ready ones behind it"? Currency = latency or bandwidth? | "neopharmy" (✗ term); **latency** ✓ with right reasoning | ✗/✓ | Gave him *head-of-line blocking* |
| 4 | Escape hatch — which guarantee(s) does a live protocol drop? | Derived: drop **both** ordering+reliability → invented UDP | ✓ | Strong first-principles derivation |
| 5 | New scenario: download a bank-statement PDF — TCP or UDP, and failure of wrong choice? | TCP; wrong → garbage/unordered PDF | ✓ | Clean transfer |
| 6 | Handshake: walk it; who picks what? (the S3 hole) | Bidirectional, both pick own seq#, each checks incoming vs received seq# | ✓ | **Recovered the S3 hole cold** — ownership not memorization |
| 7 | Download: who's sender/receiver, who detects loss, what's the repeated signal + fast reaction called? | Server=sender/browser=receiver ✓ (fixed flip); didn't know dup-ACK / fast-retransmit terms | partial | Taught dup-ACK (cumulative) + fast retransmit (3) |
| G1 | **GATE** Explain TCP (Feynman) | Reliability+ordering, handshake, seq#, dup-ACK | ✓ | Solid |
| G2 | **GATE** Walk A→B "HELLO" until A is certain B got it | Handshake bidirectional ✓; fuzzy on "B ACKs the data is how A knows" | partial | ACK-as-heartbeat (not just loss) to firm |
| G3 | **GATE** Game tradeoff + security trap | UDP/TCP split ✓; **caught the trap** (security ≠ TCP/UDP) ✓ | ✓ | Slip: said "HTTP" manages security → it's **TLS** |
| G4 | **GATE** Stock terminal: ticker vs buy-order | Flow X UDP / Flow Y TCP ✓; recovery walk thin | ✓ | Reasoning right, depth light |
| G5 | **GATE** Tunnel 8s silence: survive/resume + contrast single drop | Assigned **dup-ACK to total silence** — impossible | ✗ | **Blind-spot flare** — wrong mechanism for the condition |
| G5b | **Targeted re-gate** (2Q): silence vs single-drop recovery | Silence→RTO (dup-ACK *can't* fire) ✓; gap→fast-retransmit ✓ | ✓✓ | **Repaired cold, no discriminator fed → TCP BANKED** |
| T1 | **TLS GATE** Explain TLS; layering vs TCP/HTTP | "security"; **"HTTP wraps TCP"** (backwards) | ✗/partial | Guarantees collapsed to one word; layering inverted |
| T2 | **TLS GATE** Walk handshake + DH + cipher type | Cert ✓; DH muddy; symmetric type unknown | partial | DH = known weak point, confirmed |
| T3 | **TLS GATE** Cost + why two ciphers + what attacker sees | "DH = know data is from source" (✗, that's cert); **"attacker can see data"** (reversed) | ✗ | Role-fusion inside TLS + central-promise reversal |
| T4 | **TLS GATE** Red cert warning — what failed, why refuse? | Intuition right (tamper/attacker protection); loose | partial | Strongest TLS answer |
| R1 | **RE-TEACH check**: tamper → which guarantee? cert fail → which job? | **Integrity**; **identity** | ✓✓ | Three-jobs frame landed |
| R2 | **RE-TEACH**: compute 5³ mod 23; what can't the thief learn? | Thief sees A,B, not secrets 4,3 ✓ (didn't compute) | ✓ | Conceptual core solid |
| R3 | **RE-TEACH**: why is DH alone insufficient? | Thief impersonates bank & runs DH with us → need CA | ✓ | Described MITM; given the term |

## What Hema learned (own words)
- "TCP would rather be late than wrong; UDP would rather be wrong than late."
- Head-of-line blocking = the thing at the front of an in-order line blocks everything ready behind it.
- Handshake = both sides synchronize starting sequence numbers; that shared state is why a tunneled connection resumes, not restarts.
- Silence → retransmission timeout; packets-still-flowing-past-a-gap → fast retransmit (3 dup-ACKs).
- TLS: certificate proves *who*, Diffie–Hellman agrees on the *key*, AES moves the *data*.

## Mental models / analogies that landed
- **Checkout line / wallet-fumble** → head-of-line blocking.
- **Late-not-wrong vs wrong-not-late** → TCP vs UDP.
- **Paint-mixing** (re-used) → Diffie–Hellman; **ID badge** → certificate; **lockbox** → AES.
- **TCP carries TLS carries HTTP** (truck → lockbox → letter) to fix the inverted layering.

## Tradeoffs learned
- TCP: reliability+ordering bought with **latency** (HOL blocking). UDP: immune to HOL, paid in **lost/garbled data**.
- TLS: asymmetric (cert+DH) once to establish the key — expensive; symmetric (AES) for bulk — cheap & fast. Two mechanisms because each buys what the other can't.

## Failure scenarios learned
- Tunnel/total silence → RTO + exponential backoff (connection survives on timer + preserved seq state).
- Single segment drop with flow continuing → fast retransmit on 3 dup-ACKs.
- TLS MITM: DH alone lets an impostor sit in the middle; the CA-signed certificate is what defeats it.

## Mistakes (→ MISTAKE_JOURNAL)
- Entry 004 logged: dup-ACK mechanism assigned to a silent connection (layer-fusion family — wrong mechanism for the condition). Caught at gate, repaired cold same session.
- Sub-slips to firm (not full entries): "HTTP manages security" → TLS; "attacker can see data" with TLS on → reversed; TLS layering inverted.

## Win | Weakness
- Win: **Recovered a failed TCP re-gate into a clean cold pass in one session** — derived UDP and HOL blocking unaided, and self-repaired the blind-spot flare cold on re-test.
- Weakness: TLS was never owned (under-taught originally); role-fusion *within* TLS (DH vs certificate) and a reversal of TLS's core confidentiality promise.

## Tomorrow's plan
- Warm-up recall on TLS three-jobs → **cold TLS re-gate** (focus: DH mechanism, layering, what an eavesdropper can/can't see, MITM↔cert).
- Then overdue: HTTP safe-vs-idempotent revision (was due 2026-06-08).
- Then resume syllabus: browser rendering → HTTP/2·HTTP/3.

---
## Jimmy's Evaluation
Learning quality: high — derivation-driven, self-corrects when shown a contradiction. | Strengths: first-principles derivation (built UDP and spotted MITM unaided), pattern transfer, honest meta-awareness of his own coverage gaps. | Weaknesses: role/layer-fusion under recall pressure (flared at TCP-G5, repaired cold); TLS depth was genuinely missing until tonight. | Blind spots: assigns a job/mechanism to the wrong actor/condition when the right answer was *recently salient* — apply the "which condition/actor owns this?" check on every layered topic. | Recommended revision: TCP condition→recovery-mechanism mapping; TLS three-jobs + DH; the 3 TCP polish nits. | Next topic: TLS cold re-gate, then browser rendering. | Readiness to proceed: **No** for TLS (taught, not gated — must pass cold first); **Yes**, TCP is banked and UDP is covered.
