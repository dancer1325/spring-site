---
title: Spring Integration 5.4 Release Candidate 1 Available
source: https://spring.io/blog/2020/10/14/spring-integration-5-4-release-candidate-1-available
scraped: 2026-02-23T13:45:21.973Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 14, 2020 | 0 Comments
---

# Spring Integration 5.4 Release Candidate 1 Available

_Releases | Artem Bilan |  October 14, 2020 | 0 Comments_

Dear Spring community,

it’s my pleasure to announce the first (and the last) release candidate for Spring Integration `5.4` generation.

It can be downloaded from our [milestone repository](https://repo.spring.io/milestone):

```
Copycompile 'org.springframework.integration:spring-integration-core:5.4.0-RC1'
```

Since the previous [milestone 3](https://spring.io/blog/2020/09/16/spring-integration-5-4-milestone-3-available) this release brings more into bug fixes and some internal improvements according Project Reactor changes with processors.

The most notable features in this release are:

-   The `LogAccessor` abstraction from Spring Framework is now used internally for better code readability;
    
-   The `ZeroMqMessageHandler` and `ZeroMqMessageProducer` components are now available for one-way interaction with ZeroMq;
    
-   The `ReactiveRedisStreamMessageProducer` now provides an error handling logic via sending an `ErrorMessage` to the `errorChannel`;
    
-   The `AbstractMailReceiver` now has an option to not fetch a `MimeMessage` content eagerly and lets the downstream flow to decide what and how to do with such a mail message.
    

See [What’s New](https://docs.spring.io/spring-integration/docs/5.4.0-RC1/reference/html/whats-new.html#whats-new) in documentation for more information.

This version is going to be pulled in the upcoming Spring Boot `2.4.0-M4` release tomorrow.

It is a perfect time now to report (or contribute) bugs and improvements since we are heading for GA in a couple weeks!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)