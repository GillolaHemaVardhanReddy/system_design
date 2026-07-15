#!/usr/bin/env bash
# SessionStart hook — print the ONE file, assert the record isn't lying, check the remote.
#
# WHY THIS SHAPE (S9, TEACHING_LOG Entry 010):
# This hook used to print the entire due queue — atoms, terms, labs, builds, boundaries —
# and CLAUDE.md ordered Jimmy to bulk-read three more trackers on top. ~22,000 tokens
# before a single question was asked. And the first question asked with all that context
# was ILLEGAL: it required a primitive Hema had never been given.
#
# Volume was never the problem. The record tracked what he ANSWERED and never what he was
# GIVEN, so no amount of reading could have caught it. The fix was a FIELD, not a file.
#
# So: NOW.md carries the frontier (generated from STATUS.json, never hand-edited).
# check --quiet says only whether the record contradicts itself. Nothing is printed twice.

set -uo pipefail
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

LAST_EPOCH=$(git log -1 --format=%ct 2>/dev/null || echo "")
[ -z "$LAST_EPOCH" ] && exit 0
DAYS=$(( ( $(date +%s) - LAST_EPOCH ) / 86400 ))

echo "═══ SESSION START ═══"
echo ""
echo "Days since last session: ${DAYS}"

if   [ "$DAYS" -ge 14 ]; then
  echo "⛔ DECAY GATE REQUIRED. >14 days. EVERYTHING banked is now unverified."
  echo "   Do NOT teach a new atom. Cold decay sweep FIRST, even if Hema asks to"
  echo "   skip it. He will ask. The answer is no — that exact request preceded a 1.5/6."
elif [ "$DAYS" -ge 7 ]; then
  echo "⚠️  >7 days. Short cold spot-check on due topics before new material."
else
  echo "✅ Recent session. Proceed, but honour the queue in NOW.md."
fi
echo ""

# Regenerate the brief from the canonical record, then assert the record is self-consistent.
# Exits non-zero on drift; the message says so loudly. Do not teach past it.
if command -v node >/dev/null 2>&1 && [ -f scripts/status.mjs ]; then
  node scripts/status.mjs brief >/dev/null 2>&1 || true
  node scripts/status.mjs check --quiet || true
  echo ""
fi

# ─── GIT SYNC (S7, TEACHING_LOG Entry 007) ───────────────────────────────────
# The 2026-06-12 session (TLS/DH, gated 4/5) was committed on one machine and never
# reached the other. S6 audited the clone that had never seen it and wrote "1.9 never
# gated, never taught" into the canonical record. FALSE — and the whole rebuild was
# stacked on it. Two replicas, no replication protocol: the bug this repo teaches,
# one layer up. An unpushed commit is an unreplicated write. Make divergence LOUD.
if git remote get-url origin >/dev/null 2>&1; then
  BR="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo main)"
  git fetch origin "$BR" --quiet 2>/dev/null || true
  if git rev-parse --verify --quiet "origin/${BR}" >/dev/null 2>&1; then
    AHEAD=$(git rev-list --count "origin/${BR}..HEAD" 2>/dev/null || echo 0)
    BEHIND=$(git rev-list --count "HEAD..origin/${BR}" 2>/dev/null || echo 0)
    if [ "$AHEAD" != "0" ] || [ "$BEHIND" != "0" ]; then
      echo "─── ⚠️  GIT OUT OF SYNC — RESOLVE BEFORE TEACHING ───"
      [ "$BEHIND" != "0" ] && echo "  ⬇️  ${BEHIND} commit(s) on the REMOTE this clone has NEVER SEEN. They may"
      [ "$BEHIND" != "0" ] && echo "      contain a whole session. PULL FIRST — do not audit or re-teach"
      [ "$BEHIND" != "0" ] && echo "      anything until you have read them."
      [ "$AHEAD" != "0" ]  && echo "  ⬆️  ${AHEAD} commit(s) LOCAL-ONLY. Not a record — a rumour on one disk. PUSH."
      echo "      →  git pull --rebase origin ${BR} && git push origin ${BR}"
      echo ""
    fi
  fi
fi

echo "─── THE BRIEF: NOW.md ───"
echo "This is the whole brief. Do NOT bulk-read the trackers — they are append-only"
echo "history, opened ON DEMAND only. (CLAUDE.md §0)"
echo ""
cat NOW.md 2>/dev/null || echo "⚠️  NOW.md missing — run: node scripts/status.mjs brief"
echo ""
echo "═══ Rules: CLAUDE.md (already loaded). State: above. Nothing else. ═══"
