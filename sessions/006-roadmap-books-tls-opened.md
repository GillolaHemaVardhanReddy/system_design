# Session 006 — Books indexed · the Roadmap · TLS opened (not taught)
**Date:** 2026-07-11 (same day as S5) · **Module 1 — Networking**

---

## ⚠️ Honest headline: **NO TEACHING HAPPENED THIS SESSION.**

**Zero atoms taught. Zero questions asked. Zero gated. Zero banked.** This was an infrastructure session, at Hema's direction. It must not be counted as learning, and the trackers must not move as if it were.

`CLAUDE.md` §4 contains the exact warning this session flirted with: *"never let material-gathering substitute for the atom in front of him."* It didn't substitute — the atom was **opened** — but the session ended before he answered a single question. **Watch this pattern.** Two sessions like this in a row and the program is a filing system, not a curriculum.

---

## What was built

### 1. `references/OWNED-BOOKS.md` — 5 PDFs + 1 epub indexed, book → chapter → syllabus atom

**Edition audit (the thing he asked for plainly):**

| File | Verdict | Evidence |
|---|---|---|
| `Designing Data Intensive Applications by Martin Kleppmann.pdf` | ❌ **1st edition — SUPERSEDED. Buy the 2nd.** | © 2017 · "March 2017: First Edition" · Kleppmann **alone** · ISBN 978-1-449-37332-0 · 12 chapters. This is `REFERENCES.md` trap #9, sitting in the repo as a file. |
| `dokumen.pub_...-2.epub` | ⚠️ **Genuine 2e — and an unauthorised copy.** | Kleppmann **& Riccomini** · © 2026 · "February 2026: Second Edition" · ISBN 978-1-098-11906-5 · 14 ch + Glossary. `REFERENCES.md` records 2e has **no free version (author-confirmed)**; dokumen.pub is a pirate mirror. Right edition, wrong route. **Buy it: dataintensive.net.** |
| `2018-John Ousterhout-A Philosophy of Software Design.pdf` | ✅ **1st ed (v1.01, Nov 2018) — and that is FINE. Keep it.** | Ousterhout says himself that if you own the 1e the 2e may not be worth buying; the 2e adds one chapter ("Decide What Matters") + reworks ch. 6, and he publishes the new material **free**. |
| `Refactoring...2nd.Edition` | ✅ Correct 2e (the JavaScript one). | — |
| `Understanding Distributed Systems 2nd edition` | ✅ Correct 2e. | REFERENCES.md's "Oct 2024" is a later printing of the same edition. |

**Structural warnings baked into the file:**
- **None of these books is needed before Module 2.** Module 1 is 100% free sources.
- **Not one book he owns teaches TLS 1.3.** His live debt is a topic his bookshelf cannot help with. That is *why* atom 1.9's source is `tls13.xargs.org` and not a book.
- **DDIA 2e's new Glossary must NOT be handed to him to read.** That is `TEACHING_LOG.md` Entry 003's exact mistake — reading a term does not install it.

### 2. `notes/ROADMAP.html` — the dependency graph

One button → 15 modules as a **causal chain**, not a list. Click a node: **what broke** (the forcing question) → what it buys → **what it costs / what breaks next** → what it unlocks → the atom list with per-atom status and tagged source + traps. Data-driven from one block; colours are computed, so **a `/gate` pass moves the graph and it cannot lie.**

### 3. Status reconciliation — the demotion

`SYLLABUS.md`, `COMPLETION.md` and the new roadmap **disagreed** about atom 1.5. Fixed by demoting it everywhere.

| Atom | Was | Now | Why |
|---|---|---|---|
| `1.5` TCP loss recovery | ✅ BANKED (S4) | ⚠️ **TERMS LOST** | Mechanism re-derived cold and unaided in S5. **Named none of it** — not fast retransmit, not RTO, not exponential backoff. *A correct explanation without the correct term is not a pass.* The rule applies to the tracker or it applies to nothing. |

**Honest count, now consistent across all three files: 4 / 166 atoms banked cold (2.4%).**
Banked: `1.2` IP best-effort · `1.3` DNS · `1.4` TCP handshake · `1.10` HTTP/1.1.

> **166, not the ~250 he estimated.** Modules 2–14 have not been `/breakdown`-decomposed — they are still syllabus *bullets*, and a bullet splits into 2–3 real atoms. Expect 200–300 eventually. **The number will rise as the map gets more honest, not as he learns more.**

### 4. `sessions/005-term-decay-finding.md` — reconstructed

S5 was **committed with no session log**. The most important session in the repo had no record of its own questions. Reconstructed from the trackers; the per-question grades are **permanently lost**. → `TEACHING_LOG.md` Entry 005.

---

## Atom 1.9 — TLS 1.3 + Diffie–Hellman: **OPENED, NOT TAUGHT**

Delivered, per the new rules:
- **Source announced up front:** `tls13.xargs.org` — byte-by-byte, **names every field**, chosen precisely because his failure mode is *"understands the machinery, cannot name the parts."* **Read AFTER deriving.** Backup: RFC 8446.
- **Trap named:** do **not** use `hpbn.co`'s TLS chapter — 2013, predates TLS 1.3, teaches a handshake that **no longer exists** (incl. RSA key transport, which was *removed*).
- **What broke:** *"After TCP you hold a reliable ordered byte pipe. It is still **plaintext**."* — his own boundary rule, turned into the forcing question.
- **Real-world anchor:** **Firesheep** (Oct 2010) — one-click session hijacking of everyone on the café wifi, not a Facebook bug but Facebook working *exactly as designed* on a plaintext pipe. Kicker: **NSA MUSCULAR** (2013), tapping the fiber *between Google's own datacenters*, with the leaked slide reading *"SSL added and removed here :-)"*.
- **The forcing question, posed and LEFT OPEN:**
  > *You and the server have never met. No shared password, no prior arrangement. The only channel between you is the TCP pipe — and the attacker reads every byte of it from the start. **How do you both end up holding the same secret key, when everything you send, he sees?***

**He did not answer. Session ended here. S7 resumes on exactly this question, cold.**

---

## Questions asked & grades

**None.** No teaching, no quiz, no gate. Nothing to grade. Recorded as zero rather than left blank, deliberately.

## Trackers moved

`SYLLABUS.md` (1.5 demoted + legend) · `COMPLETION.md` (166-atom denominator, 4 banked, module table) · `LEARNING_TRACKER.md` · `REVISION_SHEET.md` · `TEACHING_LOG.md` (Entry 005) · `CLAUDE.md` §6 · **new:** `references/OWNED-BOOKS.md`, `notes/ROADMAP.html`, `sessions/005-*.md`.

**`GLOSSARY.md` deliberately NOT moved.** No term was drilled, derived or produced. Pushing a "next drill" date without a retrieval event would be exactly the fiction `TEACHING_LOG.md` Entry 002 exists to prevent.
