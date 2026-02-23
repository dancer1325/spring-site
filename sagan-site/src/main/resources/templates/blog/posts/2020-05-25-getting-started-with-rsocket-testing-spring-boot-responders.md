---
title: Getting Started With RSocket: Testing Spring Boot Responders
source: https://spring.io/blog/2020/05/25/getting-started-with-rsocket-testing-spring-boot-responders
scraped: 2026-02-23T13:59:39.208Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  May 25, 2020 | 3 Comments
---

# Getting Started With RSocket: Testing Spring Boot Responders

_Engineering | Ben Wilcock |  May 25, 2020 | 3 Comments_

**Reading time: about 6 minutes** **Coding time: about 15 minutes**

If you've been following this [series](https://spring.io/blog/2020/03/02/getting-started-with-rsocket-spring-boot-server), by now, you'll have built a Spring Boot prototype that illustrates many of the features present in [RSocket](https://rsocket.io). This code isn’t production code, though; it's a prototype, a stepping stone on your RSocket journey. For production code, I'd expect all the usual quality assurance and testing rules to apply. So in this exercise, I'll show you how to write integration tests for RSocket responders, so you can get one step closer to production.

But first, what do I mean by integration testing?

Integration testing, in this context, means testing the communication back and forth between RSocket requesters and responders. During such a test, it’s important to exercise every layer of the architecture, including the network.

But, integration testing can be more expensive than regular unit tests, precisely because you're exercising every layer. They can take longer to run, require multiple components and layers, and can be less predictable. However, [integration tests](https://martinfowler.com/articles/practical-test-pyramid.html#IntegrationTests) have other benefits, such as checking that your requesters and responders make contact with each other and communicate properly.

You’ll also notice that I’m skipping all other forms of testing in this tutorial. To cover every possible kind of test would need a whole book! If you're looking for a more general introduction to testing Spring Boot applications, try [this talk](https://www.youtube.com/watch?v=Wpz6b8ZEgcU) by Andy Wilkinson, or the [Spring Boot testing documentation](https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/reference/html/spring-boot-features.html#boot-features-testing), or search “testing spring applications” online.

That's enough background; let's start testing!

> If you need to see the code, you’ll find it on [GitHub](https://github.com/benwilcock/spring-rsocket-demo). If you want to catch up on the articles in the rest of the series, they’re all listed on [my page](https://spring.io/team/benwilcock) on the Spring website.

## [](#step-1-create-an-integration-test)Step 1: Create An Integration Test

In your `rsocket-server` project, in the `/src/test/java/io/pivotal/rsocketserver/` folder, create a new integration tests class called `RSocketClientToServerITest`. The simplest way to do this is often inside your IDE.

The suggested naming convention is to end each integration test classname with the suffix 'ITest.' The resulting filename `<your-class-name>ITest.java` is easier to read and allows Maven to filter your integration tests — a technique you'll use later. Be sure to annotate your new class with `@SpringBootTest` as follows:

```java
Copy@SpringBootTest
public class RSocketClientToServerITest {
  // test code goes here
}
```

The `@SpringBootTest` annotation allows Spring Boot to configure everything you need for your test, including RSocket. It saves a lot of time and a great deal of configuration.

## [](#step-2-open-your-rsocket-connection)Step 2: Open Your RSocket Connection

You can use a single RSocket connection for multiple tests by adding an `RSocketRequester` as a global class variable like so:

```java
Copyprivate static RSocketRequester requester;
```

Before your tests run, you must establish a working connection for this requester. The `@BeforeAll` annotation from [JUnit5](https://junit.org/junit5/docs/current/user-guide/#writing-tests-classes-and-methods) is ideal for performing these one-off setup tasks. Add the following method to your class:

```java
Copy    @BeforeAll
    public static void setupOnce(@Autowired RSocketRequester.Builder builder, @Value("${spring.rsocket.server.port}") Integer port) {
        requester = builder
                .connectTcp("localhost", port)
                .block();
    }
```

You'll notice that the method signature expects Spring Boot to pass a few items from the Spring application context. The `RSocketRequester.Builder` simplifies creating the RSocket connection, and the port number of the responder is required to establish a link. The port number comes from the `spring.rsocket.server.port` value in the `application.properties` file.

## [](#step-3-add-a-test)Step 3: Add A Test

Now the requester is in place; you're ready to add your first integration test. Two things happen during this test. First, a call from the requester to the responder, with a named route and data attached. And second, verification that the response received behaves exactly as expected. The code looks like this:

```java
Copy     @Test
     public void testRequestGetsResponse() {
         // Send a request message (1)
          Mono<Message> result = requester
                 .route("request-response")
                 .data(new Message("TEST", "Request"))
                 .retrieveMono(Message.class);
 
        // Verify that the response message contains the expected data (2)
        StepVerifier
                  .create(result)
                  .consumeNextWith(message -> { 
assertThat(message.getOrigin()).isEqualTo(RSocketController.SERVER); assertThat(message.getInteraction()).isEqualTo(RSocketController.RESPONSE);
assertThat(message.getIndex()).isEqualTo(0);})
                 .verifyComplete();
     }
```

In the first section (1), the route used is `"request-response"` and the data is a new `Message` object. The result coming from the responder — your RSocketController — is a `Mono` of type Message.

In the second section (2), the [StepVerifier](https://projectreactor.io/docs/core/release/reference/#_testing_a_scenario_with_stepverifier) class checks that the mono behaves as expected. In the `consumeWithNext()` method, a function checks the returning message's contents using [AssertJ's assertion methods](https://assertj.github.io/doc/#assertj-core-assertions-guide). The `verifyComplete()` method ensures that the interaction completes as expected.

Testing the other interactions is done in the same way. Rather than describe the testing of every interaction type here, take a look at the complete test on [GitHub](https://github.com/benwilcock/spring-rsocket-demo/blob/master/rsocket-server/src/test/java/io/pivotal/rsocketserver/RSocketClientToServerITest.java).

## [](#step-4-close-your-rsocket-connection)Step 4: Close Your RSocket Connection

Once the test cycle is complete, you can close any resources that are no longer required. In this case, that means disposing of the RSocket requester. Add a method to do this, and annotate that method with `@AfterAll` as follows:

```java
Copy      @AfterAll
      public static void tearDownOnce() {
          requester.rsocket().dispose();
      }
```

## [](#step-5-configure-failsafe)Step 5: Configure Failsafe

It can take a while to run integration tests, and they can fail for unexpected reasons, like when the network is down. So, it makes sense to isolate your integration tests so you can run them selectively. Maven uses the [Failsafe plugin](https://maven.apache.org/surefire/maven-failsafe-plugin/faq.html#surefire-v-failsafe) to achieve this.

To configure failsafe, in your `pom.xml`, add the plugin configuration below. This configuration tells Maven to use failsafe to run all the tests that end with the suffix 'ITest.java.' It also tells Maven to run these tests as part of the `integration-test` or `verify` lifecycle phases.

```xml
Copy<plugins>
<!-- other plugins -->
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-failsafe-plugin</artifactId>
        <version>2.22.0</version>
        <executions>
          <execution>
            <goals>
              <goal>integration-test</goal>
              <goal>verify</goal>
            </goals>
          </execution>
        </executions>
        <configuration>
          <includes>**/*ITest.java</includes>
        </configuration>
      </plugin>
```

You'll also want to prevent the integration tests from running alongside your regular unit tests, so add the following surefire configuration to exclude them:

```xml
Copy      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <configuration>
          <excludes>
            <exclude>**/*ITest.java</exclude>
          </excludes>
        </configuration>
      </plugin>
<!-- other plugins -->
</plugins>
```

## [](#step-6-run-your-test)Step 6: Run Your Test

You can now run your integration test in the terminal console. Maven uses the `integration-test` goal for this purpose.

```bash
Copy./mvnw clean integration-test
```

Maven now runs your integration tests, and the results appear in the console.

```bash
Copy[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 23.582 s - in io.pivotal.rsocketserver.RSocketClientToServerITest
2020-05-19 10:43:27.512 INFO 39250 --- [extShutdownHook] i.p.rsocketserver.RSocketController : Detaching all remaining clients...
2020-05-19 10:43:27.513 INFO 39250 --- [extShutdownHook] i.p.rsocketserver.RSocketController : Shutting down.
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 5, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
```

## [](#theres-more)There's More!

You can also integration test your client-side responders. The code required is slightly more complicated than the code above. Mostly, this involves creating a fake requester component that contains similar `StepVerifier` tests to the ones you've seen here. Rather than describe the code line by line, I'd encourage you to take a look at the [source code](https://github.com/benwilcock/spring-rsocket-demo/blob/master/rsocket-client/src/test/java/io/pivotal/rsocketclient/RSocketServerToClientITest.java) instead.

## [](#final-thoughts)Final Thoughts

Integration testing is a critical component on the path to production. By testing your RSocket responders in this way, you can prevent regressions, check components are communicating properly, and hand them over to your customers with greater confidence.