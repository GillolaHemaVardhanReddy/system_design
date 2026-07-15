# Session 009 — 2026-07-15 — The primitive rule, and the file that only recorded answers

**Type:** infrastructure. **Atoms taught: 0. Atoms banked: 0.**
This is the **4th of 10 sessions that built system and taught nothing**. Named here so it cannot become the pattern.

---

## What happened

Opened on the standing plan: close the open PKI beat on atom 1.9 (why a CA signature can't be forged; why we trust the CA), cold, derived.

**Question 1 — PASS, cold, first ask.**
> *"The attacker copies Google's cert, rips out Google's public key, drops in HIS OWN. He now needs a fresh signature at the bottom. What stops him from writing one?"*

His answer: *"attacker wont copy because CA will mix the certificate with his own private key so attacker cannot know the private key of CA."*
**Right object.** The mark can only be **made** with the CA's private key. "Mix" is borrowed from the DH paint-mixing analogy — synonym rule, referent correct, **pass**. That closes the **MAKE half** of signature-unforgeability.

**Question 2 — ★ VOID. My failure.**
> *"Your laptop has to CHECK that mark. But your laptop does not have DigiCert's private key either. So what does it use?"*

He said: *"all browsers will trust some CA's so they will come baked in with the CA's private keys right"* — wrong (it's the **public** key, in a root certificate).

**But the question was unanswerable.** He has **never been given asymmetric digital signatures**. DH is key *exchange*; nothing in it implies a key that makes a mark a *different* key checks. **I asked him to derive RSA.**

**Question 3 — PASS (partial).** Held his own two sentences against each other (*the attacker can't know the private key* / *it ships on 3 billion devices*). He saw the contradiction instantly: *"damn then how should i know."* **BEHAVIOR_LEARNING confirmed again — he self-diagnoses reliably from a contradiction in his OWN answers.** He couldn't resolve it, correctly, because resolving it needs the missing primitive.

**Then he stopped the session:**
> *"u never teach me and ask me how and why? i think the model design of .claude is an issue here right? how to fix it"*

**He was right, and he was one inch from the exact bug with no access to the file.**

---

## The finding

**`STATUS.json` told me to ask that question.** Written by me, S7, atom 1.9: *"He hit 'I don't know why' on both — TAUGHT as a shape only, NOT derived… **Derive cold next session.**"*

**Root cause: the record tracked what he ANSWERED and never once what he was GIVEN.** So these two are **indistinguishable** in the file, and they need **opposite** responses:
- *he holds the primitive and failed to derive the consequence* → **ask harder**
- *nobody ever taught him the primitive* → **hand it to him**

**And the culture pushed the wrong way.** *"What he is HANDED rots"* is **true** — and it created a bias where handing him anything felt like the failure mode. So Jimmy interrogates an underivable primitive instead of teaching it. **The method ate its own exception.**

→ `TEACHING_LOG.md` **Entry 010**.

---

## What was built

| | |
|---|---|
| **`NOW.md`** | **NEW.** The one file a session opens with — 6.3 KB, **generated** from `STATUS.json`, never hand-edited. Current atom · **what he holds** · **what he lacks** · the open beat · questions already asked · due queue · terms in the red. |
| **The split** | **`NOW.md` = STATE (generated). `CLAUDE.md` = RULES (hand-written).** Zero overlap → **they cannot drift.** Prose about status is how the lying starts (Entry 006). |
| **`given` / `lacks` / `derive`** | Per live atom. `derive: yes` (ask) · **`need-only`** (derive the NEED, hand the TOOL) · `no` (hand it). The missing third category. |
| **`qs[]`** | Every question + grade, per atom, in the canonical record. **Closes known-hole #1, open since S6.** |
| **`pri` / `real`** | Priority (`daily`/`loadbearing`/`trivia`) + real-world anchor per atom — Hema's asks. |
| **2 new invariants** | `check` **FAILS** on: a live atom with no `given` · a re-asked question. **Tested — both fire.** |
| **`CLAUDE.md`** | **40 KB → 19.6 KB.** Rules only; war stories moved to `TEACHING_LOG` (they were duplicated). §6 "current state" **deleted** — it was prose state, i.e. a drift bug. |
| **Hooks** | `SessionStart` prints `NOW.md` + `check --quiet`, and **no longer orders a bulk-read of three trackers**. `SessionEnd` regenerates `NOW.md` + `ROADMAP.html` before committing. |
| **`/teach`** | Gains **Step 0: the primitive check**, before it opens its mouth. |
| **`/gate`** | Must now log every question to `qs[]`; void questions recorded as void. |

**Session-start load: ~22,000 → ~6,700 tokens (−70%).** Lazy-filled **7 live atoms**; the other **159 locked atoms untouched** — backfilling them would have been the token bonfire this session existed to prevent.

---

## Honest ledger

- **The token bloat and the bad question look like the same problem. They are not.** I could have read all 89 KB twice and still asked that question — **the information was in no file.** Volume was never the bug; **a missing field was.** He asked for a smaller file; what he needed was a **different** one. He got both.
- **Net: +1 file, −20 KB of rules.** No new commands, no new agents, no new trackers.
- **Nothing was taught.** Atom 1.9 remains `here`, one beat open, and it is now **10 days** since anything was banked.

## ⇢ Next session

**Teach. No infra.** `NOW.md` says everything needed:
1. **Hand the signature primitive** (private makes / public checks — `derive: need-only`). Shape: *"You need a mark only the CA can make but anyone can check. Does DH give you that?"* → he says no → *"Correct. New tool. Here it is."* → **he applies it to the swapped-cert case.**
2. **Derive** why we trust the CA — **this half IS derivable**, he owns **trust anchor** cold from DNS root hints.
3. **`/lab 1.9` — HE BECOMES A CA.** curl REJECTED → install his own root → same curl ACCEPTED, server unchanged. *Trust was never in the certificate.*
4. **`/gate 1.9`.** Then the backlog: 1.5 (terms lost) · 1.7 (never gated) · 1.2 · 1.4 · 1.10 (all overdue).
