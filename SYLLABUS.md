# SYLLABUS — A to Z

> Followed strictly. Each topic passes the Mastery Gate before the next. **⊕** = enrichment beyond the original outline to match real-world depth. Use `/breakdown <module or topic>` to expand any line into teachable atoms.

## A. Foundations (Module 0)
Open-a-website end-to-end · CPU · memory hierarchy (registers→cache→RAM→disk/SSD) · processes · threads · context switching · concurrency vs parallelism · OS basics (scheduling, syscalls, virtual memory) · ⊕ concurrency primitives: locks, mutexes, semaphores, condition variables, producer–consumer, thread-safety, deadlock.

## B. Networking (Module 1) — *in progress*
OSI & TCP/IP models · IP (best-effort) · TCP 3-way handshake ✅ · UDP · DNS ✅ · TLS/HTTPS ✅ · HTTP/1.1·HTTP/2·HTTP/3 · cookies/sessions · reverse proxy · load balancing (L4 vs L7) · WebSockets · gRPC · ⊕ API design depth: REST vs gRPC vs GraphQL, idempotency, pagination, versioning, status-code discipline, retries/timeouts.

## C. Databases (Module 2)
Relational vs NoSQL (KV / document / column / graph) · ACID · transactions · isolation levels & ⊕ serializability · indexing (⊕ B-tree vs LSM-tree, covering indexes) · ⊕ write/read amplification, WAL · query optimization & EXPLAIN · normalization vs denormalization · replication (sync/async, leader-follower) · partitioning · sharding · read replicas · CAP & ⊕ PACELC.

## D. Caching (Module 3)
Why caches exist · cache hierarchy · Redis internals (single-thread, data structures, eviction) · cache-aside / write-through / write-behind / write-around · invalidation & TTL · ⊕ cache stampede / thundering herd / hot keys · distributed cache · consistency of caches.

## E. Scalability (Module 4)
Vertical vs horizontal · stateless vs stateful · load balancers · reverse proxies · CDN · consistent hashing · rate limiting (fixed/sliding window, token/leaky bucket) · ⊕ back-of-envelope estimation drilled hard: latency numbers, QPS/storage/bandwidth math, capacity planning.

## F. Distributed Systems (Module 5)
Fundamentals & fallacies · ⊕ failure detectors · ⊕ clocks (physical, logical/Lamport, vector) · consistency models (linearizable→sequential→causal→eventual) · quorum (R+W>N) · consensus · leader election · Raft · Paxos (overview) · distributed locks · eventual consistency · ⊕ CRDTs (intro).

## G. Messaging (Module 6)
Queues vs pub/sub · Kafka (topics, partitions, offsets, consumer groups, log) · RabbitMQ · event-driven architecture · streaming · ⊕ delivery semantics (at-most/at-least/exactly-once) · ⊕ ordering guarantees, backpressure, dead-letter queues.

## H. Storage (Module 7)
Object/blob storage · file systems · distributed storage (replication, erasure coding) · data lakes vs warehouses · ⊕ columnar storage (ties to your ClickHouse experience).

## I. Observability (Module 8)
Logging · metrics (RED/USE) · monitoring · distributed tracing · alerting (SLI/SLO/SLA, error budgets) · incident analysis · ⊕ real postmortem case studies.

## J. Security (Module 9)
AuthN vs AuthZ · sessions vs JWT · OAuth2 · OpenID Connect · symmetric/asymmetric encryption · hashing & salting · TLS in depth · secrets management · ⊕ common attacks (CSRF, XSS, SQLi, SSRF) at a design level.

## K. Infrastructure (Module 10)
Docker · containers vs VMs · Kubernetes (pods, services, deployments) · service discovery · CI/CD · IaC · ⊕ the Twelve-Factor App · ⊕ blue-green & canary deploys.

## L. High Level Design (Module 11)
Framework first (requirements → estimation → API → data model → architecture → scale → reliability → tradeoffs). Then design & defend: URL Shortener · Pastebin · WhatsApp · Twitter/X · Instagram · Uber · Netflix · YouTube · Dropbox/Google Drive · Swiggy/Zomato · News Feed · Notification Service · Rate Limiter · Web Crawler · Typeahead/Search.

## M. Low Level Design (Module 12)
OOP · SOLID · design patterns (creational/structural/behavioral) · clean architecture · domain modeling · object relationships · UML thinking · refactoring · testability. Problems: Parking Lot · Elevator · BookMyShow · ATM · Splitwise · Chess · Cricbuzz · Snake & Ladder · Vending Machine · Rate Limiter (LLD) · Logging framework · In-memory KV store.

## N. Advanced (Module 13)
CQRS · event sourcing · Saga (orchestration vs choreography) · service mesh · multi-region · global databases · distributed transactions (2PC and why it's avoided) · idempotency & outbox pattern.

## O. Interview Mastery (Module 14)
Mock interviews (escalating) · architecture defense · whiteboarding · requirement clarification · tradeoff articulation · communication · behavioral stories (STAR).

---

## Projects (built alongside; never "finished" — re-refactored as knowledge grows)
1. URL Shortener · 2. Distributed Rate Limiter · 3. Redis Clone · 4. Kafka-lite · 5. Chat App · 6. Notification Service · 7. Search Engine · 8. Recommendation Engine · 9. Video Processing Pipeline · 10. Distributed Job Scheduler.
See `trackers/PROJECT_ROADMAP.md`.
