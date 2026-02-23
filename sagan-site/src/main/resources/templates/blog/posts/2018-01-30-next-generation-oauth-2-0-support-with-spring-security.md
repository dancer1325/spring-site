---
title: Next Generation OAuth 2.0 Support with Spring Security
source: https://spring.io/blog/2018/01/30/next-generation-oauth-2-0-support-with-spring-security
scraped: 2026-02-23T14:01:37.515Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Joe Grandja |  January 30, 2018 | 23 Comments
---

# Next Generation OAuth 2.0 Support with Spring Security

_Engineering | Joe Grandja |  January 30, 2018 | 23 Comments_

Note

See the latest announcements on [Announcing the Spring Authorization Server](https://spring.io/blog/2020/04/15/announcing-the-spring-authorization-server) and [Spring Security OAuth 2.0 Roadmap Update](https://spring.io/blog/2019/11/14/spring-security-oauth-2-0-roadmap-update)

## [](#current-state)[](#current-state)Current State

The current state of OAuth 2.0 Support, within the Spring projects portfolio, is spread out between [Spring Security OAuth](http://projects.spring.io/spring-security-oauth/), [Spring Cloud Security](https://cloud.spring.io/spring-cloud-security/), [Spring Boot 1.5.x](https://projects.spring.io/spring-boot/), and the new support introduced in [Spring Security 5](https://projects.spring.io/spring-security/). As a user of OAuth, you may be asking, "Which project(s) do I use? And why has Spring Security 5 introduced new support into the mix?"

To put it simply, there was a need to unify the OAuth 2.0 support into one project in order to provide a clear choice to the user and to avoid any potential confusion. In addition, the OAuth 2.0 support needed to take the next level and provide more extensive support for OAuth 2.0 and OpenID Connect 1.0. Also, based on community feedback, documentation needed to be re-vamped in order to allow for ease of use and promote developer productivity. Based on all these factors, we decided to start afresh and build the next generation of OAuth 2.0 support in Spring Security 5.

## [](#the-plan-forward)[](#the-plan-forward)The Plan Forward

The OAuth 2.0 support is currently underway in Spring Security 5 with new *Client* support. The plan is to also provide support for *Resource Server* by mid-2018 and *Authorization Server* by the end of 2018 or early 2019. Our goal is to provide extensive support for [OAuth 2.0 Core and Extensions](https://oauth.net/2/), [OpenID Connect 1.0](http://openid.net/connect/), and [Javascript Object Signing and Encryption (JOSE)](http://jose.readthedocs.io/en/latest/).

If you are interested in finding out more about which OAuth 2.0 and OpenID Connect 1.0 features will be implemented in Spring Security 5, you may track upcoming features in the [Spring Security GitHub](https://github.com/spring-projects/spring-security/issues) repo using the [OAuth2](https://github.com/spring-projects/spring-security/labels/OAuth2), [OIDC](https://github.com/spring-projects/spring-security/labels/OIDC), and [JWT-JOSE](https://github.com/spring-projects/spring-security/labels/JWT-JOSE) labels.

## [](#future-of-legacy-spring-security-oauth-project)[](#future-of-legacy-spring-security-oauth-project)Future of Legacy Spring Security OAuth Project

At this time, we would also like to announce that the [Spring Security OAuth](http://projects.spring.io/spring-security-oauth/) project is officially in maintenance mode. We will provide bug/security fixes and consider adding minor features but we will not be adding major features. Our focus and efforts going forward will be put into building all the features currently in Spring Security OAuth into Spring Security 5.x. After Spring Security has reached feature parity with Spring Security OAuth, we will continue to support bugs and security fixes for at least one year.

## [](#feature-matrix--roadmap)[](#feature-matrix-roadmap)Feature Matrix / Roadmap

We’ve put together a [feature matrix](https://github.com/spring-projects/spring-security/wiki/OAuth-2.0-Features-Matrix) that outlines all the OAuth 2.0 features implemented by the various projects within the Spring portfolio. This matrix may be used to determine which project(s) to use (today) based on your OAuth 2.0 requirements. It also serves as a roadmap of the features to be implemented as we move towards feature parity with Spring Security OAuth.

For any additional inquiries you may have, please see the [Frequently Asked Questions](https://github.com/spring-projects/spring-security/wiki/OAuth-2.0-Features-Matrix#frequently-asked-questions) on our wiki or reach out to me [@joe\_grandja](https://twitter.com/joe_grandja) or Rob [@rob\_winch](https://twitter.com/rob_winch) on Twitter.