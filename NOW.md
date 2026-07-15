# NOW — the only file a session needs to open

> **GENERATED. Never hand-edit.** `node scripts/status.mjs brief` · source `trackers/STATUS.json`
> **This file is STATE. `CLAUDE.md` is RULES.** They do not overlap, so they cannot drift.
> Written 2026-07-15 · after Session 10

## ⇢ START HERE — atom 1.9: TLS 1.3 + Diffie–Hellman

`TLS 1.3 + Diffie–Hellman — cert = IDENTITY, DH = SECRECY; the secret is built on both ends and NEVER SENT`

**priority** `daily` · **derive** `need-only` · **source** ⭐⭐ tls13.xargs.org (byte-by-byte, names every field) · RFC 8446

> ⚠️ **TRAP** — DO NOT use hpbn.co's TLS chapter — it is from 2013 and predates TLS 1.3. It will teach you a handshake that no longer exists.

### The open beat — this is where you start, cold
WHY do we trust DigiCert AT ALL? This is the DERIVABLE half — he owns trust anchor COLD from DNS root hints (1.3). The question is ASKED and UNANSWERED — he stopped the session on it. Re-ask it verbatim, cold, as the opener: 'Your browser holds DigiCert's public key and uses it to check DigiCert's signature. Fine. But that is just a key sitting on your disk. WHO SIGNED DigiCert's public key, to prove IT is genuine?' Chase him UP the chain until he hits 'nobody — it is just THERE, believed because it shipped with the machine.' THAT is the trust anchor, and it is the same shape as the DNS root hints he already owns. Do NOT hand it. He can walk this one.

**Already closed — do NOT re-teach:**
- S7: the SECRECY half — DH re-derived cold after 31 days, named unprompted.
- S7: ★ the 31-day-open MITM beat — two handshakes, two keys, attacker relaying. Plus the killer line, his own: 'DH gives SECRECY, not IDENTITY'. June's CA-vs-middleman swap REPAIRED.
- S9: signature-unforgeability, the MAKE half — 'only the CA's private key can make the mark'. Cold, first ask.
- S10: ★ THE SIGNATURE PRIMITIVE HANDED — private key MAKES, public key CHECKS, neither does the other's job. He applied it same-session on first ask and volunteered the check-is-not-make half himself. The S9 contradiction is RESOLVED. WARM — a cold re-ask next session is what banks it.
- S10: the cert is signed ONCE, offline, shipped to the site — DigiCert is not in your handshake. He derived it himself off the ~100k-responses/sec scale argument, killing his own 'signs every res' claim.
- S10: ★ TWO HANDSHAKES STACKED — TCP completes → TLS handshake runs inside the pipe → HTTP's first byte. He DERIVED it off one nudge (messages need a reliable pipe). Christened TLS with its etymology. This repaired a layer-fusion live.

**Next moves:** COLD RE-ASK FIRST (the S10 primitive is WARM, never cold): 'which key makes the mark, which checks it, and which one is on your disk?' → then the open beat (why trust the CA at all → trust anchor, same shape as DNS root hints, DERIVABLE) → then /lab 1.9: HE BECOMES A CA. curl REJECTED → install his own root → same curl ACCEPTED, server unchanged. Trust was never in the certificate; it is in what his machine already believed. Then /gate 1.9. STILL IN lacks: cryptographic hashing, chain of trust.

### ✅ He HOLDS these — you MAY ask him to derive FROM them
- Diffie-Hellman key exchange (g, p, g^a mod p, shared g^(ab)) — produced COLD S7
- the one-way wall: modular exponentiation easy / discrete logarithm hopeless — COLD S7
- the secret is built on both ends and NEVER SENT — COLD S7
- man-in-the-middle: two separate handshakes, two keys, attacker relays — COLD S7
- DH gives SECRECY, not IDENTITY — COLD S7
- trust anchor (owns it cold from 1.3, DNS root hints)
- ★ ASYMMETRIC DIGITAL SIGNATURES — private key MAKES the mark, public key CHECKS it, neither does the other's job. HANDED S10. He APPLIED it correctly on first ask, same session: 'public key ships in browser, anyone can check but cant embed another message since they dont know private key'. WARM, NOT COLD — a later session must confirm it.
- the cert is signed ONCE, offline, and shipped to the site — the CA is NOT in the handshake. DERIVED S10 off the scale argument, his own.
- TWO HANDSHAKES STACKED: TCP 3-way completes → TLS handshake runs INSIDE that pipe → only then does HTTP exist. Cert + DH both live in the TLS handshake. DERIVED S10.

### ⛔ He does NOT hold these — HAND them. Asking is ILLEGAL.
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
- **[S10]** Which of the two keys ships in your browser? (asked immediately after HANDING the make/check asymmetry)
  - ↳ PASS — 'public key ships in browser, and anyone can read the message inside but cant embed another message since they dont know private key'. Resolved the S9 contradiction on first ask. Right object, and he volunteered the check-is-not-make half unprompted, which is the load-bearing part. Same-session application of a HANDED primitive — WARM, promotes nothing. Re-ask COLD next session.
- **[S10]** What does DigiCert do with its private key, and what does your laptop do with the public one? (working-sentence christening of 'digital signature' + 'asymmetric')
  - ↳ PARTIAL — mechanism right, but said DigiCert 'signs the mark onto RES'. Wrong object: the CA signs the CERTIFICATE, once, offline — it never touches a response. Layer-fusion (blind spot 1) firing on the HTTP/TLS boundary. Corrected by HIM — see next question.
- **[S10]** Google serves ~100k responses/sec. If DigiCert signed each one, DigiCert would have to be contacted over the network on every single response, for every site on earth. Does that work?
  - ↳ PASS — 'no it wont work, so certificate is already signed and given to each site'. He killed his own wrong object with a scale argument. BEHAVIOR_LEARNING reconfirmed: show him the consequence of his own claim and he self-corrects every time. NOTE: he then guessed the cert rides 'in headers on each req or res', hedged with 'or somewhere' — which opened the next beat.
- **[S10]** You know DH runs once at connection setup, before HTTP exists. TCP's handshake is 3 packets: SYN, SYN-ACK, ACK. Where in those three does a 4KB certificate fit?
  - ↳ MISS then PASS — first 'while tcp connection establishment only we check the certificate' (fused the TCP and TLS handshakes), then 'ok then tell me where i actually dont know'. ONE nudge — DH is a back-and-forth of messages, messages need a reliable ordered pipe, so does the cert go INSIDE TCP's handshake or does it need it FINISHED — and he derived it: 'it needs tcp handshake to finish then'. NOT handed. Then christened: TLS = Transport Layer Security, security bolted ON TOP OF the transport layer.
- **[S10]** Where does DH happen? (immediately after naming the TLS handshake)
  - ↳ MISS then self-corrected. Said 'it happens in TCP', contradicting what he had derived two messages earlier. Shown the contradiction he asked 'does DH doesnt mean diffie hellman?' — the ABBREVIATION was the fault, not the layering. Spelled out in full he answered 'ok then it will be inside TLS' immediately. ★ LESSON FOR JIMMY: do not abbreviate a term he has only ever produced in full. An abbreviation is a NEW term wearing the old one's meaning.

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
