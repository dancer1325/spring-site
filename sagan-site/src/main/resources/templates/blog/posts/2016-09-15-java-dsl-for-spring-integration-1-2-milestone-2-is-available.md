---
title: Java DSL for Spring Integration 1.2 Milestone 2 is available
source: https://spring.io/blog/2016/09/15/java-dsl-for-spring-integration-1-2-milestone-2-is-available
scraped: 2026-02-23T19:03:08.355Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 15, 2016 | 1 Comment
---

# Java DSL for Spring Integration 1.2 Milestone 2 is available

_Releases | Artem Bilan |  September 15, 2016 | 1 Comment_

I’m pleased to announce that the Java DSL for Spring Integration `1.2 M2` is available now!

First of all I’d like to thank everyone who created issues, raised Pull Requests, provided feedback or just asked questions on StackOverflow. Especial thanks for early adopters since the previous [Milestone 1](https://spring.io/blog/2016/07/08/java-dsl-for-spring-integration-1-2-m1-and-1-1-3-are-available). With their help we have improved and fixed some issues with runtime flow registration.

The artifact `org.springframework.integration:spring-integration-java-dsl:1.2.0.M2` is available in the [Milestone repo](http://repo.spring.io/milestone). So, give it a shot and don’t hesitate to raise a [GH issue](https://github.com/spring-projects/spring-integration-java-dsl/issues) for any feedback!

Some highlights of the current iteration:

# [](#jpa-support)[](#jpa-support)JPA support

After many Community requests we finally introduced the `Jpa` Factory and corresponding \`IntegrationComponentSpec\`s to provide a fluent API for the [Spring Integration JPA](http://docs.spring.io/spring-integration/reference/html/jpa.html) components:

```
Copy@Autowired
private EntityManagerFactory entityManagerFactory;

@Bean
public IntegrationFlow pollingAdapterFlow() {
    return IntegrationFlows
            .from(Jpa.inboundAdapter(this.entityManagerFactory)
                    .entityClass(StudentDomain.class)
                    .maxResults(1)
                    .expectSingleResult(true),
                e -> e.poller(p -> p.trigger(new OnlyOnceTrigger())))
            .channel(c -> c.queue("pollingResults"))
            .get();
}

@Bean
public IntegrationFlow updatingGatewayFlow() {
    return f -> f
            .handle(Jpa.updatingGateway(this.entityManagerFactory),
                    e -> e.transactional(true))
            .channel(c -> c.queue("persistResults"));
}

@Bean
public IntegrationFlow retrievingGatewayFlow() {
    return f -> f
            .handle(Jpa.retrievingGateway(this.entityManagerFactory)
                    .jpaQuery("from Student s where s.id = :id")
                    .expectSingleResult(true)
                    .parameterExpression("id", "payload"))
            .channel(c -> c.queue("retrieveResults"));
}
```

# [](#mid-flow-transaction-support)[](#mid-flow-transaction-support)Mid-flow transaction support

"Inspired" by the complexity of transaction support configuration for the Spring Integration JPA components (actually programmatic `TransactionalInterceptor`), we have introduced `TransactionInterceptorBuilder`. In addition we provide the `TransactionHandleMessageAdvice` which allows to start transaction from any endpoint for the entire sub-flow, not only the `handleRequestMessage` as it is in case of regular `ConsumerEndpointSpec.advice()`. Actually the main trick is done by the `HandleMessageAdvice`, recently introduced in [Spring Integration Core](http://docs.spring.io/spring-integration/reference/html/messaging-endpoints-chapter.html#handle-message-advice), which is a marker interface to distinguish advice for the `handleRequestMessage` only or for the flow starting from the current `MessageHandler`. For convenience the bunch of `.transactional()` methods have been added to the `ConsumerEndpointSpec`.

# [](#scatter-gather-support)[](#scatter-gather-support)Scatter-Gather support

The [Scatter-Gather](http://docs.spring.io/spring-integration/reference/html/messaging-routing-chapter.html#scatter-gather) EI pattern now has its own Java DSL API:

```
Copy@Bean
public IntegrationFlow scatterGatherFlow() {
    return f -> f
      .scatterGather(scatterer -> scatterer
         .applySequence(true)
         .recipientFlow(m -> true,
                     sf -> sf.handle((p, h) -> Math.random() * 10))
         .recipientFlow(m -> true,
                     sf -> sf.handle((p, h) -> Math.random() * 10))
         .recipientFlow(m -> true,
                     sf -> sf.handle((p, h) -> Math.random() * 10)),
      gatherer -> gatherer
         .releaseStrategy(group ->
                group.size() == 3 ||
                      group.getMessages()
                          .stream()
                          .anyMatch(m -> (Double) m.getPayload() > 5)),
      scatterGather -> scatterGather
        	 .gatherTimeout(10_000));
}
```

Where the `scatterer` is just a `RecipientListRouter`, `gatherer` - an `AggregatingMessageHandler`, and the last `Consumer` accept options for the `ScatterGatherHandler`.

# [](#more-routers-improvements)[](#more-routers-improvements)More routers improvements

The `.routeToRecipients()` API now provides more configuration variants for recipients:

```
Copy.routeToRecipients(r -> r
    .recipient("foo-channel", "'foo' == payload")
    .recipient("bar-channel", m ->
        m.getHeaders().containsKey("recipient")
            && (boolean) m.getHeaders().get("recipient"))
    .recipientFlow("'foo' == payload or 'bar' == payload or 'baz' == payload",
        f -> f.<String, String>transform(String::toUpperCase)
            .channel(c -> c.queue("recipientListSubFlow1Result")))
    .recipientFlow((String p) -> p.startsWith("baz"),
        f -> f.transform("Hello "::concat)
            .channel(c -> c.queue("recipientListSubFlow2Result")))
    .recipientFlow(new FunctionExpression<Message<?>>(m ->
                                   "bax".equals(m.getPayload())),
        f -> f.channel(c -> c.queue("recipientListSubFlow3Result")))
    .defaultOutputToParentFlow())
```

Previously the `.route()` operator made the next `.channel()` in the `IntegrationFlow` as a `defaultOutputChannel` of the `Router`. According to the user experience that doesn’t sound reasonable to make such a decision unconditional. We reworked `.route()` to align it with the standard `AbstractMessageRouter` behaviour. The `.defaultOutputChannel()` and `.defaultSubFlowMapping()` have been added to utilize the `default` logic for the `Router`. To rallback to the previous behavior the `.defaultOutputToParentFlow()` is present, as you noticed by the `.routeToRecipients()` sample above.

See [commit history](https://github.com/spring-projects/spring-integration-java-dsl/commits/v1.2.0.M2) for `1.2.0.M2` version for more information. And always read JavaDocs to understand the API you use!

# [](#next-steps)[](#next-steps)Next Steps

We expect the first (and hope the last) Release Candidate for version `1.2` over a couple weeks, after some adoption for Spring Integration 4.3.2 and Spring Boot 1.4.1. It’s soon enough as `spring-integration-java-dsl` will move to the [Spring Integration Core](http://projects.spring.io/spring-integration/) `5.0` and Java 8 code base. The current `1.2` version will be still supported, but just for bug fixes.

[Project Page](https://github.com/spring-projects/spring-integration-java-dsl) | [Documentation](https://github.com/spring-projects/spring-integration-java-dsl/wiki/Spring-Integration-Java-DSL-Reference) | [Issues](https://github.com/spring-projects/spring-integration-java-dsl/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)