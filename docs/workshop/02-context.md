# Context Engineering

## Demo
- Exercise: "change x". Atlas add REST API.
	- no info.
	- 87 page doco.

## Exercises and ideas
- `/context`
- `/init`
- Context compacting gives away control. Rather:
	- `/clear` (`/new` in opencode)
	- ask the agent to summarise your session:
		- e.g. "document what we've done"
		- future idea: write a hook to log all tool usages per session, this can serve as summary.
- Loading context:
	- separate priming commands: generate task-specific information to a file, e.g. frontend-architecture.md. Reference the file with @ in your frontend-related prompt.
	- Read and prepare:
		- "Read about x and prepare to discuss it"
		- "Using https://opencode.ai/docs/commands/, explain how to create a slash command in opencode"
		- "@claude-checklists/system-architecture.md @claude-checklists/2026-01-08-mper.md. We are going to work on the document identification part of the app. Dig in, read relevant files and tests, prepare to discuss the ins and outs of how it works."
- Run a bash command, for example `!git ls-files` or `!git diff HEAD~1`. Then issue your prompt.
- Anytime you have corrected the agent once or twice, try running `/learn` (custom command in this repo)
- Session management (claude command names, similar functions available in other tools):
	- go backwards: try double-escape or `/rewind` once you're a few prompts into a conversation.  Warning: this also restores code!
	- start claude with `--resume` to resume previous session
	- name sessions with `/rename`
	- start claude with `--fork-session <sessionname>`
	- try command `/resume` inside session
- Tool ignores important system prompt instructions? Try https://github.com/lexler/claude-code-user-reminders

*Note: whenever you manually edit files in the .claude folder, you need to restart claude for changes to be noticed.*

## Subagents
### Why SubAgent?

Primary reason is to keep work out of context, only reporting results. Same concept as with tool use:

> when I ask a question and claude code uses the webfetch tool, does all the fetched web page end up in the main context? 

> No, the full fetched web page does not end up in the main context.

>  1. WebFetch fetches the URL content and converts HTML to markdown
>  2. It then processes the content with a prompt using a small, fast model (not me, the main Sonnet model)
> 3. Only the model's response about the content gets returned to the main context

> This prevents large web pages from consuming excessive context tokens.

Look at the command workflow/recursive-review.md. It creates generic subagents for context separation.

- Write your own prompt which creates subagents to separate context.
- If you're feeling advanced, write your own subagent.
	- trigger it manually
	- write a prompt which causes it to be triggered automatically.

## Reading
- [Danger of MCP](https://www.anthropic.com/engineering/code-execution-with-mcp): MCP provides a foundational protocol for agents to connect to many tools and systems. However, once too many servers are connected, tool definitions and results can consume excessive tokens, reducing agent efficiency.