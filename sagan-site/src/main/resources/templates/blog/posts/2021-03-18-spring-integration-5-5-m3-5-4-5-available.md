---
title: Spring Integration 5.5 M3 & 5.4.5 Available
source: https://spring.io/blog/2021/03/18/spring-integration-5-5-m3-5-4-5-available
scraped: 2026-02-23T13:26:43.064Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 18, 2021 | 0 Comments
---

# Spring Integration 5.5 M3 & 5.4.5 Available

_Releases | Artem Bilan |  March 18, 2021 | 0 Comments_

Dear Spring community,

On behalf the team and external contributors, it’s my pleasure to announce a `Milestone 3` release for Spring Integration `5.5`, plus Spring Integration `5.4.5` patch version.

The latest one can be downloaded from Maven Central:

```
Copycompile 'org.springframework.integration:spring-integration-core:5.4.5'
```

and it is recommended to upgrade your projects or just pull it transitively from just released Spring Boot [`2.4.4`](https://spring.io/blog/2021/03/18/spring-boot-2-4-4-available-now)!

The Milestone is available from the [https://repo.spring.io/milestone/](https://repo.spring.io/milestone/) repository:

```
Copycompile 'org.springframework.integration:spring-integration-core:5.5.0-M3'
```

The `5.5` generation of Spring Integration is the last one in the line before we start `6.0` and it is mostly based on the community feedback and usability needs. For example we have reworked some warning messages in logs to the fail-fast errors during configuration phase. Plus some API was deprecated with possible removal in the next major version. So, be sure check the [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-5.4-to-5.5-Migration-Guide) since the upgrade may cause some breaking changes.

Here is a summary of features and improvements for this Spring Integration generation:

-   The `FileAggregator` component for another side of the `FileSplitter` logic;
    
-   The `MessageGroupStore.streamMessagesForGroup(Object groupId)` for better memory management;
    
-   The `maxMessagesPerPoll` with `0` as value for an `AbstractPollingEndpoint` is treated now as to skip the current poll;
    
-   The `@Reactive` sub-annotation for `@ServiceActivator`,`@Transformer` etc, and `ConsumerEndpointSpec.reactive()` to provide a `reactiveCustomizer` `Function` for the `ReactiveStreamsConsumer`;
    
-   The `MongoDbMessageSource` and `ReactiveMongoDbMessageSource` have now an `update` query option to mark polled document for skipping them on the next polling cycle.
    

See [What’s New](https://docs.spring.io/spring-integration/docs/5.5.0-M3/reference/html/whats-new.html) in documentation for more information.

Also the documentation has started to be more modern and is including code block switchers. See some sample in the [JMS chapter](https://docs.spring.io/spring-integration/docs/5.5.0-M3/reference/html/jms.html#jms-inbound-channel-adapter). There are still too many pages to fix the same way and alongside with XML configs include more Java samples, so any help from you with this journey will be appreciated.

Any feedback is welcome while we are heading to `RC1` in mid-April!

Cheers,   
Artem

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)