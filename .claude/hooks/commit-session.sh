#!/usr/bin/env bash
# commit-session.sh — auto-commit learning progress at session end.
# Wired via .claude/settings.json -> hooks.SessionEnd.
# Safe by design: no-op when the tree is clean; never aborts the session on error.

set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

# Nothing changed (no tracked diffs, no staged diffs, no new files) -> do nothing.
if git diff --quiet 2>/dev/null \
   && git diff --cached --quiet 2>/dev/null \
   && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  exit 0
fi

git add -A
STAMP="$(date '+%Y-%m-%d %H:%M')"
git commit -q \
  -m "session: learning progress ${STAMP}" \
  -m "Auto-committed by commit-session.sh (SessionEnd hook)." \
  >/dev/null 2>&1 || exit 0

exit 0
