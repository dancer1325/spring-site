---
title: Spring integration Java DSL 1.1 M1 is available
source: https://spring.io/blog/2015/04/15/spring-integration-java-dsl-1-1-m1-is-available
scraped: 2026-02-23T19:43:09.451Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 15, 2015 | 0 Comments
---

# Spring integration Java DSL 1.1 M1 is available

_Releases | Artem Bilan |  April 15, 2015 | 0 Comments_

Dear Spring community,

We are pleased to announce that the Spring Integration Java DSL 1.1 Milestone 1 is now available. Use the [Milestone Repository](https://repo.spring.io/milestone/) with Maven or Gradle to try it in early access.

```
Copycompile "org.springframework.integration:spring-integration-java-dsl:1.1.0.M1"
```

To be honest, many of the planned features for `1.1` are not implemented yet, but thanks to [encouragement](https://spring.io/blog/2015/04/15/using-apache-kafka-for-integration-and-data-processing-pipelines-with-spring) from our pal [Josh Long](https://spring.io/team/jlong) and the recent announcement about the Apache Kafka support ([Spring Integration Kafka Support 1.1 Release](https://spring.io/blog/2015/03/26/spring-integration-kafka-support-1-1-ga-is-available), [Spring XD 1.1.1 Release](https://spring.io/blog/2015/03/26/spring-xd-1-1-1-released)), we've released this Milestone 1 mainly to showcase the Apache Kafka support in the Java Configuration DSL.

We'll look at that, and other, features from this release in this post.

## [](#apache-kafka-support)Apache Kafka Support

Let's start with some "trivial" sample from the `KafkaTests` class in the Spring Integration Java DSL :

```java
Copy@Bean
public ConnectionFactory connectionFactory(EmbeddedZookeeper zookeeper) {
        return new DefaultConnectionFactory(
                new ZookeeperConfiguration(zookeeper.connectString()));
}

@Bean
public OffsetManager offsetManager(ConnectionFactory connectionFactory) {
        MetadataStoreOffsetManager offsetManager =
                           new MetadataStoreOffsetManager(connectionFactory);
        // start reading at the end of the
       offsetManager.setReferenceTimestamp(OffsetRequest.LatestTime());
       return offsetManager;
}

@Bean
public IntegrationFlow listeningFromKafkaFlow(
                    ConnectionFactory connectionFactory,
                    OffsetManager offsetManager) {
     return IntegrationFlows
         .from(Kafka.messageDriverChannelAdapter(connectionFactory, TEST_TOPIC)
                  .autoCommitOffset(false)
		  .payloadDecoder(String::new)
		  .keyDecoder(b -> Integer.valueOf(new String(b)))
		  .configureListenerContainer(c ->
				c.offsetManager(offsetManager)
						.maxFetch(100)))
         .<String, String>transform(String::toUpperCase)
         .channel(c -> c.queue("listeningFromKafkaResults"))
         .get();
}
```

-   The `EmbeddedZookeeper` is a part of Apache Kafka `test` artifact (`testCompile 'org.apache.kafka:kafka_2.10:0.8.1.1:test'` in our case) and, along with many other features like `kafka.utils.TestUtils`, it is very useful for unit testing.
-   Please refer to the [Spring Integration Kafka](https://github.com/spring-projects/spring-integration-kafka) project for more information on `ConnectionFactory` and `OffsetManager`.
-   The most important part in the config above is `IntegrationFlow` bean definition. The Spring Integration Java DSL provides a namespace factory - `Kafka` - which utilizes `IntegrationComponentSpec` implementations for the Spring Integration Kafka adapters, like `KafkaMessageDrivenChannelAdapterSpec` for the `KafkaMessageDrivenChannelAdapter`.
-   An example of the *builder pattern*, the spec just delegates options from `method-chain` to the underlying `KafkaMessageDrivenChannelAdapter` instance.
-   For those, like yours truly, who are not familiar with Scala (which is the language Apache Kafka is written in), pay attention to the `.payloadDecoder(String::new)` line. The `kafka.serializer.Decoder` is a Scala `trait` that is compiled to a Java interface (not a class!) so we can represent it here as a Java 8 lambda method.
-   the `.configureListenerContainer()` is a lambda-aware method to separate concerns for the `KafkaMessageListenerContainer`\-specific options.

The other self-explained factory-methods from the `Kafka` namespace factory are `.inboundChannelAdapter(...)` for the `KafkaHighLevelConsumerMessageSource` polling adapter and `.outboundChannelAdapter(...)` for the `KafkaProducerMessageHandler`. Please refer to their JavaDocs for more information.

For more information, check out Josh Long's post on [Using Apache Kafka for Integration and Data Processing Pipelines with Spring](https://spring.io/blog/2015/04/15/using-apache-kafka-for-integration-and-data-processing-pipelines-with-spring)!

## [](#pojo-method-invocation)POJO Method invocation

A lot of the great feedback from the community ([Webinar Replay: Introducing the Java DSL for Spring Integration](https://spring.io/blog/2015/02/10/webinar-replay-introducing-the-java-dsl-for-spring-integration)) was around the bean method invocation components (services, transformers, routers, etc.) and we heard you loud-and-clear: component method selection has been improved. Here is a sample that is analogous to a `<int:service-activator input-channel="greetingChannel" ref="greetingService"/>` in the XML configuration:

```java
Copy
@Configuration
@EnableIntegration
@ComponentScan
public class MyConfiguration {

	@Autowired
	private GreetingService greetingService;

	@Bean
	public IntegrationFlow greetingFlow() {
		return IntegrationFlows.from("greetingChannel")
				.handle(this.greetingService)
				.get();
	}

}

@Component
public class GreetingService {

   public void greeting(String payload) {
        System.out.println("Hello " + payload);
   }
}
```

Here, the `greeting` method will automatically be selected by the framework. There is an alternative that takes a `methodName` argument to specify a method in the case of ambiguity. Similar POJO method invocation EIP-methods have been introduced for many other EIP implementations like `transform(Object service, String methodName)`, `split(Object service)`, etc.

The Spring Integration Java DSL also respects Spring Integration messaging annotations like `@ServiceActivator`, `@Router`, `@Filter`, etc., and even `@Payload`, `@Header`. Please, refer to `IntegrationFlowDefinition` JavaDocs for more information.

## [](#integrationflowadapter)IntegrationFlowAdapter

It shouldn't be a surprise that as `IntegrationFlow` is an interface, we can just provide its direct implementation as a custom component and it works as-is in the Spring Integration Java DSL environment:

```java
Copy@Component
public class MyFlow implements IntegrationFlow {

	@Override
	public void configure(IntegrationFlowDefinition<?> f) {
		f.<String, String>transform(String::toUpperCase);
	}

}
```

This is similar to the `@Bean` definitions, but this approach helps our components stay more loosely coupled.

But, wait, there's more! `IntegrationFlow` implementations (like lambdas in the `@Bean` definition case) are limited to `DirectChannel` input channels. We went further here and introduced the `IntegrationFlowAdapter`. Here's my favorite sample to demonstrate how it can be used:

```java
Copy@Component
public class MyFlowAdapter extends IntegrationFlowAdapter {

        private final AtomicBoolean invoked = new tomicBoolean();

        public Date nextExecutionTime(TriggerContext triggerContext) {
              return this.invoked.getAndSet(true) ? null : new Date();
       }

       @Override
       protected IntegrationFlowDefinition<?> buildFlow() {
          return from(this, "messageSource",
                        e -> e.poller(p -> p.trigger(this::nextExecutionTime)))
                   .split(this)
		   .transform(this)
		   .aggregate(a -> a.processor(this, null), null)
		   .enrichHeaders(Collections.singletonMap("foo", "FOO"))
		   .filter(this)
		   .handle(this)
		   .channel(c -> c.queue("myFlowAdapterOutput"));
      }

      public String messageSource() {
	       return "B,A,R";
      }

      @Splitter
      public String[] split(String payload) {
           return StringUtils.commaDelimitedListToStringArray(payload);
      }

      @Transformer
      public String transform(String payload) {
           return payload.toLowerCase();
      }

      @Aggregator
      public String aggregate(List<String> payloads) {
             return payloads.stream().collect(Collectors.joining());
      }

      @Filter
      public boolean filter(@Header Optional<String> foo) {
              return foo.isPresent();
      }

      @ServiceActivator
      public String handle(String payload, @Header String foo) {
             return payload + ":" + foo;
      }

}
```

Of course, with the POJO method invocation support (see above) it won't be possible to build the flow so easily.

## [](#dynamic-languages-scripting-support)Dynamic Languages (Scripting) Support

The [Spring Framework](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/dynamic-language.html) and [Spring Integration](http://docs.spring.io/spring-integration/docs/latest-ga/reference/html/messaging-endpoints-chapter.html#scripting) have supported Dynamic Languages for a long time now and it is, mostly, linked with XML Spring configuration. It may look strange to deal with scripts (like Groovy, Ruby, JavaScript, etc.) from Java code, but we find it a useful tool for reloading functionality at runtime, and when Java lambas aren't dynamic enough. Let's look at the `Scripts` namespace factory in the Spring Integration Java DSL:

```java
Copy@Configuration
@EnableIntegration
public class ScriptsConfiguration {

	@Value("com/my/project/integration/scripts/splitterScript.groovy")
	private Resource splitterScript;

	@Bean
	public PollableChannel results() {
		return new QueueChannel();
	}

	@Bean
	public IntegrationFlow scriptSplitter() {
		return f -> f
        	             .split(Scripts.script(this.splitterScript)
                                              .refreshCheckDelay(10000)
                                              .variable("foo", "bar"))
                             .channel(results());
	}

}
```

This Scripting support allows us to deal only with external resources, which can be changed and reloaded at runtime. The `inline` scripts, which are supported by the Spring Integration Scripting module, don't make sense because we have Java 8 lambdas for those cases.

## [](#inline-wiretap)Inline WireTap

The [Wire Tap EI Pattern](http://www.enterpriseintegrationpatterns.com/WireTap.html) is implemented as a `ChannelInterceptor` in [Spring Integration](http://docs.spring.io/spring-integration/docs/latest-ga/reference/html/messaging-channels-section.html#channel-wiretap) and can be injected into any `MessageChannel` as an interceptor like this:

```java
Copy@Bean
public MessageChannel myChannel() {
     return MessageChannels.direct()
                .interceptor(new WireTap(loggerChannel()))
                .get();
}
```

The `IntegrationFlow` definition allows us to omit `MessageChannel` declarations between EIP components, so we've introduced an inline `.wireTap()` EIP-method to allow a `WireTap` injection for those anonymous channels. Here are some samples:

```java
Copy@Bean
public IntegrationFlow wireTapFlow1() {
	return IntegrationFlows.from("tappedChannel1")
		.wireTap("tapChannel",
                         wt -> wt.selector(m -> m.getPayload().equals("foo")))
		.channel("nullChannel")
		.get();
}

@Bean
public IntegrationFlow wireTapFlow2() {
	return f -> f
		.wireTap(sf -> sf
			.<String, String>transform(String::toUpperCase)
			.channel(c -> c.queue("wireTapSubflowResult")))
		.channel("nullChannel");
}
```

Please see the `IntegrationFlowDefinition.wireTap()` methods JavaDocs for more information and don't miss our test-cases from project page on GitHub.

## [](#wrap-up)Wrap up

There's much to do for the 1.1 release, like further simplification of `.aggregate()`, etc. configuration, an ability to inject external sub-flows, the ability to configure `IntegrationComponentSpec` implementations as a separate `@Bean` to simplify the target flow definitions, more protocol-specific Namespace Factories and more. Don't hesitate to reach us via StackOverflow, JIRA and GitHub issues to share your thoughts and ideas!

[Project Page](https://github.com/spring-projects/spring-integration-java-dsl) | [JIRA](https://jira.spring.io/browse/INTEXT) | [Issues](https://github.com/spring-projects/spring-integration-java-dsl/issues) | \[Contributions\] ([https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)) | [StackOverflow](http://stackoverflow.com) (`spring-integration` tag)