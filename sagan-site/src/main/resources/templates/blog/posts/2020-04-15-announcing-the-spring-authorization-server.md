---
title: Announcing the Spring Authorization Server
source: https://spring.io/blog/2020/04/15/announcing-the-spring-authorization-server
scraped: 2026-02-23T10:45:29.218Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  April 15, 2020 | 58 Comments
---

# Announcing the Spring Authorization Server

_Engineering | Rob Winch |  April 15, 2020 | 58 Comments_

I am pleased to announce the [Spring Authorization Server](https://github.com/spring-projects-experimental/spring-authorization-server) project. It is a community-driven project led by the Spring Security team and is focused on delivering [Authorization Server](https://tools.ietf.org/html/rfc6749#section-1.1) support to the Spring community.

## [](#a-foundation-for-success)[](#a-foundation-for-success)A Foundation for Success

The story of how we got here is long, but the key takeaway is short and sweet: Spring would not be what it is without our amazing community.

Almost a decade ago, we brought in a community-driven, open-source project, [Spring Security OAuth](https://github.com/spring-projects/spring-security-oauth/), and made it part of the Spring portfolio of projects. Since its inception, it has evolved into a mature project that supports a large portion of the OAuth specification, including resource servers, clients, login, and the authorization server. It is no wonder that it has become the basis for [UAA](https://github.com/cloudfoundry/uaa), which, among other things, acts as the identity management service for all [Cloud Foundry](https://www.cloudfoundry.org/) installations. The Spring Security OAuth project has become a model project and is a testament to what our wonderful community can accomplish.

## [](#building-on-community-success)[](#building-on-community-success)Building on Community Success

Since the project’s inception, the OAuth world has evolved significantly. For that reason, we decided to build on our success as a community and [rewrite Spring Security OAuth](https://spring.io/blog/2018/01/30/next-generation-oauth-2-0-support-with-spring-security) to better align Spring’s OAuth story, simplify the code base, and make Spring’s OAuth support more nimble.

First, the original OAuth support was done very early on and could not have anticipated all the different ways in which it would need to be used. This drove many Spring projects to provide their own OAuth support. By performing a rewrite, we were able to address the needs of the entire Spring portfolio and provide a single cohesive OAuth library.

Second, when the OAuth project was originally written, it included support for both OAuth 1.0 and OAuth 2.0. Since then, OAuth 2.0 has officially made [OAuth 1.0 obsolete](https://tools.ietf.org/html/rfc6749). For that reason, the new support was able to focus solely on OAuth 2.0, which has simplified the code significantly.

Third, the original project provided all of its own library support. Now, with many libraries to choose from, we were able to fold it into Spring Security proper by providing an abstraction around an existing library named Nimbus. By building on top of Nimbus, we were able to move more quickly and add more features, such as better support for JWT claims, OIDC, reactive programming, and so much more.

It’s impressive how the community has continued to build on its past success.

## [](#learning-from-our-community)[](#learning-from-our-community)Learning from Our Community

Obviously, rewriting Spring Security’s OAuth support is a monumental effort. To begin, the team decided to split up the work into the client, the resource server, and the authorization server. As we progressed with the client and the resource server, we became more and more convinced that we shouldn’t provide authorization server support.

Since the Spring Security OAuth project was created, the number of authorization server choices has grown significantly. Additionally, we did not feel like creating an authorization server was a common scenario. Nor did we feel like it was appropriate to provide authorization support within a framework with no library support. After careful consideration, the Spring Security team decided that we would [not formally support creating authorization servers](https://spring.io/blog/2019/11/14/spring-security-oauth-2-0-roadmap-update).

Since our blog post, the community has spoken and we listened. From feedback on the blog, chatter in Gitter, and comments in GitHub, we were flooded with a consistent message: The Spring ecosystem needs support for an authorization server.

## [](#the-plan-going-forward)[](#the-plan-going-forward)The Plan Going Forward

Until this moment, [Spring Authorization Server](https://github.com/spring-projects-experimental/spring-authorization-server) was just an idea. Now, we would like to formally introduce Spring Authorization Server as a community-driven project led by the Spring Security team.

The project will start in Spring’s experimental projects as an independent project so that it can evolve more rapidly. With your help, this project will grow in the same way that the original Spring Security OAuth project did.

## [](#getting-involved)[](#getting-involved)Getting Involved

We would love to have you join us on this journey. If you would like to get involved, please read through the [CONTRIBUTING](https://github.com/spring-projects-experimental/spring-authorization-server/blob/master/CONTRIBUTING.adoc) documentation. We cannot wait to hear from you, and, as always, thank you for being a part of the Spring community!