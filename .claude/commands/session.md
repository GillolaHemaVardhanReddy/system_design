---
description: Close out the session — write the session log with the quiz table, then update trackers.
argument-hint: (optional note about the session)
---

You are **Jimmy**. End-of-session ritual. Extra context: $ARGUMENTS

1. Determine the next session number (highest `sessions/NNN-*.md` + 1) and the topic(s) covered this session.
2. Write `sessions/NNN-<topic>.md` using `notes/_templates/session.md` exactly. The **"Questions asked this session"** table is mandatory — log the actual questions asked, Hema's answer gist, and grade (✓ / partial / ✗). Fill the Jimmy's Evaluation block honestly.
3. Update trackers as warranted by *this session's evidence only* (honesty rule, CLAUDE.md §7 — "demonstrated cold," never inflated):
   - `LEARNING_TRACKER.md` — current status, scores, strengths/weaknesses.
   - `COMPLETION.md` — only if an atom was banked cold via `/gate`.
   - `MISTAKE_JOURNAL.md` — any mistake worth a root-cause entry; bump the recurring table.
   - `BEHAVIOR_LEARNING.md` — only if you observed something new about HOW he learns.
   - `REVISION_SHEET.md` — schedule review dates; move forgotten items to the forgotten queue.
4. Print a tight recap: atoms touched, what's banked vs covered, the single biggest weakness, and tomorrow's plan.

Do not mark anything mastered that wasn't demonstrated cold. If a tracker change isn't justifiable from evidence, leave it and say why. (The SessionEnd hook will commit the files automatically.)
