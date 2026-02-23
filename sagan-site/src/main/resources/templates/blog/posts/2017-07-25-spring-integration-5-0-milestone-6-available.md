---
title: Spring Integration 5.0 Milestone 6 Available
source: https://spring.io/blog/2017/07/25/spring-integration-5-0-milestone-6-available
scraped: 2026-02-23T16:26:12.481Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  July 25, 2017 | 0 Comments
---

# Spring Integration 5.0 Milestone 6 Available

_Releases | Artem Bilan |  July 25, 2017 | 0 Comments_

On behalf of the Spring Integration team I am pleased to announce that the Milestone 6 for the Spring Integration 5.0 version (`5.0.0.M6`) is now available.

It is available for download from the [Milestone Repository](https://repo.spring.io/milestone):

```
Copyrepositories {
    maven { url 'http://repo.spring.io/libs-milestone' }
}
compile "org.springframework.integration:spring-integration-core:5.0.0.M6"
```

[19 JIRAs](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=16230) (and some GitHub issues) made into this release, including bug fixes and a number of new features. Some highlights of features in the `M6`, since the previously announced [Milestone 5](https://spring.io/admin/blog/2953-spring-integration-5-0-milestone-5-available):

-   The Spring [WebFlux](http://docs.spring.io/spring/docs/5.0.0.RC3/spring-framework-reference/web.html#web-reactive) based Reactive Channel Adapters are provided for the HTTP server side:

@Bean public IntegrationFlow sseFlow() { return IntegrationFlows .from(Http.inboundReactiveGateway("/sse") .requestMapping(m -> m.produces(MediaType.TEXT\_EVENT\_STREAM\_VALUE))) .handle((p, h) -> Flux.just("foo", "bar", "baz")) .get(); }

This sample demonstrate how we can configure Server Side Events with the Spring Integration Channel Adapter which is fully based on the `WebFlux` foundation and performs integration flow execution on demand, back-pressure manner.

-   The `IntegrationFlow` can now start from any interface, even without `@MessagingGateway` annotation. That annotation is synthesized on background with default properties by the `AnnotationGatewayProxyFactoryBean`. This trick opens for us possibility to start `IntegrationFlow` from the `java.util.function` interfaces - `Function`, `Consumer` and `Supplier`. And that, in turn, gives us an interesting approach where we can expose an `IntegrationFlow` as a Function using new [Spring Cloud Function](https://spring.io/blog/2017/07/05/introducing-spring-cloud-function) project:

@Bean public IntegrationFlow uppercase(MongoOperations mongoOperations) { return IntegrationFlows.from(Function.class) .handle(MongoDb.outboundGateway(mongoOperations) .queryFunction(msg -> Query.query(Criteria.where("name") .is(msg.getPayload()))) .collectionNameExpression("headers.collection") .expectSingleResult(true) .entityClass(Person.class)) .get(); }

-   a new `JdbcMetadataStore` is available now. This implementation is truly transaction-based and if subsequent flow after (S)FTP polling causes some error, no entries is stored in the DB because of transaction rollback.
    
-   The `preserveTimestamp` algorithm for (S)FTP Inbound Channel Adapters has been fixed to throw an exception when local temporary copy cannot be renamed to the original file because the last one is busy in another process.
    

Special thanks to several community members for their ongoing active contributions to the framework; scan [the commits](https://github.com/spring-projects/spring-integration/commits/v5.0.0.M5) and give them some kudos!

For a complete list of changes in `5.0`, also see the [What’s New](http://docs.spring.io/spring-integration/docs/5.0.0.M6/reference/html/whats-new.html) chapter in the reference manual.

There are still several features (Reactive and Testing) we would like to include into the current version, so stay tuned for next Milestones! We expect RC and subsequent GA somewhere in the end of October, beginning of November, - just before Spring Boot `2.0 GA`!

Any feedback, feature ideas, critics, bug reports and questions are welcome via appropriate communication channels:

[Project Page](http://projects.spring.io/spring-integration/) | [JIRA](https://jira.spring.io/browse/INT) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)