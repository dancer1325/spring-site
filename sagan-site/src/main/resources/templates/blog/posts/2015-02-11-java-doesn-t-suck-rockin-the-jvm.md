---
title: Java Doesn’t Suck - Rockin\' the JVM
source: https://spring.io/blog/2015/02/11/java-doesn-t-suck-rockin-the-jvm
scraped: 2026-02-23T21:06:54.556Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Brian Dussault |  February 11, 2015 | 3 Comments
---

# Java Doesn’t Suck - Rockin' the JVM

_Engineering | Brian Dussault |  February 11, 2015 | 3 Comments_

Recently James Ward wrote a great blog post, [“Java Doesn’t Suck – You’re Just Using it Wrong”](http://www.jamesward.com/2014/12/03/java-doesnt-suck-youre-just-using-it-wrong), which highlighted numerous challenges that enterprise Java developers face in their daily routines building Java applications. The good news is that breaking out of the development rut is much easier than you may think. Over the last few years, Spring has redefined how modern Java applications are built while dramatically improving development velocity. In this post, I’ll use James Ward’s blog post as a backdrop to explain how Spring helps developers rock the JVM (using Java) while tackling each of the issues James outlined.

##Instant Development Environment Setup Rocks In James’ blog, he asserts “10 Page Wikis to Setup Dev Environments Suck”. We have all created these wiki pages at some point in our career and slogged through trying to keep them updated. These wikis have long been a source of frustration for new team members as they are often littered with outdated information. The good news is that Spring Boot’s build support makes automating this process quite easy.

Getting started with an existing application is a simple as cloning the source repository and running the application. Spring Boot provides support for Java’s most popular build tools, Maven and Gradle. Getting a fully functional application running with your favorite build tool is a simple as:

Maven example:

```
Copymvn spring-boot:run

```

Gradle example:

```
Copygradle bootRun

```

Since a Spring Boot application is a self-contained workload that combines application code, server, and 3rd party dependencies into a single build and deployment unit (executable .jar file), development teams are ensured a straightforward, repeatable development experience regardless of the IDE. Developers are freed from laborious environment setup instructions and can focus on building great applications. Running a Spring Boot application outside the build can be accomplished by executing:

```
Copyjava -jar target/my-application-1.0.1-SNAPSHOT.jar

```

> Tip: Want to try this on your own? Follow along in one of the many [Getting Started Guides](https://spring.io/guides) on spring.io. For developers new to Spring Boot, a great starting point is the [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/) guide.

##Congruent Deployment Environments Rock The next challenge James Ward highlights is “to minimize risk when promoting builds from dev to staging to production, the only thing that should change between each environment is configuration”. Manually modifying deployment artifacts is a recipe for disaster and will eventually cause deployment delays or failures. Environment specific configuration should be externalized, ensuring that the same code tested in development is the “gold copy” that will make its way to production. This is the only cost-effective way to prove that what you tested is what you deployed!

Spring Boot makes it a cinch to externalize your configuration using a very particular PropertySource order that is designed to allow sensible overriding of values. It’s often desirable to provide a default configuration within your project for local development but override these values when promoting the code through environments. Spring Boot provides comprehensive support for externalized configuration via command line arguments, JNDI attributes, Java System properties, OS environment variables, configuration files, profile-driven configuration variants, and [more](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html). Spring Boot’s support of environment variables makes following [Twelve-Factor application configuration best practices](http://spring.io/blog/2015/01/13/configuring-it-all-out-or-12-factor-app-style-configuration-with-spring) (strict separation of code from configuration) a breeze.

> Tip 1: When using cloud platforms like Cloud Foundry, Spring Boot applications can leverage [Spring Cloud Connectors](http://cloud.spring.io/spring-cloud-connectors/) to automatically bind to Cloud Foundry services like database and messaging systems. This has the advantage of reducing the number of environment-specific configuration properties that an application need to maintain, significantly reducing the risk of error when promoting code across environments.

> Tip 2: Curious why Twelve-Factor applications matter? Check out this blog post, [Why 12 Factor Application Patterns, Microservices and CloudFoundry Matter](https://spring.io/blog/2015/01/30/why-12-factor-application-patterns-microservices-and-cloudfoundry-matter).

##Fast Server Startup Rocks Spring Boot provides support for lightweight, embeddable containers/servers that start-up quickly. A simple REST application can start-up in as little as 3 seconds. As of Spring Boot 1.2, there is embedded application server support for Tomcat (default container), Jetty, and Undertow. Not only does Spring Boot provide support for the leading lightweight containers, but it keeps the developer in full control of these decisions by making it straightforward to swap out the default.

The following Gradle build configuration enables support for full-stack web development, including support for embedded Tomcat and spring-webmvc.

Gradle example:

```groovy
Copy...

apply plugin: 'java'

repositories { jcenter() }
dependencies {
    compile("org.springframework.boot:spring-boot-starter-web:1.2.0.RELEASE")
}

...
```

As James Ward points out in his original blog post, startup times can be further improved by breaking monolithic deployments into microservices. Later in this post, the topic of microservices will be addressed in further detail (see the section titled *Microservice Style Architectures Rock*).

## [](#managed-dependencies-rock)Managed Dependencies Rock

Modern developers need tools and technology that allow them to get started quickly with the least amount of friction. They also demand modular, lightweight and opinionated technology to optimize productivity. Spring Boot takes aim at the very issue of getting up and running quickly while dramatically improving development velocity.

As James Ward correctly points out “it sucks if any of your library dependencies aren’t managed by a build tool”. Spring Boot makes this best practice a first practice by not only supporting modern build technologies but also providing convenient dependency descriptors called [starter POMS](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#using-boot-starter-poms). Starter POMs provide groups of dependencies for common development workloads that you can simply include in your application.

To get started with Spring Boot, you can point your browser at Spring Initializer - [http://start.spring.io](http://start.spring.io). Spring Initializer provides a web based interface allowing developers to select an application/workload and relevant dependencies. It will then generate a starter application with build support (supports Maven POM, Maven project, Gradle Config, Gradle project).

Screenshot of Spring Initializer: ![Spring Initializer](https://raw.githubusercontent.com/dussab/blog-images/master/spring-intializer.png)

For developer that prefer the command line, you can install the Spring Boot CLI by issuing:

```bash
Copycurl http://start.spring.io/install.sh | sh
```

A new project can be initialized using the command line simply by issuing the following command:

```bash
Copyspring init --dependencies=web,data-jpa my-project

```

The result of this initialization (via Spring Initializer or the Boot CLI) is a fully operational application where the required dependencies have been included and auto-configured by Spring Boot.

The [Spring IO Platform](http://docs.spring.io/platform/docs/current/reference/htmlsingle/) (which includes Spring Boot) also provides a superset of the dependencies managed by Spring Boot’s starter POMs. Spring IO level-sets dependency versions across the Spring portfolio and has a longer release cycle than Spring Boot, giving enterprises a snapshot of dependency versions that are tested and known to work together. The Spring IO Platform distribution is not a monolithic download of libraries, and developers are free to choose only the parts they need in their application. The Spring IO Platform distribution contains versions of Spring modules, testing libraries, logging frameworks, database management, SQL/No-SQL, and so much more. The Spring IO distribution is ideal for enterprises that want to consume the Spring IO Platform dependencies at a more gradual cadence.

The following Gradle configuration demonstrates how to configure the Spring IO Platform bill-of-materials and leverage Spring Boot’s web starter POM:

```groovy
Copy
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'io.spring.gradle:dependency-management-plugin:0.3.0.RELEASE'
    }
}

apply plugin: 'io.spring.dependency-management'

repositories {
    mavenCentral()
}

dependencyManagement {
    imports {
        mavenBom 'io.spring.platform:platform-bom:1.1.0.RELEASE'
    }
}

dependencies {
    compile 'org.springframework.boot:spring-boot-starter-web'
}

```

##Short Development / Validation Cycles Really Rock Most modern applications are being built with rich user interfaces communicating to back end services. Building applications in this manner has the benefit of strong separation of concerns between the UI and server side logic. Most modern IDEs provide dynamic reloading of static resources, allowing developers to see changes without restarting the server.

Spring Boot also supports server side templating technologies such as Thymeleaf, Freemarker, and Groovy. Spring Boot allows the dynamic reloading of these template technologies without incurring a server restart. For Thymeleaf this is as simple as setting the following property in the application.properties file:

```
Copyspring.thymeleaf.cache: false

```

On the server side, breaking your monolithic applications into microservices will reduce the startup time of Spring Boot applications (which is already quite quick due to its use of lightweight embedded containers). Additionally, Spring Boot delivers support for the autoconfiguration of testing utilities. Enabling Boot’s testing autoconfiguration is as effortless as including the spring-boot-starter-test starter POM. This enables Spring Test, JUnit, Hamcrest, and Mockito dependencies making it easy to incorporate Test Driven Development (TDD) into daily workflows. TDD enables developers to receive immediate feedback on changes to their code.

Finally, JRebel provides comprehensive support for class reloading with support for over 80 Java frameworks (including Spring). Check out the webinar [Spring Boot and JRebel 6](https://www.youtube.com/watch?v=N5FHiONGOsg) with Josh Long and Adam Koblentz for more details.

##Microservice Style Architectures Rock James’ statement that “Monolithic Releases Suck“ is spot on for large or complex distributed systems. Most developers want to work in a more iterative manner (agile) and release more frequently. The microservice style architecture has grown in popularity as a way to combat the challenges of monolithic applications. For folks new to microservices, Martin Fowler provides a great description of this architecture style in his [blog](http://martinfowler.com/articles/microservices.html).

When building distributed applications (including microservice style applications), there are many common system patterns that appear. Spring Cloud makes it simple to adopt these patterns by providing out-of-the-box services to tackle the most common challenges. Spring Cloud implements patterns such as configuration management, service discovery, circuit breaker, intelligent routing, micro-proxy, and control bus. Spring Boot makes it drop dead simple to integrate these capabilities into your application.

For example, the Spring Cloud Netflix project makes standing up a service discovery service with Netflix’s Eureka as easy as:

```java
Copy
@SpringBootApplication 
@EnableEurekaServer

public class Application {
    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class).web(true).run(args);
    }

}

```

Client applications can register as a Eureka client by simply using @EnableEurekaClient:

```java
Copy
@SpringBootApplication
@EnableEurekaClient
@RestController
public class Application {

    @RequestMapping("/")
    public String home() {
        return "Hello world";
    }

    public static void main(String[] args) {
        new SpringApplicationBuilder(Application.class).web(true).run(args);
    }

}

```

> Tip 1: Spring Cloud provides support for numerous distributed processing patterns. To help you get started, check out the [Spring Cloud Samples](https://github.com/spring-cloud-samples) github repository. Dave Syer and Spencer Gibb’s [Spring Cloud, Spring Boot and Netflix OSS](http://www.infoq.com/presentations/spring-boot-netflix) SpringOne session is another great way to understand and learn how to operationalize microservice style architectures.

> Tip 2: If you're looking to build Hypermedia-style REST APIs, be sure to check out the Getting Started Guide, [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/). [Spring Data REST](http://projects.spring.io/spring-data-rest/) will help turbocharge your service development. Spring Data REST supports both SQL and No-SQL repositories.

Having technology that allows you to code microservices quickly is only half the battle. Developers are often plagued by the numerous delays in getting their code into production platforms. Some of the most common obstacles include manual deployments, testing, infrastructure provisioning, and service provisioning. Continuous delivery takes aim at automating the process of promoting code to production while minimizing risk. This allows organizations to make incremental changes to applications, making deployment a business decision rather than resource decision. This is quite a large topic on it’s own, but I highly recommend Matt Stine’s talk, [Developing Microservices for PaaS with Spring and Cloud Foundry](https://www.youtube.com/watch?v=iMvCOEsSuAc) which does an excellent job highlighting the benefits of combining agile engineering practices with the automation of Pivotal Cloud Foundry.

##Stateless Applications Rock James points out that “sticky sessions and server state are usually one of the best ways to kill your performance and resilience. Session state (in the traditional Servlet sense) makes it really hard to do Continuous Delivery and scale horizontally”.

Removing session state from your application can dramatically streamline operations, allowing applications to be redeployed, terminated or scaled without the fear of losing session data. There are valid use cases for maintaining state, such as sharing authentication state, but this state should be persisted outside of the application (typically in a high-performance repository like a NoSQL, distributed cache, or even in-memory data store). Externalizing application state doesn’t have to be an onerous effort and Spring Session provides the common infrastructure to make this process simple and portable. Spring Session provides:

-   Support for clustering in a vendor neutral way
-   RESTful API support - supports session ids in headers
-   Pluggable strategy for determining the session id
-   Support to keep the HttpSession alive when a WebSocket is active
-   Support for Redis and Hazelcast backed session stores
-   Ability to manage multiple simultaneous sessions within a single browser (i.e. similar to multiple Google Accounts support)

Configuring Spring Session with Redis is as simple as:

```java
Copy@EnableRedisHttpSession
public class Config {

    @Bean
    public JedisConnectionFactory connectionFactory() {
        return new JedisConnectionFactory();
    }
}

```

> Tip: Spring Session 1.0 recently [went GA](http://spring.io/blog/2015/01/08/spring-session-1-0-0-release), so try out the [Spring Session samples](http://docs.spring.io/spring-session/docs/current/reference/html5/#samples) to see it all in action. Dave Syer recently published a blog post titled, [The API Gateway Pattern: Angular JS and Spring Security Part IV](https://spring.io/blog/2015/01/28/the-api-gateway-pattern-angular-js-and-spring-security-part-iv), which details the shared authentication state use case. Highly recommended reading!

Finally, if you’re using Pivotal Cloud Foundry, the Cloud Foundry Java build pack provides another option to easily externalize state through an autoconfigured CF session state store. Check out this [blog post](https://github.com/cloudfoundry/java-buildpack/blob/master/docs/container-tomcat.md#session-replication) for details.

##Non-Blocking Apps Rock A number of modern application architectures can greatly benefit from asynchronous and non-blocking processing of requests. These use cases can include composing multiple backend service calls and WebSocket style applications.

Project Reactor (part of the Spring IO Platform) provides the foundation for building these async, non-blocking applications. In version 2.0, Reactor will provide a full implementation of the [Reactive Streams specification](http://www.reactive-streams.org/) which opens up integration with other Reactive Streams implementations like [Akka Streams](http://www.typesafe.com/activator/template/akka-stream-scala), [Ratpack](http://ratpack.io/), [RxJava](https://github.com/ReactiveX/RxJava).

The following code snippet shows how to use the Reactive Streams API to create a stream, add business logic to it, then publish data into it:

```java
Copy// by default Streams use the Disruptor RingBufferDispatcher
Broadcaster<String> helloStream = Streams.broadcast(env);

helloStream.map(s -> "Hello " + s + "!")
           .consume(log::info);

helloStream.onNext("World");

```

> Tip: Spring Boot provides support for project Reactor, making it simple to get started. Follow along in the [Creating an Asynchronous, Event-Driven Application with Reactor](https://spring.io/guides/gs/messaging-reactor/) Getting Started Guide to create your first reactive application. Also be sure to check out the webinar, [Using Reactor for Asynch, non-blocking Microservices](https://spring.io/blog/2014/12/11/webinar-replay-using-reactor-for-asynch-non-blocking-microservices).

Spring Framework 4 introduced support for WebSocket-style, event-driven applications. This pragmatic approach goes well beyond JSR-356 and includes client-side fallback options with SockJS, support for messaging subprotocol (STOMP), security (Spring Security 4), message broker support, Reactor based MessageChannel for message passing, client disconnect handling and a familiar Spring programming model.

> Tip: Spring Boot makes configuring WebSocket applications a snap. Follow along with the [Using WebSocket to build an interactive web application guide](https://spring.io/guides/gs/messaging-stomp-websocket/) to get rolling.

## [](#the-java-language-rocks)The Java Language Rocks

Spring Boot provides developers an option of using Java 6, 7, 8 as well as Groovy to build next generation applications. In James’ post he states that the “Java Language Kinda Sucks” but with the release of Java 8, Java has been propelled forward and provides many powerful language features that will improve productivity. Some of the great Java 8 features include support for Lambda Expressions, Streams, and concurrency improvements. Spring Boot makes getting started with Java 8 or Groovy effortless.

> Tip: If you’re new to the features of Java 8, I highly recommend Venkat Subramaniam’s book, [Functional Programming in Java: Harnessing the Power of Java 8 Lambda Expressions](https://pragprog.com/book/vsjava8/functional-programming-in-java) and his [SpringOne2GX 2014 talk](http://spring.io/blog/2014/11/17/springone2gx-2014-replay-java-8-language-capabilities-what-s-in-it-for-you)

##Conclusion Building modern Java applications doesn’t have to be a painful experience. Spring Boot has taken the ceremony out of building applications, making Java fun again. Spring removes boilerplate from every layer of your application - business logic (Spring Foundation projects), configuration and runtime (Spring Boot), and distributed system patterns (Spring Cloud). The best way to get started is to dive into [Spring’s Getting Started Guides](http://spring.io/guides) and deploy to [Pivotal Web Services](https://run.pivotal.io/) (a public, hosted version of Cloud Foundry that is free for 60 days).