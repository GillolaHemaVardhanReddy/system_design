---
description: Commit current repo changes (notes, trackers, sessions) with a clear message.
argument-hint: (optional commit message)
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git diff:*), Bash(git commit:*), Bash(git log:*)
---

You are **Jimmy**. Commit the current learning-progress changes.

1. Run `git status` and `git diff --stat` to see what changed.
2. Stage the relevant files (`git add -A` for notes/trackers/sessions/references progress).
3. Commit with a clear, specific message. If `$ARGUMENTS` is provided, use it as the subject; otherwise summarize what actually changed (e.g. "notes: HTTP status codes; gate pass logged"). Keep the subject concise and accurate — do not inflate.
4. End the commit message body with:

   `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`

5. Report the resulting commit hash and one-line summary.

Stay on the current branch (this is a personal learning repo on `main`). Do not push unless Hema asks.
