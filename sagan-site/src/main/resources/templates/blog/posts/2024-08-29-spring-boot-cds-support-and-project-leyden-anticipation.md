---
title: Spring Boot CDS support and Project Leyden anticipation
source: https://spring.io/blog/2024/08/29/spring-boot-cds-support-and-project-leyden-anticipation
scraped: 2026-02-23T08:19:08.650Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  August 29, 2024 | 5 Comments
---

# Spring Boot CDS support and Project Leyden anticipation

_Engineering | Sébastien Deleuze |  August 29, 2024 | 5 Comments_

How can Spring Boot developers improve the runtime efficiency of their applications with minimal constraints in order to enjoy those benefits on most applications? The answer is the CDS support introduced by Spring Boot 3.3 which allows you to start your Spring Boot applications faster and consume less memory. It is based on [the foundation introduced by Spring Framework 6.1](https://spring.io/blog/2023/12/04/cds-with-spring-framework-6-1) that I presented a few months ago.

A key point is that this new CDS support provides a different value proposition compared to the [GraalVM native image support](https://docs.spring.io/spring-boot/reference/packaging/native-image/introducing-graalvm-native-images.html): the improvements you get with CDS are less dramatic than with native images on startup time for example, but they are still very significant while you can continue to use your regular JVM with very few side effects.

Spring Boot supports both CDS and GraalVM native images in a production-ready fashion and gives you the choice depending on your context and opinions.

## [](#cds-a-hidden-gem-in-the-jvm)CDS, a hidden gem in the JVM

CDS stands for [Class Data Sharing](https://docs.oracle.com/en/java/javase/21/vm/class-data-sharing.html), it is a mature technology already available and used in most JVM, but so far not at its full potential. To simplify, you are probably already using CDS without knowing it but only for optimizing JDK classes loading, while the classes of your application or libraries probably do not take advantage of it. To unlock that, it is required to perform a training run of your application.

You also need to fulfill a set of constraints that are easy to break without a dedicated support like Spring Boot one:

-   The very same JVM must be used.
-   The classpath must be specified as a list of JARs, and avoid the usage of directories, `*` wildcard characters and nested JARs.
-   The timestamps of the JARs must be preserved.
-   When using the CDS archive for the production run, the classpath must be the same as the one used to create the archive, in the same order. Additional JARs or directories can be specified at the end (but won’t be cached).

Spring Boot 3.3 unlocks this potential by providing 2 new features: [self-extracting executable JAR](https://docs.spring.io/spring-boot/reference/packaging/class-data-sharing.html) and [Buildpacks CDS support](https://docs.spring.io/spring-boot/how-to/class-data-sharing.html).

## [](#self-extracting-executable-jar)Self-extracting executable JAR

Directly running `java -jar my-app.jar` with the executable JAR is not the most efficient way to run your application on production. This is [documented](https://docs.spring.io/spring-boot/reference/packaging/efficient.html) but most developers and operators not using Buildpacks miss that based on various discussions I had with the Spring community. And until recently, there was no real first-class feature to help.

Spring Boot 3.3 changes that and introduces the capability for an executable JAR to self-extract without requiring any external tool, just with the java command likely already available to run the application:

```
Copyjava -Djarmode=tools -jar my-app.jar extract --destination application
```

![CDS file layout](https://static.spring.io/blog/contentful/20240923/cds-layout.png)

You can then run your Spring Boot application more efficiently with:

```
Copyjava -jar application/my-app.jar
```

This feature has a superpower: it has been designed to fulfill CDS (and Project Leyden) constraints. So combined with Spring Framework support for CDS training runs, you can create a CDS archive for your Spring Boot application as following:

```
Copyjava -XX:ArchiveClassesAtExit=application.jsa -Dspring.context.exit=onRefresh -jar application/my-app.jar
```

Then you can start your application with CDS enabled with:

```
Copyjava -XX:SharedArchiveFile=application.jsa -jar application/my-app.jar
```

## [](#cds-and-spring-aot-activation-support-in-buildpacks)CDS and Spring AOT activation support in Buildpacks

The self-extracting executable JAR feature combined with CDS usage is flexible but still requires quite a lot of manual steps, so Spring Boot and Buildpacks provide integrated support for CDS which:

-   Performs automatically the training run when creating the container image.
-   Extract the Spring Boot executable JAR to the CDS friendly file layout mentioned above.
-   Ship the CDS archive within the container.
-   Automatically enable CDS when running the container image.

![Buildpacks CDS support](https://static.spring.io/blog/contentful/20240923/cds-buildpacks.png)

As demonstrated in the [https://github.com/sdeleuze/spring-boot-cds-demo](https://github.com/sdeleuze/spring-boot-cds-demo) repository, it can be enabled as following with Gradle:

```groovy
Copytasks.named("bootBuildImage") {
	environment["BP_JVM_CDS_ENABLED"] = "true"
}
```

Or with Maven:

```xml
Copy<plugin>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-maven-plugin</artifactId>
	<configuration>
		<image>
			<env>
				<BP_JVM_CDS_ENABLED>true</BP_JVM_CDS_ENABLED>
			</env>
		</image>
	</configuration>
</plugin>
```

During the training run, the Spring beans are instantiated without starting the Spring lifecycle, so in practice the main side effect you may observe is early database interactions which can be avoided by configuring your application (or just the training run with the `CDS_TRAINING_JAVA_TOOL_OPTIONS` environment variable) to prevent such database interaction as documented [here](https://github.com/spring-projects/spring-lifecycle-smoke-tests/tree/main#training-run-configuration).

It is also possible to trigger Spring AOT activation support with the `BP_SPRING_AOT_ENABLED` environment variable but make sure to have those constraints in mind:

-   Enable Spring AOT in your Maven or Gradle build.
-   Potentially configure Spring AOT to use the Spring profile that will be used in the deployment environment.
-   `CDS_TRAINING_JAVA_TOOL_OPTIONS` and `BP_SPRING_AOT_ENABLED` can’t be combined.

The Spring and Buildpacks teams at Broadcom have been collaborating closely to leverage those OSS features and combine them with additional [Tanzu Platform](https://tanzu.vmware.com/platform) capabilities in order to provide a first-class CDS support for Cloud Foundry or Kubernetes, allowing for example training run autoconfiguration, making CDS as easy to enable as a flag with no side effects, and more platform-level capabilities are coming.

## [](#data-points)Data points

With a minimal Spring MVC Tomcat application running on a MacBook M2, we observe that the extracted application combined with CDS allows approximately 1.5x faster startup and 16% lower memory consumption compared to running the executable JAR. If we add Spring AOT to the mix, we get approximately 2x faster startup and 27% lower memory consumption.

![WebMVC process startup time (ms) and RSS after startup (Mb)](https://static.spring.io/blog/contentful/20240923/WebMVC_process_startup_time__ms__and_RSS_after_startup__Mb__final.png)

We see similar improvements for Petclinic.

![Petclinic process startup time (ms) and RSS after startup (Mb)](https://static.spring.io/blog/contentful/20240923/Petclinic_process_startup_time__ms__and_RSS_after_startup__Mb_.png)

The values will obviously change on less powerful cloud instances, but you should likely observe similar improvement ratios.

## [](#spring-boot-and-project-leyden)Spring Boot and Project Leyden

Interestingly, the CDS friendly layout used by the new extract command described above is also designed to provide optimal performance with [Project Leyden Early-Access builds](https://jdk.java.net/leyden/) which can be seen as a CDS successor with additional capabilities allowing:

-   Even faster startup.
-   Smaller container images (by removing the CDS archive of the JDK to keep only the application one).
-   Ahead-Of-Time warmup to have better performance after startup and reach peak performance faster.

We observe for now approximately 3x faster startup on Spring Boot applications with Project Leyden and 4x faster startup when combining Project Leyden and Spring AOT.

![Project Leyden data points](https://static.spring.io/blog/contentful/20240923/Leyden.png)

I will share more in the upcoming [Project Leyden talk at Devoxx Belgium 2024](https://devoxx.be/talk/?id=18479) that I will have the pleasure to co-present with Per Minborg from the Java Platform team.