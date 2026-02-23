---
title: Spring Integration Java DSL: Line by line tutorial
source: https://spring.io/blog/2014/11/25/spring-integration-java-dsl-line-by-line-tutorial
scraped: 2026-02-23T22:05:16.163Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  November 25, 2014 | 32 Comments
---

# Spring Integration Java DSL: Line by line tutorial

_Engineering | Artem Bilan |  November 25, 2014 | 32 Comments_

Dear Spring Community!

Just after the [Spring Integration Java DSL 1.0 GA](https://spring.io/blog/2014/11/24/spring-integration-java-dsl-1-0-ga-released) release announcement I want to introduce the Spring Integration Java DSL to you as a line by line tutorial based on the classic [Cafe Demo](https://github.com/spring-projects/spring-integration-samples/tree/master/dsl/cafe-dsl) integration sample. We describe here [Spring Boot](http://projects.spring.io/spring-boot/) support, Spring Framework [Java and Annotation](http://docs.spring.io/spring/docs/current/spring-framework-reference/htmlsingle/#beans-java) configuration, the [`IntegrationFlow`](https://github.com/spring-projects/spring-integration-java-dsl/blob/master/src/main/java/org/springframework/integration/dsl/IntegrationFlow.java) feature and pay tribute to Java 8 [Lambda](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html) support which was an inspiration for the DSL style. Of course, it is all backed by the [Spring Integration Core](http://projects.spring.io/spring-integration/) project.

For those, who are not interested in Java 8 yet, we provide similar tutorial without Lambdas: [Spring Integration Java DSL (pre Java 8): Line by line tutorial](http://spring.io/blog/2014/12/01/spring-integration-java-dsl-pre-java-8-line-by-line-tutorial).

But, before we launch into the description of the Cafe demonstration app here's a shorter example just to get started...

```java
Copy@Configuration
@EnableAutoConfiguration
@IntegrationComponentScan
public class Start {

	public static void main(String[] args) throws InterruptedException {
		ConfigurableApplicationContext ctx = 
                                 SpringApplication.run(Start.class, args);

		List<String> strings = Arrays.asList("foo", "bar");
		System.out.println(ctx.getBean(Upcase.class).upcase(strings));

		ctx.close();
	}

	@MessagingGateway
	public interface Upcase {

		@Gateway(requestChannel = "upcase.input")
		Collection<String> upcase(Collection<String> strings);

	}

	@Bean
	public IntegrationFlow upcase() {
	     return f -> f
		 	.split()                                         // 1
			.<String, String>transform(String::toUpperCase)  // 2
			.aggregate();                                    // 3
	}

}
```

We will leave the description of the infrastructure (annotations etc) to the main cafe flow description. Here, we want you to concentrate on the last `@Bean`, the `IntegrationFlow` as well as the gateway method which sends messages to that flow.

In the `main` method we send a collection of strings to the gateway and print the results to STDOUT. The flow first splits the collection into individual `String`s (1); each string is then transformed to upper case (2) and finally we re-aggregate them back into a collection (3) Since that's the end of the flow, the framework returns the result of the aggregation back to the gateway and the new payload becomes the return value from the gateway method.

The equivalent XML configuration might be...

```xml
Copy<int:gateway service interface="foo.Upcase" 
                 default-request-channel="upcase.input">

<int:splitter input-channel="upcase.input" output-channel="transform"/>

<int:transformer expression="payload.toUpperCase()"
    input-channel="transform"
    output-channel="aggregate" />

<int:aggregator input-channle="aggregate" />
```

or...

```xml
Copy<int:gateway service interface="foo.Upcase" 
                default-request-channel="upcase.input">

<int:chain input-channel="upcase.input">
    <int:splitter />
    <int:transformer expression="payload.toUpperCase()" />
    <int:aggregator />
</int:chain>
```

##Cafe Demo

The purpose of the `Cafe Demo` application is to demonstrate how Enterprise Integration Patterns (EIP) can be used to reflect the `order-delivery` scenario in a real life cafe. With this application, we handle several drink orders - hot and iced. After running the application we can see in the standard output (`System.out.println`) how cold drinks are prepared quicker than hot. However the delivery for the whole order is postponed until the hot drink is ready.

To reflect the domain model we have several classes: `Order`, `OrderItem`, `Drink` and `Delivery`. They all are mentioned in the integration scenario, but we won't analyze them here, because they are simple enough.

The source code for our application is placed only in a single class; significant lines are annotated with a number corresponding to the comments, which follow:

```java
Copy@SpringBootApplication               // 1
@IntegrationComponentScan            // 2
public class Application {

  public static void main(String[] args) throws Exception {
  	ConfigurableApplicationContext ctx =
  	              SpringApplication.run(Application.class, args);// 3

  	Cafe cafe = ctx.getBean(Cafe.class);                         // 4
  	for (int i = 1; i <= 100; i++) {                             // 5
       Order order = new Order(i);
       order.addItem(DrinkType.LATTE, 2, false); //hot
       order.addItem(DrinkType.MOCHA, 3, true);  //iced
       cafe.placeOrder(order);
  	}

  	System.out.println("Hit 'Enter' to terminate");              // 6
  	System.in.read();
  	ctx.close();
  }

  @MessagingGateway                                              // 7
  public interface Cafe {

  	@Gateway(requestChannel = "orders.input")                    // 8
  	void placeOrder(Order order);                                // 9

  }

  private AtomicInteger hotDrinkCounter = new AtomicInteger();

  private AtomicInteger coldDrinkCounter = new AtomicInteger();  // 10

  @Bean(name = PollerMetadata.DEFAULT_POLLER)
  public PollerMetadata poller() {                               // 11
  	return Pollers.fixedDelay(1000).get();
  }

  @Bean
  public IntegrationFlow orders() {                             // 12
  	return f -> f                                               // 13
  	  .split(Order.class, Order::getItems)                      // 14
  	  .channel(c -> c.executor(Executors.newCachedThreadPool()))// 15
  	  .<OrderItem, Boolean>route(OrderItem::isIced, mapping -> mapping // 16
  	    .subFlowMapping("true", sf -> sf                        // 17
  	      .channel(c -> c.queue(10))                            // 18
  	      .publishSubscribeChannel(c -> c                       // 19
  	        .subscribe(s ->                                     // 20
  	          s.handle(m -> sleepUninterruptibly(1, TimeUnit.SECONDS)))// 21
  	        .subscribe(sub -> sub                               // 22
  	          .<OrderItem, String>transform(item ->
  	            Thread.currentThread().getName()
  	              + " prepared cold drink #"
  	              + this.coldDrinkCounter.incrementAndGet()
  	              + " for order #" + item.getOrderNumber()
  	              + ": " + item)                                 // 23
  	          .handle(m -> System.out.println(m.getPayload())))))// 24
  	    .subFlowMapping("false", sf -> sf                        // 25
  	      .channel(c -> c.queue(10))
  	      .publishSubscribeChannel(c -> c
  	        .subscribe(s ->
  	          s.handle(m -> sleepUninterruptibly(5, TimeUnit.SECONDS)))// 26
  	        .subscribe(sub -> sub
  	          .<OrderItem, String>transform(item ->
  	            Thread.currentThread().getName()
  	              + " prepared hot drink #"
  	              + this.hotDrinkCounter.incrementAndGet()
  	              + " for order #" + item.getOrderNumber()
  	              + ": " + item)
  	          .handle(m -> System.out.println(m.getPayload()))))))
  	  .<OrderItem, Drink>transform(orderItem ->
  	    new Drink(orderItem.getOrderNumber(),
  	      orderItem.getDrinkType(),
  	      orderItem.isIced(),
  	      orderItem.getShots()))                                // 27
  	  .aggregate(aggregator -> aggregator                       // 28
  	    .outputProcessor(group ->                               // 29
  	      new Delivery(group.getMessages()
  	        .stream()
  	        .map(message -> (Drink) message.getPayload())
  	        .collect(Collectors.toList())))                     // 30
  	    .correlationStrategy(m ->
  	      ((Drink) m.getPayload()).getOrderNumber()), null)     // 31
  	  .handle(CharacterStreamWritingMessageHandler.stdout());   // 32
  }

}
```

Examining the code line by line...

1

```java
Copy@SpringBootApplication
```

This new meta-annotation from Spring Boot 1.2. Includes `@Configuration` and `@EnableAutoConfiguration`. Since we are in a Spring Integration application and Spring Boot has auto-configuration for it, the `@EnableIntegration` is automatically applied, to initialize the Spring Integration infrastructure including an environment for the Java DSL - `DslIntegrationConfigurationInitializer`, which is picked up by the `IntegrationConfigurationBeanFactoryPostProcessor` from `/META-INF/spring.factories`.

2

```java
Copy@IntegrationComponentScan
```

The Spring Integration analogue of `@ComponentScan` to scan components based on interfaces, (the Spring Framework's `@ComponentScan` only looks at classes). Spring Integration supports the discovery of interfaces annotated with `@MessagingGateway` (see #7 below).

3

```java
CopyConfigurableApplicationContext ctx = SpringApplication.run(Application.class, args);
```

The `main` method of our class is designed to start the Spring Boot application using the configuration from this class and starts an `ApplicationContext` via Spring Boot. In addition, it delegates command line arguments to the Spring Boot. For example you can specify `--debug` to see logs for the boot auto-configuration report.

4

```java
CopyCafe cafe = ctx.getBean(Cafe.class);
```

Since we already have an `ApplicationContext` we can start to interact with application. And `Cafe` is that entry point - in EIP terms a `gateway`. Gateways are simply interfaces and the application does not interact with the Messaging API; it simply deals with the domain (see #7 below).

5

```java
Copyfor (int i = 1; i <= 100; i++) {
```

To demonstrate the cafe "work" we intiate 100 orders with two drinks - one hot and one iced. And send the `Order` to the `Cafe` gateway.

6

```java
CopySystem.out.println("Hit 'Enter' to terminate");
```

Typically Spring Integration application are asynchronous, hence to avoid early exit from the `main` Thread we block the `main` method until some end-user interaction through the command line. Non daemon threads will keep the application open but `System.read()` provides us with a mechanism to close the application cleanly.

7

```java
Copy@MessagingGateway
```

The annotation to mark a business interface to indicate it is a `gateway` between the end-application and integration layer. It is an analogue of `<gateway />` component from Spring Integration XML configuration. Spring Integration creates a `Proxy` for this interface and populates it as a bean in the application context. The purpose of this `Proxy` is to wrap parameters in a `Message<?>` object and send it to the `MessageChannel` according to the provided options.

8

```java
Copy@Gateway(requestChannel = "orders.input")
```

The method level annotation to distinct business logic by methods as well as by the target integration flows. In this sample we use a `requestChannel` reference of `orders.input`, which is a `MessageChannel` bean name of our `IntegrationFlow` input channel (see below #13).

9

```java
Copyvoid placeOrder(Order order);
```

The interface method is a central point to interact from end-application with the integration layer. This method has a `void` return type. It means that our integration flow is `one-way` and we just send messages to the integration flow, but don't wait for a reply.

10

```java
Copyprivate AtomicInteger hotDrinkCounter = new AtomicInteger();
private AtomicInteger coldDrinkCounter = new AtomicInteger();
```

Two counters to gather the information how our cafe works with drinks.

11

```java
Copy@Bean(name = PollerMetadata.DEFAULT_POLLER)
public PollerMetadata poller() {
```

The `default` `poller` bean. It is a analogue of `<poller default="true">` component from Spring Integration XML configuration. Required for endpoints where the `inputChannel` is a `PollableChannel`. In this case, it is necessary for the two Cafe `queues` - hot and iced (see below #18). Here we use the `Pollers` factory from the DSL project and use its method-chain fluent API to build the poller metadata. Note that `Pollers` can be used directly from an `IntegrationFlow` definition, if a specific `poller` (rather than the default poller) is needed for an endpoint.

12

```java
Copy@Bean
public IntegrationFlow orders() {
```

The `IntegrationFlow` bean definition. It is the central component of the Spring Integration Java DSL, although it does not play any role at runtime, just during the bean registration phase. All other code below registers Spring Integration components (`MessageChannel`, `MessageHandler`, `EventDrivenConsumer`, `MessageProducer`, `MessageSource` etc.) in the `IntegrationFlow` object, which is parsed by the `IntegrationFlowBeanPostProcessor` to process those components and register them as beans in the application context as necessary (some elements, such as channels may already exist).

13

```java
Copyreturn f -> f
```

The `IntegrationFlow` is a `Consumer` functional interface, so we can minimize our code and concentrate just only on the integration scenario requirements. Its `Lambda` accepts `IntegrationFlowDefinition` as an argument. This class offers a comprehensive set of methods which can be composed to the `chain`. We call these `EIP-methods`, because they provide implementations for EI patterns and populate components from Spring Integration Core. During the bean registration phase, the `IntegrationFlowBeanPostProcessor` converts this inline (Lambda) `IntegrationFlow` to a `StandardIntegrationFlow` and processes its components. The same we can achieve using `IntegrationFlows` factory (e.g. `IntegrationFlow.from("channelX"). ... .get()`), but we find the Lambda definition more elegant. An `IntegrationFlow` definition using a Lambda populates `DirectChannel` as an `inputChannel` of the flow and it is registered in the application context as a bean with the name `orders.input` in this our sample (`flow bean name + ".input"`). That's why we use that name for the `Cafe` gateway.

14

```java
Copy.split(Order.class, Order::getItems)
```

Since our integration flow accepts message through the `orders.input` channel, we are ready to consume and process them. The first EIP-method in our scenario is `.split()`. We know that the message `payload` from `orders.input` channel is an `Order` domain object, so we can simply use its type here and use the Java 8 `method-reference` feature. The first parameter is a type of message `payload` we expect, and the second is a method reference to the `getItems()` method, which returns `Collection<OrderItem>`. So, this performs the `split` EI pattern, when we send each collection entry as a separate message to the next channel. In the background, the `.split()` method registers a `MethodInvokingSplitter` `MessageHandler` implementation and the `EventDrivenConsumer` for that `MessageHandler`, and wiring in the `orders.input` channel as the `inputChannel`.

15

```java
Copy.channel(c -> c.executor(Executors.newCachedThreadPool()))
```

The `.channel()` EIP-method allows the specification of concrete `MessageChannel`s between endpoints, as it is done via `output-channel`/`input-channel` attributes pair with Spring Integration XML configuration. By default, endpoints in the DSL integration flow definition are wired with `DirectChannel`s, which get the bean names based on the `IntegrationFlow` bean name and `index` in the flow chain. In this case we use another `Lambda` expression, which selects a specific `MessageChannel` implementation from its `Channels` factory and configures it with the fluent API. The current channel here is an `ExecutorChannel`, to allow to distribute messages from the `splitter` to separate `Thread`s, to process them in parallel in the downstream flow.

16

```java
Copy.<OrderItem, Boolean>route(OrderItem::isIced, mapping -> mapping
```

The next EIP-method in our scenario is `.route()`, to send `hot/iced` order items to different Cafe kitchens. We again use here a method reference (`isIced()`) to get the `routingKey` from the incoming message. The second Lambda parameter represents a `router mapping` - something similar to `<mapping>` sub-element for the `<router>` component from Spring Integration XML configuration. However since we are using Java we can go a bit further with its Lambda support! The Spring Integration Java DSL introduced the `subflow` definition for `router`s in addition to traditional `channel mapping`. Each subflow is executed depending on the routing and, if the subflow produces a result, it is passed to the next element in the flow definition after the router.

17

```java
Copy.subFlowMapping("true", sf -> sf 
```

Specifies the integration flow for the current router's `mappingKey`. We have in this samples two subflows - `hot` and `iced`. The subflow is the same `IntegrationFlow` functional interface, therefore we can use its Lambda exactly the same as we do on the top level `IntegrationFlow` definition. The subflows don't have any runtime dependency with its parent, it's just a logical relationship.

18

```java
Copy.channel(c -> c.queue(10))
```

We already know that a Lambda definition for the `IntegrationFlow` starts from `[FLOW_BEAN_NAME].input` `DirectChannel`, so it may be a question "how does it work here if we specify `.channel()` again?". The DSL takes care of such a case and wires those two channels with a `BridgeHandler` and endpoint. In our sample, we use here a restricted `QueueChannel` to reflect the Cafe kitchen busy state from real life. And here is a place where we need that `global poller` for the next endpoint which is listening on this channel.

19

```java
Copy.publishSubscribeChannel(c -> c
```

The `.publishSubscribeChannel()` EIP-method is a variant of the `.channel()` for a `MessageChannels.publishSubscribe()`, but with the `.subscribe()` option when we can specify subflow as a subscriber to the channel. Right, subflow one more time! So, subflows can be specified to any depth. Independently of the presence `.subscribe()` subflows, the next endpoint in the parent flow is also a subscriber to this `.publishSubscribeChannel()`. Since we are in the `.route()` subflow already, the last subscriber is an implicit `BridgeHandler` which just pops the message to the top level - to a similar implicit `BridgeHandler` to pop message to the next `.transform()` endpoint in the main flow. And one more note about this current position of our flow: the previous EIP-method is `.channel(c -> c.queue(10))` and this one is for `MessageChannel` too. So, they are again tied with an implicit `BridgeHandler` as well. In a real application we could avoid this `.publishSubscribeChannel()` just with the single `.handle()` for the Cafe kitchen, but our goal here to cover DSL features as much as possible. That's why we distribute the kitchen work to several subflows for the same `PublishSubscribeChannel`.

20

```java
Copy.subscribe(s ->
```

The `.subscribe()` method accepts an `IntegrationFlow` as parameter, which can be specified as Lambda to configure subscriber as `subflow`. We use here several subflow subscribers to avoid multi-line Lambdas and cover some DSL as we as Spring Integration capabilities.

21

```java
Copys.handle(m -> sleepUninterruptibly(1, TimeUnit.SECONDS)))
```

Here we use a simple `.handle()` EIP-method just to block the current Thread for some timeout to demonstrate how quickly the Cafe kitchen prepares a drink. Here we use Google Guava `Uninterruptibles.sleepUninterruptibly`, to avoid using a `try...catch` block within the Lambda expression, although you can do that and your Lambda will be multi-line. Or you can move that code to a separate method and use it here as `method reference`.

Since we don't use any `Executor` on the `.publishSubscribeChannel()` all subscribers will beperformed sequentially on the same Thread; in our case it is one of `TaskScheduler`'s Threads from `poller` on the previous `QueueChannel`. That's why this `sleep` blocks all downstream process and allows to demonstrate the `busy state` for that restricted to 10 `QueueChannel`.

22

```java
Copy.subscribe(sub -> sub
```

The next subflow subscriber which will be performed only after that `sleep` with 1 second for `iced` drink. We use here one more subflow because `.handle()` of previous one is `one-way` with the nature of the Lambda for `MessageHandler`. That's why, to go ahead with process of our whole flow, we have several subscribers: some of subflows finish after their work and don't return anything to the parent flow.

23

```java
Copy .<OrderItem, String>transform(item ->
  	            Thread.currentThread().getName()
  	              + " prepared cold drink #"
  	              + this.coldDrinkCounter.incrementAndGet()
  	              + " for order #" + item.getOrderNumber()
  	              + ": " + item)         
```

The `transformer` in the current subscriber subflow is to convert the `OrderItem` to the friendly STDOUT message for the next `.handle`. Here we see the use of generics with the Lambda expression. This is implemented using the `GenericTransformer` functional interface.

24

```java
Copy.handle(m -> System.out.println(m.getPayload())))))
```

The `.handle()` here just to demonstrate how to use Lambda expression to print the `payload` to STDOUT. It is a signal that our drink is ready. After that the final (implicit) subscriber to the `PublishSubscribeChannel` just sends the message with the `OrderItem` to the `.transform()` in the main flow.

25

```java
Copy.subFlowMapping("false", sf -> sf
```

The `.subFlowMapping()` for the `hot` drinks. Actually it is similar to the previous `iced` drinks subflow, but with specific `hot` business logic.

26

```java
Copys.handle(m -> sleepUninterruptibly(5, TimeUnit.SECONDS)))
```

The `sleepUninterruptibly` for `hot` drinks. Right, we need more time to boil the water!

27

```java
Copy .<OrderItem, Drink>transform(orderItem ->
  	    new Drink(orderItem.getOrderNumber(),
  	      orderItem.getDrinkType(),
  	      orderItem.isIced(),
  	      orderItem.getShots()))      
```

The main `OrderItem` to `Drink` `transformer`, which is performed when the `.route()` subflow returns its result after the Cafe kitchen subscribers have finished preparing the drink.

28

```java
Copy.aggregate(aggregator -> aggregator
```

The `.aggregate()` EIP-method provides similar options to configure an `AggregatingMessageHandler` and its endpoint, like we can do with the `<aggregator>` component when using Spring Integration XML configuration. Of course, with the Java DSL we have more power to configure the aggregator just in place, without any other extra beans. And Lambdas come to the rescue again! From the Cafe business logic perspective we compose the `Delivery` for the initial `Order`, since we `.split()` the original order to the `OrderItem`s near the beginning.

29

```java
Copy.outputProcessor(group -> 
```

The `.outputProcessor()` of the `AggregatorSpec` allows us to emit a custom result after aggregator completes the group. It's an analogue of `ref`/`method` from the `<aggregator>` component or the `@Aggregator` annotation on a POJO method. Our goal here to compose a `Delivery` for all `Drink`s.

30

```java
Copynew Delivery(group.getMessages()
  	        .stream()
  	        .map(message -> (Drink) message.getPayload())
  	        .collect(Collectors.toList())))    
```

As you see we use here the Java 8 `Stream` feature for `Collection`. We iterate over messages from the released `MessageGroup` and convert (`map`) each of them to its `Drink` `payload`. The result of the `Stream` (`.collect()`) (a list of `Drink`s) is passed to the `Delivery` constructor. The `Message` with this new `Delivery` payload is sent to the next endpoint in our Cafe scenario.

31

```java
Copy.correlationStrategy(m ->
  	      ((Drink) m.getPayload()).getOrderNumber()), null)
```

The `.correlationStrategy()` Lambda demonstrates how we can customize an aggregator behaviour. Of course, we can rely here just only on a built-in `SequenceDetails` from Spring Integration, which is populated by default from `.split()` in the beginning of our flow to each split message, but the Lambda sample for the `CorrelationStrategy` is included for illustration. (With XML, we could have used a `correlation-expression` or a custom `CorrelationStrategy`). The second argument in this line for the `.aggregate()` EIP-method is for the `endpointConfigurer` to customize options like `autoStartup`, `requiresReply`, `adviceChain` etc. We use here `null` to show that we rely on the default options for the endpoint. Many of EIP-methods provide overloaded versions with and without `endpointConfigurer`, but `.aggregate()` requires an endpoint argument, to avoid an explicit cast for the `AggregatorSpec` Lambda argument.

32

```java
Copy.handle(CharacterStreamWritingMessageHandler.stdout());
```

It is the end of our flow - the `Delivery` is delivered to the client! We just print here the message `payload` to STDOUT using out-of-the-box `CharacterStreamWritingMessageHandler` from Spring Integration Core. This is a case to show how existing components from Spring Integration Core (and its modules) can be used from the Java DSL.

Well, we have finished describing the Cafe Demo sample based on the Spring Integration Java DSL. Compare it with [XML sample](https://github.com/spring-projects/spring-integration-samples/tree/master/applications/cafe/cafe-si) to get more information regarding Spring Integration.

This is not an overall tutorial to the DSL stuff. We don't review here the `endpointConfigurer` options, `Transformers` factory, the `IntegrationComponentSpec` hierarchy, the `NamespaceFactories`, how we can specify several `IntegrationFlow` beans and wire them to a single application etc., see the [Reference Manual](https://github.com/spring-projects/spring-integration-java-dsl/wiki/Spring-Integration-Java-DSL-Reference) for more information.

At least this line-by-line tutorial should show you Spring Integration Java DSL basics and its seamless fusion between Spring Framework Java & Annotation configuration, Spring Integration foundation and Java 8 Lambda support!

Also see the [si4demo](https://github.com/spring-projects/spring-integration-samples/tree/master/dsl/si4demo) to see the evolution of Spring Integration including the Java DSL, as shown at the 2014 SpringOne/2GX Conference. (Video should be available soon).

As always, we look forward to your comments and feedback ([StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INTEXT), [GitHub](https://github.com/spring-projects/spring-integration-java-dsl/issues)) and we very much welcome [contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)!

P.S. Even if this tutorial is fully based on the Java 8 Lambda support, we don't want to miss pre Java 8 users, we are going to provide similar non-Lambda blog post. Stay tuned!