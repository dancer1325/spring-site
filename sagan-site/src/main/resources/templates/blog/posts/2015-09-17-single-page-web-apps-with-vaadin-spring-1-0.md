---
title: Single-page web apps with Vaadin Spring 1.0
source: https://spring.io/blog/2015/09/17/single-page-web-apps-with-vaadin-spring-1-0
scraped: 2026-02-23T19:42:21.115Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  September 17, 2015 | 5 Comments
---

# Single-page web apps with Vaadin Spring 1.0

_Engineering | Stéphane Nicoll |  September 17, 2015 | 5 Comments_

> This post is a guest post by community member [Matti Tahvonen (@MattiTahvonen)](https://twitter.com/MattiTahvonen), who works as a developer advocate in [Vaadin Ltd](https://vaadin.com), the company that originally developed Vaadin Framework and provides commercial services and extensions for it.

The Spring integration library for Vaadin has been in beta stage since May and has already been used by several production applications. Today we are proud to announce that the beta flag is dropped and the stable 1.0.0 release is out.

[Vaadin](https://vaadin.com/) is a component based web UI framework where your application state and logic lives in the memory of your Java application server. This architecture gives you the full powers of JVM and frameworks like Spring to your UI code, and especially the huge advantage of keeping your UI logic right next to your data. Due to the strong abstraction and the component based API, familiar from desktop UI libraries, you can pretty much forget that you are actually working with a web application and concentrate on your domain problems only.

Vaadin is not the tool for each and every web site, but if you are building single-page web applications that need more than just some simple forms, you should definitely have Vaadin in your toolbox. If you are new to Vaadin and wondering how it works behind the scenes, check out [the introduction page](https://vaadin.com/introduction#why) for a more detailed explanation.

As a pure Java library, Vaadin has always been easy to fit into a Spring based software stack. With the recently released official Vaadin Spring integration library, it becomes even easier. Just by marking your UI objects with an annotation, they become Spring managed beans, making it trivial to use IoC techniques and wire e.g. Spring Data based services directly to your UI classes. Vaadin Spring naturally supports Spring Boot, but can be used in old school Spring deployments as well.

## [](#how-to-get-started-with-spring-and-vaadin)How to get started with Spring and Vaadin?

For an easy start with new Spring + Vaadin projects, the [start.spring.io](http://start.spring.io) service supports the Vaadin Spring integration library. Just tap the Vaadin checkbox there and import the generated project to your favorite IDE. Try the following code snippet for a simple Spring Boot based hello world application:

```java
Copy@SpringBootApplication
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @Service
  public static class MyService {
    public String sayHi() {
      return "Hello Spring!";
    }
  }

  @Theme("valo")
  @SpringUI(path = "")
  public static class VaadinUI extends UI {

    @Autowired
    MyService myService;

    @Override
    protected void init(VaadinRequest request) {
      Button button = new Button("Greet service");
      button.addClickListener(e -> Notification.show(myService.sayHi()));
      setContent(button);
    }
  }
}
```

For more tips on how to go forward with your Spring + Vaadin based software strategy, see [vaadin.com/spring](https://vaadin.com/spring) and our recent [introduction webinar](https://www.youtube.com/watch?v=3ibM46HYB-k).