---
title: Spring Session MongoDB 2.0.0.M3 released
source: https://spring.io/blog/2017/09/15/spring-session-mongodb-2-0-0-m3-released
scraped: 2026-02-23T16:22:04.355Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  September 15, 2017 | 2 Comments
---

# Spring Session MongoDB 2.0.0.M3 released

_Engineering | Greg L. Turnquist |  September 15, 2017 | 2 Comments_

Dear Spring Community,

Spring Session MongoDB 2.0.0.M3 is released. It is based on:

-   [Spring Session 2.0.0.M4](https://spring.io/blog/2017/09/15/spring-session-2-0-0-m4)
    
-   [Spring Data Kay-RC3](https://spring.io/blog/2017/09/11/spring-data-ingalls-sr7-and-kay-rc3-released)
    
-   Reactor Bismuth-M4
    
-   [Spring Framework 5.0.0.RC4](https://spring.io/blog/2017/09/11/spring-framework-5-0-rc4-available-now)
    

In this release, several new features have been added to simplify using it with your Spring WebFlux application.

```
Copy@EnableMongoWebSession
public class SpringWebFluxConfig {

}
```

All you must do is apply the `@EnableMongoWebSession` to any of your Spring configuration classes to activate session support with MongoDB. Additionally, you must provide a `ReactorMongoOperations` Spring bean, but if you’re using Spring Boot’s `spring-boot-starter-data-mongodb-reactive` starter, this is already provided.

`@EnableMongoWebSession` comes with the ability to set session-wide overrides including `maxInactiveIntervalInSeconds` and `collectionName`, to match the same features as the servlet-based `@EnableMongoHttpSession` annotation.

Note

`@EnableMongoWebSession` itself applies a Spring `@Configuration` annotation, so there is no need to apply the same annotation to your own configuration class.

Spring Session MongoDB, by default, uses the JDK-based serialization strategy and it is verified to support writing security context details out to MongoDB, making it seemless to integrate with Spring Security.

As mentioned in the [recent Spring Session blog post](https://spring.io/blog/2017/09/15/spring-session-2-0-0-m4#simplified-webflux-configuration), Spring Session MongoDB (through Spring Session and Spring WebFlux), leverages cookie-base session handling. This means that when a new session is created, the app will send back to the client a `set-cookie SESSION=…​` response header, and also check incoming web requests for a cookie named `SESSION`. But with Spring Framework 5.0.0.M4, there is now the opportunity to switch from cookies to a header-based strategy.

To change from cookies to headers, simply add this Spring bean to your configuration:

```
Copy@EnableMongoWebSession
public class SpringWebFluxConfig {

	@Bean
	HeaderWebSessionIdResolver headerBasedSessionIdResolver() {
	    return new HeaderWebSessionIdResolver();
	}
}
```

When creating a new session, `HeaderWebSessionIdResolver` will generate a `SESSION=…​` response header clients can pick up. And incoming web requests will be parsed for a `SESSION=…​` request header.

It’s also possible to change the name of the header as shown below:

```
Copy@EnableMongoWebSession
public class SpringWebFluxConfig {

	@Bean
	HeaderWebSessionIdResolver headerBasedSessionIdResolver() {
	    HeaderWebSessionIdResolver resolver = new HeaderWebSessionIdResolver();
	    resolver.setHeaderName("MyCustomHeaderName"); // Use this instead of SESSION for the header
	    return resolver;
	}
}
```

With all this, you’re geared up to use Spring Session MongoDB for session management, and tailor it as you wish!

Important

In the past, Spring Session MongoDB would use Jackson-based serialization if it detected Jackson on the classpath. Since we’ve switched to JDK-based serialization, and not having it jump purely based on classpath settings, it’s recommended that any running applications may have to drop existing sessions and reinitialize.

In the meantime, you can get the bits today if you visit the project site, get the coordinates, and *include the version number* in your Spring Boot application.

[Project Site](http://projects.spring.io/spring-session-data-mongodb/) | [Reference](http://docs.spring.io/spring-session-data-mongodb/docs/2.0.0.M3/reference/htmlsingle/) | [Help](https://stackoverflow.com/questions/tagged/spring-session+mongodb)