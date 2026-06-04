# TCP — Establishing a Reliable Connection

> Where this fits: after DNS gives you the IP and the browser picks the port (`https` → 443), TCP is how your browser actually *talks* to that machine reliably.
> Status: Learned Day 1, signed off. Revise with the cold-recall questions at the bottom.

---

## 1. The problem TCP exists to solve

The base delivery layer, **IP**, is **best-effort**. That's a technical term: IP *tries* to deliver each packet and **promises nothing**. On the raw network, packets can be:

- **lost** — a congested router drops yours and tells no one
- **out of order** — packet 3 takes a faster path and arrives before packet 2
- **duplicated** — something retries and the same packet arrives twice
- **corrupted** — a bit flips in transit
- **unacknowledged** — you fire into the void and never hear if it landed

**Mental image:** mailing a long letter as 50 numbered postcards through a sloppy post office — some never arrive, some arrive out of order, a few arrive twice, and you're never told which.

But what you *want* is: **complete, correctly ordered, exactly-once delivery, with confidence it arrived.**

TCP builds that guarantee *on top of* the unreliable IP layer. (Key idea: the network underneath stays dumb and lossy; reliability is added by the two endpoints.)

---

## 2. The reliability engine (3 mechanisms)

These run on **every packet, for the whole conversation.**

### (a) Sequence numbers
A number stamped on each packet. **One mechanism, three wins:**
- **reassemble** in the correct order
- detect a **gap** → a packet is **missing**
- detect a **repeat** → a packet is a **duplicate**

### (b) ACKs (acknowledgments)
When the receiver gets a packet, it sends back an **ACK** = "got it." The sender is no longer blind — it gets feedback.

### (c) Timeout + retransmit
- The sender starts a **timer** when it sends a packet (a *retransmission timeout*).
- No ACK before the timer expires → **resend the packet.**
- **TRAP:** timeout → **retransmit**, NOT terminate. (The connection only gives up after *many* repeated failures, not on one lost packet.)

**Why this works even though ACKs can also be lost:**
The ACK travels back over the same lossy network, so it can be lost too. That means the sender **cannot tell** "my packet was lost" from "my packet arrived but the ACK was lost" — both look like silence. It doesn't need to tell them apart: on timeout it just **resends**.

**Why resending is safe:** if the packet *had* arrived (only the ACK was lost), the receiver now gets a duplicate — and the **sequence number** lets it detect and discard the duplicate. So the three mechanisms reinforce each other: sequence numbers are what make blind retransmission harmless.

---

## 3. The three-way handshake (connection setup)

> **Separate job from the reliability engine.** This is one-time *setup*, before any real data flows.

Two machines that have never communicated must, up front:
1. confirm the other is **alive and listening** (not down, not busy, actually ready), and
2. **agree on each other's starting sequence numbers**, so the reliability engine can begin.

### Phone-line intuition
On a bad line, each side must be *sure* the other can hear it:
- A: "Can you hear me?"
- B: "Yes, I hear you. Can **you** hear me?"
- A: "Yes, I hear you too."

### The actual handshake (with sequence numbers folded in)
- Browser → server: "I want to talk. My start # is **X**." → **SYN**
- Server → browser: "Heard you (ack X). My start # is **Y**." → **SYN-ACK**
- Browser → server: "Heard you (ack Y)." → **ACK**

After SYN → SYN-ACK → ACK, the connection is **established**, and the HTTP request can finally go out.

### Why THREE messages, not two?
Two messages confirms only **one direction**. After the server replies, *it still doesn't know* whether the client heard its reply (and its number Y). The **third** message confirms the **second** direction. Both directions confirmed, both starting numbers synced → established.

---

## 4. Handshake vs reliability engine — DO NOT FUSE

This is the precision that matters most:

| | Handshake | Reliability engine |
|---|---|---|
| **When** | Once, at the start, before data | Continuously, every packet |
| **Job** | Prove both sides are ready + sync starting sequence numbers | Ordering, gap detection, dedup, loss recovery |
| **Made of** | SYN, SYN-ACK, ACK | Sequence numbers, ACKs, timeout/retransmit |

The handshake does **NOT** solve ordering/missing/duplicate — that's the reliability engine's job.
The reliability engine assumes the starting numbers are already agreed — that's the handshake's job.

---

## 5. Where TCP sits in the bigger flow

> name → IP (**DNS**) → port 443 (**browser**, from `https`) → packets routed to the machine (**routers**, by IP) → **TCP handshake** → reliable data exchange (sequence #/ACK/retransmit) → OS hands data to the process on port 443 (**demultiplexing**) → Nginx picks the site → response.

TCP is the "reliable conversation" step that makes everything after it trustworthy.

---

## 6. One-line recall anchors

- **IP is best-effort** — lost / reordered / duplicated / corrupted / unacknowledged.
- **Sequence numbers** = order + missing + duplicate, all in one.
- **ACK** = receiver confirms; **timeout → retransmit** (not terminate).
- Sender can't distinguish lost-packet from lost-ACK → just resends; dedup makes it safe.
- **Three-way handshake** = readiness + starting-number sync, *once*, before data.
- **Three messages, not two**, because two confirms only one direction.
- **Handshake = setup; sequence/ACK/retransmit = ongoing.** Never fuse them.

---

## 7. Cold-recall questions (no notes)

1. What does "IP is best-effort" mean? List the failure modes.
2. Name the three reliability mechanisms and the one job each does.
3. Why is blind retransmission safe even when a duplicate arrives?
4. The sender gets silence after sending. What two different situations could that be, and why doesn't it matter?
5. What are the three handshake messages, and what does each accomplish?
6. Why three messages and not two?
7. One sentence: how is the handshake's job different from the sequence-number/ACK/retransmit system's job?
