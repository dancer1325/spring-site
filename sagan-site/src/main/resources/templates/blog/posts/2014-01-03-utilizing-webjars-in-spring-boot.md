---
title: Utilizing WebJars in Spring Boot
source: https://spring.io/blog/2014/01/03/utilizing-webjars-in-spring-boot
scraped: 2026-02-24T07:48:02.125Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Roy Clarkson |  January 03, 2014 | 8 Comments
---

# Utilizing WebJars in Spring Boot

_Engineering | Roy Clarkson |  January 03, 2014 | 8 Comments_

Welcome to 2014! 2013 was an exciting year for Spring, and we look forward to another great year. We have focused on client-side development in a few recent posts, including that we have published several new [client-side getting started guides](http://spring.io/blog/2013/12/17/getting-started-with-client-side-development-in-spring). In a previous post, I also reviewed how easy it is to [serve static web content](http://spring.io/blog/2013/12/19/serving-static-web-content-with-spring-boot) with [Spring Boot](http://projects.spring.io/spring-boot/).

In this post I will continue the discussion about client-side development with Spring Boot as we explore another built-in capability. My previous post included the following excerpt from the [source code](https://github.com/spring-projects/spring-boot/blob/master/spring-boot-autoconfigure/src/main/java/org/springframework/boot/autoconfigure/web/WebMvcAutoConfiguration.java) for [`WebMvcAutoConfiguration`](http://docs.spring.io/spring-boot/docs/current/api/org/springframework/boot/autoconfigure/web/WebMvcAutoConfiguration.html) which illustrates how static resources are automatically added to a Spring MVC [`ResourceHandlerRegistry`](http://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/config/annotation/ResourceHandlerRegistry.html) when using Spring Boot.

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

One aspect of this code I did not discuss in the last post is the "webjars" resource handler. You may be thinking, "That's nice, but what are webjars?".

As a Java developer, you are probably familiar with the JAR (Java Archive) file format, which is used to package many class files and their associated metadata into a single file. WebJars is simply taking the concept of a JAR and applying it to client-side libraries or resources. For example, the jQuery library may be packaged as a JAR and made available to your Spring MVC application. There are several benefits to using WebJars, including support for Java build tools such as Gradle and Maven. And by using dependency management in a build tool, transitive dependencies are automatically handled for you.

Perhaps you want to add a jQuery animation to your web page. Using the [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content) guide as a starting point, modify the `build.gradle` file to include the jQuery dependency. Many WebJars are available through Maven Central with a GroupID of `org.webjars`. A complete list is available at [webjars.org](http://www.webjars.org).

```groovy
Copybuildscript {
    repositories {
        maven { url "http://repo.spring.io/libs-milestone" }
        mavenLocal()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:0.5.0.M6")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'idea'
apply plugin: 'spring-boot'

jar {
    baseName = 'gs-serving-web-content'
    version =  '0.1.0'
}

repositories {
    mavenCentral()
    maven { url "http://repo.spring.io/libs-milestone" }
}

dependencies {
    compile("org.springframework.boot:spring-boot-starter-web:0.5.0.M6")
    compile("org.thymeleaf:thymeleaf-spring3:2.0.17")
    compile("org.webjars:jquery:2.0.3-1")
    testCompile("junit:junit:4.11")
}

task wrapper(type: Wrapper) {
    gradleVersion = '1.8'
}

```

After you add the dependency, you can reference the jQuery WebJar in your HTML and utilize it to animate the text in the paragraph tag. Note the location of the jQuery dependency!

```html
Copy<!DOCTYPE HTML>
<html xmlns:th="http://www.thymeleaf.org">
<head> 
    <title>Getting Started: Serving Web Content</title> 
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <script src="webjars/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('p').animate({
                fontSize: '48px'
            }, "slow");
        });
    </script>
</head>
<body>
    <p th:text="'Hello, ' + ${name} + '!'" />
</body>
</html>
```

JavaScript package management is not a new concept. Indeed, [npm](https://npmjs.org/) and [bower](http://bower.io/) are two of the more popular tools, and currently offer solutions to managing JavaScript dependencies. Spring's [Understanding JavaScript Package Managers](http://spring.io/understanding/javascript-package-managers) guide has more information on these. Most JavaScript developers are likely familiar with npm and bower and make use of those in their projects. In contrast, WebJars utilizes Maven's dependency management model to include JavaScript libraries in a project, making it more accessible to Java developers.

Spring Boot offers an easy way to build Spring applications that require little or no configuration. This post illustrates how simple it is to use WebJars in your Spring MVC application, and how WebJars provide a convenient way of managing JavaScript packages and dependencies. For more information see the [Spring Boot project page](http://projects.spring.io/spring-boot/) and the catalog of [getting started guides](http://spring.io/guides).