---
title: Spring Native 0.10.0 available now
source: https://spring.io/blog/2021/06/14/spring-native-0-10-0-available-now
scraped: 2026-02-23T13:21:16.960Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Sébastien Deleuze |  June 14, 2021 | 1 Comment
---

# Spring Native 0.10.0 available now

_Releases | Sébastien Deleuze |  June 14, 2021 | 1 Comment_

On behalf of the team and everyone who has contributed, I’m happy to announce that Spring Native 0.10.0 has been released. It is based on [Spring Boot 2.5](https://spring.io/blog/2021/05/20/spring-boot-2-5-is-now-ga) and [GraalVM 21.1](https://www.graalvm.org/release-notes/21_1/).

This release is packed with features, highlights include:

-   Introduction of native testing.
    
-   A new official Gradle plugin from the GraalVM team.
    
-   Introduction of ahead-of-time proxies usable on classes.
    

It also includes [43 bug fixes, documentation improvements, and dependency upgrades](https://github.com/spring-projects-experimental/spring-native/releases/tag/0.10.0). Thanks to all those who have contributed with issue reports and pull requests.

[Josh Long](https://twitter.com/starbuxman) has crafted a great video to present those new features, so check this out:

## [](#native-testing-and-gradle-plugin)[](#native-testing-and-gradle-plugin)Native testing and Gradle plugin

We have been collaborating with the GraalVM team on bringing native image to the next level in terms of build plugins. The new [native build tools](https://github.com/graalvm/native-build-tools) replace the former `native-image-maven-plugin` and allow to build and test your native application using a local `native-image` compiler.

While only Maven support was previously available, now both Maven and Gradle plugins are provided. If you are upgrading, the new Maven plugin coordinates are `org.graalvm.buildtools:native-maven-plugin:0.9.0`. After [configuring the native build tools plugin](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#_add_the_native_build_tools_plugin), you can build your application with `mvn -Pnative -DskipTests package` or `gradle nativeBuild`. But you can also run your JUnit 5 tests as a native image with `mvn -Pnative test` or `gradle nativeTest`. Spring Native itself has been upgraded to add initial testing support so your `@SpringBootTest` will run as a native image. This is an important milestone for native Spring Boot applications, but also for the JVM ecosystem including Spring itself which can now use those official plugins to improve the quality and the maintainability of the native support. You can read this [GraalVM dedicated blog post](https://medium.com/graalvm/gradle-and-maven-plugins-for-native-image-with-initial-junit-testing-support-dde00a8caf0b) for more details.

[start.spring.io](https://start.spring.io) has been updated to configure the native build tools out-of-the-box in addition to the Buildpacks native support, so you can use the one that fits your needs.

## [](#ahead-of-time-proxies-usable-on-classes)[](#ahead-of-time-proxies-usable-on-classes)Ahead-of-time proxies usable on classes

With native images, proxies need to be defined at build time. Until now, Spring Native had just support for JDK proxies usable only on interfaces. Proxies on classes typically handled on the JVM via CGLIB proxies were not supported because generating bytecode at runtime is not supported in native world.

```
Copy// Typical security use case of a class proxy now supported on native
@Service
public class GreetingService {

    public String hello() {
        return "Hello!";
    }

    @PreAuthorize("hasRole('ADMIN')")
    public String adminHello() {
        return "Goodbye!";
    }
}
```

But as of 0.10, thanks to the amazing Andy Clement, proxies on classes can now be generated at build-time via the `@AotProxyHint` annotation. Please notice the former `@ProxyHint` has been renamed to `@JdkProxyHint` to avoid confusion.

It allows to support security, transactions and a wide range of other proxy-based mechanisms on classes. Please notice we will refine auto-detection of such pattern to reduce the amount of explicit hints needed.

## [](#next-step--functional-configuration-aot-transformation)[](#next-step-functional-configuration-aot-transformation)Next step : functional configuration AOT transformation

Based on what we learnt in [Spring Fu](https://github.com/spring-projects-experimental/spring-fu) and [Spring Init](https://github.com/spring-projects-experimental/spring-init) experimental projects, our upcoming [0.11 release](https://github.com/spring-projects-experimental/spring-native) will be focused on introducing functional configuration AOT transformation in order to reduce significantly the amount of reflection for Spring configuration infrastructure. The goal here is to transform Spring configuration in a way that could be understood out-of-the-box by the native image static analysis. This should both optimize the memory footprint and improve the native compatibility of Spring applications.