---
name: docs-seeker
description: "Searching internet for technical documentation using llms.txt standard, GitHub repositories via Repomix, and parallel exploration. Use when user needs: (1) Latest documentation for libraries/frameworks, (2) Documentation in llms.txt format, (3) GitHub repository analysis, (4) Documentation without direct llms.txt support, (5) Multiple documentation sources in parallel"
version: 1.0.0
---

# Documentation Discovery & Analysis

## Overview

Intelligent discovery and analysis of technical documentation through multiple strategies:

1. **llms.txt-first**: Search for standardized AI-friendly documentation
2. **Repository analysis**: Use Repomix to analyze GitHub repositories
3. **Parallel exploration**: Deploy multiple Explorer agents for comprehensive coverage
4. **Fallback research**: Use Researcher agents when other methods unavailable

## Core Workflow

### Phase 1: Initial Discovery

1. **Identify target**
   - Extract library/framework name from user request
   - Note version requirements (default: latest)
   - Clarify scope if ambiguous

2. **Search for llms.txt**
   ```
   WebSearch: "[library name] llms.txt site:[docs domain]"
   ```
   Common patterns:
   - `https://docs.[library].com/llms.txt`
   - `https://[library].dev/llms.txt`
   - `https://[library].io/llms.txt`

   → Found? Proceed to Phase 2
   → Not found? Proceed to Phase 3

### Phase 2: llms.txt Processing

**Single URL:**
- WebFetch to retrieve content
- Extract and present information

**Multiple URLs (3+):**
- **CRITICAL**: Launch multiple Explorer agents in parallel
- One agent per major documentation section (max 5 in first batch)
- Each agent reads assigned URLs
- Aggregate findings into consolidated report

Example:
```
Launch 3 Explorer agents simultaneously:
- Agent 1: getting-started.md, installation.md
- Agent 2: api-reference.md, core-concepts.md
- Agent 3: examples.md, best-practices.md
```

### Phase 3: Repository Analysis

**When llms.txt not found:**

1. Find GitHub repository via WebSearch
2. Use Repomix to pack repository:
   ```bash
   npm install -g repomix  # if needed
   git clone [repo-url] /tmp/docs-analysis
   cd /tmp/docs-analysis
   repomix --output repomix-output.xml
   ```
3. Read repomix-output.xml and extract documentation

**Repomix benefits:**
- Entire repository in single AI-friendly file
- Preserves directory structure
- Optimized for AI consumption

### Phase 4: Fallback Research

**When no GitHub repository exists:**
- Launch multiple Researcher agents in parallel
- Focus areas: official docs, tutorials, API references, community guides
- Aggregate findings into consolidated report

## Agent Distribution Guidelines

- **1-3 URLs**: Single Explorer agent
- **4-10 URLs**: 3-5 Explorer agents (2-3 URLs each)
- **11+ URLs**: 5-7 Explorer agents (prioritize most relevant)

## Version Handling

**Latest (default):**
- Search without version specifier
- Use current documentation paths

**Specific version:**
- Include version in search: `[library] v[version] llms.txt`
- Check versioned paths: `/v[version]/llms.txt`
- For repositories: checkout specific tag/branch

## Output Format

```markdown
# Documentation for [Library] [Version]

## Source
- Method: [llms.txt / Repository / Research]
- URLs: [list of sources]
- Date accessed: [current date]

## Key Information
[Extracted relevant information organized by topic]

## Additional Resources
[Related links, examples, references]

## Notes
[Any limitations, missing information, or caveats]
```

## Quick Reference

**Tool selection:**
- WebSearch → Find llms.txt URLs, GitHub repositories
- WebFetch → Read single documentation pages
- Task (Explore) → Multiple URLs, parallel exploration
- Task (Researcher) → Scattered documentation, diverse sources
- Repomix → Complete codebase analysis

**Popular llms.txt locations:**
- Astro: https://docs.astro.build/llms.txt
- Next.js: https://nextjs.org/llms.txt
- Remix: https://remix.run/llms.txt
- SvelteKit: https://kit.svelte.dev/llms.txt

## Error Handling

- **llms.txt not accessible** → Try alternative domains → Repository analysis
- **Repository not found** → Search official website → Use Researcher agents
- **Repomix fails** → Try /docs directory only → Manual exploration
- **Multiple conflicting sources** → Prioritize official → Note versions

## Key Principles

1. **Always start with llms.txt** — Most efficient method
2. **Use parallel agents aggressively** — Faster results, better coverage
3. **Verify official sources** — Avoid outdated documentation
4. **Report methodology** — Tell user which approach was used
5. **Handle versions explicitly** — Don't assume latest

## Detailed Documentation

For comprehensive guides, examples, and best practices:

**Workflows:**
- [WORKFLOWS.md](./WORKFLOWS.md) — Detailed workflow examples and strategies

**Reference guides:**
- [Tool Selection](./references/tool-selection.md) — Complete guide to choosing and using tools
- [Documentation Sources](./references/documentation-sources.md) — Common sources and patterns across ecosystems
- [Error Handling](./references/error-handling.md) — Troubleshooting and resolution strategies
- [Best Practices](./references/best-practices.md) — 8 essential principles for effective discovery
- [Performance](./references/performance.md) — Optimization techniques and benchmarks
- [Limitations](./references/limitations.md) — Boundaries and success criteria
