---
title: New AOT Engine Brings Spring Native to the Next Level
source: https://spring.io/blog/2021/12/09/new-aot-engine-brings-spring-native-to-the-next-level
scraped: 2026-02-23T12:47:27.019Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  December 09, 2021 | 9 Comments
---

# New AOT Engine Brings Spring Native to the Next Level

_Engineering | Sébastien Deleuze |  December 09, 2021 | 9 Comments_

On behalf of the team and everyone who has contributed, it is my pleasure to announce the release of [Spring Native 0.11](https://github.com/spring-projects-experimental/spring-native/releases/tag/0.11.0), which provides native support for Spring Boot 2.6. This ambitious release is the result of five months of hard work by the Spring team, who have been working on a brand new architecture to bring Spring support for creating native executables with GraalVM to the next level. You can already try it on [start.spring.io](https://start.spring.io/#!dependencies=native)!

Learn more about Spring Native 0.11 and see it in action in this new [Spring Tips](https://twitter.com/SpringTipsLive) video from Spring Developer Advocate Josh Long.

## [](#new-ahead-of-time-engine)[](#new-ahead-of-time-engine)New Ahead-Of-Time Engine

The biggest change is undoubtedly the introduction of a new AOT engine that performs a deep analysis of your Spring application at build-time to transform and optimize your application and generate the required GraalVM native configuration. Those transformations are performed by Maven and Gradle Spring AOT plugins.

![spring boot native](https://static.spring.io/blog/sdeleuze/20211209/spring-boot-native.png)

Taking a deeper look, the AOT engine evaluates conditions at build time in order to generate an optimized application context and Spring factories (the plugin system behind Spring Boot) specifically crafted for your application. In practice, that means:

-   Less Spring infrastructure to execute at runtime
    
-   Fewer conditions to evaluate at runtime
    
-   Less reflection, since [programmatic bean registration](https://spring.io/blog/2017/03/01/spring-tips-programmatic-bean-registration-in-spring-framework-5) is used
    

The AOT engine infers the native configuration required to run your application as a native executable based on the beans identified as active, knowledge of the Spring programming model, and native hints bundled with Spring Native or provided by your application itself.

![aot architecture](https://static.spring.io/blog/sdeleuze/20211209/aot-architecture.png)

We want to give special thanks to [Stéphane Nicoll](https://spring.io/team/snicoll) who led the design and the implementation of this new AOT engine.

## [](#reduced-memory-footprint)[](#reduced-memory-footprint)Reduced Memory Footprint

A key advantage of the AOT engine is that it supports smaller memory footprints for native executable because the native configuration is more accurate, less reflection is required, and less Spring infrastructure is required at runtime.

Spring Native 0.11 offers an average of between **20%** and **26%** footprint reduction compared to Spring Native 0.10! The following image shows data points for a few sample applications:

![native rss](https://static.spring.io/blog/sdeleuze/20211209/native-rss.png)

## [](#faster-startup)[](#faster-startup)Faster Startup

Startup times are **16%** to **35%** faster in Spring Native 0.11 compared to 0.10 because some processing has moved from runtime to build time. There is still room for improvement since we could not fine-tune Spring Boot and Spring Framework’s internal architecture in this minor version update.

![native startup](https://static.spring.io/blog/sdeleuze/20211209/native-startup.png)

## [](#improved-compatibility)[](#improved-compatibility)Improved Compatibility

The AOT engine is also much more accurate because it doesn’t try to analyze Spring annotations or the various types to replicate what Spring does at runtime. Instead, it forks a new process where it creates and introspects an application context at build-time (without starting it). That allows use of a subset of what Spring Framework does at runtime and works at the bean definition level, which is much more accurate.

## [](#runtime-flexibility)[](#runtime-flexibility)Runtime Flexibility

Performing those optimizations at build time means that there is less runtime flexibility than with the regular Spring Boot auto-configuration model. You can still change the HTTP port or the log level of your application when running an already compiled Spring Boot application, but you cannot add new beans at runtime by using a profile, for example.

That’s why, on the JVM, the AOT mode is optional. That’s an optimization that you can use if it fits with your needs. On native (which is, by design, much less dynamic at runtime), it is mandatory. Also, keep in mind that conditions are evaluated at build time for now. We will likely make that more flexible in the future so that it should fit with most use cases.

## [](#extension-points)[](#extension-points)Extension Points

The new engine offers a pluggable and modular architecture that users (like you, or the Spring project teams) can use to support various new features.

For example, see this implementation of the `BeanFactoryNativeConfigurationProcessor` extension point, which automatically creates a class proxy ahead of time for beans annotated with `@RequestScope` or `@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS)`:

```
Copypublic class ScopeNativeConfigurationProcessor implements BeanFactoryNativeConfigurationProcessor {

   @Override
   public void process(ConfigurableListableBeanFactory beanFactory, NativeConfigurationRegistry registry) {
       new BeanFactoryProcessor(beanFactory).processBeansWithAnnotation(Scope.class, (beanName, beanType) -> {
           Scope scope = beanFactory.findAnnotationOnBean(beanName, Scope.class);
           if (scope.proxyMode() == ScopedProxyMode.TARGET_CLASS) {
               registry.proxy().add(NativeProxyEntry.ofClass(beanType, ProxyBits.NONE,
                       ScopedObject.class, Serializable.class, AopInfrastructureBean.class));
           }
      });
   }
}
```

The `NativeConfiguration` extension point has been refined to offer an API by using `NativeConfigurationRegistry` as well:

```
Copypublic interface NativeConfiguration {
   default boolean isValid(AotOptions aotOptions) { return true; }
   default void computeHints(NativeConfigurationRegistry registry, AotOptions aotOptions) { return; }
}
```

Those extensions points are defined and then discovered in `META-INF/spring.factories`, so [you can provide your own](https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/#_programmatic_hints).

## [](#aot-testing-support)[](#aot-testing-support)AOT Testing Support

A very significant part of our work on Spring Native 0.11 has been on implementing testing support for the AOT codepath, in order to bring native testing support to a whole new level. The result is a very significant increase in compatibility, with many more kinds of tests supported.

Combined with the great JUnit 5 native support provided by the [Native Build Tools](https://github.com/graalvm/native-build-tools), it lets you run your Spring Boot, Spring Framework, or just plain JUnit tests, like on the JVM.

Unrelated to Spring, Mockito is not supported yet, but there is ongoing work to make it possible for it to work in the future.

## [](#aot-on-the-jvm)[](#aot-on-the-jvm)AOT on the JVM

Performing AOT transformation on an application that will run on the JVM has two key benefits.

The first one is to be able to easily debug the code that will run on native on the JVM (main application or tests) in your IDE, for example.

The second advantage is better efficiency. At the moment, it provides around a **4%** to **17%** smaller footprint.

![jvm rss](https://static.spring.io/blog/sdeleuze/20211209/jvm-rss.png)

AOT mode also accelerates the application startup by **3%** to **24%**.

![jvm startup](https://static.spring.io/blog/sdeleuze/20211209/jvm-startup.png)

Note that, until now, we had no specific focus on JVM efficiency, so there may well be opportunities to improve in later releases.

## [](#bellsoft-liberica-nik)[](#bellsoft-liberica-nik)Bellsoft Liberica NIK

[Bellsoft Liberica Native Image Kit](https://bell-sw.com/pages/liberica-native-image-kit/) (NIK) is a native-image compiler distribution based on [GraalVM open-source repository](https://github.com/oracle/graal) and Liberica JDK. As of Spring Native 0.11, it is used by default for Buildpacks native support, which is consistent with the JDK side, where Liberica JDK is used by default. It can also be installed locally by using its [SDKMAN](https://sdkman.io/) integration or by [downloading](https://bell-sw.com/pages/downloads/native-image-kit/) and installing it.

Earlier this year, the team [announced](https://tanzu.vmware.com/content/blog/vmware-tanzu-enterprise-support-spring-boot-native-applications-bellsoft-liberica-nik), together with BellSoft, that VMware customers who use the Liberica Native Image Kit can run their Spring applications as native executables and be confident that they are fully supported.

## [](#new-baseline)[](#new-baseline)New Baseline

Spring Native 0.11 also gave us the opportunity to provide a new baseline based on [Spring Boot 2.6](https://spring.io/blog/2021/11/19/spring-boot-2-6-is-now-available).

[GraalVM 21.3](https://www.graalvm.org/release-notes/21_3/) provides support for both Java 11 and Java 17, and leverages [conditional native configuration](https://www.graalvm.org/reference-manual/native-image/Reflection/#conditional-configuration) and other related refinements to allow a smaller footprint and better native support for the JVM ecosystem. The Java 8 flavor of GraalVM is not provided anymore since it is too old to be reasonably maintained, but you can still compile most Java 8 applications with the Java 11 flavor of GraalVM. [Native Build Tools](https://github.com/graalvm/native-build-tools) 0.9.8 is supported, and we continue our collaboration to refine and improve it.

## [](#spring-boot-3-first-class-native-support)[](#spring-boot-3-first-class-native-support)Spring Boot 3 First-Class Native Support

I think that Spring Native 0.11 achieves its goal of providing a mature native option for Spring Boot. The Spring team can now focus on the next major step: refined native support as part of Spring Framework 6, Spring Boot 3, and related portfolio projects.

Keep in mind that all we did on Spring Native was done in close collaboration with other Spring projects but without deep architectural changes. With AOT and native becoming major themes of Spring Boot 3 and Spring Framework 6, the quality, maintainability, and ease of use of those features will reach a new level. The AOT engine will be refined and integrated directly into Spring Framework. Other projects, such as Spring Data or Spring Security, will be able to provide native support (and to test it) for their scope, and Spring Boot will provide out of the box AOT and native executables support in its plugins and documentation.

![boot3 aot architecture](https://static.spring.io/blog/sdeleuze/20211209/boot3-aot-architecture.png)

Our collaboration with the GraalVM team and the JVM ecosystem is going to increase in order to provide native configuration for various libraries outside of Spring, either in those libraries directly or in a native configuration repository directly integrated at the Native Build Tools level.

We plan to start providing GraalVM native support out of the box in [Spring Boot 3 milestone 3](https://github.com/spring-projects/spring-boot/milestone/243) in May 2022, leveraging all that we learned while working on Spring Native. General Availability is planned for late 2022. We have lots of exciting plans ahead, but, for now, let’s take the time to celebrate this release with the members of the Spring team and of the Spring community who contributed. Cheers!