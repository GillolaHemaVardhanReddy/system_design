#!/usr/bin/env bash
# SessionStart hook — makes DECAY VISIBLE before Jimmy teaches anything.
#
# Why this exists: on 2026-07-11 Hema returned after 29 days, said "don't waste
# time on old topics," and NOTHING in the system raised a hand. Every item in the
# revision sheet was overdue and silent. He then scored 1.5/6 on banked material.
# A tracker nobody reads is not a tracker. This forces the read.
#
# Rebuilt 2026-07-11 (S6): the queue is now generated from trackers/STATUS.json —
# the ONE canonical record — instead of being scraped from four markdown files
# that had drifted apart and were quietly disagreeing. See TEACHING_LOG Entry 006.

set -uo pipefail
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

LAST_EPOCH=$(git log -1 --format=%ct 2>/dev/null || echo "")
[ -z "$LAST_EPOCH" ] && exit 0
DAYS=$(( ( $(date +%s) - LAST_EPOCH ) / 86400 ))

echo "═══ SESSION START — MANDATORY PRE-TEACH BRIEF (CLAUDE.md §0.5) ═══"
echo ""
echo "Days since last session: ${DAYS}"
echo ""

if   [ "$DAYS" -ge 14 ]; then
  echo "⛔ DECAY GATE REQUIRED. >14 days. EVERYTHING banked is now unverified."
  echo "   Do NOT teach a new atom. Run a cold decay sweep FIRST, even if Hema"
  echo "   asks to skip it. He will ask. The answer is no — this is exactly the"
  echo "   situation that produced a 1.5/6 on 2026-07-11."
elif [ "$DAYS" -ge 7 ]; then
  echo "⚠️  >7 days. Run a short cold spot-check on due topics before new material."
else
  echo "✅ Recent session. Proceed, but honour the due queue below."
fi

echo ""

# The canonical record: drift detection + the atom/term due queue.
# Exits non-zero on drift — the output says so loudly; do not teach past it.
if command -v node >/dev/null 2>&1 && [ -f scripts/status.mjs ]; then
  node scripts/status.mjs check || true
else
  echo "⚠️  node or scripts/status.mjs missing — falling back to raw trackers."
  sed -n '/## Active Recall Queue/,/^$/p' trackers/REVISION_SHEET.md 2>/dev/null | sed '1d'
fi

echo ""
echo "─── STANDING ORDERS ───"
echo "1. READ trackers/BEHAVIOR_LEARNING.md + MISTAKE_JOURNAL.md BEFORE teaching."
echo "   (On 2026-07-11 the failure mode was already diagnosed in Session 2 and"
echo "    Jimmy did not open the file. Do not repeat that.)"
echo "2. Known blind spots: layer-fusion · discriminator-dodging · TERM DECAY."
echo "3. A correct explanation WITHOUT the correct term is NOT a pass."
echo "4. NO STANDALONE TERM EXAM. Terms are christened INSIDE the teaching, at the"
echo "   moment the mechanism is derived (name-at-birth). Repair a LOST term by"
echo "   RE-DERIVING it — never by quizzing it harder. (TEACHING_LOG Entry 004.)"
echo "5. Every status change goes in trackers/STATUS.json — the ONE canonical record."
echo "   Then: node scripts/status.mjs build   (regenerates notes/ROADMAP.html)"
echo "   NEVER hand-edit notes/ROADMAP.html, and never let a markdown tracker"
echo "   disagree with STATUS.json. The flattering replica always wins otherwise."
echo "6. Log YOUR OWN teaching failures to trackers/TEACHING_LOG.md."
echo "══════════════════════════════════════════════════════════════════"
