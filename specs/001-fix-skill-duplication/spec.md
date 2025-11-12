# Feature Specification: Fix SKILL File Duplication in OpenCode-to-Claude Sync

**Feature Branch**: `001-fix-skill-duplication`
**Created**: 2025-11-12
**Status**: Draft
**Input**: User description: "Fix this bug. A recent commit allowed syncing claude code and opencode files so that both solutions can be used. When converting in one of the directions, claude code SKILL files are duplicated. This should not happen."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sync OpenCode to Claude Without Duplication (Priority: P1)

A developer working with OpenCode format wants to sync their agent definitions to Claude format. They run the opencode-to-claude conversion command, and the system correctly converts each OpenCode agent file (e.g., `accessing-github.md`) to the corresponding Claude SKILL file (`SKILL.md`) within the appropriate skill directory without creating duplicate files.

**Why this priority**: This is the core bug fix. Without this working correctly, the dual format support is broken and users cannot reliably convert between formats.

**Independent Test**: Can be fully tested by running the opencode-to-claude conversion command with an existing OpenCode agent structure and verifying that each agent directory contains exactly one SKILL.md file with no duplicates.

**Acceptance Scenarios**:

1. **Given** an OpenCode agent directory structure with agents (e.g., `.opencode/agent/accessing-github/accessing-github.md`), **When** the opencode-to-claude conversion is executed, **Then** each Claude skill directory contains exactly one `SKILL.md` file
2. **Given** the conversion has been run once successfully, **When** the conversion is run a second time, **Then** no duplicate SKILL.md files are created and the existing files are properly updated
3. **Given** multiple agent files in the OpenCode structure, **When** the conversion is executed, **Then** each agent is converted to its own skill directory with a single SKILL.md file

---

### User Story 2 - Verify Bidirectional Sync Integrity (Priority: P2)

A developer needs to ensure that converting from Claude to OpenCode and back to Claude produces the same result without data loss or duplication. They can run both conversion commands sequentially and verify that the original structure is preserved.

**Why this priority**: Ensures that the sync mechanism is reliable and reversible, which is essential for teams that may need to switch between formats or use both.

**Independent Test**: Can be tested by starting with Claude format, converting to OpenCode, then back to Claude, and comparing the original and final file structures.

**Acceptance Scenarios**:

1. **Given** a Claude skills directory structure, **When** converted to OpenCode format and then back to Claude format, **Then** the resulting structure matches the original with no duplicate or missing files
2. **Given** skill metadata and content, **When** performing bidirectional conversion, **Then** all content is preserved accurately without corruption or loss

---

### Edge Cases

- What happens when a skill directory already contains multiple .md files before conversion?
- How does the system handle skill directories with non-standard filenames?
- What happens if a SKILL.md file already exists when converting from OpenCode?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST convert each OpenCode agent file to exactly one Claude SKILL.md file per skill directory
- **FR-002**: System MUST NOT create duplicate SKILL.md files when conversion is run multiple times
- **FR-003**: System MUST properly identify and rename agent files from OpenCode format (agent-name.md) to Claude format (SKILL.md)
- **FR-004**: Conversion process MUST preserve file content during transformation
- **FR-005**: System MUST handle the find/rename command correctly to avoid renaming already-converted SKILL.md files
- **FR-006**: Conversion MUST only rename agent-specific files, not unrelated .md files in the directory structure

### Key Entities

- **Agent Directory**: A directory containing agent/skill definitions (e.g., `accessing-github/`)
- **OpenCode Agent File**: A markdown file named after the agent (e.g., `accessing-github.md`)
- **Claude SKILL File**: A standardized markdown file named `SKILL.md`
- **Conversion Command**: The command/script that transforms between OpenCode and Claude formats

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Running the opencode-to-claude conversion command multiple times on the same directory structure produces identical results with zero duplicate files
- **SC-002**: 100% of OpenCode agent files are successfully converted to Claude SKILL.md files without duplication
- **SC-003**: Bidirectional conversion (Claude → OpenCode → Claude) completes with 100% file integrity
- **SC-004**: Conversion process completes in under 5 seconds for a typical project with up to 20 agents

## Assumptions

- The bug is in the `opencode-to-claude.md` conversion command, specifically in the find/rename logic (line 27)
- The current command renames ALL .md files to SKILL.md, including already-converted SKILL.md files, which may cause duplication or unexpected behavior
- Each OpenCode agent should be in its own directory with a single .md file named after the agent
- Each Claude skill should be in its own directory with a single SKILL.md file
- The conversion scripts use shell commands executed within the command file

## Technical Constraints

- Must maintain compatibility with existing Claude and OpenCode directory structures
- Must work with standard Unix shell commands (find, mv, cp)
- Must handle edge cases gracefully (missing directories, existing files, etc.)

## Out of Scope

- Creating a GUI for the conversion process
- Automatic synchronization or file watching
- Validation of agent/skill file content or format
- Migration of existing duplicated files (users must clean up manually)
- Support for other file formats beyond markdown
