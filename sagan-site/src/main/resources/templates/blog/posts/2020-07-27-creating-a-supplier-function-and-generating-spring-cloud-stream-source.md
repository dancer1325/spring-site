---
title: Creating a Supplier Function and generating Spring Cloud Stream Source
source: https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source
scraped: 2026-02-23T13:37:39.834Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  July 27, 2020 | 1 Comment
---

# Creating a Supplier Function and generating Spring Cloud Stream Source

_Engineering | Soby Chacko |  July 27, 2020 | 1 Comment_

This is part 3 of the blog series in which we are introducing java functions for Spring Cloud Stream applications.

Other parts in the series.

[Part 1 - General Introduction](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)

[Part 2 - Function Composition](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)

In the last two blogs in this series, we provided a [general introduction](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0) to this new initiative of migrating all the existing [Spring Cloud Stream App Starters](https://github.com/spring-cloud-stream-app-starters) to functions and the various ways in which we can [compose them](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1). In this blog, we continue the series, showing how these functions are developed, tested, and used to generate Spring Cloud Stream applications. In particular, here we are focusing on how to write a supplier function (implementing `java.util.function.Supplier`) and then generate the corresponding source application for Spring Cloud Stream.

## [](#writing-a-new-supplier)[](#writing-a-new-supplier)Writing a new supplier

In order to drive the concept home, we are going to take a use case and implement a solution to satisfy it.

### [](#use-case)[](#use-case)Use case

We need a function, when invoked with the right configuration that gives us the contents of a blog feed in the format of atom, rss, etc. We need to support two supplier invocation models - one in which we invoke the function programmatically (for example, a REST endpoint that is invoked in a FaaS environment) and the other is a streaming supplier in which we get a constant flow of feeds as soon as they become available. We want to build these suppliers based on the [ROME library](https://rometools.github.io/rome/index.html) , a popular library for feed aggregation. We will look at this from the perspective of both Non Spring Developers and Spring Developers.

### [](#non-spring-developers)[](#non-spring-developers)Non Spring Developers

Let us assume for a second that you are not a Spring developer and not familiar with Spring Integration which already provides abstractions for ROME. In that case, we can certainly use ROME directly to produce feed records. For example, this is a valid Supplier for this scenario.

```
Copypublic Supplier<SyndEntry> feedSupplier()
{
	return () -> {
		//Use the ROME framework directly to produce syndicated entries.
	}
}
```

The benefit here is that we can develop the supplier without any knowledge of Spring, and it can be deployed to a serverless environment directly, using the abstractions provided by that environment or by relying on a framework like Spring Cloud Function.

This essentially means that if you are a Java developer without much Spring Framework skills, you can still write the functions using just the interfaces defined in the `java.util.function` package such as `Function`, `Supplier` and `Consumer`, by providing the business logic. Then we can take this artifact that we developed and transform it into a Spring Cloud Stream application by adding a Spring Cloud Stream binder dependency and making it into a `SpringBootApplication`. By providing a few configuration properties like the middleware destinations, we get the immediate value add of deploying the application on a platform like [Spring Cloud Data Flow](https://spring.io/projects/spring-cloud-dataflow) which orchestrates the application as part of a data pipeline. This way, we write the functions completely independent of any Spring dependencies and only bring Spring components like Spring Cloud Stream, Spring Cloud Function and Spring Cloud Data Flow etc. toward the end of the deployment journey. The following diagram captures this idea.

![Stream Applications Layered Architecture for Functions](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/stream-applications-dataflow-faas.png?raw=true)

As we can observe, the function components can be invoked standalone or as part of the Spring Cloud Data Flow pipeline after making it a Spring Cloud Stream application.

### [](#spring-developers)[](#spring-developers)Spring Developers

While the above model is probably a good starting point, as we start diving into directly using the ROME framework, we might quickly realize that it involves a lot of heavy lifting and deeper library knowledge. Chances of making mistakes are high, so we need to write a lot of tests to verify that our custom implementation works as expected, and that all the corner cases are covered. We start to wonder if there is already some simpler abstraction available. That way we don’t need to write any ROME specific code as the abstraction layer takes care of all the intricacies. Luckily we have a solution. [Spring Integration](https://spring.io/projects/spring-integration) provides a lot of inbound and outbound adapters for many enterprise technologies. The [feed adapter](https://docs.spring.io/spring-integration/reference/html/feed.html) is one of them and the implementation is based on ROME. As a matter of fact, many of the function components that we provide in pre-packaged [stream-applications](https://github.com/spring-cloud/stream-applications), are based on Spring Integration adapters. These adapters have been widely used and heavily battle tested for a vast number of enterprise use cases. However, there is a chance that the technology for which we want to write a supplier is not available in Spring Integration. In that case, as we have seen above, we can certainly write the code on our own and invoke it from the supplier.

### [](#using-the-spring-integration-feed-adapter-in-the-supplier)[](#using-the-spring-integration-feed-adapter-in-the-supplier)Using the Spring Integration Feed adapter in the supplier

If you haven’t done so, fork and clone the [stream applications repo](https://github.com/spring-cloud/stream-applications). Then create a new `feed-supplier` module under `functions/supplier`. Use one of the existing suppliers as a template to guide.

Add the following Spring Integration Feed adapter dependency in the project. This brings the feed adapter from Spring Integration as well as any other transitive dependencies.

```
Copy<dependency>
   <groupId>org.springframework.integration</groupId>
   <artifactId>spring-integration-feed</artifactId>
</dependency>
```

### [](#adding-basic-configuration-properties)[](#adding-basic-configuration-properties)Adding basic configuration properties

Now that we have our core dependency in, let’s start writing some code. Since the functions are expected to be used in a Spring Boot context, we need to create a `ConfigurationProperties` class to drive the configuration for the supplier function. Here is what it might look like.

```
Copypackage org.springframework.cloud.fn.supplier.feed;

@ConfigurationProperties("feed.supplier")
public class FeedSupplierProperties {

/**
* Key used in metadata store to avoid duplicate read from the feed
*/
private String metadataKey;

/**
* Feed url.
*/
private URL feedUrl;

// rest is omitted
}
```

As we can see, we use the prefix of `feed.supplier` on all the properties.

### [](#adding-the-configuration-class)[](#adding-the-configuration-class)Adding the Configuration class

Next, let’s create a Spring based configuration class where we provide all the necessary components. We will build it incrementally. Below is the basic structure of the class.

```
Copypackage org.springframework.cloud.fn.supplier.feed;
...
@Configuration
@EnableConfigurationProperties(FeedSupplierProperties.class)
public class FeedSupplierConfiguration {

}
```

Add these fields to the class.

```
Copyprivate final ConcurrentMetadataStore metadataStore;

private final Resource resource;

private final FeedSupplierProperties feedSuppplierProperties;
```

Quick note on these fields. Feed adapter in Spring Integration provides a capability for not reading the same entries that we read from a feed already. The `metadataKey` property we defined above is used for this purpose. The way it does is by using a metadata store. There are [various metadata stores available](https://docs.spring.io/spring-integration/docs/current/reference/html/system-management.html#metadata-store) for popular databases. Include the following dependency for an in-memory simple metadata store.

```
Copy<dependency>
   <groupId>org.springframework.cloud.fn</groupId>
   <artifactId>metadata-store-common</artifactId>
   <version>${project.version}</version>
</dependency>
```

Note that this requirement is specific to this supplier and not all suppliers may need it.

Users can provide a `Resource` bean for reading the feed if there is no HTTP (or HTTPS) based url available (which we can set through the configuration property).

Let’s add a constructor to use these fields.

```
CopyFeedSupplierConfiguration(FeedSupplierProperties feedSupplierProperties,
                   ConcurrentMetadataStore metadataStore,
                   @Nullable Resource resource) {
  this.feedSuppplierProperties = feedSupplierProperties;
  this.metadataStore = metadataStore;
  this.resource = resource;
}
```

`Resource` is nullable because most often we can simply pass the URL string as a configuration property and not provide a `Resource` bean.

The Spring Integration Feed adapter provides [FeedEntryMessageSource](https://github.com/spring-projects/spring-integration/blob/master/spring-integration-feed/src/main/java/org/springframework/integration/feed/inbound/FeedEntryMessageSource.java) which is a `MessageSource` implementation. We will use this message source in our supplier. Let’s set it up as a Spring Bean.The code below is pretty self explanatory.

```
Copy@Bean
public FeedEntryMessageSource feedEntryMessageSource() {
  final FeedEntryMessageSource feedEntryMessageSource = this.resource == null ? new FeedEntryMessageSource(this.feedSuppplierProperties.getFeedUrl(),
        this.feedSuppplierProperties.getMetadataKey()) :
       ...
  return feedEntryMessageSource;
}
```

### [](#non-reactive-supplier)[](#non-reactive-supplier)Non Reactive Supplier

Now that we have the MessageSource bean ready, it is relatively trivial to write a simple Supplier and invoke it programmatically by calling the `get` method of the supplier. Here it is.

```
Copy@Bean
public Supplier<Message<SyndEntry>> feedSupplier() {
  return () -> feedEntryMessageSource().receive();
}
```

We can inject this Supplier bean into our application and call the `get` method programmatically. When this `Supplier` is used in a Spring Cloud Stream application (as we will see later), it will use a [default poller](https://github.com/spring-cloud/spring-cloud-stream/blob/3.1.x/spring-cloud-stream/src/main/java/org/springframework/cloud/stream/config/DefaultPollerProperties.java) provided by Spring Cloud Stream that will trigger the supplier every second by default. This schedule can be changed in the poller.

### [](#reactive-supplier)[](#reactive-supplier)Reactive Supplier

The non reactive polling solution looks alright, but we might ask, how about if I don’t want to poll explicitly every so often, but I want the data as soon as it is available in the message source in a streaming manner? Well, we have a solution for that - develop a reactive supplier that delivers the data received as soon as it becomes available. Let’s see the details.

Here again, Spring Integration provides some abstractions we can use to convert our `FeedEntryMessageSource` into a reactive publisher as shown below.

```
Copy@Bean
public Supplier<Flux<Message<SyndEntry>>> feedSupplier() {
  return () -> IntegrationReactiveUtils.messageSourceToFlux(feedEntryMessageSource());
}
```

You may notice that this supplier returns a `Flux<Message<SyndEntry>>` as opposed to `Message<SyndEntry>` as shown in the initial non-reactive supplier in which we were relying on programmatic invocation of the supplier or some other polling mechanism.

### [](#other-reactive-solutions)[](#other-reactive-solutions)Other Reactive Solutions

Ok, it was nice that we had a `MessageSource` coming from Spring Integration and we could use that utility method for converting it to a `Flux`. What if there was no such `MessageSource` and we had to hand craft the basic retrieval of the data for the systems for which we want to write a reactive style supplier? For those cases, we can use the various facilities provided by [Project Reactor](https://projectreactor.io/docs/core/release/reference/#processors) and then programmatically feed the data to them. The bottom line is that, when we write a reactive streaming supplier, we have to return the data as a `Flux`.

### [](#unit-testing-the-reactive-supplier)[](#unit-testing-the-reactive-supplier)Unit Testing the Reactive Supplier

Let’s add a unit test for this reactive supplier. We can use the atom feed example described in [RFC 4287 - The Atom Syndication Format](https://tools.ietf.org/html/rfc4287) as our test data. Include it in `src/test/resources`.

Here is the test class.

```
Copy@SpringBootTest(properties = {"feed.supplier.feedUrl=classpath:atom.xml",
     "feed.supplier.metadataKey=feedTest" })
@DirtiesContext
public class FeedSupplierTests {

  @Autowired
  Supplier<Flux<Message<SyndEntry>>> feedSupplier;

  @Test
  public void testFromSampleRssFile() {
     final Flux<Message<SyndEntry>> messageFlux = feedSupplier.get();

     StepVerifier.create(messageFlux)
           .assertNext((message) -> {
              assertThat(message.getPayload().getTitle().trim()).isEqualTo("Atom draft-07 snapshot");
              assertThat(message.getPayload().getContents().size()).isEqualTo(1);
              assertThat(message.getPayload().getContents().get(0).getValue().contains("The Atom draft is finished.")).isTrue();
           })
           .thenCancel()
           .verify();
  }

  @SpringBootApplication
  static class FeedSupplierTestApplication {

  }

}
```

### [](#adding-the-supplier-function-to-the-maven-bom-for-functions)[](#adding-the-supplier-function-to-the-maven-bom-for-functions)Adding the Supplier function to the maven BOM for functions

The functions project aggregates all the available functions in a [maven BOM](https://github.com/spring-cloud/stream-applications/blob/master/functions/function-dependencies/pom.xml). Add the `feed-supplier` to this BOM. This is primarily needed, if you are generating the Spring Cloud Stream application based on this function.

## [](#generating-spring-cloud-stream-applications-from-the-supplier)[](#generating-spring-cloud-stream-applications-from-the-supplier)Generating Spring Cloud Stream Applications from the Supplier

At this point in the process, we can submit a pull request to the repository with our supplier, but if we want to generate Spring Cloud Stream binder based applications from the supplier, keep on reading. Once generated, these applications can be run standalone or as part of a data orchestration pipeline in [Spring Cloud Data Flow](https://spring.io/projects/spring-cloud-dataflow).

Go ahead and create a new module called `feed-source` under `applications/source`. As we have mentioned in the previous blogs, `java.util.function.Supplier` is mapped as a Spring Cloud Stream Source.

We don’t need to add any custom code on top of our feed supplier as it can be used as it is. However, now that we are talking about Spring Cloud Stream application, we need to use the [test binder](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/3.0.6.RELEASE/reference/html/spring-cloud-stream.html#_testing) with the supplier function to see how the supplier works with Spring Cloud Stream.

We can use one of the [existing sources](https://github.com/spring-cloud/stream-applications/tree/master/applications/source) as a template to guide us through the process. We can even copy one of them and make changes incrementally.

All the apps use the parent pom [stream-applications-core](https://github.com/spring-cloud/stream-applications/tree/master/applications/stream-applications-core) which brings all the necessary test dependencies, like the test binder mentioned above. It also provides the infrastructure for the application generator plugin that is responsible for generating the binder based applications.

One point that we would like to emphasize is that unless the application module contains custom code, this module simply becomes an application generator that generates the binder based applications. In other words, we won’t add a class with `@SpringBootApplication` to it, rather it is generated for us.

### [](#testing-the-supplier-with-the-test-binder)[](#testing-the-supplier-with-the-test-binder)Testing the supplier with the test binder

Add the following dependency for testing with test binder:

```
Copy<dependencies>
   <dependency>
       <groupId>org.springframework.cloud.fn</groupId>
       <artifactId>feed-supplier</artifactId>
       <scope>test</scope>
   </dependency>
</dependencies>
```

Now we can add a test to verify that the `feed-supplier` works with the test binder in Spring Cloud Stream. Basically, we need to ensure that the supplier produces the data through the test binder and it is delivered to the destination on the test binder.

Here is the general idea behind the test:

```
Copypublic class FeedSourceTests {

  @Test
  public void testFileSource() throws Exception {
     try (ConfigurableApplicationContext context = new SpringApplicationBuilder(
           TestChannelBinderConfiguration
                 .getCompleteConfiguration(FeedSourceTestApplication.class))
           .web(WebApplicationType.NONE)
           .run("--spring.cloud.function.definition=feedSupplier", "--feed.supplier.feedUrl=classpath:atom.xml", "--feed.supplier.metadataKey=feedTest")) {

        OutputDestination target = context.getBean(OutputDestination.class);
        Message<byte[]> sourceMessage = target.receive(10000);
        Object title = JsonPath.parse(new String(sourceMessage.getPayload())).read("$.title");
        assertThat(title).isEqualTo("Atom draft-07 snapshot");
     }
  }

  @SpringBootApplication
  @Import(FeedSupplierConfiguration.class)
  public static class FeedSourceTestApplication {

  }
}
```

The test is largely similar to the unit test we added for the supplier, but with a big difference. In the supplier, we were directly invoking it and verifying the data produced. Here, we are not invoking the supplier directly, but the binding mechanism in Spring Cloud Stream does that for us automatically. We are receiving the data from the outbound destination and then verify that.

Once the test passes, it is time for us to generate the applications.

### [](#generating-the-binder-based-applications)[](#generating-the-binder-based-applications)Generating the binder based applications

By default, the plugin generates applications for both Kafka and Rabbit binders in Spring Cloud Stream. This is configured in the parent pom in `stream-applications-core`. If we have a need to customize the generation for different binders, we need to make those changes there. Below is the configuration for the application generator plugin.

```
Copy<plugin>
   <groupId>org.springframework.cloud.stream.app.plugin</groupId>
   <artifactId>spring-cloud-stream-app-maven-plugin</artifactId>
   <configuration>
       <generatedApp>
           <name>feed</name>
           <type>source</type>
           <version>${project.version}</version>
           <configClass>org.springframework.cloud.fn.supplier.feed.FeedSupplierConfiguration.class</configClass>
       </generatedApp>
       <dependencies>
           <dependency>
               <groupId>org.springframework.cloud.fn</groupId>
               <artifactId>feed-supplier</artifactId>
           </dependency>
           <dependency>
               <groupId>org.springframework.cloud.stream.app</groupId>
               <artifactId>stream-applications-composite-function-support</artifactId>
               <version>${stream-apps-core.version}</version>
           </dependency>
       </dependencies>
   </configuration>
</plugin>
```

Let’s quickly go over some details here. We are requesting the plugin to create an application with the name `feed-source` and want it to use our `Supplier` developed above as the main configuration class. Within the dependencies section for the plugin, we also need to add any dependencies that the app needs, `feed-supplier` in this case. We need to add all our processor functions in all the generated source applications. This is because we can compose the source with other processors without requiring them to run as individual microservices as we have seen in the [previous blog](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1). More details on function composition with the processors can be found [here](https://github.com/spring-cloud/stream-applications/blob/master/docs/FunctionComposition.adoc) as well. This is why we are adding the dependency, `stream-applications-composite-function-support` in the dependencies section in the plugin.

Build the application module and we will see the binder based apps in the `apps` folder. They will be named as `feed-source-kafka` and `feed-source-rabbit`. We can go to either of those applications and build it and then use it as a standalone application or as part of a pipeline on Spring Cloud Data Flow.

## [](#conclusion)[](#conclusion)Conclusion.

In this blog post, we saw the entire process of of developing, testing and contributing a combination of supplier/Spring Cloud Stream application. Please follow the procedures laid out here for writing your own suppliers and sources. If you have done so, please consider contributing them back to the repository.

### [](#stay-tuned)[](#stay-tuned)Stay tuned…​

This blog is the third in a series that will cover many related topics. Look for more deep dives and focused topics in the coming weeks. In the next blog in this series, similar to what we did in this post about writing a new Supplier and Source, we will write a Consumer function and then generate a Sink application from it.