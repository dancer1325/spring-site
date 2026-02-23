---
title: Announcing nohttp
source: https://spring.io/blog/2019/06/10/announcing-nohttp
scraped: 2026-02-23T14:36:55.377Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  June 10, 2019 | 2 Comments
---

# Announcing nohttp

_Engineering | Rob Winch |  June 10, 2019 | 2 Comments_

I’m pleased to announce the [nohttp](https://github.com/spring-io/nohttp) project, which lets users find, replace, and prevent the usage of `http://`.

# [](#background)[](#background)Background

Today, [Jonathan Leitschuh](https://github.com/JLLeitschuh) published a blog titled [Want to take over the Java ecosystem? All you need is a MITM!](https://medium.com/@jonathan.leitschuh/want-to-take-over-the-java-ecosystem-all-you-need-is-a-mitm-1fc329d898fb). The blog demonstrates that hundreds of Java libraries are downloading dependencies over HTTP. This opens the projects up to potential [MITM (man in the middle) attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Unfortunately, there were multiple Spring projects that were using HTTP to download dependencies. Fortunately, we uncovered no signs of a successful MITM attack. We have also addressed the issue to ensure that no MITM attacks can be made in the future.

# [](#spring-team-reaction)[](#spring-team-reaction)Spring Team Reaction

The Spring Team takes security very seriously. Since discovering that there were Spring projects downloading dependencies over HTTP, we have taken measures to ensure that a MITM attack cannot happen in the future. The most obvious change is to update Maven repository locations to use HTTPS. However, we have taken this much further by switching to using HTTPS (almost) everywhere.

It is 2019, so, hopefully, it is apparent why we want to remove the usage of HTTP. Using HTTPS is [fast](https://istlsfastyet.com/), [simple](https://httpsiseasy.com/), and [available for free](https://letsencrypt.org/), so there are no excuses for continuing to use HTTP. As developers, it is important that we help the world transition to use HTTPS everywhere (even [static sites need HTTPS](https://www.troyhunt.com/heres-why-your-static-website-needs-https/)).

We certainly are not the only ones trying to eliminate HTTP usage. [Let’s Encrypt](https://letsencrypt.org/) was formed to make HTTPS free, automated, and open. [Chrome has updated its UI](https://blog.chromium.org/2018/05/evolving-chromes-security-indicators.html) to indicate that HTTP is insecure. [Maven Central has deprecated the use of HTTP](https://central.sonatype.org/articles/2019/Apr/30/http-access-to-repo1mavenorg-and-repomavenapacheorg-is-being-deprecated/). The list goes on.

## [](#replacing-http-with-https)[](#replacing-http-with-https)Replacing HTTP with HTTPS

The Spring team has gone to great lengths to update all of our URLs to use HTTPS. This includes everything from our Maven repository URLs, to Apache License, to documentation links. There are some instances where using HTTPS was not possible. For example, some sites we link to do not support HTTPS, XML namespace identifiers must match the identifier in the document, and so on.

## [](#https-xml-locations-through-the-classpath)[](#https-xml-locations-through-the-classpath)HTTPS XML Locations through the Classpath

In our efforts to eliminate HTTP usage, Spring Framework [has been updated](https://github.com/spring-projects/spring-framework/issues/22504) to resolve XML locations that use HTTPS locations through the classpath. Previously, this was only done for URLs that used HTTP. Consider the following XML configuration:

```
Copy<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">
```

The `[https://www.springframework.org/schema/beans/spring-beans.xsd](https://www.springframework.org/schema/beans/spring-beans.xsd)` URL is resolved through the classpath instead of requiring a network connection.

Notice that the XML namespace name, which is an identifier, cannot be changed to use HTTPS. This is not ideal from the perspective of being able to put [security controls](https://en.wikipedia.org/wiki/Security_controls) in place, but the name is never requested over a network, so it poses little harm to users.

## [](#infrastructure-updates)[](#infrastructure-updates)Infrastructure Updates

The Spring team has updated all our hosts to ensure that HTTPS is being used. Each site supports HTTPS, redirects to HTTPS, and uses [Strict Transport Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security).

A potential MITM means that our build infrastructure could have been compromised. In response to this, we repaved all of our build infrastructure and rotated all of our credentials.

# [](#new-security-controls)[](#new-security-controls)New Security Controls

While it is important to react to a security incident, it is also important to put [security controls](https://en.wikipedia.org/wiki/Security_controls) in place to ensure the problem does not happen again.

We have updated our build boxes to block HTTP traffic to ensure that this cannot happen again. To protect developers and our users, we have created the [nohttp](https://github.com/spring-io/nohttp) project. This project can be used to find, replace, and prevent `http://` usage while being pragmatic about allowing URLs that cannot change (such as XML namespace names). For additional details, refer to the project’s site.

# [](#join-us)[](#join-us)Join Us

We hope that you will join the revolution to help eliminate the usage of HTTP.