---
title: Contributing to Spring Boot with a pull request
source: https://spring.io/blog/2013/09/20/contributing-to-spring-boot-with-a-pull-request
scraped: 2026-02-24T07:57:45.996Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  September 20, 2013 | 0 Comments
---

# Contributing to Spring Boot with a pull request

_Engineering | Greg L. Turnquist |  September 20, 2013 | 0 Comments_

In case you missed this year's SpringOne 2GX conference, one of the hot keynote items was the announcement of [Spring Boot](https://github.com/spring-projects/spring-boot). Dave Syer showed how to rapidly create a Spring MVC app with code that would fit inside a [single tweet](https://twitter.com/rob_winch/status/364871658483351552). In this blog entry, I will peel back the covers of Spring Boot and show you how it works by putting together a [pull request](https://github.com/spring-projects/spring-boot/pull/49).

## [](#autoconfiguration)Autoconfiguration

Spring Boot has a powerful autoconfiguration feature. When it detects certain things on the classpath, it automatically creates beans. But one feature it doesn't yet have is support for Spring JMS. I need that feature!

The first step is to code an autoconfiguration class:

```java
Copypackage org.springframework.boot.autoconfigure.jms;

. . .some import statements. . .

@Configuration
@ConditionalOnClass(JmsTemplate.class)
public class JmsTemplateAutoConfiguration {

	@Configuration
	@ConditionalOnMissingBean(JmsTemplate.class)
	protected static class JmsTemplateCreator {

		@Autowired
		ConnectionFactory connectionFactory;

		@Bean
		public JmsTemplate jmsTemplate() {
			JmsTemplate jmsTemplate = new JmsTemplate(connectionFactory);
			jmsTemplate.setPubSubDomain(true);
			return jmsTemplate;
		}

	}

	@Configuration
	@ConditionalOnClass(ActiveMQConnectionFactory.class)
	@ConditionalOnMissingBean(ConnectionFactory.class)
	protected static class ActiveMQConnectionFactoryCreator {
		@Bean
		ConnectionFactory connectionFactory() {
			return new ActiveMQConnectionFactory("vm://localhost");
		}
	}

}
```

My Spring JMS autoconfiguration class is flagged with Spring's `@Configuration` annotation, marking it as a source of Spring beans to be picked up and put into the [application context](http://spring.io/understanding/application-context). It leverages Spring 4's `@Conditional` annotations, limiting it to only add this set of beans if `JmsTemplate` is on the classpath. This is a telltale sign that **spring-jms** is on the classpath. Perfect!

My new class has two inner classes, also tagged for Spring Java Configuration and with additional conditions. This makes it easy to consolidate all my configuration needs to automate Spring JMS configuration.

-   `JmsTemplateCreator` creates a `JmsTemplate`. It only works if there isn't already a `JmsTemplate` defined elsewhere. This is how Spring Boot can have an opinion on how to create a `JmsTemplate`, but will quickly back off if you supply your own.
-   `ActiveMQConnectionFactoryCreator` creates an `ActiveMQConnectionFactory`, but only if it detects ActiveMQ on the classpath and if there is no other `ConnectionFactory` defined amongst all the Spring beans. This factory is necessary to create a `JmsTemplate`. It it set up for in-memory mode, meaning you don't even need to install a stand alone broker to begin using JMS. But you can easily substitute your own `ConnectionFactory`, and either way, Spring Boot will autowire it into the `JmsTemplate`.

All this autoconfiguration will be for naught if I don't properly register my new `JmsTemplateAutoConfiguration`. I do that by adding the FQDN to Spring Boot's **spring.factories** file.

```sh
Copy. . .
org.springframework.boot.autoconfigure.jms.JmsTemplateAutoConfiguration,\
. . .
```

Of course no pull request is complete without some automated unit tests. I won't put all the tests I wrote in this blog entry, but you can inspect [the tests I submitted with my pull request](https://github.com/gregturn/spring-boot/blob/cd37323badcec1e0e74a6e09826b80bf0b221058/spring-boot-autoconfigure/src/test/java/org/springframework/boot/autoconfigure/jms/JmsTemplateAutoConfigurationTests.java). Just be ready to write your own battery of tests before submitting a pull request!

And that's all there is to adding autoconfiguration to Spring Boot! It's not that complex. In fact, you can [take a tour of the existing autoconfiguration classes](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure) for more examples.

## [](#spring-boots-groovy-support)Spring Boot's Groovy support

One of the biggest features of Spring Boot that drew a lot of attention was its strong support for Groovy. This drew much applause during the keynote and was eaten up during Dave and Phil's talk the next day. In case you missed it, here is the Spring Boot REST service Dave Syer demonstrated:

```groovy
Copy@RestController
class ThisWillActuallyRun {
    @RequestMapping("/")
    String home() {
        "Hello World!"
    }
}
```

After putting that code inside **app.groovy**, Dave launched it by typing:

```sh
Copy$ spring run app.groovy
```

Spring Boot's [command line tool](https://github.com/spring-projects/spring-boot#spring-boot-cli) uses an embedded Groovy compiler and looks at all the symbols (like `RestController`). Then it automatically adds `@Grab` and import statements. It essentially expands the previous fragment into this:

```groovy
Copy@Grab("org.springframework.boot:spring-boot-starter-web:0.5.0.BUILD-SNAPSHOT")

import org.springframework.web.bind.annotation.*
import org.springframework.web.servlet.config.annotation.*
import org.springframework.web.servlet.*
import org.springframework.web.servlet.handler.*
import org.springframework.http.*
static import org.springframework.boot.cli.template.GroovyTemplate.template
import org.springframework.boot.cli.compiler.autoconfigure.WebConfiguration

@RestController
class ThisWillActuallyRun {
    @RequestMapping("/")
    String home() {
        "Hello World!"
    }
    
	public static void main(String[] args) {
		SpringApplication.run(ThisWillActuallyRun, args)
	}
}
```

## [](#adding-your-own-groovy-integration)Adding your own Groovy integration

To add Spring JMS support, I need to add similar autoconfiguration to Boot's CLI so that whenever someone uses either a `JmsTemplate`, a `DefaultMessageListenerContainer`, or a `SimpleMessageListenerContainer`, it will add the right bits.

Before writing that code, I first wrote a simple Groovy script that uses the Spring JMS stuff in **jms.groovy**:

```groovy
Copypackage org.test

@Grab("org.apache.activemq:activemq-all:5.2.0")

import java.util.concurrent.CountDownLatch

@Configuration
@Log
class JmsExample implements CommandLineRunner {

	private CountDownLatch latch = new CountDownLatch(1)

	@Autowired
	JmsTemplate jmsTemplate

	@Bean
	DefaultMessageListenerContainer jmsListener(ConnectionFactory connectionFactory) {
		new DefaultMessageListenerContainer([
			connectionFactory: connectionFactory,
			destinationName: "spring-boot",
			pubSubDomain: true,
			messageListener: new MessageListenerAdapter(new Receiver(latch:latch)) {{
				defaultListenerMethod = "receive"
			}}
		])
	}

	void run(String... args) {	
		def messageCreator = { session ->
			session.createObjectMessage("Greetings from Spring Boot via ActiveMQ")
		} as MessageCreator
		log.info "Sending JMS message..."
		jmsTemplate.send("spring-boot", messageCreator)
		latch.await()
	}

}

@Log
class Receiver {
	CountDownLatch latch

    def receive(String message) {
        log.info "Received ${message}"
        latch.countDown()
    }
}
```

This test script expects a `JmsTemplate` as well as a `ConnectionFactory` to be supplied automatically by Spring Boot. Notice that there are no import statements nor any @Grab's aside from pulling in **activemq-all**. It uses Spring Boot's `CommandLineRunner` interface to launch the `run()` method, which in turn sends a message through `JmsTemplate`. Then it uses the `CountDownLatch` to wait for a signal from the consumer.

On the other end is a `DefaultMessageListener` that upon receipt of the message, counts down. To invoke my script from inside Spring Boot's test suite, I added the following test method to `SampleIntegrationTests` to invoke **jms.groovy**:

```java
Copy	@Test
	public void jmsSample() throws Exception {
		start("samples/jms.groovy");
		String output = this.outputCapture.getOutputAndRelease();
		assertTrue("Wrong output: " + output,
				output.contains("Received Greetings from Spring Boot via ActiveMQ"));
		FileUtil.forceDelete(new File("activemq-data")); // cleanup ActiveMQ cruft
	}
```

To test my new patch, I found it much easier to run a specific test. This definitely sped things up.

```sh
Copy$ mvn clean -Dtest=SampleIntegrationTests#jmsSample test
```

> **Note:** I had to run `mvn -DskipTests install` first to have my new JMS autoconfiguration feature deployed to my local maven repository.

Since I haven't written any Groovy autoconfiguration yet, the test will fail. Time to write the CLI autoconfiguration!

```java
Copypackage org.springframework.boot.cli.compiler.autoconfigure;

. . .import statements. . .

public class JmsCompilerAutoConfiguration extends CompilerAutoConfiguration {

	@Override
	public boolean matches(ClassNode classNode) {
		return AstUtils.hasAtLeastOneFieldOrMethod(classNode, "JmsTemplate",
				"DefaultMessageListenerContainer", "SimpleMessageListenerContainer");
	}

	@Override
	public void applyDependencies(DependencyCustomizer dependencies)
			throws CompilationFailedException {
		dependencies.add("org.springframework", "spring-jms",
				dependencies.getProperty("spring.version")).add(
				"org.apache.geronimo.specs", "geronimo-jms_1.1_spec", "1.1");

	}

	@Override
	public void applyImports(ImportCustomizer imports) throws CompilationFailedException {
		imports.addStarImports("javax.jms", "org.springframework.jms.core",
				"org.springframework.jms.listener",
				"org.springframework.jms.listener.adapter");
	}

}
```

These callback hooks make it super easy to integrate with Spring Boot's CLI tool.

-   `matches()` lets you define what symbols trigger this behavior. For this one, if there is a `JmsTemplate`, `DefaultMessageListenerContainer`, or `SimpleMessageListenerContainer`, it will trigger the action.
-   `applyDependencies()` specifies exactly what libraries to add to the classpath via Maven coordinates. This is akin to adding `@Grab` annotations to the application. For this one, we need **spring-jms** for `JmsTemplate` and **geronimo-jms** for JMS API spec classes.
-   `applyImports()` adds import statements to the top of your code. I basically looked at the Spring JMS imports from the autoconfiguration test code, and added them here.

This time, if you run the test suite, it should pass.

```sh
Copy$ mvn clean -Dtest=SampleIntegrationTests#jmsSample test
```

```sh
Copy  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::  (v0.5.0.BUILD-SNAPSHOT)

2013-09-18 11:47:03.800  INFO 22969 --- [       runner-0] o.s.boot.SpringApplication               : Starting application on retina with PID 22969 (/Users/gturnquist/.groovy/grapes/org.springframework.boot/spring-boot/jars/spring-boot-0.5.0.BUILD-SNAPSHOT.jar started by gturnquist)
2013-09-18 11:47:03.825  INFO 22969 --- [       runner-0] s.c.a.AnnotationConfigApplicationContext : Refreshing org.springframework.context.annotation.AnnotationConfigApplicationContext@4670f288: startup date [Wed Sep 18 11:47:03 CDT 2013]; root of context hierarchy
2013-09-18 11:47:04.428  INFO 22969 --- [       runner-0] o.s.c.support.DefaultLifecycleProcessor  : Starting beans in phase 2147483647
2013-09-18 11:47:04.498  INFO 22969 --- [       runner-0] o.apache.activemq.broker.BrokerService   : Using Persistence Adapter: AMQPersistenceAdapter(activemq-data/localhost)
2013-09-18 11:47:04.501  INFO 22969 --- [       runner-0] o.a.a.store.amq.AMQPersistenceAdapter    : AMQStore starting using directory: activemq-data/localhost
2013-09-18 11:47:04.515  INFO 22969 --- [       runner-0] org.apache.activemq.kaha.impl.KahaStore  : Kaha Store using data directory activemq-data/localhost/kr-store/state
2013-09-18 11:47:04.541  INFO 22969 --- [       runner-0] o.a.a.store.amq.AMQPersistenceAdapter    : Active data files: []
2013-09-18 11:47:04.586  INFO 22969 --- [       runner-0] o.apache.activemq.broker.BrokerService   : ActiveMQ null JMS Message Broker (localhost) is starting
2013-09-18 11:47:04.587  INFO 22969 --- [       runner-0] o.apache.activemq.broker.BrokerService   : For help or more information please see: http://activemq.apache.org/
2013-09-18 11:47:04.697  INFO 22969 --- [  JMX connector] o.a.a.broker.jmx.ManagementContext       : JMX consoles can connect to service:jmx:rmi:///jndi/rmi://localhost:1099/jmxrmi
2013-09-18 11:47:04.812  INFO 22969 --- [       runner-0] org.apache.activemq.kaha.impl.KahaStore  : Kaha Store using data directory activemq-data/localhost/kr-store/data
2013-09-18 11:47:04.814  INFO 22969 --- [       runner-0] o.apache.activemq.broker.BrokerService   : ActiveMQ JMS Message Broker (localhost, ID:retina-51737-1379522824687-0:0) started
2013-09-18 11:47:04.817  INFO 22969 --- [       runner-0] o.a.activemq.broker.TransportConnector   : Connector vm://localhost Started
2013-09-18 11:47:04.867  INFO 22969 --- [       runner-0] o.s.boot.SpringApplication               : Started application in 1.218 seconds
2013-09-18 11:47:04.874  INFO 22969 --- [       runner-0] org.test.JmsExample                      : Sending JMS message...
2013-09-18 11:47:04.928  INFO 22969 --- [  jmsListener-1] org.test.Receiver                        : Received Greetings from Spring Boot via ActiveMQ
2013-09-18 11:47:04.931  INFO 22969 --- [           main] s.c.a.AnnotationConfigApplicationContext : Closing org.springframework.context.annotation.AnnotationConfigApplicationContext@4670f288: startup date [Wed Sep 18 11:47:03 CDT 2013]; root of context hierarchy
2013-09-18 11:47:04.932  INFO 22969 --- [           main] o.s.c.support.DefaultLifecycleProcessor  : Stopping beans in phase 2147483647
2013-09-18 11:47:05.933  INFO 22969 --- [           main] o.a.activemq.broker.TransportConnector   : Connector vm://localhost Stopped
2013-09-18 11:47:05.933  INFO 22969 --- [           main] o.apache.activemq.broker.BrokerService   : ActiveMQ Message Broker (localhost, ID:retina-51737-1379522824687-0:0) is shutting down
2013-09-18 11:47:05.944  INFO 22969 --- [           main] o.apache.activemq.broker.BrokerService   : ActiveMQ JMS Message Broker (localhost, ID:retina-51737-1379522824687-0:0) stopped
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 4.432 sec - in org.springframework.boot.cli.SampleIntegrationTests
```

Ta dah!

At this stage, all I have to do is check out the [contribution guidelines](https://github.com/spring-projects/spring-boot/blob/master/CONTRIBUTING.adoc) to ensure I am following Spring Boot's coding standards, and then submit my [pull request](https://github.com/spring-projects/spring-boot/pull/49). Feel free to see my contribution and follow up comments. (P.S. It was accepted after some fine tuning.)

I hope you have enjoyed this deep dive into Spring Boot and how it works. Hopefully, you will be able to code your own patch.