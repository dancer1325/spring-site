---
title: The path towards Spring Boot native applications
source: https://spring.io/blog/2020/06/10/the-path-towards-spring-boot-native-applications
scraped: 2026-02-23T13:57:16.774Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  June 10, 2020 | 10 Comments
---

# The path towards Spring Boot native applications

_Engineering | Sébastien Deleuze |  June 10, 2020 | 10 Comments_

I would like to use the opportunity of our [Spring GraalVM Native](https://github.com/spring-projects-experimental/spring-graalvm-native) 0.7.0 release to give you a status update about our work on Spring Boot native images.

## [](#why)[](#why)Why?

[Native image](https://www.graalvm.org/docs/reference-manual/native-image/) provides a way to build and run Spring Boot applications with different characteristics than a regular JVM deployment:

-   The output is a native executable that contains your application with a subset of the JDK and the dependencies required to run it.
    
-   In practice the executable would likely be shipped in an highly optimized container image (`FROM scratch` Docker image is supported) with reduced surface attack which is good fit with Kubernetes.
    
-   Startup time is almost instant and peak performance is available immediately, allowing support for scale-to-zero (serverless) applications including for regular Spring Boot web applications.
    
-   Memory consumption is reduced, which is a good fit for systems split into multiple microservices.
    

As you would expect, native images are not a free lunch and those interesting capabilities come with a few drawbacks:

-   GraalVM native is a young platform which is far less mature than the JVM.
    
-   This new flavor of Java is not yet well supported and tested by JVM libraries.
    
-   It requires initialization, resources, reflection and proxy explicit configuration.
    
-   Build time is very long and build memory consumption is high.
    
-   Lower throughput and higher latency ([more details](#comment-4948722189) ).
    

Obviously native image is a moving target and some of those characteristics are likely to evolve in the future. The Spring team currently collaborates actively with the GraalVM team in order to ensure Spring and more globally the JVM ecosystem integrated via Spring Boot works well when compiled as native images. This effort includes [fixes and new features in GraalVM native](https://github.com/oracle/graal/issues?q=is%3Aissue+is%3Aopen+label%3Aspring), [changes to Spring itself](https://github.com/spring-projects/spring-framework/issues/22968#issuecomment-638136709), but also additional work to improve testability and maintainability with this GraalVM native platform.

It is also worth noticing that the scope of native images is now wider than GraalVM since Mark Reinhold has recently announced [Project Leyden](https://mail.openjdk.java.net/pipermail/discuss/2020-April/005429.html), an effort to standardize native images at Java platform level.

## [](#spring-graalvm-native-070)[](#spring-graalvm-native-0-7-0)Spring GraalVM Native 0.7.0

I am happy to announce that Spring GraalVM Native 0.7.0 is available. [`spring-graalvm-native`](https://github.com/spring-projects-experimental/spring-graalvm-native) is the experimental project where we currently incubate native image support for Spring Boot applications, and this new milestone introduces improvements like:

-   [Spring Boot 2.3.0](https://spring.io/blog/2020/05/15/spring-boot-2-3-0-available-now) and [GraalVM 20.1.0](https://www.graalvm.org/docs/release-notes/20_1/%7C) baseline.
    
-   Petclinic JPA canonical sample with actuators, Spring Data JPA repositories and caching.
    
-   Spring Data MongoDB support.
    
-   Improved Kotlin support.
    
-   Improved logging support.
    
-   Spring Cloud Function support.
    
-   [Container-based build environment](https://github.com/spring-projects-experimental/spring-graalvm-native#using-container-based-build-environment).
    

You can read the [detailed changelog](https://github.com/spring-projects-experimental/spring-graalvm-native/milestone/3?closed=1) and the [documentation](https://repo.spring.io/milestone/org/springframework/experimental/spring-graalvm-native-docs/0.7.0/spring-graalvm-native-docs-0.7.0.zip!/reference/index.html). There are also other improvements that deserve a deeper dive.

### [](#dedicated-functional-spring-applications-support)[](#dedicated-functional-spring-applications-support)Dedicated functional Spring applications support

You may know it if you have following my work on [Spring Fu](https://github.com/spring-projects-experimental/spring-fu), it is possible to configure Spring Boot applications with functional bean registration instead of `@Configuration`.

To illustrate the principle, take following annotation-based configuration:

```
Copy@Configuration
public class SampleConfiguration {

    @Bean
    public Foo foo() {
        return new Foo();
    }

    @Bean
    public Bar bar(Foo foo) {
        return new Bar(foo);
    }
}
```

It will translate to the following functional alternative:

```
Copypublic class SampleInitializer
      implements ApplicationContextInitializer<GenericApplicationContext> {

    @Override
    public void initialize(GenericApplicationContext context) {
        context.registerBean(Foo.class, () -> new Foo());
        context.registerBean(Bar.class, () -> new Bar(context.getBean(Foo.class)));
    }
}
```

An interesting characteristic of such lambda-based configuration mechanism is that it requires no GraalVM native reflection configuration since it is natively understood by GraalVM native compiler, including its capability to remove unused code at build time with a per method/field granularity.

Notice that the conversion from `@Configuration` to functional configuration could be done at build time automatically, as explored in [spring-init](https://github.com/spring-projects-experimental/spring-init/) project. This opens the door to benefit from functional configuration at infrastructure level while keep using `@Configuration` at programming model level.

That’s why `spring-graalvm-native` now supports a `functional` mode in addition to the `agent` and `feature` ones. You can have a look to [`jafu`](https://github.com/spring-projects-experimental/spring-graalvm-native/tree/master/spring-graalvm-native-samples/jafu) and [`jafu-webmvc`](https://github.com/spring-projects-experimental/spring-graalvm-native/tree/master/spring-graalvm-native-samples/jafu-webmvc) samples to see concrete examples of Spring applications running without GraalVM native reflection configuration.

### [](#maven-test-driven-configuration-generation)[](#maven-test-driven-configuration-generation)Maven test driven configuration generation

Another area of work for us is collaborating with GraalVM native team in order to make it easier to leverage the tracing agent which tracks, on the JVM, resource, proxy, and reflection usage to generate the related GraalVM native configuration. As of GraalVM 20.1.0, it is possible to leverage [access filters](https://github.com/oracle/graal/blob/master/substratevm/CONFIGURE.md#access-filters) to exclude packages and classes from the generated configuration.

We take advantage of this new capability in the [`commandlinerunner-agent`](https://github.com/spring-projects-experimental/spring-graalvm-native/tree/master/spring-graalvm-native-samples/commandlinerunner-agent) sample where the Maven Surefire plugin responsible for running tests is configured as follows:

```
Copy<plugin>
	<groupId>org.apache.maven.plugins</groupId>
	<artifactId>maven-surefire-plugin</artifactId>
	<configuration>
		<argLine>-agentlib:native-image-agent=access-filter-file=access-filter.json,config-output-dir=target/classes/META-INF/native-image</argLine>
	</configuration>
</plugin>
```

With `access-filter.json` excluding test related packages.

```
Copy{ "rules": [
  {"excludeClasses": "org.apache.maven.surefire.**"},
  {"excludeClasses": "net.bytebuddy.**"},
  {"excludeClasses": "org.apiguardian.**"},
  {"excludeClasses": "org.junit.**"},
  {"excludeClasses": "org.mockito.**"},
  {"excludeClasses": "org.springframework.test.**"},
  {"excludeClasses": "org.springframework.boot.test.**"},
  {"excludeClasses": "com.example.commandlinerunner.test.**"}
  ]
}
```

This allows to integrate such configuration somewhat nicely in Maven lifecycle (expect more work here). Notice that due to [this oracle/graal#2490 bug](https://github.com/oracle/graal/issues/2490) exclusion of proxy configuration does not work yet but that should be fixed in upcoming GraalVM 20.1.1 release.

### [](#reduced-memory-footprint)[](#reduced-memory-footprint)Reduced memory footprint

We are only starting our effort for [optimizing Spring Boot native images memory footprint](https://github.com/spring-projects-experimental/spring-graalvm-native/issues/109), but the first results are already promising. In this 0.7.0 milestone, we have focused on optimizing functional Spring Boot application (the `jafu` and `jafu-webmvc` samples) to have a better idea of the footprint that Spring infrastructure can reach when the `native-image` compiler is able to perform code removal more aggressively on unused codepaths.

We have also make sure that the part of Spring infrastructure not compatible with native-images such as CGLIB proxy support is removed at build time, and have introduced some flags to remove some parts of the infrastructure at build time as well:

-   `-Dspring.native.remove-yaml-support=true` removes Yaml support.
    
-   `-Dspring.native.remove-xml-support=true` removes XML support.
    
-   `-Dspring.native.remove-spel-support=true` removes SpEL support.
    
-   `-Dspring.native.remove-jmx-support=true` removes JMX support.
    

These figures will evolve significantly in upcoming months, especially with more optimizations planned for our next 0.8.0 release, but we can already see that native images allow a pretty efficient memory comsumption:

-   A Spring Boot native image with Spring MVC REST endpoints consumes **78M** of RSS memory.
    
-   A Spring Boot native image with Spring MVC REST endpoints configured in a functional way consumes **39M** of RSS memory.
    

We are also working on Tomcat optimizations for native images that will allow to reduce even more this footprint.

## [](#next-steps)[](#next-steps)Next steps

In parallel with the work done on `spring-graalvm-native`, we are working on [improving adaptive code paths in Spring Framework 5.3](https://github.com/spring-projects/spring-framework/issues/25179) and related Spring Data and Spring Boot releases in order to increase the level of infrastructure removed at build time. We are also going to add flags to remove at build time [XML](https://github.com/spring-projects/spring-framework/issues/25151) or [SpEL](https://github.com/spring-projects/spring-framework/issues/25153) support. Those flags will be usable on the JVM as well.

Our next [0.8.0 milestone](https://github.com/spring-projects-experimental/spring-graalvm-native/milestone/5) is expected to be a major one, with the introduction of some new features:

-   A [dedicated hybrid mode](https://github.com/spring-projects-experimental/spring-graalvm-native/issues/103) that will in a nutshell use the GraalVM tracing agent for Spring infrastructure and a lightweight additional configuration dynamically computed at build time for user classes (like `@Controller` annotated ones) in order to avoid having to exercise all the codepaths.
    
-   Leverage Spring Framework 5.3 milestones to enable removal of most of the substitutions in `spring-graalvm-native` side since they are unmaintainable by nature.
    
-   Introduce a [classpath reduction mechanism](https://github.com/spring-projects-experimental/spring-graalvm-native/issues/151) for `agent` and `hybrid` modes in order to achieve a lazy class loading behavior on native image closer to what happens on the JVM.
    
-   Experiment around [removing the need for reflection configuration](https://github.com/spring-projects-experimental/spring-graalvm-native/issues/164) via functional bean registration.
    
-   Better Spring Data support.
    
-   [Document Visual Studio Code remote container developer experience](https://github.com/spring-projects-experimental/spring-graalvm-native/issues/154).
    

This roadmap is likely to evolve, but it will hopefully give you a sense of the direction we will follow.

## [](#conclusion)[](#conclusion)Conclusion

This 0.7.0 release would not have been possible without the huge work of [Andy Clement](https://spring.io/team/aclement), so kudos to him as well as to the other contributors: [Filip Hannik](https://spring.io/team/fhanik) on Tomcat support, [Christoph Strobl](https://spring.io/team/christophstrobl) on Spring Data support and [Dave Syer](https://spring.io/team/dsyer) for his endless efforts on getting regular Petclinic sample working as well as on [Spring Cloud Function support](https://spring.io/projects/spring-cloud-function).

What is unique about this incubating native image support for Spring Boot applications is that we not only target new Spring Boot applications, but also the millions of existing ones to give you more deployment options depending on your needs. This is a big challenge, and we are not quite yet at a stage where everything 'just works' for every Spring Boot application, but we are progressing in the right direction.

Finally, it is worth mentioning that whilst many of the enhancements are being driven from an intent to create optimal native images, these changes will improve not only the native-image story but also how Spring boot applications run on a regular JVM.

If you want to learn more you can read the [documentation](https://repo.spring.io/milestone/org/springframework/experimental/spring-graalvm-native-docs/0.7.0/spring-graalvm-native-docs-0.7.0.zip!/reference/index.html) in order to try it on a simple project or [play with the samples](https://github.com/spring-projects-experimental/spring-graalvm-native#play-with-the-samples). Looking forward to your feedback.