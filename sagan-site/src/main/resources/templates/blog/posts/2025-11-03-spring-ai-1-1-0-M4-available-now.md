---
title: Spring AI 1.1.0-M4 Available Now
source: https://spring.io/blog/2025/11/03/spring-ai-1-1-0-M4-available-now
scraped: 2026-02-23T07:23:25.638Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  November 03, 2025 | 0 Comments
---

# Spring AI 1.1.0-M4 Available Now

_Releases | Mark Pollack |  November 03, 2025 | 0 Comments_

On behalf of the Spring AI engineering team and everyone who has contributed, I'm happy to announce that Spring AI `1.1.0-M4` has been released and is now available from Maven Central.

This patch release delivers important stability improvements and bug fixes.

## [](#release-summary)Release Summary

This release includes [340 improvements, bug fixes, and documentation updates](https://github.com/spring-projects/spring-ai/releases/tag/v1.1.0-M4). The focus of this patch release is on:

-   **Improvements**: 35 enhancements to expand capabilities and functionality
-   **Stability**: 132 bug fixes addressing community-reported issues
-   **Documentation**: 41 improvements to help developers

Thanks to all those who have contributed with issue reports and pull requests.

## [](#key-highlights)Key Highlights

-   Significant functionality enhancements with 35 improvements
-   Major stability improvements with 132 bug fixes
-   Documentation updates with 41 improvements
-   Updated dependencies for better security and performance

## [](#key-functional-areas-enhanced)Key Functional Areas Enhanced

This release brings significant improvements across major functional areas of Spring AI:

-   **Model Context Protocol (MCP) 0.15.0** - Updated to MCP SDK version 0.15.0 with unified request context API, improved autoconfiguration for MCP tool initialization, and fixed tool callback provider injection issues
-   **Recursive Advisor Execution** - Enabled advisors to call other advisors in a chain with configurable observations, allowing multi-step AI workflows with better monitoring capabilities
-   **Anthropic Citations API** - Added support for retrieving source citations in model responses from Anthropic's Citations API, improving traceability of generated content
-   **OpenAI File API Integration** - Added file upload and management capabilities for OpenAI models, enabling document handling within the OpenAI integration
-   **AWS Bedrock Prompt Caching** - Enabled prompt caching for AWS Bedrock Converse API to reduce costs and improve performance for frequently used prompt
-   **Oracle JDBC Chat Memory** - Added Oracle database support for ChatMemoryRepository, expanding conversation storage options alongside new H2 and SQLite dialect support

These enhancements strengthen Spring AI's capabilities across the entire AI application development lifecycle.

## [](#whats-next)What's Next

The Spring AI team continues to focus on improving AI application development with Spring Boot. Based on the momentum from 1.1.0-M4, we target to release RC soon followed by 1.1.0-GA.

For the latest updates and to contribute to the project, visit our [GitHub repository](https://github.com/spring-projects/spring-ai) or join the discussion in our community channels.

## [](#resources)Resources

[Project Page](https://spring.io/projects/spring-ai/) | [GitHub](https://github.com/spring-projects/spring-ai) | [Issues](https://github.com/spring-projects/spring-ai/issues) | [Documentation](https://docs.spring.io/spring-ai/docs/1.1.0-M4/reference/html) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-ai) 🙏 Contributors Thanks to all contributors who made this release possible:

-   [Alexandros Pappas (apappascs)](https://github.com/apappascs)
-   [ashakirin (ashakirin)](https://github.com/ashakirin)
-   [Austin Dase (adase11)](https://github.com/adase11)
-   [Christian Tzolov (tzolov)](https://github.com/tzolov)
-   [Christopher Miles (cmiles74)](https://github.com/cmiles74)
-   [Daniel Garnier-Moiroux (Kehrlann)](https://github.com/Kehrlann)
-   [Dariusz Jędrzejczyk (chemicL)](https://github.com/chemicL)
-   [David Frizelle (dafriz)](https://github.com/dafriz)
-   [Dev Bulchandani (devbulchandani)](https://github.com/devbulchandani)
-   [Eric Bottard (ericbottard)](https://github.com/ericbottard)
-   [fanxt0218 (fanxt0218)](https://github.com/fanxt0218)
-   [Forte Scarlet (ForteScarlet)](https://github.com/ForteScarlet)
-   [guanxu (guanxuc)](https://github.com/guanxuc)
-   [Hyeri1ee (Hyeri1ee)](https://github.com/Hyeri1ee)
-   [Hyoseop Song (loveysuby)](https://github.com/loveysuby)
-   [Hyunsang Han (HyunSangHan)](https://github.com/HyunSangHan)
-   [Ilayaperumal Gopinathan (ilayaperumalg)](https://github.com/ilayaperumalg)
-   [Issam El-atif (ielatif)](https://github.com/ielatif)
-   [jacquicollier2-eng (jacquicollier2-eng)](https://github.com/jacquicollier2-eng)
-   [James Ward (jamesward)](https://github.com/jamesward)
-   [Jared Rufer (emopti-jrufer)](https://github.com/emopti-jrufer)
-   [Jemin Huh (JM-Lab)](https://github.com/JM-Lab)
-   [Jian (jiafu1115)](https://github.com/jiafu1115)
-   [Jonatan Ivanov (jonatan-ivanov)](https://github.com/jonatan-ivanov)
-   [kuntal1461 (kuntal1461)](https://github.com/kuntal1461)
-   [lance (leehaut)](https://github.com/leehaut)
-   [liugddx (liugddx)](https://github.com/liugddx)
-   [Mark Pollack (markpollack)](https://github.com/markpollack)
-   [Martin Kamp Jensen (mkjensen)](https://github.com/mkjensen)
-   [Mattia Pasetto (wilocu)](https://github.com/wilocu)
-   [MoGreene (Mo-Greene)](https://github.com/Mo-Greene)
-   [NathanGrand (q-nathangrand)](https://github.com/q-nathangrand)
-   [Nicolas Krier (nicolaskrier)](https://github.com/nicolaskrier)
-   [Oleksandr Klymenko (alxkm)](https://github.com/alxkm)
-   [Pawel Potaczala (centrumek)](https://github.com/centrumek)
-   [Philip I. Thomas (philipithomas)](https://github.com/philipithomas)
-   [Sandra Ahlgrimm (SandraAhlgrimm)](https://github.com/SandraAhlgrimm)
-   [Soby Chacko (sobychacko)](https://github.com/sobychacko)
-   [Suganthi Thomas (SuganthiThomas)](https://github.com/SuganthiThomas)
-   [Sun Yuhan (sunyuhan1998)](https://github.com/sunyuhan1998)
-   [Thomas Vitale (ThomasVitale)](https://github.com/ThomasVitale)
-   [Tran Ngoc Nhan (ngocnhan-tran1996)](https://github.com/ngocnhan-tran1996)
-   [vdm24 (vdm24)](https://github.com/vdm24)
-   [Viacheslav Dobrynin (viacheslav-dobrynin)](https://github.com/viacheslav-dobrynin)
-   [Wenli Tian (jamespud)](https://github.com/jamespud)
-   [Willams (nnam-droid12)](https://github.com/nnam-droid12)
-   [Yaner (yaner-here)](https://github.com/yaner-here)
-   [Yanming Zhou (quaff)](https://github.com/quaff)
-   [YunKui Lu (YunKuiLu)](https://github.com/YunKuiLu)
-   [Łukasz Jernaś (deejay1)](https://github.com/deejay1)