# NOW — the only file a session needs to open

> **GENERATED. Never hand-edit.** `node scripts/status.mjs brief` · source `trackers/STATUS.json`
> **This file is STATE. `CLAUDE.md` is RULES.** They do not overlap, so they cannot drift.
> Written 2026-07-17 · after Session 12

## ⇢ START HERE — atom 1.9: TLS 1.3 + Diffie–Hellman

`TLS 1.3 + Diffie–Hellman — cert = IDENTITY, DH = SECRECY; the secret is built on both ends and NEVER SENT`

**priority** `daily` · **derive** `need-only` · **source** ⭐⭐ tls13.xargs.org (byte-by-byte, names every field) · RFC 8446

> ⚠️ **TRAP** — DO NOT use hpbn.co's TLS chapter — it is from 2013 and predates TLS 1.3. It will teach you a handshake that no longer exists.

### The open beat — this is where you start, cold
★ THE OWED CONVERSATION IS CLOSED — do NOT re-open it (S13, see closed[]). S14 starts COLD on the resolver, in this order. (1) COMPRESSION POINTER, cold re-ask — ASKED AT S13, UNANSWERED (he left before answering; he has NOT seen it fail or pass, so it is NOT burned — re-ask verbatim): 'A DNS response spells google.com out once but it appears three times; the other two are a short stand-in — what is that stand-in called, and why does it exist?' Term is WARM from S12 (he christened it off decoding c0 13 by hand). This re-ask is the retrieval event that BANKS it — do it before any new resolver work. (2) Then the pointer-test rule, still parked UNANSWERED from S12: 'if the byte is ___ it's a compression pointer' — he answered 'c0' (the literal). The ≥192 test is DERIVABLE (he holds: top two bits 11, offset bits share the byte, c1/c5/ff examples given) — do NOT hand. ⚠️ But the moment it turns into byte arithmetic, HAND the fact instantly (§2 Mechanical-Fact Rule, #013) — the 11-means-192 conversion is a lookup, the WHY-two-bits is the derivation. (3) Then the decode loop (does NOT exist in resolver.js yet — his catch, #012; READ the file before referencing it) → names out of his byte dump → NS records → referral loop. (4) TLS lab part 1 still parked mid-prediction: 'openssl s_client -connect google.com:443 -showcerts — how many certs come back, whose name on each?' ASKED, UNANSWERED. His likely answer is ONE — the real answer (leaf + intermediate) opens chain-of-trust, which is in lacks: HAND it there.

**Already closed — do NOT re-teach:**
- S7: the SECRECY half — DH re-derived cold after 31 days, named unprompted.
- S7: ★ the 31-day-open MITM beat — two handshakes, two keys, attacker relaying. Plus the killer line, his own: 'DH gives SECRECY, not IDENTITY'. June's CA-vs-middleman swap REPAIRED.
- S9: signature-unforgeability, the MAKE half — 'only the CA's private key can make the mark'. Cold, first ask.
- S10: ★ THE SIGNATURE PRIMITIVE HANDED — private key MAKES, public key CHECKS, neither does the other's job. He applied it same-session on first ask and volunteered the check-is-not-make half himself. The S9 contradiction is RESOLVED. WARM — a cold re-ask next session is what banks it.
- S10: the cert is signed ONCE, offline, shipped to the site — DigiCert is not in your handshake. He derived it himself off the ~100k-responses/sec scale argument, killing his own 'signs every res' claim.
- S10: ★ TWO HANDSHAKES STACKED — TCP completes → TLS handshake runs inside the pipe → HTTP's first byte. He DERIVED it off one nudge (messages need a reliable pipe). Christened TLS with its etymology. This repaired a layer-fusion live.
- S11: ★ THE COLD RE-ASK PASSED — private key makes, public key checks, public key on disk. All three objects, first ask, fresh session. The signature primitive is COLD; term promoted on this retrieval event.
- S11: the trust-anchor beat CLOSED WITH A CAVEAT — he walked one level (CA signs CA) but would not commit to NOBODY; hedged (domain-in-cert, then DH-with-site), got frustrated, and the anchor was HANDED via his own S8 hardcoded root IP. He christened trust anchor and used it ('198.41.0.4 is a trust anchor'). HONEST: DNS-side he owns cold; the TLS-side transfer was handed, not produced. ★ HIS METHOD CATCH (logged, he is right): 'WHO SIGNED it' sends the learner hunting for a signer when the answer is NO SIGNER — ask 'why do you trust the key ALREADY ON YOUR DISK' instead.
- S11: DNS lab (1.3) RUN and closed mid-session at his request — 127.0.0.53 loopback seen FAILING, dig +trace walked root→TLD→auth live, six A records → derived failover + load-spread, TTL seen at 28 vs authoritative 300 → derived multi-cache → anycast christened. Referral + glue christened off the header counts.
- S11: RESOLVER RESUMED (1.3 build) — verified ticket-ID matching in HIS code (sent id == received id, live), header counts placed (ANCOUNT/NSCOUNT/ARCOUNT), question-section length computed from his own encodeName, records-start offset 28 DERIVED after one miscount (letters only, forgot length bytes + terminator).
- S12: the compression-pointer NEED derived and committed (512-byte UDP limit handed as the missing RFC fact) — 'save space and not blow past 512 bytes, truncation issues'.
- S12: ★ COMPRESSION POINTER CHRISTENED — c0 13 decoded by him to byte 19 = 'com' inside his OWN echoed question; his word 'points' became the name; working sentence with term + need produced. WARM — same-session, promotes nothing; cold re-ask at S13 banks it.
- S12: his readUInt16BE(487) crash root-caused by him after one handed fact (16 bits = 2 bytes, after a '4 bytes?' miss — byte-arithmetic gap logged).
- S12: ★ RULES HELD UNDER PRESSURE — asked twice for Jimmy to write the code, once for an immediate LinkedIn article; refused per rule 3 and the article gate. Parked the session clean instead. The meta-conversation is owed at S13, fresh.
- S13: ★ THE OWED 'IS THIS WORTH IT' CONVERSATION — CLOSED, honoured fresh before any teaching, as promised at the S12 park. He opened still wanting out ('its not usefull anyway writing code line to line for a dns resolver, i just have to know how that works') and called out the S12 arguing ('you just kept arguing again and again') — fair, and conceded by Jimmy. Shown his OWN S8 words ('i'm not even getting motivation because i'm not even seeing what i am learning'), he reversed in ONE move: 'yeah i have to do labs damnnnnnn'. No argument needed. BEHAVIOR_LEARNING reconfirmed for the 4th time: show him the contradiction in his own words and he self-diagnoses, every single time.
- S13: ★ THE REAL COMPLAINT WAS NEVER BUILD-VS-NO-BUILD — it was 'can you make it better and easier to understand and a bit faster'. The build tier SURVIVES and rule 3 (he types every line) was never actually contested once the friction was named. DO NOT re-litigate the build with him; the thing he objected to has been fixed at the rule level.
- S13: ★ THE MECHANICAL-FACT RULE — HIS catch, and he made Jimmy engrave it into CLAUDE.md §2 before he would take another question ('write the thing rule related to mechanical facts in .claude files engrave it into you'). A mechanical fact belongs to no atom, so it has no derive tier: default it to `no` and HAND IT INSTANTLY, one line, no question mark. Test: could he get it from a man page in ten seconds? Then there is nothing in it to teach. Never Socratise a lookup. Story + cost in TEACHING_LOG 013.

**Next moves:** S13 order: (0) the owed 'is this worth it' conversation, fresh — before any teaching. (1) resolver: pointer-test rule (≥192, derivable, parked UNANSWERED) → decode loop in HIS code → names out of the dump → NS records → referral loop. Cold re-ask 'compression pointer' early. (2) THEN TLS lab: openssl prediction → BECOME A CA → /gate 1.9. STILL IN lacks: cryptographic hashing, chain of trust (the openssl output is the door to hand chain-of-trust). Phase 2 idea HE proposed stands: HTML view of the live walk — HIS code, every line.

### ✅ He HOLDS these — you MAY ask him to derive FROM them
- Diffie-Hellman key exchange (g, p, g^a mod p, shared g^(ab)) — produced COLD S7
- the one-way wall: modular exponentiation easy / discrete logarithm hopeless — COLD S7
- the secret is built on both ends and NEVER SENT — COLD S7
- man-in-the-middle: two separate handshakes, two keys, attacker relays — COLD S7
- DH gives SECRECY, not IDENTITY — COLD S7
- trust anchor (owns it cold from 1.3, DNS root hints)
- ★ ASYMMETRIC DIGITAL SIGNATURES — private key MAKES the mark, public key CHECKS it, neither does the other's job. HANDED S10, CONFIRMED COLD S11 (2026-07-16): all three objects right on a fresh-session first ask.
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
- **[S11]** Which key makes the mark, which checks it, and which one is on your disk right now? (S11 cold re-ask of the handed primitive)
  - ↳ PASS COLD — all three right objects, first ask, fresh session: private key makes, public key checks, public key on disk. The S10 primitive survived to a later session. Promoted.
- **[S11]** WHO SIGNED DigiCert public key, to prove IT is genuine? (the S10 open beat, re-asked cold)
  - ↳ MISS then HANDED — walked the chain one level (CA signs CA) but would not commit to NOBODY; hedged with domain-name-in-cert, then DH, then frustration. Answer handed via his own S8 resolver (hardcoded root IP). He then christened trust anchor and used it in a sentence. HONEST GRADE: the DNS-side anchor he owns; the TLS-side transfer was NOT produced cold. ★ HIS METHOD CATCH: the question WHO SIGNED sends you hunting for a signer when the answer is no-signer — ask WHY DO YOU TRUST THE KEY ALREADY ON YOUR DISK instead. He is right. Logged.

### Lab — not yet run
`openssl s_client -connect google.com:443 -showcerts  →  then BECOME A CA: genrsa root → self-sign → sign a leaf for hema-bank.local → curl → REJECTED → add root to trust store → ACCEPTED`
↳ ★ You build the trust anchor with your hands. The curl fails, you install YOUR root, the same curl succeeds — and nothing about the server changed. Trust is not in the certificate. It is in what your machine already believed.

## Queue behind it
**4/166 atoms banked cold (2.4%).** Banked is not permanent — 29 days once took DNS+TCP+HTTP to 1.5/6.

- `1.10` **HTTP/1.1** — re-gate, overdue 34d · `daily`
- `1.2` **IP · best-effort** — re-gate, overdue 27d · `loadbearing`
- `1.4` **TCP 3-way handshake** — re-gate, overdue 27d · `loadbearing`
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
