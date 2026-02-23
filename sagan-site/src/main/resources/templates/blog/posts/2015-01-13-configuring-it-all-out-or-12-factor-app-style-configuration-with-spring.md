---
title: "Configuring It All Out" or "12-Factor App-Style Configuration with Spring"
source: https://spring.io/blog/2015/01/13/configuring-it-all-out-or-12-factor-app-style-configuration-with-spring
scraped: 2026-02-23T21:06:49.684Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 13, 2015 | 21 Comments
---

# "Configuring It All Out" or "12-Factor App-Style Configuration with Spring"

_Engineering | Josh Long |  January 13, 2015 | 21 Comments_

Let's establish some vocabulary, before we begin. When we talk about *configuration* in Spring, we're *usually* talking about the inputs into the Spring framework's various [`ApplicationContext`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/ApplicationContext.html) implementations that help the container understand what it is you want done. This might be an XML file to be fed into a [`ClassPathXmlApplicationContext`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html), or Java classes annotated a certain way to be fed into an [`AnnotationConfigApplicationContext`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/annotation/AnnotationConfigApplicationContext.html).

Another type of *configuration*, as [nicely described in the 12-Factor application manifesto](http://12factor.net/config), is any of an application's that is likely to vary between deploys (staging, production, developer environments, etc.), like service credentials and hostnames.

This second type of configuration, which should live external to the deployed application, has been well supported in Spring since the [`PropertyPlaceholderConfigurer`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/PropertyPlaceholderConfigurer.html) class was introduced. Spring's support for that type of configuration has come a long way since then and in this blog we're going to look at that progression.

# [](#the-propertyplaceholderconfigurer)The `PropertyPlaceholderConfigurer`

Spring's offered the [`PropertyPlaceholderConfigurer`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/beans/factory/config/PropertyPlaceholderConfigurer.html) since 2003. Spring 2.5 introduced XML namespace support and with it XML namespace support for property placeholder resolution. For example `<context:property-placeholder location = "simple.properties"/>` would let us substitute bean definition literal values in the XML configuration for values assigned to keys in a (external) property file (in this case `simple.properties` which may be on the classpath or external to the application). This property file might look like:

```properties
Copy# Database Credentials
configuration.projectName = Spring Framework
```

# [](#the-environment-abstraction)The `Environment` Abstraction

This solution predates the introduction of Java configuration into Spring Framework proper in 3.0. Spring 3 made it easy to inject configuration values into Java component configuration using `@Value`\-annotations, like this:

```java
Copy@Value("${configuration.projectName}") 
private String projectName; 
```

Spring 3.1 introduced the [`Environment`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/core/env/Environment.html) abstraction. It provides a bit of runtime indirection between the runnning application and the environment in which it is running. The `Environment` acts as a map of keys and values. You can configure where those values are read from by contributing a. Inject an object of type `Environment` anywhere you want and ask it questions. By default Spring loads up system environment keys and values, like `line.separator`. You can tell Spring to load up configuration keys from a file, specifically, using the `@PropertySource` annotation.

```java
Copypackage env;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.context.support.*;
import org.springframework.core.env.Environment;

@Configuration
@ComponentScan
@PropertySource("file:/path/to/simple.properties")
public class Application {

	@Bean
	static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
	}

	@Value("${configuration.projectName}")
	void setProjectName(String projectName) {
		System.out.println("setting project name: " + projectName);
	}

	@Autowired
	void setEnvironment(Environment env) {
		System.out.println("setting environment: " + 
                      env.getProperty("configuration.projectName"));
	}

	public static void main(String args[]) throws Throwable {
		new AnnotationConfigApplicationContext(Application.class);
	}
}
```

This example loads up the values from a file, `simple.properties`, and then has one value, `configuration.projectName`, injected using the `@Value` annotation and then read again from Spring's `Environment` abstraction. To be able to inject the values with the `@Value` annotation, we need to register a [`PropertySourcesPlaceholderConfigurer`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/support/PropertySourcesPlaceholderConfigurer.html). In this case, the output is `Spring Framework`.

The `Environment` also brings the idea of [*profiles*](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/context/annotation/Profile.html). It lets you ascribe labels (profiles) to groupings of beans. Use profiles to describe beans and bean graphs that change from one environment to another. You can activate one or more profiles at a time. Beans that do not have a profile assigned to them are always activated. Beans that have the profile `default` are activated only when there are no other profiles are active.

Profiles let you describe sets of beans that need to be created differently in one environment versus another. You might, for example, use an embedded H2 `javax.sql.DataSource` in your local `dev` profile, but then switch to a `javax.sql.DataSource` for PostgreSQL that's resolved through a JNDI lookup or by reading the properties from an environment variable in [Cloud Foundry](http://cloudfoundry.org) when the `prod` profile is active. In both cases, your code works: you get a `javax.sql.DataSource`, but the decision about *which* specialized instance is used is decided by the active profile or profiles.

You should use this feature sparingly. Ideally, the object graph between one environment and another should remain fairly fixed.

# [](#bootiful-configuration)*Bootiful* Configuration

[Spring Boot](http://spring.io/projects/spring-boot) improves things considerably. Spring Boot will read the properties in `src/main/resources/application.properties` by default. [If a profile is active](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-profiles.html), it will also automatically reads in the configuration files based on the profile name, like `src/main/resources/application-foo.properties` where `foo` is the current profile. If the [Snake YML library](https://code.google.com/p/snakeyaml/) is on the classpath, then it will also automatically load YML files. Yeah, read that part again. YML is so good, and so worth a go! Here's an example YML file:

```yaml
Copyconfiguration:
	projectName : Spring Boot
	someOtherKey : Some Other Value
```

Spring Boot also made it much simpler to get the right result in common cases. It makes `-D` arguments to the `java` process and environment variables available as properties. It even normalizes them, so an environment variable `$CONFIGURATION_PROJECTNAME` or a `-D` argument of the form `-Dconfiguration.projectname` both become accessible with the key `configuration.projectName`.

Configuration values are strings, and if you have enough configuration values it can be unwieldy trying to make sure those keys don't themselves become magic strings in the code. Spring Boot introduces a `@ConfigurationProperties` component type. Annotate a POJO with `@ConfigurationProperties` and specify a prefix, and Spring will attempt to map all properties that start with that prefix to the POJO's properties. In the example below the value for `configuration.projectName` will be mapped to an instance of the POJO that all code can then inject and dereference to read the (type-safe) values. In this way, you only have the mapping from a key in one place.

In the example below, properties will be resolved automatically from `src/main/resources/application.yml`.

```java
Copypackage boot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

// reads a value from src/main/resources/application.properties first
// but would also read:
//  java -Dconfiguration.projectName=..
//  export CONFIGURATION_PROJECTNAME=..

@SpringBootApplication
public class Application {

	@Autowired
	void setConfigurationProjectProperties(ConfigurationProjectProperties cp) {
		System.out.println("configurationProjectProperties.projectName = " + cp.getProjectName());
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class);
	}
}

@Component
@ConfigurationProperties("configuration")
class ConfigurationProjectProperties {

	private String projectName;

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
}
```

Spring Boot uses the `@ConfigurationProps` mechanism heavily to let users override bits of the system. You can see what property keys can be used to change things, for example, by adding the `org.springframework.boot:spring-boot-starter-actuator` dependency to a Spring Boot-based web application and then visiting `http://127.0.0.1:8080/configprops`. This will give you a list of supported configuration properties based on the types present on the classpath at runtime. As you add more Spring Boot types, you'll see more properties.

# [](#centralized-journaled-configuration-with-the-spring-cloud-configuration-support)Centralized, Journaled Configuration with the Spring Cloud Configuration Support

So far so good, but there are gaps in the approach so far:

-   changes to an application's configuration require restarts
-   there is no traceability: how do we determine what changes were introduced into production and, if necessary, roll back?
-   configuration is de-centralized and it's not immediately apparent where to go to change what.
-   sometimes configuration values should be encrypted and decrypted for security. There is no out-of-the-box support for this.

[Spring Cloud](http://projects.spring.io/spring-cloud/spring-cloud.html), which builds upon Spring Boot and integrates various tools and libraries for working with microservices, including [the Netflix OSS stack](https://github.com/netflix), offers a [configuration server](http://cloud.spring.io/spring-cloud-config/) and a client for that configuration server. This support, taken together, address these last three concerns.

Let's look at a simple example. First, we'll setup a configuration server. The configuration server is something to be shared among a set of applications or microservices based on Spring Cloud. You have to get it running, somewhere, once. Then, all other services need only know where to find the configuration service. The configuration service acts as a sort of proxy for configuration keys and values that it reads from a Git repository online or on a disk.

```java
Copypackage cloud.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
```

If you manage things correctly, then the only configuration that lives with any of your services should be the configuration that tells the configuration service where to find the Git repository and the configuration that tells the other client services where to find the configuration service.

Here's the configuration for the configuration service, `src/main/resources/application.yml`:

```yaml
Copyserver:
	port: 8888

spring:
	cloud:
		config:
			server:
				git :
					uri: https://github.com/joshlong/microservices-lab-configuration

```

This tells the Spring Cloud configuration service to look for configuration files for individual client services in the Git repository on my GitHub account. The URI could, of course, just as easily have been a Git repository on my local file system. The value used for the URI could also have been a property reference, of the form, `${SOME_URI}`, that references - perhaps - an environment variable called `SOME_URI`.

Run the application and you'll be able to verify that your configuration service is working by pointing your browser at `http://localhost:8888/SERVICE/master` where `SERVICE` is the ID taken from your client service's `boostrap.yml`. Spring Cloud-based services look for a file called `src/main/resources/bootstrap.(properties,yml)` that it expects to find to - you guessed it! - bootstrap the service. One of the things it expects to find in the `bootstrap.yml` file is the ID of the service specified as a property, `spring.application.name`. Here's our configuration client's `bootstrap.yml`:

```yaml
Copyspring:
	application:
		name: config-client
		cloud:
			config:
				uri: http://localhost:8888
```

When the Spring Cloud microservice runs, it'll see that its `spring.application.name` is `config-client`. It will contact the configuration service (which we've told Spring Cloud is running at `http://localhosst:8080`, though this too could've been an environment variable) and ask it for any configuration. The configuration service returns back JSON that contains all the configuration values in the `application.(properties,yml)` file as well as any service-specific configuration in `config-client.(yml,properties)`. It will *also* load any configuration for a given service *and* a specific profile, e.g., `config-client-dev.properties`.

This all just happens automatically. In the following example, the configuration value is read from the configuration service.

```java
Copypackage cloud.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Autowired
	void setEnvironment(Environment e) {
		System.out.println(e.getProperty("configuration.projectName"));
	}
}

@RestController
@RefreshScope
class ProjectNameRestController {

	@Value("${configuration.projectName}")
	private String projectName;

	@RequestMapping("/project-name")
	String projectName() {
		return this.projectName;
	}
}
```

The `ProjectNameRestController` is annotated with [`@RefreshScope`](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_refresh_scope), a custom Spring Cloud *scope* that lets any bean recreate itself (and re-read configuration values from the configuration service) in-place. There are various ways to trigger the refresh: send a `POST` request to `http://127.0.0.1:8080/refresh` (e.g.: `curl -d{} http://127.0.0.1:8080/refresh`), use the auto-exposed JMX refresh endpoint, or use the Spring Cloud Bus.

The [Spring Cloud Bus](http://cloud.spring.io/spring-cloud-bus/) links all services through a RabbitMQ powered-bus. This is particularly powerful. You can tell one (or thousands!) of microservices to refresh themselves by sending a single message to a message bus. This prevents downtime and is *much* more friendly than having to systematically restart individual services or nodes.

To see all this in action, get the config client and config server running, being sure to point the config server to a Git repository that you can control and make changes to. Hit the REST endpoint and confirm that you see `Spring Cloud`. Then make changes to the configuration file in Git, and at the very least `git commit` them. Then trigger a refresh against the config client and revisit the REST endpoint again. You should see the updated value reflected!

The Spring Cloud configuration support *also* [includes first-class support for security and encryption](http://cloud.spring.io/spring-cloud-config/spring-cloud-config.html#_security_2). I'll leave you to explore that last mile on your own, but it's fairly trivial and amounts to configuring a valid key.

# [](#next-steps)Next Steps

We've covered a *lot* here! Armed with all of this, it should be easy to package one artifact and then move that artifact from one environment to another without changes to the artifact itself. If you're going to start an application today, I'd recommend starting on Spring Boot and Spring Cloud, especially now that we've looked at all the good stuff it brings you by default. Don't forget [to check out the code](https://github.com/joshlong/configuring-it-all-out) behind all of these examples.