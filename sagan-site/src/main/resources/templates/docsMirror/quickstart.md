---
title: Spring | Quickstart
source: https://spring.io/quickstart
scraped: 2026-02-19T07:45:39.043Z
description: Level up your Java code and explore what Spring can do for you.
---

![](/img/extra/quickstart.svg)![](/img/extra/quickstart-dark.svg)

# [](#spring-quickstart-guide)Spring Quickstart Guide

#### What you'll build

You will build a classic “Hello World!” endpoint which any browser can connect to. You can even tell it your name, and it will respond in a more friendly way.

#### What you’ll need

**An Integrated Developer Environment (IDE)**  
Popular choices include [IntelliJ IDEA](https://www.jetbrains.com/idea/), [Visual Studio Code](https://code.visualstudio.com) with [Spring Boot Extension Pack](https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack), or [Eclipse](https://eclipseide.org/) with [Spring Tools](https://spring.io/tools), and many more.

**A Java™ Development Kit (JDK)**  
We recommend [BellSoft Liberica JDK](https://bell-sw.com/pages/downloads/) version 17 or 21.

## [](#step-1-start-a-new-spring-boot-project)**Step 1:** Start a new Spring Boot project

Use [start.spring.io](http://start.spring.io) to create a “web” project. In the “Dependencies” dialog search for and add the “web” dependency as shown in the screenshot. Hit the “Generate” button, download the zip, and unpack it into a folder on your computer.

![Quick Start On Start.spring.io](/img/extra/quickstart-1.png) ![Quick Start On Start.spring.io](/img/extra/quickstart-1-dark.png)

Projects created by [start.spring.io](http://start.spring.io) contain [Spring Boot](/projects/spring-boot) , a framework that makes Spring ready to work inside your app, but without much code or configuration required. Spring Boot is the quickest and most popular way to start Spring projects.

## [](#step-2-add-your-code)**Step 2:** Add your code

Open up the project in your IDE and locate the `DemoApplication.java` file in the `src/main/java/com/example/demo` folder. Now change the contents of the file by adding the extra method and annotations shown in the code below. You can copy and paste the code or just type it.

```java
Copypackage com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {
    public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
    }
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      return String.format("Hello %s!", name);
    }
}
```

This is all the code required to create a simple “Hello World” web service in Spring Boot.

The `hello()` method we’ve added is designed to take a String parameter called name, and then combine this parameter with the word `"Hello"` in the code. This means that if you set your name to `"Amy"` in the request, the response would be “Hello Amy”.

The `@RestController` annotation tells Spring that this code describes an endpoint that should be made available over the web. The `@GetMapping(“/hello”)` tells Spring to use our `hello()` method to answer requests that get sent to the `http://localhost:8080/hello` address. Finally, the `@RequestParam` is telling Spring to expect a name value in the request, but if it’s not there, it will use the word `"World"` by default.

## [](#step-3-try-it)**Step 3:** Try it

Let’s build and run the program. Open a command line (or terminal) and navigate to the folder where you have the project files. We can build and run the application by issuing the following command:

**MacOS/Linux:**

```shell
Copy./gradlew bootRun
```

**Windows:**

```shell
Copy.\gradlew.bat bootRun
```

You should see some output that looks very similar to this:

![Quick Start On Start.spring.io](/img/extra/quickstart-2.png)

The last couple of lines here tell us that Spring has started. Spring Boot’s embedded Apache Tomcat server is acting as a webserver and is listening for requests on `localhost` port `8080`. Open your browser and in the address bar at the top enter `http://localhost:8080/hello`. You should get a nice friendly response like this:

![Quick Start On Start.spring.io](/img/extra/quickstart-3.png)

## [](#pop-quiz)**Pop quiz**

What should happen if you add `?name=Amy` to the end of the URL?

---

## Next, try these popular guides

You've already seen how simple Spring can be, but it's also very flexible. There are thousands of things you can do with Spring, and we have lots of guides available to take you through the most popular choices. Why not keep on learning and try one of these additional guides?

[

## Building a RESTful Web Service

Learn how to create a RESTful web service with Spring.

](/guides/gs/rest-service)

[

## Consuming a RESTful Web Service

Learn how to retrieve web page data with Spring's RestTemplate.

](/guides/gs/consuming-rest)

[

## Accessing Data with JPA

Learn how to work with JPA data persistence using Spring Data JPA.

](/guides/gs/accessing-data-jpa)

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)