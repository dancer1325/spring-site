---
title: Spring GraalVM Native 0.6.0 released
source: https://spring.io/blog/2020/04/09/spring-graalvm-native-0-6-0-released
scraped: 2026-02-23T14:05:16.922Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  April 09, 2020 | 4 Comments
---

# Spring GraalVM Native 0.6.0 released

_Engineering | Andy Clement |  April 09, 2020 | 4 Comments_

The Spring team have just released version 0.6.0 of the [spring-graalvm-native](https://github.com/spring-projects-experimental/spring-graalvm-native) project. This project is intended to make it easier for anyone trying to build [GraalVM](https://www.graalvm.org/) native images of their Spring applications.

For a deep dive on native images with Spring, please see the [Devoxx talk by Sébastien Deleuze](https://www.youtube.com/watch?v=3eoAxphAUIg).

In this blog post we’ll talk about what has changed since then and point you to some key resources enabling you to try it out! This project is in the *spring-projects-experimental* github org, indicating it is a work in progress, but we have a number of sample applications showing the kinds of technology that are already working and lots of documentation on how to experiment with your own apps.

## [](#what-is-a-graalvm-native-image)What is a GraalVM native image?

Just as a quick refresher, GraalVM is an umbrella project that can be used for a number of purposes but the key aspect we’re going to look at here is running JVM code as native images. Once compiled to a platform specific native-image applications should have very fast startup and a more reliable memory profile (no JIT causing memory spikes at the beginning).

When creating an image the native-image building tools need to know information about your application, for example what resources are being loaded, what types might be getting reflected upon and whether types can be safely initialized as the image is built or must be initialized later at runtime. This information enables the native-image tool to try and build an optimal image for the application.

There are actually a few ways to collect and communicate this configuration:

-   Some libraries include it directly inside their distributions, as fixed .json files (e.g. netty)
-   A third party feature (in GraalVM terms) participates in the build process and computes the information and passes it through to native-image via an API. A key aspect of the spring-graalvm-native project is the feature it contains. This feature understands how Spring Boot applications operate, applies that knowledge to the particular application being built and passes the results on to the native-image build process. It can make very dynamic decisions as it can operate on closed world assumptions, knowing the classpath is complete/fixed when the image build occurs..
-   An agent, supplied with GraalVM, can collect the configuration data that will be necessary whilst the application runs normally (as a JVM application) and then those files are picked up by a subsequent native-image build step.

Each of these approaches for computing configuration has pros and cons. For example the agent can only collect information on code paths that are exercised whilst the application is running, but it will certainly create an optimal set of precisely what is needed (in terms of resources/reflective-access). On the other hand the feature doesn’t create a totally optimal configuration because it doesn’t run the application so has to allow for certain code paths that might or might-not be taken, but being part of the build process enables a feature to do Spring specific optimizations like eagerly evaluate conditional configuration. When the native-image build runs the full classpath is known and so `@ConditionalOnClass` checks can be performed at that time and if they fail that configuration can be discarded and not even looked at when the resulting image launches.

We have been working hard on all these fronts attempting to improve the ecosystem so that we can move to a world where things just work. There is some way still to go! We’re digging into Tomcat to make the configuration as easy to pickup as it is with netty. With the GraalVM team, we have been ensuring there is nothing in Spring Boot applications that trips up native-image construction (necessitating fixes on both sides) and improving the spring-graalvm-native feature to better understand a wider variety of Spring applications. We have also been helping to ensure the agent collector is not missing anything. The current set of issues we are working through with the GraalVM team is actually tracked [here](https://github.com/oracle/graal/labels/spring).

Since the demos given at Spring One Platform 2019 and Devoxx, the feature has learned more about Boot, the agent is missing less, GraalVM is more compatible, the resulting image sizes have fallen, the image build times have improved and we’re including even more sample projects demonstrating what is working.

## [](#how-can-i-try-it)How can I try it?

There are numerous sample projects [here](https://github.com/spring-projects-experimental/spring-graalvm-native/tree/master/spring-graalvm-native-samples) including even a PetClinic (of course!) and samples related documentation [here](https://repo.spring.io/milestone/org/springframework/experimental/spring-graal-native-docs/0.6.1.RELEASE/spring-graal-native-docs-0.6.1.RELEASE.zip!/reference/index.html#samples) on how to play around with them. There are samples using Netty, Tomcat, Spring MVC, Spring WebFlux, JPA, Spring Cloud Function, kotlin, etc. What might you see?

```
Copy  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::
...
INFO: Started TomcatApplication in 0.044 seconds (JVM running for 0.62)
```

For applying it to your own projects, the documentation describes all the steps to either run it with the [feature](https://repo.spring.io/milestone/org/springframework/experimental/spring-graal-native-docs/0.6.1.RELEASE/spring-graal-native-docs-0.6.1.RELEASE.zip!/reference/index.html#feature), or the [agent](https://repo.spring.io/milestone/org/springframework/experimental/spring-graal-native-docs/0.6.1.RELEASE/spring-graal-native-docs-0.6.1.RELEASE.zip!/reference/index.html#agent), or a [hybrid mode](https://repo.spring.io/milestone/org/springframework/experimental/spring-graal-native-docs/0.6.1.RELEASE/spring-graal-native-docs-0.6.1.RELEASE.zip!/reference/index.html#hybrid) involving both. The hybrid model is sometimes the best of both worlds as the agent can catch something the feature might miss and vice versa.

## [](#what-do-i-do-when-it-doesnt-work)What do I do when it doesn’t work?

The process isn’t super smooth yet, this is more work to be done in many areas. Both the team working on the feature and the GraalVM team have been working to improve the diagnostics so that when it does go wrong you can still make progress and understand what to do next. It is unlikely some random application will work first time, but for anyone committed to working through the issues, many applications will work. Your application might be using a library not yet encountered in our testing. It may be using some Spring behaviour that the feature hasn’t been taught about yet. It may go wrong at image build time or at runtime when the compiled image is launched. There is a troubleshooting page [here](https://repo.spring.io/milestone/org/springframework/experimental/spring-graal-native-docs/0.6.1.RELEASE/spring-graal-native-docs-0.6.1.RELEASE.zip!/reference/index.html#troubleshooting) that discusses some of the common problems and how to go about addressing them. Hitting something else? Please [raise an issue](https://github.com/spring-projects-experimental/spring-graalvm-native/issues) on the project.

Within the *spring-graalvm-native* project is a configuration sub project which tries to encapsulate knowledge about Spring Boot behaviour in an easily extensible form. For example, it encodes that a particular import selector might cause the need for reflective access to a particular type. The feature itself is driven by this encapsulated knowledge and if you discover the knowledge is currently insufficient please feel free to enhance it and contribute back to the project to build out that knowledge, see [the extensibility guide](https://repo.spring.io/milestone/org/springframework/experimental/spring-graal-native-docs/0.6.1.RELEASE/spring-graal-native-docs-0.6.1.RELEASE.zip!/reference/index.html#extension_guide).

There are also some substitutions included in the spring-graalvm-native project, a substitution is a GraalVM term for making a change to an existing class at image build time that currently doesn't work well when included in a native-image. Over time the plan is still to eliminate these and work with the projects containing these problematic classes to get them into a ideal form that will work inside or outside of a native-image.

Although spring-graalvm-native is Spring focused, obviously a Spring project typically includes many third party dependencies. Many of these do not include the necessary configuration yet and so our feature is 'covering for them' as best as it can. Wherever possible our plan continues to be working with these dependency providers to help them craft their ideal native-image configuration and then it will simply be picked up automatically by a native-image build. The [GraalVM agent](https://repo.spring.io/milestone/org/springframework/experimental/spring-graal-native-docs/0.6.1.RELEASE/spring-graal-native-docs-0.6.1.RELEASE.zip!/reference/index.html#agent) does offer a nice approach to try and deal with code that is missing configuration.

## [](#the-road-ahead)The road ahead

Is all the work happening just in this experimental feature? Far from it. A number of enhancements have gone into Spring to ensure it operates properly when built into a native-image. For example, in Spring Framework the `@Configuration` `proxyBeanMethods` attribute in [Spring Framework 5.2](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x#core-container) enables applications to run without CGLIB proxies (the native-image process can only support JDK proxies). We also refactored some classloading in Spring Boot condition processing to use a different approach because the agent wasn’t able to catch the original form of loading.

More of these enhancements are to follow. There is more to teach the feature, whilst in core Spring there is still too much being done at startup time which we can push to build time and which will have a serious impact on the memory needs of a built native image. These improvements will benefit not only applications built into native-images but also applications run on a regular JVM. Things are only going to get better! Thanks to the GraalVM team for supporting us in this work. To track our progress, keep an eye on [the project](https://github.com/spring-projects-experimental/spring-graalvm-native).