---
title: Spring AI 1.1 GA Released
source: https://spring.io/blog/2025/11/12/spring-ai-1-1-GA-released
scraped: 2026-02-23T07:22:28.118Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  November 12, 2025 | 0 Comments
---

# Spring AI 1.1 GA Released

_Releases | Mark Pollack |  November 12, 2025 | 0 Comments_

On behalf of the Spring AI team, I'm pleased to announce the general availability of Spring AI 1.1.0!

Spring AI 1.1 brings Model Context Protocol integration, advanced AI capabilities, and expanded model provider support to the Spring ecosystem. The 1.1 development cycle includes over 850 improvements, bug fixes, and documentation updates.

We extend our sincere thanks to the community contributors, partner organizations, and the broader Spring AI ecosystem for their invaluable contributions throughout this release cycle.

## [](#release-summary)Release Summary

Spring AI 1.1.0 includes substantial improvements across all areas:

-   **Over 850 total improvements** across M1, M2, M3, M4, and RC1 ([GitHub Release](https://github.com/spring-projects/spring-ai/releases/tag/v1.1.0))
-   **354 enhancements** including major new features and integrations
-   **241 bug fixes** for improved stability and reliability
-   **100 documentation improvements** with new guides and examples
-   **23 security updates** and dependency upgrades
-   **Contributions from the community** spanning multiple organizations and open source projects

## [](#model-context-protocol)Model Context Protocol

The Model Context Protocol (MCP) represents the most significant feature set improvement to Spring AI 1.1. Spring AI provides Spring Boot auto-configuration and a comprehensive annotation-based programming model for MCP integration.

[MCP Documentation](https://docs.spring.io/spring-ai/reference/api/mcp.html)

### [](#spring-ai-mcp-features)Spring AI MCP Features

**Annotation-Based Programming Model:**

```java
Copy@McpTool
public String getCurrentWeather(String location) {
    // Tool implementation
}

@McpResource
public String getDatabaseSchema() {
    // Resource implementation
}

@McpPrompt
public String generateSqlQuery(String userIntent) {
    // Prompt template implementation
}
```

**Multiple Transport Options:**

-   STDIO transport for local process communication
-   HTTP SSE (Server-Sent Events) for web-based integrations
-   Streamable HTTP for stateful session management with resumability

**Spring Boot Auto-Configuration:** Multiple specialized starters support both client and server implementations across WebFlux, WebMVC, and Servlet environments. Docker Compose and Testcontainers integration enables containerized MCP gateway deployments.

**Security Integration:** Security documentation covers OAuth2 integration patterns for securing MCP servers. Read more in Daniel Garnier-Moiroux's blog post: [Securing MCP Servers with Spring AI](https://spring.io/blog/2025/09/30/spring-ai-mcp-server-security).

**Getting Started:** Christian Tzolov's blog post: [Connect Your AI to Everything: Spring AI's MCP Boot Starters](https://spring.io/blog/2025/09/16/spring-ai-mcp-intro-blog).

For a deep technical dive, watch the [Beyond local tools: Deep dive into MCP](https://www.youtube.com/watch?v=EgKsRsx1-HM) presentation by James Ward and Maximilian Schellhorn.

## [](#prompt-caching)Prompt Caching

Spring AI 1.1 adds prompt caching support for Anthropic Claude and AWS Bedrock, reducing costs by up to 90% while improving response times.

### [](#anthropic-claude-prompt-caching)Anthropic Claude Prompt Caching

[Anthropic Claude Documentation](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html)

Spring AI supports five cache strategies for Anthropic Claude:

-   **NONE**: No caching (default)
-   **SYSTEM\_ONLY**: Cache system messages
-   **TOOLS\_ONLY**: Cache tool definitions
-   **SYSTEM\_AND\_TOOLS**: Cache system messages and tool definitions
-   **CONVERSATION\_HISTORY**: Incremental caching following Anthropic's best practices

Cache time-to-live (TTL) options include 5-minute and 1-hour caching, with automatic cache management and eligibility tracking.

Soby Chacko's detailed guide covers implementation patterns: [Prompt Caching Support in Spring AI with Anthropic Claude](https://spring.io/blog/2025/10/27/spring-ai-anthropic-prompt-caching-blog).

### [](#aws-bedrock-prompt-caching)AWS Bedrock Prompt Caching

[AWS Bedrock Documentation](https://docs.spring.io/spring-ai/reference/api/chat/bedrock.html)

AWS Bedrock Converse API now supports prompt caching for Claude and Nova models, providing similar cost optimization benefits for applications deployed on AWS infrastructure.

Implementation details are available in: [AWS Bedrock Prompt Caching Support in Spring AI](https://spring.io/blog/2025/10/30/spring-ai-bedrock-prompt-caching-blog).

## [](#advanced-ai-capabilities)Advanced AI Capabilities

### [](#reasoning-and-thinking-mode-support)Reasoning and Thinking Mode Support

Spring AI 1.1 provides native support for AI models with reasoning capabilities across multiple providers:

-   **Ollama**: Thinking mode support for reasoning models with effort parameter control via OpenAI compatibility
-   **ZhipuAI**: `thinking` and `response_format` parameter support for GLM models
-   **Anthropic** ([docs](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html#_thinking_extended_reasoning)): Streaming thinking events with access to reasoning chains
-   **OpenAI** ([docs](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html#_reasoning_content)): Access to reasoning content and custom parameters

The `ReasoningContent` API enables applications to inspect and utilize the model's reasoning process.

### [](#recursive-advisors-for-self-improving-ai-agents)Recursive Advisors for Self-Improving AI Agents

[Advisors Documentation](https://docs.spring.io/spring-ai/reference/api/advisors.html)

The new recursive advisor feature enables advisors to call other advisors in chains, creating sophisticated multi-step AI workflows. Two built-in recursive advisor implementations provide pre-configured patterns for common use cases, with configurable observations for monitoring and debugging.

This feature enables building self-improving AI agents that can refine their own outputs through iterative processing. Christian Tzolov's blog post demonstrates the pattern: [Create Self-Improving AI Agents Using Spring AI Recursive Advisors](https://spring.io/blog/2025/11/04/spring-ai-recursive-advisors).

The recursive advisor pattern also enables implementing LLM-as-a-Judge evaluation systems, as detailed in: [LLM Response Evaluation with Spring AI: Building LLM-as-a-Judge Using Recursive Advisors](https://spring.io/blog/2025/11/10/spring-ai-llm-as-judge-blog-post).

## [](#expanded-model-provider-ecosystem)Expanded Model Provider Ecosystem

Spring AI 1.1 broadens model provider support with new integrations and enhanced capabilities:

### [](#new-provider-integrations)New Provider Integrations

**Google GenAI SDK Integration:**

[Google GenAI Chat Documentation](https://docs.spring.io/spring-ai/reference/api/chat/google-genai-chat.html) | [Google GenAI Embeddings Documentation](https://docs.spring.io/spring-ai/reference/api/embeddings/google-genai-embeddings.html)

-   Native support for Gemini Pro, Gemini 1.5 Pro, and Gemini 2.0 Flash models
-   Dual authentication: API keys and Google Cloud credentials
-   Chat and text embedding capabilities
-   Cached Content API support

Thanks to [Dan Dobrin (@ddobrin)](https://github.com/ddobrin) from Google for contributing this integration.

**ElevenLabs Text-to-Speech:**

[ElevenLabs Documentation](https://docs.spring.io/spring-ai/reference/api/audio/speech/elevenlabs-speech.html)

-   Streaming audio generation
-   Multiple voice options
-   Support for various audio formats

Thanks to [Alexandros Pappas (@apappascs)](https://github.com/apappascs) for contributing this integration.

Both OpenAI and ElevenLabs implement the `TextToSpeechModel` interface ([docs](https://docs.spring.io/spring-ai/reference/api/audio/speech.html)), providing a consistent model-level API across providers.

### [](#enhanced-model-support)Enhanced Model Support

**OpenAI:**

[OpenAI Chat Documentation](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html) | [OpenAI Audio Documentation](https://docs.spring.io/spring-ai/reference/api/audio/transcriptions/openai-transcriptions.html)

-   GPT-5 model family support (gpt-5, gpt-5-mini, gpt-5-nano) - Thanks to [Alexandros Pappas (@apappascs)](https://github.com/apappascs)
-   File API ([docs](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html#_file_api)) for upload and management - Thanks to [Sun Yuhan (@sunyuhan1998)](https://github.com/sunyuhan1998)
-   Reasoning content access
-   Expanded TTS and transcription models - Thanks to [Alexandros Pappas (@apappascs)](https://github.com/apappascs)

**Anthropic Claude:**

[Anthropic Claude Documentation](https://docs.spring.io/spring-ai/reference/api/chat/anthropic-chat.html)

-   Latest Claude models: Sonnet 4.5, Opus 4.1
-   Citations API for source attribution and traceability
-   Tool choice support for controlling function calling - Thanks to [Austin Dase (@adase11)](https://github.com/adase11)
-   Enhanced prompt caching with cache management - Thanks to [Austin Dase (@adase11)](https://github.com/adase11)

**Mistral AI:**

[Mistral AI Chat Documentation](https://docs.spring.io/spring-ai/reference/api/chat/mistralai-chat.html)

-   OCR API ([docs](https://docs.spring.io/spring-ai/reference/api/chat/mistralai-chat.html#_ocr)) integration for document and image text extraction - Thanks to [Alexandros Pappas (@apappascs)](https://github.com/apappascs)
-   Codestral Embed model support - Thanks to [Nicolas Krier (@nicolaskrier)](https://github.com/nicolaskrier)
-   Builder pattern consistency - Thanks to [Jason Smith (@jasonparallel)](https://github.com/jasonparallel)

**ZhipuAI:**

[ZhipuAI Chat Documentation](https://docs.spring.io/spring-ai/reference/api/chat/zhipuai-chat.html)

-   GLM-4.6 model support and international site integration - Thanks to [YunKui Lu (@luyunkui95)](https://github.com/luyunkui95)
-   GLM-4.5 and GLM-Z1 model support - Thanks to [YuJie Wan (@eeaters)](https://github.com/eeaters)
-   Thinking mode capabilities - Thanks to [YunKui Lu (@luyunkui95)](https://github.com/luyunkui95)

## [](#vector-stores-chat-memory-and-observability)Vector Stores, Chat Memory, and Observability

### [](#vector-store-enhancements)Vector Store Enhancements

[Vector Database Documentation](https://docs.spring.io/spring-ai/reference/api/vectordbs.html)

Spring AI 1.1 includes improvements for retrieval-augmented generation (RAG) applications:

-   **MariaDB Vector Store** ([docs](https://docs.spring.io/spring-ai/reference/api/vectordbs/mariadb.html)): Full integration with similarity scoring - Thanks to [Tilman Holube (@tilman)](https://github.com/tilman)
-   **OpenSearch Approximate k-NN** ([docs](https://docs.spring.io/spring-ai/reference/api/vectordbs/opensearch.html)): Performance-optimized approximate search - Thanks to [Jemin Huh (@JM-Lab)](https://github.com/JM-Lab)
-   **GemFire Metadata Filtering** ([docs](https://docs.spring.io/spring-ai/reference/api/vectordbs/gemfire.html)): Advanced filtering for similarity searches - Thanks to [Jason Huynh (@jason.huynh)](https://github.com/jason.huynh)
-   **Weaviate Configuration** ([docs](https://docs.spring.io/spring-ai/reference/api/vectordbs/weaviate.html)): Enhanced field customization (meta prefix, content field, embedding field) - Thanks to [Jonghoon Park (@dev-jonghoonpark)](https://github.com/dev-jonghoonpark)
-   **VectorStoreRetriever Interface** ([docs](https://docs.spring.io/spring-ai/reference/api/vectordbs.html#_vectorstoreretriever_interface)): Read-only abstraction following the principle of least privilege

### [](#chat-memory-storage-options)Chat Memory Storage Options

[Chat Memory Documentation](https://docs.spring.io/spring-ai/reference/api/chatmemory.html)

Multiple conversation storage options:

-   **MongoDB Chat Memory Repository**: MongoDB integration for conversation history - Thanks to [Łukasz Jernaś (@deejay1)](https://github.com/deejay1)
-   **Oracle JDBC ChatMemoryRepository**: Oracle database support with H2 and SQLite dialects - Thanks to [guanxu (@guanxuc)](https://github.com/guanxuc) and [fanxt0218 (@fanxt0218)](https://github.com/fanxt0218)
-   **Azure Cosmos DB Chat Memory**: Azure integration for globally distributed deployments - Thanks to [Theo van Kraay (@TheovanKraay)](https://github.com/TheovanKraay) from Microsoft

### [](#observability-and-monitoring)Observability and Monitoring

[Observability Documentation](https://docs.spring.io/spring-ai/reference/observability/index.html)

Micrometer Observability enhancements:

-   Observation context enhancements for better context propagation - Thanks to [Thomas Vitale (@ThomasVitale)](https://github.com/ThomasVitale)
-   Chat client completion logging for debugging - Thanks to [Jonatan Ivanov (@jonatan-ivanov)](https://github.com/jonatan-ivanov)
-   Configurable advisor observations
-   Metrics documentation with Prometheus and OpenTelemetry mapping guidance - Thanks to [heechann (@heechann)](https://github.com/heechann)

## [](#other-improvements)Other Improvements

-   **MCP Java SDK Evolution**: Advanced from v0.10.0 to v0.15.0 during the 1.1 development cycle
-   **Document Processing** ([docs](https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html#_markdowndocumentreader)): MarkdownDocumentReader with batch processing, enhanced multimodal PDF support
-   **Developer Experience**: Unified builder patterns across EmbeddingOptions and ChatOptions
-   **Network Reliability**: Automatic retry configuration for distributed deployments
-   **Security Documentation**: MCP security reference with OAuth2 patterns
-   **Example Repository**: 37 total modules with 24 featuring integration tests - [Spring AI Examples](https://github.com/spring-projects/spring-ai-examples)

## [](#community-and-ecosystem)Community and Ecosystem

### [](#spring-ai-community-github-organization)Spring AI Community GitHub Organization

The new [Spring AI Community GitHub Organization](https://github.com/spring-ai-community) provides a home for community-driven projects that extend Spring AI.

Read the announcement: [Introducing the Spring AI Community GitHub Organization](https://spring.io/blog/2025/10/07/spring-ai-community-announcement).

### [](#spring-ai-agents-and-bench)Spring AI Agents and Bench

New projects for building and evaluating AI agents:

-   **Spring AI Agents** ([docs](https://springaicommunity.mintlify.app/projects/incubating/spring-ai-agents)): Framework for building agentic coding tools and AI agents
-   **Spring AI Bench** ([docs](https://springaicommunity.mintlify.app/projects/incubating/spring-ai-bench)): Benchmarking and evaluation toolkit

Learn more: [Introducing Spring AI Agents and Spring AI Bench](https://spring.io/blog/2025/10/28/agents-and-benchmarks).

### [](#conference-talks-and-tutorials)Conference Talks and Tutorials

The Spring AI community has been sharing knowledge through presentations and tutorials:

-   [Modular RAG Architectures with Java and Spring AI](https://www.youtube.com/watch?v=yQQEnXRMvUA) by Thomas Vitale at Spring I/O 2025
-   [Devoxx Belgium 2025 - Bootiful Spring AI](https://youtu.be/Sw3PlFXfWj4?si=lonzmiIKALwScsY8) with Dr. Mark Pollack, Christian Tsolov, James Ward, and Josh Long
-   [Devnexus 2025 - Spring AI](https://www.youtube.com/watch?v=tEyM-TZeVqM) with Dr. Mark Pollack and Josh Long
-   [Spring AI Complete Tutorial](https://www.youtube.com/watch?v=FzLABAppJfM&list=PLZV0a2jwt22uoDm3LNDFvN6i2cAVU_HTH&index=25) by Dan Vega

### [](#mcp-java-sdk-contributions)MCP Java SDK Contributions

The MCP Java SDK represents a collaborative effort across the Java ecosystem. Contributors to the MCP Java SDK during the 1.1 development cycle include:

-   **Broadcom**: [Christian Tzolov (@tzolov)](https://github.com/tzolov), [Daniel Garnier-Moiroux (@Kehrlann)](https://github.com/Kehrlann), [Dariusz Jędrzejczyk (@chemicL)](https://github.com/chemicL)
-   **Oracle**: [Graeme Rocher (@graemerocher)](https://github.com/graemerocher), [Sergio del Amo (@sdelamo)](https://github.com/sdelamo)
-   **Confluent**: [Pascal Vantrepote (@pascalconfluent)](https://github.com/pascalconfluent)
-   **AWS**: [Anurag Pant (@pantanurag555)](https://github.com/pantanurag555)
-   **Google**: [Yanming Zhou (@zhouyming)](https://github.com/zhouyming)
-   **Deutsche Bank**: [Dmitry Bedrin (@bedrin)](https://github.com/bedrin)
-   **Open Source Community**: [He-Pin (@He-Pin)](https://github.com/He-Pin) (Apache Pekko PMC), [lance leehaut (@leehaut)](https://github.com/leehaut), [Liujunjie (@JunJieLiu51520)](https://github.com/JunJieLiu51520), [Richie Caputo (@arcaputo3)](https://github.com/arcaputo3), [shaoyin.zj (@zhangjingcn)](https://github.com/zhangjingcn), [Zizo-Vi (@Zizo-Vi)](https://github.com/Zizo-Vi), [@valuesource](https://github.com/valuesource)

## [](#getting-started-with-spring-ai-11)Getting Started with Spring AI 1.1

The [Spring AI 1.1 documentation](https://docs.spring.io/spring-ai/reference/) includes:

-   **MCP Getting Started Guide** ([docs](https://docs.spring.io/spring-ai/reference/guides/getting-started-mcp.html)): Step-by-step introduction to Model Context Protocol integration
-   **Provider Documentation** ([docs](https://docs.spring.io/spring-ai/reference/api/chat.html)): Complete guides for all supported AI providers
-   **Example Repository** ([Spring AI Examples](https://github.com/spring-projects/spring-ai-examples)): Working examples with integration tests

## [](#whats-next)What's Next

We will be keeping the main branch on 1.1.1-SNAPSHOT in anticipation of bug-fixing PRs over the next few weeks. Then we will shift the main branch to 2.0.0-SNAPSHOT and begin support for Spring Framework 7 and Spring Boot 4.0.

## [](#resources)Resources

-   [Project Page](https://spring.io/projects/spring-ai)
-   [GitHub Repository](https://github.com/spring-projects/spring-ai)
-   [Issues](https://github.com/spring-projects/spring-ai/issues)
-   [Documentation](https://docs.spring.io/spring-ai/reference/)
-   [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai)

## [](#contributors)Contributors

🙏 We thank all the contributors who made this release possible. Here is the collective list of contributors since the 1.0 GA release.

-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [Andrei Sumin (andrei.sumin)](https://github.com/andrei.sumin)
-   [ashakirin (ashakirin)](https://github.com/ashakirin)
-   [asw12 (asw12)](https://github.com/asw12)
-   [Austin Dase (adase11)](https://github.com/adase11)
-   [Cameron Kirk (kirkster96)](https://github.com/kirkster96)
-   [chani (csbiy)](https://github.com/csbiy)
-   [cho-thinkfree-com (cho)](https://github.com/cho)
-   [Christian Tzolov (tzolov)](https://github.com/tzolov)
-   [Christopher Miles (cmiles74)](https://github.com/cmiles74)
-   [codeboyzhou (imzhouchen)](https://github.com/imzhouchen)
-   [Dan Dobrin (ddobrin)](https://github.com/ddobrin)
-   [Daniel Garnier-Moiroux (Kehrlann)](https://github.com/Kehrlann)
-   [Dariusz Jędrzejczyk (chemicL)](https://github.com/chemicL)
-   [David Frizelle (dafriz)](https://github.com/dafriz)
-   [Dev Bulchandani (devbulchandani)](https://github.com/devbulchandani)
-   [Dmitrii Chechetkin (dmitrii.chechetkin)](https://github.com/dmitrii.chechetkin)
-   [Eddú Meléndez (eddu.melendez)](https://github.com/eddu.melendez)
-   [Eric Bottard (ericbottard)](https://github.com/ericbottard)
-   [fanxt0218 (fanxt0218)](https://github.com/fanxt0218)
-   [Forte Scarlet (ForteScarlet)](https://github.com/ForteScarlet)
-   [Gareth Evans (garethjevans)](https://github.com/garethjevans)
-   [guanxu (guanxuc)](https://github.com/guanxuc)
-   [heechann (HeeChanN)](https://github.com/HeeChanN)
-   [Hyeri1ee (Hyeri1ee)](https://github.com/Hyeri1ee)
-   [Hyoseop Song (loveysuby)](https://github.com/loveysuby)
-   [Hyunsang Han (HyunSangHan)](https://github.com/HyunSangHan)
-   [Ilayaperumal Gopinathan (ilayaperumalg)](https://github.com/ilayaperumalg)
-   [Issam El-atif (ielatif)](https://github.com/ielatif)
-   [jacquicollier2-eng (jacquicollier2-eng)](https://github.com/jacquicollier2-eng)
-   [James Ward (jamesward)](https://github.com/jamesward)
-   [Jared Rufer (emopti-jrufer)](https://github.com/emopti-jrufer)
-   [Jason Huynh (jason.huynh)](https://github.com/jason.huynh)
-   [Jason Smith (jasonparallel)](https://github.com/jasonparallel)
-   [Jemin Huh (JM-Lab)](https://github.com/JM-Lab)
-   [Jian (jiafu1115)](https://github.com/jiafu1115)
-   [Jinwoo Lee (jinlee1703)](https://github.com/jinlee1703)
-   [Jonatan Ivanov (jonatan-ivanov)](https://github.com/jonatan-ivanov)
-   [Josh Long (joshlong)](https://github.com/joshlong)
-   [kuntal1461 (kuntal1461)](https://github.com/kuntal1461)
-   [lance (leehaut)](https://github.com/leehaut)
-   [Laura Trotta (l-trotta)](https://github.com/l-trotta)
-   [leeyazhou (bytesgo)](https://github.com/bytesgo)
-   [Li Huagang-简放视野 (bert825\_work)](https://github.com/bert825_work)
-   [Link (eeaters)](https://github.com/eeaters)
-   [little\_huang (little-huang)](https://github.com/little-huang)
-   [liugddx (liugddx)](https://github.com/liugddx)
-   [Mark Pollack (markpollack)](https://github.com/markpollack)
-   [Martin Kamp Jensen (mkjensen)](https://github.com/mkjensen)
-   [MartinDai (MartinDai)](https://github.com/MartinDai)
-   [Mattia Pasetto (wilocu)](https://github.com/wilocu)
-   [MoGreene (Mo-Greene)](https://github.com/Mo-Greene)
-   [NathanGrand (q-nathangrand)](https://github.com/q-nathangrand)
-   [Nguyen Tran (Mark) (nguyen.trantrung)](https://github.com/nguyen.trantrung)
-   [Nicolas Krier (nicolaskrier)](https://github.com/nicolaskrier)
-   [Nils Breunese (nils)](https://github.com/nils)
-   [Oleksandr Klymenko (alxkm)](https://github.com/alxkm)
-   [Oskar Drozda (Hiosdra)](https://github.com/Hiosdra)
-   [Pawel Potaczala (centrumek)](https://github.com/centrumek)
-   [Philip I. Thomas (philipithomas)](https://github.com/philipithomas)
-   [Rafael Cunha (rafaelrddc)](https://github.com/rafaelrddc)
-   [robinmayerhofer (robinmayerhofer)](https://github.com/robinmayerhofer)
-   [Sandra Ahlgrimm (SandraAhlgrimm)](https://github.com/SandraAhlgrimm)
-   [Senrey\_Song (SenreySong)](https://github.com/SenreySong)
-   [seongm1n (seongm1n)](https://github.com/seongm1n)
-   [Shahbaz Aamir (shahbazaamir)](https://github.com/shahbazaamir)
-   [shishuiwuhen2009 (shishuiwuhen2009)](https://github.com/shishuiwuhen2009)
-   [SiBo Ai (ai-afk)](https://github.com/ai-afk)
-   [Soby Chacko (sobychacko)](https://github.com/sobychacko)
-   [Stuart Loxton (stuart.loxton)](https://github.com/stuart.loxton)
-   [Suganthi Thomas (SuganthiThomas)](https://github.com/SuganthiThomas)
-   [Sun Yuhan (sunyuhan1998)](https://github.com/sunyuhan1998)
-   [Theo van Kraay (theo.van)](https://github.com/theo.van)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [Thorben Janssen (thjanssen)](https://github.com/thjanssen)
-   [Toshiaki Maki (makingx)](https://github.com/makingx)
-   [Tran Ngoc Nhan (ngocnhan-tran1996)](https://github.com/ngocnhan-tran1996)
-   [vdm24 (vdm24)](https://github.com/vdm24)
-   [Viacheslav Dobrynin (viacheslav-dobrynin)](https://github.com/viacheslav-dobrynin)
-   [Waldemar Panas (waldemar.panas)](https://github.com/waldemar.panas)
-   [Wenli Tian (jamespud)](https://github.com/jamespud)
-   [Willams (nnam-droid12)](https://github.com/nnam-droid12)
-   [xfl12345 (xfl12345)](https://github.com/xfl12345)
-   [Yang Li (Yornii)](https://github.com/Yornii)
-   [Yaner (yaner-here)](https://github.com/yaner-here)
-   [Yanming Zhou (quaff)](https://github.com/quaff)
-   [YuJie Wan (eeaters)](https://github.com/eeaters)
-   [YunKui Lu (YunKuiLu)](https://github.com/YunKuiLu)
-   [Łukasz Jernaś (deejay1)](https://github.com/deejay1)