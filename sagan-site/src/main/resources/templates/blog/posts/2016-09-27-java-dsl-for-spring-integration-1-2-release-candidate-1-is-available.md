---
title: Java DSL for Spring Integration 1.2 Release Candidate 1 is available
source: https://spring.io/blog/2016/09/27/java-dsl-for-spring-integration-1-2-release-candidate-1-is-available
scraped: 2026-02-23T19:01:18.452Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  September 27, 2016 | 0 Comments
---

# Java DSL for Spring Integration 1.2 Release Candidate 1 is available

_Releases | Artem Bilan |  September 27, 2016 | 0 Comments_

Dear Spring Community,

I’m pleased to announce that the Java DSL for Spring Integration `1.2 RC1` is available now.

Since the previous [Milestone 2](https://spring.io/blog/2016/09/15/java-dsl-for-spring-integration-1-2-milestone-2-is-available) we had a good deep feedback for our new features and some API has been broken to reflect real requirements.

As usual, big thanks to everyone who created issues, raised Pull Requests, provided feedback or just asked questions on StackOverflow.

The artifact `org.springframework.integration:spring-integration-java-dsl:1.2.0.RC1` is available in the [Milestone repo](http://repo.spring.io/milestone). So, give it a shot for last chance to raise a [GH issue](https://github.com/spring-projects/spring-integration-java-dsl/issues) for any feedback!

Now about the changes in the `1.2 RC1`:

# [](#poller-errorchannel)[](#poller-code-errorchannel-code)Poller `errorChannel`

We can now specify `errorChannel` on the Poller definition. Previously we had to configure entire, separate `MessagePublishingErrorHandler`:

```
Copye -> e.poller(Pollers.fixedDelay(100)
     .errorChannel(filePollingErrorChannel())
```

Instead of:

```
Copy@Bean
public ErrorHandler filePollingErrorHandler() {
    MessagePublishingErrorHandler errorHandler =
                               new MessagePublishingErrorHandler();
    errorHandler.setDefaultErrorChannel(filePollingErrorChannel());
    return errorHandler;
}
...
e -> e.poller(Pollers.fixedDelay(100)
    .errorHandler(filePollingErrorHandler())
```

After introduction [late-binding](https://jira.spring.io/browse/INT-4113) support for the `MessagePublishingErrorHandler` in Spring Integration Core, that will be even easier just with the bean name for the `MessageChannel`.

# [](#filesplitter-improvements)[](#filesplitter-improvements)FileSplitter improvements

`Files.splitter()` spec now provides more options to configure underlying `FileSplitter`:

```
Copy.split(Files.splitter()
    .markers(false)
    .applySequence(true)
    .charset("UTF-8"))
```

# [](#integrationflowregistration)[](#integrationflowregistration)IntegrationFlowRegistration

The manual flow registration process has undergone some improvements:

-   an `IntegrationFlowRegistrationBuilder` is returned from the `IntegrationFlowContext.registration(IntegrationFlow)` for providing more options during registration `IntegrationFlow` bean and all dependent components;
    
-   an `IntegrationFlowRegistration` is a result of `IntegrationFlowRegistrationBuilder.register()` call. This object provides some useful `IntegrationFlow` properties and lets to control the lifecycle of `IntegrationFlow` associated with it;
    
-   you can now add additional beans to register, required by the provided `IntegrationFlow`. For example `DefaultFtpSessionFactory` is required by the `Ftp.outboundAdapter()`. They are destroyed and removed from `ApplicationContext` together with the `IntegrationFlow` they are associated.
    
    this.integrationFlowContext.registration(myFlow) .id("myFlow") .autoStartup(false) .addBean(new Foo()) .addBean("bar", new Bar()) .register();
    

See [Gary Russell](https://spring.io/team/grussell)'s amazing [Sample](https://github.com/spring-projects/spring-integration-samples/tree/master/advanced/dynamic-tcp-client) about dynamic TCP Clients for more information.

# [](#apache-kafka-support)[](#apache-kafka-support)Apache Kafka support

We decided to drop Apache Kafka `0.8.x` support (Spring Integration for Apache Kafka `1.3.x`) in favor of Apache Kafka `0.9.x` and `0.10.x`. The recently introduced `Kafka09` has been deleted and its content has been moved to the `Kafka` factory. And now the dependency on the matter is Spring Integration for Apache Kafka `2.1.x`, based on the Spring for Apache Kafka `1.1.x` to provide Apache Kafka `0.10.x`. Meanwhile the same `Kafka` DSL factory and dependent components can be used with the previous Spring Integration for Apache Kafka `2.0.x` version on classpath.

Apache Kafka `0.8.x` support can be achieved through the direct Spring Integration for Apache Kafka `1.3.x` adapters usage. Or you can simply copy/paste `org.springframework.integration.dsl.kafka` [package](https://github.com/spring-projects/spring-integration-java-dsl/tree/1.1.x/src/main/java/org/springframework/integration/dsl/kafka) from Java DSL `1.1` to your project and continue to get a gain from fluent builder API of `Kafka` factory!

# [](#next-steps)[](#next-steps)Next Steps

We expect to have General Availability for version `1.2` in about a week. After that `spring-integration-java-dsl` will definitely move to the [Spring Integration Core](http://projects.spring.io/spring-integration/) `5.0` and Java 8 code base. The current `1.2` version will be still supported, but just for bug fixes.

[Project Page](https://github.com/spring-projects/spring-integration-java-dsl) | [Documentation](https://github.com/spring-projects/spring-integration-java-dsl/wiki/Spring-Integration-Java-DSL-Reference) | [Issues](https://github.com/spring-projects/spring-integration-java-dsl/issues) | [Help](http://stackoverflow.com/questions/tagged/spring-integration)