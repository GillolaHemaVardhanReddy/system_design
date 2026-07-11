# Behavior & Learning-Style File
> How Hema learns best. Jimmy updates this whenever a teaching approach clearly works or fails, then adapts future lessons. This is about LEARNING BEHAVIOR, not topic knowledge.

## ⭐ THE GOVERNING LAW (S5, 2026-07-11) — everything else follows from this
> ### What he DERIVES, survives. What he is HANDED, rots.

After a **29-day gap**: every **concept** he had derived came back intact (he rebuilt fast retransmit from scratch, and destroyed his own wrong discriminator with a counterexample). Every **term** he had merely been *given* was gone — head-of-line blocking, fast retransmit, RTO, exponential backoff; he called the **CA** "the middle man." **He understands the machinery and cannot name the parts.**

**This is not two facts, it is one.** Terms rotted **because terms were the one thing never derived**. The behaviour note below said "learns by deriving" from Session 1 — and nobody drew the consequence for vocabulary.

**Therefore: derive the terms too.** Name-at-birth (CLAUDE.md §4) — he derives the mechanism, **he christens it himself**, then he gets the real name **with its etymology** (*head of the **line** → **blocking***), then he **uses it in a working sentence**. He must be able to **regenerate** a term, never store it.

**Two corollaries, both proven the hard way on 2026-07-11:**
- ❌ **Giving him a document does not work.** He was handed `BIBLE.html` with fast retransmit in a red trap-box *and* a decision-tree diagram — and 20 minutes later said *"I don't know what the other mechanism is."* **Reading a term does not install it. Only retrieving it does.** → this is what `/terms` exists for.
- 🔎 **His "answering around the question" habit is largely a SYMPTOM of the term gap.** He is **reaching for a word that isn't there**, and description is the fallback. Fix the vocabulary and much of the evasion should go with it. **He also believed the names were arbitrary** (*"who in their right mind would come up with head-of-line blocking"*) — showing him the etymology visibly changed his stance. **Never present a term as a label.**

---

## Learning style (observed)
- **Learns by deriving, not receiving.** Constraint-first Socratic prompts work far better than lectures — he reconstructed DNS, TCP, and TLS himself when handed the constraint and asked to design. **(See the governing law above: this applies to TERMS as much as to concepts.)**
- **Wants the visual AFTER the depth (S5, his own request).** In-depth Socratic teaching first, *then* an HTML page + a video reference to consolidate. He explicitly asked for this. `/visual` + `/references` are now part of the standard loop.
- **Wants progressive disclosure, not less content (S5).** *"I want all the content… but it's too huge… I want clarity and depth and easy to understand."* Not a contradiction — solved by **layering** (3-line spine → plain English → depth on demand), never by cutting. Plain-English-before-jargon lands hard; keep the postcards/live-match/paint-mixing/light-switch analogies.
- **Self-diagnoses accurately and asks for the system to adapt (S5).** He identified his own term-loss before it was fully named, and asked what should change in `.claude/` to fix it long-term. **Treat him as a collaborator on the method, not just its subject** — he engages with the meta-level and it motivates him.
- **Analogies are high-leverage.** Postal/postcards (TCP), apartment+building (ports), paint-mixing (Diffie–Hellman), police-ID (certificates) all landed. Reach for a concrete physical analogy before formal mechanics.
- **Needs the "why it exists" before the "how".** Motivate every mechanism with the problem it solves first.
- **Generalizes well** once a pattern clicks (transferred redundancy DNS→GoDaddy; spotted the MITM hole before being shown). Reward and name transfers.

## Where he stalls
- **Abstract terms without a concrete referent** (asked "what is a resolver in the real world?"). Always ground new vocab in a real entity/company.
- **Under recall pressure he over-extrapolates** ("the next two players must do X") and states guesses as conclusions → layer-fusion. Coaching response: ask him to **label guesses** ("I think X, unsure") and to list actors-in-order before answering cross-layer questions.
- **Retreat-to-structure under pressure (S2):** when asked for a *specific decision* (which method? which status code?), he re-describes the message skeleton instead of committing. Coaching response: refuse the restatement, demand the specific ("numbers and a word, not a paragraph"). He then produces it correctly — evasion-under-pressure habit, not a knowledge gap.
- **Fusion has a precise trigger (S2):** when the answer "lives in a header / request-line field," he names the *protocol* ("http") instead of the *actor* who writes it. Isolating the trigger made it fixable.
- **Frustration spikes mid-success (S2):** dipped emotionally ("you're asking vague questions / mango farm," "I'll be screwed in interviews") at the exact moments he was answering *correctly*. Coaching response: stop and name the concrete win to re-anchor him ("that answer was right — that IS the method") before continuing.
- **Over-drilling fatigue after a correction (S4):** once he has *corrected* an error, continued piecemeal poking on the same point reads as "over-testing" ("you keep on over testing me") even when the next poke is finding a real new error. Coaching response that worked: stop the drip, **name what the drilling just bought**, and consolidate into one clean **uninterrupted re-gate** ("you've earned a clean shot — 5 questions, no interruptions"). He accepted this immediately and then passed. Reward-frame the gate as a payoff, not more poking.

## What fixes the fusion (proven S2)
- **Rapid-fire "name the actor" drill** — give a job, demand a one/two-word actor, ban protocol names. Broke the reflex in ~6 reps; by rep 15 he reached for a human actor ("coder") instead of "http." Re-run as a warm-up/spot-check on every new layered topic.
- Anchor that landed: **"HTTP is paper; the hand that writes it is the actor."**

## What works for verification
- Cold recall the next session catches fusion reliably. Keep doing it.
- He self-diagnoses well when shown the contradiction in his own answers (e.g. "you said retransmit in Q2 but terminate in Q1").

## Pacing
- High engagement; willing to push past one topic per session — but retention depends on cold-recall gating, so keep gates strict regardless of his eagerness to move.

## Motivation notes
- Responds to honest, specific acknowledgment of real wins; do not pad with empty praise. Naming the shrinking trend of his blind spot motivates him.
- **Detects shallow coverage and respects honesty about it (S4):** flagged unprompted that "you never explained TLS this depth" — accurate. He can tell waved-through from truly-taught, and trusts the process more when Jimmy *owns* the coverage gap ("TLS was marked banked with no logged gate — that's why I demoted it") rather than defending. Lesson: never wave a topic through; he will notice the debt later, and naming it honestly buys credibility.
