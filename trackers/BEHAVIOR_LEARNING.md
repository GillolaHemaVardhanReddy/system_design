# Behavior & Learning-Style File
> How Hema learns best. Jimmy updates this whenever a teaching approach clearly works or fails, then adapts future lessons. This is about LEARNING BEHAVIOR, not topic knowledge.

## Learning style (observed)
- **Learns by deriving, not receiving.** Constraint-first Socratic prompts work far better than lectures — he reconstructed DNS, TCP, and TLS himself when handed the constraint and asked to design.
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
