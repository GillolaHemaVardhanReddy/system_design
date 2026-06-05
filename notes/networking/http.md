# HTTP — Giving the Pipe Meaning

> Where this fits: after **TCP** built the reliable pipe and **TLS** encrypted it. The pipe can now carry bytes safely — but nothing has yet said *what you want*. HTTP is the language spoken **through** the pipe.
> Status: Learned, signed off cold (gate passed Session 2). Open residual: safe-vs-idempotent precision (revise +3d). Revise with the cold-recall questions at the bottom.

---

## 1. The problem: a pipe carries bytes, not meaning

TCP delivers an ordered, reliable byte stream; TLS scrambles it from eavesdroppers. But TCP/TLS are **dumb couriers** — they move bytes and have no idea what those bytes *mean* or what the receiver should *do* with them.

So far, the server has a connection from you and… silence. It doesn't know if you want the homepage, want to log in, want to delete your account. **HTTP is the agreed format for saying what you want and hearing how it went.** Without it, the server gets your bytes perfectly and still has no instructions.

**Layer discipline (the blind-spot fix):** HTTP is a **message format** — *paper*. It never *does* anything. The **browser** writes the request; the **server** reads it, routes it, acts, and writes the response. *Protocol ≠ actor: HTTP is paper, the browser/server is the hand that writes on it.*

---

## 2. The request — what the browser sends

Derived from need (not memorized). The server doesn't yet know: **what action**, **which resource**, **how to parse you**, and **extra context**. So:

```
GET /search HTTP/1.1          ← request line
Host: google.com              ┐
Accept-Encoding: gzip         ├ headers (Key: Value per line)
Cookie: session=ab12          ┘
                              ← blank line  (terminates headers)
<body — usually empty for GET>
```

**Request line = three parts, each from a real need:**
- **method** (`GET`) — *what action* (fetch / submit / update / delete). The server can do many things; it can't guess which.
- **path** (`/search`) — *which resource*. The server holds thousands of things; this names one. (Path is **what the browser writes**; *routing* — matching it to handler code — is the **server's** job. Don't fuse path with route.)
- **version** (`HTTP/1.1`) — *how to parse the rest of me*. 1.1 is text; 2 is binary frames. A parsing contract declared up front.

**Headers** = open-ended key-value metadata. Reasoned out before being told: `Host:` (which site, when many share one IP), `Accept-Encoding: gzip` (I can decompress), `Cookie:` (I'm logged in as…).

**Blank line** = unambiguous terminator so the server (reading the stream byte-by-byte) knows where headers end and body begins. `Content-Length` then says how many body bytes to read.

**Body** = uploaded data. `GET` usually has none (just fetching); `POST`/`PUT` carry one.

---

## 3. The response — what the server sends back

Symmetric skeleton. The one new thing: the server must report **how its attempt went**, machine-readably.

```
HTTP/1.1 200 OK               ← status line (version · code · text)
Content-Type: text/html       ┐
Content-Length: 8141          ├ headers
                              ┘
                              ← blank line
<!doctype html>...the page... ← body
```

**Why a status *number*, not English?** Everything is bytes to a machine — so "it's numbers underneath" is *not* the reason. The real reason: a code is a **small, fixed, agreed-upon enumeration**. `404` means exactly one thing everywhere, in every language — `if (status === 404)` is one exact integer compare. English is open-ended prose (infinite phrasings, languages, typos) — unbranchable. Numbers are just the most compact enumeration.

**Content-Type** = a body-interpretation contract. A body is *just bytes*; bytes have no inherent type. The same bytes could be HTML (render), JPEG (paint), JSON (hand to JS), PDF (download). Without `Content-Type` the browser can't know how to read them. (Same *kind* of thing as the request-line version — "here's how to read what comes next" — applied to the body.)

---

## 4. Status code families — the first digit assigns blame

```
1xx  informational   "still working, hold on"            (rare)
2xx  SUCCESS         200 OK · 201 Created · 204 No Content
3xx  REDIRECT        301 moved · 302 found · 304 not-modified
4xx  CLIENT error    400 bad · 401 unauth · 403 forbidden · 404 not found · 429 too many
5xx  SERVER error    500 internal · 502 bad gateway · 503 unavailable · 504 timeout
```

**The headline idea — 4xx vs 5xx is about *whose fault*:**
- **4xx = the client screwed up.** Retrying the *same* request is pointless (`404` stays `404`; `401` stays until *you* add credentials). Fix is on the client side → **don't blindly retry.**
- **5xx = the server screwed up.** The request may have been fine; the server had a bad moment. → **retry with backoff**, page on-call on 5xx spikes, alert dashboards on **5xx rate** (not 4xx). A wall of 404s = users typo URLs; a wall of 500s = *you're on fire*.

**Pair not to fuse:**
- **401 Unauthorized** = "I don't know *who you are*" (not logged in / no valid token).
- **403 Forbidden** = "I know exactly who you are, and you're **not allowed**."

---

## 5. Method semantics — safe ⊂ idempotent ⊂ everything

Two properties, defined by what happens when you run an operation **more than once**:

- **Safe** = changes **no** server state at all (pure read). Call it a million times, server untouched.
- **Idempotent** = state *may* change, but **running it N times leaves the same end state as running it once.**

```
SAFE  ⊂  IDEMPOTENT  ⊂  everything
─────────────────────────────────────────────
GET     →  safe + idempotent   (reads; changes nothing, ever)
PUT     →  idempotent only     (set name="Hema" twice → still "Hema")
DELETE  →  idempotent only     (delete /x twice → still gone)
POST    →  neither             (each call creates new state → duplicates)
```

- Every **safe** method is idempotent; not every idempotent method is safe. **POST is neither.**
- **Idempotency = same end STATE, not the same response.** A 2nd `DELETE /x` often returns **404** ("already gone") — still perfectly idempotent, because *server state* is unchanged. Don't equate "same status code" with idempotent.
- **CRUD mapping:** GET read · POST create · PUT update (set to known state) · DELETE remove. But choose the method by its *property*, not just its role.

**Design warning (the money-transfer trap):** never put a state change behind `GET`. GET is supposed to be *safe*, so browsers, proxies, crawlers, and prefetchers **fire GET URLs freely and automatically**. `GET /transfer?amount=500` could move money with nobody clicking — and since a transfer is **not idempotent**, each auto-retry moves the money *again*.

---

## 6. Failure + recovery — timeout, no response

The client sent a request; **nothing comes back** (or the connection drops mid-body). It can't tell whether the server (a) never got it, or (b) did the work and the *reply* got lost.

- **Detect (silence):** a client-side **timeout** — if `now − sent > timeout`, stop waiting.
- **Detect (truncation):** compare **bytes received vs `Content-Length`**; mismatch = incomplete body.
- **Recover — can I just retry?**
  - **Idempotent methods (GET / PUT / DELETE) → retry blindly.** Repeating lands the same end state, so no harm. (Retry-safe = **idempotent**, *not* just "safe" — this is broader than GET alone.)
  - **POST → NOT safe to blind-retry** (duplicate order). Fix: attach an **idempotency key** — a unique id on the request; the server records keys it has processed and, on a retry with the *same* key, returns the original result instead of acting again. (This is a **POST** tool — *not* a GET feature.)

---

## 7. Placement in the whole google.com walk

```
name → IP (DNS)
     → port 443 (browser, from `https`)
     → routed to machine (routers)        ← IP layer
     → TCP 3-way handshake                 (TCP first — builds the pipe)
     → TLS: identity → key exchange → encryption   (then TLS — encrypts it)
     → HTTP request (browser writes: method·path·version·headers·body)
     → server routes path → acts → writes response (status·headers·body)
     → browser renders the HTML            ← next atom
```

Five-plus actors, one job each, in order — relay race, not a scrum.

---

## 8. One-line recall anchors

- **Pipe carries bytes; HTTP carries meaning.** TCP/TLS are dumb couriers.
- **Protocol ≠ actor:** HTTP is paper; the browser/server is the hand that writes it.
- **Request line = method · path · version** = *what action · which resource · how to parse me.*
- **Path is written by the browser; routing is done by the server.** Don't fuse them.
- **Blank line** terminates headers; **Content-Length** sizes the body; **Content-Type** says how to interpret the body.
- **Status = a small fixed enumeration**, not English (machine-branchable).
- **First digit = blame:** 4xx your fault (don't retry) · 5xx server's fault (retry+backoff, page on-call).
- **401** = who are you? · **403** = I know you, you're not allowed.
- **safe ⊂ idempotent ⊂ all:** GET safe+idempotent · PUT/DELETE idempotent · POST neither.
- **Idempotent ⇒ blindly retry-safe; POST needs an idempotency key.** Idempotency = same end **state**, not same status code.
- **Never hide a state change behind GET** — it gets auto-fired and auto-retried.

---

## 9. Cold-recall questions (no notes)

1. The TCP+TLS pipe is up. What does HTTP add that the pipe alone can't give you?
2. Derive the three parts of the request line from need — what does each tell the server, and why is it required?
3. Path vs route — which does the browser produce and which does the server do?
4. Why is a numeric status code better than an English sentence for a machine? (Careful: not "machines only understand numbers.")
5. Why must a response carry `Content-Type` on *every* response, not just errors?
6. What does the first digit of a status code encode? Contrast 4xx vs 5xx in terms of *who's to blame* and *what the client should do.*
7. 401 vs 403 — one line each.
8. Define **safe** and **idempotent**. Which of GET/POST/PUT/DELETE is which, and why is POST the odd one out?
9. After a timeout with no response, which methods can you blindly retry and why? What do you bolt onto a POST to make it retry-safe — and where does it live (client or server)?
10. Your teammate wants `GET /transfer?amount=500` "for easy testing." Give two distinct reasons it's wrong, one grounded in method semantics.
