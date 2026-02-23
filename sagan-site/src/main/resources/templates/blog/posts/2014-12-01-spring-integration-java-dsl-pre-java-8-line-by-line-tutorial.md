---
title: Spring Integration Java DSL (pre Java 8): Line by line tutorial
source: http://spring.io/blog/2014/12/01/spring-integration-java-dsl-pre-java-8-line-by-line-tutorial
scraped: 2026-02-23T22:05:46.373Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Artem Bilan |  December 01, 2014 | 0 Comments
---

# Spring Integration Java DSL (pre Java 8): Line by line tutorial

_Engineering | Artem Bilan |  December 01, 2014 | 0 Comments_

Dear Spring Community!

Recently we published the [Spring Integration Java DSL: Line by line tutorial](https://spring.io/blog/2014/11/25/spring-integration-java-dsl-line-by-line-tutorial), which uses Java 8 Lambdas extensively. We received some feedback that this is good introduction to the DSL, but a similar tutorial is needed for those users, who can't move to the Java 8 or aren't yet familiar with `Lambdas`, but wish to take advantage

So, to help those Spring Integration users who want to moved from XML configuration to Java & Annotation configuration, we provide this `line-by-line tutorial` to demonstrate that, even without `Lambdas`, we gain a lot from Spring Integration Java DSL usage. Although, most will agree that the lambda syntax provides for a more succinct definition.

We analyse here the same [Cafe Demo](https://github.com/spring-projects/spring-integration-samples/tree/master/dsl/cafe-dsl) sample, but using the pre Java 8 variant for configuration. Many options are the same, so we just copy/paste their description here to achieve a complete picture. Since this Spring Integration Java DSL configuration is quite different to the Java 8 lambda style, it will be useful for all users to get a knowlage how we can achieve the same result with a rich variety of options provided by the Spring Integration Java DSL.

The source code for our application is placed in a single class, which is a `Boot` application; significant lines are annotated with a number corresponding to the comments, which follow:

```java
Copy@SpringBootApplication                                                   // 1
@IntegrationComponentScan                                                // 2
public class Application {

  public static void main(String[] args) throws Exception {
  	ConfigurableApplicationContext ctx =
			SpringApplication.run(Application.class, args);              // 3

  	Cafe cafe = ctx.getBean(Cafe.class);                                 // 4
  	for (int i = 1; i <= 100; i++) {                                     // 5
  	  Order order = new Order(i);
  	  order.addItem(DrinkType.LATTE, 2, false);
  	  order.addItem(DrinkType.MOCHA, 3, true);
  	  cafe.placeOrder(order);
  	}

  	System.out.println("Hit 'Enter' to terminate");                      // 6
  	System.in.read();
  	ctx.close();
  }

  @MessagingGateway                                                      // 7
  public interface Cafe {

  	@Gateway(requestChannel = "orders.input")                            // 8
  	void placeOrder(Order order);                                        // 9

  }

  private final AtomicInteger hotDrinkCounter = new AtomicInteger();

  private final AtomicInteger coldDrinkCounter = new AtomicInteger();    // 10

  @Autowired
  private CafeAggregator cafeAggregator;                                 // 11

  @Bean(name = PollerMetadata.DEFAULT_POLLER)
  public PollerMetadata poller() {                                       // 12
  	return Pollers.fixedDelay(1000).get();
  }

  @Bean
  @SuppressWarnings("unchecked")
  public IntegrationFlow orders() {                                      // 13
  	return IntegrationFlows.from("orders.input")                         // 14
	  .split("payload.items", (Consumer) null)                           // 15
	  .channel(MessageChannels.executor(Executors.newCachedThreadPool()))// 16
	  .route("payload.iced",                                             // 17
	    new Consumer<RouterSpec<ExpressionEvaluatingRouter>>() {         // 18

	      @Override
	      public void accept(RouterSpec<ExpressionEvaluatingRouter> spec) {
	      	spec.channelMapping("true", "iced")
                .channelMapping("false", "hot");                         // 19
  	      }

  	    })
  	  .get();                                                            // 20
  }

  @Bean
  public IntegrationFlow icedFlow() {                                    // 21
  	return IntegrationFlows.from(MessageChannels.queue("iced", 10))      // 22
	  .handle(new GenericHandler<OrderItem>() {                          // 23

	  	@Override
	  	public Object handle(OrderItem payload, Map<String, Object> headers) {
	  	  Uninterruptibles.sleepUninterruptibly(1, TimeUnit.SECONDS);
	  	  System.out.println(Thread.currentThread().getName()
	  	    + " prepared cold drink #" + coldDrinkCounter.incrementAndGet()
	  	    + " for order #" + payload.getOrderNumber() + ": " + payload);
	  	  return payload;                                                // 24
  	  	}

  	  })
  	  .channel("output")                                                 // 25
  	  .get();
  }

  @Bean
  public IntegrationFlow hotFlow() {                                     // 26
  	return IntegrationFlows.from(MessageChannels.queue("hot", 10))
	  .handle(new GenericHandler<OrderItem>() {

	  	@Override
	  	public Object handle(OrderItem payload, Map<String, Object> headers) {
	  	  Uninterruptibles.sleepUninterruptibly(5, TimeUnit.SECONDS);    // 27
	  	  System.out.println(Thread.currentThread().getName()
	  	    + " prepared hot drink #" + hotDrinkCounter.incrementAndGet()
	  	    + " for order #" + payload.getOrderNumber() + ": " + payload);
	  	  return payload;
  	  	}

  	  })
  	  .channel("output")
  	  .get();
  }

  @Bean
  public IntegrationFlow resultFlow() {                                  // 28
    return IntegrationFlows.from("output")                               // 29
      .transform(new GenericTransformer<OrderItem, Drink>() {            // 30

        @Override
        public Drink transform(OrderItem orderItem) {
          return new Drink(orderItem.getOrderNumber(),
            orderItem.getDrinkType(),
            orderItem.isIced(),
            orderItem.getShots());                                       // 31
        }

      })
      .aggregate(new Consumer<AggregatorSpec>() {                        // 32

        @Override
        public void accept(AggregatorSpec aggregatorSpec) {
          aggregatorSpec.processor(cafeAggregator, null);                // 33
        }

      }, null)
      .handle(CharacterStreamWritingMessageHandler.stdout())             // 34
    .get();
  }

  @Component
  public static class CafeAggregator {                                   // 35

  	@Aggregator                                                          // 36
  	public Delivery output(List<Drink> drinks) {
  	  return new Delivery(drinks);
  	}

  	@CorrelationStrategy                                                 // 37
  	public Integer correlation(Drink drink) {
  	  return drink.getOrderNumber();
  	}

  }

}
```

Examining the code line by line...

1\. \`\`\`\`java @SpringBootApplication \`\`\`\` This new meta-annotation from Spring Boot 1.2. Includes \`@Configuration\` and \`@EnableAutoConfiguration\`. Since we are in a Spring Integration application and Spring Boot has auto-configuration for it, the \`@EnableIntegration\` is automatically applied, to initialize the Spring Integration infrastructure including an environment for the Java DSL - \`DslIntegrationConfigurationInitializer\`, which is picked up by the \`IntegrationConfigurationBeanFactoryPostProcessor\` from \`/META-INF/spring.factories\`. 2\. \`\`\`\`java @IntegrationComponentScan \`\`\`\` The Spring Integration analogue of \`@ComponentScan\` to scan components based on interfaces, (the Spring Framework's \`@ComponentScan\` only looks at classes). Spring Integration supports the discovery of interfaces annotated with \`@MessagingGateway\` (see #7 below). 3\. \`\`\`\`java ConfigurableApplicationContext ctx = SpringApplication.run(Application.class, args); \`\`\`\` The \`main\` method of our class is designed to start the Spring Boot application using the configuration from this class and starts an \`ApplicationContext\` via Spring Boot. In addition, it delegates command line arguments to the Spring Boot. For example you can specify \`--debug\` to see logs for the boot auto-configuration report. 4\. \`\`\`\`java Cafe cafe = ctx.getBean(Cafe.class); \`\`\`\` Since we already have an \`ApplicationContext\` we can start to interact with application. And \`Cafe\` is that entry point - in EIP terms a \`gateway\`. Gateways are simply interfaces and the application does not interact with the Messaging API; it simply deals with the domain (see #7 below). 5\. \`\`\`\`java for (int i = 1; i <= 100; i++) { \`\`\`\` To demonstrate the cafe "work" we intiate 100 orders with two drinks - one hot and one iced. And send the \`Order\` to the \`Cafe\` gateway. 6\. \`\`\`\`java System.out.println("Hit 'Enter' to terminate"); \`\`\`\` Typically Spring Integration application are asynchronous, hence to avoid early exit from the \`main\` Thread we block the \`main\` method until some end-user interaction through the command line. Non daemon threads will keep the application open but \`System.read()\` provides us with a mechanism to close the application cleanly. 7\. \`\`\`\`java @MessagingGateway \`\`\`\` The annotation to mark a business interface to indicate it is a \`gateway\` between the end-application and integration layer. It is an analogue of \`\` component from Spring Integration XML configuration. Spring Integration creates a \`Proxy\` for this interface and populates it as a bean in the application context. The purpose of this \`Proxy\` is to wrap parameters in a \`Message\` object and send it to the \`MessageChannel\` according to the provided options. 8\. \`\`\`\`java @Gateway(requestChannel = "orders.input") \`\`\`\` The method level annotation to distinct business logic by methods as well as by the target integration flows. In this sample we use a \`requestChannel\` reference of \`orders.input\`, which is a \`MessageChannel\` bean name of our \`IntegrationFlow\` input channel (see below #14). 9\. \`\`\`\`java void placeOrder(Order order); \`\`\`\` The interface method is a central point to interact from end-application with the integration layer. This method has a \`void\` return type. It means that our integration flow is \`one-way\` and we just send messages to the integration flow, but don't wait for a reply. 10\. \`\`\`\`java private AtomicInteger hotDrinkCounter = new AtomicInteger(); private AtomicInteger coldDrinkCounter = new AtomicInteger(); \`\`\`\` Two counters to gather the information how our cafe works with drinks. 11\. \`\`\`\`java @Autowired private CafeAggregator cafeAggregator; \`\`\`\` The POJO for the \`Aggregator\` logic (see #33 and #35 below). Since it is a Spring bean, we can simply inject it even to the current \`@Configuration\` and use in any place below, e.g. from the \`.aggregate()\` EIP-method. 12\. \`\`\`\`java @Bean(name = PollerMetadata.DEFAULT\_POLLER) public PollerMetadata poller() { \`\`\`\` The \`default\` \`poller\` bean. It is a analogue of \`\` component from Spring Integration XML configuration. Required for endpoints where the \`inputChannel\` is a \`PollableChannel\`. In this case, it is necessary for the two Cafe \`queues\` - hot and iced (see below #18). Here we use the \`Pollers\` factory from the DSL project and use its method-chain fluent API to build the poller metadata. Note that \`Pollers\` can be used directly from an \`IntegrationFlow\` definition, if a specific \`poller\` (rather than the default poller) is needed for an endpoint. 13\. \`\`\`\`java @Bean public IntegrationFlow orders() { \`\`\`\` The \`IntegrationFlow\` bean definition. It is the central component of the Spring Integration Java DSL, although it does not play any role at runtime, just during the bean registration phase. All other code below registers Spring Integration components (\`MessageChannel\`, \`MessageHandler\`, \`EventDrivenConsumer\`, \`MessageProducer\`, \`MessageSource\` etc.) in the \`IntegrationFlow\` object, which is parsed by the \`IntegrationFlowBeanPostProcessor\` to process those components and register them as beans in the application context as necessary (some elements, such as channels may already exist). 14\. \`\`\`\`java return IntegrationFlows.from("orders.input") \`\`\`\` The \`IntegrationFlows\` is the main \`factory\` class to start the \`IntegrationFlow\`. It provides a number of overloaded \`.from()\` methods to allow starting a flow from a \`SourcePollingChannelAdapter\` for a \`MessageSource\` implementations, e.g. \`JdbcPollingChannelAdapter\`; from a \`MessageProducer\`, e.g. \`WebSocketInboundChannelAdapter\`; or simply a \`MessageChannel\`. All ".from()" options have several convenient variants to configure the appropriate component for the start of the \`IntegrationFlow\`. Here we use just a channel name, which is converted to a \`DirectChannel\` bean definition during the bean definition phase while parsing the \`IntegrationFlow\`. In the Java 8 variant, we used here a \`Lambda definition\` - and this \`MessageChannel\` has been implicitly created with the bean name based on the \`IntegrationFlow\` bean name. 15\. \`\`\`\`java .split("payload.items", (Consumer) null) \`\`\`\` Since our integration flow accepts messages through the \`orders.input\` channel, we are ready to consume and process them. The first EIP-method in our scenario is \`.split()\`. We know that the message \`payload\` from \`orders.input\` channel is an \`Order\` domain object, so we can simply use here a Spring (SpEL) Expression to return \`Collection\`. So, this performs the \`split\` EI pattern, and we send each collection entry as a separate message to the next channel. In the background, the \`.split()\` method registers a \`ExpressionEvaluatingSplitter\` \`MessageHandler\` implementation and an \`EventDrivenConsumer\` for that \`MessageHandler\`, wiring in the \`orders.input\` channel as the \`inputChannel\`.

The second argument for the `.split()` EIP-method is for an `endpointConfigurer` to customize options like `autoStartup`, `requiresReply`, `adviceChain` etc. We use here `null` to show that we rely on the default options for the endpoint. Many of EIP-methods provide overloaded versions with and without `endpointConfigurer`. Currently `.split(String expression)` EIP-method without the `endpointConfigurer` argument is not available; this will be addressed in a future release.

16\. \`\`\`\`java .channel(MessageChannels.executor(Executors.newCachedThreadPool())) \`\`\`\` The \`.channel()\` EIP-method allows the specification of concrete \`MessageChannel\`s between endpoints, as it is done via \`output-channel\`/\`input-channel\` attributes pair with Spring Integration XML configuration. By default, endpoints in the DSL integration flow definition are wired with \`DirectChannel\`s, which get bean names based on the \`IntegrationFlow\` bean name and \`index\` in the flow chain. In this case we select a specific \`MessageChannel\` implementation from the \`Channels\` factory class; the selected channel here is an \`ExecutorChannel\`, to allow distribution of messages from the \`splitter\` to separate \`Thread\`s, to process them in parallel in the downstream flow. 17\. \`\`\`\`java .route("payload.iced", \`\`\`\` The next EIP-method in our scenario is \`.route()\`, to send \`hot/iced\` order items to different Cafe kitchens. We again use here a SpEL expression to get the \`routingKey\` from the incoming message. In the Java 8 variant, we used a \`method-reference\` Lambda expression, but for pre Java 8 style we must use SpEL or an inline interface implementation. Many anonymous classes in a flow can make the flow difficult to read so we prefer SpEL in most cases. 18\. \`\`\`\`java new Consumer\>() { \`\`\`\` The second argument of \`.route()\` EIP-method is a functional interface \`Consumer\` to specify \`ExpressionEvaluatingRouter\` options using a \`RouterSpec\` Builder. Since we don't have any choice with pre Java 8, we just provide here an inline implementation for this interface. 19\. \`\`\`\`java spec.channelMapping("true", "iced") .channelMapping("false", "hot"); \`\`\`\` With the \`Consumer\>#accept()\` implementation we can provide desired \`AbstractMappingMessageRouter\` options. One of them is \`channelMappings\`, when we specify the routing logic by the result of router expresion and the target \`MessageChannel\` for the apropriate result. In this case \`iced\` and \`hot\` are \`MessageChannel\` names for \`IntegrationFlow\`s below. 20\. \`\`\`\`java .get(); \`\`\`\` This finalizes the flow. Any \`IntegrationFlows.from()\` method returns an \`IntegrationFlowBuilder\` instance and this \`get()\` method extracts an \`IntegrationFlow\` object from the \`IntegrationFlowBuilder\` configuration. Everything starting from the \`.from()\` and up to the method before the \`.get()\` is an \`IntegrationFlow\` definition. All defined components are stored in the \`IntegrationFlow\` and processed by the \`IntegrationFlowBeanPostProcessor\` during the bean creation phase. 21\. \`\`\`\`java @Bean public IntegrationFlow icedFlow() { \`\`\`\` This is the second \`IntegrationFlow\` bean definition - for \`iced\` drinks. Here we demonstrate that several \`IntegrationFlow\`s can be wired together to create a single complex application. Note: it isn't recommended to inject one \`IntegrationFlow\` to another; it might cause unexpected behaviour. Since they provide Integration components for the bean registration and \`MessageChannel\`s one of them, the best way to wire and inject is via \`MessageChannel\` or \`@MessagingGateway\` interfaces. 22\. \`\`\`\`java return IntegrationFlows.from(MessageChannels.queue("iced", 10)) \`\`\`\` The \`iced\` \`IntegrationFlow\` starts from a \`QueueChannel\` that has a capacity of \`10\` messages; it is registered as a bean with the name \`iced\`. As you remember we use this name as one of the route mappings (see above #19).

In our sample, we use here a restricted `QueueChannel` to reflect the Cafe kitchen busy state from real life. And here is a place where we need that `global poller` for the next endpoint which is listening on this channel.

23\. \`\`\`\`java .handle(new GenericHandler() { \`\`\`\` The \`.handle()\` EIP-method of the \`iced\` flow demonstrates the concrete Cafe kitchen work. Since we can't minimize the code with something like Java 8 Lambda expression, we provide here an inline implementation for the \`GenericHandler\` functional interface with the expected \`payload\` type as the generic argument. With the Java 8 example, we distribute this \`.handle()\` between several subscriber subflows for a \`PublishSubscribeChannel\`. However in this case, the logic is all implemented in the one method. 24\. \`\`\`\`java Uninterruptibles.sleepUninterruptibly(1, TimeUnit.SECONDS); System.out.println(Thread.currentThread().getName() + " prepared cold drink #" + coldDrinkCounter.incrementAndGet() + " for order #" + payload.getOrderNumber() + ": " + payload); return payload; \`\`\`\` The business logic implementation for the current \`.handle()\` EIP-component. With \`Uninterruptibles.sleepUninterruptibly(1, TimeUnit.SECONDS);\` we just block the current \`Thread\` for some timeout to demonstrate how quickly the Cafe kitchen prepares a drink. After that we just report to \`STDOUT\` that the drink is ready and return the current \`OrderItem\` from the \`GenericHandler\` for the next endpoint in our \`IntegrationFlow\`. In the background, the DSL framework registers a \`ServiceActivatingHandler\` for the \`MethodInvokingMessageProcessor\` to invoke the \`GenericHandler#handle\` at runtime. In addition, the framework registers a \`PollingConsumer\` endpoint for the \`QueueChannel\` above. This endpoint relies on the \`default poller\` to poll messages from the queue. Of course, we always can use a specific \`poller\` for any concrete endpoint. In that case, we would have to provide a second \`endpointConfigurer\` argument to the \`.handle()\` EIP-method. 25\. \`\`\`\`java .channel("output") \`\`\`\` Since it is not the end of our Cafe scenario, we send the result of the current flow to the \`output\` channel using the convenient EIP-method \`.channel()\` and the name of the \`MessageChannel\` bean (see below #29). This is the logical end of the current iced drink subflow, so we use the \`.get()\` method to return the \`IntegrationFlow\`. Flows that end with a reply-producing handler that don't have a final \`.channel()\` will return the reply to the message \`replyChannel\` header. 26\. \`\`\`\`java @Bean public IntegrationFlow hotFlow() { \`\`\`\` The \`IntegrationFlow\` definition for \`hot\` drinks. It is similar to the previous \`iced\` drinks flow, but with specific \`hot\` business logic. It starts from the \`hot\` \`QueueChannel\` which is mapped from the router above. 27\. \`\`\`\`java Uninterruptibles.sleepUninterruptibly(5, TimeUnit.SECONDS); \`\`\`\` The \`sleepUninterruptibly\` for \`hot\` drinks. Right, we need more time to boil the water! 28\. \`\`\`\`java @Bean public IntegrationFlow resultFlow() { \`\`\`\` One more \`IntegrationFlow\` bean definition to prepare the \`Delivery\` for the Cafe client based on the \`Drink\`s. 29\. \`\`\`\`java return IntegrationFlows.from("output") \`\`\`\` The \`resultFlow\` starts from the \`DirectChannel\`, which is created during the bean definition phase with this provided name. You should remember that we use the \`output\` channel name from the Cafe kitchens flows in the last \`.channel()\` in those definitions. 30\. \`\`\`\`java .transform(new GenericTransformer() { \`\`\`\` The \`.transform()\` EIP-method is for the appropriate pattern implementation and expects some object to convert one payload to another. In our sample we use an inline implementation of the \`GenericTransformer\` functional interface to convert \`OrderItem\` to \`Drink\` and we specify that using generic arguments. In the background, the DSL framework registers a \`MessageTransformingHandler\` and an \`EventDrivenConsumer\` endpoint with default options to consume messages from the \`output\` \`MessageChannel\`. 31\. \`\`\`\`java public Drink transform(OrderItem orderItem) { return new Drink(orderItem.getOrderNumber(), orderItem.getDrinkType(), orderItem.isIced(), orderItem.getShots()); } \`\`\`\` The business-specific \`GenericTransformer#transform()\` implementation to demonstrate how we benefit from Java Generics to transform one \`payload\` to another. Note: Spring Integration uses \`ConversionService\` before any method invocation and if you provide some specific \`Converter\` implementation, some domain \`payload\` can be converted to another automatically, when the framework has an appropriate registered \`Converter\`. 32\. \`\`\`\`java .aggregate(new Consumer() { \`\`\`\` The \`.aggregate()\` EIP-method provides options to configure an \`AggregatingMessageHandler\` and its endpoint, similar to what we can do with the \`\` component when using Spring Integration XML configuration. Of course, with the Java DSL we have more power to configure the aggregator in place, without any other extra beans. However we demonstrate here an aggregator configuration with annotations (see below #35). From the Cafe business logic perspective we compose the \`Delivery\` for the initial \`Order\`, since we \`.split()\` the original order to the \`OrderItem\`s near the beginning. 33\. \`\`\`\`java public void accept(AggregatorSpec aggregatorSpec) { aggregatorSpec.processor(cafeAggregator, null); } \`\`\`\` An inline implementation of the \`Consumer\` for the \`AggregatorSpec\`. Using the \`aggregatorSpec\` Builder we can provide desired options for the \`aggregator\` component, which will be registered as an \`AggregatingMessageHandler\` bean. Here we just provide the \`processor\` as a reference to the autowired (see #11 above) \`CafeAggregator\` component (see #35 below). The second argument of the \`.processor()\` option is \`methodName\`. Since we are relying on the aggregator annotation configuration for the POJO, we don't need to provide the method here and the framework will determine the correct POJO methods in the background. 34\. \`\`\`\`java .handle(CharacterStreamWritingMessageHandler.stdout()) \`\`\`\` It is the end of our flow - the \`Delivery\` is delivered to the client! We just print here the message \`payload\` to STDOUT using out-of-the-box \`CharacterStreamWritingMessageHandler\` from Spring Integration Core. This is a case to show how existing components from Spring Integration Core (and its modules) can be used from the Java DSL. 35\. \`\`\`\`java @Component public static class CafeAggregator { \`\`\`\` The bean to specify the business logic for the \`aggregator\` above. This bean is picked up by the \`@ComponentScan\`, which is a part of the \`@SpringBootApplication\` meta-annotation (see above #1). So, this component becomes a bean and we can automatically wire (\`@Autowired\`) it to other components in the application context (see #11 above). 36\. \`\`\`\`java @Aggregator public Delivery output(List drinks) { return new Delivery(drinks); } \`\`\`\` The POJO-specific \`MessageGroupProcessor\` to build the output \`payload\` based on the payloads from aggregated messages. Since we mark this method with the \`@Aggregator\` annotation, the target \`AggregatingMessageHandler\` can extract this method for the \`MethodInvokingMessageGroupProcessor\`. 37\. \`\`\`\`java @CorrelationStrategy public Integer correlation(Drink drink) { return drink.getOrderNumber(); } \`\`\`\` The POJO-specific \`CorrelationStrategy\` to extract the custom \`correlationKey\` from each inbound aggregator message. Since we mark this method with \`@CorrelationStrategy\` annotation the target \`AggregatingMessageHandler\` can extract this method for the \`MethodInvokingCorrelationStrategy\`. There is a similar self-explained \`@ReleaseStrategy\` annotation, but we rely in our Cafe sample just on the default \`SequenceSizeReleaseStrategy\`, which is based on the \`sequenceDetails\` message header populated by the \`splitter\` from the beginning of our integration flow.

Well, we have finished describing the Cafe Demo sample based on the Spring Integration Java DSL when Java Lambda support is not available. Compare it with [XML sample](https://github.com/spring-projects/spring-integration-samples/tree/master/applications/cafe/cafe-si) and also see [Lambda support tutorial](https://spring.io/blog/2014/11/25/spring-integration-java-dsl-line-by-line-tutorial) to get more information regarding Spring Integration.

As you can see, using the DSL without lambdas is a little more verbose because you need to provide boilerplate code for inline anonymous implementations of functional interfaces. However, we believe it is important to support the use of the DSL for users who can't yet move to Java 8. Many of the DSL benefits (fluent API, compile-time validation etc) are available for all users.

The use of lambdas continues the Spring Framework tradition of reducing or eliminating boilerplate code, so we encourage users to try Java 8 and lambdas and to encourage their organizations to consider allowing the use of Java 8 for Spring Integration applications.

In addition see the [Reference Manual](https://github.com/spring-projects/spring-integration-java-dsl/wiki/Spring-Integration-Java-DSL-Reference) for more information.

As always, we look forward to your comments and feedback ([StackOverflow](http://stackoverflow.com) (`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INTEXT), [GitHub](https://github.com/spring-projects/spring-integration-java-dsl/issues)) and we very much welcome [contributions](https://github.com/spring-projects/spring-integration/blob/master/CONTRIBUTING.md)!

Thank you for your time and patience to read this!