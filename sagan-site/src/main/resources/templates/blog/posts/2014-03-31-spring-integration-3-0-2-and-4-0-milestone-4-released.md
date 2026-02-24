---
title: Spring Integration 3.0.2 and 4.0 Milestone 4 Released
source: https://spring.io/blog/2014/03/31/spring-integration-3-0-2-and-4-0-milestone-4-released
scraped: 2026-02-24T07:25:58.650Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 31, 2014 | 5 Comments
---

# Spring Integration 3.0.2 and 4.0 Milestone 4 Released

_Releases | Artem Bilan |  March 31, 2014 | 5 Comments_

We are pleased to announce the final milestone release towards Spring Integration 4.0 and the next maintenance release for the 3.0.x stream. The 3.0.2.RELEASE contains a small number of important fixes for the [3.0 release](https://spring.io/blog/2013/12/16/spring-integration-3-0-release-is-now-available). Spring Integration 3.0 users are encouraged to upgrade to this release as soon as possible. Please see the [3.0.2 release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14362) and [project page](http://projects.spring.io/spring-integration) for more information.

Spring Integration 4.0 is the next generation of the framework, which is now based on the new [Spring Framework 4.0 Messaging Module](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/new-in-4.0.html#_websocket_sockjs_and_stomp_messaging). See the [Migration Guide](https://github.com/spring-projects/spring-integration/wiki/Spring-Integration-3.0-to-4.0-Migration-Guide) for information about migrating applications from Spring Integration 3.0 to 4.0.

Another main goal of the Spring Integration 4.0 release is the addition of improved Java and annotation configuration capabilities to the framework; let's shed light on some of them...

**@EnableIntegration**

Spring Integration provides a number of environment and built-in beans to support the runtime [Enterprise Integration Patterns](http://www.enterpriseintegrationpatterns.com/) and Messaging infrastructure. With XML configuration, they are automatically declared as necessary by `NamespaceHandler`s. In a pure Java-only configuration, there is no namespace handler and another mechanism is required to set up the Integration environment. The `@EnableIntegration` annotation has been added for this purpose. It is similar to `@EnableWebMvc` from `spring-webmvc` or `@Enable*Repositories` annotations from Spring Data and should be placed alongside a `@Configuration` annotation on at least one class.

Note, It's only necessary to have one `@EnableIntegration` annotation in the `ApplicationContext`. With the annotation in place, you can start to configure integration flows from Spring `@Configuration` classes:

```java
Copy@Configuration
@EnableIntegration
public static class MyConfiguration {

    @Bean
    public MessageChannel fileWritingChannel() {
         return new DirectChannel();
    }

    @Bean
    public FileWritingMessageHandler fileWritingMessageHandler() {
        return new FileWritingMessageHandler(this.outputDir);
    }

   @Bean
    public ConsumerEndpointFactoryBean fileWritingEndpoint() {
        ConsumerEndpointFactoryBean endpoint = new ConsumerEndpointFactoryBean();
        endpoint.setHandler(this.fileWritingMessageHandler());
        endpoint.setInputChannel(this.fileWritingChannel());
        return endpoint;
    }

}
```

Of course, with component scanning, the existing Spring Integration configuration annotations (`@MessageEndpoint`, `@ServiceActivator`, `@Router`, `@Filter` etc.) can be used to define the flow. See the [Spring Boot](http://projects.spring.io/spring-boot/) application later in this post for an example.

**@MessagingGateway**

Another useful and important Messaging component is the `Messaging Gateway`. With XML we use the `<int:gateway/>` component to provide an implementation of an interface as a Gateway to the Messaging flow. With Spring Integration 4.0 you can avoid XML configuration by using the new `@MessagingGateway` annotation that has been introduced. This annotation provides the same attributes as the `<int:gateway/>` element and is placed on gateway's service interface:

```java
Copy@MessagingGateway(defaultRequestChannel = "gatewayChannel",
     defaultHeaders = @GatewayHeader(name = "foo", value = "FOO"))
public interface MyGateway {

	@Gateway(headers = @GatewayHeader(name = "calledMethod",
                                      expression = "#gatewayMethod.name"))
	String echo(String payload);

}
```

**Important**: since this component isn't visible to the Spring container automatically and the default `@ComponentScan` doesn't work with interfaces, another new annotation `@IntegrationComponentScan` has been introduced. This annotation is similar to `@Enable*Repositories` from Spring Data and provides options to configure a `basePackages` property to scan integration components and should be placed alongside with `@Configuration`.

**Spring Boot @EnableAutoConfiguration**

Utilizing the [`SpringFactoriesLoader`](http://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/io/support/SpringFactoriesLoader.html) mechanism, the Spring Integration infrastructure is also available via the Spring Boot `@EnableAutoConfiguration` annotation. Simply add Spring Integration 4.0 to the classpath and use the Spring Boot Auto Configuration features.

Here's a very simple [Spring Boot](http://projects.spring.io/spring-boot/) application:

```java
Copy@EnableAutoConfiguration  // enables integration infrastructure
@IntegrationComponentScan // looks for gateways
@ComponentScan			  // looks for Spring Beans
public class Integration {

	public static void main(String[] args) throws Exception {
		ConfigurableApplicationContext ctx = SpringApplication.run(Integration.class, args);
		String reply = ctx.getBean(GW.class).sendAndReceive("foo");
		System.out.println(reply);
		ctx.close();
	}

	@MessagingGateway(defaultRequestChannel="in")
	public interface GW {

		String sendAndReceive(String payload);
	}

	@MessageEndpoint
	public static class MyService {

		@ServiceActivator(inputChannel="in")
		public String foo(String payload) {
			return payload.toUpperCase();
		}
	}

}
```

**Other changes**

In addition, other useful and convenient components for Java and Annotation configuration have been introduced: `@EnableMessageHistory`, `@EnablePublisher`, `@EnableIntegrationMBeanExport`, `@GlobalChannelInterceptor`, `@IntegrationConverter` etc. For information about new features and changes see the [What's New](http://docs.spring.io/spring-integration/docs/4.0.0.M4/reference/html/whats-new.html) and [release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14361) of the Spring Integration 4.0 Milestone 4.

For a complete list of changes in Spring Integration 4.0 refer to the release notes for each milestone:

-   [M2 release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14287)
-   [M3 release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14313)
-   [M4 release notes](https://jira.spring.io/secure/ReleaseNote.jspa?projectId=10121&version=14361)

(the first milestone was simply refactoring the 3.0 code to use `spring-messaging` classes).

The 4.0.0.M4 release is available in the Spring milestone repository now.

We look forward to receiving your comments and feedback: [Spring Forum](http://forum.spring.io/forum/spring-projects/integration), [StackOverflow](http://stackoverflow.com)(`spring-integration` tag), [Spring JIRA](https://jira.spring.io/browse/INT)!

**Teaser**

[Spring Integration Java DSL](https://github.com/spring-projects/spring-integration-extensions/tree/master/spring-integration-java-dsl) coming soon!