---
title: Spring Integration 5.4 M2 Available
source: https://spring.io/blog/2020/08/12/spring-integration-5-4-m2-available
scraped: 2026-02-23T13:52:23.660Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  August 12, 2020 | 0 Comments
---

# Spring Integration 5.4 M2 Available

_Releases | Artem Bilan |  August 12, 2020 | 0 Comments_

Dear Spring community,

On behalf of the team and everyone who contributed, it is my pleasure to announce the second milestone for Spring Integration `5.4` generation.

It can be downloaded from our [milestone repository](https://repo.spring.io/milestone):

```
Copycompile 'org.springframework.integration:spring-integration-core:5.4.0-M2'
```

This version continues a story since [milestone 1](https://spring.io/blog/2020/06/29/spring-integration-5-4-m1-available) for aggressive dependencies upgrades and deprecation removals, including legacy metrics.

Some key highlights in this milestone alongside with the number of bugfixes and refactorings:

-   The fix for [CVE-2020-5413](https://spring.io/blog/2020/07/22/spring-integration-4-3-23-5-1-12-5-2-8-5-3-2-available-cve-2020-5413);
    
-   An Inbound Channel Adapter for R2DBC;
    
-   A Reactive Message Producer implementation for Redis Stream;
    
-   A `ZeroMqChannel` is implemented, too;
    
-   The RMI module is deprecated now.
    

See [What’s New](https://docs.spring.io/spring-integration/docs/5.4.0-M2/reference/html/whats-new.html#whats-new) in documentation for more information.

You are welcome with any feedback and possible contribution!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)