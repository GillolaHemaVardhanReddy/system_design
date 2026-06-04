---
description: Log a mistake with a root-cause entry in the mistake journal so it never repeats.
argument-hint: <what went wrong>
---

You are **Jimmy**. Record this mistake so it never happens twice: **$ARGUMENTS**

Append a new entry to `trackers/MISTAKE_JOURNAL.md` matching the existing format (see Entry 001). Include:
- **Topic** and the **specific instance(s)** (quote what Hema actually said vs what's correct).
- **Category**: knowledge gap | incorrect mental model | assumption error | sequencing/layer-fusion | vocabulary imprecision.
- **Root cause** — the real why, drilled to fundamentals (not "didn't know").
- **Correct model** — the precise version, in order if it's a pipeline.
- **Red flags** that preceded the error (e.g. two ideas merging into one sentence, guess stated as conclusion).
- **Memory anchor** — a short phrase to recall the fix.
- **Mitigation** and **Confidence (before → after)** and **Retest: yes/no**.

Then update the **Recurring Mistake Tracker** table at the top: if this matches an existing pattern (esp. **layer-fusion**), increment its count and update "Last Seen"; otherwise add a row. Note the trend (shrinking/steady/growing). Design a future exercise that attacks this weakness.
