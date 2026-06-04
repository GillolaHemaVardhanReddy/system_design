---
name: visual-explainer
description: Produce clear Mermaid or ASCII diagrams for system-design and LLD concepts — request flows, sequence diagrams, architecture, state machines, class/UML, data models. Use when a concept involves ordered steps, multiple actors, component layout, or state transitions and a picture would prevent layer-fusion.
---

# Visual Explainer — diagrams that prevent fusion

A diagram is worth most exactly where this learner is weakest: **ordered pipelines and who-owns-what**. Reach for one when a concept has steps, actors, layout, or state.

## Pick the right diagram
- **Request flow / "what happens when…"** → Mermaid `sequenceDiagram`. One participant per actor; one arrow per hop. This directly counters layer-fusion — each actor's single job is visible and separate.
- **Architecture / components** → Mermaid `flowchart LR/TD`. Group by tier (client / edge / service / data).
- **State / protocol** (TCP handshake, connection lifecycle) → `stateDiagram-v2`.
- **LLD class design** → `classDiagram` (fields, methods, relationships: composition vs inheritance vs association).
- **Data model** → `erDiagram`.
- **Quick inline** → ASCII when a fenced block is overkill.

## Rules
- **One actor = one participant/node.** Never collapse two actors into one box. If two steps belong to different actors, they get different nodes — make the handoff an explicit arrow. This is the whole point.
- **Label the arrows** with the data crossing (`name`, `IP`, `IP:port`, `SYN`, `443`), not just "request."
- **Order is explicit** — number steps in sequence diagrams.
- Keep it minimal: only what teaches the current atom. No decorative boxes.
- After any pipeline diagram, add a one-line **"DO NOT FUSE"** caption naming the adjacent actors people glue together.

## Example — the google.com walk (sequence)
```mermaid
sequenceDiagram
    participant B as Browser
    participant R as Resolver (8.8.8.8)
    participant DNS as Root→TLD→Authoritative
    participant OS as Dest machine OS
    participant N as Nginx (site)
    B->>R: resolve google.com (name)
    R->>DNS: walk hierarchy
    DNS-->>R: IP
    R-->>B: IP (cached, TTL)
    Note over B: scheme https → port 443 (NOT from DNS)
    B->>OS: packet to IP:443 (routers deliver by IP)
    OS->>N: demux by port 443 → program
    Note over B,N: DO NOT FUSE — DNS gives IP only; browser picks port; OS demuxes; Nginx picks site, never a port
```

Render Mermaid in fenced ```mermaid blocks; fall back to ASCII when the surface can't render it.
