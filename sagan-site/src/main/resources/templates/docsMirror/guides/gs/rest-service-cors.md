---
title: Getting Started | Enabling Cross Origin Requests for a RESTful Web Service
source: https://spring.io/guides/gs/rest-service-cors
scraped: 2026-02-19T08:01:02.597Z
description: Learn how to create a RESTful web service with Spring that support Cross-Origin Resource Sharing (CORS).
---

# Enabling Cross Origin Requests for a RESTful Web Service

This guide walks you through the process of creating a “Hello, World” RESTful web service with Spring that includes headers for Cross-Origin Resource Sharing (CORS) in the response. You can find more information about Spring CORS support in this [blog post](/blog/2015/06/08/cors-support-in-spring-framework).

## What You Will Build

You will build a service that accepts HTTP GET requests at `[http://localhost:8080/greeting](http://localhost:8080/greeting)` and responds with a JSON representation of a greeting, as the following listing shows:

```
Copy{"id":1,"content":"Hello, World!"}
```

You can customize the greeting with an optional `name` parameter in the query string, as the following listing shows:

```
Copyhttp://localhost:8080/greeting?name=User
```

The `name` parameter value overrides the default value of `World` and is reflected in the response, as the following listing shows:

```
Copy{"id":1,"content":"Hello, User!"}
```

This service differs slightly from the one described in [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/), in that it uses Spring Framework CORS support to add the relevant CORS response headers.

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

-   [Download](https://github.com/spring-guides/gs-rest-service-cors/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-rest-service-cors.git](https://github.com/spring-guides/gs-rest-service-cors.git)`
    
-   cd into `gs-rest-service-cors/initial`
    
-   Jump ahead to [Create a Resource Representation Class](#initial).
    

**When you finish**, you can check your results against the code in `gs-rest-service-cors/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=gradle-project&groupId=com.example&language=java&jvmVersion=17&packaging=jar&artifactId=rest-service-cors&packageName=com.example.restservicecors&dependencies=web) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use.
    
3.  Click **Dependencies** and select **Spring Web**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of a web application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from GitHub and open it in your IDE or other editor.

### Adding the `httpclient5` Dependency

The tests require the Apache `httpclient5` library.

To add the Apache `httpclient5` library to Maven, add the following dependency:

```
Copy<dependency>
  <groupId>org.apache.httpcomponents.client5</groupId>
  <artifactId>httpclient5</artifactId>
  <scope>test</scope>
</dependency>
```

The following listing shows the finished `pom.xml` file:

```
Copy<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>4.0.1</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>rest-service-cors-complete</artifactId>
	<version>0.0.1-SNAPSHOT</version>

	<properties>
		<java.version>17</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.apache.httpcomponents.client5</groupId>
			<artifactId>httpclient5</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-webmvc-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

To add the Apache `httpclient5` library to Gradle, add the following dependency:

Groovy (build.gradle)

Kotlin (build.gradle.kts)

```
CopytestImplementation 'org.apache.httpcomponents.client5:httpclient5'
```

```
CopytestImplementation("org.apache.httpcomponents.client5:httpclient5')
```

The following listing shows the finished `build.gradle(.kts)` file:

Groovy (build.gradle)

Kotlin (build.gradle.kts)

```
Copyplugins {
	id 'org.springframework.boot' version '4.0.1'
	id 'io.spring.dependency-management' version '1.1.7'
	id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-web'
	testImplementation 'org.apache.httpcomponents.client5:httpclient5'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
}

test {
	useJUnitPlatform()
}
```

```
Copyplugins {
    id("org.springframework.boot") version "4.0.1"
    id("io.spring.dependency-management") version "1.1.7"
    kotlin("jvm") version "2.2.21"
    kotlin("plugin.spring") version "2.2.21"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    testImplementation("org.apache.httpcomponents.client5:httpclient5")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
}

kotlin {
    compilerOptions {
        freeCompilerArgs.addAll("-Xjsr305=strict", "-Xannotation-default-target=param-property")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
```

## Create a Resource Representation Class

Now that you have set up the project and build system, you can create your web service.

Begin the process by thinking about service interactions.

The service will handle `GET` requests to `/greeting`, optionally with a `name` parameter in the query string. The `GET` request should return a `200 OK` response with JSON in the body to represent a greeting. It should resemble the following listing:

```
Copy{
    "id": 1,
    "content": "Hello, World!"
}
```

The `id` field is a unique identifier for the greeting, and `content` is the textual representation of the greeting.

To model the greeting representation, create a resource representation class. Provide a simple data representation (record in Java or data class in Kotlin) with fields, constructors, and accessors for the `id` and `content` data, as the following listing show:

Java

Kotlin

```
Copypackage com.example.restservicecors;

public record Greeting(long id, String content) {

	public Greeting() {
		this(-1, "");
	}
}
```

```
Copypackage com.example.restservicecors

data class Greeting(
    val id: Long = -1,
    val content: String = ""
)
```

Spring uses the [Jackson JSON](https://wiki.fasterxml.com/JacksonHome) library to automatically serialize instances of type `Greeting` into JSON.

## Create a Resource Controller

In Spring’s approach to building RESTful web services, HTTP requests are handled by a controller. These components are easily identified by the [`@Controller`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Controller.html) annotation, and the `GreetingController` shown in the following listing handles `GET` requests for `/greeting` by returning a new instance of the `Greeting` class:

Java

Kotlin

```
Copypackage com.example.restservicecors;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

	private static final String template = "Hello, %s!";

	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/greeting")
	public Greeting greeting(@RequestParam(required = false, defaultValue = "World") String name) {
		System.out.println("==== get greeting ====");
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}

}
```

```
Copypackage com.example.restservicecors

import java.util.concurrent.atomic.AtomicLong
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class GreetingController {

    private val counter = AtomicLong()

    @GetMapping("/greeting")
    fun greeting(@RequestParam(required = false, defaultValue = "World") name: String): Greeting {
        println("==== get greeting ====")
        return Greeting(id = counter.incrementAndGet(), content = "Hello, $name!")
    }

}
```

This controller is concise and simple, but there is plenty going on under the hood. We break it down step by step.

The `@RequestMapping` annotation ensures that HTTP requests to `/greeting` are mapped to the `greeting()` method.

The preceding example uses the `@GetMapping` annotation, which acts as a shortcut for `@RequestMapping(method = RequestMethod.GET)`. We use `GET` in this case because it is convenient for testing. Spring will still reject a GET request where the origin doesn’t match the CORS configuration. The browser is not required to send a CORS preflight request, but we could use `@PostMapping` and accept some JSON in the body if we wanted to trigger a pre-flight check.

`@RequestParam` binds the value of the `name` query string parameter into the `name` parameter of the `greeting()` method. This query string parameter is not `required`. If it is absent in the request, the `defaultValue` of `World` is used.

The implementation of the method body creates and returns a new `Greeting` object, with the value of the `id` attribute based on the next value from the `counter` and the value of the `content` based on the query parameter or the default value. It also formats the given `name` by using the greeting `template`.

A key difference between a traditional MVC controller and the RESTful web service controller shown earlier is the way that the HTTP response body is created. Rather than relying on a view technology to perform server-side rendering of the greeting data to HTML, this RESTful web service controller populates and returns a `Greeting` object. The object data is written directly to the HTTP response as JSON.

To accomplish this, the [`@RestController`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/RestController.html) annotation assumes that every method inherits the [`@ResponseBody`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/bind/annotation/ResponseBody.html) semantics by default. Therefore, returned object data is inserted directly into the response body.

Thanks to Spring’s HTTP message converter support, the `Greeting` object is naturally converted to JSON. Because [Jackson](https://wiki.fasterxml.com/JacksonHome) is on the classpath, Spring’s [`MappingJackson2HttpMessageConverter`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/http/converter/json/MappingJackson2HttpMessageConverter.html) is automatically chosen to convert the `Greeting` instance to JSON.

## Enabling CORS

You can enable cross-origin resource sharing (CORS) from either in individual controllers or globally. The following topics describe how to do so:

-   [Controller Method CORS Configuration](#controller-method-cors-configuration)
    
-   [Global CORS configuration](#global-cors-configuration)
    

### Controller Method CORS Configuration

So that the RESTful web service will include CORS access control headers in its response, you have to add a `@CrossOrigin` annotation to the handler method, as the following listing show:

Java

Kotlin

```
Copy@CrossOrigin(origins = "http://localhost:9000")
@GetMapping("/greeting")
public Greeting greeting(@RequestParam(required = false, defaultValue = "World") String name) {
	System.out.println("==== get greeting ====");
	return new Greeting(counter.incrementAndGet(), String.format(template, name));
}
```

```
Copy@CrossOrigin(origins = ["http://localhost:9000"])
@GetMapping("/greeting")
fun greeting(@RequestParam(required = false, defaultValue = "World") name: String): Greeting {
    println("==== get greeting ====")
    return Greeting(id = counter.incrementAndGet(), content = "Hello, $name!")
}
```

This `@CrossOrigin` annotation enables cross-origin resource sharing only for this specific method. By default, it allows all origins, all headers, and the HTTP methods specified in the `@RequestMapping` annotation. Also, a `maxAge` of 30 minutes is used. You can customize this behavior by specifying the value of one of the following annotation attributes:

-   `origins`
    
-   `originPatterns`
    
-   `methods`
    
-   `allowedHeaders`
    
-   `exposedHeaders`
    
-   `allowCredentials`
    
-   `maxAge`.
    

In this example, we allow only `[http://localhost:9000](http://localhost:9000)` to send cross-origin requests.

You can also add the `@CrossOrigin` annotation at the controller class level as well, to enable CORS on all handler methods of this class.

### Global CORS configuration

In addition (or as an alternative) to fine-grained annotation-based configuration, you can define some global CORS configuration as well. This is similar to using a `Filter` but can be declared within Spring MVC and combined with fine-grained `@CrossOrigin` configuration. By default, all origins and `GET`, `HEAD`, and `POST` methods are allowed.

The following listing show the `greetingWithJavaconfig` method in the `GreetingController` class:

Java

Kotlin

```
Copy@GetMapping("/greeting-javaconfig")
public Greeting greetingWithJavaconfig(@RequestParam(required = false, defaultValue = "World") String name) {
	System.out.println("==== in greeting ====");
	return new Greeting(counter.incrementAndGet(), String.format(template, name));
}
```

```
Copy@GetMapping("/greeting-javaconfig")
fun greetingWithJavaconfig(@RequestParam(required = false, defaultValue = "World") name: String): Greeting {
    println("==== in greeting ====")
    return Greeting(id = counter.incrementAndGet(), content = "Hello, $name!")
}
```

The difference between the `greetingWithJavaconfig` method and the `greeting` method (used in the [controller-level CORS configuration](#controller-method-cors-configuration)) is the route (`/greeting-javaconfig` rather than `/greeting`) and the presence of the `@CrossOrigin` origin.

The following listing shows how to add CORS mapping in the application class:

Java

Kotlin

```
Copy@Bean
public WebMvcConfigurer corsConfigurer() {
	return new WebMvcConfigurer() {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:9000");
		}
	};
}
```

```
Copy@Bean
fun corsConfigurer() = object : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:9000")
    }
}
```

You can easily change any properties (such as `allowedOrigins` in the example), as well as apply this CORS configuration to a specific path pattern.

You can combine global- and controller-level CORS configuration.

## Creating the Application Class

The Spring Initializr creates a bare-bones application class for you. The following listing shows that initial class:

Java

Kotlin

```
Copypackage com.example.restservicecors;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestServiceCorsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestServiceCorsApplication.class, args);
	}

}
```

```
Copypackage com.example.restservicecors

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RestServiceCorsApplication

fun main(args: Array<String>) {
    runApplication<RestServiceCorsApplication>(*args)
}
```

You need to add a method to configure how to handle cross-origin resource sharing. The following listing shows how to do so:

Java

Kotlin

```
Copy@Bean
public WebMvcConfigurer corsConfigurer() {
	return new WebMvcConfigurer() {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:9000");
		}
	};
}
```

```
Copy@Bean
fun corsConfigurer() = object : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:9000")
    }
}
```

The following listing shows the completed application class:

Java

Kotlin

```
Copypackage com.example.restservicecors;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RestServiceCorsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestServiceCorsApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:9000");
			}
		};
	}
}
```

```
Copypackage com.example.restservicecors

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@SpringBootApplication
class RestServiceCorsApplication {

    @Bean
    fun corsConfigurer() = object : WebMvcConfigurer {
        override fun addCorsMappings(registry: CorsRegistry) {
            registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:9000")
        }
    }
}

fun main(args: Array<String>) {
    runApplication<RestServiceCorsApplication>(*args)
}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `com/example` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-rest-service-cors-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-rest-service-cors-0.0.1-SNAPSHOT.jar

Logging output is displayed. The service should be up and running within a few seconds.

## Test the service

Now that the service is up, visit `[http://localhost:8080/greeting](http://localhost:8080/greeting)` in your browser where you should see:

```
Copy{"id":1,"content":"Hello, World!"}
```

Provide a `name` query string parameter by visiting `[http://localhost:8080/greeting?name=User](http://localhost:8080/greeting?name=User)`. The value of the `content` attribute changes from `Hello, World!` to `Hello User!`, as the following listing shows:

```
Copy{"id":2,"content":"Hello, User!"}
```

This change demonstrates that the `@RequestParam` arrangement in `GreetingController` works as expected. The `name` parameter has been given a default value of `World` but can always be explicitly overridden through the query string.

Also, the `id` attribute has changed from `1` to `2`. This proves that you are working against the same `GreetingController` instance across multiple requests and that its `counter` field is being incremented on each call, as expected.

Now you can test that the CORS headers are in place and allow a JavaScript client from another origin to access the service. To do so, you need to create a JavaScript client to consume the service. The following listing shows such a client:

First, create a simple JavaScript file named `hello.js` (from `public/hello.js`) with the following content:

```
Copy$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8080/greeting"
    }).then(function(data, status, jqxhr) {
       $('.greeting-id').append(data.id);
       $('.greeting-content').append(data.content);
       console.log(jqxhr);
    });
});
```

This script uses jQuery to consume the REST service at `[http://localhost:8080/greeting](http://localhost:8080/greeting)`. It is loaded by `index.html`, as the following listing (from `public/index.html`) shows:

```
Copy<!DOCTYPE html>
<html>
    <head>
        <title>Hello CORS</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="hello.js"></script>
    </head>

    <body>
        <div>
            <p class="greeting-id">The ID is </p>
            <p class="greeting-content">The content is </p>
        </div>
    </body>
</html>
```

To test the CORS behavior, you need to start the client from another server or port. Doing so not only avoids a collision between the two applications, but also ensures that the client code is served from a different origin than the service.

To start the client running on localhost at port 9000, keep the application running at port 8080 and run the following Maven command in another terminal:

```
Copy./mvnw spring-boot:run -Dspring-boot.run.jvmArguments='-Dserver.port=9000'
```

If you use Gradle, you can use this command:

```
Copy./gradlew bootRun --args="--server.port=9000"
```

Once the app starts, open [http://localhost:9000](http://localhost:9000) in your browser, where you should see the following because the service response includes the relevant CORS headers, so the ID and content are rendered into the page:

![Model data retrieved from the REST service is rendered into the DOM if the proper CORS headers are in the response.](https://github.com/spring-guides/gs-rest-service-cors/raw/main/images/hello.png)

Now, stop the application running at port 9000, keep the application running at port 8080, and run the following Maven command in another terminal:

```
Copy./mvnw spring-boot:run -Dspring-boot.run.jvmArguments='-Dserver.port=9001'
```

If you use Gradle, you can use this command:

```
Copy./gradlew bootRun --args="--server.port=9001"
```

Once the app starts, open [http://localhost:9001](http://localhost:9001) in your browser, where you should see the following:

![The browser will fail the request if the CORS headers are missing (or insufficient for theclient) from the response. No data will be rendered into the DOM.](https://github.com/spring-guides/gs-rest-service-cors/raw/main/images/hello_fail.png)

Here, the browser fails the request and the values are not rendered into the DOM because the CORS headers are missing (or insufficient for the client), since we only allowed cross-origin requests from [http://localhost:9000](http://localhost:9000), not [http://localhost:9001](http://localhost:9001).

## Summary

Congratulations! You have just developed a RESTful web service that includes Cross-Origin Resource Sharing with Spring.

## See Also

The following guides may also be helpful:

-   [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
    
-   [Building a Hypermedia-Driven RESTful Web Service](https://spring.io/guides/gs/rest-hateoas/)
    
-   [Creating API Documentation with Restdocs](https://spring.io/guides/gs/testing-restdocs/)
    
-   [Accessing GemFire Data with REST](https://spring.io/guides/gs/accessing-gemfire-data-rest/)
    
-   [Accessing MongoDB Data with REST](https://spring.io/guides/gs/accessing-mongodb-data-rest/)
    
-   [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
    
-   [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/)
    
-   [Accessing Neo4j Data with REST](https://spring.io/guides/gs/accessing-neo4j-data-rest/)
    
-   [Consuming a RESTful Web Service](https://spring.io/guides/gs/consuming-rest/)
    
-   [Consuming a RESTful Web Service with AngularJS](https://spring.io/guides/gs/consuming-rest-angularjs/)
    
-   [Consuming a RESTful Web Service with jQuery](https://spring.io/guides/gs/consuming-rest-jquery/)
    
-   [Consuming a RESTful Web Service with rest.js](https://spring.io/guides/gs/consuming-rest-restjs/)
    
-   [Securing a Web Application](https://spring.io/guides/gs/securing-web/)
    
-   [Building REST services with Spring](https://spring.io/guides/tutorials/bookmarks/)
    
-   [React.js and Spring Data REST](https://spring.io/guides/tutorials/react-and-spring-data-rest/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-rest-service-cors)