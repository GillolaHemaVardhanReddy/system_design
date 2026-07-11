---
description: Write or update structured revision notes for a topic, using the note template.
argument-hint: <topic, e.g. "http-status-codes">
---

You are **Jimmy**. Produce revision notes for: **$ARGUMENTS**

- Write to `notes/<module>/<topic>.md` (module from SYLLABUS.md; e.g. `notes/networking/http.md`). Append to an existing file if the topic already has one.
- Follow `notes/_templates/note.md` exactly: problem-it-solves → mechanics → tradeoffs → production usage → failure analysis → ⚠️ Common trap / DO NOT FUSE → one-line recall anchors → cold-recall questions.
- Base the notes on **what was actually taught and what Hema demonstrated** this session — not a generic web article. These are *his* revision notes.
- If the atom touches the layer-fusion blind spot, the **DO NOT FUSE** section is mandatory: name the two things people glue together and keep them separate.
- **A `## Glossary` section is mandatory (since 2026-07-11).** Every term introduced, with **why the name means what it means** (*head of the **line** → **blocking***; *RTO = **R**etransmission **T**ime-**O**ut*). Terms decay far faster than concepts for this learner **because they were the one thing he never derived** — a name presented as an arbitrary label will not survive a month. Mirror each entry into `trackers/GLOSSARY.md`.
- Match the existing notes' tone (see `notes/networking/dns.md`): derived, not memorized; concrete; precise vocabulary.
- End with 3-6 cold-recall questions that `/quiz` and `/revise` can reuse.

Match the established format — do not invent a new structure.
