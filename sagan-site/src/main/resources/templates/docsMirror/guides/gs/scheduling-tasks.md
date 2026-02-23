---
title: Getting Started | Scheduling Tasks
source: https://spring.io/guides/gs/scheduling-tasks
scraped: 2026-02-19T07:53:23.714Z
description: Learn how to schedule tasks with Spring.
---

# Scheduling Tasks

This guide walks you through the steps for scheduling tasks with Spring.

## What You Will Build

You will build an application that prints out the current time every five seconds by using Spring Framework’s [`@Scheduled`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/Scheduled.html) annotation.

## What You Need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    

## How to Complete This Guide

Like most Spring [Getting Started guides](https://spring.io/guides) you can start from scratch and complete each step, or you can jump straight to the solution, by viewing the code in [this repository](https://github.com/spring-guides/gs-scheduling-tasks).

To **see the end result in your local environment**, you can do one of the following:

-   [Download](https://github.com/spring-guides/gs-scheduling-tasks/archive/main.zip) and unzip the source repository for this guide
    
-   Clone the repository using Git: `git clone [https://github.com/spring-guides/gs-scheduling-tasks.git](https://github.com/spring-guides/gs-scheduling-tasks.git)`
    
-   Fork the repository which let you request changes to this guide through submission of a pull request
    

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&language=java&packaging=jar&groupId=com.example&artifactId=scheduling-tasks&name=scheduling-tasks&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.scheduling-tasks) and click Generate to download a ZIP file. This project is configured to fit the examples in this guide.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java and Gradle.
    
3.  Click **Generate**.
    
4.  Download the resulting ZIP file, which is an archive of an application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

## Enable Scheduling

Although scheduled tasks can be embedded in web applications, the simpler approach (shown in this guide) creates a standalone application. To do so, package everything in a single, executable JAR file, driven by a Java main() method. The following snippet (from `src/main/java/com/example/schedulingtasks/SchedulingTasksApplication.java`) shows the application class:

```
Copy@SpringBootApplication
@EnableScheduling
public class SchedulingTasksApplication {
```

Spring Initializr adds the `@SpringBootApplication` annotation to our main class. `@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Spring Boot attempts to automatically configure your Spring application based on the dependencies that you have added.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services. If specific packages are not defined, recursive scanning begins with the package of the class that declares the annotation.
    

Additionally, add the `@EnableScheduling` annotation. This annotation enables Spring’s scheduled task execution capability.

## Create a Scheduled Task

Create a new class `src/main/java/com/example/schedulingtasks/ScheduledTasks.java` called:

```
Copy@Component
public class ScheduledTasks {

	private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

	@Scheduled(fixedRate = 5000)
	public void reportCurrentTime() {
		log.info("The time is now {}", dateFormat.format(new Date()));
	}
}
```

The [`Scheduled` annotation](https://docs.spring.io/spring-framework/reference/integration/scheduling.html#scheduling-annotation-support-scheduled) defines when a particular method runs.

This example uses [`fixedRate()`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/Scheduled.html#fixedRate\(\)), which specifies the interval between method invocations, measured from the start time of each invocation. Other options are [`cron()`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/Scheduled.html#cron\(\)) and [`fixedDelay()`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/Scheduled.html#fixedDelay\(\)). For periodic tasks, exactly one of these three options must be specified, and optionally, [`initialDelay()`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/Scheduled.html#initialDelay\(\)). For a one-time task, it is sufficient to just specify an initialDelay()

## Running the Application

You should now be able to run the application by executing the main method in `SchedulingTasksApplication`. You can run the program from your IDE, or by executing the following Gradle command in the project root directory:

./gradlew bootRun

Doing so starts the application, and the method annotated with @Scheduled runs. You should see log messages similar to:

20yy-mm-ddT07:23:01.665-04:00  INFO 19633 --- \[   scheduling-1\] c.e.schedulingtasks.ScheduledTasks       : The time is now 07:23:01
20yy-mm-ddT07:23:06.663-04:00  INFO 19633 --- \[   scheduling-1\] c.e.schedulingtasks.ScheduledTasks       : The time is now 07:23:06
20yy-mm-ddT07:23:11.663-04:00  INFO 19633 --- \[   scheduling-1\] c.e.schedulingtasks.ScheduledTasks       : The time is now 07:23:11

This example uses [`fixedRate()`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/Scheduled.html#fixedRate\(\)) scheduling, so the application runs indefinitely until you interrupt it manually.

## Testing with the awaitility Dependency

To properly test your application, you can use the [`awaitility` library](https://github.com/awaitility/awaitility). Since Spring Boot 3.2, this is a dependency that Boot manages. You can create a new test or view the existing test at `src/test/java/com/example/schedulingtasks/ScheduledTasksTest.java`:

```
Copy@SpringBootTest
public class ScheduledTasksTest {

	@SpyBean
	ScheduledTasks tasks;

	@Test
	public void reportCurrentTime() {
		await().atMost(Durations.TEN_SECONDS).untilAsserted(() -> {
			verify(tasks, atLeast(2)).reportCurrentTime();
		});
	}
}
```

This test automatically runs when you run the `./gradlew clean build` task.

## Building the Application

This section describes different ways to run this guide:

1.  [Building and executing a JAR file](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems)
    
2.  [Building and executing a Docker container using Cloud Native Buildpacks](https://docs.spring.io/spring-boot/docs/current/reference/html/container-images.html#container-images.buildpacks)
    
3.  [Building and executing a native image](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html#native-image.developing-your-first-application.native-build-tools)
    
4.  [Building and executing a native image container using Cloud Native Buildpacks](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html#native-image.developing-your-first-application.buildpacks)
    

Regardless of how you choose to run the application, the output should be the same.

To run the application, you can package the application as an executable jar. The `./gradlew clean build` command compiles the application to an executable jar. You can then run the jar with the `java -jar build/libs/gs-scheduling-tasks-0.0.1-SNAPSHOT.jar` command.

Alternatively, if you have a Docker environment available, you could create a Docker image directly from your Maven or Gradle plugin, using buildpacks. With [Cloud Native Buildpacks](https://docs.spring.io/spring-boot/docs/current/reference/html/container-images.html#container-images.buildpacks), you can create Docker compatible images that you can run anywhere. Spring Boot includes buildpack support directly for both Maven and Gradle. This means you can type a single command and quickly get a sensible image into a locally running Docker daemon. To create a Docker image using Cloud Native Buildpacks, run the `./gradlew bootBuildImage` command. With a Docker environment enabled, you can run the application with the `docker run docker.io/library/gs-scheduling-tasks:0.0.1-SNAPSHOT` command.

### Native Image Support

Spring Boot also supports [compilation to a native image](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html#native-image.introducing-graalvm-native-images), provided you have a GraalVM distribution on your machine. To create a [native image with Gradle](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html#native-image.developing-your-first-application.native-build-tools.gradle) using Native Build Tools, first make sure that your Gradle build contains a `plugins` block that includes `org.graalvm.buildtools.native`.

plugins {
	id 'org.graalvm.buildtools.native' version '<version>'
...

Review [the documentation](https://docs.spring.io/spring-boot/system-requirements.html#getting-started.system-requirements.graal) to know the version of the plugin you should use.

You can then run the `./gradlew nativeCompile` command to generate a native image. When the build completes, you will be able to run the code with a near-instantaneous start up time by executing the `build/native/nativeCompile/gs-scheduling-tasks` command.

You can also create a [Native Image using Buildpacks](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html#native-image.developing-your-first-application.buildpacks). You can generate a native image by running the `./gradlew bootBuildImage` command. Once the build completes, you can start your application with the `docker run docker.io/library/gs-scheduling-tasks:0.0.1-SNAPSHOT` command.

## Summary

Congratulations! You created an application with a scheduled task.

## See Also

The following guides may also be helpful:

-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    
-   [Creating a Batch Service](https://spring.io/guides/gs/batch-processing/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-scheduling-tasks)