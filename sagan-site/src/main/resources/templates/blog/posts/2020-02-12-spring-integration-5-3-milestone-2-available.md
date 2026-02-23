---
title: Spring Integration 5.3 Milestone 2 Available
source: https://spring.io/blog/2020/02/12/spring-integration-5-3-milestone-2-available
scraped: 2026-02-23T14:11:47.985Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  February 12, 2020 | 1 Comment
---

# Spring Integration 5.3 Milestone 2 Available

_Releases | Artem Bilan |  February 12, 2020 | 1 Comment_

On behalf of the Spring Integration team, I’m pleased to announce the [second](https://github.com/spring-projects/spring-integration/releases/tag/v5.3.0.M2) milestone for Spring Integration `5.3`.

This release ships several bug fixes, a bunch of new features and improvements and will be picked up by Spring Boot `2.3 M2` in the near future.

It can be downloaded from our [milestone repository](https://repo.spring.io/milestone):

```
Copycompile "org.springframework.integration:spring-integration-core:5.3.0.M2"
```

### [](#the-most-important-new-features-are)[](#the-most-important-new-features-are)The most important new features are:

-   With the `IntegrationFlowExtension` implementation we now can right our own Java DSL for Spring Integration. It allows to introduce custom or composed EIP-operators. The existing `IntegrationComponentSpec` implementations can now be extended for additional (missed?) options. So, now any custom and reusable solutions in Java DSL can be implemented in the target project:
    
    public class CustomIntegrationFlowDefinition extends IntegrationFlowExtension {
    
    ```
    Copypublic CustomIntegrationFlowDefinition upperCaseAfterSplit() {
        return split()
                .transform("payload.toUpperCase()");
    }
    
    public CustomIntegrationFlowDefinition customAggregate(
                    Consumer<CustomAggregatorSpec> aggregator) {
        return register(new CustomAggregatorSpec(), aggregator);
    }
    ```
    
    }
    
    public class CustomAggregatorSpec extends AggregatorSpec {
    
    ```
    CopyCustomAggregatorSpec() {
        outputProcessor(group ->
                group.getMessages()
                        .stream()
                        .map(Message::getPayload)
                        .map(String.class::cast)
                        .collect(Collectors.joining(", ")));
    }
    ```
    
    }
    
    @Bean public IntegrationFlow customFlowDefinition() { return new CustomIntegrationFlowDefinition() .log() .upperCaseAfterSplit() .channel("innerChannel") .customAggregate(customAggregatorSpec -> customAggregatorSpec.expireGroupsUponCompletion(true)) .logAndReply(); }
    
-   HTTP and WebFlux outbound channel adapters now support an `UriBuilderFactory.EncodingMode` option instead of previous\`encodeUri\` boolean flag.
    
-   The AMQP outbound channel adapter has a new property `multiSend` allowing multiple messages to be sent within the scope of one RabbitTemplate invocation.
    
-   The AMQP inbound channel adapter now supports a listener container with the `consumerBatchEnabled` property set to true.
    

See `What’s New?` in the [Reference Manual](https://docs.spring.io/spring-integration/docs/5.3.0.M2/reference/html/whats-new.html#whats-new) for more information.

The next and last `M3` milestone is scheduled for March before entering the `RC` phase in April. Expect an upgrade to the latest milestone releases: Spring Data `Neumann`, Spring Security `5.3` etc.

We’re looking forward to your feedback!

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub Issues](https://github.com/spring-projects/spring-integration/issues) | [Contributing](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.adoc) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Chat](https://gitter.im/spring-projects/spring-integration)