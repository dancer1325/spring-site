---
title: Spring Authorization Server moving to Spring Security 7.0
source: https://spring.io/blog/2025/09/11/spring-authorization-server-moving-to-spring-security-7-0
scraped: 2026-02-23T07:31:05.887Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Joe Grandja |  September 11, 2025 | 0 Comments
---

# Spring Authorization Server moving to Spring Security 7.0

_Engineering | Joe Grandja |  September 11, 2025 | 0 Comments_

[Spring Authorization Server](https://spring.io/projects/spring-authorization-server) has come a long way since `1.0` was officially released in November 2022. Starting as a project separate from [Spring Security](https://spring.io/projects/spring-security), has allowed it to iterate quickly on feature development and ultimately grow a rich feature set for building OAuth2 Authorization Servers.

It has reached that point of maturity and stability and we believe the time is now to move it to [Spring Security](https://github.com/spring-projects/spring-security) `7.0`.

The main benefit this will provide our users is a streamlined developer experience. Whether you are working with OAuth2 Client or OAuth2 Authorization Server, you won’t need to switch between projects any longer as the source, javadoc and [reference documentation](https://docs.spring.io/spring-security/reference/7.0/servlet/oauth2/authorization-server/index.html) will live in Spring Security. Furthermore, issues and pull requests will be solely managed within Spring Security GitHub repository for all of the OAuth2 features.

We also expect the migration impact to be quite minimal for our users as the maven coordinates, `groupId` and `artifactId`, will remain the same with the exception of the `version`. For example, the Spring Security `7.0` maven coordinates will be `org.springframework.security:spring-security-oauth2-authorization-server:7.0.0`. Also, the existing classes will remain the same in name and package location with the exception of a couple of minor package relocation changes that we’re confident will be a straightforward migration update.

We hope you’re excited as we are as we prepare to move Spring Authorization Server to Spring Security `7.0`.