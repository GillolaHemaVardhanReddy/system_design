# Session 007 — TLS 1.9 cold RE-gate · the 31-day-open MITM beat, closed

- **Date:** 2026-07-14
- **Atom:** 1.9 — TLS 1.3 + Diffie–Hellman
- **Type:** cold RE-gate (later session — counts toward retention, unlike the 2026-06-12 same-day work)
- **Housekeeping first:** fixed a stuck `git pull --rebase` (dropped a stale SessionEnd auto-commit that was re-inflating TLS to a false "banked 5/5"); ran `/doctor` (setup healthy; enabled auto default mode; disabled the dormant `atlassian` MCP for this project).

## Where it started
Resumed cold on the standing forcing question left unanswered since S6:
> You and the server have never met, no shared secret, and the attacker reads every byte. How do you both end up with the same secret key?

## Questions asked + outcomes
1. **The forcing question (secrecy).** → Named **Diffie–Hellman** cold; mixing intuition intact. ❌ concept slip: *"both sides get the opp side's private keys."*
2. **"If the private key crosses the wire, what does the attacker (who sees every byte) walk away with?"** → Self-corrected: *"the mixed form, not the plain private key."* ✅ (fix made from his own constraint)
3. **"Attacker holds both mixtures — why can't he do what you did?"** → ✅ derived the one-way wall cold: *"mixing is easy, unmixing is nearly impossible."*
4. **Name-at-birth: christen the wall.** → Supplied **discrete logarithm** (he said "logarithmic", dropped "discrete") and **modular exponentiation**. ❌→✅ first aimed at wrong object (*"find g"* — g is PUBLIC), corrected the target to the secret exponent **a**.
5. **Villain #2 (active MITM): "what does he do, how many keys, what does DH fail to guarantee?"** → ✅✅✅ Derived: substitutes his own mixture *both directions*, **two handshakes → two keys**, attacker in the middle relaying, and cold: **"it fails to guarantee the opposite side is who we think"** — DH = secrecy, not identity. **This is the beat that sat open for 31 days.**
6. **Name the villain.** → **"man in middle"** cold, pinned on the ATTACKER. Repairs the June error (had called the *CA* "the middle man").
7. **Break the weak cert test** (attacker makes his own certificate). → Reached "certificate provider" (CA) but at *presence-check* depth; hit an honest **"I don't know why the attacker can't fake it / why we trust the CA at all."** Fatigue signalled ("it's getting late").

## Outcome
- **Banked cold this session (later-session, counts):** Diffie–Hellman, man-in-the-middle. Secrecy half re-derived cold end-to-end. **MITM beat CLOSED.**
- **Terms:** DH → COLD · MITM → COLD (June swap repaired) · CA → WARM (no longer swapped, mechanism unowned) · discrete logarithm, modular exponentiation → WARM (referent right, retrieval pending).
- **Atom 1.9 status: still `here` — NOT banked.** A new open beat replaced the closed one.

## Frontier / next session (cold)
The **certificate / PKI mechanism**, derived not handed:
1. Why the attacker can't forge the CA's signature (signing is one-way; needs the CA's private key).
2. Why we trust the CA at all → **trust anchor** (root certs baked into the browser, ≅ DNS root hints — he owns "trust anchor" cold; connect it).
Taught tonight as a *shape* only, explicitly not derived — so it does not count. Open with it.

## Method notes
- Governing law held: every **concept** he'd derived came back; only **terms** needed christening. Name-at-birth worked (etymology visibly re-motivated him).
- Discriminator-dodging surfaced twice (private-key-vs-mixture; g-vs-a) and both times he **self-corrected when handed the contradiction** — do not lecture, hand back the clash.
- Layer-fusion caught: brought the **certificate** (identity) tool to the **eavesdropper** (secrecy) problem. Splitting the two villains fixed it and set up the MITM beat cleanly.
- Respected fatigue at the honest knowledge edge — stopped rather than cram-installing the cert mechanism tired (it would rot).
