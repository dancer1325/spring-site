---
title: Spring Integration 5.5.17, 6.0.4 and 6.1.0-M2 Available
source: https://spring.io/blog/2023/03/23/spring-integration-5-5-17-6-0-4-and-6-1-0-m2-available
scraped: 2026-02-23T09:59:44.443Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 23, 2023 | 0 Comments
---

# Spring Integration 5.5.17, 6.0.4 and 6.1.0-M2 Available

_Releases | Artem Bilan |  March 23, 2023 | 0 Comments_

Dear Spring community,

On behalf of the team, it is my pleasure to announce that Spring Integration `6.1.0-M2` is now available from Spring Milestone repository.

In addition bug fixes versions `5.5.17` and `6.0.4` have been released. They also include upgrades to the latest point versions of dependencies with their bug fixes.

The Spring Integration `6.1` version is a natural evolution of `6.x` generation with fixes and improvements which didn't make it into `6.0`. Plus we listen to community and make some possibly but convenient for target projects breaking changes.

Some highlights of this new version include:

-   Upgrades to the latest dependencies, but only if they don't break the public API we expose
    
-   Added Protobuf transformers support (shout out to [Christian Tzolov](https://spring.io/team/tzolov))
    
-   Migration of Zip extension to respective module in the core project
    
-   The `MessageFilter` now emits a WARN log when a request message is dropped making it, technically, not silent as it was before
    
-   Now gateways and replying handlers don't block forever for sending and receiving operations.
    

The default timeout in the framework is chosen to be `30` seconds

See [What's New](https://docs.spring.io/spring-integration/docs/6.1.0-M2/reference/html/whats-new.html#whats-new) in the documentation and don't forget about a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.0-to-6.1-Migration-Guide).

Following Spring Boot release cadence we are going to have Spring Integration `6.1.0-RC1` in April and then GA in May - just for upcoming Spring Boot `3.1.0`. Feel free to contribute whatever you find valuable!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)