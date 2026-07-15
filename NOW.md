# NOW — the only file a session needs to open

> **GENERATED. Never hand-edit.** `node scripts/status.mjs brief` · source `trackers/STATUS.json`
> **This file is STATE. `CLAUDE.md` is RULES.** They do not overlap, so they cannot drift.
> Written 2026-07-15 · after Session 9

## ⇢ START HERE — atom 1.9: TLS 1.3 + Diffie–Hellman

`TLS 1.3 + Diffie–Hellman — cert = IDENTITY, DH = SECRECY; the secret is built on both ends and NEVER SENT`

**priority** `daily` · **derive** `need-only` · **source** ⭐⭐ tls13.xargs.org (byte-by-byte, names every field) · RFC 8446

> ⚠️ **TRAP** — DO NOT use hpbn.co's TLS chapter — it is from 2013 and predates TLS 1.3. It will teach you a handshake that no longer exists.

### The open beat — this is where you start, cold
The certificate/PKI mechanism. TWO halves, and they need OPPOSITE treatment. (a) HOW the signature proves identity — needs the SIGNATURE PRIMITIVE, which he has never been given. DO NOT ASK HIM TO DERIVE IT. Derive the NEED ('you want a mark only the CA can make but anyone can check — does DH give you that?' → he says no → 'correct, so we need a new tool, here it is'), then HAND the tool. (b) WHY we trust the CA at all — this half IS derivable, because he owns trust anchor COLD from DNS root hints. Ask that one.

**Already closed — do NOT re-teach:**
- S7: the SECRECY half — DH re-derived cold after 31 days, named unprompted.
- S7: ★ the 31-day-open MITM beat — two handshakes, two keys, attacker relaying. Plus the killer line, his own: 'DH gives SECRECY, not IDENTITY'. June's CA-vs-middleman swap REPAIRED.
- S9: signature-unforgeability, the MAKE half — 'only the CA's private key can make the mark'. Cold, first ask.

**Next moves:** Hand the signature primitive (make/check asymmetry) → he applies it to the swapped-cert case → derive WHY the CA is trusted (trust anchor, ≅ DNS root hints — he owns this) → then /lab 1.9: HE BECOMES A CA. curl REJECTED → install his own root → same curl ACCEPTED, server unchanged. Trust was never in the certificate. Then /gate 1.9.

### ✅ He HOLDS these — you MAY ask him to derive FROM them
- Diffie-Hellman key exchange (g, p, g^a mod p, shared g^(ab)) — produced COLD S7
- the one-way wall: modular exponentiation easy / discrete logarithm hopeless — COLD S7
- the secret is built on both ends and NEVER SENT — COLD S7
- man-in-the-middle: two separate handshakes, two keys, attacker relays — COLD S7
- DH gives SECRECY, not IDENTITY — COLD S7
- trust anchor (owns it cold from 1.3, DNS root hints)

### ⛔ He does NOT hold these — HAND them. Asking is ILLEGAL.
- ★ ASYMMETRIC DIGITAL SIGNATURES — private key MAKES the mark, public key CHECKS it, neither does the other's job. HE HAS NEVER BEEN GIVEN THIS. DH is key EXCHANGE and does not imply it. This is the primitive S9 tried to interrogate out of him. HAND IT.
- cryptographic hashing (sign the digest, not the document)
- chain of trust / intermediate CAs

### Real-world anchor
Firesheep, 2010: a one-click Firefox extension that let anyone on the same cafe wifi steal your logged-in Facebook session, because the site used HTTPS for the password page and plain HTTP for everything after. It was released PUBLICLY, on purpose, to shame the industry into TLS-everywhere. It worked.

### Questions already asked — a *cold* gate may NOT reuse these
- **[S9]** The attacker copies Google's cert, rips out Google's public key, drops in HIS OWN. He now needs a fresh signature at the bottom. What stops him from writing one?
  - ↳ PASS — reached the right object cold: the mark can only be MADE with the CA's private key, and the attacker does not have it. Used 'mix the certificate with the CA's private key' — borrowed from the DH paint-mixing analogy. Referent correct (§1 synonym rule).
- **[S9]** Your laptop has to CHECK that mark. But your laptop does not have DigiCert's private key either. So what does it use to check it?
  - ↳ ★ VOID — DO NOT REUSE. This question is unanswerable from what he holds. He replied 'the CA's private keys come baked into the browser' — which is wrong (it is the PUBLIC key, in a root certificate) but it is the ONLY answer available to someone who has never been given asymmetric signatures. NOT a failure of his. TEACHING_LOG Entry 010.
- **[S9]** You just said the attacker can't forge because he can't know the CA's private key. Now you say the private key ships in every browser — 3 billion devices. Both can't be true. Which one breaks?
  - ↳ PASS (partial) — he immediately saw the contradiction ('damn then how'). BEHAVIOR_LEARNING confirmed again: he self-diagnoses reliably when shown the contradiction in HIS OWN answers. He could not resolve it, correctly, because the resolution needs the missing primitive.

### Lab — not yet run
`openssl s_client -connect google.com:443 -showcerts  →  then BECOME A CA: genrsa root → self-sign → sign a leaf for hema-bank.local → curl → REJECTED → add root to trust store → ACCEPTED`
↳ ★ You build the trust anchor with your hands. The curl fails, you install YOUR root, the same curl succeeds — and nothing about the server changed. Trust is not in the certificate. It is in what your machine already believed.

## Queue behind it
**4/166 atoms banked cold (2.4%).** Banked is not permanent — 29 days once took DNS+TCP+HTTP to 1.5/6.

- `1.10` **HTTP/1.1** — re-gate, overdue 26d · `daily`
- `1.2` **IP · best-effort** — re-gate, overdue 19d · `loadbearing`
- `1.4` **TCP 3-way handshake** — re-gate, overdue 19d · `loadbearing`
- `1.5` **TCP loss recovery** — ⚠ TERMS LOST · `loadbearing`
- `1.7` **UDP + head-of-line blocking** — never gated · `daily`

## Terms in the red
*Repair by RE-DERIVING the mechanism and RE-CHRISTENING it. Never by quizzing it harder. No standalone term exam, ever.*

- **Head-of-line blocking** `LOST` (atom 1.7) — Derived UDP FROM it in S4 — then could not name it in S5.
- **Fast retransmit** `LOST` (atom 1.5) — 'I don't know what the other mechanism is' (S5) — then re-derived it from scratch minutes later.
- **Idempotent** `MISUSED` (atom 1.10) — ⚠️ Misdefined as 'same response' — twice.

## Everything else — read ON DEMAND, not now
`trackers/STATUS.json` full record · `TEACHING_LOG.md` Jimmy's failures · `MISTAKE_JOURNAL.md` Hema's · `BEHAVIOR_LEARNING.md` how he learns · `notes/ROADMAP.html` the map

**Open these only when the atom in front of you needs them.** Loading all of it costs ~22k tokens and did not once prevent a mistake.
