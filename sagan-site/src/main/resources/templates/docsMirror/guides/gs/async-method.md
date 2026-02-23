---
title: Getting Started | Creating Asynchronous Methods
source: https://spring.io/guides/gs/async-method
scraped: 2026-02-19T07:59:25.584Z
description: Learn how to create asynchronous service methods.
---

# Creating Asynchronous Methods

This guide walks you through creating asynchronous queries to GitHub. The focus is on the asynchronous part, a feature often used when scaling services.

## What You Will build

You will build a lookup service that queries GitHub user information and retrieves data through GitHub’s API. One approach to scaling services is to run expensive jobs in the background and wait for the results by using Java’s [`CompletableFuture`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html) interface. Java’s `CompletableFuture` is an evolution from the regular `Future`. It makes it easy to pipeline multiple asynchronous operations and merge them into a single asynchronous computation.

## What You Need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    
-   [Gradle 7.5+](https://gradle.org/install/) or [Maven 3.5+](https://maven.apache.org/download.cgi)
    
-   You can also import the code straight into your IDE:
    
    -   [Spring Tool Suite (STS)](/guides/gs/sts)
        
    -   [IntelliJ IDEA](/guides/gs/intellij-idea/)
        
    -   [VSCode](/guides/gs/guides-with-vscode/)
        
    

## How to complete this guide

Like most Spring [Getting Started guides](/guides), you can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. Either way, you end up with working code.

To **start from scratch**, move on to [Starting with Spring Initializr](#scratch).

To **skip the basics**, do the following:

-   [Download](https://github.com/spring-guides/gs-async-method/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-async-method.git](https://github.com/spring-guides/gs-async-method.git)`
    
-   cd into `gs-async-method/initial`
    
-   Jump ahead to [Create a Representation of a GitHub User](#initial).
    

**When you finish**, you can check your results against the code in `gs-async-method/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.1.0&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=async-method&name=async-method&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.async-method&dependencies=web) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring Web**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from Github and open it in your IDE or other editor.

## Create a Representation of a GitHub User

Before you can create a GitHub lookup service, you need to define a representation for the data you will retrieve through GitHub’s API.

To model the user representation, create a resource representation class. To do so, provide a plain old Java object with fields, constructors, and accessors, as the following example (from `src/main/java/com/example/asyncmethod/User.java`) shows:

```
Copypackage com.example.asyncmethod;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown=true)
public class User {

  private String name;
  private String blog;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getBlog() {
    return blog;
  }

  public void setBlog(String blog) {
    this.blog = blog;
  }

  @Override
  public String toString() {
    return "User [name=" + name + ", blog=" + blog + "]";
  }

}
```

Spring uses the [Jackson JSON](https://wiki.fasterxml.com/JacksonHome) library to convert GitHub’s JSON response into a `User` object. The `@JsonIgnoreProperties` annotation tells Spring to ignore any attributes not listed in the class. This makes it easy to make REST calls and produce domain objects.

In this guide, we grab only the `name` and the `blog` URL for demonstration purposes.

## Create a GitHub Lookup Service

Next, you need to create a service that queries GitHub to find user information. The following listing (from `src/main/java/com/example/asyncmethod/GitHubLookupService.java`) shows how to do so:

```
Copypackage com.example.asyncmethod;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.CompletableFuture;

@Service
public class GitHubLookupService {

  private static final Logger logger = LoggerFactory.getLogger(GitHubLookupService.class);

  private final RestTemplate restTemplate;

  public GitHubLookupService(RestTemplateBuilder restTemplateBuilder) {
    this.restTemplate = restTemplateBuilder.build();
  }

  @Async
  public CompletableFuture<User> findUser(String user) throws InterruptedException {
    logger.info("Looking up " + user);
    String url = String.format("https://api.github.com/users/%s", user);
    User results = restTemplate.getForObject(url, User.class);
    // Artificial delay of 1s for demonstration purposes
    Thread.sleep(1000L);
    return CompletableFuture.completedFuture(results);
  }

}
```

The `GitHubLookupService` class uses Spring’s `RestTemplate` to invoke a remote REST point (api.github.com/users/) and then convert the answer into a `User` object. Spring Boot automatically provides a `RestTemplateBuilder` that customizes the defaults with any auto-configuration bits (that is, `MessageConverter`).

The class is marked with the `@Service` annotation, making it a candidate for Spring’s component scanning to detect and add to the application context.

The `findUser` method is flagged with Spring’s `@Async` annotation, indicating that it should run on a separate thread. The method’s return type is [`CompletableFuture<User>`](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CompletableFuture.html) instead of `User`, a requirement for any asynchronous service. This code uses the `completedFuture` method to return a `CompletableFuture` instance that is already completed with result of the GitHub query.

Creating a local instance of the `GitHubLookupService` class does NOT allow the `findUser` method to run asynchronously. It must be created inside a `@Configuration` class or picked up by `@ComponentScan`.

The timing for GitHub’s API can vary. To demonstrate the benefits later in this guide, an extra delay of one second has been added to this service.

## Make the Application Executable

To run a sample, you can create an executable jar. Spring’s `@Async` annotation works with web applications, but you need not set up a web container to see its benefits. The following listing (from `src/main/java/com/example/asyncmethod/AsyncMethodApplication.java`) shows how to do so:

```
Copypackage com.example.asyncmethod;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@SpringBootApplication
@EnableAsync
public class AsyncMethodApplication {

  public static void main(String[] args) {
    // close the application context to shut down the custom ExecutorService
    SpringApplication.run(AsyncMethodApplication.class, args).close();
  }

  @Bean
  public Executor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(2);
    executor.setMaxPoolSize(2);
    executor.setQueueCapacity(500);
    executor.setThreadNamePrefix("GithubLookup-");
    executor.initialize();
    return executor;
  }

}
```

The Spring Initializr created an `AsyncMethodApplication` class for you. You can find it in the zip file that you downloaded from the Spring Initializr (in `src/main/java/com/example/asyncmethod/AsyncMethodApplication.java`). You can either copy that class to your project and then modify it or copy the class from the preceding listing.

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

The [`@EnableAsync`](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/scheduling.html#scheduling-annotation-support) annotation switches on Spring’s ability to run `@Async` methods in a background thread pool. This class also customizes the `Executor` by defining a new bean. Here, the method is named `taskExecutor`, since this is the [specific method name for which Spring searches](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/scheduling/annotation/EnableAsync.html). In our case, we want to limit the number of concurrent threads to two and limit the size of the queue to 500. There are [many more things you can tune](https://docs.spring.io/spring-framework/docs/current/spring-framework-reference/integration.html#scheduling-task-executor). If you do not define an `Executor` bean, Spring uses `ThreadPoolTaskExecutor`.

There is also a [`CommandLineRunner`](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-command-line-runner) that injects the `GitHubLookupService` and calls that service three times to demonstrate the method is executed asynchronously.

You also need a class to run the application. You can find that in `src/main/java/com/example/asyncmethod/AppRunner.java`. The following listing shows that class:

```
Copypackage com.example.asyncmethod;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class AppRunner implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(AppRunner.class);

  private final GitHubLookupService gitHubLookupService;

  public AppRunner(GitHubLookupService gitHubLookupService) {
    this.gitHubLookupService = gitHubLookupService;
  }

  @Override
  public void run(String... args) throws Exception {
    // Start the clock
    long start = System.currentTimeMillis();

    // Kick of multiple, asynchronous lookups
    CompletableFuture<User> page1 = gitHubLookupService.findUser("PivotalSoftware");
    CompletableFuture<User> page2 = gitHubLookupService.findUser("CloudFoundry");
    CompletableFuture<User> page3 = gitHubLookupService.findUser("Spring-Projects");

    // Wait until they are all done
    CompletableFuture.allOf(page1,page2,page3).join();

    // Print results, including elapsed time
    logger.info("Elapsed time: " + (System.currentTimeMillis() - start));
    logger.info("--> " + page1.get());
    logger.info("--> " + page2.get());
    logger.info("--> " + page3.get());

  }

}
```

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-async-method-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-async-method-0.0.1-SNAPSHOT.jar

The application shows logging output, showing each query to GitHub. With the help of the `allOf` factory method, we create an array of `CompletableFuture` objects. By calling the `join` method, it is possible to wait for the completion of all of the `CompletableFuture` objects.

The following listing shows typical output from this sample application:

2016-09-01 10:25:21.295  INFO 17893 --- \[ GithubLookup-2\] hello.GitHubLookupService                : Looking up CloudFoundry
2016-09-01 10:25:21.295  INFO 17893 --- \[ GithubLookup-1\] hello.GitHubLookupService                : Looking up PivotalSoftware
2016-09-01 10:25:23.142  INFO 17893 --- \[ GithubLookup-1\] hello.GitHubLookupService                : Looking up Spring-Projects
2016-09-01 10:25:24.281  INFO 17893 --- \[           main\] hello.AppRunner                          : Elapsed time: 2994
2016-09-01 10:25:24.282  INFO 17893 --- \[           main\] hello.AppRunner                          : --> User \[name=Pivotal Software, Inc., blog=https://pivotal.io\]
2016-09-01 10:25:24.282  INFO 17893 --- \[           main\] hello.AppRunner                          : --> User \[name=Cloud Foundry, blog=https://www.cloudfoundry.org/\]
2016-09-01 10:25:24.282  INFO 17893 --- \[           main\] hello.AppRunner                          : --> User \[name=Spring, blog=https://spring.io/projects\]

Note that the first two calls happen in separate threads (`GithubLookup-2`, `GithubLookup-1`) and the third one is parked until one of the two threads became available. To compare how long this takes without the asynchronous feature, try commenting out the `@Async` annotation and runing the service again. The total elapsed time should increase noticeably, because each query takes at least a second. You can also tune the `Executor` to increase the `corePoolSize` attribute for instance.

Essentially, the longer the task takes and the more tasks are invoked simultaneously, the more benefit you see from making things asynchronous. The trade off is handling the `CompletableFuture` interface. It adds a layer of indirection, because you are no longer dealing directly with the results.

## Summary

Congratulations! You have just developed an asynchronous service that lets you scale multiple calls at once.

## See Also

The following guides may also be helpful:

-   [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-async-method)