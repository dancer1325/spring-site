---
title: Empowering your apps with Spring Boot\'s property support
source: https://spring.io/blog/2013/10/30/empowering-your-apps-with-spring-boot-s-property-support
scraped: 2026-02-24T07:54:40.360Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  October 30, 2013 | 13 Comments
---

# Empowering your apps with Spring Boot's property support

_Engineering | Greg L. Turnquist |  October 30, 2013 | 13 Comments_

[Spring Boot](https://github.com/spring-projects/spring-boot) is continuing to gather steam. Last month I wrote [Contributing to Spring Boot with a pull request](http://spring.io/blog/2013/09/20/contributing-to-spring-boot-with-a-pull-request). I peeled back the layers of Spring Boot to demonstrate it's incredible autoconfiguration features and CLI support.

In this post, I want to dig into Spring Boot's amazing support for properties. Properties are something that are small, not highly visible, yet can quickly strengthen your application in very practical ways. In this post, I'll walk through [how I added property support](https://github.com/spring-projects/spring-boot/pull/57) to the Spring JMS support I coded in the previous blog post.

## [](#what-are-properties)What are properties?

Properties are essentially ways to externalize application settings. You might bake in a particular bit of information in your application, but for multiple reasons, you want to change it later.

-   Your default configuration is production-based (hostnames, ports, etc.), but you need to override it with different hostnames in your test bed.
-   You configure the application to use pooling but want to adjust the pool sizes.
-   You need a "super secret" key supplied to your application, perhaps an [OAuth](https://spring.io/understanding/oauth) key, and you do NOT want to put a default one in your released application.

All of these use cases are begging for different means to supply customized settings when the application is launched. Spring Boot to the rescue!

## [](#spring-jms-and-properties)Spring JMS and properties

Enough with abstract use cases. Let's look at a real example of how Spring Boot has property support! We'll dig deeper into the [Spring JMS support](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/jms/JmsTemplateAutoConfiguration.java).

```java
Copy@Configuration
@ConditionalOnClass({ JmsTemplate.class, ConnectionFactory.class })
@EnableConfigurationProperties(JmsTemplateProperties.class)
public class JmsTemplateAutoConfiguration {

	@Autowired
	private JmsTemplateProperties config;
	. . .
	@ConfigurationProperties(name = "spring.jms")
	public static class JmsTemplateProperties {

		private boolean pubSubDomain = true;

		public boolean isPubSubDomain() {
			return this.pubSubDomain;
		}

		public void setPubSubDomain(boolean pubSubDomain) {
			this.pubSubDomain = pubSubDomain;
		}

	}
	. . .
```

This fragment of code from Spring Boot's `JmsTemplatAutoConfiguration` shows a couple of key components.

-   @EnableConfigurationProperties leverages JmsTemplateProperties as a source of properties and makes them available to the entire class.
-   @ConfigurationProperties(name = "spring.jms") flags the JmsTemplateProperties class that it will be a holder of properties. With "spring.jms" acting as a prefix, every attribute of that class becomes a target property.

All I have to do is create an **application.properties** file and assign it values.

```
Copyspring.jms.pubSubDomain=true
```

Further down in the same file, there are also properties for the built-in connection factory.

```java
Copy	@Configuration
	@ConditionalOnClass(ActiveMQConnectionFactory.class)
	@ConditionalOnMissingBean(ConnectionFactory.class)
	@EnableConfigurationProperties(ActiveMQConnectionFactoryProperties.class)
	protected static class ActiveMQConnectionFactoryCreator {

		@Autowired
		private ActiveMQConnectionFactoryProperties config;

		@Bean
		ConnectionFactory jmsConnectionFactory() {
			if (this.config.isPooled()) {
				PooledConnectionFactory pool = new PooledConnectionFactory();
				pool.setConnectionFactory(new ActiveMQConnectionFactory(this.config
						.getBrokerURL()));
				return pool;
			}
			else {
				return new ActiveMQConnectionFactory(this.config.getBrokerURL());
			}
		}

	}

	@ConfigurationProperties(name = "spring.activemq")
	public static class ActiveMQConnectionFactoryProperties {

		private String brokerURL = "tcp://localhost:61616";

		private boolean inMemory = true;

		private boolean pooled = false;

		// Will override brokerURL if inMemory is set to true
		public String getBrokerURL() {
			if (this.inMemory) {
				return "vm://localhost";
			}
			else {
				return this.brokerURL;
			}
		}
    . . .
```

By default, Spring Boot will create an ActiveMQ connection factory unless you supply [your own](http://blog.gopivotal.com/products/messaging-with-jms-and-rabbitmq).

-   `ActiveMQConnectionFactoryCreator` has been flagged with `@EnableConfigurationProperties`.
-   We can override **brokerURL**, **inMemory**, and **pooled**.

In `ActiveMQConnectionFactoryCreator`, if **pooled** is set, it creates a **PooledConnectionFactory**. If **inMemory** is set, it uses *vm://localhost*. But flipping it to false will cause the connection factory to switch over to using the brokerURL.

So far, these attributes have been accessed via their respective getters. But that isn't the only way. Spring comes with a powerful `@Value` annotation to inject data from multiple sources including properties.

So that's the bulk of what I did to [contribute Spring JMS property support](https://github.com/spring-projects/spring-boot/pull/57) to Spring Boot.

Let's look at more ways to use Spring Boot's property support.

## [](#super-secret-github-oauth-data)Super secret GitHub oauth data

I've been working on a small application to quickly list out all the open issues agains the various [Getting Started guides](http://spring.io/guides). It uses [Spring Social GitHub](http://projects.spring.io/spring-social-github/) to query for issues. To get the data I need, it's powerful `GitHubTemplate` needs an oauth key.

```groovy
Copy@Controller
@Log
class IssueAggregator implements CommandLineRunner {

	/**
	 * This needs to be supplied by application.properties, a file NOT to be put under source control
	 */
	@Value('${token}')
	String githubToken
	
	@Bean
	GitHubTemplate githubTemplate() {
		new GitHubTemplate(githubToken)
	}
	. . .
```

As you can guess, `githubToken` is populated by `@Value('${token}')`. If you look closely, you'll notice there is no default value. That's because I won't supply one. Anyone that needs a copy of this application will have to supply their own secret oauth key, as stated in the comments.

> **Note:** This is Groovy code, but the same annotations work with Java (you just need double quotes). Spring Boot is simply making is super easy to leverage Spring Framework's property support.

## [](#overriding-properties-with-more-properties)Overriding properties with more properties

That is not all. I can embed an application.properties file in my JAR that I distribute, supplying default settings.

But if I need to override anything, all I have to do is create *another* application.properties file and stage it adjacent to the JAR file. Spring Boot will first read the internal application.properties file and then automatically find the external one.

Finally, it will also read properties supplied using Java's `-Dspring.activemq.inMemory=false` command line directives. This provides a third way to override things.

P.S. For my Windows brethren, Spring Boot includes extra special support by mapping things like `SPRING_ACTIVEMQ_INMEMORY`, `spring-activemq-inmemory`, and `springActivemqInmemory` to the same target: **spring.activemq.inMemory**. This helps deal with platform-specific issues like environment variables not supporting periods.

## [](#summary)Summary

Hopefully you are groking Spring Boot's amazing ability to make our apps flexible and configurable through property settings. It's a tool that may be small in scope but just makes sense.

Happy coding!