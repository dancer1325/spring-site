---
title: A quality @Qualifier
source: https://spring.io/blog/2014/11/04/a-quality-qualifier
scraped: 2026-02-23T22:09:24.082Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  November 04, 2014 | 11 Comments
---

# A quality @Qualifier

_Engineering | Josh Long |  November 04, 2014 | 11 Comments_

Sometimes, *teh Twitterz* is an amazing place. Just last week I spent some time helping clarify the behavior of Spring's `@Qualifier` annotation, which is both older than JSR 330 *and* offers a richer superset of JSR 330's `@Qualifier` annotation. These misguided few seemed to be under the impression that Spring's annotation didn't offer the same degree of type-safety as the JSR 330 annotation. I don't know if it's because they simply hadn't read up on the support (which is fairly new, since it's only been around since 2007), or if it's because they work for companies that make their money if you stop using Spring, but either way it was an excellent opportunity for a refresher!

The qualifier annotation helps disambiguate bean references when Spring would otherwise not be able to do so. Spring's XML configuration supports a version of this, but without the type-safety, of course. We'll focus in this example on using Java configuration and component-scanning to register beans. As more people move to Spring's 8-year old Java configuration style this question seems to more frequently come up. Spring Boot is a Java configuration-first approach to building applications, and this technique may just come in handy in a pinch in a larger application based on Spring Boot.

It's use is simple. Suppose you have two beans that implement the `MarketPlace` interface. If you declare an array of `MarketPlace`s - then Spring will provide all beans that implement that interface:

```java
Copy@Autowired
private MarketPlace[] marketPlaces; 
```

If you want to inject just one, you need to disambiguate the references. You can, in the simple case, just do so by bean ID:

```java
Copy@Autowired 
@Qualifier( "ios") // the use is unique to Spring. It's darned convenient, too!
private MarketPlace marketPlace ;

```

This assumes you've elsewhere defined a bean whose ID is `ios`. This use is unique to Spring. You can also use `@Qualifier` to create a type-safe binding that links the bean definition to the injection site by the qualities of the qualifier annotation. Here's an example based on pureplay Spring annotations:

```java
Copy
package spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static spring.Spring.Platform;

@Configuration
@ComponentScan
public class Spring {

    public static void main(String[] args) {
        new AnnotationConfigApplicationContext(Spring.class);
    }

    @Autowired
    @Platform(Platform.OperatingSystems.ANDROID)
    private MarketPlace android;

    @Autowired
    @Platform(Platform.OperatingSystems.IOS)
    private MarketPlace ios;

    @PostConstruct
    public void qualifyTheTweets() {
        System.out.println("ios:" + this.ios);
        System.out.println("android:" + this.android);
    }

    // the type has to be public!
    @Target({ElementType.FIELD,
            ElementType.METHOD,
            ElementType.TYPE,
            ElementType.PARAMETER})
    @Retention(RetentionPolicy.RUNTIME)
    @Qualifier
    public static @interface Platform {

        OperatingSystems value();

        public static enum OperatingSystems {
            IOS,
            ANDROID
        }
    }
}

interface MarketPlace {
}

@Component
@Platform(Platform.OperatingSystems.IOS)
class AppleMarketPlace implements MarketPlace {

    @Override
    public String toString() {
        return "apple";
    }
}

@Component
@Platform(Platform.OperatingSystems.ANDROID)
class GoogleMarketPlace implements MarketPlace {

    @Override
    public String toString() {
        return "android";
    }
}

```

To compile and run this example, make sure you have `org.springframework.boot:spring-boot-starter:1.1.8.RELEASE` on the CLASSPATH.

This example shows the definition of two `MarketPlace` implementations, one for `GoogleMarketPlace` and one for the `AppleMarketPlace`. We define an annotation `@Platform` that takes a parameter of type `Platform.OperatingSystems`. This annotation is itself annotated with `@Qualifier` which tells Spring to treat it as a qualifier. The bean definitions are annotated accordingly: the `GoogleMarketPlace` is annotated with `@Platform(Platform.OperatingSystems.ANDROID)` and the `AppleMarketPlace` is annotated with `    @Platform(Platform.OperatingSystems.IOS)`. Injecting either one (in the `Spring` class) then becomes as simple as using the `@Qualifier` annotation at the injection site. I'm using field injection here, though this is just a scratchpad to flesh things out. Obviously, in any sort of *real* code you should prefer constructor and setter injection.

Spring natively supports JSR 330, as well. After all, we did help lead that initiative. Here's the equivalent example using JSR 330 alternatives. `@Component` becomes `@Named`, `@Autowired` becomes `@Inject` and `@Qualifier` becomes `@javax.inject.Qualifier`, but otherwise this should look very familiar.

```java
Copy
package jsr330;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.inject.Named;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static jsr330.Jsr330.Platform;

@Configuration
@ComponentScan
public class Jsr330 {

    public static void main(String[] args) {
        new AnnotationConfigApplicationContext(Jsr330.class);
    }

    @Inject
    @Platform(Platform.OperatingSystems.ANDROID)
    private MarketPlace android;

    @Inject
    @Platform(Platform.OperatingSystems.IOS)
    private MarketPlace ios;

    @PostConstruct
    public void qualifyTheTweets() {
        System.out.println("ios:" + this.ios);
        System.out.println("android:" + this.android);
    }

    // the type has to be public!
    @Target({ElementType.FIELD,
            ElementType.METHOD,
            ElementType.TYPE,
            ElementType.PARAMETER})
    @Retention(RetentionPolicy.RUNTIME)
    @javax.inject.Qualifier
    public static @interface Platform {

        OperatingSystems value();

        public static enum OperatingSystems {
            IOS,
            ANDROID
        }
    }
}

interface MarketPlace {
}

@Named
@Platform(Platform.OperatingSystems.IOS)
class AppleMarketPlace implements MarketPlace {

    @Override
    public String toString() {
        return "apple";
    }
}

@Named
@Platform(Platform.OperatingSystems.ANDROID)
class GoogleMarketPlace implements MarketPlace {

    @Override
    public String toString() {
        return "android";
    }
}

```

To compile and run this example, make sure you have `org.springframework.boot:spring-boot-starter:1.1.8.RELEASE` *and* `javax.inject:javax.inject:1` on the CLASSPATH.

Is any of this new? No. That's the point. This has been possible since Spring 2.5 (which we released in 2007). It's surprising that people still don't know about this functionality, but hopefully this blog makes it easier for people to get started. As a next step, [check out the documentation (from 2.5 onwards!)](http://docs.spring.io/spring/docs/2.5.x/reference/beans.html#beans-autowired-annotation-qualifiers) which covers every gory detail - including the XML alternative - in depth!

I should mention that - in practice - I haven't needed to do this a lot in my code. Maybe a dozen times in the last 7 years. It can be handy, though!