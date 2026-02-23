---
title: Spring Boot 1.2.0 released
source: https://spring.io/blog/2014/12/11/spring-boot-1-2-0-released
scraped: 2026-02-23T22:02:57.605Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  December 11, 2014 | 9 Comments
---

# Spring Boot 1.2.0 released

_Releases | Phil Webb |  December 11, 2014 | 9 Comments_

I am pleased to announce that Spring Boot 1.2.0 has been released and is available from [repo.spring.io](http://repo.spring.io/release) and [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.springframework.boot%22). This release adds a significant number of new features and improvements over 1.1 and is a recommended upgrade for all users. For [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.2-Release-Notes#upgrading-from-spring-boot-11) and ["new and noteworthy"](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.2-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.2-Release-Notes).

Here are some of the highlights of this release:

## [](#servlet-31)Servlet 3.1

Spring Boot now uses Servlet 3.1 when running with an embedded servlet container. Tomcat 8, Jetty 9 and Undertow 1.1 are all supported options. In addition, WebSocket support has been improved and is now automatically configured for all supported servers. If you need to stick to Servlet 3.0, Tomcat 7 and Jetty 8 are still supported.

## [](#springbootapplication)@SpringBootApplication

If you find yourself typing `@Configuration` + `@EnableAutoConfiguration` + `@ComponentScan` whenever you start a new Spring Boot application, you might like the new `@SpringBootApplication` annotation. You can use it as a quick alternative for those three annotations and save yourself some typing. It works particularly well if you structure your code as we [recommend in the reference documentation](http://docs.spring.io/spring-boot/docs/1.2.x/reference/htmlsingle/#using-boot-structuring-your-code).

## [](#jta-support-and-java-ee)JTA Support and Java EE

Spring Boot 1.2 now supports distributed JTA transactions across multiple XA resources using either an [Atomikos](http://www.atomikos.com/) or [Bitronix](http://docs.codehaus.org/display/BTM/Home) embedded transaction manager. JTA transactions are also supported when deploying to a suitable Java EE Application Server.

Java EE support in general had been refreshed with Spring Boot 1.2. This [blog post](http://spring.io/blog/2014/11/23/bootiful-java-ee-support-in-spring-boot-1-2) from [Josh Long](https://spring.io/team/jlong) provides an excellent primer.

## [](#jackson-customization)Jackson customization

Jackson configuration has been greatly improved with Spring Boot 1.2. You can now configure most Jackson options from your `application.properties` file. See this [excellent blog post](http://spring.io/blog/2014/12/02/latest-jackson-integration-improvements-in-spring) from [Sébastien Deleuze](http://spring.io/team/sdeleuze) for more background on Spring's general support for Jackson.

## [](#jms-support)JMS Support

Spring 4.1 introduced some nice [enhancements to its JMS support](http://spring.io/blog/2014/04/30/spring-4-1-s-upcoming-jms-improvements) and you can now use these seamlessly from Spring Boot. The `@EnableJms` annotation is also auto-configured whenever you have `spring-jms.jar` on your classpath.

## [](#actuator-updates)Actuator updates

There have been lots of updates to the actuator module with Spring Boot 1.2. We now provide additional metrics (including DataSource metrics, Tomcat session metrics and improved System metrics). There is also better integration with the [Dropwizard "Metrics" library](https://dropwizard.github.io/metrics/).

The `/health` endpoint has been improved to provide DataSource and disk space monitoring. It is also more secure now and won't expose so much information on an unauthenticated connection.

## [](#cli-updates)CLI Updates

The `spring` CLI tool has been improved with a couple of new commands. You can now type `spring init` to use the [start.spring.io](http://start.spring.io) service. For example:

```
Copy$ spring init -d=web myapp.zip
```

Will download a zip containing a basic Spring Boot web application.

The CLI also now supports extensions. You can `spring install <maven coordinates>` to add extensions from a Maven repository.

## [](#performance-improvements)Performance improvements

Despite adding more auto-configuration, Spring Boot 1.2 should actually be slightly faster than 1.1. We've tried to optimize the code-base as much as possible and do lots of little tricks to make the startup time as fast as possible. The Tomcat sample application starts in well under 3 seconds on most machines.

## [](#numerous-other-changes)Numerous other changes

We've made many other small improvements and enhancements for Spring Boot 1.2. There is better JNDI support, enhanced banner support, support for "Spring Cloud Connectors", improved Spring MVC defaults and a new email "starter POM". Additionally, support for third-party libraries has been extended to cover [Log4J2](http://logging.apache.org/log4j/2.x/), [GSON](https://code.google.com/p/google-gson/) and [Jersey](https://jersey.java.net/). For a complete list of the changes please refer to the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.2-Release-Notes) and the [updated reference guide](http://docs.spring.io/spring-boot/docs/1.2.x/reference/htmlsingle).

  

Thanks again to everyone that continues to support and contribute to Spring Boot. Many of the enhancements in this release were contributed or driven by the community. Please keep up the good work and continue to raise [issues](https://github.com/spring-projects/spring-boot/issues) and [pull requests](https://github.com/spring-projects/spring-boot/pulls)!

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/1.2.0.RELEASE/reference/htmlsingle)