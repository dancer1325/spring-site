---
title: DevTools in Spring Boot 1.3
source: https://spring.io/blog/2015/06/17/devtools-in-spring-boot-1-3
scraped: 2026-02-23T19:37:08.235Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  June 17, 2015 | 39 Comments
---

# DevTools in Spring Boot 1.3

_Engineering | Phil Webb |  June 17, 2015 | 39 Comments_

Spring Boot 1.3 will ship with a brand new module called `spring-boot-devtools`. The aim of this module is to try and improve the development-time experience when working on Spring Boot applications.

To use the module you simply need to add it as a dependency in your Maven POM:

```
Copy<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
    </dependency>
</dependencies>
```

or your Gradle build file:

```
Copydependencies {
    compile("org.springframework.boot:spring-boot-devtools")
}
```

Once included, the `spring-boot-devtools` module provides a number of nice features that we cover below (If you can't be bother to read the text, skip to the end of the post for a short video).

## [](#property-defaults)Property Defaults

If you've used templating technologies such as Thymeleaf with Spring Boot 1.2, you might be familiar with properties such as `spring.thymeleaf.cache`. These properties are used to disable caching and allow you to update pages without needing to restart your application. Having support for these properties is pretty handy, but remembering to set them during development has always been a bit of a pain.

Now, when you use the `spring-boot-devtools` module, you no longer need to remember to set the properties. During development caching for Thymeleaf, Freemarker, Groovy Templates, Velocity and Mustache are all automatically disabled.

## [](#automatic-restart)Automatic Restart

You may have used tools such as [JRebel](http://zeroturnaround.com/software/jrebel/) or [Spring Loaded](https://github.com/spring-projects/spring-loaded) in the past to provide instant reload for your Java applications. These tools are great, but they do often require additional configuration or IDE plugins to work (and some of them even cost money!)

With Spring Boot 1.3 we've been working on something that's a little slower than these "instant reload" techniques, and instead works by restarting your application. When you have the `spring-boot-devtools` module included, any classpath file changes will automatically trigger an application restart. We do some tricks to try and keep restarts fast, so for many microservice style applications this technique might be good enough.

## [](#livereload)LiveReload

With sensible "cache properties" and "automatic restarts" working, needing to manually click the browser refresh button each time something changes starts to become a little tedious. So to help save your mouse buttons, Spring Boot 1.3 DevTools includes an embedded LiveReload server. LiveReload is a simple protocol that allows your application to automatically trigger a browser refresh whenever things change. Browser extensions are freely available for Chrome, Firefox and Safari from [livereload.com](http://livereload.com/extensions/).

## [](#remote-debug-tunneling)Remote Debug Tunneling

If you've ever tried to host a Java application using [Docker](http://docker.io), or if you've tried a micro PaaS such as [Lattice](http://lattice.cf/), you may have been frustrated about how difficult it can be to debug your code. You need configure Java to start with `-Xdebug` and somehow forward the appropriate port so that you can attach the remote debugger.

To help with this, Spring Boot 1.3 can tunnel JDWP (the Java Debug Wire Protocol) over HTTP directly to your application. This can even work with applications deployed to Internet Cloud providers that only expose port `80` and `443` (although since JDWP is quite a chatty protocol this can be quite slow).

## [](#remote-update-and-restart)Remote Update and Restart

The final trick that DevTools offers is support for remote application updates and restarts. This works by monitoring your local classpath for file changes and pushing them to a remote server which is then restarted. As with local restarts, you can also use this feature in combination with LiveReload.

## [](#video-preview)Video Preview

All the features discussed in this post are already available in [Spring Boot 1.3.0.M1](https://spring.io/blog/2015/06/12/spring-boot-1-3-0-m1-available-now) and detailed documentation is available in the [reference guide](http://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#using-boot-devtools). If you're not ready to install the bits yourself yet, here's a short video that shows how they work: