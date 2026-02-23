---
title: Spring Integration 5.0 Milestone 7 and 4.3.12 Available
source: https://spring.io/blog/2017/09/14/spring-integration-5-0-milestone-7-and-4-3-12-available
scraped: 2026-02-23T16:16:41.520Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 14, 2017 | 0 Comments
---

# Spring Integration 5.0 Milestone 7 and 4.3.12 Available

_Releases | Artem Bilan |  September 14, 2017 | 0 Comments_

On behalf of the Spring Integration team I am pleased to announce that the Milestone 7 for the Spring Integration 5.0 version (`5.0.0.M7`) is now available.

It is available for download from the [Milestone Repository](https://repo.spring.io/milestone):

```
Copyrepositories {
    maven { url 'http://repo.spring.io/libs-milestone' }
}
compile "org.springframework.integration:spring-integration-core:5.0.0.M7"
```

[21 JIRAs](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=16253) (and some GitHub issues) made into this release, including bug fixes and a number of new features. Some highlights of features in the `M7`, since the previously announced [Milestone 6](https://spring.io/admin/blog/2984-spring-integration-5-0-milestone-6-available):

-   Reactive WebFlux Channel Adapters has been extracted to the separate `spring-integration-webflux` module to distinguish Servlet-based MVC configuration from the Reactive foundation.
    
-   The `EmbeddedJsonHeadersMessageMapper` is introduced to allow embedding message headers together with the payload into packages for target protocols which doesn’t support headers natively, for example TCP/IP, MQTT, AWS Kinesis and Apache Kafka before version `0.11.x`.
    
-   The `java.util.function.Supplier` can now act as a `MessageSource`:
    

```
Copy@Bean

@InboundChannelAdapter(value = "myChannel")
public Supplier<Integer> counterMessageSupplier(AtomicInteger counter) {
    return () -> counter.incrementAndGet();
}
```

-   a `spring.integration.endpoints.noAutoStartup` global integration property has been added to configure patterns for endpoints which should not be started automatically on the application start up.

Special thanks to several community members for their ongoing active contributions to the framework; scan [the commits](https://github.com/spring-projects/spring-integration/commits/v5.0.0.M7) and give them some kudos!

For a complete list of changes in `5.0`, also see the [What’s New](http://docs.spring.io/spring-integration/docs/5.0.0.M7/reference/html/whats-new.html) chapter in the reference manual.

There are still several features (Reactive and Testing) we would like to include into the current version, so stay tuned for next Milestones! We expect RC and subsequent GA somewhere in the end of October, beginning of November, - just before Spring Boot `2.0 GA`!

In addition version `4.3.12` has been released as well with some valuable bug fixes. It is already a part of Spring Boot [1.5.7](https://spring.io/blog/2017/09/12/spring-boot-1-5-7-available-now) and it is recommended to upgrade for better experience.

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels:

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)