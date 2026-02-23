---
title: How to test Spring Cloud Stream applications (Part I)
source: https://spring.io/blog/2017/10/24/how-to-test-spring-cloud-stream-applications-part-i
scraped: 2026-02-23T16:17:54.694Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  October 24, 2017 | 7 Comments
---

# How to test Spring Cloud Stream applications (Part I)

_Engineering | Artem Bilan |  October 24, 2017 | 7 Comments_

Dear Spring Community!

As an event-driven microservices framework, Spring Cloud Stream dramatically simplifies the complexity while developing event-driven applications. The feature capabilities and its benefits are not the focus of this article (to learn more, please review the [Reference Guide](https://docs.spring.io/spring-cloud-stream/docs/Ditmars.RELEASE/reference/htmlsingle)), but instead, my goal is to show you what the framework has to offer from the testing standpoint, the tools, and techniques. This article is intended to encourage the community to share feedback on the existing testing infrastructure, so any thoughts, comments, or feature requests are welcome! We strive to adapt to the inputs to provide a better development and testing experience in the future.

Well, let me start with the quote:

> *"It is surprising then that so many integration solutions are deployed with little or no testing. Testing, if any, is usually done manually and sporadically. One of the reasons integration solutions are not tested thoroughly is the fact that testing asynchronous, message-based middleware solutions is challenging."*

*\- Gregor Hohpe,  
Test-Driver Development in Enterprise Integration Projects*

That’s right, while we are marching towards modernizing the legacy monolith workload to a cloud-native style microservices architecture, any form of testing plays a very critical role in it. More specifically, having the automated CI pipelines to run the test-suites on every single commit, iteratively, is highly recommended and in fact widely accepted as adopted practice.

While using Spring Cloud Stream, it may not be obvious to test the simple (“micro”) business-logic, and we might overlook the integration tests between the microservices, because there is nothing more than a middleware binding is expected from the end-user - the framework automates all other boilerplate semantics! Or even if we would like to do that, there are no useful tools to quickly spin-up and tear it down. And that’s why we are here - to break the myth about the simplicity of microservices and complexity of testing them!

## [](#what-is-spring-cloud-stream-application)[](#what-is-spring-cloud-stream-application)What is Spring Cloud Stream application?

The Spring Cloud Stream application is an event-driven, Spring Boot microservice based on well-known Enterprise Integration Patterns implemented by Spring Integration. Their testing tools and utilities (`SpringRunner` from [Spring Testing Framework](https://docs.spring.io/spring/docs/5.0.0.RELEASE/spring-framework-reference/testing.html#testing), the Spring Boot [auto-configuration](https://docs.spring.io/spring-boot/docs/1.5.8.RELEASE/reference/htmlsingle/#boot-features-testing) for test environment, mocks from Spring Integration etc.) bring for us an interesting combination that our unit and integration tests are not so challenging any more. Only what we need to know what, when and how to use!

For example, the following simple Spring Cloud Stream application, a source, generates “foo” or “bar” string periodically according the semaphore state:

```
Copy@SpringBootApplication
@EnableBinding(Source.class)
public class FooBarSource {

  private AtomicBoolean semaphore = new AtomicBoolean(true);

  @Bean
  @InboundChannelAdapter(channel = Source.OUTPUT,
                      poller = @Poller(fixedDelay = "100"))
  public MessageSource<String> fooBarStrings() {
     return () ->
          new GenericMessage<>(
                this.semaphore.getAndSet(!this.semaphore.get()) ? "foo" : "bar");
  }
}
```

Or this processor to convert the incoming strings to upper case:

```
Copy@SpringBootApplication
@EnableBinding(Processor.class)
public class ToUpperCaseProcessor {

  @StreamListener(Processor.INPUT)
  @SendTo(Processor.OUTPUT)
  public String transform(String payload) {
     return payload.toUpperCase();
  }
}
```

Or finally this sink to save the incoming payload to a database:

```
Copy@SpringBootApplication
@EnableBinding(Sink.class)
public class JdbcSink {

  @Bean
  @ServiceActivator(inputChannel = Sink.INPUT)
  public MessageHandler logHandler(DataSource dataSource) {
     return new JdbcMessageHandler(dataSource,
                                 "INSERT INTO foobar (value) VALUES (:payload)");
  }
}
```

Of course the most obvious unit test, for example, for the processor code would be:

```
Copy@Test
public void testUpperCase() {
  assertEquals("FOO", new ToUpperCaseProcessor().transform("foo"));
}
```

But our goal is really to test all those Spring Boot, Cloud and Integration goodies. Let’s see how to do that.

## [](#unit-tests)[](#unit-tests)Unit Tests

Since Spring Cloud Stream is fully based on Spring Boot, it is obvious that our tests should be marked with `@SpringBootTest` and all its features and utilities (including mocking and spying) are available for us. See [Testing Spring Boot applications](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-testing.html) for more information. On the other hand Spring Cloud Stream is Spring Integration application as well. So, all the Spring Integration testing tools and utilities from [Spring Integration Test](https://docs.spring.io/spring-integration/docs/5.0.0.M7/reference/html/testing.html) module can be used in Spring Cloud Stream application tests, too.

In addition, Spring Cloud Stream provides support for testing your microservice applications without connecting to a messaging system. You can do that by using the `TestSupportBinder` provided by the `spring-cloud-stream-test-support` library, which can be added as a test dependency to the application:

```
Copy<dependency>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-stream-test-support</artifactId>
  <scope>test</scope>
</dependency>
```

The `TestSupportBinder` allows users to interact with the bound channels and inspect what messages are sent and/or received by the application. For outbound message channels, the `TestSupportBinder` registers a single subscriber and retains the messages emitted by the application in a `MessageCollector`. They can be retrieved during tests and assertions can be made against them. The user can also send messages to inbound message channels, so that the consumer application can consume the messages:

```
Copy@Autowired
private Source channels;

@Autowired
private MessageCollector collector;

@Test
public void testMessages() {
  BlockingQueue<Message<?>> messages = collector.forChannel(channels.output());

  assertThat(messages, receivesPayloadThat(is("foo")));
  assertThat(messages, receivesPayloadThat(is("bar")));
  assertThat(messages, receivesPayloadThat(is("foo")));
  assertThat(messages, receivesPayloadThat(is("bar")));
}
```

Pay attention to the `receivesPayloadThat()`, it is a static utility. This comes from the `MessageQueueMatcher` and together with the `receivesMessageThat()`, we can use it to assert with any appropriate `Matcher` implementation from the incoming messages in the output channel of a source or processor application.

The `@MockBean` and `@SpyBean` from Spring Boot can be useful to verify an interaction with our stream listeners:

```
Copy@SpyBean
private ToUpperCaseProcessor toUpperCaseProcessor;

@Test
public void testMessages() {
  this.channels.input().send(new GenericMessage<>("foo"));

  BlockingQueue<Message<?>> messages = collector.forChannel(channels.output());

  assertThat(messages, receivesPayloadThat(is("FOO")));

  verify(this.toUpperCaseProcessor, times(1)).transform(anyString());
}
```

Right, to send test data, there is just enough to get an `input` `MessageChannel` for the processor and build `Message` object. To send some headers for testing together with the `payload`, you can use `org.springframework.integration.support.MessageBuilder`:

```
CopyMessage<String> testMessage =
     MessageBuilder.withPayload("headers")
           .setHeader("foo", "bar")
           .build();

input.send(testMessage);

Message<String> expected =
     MessageBuilder.withPayload("HEADERS")
           .copyHeaders(testMessage.getHeaders())
           .build();

Matcher<Message<Object>> sameExceptIgnorableHeaders =
     (Matcher<Message<Object>>) (Matcher<?>) sameExceptIgnorableHeaders(expected);

assertThat(messages, receivesMessageThat(sameExceptIgnorableHeaders));
```

Testing the sink application is a bit tricky since this is typically the last step in a data pipeline solution. Here, we just send the data into the target system relying on the channel adapter for the particular protocol. For example our `JdbcSink` application uses `JdbcMessageHandler` from Spring Integration to insert payload of the incoming messages to a database. So, to test whether the `JdbcSink` works well, we need to query the database. Fortunately, Spring Boot provides the auto-configuration for `DataSource` - it is as simple as making sure the intended database vendor’s driver dependency is on the classpath, e.g.:

```
Copy<dependency>
  <groupId>org.hsqldb</groupId>
  <artifactId>hsqldb</artifactId>
  <scope>test</scope>
</dependency>
```

With that taken care by Spring Boot, an integration test that interacts with a database becomes straightforward. We simply inject `JdbcTemplate` auto-configured by Spring Boot:

```
Copy@Autowired
private Sink channels;

@Autowired
private JdbcTemplate jdbcTemplate;

@Test
public void testMessages() {
  this.channels.input().send(new GenericMessage<>("foo"));
  this.channels.input().send(new GenericMessage<>("bar"));

  List<Map<String, Object>> data =
                    this.jdbcTemplate.queryForList("SELECT * FROM foobar");

  assertThat(data.size()).isEqualTo(2);
  assertThat(data.get(0).get("value")).isEqualTo("foo");
  assertThat(data.get(1).get("value")).isEqualTo("bar");
}
```

Such an approach based on the Spring Boot Testing Framework works well for JDBC and JPA configurations. Similar approach we can apply for many other protocols including ActiveMQ, MongoDB, Cassandra, Gemfire, Hazelcast and many others. If we can’t have an embedded, test-scope service for our purpose, we have a choice to **mock** the `MessageHandler` for target protocol and assert an interaction with it:

```
Copy@MockBean(name = "jdbcHandler")
private MessageHandler jdbcMessageHandler;
…
ArgumentCaptor<Message<?>> messageArgumentCaptor =
     (ArgumentCaptor<Message<?>>) (ArgumentCaptor<?>)
                                          ArgumentCaptor.forClass(Message.class);

verify(this.jdbcMessageHandler, times(2))
                          .handleMessage(messageArgumentCaptor.capture());

Message<?> message = messageArgumentCaptor.getValue();
assertThat(message).hasFieldOrPropertyWithValue("payload", "bar");
```

Another approach to verify sent messages to the sink (or out of processor) can be applied as a `ChannelInterceptor` injection into the message channel:

```
CopyAbstractMessageChannel input = (AbstractMessageChannel) this.channels.input();

final AtomicReference<Message<?>> messageAtomicReference =
                                   new AtomicReference<>();

ChannelInterceptor assertionInterceptor = new ChannelInterceptorAdapter() {

  @Override
  public void afterSendCompletion(Message<?> message, MessageChannel channel,
                                          boolean sent, Exception ex) {
     messageAtomicReference.set(message);
     super.afterSendCompletion(message, channel, sent, ex);
  }

};

input.addInterceptor(assertionInterceptor);
input.send(new GenericMessage<>("foo"));

…
Message<?> message1 = messageAtomicReference.get();
assertThat(message1).isNotNull();
assertThat(message1).hasFieldOrPropertyWithValue("payload", "foo");
```

## [](#summary)[](#summary)Summary

The entire code for the mentioned applications and, of course, tests for them are available in the Spring Cloud Stream Samples project in the [testing](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/testing) module. Try out the the various testing tools and techniques provided by Spring Boot, Spring Integration and Spring Cloud Stream. Don’t hesitate to combine these tools for a more comprehensive test coverage.

The second part of this article will concentrate on the integration tests for Spring Cloud Stream applications and the event-driven interaction.

Lastly, please join my session, at [Spring One Platform](https://springoneplatform.io/sessions/spring-integration-5-0-whats-new) conference this December where in my talk I will give some insight for new Testing features in Spring Integration `5.0`.