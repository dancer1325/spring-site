---
title: Spring Boot – Simplifying Spring for Everyone
source: https://spring.io/blog/2013/08/06/spring-boot-simplifying-spring-for-everyone
scraped: 2026-02-24T08:00:43.289Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  August 06, 2013 | 7 Comments
---

# Spring Boot – Simplifying Spring for Everyone

_Engineering | Phil Webb |  August 06, 2013 | 7 Comments_

*(This blog post was written jointly by [Phil Webb](http://blog.springsource.org/author/pwebb/) and [Dave Syer](http://blog.springsource.org/author/dsyer/)).*

We are pleased to announce the first milestone release of a new project called [Spring Boot](https://github.com/SpringSource/spring-boot).

Spring Boot aims to make it easy to create Spring-powered, production-grade applications and services with minimum fuss. It takes an opinionated view of the Spring platform so that new and existing users can quickly get to the bits they need. You can use it to create stand-alone Java applications that can be started using `'java -jar'` or more traditional WAR deployments. We also provide a command line tool that runs 'spring scripts'.

The diagram below shows Spring Boot as a point of focus on the larger Spring ecosystem. It presents a small surface area for users to approach and extract value from the rest of Spring:

![Spring Boot in Context](http://blog.springsource.org/wp-content/uploads/2013/08/spring.png)

The primary goals of Spring Boot are:

-   To provide a radically faster and widely accessible 'getting started' experience for all Spring development
-   To be opinionated out of the box, but get out of the way quickly as requirements start to diverge from the defaults
-   To provide a range of non-functional features that are common to large classes of projects (e.g. embedded servers, security, metrics, health checks, externalized configuration)

Spring Boot does *not* generate code and there is absolutely **no** requirement for XML configuration.

## [](#spring-scripts)Spring Scripts

Spring Boot ships with a small command line application that can be used to run 'spring scripts'. Spring scripts are written in [Groovy](http://groovy.codehaus.org/), which means that you have a familiar Java-like syntax, without so much boilerplate code. We are able to deduce a lot of information simply by looking at the way you have written your script. For example, here is a simple web application:

```java
Copy@Controller
class ThisWillActuallyRun {

    @RequestMapping("/")
    @ResponseBody
    String home() {
        return "Hello World!"
    }

}
```

When you run this application using `'spring run webapp.groovy'` a number things are happening:

-   Your script is enhanced with common `'import'` statements to save you typing them
-   We recognize the `@ResponseBody` annotation and download appropriate Spring JARs
-   We automatically create the Spring `@Configuration` that you would otherwise need to write
-   We start up an embedded servlet container and handle incoming requests on port 8080

The command line tool recognizes a number of different types of Spring Applications, including Web, Batch and Integration. There are a number of [samples available in the GitHub repository](https://github.com/SpringSource/spring-boot/tree/master/spring-boot-cli/samples).

## [](#spring-boot-with-java)Spring Boot with Java

You don't need use the command line tool or write Groovy code to get the benefits of Spring Boot. We also have first class Java support. For example, here is the same application written in Java:

```java
Copyimport org.springframework.boot.*;
import org.springframework.boot.autoconfigure.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@Controller
@EnableAutoConfiguration
public class SampleController {

    @RequestMapping("/")
    @ResponseBody
    String home() {
        return "Hello World!";
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(SampleController.class, args);
    }
}
```

Other than import statements, the main difference between this example and the earlier Groovy script is the `main()` method that calls `SpringApplication` and the `@EnableAutoConfiguration` annotation.

Obviously with Java you also need a build system to compile and package your code. We provide a number of convenient 'starter' POMs that you can use with [Maven](http://maven.apache.org/), [Gradle](http://www.gradle.org/) or [Ant](http://ant.apache.org/)+[Ivy](http://ant.apache.org/ivy/) to quickly grab appropriate dependencies. For example, the application above would need just a single dependency to the `spring-boot-starter-web` module.

We also provide Maven and Gradle plugins that allow you to package a fully self contained 'fat jar' that can be started from the command line:

$ java -jar myproject.jar
  .   \_\_\_\_          \_            \_\_ \_ \_
 /\\\\ / \_\_\_'\_ \_\_ \_ \_(\_)\_ \_\_  \_\_ \_ \\ \\ \\ \\
( ( )\\\_\_\_ | '\_ | '\_| | '\_ \\/ \_\` | \\ \\ \\ \\
 \\\\/  \_\_\_)| |\_)| | | | | || (\_| |  ) ) ) )
  '  |\_\_\_\_| .\_\_|\_| |\_|\_| |\_\\\_\_, | / / / /
 =========|\_|==============|\_\_\_/=/\_/\_/\_/
 :: Spring Boot ::   v0.0.0.BUILD.SNAPSHOT

2013-07-31 00:08:16.117  INFO 56603 --- \[           main\] o.s.b.s.app.SampleApplication   : Starting SampleApplication v0.1.0 on mycomputer with PID 56603 (/apps/myapp.jar started by pwebb)
2013-07-31 00:08:16.166  INFO 56603 --- \[           main\] ationConfigEmbeddedWebApplicationContext : Refreshing org.springframework.boot.context.embedded.AnnotationConfigEmbeddedWebApplicationContext@6e5a8246: startup date \[Wed Jul 31 00:08:16 PDT 2013\]; root of context hierarchy

## [](#production-ready)Production Ready

Spring Boot also includes helpful features that you often need when you push an application into production. We can automatically provide web endpoints that you can use to monitor application health, provide basic metrics or use to analyze production issues (such as thread deadlocks). We also provide a new `@ConfigurationProperties` annotation that you can use to externalize your application configuration (complete with support for JSR-303 `@Valid` annotations).

## [](#taking-it-for-a-spin)Taking it for a spin

Spring Boot 0.5.0.M1 is available now in the [Spring Milestone Repository](http://repo.springsource.org/milestone). If you want to try out any of the examples in this blog head over to the [GitHub project page](https://github.com/SpringSource/spring-boot#spring-boot) where you find detailed instructions. We are actively looking for early feedback so please feel free to [raise issues](https://github.com/SpringSource/spring-boot/issues) or [fork the repository](https://github.com/SpringSource/spring-boot/fork) and submit pull requests.

## [](#springone-2gx-2013-is-around-the-corner)SpringOne 2GX 2013 is around the corner

Book your place at [SpringOne in Santa Clara](http://www.springone2gx.com/conference/santa_clara/2013/09/home) soon. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback. Expect a number of significant new announcements this year. Check recent blog posts to see what I mean and there is more to come!