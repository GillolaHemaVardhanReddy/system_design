# The Deployment Stack — how every build reaches the real internet
> Researched **2026-07-14 (S8)**, from primary sources. **Re-verify before spending money — free tiers change, and AWS's changed in 2025.** Never quote a learner cloud pricing from memory.

## The rule this file serves
> ### LOCALHOST IS A TOY.
> A DNS resolver on `localhost` is a toy. A DNS resolver answering **real queries** for a domain **he owns**, on a **public IP**, with a **real certificate**, is engineering. Atoms 1.3, 1.9, 1.15 and 1.16 stay theoretical until this is true.

---

## ✅ THE STACK — total cost **$2–11/year, all-in**

| Piece | Choice | Cost |
|---|---|---|
| **Compute** | **Oracle Cloud — Always Free VM** | **$0** |
| **Domain** | **Porkbun `.xyz`** ($2.04 yr 1) or **`.uk` $5.66 flat** or **Cloudflare `.com` ~$10.44** | **$2–11/yr** |
| **DNS** | **Cloudflare** (free) | **$0** |
| **TLS** | **Let's Encrypt** | **$0** |

---

## ⛔ AWS: DO NOT USE IT FOR AN ALWAYS-ON BOX. It is now a trap.
**The free tier changed on 2025-07-15.** For any account created after that date:
- You get **$100 credits** (up to $200 with tasks) — **not** the old 12 months of 750h `t2.micro`. **That tier is gone for new accounts.**
- The **Free plan ends at 6 months OR when credits run out** — and then **your account is automatically closed.** (90 days to upgrade before data deletion.)
- An always-on EC2 instance **eats the credits and then kills the account.**
- **Route 53 is not free:** **$0.50/hosted zone/month, not prorated** = **$6/yr per domain**, for a job **Cloudflare does for $0.**

An **always-free** tier does still exist (Lambda, DynamoDB 25GB, CloudFront 1TB/mo) — fine for serverless, **useless for a box he can `tcpdump`.**

## ⛔ And avoid these too — for a *pedagogical* reason, not a price one
| Platform | Why not |
|---|---|
| **Cloudflare Tunnel** | Free and unlimited — but **TLS terminates at Cloudflare's edge, not on his box.** The handshake isn't his. **For a learner studying TLS 1.3 that defeats the entire purpose.** |
| **Render** | Free tier real (750 hrs/mo), managed TLS on free instances — but **Render owns the cert and the termination**, and it **spins down after 15 min idle.** Same problem. |
| **Fly.io** | **No free tier since 2024-10-07.** ~$2.02/mo minimum. |
| **Railway** | **No free tier.** $5 one-time 30-day trial. |

> ★ **The pedagogical filter:** if the platform terminates TLS *for* him, he cannot watch **his own handshake** in `tcpdump`, and atom 1.9 stays a story. **Only a real VM he controls passes.**

---

## Compute — Oracle Cloud Always Free
**The only genuine always-on free VM with a real public IPv4.**
- 2× AMD `E2.1.Micro` (1/8 OCPU, 1 GB RAM, **public IP each**) **+** Ampere A1 ARM.
- 200 GB block storage · **10 TB/mo egress** · 1 load balancer.

**Three real gotchas — tell him BEFORE he signs up:**
1. ⚠️ **A1 ARM was silently halved on 2026-06-15** — 4 OCPU/24 GB → **2 OCPU/12 GB**. No announcement.
2. ⚠️ **"Out of host capacity"** on A1 is chronic in US regions. **EU/APAC provision in minutes.** The **AMD micro shapes are far easier to get** — start there.
3. ⚠️ **Idle reclamation:** a free VM whose 7-day 95th-percentile CPU **and** network **and** memory are all under 20% can be **reclaimed**. Keep something running.
4. Card required for identity verification (not charged on Always Free).

## Domains — Porkbun (flat pricing, no bait-and-switch)
| TLD | Year 1 | Renewal |
|---|---|---|
| **`.xyz`** | **$2.04** | $12.98 |
| **`.uk` / `.co.uk`** | **$5.66** | **$5.66** ← cheapest *sustainable* |
| `.org` | $7.98 | $11.84 |
| `.dev` | $8.75 | $12.87 |
| `.com` (Cloudflare, at-cost) | ~$10.44 | ~$10.44 |

⚠️ **Trap:** `.site` / `.online` are **$1.96 year 1 and $28.84 to renew.** Namecheap's $5.98 `.com` is the same bait.

## TLS — Let's Encrypt (free, and it got better in 2026)
- Rate limits: 50 certs/domain/week · 5 duplicate certs/week · 300 new orders/3h. **Use the staging environment while iterating** or he will burn the limit.
- **★ NEW (GA 2026-01-15): certificates for bare IP ADDRESSES**, and **6-day short-lived certs** (`shortlived` ACME profile).
  → **He can get a real, publicly-trusted cert on a public IP with NO DOMAIN AT ALL.** That is a $0 path to a real handshake, and it did not exist a year ago.
- OCSP responders were **shut down in Aug 2025** — if a tutorial mentions OCSP stapling as current, **it is stale.**

---

## Two shapes, pick by budget
1. **$0.00** — Oracle Always Free VM + **Let's Encrypt IP certificate**. Real public IP, real handshake he terminates himself, **no domain needed.**
2. **$2–11/yr** — Oracle VM + Porkbun `.xyz`/`.uk` + Cloudflare DNS + Caddy or nginx + Let's Encrypt. **Recommended** — a domain makes atom 1.3 (DNS) real, and you cannot serve DNS for an IP.

## Could not verify — check before relying on
- AWS's exact always-free per-service limits (their page now says only "30+ services").
- Whether AWS *explicitly* retired the 12-month tier (inferred from doc structure; never stated outright).
- Cloudflare Registrar's exact `.com` price from a Cloudflare-owned page, and whether it forces Cloudflare nameservers.
- Whether Oracle **PAYG** accounts keep the old 4 OCPU/24 GB free allowance (support says yes, docs say no).
