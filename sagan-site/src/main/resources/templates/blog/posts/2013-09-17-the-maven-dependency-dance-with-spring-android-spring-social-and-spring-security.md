---
title: The Maven Dependency Dance with Spring Android, Spring Social and Spring Security
source: https://spring.io/blog/2013/09/17/the-maven-dependency-dance-with-spring-android-spring-social-and-spring-security
scraped: 2026-02-24T07:57:54.729Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 17, 2013 | 0 Comments
---

# The Maven Dependency Dance with Spring Android, Spring Social and Spring Security

_Engineering | Josh Long |  September 17, 2013 | 0 Comments_

[Roy Clarkson (@royclarkson)](http://twitter.com/royclarkson) and I gave a talk at [SpringOne2GX 2013](http://SpringOne2GX.com/) in which we talked about building REST services with an eye towards consuming those services on mobile platforms like Android and iOS. This talk demonstrates the progressive evolution of an application using Spring MVC, Spring HATEOAS, Spring Data REST, Spring Security, Spring Security OAuth, and Spring Android. The code's benefited from a lot of help from Rob Winch,

## [](#layout-of-the-code)Layout of the Code

The code for the talk is on my [GitHub account (github.com/joshlong/**the-spring-rest-stack**)](http://github.com/joshlong/the-spring-rest-stack/). Importantly, the code lives in the `code` directory. Beneath that there are two choices: `web` (where you'll find the `rest`, `hateoas`, `hateoas-data`, and `oauth`, `social` modules) and `client` (where you can load the Android module and the iOS module). The modules in the `web` folder in respective order, demonstrate the evolution of a simple REST service which incorporates hypermedia, Spring Data repositories and OAuth security. The `social` module demonstrates how to build an OAuth client that consumes the service.

## [](#building-and-editing-the-code)Building and Editing the Code

The project is all, at the moment, Maven based, though moving to Gradle seems imminent as that is the Google-endorsed route for Android builds. I know the Android client to be importable and buildable using IntelliJ IDEA's Android support (which in theory should work in [Android Studio](http://intellij.com/android-studio), which is freely available).

## [](#the-dependency-dance-and-android)The Dependency Dance and Android

We used up-to-date revisions of major libraries in our [build file, linked for reference](https://github.com/spring-projects/spring-android/tree/master/spring-android-rest-template). Up-to-date and sometimes bleeding edge. The Android application uses the Spring Android project, which - basically - provides an API compatible implementation of the `RestTemplate` found in Spring core.

It does *not* however provide the entire framework, and if you bring in certain libraries from the core you'll get weird issues because some classes in the Spring Android modules are *mostly* the same in Spring Android and in the core, but they're not identical, due to the differing natures of the environments in which they run. The easiest way to ensure everything's OK is to explicitly exclude all Spring modules *except* the Spring Android dependencies then, *selectively*, re-introduce the types as you need them.

The types in the [Spring Android RestTemplate module](https://github.com/spring-projects/spring-android/tree/master/spring-android-rest-template) provides more than enough compatibility to let Spring Social's client machinery work unchanged on Android. This, of course, means that we can use the Spring Social-powered OAuth client in the `social` module in our Android application. Awesome!

For example, while I needed the Spring Social core types and implementations, I didn't need the core Spring libraries that it brought in. So, we get this rather dramatic stanza:

```xml
Copy<dependency>    
    <groupId>org.springframework.social</groupId>
    <artifactId>spring-social-core</artifactId>
    <version>${spring-social.version}</version>
    <exclusions>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
        </exclusion>
        <exclusion>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-expression</artifactId>
        </exclusion>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-aop</artifactId>
        </exclusion>
        <exclusion>
            <groupId>aopalliance</groupId>
            <artifactId>aopalliance</artifactId>
        </exclusion>
        <exclusion>
            <groupId>com.joshlong.restfuliterations</groupId>
            <artifactId>services</artifactId>
        </exclusion>
    </exclusions>
</dependency>    
```

These dependencies can be hard to find. Use the `mvn dependency:tree` command to see where things are being imported *transitively*. Spring Security, another library whose top level types we wanted on the `CLASSPATH`, also required `exclusion` elements because it drags in Spring core.

## [](#some-classes---like-jaxb---you-just-cant-avoid)Some Classes - like JAXB - You Just Can't Avoid

Any class that's not in Android's JDK-class whitelist is not available on Android and thus renders code that depends on it incompatible. Some classes, like those in the JAXB module, are hard to ignore as they're pervasive. I wanted to use the Spring HATEOAS `Resource`, `Link`, types. These types are used as representations of various entities in REST responses that are sometimes rendered as XML using JAXB, they could not be loaded in Android! So, I [had to copy those types locally](https://github.com/joshlong/the-spring-rest-stack/tree/master/code/client/android/src/org/springframework/hateoas) and mirror the package structure and remove the offending annotations. Hopefully I can clean this up going forward.