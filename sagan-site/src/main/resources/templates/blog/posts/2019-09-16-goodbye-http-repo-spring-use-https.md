---
title: Goodbye http://repo.spring (use https)
source: https://spring.io/blog/2019/09/16/goodbye-http-repo-spring-use-https
scraped: 2026-02-23T14:36:51.013Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  September 16, 2019 | 12 Comments
---

# Goodbye http://repo.spring (use https)

_Engineering | Rob Winch |  September 16, 2019 | 12 Comments_

In response to our [nohttp announcement](https://spring.io/blog/2019/06/10/announcing-nohttp), [Maven Central’s announcement](https://central.sonatype.org/articles/2019/Apr/30/http-access-to-repo1mavenorg-and-repomavenapacheorg-is-being-deprecated/), and [JFrog’s announcement](https://jfrog.com/blog/secure-jcenter-with-https/), beginning January 15 2020, Spring’s Maven Repository will no longer support HTTP. More concretely, [http://repo.spring.io](http://repo.spring.io) will not respond to requests. Users will need to ensure that they are using [https://repo.spring.io](https://repo.spring.io)

We are not going to redirect from http to https because it perpetuates the vulnerability. When the first request is made over http, a man in the middle (MITM) can prevent the redirect and replace the response with a malicious payload. Users that continue to use http will continue to be vulnerable to MITM attacks.

It is worth pointing out that redirecting to https is beneficial to browsers. This is because after the redirect to https within a browser, subsequent requests will then make any subsequent requests over https. The user is vulnerable in the initial request, but the number of vulnerable requests drops to just the initial requests. This can be further improved for a browser by using [Strict Transport Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) to eliminate any initial requests to http going forward.

The browser behavior, which preserves state, is quite different from a CLI client which will continue to request every resource over http. This is why we are not doing a redirect. We want the CLI clients to fail fast so they know they need to protect themselves.