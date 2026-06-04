---
name: socratic-decomposer
description: How to break a large system-design/LLD topic into small, ordered, Socratically-teachable atoms. Use when starting any big topic or module, when a lesson feels too big to teach in one focused pass, or when deciding whether two ideas are one atom or two.
---

# Socratic Decomposer — how to atomize a topic

This skill defines **how** to decompose (the `curriculum-architect` agent applies it; `/breakdown` invokes it). The goal: never dump a whole topic; always teach derivable atoms in dependency order.

## What counts as one atom
An atom is the smallest unit that satisfies ALL of:
1. **One mechanism, one job.** It answers a single "how/why does this work?" If explaining it needs two unrelated "aha" moments, it's two atoms.
2. **Socratically teachable in one focused pass** — you can hand a constraint and have the learner *derive* it.
3. **Gateable in isolation** — the 5-part Mastery Gate (explain / apply / tradeoff / new-scenario / failure+recovery) makes sense for it alone.
4. **Has explicit prerequisites** — what must be banked first.

Split when a unit has two independent insights. Merge when two units are meaningless apart.

## The decomposition procedure
1. **State the end capability** — what mastering the whole topic lets you *do*.
2. **Find the load-bearing problem** — the core thing that breaks without this topic. That's atom-zero's "why."
3. **List mechanisms**, then collapse/split to the atom test above.
4. **Order by dependency**, not by how textbooks list them. An atom can't come before its prerequisite.
5. **Mark enrichment** (`⊕` items in SYLLABUS.md) and whether each atom is already banked (COMPLETION.md).
6. For each atom, write a one-line **"mastery = …"** (what demonstrated-cold looks like).

## Sequencing-collapse guard (this learner's blind spot)
When the topic is an **ordered pipeline with multiple actors** (DNS→port→routing→demux→server; client→LB→service→DB; producer→broker→consumer):
- Make each actor's single job its own clearly-bounded atom.
- Add an explicit **"DO NOT FUSE"** note naming adjacent actors that get glued together.
- Plan a "which actor owns this job, in what order?" check into the atom's gate.

## Teaching order, always
why-it-exists → intuition/analogy → mechanics → tradeoffs → production → failure → interview. Motivate before mechanism. Ground vocabulary in real entities before abstract use.

## Output shape
An ordered list: `N. <name> — depends on <…> — mastery = <…> — banked? y/n`, plus suggested first atom and known traps. Orientation, not content.
