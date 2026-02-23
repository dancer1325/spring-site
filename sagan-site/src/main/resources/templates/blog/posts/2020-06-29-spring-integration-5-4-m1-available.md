---
title: Spring Integration 5.4 M1 Available
source: https://spring.io/blog/2020/06/29/spring-integration-5-4-m1-available
scraped: 2026-02-23T13:52:27.993Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  June 29, 2020 | 0 Comments
---

# Spring Integration 5.4 M1 Available

_Releases | Artem Bilan |  June 29, 2020 | 0 Comments_

Dear Spring community,

On behalf of the team and everyone who contributed, it is my pleasure to announce the first milestone for Spring Integration `5.4` generation.

It can be downloaded from our [milestone repository](https://repo.spring.io/milestone):

```
Copycompile 'org.springframework.integration:spring-integration-core:5.4.0-M1'
```

The Spring Integration `5.4` generation is full based on recently released Spring Framework `5.3 M1` including all the deprecation resolutions, removal some obsolete API and aggressive upgrade the latest versions for dependencies.

Long-waiting community request has been fulfilled and now Spring Integration Kafka is a module in Spring Integration core project leaving the extension repository in the maintenance mode for previous versions support.

The R2DBC has made it into the project as an obvious `spring-integration-r2dbc` module. At the moment only `R2dbcMessageHandler` is present to perform `INSERT`, `UPDATE`, `DELETE` operations from integration flow in reactive maner. More components are coming in the next milestones.

The Redis Stream support have been introduced as a `ReactiveRedisStreamMessageHandler`. The Inbound Channel Adapter is coming in the next milestones.

The project is now compatible with Java `14`. We’re looking what can be done for Java `17` compatibility.

Also some other internal improvements, minor and critical bug fixed have been done, of course, with an appropriate back-port into maintenance versions which are scheduled to be released just in time for respective Spring Boot versions

See `What’s New?` in the [Reference Manual](https://docs.spring.io/spring-integration/docs/5.4.0-M1/reference/html/whats-new.html#whats-new) for more information.

In addition to this Spring Integration `5.4 M1` we also have released maintenance versions for these extensions:

-   `spring-integration-zip-1.0.3.RELEASE`
    
-   `spring-integration-cassandra-0.8.0.RELEASE`
    
-   `spring-integration-smb-1.2.1.RELEASE`
    

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)