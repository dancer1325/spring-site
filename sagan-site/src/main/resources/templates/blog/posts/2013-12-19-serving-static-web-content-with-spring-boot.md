---
title: Serving Static Web Content with Spring Boot
source: https://spring.io/blog/2013/12/19/serving-static-web-content-with-spring-boot
scraped: 2026-02-24T07:48:32.061Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Roy Clarkson |  December 19, 2013 | 61 Comments
---

# Serving Static Web Content with Spring Boot

_Engineering | Roy Clarkson |  December 19, 2013 | 61 Comments_

We made a few announcements recently about the Spring [getting started guides](http://spring.io/guides/), including that the catalog of guides have been [migrated to Asciidoctor](https://spring.io/blog/2013/12/13/spring-s-getting-started-guides-migrated-to-asciidoctor). We also added several new [client-side guides](http://spring.io/blog/2013/12/17/getting-started-with-client-side-development-in-spring) illustrating how to connect to Spring services from a variety of client technologies.

In this post I want to highlight an interesting capability of [Spring Boot](http://projects.spring.io/spring-boot/); within many of the client-side guides we utilized Spring Boot to stand up a Tomcat instance and serve static content. In these guides we are demonstrating **JavaScript** client code, not Java or Groovy! If you are already familiar with Boot, then you can probably guess the punchline. To accomplish this, there is no configuration, and almost no server code required.

Using the Spring Boot [command line interface](http://projects.spring.io/spring-boot/docs/README.html) and a minimal amount of [Groovy](http://groovy.codehaus.org/) code you can direct Spring Boot to start Tomcat. Consider the following `app.groovy` file:

```java
Copy@Controller class JsApp { }
```

The single empty class, annotated with [`@Controller`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/stereotype/Controller.html), will trigger [AutoConfiguration](http://projects.spring.io/spring-boot/docs/spring-boot-autoconfigure/README.html) within Boot, which will set up a full Spring MVC stack and enable support for Tomcat.

You can run the app using the following command:

```sh
Copy$ spring run app.groovy
```

While this may not be a new revelation to those of you that have been following Spring Boot since the SpringOne announcement, there is one detail for which you may not be aware. Spring Boot will automatically add static web resources located within any of the following directories:

-   `/META-INF/resources/`
-   `/resources/`
-   `/static/`
-   `/public/`

In the case of the [Consuming a RESTful Web Service with jQuery](http://spring.io/guides/gs/consuming-rest-jquery/) guide, we included `index.html` and `hello.js` files in the `/public/` folder. This means that not only does Spring Boot offer a simple approach to building Java or Groovy apps, you can also use it to easily deploy client-side JavaScript code and test it within a real web server environment!

You can analyze the details of how this works by reviewing the [source code](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/WebMvcAutoConfiguration.java) for [`WebMvcAutoConfiguration`](http://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/web/WebMvcAutoConfiguration.html) in Spring Boot, you will see the following declaration for a string array containing locations for Classpath resources.

```java
Copyprivate static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
		"classpath:/META-INF/resources/", "classpath:/resources/",
		"classpath:/static/", "classpath:/public/" };
```

Further in the code you can see that these locations are added to a Spring MVC [`ResourceHandlerRegistry`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/config/annotation/ResourceHandlerRegistry.html).

```java
Copy@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
	if (!registry.hasMappingForPattern("/webjars/**")) {
		registry.addResourceHandler("/webjars/**").addResourceLocations(
				"classpath:/META-INF/resources/webjars/");
	}
	if (!registry.hasMappingForPattern("/**")) {
		registry.addResourceHandler("/**").addResourceLocations(
				RESOURCE_LOCATIONS);
	}
}
```

To review, web AutoConfiguration is executed when Spring Boot identifies a class with the `@Controller` annotation. The result is that you can place static web resources in any of these locations, and those static assets are then served by Tomcat when you access your application.

Spring Boot offers many exciting features to help easily create Spring based applications that you can "just run". The fun byproduct is that it is equally as easy to build and test client-side JavaScript apps with Spring Boot.