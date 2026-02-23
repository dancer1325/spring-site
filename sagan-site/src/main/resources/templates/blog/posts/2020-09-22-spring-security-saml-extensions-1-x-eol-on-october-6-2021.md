---
title: Spring Security SAML Extensions 1.x EOL on October 6, 2021
source: https://spring.io/blog/2020/09/22/spring-security-saml-extensions-1-x-eol-on-october-6-2021
scraped: 2026-02-23T13:47:00.362Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Josh Cummings |  September 22, 2020 | 2 Comments
---

# Spring Security SAML Extensions 1.x EOL on October 6, 2021

_Releases | Josh Cummings |  September 22, 2020 | 2 Comments_

With the recent release of Spring Security 5.4, we’d like to announce that maintenance for [Spring Security SAML Extensions 1.x](https://github.com/spring-projects/spring-security-saml) will end on 6 October 2021.

[SAML 2.0 support](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#servlet-saml2) has been added to the core Spring Security framework over the last three minor releases. There are two main reasons for this.

First, the extension project is based on a version of OpenSAML that the OpenSAML team no longer supports. This version has known CVEs that make it unsafe for use in a production system.

Second, moving the support to the core Spring Security framework allowed us to simplify the API, use the latest OpenSAML, and add long-requested support for features like [multi-tenancy](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#servlet-saml2login-relyingpartyregistration) and [Spring Boot integration](https://docs.spring.io/spring-security/site/docs/current/reference/html5/#servlet-saml2login-minimalconfiguration).

More SAML work is planned for Spring Security to bring it closer into alignment with the extension’s capabilities. Please feel free to [file tickets](https://github.com/spring-projects/spring-security/issues/new/choose) or [contribute features](https://github.com/spring-projects/spring-security/issues?q=is%3Aissue+is%3Aopen+label%3A%22in%3A+saml2%22)!