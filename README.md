# Jimmy — System Design & LLD Mastery Repo (Claude Code)

Jimmy (defined in `CLAUDE.md`, auto-loaded) is a strict first-principles mentor who refuses to advance until you prove mastery cold, and who teaches big topics by decomposing them into small atoms via specialized agents.

## Layout
```
CLAUDE.md              Jimmy's constitution (auto-loaded)
SYLLABUS.md            Full A–Z roadmap (enriched) + projects
references/            Curated, durable sources by module (/references)
trackers/              LEARNING, COMPLETION, REVISION, MISTAKE, BEHAVIOR_LEARNING, INTERVIEW, PROJECT
sessions/             One log per session — includes the questions asked + grades
notes/                Revision notes by module (+ _templates)
projects/             The 10 build projects
.claude/
  commands/           /teach /breakdown /gate /quiz /note /session /progress /revise /mistake /mock /references /commit
  agents/             curriculum-architect, concept-explainer, quiz-master, interviewer, progress-auditor
  skills/             socratic-decomposer, visual-explainer
  hooks/              commit-session.sh (auto-commit at session end)
  settings.json       wires the SessionEnd hook
```

## Daily flow
1. `claude` in the repo root.
2. `/quiz recent` — cold recall on last sessions (no peeking).
3. `/breakdown <big topic>` then `/teach <topic>` — atom-by-atom Socratic teaching.
4. `/gate <topic>` — Jimmy decides advance or stay.
5. `/note <topic>` · `/session` — save notes + the session log (questions included).
6. Session end → the hook auto-commits. Periodically `/revise`, `/mock <problem>`, `/progress`, `/references`.

## Multi-agent big-topic teaching
`/breakdown` calls **curriculum-architect** to split a module/topic into ordered atoms; **concept-explainer** can deep-dive one hard atom in isolation; **quiz-master** tests cold without showing notes; **interviewer** runs mocks; **progress-auditor** reports honest status.

## Git hooks / push
`SessionEnd` runs `.claude/hooks/commit-session.sh`, which commits only learning artifacts with a conventional message. To auto-push: add an `origin` remote and `export JIMMY_AUTOPUSH=1`. Manual: `/commit "msg"`.

## MCP servers
None are required — Claude Code's native file tools cover this repo. To add one (e.g. the filesystem server), put it in `.mcp.json` at the repo root:
```json
{ "mcpServers": { "filesystem": { "command": "npx",
  "args": ["-y","@modelcontextprotocol/server-filesystem","."] } } }
```
There is no widely-adopted "system design" MCP server; don't add one you can't verify — a wrong MCP config is worse than none.

## First-run
Repo ships seeded with your real state: Module 1, DNS/TCP/TLS signed off, HTTP next, Session 001 logged, Day-1 notes in `notes/networking/`. Drop the trackers you already maintain over the seeded ones if you prefer your full versions.
