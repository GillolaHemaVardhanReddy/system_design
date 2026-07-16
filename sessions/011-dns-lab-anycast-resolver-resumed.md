# Session 011 — DNS lab run at last, anycast off the jumping TTLs, resolver resumed at the wall

**Date:** 2026-07-16 · **Atoms touched:** 1.9 (cold re-ask + trust anchor), 1.3 (lab + build resumed) · **Status:** 1.9 still `here`, parked mid-lab by his call; resolver is the declared next opener.

A zig-zag session, all of it his steering, none of it wasted: TLS opener → DNS lab (his request — it was
genuinely unrun) → back toward TLS → resolver resume (his request — and he was right that it was parked).

---

## What actually happened

**1. The cold re-ask PASSED, first ask.** "private key makes the mark / public key checks it / public key
stays inside the disk." All three right objects in a fresh session. The S10 handed primitive survived —
promoted to COLD on this retrieval event. This is the system working as designed: handed S10, applied warm
S10, retrieved cold S11.

**2. The trust-anchor beat closed — with an honest caveat.** He walked one level up the chain ("digi cert
is signed by CA"), then would NOT commit to "nobody": hedged with domain-name-in-cert, then "we do DH with
site??", then frustration ("its too annoying"). The anchor was HANDED via his own S8 resolver (the
hardcoded root IP). He then christened it and used it: "198.41.0.4 is a trust anchor." DNS-side he owns
cold; the TLS-side transfer was handed, not produced. The gate for 1.9 must re-test this cold.

**3. ★ His method catch — he was right again.** "you should have asked why do you trust your public key so
that i might have known." The question "WHO SIGNED DigiCert's key" sends a learner hunting for a signer
when the entire answer is *there is no signer*. "Why do you trust the key already on your disk" points at
the anchor. Logged in TEACHING_LOG (#011). His catches now: synonym rule, no-echo-grading, atom builds,
small-and-sweet, the primitive rule, and this.

**4. DNS lab (1.3) finally run.** Twelve sessions after the atom was taught:
- `dig +trace` died at `127.0.0.53` — his own machine's stub resolver, down. Best possible failure:
  loopback christened off a live timeout, and "the first hop is your own laptop" corrected his
  ISP-first prediction.
- Re-run `@1.1.1.1`: watched root → TLD → authoritative live, matched 3 of his 4 predicted hops.
- Grabbed the wrong object for the final answer (`216.239.36.10`, the *answerer*, from the `from` field)
  — corrected by being pointed back at the A records.
- Six A records → derived failover AND load-spreading himself (both hedged with "maybe...right?" — both
  correct; the hedging tax was named to him twice).
- TTL 300 at the authoritative vs 28 at Cloudflare → ran it thrice, TTLs went 28 → 31 → 203 → 266 —
  **a number that jumps UP means more than one memory** → derived multi-cache himself → anycast christened.
- Referral + glue christened off the header counts he half-remembered.

**5. Resolver (1.3 build) resumed.** Ticket-ID echo verified in his own code (sent 13187, received 13187,
`33 83` visible in the hexdump). Header counts placed. Records-start offset derived: 12 + 12 + 4 = 28 —
after one miscount (counted only the letters of google.com, forgot the length bytes and terminator his own
`encodeName` writes). Parked at bytes 28–29: `c0 13`, with the compression question ASKED and UNANSWERED.

---

## Questions asked, and how they went

| # | Question | Grade |
|---|---|---|
| 1 | Which key makes the mark, which checks it, which is on your disk? (cold re-ask) | **PASS COLD** — all three objects, first ask. Primitive banked. |
| 2 | Who signed DigiCert's public key? (the S10 open beat) | **MISS → HANDED** — chain walked one level, then hedges (domain-in-cert; "DH with site??"). Anchor handed via his own S8 hardcoded root IP. Christened + used after. His method catch on the question's wording logged. |
| 3 | dig +trace: how many hops, who is each, where does the FIRST address come from? | **PARTIAL** — 4 hops right, actors right; first-address question dodged, then answered by the screen (127.0.0.53 → loopback, handed). |
| 4 | Where in the world does 127.* live? | **HEDGE, right referent** — "hope its in local? i dont know". Handed loopback + the local stub resolver story. |
| 5 | A helper that sits in front, remembers answers, saves the repeat trip — what's it called? | **PASS** — "cache right?" Cold, later session. |
| 6 | Why six IPs for one name? | **PASS ×2, both hedged** — failover ("maybe if one stops other can pick") and load-spread ("maybe they handle the load?"). Right both times; told to drop the "maybe" both times. |
| 7 | TTLs went 28 → 31 → 203, and the IP sets changed — how many memories are you talking to? | **PASS (derived)** — "cloudflare behind 1.1.1.1 has more than one server which caches… each server may have relative ttl difference". Anycast handed as the name only. |
| 8 | Five UDP questions in flight, replies land in any order — how do you match them? | **MISS → PASS** — first guessed "it says answer is present or not"; food-court token analogy landed it: "its like seq number mapping" (referent right; warned off TCP's seq-number machinery). Verified in his own code same minute. |
| 9 | At what byte offset does the first record begin? | **MISS → PASS** — said 11 for the header his own code allocates as 12; counted only the 9 letters of google.com. Pointed at his own encodeName + hexdump → 12 + 12 + 4 = 28. |
| 10 | Bytes 28–29 are `c0 13`, not a name. c0 = 11000000 — why did the server refuse to write "com" again? | **OPEN — asked, unanswered. This is next session's first question.** |

---

## Rules exercised against pressure this session

1. **"Frontend for the resolver, you build it"** → rule 3 held: architecture mine, every line his. He
   accepted. The HTML walk-viewer is a real phase-2 for the build — *his* hands.
2. **"Show in LinkedIn article"** → rule 4 held: article ships only after a solo gated build. Stated
   plainly, held, accepted.
3. **"We completed the lab? we are building a project"** → tier confusion named: lab ≠ build ≠ project.
   The dig lab closed nothing about the build; the build is honestly parked at the wall, in the record.

## For Jimmy next session

- **Open with the resolver, not TLS — his explicit call.** First question is #10 above, verbatim.
- The compression NEED is derivable (488 bytes, names repeating); the POINTER FORMAT is `need-only` — hand
  it once the need is owned.
- TLS lab part 1 is parked mid-prediction (openssl cert-count question). His likely "one cert" answer is
  the door to handing chain-of-trust (still in `lacks`).
- The hedging tax: 4 of 9 answered questions wore a "maybe/right?/hope" — all 4 were RIGHT. Name the
  pattern to him once, with these four as evidence. He self-diagnoses off his own answers.
