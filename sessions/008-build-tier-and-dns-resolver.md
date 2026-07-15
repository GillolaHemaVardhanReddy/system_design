# Session 008 — 2026-07-14/15

## What this session was
**Half meta-restructure, half the first real code Hema has written in 8 sessions.** No atom was gated. The headline is the *method* changed, and he shipped working code against a live root server.

## Part 1 — the build tier (curriculum restructure)
Trigger, his words: *"i am not even seeing what i am learning… i am not getting motivation."* **He was right — 7 sessions of networking, zero commands run, zero code written.** `TEACHING_LOG.md` Entry 008.

Added (all on disk, all pushed):
- **`/lab`** — every atom ends on his terminal, he predicts then runs. 19 labs written for M1.
- **`/project`** — projects fire at **capability boundaries**, decided *at* the boundary. Guided = Jimmy architects & reviews, **Hema types every line.** The **solo project IS the gate** (his idea; amends §1). `/article` after.
- **`/build` (atom builds)** — his correction: some atoms carry a standalone real project on their own, they do NOT wait for the boundary. 9 atoms now have one. **He was right that waiting 9 atoms to build was a smaller copy of "builds start after Module 2."**
- **LOCALHOST IS A TOY** — every build ships to the real internet. `references/DEPLOYMENT-STACK.md`: Oracle Always Free + Porkbun + Cloudflare DNS + Let's Encrypt, $2–11/yr. **NOT AWS** (free tier changed 2025, account auto-closes), **NOT Cloudflare Tunnel/Render** (they terminate TLS for him — pedagogical veto).
- **No cap on atoms per session** — the cap was never the clock, it's the gate.

## Part 2 — the two teaching failures HE caught
- **Entry 009 — I buried him.** He ran one `dig`, I replied with a correction + 4 terms + etymologies + a 6-field table + a philosophy argument + the next code step. Five messages as one. He got 0%. His words: *"i didnt fucking understand anything… you dumped me tons of text."* → **"small and sweet, one idea per message" is now the FIRST method rule (§4), at his request ("engrave it in .claude").**
- **Stop making him guess arbitrary facts.** He nailed it: *reasons* can be derived, *committee decisions from 1987* (which byte holds QDCOUNT, why A=1) cannot. Handing him the spec table is correct; quizzing him on it is a quiz with no answer key.

## Part 3 — the DNS resolver (atom build 1.3, `labs/1.3-resolver`)
Did the resolver walk **by hand with dig first** — root → .com → google, watched `ANSWER: 0` twice then `ANSWER: 1` + `aa` flag. Then wrote code:
- `encodeName` ✓ — length-prefixed labels + zero terminator. (Self-caught the `.join('')`-returns-string bug.)
- `buildHeader` ✓ — 12 bytes, 6×uint16, random ID.
- `buildQuery` ✓ — TYPE=A, CLASS=IN.
- UDP send ✓ — **got a real 488-byte referral from `a.root-servers.net`.** Decoded the header cold: NSCOUNT=13, ARCOUNT=11, matched his first dig.
- **STOPPED at:** parsing the records — DNS **name compression** (`0xc0` pointer) is the boss fight. Resume there.

## Real wins (name them next session)
- **★ He caught his own layer-fusion MID-SENTENCE:** reached for a sequence-number/ordering fix on the DNS ID, then said *"damn is this tcp?"* unprompted. That is blind-spot-1 dying in real time. **Reward this specifically.**
- Correctly separated recursive (client→resolver) from iterative (resolver's walk) once shown.
- Two correct method critiques of Jimmy in one session. He is a collaborator on the method — keep treating him as one.

## Concepts that landed (analogies that worked)
- **112 / emergency number** → anycast (one address, nearest branch answers). Landed clean.
- **Coat-check ticket #47** → the DNS query ID (matching, not ordering). Landed after the TCP confusion.
- **Phone contact has number/email/address** → record TYPE (which fact you want).
- Root hints = file baked into software · referral = what the server sends back · glue = names turned to IPs.

## What decayed / to watch
- Struggled hard with **bytes** — thought "6 bytes id" (confused 65536-as-limit with 6-digits-as-size). Fixed with "a byte holds 0–255, two bytes hold 0–65535." Watch this; low-level representation is new ground.
- Terms deliberately NOT drilled (he was near frustration twice). Name-at-birth only.

## ⇢ NEXT SESSION (S9)
1. **Resume the resolver at the compression wall** — skip header+question, parse RRs, handle `0xc0`, then the referral-follow loop. Finish the walk in code.
2. It stays an **atom build**, not a gate. 1.3 is already banked; this deepens it, doesn't re-gate it.
3. Still owed cold: close **1.9 TLS** (the CA/PKI beat + `/lab 1.9`), re-gate **1.4/1.10** (overdue), gate **1.7**, repair **1.5** terms.
4. Keep messages SMALL. One idea. He will disengage the instant it becomes a wall of text — proven twice this session.
