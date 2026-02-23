---
title: Getting Started | Caching Data with Spring
source: https://spring.io/guides/gs/caching
scraped: 2026-02-19T08:03:30.685Z
description: Learn how to cache data in memory with Spring
---

# Caching Data with Spring

This guide walks you through the process of enabling caching on a Spring managed bean.

## What You Will Build

You will build an application that enables caching on a simple book repository.

## What You need

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

-   [Download](https://github.com/spring-guides/gs-caching/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-caching.git](https://github.com/spring-guides/gs-caching.git)`
    
-   cd into `gs-caching/initial`
    
-   Jump ahead to [Create a Book Model](#initial).
    

**When you finish**, you can check your results against the code in `gs-caching/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&language=java&platformVersion=3.1.0&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=caching&name=caching&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.caching&dependencies=cache) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring cache abstraction**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from Github and open it in your IDE or other editor.

## Create a Book Model

First, you need to create a simple model for your book. The following listing (from `src/main/java/com/example/caching/Book.java`) shows how to do so:

```
Copypackage com.example.caching;

public class Book {

  private String isbn;
  private String title;

  public Book(String isbn, String title) {
    this.isbn = isbn;
    this.title = title;
  }

  public String getIsbn() {
    return isbn;
  }

  public void setIsbn(String isbn) {
    this.isbn = isbn;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  @Override
  public String toString() {
    return "Book{" + "isbn='" + isbn + '\'' + ", title='" + title + '\'' + '}';
  }

}
```

## Create a Book Repository

You also need a repository for that model. The following listing (from `src/main/java/com/example/caching/BookRepository.java`) shows such a repository:

```
Copypackage com.example.caching;

public interface BookRepository {

  Book getByIsbn(String isbn);

}
```

You could have used {SpringData}\[Spring Data\] to provide an implementation of your repository over a wide range of SQL or NoSQL stores. However, for the purpose of this guide, you will simply use a naive implementation that simulates some latency (network service, slow delay, or other issues). The following listing (from `src/main/java/com/example/caching/SimpleBookRepository.java`) shows such a repository:

```
Copypackage com.example.caching;

import org.springframework.stereotype.Component;

@Component
public class SimpleBookRepository implements BookRepository {

  @Override
  public Book getByIsbn(String isbn) {
    simulateSlowService();
    return new Book(isbn, "Some book");
  }

  // Don't do this at home
  private void simulateSlowService() {
    try {
      long time = 3000L;
      Thread.sleep(time);
    } catch (InterruptedException e) {
      throw new IllegalStateException(e);
    }
  }

}
```

`simulateSlowService` deliberately inserts a three-second delay into each `getByIsbn` call. Later on, you will speed up this example with caching.

## Using the Repository

Next, you need to wire up the repository and use it to access some books. The following listing (from `src/main/java/com/example/caching/CachingApplication.java`) shows how to do so:

```
Copypackage com.example.caching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CachingApplication {

  public static void main(String[] args) {
    SpringApplication.run(CachingApplication.class, args);
  }

}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

You also need a [`CommandLineRunner`](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#features.spring-application.command-line-runner) that injects the `BookRepository` and calls it several times with different arguments. The following listing (from `src/main/java/com/example/caching/AppRunner.java`) shows that class:

```
Copypackage com.example.caching;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AppRunner implements CommandLineRunner {

  private static final Logger logger = LoggerFactory.getLogger(AppRunner.class);

  private final BookRepository bookRepository;

  public AppRunner(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  @Override
  public void run(String... args) throws Exception {
    logger.info(".... Fetching books");
    logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
    logger.info("isbn-4567 -->" + bookRepository.getByIsbn("isbn-4567"));
    logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
    logger.info("isbn-4567 -->" + bookRepository.getByIsbn("isbn-4567"));
    logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
    logger.info("isbn-1234 -->" + bookRepository.getByIsbn("isbn-1234"));
  }

}
```

If you try to run the application at this point, you should notice that it is quite slow, even though you are retrieving the exact same book several times. The following sample output shows the three-second delay that our (intentionally awful) code created:

2014-06-05 12:15:35.783  ... : .... Fetching books
2014-06-05 12:15:40.783  ... : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2014-06-05 12:15:43.784  ... : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2014-06-05 12:15:46.786  ... : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}

We can improve the situation by enabling caching.

## Enable caching

Now you can enable caching on your `SimpleBookRepository` so that the books are cached within the `books` cache. The following listing (from `src/main/java/com/example/caching/SimpleBookRepository.java`) shows the repository definition:

```
Copypackage com.example.caching;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

@Component
public class SimpleBookRepository implements BookRepository {

  @Override
  @Cacheable("books")
  public Book getByIsbn(String isbn) {
    simulateSlowService();
    return new Book(isbn, "Some book");
  }

  // Don't do this at home
  private void simulateSlowService() {
    try {
      long time = 3000L;
      Thread.sleep(time);
    } catch (InterruptedException e) {
      throw new IllegalStateException(e);
    }
  }

}
```

You now need to enable the processing of the caching annotations, as the following example (from `src/main/java/com/example/caching/CachingApplication.java`) shows how to do:

```
Copypackage com.example.caching;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CachingApplication {

  public static void main(String[] args) {
    SpringApplication.run(CachingApplication.class, args);
  }

}
```

The [`@EnableCaching`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/cache/annotation/EnableCaching.html) annotation triggers a post-processor that inspects every Spring bean for the presence of caching annotations on public methods. If such an annotation is found, a proxy is automatically created to intercept the method call and handle the caching behavior accordingly.

The post-processor handles the [`@Cacheable`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/cache/annotation/Cacheable.html), [`@CachePut`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/cache/annotation/CachePut.html) and [`@CacheEvict`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/cache/annotation/CacheEvict.html) annotations. You can refer to the Javadoc and [the reference guide](https://docs.spring.io/spring/docs/current/spring-framework-reference/html/cache.html) for more detail.

Spring Boot automatically configures a suitable [`CacheManager`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/cache/CacheManager.html) to serve as a provider for the relevant cache. See [the Spring Boot documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/io.html#io.caching) for more detail.

Our sample does not use a specific caching library, so our cache store is the simple fallback that uses `ConcurrentHashMap`. The caching abstraction supports a wide range of cache libraries and is fully compliant with JSR-107 (JCache).

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-caching-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-caching-0.0.1-SNAPSHOT.jar

## Test the Application

Now that caching is enabled, you can run the application again and see the difference by adding additional calls with or without the same ISBN. It should make a huge difference. The following listing shows the output with caching enabled:

2016-09-01 11:12:47.033  .. : .... Fetching books
2016-09-01 11:12:50.039  .. : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2016-09-01 11:12:53.044  .. : isbn-4567 -->Book{isbn='isbn-4567', title='Some book'}
2016-09-01 11:12:53.045  .. : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2016-09-01 11:12:53.045  .. : isbn-4567 -->Book{isbn='isbn-4567', title='Some book'}
2016-09-01 11:12:53.045  .. : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}
2016-09-01 11:12:53.045  .. : isbn-1234 -->Book{isbn='isbn-1234', title='Some book'}

In the preceding sample output, the first retrieval of a book still takes three seconds. However, the second and subsequent times for the same book are much faster, showing that the cache is doing its job.

## Summary

Congratulations! You’ve just enabled caching on a Spring managed bean.

## See Also

The following guides may also be helpful:

-   [Caching Data with Gemfire](https://spring.io/guides/gs/caching-gemfire/)
    
-   [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-caching)