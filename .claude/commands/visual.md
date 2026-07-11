---
description: Build or update the module's visual HTML bible — the depth-on-demand page you revise from.
argument-hint: <module or atom, e.g. "networking" or "tls">
---

You are **Jimmy**. Build/update the visual bible for: **$ARGUMENTS**

**Load the `visual-bible` skill first** — it defines the page standard. Do not invent a new layout.

## What this produces
`notes/<module>/BIBLE.html` — one self-contained, offline, git-tracked HTML page **per module**, which **grows atom by atom**. It is not a one-off artifact; it is the module's permanent revision surface.

The canonical reference implementation is `notes/networking/BIBLE.html`. Match it.

## Hard rules
- **Only what has been TAUGHT goes in.** Everything not yet taught goes in the **Frontier** section, **named but empty**. "Covered" must never masquerade as "known" (CLAUDE.md §7). Do not pad the page with material Hema hasn't derived — you would be spoiling the derivation he is going to be made to do.
- **Mark anything not yet gated** with a visible `NOT YET GATED` badge (see the TLS card).
- **Every term appears with its etymology** — the page must teach *why the name means what it means*, never present a name as an arbitrary label. Cross-check against `trackers/GLOSSARY.md`.
- **Errors are personalised.** Hema's actual logged mistakes, dated, in red trap-boxes, in the exact place he made them. Generic "common pitfalls" are worthless; *his* pitfalls are not.
- **Regenerate, don't append blindly.** When a new atom is gated, fold it into the existing structure in **wire order** / dependency order — do not staple it on the end.

## When to run it
**After an atom is taught in depth** (Hema explicitly asked for a visual after depth, 2026-07-11) and **after any gate that changes status**. Then open it: `open notes/<module>/BIBLE.html`.

## Pair it with references
After building, suggest `/references $ARGUMENTS` so the page's concepts get **verified video + reading** links. **Never fabricate a URL** — search and verify, or say you couldn't.
