---
title: Spring Cloud Stream 1.0.0.RC2 is now available
source: https://spring.io/blog/2016/04/07/spring-cloud-stream-1-0-0-rc2-is-now-available
scraped: 2026-02-23T19:19:39.759Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marius Bogoevici |  April 07, 2016 | 0 Comments
---

# Spring Cloud Stream 1.0.0.RC2 is now available

_Releases | Marius Bogoevici |  April 07, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce the release of Spring Cloud Stream 1.0.0.RC2, available [here](http://repo.spring.io/libs-milestone/). As part of the release candidate cycle, it comes with a number of bug fixes and a small number adjustments. The complete list of changes is available [here](https://github.com/spring-cloud/spring-cloud-stream/issues?q=milestone%3A1.0.0.RC2).

Some highlights:

-   Spring Cloud Stream applications now use the `ObjectMapper` provided by Spring Boot, if available;
-   Header embedding is now a general purpose producer/consumer property. It can be enabled or disabled by middlewares that require embedding for header propagation. This allows easier interoperability outside Spring Cloud Stream; (until now it was a Kafka-specific property);
-   Further documentation and sample improvements.

We are looking forward to a `1.0.0.RELEASE` in a couple of weeks, in the second part of April.

And, as always, we welcome feedback: either in [GitHub](https://github.com/spring-cloud/spring-cloud-stream), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud-stream), or on [Twitter](https://twitter.com/springcentral).