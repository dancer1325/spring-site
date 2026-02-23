---
title: Announcing Spring Native Beta!
source: https://spring.io/blog/2021/03/11/announcing-spring-native-beta
scraped: 2026-02-23T12:47:21.983Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  March 11, 2021 | 39 Comments
---

# Announcing Spring Native Beta!

_Engineering | Sébastien Deleuze |  March 11, 2021 | 39 Comments_

Today, after one year and half of work, I am pleased to announce that we’re launching the beta release of [Spring Native](https://github.com/spring-projects-experimental/spring-native) and its availability on [start.spring.io](https://start.spring.io/)!

In practice, that means that in addition to the regular Java Virtual Machine supported by Spring since its inception, we are adding beta support for compiling Spring applications to [native images](https://www.graalvm.org/reference-manual/native-image/) with [GraalVM](https://www.graalvm.org/) in order to provide a new way to deploy Spring applications. Java and Kotlin are supported.

Those native Spring applications can be deployed as a standalone executable (no JVM installation required) and offer interesting characteristics including almost instant startup (typically < 100ms), instant peak performance and lower memory consumption at the cost of longer build times and fewer runtime optimizations than the JVM.

![Native Spring Boot web application starting in 38 ms](https://static.spring.io/blog/sdeleuze/20210311/spring-native-startup.png)

With simple `mvn spring-boot:build-image` or `gradle bootBuildImage` commands, you can generate an optimized container image that will contain a minimal OS layer and a small native executable that ships just the required bits from the JDK, Spring and the dependencies that you are using in your application. See for example below a minimal container image with a 50MB executable containing Spring Boot, Spring MVC, Jackson, Tomcat, the JDK and the application.

![Minimal container image with a 50MB executable containing: Spring Boot](https://static.spring.io/blog/sdeleuze/20210311/spring-native-container.png)

There is wide range of use cases where native could make sense for your Spring application:

-   Serverless with Spring Cloud Function
    
-   Cheaper and more sustainable hosting of your Spring microservices
    
-   Good fit with Kubernetes platforms like [VMware Tanzu](https://tanzu.vmware.com/)
    
-   Want to create optimal container images packaging your Spring applications and services
    

I am sure the amazing Spring community will find more, like [this great tutorial](https://piotrminkowski.com/2021/03/05/microservices-on-knative-with-spring-boot-and-graalvm/) from Piotr Mińkowski about how to build native microservices on [Knative](https://knative.dev/) with Spring Boot and GraalVM.

## [](#team-work)[](#team-work)Team work

Spring Native beta is the result of a wide collaboration across the Spring team and its portfolio of projects: Spring Framework, Spring Boot but also Spring Data, Spring Security, Spring Cloud and Spring Initializr. Check this video to watch the Spring team explaining how we built Spring Native beta and what it provides, including a demo of the brand new [start.spring.io](https://start.spring.io/) support.

The scope of our native effort is wider than Spring, since native concerns the wider JVM ecosystem, so we have been collaborating with the GraalVM team in order to improve native image compatibility and footprint. Here is a quote from [Vojin Jovanovic](https://twitter.com/vojjov) from the GraalVM team:

“It is a great joy to collaborate with the Spring team on crafting the native JVM ecosystem: their deep technical knowledge, wrapped with sensitive touch for the community always leads to the best solutions. The latest Spring Native release, and its numerous usages in the JVM ecosystem, pave the way for the wide adoption of native compilation.”

## [](#scope-of-the-support)[](#scope-of-the-support)Scope of the support

With Spring Native graduating from alpha to beta, I think it is important to clarify the scope of the support we provide.

Alpha was the first step where we experimented a lot and refined the Spring Native (previously named Spring GraalVM Native) architecture, compatibility and footprint on a set of samples with a lot of breaking changes. We also reported [a lot of issues](https://github.com/oracle/graal/labels/spring) that the GraalVM team fixed in order to reduce the gap between JVM and native for Spring applications.

While it is still considered as experimental, beta means that Spring now provides [support for native on a subset of the Spring ecosystem](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#support). You can try it on your projects if they are using the supported dependencies and [raise bugs](https://github.com/spring-projects-experimental/spring-native/issues) or [contribute pull requests](https://github.com/spring-projects-experimental/spring-native/pulls) if something goes wrong. A new release of Spring Native will happen for each patch release of the latest Spring Boot 2.x minor version. Spring Native 0.9.0 supports Spring Boot 2.4.3, Spring Native 0.9.1 will support Spring Boot 2.4.4, etc. Breaking changes will happen but we will document migration paths. The documentation quality has reached a new level : the reference documentation is available as [html single page](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/) or [pdf](https://docs.spring.io/spring-native/docs/current/reference/pdf/spring-native-reference.pdf), and we publish [Javadoc for the native hints public API](https://docs.spring.io/spring-native/docs/current/api/).

## [](#startspringio)[](#start-spring-io)start.spring.io

[Stéphane Nicoll](https://twitter.com/snicoll) has introduced support for Spring Native on [start.spring.io](https://start.spring.io/) and related IDE integrations, so as of today this is probably the simplest way to explore how to build a native application with Spring.

![Spring Native support on start.spring.io](https://static.spring.io/blog/sdeleuze/20210311/spring-native-initializr.png)

Adding the Spring Native dependency will automatically configure your Maven or Gradle project with the required dependency and plugin to support native. The application code itself is unchanged.

Make sure to check the generated `HELP.md` file which contains useful links and documentation, but also indicates if you have selected some dependencies not known to be supported on native.

## [](#ahead-of-time-transformations)[](#ahead-of-time-transformations)Ahead-of-time transformations

Native is different from the JVM : the classpath is fixed at build time, configuration is required for reflection or resources for example, there is no class lazy loading (everything shipped in the executable is loaded in memory on startup) and some code can be invoked at build time.

In order to fully embrace those characteristics and allow Spring applications to run with maximal compatibility and minimal footprint on native, [Brian Clozel](https://twitter.com/bclozel) has introduced in this release Spring ahead-of-time (AOT) Maven and Gradle plugins, which perform ahead-of-time transformations on your application.

The first kind of transformation intends to generate GraalVM native configuration (reflection, resources, proxies, native-image options) based on an inference engine designed and implemented by the amazing [Andy Clement](https://twitter.com/andy_clement), which understands what Spring programming model and infrastructure is. For example, for each class annotated by `@Controller`, an entry will be added to a generated [`reflect-config.json`](https://www.graalvm.org/reference-manual/native-image/Reflection/#manual-configuration) file.

Some native configuration can not be inferred, for those cases we are introducing [native hint annotations](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#native-hints) (see the [Javadoc](https://docs.spring.io/spring-native/docs/0.9.0-SNAPSHOT/api/) for more details) which allows Spring Native to support native configuration in a more maintainable, typesafe and flexible way than regular JSON based native image configuration. For example the MySQL driver support with Spring Native provides hints that will allow generation of the right entries in native image `reflect-config.json`, `resource-config.json` and `native-image.properties` as follows:

```
Copy@NativeHint(
    trigger = Driver.class,
    options = "--enable-all-security-services",
    types = @TypeHint(types = {
       FailoverConnectionUrl.class,
       FailoverDnsSrvConnectionUrl.class,
       // ...
    }), resources = {
	@ResourceHint(patterns = "com/mysql/cj/TlsSettings.properties"),
	@ResourceHint(patterns = "com.mysql.cj.LocalizedErrorMessages",
                      isBundle = true)
})
public class MySqlHints implements NativeConfiguration {}
```

`NativeConfiguration` and others [dynamic configuration mechanisms](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#how-to-contribute-dynamic-native-configuration) allow more powerful and dynamic configuration generation, but beware their APIs will evolve a lot in upcoming versions.

Spring developers can also directly annotate their `@Configuration` or `@SpringBootApplication` classes with application-specific native hints, for example for serializing a `Book` class as JSON by programmatic APIs like `RestTemplate` or `WebClient`:

```
Copy@TypeHint(types = Book.class)
@SpringBootApplication
public class WebClientApplication {
    // ...
}
```

The last and probably most powerful mechanism available when working with the ahead-of-time transformation system is the capability to automatically generate native-optimized code (source and bytecode) using the closed-world assumptions introduced by Spring Boot deployment model combined with GraalVM native image characteristics. The goal here is to limit the amount of required extra native configuration to increase the compatibility, by using code constructs that can be analyzed out of the box by the native image compiler, and lower the footprint by reducing the amount of configuration required for reflection, resources or proxies. A concrete example of that is an ahead-of-time transformation of the various [`spring.factories`](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-project/spring-boot-autoconfigure/src/main/resources/META-INF/spring.factories) (the extension mechanism behind Spring Boot) to an optimized programmatic version that requires no reflection and that filters out unnecessary entries in the context of your application.

This is just a start for Spring AOT, we intend to add even more powerful transformations like [`@Configuration` to functional configuration](https://github.com/spring-projects-experimental/spring-native/issues/386) to replace runtime reflection by an ahead-of-time analysis that will automatically generate configuration classes that will use programmatic constructs like lambdas and method references. This will allow the GraalVM native image compiler to understand Spring configurations out of the box without needing any reflection configuration or `*.class` resources.

A key point to keep in mind is that this AOT generated code is also used by default on the JVM when using Spring Native in order to allow you to exercise the “native friendly code path” with the short feedback loop that the JVM allows, with your debugger and all your regular tooling.

While Spring AOT transformations are currently mainly driven by native needs, a lot of those are not native specific and it is possible that some could provide optimizations for running Spring Boot applications on the JVM. As usual for this kind of topic, it is important to be data driven so we will measure efficiency and performances to drive our decisions.

We will likely refine the IDE integration, for now make sure to read the [related documentation](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#_intellij_idea) for potential manual configuration step to update the generated sources before running the application in your IDE.

## [](#conclusion)[](#conclusion)Conclusion

There are two main pillars in the Spring strategy to go native. The first one is to adapt Spring infrastructure for native without requiring significant changes to the millions of existing Spring Boot applications. That includes changes we make in Spring top-level projects to be native friendly, the infrastructure like `@NativeHint` and the Spring AOT build plugins that we are maturing in Spring Native. Check our [roadmap](https://github.com/spring-projects-experimental/spring-native/milestones) for more information about the upcoming steps.

The second pillar is wider than Spring itself, native is a platform with different characteristics than the JVM, but the Java ecosystem needs to be as consistent as possible in order to avoid two very different flavors of Java that will be challenging to maintain. That’s why we collaborate intensively with the GraalVM team to reduce this gap. This collaboration is going to focus on improving native testing and native configuration for the wider JVM ecosystem in the upcoming months.

Spring developers can learn more about native with the various [samples](https://github.com/spring-projects-experimental/spring-native/tree/master/samples) we provide, go on [start.spring.io](https://start.spring.io/) to test our new native support, read the updated [reference guide](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/), read the [release notes](https://github.com/spring-projects-experimental/spring-native/releases/tag/0.9.0) especially if you are upgrading from a previous version, or even [contribute](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#how-to-contribute) the support for your favorite dependency. You can also [contact us](mailto:ask@spring.io) if you want to learn more about related Spring commercial support.

I will finish by a big thank you to the Spring community that has already provided a lot of useful feedback and contribution, to the GraalVM team for this amazing collaboration and to the wider Spring team who has worked hard to make native adoption easier for Spring developers.

Enjoy!