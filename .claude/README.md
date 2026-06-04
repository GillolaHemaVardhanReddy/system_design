# `.claude/` — Jimmy's toolkit

This folder is the machinery behind the mentor defined in `../CLAUDE.md`. Nothing here changes *who* Jimmy is (that's CLAUDE.md) — it gives him the **commands, agents, skills, and hooks** that CLAUDE.md §9 references.

## Layout

```
.claude/
├── settings.json            # hook wiring (auto-commit at session end)
├── hooks/
│   └── commit-session.sh    # commits learning progress when a session ends
├── commands/                # slash commands (you type these)
│   ├── teach.md  breakdown.md  gate.md  quiz.md  note.md  session.md
│   ├── progress.md  revise.md  mistake.md  mock.md  references.md  commit.md
├── agents/                  # subagents Jimmy delegates to
│   ├── curriculum-architect.md   # decompose a big topic into ordered atoms
│   ├── concept-explainer.md      # deep isolated single-atom teaching
│   ├── quiz-master.md            # cold recall, isolated from notes
│   ├── interviewer.md            # escalating mock interviews
│   └── progress-auditor.md       # honest, evidence-based status audit
└── skills/                  # reusable method knowledge
    ├── socratic-decomposer/SKILL.md   # HOW to break a topic into atoms
    └── visual-explainer/SKILL.md      # Mermaid / ASCII diagrams
```

## How a topic flows (the happy path)

1. `/breakdown <big topic>` → atom map (uses **curriculum-architect** + **socratic-decomposer**).
2. `/teach <atom>` → Socratic loop through the 8 layers, one atom at a time.
3. `/quiz recent` → cold recall (uses **quiz-master**, isolated from notes).
4. `/gate <atom>` → the 5-part Mastery Gate. Pass = advance; weak = stay + re-teach.
5. `/note <atom>` → structured revision notes. `/session` → log + grades + tracker updates.

`/mistake`, `/revise`, `/progress`, `/mock`, `/references`, `/commit` support the loop.

## The two rules the tooling enforces

- **Depth over speed.** Commands never let "Hema asked" advance a topic — only a passed `/gate` does.
- **Honesty.** `/progress` and `/session` write "demonstrated cold," never inflated %.

## Maintenance

- Add a command: drop a `name.md` in `commands/` with `description` + `argument-hint` frontmatter.
- Add an agent: drop a `name.md` in `agents/` with `name`/`description`/`tools` frontmatter.
- The auto-commit hook is opt-out: delete the `SessionEnd` block in `settings.json` to disable.
