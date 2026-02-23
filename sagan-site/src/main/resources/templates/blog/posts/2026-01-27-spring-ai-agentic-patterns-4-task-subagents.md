---
title: Spring AI Agentic Patterns (Part 4): Subagent Orchestration
source: https://spring.io/blog/2026/01/27/spring-ai-agentic-patterns-4-task-subagents/
scraped: 2026-02-22T22:00:17.487Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Tzolov |  January 27, 2026 | 1 Comment
---

# Spring AI Agentic Patterns (Part 4): Subagent Orchestration

_Engineering | Christian Tzolov |  January 27, 2026 | 1 Comment_

![](https://raw.githubusercontent.com/spring-io/spring-io-static/refs/heads/main/blog/tzolov/20260127/subagents.png)

Instead of one generalist agent doing everything, delegate to specialized agents. This keeps context windows focused—preventing the clutter that degrades performance.

[Task tool](https://github.com/spring-ai-community/spring-ai-agent-utils/blob/main/spring-ai-agent-utils/docs/TaskTools.md), part of the [spring-ai-agent-utils](https://github.com/spring-ai-community/spring-ai-agent-utils) toolkit, is a **portable, model-agnostic** Spring AI implementation inspired by [Claude Code's subagents](https://platform.claude.com/docs/en/agent-sdk/subagents). It enables hierarchical agent architectures where specialized subagents handle focused tasks in **dedicated context windows**, returning only essential results to the parent. Beyond Claude's markdown-based format, the architecture is extensible—supporting [A2A](https://google.github.io/A2A/) and other agentic protocols for heterogeneous agent orchestration (more information will be provided in a follow up post).

**This is Part 4 of our Spring AI Agentic Patterns series.** We've covered [Agent Skills](https://spring.io/blog/2026/01/13/spring-ai-generic-agent-skills), [AskUserQuestionTool](https://spring.io/blog/2026/01/16/spring-ai-ask-user-question-tool), and [TodoWriteTool](https://spring.io/blog/2026/01/20/spring-ai-agentic-patterns-3-todowrite/). Now we explore hierarchical subagents.

**Ready to dive in?** Skip to [Getting Started](#getting-started).

## [](#how-it-works)How It Works

The main agent delegates tasks to specialized subagents through the Task tool, with each subagent operating in its own isolated context window. The subagent architecture consists of three key components:

**1\. Main Agent (Orchestrator)** The primary agent that interacts with users. Its LLM has access to the `Task` tool and knows about available subagents through the **Agent Registry**—a catalog of subagent names and descriptions populated at startup. The main agent automatically decides when to delegate based on each subagent's `description` field.

**2\. Agent Configuration Files** Subagents are defined as Markdown files (e.g., `agent-x.md`, `agent-y.md`) in an `agents/` folder. Each file specifies the subagent's name, description, allowed tools, preferred model, and system prompt. These configurations populate both the Agent Registry and Task tool at startup.

**3\. Subagents** Separate agent instances that execute in isolated context windows. Each subagent can use a **different LLM** (LLM-X, LLM-Y, LLM-Z) with its own system prompt, tools, and skills—enabling multi-model routing based on task complexity.

The diagram below illustrates the execution flow:

![](https://raw.githubusercontent.com/spring-io/spring-io-static/refs/heads/main/blog/tzolov/20260127/sub-agents-architecture.png)

1.  **Loading:** At startup, the Task tool loads the configured subagent references, resolves their names and descriptions, and populates the agent registry.
2.  **User** sends a complex question to the main agent
3.  **Main agent's LLM** evaluates the request and checks available subagents in the registry
4.  **LLM decides** to delegate by invoking the `Task` tool with the subagent name and task description
5.  **Task tool** spawns the appropriate subagent based on the agent configuration
6.  **Subagent** works autonomously in its dedicated context window
7.  **Results** flow back to the main agent (only essential findings, not intermediate steps)
8.  **Main agent** synthesizes and returns the final answer to the user

Each subagent operates with:

-   **Dedicated context window** - Isolated from the main conversation, preventing clutter
-   **Custom system prompt** - Tailored expertise for specific domains
-   **Configurable tool access** - Restricted to only necessary capabilities
-   **Multi-model routing** - Route simple tasks to cheaper models, complex analysis to capable ones
-   **Parallel execution** - Launch multiple subagents concurrently
-   **Background tasks** - Long-running operations execute asynchronously

### [](#built-in-subagents)Built-in Subagents

Spring AI Agent Utils provides four built-in subagents, automatically registered when `TaskTool` is configured:

Subagent

Purpose

Tools

**Explore**

Fast, read-only codebase exploration—find files, search code, analyze contents

Read, Grep, Glob

**General-Purpose**

Multi-step research and execution with full read/write access

All tools

**Plan**

Software architect for designing implementation strategies and identifying trade-offs

Read-only + search

**Bash**

Command execution specialist for git operations, builds, and terminal tasks

Bash only

See the [reference documentation](https://github.com/spring-ai-community/spring-ai-agent-utils/blob/main/spring-ai-agent-utils/docs/TaskTools.md#built-in-sub-agents) for detailed capabilities. Multiple subagents can run concurrently—for example, running `style-checker`, `security-scanner`, and `test-coverage` simultaneously during code review.

## [](#getting-started)Getting Started

### [](#1-add-the-dependency)1\. Add the Dependency

```xml
Copy<dependency>
    <groupId>org.springaicommunity</groupId>
    <artifactId>spring-ai-agent-utils</artifactId>
    <version>0.4.2</version>
</dependency>
```

### [](#2-configure-your-agent)2\. Configure Your Agent

```java
Copyimport org.springaicommunity.agent.tools.task.TaskToolCallbackProvider;

@Configuration
public class AgentConfig {

    @Bean
    CommandLineRunner demo(ChatClient.Builder chatClientBuilder) {
        return args -> {
            // Configure Task tools
            var taskTools = TaskToolCallbackProvider.builder()
                .chatClientBuilder("default", chatClientBuilder)
                .subagentReferences(
                    ClaudeSubagentReferences.fromRootDirectory("src/main/resources/agents"))
                .build();

            // Build main chat client with Task tools
            ChatClient chatClient = chatClientBuilder
                .defaultToolCallbacks(taskTools)
                .build();

            // Use naturally - agent will delegate to subagents
            String response = chatClient
                .prompt("Explore the authentication module and explain how it works")
                .call()
                .content();
        };
    }
}
```

The main agent automatically recognizes when to delegate to subagents based on their `description` fields.

### [](#3-multi-model-routing-optional)3\. Multi-Model Routing (Optional)

Route subagents to different models based on task complexity:

```java
Copyvar taskTools = TaskToolCallbackProvider.builder()
    .chatClientBuilder("default", sonnetBuilder)   // Default model
    .chatClientBuilder("haiku", haikuBuilder)      // Fast, cheap
    .chatClientBuilder("opus", opusBuilder)        // Complex analysis
    .build();
```

Subagents specify their preferred model in their definition, and the Task tool routes accordingly.

## [](#creating-custom-subagents)Creating Custom Subagents

Custom subagents are Markdown files with YAML frontmatter, typically stored in `.claude/agents/`:

```
Copyproject-root/
├── .claude/
│   └── agents/
│       ├── code-reviewer.md
│       └── test-runner.md
```

#### [](#subagent-file-format)Subagent File Format

```markdown
Copy---
name: code-reviewer
description: Expert code reviewer. Use proactively after writing code.
tools: Read, Grep, Glob
disallowedTools: Edit, Write
model: sonnet
---

You are a senior code reviewer with expertise in software quality.

**When Invoked:**
1. Run `git diff` to see recent changes
2. Focus analysis on modified files
3. Check surrounding code context

**Review Checklist:**
- Code clarity and readability
- Proper naming conventions
- Error handling
- Security vulnerabilities

**Output:** Clear, actionable feedback with file references.
```

#### [](#configuration-fields)Configuration Fields

Field

Required

Description

`name`

Yes

Unique identifier (lowercase with hyphens)

`description`

Yes

Natural language description of when to use this subagent

`tools`

No

Allowed tool names (inherits all if omitted)

`disallowedTools`

No

Tools to explicitly deny

`model`

No

Model preference: `haiku`, `sonnet`, `opus`

See the [reference documentation](https://github.com/spring-ai-community/spring-ai-agent-utils/blob/main/spring-ai-agent-utils/docs/TaskTools.md#creating-custom-sub-agents) for additional fields like `skills` and `permissionMode`.

> **Important:** Subagents cannot spawn their own subagents. Don't include `Task` in a subagent's `tools` list.

#### [](#loading-custom-subagents)Loading Custom Subagents

```java
Copyimport org.springaicommunity.agent.tools.task.subagent.claude.ClaudeSubagentReferences;

var taskTools = TaskToolCallbackProvider.builder()
    .chatClientBuilder("default", chatClientBuilder)
    .subagentReferences(
        ClaudeSubagentReferences.fromRootDirectory("src/main/resources/agents")
    )
    .build();
```

## [](#background-execution)Background Execution

Long-running subagents can execute asynchronously. The main agent continues working while background subagents execute. Use `TaskOutputTool` to retrieve results when needed. For persistent task storage across instances, see the [TaskRepository documentation](https://github.com/spring-ai-community/spring-ai-agent-utils/blob/main/spring-ai-agent-utils/docs/TaskTools.md#background-task-management).

## [](#conclusion)Conclusion

The Task tool brings hierarchical subagent architectures to Spring AI, enabling context isolation, specialized instructions, and efficient multi-model routing. By delegating complex tasks to focused subagents, your main agent stays lean and responsive.

**Next up:** In [Part 5](https://spring.io/blog/2026/01/29/spring-ai-agentic-patterns-a2a-integration), we explore **A2A Integration**—building interoperable agents with the Agent2Agent protocol. In a follow-up post, we'll cover the **Subagent Extension Framework**—a protocol-agnostic abstraction for integrating remote agents via A2A, MCP, or custom protocols.

## [](#resources)Resources

-   **GitHub Repository**: [spring-ai-agent-utils](https://github.com/spring-ai-community/spring-ai-agent-utils)
-   **TaskTools Documentation**: [TaskTools.md](https://github.com/spring-ai-community/spring-ai-agent-utils/blob/main/spring-ai-agent-utils/docs/TaskTools.md)
-   **Example Project**: [subagent-demo](https://github.com/spring-ai-community/spring-ai-agent-utils/tree/main/examples/subagent-demo)

#### [](#related)Related

-   [Claude Code Subagents](https://platform.claude.com/docs/en/agent-sdk/subagents) - Original inspiration

#### [](#series-links)Series Links

-   **Part 1**: [Agent Skills](https://spring.io/blog/2026/01/13/spring-ai-generic-agent-skills) - Modular, reusable capabilities
-   **Part 2**: [AskUserQuestionTool](https://spring.io/blog/2026/01/16/spring-ai-ask-user-question-tool) - Interactive workflows
-   **Part 3**: [TodoWriteTool](https://spring.io/blog/2026/01/20/spring-ai-agentic-patterns-3-todowrite/) - Structured planning
-   **Part 4**: Subagent Orchestration (this post) - Hierarchical agent architectures
-   **Part 5**: [A2A Integration](https://spring.io/blog/2026/01/29/spring-ai-agentic-patterns-a2a-integration) - Building interoperable agents with the Agent2Agent protocol
-   **Part (soon)**: Subagent Extension Framework (coming soon) - Protocol-agnostic agent orchestration

#### [](#related-spring-ai-blogs)Related Spring AI Blogs

-   [Dynamic Tool Discovery](https://spring.io/blog/2025/12/11/spring-ai-tool-search-tools-tzolov) - Achieve 34-64% token savings
-   [Tool Argument Augmentation](https://spring.io/blog/2025/12/23/spring-ai-tool-argument-augmenter-tzolov) - Capture LLM reasoning during tool execution