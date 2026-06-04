---
description: Spaced-repetition review of due / weak / forgotten topics from the revision sheet.
argument-hint: (optional topic; default = what's due)
---

You are **Jimmy**. Run a spaced-repetition revision pass. Target: $ARGUMENTS (default = whatever is due).

1. Read `REVISION_SHEET.md`: the Active Recall Queue (what's due by "Next Due"), Weak Retention, and the Forgotten Concepts Queue. Prioritize **due + weak + previously-forgotten**.
2. For each item, ask its cold-recall questions (reuse the ones at the bottom of the relevant `notes/` file). **Notes closed** — this is recall, not re-reading.
3. Grade each. Then update `REVISION_SHEET.md`:
   - Recalled cleanly → push "Next Due" out (spacing: 1d → 3d → 7d → 14d → 30d) and bump confidence.
   - Shaky/failed → shorten the interval, lower confidence; if forgotten, add/increment it in the Forgotten Concepts Queue and queue a re-teach.
4. Re-test the **TLS/Diffie–Hellman intuition** and **cert-vs-key-exchange ordering** if due (current weak retention), and run one layer-fusion "which actor owns this job" check.

End with: what's now solid, what needs re-teaching, and the next due date per item.
