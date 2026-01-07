
## MCP
1. Have your tool add a dependency to build.gradle.
2. Manually check whether it's the latest release (it won't be).
3. Remove the dependency.
4. Add this MCP server https://github.com/arvindand/maven-tools-mcp (both your tool and the README have documentation to help you). This relies on docker and won't work in agentbox.
5. Now when your tool adds the dependency, it should be the latest version.


## Hooks:
- Write a hook (Opencode plugin) which runs the linter every time a file is written/edited. (See doco for help)
	- What are the pros/cons?
	- What other options are available?


## Slash, Skill, SubAgent
### Why Slash Command
- Called deterministically (that is, by user)
- No context pollution when not in use
### Why Skill
- Detail *how* to do something, but let agent decide *when* to do it.
- Keep work in context
### Why SubAgent?
- Keep work out of context, only reporting results. Can include special instructions.