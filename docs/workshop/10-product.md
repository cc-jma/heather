# Product and Agile

- Compile who has tried AI for what and what experiences they had with it.
- Research good use cases for AI in product work using AI
    - select three cases and try them out.
- Set up Claude code for everyday use.
- Set up AI-integration for your local tools.
    - For example, Obsidian with LLM plugin.
- Try BMAD, the product part.

- Post-agile changes due to AI engineering according to McKinsey https://www.youtube.com/watch?v=SZStlIhyTCY

Some ideas...
## Linked-in Post by Benedikt Stemmildt
 
Most teams spend 90 minutes per sprint in refinement. We spend 20.
The difference? We moved 90% of the work to before anyone sits down.

𝗧𝗵𝗲 𝗣𝗿𝗼𝗯𝗹𝗲𝗺:
Refinement meetings exist to clarify requirements, surface blockers, and align the team.

But most of that work doesn't need a meeting. It needs context.

𝗛𝗲𝗿𝗲'𝘀 𝘄𝗵𝗮𝘁 𝘄𝗲 𝗱𝗼 𝗶𝗻𝘀𝘁𝗲𝗮𝗱:

𝟭. 𝗣𝗿𝗲-𝗿𝗲𝗳𝗶𝗻𝗲𝗺𝗲𝗻𝘁 𝗿𝗲𝘀𝗲𝗮𝗿𝗰𝗵

We gave our PM an AI assistant with codebase access.

Before the meeting starts, it:

✅ Analyzes the ticket against existing code
✅ Identifies affected components
✅ Surfaces similar past implementations
✅ Flags potential blockers

PMs get faster tech feedback. Devs spend less time explaining architecture.

👉 𝗛𝗼𝘄 𝘁𝗼 𝘀𝘁𝗮𝗿𝘁: Record your stakeholder meetings. Feed the transcript to AI. Let it draft the initial ticket with technical context already included.

𝟮. 𝗥𝗲𝗾𝘂𝗶𝗿𝗲𝗺𝗲𝗻𝘁 𝗰𝗹𝗮𝗿𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻

We configured our AI to review every requirement and ask:

→ "What happens when no results match?"
→ "How should this behave on mobile?"
→ "Which existing component handles similar logic?"
→ "What error states need handling?"

Questions that would surface in code review now surface before coding starts.

👉 𝗛𝗼𝘄 𝘁𝗼 𝘀𝘁𝗮𝗿𝘁: Give your PM an AI agent configured with your architecture docs.

Example prompt: "Review this ticket against [repo]. List every assumption the developer would need to clarify before starting."

𝗥𝗲𝗮𝗹 𝘁𝗮𝗹𝗸:

The first version was garbage. PMs ignored it. Developers complained it missed context.

We iterated for weeks before it became useful. The key? Feeding it the right architectural documentation.

𝗧𝗵𝗲 𝗥𝗲𝘀𝘂𝗹𝘁:

Refinement goes from 90 minutes to 20.

The remaining time is for human decisions: priorities, trade-offs, and edge cases that need discussion.

Everything else happens before anyone opens their calendar.