---
title: Initial AOT support in Spring Framework 6.0.0-M3
source: https://spring.io/blog/2022/03/22/initial-aot-support-in-spring-framework-6-0-0-m3
scraped: 2026-02-23T10:39:28.810Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  March 22, 2022 | 1 Comment
---

# Initial AOT support in Spring Framework 6.0.0-M3

_Engineering | Stéphane Nicoll |  March 22, 2022 | 1 Comment_

Those of you who know the [Spring Native](https://github.com/spring-projects-experimental/spring-native) experimental project are aware that the Spring team has been working on native image support for Spring applications since 2019. After [a first beta](https://spring.io/blog/2021/03/11/announcing-spring-native-beta) in March 2021, we shipped [an extensive revision](https://spring.io/blog/2021/12/09/new-aot-engine-brings-spring-native-to-the-next-level) of our Spring Native efforts in December 2021.

We’ve also [announced at SpringOne](https://springone.io/2021/sessions/spring-native) last year that we intend to promote this work to Spring Framework 6.0 proper in the course of 2022. Following the release of our third milestone, this blog post walks you through what has been included already and what is coming next.

## [](#ahead-of-time-processing)Ahead-Of-Time Processing

Processing the application context ahead of time opens many doors for optimizations. Depending on the context, we can reduce the amount of infrastructure that we ship, pre-compute certain features that you’ve declared on your components leading to faster startup time, and identify things that may be problematic in restricted environments and provide an alternative for them.

Spring Framework `6.0.0-M3` ships a first batch of these features based on Spring Native, but with an extended review and integration into the core container. Rather than making this a new feature in the form of an additional module, it is deeply integrated in the core of the existing ones. For now it includes:

-   An engine that processes an ApplicationContext against a given classpath and contributes code that provides an optimized version of it.
-   A new API to contribute runtime hints: integrators would typically use this when they need to use reflection in their own components, or if they need to access certain resources on the classpath for example. These hints are compatible with GraalVM and we provide the infrastructure to generate the adequate configuration files.

## [](#optimizing-an-application-at-build-time)Optimizing An Application At Build-Time

When a typical Spring application runs, the application context invokes a number of post processors that prepare the bean factory: configuration class parsing, classpath scanning and others that eventually can trigger auto-configuration resolutions. Once those have run, for the most part, they are no longer necessary at runtime.

With a well-defined environment (classpath, etc), this could be completely done at build-time so that only the relevant bean definitions, for the current environment, are contributed to the bean factory. The post processors that have run at build-time are discarded and replaced by the code they’ve contributed.

There are many ways to contribute code "ahead of time", from annotation processing to bytecode generation. We chose to make our new engine generate Java source code and contribute it to the application during the build. We believe this strikes the right balance between developer experience and optimization opportunities.

Not only this should enable the native use case in a familiar and transparent way, but we also believe this will yield benefits for vanilla JVM applications in the future. For instance, the AOT engine is completely independent of native so that you can validate the optimized version of your application works on the JVM.

## [](#runtime-hints)Runtime Hints

Contrary to the JVM, running a native image requires additional configuration for certain scenarios. For instance, if your code invokes a method via reflection, you need to mention that so that the necessary infrastructure is shipped in the native image. Or if you need to read the metadata of a class (as the core container often does on startup), you need to ship the bytecode of the class, which can result in much larger images.

The AOT engine will automatically infer all the hints that it requires to start the core container. In the future we hope those hints will shrink in favor of improvements in GraalVM itself, or changes in optimizations that make them no longer necessary.

## [](#testing-considerations)Testing Considerations

Generating code requires a good testing story. It is too easy to contribute code that may not compile, or would but not lead to the expected result. We’ve been working on new test utilities to help us with this and you can find them in the currently private [`spring-core-test`](https://github.com/spring-projects/spring-framework/tree/v6.0.0-M3/spring-core-test) module.

In a nutshell, this infrastructure lets us compile code (with an abstraction allowing us to provide source code in memory) and [run assertions](https://github.com/spring-projects/spring-framework/blob/v6.0.0-M3/spring-core-test/src/test/java/org/springframework/aot/test/generator/compile/TestCompilerTests.java#L39) where the generated code can be easily retrieved.

Let’s assume we have generated code for a number of Java classes and our entry point is `MyObject`:

```java
CopyTestCompiler.forSystem().withSources(sourceFiles)
        .compile(compiled -> {
    MyObject instance = compiled.getInstance(MyObject.class);
    // invoking + assertions
});
```

In our case, the AOT engine generates an entry point that implements the [`ApplicationContextInitializer`](https://github.com/spring-projects/spring-framework/blob/v6.0.0-M3/spring-context/src/main/java/org/springframework/context/ApplicationContextInitializer.java#L49) interface. Such infrastructure lets us do the following:

-   Configure an application context to exercise a particular feature
-   Invoke the AOT engine on the context
-   Use `TestCompiler` to compile the source code we’ve generated
-   Create a fresh application context and apply the generated code to see if the feature behaves as expected

What was described about generated code above could equally be applicable to hints. We are working on additional test utilities to validate that the hints you contribute match the runtime behavior. This didn’t make it in this milestone though, subscribe to [#27981](https://github.com/spring-projects/spring-framework/issues/27981) for more details

## [](#whats-next)What’s Next?

We’re continuing to build the core infrastructure based on the experience in Spring Native in the next milestone. Customizations for specific Spring projects that used to be in Spring Native are going to be migrated to the project proper, or made irrelevant by adapting to what the engine supports out-of-the-box.

Spring Framework 6.0 is just the first stop: we intend to build on those foundations for years to come, and this will have a positive impact for JVM users as well. Stay tuned!