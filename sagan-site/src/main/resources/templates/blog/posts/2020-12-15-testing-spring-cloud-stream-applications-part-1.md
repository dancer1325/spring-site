---
title: Testing Spring Cloud Stream Applications - Part 1
source: https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-1
scraped: 2026-02-23T13:37:05.698Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  December 15, 2020 | 1 Comment
---

# Testing Spring Cloud Stream Applications - Part 1

_Engineering | David Turanski |  December 15, 2020 | 1 Comment_

This post is part of a blog series that explores the newly redesigned Spring Cloud Stream applications based on Java Functions. This episode, presented in two parts, explores strategies for testing functions used to implement stream applications. We will pay special attention to functions that integrate with external resources, which presents additional testing challenges. Such is the case with most of the [pre-packaged source and sink applications](https://github.com/spring-cloud/stream-applications/tree/master/applications). To illustrate this, we will walk through a sample [couchbase-sink](https://github.com/spring-cloud/spring-cloud-stream-samples/tree/master/function-based-stream-app-samples/couchbase-stream-applications) application. Here in Part 1, we will focus on the core function on which the sink is based. In [Part 2](https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-2), we will look at writing tests for for the application.

Here are all the previous entries in this blog series.

-   [Introducing Function Based Streaming Applications](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)
    
-   [Function Composition with Streaming Applications](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)
    
-   [How to Build a Supplier and Source Application](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)
    
-   [How to Build a Consumer and Sink Application](https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications)
    
-   [Build and Run a Simple Stream Application](https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink)
    
-   [Case Study: HTTP Request Function and Processor](https://spring.io/blog/2020/08/17/case-study-http-request-function-and-processor)
    
-   [Case Study: File Source and MongoDB Sink](https://spring.io/blog/2020/08/25/case-study-reading-from-a-file-and-writing-to-mongodb)
    
-   [Case Study: Relational Database Source and File Sink](https://spring.io/blog/2020/09/10/case-study-relational-database-source-and-file-sink)
    
-   [Case Study: Remote File Ingest with Spring Cloud Data Flow](https://spring.io/blog/2020/09/29/case-study-remote-file-ingest-with-spring-cloud-data-flow)
    
-   [Case Study: Aggregator Function and Processor](https://spring.io/blog/2020/10/26/case-study-aggregator-function-and-processor)
    
-   [Case Study: Change Data Capture (CDC) Analysis with CDC Debezium source and Analytics sink in Real-Time](https://spring.io/blog/2020/12/14/case-study-change-data-capture-cdc-analysis-with-cdc-debezium-source-and-analytics-sink-in-real-time)
    

## [](#testing-considerations)[](#testing-considerations)Testing Considerations

### [](#functions-and-applications)[](#functions-and-applications)Functions and Applications

For function-based stream applications, the core functionality is exposed as a function. The core functions for the pre-built [Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream) applications are packaged as separate components to allow them to be used by any application, independent of Spring Cloud Stream. Spring Cloud Stream natively supports Java functions and will bind to any bean that implements one of the core `java.util.function` types: `Consumer`, `Supplier`, or `Function`. Viewed as a separate component, the function need not depend on Spring or anything else. If you register any function as a bean in any application that includes a Spring Cloud Stream binder as a dependency, Spring Cloud Stream will bind it to a configured message destination.

In a data pipeline, a stream of data originates from a Source and flows into a Sink, with zero or more processing steps in between. In practice, the Source acts as a Supplier of data from some external resource, such as a data store, any service supporting a standard protocol, or a message broker. The Sink acts as a consumer of data for some other external resource. Since Spring provides first class support for most commonly used external resources, it should come as no suprise that most of the pre-packaged sources and sinks rely on some combination of Spring Integration, Spring Data, and Spring Boot. Additionally, they are designed to be configured for many environments, domains and use cases, via `@ConfigurationProperties`. Although these functions themselves are not Spring Boot Applications, they must be imported into a Spring Boot application to run.

Since all the core functionality is implemented by the function, we want to focus most of our testing efforts at this level. To ensure that our function behaves correctly under all expected success and error conditions, we need to write tests to cover these scenarios. These tests need to create an auto-configured application context and provision or mock required external resource.

If the function is configurable via `@ConfigurationProperties`, then we can treat each properties combination as a different test case. Some properties are required, and some are optional. Since using the function requires the end user to provide these properties, expected scenarios include both valid and invalid configurations, such as required properties missing, invalid values, or an invalid combination (mutually exclusive properties).

### [](#unit-vs-integration-tests)[](#unit-vs-integration-tests)Unit vs Integration Tests

There are no widely accepted definitions that will help us here. Especially with sources and sinks, in which the core functionality *is* integration, it’s hard to know where to draw the line between unit and integration tests. On one hand, a Java function is a *unit*, in that it is a single interface. However, if its sole purpose is to integrate with a remote system, it is difficult, if not impossible, to test in isolation. However, I think we can agree on some general characteristics:

Unit tests:

-   Run automatically as part of a build in any developer or CI environment without any external configuration
    
-   Are reasonably fast
    
-   Are written by the developer and run frequently
    

Integration tests:

-   Run automatically in an integration environment
    
-   Require the component under test, along with external dependencies to be deployed
    
-   May be slow
    
-   Are run less often
    

Given this definition of unit tests, Part 1 is about unit testing functions.

## [](#test-containers)[](#test-containers)Test Containers

[Testcontainers](https://www.testcontainers.org/) is a recent and popular Java library that lets you programmatically spin up and throw away any external resource that can run in a Docker container. It includes dozens of out-of-the-box modules for commonly used resources. You can also use the library to create custom containers programmatically, from Dockerfiles, or docker-compose yaml. While intended primarily for integration tests, it is extremely useful for writing unit tests when mocking takes considerably more effort. Of course we have to sacrifice some speed and relax the "no external dependencies" rule to allow for a Docker daemon installed and running on the host. Since many development and CI environments today are already required to use and build images, this is a reasonable assumption.

## [](#example)[](#example)Example

### [](#couchbase-consumer-function)[](#couchbase-consumer-function)Couchbase Consumer Function

To illustrate, we will write a Couchbase consumer function to add some data to a Couchbase key-value store using the *upsert* operation.

For efficiency, we will implement the function using the Couchbase Java client’s reactive API. This API returns a publisher of [MutationResult](https://docs.couchbase.com/sdk-api/couchbase-java-client/com/couchbase/client/java/kv/MutationResult.html), so our core interface is `Function<Flux<Message<?>>, Flux<MutationResult>>`. This function will be configured with Spring, and can be embedded into any Spring Boot Application. To support a `couchbase-sink`, we will wrap the function in a `Consumer<Flux<Message<?>>>`.

The `upsert` operation inserts or updates data in a [Bucket](https://docs.couchbase.com/server/current/learn/buckets-memory-and-storage/buckets.html), which is the primary data store abstraction for Couchbase. In our case, a `ReactiveBucket`. A bucket is specified by name and must exist in the Couchbase cluster beforehand. Starting with v6.5, Couchbase supports [Collections](https://docs.couchbase.com/server/current/developer-preview/collections/collections-overview.html). So the bucket may be partitioned into many collections, but this is an optional feature that must be enabled in the cluster. The `upsert` method targets a named collection, or the *defaultCollection*.

We pass the key and value to our function in a Spring Message, consisting of a payload and headers. The payload can be any object, and the headers are essentially a Map. To make this function generic, we can use a [SpEL expression](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#expressions) to specify the key. The key expression is evaluated against the Message, and may reference fields or methods in the payload, or a header. The value is the payload. The function also requires the user to specify a bucket and collection name. To maximize flexibility, let’s double down on SpEL and make everything an expression. Now, if we want, the function can extract all its input values from the message at runtime to upsert any data in any collection in any bucket. In the simplest case, the bucket and collection can be defined statically.

So the function needs some configuration properties:

```
Copy@ConfigurationProperties("couchbase.consumer")
@Validated
public class CouchbaseConsumerProperties {
    private static final String DEFAULT_VALUE_EXPRESSION = "payload";
    private final SpelExpressionParser parser = new SpelExpressionParser();

   /**
    * A SpEL expression to specify the bucket.
    */
    private Expression bucketExpression;

   /**
      * A SpEL expression to specify the key.
     */
    private Expression keyExpression;

  /**
    * A SpEL expression to specify the collection.
    */
    private Expression collectionExpression;

  /**
    * A SpEL expression to specify the value (default is payload).
    */
    private Expression valueExpression =
                parser.parseExpression(DEFAULT_VALUE_EXPRESSION);
    ...
```

Tip

To statically confiugure some of these values, use a literal expression, enclosing the value in single quotes, e.g. `couchbase.consumer.bucketExpression='mybucket'`. Normally, you would extract the key and value from the message contents.

We configure the reactive Function and corresponding Consumer with Spring:

```
Copy@Configuration
@EnableConfigurationProperties(CouchbaseConsumerProperties.class)
public class CouchbaseConsumerConfiguration {

    private static Logger logger =
            LoggerFactory.getLogger(CouchbaseConsumerConfiguration.class);

    @Bean
    public Consumer<Flux<Message<?>>> couchbaseConsumer(Function<Flux<Message<?>>,
                Flux<MutationResult>> couchbaseConsumerFunction) {
        return message -> couchbaseConsumerFunction.apply(message)
               .subscribe(mutationResult -> logger.debug("Processed " + message));
    }

    @Bean
    public Function<Flux<Message<?>>, Flux<MutationResult>> couchbaseConsumerFunction(
          Cluster cluster, CouchbaseConsumerProperties consumerProperties) {
        return flux -> flux.flatMap(message -> {
            logger.debug("Processing message " + message);
             String bucketName = bucket(message,
                          consumerProperties.getBucketExpression());
            String key = key(message, consumerProperties.getKeyExpression());
            ReactiveBucket bucket = cluster.bucket(bucketName).reactive();
             ReactiveCollection collection = collection(message,
                            consumerProperties.getCollectionExpression())
				  .map(name -> bucket.collection(name))
                                  .orElse(bucket.defaultCollection());
            return collection.upsert(key,
                              value(message, consumerProperties.getValueExpression()));
        });
    }

    private String bucket(Message<?> message, Expression expression) {
        return expression.getValue(message, String.class);
    }

    private String key(Message<?> message, Expression expression) {
        return expression.getValue(message, String.class);
    }

    private Object value(Message<?> message, Expression expression) {
        return expression.getValue(message);
    }

    private Optional<String> collection(Message<?> message,
                                             @Nullable Expression expression) {
        return expression == null ? Optional.empty() :
                Optional.of(expression.getValue(message, String.class));
    }
}
```

These two classes are all we need to implement the function. The required dependencies are:

```
Copy<dependency>
    <groupId>com.couchbase.client</groupId>
    <artifactId>java-client</artifactId>
</dependency>
<!-- Enable configuration properties metadata to be added to the jar -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
<!-- This provides a Spring Converter to convert Strings to Expression, required for CouchbaseConsumerProperties as implemented -->
<dependency>
    <groupId>org.springframework.cloud.fn</groupId>
    <artifactId>config-common</artifactId>
</dependency>
```

As mentioned earlier, this is not a Spring Boot application, but a component that must be embedded in a Spring Boot application to run. Spring Boot binds the `@ConfigurationPropeties` and also provides [CouchbaseAutoConfiguration](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/couchbase/CouchbaseAutoConfiguration.html).

Note

This example does not use [spring-data-couchbase](https://spring.io/projects/spring-data-couchbase) since it is intended for using Spring Data Repositories and automatically mapping specific domain objects. Since our function is intended to handle any payload type, we use boot to autoconfigure the Cluster along with the Couchbase Java SDK.

So how did we end up with a function that actually works? The sample code above is the result of test driven development, refined over several iterations. Since the function depends on the Couchbase SDK `Cluster` object which does all the work, we need to create a Cluster instance before we can do anything. The Cluster needs to connect to a Couchbase server. If we happen to have a Couchbase cluster already running on our network, with a bucket we can use for testing, then we might use that initially. But even if we assume Couchbase is accessable from our development and CI environment, what happens if we can’t connect to Couchbase for some reason - the cluster is down, credentials expired, permissions changed, or some other reason? Do we want to let that break our CI/CD pipeline or stop our progress?

Fortunately, we can use the Testcontainers [couchbase module](https://www.testcontainers.org/modules/databases/couchbase/) to spin up our own Couchbase environment.

Note

Full disclosure: I also tried [CouchbaseMock](https://github.com/couchbase/CouchbaseMock) but it appears to be incompatible with the current [couchbase Java client](https://github.com/couchbase/couchbase-java-client).

The required test libraries for Junit 5, are:

```
Copy<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>couchbase</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.testcontainers</groupId>
    <artifactId>junit-jupiter</artifactId>
    <scope>test</scope>
</dependency>
```

To use Testcontainers in our Junit 5 test class, we start with a Couchbase container configured with a bucket named `test`.

```
Copy@Testcontainers
public class CouchbaseConsumerTests {

	@Container
	static CouchbaseContainer container = new CouchbaseContainer("couchbase/server:6.6.0")
			.withBucket(new BucketDefinition("test"));
```

The `@Testcontainers` annotation enables lifecycle management for fields annotated with `@Container`. Here, we declare the `CouchbaseContainer` as `static`, so TestContainers will start the container once before the tests run and remove it after. This is a good thing, since it takes several seconds to start the container.

Note

Also take a look at [Playtika Testcontainers for Spring Boot](https://github.com/Playtika/testcontainers-spring-boot). This is an interesting project that abstracts "embedded" services using Spring Boot to autoconfigure a Testcontainer. This requires your preferred version of `org.springframework.cloud:spring-cloud-starter`. If you are using a Spring Cloud version compatible with Spring Boot 2.4+ you will need to set `"spring.cloud.bootstrap.enabled=true"`. The sample does not use this library because Spring beans cannot be declared `static`, so we would have to start a new container instance for each test. Anyway, Testcontainers is really easy to use.

As mentioned above, different property configurations represent different test cases. Spring Boot binds properties from its properties sources when the application starts up. So we need to create a new application context for each combination of properties we want to test. We see a few different strategies used in the [stream-applications](https://github.com/spring-cloud/stream-applications) repository:

-   Create an abstract `@SpringBootTest` to configure a `@SpringBootApplication` test context and shared configuration properties. Create a sub class, annotated with `@TestPropertySource` for each test case, as shown [here](https://github.com/spring-cloud/stream-applications/tree/master/functions/consumer/s3-consumer/src/test/java/org/springframework/cloud/fn/consumer/s3).
    
-   Use [ApplicationContextRunner](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/test/context/runner/ApplicationContextRunner.html) to create a new `ApplicationContext` for each test case, as shown [here](https://github.com/spring-cloud/stream-applications/blob/master/functions/supplier/sftp-supplier/src/test/java/org/springframework/cloud/fn/supplier/sftp/SftpSupplierApplicationTests.java).
    
-   Use [SpringApplicationBuilder](https://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/builder/SpringApplicationBuilder.html) to create a new `ApplicationContext` for each test case, as shown [here](https://github.com/spring-cloud/stream-applications/blob/master/functions/function/task-launch-request-function/src/test/java/org/springframework/cloud/fn/task/launch/request/TaskLaunchRequestFunctionApplicationTests.java).
    

Which one you use depends largely on personal choice. The tests for the sample function use the `ApplicationContextRunner`, pre-configured with the required boot Couchbase connection properties provided by the test container. A nice feature of Testcontainers is that it exposes standard ports as expected, mapping each exposed port to a random available port. The Couchbase testContainer includes `getConnectionString()` which is specific to Couchbase. Generally, you can use `container.getMappedPort(int originalPort)` as required.

Tip

Using random TCP ports is essential for automated tests since 1) You do not know what ports may be in use for a given environment 2) Build tools typically run tests in parallel. This frequently results in errors due to an unavailable port when statically defined.

```
Copy@Testcontainers
public class CouchbaseConsumerTests {

    @Container
    static CouchbaseContainer container =
            new CouchbaseContainer("couchbase/server:6.6.0")
                   .withBucket(new BucketDefinition("test"));

	private ApplicationContextRunner applicationContextRunner;

    @BeforeEach
    void setup() {
        applicationContextRunner = new ApplicationContextRunner()
            .withUserConfiguration(TestConfig.class)
            .withPropertyValues(
                 "spring.couchbase.connection-string=" +
                                                container.getConnectionString(),
                 "spring.couchbase.username=" + container.getUsername(),
                 "spring.couchbase.password=" + container.getPassword());
    }
```

We use `TestConfig.class` to start an application context, which we provide as an inner class:

```
Copy@SpringBootApplication
static class TestConfig {
    @Autowired
    Cluster cluster;

   @PreDestroy
    public void destroy() {
        cluster.disconnect();
    }
}
```

In many cases, this can be an empty class annotated with `@SpringBootApplication` to trigger properties binding, and any required auto configuration - `CouchbaseAutoConfiguration` in this case. Here, we disconnect from the cluster to prevent a superfluous stack trace when the context closes.

For these tests, we will create a simple `User` type with a name and an email address which we can use for the key:

```
Copy@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
	private String name;

	private String email;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User() {
	}

	public User(String name, String email) {
		this.name = name;
		this.email = email;
	}
    ...
```

Now we are ready to test our function. Since the function is reactive, we will use the `StepVerifier` from the `reactor-test` library to verify the contents of the returned Flux. We begin with the simplest happy path scenario: *upsert* a single User providing the minimum required configuration: The bucket name and the key expression. We will construct a `Message` with a `User` payload. To store the user into the `test` bucket’s default collection, using the user’s email as the key, we just need to provide the bucket name as a literal and set the key expression to `payload.email`. These properties need to use the `couchbase.consumer` prefix configured in `CouchbaseConsumerProperties`. At least, that’s the intended behavior. We can’t be sure that all this works until we can verify that ,after calling the function, the data is present in the data store. We use the Couchbase API directly to retrieve the data and assert that the contents are what we expect.

```
Copy@Test
void singleUpsert() {
   applicationContextRunner.withPropertyValues(
           "couchbase.consumer.bucketExpression='test'",
            "couchbase.consumer.keyExpression=payload.email")
      .run(context -> {
           CouchbaseConsumerProperties properties =
                    context.getBean(CouchbaseConsumerProperties.class);
           String bucketName = properties.getBucketExpression().getValue(String.class);
           Cluster cluster = context.getBean(Cluster.class);
           Function<Flux<Message<?>>, Flux<MutationResult>>
                 couchbaseConsumerFunction =
                       context.getBean("couchbaseConsumerFunction", Function.class);
           StepVerifier.create(couchbaseConsumerFunction.apply(
               Flux.just(new GenericMessage<>(new User("David", "david@david.com")))))
            .expectNextMatches(mutationResult ->
                   mutationResult.mutationToken().get().bucketName().equals(bucketName))
            .verifyComplete();

        User saved = cluster.bucket(bucketName).defaultCollection()
                                   .get("david@david.com").contentAs(User.class);
       assertThat(saved.getName()).isEqualTo("David");
  });
}
```

With the function implemented as previously shown, we are ecstatic to see green when we run the test in our IDE. In reality, we need a test like this to write the function in the first place. That is why we put significant thought and effort into this simple test. We also want to test applying multiple objects, and setting a custom expression for the value, and bucket. We may want to also check the Java validation annotations in our properties class.

```
Copy@NotNull(message = "'keyExpression' is required")
public Expression getKeyExpression() {
    return keyExpression;
}
```

I forget, does the annotation go on the getter or the setter?, do we really need the `@Validated` class annotation? Let’s find out. If we forget to set `couchbase.consumer.keyExpression`, we should get an exception message `'keyExpression is required'` somewhere in the stack trace. If not, then we did something wrong. Fortunately, `spring-boot-starter-test` gives us everything we need for testing, including [Assertj](https://assertj.github.io/doc/AssertJ), a fluent DSL for assertions, Mockito, and Junit 5.

```
Copy@Test
void keyExpressionRequired() {
  assertThatExceptionOfType(RuntimeException.class).isThrownBy(
   () -> applicationContextRunner.withPropertyValues(
      "couchbase.consumer.bucket-expression='test'").run(context -> context.start()))
    .havingRootCause()
    .withMessageContaining("'keyExpression' is required");
}
```

By the time we are done, we will write more than twice the LOC needed to implement the function, and probably spend more than twice the time. But the effort is well worth it since it gives us proof that the function behaves as expected in common scenarios, and protection against introducing regressions when refactoring or adding new functionality. The complete tests are [here](https://github.com/spring-cloud/spring-cloud-stream-samples/blob/master/function-based-stream-app-samples/couchbase-stream-applications/couchbase-consumer/src/test/java/io/spring/example/couchbase/consumer/CouchbaseConsumerTests.java). I’m happy to say that my IDE reports over 90% coverage.

## [](#conclusion)[](#conclusion)Conclusion

This concludes Part 1 of the testing topic. In this post we explored strategies for testing functions that integrate with external resources, such as Couchbase. We also showed how useful the TestContainers library is for testing components of distributed systems, especially when using mocks, stubs, or embedded servers is impractical. [Part 2](https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-2) will cover unit and integration testing of function based stream applications.

## [](#stay-tuned)[](#stay-tuned)Stay tuned…​

Thanks for coming! We hope you found this content helpful. We have a couple more posts until we conclude this series.