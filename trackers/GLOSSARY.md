# Glossary — the terms, and WHY each name means what it means

> ⚠️ **DOWNSTREAM FILE (since 2026-07-11, S6).** Term **status** and **drill clocks** are canonical in
> **`trackers/STATUS.json`** → `terms[]`. This file is the human-readable mirror: the etymologies, the
> concept each name compresses, and the personalised traps. **If the two disagree, `STATUS.json` wins**
> — run `node scripts/status.mjs check`. Before S6 this file had statuses and drill dates and **no command
> that wrote them**, so a term could sit at *"WARM, drill next session"* forever. The fix for the biggest
> problem in this repo had no write-path. (`TEACHING_LOG.md` Entry 006.)

> **Why this file exists.** On 2026-07-11, after a 29-day gap, Hema could still *derive*
> head-of-line blocking, fast retransmit, RTO and the CA's role — and could **name none of them**.
>
> **The mechanism:** *what he derives, survives. What he is handed, rots.*
> Concepts were derived. Terms were handed over as labels. So the terms — and only the terms — decayed.
>
> **The fix:** terms are **derived too**. Every name below is the concept **compressed into a phrase**.
> None of them is arbitrary. Do not memorise the word — **regenerate** it from the idea.
>
> **Rules:** terms get a **faster review clock** than concepts. Drill with `/terms` — I give the
> scenario, Hema gives the **word**, cold. A description without the term is **not a pass**.

---

## Status legend
`COLD` = produced the term unprompted, in a later session · `WARM` = produced it same-session as teaching (does **not** count as retention) · `LOST` = failed to name it cold.

## Module 1 — Networking

| Term | The name IS the description | The concept it compresses | Status | Next drill |
|---|---|---|---|---|
| **Head-of-line blocking** | the item at the **head** of the **line** (queue) **blocks** everything behind it | One lost packet freezes every *ready* packet behind it. TCP's cost = **latency**. This is why UDP exists. | **LOST** 2026-07-11 (derived it in S4, could not name it) | every session until COLD |
| **Fast retransmit** | a **retransmit** that is **fast** — it does not wait for a timer | Wire **flowing** → receiver re-ACKs the last in-order byte → **3 duplicate ACKs** → resend immediately. | **LOST** 2026-07-11 ("I don't know what the other mechanism is") — **re-derived cold same session** | every session until COLD |
| **RTO** (Retransmission Time-Out) | the **time-out** that triggers a **retransmission** | Wire **silent** → no signal can exist → a **timer** expires → resend + **exponential backoff**. | WARM 2026-07-11 (described it; did not name it) | next session |
| **Duplicate ACK** | the **same ACK**, sent **again** | ACKs are cumulative — "next byte I expect is N." Receiving 3,4,5 while 2 is missing re-sends "expecting 2" each time. | WARM 2026-07-11 | next session |
| **Exponential backoff** | the wait grows **exponentially** — double it each failure | RTO fires → resend → **double the timer** → resend → double again. Gives up only after many attempts. | WARM 2026-07-11 | next session |
| **Man-in-the-middle (MITM)** | the attacker is **literally standing in the middle** | DH alone shares a secret with *whoever is there*, not with *who they claim to be*. | ⚠️ **MISUSED** 2026-07-11 — called the **CA** "the middle man." The middle man is the **attacker**. The CA is a **trusted third party**. | every session until COLD |
| **Certificate Authority (CA)** | an **authority** that issues **certificates** | The trusted third party whose signature vouches for the server's identity. Pre-installed in your browser. **Cert = identity. DH = secrecy.** | ⚠️ misnamed 2026-07-11 | every session until COLD |
| **Trust anchor** | the **anchor** on which all **trust** rests — fixed, shipped in advance | Hardcoded root DNS IPs ≅ pre-installed root CAs. You must trust *something* in advance to escape the "who do I trust first?" regress. | COLD (S4) | +14d |
| **Idempotent** | *idem* (same) + *potens* (power) → **the same effect however many times applied** | N runs leave the same **end STATE** as one run. **NOT** the same response. | ⚠️ **MISDEFINED** 2026-07-11 ("same response") | every session until COLD |
| **Idempotency key** | the **key** that makes a call **idempotent** | Client attaches a unique id; the **server** records processed keys and returns the original result on retry. A **POST** tool — not a GET feature. | WARM 2026-07-11 (described, not named cleanly) | next session |
| **Safe** (method) | **safe** to call — it cannot hurt anything | Changes **no** server state at all. A pure read. `GET`. **safe ⊂ idempotent ⊂ all.** | COLD (S2) | +7d |
| **Demultiplexing** | **multiplexing** = many streams into one wire · **de**-multiplexing = **splitting them back out** | The OS **kernel** reads the destination **port** and hands bytes to the listening process. Routers read the **IP**; the kernel reads the **port**. | ⚠️ historically fused ("Nginx chooses the port") | +7d |
| **Recursive resolver** | it **resolves** the name, **recursively** walking the chain for you | The actor that **does the walking**. Root/TLD/authoritative only **point**. | COLD (S3) | +14d |
| **Authoritative nameserver** | it is the **authority** on this domain — the source of truth | The **only** tier that holds the actual A record. `root → TLD → authoritative`. | COLD 2026-07-11 (repaired) | +7d |
| **TTL** (Time-To-Live) | how long this record gets to **live** before it must be re-fetched | Bounds the cache. Past its TTL a record is **stale** — *not an error*. | COLD (S3) | +14d |
| **Stale** | old, not wrong-shaped — it **confidently points at the old address** | Loud failure = old server gone (timeout). **Quiet** failure = old server alive → you silently hit the wrong box. Quiet is more dangerous. | COLD (S3) | +14d |
| **Best-effort** | it makes an **effort**, the **best** it can — and **promises nothing** | IP: packets may be lost, reordered, duplicated, corrupted, unacknowledged. | COLD (S4) | +14d |
| **Three-way handshake** | **three** messages, **shaking hands** before business | Purpose: **sync starting sequence numbers, both directions.** Liveness is a side effect. Two messages confirm only one direction. | COLD (S4) | +7d |
| **Diffie–Hellman** | (named for its inventors — the one term that *is* arbitrary) | The shared secret is **built independently on both ends** and is **never sent**. Attacker sees both public halves and cannot un-mix them. | **NOT YET GATED** | **gate next** |
| **Head-of-line → why UDP** | — | UDP is fast and **NOT accurate**. *TCP: rather late than wrong. UDP: rather wrong than late.* | ⚠️ **MISSTATED** 2026-07-11 ("fast and accurate") | every session until COLD |
