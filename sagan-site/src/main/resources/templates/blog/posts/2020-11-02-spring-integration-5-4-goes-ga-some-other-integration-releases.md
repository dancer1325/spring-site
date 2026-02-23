---
title: Spring Integration 5.4 goes GA; some other Integration releases
source: https://spring.io/blog/2020/11/02/spring-integration-5-4-goes-ga-some-other-integration-releases
scraped: 2026-02-23T13:43:13.670Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  November 02, 2020 | 0 Comments
---

# Spring Integration 5.4 goes GA; some other Integration releases

_Releases | Artem Bilan |  November 02, 2020 | 0 Comments_

Dear Spring community,

On behalf the team and everybody contributed, it’s my pleasure to announce that last week we released general availability for Spring Integration `5.4`.

It can be downloaded from Maven Central:

```
Copycompile 'org.springframework.integration:spring-integration-core:5.4.0'
```

Here is a summary of features and improvements for this Spring Integration generation:

-   R2DBC channel adapters;
    
-   ZeroMQ proxy, message channel and channel adapters;
    
-   Redis Streams channel adapters (which are reactive);
    
-   The `spring-integration-kafka` extension has been moved to the core project and, alongside with an upgrade to the latest Spring for Apache Kafka `2.6.2`, includes some improvements;
    
-   The `RenewableLockRegistry` is implemented for the `JdbcLockRegistry`.
    

See [What’s New](https://docs.spring.io/spring-integration/docs/5.4.0/reference/html/whats-new.html#whats-new) in documentation for more information.

This version is included into dependency management of Spring Boot [`2.4.0-RC1`](https://spring.io/blog/2020/10/30/spring-boot-2-4-0-rc1-available-now).

## [](#other-relevant-releases)[](#other-relevant-releases)Other relevant releases

We also released several maintenance versions and some Spring Integration extensions:

-   Spring Integration `5.1.13.RELEASE` - the last release in this generation: has reached its End of Life and goes out of support starting this November;
    
-   Spring Integration `5.2.9.RELEASE` - includes bug fixes and dependencies upgrades; going to be supported until Spring Boot `2.2` generation;
    
-   Spring Integration `5.3.3.RELEASE` - includes bug fixes and dependencies upgrades; going to be supported until Spring Boot `2.3` generation;
    
-   `spring-integration-aws-2.3.4.RELEASE` - upgrades, some good contribution and several bug fixes; based on Spring Integration `5.3.3.RELEASE` and Spring Cloud AWS `2.2.4.RELEASE`;
    
-   `spring-cloud-stream-binder-aws-kinesis-2.0.3.RELEASE` - some good contributions and upgrades to the latest dependencies;
    
-   `spring-integration-cassandra-0.9.0` - based on Spring Integration `5.4` and Spring Data `2020.0.0`; used by the latest [Stream Applications](https://github.com/spring-cloud/stream-applications);
    
-   `spring-integration-hazelcast-3.0.0` - upgrades to the latest versions of Spring Integration and Hazelcast and respective API incompatibility fixes.
    

See more information in [Spring Integration Extensions](https://github.com/spring-projects/spring-integration-extensions) project.

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)