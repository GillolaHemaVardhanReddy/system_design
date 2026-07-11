# Networking — Recall Card
> The 5-minute revision artifact. Not a re-teach. Every line here is a **discriminator**:
> something you either own or you don't. If a line surprises you, that topic is decayed — go re-derive it.
> Rule: **read the flowchart first, then cover the answers and test yourself on the drills.**

---

## 1. The Walk — keypress → first byte of HTML

**The one rule this chart encodes: each leg has ONE owner. Protocol ≠ actor.**

```
   ACTOR                          WHAT HAPPENS
 ─────────────────────────────────────────────────────────────────────

  browser        You press Enter
                        │
 ═══════════════════════╪═══════ LAYER 1: DNS ════════════════════════
                        │        (name ──▶ address)
  browser        check browser cache ──▶ hit? done
                        │ miss
  OS             check OS cache ──────▶ hit? done
                        │ miss
  RESOLVER       ┌──────▼─────────────────────────────┐
  (ISP)          │ Recursive resolver — DOES THE WALK │
                 └──────┬─────────────────────────────┘
                        │  "who is google.com?"
                        ▼
  ROOT NS        ┌────────────────────────────────────┐
                 │ "No idea. Go ask .com"             │  ◀── does NOT
                 └──────┬─────────────────────────────┘      know the IP
                        ▼
  TLD NS (.com)  ┌────────────────────────────────────┐
                 │ "Go ask ns1.google.com"            │  ◀── the tier
                 └──────┬─────────────────────────────┘      you deleted
                        ▼
  AUTHORITATIVE  ┌────────────────────────────────────┐
  NS             │ "A record = 142.250.x.x"           │  ◀── only this
                 └──────┬─────────────────────────────┘      one has it
                        │
                        │   ✦ we now have an IP. NOT a connection. ✦
 ═══════════════════════╪═══════ LAYER 2: TCP ════════════════════════
                        ▼
  client+server  3-WAY HANDSHAKE     SYN ──▶
                 SYN-ACK ◀── ACK ──▶
                 PURPOSE: sync starting SEQUENCE NUMBERS, both directions
                 (liveness is a side effect, NOT the point)
                        │
                        │   ✦ reliable byte pipe. Still plaintext. ✦
 ═══════════════════════╪═══════ LAYER 3: TLS ════════════════════════
                        ▼
  client+server  Hello ──▶ CERT (identity) ──▶ KEY EXCHANGE (secrecy)
                 shared secret is BUILT on both ends — NEVER SENT
                        │
                        │   ✦ encrypted tunnel. No HTTP has existed yet ✦
 ═══════════════════════╪═══════ LAYER 4: HTTP ═══════════════════════
                        ▼
  browser        GET / HTTP/1.1
                 Host: google.com          ──────▶
                        │
  SERVER         processes, writes a response
                        │
                        ◀────── 200 OK + HTML bytes
                        ▼
  browser        renders   (← not learned yet)
```

**Anti-fusion checkpoints — memorize the boundaries, not the boxes:**
- DNS finishes **before** TCP starts. TCP finishes **before** TLS starts. TLS finishes **before** HTTP exists.
- Therefore: **a DNS failure has NO HTTP status code.** No TCP connection was ever opened, no request was ever sent, no server ever saw you. There is nobody to issue a 500. The *browser* shows a browser-level error. ← *your #1 recurring error*
- A relay race, not a scrum. Each layer runs one leg and hands off.

---

## 2. DNS — sharp points

- **Names for humans, addresses for machines.** DNS is the bridge.
- **Three tiers, never two:** `root → TLD → authoritative`. Root does **not** know google.com's IP. Root knows **who owns `.com`**. That's it.
- Each tier is **ignorant of the tier below it**. That ignorance is not a flaw — it's *why* it scales. Nobody holds the whole map.
- The **recursive resolver** does the walking. The tiers just point.
- **TTL** bounds the cache. A record past its TTL is **stale**, not an **error**.
- **Trust anchor:** root server IPs are hardcoded into the resolver. Same shape as pre-installed root CAs in TLS. *You have to trust something to bootstrap trust.*

---

## 3. TCP — sharp points

- Handshake's job = **synchronize initial sequence numbers, in both directions.** "Is the server alive" is a *side effect*, not the purpose.
  - *Proof it's about numbering:* a connection that survives a tunnel/route change **resumes** — it doesn't restart.
- **ACKs are the steady heartbeat** ("got it"), not just a loss alarm.
- **Recovery — pick by asking: "is the wire flowing, or silent?"**

| Wire state | What the sender sees | Mechanism | Trigger |
|---|---|---|---|
| **Silent** | nothing coming back | **Retransmission Timeout (RTO)** | a **timer** expires → resend, **exponential backoff** |
| **Flowing** | packets still arriving *past the gap* | **Fast Retransmit** | **3 duplicate ACKs** |

  → **No traffic, no dup-ACKs.** Fast retransmit is *impossible* on a silent wire — dup-ACKs are generated *by the receiver receiving more packets*. No packets, no ACKs, no trigger. Only the timer is left. ← *your #2 recurring error*
- Receiver **dedups by sequence number**: if the retransmitted byte-range is already there, drop it; if not, keep it and ACK.
- **TCP would rather be late than wrong.**

---

## 4. UDP — sharp points

- UDP is **fast and NOT accurate.** Never say "accurate." That's the entire trade.
- **Why it must exist:** TCP guarantees *in-order* delivery → one lost packet at the front **freezes every ready packet behind it**. That's **head-of-line blocking**, and its cost is **latency**.
- Dropping *ordering* alone isn't enough — reliability still forces the re-fetch round-trip. To never freeze, you drop **both ordering AND reliability**. That is UDP.
- **UDP would rather be wrong than late.** (live video, voice, games — a stale frame is worse than a missing one)

---

## 5. HTTP — sharp points

- **HTTP is paper. The server is the hand that writes it.** Protocol ≠ actor.
- **safe ⊂ idempotent ⊂ all**
  - `GET` = safe + idempotent · `PUT`/`DELETE` = idempotent · `POST` = neither.
- **Idempotent ⇒ blindly retry-safe.** POST is not → needs an **idempotency key** (client sends a unique ID; server dedups on it).
- **Idempotency = same end STATE. NOT same response.** Two identical PUTs → two separate `200`s (different responses), one final state. Still idempotent. ← *your #3 recurring error*
- **4xx = your fault** → do not retry. **5xx = server's fault** → retry with backoff, page on-call.
- Security is **TLS**, not HTTP. HTTPS = HTTP *carried over* TLS.

---

## 6. TLS — sharp points  ⚠️ NOT YET GATED — Diffie–Hellman is your known weak point

- Runs **after** TCP is established, **before** any HTTP byte moves.
- **Certificate** answers *"are you really google?"* → chain of signatures walked up to a **pre-installed root CA** (trust anchor).
- **Diffie–Hellman — the one sentence:** *the shared secret is **built independently on both ends** and is **never transmitted**.*
  - Each side keeps a **private** half, sends a **public** half.
  - Each side combines *its own private* + *the other's public* → **both land on the identical secret**.
  - An eavesdropper sees **both public halves** and still cannot compute it. That asymmetry is the whole trick.
- Cert = **identity**. DH = **secrecy**. Two different jobs — don't fuse them.
- Output: a **symmetric session key** (fast) used for the actual traffic. Asymmetric crypto is only used to *agree* on it.

---

## 7. Drill — cover the right column

| Condition | Which mechanism / answer? |
|---|---|
| Packet lost, wire silent | RTO — timer + backoff |
| Packet lost, packets still flowing | Fast retransmit — 3 dup-ACKs |
| Root NS asked for google.com | Referral to **.com TLD** |
| Cached record past TTL | **Stale**, not an error |
| DNS fails outright | **No HTTP status code exists.** Browser-level error |
| POST retried after timeout | Duplicate record → fix = **idempotency key** |
| Same PUT sent twice | Two 200s, one state — **still idempotent** |
| Why UDP over TCP | Escape **head-of-line blocking** (latency) |
| Is the DH secret sent over the wire? | **No.** Built on both ends |
| Who proves server identity? | **Certificate**, not DH |
