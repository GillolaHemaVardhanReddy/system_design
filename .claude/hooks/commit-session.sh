#!/usr/bin/env bash
# commit-session.sh — auto-commit AND PUSH learning progress at session end.
# Wired via .claude/settings.json -> hooks.SessionEnd.
# Safe by design: no-op when the tree is clean; never aborts the session on error.
#
# ⚠️ THE PUSH IS NOT OPTIONAL. (2026-07-13)
# This hook used to commit and stop. The result: a whole session — TLS/DH taught
# and part-gated on 2026-06-12 — existed only as a local commit on one machine.
# The other clone never saw it, so the S6 audit recorded atom 1.9 as
# "never gated, never taught," which was FALSE, and the trackers were rebuilt
# around that falsehood. A commit that is not pushed is not a record; it is a
# rumour on one disk. See TEACHING_LOG.md Entry 007.
#
# LOCAL-ONLY COMMITS ARE A DATA-LOSS BUG. Push, every time.

set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}" 2>/dev/null || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
[ -n "$BRANCH" ] && [ "$BRANCH" != "HEAD" ] || exit 0

# ─── Regenerate the derived files BEFORE committing (S9) ─────────────────────
# NOW.md is the ONE file the next session opens with. If a gate updates
# STATUS.json and NOW.md is not re-rendered, the next session opens on a stale
# brief and starts from the wrong beat — the drift bug (Entry 006) reintroduced
# through the back door, in the one file nobody would think to distrust.
# Generated files are only safe if generating them is not a thing to remember.
if command -v node >/dev/null 2>&1 && [ -f scripts/status.mjs ]; then
  node scripts/status.mjs brief >/dev/null 2>&1 || true
  node scripts/status.mjs build >/dev/null 2>&1 || true
fi

# Commit anything outstanding (no-op if the tree is clean).
if ! git diff --quiet 2>/dev/null \
   || ! git diff --cached --quiet 2>/dev/null \
   || [ -n "$(git ls-files --others --exclude-standard)" ]; then

  git add -A
  STAMP="$(date '+%Y-%m-%d %H:%M')"

  # A session with no session log is the S5 failure: the automation preserves the
  # gap and makes it look like work. Commit it, but say so, loudly, in the subject.
  if git diff --cached --name-only | grep -q '^sessions/'; then
    SUBJECT="session: learning progress ${STAMP}"
  else
    SUBJECT="[NO SESSION LOG] progress ${STAMP}"
  fi

  git commit -q \
    -m "${SUBJECT}" \
    -m "Auto-committed by commit-session.sh (SessionEnd hook)." \
    >/dev/null 2>&1 || true
fi

# --- PUSH. Always. Even if this run committed nothing: an earlier commit may
# --- still be sitting unpushed, and that is exactly the bug this guards against.
git remote get-url origin >/dev/null 2>&1 || exit 0

if git push origin "$BRANCH" >/dev/null 2>&1; then
  exit 0
fi

# Rejected: the remote moved (another machine). Rebase onto it and retry once.
# Never force-push — the remote may hold the only copy of a session, which is
# precisely how 2026-06-12 was nearly lost for good.
git fetch origin "$BRANCH" >/dev/null 2>&1
if git rebase "origin/${BRANCH}" >/dev/null 2>&1; then
  git push origin "$BRANCH" >/dev/null 2>&1 && exit 0
else
  git rebase --abort >/dev/null 2>&1 || true
fi

echo "⚠️  PUSH FAILED — work is committed LOCALLY ONLY on '${BRANCH}'." >&2
echo "    Local-only commits are how session 2026-06-12 went missing." >&2
echo "    Resolve by hand:  git pull --rebase origin ${BRANCH} && git push origin ${BRANCH}" >&2
exit 0
