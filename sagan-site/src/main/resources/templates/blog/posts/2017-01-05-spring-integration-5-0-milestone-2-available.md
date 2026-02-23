---
title: Spring Integration 5.0 Milestone 2 Available
source: https://spring.io/blog/2017/01/05/spring-integration-5-0-milestone-2-available
scraped: 2026-02-23T16:35:19.199Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  January 05, 2017 | 1 Comment
---

# Spring Integration 5.0 Milestone 2 Available

_Releases | Artem Bilan |  January 05, 2017 | 1 Comment_

On behalf of the Spring Integration team I’d like to announce the Second Milestone of Spring Integration [5.0](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10121&version=15774), which is available in the [Milestone Repository](https://repo.spring.io/milestone/).

Some highlights of this release since the [previous](https://spring.io/blog/2016/12/02/spring-integration-5-0-milestone-1-available) Milestone.

Of course, first of all, big thanks to you, the community, for your contributions!

## [](#mongodb-improvements)[](#mongodb-improvements)MongoDb Improvements

-   `MongoDbOutboundGateway` - for performing queries or any arbitrary operation on the collection
    
-   An initial Java DSL support for MongoDB components
    
-   The MongoDb component now can use `org.springframework.data.mongodb.core.query.Query` API in their expressions
    
    @Bean public IntegrationFlow mongoDbGatewayFlow() { return f -> f .handle(MongoDb.outboundGateway(this.mongoTemplate) .collectionCallback(MongoCollection::count) .collectionNameFunction(m -> m.getHeaders().get("collection"))); }
    

## [](#messaginggateway-and-java-dsl)[](#messaginggateway-and-java-dsl)@MessagingGateway and Java DSL

The Java DSL `IntegrationFlow` can now start from the interface marked with `@MessagingGateway`, and all the method calls on the target proxy bean will perform sending `Message` to the downstream `IntegrationFlow`. This lets you omit `@IntegrationComponentScan` and extra channels configuration. For example a simple gateway for Control Bus component:

```
Copy@MessagingGateway
public interface ControlBusGateway {

    void send(String command);

}
...
@Bean
public IntegrationFlow controlBusFlow() {
    return IntegrationFlows.from(ControlBusGateway.class)
                 .controlBus()
                 .get();
}
```

## [](#reactive-streams-support)[](#reactive-streams-support)Reactive Streams Support

And of course some news from the Reactive Streams subject.

The `MessageChannelReactiveUtils` can be used to adapt any `MessageChannel` to the `org.reactivestreams.Publisher`. This can be useful when you would like to "flux" an upstream data via integration loosely coupled manner from one side and reactive back pressure from another:

```
Copy@Autowired
private PollableChannel queueChannel;
...
Flux.from(MessageChannelReactiveUtils.<String>toPublisher(this.queueChannel))
                   .map(Message::getPayload)
                   .map(String::toUpperCase)
                   .doOnNext(results::add)
                   .subscribe(v -> done.countDown());
```

This technique is used now in the existing `IntegrationFlowDefinition.toReactivePublisher()`:

```
Copy@Bean
public Publisher<Message<Integer>> pollableReactiveFlow() {
    return IntegrationFlows
             .from("inputChannel")
             .split(s -> s.delimiters(","))
             .<String, Integer>transform(Integer::parseInt)
             .channel(MessageChannels.queue())
             .toReactivePublisher();
}
...
@Autowired
@Qualifier("pollableReactiveFlow")
private Publisher<Message<Integer>> pollablePublisher;
```

The `ReactiveChannel` now has ability to subscribe to upstream `Publisher` alongside with the regular (but back pressure) `send(Message<?>)` implementation. This allowed us to introduce a feature like start an `IntegrationFlow` from the `Publisher`:

```
CopyFlux<Message<?>> messageFlux = Flux.just("1,2,3,4")
        .map(v -> v.split(","))
        .flatMapIterable(Arrays::asList)
        .map(Integer::parseInt)
        .map(GenericMessage<Integer>::new);

QueueChannel resultChannel = new QueueChannel();

IntegrationFlow integrationFlow =
        IntegrationFlows.from(messageFlux)
                .<Integer, Integer>transform(p -> p * 2)
                .channel(resultChannel)
                .get();

this.integrationFlowContext.registration(integrationFlow)
        .register();
```

Such wise and placing `ReactiveChannel` in between endpoints (`MessageChannels.reactive()`), we can reach the best of both integration and reactive worlds!

See [What’s New](http://docs.spring.io/spring-integration/docs/5.0.0.M2/reference/html/whats-new.html) for more information.

We are going to provide more features and improvement in the next Milestones, so, stay tuned and don’t hesitate to come back to us for any feedback!

[Project Page](http://projects.spring.io/spring-integration/) | [GitHub](https://github.com/spring-projects/spring-integration) | [Help](http://stackoverflow.com/questions/tagged/spring-integration) | [Documentation](http://docs.spring.io/spring-integration/reference/html/) | [Chat](https://gitter.im/spring-projects/spring-integration)