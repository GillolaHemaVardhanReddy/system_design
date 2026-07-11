# SYLLABUS — A to Z, atom by atom

> **Rebuilt 2026-07-11** after a verified web audit of every reference (see `references/REFERENCES.md`).
> **What changed and why — read this before anything else:**
> 1. **Module 0 (Foundations) was silently skipped.** It is now marked as a **DEBT**, and it is **paid before Databases** — because isolation levels *are* a concurrency problem and are unintelligible without locks and races. Jimmy's miss, logged.
> 2. **"OSI & TCP/IP models" was listed in Module 1 and jumped over.** Restored as atom 1.1, with **RFC 1122** as the primary source — the internet is a **4-layer** model; OSI's 7 layers are a teaching artifact you must be able to *name* but will rarely use.
> 3. **ADDED, and they were a real hole:** sockets · blocking vs non-blocking I/O · **the event loop / epoll / libuv**. For a Node backend engineer these are load-bearing and were completely absent.
> 4. **CUT: "Grokking the System Design Interview."** It teaches *the shape of an answer* rather than the machinery — it would train the exact discriminator-dodging reflex in `MISTAKE_JOURNAL.md`.
> 5. **DDIA 2nd edition (March 2026)** supersedes the 1st.
>
> **Legend:** ✅ **BANKED** = passed a cold gate in a *later* session, **terms included** · ⚠️ **TERMS LOST** = mechanism holds cold, the names do not — **not a pass** (CLAUDE.md §1) · 🟡 **COVERED** = taught, not gated (proves nothing) · 🔵 **CURRENT** · ⬜ not started.
> **Nothing advances without a cold gate.** `/breakdown <module>` expands any line further.
>
> ⚠️ **Atom 1.5 was demoted on 2026-07-11 (S6).** It was marked ✅ BANKED (S4). In S5 he re-derived the whole mechanism cold and unaided — and named **none** of it (not fast retransmit, not RTO, not exponential backoff). *A correct explanation without the correct term is not a pass.* The rule applies to the tracker, or it applies to nothing.

---

## Module 0 — Foundations ⚠️ **DEBT — must be paid BEFORE Module 2 (Databases)**
*The forcing question: every system you design runs on a machine with a finite CPU, a memory hierarchy spanning six orders of magnitude, and a scheduler that can take the CPU away mid-sentence.*

| # | Atom | Reference |
|---|---|---|
| 0.1 ⬜ | CPU, and the memory hierarchy (register → L1/L2/L3 → RAM → SSD → disk → network) | napkin-math · samwho.dev/numbers |
| 0.2 ⬜ | Process vs thread. What a context switch actually costs | OSTEP ch. 4–6, 26 |
| 0.3 ⬜ | Concurrency vs parallelism (they are not the same word) | OSTEP ch. 26 |
| 0.4 ⬜ | Scheduling · syscalls · virtual memory & paging | OSTEP `cpu-sched.pdf`, `vm-paging.pdf` |
| 0.5 ⬜ | Locks, mutexes, semaphores, condition variables | OSTEP ch. 28–31 |
| 0.6 ⬜ | Race conditions · deadlock (the four conditions) | OSTEP `threads-deadlock.pdf` |
| 0.7 ⬜ | **Producer–consumer, readers–writers, dining philosophers** — derived, not read | ⭐ **Little Book of Semaphores** (it's a *problem* book) |
| 0.8 ⬜ | **Blocking vs non-blocking I/O.** Why thread-per-connection doesn't scale | **C10K** (model only — it's 2014) |
| 0.9 ⬜ | **Readiness notification: `select` → `poll` → `epoll`.** Level- vs edge-triggered | `epoll(7)` man page |
| 0.10 ⬜ | **The event loop. libuv. Node's six phases.** ⭐ And the asymmetry nobody knows: **network I/O uses epoll; file I/O has no portable async primitive, so it runs on a thread pool.** | libuv design docs · Node official event-loop docs |
| 0.11 ⬜ | **Event-loop starvation** — why one CPU-bound handler destroys p99 for *every* connection | Node "Don't Block the Event Loop" |

---

## Module 1 — Networking 🔵 **IN PROGRESS**
*The forcing question: two computers, no shared memory. The only way to know anything about another machine is to send a message and wait — and the message may never arrive. Everything in distributed systems is a consequence of that one fact.*

| # | Atom | Status | Reference |
|---|---|---|---|
| 1.1 | **OSI (7) vs the real TCP/IP (4) model** — *skipped; restoring* | ⬜ | **RFC 1122** (primary source) · Beej's Network Concepts |
| 1.2 | IP · **best-effort** delivery | ✅ term COLD | Systems Approach ch. 3 |
| 1.3 | **DNS** — recursive resolver · root → TLD → authoritative · TTL · stale · trust anchor | ✅ **BANKED** (S3) | ⭐ **Implement DNS in a Weekend** (build one) |
| 1.4 | **TCP — the 3-way handshake.** Purpose: sync sequence numbers **both directions**; liveness is a side-effect | ✅ **BANKED** (S4) | Systems Approach ch. 5 |
| 1.5 | **TCP loss recovery** — flowing → **fast retransmit** (3 dup-ACKs) · silent → **RTO** + exponential backoff | ⚠️ **TERMS LOST — DEMOTED (S6)** | HPBN ch. 2 |
| 1.6 | TCP congestion control (slow start, AIMD) — *not yet taught* | ⬜ | Systems Approach **ch. 6** |
| 1.7 | **UDP** — and **head-of-line blocking** as its reason to exist. *TCP: rather late than wrong. UDP: rather wrong than late.* | 🟡 derived, **never gated** | HPBN ch. 3 |
| 1.8 | **Sockets** — the actual API under everything above | ⬜ **ADDED** | ⭐ **Beej's Guide to Network Programming** (v3.3.2, 2026) |
| 1.9 | **TLS 1.3 + Diffie–Hellman** — cert = **identity**; DH = **secrecy**; the secret is *built on both ends and never sent* | 🔵 **CURRENT — NEVER GATED. The standing debt.** | ⭐⭐ **tls13.xargs.org** (byte-by-byte, *names every field*) · RFC 8446 |
| 1.10 | **HTTP/1.1** — request/response · safe ⊂ idempotent ⊂ all · **idempotency key** · 4xx vs 5xx | ✅ **BANKED** (S2) | RFC 9110 |
| 1.11 | Browser rendering — *completes the google.com walk* | ⬜ | HPBN ch. 10 |
| 1.12 | **HTTP/2** — framing, multiplexing… **and why it did NOT fix head-of-line blocking** | ⬜ | HPBN ch. 12 |
| 1.13 | **HTTP/3 / QUIC** — the payoff for the term he already owns | ⬜ | ⭐ **http3-explained** (`why-quic/why-tcphol`) · RFC 9000/9114 |
| 1.14 | Cookies · sessions · JWT-vs-session | ⬜ | RFC 6265 |
| 1.15 | Reverse proxy · virtual hosting (**picks a SITE, never a port**) | ⬜ | nginx docs |
| 1.16 | Load balancing — **L4 vs L7** | ⬜ | AWS Builders' Library |
| 1.17 | WebSockets — the HTTP **Upgrade** handshake; why it isn't "HTTP but persistent" | ⬜ | RFC 6455 |
| 1.18 | **gRPC** — protobuf, 4 call types. **gRPC *is* HTTP/2**, so it inherits its properties | ⬜ | grpc.io |
| 1.19 | API design: REST vs gRPC vs GraphQL · pagination · versioning · **retries, timeouts, jitter** | ⬜ | ⭐ AWS Builders' Library (timeouts/retries/backoff-with-jitter) |

---

## Module 2 — Databases
*The forcing question: you have ten servers now, and they're disposable. **Where does the truth live?** That question **is** a database.*
**⚠️ Requires Module 0 atoms 0.5–0.7. Isolation levels are a concurrency problem wearing a SQL costume.**

⬜ Relational vs NoSQL (KV / document / column / graph) · ACID · transactions
⬜ **Isolation levels & serializability** — ⭐ derive from **"A Critique of ANSI SQL Isolation Levels"** (the ANSI phenomena are *ill-defined*; this paper defines snapshot isolation) · drill with **Hermitage**
⬜ **MVCC** — real tuple visibility, not the cartoon — *The Internals of PostgreSQL* ch. 5
⬜ **B-tree vs LSM-tree** — the **read/write amplification** trade · LSM paper + RocksDB
⬜ **WAL** — *Internals of PostgreSQL* ch. 9 · **indexing** — ⭐ *Use The Index, Luke*
⬜ Query planning & EXPLAIN · normalization vs denormalization
⬜ Replication (sync/async, leader-follower) · partitioning · sharding · read replicas
⬜ **CAP and its correction, PACELC** — ⭐ Abadi's paper. *Else → Latency vs Consistency.*
📚 **DDIA 2e** · **Database Internals** (Petrov) · **Jepsen** (real DBs violating their own guarantees)

## Module 3 — Caching
*The forcing question: the database is now the bottleneck. Caching is the first thing you reach for — and it instantly hands you a **consistency** problem, because now there are two copies of the truth.*

⬜ Why caches exist · the cache hierarchy · cache-aside / write-through / write-behind / write-around
⬜ **Redis internals** — single-threaded event loop (*same epoll story as atom 0.10*) · **RESP is a wire protocol on TCP** (*ties back to Module 1*) · persistence: RDB fork+COW vs AOF
⬜ **Eviction** — ⭐ why Redis **approximates** LRU by sampling instead of keeping a true LRU list
⬜ Invalidation & TTL · **cache stampede / thundering herd / hot keys**
📚 ⭐ **Scaling Memcache at Facebook** (NSDI'13) — the best cache paper there is

## Module 4 — Scalability
*The forcing question: one box can't take the load. How do you add boxes without adding chaos?*

⬜ Vertical vs horizontal · **stateless vs stateful** · load balancers · CDN
⬜ **Consistent hashing** (Dynamo paper) · rate limiting (fixed/sliding window, token/leaky bucket)
⬜ ⭐ **Back-of-envelope estimation, drilled hard** — teach Jeff Dean's numbers as *intuition*, but **estimate with napkin-math** (re-measured March 2026; the Dean numbers are ~2010 and several are now wrong by 10×)
⬜ **The USE method** — turns "it's slow" into a bounded search
📚 AWS Builders' Library · Google SRE Book ch. 21–23 (cascading failures)

## Module 5 — Distributed Systems
*The forcing question: now the machines must **agree** — with no global clock, lost messages, and **a slow machine indistinguishable from a dead one.** This is the intellectual core of the whole program.*

⬜ Fallacies of distributed computing · **failure detectors**
⬜ **Clocks** — physical · logical/**Lamport** · **vector**
⬜ **Consistency models** — linearizable → sequential → causal → eventual (Jepsen's lattice)
⬜ **Quorum** (R+W>N) · **consensus** · leader election · **Raft** · Paxos (overview) · distributed locks · CRDTs
📚 ⭐ **Kleppmann's Cambridge notes** (highest signal-per-page anywhere) · **MIT 6.824** (do the **Raft lab**) · van Steen DS4 (free) · **Patterns of Distributed Systems** (free on Fowler's site)
📄 Papers: **Raft · Dynamo · Spanner (TrueTime) · Paxos Made Simple · Metastable Failures**

## Module 6 — Messaging
*The forcing question: synchronous calls **couple** services — if B is down, A is down. Put a **log** between them.*

⬜ Queues vs pub/sub · event-driven architecture · streaming
⬜ **Kafka internals** — append-only **segmented log** · **the OS page cache** · **`sendfile`/zero-copy** (a caught-up cluster does **no disk reads**) · **ISR replication** · consumer groups & offsets
⬜ **Delivery semantics** — at-most / at-least / exactly-once *(and why "exactly-once" is a lie without idempotency — **ties straight back to atom 1.10**)*
⬜ Ordering guarantees · backpressure · dead-letter queues
📚 ⭐ **Kreps, "The Log"** (⚠️ LinkedIn URL is **dead** — use the archive link in REFERENCES) · Kafka Design docs

## Module 7 — Storage
⬜ Object/blob storage · distributed storage (replication, **erasure coding**) · data lakes vs warehouses · **columnar storage** (ties to your ClickHouse work)
📄 **GFS** · **Bigtable**

## Module 8 — Observability
*The forcing question: you have built something you cannot see. It's 3am and it's down. What do you look at?*
⬜ Logging · metrics (**RED / USE**) · **distributed tracing** · alerting (**SLI/SLO/SLA, error budgets**) · incident analysis · real postmortems
📚 Google SRE Book · Brendan Gregg

## Module 9 — Security
⬜ AuthN vs AuthZ · sessions vs JWT · **OAuth2 / OIDC** · symmetric vs asymmetric · hashing & salting · **TLS in depth** (revisits 1.9) · secrets management · CSRF/XSS/SQLi/SSRF at a design level
📚 OWASP

## Module 10 — Infrastructure
⬜ Docker · containers vs VMs · Kubernetes · service discovery · CI/CD · IaC · **Twelve-Factor** · blue-green & canary
📚 12factor.net · **Designing Distributed Systems** (Burns, free)

## Module 11 — High Level Design
⬜ **The framework:** requirements → estimation → API → data model → architecture → scale → reliability → tradeoffs
⬜ Then design **and defend**: URL Shortener · Pastebin · WhatsApp · Twitter · Instagram · Uber · Netflix · YouTube · Dropbox · Swiggy · News Feed · Notification Service · Rate Limiter · Web Crawler · Typeahead
❌ **NOT Grokking** — see REFERENCES §8. It teaches the *shape of an answer*, not the machinery.

## Module 12 — Low Level Design
⬜ ⭐ **APOSD first** — **deep vs shallow modules · information leakage · tactical vs strategic programming.** *Complexity* is the unit, not patterns.
⬜ **Refactoring 2e** (JavaScript!) — design as **named, safe, reversible moves.** *(A book whose whole content is smell → NAME → mechanics is an unusually good fit for the term-decay blind spot.)*
⬜ SOLID — as **heuristics to re-derive**, never commandments · patterns via **Refactoring.Guru (TypeScript)**
⬜ ⭐ **Cosmic Python (free)** — *derives* Repository → Service Layer → Unit of Work → Aggregate → Message Bus by hitting the pain each solves. **Python on purpose: you can't copy it, you must re-derive it in TS.**
⬜ **Fowler's EAA catalog** — the vocabulary behind every ORM you touch
⬜ Problems (solve **cold** first, *then* diff): Parking Lot · Elevator · Splitwise · BookMyShow · ATM · Chess · Vending Machine · **in-memory KV store · rate limiter · connection pool · circuit breaker**
❌ **NOT Clean Code** — see REFERENCES §8. Read the **Ousterhout ↔ Martin debate** instead.

## Module 13 — Advanced
⬜ **CQRS · event sourcing · Saga** (orchestration vs choreography) · **the outbox pattern** · service mesh · multi-region · **2PC and why it's avoided** · distributed transactions
📚 microservices.io · Fowler

## Module 14 — Interview Mastery
⬜ Escalating mocks · architecture defense · whiteboarding · requirement clarification · **tradeoff articulation** · STAR stories
> *The interview is the **byproduct**. If you can defend a design because you built the thing, this module is easy. Chasing it the other way round does not work.*

---

## Projects — built alongside; never "finished," re-refactored as knowledge grows
1. URL Shortener · 2. Distributed Rate Limiter · 3. **Redis Clone** · 4. **Kafka-lite** · 5. Chat App · 6. Notification Service · 7. Search Engine · 8. Recommendation Engine · 9. Video Pipeline · 10. Distributed Job Scheduler

> **The projects are what make you an engineer rather than someone who has read about engineering.** Reading about Redis eviction gives you a fact. *Writing* an eviction policy and watching it thrash gives you judgment. See `trackers/PROJECT_ROADMAP.md`.
