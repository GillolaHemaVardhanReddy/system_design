---
name: visual-bible
description: The standard for the per-module HTML revision page (notes/<module>/BIBLE.html) — progressive disclosure, plain-English first, hand-drawn SVG, term etymology, personalised traps, cover-and-reveal drill. Use when building or updating a module's visual bible, after an atom is taught in depth.
---

# Visual Bible — the page Hema actually revises from

A module's bible is **one self-contained HTML file**, offline, in git, that grows atom by atom.
Reference implementation: `notes/networking/BIBLE.html`. **Match it — do not invent a new layout.**

## The three requirements, in Hema's own words (2026-07-11)
> *"I want all the content"* · *"but it's too huge"* · *"I want clarity and depth and easy to understand."*

These are not in conflict. They are solved by **layering**, not by cutting.

---

## 1. Progressive disclosure — three tiers per topic

| Tier | What it is | Rule |
|---|---|---|
| **Spine** | 3 lines, visible **while the card is closed** | The whole module must be scannable in ~90s with every card shut. Each line is a **discriminator** — something he either owns or doesn't. |
| **Plain English** | The first thing inside an opened card, **before any jargon** | A concrete story with **no terminology at all**. This is the Feynman layer. |
| **Depth** | Nested `<details>` inside the card | Mechanics, tables, SVG, traps. Even an open card must not dump everything. |

Implement with `<details class="card">`; the **spine lives inside `<summary>`** so it shows when closed.
Provide **Expand all / Collapse all**. Pre-open only the 2–3 cards covering his **live wounds**.

## 2. Plain English is an explanation, not a summary
It must carry the *whole* idea using **zero technical terms**, then the depth section names things.
Proven analogies (these landed — reuse and extend them):
- **TCP** — 50 numbered postcards through a sloppy post office. Silence is ambiguous; you resend anyway; the *number* makes the duplicate harmless.
- **UDP** — a live match. TCP freezes the stream to re-fetch a stale frame; when it resumes *you're watching the past*. You didn't want the frame — **you wanted to be current**.
- **Diffie–Hellman** — two strangers agreeing a password **out loud in a crowded room**. Mix paint; both end holding the same brown; the room heard only the public colours. **The secret was never spoken — it was built, twice.**
- **Idempotent** — a light switch set to OFF. Flick it to OFF again: the room is just off. **POST is the "add a row" button** — press it three times, three orders.

## 3. Boundaries are the loudest element on the page
Layer-fusion is his blind spot, so the page's **structure must encode the boundaries**:
- **One hue per layer**, used *functionally* — every fact is stamped with the colour of the layer that owns it. If he cites an amber (DNS) fact to answer a rose (HTTP) question, the page has caught his own error for him.
- Between layers, a **hard black rule** stating what he now **holds**:
  > ◆ You hold an **IP**. You do **not** hold a connection.
  > ◆ You hold a **reliable byte pipe**. It is still **plaintext**.
  > ◆ You hold an **encrypted tunnel**. **No HTTP has existed yet.**

## 4. Diagrams: hand-authored SVG, not Mermaid
The `.md` + Mermaid route **failed in practice** — it didn't render in his previewer. Hand-write SVG.
- **Sequence diagrams** get one **lifeline per actor** and an **actor gutter** — the question is never "which protocol," always **"which actor."**
- Solid arrow = request · dashed = response · number every message.
- **Decision trees** for condition→mechanism choices (RTO vs fast retransmit). Put the **condition** in the diamond, and a red **kill-box** explaining why the wrong branch is *impossible*, not merely unused.
- Colour via `var(--layer)` tokens so both themes work. `viewBox` + `overflow-x:auto`.

## 5. Every term carries its etymology — non-negotiable
He concluded the names were arbitrary and stopped trying to retain them. **They are not arbitrary.**
Show the name **as a description**: *head of the **line** → **blocking*** · *RTO = **R**etransmission **T**ime-**O**ut* · *idempotent = idem (same) + potens (power)*.
He must be able to **regenerate** a term, never store it. Cross-check `trackers/GLOSSARY.md`.

## 6. Personalised traps, dated
Not "common pitfalls." **His** pitfalls, with the date and what he actually said:
> *"Root servers hold the IPs of the authoritative servers." (2026-07-11)* → **No. Root → TLD → authoritative.**

## 7. Drill — cover and reveal
Answers hidden behind hatching; click to reveal; **"Hide all"** to reset. Instruction is always **"say it out loud, THEN click."**
Reading answers produces **recognition** — the exact illusion that let 29 days of decay pass unnoticed.

## 8. Honesty section — the Frontier
Untaught material is **listed and left empty**, explicitly marked *not taught*. Never pad a revision page with content he hasn't derived: it spoils the derivation *and* lets "covered" masquerade as "known."

---

## Build & theme notes
- Self-contained: no CDN, no external fonts (they silently fail offline). System font stacks only; mono as the display face suits the subject.
- Token-driven light **and** dark theme (`prefers-color-scheme` + `:root[data-theme=…]`).
- Wide content (tables, SVG) scrolls inside its own container — the body never scrolls sideways.
- Finish by opening it: `open notes/<module>/BIBLE.html`.
