# References — verified, tagged, and honest

> **Rebuilt 2026-07-11** after a full web audit (three parallel researchers, every URL fetched).
> The previous version of this file contained **three stale entries and one actively dangerous one.** See §7.
>
> **Rules of this file:**
> - **Never cite a URL that hasn't been fetched.** Everything below was confirmed to resolve on 2026-07-11.
> - **Only legitimately-free sources are linked as free** — author-hosted, open-access, sponsor-published, or official docs. No mirrors, no pirate PDFs. Where the best book is paid, it is listed as **PAID** and the name is given so Hema can buy it.
> - **Age is stated where age matters.** A free book that predates the protocol it describes is worse than no book.

---

> 📚 **Books Hema already OWNS are indexed chapter-by-chapter in [`OWNED-BOOKS.md`](./OWNED-BOOKS.md)** — book → chapter → syllabus atom, so an atom cites *"Petrov ch. 4"*, never *"Database Internals."*
> **Edition audit result (2026-07-11): his DDIA PDF is the 1st edition (2017, Kleppmann alone) — superseded. He must buy the 2nd.** Ousterhout 1e (2018) is fine and needs no replacement. Refactoring and Vitillo are the correct 2nd editions.
> ⚠️ **No book he owns teaches TLS 1.3, and none is needed before Module 2.** Module 1 is 100% free sources.

## 1. The books to BUY — the whole program rests on five

| # | Book | Year | Carries |
|---|---|---|---|
| 1 | **Designing Data-Intensive Applications, 2nd ed.** — Kleppmann & Riccomini · https://dataintensive.net | **Mar 2026** | Databases · Distributed Systems · Messaging. **The spine.** ⚠️ **Buy the 2nd ed — the 1st (2017) is one edition behind.** No free version exists (author-confirmed). |
| 2 | **Database Internals** — Alex Petrov · https://www.databass.dev | 2019 | Storage engines: B-tree vs LSM, page layout, WAL, compaction. The "why is my DB slow" book. |
| 3 | **Understanding Distributed Systems, 2nd ed.** — Roberto Vitillo · https://understandingdistributed.systems | Oct 2024 | The **on-ramp before DDIA**. Free sample chapters at `/sample.pdf`. |
| 4 | **A Philosophy of Software Design, 2nd ed.** — John Ousterhout · https://web.stanford.edu/~ouster/cgi-bin/book.php | 2021 | **LLD. The single best book on design that exists.** 190pp. Its unit is *complexity*, not patterns. Author-hosted free **extract**: `/aposd2ndEdExtract.pdf` |
| 5 | **Refactoring, 2nd ed.** — Martin Fowler · https://martinfowler.com/books/refactoring.html | 2018 | **Examples are in JavaScript.** Every entry is *smell → NAME → mechanics* — a book whose entire content is retrieving the name of a move. Free catalog: https://refactoring.com/catalog/ |

**Optional 6th:** *Node.js Design Patterns, 4th ed* (Sept 2025) · https://nodejsdesignpatterns.com — the only book on this list about Hema's actual stack (Node 24, ESM, streams, async control flow).

**Everything else in this file is free and legal.** Module 1 (Networking) costs nothing at all.

---

## 2. Module 0 — Foundations (OS, concurrency, I/O)

| Resource | Free? | Tagged to |
|---|---|---|
| **OSTEP** — Arpaci-Dusseau, v1.10 (2023) · https://pages.cs.wisc.edu/~remzi/OSTEP/ | **FREE** | Processes, scheduling, virtual memory, threads, locks, deadlock. **Chapters 26–34 are the concurrency core.** ⚠️ There is **no `book.pdf`** — that widely-passed-around link 404s. Chapter PDFs only: `threads-locks.pdf`, `threads-deadlock.pdf`, `cpu-sched.pdf`, `vm-paging.pdf`. |
| **The Little Book of Semaphores** — Downey · https://greenteapress.com/wp/semaphores/ | **FREE** (CC) | ⭐ **A problem book** — poses a synchronisation puzzle (producer-consumer, readers-writers, dining philosophers), makes you *solve* it, then shows the answer. **Derive-first by construction.** Use after OSTEP 28–31. |
| **The C10K Problem** — Dan Kegel · http://www.kegel.com/c10k.html | **FREE** | The **taxonomy** of I/O strategies: thread-per-connection → readiness (`select`/`poll`/`epoll`) → completion. ⚠️ **2014. Mental model only — no `io_uring`, benchmarks meaningless.** Keep the *level-vs-edge* and *readiness-vs-completion* axes; discard every recommendation. |
| **`epoll(7)` man page** · https://man7.org/linux/man-pages/man7/epoll.7.html | **FREE** | Where "non-blocking" stops being a vibe and becomes `EAGAIN`. Level- vs edge-triggered, normatively. |
| **libuv design overview** · https://docs.libuv.org/en/v1.x/design.html | **FREE** | ⭐ **The fact most Node engineers don't know:** libuv polls *network* I/O with epoll/kqueue — but **file I/O has no portable async primitive, so it runs on a thread pool.** That one asymmetry explains most "why is my Node app blocked." |
| **Node.js — The Event Loop** (official) · https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick | **FREE** | The six phases. **Current** — documents the libuv 1.45 / Node 20 timer change, so it *supersedes every blog post written before 2023.* |
| **Node.js — Don't Block the Event Loop** (official) · https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop | **FREE** | Failure analysis: event-loop starvation; why one CPU-bound handler destroys p99 for every other connection. |

---

## 3. Module 1 — Networking *(in progress)*

| Resource | Free? | Tagged to |
|---|---|---|
| **RFC 1122 — Requirements for Internet Hosts** · https://www.rfc-editor.org/rfc/rfc1122.html | **FREE** | ⭐ **The authoritative source that the real internet is a 4-layer model** (link/internet/transport/application), not OSI's 7. Settles "is OSI a teaching fiction?" from the primary document, not a blog. |
| **Computer Networks: A Systems Approach** — Peterson & Davie, v6.2 (2024) · https://book.systemsapproach.org/ | **FREE** (CC) | IP, routing, and **TCP congestion control** at textbook depth (ch. 6). ⚠️ **No QUIC/HTTP3/TLS chapter** — don't use it for those. |
| **Beej's Guide to Network Programming** — v3.3.2 (**Apr 2026**) · https://beej.us/guide/bgnet/ | **FREE** | **Sockets, from first principles.** Current: §7.1 blocking, §7.2 `poll()`, §7.3 `select()`. The layer *below* everything taught so far. |
| **Beej's Guide to Network Concepts** — v1.0.40 (Apr 2025) · https://beej.us/guide/bgnet0/ | **FREE** | The layer model taught by **building**: checksum, subnet calc, DNS lookup, HTTP server, chat server. |
| **Implement DNS in a Weekend** — Julia Evans · https://implement-dns.wizardzines.com/ | **FREE** | ⭐ **You build a resolver** and thereby *derive* root → TLD → authoritative. Exactly the method. |
| **The Illustrated TLS 1.3 Connection** — Driscoll · https://tls13.xargs.org/ | **FREE** | ⭐⭐ **THE reference for the standing TLS/Diffie–Hellman debt.** Byte-by-byte through a real handshake, **naming every field as it appears.** Purpose-built for a learner whose failure mode is "understands the machinery, cannot name the parts." Siblings: `quic.xargs.org`, `dtls.xargs.org`, `tls12.xargs.org`. |
| **RFC 8446 — TLS 1.3** · https://www.rfc-editor.org/rfc/rfc8446.html | **FREE** | Normative. 1-RTT vs 0-RTT, and **why RSA key transport was removed** — i.e. why forward secrecy is now mandatory. Directly relevant to the DH gate. |
| **High Performance Browser Networking** — Grigorik · https://hpbn.co/ | **FREE** | ⚠️⚠️ **RING-FENCED — see §7. It is from 2013 and predates TLS 1.3, QUIC and HTTP/3 entirely.** **USE FOR:** TCP behaviour, latency-vs-bandwidth, HTTP/1.1 head-of-line blocking, HTTP/2 framing & multiplexing, WebSockets. **DO NOT USE ITS TLS CHAPTER.** |
| **HTTP/3 explained** — Daniel Stenberg (curl author) · https://http3-explained.haxx.se/en | **FREE** (CC BY) | ⭐ **Why QUIC exists.** Its `why-quic/why-tcphol` page is the cleanest statement of the thing Hema *already owns* — **TCP head-of-line blocking** — and why HTTP/2's multiplexing did **not** fix it. This is the payoff for the term he derived in S4. |
| **RFC 9000 (QUIC)** · https://www.rfc-editor.org/rfc/rfc9000.html · **RFC 9114 (HTTP/3)** · https://www.rfc-editor.org/rfc/rfc9114.html | **FREE** | Normative, 2021. |
| **Cloudflare blog — HTTP/3: Past, Present, Future** · https://blog.cloudflare.com/http3-the-past-present-and-future/ | **FREE** | The practitioner narrative. *(Note: Cloudflare's **Learning Center** 403s all automated fetches — it is fine in a browser but is **not** verified here; prefer the blog + RFCs.)* |
| **RFC 6455 — WebSocket** · https://www.rfc-editor.org/rfc/rfc6455.html | **FREE** | The HTTP **Upgrade** handshake + framing — i.e. why it is *not* "HTTP but persistent." |
| **gRPC — Introduction** (official) · https://grpc.io/docs/what-is-grpc/introduction/ | **FREE** | Protobuf IDL, the 4 call types. **gRPC *is* HTTP/2** — so it inherits HTTP/2's properties. A payoff for the HOL-blocking thread. |

---

## 4. Modules 2–7 — Databases · Caching · Scalability · Distributed · Messaging · Storage

### Databases
| Resource | Free? | Tagged to |
|---|---|---|
| **The Internals of PostgreSQL** — Suzuki (covers to **PG 19-beta**) · https://www.interdb.jp/pg/ | **FREE** (educational use) | ⭐ Real MVCC, not the cartoon: txid, tuple visibility, snapshot isolation (ch.5), VACUUM (6), Buffer Manager (8), **WAL (9)**, query processing (3). Actively maintained. |
| **A Critique of ANSI SQL Isolation Levels** — Berenson, Gray et al. (1995) · https://arxiv.org/abs/cs/0701157 | **FREE** | ⭐⭐ **If he reads one DB paper, this.** Shows the ANSI phenomena are **ill-defined**, and *defines* Snapshot Isolation. **Makes isolation levels derivable instead of memorisable.** |
| **Hermitage** — Kleppmann · https://github.com/ept/hermitage | **FREE** | Runnable SQL transcripts showing which anomaly each DB *actually* permits at each isolation level. Exercise material. |
| **Use The Index, Luke!** — Winand · https://use-the-index-luke.com/ | **FREE** | B-tree indexing **from the developer's side**: leading-column order, why a function on an indexed column kills the index, index-only scans. **Highest-ROI free DB resource.** |
| **PostgreSQL docs** — MVCC · isolation · WAL · planner · https://www.postgresql.org/docs/current/mvcc.html | **FREE** | Normative truth on what PG *actually* guarantees (e.g. PG's REPEATABLE READ **is** snapshot isolation). |
| **LSM-Tree paper** — O'Neil (1996) · https://www.cs.umb.edu/~poneil/lsmtree.pdf + **RocksDB Overview** · https://github.com/facebook/rocksdb/wiki/RocksDB-Overview | **FREE** | Together: the read/write-amplification trade that **is** the B-tree vs LSM answer. |
| **Jepsen — Consistency Models** · https://jepsen.io/consistency · **Analyses** · https://jepsen.io/analyses | **FREE** | The lattice of consistency models — and real databases **violating their own claimed guarantees.** The antidote to marketing-page consistency. |

### Caching
| **Redis — Eviction** · https://redis.io/docs/latest/develop/reference/eviction/ | **FREE** | Cache theory made concrete: why Redis **approximates** LRU by sampling rather than keeping a true LRU list. |
|---|---|---|
| **Redis — Persistence** · https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/ · **RESP protocol** · https://redis.io/docs/latest/develop/reference/protocol-spec/ | **FREE** | RDB vs AOF, fork + copy-on-write. RESP ties Redis straight back to Module 1 — **it's a wire protocol on TCP.** |
| **Scaling Memcache at Facebook** (NSDI'13) · https://www.usenix.org/conference/nsdi13/technical-sessions/presentation/nishtala | **FREE** | ⭐ **The best cache paper there is.** Thundering herds, leases, stale sets. |
| ⚠️ **NOT** `redis.io/.../reference/internals/` | — | **The page itself says it was written c. 2010 and "does not necessarily reflect the latest implementation."** It is history, not truth. |

### Scalability & estimation
| **napkin-math** — Simon Eskildsen · https://github.com/sirupsen/napkin-math | **FREE** (MIT) | ⭐⭐ **Numbers re-measured on fresh cloud instances in March 2026**, with a runnable benchmark suite, and it teaches the *technique* of estimation. |
|---|---|---|
| **Numbers Every Programmer Should Know** (interactive) · https://samwho.dev/numbers/ | **FREE** | The Jeff Dean/Norvig canon, cleanly presented. ⚠️ **Those numbers are from ~2010 and several are now wrong by 10× (SSD, network).** **Teach Dean as intuition; make him ESTIMATE with napkin-math.** |
| **AWS Builders' Library** · https://builder.aws.com/learn/topics/builders-library | **FREE** | ⭐ Production reality, by AWS principal engineers. **Timeouts, retries, backoff & jitter** · load shedding · health checks. *(The old `aws.amazon.com/builders-library/` index now 301s — deep links still work.)* |
| **Google SRE Book + Workbook** · https://sre.google/books/ | **FREE** | SLI/SLO/error budgets, overload, **cascading failures** (ch. 21–23 are the good part). |
| **The USE Method** — Brendan Gregg · https://www.brendangregg.com/usemethod.html | **FREE** | Turns "the system is slow" into a bounded search: for every resource — **U**tilisation, **S**aturation, **E**rrors. Teach *before* any tool. |

### Distributed systems
| **Distributed Systems, 4e** — van Steen & Tanenbaum (v4.03, Jan 2025) · https://www.distributed-systems.net/index.php/books/ds4/ | **FREE — author-hosted, legal** | The rigorous textbook layer where DDIA is practical. **Best free book in the field.** |
|---|---|---|
| **Kleppmann — Cambridge lecture notes** (rev. Oct 2025) · https://www.cl.cam.ac.uk/teaching/2526/ConcDisSys/dist-sys-notes.pdf | **FREE** | ⭐ **Highest signal-per-page anywhere.** 8 lectures + free YouTube series. Logical clocks, broadcast, consensus, CRDTs. |
| **Patterns of Distributed Systems** — Unmesh Joshi (2023) · https://martinfowler.com/articles/patterns-of-distributed-systems/ | **Patterns FREE on Fowler's site** | ⭐ **The missing rung between the papers and actual code.** WAL, leader-follower, quorum, generation clock, HLC, lease. |
| **Designing Distributed Systems** — Brendan Burns · https://info.microsoft.com/rs/157-GQE-382/images/EN-CNTNT-eBook-DesigningDistributedSystems.pdf | **FREE — full book, sponsor-published** | Sidecar, ambassador, adapter, scatter/gather. Container-centric, short. |
| **Distributed Systems for Fun and Profit** — Takada · http://book.mixu.net/distsys/single-page.html | **FREE** | Short conceptual weekend read: CAP, time, order, replication. |
| **MIT 6.824 / 6.5840** · https://pdos.csail.mit.edu/6.824/ | **FREE** | Grad course: lectures + paper list + **Raft & KV labs in Go**. The best *doing* resource in existence. |
| **Marc Brooker's blog** (AWS Distinguished Engineer) · https://brooker.co.za/blog/ | **FREE** | The best working engineer's blog on distributed systems. |

### Messaging
| **The Log** — Jay Kreps (2013) · **⚠️ LinkedIn URL is DEAD (404).** Use the archive: http://web.archive.org/web/20260609223006/https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying | **FREE** | ⭐ **Still the best single essay in the field** — the log as the universal abstraction. **Every curriculum on the internet still links the dead URL.** Keep the archive link or it rots. |
|---|---|---|
| **Kafka docs — Design section** · https://kafka.apache.org/documentation/ | **FREE** | The mechanisms: append-only **segmented log**, reliance on the **OS page cache**, **`sendfile`/zero-copy** (a caught-up cluster does *no disk reads*), **ISR replication**, consumer offsets. |
| **Designing Event-Driven Systems** — Stopford · https://www.confluent.io/wp-content/uploads/confluent-designing-event-driven-systems.pdf | **FREE — vendor-published** | Event-driven architecture, done properly. |

---

## 5. Foundational papers — read in this order (all free)

| Paper | URL | The idea it installs |
|---|---|---|
| **Google File System** (2003) | https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf | Commodity hardware + replication. |
| **MapReduce** (2004) | https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf | Move compute to data; re-execution as fault tolerance. |
| **Bigtable** (2006) | https://static.googleusercontent.com/media/research.google.com/en//archive/bigtable-osdi06.pdf | LSM/SSTable; wide-column. |
| **Dynamo** (2007) | https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf | **Consistent hashing, vector clocks, quorums, eventual consistency.** |
| **Paxos Made Simple** — Lamport | https://lamport.azurewebsites.net/pubs/paxos-simple.pdf | Consensus, from the source. |
| **Raft** — Ongaro & Ousterhout (2014) | https://raft.github.io/raft.pdf · viz: https://raft.github.io/ | **Understandable consensus.** Do the visualisation *and* the MIT lab. |
| **Spanner** (2012) | https://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf | TrueTime — buying external consistency with **physics**. |
| **PACELC** — Abadi (2012) | https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf | ⭐ **The correction to CAP.** Else → Latency vs Consistency. Non-negotiable. |
| **Scaling Memcache at Facebook** (2013) | https://www.usenix.org/conference/nsdi13/technical-sessions/presentation/nishtala | Thundering herds, leases, stale sets. |
| **Amazon Aurora** (2017) | https://www.amazon.science/publications/amazon-aurora-design-considerations-for-high-throughput-cloud-native-relational-databases | "The log **is** the database." |
| **Metastable Failures** (HotOS'21) | https://sigops.org/s/conferences/hotos/2021/papers/hotos21-s11-bronson.pdf | ⭐ Why healthy systems stay collapsed **after the trigger is gone.** Directly extends the retry/idempotency work already banked. |
| **DynamoDB** (ATC'22) | https://www.usenix.org/system/files/atc22-elhemali.pdf | The best *modern operations* paper — 15 years of lessons. |

---

## 6. Modules 11–12 — HLD & LLD

| Resource | Free? | Tagged to |
|---|---|---|
| **A Philosophy of Software Design** — Ousterhout | PAID (§1) | **Deep vs shallow modules · information leakage · tactical vs strategic programming.** Read first, before any patterns. |
| **Refactoring 2e** — Fowler | PAID (§1) | Design as **named, safe, reversible moves.** JavaScript examples. |
| **Refactoring.Guru — Patterns (TypeScript)** · https://refactoring.guru/design-patterns/typescript | **FREE** | **Best free patterns resource, period.** 22 patterns in TS. Free tier is sufficient — don't buy the ebook. |
| **Fowler's EAA Catalog** · https://martinfowler.com/eaaCatalog/ | **FREE** | ⭐ **Highest ROI/hour on the whole list.** Repository, Data Mapper, Active Record, Unit of Work, Identity Map, DTO — the actual vocabulary behind **every ORM** he touches. *(Read the catalog. Don't read the 2002 book.)* |
| **Cosmic Python** — Percival & Gregory · https://www.cosmicpython.com/book/preface | **FREE — full text, CC-licensed** | ⭐⭐ **Sleeper pick.** Starts with a naive script and **derives** Repository → Service Layer → Unit of Work → Aggregate → Message Bus by hitting the pain each one solves. Python — **which is a feature: he can't copy the code, he has to re-derive it in TypeScript.** |
| **Software Design by Example (JS)** — Greg Wilson · https://third-bit.com/sdxjs/ | **FREE** | Learn design by **building** a test runner, a bundler, a debugger, a VM. Derive-first by construction. |
| **awesome-low-level-design** · https://github.com/ashishps1/awesome-low-level-design | **FREE** (25k★) | **The best LLD problem set.** ~40 problems tiered + 9 concurrency problems. **Solve cold first, then diff against the solution.** |
| **Learning Domain-Driven Design** — Khononov (2021) | PAID | The DDD book to actually read in 2026. Supersedes Evans as an *entry point*. |
| **Balancing Coupling in Software Design** — Khononov (2024) · https://khononov.com/books/balancing-coupling | PAID | ⭐ Replaces the mush of "low coupling, high cohesion" with a **model**: coupling = strength × distance × volatility. Read after APOSD. |
| **The Ousterhout ↔ Uncle Bob debate** · https://github.com/johnousterhout/aposd-vs-clean-code | **FREE** | See §7. Read this *instead of* Clean Code. |
| **C4 Model** — Simon Brown · https://c4model.com/ | **FREE** | Diagramming at 4 zoom levels. Better than ad-hoc UML for the HLD↔LLD handoff. |

---

## 7. ⚠️ TRAPS — outdated, stale, or actively misleading

**These are the entries most curricula (including this one, until 2026-07-11) get wrong.**

1. **`hpbn.co` predates TLS 1.3, QUIC and HTTP/3.** © **2013**. Free, excellent, and its **TLS chapter will teach a handshake that no longer exists.** → Ring-fenced. TCP/HTTP1.1/HTTP2/WebSockets only. Use **RFC 8446 + tls13.xargs.org** for TLS and **http3-explained + RFC 9000/9114** for HTTP/3.
2. **Jeff Dean's latency numbers are from ~2010 and several are now wrong by 10×** (SSD, network). → Teach as *intuition*; estimate with **napkin-math** (re-measured March 2026).
3. **Jay Kreps' "The Log" has link-rotted off LinkedIn (404).** → Only the archive resolves.
4. **AWS Builders' Library moved hosts.** The classic index URL 301s. → `builder.aws.com/learn/topics/builders-library`.
5. **Redis's own "internals" docs are a 2010 artifact** — the page says so itself. → Use the current `develop/` and `operate/` docs.
6. **`OSTEP/book.pdf` does not exist** (404) — a widely-passed-around dead link. → Chapter PDFs only.
7. **C10K (2014)** — no `io_uring`, meaningless benchmarks. → Mental model only.
8. **uvbook (~2012)** — API drift. → Concepts only; **official libuv docs** for API truth.
9. **DDIA 1st ed (2017) is superseded** by the 2nd (March 2026).
10. **The System Design Primer** (357k★) — content is largely 2017–2020, no HTTP/3. → Excellent **index of what exists**; weak **source of truth**.
11. **Cloudflare Learning Center** — 403s all automated fetches; could not be verified. Fine in a browser, but don't cite specific paths from memory.

## 8. ❌ SKIP — and why

- **Grokking the System Design Interview** — *"teaches the shape of an answer rather than the machinery."* For a first-principles program it is **actively counterproductive**: it rewards precisely the *"describe the general thing when asked for the specific"* reflex that is a **diagnosed blind spot** in `MISTAKE_JOURNAL.md`. **Removed from `SYLLABUS.md` 2026-07-11.** *(If interview framing is ever wanted, the modern replacement is **Hello Interview** — https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction — free tier, and honest about being framing, not foundations.)*
- **Clean Code** (either edition, incl. Oct 2025) — **historically important, pedagogically dangerous.** It installs *rules to obey* rather than *a model to reason with* — the opposite of derive-first. The Ousterhout debate is decisive: Martin's own refactored `PrimeGenerator` took a **3–4× performance regression**. Its durable content is ~30 pages of a 400-page book. → Read **APOSD** instead. *(Critiques: https://qntm.org/clean · https://bugzmanov.github.io/cleancode-critique/)*
- **Head First Design Patterns** — not bad, just **dominated** by Refactoring.Guru (free, TypeScript) + Node.js Design Patterns. 600 Java pages he doesn't need.
- **GoF as a study text** — the code is C++/Smalltalk, and half its patterns (Strategy, Command, Factory Method, Template Method, Iterator, often Observer) **collapse into plain functions and closures in TypeScript.** Applying them as classes in Node is cargo-cult. → Learn patterns from Refactoring.Guru; consult GoF's **Consequences** sections (the *costs*) as a reference, since every free site amputates exactly that part.
- **Alex Xu, System Design Interview vol 1/2** — genuinely useful for estimation drills, but it is **a destination, not a foundation.** Reading it before DDIA produces exactly the "correct explanation, no term, no mechanism" failure already in the journal.
- **Web Scalability for Startup Engineers** (2015) — superseded by Vitillo + DDIA 2e.
- **GeeksforGeeks / Medium "Top 10 LLD questions"** — SEO copy-paste.
- **Grokking the OOD Interview** and its GitHub mirrors — UML cramming; several popular "best LLD resources" repos are **link-farms pointing at pirated PDFs.** Avoid on quality *and* legality.
