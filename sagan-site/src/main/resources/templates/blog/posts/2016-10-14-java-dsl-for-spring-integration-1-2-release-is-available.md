---
title: Java DSL for Spring Integration 1.2 Release is available
source: https://spring.io/blog/2016/10/14/java-dsl-for-spring-integration-1-2-release-is-available
scraped: 2026-02-23T19:01:14.077Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  October 14, 2016 | 0 Comments
---

# Java DSL for Spring Integration 1.2 Release is available

_Releases | Artem Bilan |  October 14, 2016 | 0 Comments_

Dear Spring Community,

It’s my pleasure to announce that the Java DSL for Spring Integration `1.2 GA` is now available.

The artifact `org.springframework.integration:spring-integration-java-dsl:1.2.0.RELEASE` is available in the [Release repo](http://repo.spring.io/release) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cspring-integration-java-dsl).

Since the previous [Release Candidate 1](https://spring.io/blog/2016/09/27/java-dsl-for-spring-integration-1-2-release-candidate-1-is-available) we have received some feedback and these additional features have been added:

# [](#thread-barrier-support)[](#thread-barrier-support)Thread Barrier support

A new `.barrier()` and its mirror `.trigger()` EIP-methods have been added to the `IntegrationFlow` definition:

```
Copyprivate static final String BARRIER = "barrier";

@Bean
public IntegrationFlow barrierFlow() {
    return f -> f
        .barrier(10000, b -> b
                .correlationStrategy(
                         new HeaderAttributeCorrelationStrategy(BARRIER))
                 .outputProcessor(g ->
                         g.getMessages()
                                 .stream()
                                 .skip(1)
                                 .findFirst()
                                 .get()))
         .channel(c -> c.queue("barrierResults"));
}

@Bean
public IntegrationFlow releaseBarrierFlow(
                          MessageTriggerAction barrierTriggerAction) {
    return IntegrationFlows.from((Channels c) -> c.queue("releaseChannel"))
        .trigger(barrierTriggerAction,
            e -> e.poller(p -> p.fixedDelay(100)))
        .get();
}
```

# [](#poller-errorchannel)[](#poller-code-errorchannel-code)Poller `errorChannel`

A more convenient `PollerSpec.errorChannel(String)` has been added after upgrading to Spring Integration `4.3.4`. We can now specify just the bean name for the `errorChannel` on the Poller definition and it will be resolved later when the first `ErrorMessage` is sent.

# [](#filesplitter-improvements)[](#filesplitter-improvements)FileSplitter improvements

The `SplitterEndpointSpec` now provides a `delimiters()` option which is mapped to the `DefaultMessageSplitter.setDelimiters()`.

You can find all of the features introduced in version `1.2` in the blog posts announcing previous Milestone releases:

-   [Milestone 1](https://spring.io/blog/2016/07/08/java-dsl-for-spring-integration-1-2-m1-and-1-1-3-are-available)
    
-   [Milestone 2](https://spring.io/blog/2016/09/15/java-dsl-for-spring-integration-1-2-milestone-2-is-available)
    
-   [Release Candidate 1](https://spring.io/blog/2016/09/27/java-dsl-for-spring-integration-1-2-release-candidate-1-is-available)
    

# [](#next-steps)[](#next-steps)Next Steps

The Spring Integration Java DSL project is moving to the [Spring Integration Core](http://projects.spring.io/spring-integration/) `5.0` and Java 8 code base. Version `1.2.x` will remain in support for bug fixes.

A big thanks to everyone from the community for feedback that has been provided. Without you we wouldn’t have such a good comprehensive product!

[Project Page](https://github.com/spring-projects/spring-integration-java-dsl) | [Documentation](https://github.com/spring-projects/spring-integration-java-dsl/wiki/Spring-Integration-Java-DSL-Reference) | [Issues](https://github.com/spring-projects/spring-integration-java-dsl/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)