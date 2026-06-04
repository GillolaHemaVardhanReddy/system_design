# DNS & Addressing (name → IP → which program)

> Topic of the day: **"What happens when you type google.com and press Enter?"**
> Covered: the first half — getting from a name to an established, reliable connection.
> Status: Learned. Needs one cold-recall revision pass before "mastered."

---

## The big picture (where today fits)

The full journey, with today's progress marked:

1. Browser parses what you typed — *(lightly touched)*
2. **DNS: name → IP** — ✅ done
3. **Port: scheme → 443** — ✅ done
4. **Routing (IP → machine) + demultiplexing (port → program)** — ✅ done
5. **TCP: establish a reliable connection** — ✅ done
6. TLS handshake (because `https`) — ⬜ next
7. HTTP request / response — ⬜
8. Browser renders — ⬜

One-line mental model for the whole first half:
**Name → address → which program → reliable conversation.**

---

# Part 1 — DNS (name → IP)

## The core problem
You typed a human name (`google.com`). The internet routes on **IP addresses** (numbers), not names. So before anything else, the browser must translate name → address. That translation layer is **DNS**.

## Why not just store the whole map on every device?
Two fatal problems (both derived, not memorized):

- **Discovery:** a domain created elsewhere never reaches your local copy. You can't look up a key that was never delivered to you.
- **Propagation:** keeping billions of copies in sync, in real time, costs more than the work itself. The syncing *becomes* the bottleneck.

This is why **push-everything-to-everyone** fails at internet scale.

## The fix: pull on demand + cache
- **Pull on demand:** store nothing up front. When you actually need a name, ask someone who knows, right then.
- **Cache near the user:** the first lookup is expensive (a *cache miss*); save the answer locally so the next is nearly free (a *cache hit*).
- **Physics to remember:** *distance = latency.* You can't beat the round-trip time to a faraway server; you can only avoid paying it repeatedly. That's what the cache buys.

## Splitting the map: hierarchy + delegation
One central server is unacceptable (overload + latency + total-outage risk). So split the map across many servers. Navigate using the **structure of the name itself**, read **right-to-left** (`google.com` → look at `.com` first).

Key idea: a directory doesn't hand you the final answer — it **points you one step closer**. That chain of "ask, get pointed closer, ask again" is **delegation**. Each tier stays deliberately ignorant of the tier below it. (If the root knew every domain's IP, it would have to hold the whole map = back to one giant server.)

## The four players (in order)

| Player | Real-world identity | Its one job |
|---|---|---|
| **Resolver** (recursive) | Your ISP's resolver, or public `8.8.8.8` / `1.1.1.1`. **Not** your laptop — your laptop just asks it. | Runs the whole walk for you; caches answers. |
| **Root servers** | 13 identities (A–M), run by ~12 orgs (Verisign, ICANN…). Their IPs are **hardcoded** into every resolver. | Knows who runs each TLD. Knows nothing about individual domains. |
| **TLD servers** | `.com`/`.net` → Verisign; `.in` → India's registry. | Knows which authoritative server handles each domain under its suffix. |
| **Authoritative server** | The domain's own / its DNS host (Google's `ns1.google.com`; or Cloudflare, AWS Route 53, GoDaddy). | Holds the real records. Source of truth. |

## The walk (cold cache, real names)
> Laptop → resolver (`8.8.8.8`) → root ("who runs `.com`?" → Verisign) → `.com` TLD ("who's authoritative for google.com?" → `ns1.google.com`) → Google's authoritative server (→ the IP). Resolver caches it with a TTL.

## The bootstrap (chicken-and-egg)
You can't use DNS to *find* DNS. Solved by: **root server IPs are hardcoded** — shipped inside the software. You're "born knowing" those numbers; everything else unfolds from them.

## TTL — the freshness tradeoff
Every answer is stamped with a **TTL** (time-to-live): "trust this for N seconds." This resolves the original propagation worry — the system never promises everyone is *instantly* correct, only correct *within a TTL*.

- Short TTL → fresher data, more lookups.
- Long TTL → fewer lookups, but risk serving a **stale** answer after a change.

**Stale ≠ error.** A stale cache points you at the *old* address. What happens depends on what's there:
- Old server torn down → connection refused/timeout → looks down (loud failure).
- Old server still running → you silently reach the *old* box (quiet failure — often more dangerous).

**Planned migration playbook:** days before a change, **lower the TTL** (e.g. to 60s). Then flip the IP. Keep the **old server alive** during the drain so stale lookups still work. Once caches expire, retire the old server. Afterward, raise the TTL back.

**TTL judgment:** match TTL to change frequency.
- Rarely changes (yearly) → long TTL is fine.
- Changes several times a day → short TTL (~60s) so caches catch each change.
- **Asymmetry (the real lesson):** too-short TTL = *safe but wasteful* (extra lookups). Too-long TTL = *efficient but dangerous* (long stale windows, users hitting dead IPs). **When unsure, err short.**

---

# Part 2 — Addressing the right program (port)

## The problem
An IP gets you to the right **machine**. But one machine runs many programs (web server, SSH, mail…) behind one IP. Which program is the traffic for?

## The fix: ports
- A machine has **ports** (0–65535). Each program **listens** on a port.
- **IP : port** together = the full coordinate (a **socket address**), e.g. `142.250.x.x:443`.
- Analogy: **IP = building address, port = apartment number.**

## Where each piece comes from (don't fuse these!)
- **IP → from DNS** (the walk above).
- **Port → from convention**, not DNS. The URL **scheme** decides it:
  - `https://` → **443**
  - `http://` → **80**
  - (SSH 22, mail 25, etc.) These are **well-known ports** — a global agreement.
- The one word that picked the port the instant you pressed Enter: **`https`**.

## How the machine routes to the right program
- The **destination port is written *inside* every packet** (in its header), alongside the destination IP. The client *declares* it.
- **Routers** read the **destination IP** → deliver to the right *machine*.
- The destination machine's **OS** reads the **destination port** → hands the packet to the program listening there. This sorting is called **demultiplexing**.
- The **domain name plays no role** in this step. The kernel sees a number (443), not a name.

---

