---
title: Native Support in Spring Boot 3.0.0-M5
source: https://spring.io/blog/2022/09/26/native-support-in-spring-boot-3-0-0-m5
scraped: 2026-02-23T10:39:24.398Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  September 26, 2022 | 42 Comments
---

# Native Support in Spring Boot 3.0.0-M5

_Engineering | Stéphane Nicoll |  September 26, 2022 | 42 Comments_

The Spring Team has been working on native image support for Spring Applications for quite some time. After 3+ years of incubation in the [Spring Native](https://github.com/spring-projects-experimental/spring-native) experimental project with Spring Boot 2, native support is moving to General Availability with Spring Framework 6 and Spring Boot 3!

Native images provide almost instant startup time and reduced memory consumption for Java applications. The recent Spring Boot `3.0.0-M5` release marks the first time we’re asking for broader community feedback on our native story. If you need to catch-up on the basics, please refer to the [Ahead Of Time basics blog post](https://spring.io/blog/2022/03/22/initial-aot-support-in-spring-framework-6-0-0-m3) from late March. You can also learn [how to prepare your applications for Spring Boot 3.0](https://spring.io/blog/2022/05/24/preparing-for-spring-boot-3-0).

A lot has happened since March! We’ve improved compatibility with a larger number of use cases and libraries, fixing and improving our native support in the process. This blog post details what you need to know to get started.

# [](#building-your-first-native-image)Building Your First Native Image

The easiest way to get started is to create a new project from [https://start.spring.io](https://start.spring.io). Make sure to select Spring Boot 3.0.0-M5 (or later) and your favorite build tool. Once you’ve done that, one way to build a native image is by using the [Native Build Tools plugin](https://graalvm.github.io/native-build-tools/latest/index.html) and a local GraalVM installation.

Follow the [instructions to install GraalVM](https://www.graalvm.org/java/quickstart/), or invoke the following if you have SDKMan! installed:

```
Copy$ sdk install java 22.2.r17-nik
```

You can check that things are working as expected by making sure `native-image` is on your path. Spring Boot has specific integrations for Maven and Gradle. If you’re using Maven, enabling the native profile triggers the necessary infrastructure to build the native image:

```
Copy$ ./mvnw -Pnative package
```

For Gradle, our plugin reacts to the presence of the Native Build Tools plugin so we need to apply it:

```
Copyplugins {
  ..
  id 'org.graalvm.buildtools.native' version '0.9.14'
}
```

Once that’s done, this triggers the necessary infrastructure to build the native image:

```
Copy$ ./gradlew nativeCompile
```

This generates a native binary for your local OS/CPU located in `target/` and `build/native/nativeCompile` respectively. You can start your app like with any other binary. For instance with Maven:

```
Copy$ target/demo
```

![](https://static.spring.io/blog/snicoll/20220923/native-image-spring-boot-3.0.0-M5.png)

# [](#optimizing-applications-at-build-time)Optimizing Applications at Build-Time

In 3.0, our build plugins have an additional goal that triggers ahead-of-time processing of the application. During that phase, the application is inspected and some of the decisions we usually take at runtime are evaluated and recorded.

While Spring Boot ships with a wide number of auto-configurations, these are “dormant” until at least a classpath condition matches. When building a native image, such evaluation has to happen before the image is built, otherwise all the combinations will be included in it.

We also need to detect the use cases that GraalVM won’t be able to infer, such as proxying, the use of reflection and serialization, and resource loading. The result of this detection forms what is called reachability metadata. The whole Spring portfolio has been updated to detect such use cases and generate the relevant metadata automatically.

We’ve made the decision to generate source code with Javadoc and an easy-to-browse structure. This allows the code generated at build-time to be inspected and easily debugged if necessary. It also means that we only feed regular compiled Java to `native-image` as a result.

# [](#reachability-metadata-repository)Reachability Metadata Repository

While the preferred option for native compatibility is that each library ships the extra reachability metadata hints that they need, this is not always possible. Recently, Oracle Labs announced a shared repository for [third-party reachability metadata](https://medium.com/graalvm/enhancing-3rd-party-library-support-in-graalvm-native-image-with-shared-metadata-9eeae1651da4). This repository is open for contributions to gather reachability metadata for the entire JVM ecosystem. Each entry is tested in isolation against a range of versions.

If your favorite library does not provide the necessary metadata, consider contributing to this repository. The Spring Team is actively contributing based on the third-party library integration that we provide.

# [](#testing-support)Testing Support

Our support for native images is about optimizing the application based on its dependencies and configuration, and inferring the need for reflection, proxying, and so on. This may miss something that is specific to your application such as its use of custom libraries or frameworks. To help you with that, this milestone also provides an easy way to run your existing tests in a native image, allowing you to verify that your application and its dependency work as expected.

To run your test suite in a native environment, we rely on the testing support of the Native Build Tools plugin. First, make sure that `native-image` is available in your path (see above for setup instructions).

With Maven, this can be invoked as follows:

```
Copy$ ./mvnw -PnativeTest test
```

With Gradle, the command is as follows:

```
Copy$ ./gradlew nativeTest
```

For tests that are using an ApplicationContext, this applies the same process of optimizing it and inferring the necessary reachability metadata.

# [](#your-application-does-not-work-now-what)Your Application Does Not Work: Now What?

If your application does not work as a native image, we’d love to hear about it and improve our support before the release candidate, scheduled in late October. Support varies depending on the error:

-   Build failure during the ahead-of-time optimization phase, please report to the [Spring Framework issue tracker](https://github.com/spring-projects/spring-framework/issues).
-   Build failure during the generation of the native image can have various root causes. Please use the usual support channel such as Gitter or StackOverflow
-   If the application builds successfully but fails to start, it is likely that some reachability metadata is missing. The need for it can come from your own code, or from a third-party library.

Spring Framework 6 ships with a new API that lets you record hints programmatically. If the missing hint is from your own code, consider implementing [`RuntimeHintsRegistrar`](https://docs.spring.io/spring-framework/docs/6.0.0-M6/javadoc-api/org/springframework/aot/hint/RuntimeHintsRegistrar.html). See this [sample application](https://github.com/snicoll/demo-aot-native) for a concrete example.

# [](#next-steps)Next Steps

Based on the community feedback, we will continue to improve our AOT engine and update the reference guide to provide more details about the new APIs we’ve introduced. We intend to go GA in November this year.

This is an exciting time for us. We would like to thank again everyone who has contributed and reported feedback already, and we are looking forward to further feedback coming!