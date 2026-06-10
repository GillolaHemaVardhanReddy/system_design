# Session 003 — Cold Re-gate: DNS / TCP / TLS

**Date:** 2026-06-10 · **Trigger:** progress audit revealed DNS/TCP/TLS were marked "banked cold" with no logged cold gate. Ran a separate-day cold re-gate to supply evidence or demote.

---

## DNS — RE-GATE PASSED ✅ (now genuinely banked cold)
Cold, no notes. 5 probes + 2 follow-ups.
- **D1 walk** ✓ — resolver → root → TLD → authoritative, correct ownership each hop. No layer-fusion. (Nit: said TLD "has owner's IPs," self-corrected to NS records.)
- **D2 recursive vs authoritative** ✓ — resolver does the work, authoritative holds the mapping.
- **D3 TTL tradeoff** ✓ — got both directions; coached to name *staleness* as the high-TTL cost.
- **D4 split propagation** ✓ (after F1) — initially dodged the "when." On drill, derived cold: records cached under old 24h TTL stay alive their full 24h regardless of lowering now; lowering at flip-time is too late → **lower TTL a day+ before migration**; keep old server alive until traffic drains.
- **D5 no-response failure** ✓ (after F2) — resolver tries the *other* authoritative NS first, then returns a **DNS resolution failure** (not a TCP timeout); user sees DNS error. Hedge cleared on retry.

**Verdict:** DNS banked cold. Layer-fusion held.

---

## TCP — RE-GATE FAILED ❌ (stays; was never truly banked — audit vindicated)
Cold, no notes. 5 probes.
- **T1 handshake** ⚠️ PARTIAL — got SYN + final ACK; **honestly flagged he doesn't know the server's half**. Missing: server picks its **own** initial sequence number (handshake is bidirectional — SYN / SYN-ACK / ACK; both sides establish ordering each direction).
- **T2 reliability/ordering** ✓ — seq numbers for order; retransmit-on-timeout + dup detection for reliability. Muddy vocab, sound model.
- **T3 tradeoff** ❌ FAIL — reached for "anyone can view packets / privacy." **Wrong concern assigned to this layer (blind-spot flare).** Has **no concept of TCP's latency/overhead cost, and no UDP in his head as the alternative.** This is the real hole.
- **T4 train-tunnel survival** ⚠️ PARTIAL — "waits, times out, retries" gist only; didn't explain *why the connection survives 8s of silence* (retransmission timeout + backoff, no RST, seq state preserved → resume not restart).
- **T5 dropped segment** ⚠️ PARTIAL — right shape (gap via seq numbers, missing data re-sent) but **flipped sender/receiver** (in a download the browser is the receiver that detects the gap) and missed the **duplicate-ACK / fast-retransmit** signal.

**Verdict:** NOT banked. Two genuine holes: (1) handshake is one-directional in his head; (2) no grasp of TCP's cost or its UDP alternative. Blind-spot (wrong-actor / wrong-concern) reappeared at T3 and T5.

---

## TLS — NOT RE-GATED YET (still pending; Diffie–Hellman remains the weak point)

---

## ⏯️ RESUME HERE (next session — Hema will type "continue")
**Re-teaching TCP from the tradeoff, Socratically deriving why UDP exists.** Live-video-call thought experiment is on the table:
- Frame #500 dropped; #501 already arrived; TCP refuses to deliver #501 until #500 is re-sent in order.
- Q1: by the time #500 is retransmitted, is it still useful in a live call? What does the viewer experience while TCP is being "reliable + ordered"?
- Q2: live video — wait-and-deliver-#500 (TCP) vs skip-#500-show-#501-now? Which does a call want, and what does that reveal TCP's real *cost* is (head-of-line blocking / latency)?
→ Lands on **UDP** (next syllabus atom anyway). Then circle back to re-teach **T1 handshake bidirectionality** and **T5 dup-ACK / fast-retransmit + sender-vs-receiver**. Re-gate TCP fully, then move to TLS re-gate.

**Pending after TCP:** TLS cold re-gate (focus: Diffie–Hellman) · overdue HTTP safe-vs-idempotent revision (was due 2026-06-08).
