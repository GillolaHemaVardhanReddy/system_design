# OWNED BOOKS — chapter-level index

> **Built 2026-07-11.** Every chapter list below was extracted from the **actual PDF/EPUB in `references/`**, not from memory of what the book contains. Copyright pages were read directly; edition claims are evidenced, not assumed.
>
> **What this file is for:** so the mentor can say *"read Petrov ch. 4"* instead of *"read Database Internals."* A book is not a reference. A **chapter** is a reference.
>
> **Honesty rule.** Where a chapter serves nothing in `SYLLABUS.md`, it says **—**. No invented links. Where a book is **weaker than a free source** for a given atom, that is stated plainly, even though he already owns the book. Owning a book is not a reason to read it.

---

## ⚠️ READ THIS BEFORE OPENING ANY OF THEM

> ## **NONE of these books is needed before Module 2.**
> ## **Module 1 (Networking) is 100% free sources — it costs nothing and none of it is in these six files.**
>
> He is currently on **atom 1.9 (TLS/Diffie–Hellman)** — the standing gate debt. **Not one of these books teaches TLS 1.3 properly.** The source for 1.9 is **tls13.xargs.org** + **RFC 8446**, and it always was.
>
> **Material-gathering must never substitute for the atom in front of him.** Acquiring six books on the day the TLS gate is due is *avoidance wearing the costume of diligence*. These stay shut until Module 2 (Databases) — with the single exception noted under Vitillo.
>
> And when they open: **read-AFTER, never read-before.** A book **consolidates** a derivation. It must never pre-empt one (`TEACHING_LOG.md` Entry 001).

---

# 1. EDITION AUDIT

## 1.1 `Designing Data Intensive Applications by Martin Kleppmann.pdf` → ❌ **1st EDITION (2017). SUPERSEDED.**

**Verdict: this is the OLD one.** Evidence, read off the file's own copyright page (p. 4) and PDF metadata:

| Check | Value found |
|---|---|
| Title page (p. 3) | "Martin Kleppmann" — **single author** |
| Copyright line | "by Martin Kleppmann · Copyright © **2017** Martin Kleppmann" |
| Edition line | "**March 2017: First Edition**" |
| Revision history | "Revision History for the **First Edition** — 2017-03-01: First Release" |
| ISBN | **978-1-449-37332-0** (the 1e ISBN) |
| PDF metadata | `/Author: Martin Kleppmann`, `/CreationDate: D:20170301180120Z` |
| Chapter count | **12** chapters in 3 parts (2e has **14** + a Glossary) |

This is **trap #9 in `REFERENCES.md` §7**, sitting in the repo as a file. It is not junk — the 1e is a great book — but **the 2e supersedes it**, and where they disagree, the 2e wins. See §3 below for exactly where the 1e is stale.

## 1.2 `dokumen.pub_designing-data-intensive-applications-2.epub` → ✅ **GENUINE 2nd EDITION (2026)**

| Check | Value found |
|---|---|
| Title page | "Designing Data-Intensive Applications · **Second Edition** · Martin Kleppmann **and Chris Riccomini**" |
| Copyright line | "Copyright © **2026** Martin Kleppmann and Chris Riccomini" |
| Edition line | "March 2017: First Edition · **February 2026: Second Edition**" |
| Revision history | "Revision History for the **Second Edition** — **2026-02-18**: First Release" |
| ISBN | **978-1-098-11906-5** (the 2e ISBN) |
| `content.opf` | `dcterms:modified 2026-02-18`, `dc:creator: Martin Kleppmann and Chris Riccomini`, publisher O'Reilly |
| Structure | **14 chapters + Glossary** — matches the real 2e |

It is the real 2e — an **O'Reilly-produced EPUB**, complete with their production fonts and asset names.

> **The plain line, said once and not repeated:** `REFERENCES.md` §1 records that **DDIA 2e has no free version (author-confirmed)**, and **dokumen.pub is a known pirate-mirror host**. A file that is a real, complete, O'Reilly-built 2e and came from that host is **an unauthorised copy**. Buy it — **dataintensive.net**. It is the spine of Modules 2, 5 and 6; it is the one book on this list worth paying for twice.

## 1.3 `2018-John Ousterhout-A Philosophy of Software Design.pdf` → **1st EDITION (v1.01, Nov 2018)** — and that is **fine**

| Check | Value found |
|---|---|
| Copyright line | "Copyright © **2018** John K. Ousterhout" · Yaknyam Press |
| Printing history | "April 2018: First Edition (v1.0) · **November 2018: First Edition (v1.01)**" |
| ISBN | 978-1-7321022-0-0 |
| Chapters | **21** (2e has 22) |

`REFERENCES.md` §1 recommends the **2nd ed (July 2021)**. Here is the accurate delta, taken from **Ousterhout's own book page** (web.stanford.edu/~ouster/cgi-bin/book.php), not from vibes:

1. **One new chapter — "Decide What Matters"** (separating the important from the unimportant).
2. **Chapter 6, "General-Purpose Modules are Deeper," was substantially reworked and expanded.**
3. **New subsections in two chapters contrasting APOSD with Robert Martin's *Clean Code*** (on method length and on comments).

**And Ousterhout himself writes: "It may not be worth buying the Second Edition if you already own the First Edition"** — he has published the new material **free, separately, for 1e owners**: `web.stanford.edu/~ouster/aposd2ndEdExtract.pdf`.

> ✅ **Verdict: the 1st edition he owns is good enough.** Every load-bearing idea for Module 12 — **complexity as the unit · deep vs shallow modules · information leakage · tactical vs strategic programming · define errors out of existence · design it twice** — is fully present in this 1e. **Read the 1e; then read the free extract for the delta.** Do not buy the 2e. (The *Clean Code* contrast is already covered better by the free **aposd-vs-clean-code** debate repo in §7.)

## 1.4 `Understanding Distributed Systems 2nd edition.pdf` → **2nd edition, built 2022-03-11**

PDF metadata: `/Author: Roberto Vitillo`, `/CreationDate: D:20220311`, LaTeX-via-pandoc. The copyright page carries **no year** (self-published). The 2e first shipped **Feb 2022**, so this is an early printing of the correct edition. ⚠️ Minor correction to `REFERENCES.md` §1, which dates the 2e "**Oct 2024**" — that is a *later revision of the same 2nd edition*; **this file is the same edition, an earlier printing.** Not a problem: nothing in it has gone stale.

## 1.5 The other two — no edition issues

- `Database Internals.pdf` — Alex Petrov, metadata `/CreationDate: 2019-11-23`. **The only edition that exists (2019).** No 2e.
- `Refactoring...2nd.Edition.2018.11.pdf` — Martin Fowler, **2nd edition**, `/Title: "Refactoring: Improving the Design of Existing Code, 2/e"`, created 2018-10-09. ✅ **The correct edition — this is the JavaScript one.** (The 1e is Java and is the wrong book for him.)

---

# 2. Database Internals — Alex Petrov (2019) · 590pp

**Carries: Module 2 (Databases).** Its Part I is the best chapter-set on storage engines that exists — it is the *"why is my DB slow"* book. Its Part II is a competent survey but is **dominated by DDIA 2e + Kleppmann's Cambridge notes**; do not spend Module 5 in it.

## Part I — Storage Engines ⭐ **this is why he owns this book**

| Ch | Title | Serves atom(s) | Notes/trap |
|---|---|---|---|
| 1 | Introduction and Overview — DBMS architecture · memory- vs disk-based · **column- vs row-oriented** · data files & index files · buffering, immutability, ordering | **M2** relational vs NoSQL · **M7** columnar storage | The 3 axes (buffering / immutability / ordering) are the *derivation* of every storage engine. Read first. |
| 2 | **B-Tree Basics** — binary search trees · disk-based structures · ubiquitous B-trees | **M2 — B-tree vs LSM** ⭐ | ⭐ **The atom.** Derives *why* a BST is wrong on disk and a B-tree is right. Read with ch. 7 as a **pair** — neither half is the answer alone. |
| 3 | File Formats — binary encoding · page structure · **slotted pages** · cell layout · versioning · **checksumming** | **M2** (background) · Projects | Below the syllabus's depth. Read only when **building** a storage engine. Skippable on first pass. |
| 4 | Implementing B-Trees — page header · propagating splits and merges · rebalancing · **right-only appends** · compression · **vacuum and maintenance** | **M2 — B-tree**, **M2 — WAL/indexing** | *Vacuum* here is the general mechanism; **Postgres's actual VACUUM is `interdb.jp/pg` ch. 6.** |
| 5 | **Transaction Processing and Recovery** — buffer management · **recovery (WAL, ARIES)** · **concurrency control** | **M2 — WAL** ⭐ · **M2 — isolation levels** · **M0 (0.5–0.6)** locks | ⭐ **This is the WAL chapter.** ⚠️ Petrov gives the **general/ARIES** mechanism; the syllabus wants **PostgreSQL's real WAL → `interdb.jp/pg` ch. 9.** Read Petrov for the *idea*, interdb for the *implementation*. Its "Concurrency Control" section is the honest bridge from **Module 0's locks** to **isolation levels** — exactly the dependency §Module 2 flags. |
| 6 | B-Tree Variants — copy-on-write · lazy B-trees · FD-trees · **Bw-trees** · cache-oblivious B-trees | — | Genuinely optional. Research survey. **Skip.** |
| 7 | **Log-Structured Storage** — **LSM trees** · **read, write, and space amplification** · implementation details · unordered LSM · log stacking | **M2 — B-tree vs LSM** ⭐⭐ | ⭐⭐ **The other half of the atom.** Its *"Read, Write, and Space Amplification"* section **IS the B-tree-vs-LSM answer** — the trade is not "which is faster," it is *which amplification you choose to pay*. Pairs with the O'Neil LSM paper + RocksDB wiki. |

## Part II — Distributed Systems

| Ch | Title | Serves atom(s) | Notes/trap |
|---|---|---|---|
| 8 | Introduction and Overview — concurrent execution · **fallacies of distributed computing** · **Two Generals' Problem** · **FLP impossibility** · system synchrony · **failure models** | **M5** — fallacies | Good. Two Generals is the formal name for **"the ambiguity of silence"** he already derived in S4 — hand him the term, he has the concept. |
| 9 | Failure Detection — heartbeats & pings · **phi-accrual failure detector** · gossip | **M5 — failure detectors** | Solid, and DDIA doesn't cover phi-accrual. **Use Petrov here.** |
| 10 | Leader Election — bully · next-in-line · invitation · ring algorithms | **M5 — leader election** | ⚠️ **Weak/dated in practice.** Real systems use **Raft's** election (DDIA 2e ch. 10; Vitillo ch. 9). Read for taxonomy only. |
| 11 | Replication and Consistency — achieving availability · **"Infamous CAP"** · ordering · **consistency models** · session models · eventual consistency · **CRDTs** | **M5 — consistency models** · **M2 — replication** | Rigorous on the consistency lattice. But **PACELC (Abadi) is the correction the syllabus demands, and Petrov does not give it** — the paper is non-negotiable. |
| 12 | Anti-Entropy and Dissemination — **read repair** · digest reads · **hinted handoff** · **Merkle trees** · **gossip** | **M5 — quorum** · Dynamo paper | ⭐ Underrated. This is the **Dynamo paper's machinery**, explained. DDIA is thinner here. |
| 13 | Distributed Transactions — **2PC** · 3PC · Calvin · **Spanner** · **Percolator** · coordination avoidance | **M13 — 2PC and why it's avoided** · Spanner paper | Good companion to the Spanner paper. |
| 14 | Consensus — broadcast · **atomic broadcast** · **Paxos** (deep) · **Raft** · Byzantine consensus | **M5 — consensus, Raft, Paxos** | ⚠️ Petrov's **Paxos section is the best in any book** (Multi-Paxos, Fast Paxos, EPaxos). His **Raft section is thin** — for Raft, do the **raft.github.io visualisation + the MIT 6.824 lab.** Reading about Raft does not install Raft; implementing it does. |

---

# 3. DDIA — **1st ed. (2017)** PDF · 12 chapters

**Use only as a fallback.** Everything here is done better in the 2e EPUB. Kept in this index solely so that if he reads the PDF by accident, he knows *which chapter number he is actually in* and *what has since changed*.

| Ch | Title (1e) | Serves atom(s) | → in the 2e it became | Stale? |
|---|---|---|---|---|
| 1 | Reliable, Scalable, and Maintainable Applications | **M4**, **M11** | **split into 2e ch. 1 + ch. 2** | Fine. |
| 2 | Data Models and Query Languages | **M2** — relational vs NoSQL | 2e ch. 3 | Fine; 2e adds **Event Sourcing/CQRS** + GraphQL + DataFrames. |
| 3 | Storage and Retrieval — *Data Structures That Power Your Database* · *Column-Oriented Storage* | **M2 — B-tree vs LSM** · **M7 — columnar** | 2e ch. 4 | Usable, but 2e adds **compaction strategies, write amplification, full-text & vector indexes.** |
| 4 | Encoding and Evolution | **M1.18/1.19** — protobuf, REST vs RPC | 2e ch. 5 | 2e adds **durable execution/workflows, service meshes**. |
| 5 | Replication | **M2 — replication** · **M5** | 2e ch. 6 | 2e adds **sync engines / local-first**, and replaces 1e's *version vectors* discussion. |
| 6 | **Partitioning** | **M2 — partitioning/sharding** · **M4 — consistent hashing** | **2e ch. 7, RENAMED "Sharding"** | ⚠️ **The word changed.** 1e says *partitioning*; the 2e (and the industry) says **sharding**. Given the term-decay blind spot, teach the 2e's word. |
| 7 | Transactions | **M2 — ACID, isolation, MVCC, serializability** | 2e ch. 8 | ⚠️ **Materially restructured**: the 2e **moves 2PC/distributed transactions INTO ch. 8**. |
| 8 | The Trouble with Distributed Systems | **M5** — fallacies, clocks | 2e ch. 9 | 2e adds **formal methods, deterministic simulation testing, fencing**. |
| 9 | Consistency and Consensus | **M5 — linearizability, CAP, consensus** | **2e ch. 10** | 2e reorganises around **ID generators & hybrid logical clocks**. |
| 10 | Batch Processing | — (**M7** tangentially) | 2e ch. 11 | 1e is very MapReduce-centric; **dated**. |
| 11 | Stream Processing | **M6 — Kafka, delivery semantics, CDC** | 2e ch. 12 | Still strong. |
| 12 | The Future of Data Systems | **M13 — CQRS, event sourcing, outbox** | **2e ch. 13, renamed "A Philosophy of Streaming Systems"** | The *end-to-end argument / idempotency* section is superb and ties straight to **banked atom 1.10**. |

---

# 4. DDIA — **2nd ed. (2026)** EPUB ⭐ **THE SPINE** · 14 chapters

**Carries Modules 2, 5, 6 — and it is the single highest-value book on this list.** (Buy it: dataintensive.net.)

| Ch | Title | Serves atom(s) | Notes/trap |
|---|---|---|---|
| 1 | Trade-Offs in Data Systems Architecture — operational vs analytical · data warehouse → **data lake** · cloud vs self-hosting · **distributed vs single-node** | **M2** (intro) · **M11** | Framing, not machinery. Read fast. Its *"Problems with Distributed Systems"* is the forcing question for M5. |
| 2 | **Defining Nonfunctional Requirements** — case study: **social network home timelines** · **latency vs response time** · **percentiles/p99** · fault tolerance · **scalability** · maintainability | **M4** · **M8 (SLI/SLO)** · **M11 (requirements)** | ⭐ **The p99 chapter.** *"Average, Median, and Percentiles"* is exactly the real-world-anchor rule (§4): why a **p99** and not a mean. **Read this before any HLD mock.** |
| 3 | Data Models and Query Languages — relational vs document · **normalization/denormalization** · many-to-many · graph models (Cypher, SPARQL, Datalog) · **GraphQL** · **Event Sourcing and CQRS** · DataFrames | **M2 — relational vs NoSQL, normalization** · **M1.19 — GraphQL** · **M13 — CQRS/event sourcing** | New in 2e: the **Event Sourcing & CQRS** section — read it again at M13. |
| 4 | **Storage and Retrieval** — **log-structured storage** (SSTable, **compaction strategies**, Bloom filters) · **B-trees** · **Comparing B-Trees and LSM-Trees (read perf, sequential vs random writes, WRITE AMPLIFICATION, disk space)** · secondary indexes · **column-oriented storage** · full-text & **vector embeddings** | **M2 — B-tree vs LSM** ⭐⭐ · **M2 — indexing** · **M7 — columnar** | ⭐⭐ **The atom, at the right altitude.** Read **DDIA 2e ch. 4 FIRST for the trade**, then **Petrov ch. 2 + 7** for the mechanism. **Do not** start with Petrov — he will drown in slotted pages before he owns the trade-off. |
| 5 | Encoding and Evolution — JSON/XML · **Protocol Buffers** · Avro · **schema evolution** · **REST and RPC** · load balancers/service discovery/**service meshes** · **durable execution & workflows** · **event-driven architectures** | **M1.18 — gRPC/protobuf** · **M1.19 — versioning** · **M6** · **M13 — service mesh, Saga** | ⭐ *"The problems with remote procedure calls"* is the honest answer to "why not just RPC everywhere" — and it lands on **idempotency**, which is **banked atom 1.10**. Perfect connection-teaching material. |
| 6 | **Replication** — single-leader (**sync vs async**, **failover**, **replication logs / WAL shipping**) · **replication lag** (read-your-writes, **monotonic reads**, **consistent prefix reads**) · multi-leader · **sync engines / local-first** · conflict resolution · **CRDTs** · **leaderless (Dynamo-style)** · **quorums (R+W>N)** · **happens-before, version vectors** | **M2 — replication** ⭐ · **M5 — quorum, CRDTs** | ⭐ The three lag anomalies are *named* — feed them straight into `GLOSSARY.md`. Its **quorum** section is the source for M5's `R+W>N`. |
| 7 | **Sharding** — pros/cons · multitenancy · **key-range** vs **hash** sharding · **consistent hashing** · **skewed workloads / hot spots** · rebalancing · request routing · **local vs global secondary indexes** | **M2 — partitioning/sharding** ⭐ · **M4 — consistent hashing** · **M3 — hot keys** | ⚠️ Renamed from 1e's "Partitioning." **"Skewed Workloads and Relieving Hot Spots"** is the same beast as the **hot-key** problem in M3 — teach them as one idea in two places. |
| 8 | **Transactions** — **ACID** · **weak isolation levels** (read committed, **snapshot isolation**, **MVCC**, visibility rules) · **lost updates** · **write skew & phantoms** · **serializability** (serial execution, **2PL**, **SSI**) · **distributed transactions: 2PC, 3PC, XA** · **exactly-once message processing** | **M2 — ACID, isolation, MVCC, serializability** ⭐⭐ · **M13 — 2PC** · **M6 — exactly-once** | ⭐⭐ **The most important single chapter for Module 2.** ⚠️ **Requires Module 0 (0.5–0.7) first** — 2PL is a *lock*, write skew is a *race*. This is precisely why M0 is a DEBT. **Derive from the ANSI Critique paper first, then read this, then drill Hermitage.** Note the 2e's own section *"Snapshot isolation, repeatable read, and naming confusion"* — a term trap, tailor-made for his blind spot. |
| 9 | The Trouble with Distributed Systems — **partial failures** · **unreliable networks** (incl. **"The Limitations of TCP"**) · **fault detection** · timeouts & unbounded delays · **unreliable clocks** (monotonic vs time-of-day) · **process pauses** · **the majority rules** · **distributed locks & leases, FENCING** · **Byzantine faults** · safety vs liveness · **deterministic simulation testing** | **M5 — fallacies, failure detectors, clocks** ⭐ | ⭐ *"The Limitations of TCP"* is the **direct payoff for banked atoms 1.4–1.6**: everything he learned about TCP retransmission is exactly why **a slow machine is indistinguishable from a dead one.** ***This is the bridge chapter from Module 1 to Module 5.*** Teach it as such. |
| 10 | **Consistency and Consensus** — **linearizability** · **the CAP theorem** · **logical clocks: Lamport timestamps, hybrid logical clocks, vector clocks** · linearizable ID generators · **consensus** (single-value, CAS, **shared logs**, atomic commitment) · **coordination services** | **M5 — consistency models, Lamport, vector clocks, consensus, leader election** ⭐⭐ | ⭐⭐ The intellectual core. ⚠️ **DDIA gives CAP, not PACELC.** The syllabus demands **Abadi's PACELC paper** as the correction — *Else → Latency vs Consistency*. **Read the paper after this chapter, not instead of it.** |
| 11 | Batch Processing — Unix tools · distributed filesystems & **object stores** · MapReduce · dataflow engines · joins/shuffling · ETL | **M7** (loosely) | Not on the critical path. **Skim.** |
| 12 | **Stream Processing** — messaging systems · **log-based message brokers** (offsets, disk usage, replay) · **change data capture (CDC)** · **log compaction** · immutability · stream joins · **windowing / event time vs processing time** · **fault tolerance: idempotence, exactly-once** | **M6 — Kafka internals, delivery semantics, ordering, backpressure** ⭐⭐ | ⭐⭐ **The Module 6 chapter.** *"Log-Based Message Brokers"* **is** Kafka's design, derived. *"When consumers cannot keep up with producers"* **is backpressure**. Read **after** Kreps' "The Log" (archive link — §7 trap 3). |
| 13 | A Philosophy of Streaming Systems — data integration · **unbundling databases** · **the end-to-end argument** · **exactly-once execution, duplicate suppression, uniquely identifying requests** · enforcing constraints · **trust, but verify** | **M13 — CQRS, event sourcing, outbox, Saga** ⭐ | ⭐ *"Uniquely identifying requests"* is **the idempotency key** — **banked atom 1.10**, returning 12 chapters later at distributed-systems scale. **This is the payoff chapter. Save it; it makes the whole program click shut.** |
| 14 | Doing the Right Thing — predictive analytics · bias · privacy & surveillance | — | Ethics. Not examinable, worth reading once. |
| — | **Glossary** | **`trackers/GLOSSARY.md`** ⭐ | ⚠️ **New in the 2e, and directly relevant to the term-decay blind spot.** ***Do NOT hand him the glossary to read.*** Reading a term does not install it (§4). Use it as **Jimmy's** checklist — that every term christened at birth has the referent the book gives it. |

---

# 5. Understanding Distributed Systems, 2e — Roberto Vitillo · 34 chapters, 346pp

**The on-ramp *before* DDIA.** Short chapters, low ceremony. **Its role in this program is a bridge, not a source of truth** — where it and DDIA 2e disagree in depth, DDIA wins. Read a Vitillo chapter to get *oriented*, then DDIA to get *deep*.

| Ch | Title | Serves atom(s) | Notes/trap |
|---|---|---|---|
| 1 | Introduction — communication · coordination · scalability · resiliency · maintainability | **M11** | The book's 5-part map. 6pp. |
| **Part I — Communication** ||||
| 2 | Reliable links — reliability · **connection lifecycle** · **flow control** · **congestion control** | **1.4, 1.5 (BANKED)** · **1.6 congestion control** ⬜ | ⚠️ **The one exception to the "not before Module 2" rule.** §2.4 is a **3-page summary of atom 1.6 (slow start / AIMD)** — the one Module-1 TCP atom he has *not* been taught. It is **not the teaching source** (that is Systems Approach ch. 6); it is a **cold-recall crosscheck** for 1.4/1.5 that he can read *after* the gate. |
| 3 | Secure links — encryption · **authentication** · integrity · **handshake** | **1.9 — TLS** ⚠️ | ⚠️⚠️ **DO NOT use this for atom 1.9.** It is **5 pages** and it is a *summary*, not a derivation. His TLS debt is a **DH-and-identity** debt, and it will not be paid by a 5-page overview. **The source is tls13.xargs.org (byte-by-byte, names every field) + RFC 8446.** Read Vitillo ch. 3 **after** the TLS gate passes, as a compression check. |
| 4 | Discovery | **1.3 DNS (BANKED)** | Trivially short. Nothing new. |
| 5 | APIs — **HTTP** · resources · request methods · **status codes** · OpenAPI · **evolution/versioning** · **idempotency** | **1.10 (BANKED)** · **1.19 — API design, versioning** | §5.7 **Idempotency** and §5.6 **Evolution** map exactly onto atom 1.19. Genuinely useful there. |
| **Part II — Coordination** ||||
| 6 | System models | **M5** | Synchronous/partially-synchronous/asynchronous; fail-stop vs Byzantine. Crisp. |
| 7 | Failure detection | **M5 — failure detectors** | 2pp. Petrov ch. 9 is deeper. |
| 8 | Time — **physical clocks** · **logical clocks** · **vector clocks** | **M5 — clocks** ⭐ | ⭐ **The clearest short treatment of Lamport + vector clocks in any book he owns.** Use Vitillo ch. 8 to *derive*, DDIA 2e ch. 10 to *deepen*. |
| 9 | Leader election — **Raft leader election** · practical considerations | **M5 — leader election, Raft** | Better than Petrov ch. 10 (which is the *dated* algorithms). Still: **implement Raft, don't read it.** |
| 10 | Replication — **state machine replication** · **consensus** · **consistency models** · **chain replication** | **M5 — consensus, consistency models** · **M2 — replication** | Chain replication is not in DDIA. Nice extra. |
| 11 | Coordination avoidance — broadcast protocols · **CRDTs** · **Dynamo-style data stores** · **CALM theorem** · **causal consistency** | **M5 — CRDTs, quorum, causal consistency** | ⭐ CALM theorem isn't in DDIA. Worth the detour. |
| 12 | Transactions — **ACID** · **isolation** · **atomicity (2PC)** · **NewSQL** | **M2 — ACID/isolation** · **M13 — 2PC** | ⚠️ **Much thinner than DDIA 2e ch. 8.** Use as the *warm-up*, never as the source. |
| 13 | **Asynchronous transactions — outbox pattern · sagas · isolation** | **M13 — Saga, outbox** ⭐⭐ | ⭐⭐ **The best short treatment of the outbox pattern and Sagas he owns.** This is *the* Module 13 chapter. DDIA covers the theory; Vitillo gives you the **pattern you actually implement**. |
| **Part III — Scalability** ||||
| 14 | **HTTP caching** — **reverse proxies** | **M3 — caching** · **1.15 — reverse proxy** | Ties Module 3 back to Module 1. Good connection material. |
| 15 | Content delivery networks — overlay network · caching | **M4 — CDN** | Short and sufficient. |
| 16 | Partitioning — **range** vs **hash** partitioning | **M2 — partitioning** | DDIA 2e ch. 7 is strictly better. Skip. |
| 17 | File storage — **blob storage architecture** | **M7 — object/blob storage** | One of the few places any of these books covers **blob storage**. Use it. |
| 18 | **Network load balancing** — **DNS LB** · **transport-layer (L4)** · **application-layer (L7)** | **1.16 — L4 vs L7** ⭐⭐ | ⭐⭐ **This is the atom-1.16 chapter, and it is the best source for it in any of the six books.** L4 vs L7 derived properly. ⚠️ *But it is Module 1 — it stays shut until 1.16 is actually reached.* |
| 19 | Data storage — replication · partitioning · **NoSQL** | **M2** | Summary. Redundant after DDIA. |
| 20 | **Caching** — **policies** · **local cache** · **external cache** | **M3 — caching** ⭐ | The Module 3 orientation chapter. But **Redis internals + the Memcache paper are where the depth is.** |
| 21 | Microservices — caveats · **API gateway** | **M13** · **M10** | Honest about the *costs* of microservices, which is rare. |
| 22 | Control planes and data planes — **scale imbalance** · control theory | **M10 — service discovery** · **M4** | Underrated. The control/data-plane split is real vocabulary he will meet in K8s and in service meshes. |
| 23 | **Messaging** — **guarantees** · **exactly-once processing** · failures · **backlogs** · fault isolation | **M6 — delivery semantics, backpressure, DLQ** ⭐ | ⭐ Short, and it lands the punchline: **"exactly-once" is a lie without idempotency** — the same sentence as **banked atom 1.10**. |
| **Part IV — Resiliency** ||||
| 24 | Common failure causes — hardware · **incorrect error handling** · config changes · **SPOF** · **resource leaks** · **cascading failures** · managing risk | **M4** · **M8 — incident analysis** ⭐ | ⭐ Pairs with Google SRE ch. 21–23. |
| 25 | Redundancy — **correlation** | **M4** | *Redundancy only helps if the failures are uncorrelated* — the whole chapter, and it's the right idea. |
| 26 | Fault isolation — **shuffle sharding** · **cellular architecture** | **M4** · **M13 — multi-region** | ⭐ **Shuffle sharding** is a beautiful, nameable, derivable idea. Perfect name-at-birth material. |
| 27 | **Downstream resiliency — timeout · retry · circuit breaker** | **1.19 — retries, timeouts, jitter** ⭐⭐ · **M13** · **Project: circuit breaker** | ⭐⭐ **The atom-1.19 chapter.** Read alongside the **AWS Builders' Library** piece on backoff-and-jitter. Directly extends the **retry/idempotency** work already banked. |
| 28 | Upstream resiliency — **load shedding** · **load leveling** · **rate limiting** · **constant work** | **M4 — rate limiting** ⭐ · **Project 2: rate limiter** | ⭐ **"Constant work"** is the idea nobody teaches — the antidote to **metastable failure**. Read with the Metastable Failures paper. |
| **Part V — Maintainability** ||||
| 29 | Testing — scope · size · **formal verification** | — (**M12** loosely) | Fine, generic. |
| 30 | Continuous delivery and deployment — review/build · pre-production · **rollbacks** | **M10 — CI/CD, blue-green & canary** | Sufficient for the syllabus line. |
| 31 | **Monitoring — metrics · SLIs · SLOs · alerts · dashboards · being on call** | **M8 — SLI/SLO/SLA, error budgets** ⭐ | ⭐ Tighter than the SRE book, and it is *actionable*. Read this **first**, SRE book second. |
| 32 | **Observability — logs · traces** · putting it all together | **M8 — logging, distributed tracing** ⭐ | ⭐ The Module 8 chapter. |
| 33 | Manageability | **M10** | 2pp. |
| 34 | Final words | — | — |

---

# 6. A Philosophy of Software Design — Ousterhout (1e, 2018) · 21 chapters, 190pp

**Carries Module 12 (LLD) — and it is the FIRST thing read there, before any pattern.** `SYLLABUS.md` M12: *"⭐ **APOSD first**. **Complexity** is the unit, not patterns."* The whole book is 190 pages; **he should read all of it.** The table below exists so a *single* chapter can be prescribed against a *single* symptom.

| Ch | Title | Serves atom(s) | Notes/trap |
|---|---|---|---|
| 1 | Introduction (It's All About Complexity) | **M12 — APOSD** | The thesis. |
| 2 | **The Nature of Complexity** | **M12** ⭐⭐ | ⭐⭐ **The most important chapter in the book.** Complexity = **change amplification + cognitive load + unknown unknowns**. Three named symptoms → three retrievable handles. **Name-at-birth gold.** |
| 3 | **Working Code Isn't Enough** (**tactical vs strategic programming**) | **M12 — tactical vs strategic** ⭐ | The "tactical tornado." Explicitly in the syllabus line. |
| 4 | **Modules Should Be Deep** | **M12 — deep vs shallow modules** ⭐⭐ | ⭐⭐ **The single most useful idea for HLD *and* LLD.** Interface cost vs functionality benefit. **A shallow module is a net loss** — the sentence that kills gratuitous abstraction. |
| 5 | **Information Hiding (and Leakage)** | **M12 — information leakage** ⭐⭐ | ⭐⭐ **"Temporal decomposition"** is the trap he will fall into (designing modules by *order of operations* rather than by *knowledge*). Given his **layer-fusion** blind spot, this chapter is aimed directly at him. |
| 6 | General-Purpose Modules are Deeper | **M12** | ⚠️ **This is the chapter the 2e substantially reworked.** Read the free 2e extract for this one: `web.stanford.edu/~ouster/aposd2ndEdExtract.pdf`. |
| 7 | **Different Layer, Different Abstraction** | **M12** ⭐⭐ | ⭐⭐ **"Pass-through methods" / "pass-through variables."** ⚠️ **Prescribe this one deliberately: it is the LLD form of layer-fusion.** *If adjacent layers have the same abstraction, that is a red flag.* Same disease, different codebase. |
| 8 | **Pull Complexity Downwards** | **M12** ⭐ | It is *better* for the module to be complex than the interface. Counter-intuitive, and correct. |
| 9 | Better Together Or Better Apart? | **M12** | The split/join decision, with actual criteria instead of "SRP." |
| 10 | **Define Errors Out Of Existence** | **M12** ⭐⭐ · **1.19 / M13 (retries)** | ⭐⭐ **Deep connection to what he has already banked**: the reason **idempotency** wins is that it *defines the "did my retry duplicate?" error out of existence* rather than handling it. **Teach 1.10 and this chapter as the same idea at two altitudes.** |
| 11 | **Design it Twice** | **M12** ⭐ | Explicitly in the syllabus. Cheap, and almost nobody does it. |
| 12 | Why Write Comments? The Four Excuses | **M12** | |
| 13 | Comments Should Describe Things that Aren't Obvious from the Code | **M12** ⭐ | The rule: **comments describe what the code cannot.** |
| 14 | **Choosing Names** | **M12** ⭐⭐ · **the TERM-DECAY blind spot** ⭐⭐ | ⭐⭐ **Read this chapter for reasons beyond LLD.** *"If you can't find a precise name, the design is probably muddled."* **That is his blind spot, stated as a design principle by someone else.** A name is not decoration — it is the compressed concept. Same claim as **§4 name-at-birth**. Use it to make the term-drilling *make sense to him*, rather than feel like a vocabulary tax. |
| 15 | Write The Comments First | **M12** | Comments as a *design* tool, not documentation. |
| 16 | Modifying Existing Code | **M12** · **Refactoring** | The bridge to Fowler. |
| 17 | Consistency | **M12** | |
| 18 | Code Should be Obvious | **M12** | |
| 19 | Software Trends (agile, TDD, OO, design patterns, getters/setters) | **M12 — SOLID/patterns as heuristics** ⭐ | ⚠️ **Read this BEFORE Refactoring.Guru's pattern catalog.** It is the inoculation against cargo-culting patterns — which, per `REFERENCES.md` §8, is a real risk in TS where half of GoF collapses into closures. |
| 20 | **Designing for Performance** | **M12** · **M4 — estimation** | *"The best way to make code fast is to make it clean"* — **plus the discipline of measuring first.** Ties to the **USE method**. |
| 21 | Conclusion | — | |
| — | **Summary of Design Principles** (p. 185) · **Summary of Red Flags** (p. 186) | **M12 — revision surface** ⭐ | ⭐ **Two pages that are the whole book compressed.** ⚠️ **But do not hand him these as the lesson** — a red-flag list *read* is a red-flag list *forgotten*. **Use them as the cover-and-reveal drill** in the Module 12 `BIBLE.html`. |

---

# 7. Refactoring, 2nd ed. — Fowler (2018, **JavaScript**) · 12 chapters

**Carries Module 12.** ✅ Correct edition — **the 2e's examples are in JavaScript**, which is *his* language. `SYLLABUS.md` calls it out precisely: *"design as **named, safe, reversible moves** — a book whose whole content is **smell → NAME → mechanics**, an unusually good fit for the term-decay blind spot."*

**How to use it — this matters more than the chapter list.** It is a **catalog**, not a book to read front-to-back. Read **ch. 1–4 properly** (they are a narrative), then use ch. 6–12 as a **reference you look things up in when a smell appears in your own code.** The free catalog at **refactoring.com/catalog/** carries the names and signatures; **the book carries the *mechanics* — the numbered, safe, reversible steps — and the free site does not.** That is the whole reason to own it.

| Ch | Title | Serves atom(s) | Notes/trap |
|---|---|---|---|
| 1 | **Refactoring: A First Example** (JS, worked end-to-end) | **M12 — Refactoring 2e** ⭐⭐ | ⭐⭐ **Read this chapter properly, with the code open, typing it.** It is 40 pages of a single real refactoring and it teaches more than the other 400. **Do not skim it.** |
| 2 | Principles in Refactoring — defining refactoring · **the two hats** · when/why · **Yagni** · refactoring and performance | **M12** ⭐ | *"The two hats"* (adding function vs refactoring — **never both at once**) is a nameable, retrievable rule. |
| 3 | **Bad Smells in Code** — 24 named smells: *Mysterious Name · Duplicated Code · Long Function · Long Parameter List · Global Data · Mutable Data · Divergent Change · Shotgun Surgery · Feature Envy · Data Clumps · Primitive Obsession · Repeated Switches · Loops · Lazy Element · Speculative Generality · Temporary Field · Message Chains · **Middle Man** · Insider Trading · Large Class · Alternative Classes · Data Class · Refused Bequest · Comments* | **M12** ⭐⭐ · **the TERM-DECAY blind spot** ⭐⭐ | ⭐⭐ **This chapter IS the term-decay therapy.** 24 concepts he can already *feel* in bad code, each given **one retrievable name.** ⚠️ **But NOT as a list to memorise** (`TEACHING_LOG.md` Entry 003 — a standalone term exam produced *"I am losing interest"*). **The method: he writes bad code, he FEELS the smell, HE names it, THEN Fowler's name is given with its etymology.** Name-at-birth, applied to design. 🎯 *Nice coincidence worth using: Fowler's smell **"Middle Man"** is a legitimate term — which is a chance to fix, by contrast, the one place he used "middle man" **wrongly** (for the **CA**, whose middle man is the **attacker**).* |
| 4 | Building Tests | **M12** | Short. The safety net that makes refactoring *reversible*. Non-negotiable prerequisite. |
| 5 | Introducing the Catalog | — | 2pp of housekeeping. |
| 6 | **A First Set of Refactorings** — Extract/Inline Function · Extract/Inline Variable · Change Function Declaration · Encapsulate Variable · Rename Variable · **Introduce Parameter Object** · Combine Functions into Class/Transform · **Split Phase** | **M12** ⭐ | The core moves. **Split Phase** is APOSD ch. 7 (different layer, different abstraction) as an executable procedure. |
| 7 | Encapsulation — Encapsulate Record/Collection · **Replace Primitive with Object** · Replace Temp with Query · **Extract/Inline Class** · Hide Delegate · **Remove Middle Man** · Substitute Algorithm | **M12** ⭐ | ⭐ **This is APOSD ch. 5 (information hiding) turned into mechanics.** Read the two together. |
| 8 | Moving Features — Move Function/Field · Move Statements · Slide Statements · **Split Loop** · **Replace Loop with Pipeline** · Remove Dead Code | **M12** | *Replace Loop with Pipeline* is idiomatic modern JS. |
| 9 | Organizing Data — Split Variable · Rename Field · Replace Derived Variable with Query · Change Reference↔Value | **M12** | |
| 10 | Simplifying Conditional Logic — Decompose/Consolidate Conditional · **Replace Nested Conditional with Guard Clauses** · **Replace Conditional with Polymorphism** · **Introduce Special Case (Null Object)** · Introduce Assertion | **M12** ⭐ · **APOSD ch. 10** | ⭐ **"Introduce Special Case"** *is* Ousterhout's **"define errors out of existence,"* as a mechanical procedure. **Same idea, two books — show him the edge.** |
| 11 | **Refactoring APIs** — Separate Query from Modifier · **Parameterize Function** · **Remove Flag Argument** · Preserve Whole Object · Replace Parameter↔Query · Remove Setting Method · **Replace Constructor with Factory Function** · **Replace Function with Command** / Command with Function | **M12 — patterns** ⭐ · **M1.19 — API design** | ⭐ **Note what this chapter is doing:** it *derives* Factory and Command as **refactorings you arrive at**, not patterns you apply. **That is exactly the syllabus's stance on patterns** (*heuristics to re-derive, never commandments*). Teach patterns from here, not from a catalog. |
| 12 | Dealing with Inheritance — Pull Up/Push Down · **Replace Type Code with Subclasses** · Extract/Collapse Superclass · **Replace Subclass with Delegate** · **Replace Superclass with Delegate** | **M12 — SOLID** | ⭐ The last two are *"favour composition over inheritance"* with **actual mechanics** instead of a slogan. |

---

# 8. REVERSE INDEX — "WHEN WE REACH ATOM X, READ Y"

**How to read this table:** the **PRIMARY** column is what he reads. The **THEN** column is the deepening pass. ⚠️ marks a place where a book he owns is **NOT** the right source and a free source wins.

| Syllabus atom / module | PRIMARY — read this | THEN (deepen) | ⚠️ |
|---|---|---|---|
| **M0 · 0.5–0.7 locks, races, deadlock** | — *(OSTEP 28–31 + Little Book of Semaphores)* | Petrov **ch. 5** *(Concurrency Control)* | ⚠️ **No book he owns teaches Module 0.** It is 100% free (OSTEP). |
| **M0 · 0.8–0.11 I/O, epoll, event loop** | — *(Beej · `epoll(7)` · libuv · Node docs)* | — | ⚠️ **Nothing he owns covers this.** Don't go looking. |
| **1.6 TCP congestion control** ⬜ | — *(Systems Approach ch. 6)* | Vitillo **ch. 2.4** *(3-page summary)* | Vitillo is the **crosscheck**, not the source. |
| **1.9 TLS + Diffie–Hellman** 🔵 **THE STANDING DEBT** | — **tls13.xargs.org + RFC 8446** | Vitillo **ch. 3** — *only after the gate passes* | ⚠️⚠️ **NONE of these six books teaches TLS 1.3.** Vitillo ch. 3 is 5 pages. Do not let a book substitute for this gate. |
| **1.15 reverse proxy** | Vitillo **ch. 14** | nginx docs | |
| **1.16 load balancing — L4 vs L7** | **Vitillo ch. 18** ⭐ | AWS Builders' Library | Best source for this atom in any owned book. |
| **1.18 gRPC / protobuf** | **DDIA 2e ch. 5** | grpc.io | |
| **1.19 API design · retries, timeouts, jitter** | **Vitillo ch. 27** ⭐⭐ + **ch. 5.6–5.7** | DDIA 2e ch. 5 · AWS Builders' Library | |
| **M2 · relational vs NoSQL, ACID** | **DDIA 2e ch. 3** | Petrov ch. 1 | |
| **M2 · isolation levels & serializability** | **DDIA 2e ch. 8** ⭐⭐ | Petrov **ch. 5** · Vitillo ch. 12 | ⚠️ **Derive from the ANSI Critique paper FIRST**, then read DDIA, then drill **Hermitage**. Requires **M0** done. |
| **M2 · MVCC** | **DDIA 2e ch. 8** *(Snapshot Isolation / MVCC)* | — | ⚠️ For **real** tuple visibility the syllabus wants **`interdb.jp/pg` ch. 5**, not a book he owns. |
| **M2 · B-tree vs LSM** ⭐ | **DDIA 2e ch. 4** *(get the TRADE first)* | **Petrov ch. 2 + ch. 7** *(get the MECHANISM)* | ⚠️ **Order matters.** Petrov-first drowns him in slotted pages before he owns the trade-off. |
| **M2 · WAL** | **Petrov ch. 5** *(Recovery)* | DDIA 2e ch. 6 *(WAL shipping)* | ⚠️ Petrov = general/ARIES. **Postgres's real WAL is `interdb.jp/pg` ch. 9.** |
| **M2 · indexing** | **DDIA 2e ch. 4** | Petrov ch. 4 | ⚠️ The developer-side view — *"Use The Index, Luke"* (free) — **beats both** for actually writing queries. |
| **M2 · replication · partitioning · sharding** | **DDIA 2e ch. 6 + ch. 7** ⭐⭐ | Petrov ch. 11 · Vitillo ch. 16 | ⚠️ Use the 2e's word: **sharding** (1e said *partitioning*). |
| **M2 · CAP and PACELC** | DDIA 2e **ch. 10** *(CAP)* · Petrov **ch. 11** | — | ⚠️ **Neither book gives PACELC.** **Abadi's paper is mandatory** — *Else → Latency vs Consistency*. |
| **M3 · caching, cache-aside, eviction** | **Vitillo ch. 20** *(+ ch. 14 HTTP caching)* | — | ⚠️ **The depth is not in a book he owns** — Redis's own current docs + the **Memcache NSDI'13 paper**. |
| **M3 · hot keys / stampede** | **DDIA 2e ch. 7** *(Skewed Workloads & Hot Spots)* | Scaling Memcache paper | Same beast as sharding's hot spots — **teach as one idea, two places.** |
| **M4 · percentiles, p99, load** | **DDIA 2e ch. 2** ⭐ | — | **Read before any HLD mock.** |
| **M4 · consistent hashing** | **DDIA 2e ch. 7** | Dynamo paper | |
| **M4 · rate limiting** | **Vitillo ch. 28** ⭐ *(+ constant work)* | Metastable Failures paper | |
| **M4 · estimation** | — *(napkin-math)* | APOSD ch. 20 | ⚠️ Trap #2: **Jeff Dean's numbers are ~2010, several wrong by 10×.** |
| **M5 · THE BRIDGE FROM MODULE 1** | **DDIA 2e ch. 9** ⭐⭐ *("The Limitations of TCP")* | Petrov ch. 8 | ⭐ **Teach it as the payoff for banked atoms 1.4–1.6.** TCP retransmission is *why* a slow machine is indistinguishable from a dead one. |
| **M5 · fallacies · failure detectors** | **Petrov ch. 8 + ch. 9** *(phi-accrual)* | Vitillo ch. 6–7 | Petrov wins here; DDIA has no phi-accrual. |
| **M5 · clocks — Lamport, vector** | **Vitillo ch. 8** ⭐ *(derive)* | **DDIA 2e ch. 10** *(deepen: HLCs)* | |
| **M5 · consistency models** | **DDIA 2e ch. 10** | Petrov ch. 11 · Jepsen's lattice | |
| **M5 · quorum (R+W>N)** | **DDIA 2e ch. 6** *(Leaderless)* | **Petrov ch. 12** *(read repair, hinted handoff, Merkle)* | ⭐ Petrov ch. 12 = the Dynamo paper's machinery. |
| **M5 · consensus · Raft · Paxos** | **DDIA 2e ch. 10** | **Petrov ch. 14** *(best Paxos in any owned book)* · Vitillo ch. 9–10 | ⚠️ **Reading about Raft does not install Raft.** raft.github.io viz + **the MIT 6.824 lab**. Petrov's Raft section is thin. |
| **M5 · CRDTs** | **Vitillo ch. 11** | DDIA 2e ch. 6 · Petrov ch. 11 | |
| **M6 · Kafka internals · the log** | **DDIA 2e ch. 12** ⭐⭐ *(Log-Based Message Brokers)* | Kafka Design docs | Read **after** Kreps' "The Log" (⚠️ **archive link only** — the LinkedIn URL is dead). |
| **M6 · delivery semantics · exactly-once** | **DDIA 2e ch. 12** + **ch. 8** *(Exactly-Once Message Processing)* | **Vitillo ch. 23** | ⭐ *"Exactly-once is a lie without idempotency"* — **straight back to banked atom 1.10.** |
| **M6 · backpressure** | **DDIA 2e ch. 12** *("When consumers cannot keep up with producers")* | Vitillo ch. 23 *(Backlogs)* | |
| **M7 · object/blob storage** | **Vitillo ch. 17** | DDIA 2e ch. 11 *(Object Stores)* | One of the only owned-book treatments of blob storage. |
| **M7 · columnar storage** | **DDIA 2e ch. 4** *(Column-Oriented Storage)* | Petrov ch. 1 | Ties to his ClickHouse work. |
| **M8 · SLI/SLO/error budgets** | **Vitillo ch. 31** ⭐ | Google SRE Book | Vitillo is tighter and more actionable — **read it first.** |
| **M8 · tracing, logs, metrics** | **Vitillo ch. 32** ⭐ | Brendan Gregg | |
| **M8 · cascading failures, incidents** | **Vitillo ch. 24** ⭐ | Google SRE ch. 21–23 | |
| **M9 · security, TLS in depth** | — | Vitillo ch. 3 | ⚠️ **Owned books are weak on security.** OWASP + RFC 8446. |
| **M10 · CI/CD, canary, 12-factor** | **Vitillo ch. 30** | 12factor.net | |
| **M10 · service discovery, mesh** | **DDIA 2e ch. 5** · **Vitillo ch. 22** | — | |
| **M11 · HLD framework, requirements** | **DDIA 2e ch. 2** ⭐ *(nonfunctional requirements)* | DDIA 2e ch. 1 | ⚠️ ❌ **NOT Grokking** (§8). |
| **M12 · APOSD — read FIRST** ⭐ | **Ousterhout — the whole 1e, 190pp** | free 2e extract (**for ch. 6**) | ⭐ Priority chapters: **2, 4, 5, 7, 10, 14**. |
| **M12 · deep vs shallow modules** | **Ousterhout ch. 4** ⭐⭐ | ch. 6, ch. 8 | |
| **M12 · information leakage** | **Ousterhout ch. 5 + ch. 7** ⭐⭐ | Fowler **ch. 7** *(mechanics)* | 🎯 **Ousterhout ch. 7 is layer-fusion in LLD form. Prescribe it deliberately.** |
| **M12 · tactical vs strategic** | **Ousterhout ch. 3** | — | |
| **M12 · refactoring as named moves** | **Fowler ch. 1–4**, then the catalog | refactoring.com/catalog | ⚠️ **The free catalog has the NAMES; only the book has the MECHANICS.** That's what he paid for. |
| **M12 · code smells (the term drill)** | **Fowler ch. 3** ⭐⭐ | — | ⚠️ **He must FEEL the smell and name it himself first.** A smell list handed over is a smell list forgotten (`TEACHING_LOG.md` Entry 003). |
| **M12 · SOLID & patterns as heuristics** | **Ousterhout ch. 19** *(inoculation)* → **Fowler ch. 11–12** *(patterns DERIVED)* | Refactoring.Guru (TS) | ⚠️ ❌ **NOT Clean Code** (§8). ⚠️ Half of GoF collapses into closures in TS. |
| **M12 · define errors out of existence** | **Ousterhout ch. 10** ⭐⭐ | **Fowler ch. 10** *(Introduce Special Case)* | ⭐ **Same idea, two books.** And it is the same idea as **idempotency (banked 1.10)** at a lower altitude. **Show him the edge.** |
| **M13 · Saga · outbox pattern** | **Vitillo ch. 13** ⭐⭐ | DDIA 2e ch. 13 | ⭐ The best Saga/outbox treatment he owns. |
| **M13 · CQRS · event sourcing** | **DDIA 2e ch. 3** *(Event Sourcing and CQRS)* + **ch. 13** | — | |
| **M13 · 2PC and why it's avoided** | **DDIA 2e ch. 8** *(Two-Phase Commit)* | **Petrov ch. 13** *(2PC/3PC/Calvin/Percolator)* | |
| **M13 · idempotency at scale** | **DDIA 2e ch. 13** ⭐⭐ *("Uniquely identifying requests")* | — | ⭐⭐ **The payoff chapter.** Banked atom **1.10** returning, 12 chapters later, at distributed scale. **Save it. It closes the loop.** |
| **Project 3 — Redis clone** | Petrov ch. 1, 3, 4 | Redis current docs | |
| **Project 4 — Kafka-lite** | **DDIA 2e ch. 12** · Petrov **ch. 7** *(segmented log)* | Kafka Design docs | |
| **Project — circuit breaker / rate limiter** | **Vitillo ch. 27 + ch. 28** ⭐ | AWS Builders' Library | |

---

## Traps carried forward from `REFERENCES.md` §7 — the ones that touch these books

1. ⚠️ **DDIA 1e (the PDF) is superseded by the 2e (the EPUB).** Where they differ, the 2e wins. **Chapter numbers differ from ch. 6 onward** — always say which edition.
2. ⚠️ **1e "Partitioning" = 2e "Sharding."** Use the **2e's** word. Given term decay, teaching him a name the industry retired is a self-inflicted wound.
3. ⚠️ **No book he owns teaches TLS 1.3** — and TLS is his live debt. **tls13.xargs.org + RFC 8446.** Vitillo ch. 3 is five pages and is a summary, not a derivation.
4. ⚠️ **Neither DDIA nor Petrov gives PACELC** — only CAP. **Abadi's paper is mandatory.**
5. ⚠️ **Petrov's Raft is thin and his leader-election chapter is dated.** Do the **MIT 6.824 Raft lab**; reading is not implementing.
6. ⚠️ **Petrov's WAL is generic/ARIES.** Postgres's real WAL is **`interdb.jp/pg` ch. 9**.
7. ⚠️ **APOSD 1e is fine** — the 2e's delta is one chapter + a reworked ch. 6, **and the author gives it away free**. Don't re-buy.
8. ⚠️ **Fowler's free catalog has the names but NOT the mechanics.** The mechanics are the book. That is the whole reason to have it open.
9. ⚠️ **DDIA 2e has a Glossary — do NOT hand it to him as a reading assignment.** Reading a term does not install it; only **retrieving** it does (§4, and `TEACHING_LOG.md` Entry 003, which is the *exact* mistake, already made once).
