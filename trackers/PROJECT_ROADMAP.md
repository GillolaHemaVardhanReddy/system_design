# Engineering Portfolio & Implementation Roadmap
> Rebuilt **2026-07-14 (S8)** after Hema said: *"I'm not even seeing what I am learning."* He was right. Seven sessions of networking, **zero commands run, zero lines written.** See `TEACHING_LOG.md` Entry 008.

## ⛔ The line that used to be here, and why it is gone
> ~~*"First build (URL Shortener) starts after Module 2 fundamentals."*~~

**Deleted.** It was the worst line in this repo. It put the practice behind a gate months away and then acted surprised when the theory would not stick. It also contradicted the repo's own governing law:

> ### What he DERIVES survives. What he is HANDED rots.
> **And running the thing IS deriving.**

---

## The four tiers

| Tier | Fires | Size | Purpose | Gates anything? |
|---|---|---|---|---|
| **Lab** (`/lab`) | **every atom** | 20–30 min, terminal | *See* the mechanism happen on his own machine | ❌ **No.** Only a cold gate banks an atom. |
| **Atom build** | **some atoms, on their own** | real, **deployed** | One atom → one real thing. **Does NOT wait for the boundary.** | ❌ No |
| **Project — guided** (`/project`) | every **capability boundary** | real, shipped, has a face | Build it: Jimmy architects & reviews, **Hema types every line** | ❌ No |
| **Project — solo** (`/project`) | right after the guided ships | his build, Jimmy's problem statement | **★ THIS IS THE GATE** | ✅ **Gate parts 2, 4, 5** |
| **Article** (`/article`) | after solo is **gated** | public, LinkedIn | The Feynman test with his name on it | ❌ No — but it is **blocked** until the solo passes |

---

## ★ ATOM BUILDS — one atom, one real deployed thing
> **Added S8 — Hema's correction, and he was right.** Making him wait nine atoms before building anything was a smaller copy of *"builds start after Module 2."* He caught it within the hour.

**The bar: it must DEMYSTIFY A BLACK BOX HE ALREADY DEPENDS ON.** Build the **resolver**, not an app that calls DNS. Build the **load balancer**, not an app that is load balanced. *He should finish unable to be mystified by the production version again.*

| Atom | The build | What it kills |
|---|---|---|
| **1.3** DNS | **A real DNS resolver, from scratch** — speaks the wire format, starts at the **root hints**, walks root → TLD → authoritative itself, caches, honours TTL | The syllabus has said *"Implement DNS in a Weekend"* since day one and **it was never assigned** |
| **1.10** HTTP/1.1 | **An HTTP server on raw sockets** — parse the request line byte by byte | **`idempotent` is MISUSED.** He fixes that permanently the day he double-submits a POST and watches it charge twice |
| **1.5** TCP recovery | **A lossy-link observatory** — drop/delay/reorder real traffic, watch cwnd sawtooth and the dup-ACKs stack | **`fast retransmit` is LOST.** He will not name it from a document — proven. He *will* name it while watching it fire |
| **1.8** sockets | **A TCP server with NO framework** — six syscalls | Every framework he has used is a wrapper around them |
| **1.9** TLS | **His own CA + a TLS-terminating proxy** | The open beat: *why can't a signature be forged, why trust the CA.* He **builds** the trust anchor |
| **1.15** reverse proxy | **His own reverse proxy** — two sites, **one port** | *"Nginx chooses the port"* — his oldest layer-fusion error. It reads a header. That is all it does |
| **1.16** load balancing | **His own load balancer** — health checks, eject a dead backend | L4 vs L7 stops being a definition when he has to pick one and live with it |
| **1.17** WebSockets | **Chat on a WebSocket server he wrote** — his own Upgrade handshake, his own frames | It *begins* as HTTP and then stops being HTTP |
| **1.19** API design | **A retry-storm chaos harness** — no jitter, then jitter | The thundering herd is not a metaphor; it's a graph he produces by DDoSing his own backend |

---

## ★ LOCALHOST IS A TOY — every build ships to the real internet
A DNS resolver on `localhost` is a toy. A resolver answering **real queries** for a domain **he owns**, on a **public IP**, with a **real certificate**, is engineering.

**The verified stack: `references/DEPLOYMENT-STACK.md`. Total $2–11/year.**
- ⛔ **NOT AWS.** Free tier changed **2025-07-15**: new accounts get **credits, not 12 months of EC2** — and **the account auto-closes when they run out.** Route 53 is **$6/yr per zone** for what Cloudflare gives away free.
- ⛔ **NOT Cloudflare Tunnel / Render.** They **terminate TLS for him** — he could never `tcpdump` **his own handshake**. **Pedagogical veto, not a price one.**
- ✅ **Oracle Cloud Always Free** (only genuine always-on free VM with a public IP) **+ Porkbun** (`.xyz` $2 / `.uk` $5.66 flat) **+ Cloudflare DNS** (free) **+ Let's Encrypt** (free; since Jan 2026 it issues certs for **bare IPs** — so a **$0** path exists).

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
