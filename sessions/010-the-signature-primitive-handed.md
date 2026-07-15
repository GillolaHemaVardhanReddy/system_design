# Session 010 — The signature primitive, handed at last

**Date:** 2026-07-15 · **Atom:** 1.9 TLS 1.3 + Diffie–Hellman · **Status:** still `here` — stopped mid-beat, by his call.

Short session. He stopped it himself to bank progress. That is the right instinct and it cost nothing —
the beat is recorded open, with the exact question he stopped on.

---

## What actually happened

S9 ended on a contradiction Hema could not resolve, **correctly** — the resolution needed a primitive he
had never been given. S9's mistake was interrogating him for it (TEACHING_LOG 010). S10 opened by
**handing** it, which is what `derive: need-only` has meant all along.

The need was already derived (S9's contradiction *was* the need). So: hand the tool, make him apply it.

**The primitive, handed:** the CA has a key **pair**. Private key **MAKES** the mark. Public key **CHECKS**
it. Neither key does the other's job — holding the public key lets you verify a signature and gives you no
power to produce one.

He applied it on the first ask and volunteered the load-bearing half unprompted.

Then the atom moved on its own: he killed his own "the CA signs every response" claim with a scale
argument, and derived the two-handshake stack off a single nudge.

---

## Questions asked, and how they went

| # | Question | Grade |
|---|---|---|
| 1 | Which of the two keys ships in your browser? | **PASS** — "public key ships in browser… anyone can read the message inside but cant embed another message since they dont know private key". Resolved S9's contradiction first ask. Volunteered check≠make himself. **WARM, not cold** — same-session application of a handed primitive promotes nothing. |
| 2 | What does DigiCert do with its private key, what does your laptop do with the public one? | **PARTIAL** — mechanism right, but "signs the mark onto **res**". Wrong object: the CA signs the **certificate**, once, offline. It never touches a response. Blind spot 1 on the HTTP/TLS boundary. |
| 3 | Google serves ~100k responses/sec. If DigiCert signed each one, it would have to be contacted over the network on every response, for every site on earth. Does that work? | **PASS** — "no it wont work, so certificate is already signed and given to each site". He killed his own wrong object. Then guessed the cert rides "in headers on each req or res" — hedged with "or somewhere". |
| 4 | TCP's handshake is 3 packets: SYN, SYN-ACK, ACK. Where in those three does a 4KB certificate fit? | **MISS → PASS** — first fused the TCP and TLS handshakes, then said "tell me where i actually dont know". **One nudge** (DH is a back-and-forth of messages; messages need a reliable ordered pipe — does the cert go *inside* TCP's handshake or need it *finished*?) and he derived it: "it needs tcp handshake to finish then". **Not handed.** |
| 5 | Where does DH happen? | **MISS → self-corrected.** See below — this one is Jimmy's fault. |

---

## ★ Jimmy's mistake this session — the abbreviation

Q5 got "**it happens in TCP**" — flatly contradicting what he had derived ninety seconds earlier. Looked
like layer-fusion relapsing. It wasn't.

Shown the contradiction he replied: *"does DH doesnt mean diffie hellman?"*

**The abbreviation was the fault, not the layering.** He owns Diffie–Hellman cold — he has produced it cold
after 31 days. He has never once produced it as "DH". Spelled out in full, he answered "ok then it will be
inside TLS" instantly, no hesitation.

**Rule extracted:** *do not abbreviate a term he has only ever produced in full.* An abbreviation is a **new
term wearing the old one's meaning** — it needs christening like any other. Two seconds of "DH" cost a false
layer-fusion signal that would have been logged against him.

Filed to TEACHING_LOG as Entry 011.

---

## Terms christened

- **Digital signature** — a signature made of digits; only the private-key holder can write it, anyone with the public key can read it. `WARM`
- **Asymmetric (key pair)** — *a-* "not" + *symmetric* "same". The two keys are not the same and not interchangeable. The word **is** the concept. `WARM`
- **TLS handshake** — **T**ransport **L**ayer **S**ecurity: security bolted on top of the transport layer, i.e. on top of TCP. The name is the architecture. `WARM`

All three are WARM, none COLD. Same-session production proves working memory and promotes nothing.

---

## The stack he now holds

```
TCP handshake   →  SYN / SYN-ACK / ACK          →  a reliable, ordered pipe exists
TLS handshake   →  cert checked + DH run        →  a session key exists
HTTP            →  first byte finally sent
```

He derived the middle row himself. It is the first time the TCP/TLS boundary has been correct in his mouth.

---

## Where it stopped

On this question, **asked and unanswered**:

> Your browser holds DigiCert's public key and uses it to check DigiCert's signature. Fine. But that's just
> a key sitting on your disk. **Who signed DigiCert's public key, to prove *it* is genuine?**

This is the **derivable** half — he owns trust anchor cold from DNS root hints (1.3). Do not hand it.
Chase him up the chain until he hits *"nobody — it's just there, believed because it shipped with the machine."*

---

## Next session, in order

1. **Cold re-ask first** — the S10 primitive has never been cold: *which key makes the mark, which checks it, which one is on your disk?*
2. The open beat above — why we trust the CA at all → trust anchor.
3. `/lab 1.9` — **he becomes a CA.** `curl` REJECTED → install his own root → same `curl` ACCEPTED, server unchanged. Trust was never in the certificate; it's in what his machine already believed.
4. `/gate 1.9`.

**Still in `lacks`:** cryptographic hashing (sign the digest, not the document) · chain of trust / intermediate CAs.
