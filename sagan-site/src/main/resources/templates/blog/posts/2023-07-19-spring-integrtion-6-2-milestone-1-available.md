---
title: Spring Integration 6.2 Milestone 1 Available
source: https://spring.io/blog/2023/07/19/spring-integrtion-6-2-milestone-1-available
scraped: 2026-02-23T09:22:47.940Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 19, 2023 | 0 Comments
---

# Spring Integration 6.2 Milestone 1 Available

_Releases | Artem Bilan |  July 19, 2023 | 0 Comments_

Dear Spring community,

On behalf of Spring Integration team, it is my pleasure to announce `6.2.0-M1` version which is available from [Spring Milestone](https://repo.spring.io/milestone) repository.

In addition, bug fixes version `6.1.2` has been released as well into Maven Central.

The Spring Integration `6.2` version is based on the Spring Framework `6.1.0-M2` (can be upgraded to the latest [`6.1.0-M3`](https://spring.io/blog/2023/07/19/spring-framework-6-1-m3-released)) and includes many internal improvements and refactoring to support JVM virtual thread and project CRaC effort.

Some highlights of this new version include:

-   Upgrades to the latest dependencies, some of they are release candidates and milestones
    
-   We now use `org.eclipse.angus:jakarta.mail` as Java Mail API implementation which replaces `com.sun.mail.imap` package with the `org.eclipse.angus.mail.imap`. Therefore this some kind of breaking change
    
-   A `spring-integration-debezium` module has been introduced with a `DebeziumMessageProducer` implementation and respective infrastructure, including Java DSL (shout out to [Christian Tzolov](https://spring.io/team/tzolov))
    
-   Pollers now can be configured with an ISO 8601 duration format for delays
    
-   Components which logic is based on thread executors now expose a proper `AsyncTaskExecutor` option to let end-user to opt-in for a new `VirtualThreadTaskExecutor` from Spring Framework.
    

Java DSL (and therefore Kotlin & Groovy) now provides a single `Consumer` argument configuration methods for better end-user experience. The code like:

```
Copy.transform((Integer p) -> p * 2, c -> c.advice(expressionAdvice()))
```

now is replaced with:

```
Copy.transformWith(t -> t
       .transformer((Integer p) -> p * 2)
       .advice(expressionAdvice()))
```

It might be a verbose, but easier to read and auto-complete in the IDE instead of hard choice of overloaded `transform()` method with many arguments. The Groovy DSL with this change looks much nicer:

```
CopysplitWith {
    expectedType Object
    id 'splitterEndpoint'
    function { it }
}
```

Not all DSL operators were fixed for this new style yet: stay tuned for next milestones.

See [What's New](https://docs.spring.io/spring-integration/docs/6.2.0-M1/reference/html/whats-new.html#whats-new) in the documentation and don't forget about a [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-6.1-to-6.2-Migration-Guide).

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)