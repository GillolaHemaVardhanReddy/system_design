# Engineering Portfolio & Implementation Roadmap
> Rebuilt **2026-07-14 (S8)** after Hema said: *"I'm not even seeing what I am learning."* He was right. Seven sessions of networking, **zero commands run, zero lines written.** See `TEACHING_LOG.md` Entry 008.

## ⛔ The line that used to be here, and why it is gone
> ~~*"First build (URL Shortener) starts after Module 2 fundamentals."*~~

**Deleted.** It was the worst line in this repo. It put the practice behind a gate months away and then acted surprised when the theory would not stick. It also contradicted the repo's own governing law:

> ### What he DERIVES survives. What he is HANDED rots.
> **And running the thing IS deriving.**

---

## The three tiers

| Tier | Fires | Size | Purpose | Gates anything? |
|---|---|---|---|---|
| **Lab** (`/lab`) | **every atom** | 20–30 min, terminal | *See* the mechanism happen on his own machine | ❌ **No.** Only a cold gate banks an atom. |
| **Project — guided** (`/project`) | every **capability boundary** | real, shipped, has a face | Build it: Jimmy architects & reviews, **Hema types every line** | ❌ No |
| **Project — solo** (`/project`) | right after the guided ships | his build, Jimmy's problem statement | **★ THIS IS THE GATE** | ✅ **Gate parts 2, 4, 5** |
| **Article** (`/article`) | after solo is **gated** | public, LinkedIn | The Feynman test with his name on it | ❌ No — but it is **blocked** until the solo passes |

**Per-day quotas: none.** There is no cap on atoms per session — **the cap was never the clock, the cap is the gate.** Two atoms in a session is fine if two atoms are *banked cold*. Zero are banked if zero are gated, however many were covered.

---

## The rules, and the script enforces them
`node scripts/status.mjs check` will refuse to print `✅ No drift` if any of these is violated:

1. **A boundary opens ONLY when every required atom is `banked`.** You cannot build on an atom you have not banked — you would be pasting, not deriving.
2. **The solo project cannot be gated before the guided project ships.**
3. **An article cannot be published before the solo project is gated.** *The internet has no `termslost` status.* Publishing half-known material under his own name is a debt that compounds in public.
4. **Guided ≠ Jimmy writes it.** Jimmy gives the architecture, the constraints, the forcing questions, the failure injections, and a hard review. **Hema types 100% of the code.** When he is stuck, Jimmy **asks**; Jimmy does not tell.

## The bar for a project — all four
1. **Impossible without the boundary's atoms.** *Delete one atom from his head — does it still get built?* If yes, it is not the project.
2. **Genuinely useful.** A thing a real person would run. Toy projects teach toy engineering.
3. **It has a face.** Something to look at. This is the first impression of his engineering.
4. **Breakable.** Failure modes he can *inject* and *watch*. **You do not own a mechanism until you have watched it fail.**

**Bias:** build a tiny version of the black box he already depends on. A resolver, not an app that calls DNS. A load balancer, not an app that is load balanced. **He should finish unable to be mystified by the production version again.**

---

## Module 1 — Networking · capability boundaries
*Projects are **decided at the boundary**, never in advance. A project chosen before the atoms are learned cannot know what they taught.* Live status: `node scripts/status.mjs check`.

| # | Boundary | Requires | Capability it represents | Status |
|---|---|---|---|---|
| **B1** | **The Wire** | 1.1 – 1.9 | Name → address → reliable ordered pipe (**that he can break and watch recover**) → private authenticated channel (**whose trust he can forge himself**) — all of it against **raw sockets**, nothing between him and the kernel. | 🔒 3/9 banked |
| **B2** | **The Edge** | 1.10 – 1.16 | Everything *in front of* an application: HTTP semantics he can defend, all three wire versions and honestly why each exists, sessions, virtual hosting, L4-vs-L7 load balancing. **He can build the edge, not just call it.** | 🔒 1/7 banked |
| **B3** | **Real-time & APIs** | 1.17 – 1.19 | Persistent bidirectional transport, typed RPC, and API contracts that survive retries, timeouts and version skew. **The difference between an API that works and an API that holds.** | 🔒 0/3 banked |

**Every project ships with:** requirements (functional + non-functional) · API surface · data model · **failure injection, demonstrated** · basic monitoring · honest limits section · a README a stranger can run. *"Works on my machine" is not shipped.*

---

## Shipped
*(nothing yet — B1 is the first)*

| Boundary | Guided | Solo (the gate) | Article |
|---|---|---|---|
| — | — | — | — |
