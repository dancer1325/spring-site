---
title: Testing Spring Cloud Stream Applications - Part 2
source: https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-2
scraped: 2026-02-23T13:37:10.145Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  December 15, 2020 | 1 Comment
---

# Testing Spring Cloud Stream Applications - Part 2

_Engineering | David Turanski |  December 15, 2020 | 1 Comment_

This is Part 2 of Testing Stream Applications. In [Part 1](https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-1) we implemented and tested the core function needed for our sample [couchbase-sink](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/function-based-stream-app-samples/couchbase-stream-applications) application. The tests at the function level covered expected success and error scenarios and relied on [Testcontainers](https://www.testcontainers.org/) to provision a Couchbase cluster. This post assumes you have read Part 1 and continues where it left off.

## [](#couchbase-sink)[](#couchbase-sink)Couchbase Sink

In Part 1 we verified that the function we wrote for upserting data into Couchbase works as expected. We can now use the function, exposed as a `java.util.Consumer`, to implement a sink to use in a data pipeline built with Spring Cloud Stream. Like most of the pre-packaged stream applications, we simply embed the function configuration into a Spring Boot application. Unlike the pre-packaged applications which generate identical applications configured for Kafka and Rabbit, we will roll our own to use the Kafka binder.

Here’s the main application class:

```
Copy@SpringBootApplication
@Import(CouchbaseConsumerConfiguration.class)
public class CouchbaseSinkApplication {
	public static void main(String... args) {
		new SpringApplication(CouchbaseSinkApplication.class).run(args);
	}
}
```

We also need to add some dependencies: The function, Spring Cloud Stream, and the Kafka binder.

```
Copy<dependency>
        <groupId>io.spring.example</groupId>
        <artifactId>couchbase-consumer</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-stream</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-stream-binder-kafka</artifactId>
    </dependency>
```

And, since we are rolling our own, we can set some required properties in `application.properties`. Since `couchbase-consumer` includes 2 candidate functions, we need to tell Spring Cloud Stream to use the `Consumer` wrapper. Also, we alias the default consumer input binding name `couchbaseConsumer-in-0` to `input` so the sink to work with Spring Cloud Data Flow.

```
Copyspring.cloud.function.definition=couchbaseConsumer
spring.cloud.stream.function.bindings.couchbaseConsumer-in-0=input
```

That’s literally it! At least we think so. How can we be sure? The kind of tests we need, not surprisingly, are similar to the function level tests. But we don’t really need to run every test case, since we already know how the function will behave within a boot application with various property settings. But we haven’t actually invoked the function via Spring Cloud Stream yet. Also, it doesn’t cost so much since we can reuse much of the test code we wrote for the function. So we only need a "smoke test" to run the happy path to make sure we didn’t leave out some required dependency, or that there are typos in our configuration properties, are that there are no gotchas now, or whenever we upgrade some dependency down the road. Here we configure a Couchbase TestContainer, as we did to test the function. But instead of invoking the function directly, we will let Spring Cloud Stream do it when we send a message to an input destination configured for the sink. For this test, we use the `TestChannelBinder`, an in-memory binder provided by the following dependency:

```
Copy<dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-stream</artifactId>
        <type>test-jar</type>
        <classifier>test-binder</classifier>
        <scope>test</scope>
</dependency>
```

We use `TestChannelBinderConfiguration.getCompleteConfiguration(CouchbaseSinkApplication.class)` to add the TestChannelBinder to our application context for our test. This gives us an `InputDestination` bean to send messages to the sink. As in the function test, we use the `Cluster` object to verify the data is present in Couchbase. Since the *upsert* operation is asynchronous, we need to poll the data store for some time until the data is there. The [awaitility](https://github.com/awaitility/awaitility) library is great for testing asynchronous systems. In this case, we’ll give it 10 seconds before we assume the operation has failed.

```
Copy@Testcontainers
public class CouchbaseSinkApplicationTests {
  @Container
  static CouchbaseContainer container =
          new CouchbaseContainer("couchbase/server:6.6.0")
             .withBucket(new BucketDefinition("test"));

  static Map<String, Object> connectProperties = new HashMap<>();

  @BeforeAll
  static void initialize() {
    connectProperties.put("spring.couchbase.connection-string", container.getConnectionString());
    connectProperties.put("spring.couchbase.username", container.getUsername());
    connectProperties.put("spring.couchbase.password", container.getPassword());
  }

  @Test
  void test() {
    try (ConfigurableApplicationContext context = new SpringApplicationBuilder(
      TestChannelBinderConfiguration
        .getCompleteConfiguration(CouchbaseSinkApplication.class))
	.web(WebApplicationType.NONE)
        .properties(connectProperties)
        .run("--couchbase.consumer.bucketExpression='test'",
               "--couchbase.consumer.keyExpression=payload.email")) {
        InputDestination inputDestination = context.getBean(InputDestination.class);
        Cluster cluster = context.getBean(Cluster.class);
        inputDestination.send(new GenericMessage<>(
           new User("Bart Simpson", "bart@simpsons.com")));

       await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
          User user = cluster.bucket("test")
                .defaultCollection().get("bart@simpsons.com")
                .contentAs(User.class);
         assertThat(user).isNotNull();
         assertThat(user.getName()).isEqualTo("Bart Simpson");
       });
     }
  }
}
```

### [](#integration-testing)[](#integration-testing)Integration Testing

At this point, we have good test coverage between the application and function tests. But we have not yet verified that the application binary that we want to build and deploy works in a true integration environment. Since the sink application uses the Kafka binder, the integration test environment requires a Kafka broker, a Couchbase cluster, and our deployed application. We can deploy and run the Spring Boot executable jar directly. More often these days, it is a container image.

Generally, it is not too risky to assume that the sink built as a container will work, but we at least want to make sure that we know how to configure the application to use an external Kafka broker and Couchbase cluster, and that we built our image correctly.

For the pre-built Spring Cloud Stream applications, we have further reason to test the built artifacts. The core applications do not provide any additional code. Instead, we use the [spring-cloud-dataflow-apps-generator-plugin](https://github.com/spring-cloud/spring-cloud-dataflow-apps-plugin/tree/master/spring-cloud-dataflow-apps-generator-plugin) to automatically generate identical applications that can run with either Kafka or RabbitMQ. The plugin requires Maven configuration which we manually add for each application. Just because our function works with the TestChannelBinder, we can’t be sure that the built artifact works until we run it. Misconfiguring the apps generator plugin, changes to the plugin itself, or the base image, or any dependencies, may break something. Testcontainers and Junit 5 give us a relatively straightforward way to integration test the pre-built applications with both Kafka and RabbitMQ. To help us write integration tests, we provide additional support in [stream-applications-test-suport](https://github.com/spring-cloud/stream-applications/tree/master/applications/stream-applications-core/stream-applications-test-support#stream-application-integration-testing). This library is available to the community by adding the dependency:

```
Copy<dependency>
    <groupId>org.springframework.cloud.stream.app</groupId>
    <artifactId>stream-applications-test-support</artifactId>
    <scope>test</scope>
</dependency>
```

The sample includes an integration test to test the built image, in this case built with the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/htmlsingle/#goals-build-image). Like the application test, we will just plug in Kafka, Couchbase, and our image, turn on the power, and make sure we don’t see or smell any smoke.

The complete integration test is:

```
Copy@KafkaStreamAppTest
@Tag("integration")
public class CouchbaseSinkIntegrationTests {

  static StreamAppContainer sink =
        new KafkaStreamAppContainer("couchbase-sink:0.0.1-SNAPSHOT");

  @Container
  static CouchbaseContainer container =
      new CouchbaseContainer("couchbase/server:6.6.0")
          .withNetwork(KafkaConfig.kafka.getNetwork())
          .withNetworkAliases("couchbase-server")
          .withBucket(new BucketDefinition("test"));

  static Cluster cluster;

  @Autowired
  TestTopicSender testTopicSender;

  @BeforeAll
  static void initialize() {
    await().until(() -> container.isRunning());
    String connectionString = "couchbase://couchbase-server";
    sink.waitingFor(Wait.forLogMessage(".*Started CouchbaseSink.*", 1))
          .withLogConsumer(appLog("couchbase-sink"))
          .withCommand(
            "--spring.couchbase.connection-string=couchbase://couchbase-server",
            "--spring.couchbase.username=" + container.getUsername(),
            "--spring.couchbase.password=" + container.getPassword(),
            "--couchbase.consumer.bucket-expression='test'",
            "--couchbase.consumer.key-expression=payload.email")
          .start();

    cluster = Cluster.connect(container.getConnectionString(),
    ClusterOptions.clusterOptions(container.getUsername(), container.getPassword()));
  }
  @AfterAll
  static void stop() {
    sink.stop();
  }

  @Test
  void test() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    testTopicSender.send(sink.getInputDestination(),
    objectMapper.writeValueAsString(
       new User("Bart Simpson", "bart@simpsons.com")));

    await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
       ExistsResult result = cluster.bucket("test")
         .defaultCollection().exists("bart@simpsons.com");
      assertThat(result.exists()).isTrue();
    });

    User user = objectMapper.readValue(
    cluster.bucket("test").defaultCollection().get("bart@simpsons.com")
   .contentAs(String.class), User.class);

    assertThat(user.getName()).isEqualTo("Bart Simpson");
  }
}
```

To unpack this, let’s start with the `@KafkaStreamAppTest` class annotation. This starts a Kafka test container, and configures Kafka components, using Spring for Apache Kafka, that we can use to produce and consume messages with Kafka. The Kafka container is started in a static initializer, which makes it a true singleton, allowing every test that runs in a JVM to use it. In addition to Spring configuration, the annotation includes `@TestContainers` as a meta annotation. For this test, we do not let Testcontainers manage the lifecycle of the `StreamAppContainer`, since we want to start it after we know the Couchbase cluster is running. The Couchbase container has some additional configuration. For convenience, it shares a virtual network with the `StreamAppContainer` (automatically configured to use the same network as the Kafka container). This allows the Stream App Container to connect to the Couchbase server using an alias of our choosing, `couchbase-server` (remember, `localhost` inside a container refers to its own IP address).

```
Copy@Container
static CouchbaseContainer container = new CouchbaseContainer("couchbase/server:6.6.0")
        .withNetwork(KafkaConfig.kafka.getNetwork())
        .withNetworkAliases("couchbase-server")
        .withBucket(new BucketDefinition("test"));
```

The StreamAppContainer is a [GenericContainer](https://www.testcontainers.org/features/creating_container/) with the required configuration to connect to Kafka and use the Kafka binder. The Spring Configuration also sets up a listener on a known topic to consume any output from the container. This is not used in this case, since we only have an input for the sink. The input destination is randomly generated and accessed via `getInputDestination()`.

```
Copystatic StreamAppContainer sink = new KafkaStreamAppContainer("couchbase-sink:0.0.1-SNAPSHOT");
...

@BeforeAll
static void initialize() {
    await().until(() -> container.isRunning());
    String connectionString = "couchbase://couchbase-server";
    sink.waitingFor(Wait.forLogMessage(".*Started CouchbaseSink.*", 1))
            .withLogConsumer(appLog("couchbase-sink"))
            .withCommand(
                    "--spring.couchbase.connection-string=couchbase://couchbase-server",
                    "--spring.couchbase.username=" + container.getUsername(),
                    "--spring.couchbase.password=" + container.getPassword(),
                    "--couchbase.consumer.bucket-expression='test'",
                    "--couchbase.consumer.key-expression=payload.email")
            .start();
```

Once the Couchbase container is running, we will start the sink. We wait for the standard Spring Boot start up message to confirm the sink has started. We also add a LogConsumer to output all the log messages in case there is an error. Note the connection string is simply using the Couchbase container’s network alias. This is possible because the sink and Couchbase are using the same virtual network. Here, we pass all properties on the command line, but we could just as well set them as environment variables, via `withEnvironment()`. Since we control the sink lifecycle, we need to stop it after all the tests are complete.

The test uses an autowired `TestTopicSender`. This is a middleware agnostic interface, backed by KafkaTemplate in this case. This interface is useful for run the same test cases for Kafka and Rabbit. Here, we could just as well autowire the `KafkaTemplate`. At the time of this writing, only the String serdes are configured for the Kafka template, so we use an `ObjectMapper` to work with Strings.

```
Copy@Test
  void test() throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    testTopicSender.send(sink.getInputDestination(),
    objectMapper.writeValueAsString(
       new User("Bart Simpson", "bart@simpsons.com")));

    await().atMost(Duration.ofSeconds(10)).untilAsserted(() -> {
       ExistsResult result = cluster.bucket("test")
         .defaultCollection().exists("bart@simpsons.com");
      assertThat(result.exists()).isTrue();
    });

    User user = objectMapper.readValue(
    cluster.bucket("test").defaultCollection().get("bart@simpsons.com")
   .contentAs(String.class), User.class);

    assertThat(user.getName()).isEqualTo("Bart Simpson");
  }
```

Since this tests requires the sink image, we use the Junit 5 `@Tag` annotation to mark it as an integration test. We also configured Maven to exclude this from the normal build, and only build the image and run it when the *integration* profile is set. The complete source code is [here](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/function-based-stream-app-samples/couchbase-stream-applications) and requires Java 8+ and Docker.

## [](#conclusion)[](#conclusion)Conclusion

In this post we explored strategies for testing Spring Cloud Stream applications that integrate with external services, such as Couchbase. The majority of the testing, described in Part 1, was done at the function level. The application and integration tests are really smoke tests to verify that we have everything built, configured and integrated correctly. We also showed how to use TestContainers for testing Stream Applications.

## [](#stay-tuned)[](#stay-tuned)Stay tuned…​

Thanks for coming! We hope you found this content helpful. We have a couple more posts until we conclude this series.