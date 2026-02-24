---
title: Spring Security OAuth
source: https://spring.io/blog/2011/09/12/spring-security-oauth
scraped: 2026-02-24T08:34:49.029Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Chloe Jackson |  September 12, 2011 | 1 Comment
---

# Spring Security OAuth

_News | Chloe Jackson |  September 12, 2011 | 1 Comment_

# Welcome

Welcome to OAuth for Spring Security!

As you can probably deduce from its name, the purpose of this project is to provide an [OAuth](http://oauth.net) implementation for [Spring Security](/spring-security). Support is provided for the implementation of OAuth providers and OAuth consumers. There is also support for two-legged OAuth (a.k.a. "Signed Fetch") and for [OAuth 2.0](http://tools.ietf.org/html/draft-ietf-oauth-v2).

Applying security to an application is not for the faint of heart, and OAuth is no exception. Before you get started, you're going to want to make sure you understand OAuth and the problem it's designed to address. There is good documentation at [the OAuth site](http://oauth.net) and [a good illustration of how OAuth is applied](http://oauth.net/documentation/getting-started). You will also want to make sure you understand how [Spring](/spring-core) and [Spring Security](/spring-security) work.

With that, you're ready to get started. You'll want to see [OAuth for Spring Security in action](https://github.com/SpringSource/spring-security-oauth/wiki/tutorial) and read a more detailed explanation in the [user guide](https://github.com/SpringSource/spring-security-oauth/wiki/devguide).

If you run into problems or have other questions, please use the [forum](http://forum.springsource.org/forumdisplay.php?79-OAuth).

## Maven Artifacts

Here is the Spring Milestone Repository:

<repository>  
    <id>spring-milestone</id>  
    <name>Spring Maven MILESTONE Repository</name>  
    <url>http://maven.springframework.org/milestone</url>  
</repository>

Here is the dependency:

<dependency>  
 <groupId>org.springframework.security.oauth</groupId>  
 <artifactId>spring-security-oauth</artifactId>  
 <version>1.0.0.M4</version>  
</dependency>