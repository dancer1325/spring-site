---
title: Spring Boot 0.5.0.M5 Released
source: https://spring.io/blog/2013/10/09/spring-boot-0-5-0-m5-released
scraped: 2026-02-24T07:56:27.540Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  October 09, 2013 | 0 Comments
---

# Spring Boot 0.5.0.M5 Released

_Releases | Dave Syer |  October 09, 2013 | 0 Comments_

Spring Boot 0.5.0.M5 is available in the [Spring repo](http://repo.spring.io/milestone/org/springframework/boot/org/springframework/boot/). Instructions for installing and using are on the [project website](http://projects.spring.io/spring-boot/docs/README.html) or in [github](https://github.com/spring-projects/spring-boot). Loads of new features including:

-   Autoconfigure support for JMS, AMQP, AOP, Mobile, MongoDB
-   Simplified `@Grab` usage (see example below)
-   A test command for Groovy scripts (supporting JUnit and Spock, more detail coming on that in a blog from [Greg](http://spring.io/team/gturnquist))
-   A new `SpringApplicationBuilder` with support for, amongst other things, application context hierarchies
-   A new `PropertiesLauncher` that can launch a Java application from properties discovered at runtime (e.g. to set up a classpath from a lib directory)

As a taster, here is an example usage of `SpringApplicationBuilder` in Java to build an application with a parent context (useful if you want to run more than one app from the same code):

```java
Copy@Configuration
@EnableAutoConfiguration
public class Server {

	public static void main(String[] args) {
		new SpringApplicationBuilder(Parent.class)
                    .child(Server.class)
                    .profiles("server")
                    .run(args);
	}

        // ... @Bean definitions follow
}
```

The `Parent.class` above is a shared parent context that can be reused for other apps in the same module.

And here's an example of the abbreviated `@Grab` in a Groovy app (the group and version information are added automatically):

```groovy
Copy@Grab("spring-boot-starter-actuator")
@RestController
class Example {

	@RequestMapping("/")
	String home() {
		[message: 'Hello World']
	}
}
```

This app runs on its own, e.g. in the current directory if you use the `spring` shell script to launch it:

```
Copy$ spring run app.groovy
... (app starts up)
```

Visit [http://localhost:8080/](http://localhost:8080/) in a browser and then try [http://localhost:8080/metrics](http://localhost:8080/metrics).