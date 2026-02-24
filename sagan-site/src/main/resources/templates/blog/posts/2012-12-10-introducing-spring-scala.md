---
title: Introducing Spring Scala
source: https://spring.io/blog/2012/12/10/introducing-spring-scala
scraped: 2026-02-24T08:12:06.693Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  December 10, 2012 | 7 Comments
---

# Introducing Spring Scala

_Engineering | Arjen Poutsma |  December 10, 2012 | 7 Comments_

Last October, at [SpringOne2GX](https://springone2gx.com/conference/washington/2012/10/session?id=27682), I introduced the Spring Scala project to the world. Since then, I've also presented this project at [Devoxx](http://www.devoxx.com/display/DV12/Using+Spring+in+Scala). In this blog post, I would like to give further details about this project and how you can use it in your Scala projects.

## Why Spring Scala?

The goal of the Spring Scala project is simply to **make it easier to use the Spring framework in Scala**. We believe that there are many Spring users out there who want to try Scala out, but do not want to leave their experience with Spring behind. This project is meant for those people.

Obviously, you can use the (Java) Spring Framework in Scala today, without Spring Scala. But doing so will be awkward in certain places. Just like any programming language, Scala has its own, different way of doing things, and using a pure Java framework like Spring in Scala will just feel "too Java-esque". Spring Scala tries to fix this by making Spring a first-class citizen of the Scala language.

## Spring Scala Overview

Spring Scala is a work in progress. In the rest of this post, I will focus on the features that are currently implemented. However, we expect many additional features to be added in the coming months, hopefully through feedback that you provide us. So if you have an idea for a feature that will make Spring more enjoyable to use in Scala, please let us know by filing a [JIRA issue](https://jira.springsource.org/browse/SCALA) or leaving a comment.

### Wiring up beans in XML

The easiest and preferred way to wire up a Scala Bean in a Spring XML application context is to use constructor injection. For example, imagine we have the following Scala class:

```scala
Copy
class Person(val firstName: String, val lastName: String)
```

You can wire up this class like so, using the c namespace:

```xml
Copy
<bean id="person" class="Person" c:firstName="John" c:lastName="Doe"/>
```

Note that, by using constructor injection in combination with a `val`, we also made the `Person` class immutable. Functional languages, such as Scala, encourage immutable data structures. As such, **constructor injection is preferred when using Spring in Scala**. Also note that constructor injection works out-of-the-box; you do not need the Spring Scala jar on the class path for it to work.

When it comes to setter injection, things become a bit more complicated. By default, Scala classes do not follow the JavaBeans property contract (eg. `String getFoo()` and `void setFoo(String)`). Instead, Scala has its own property contract: "getters" aren't prefixed by `get`, but rather use the field name as method name (eg. `foo: String`). Scala setters suffix the field name with `*=*` *(eg.`foo`*`=(String): Unit`).

To work around this issue, you can either instruct the Scala compiler to generate JavaBeans getters and setters by using the `@scala.reflect.BeanProperty` annotation; or you can add Spring Scala to your class path to enable support for Scala setters.

Using `@BeanProperty` is as simple as annotating a `var` with it:

```scala
Copy
class Person(@BeanProperty var firstName: String, @BeanProperty var lastName: String)
```

This will result in JavaBean-style setters being created for this class, so that you can wire it up in XML quite simply:

```xml
Copy
<bean id="constructor" class="Person" p:firstName="John" p:lastName="Doe"/>
```

As alternative to using this annotation, as of version 3.2, Spring supports arbitrary getters and setters using the `BeanInfoFactory` strategy interface. The Spring Scala project contains an implementation of this interface that supports Scala getters and setters. This implementation will automatically be detected by Spring, there is no need for additional configuration.

In practical terms, this means that putting the Spring Scala jar on the class path will enable support for Scala properties, and that you can use the above XML configuration to wire up the `Person` class without adding `@BeanProperty` annotations.

For more information about wiring up Scala beans in Spring XML, refer to the [relevant section](https://github.com/SpringSource/spring-scala/wiki/Defining-Scala-Beans-in-Spring-XML) of the Spring Scala documentation wiki. Also take a look at the section on [wiring up Scala Collections in Spring XML](https://github.com/SpringSource/spring-scala/wiki/Wiring-up-Scala-Collections-in-Spring-XML).

### Wiring up beans in Scala

In addition to defining beans in XML, Spring Scala offers an alternative that uses Scala classes instead of XML files to configure your Spring beans. This approach is similar to using [@Configuration](http://static.springsource.org/spring/docs/3.1.x/spring-framework-reference/html/beans.html#beans-java-basic-concepts) in Spring Java, except that it is based on functions rather than annotations.

To create a functional Spring configuration, you simply have to mix in the `FunctionalConfiguration` trait into your configuration class. Beans are defined by calling the `bean` method on the trait and passing on a function that creates the bean.

Given the `Person` class shown above, we can wire it up in a functional configuration as follows:

```scala
Copy
class PersonConfiguration extends FunctionalConfiguration {
    bean() {
        new Person("John", "Doe")
    }
}
```

Of course, you can also register a bean under a specific name, provide aliases, or set the scope:

```scala
Copy
class PersonConfiguration extends FunctionalConfiguration {
    bean("john", aliases = Seq("doe"), scope = BeanDefinition.SCOPE_PROTOTYPE) {
        new Person("John", "Doe")
    }
}
```

You can then use this configuration class to create a Spring application context:

```scala
Copy
object PersonConfigurationDriver extends App {
    val applicationContext = new FunctionalConfigApplicationContext(classOf[PersonConfiguration])
    val john = applicationContext.getBean(classOf[Person])
    println(john.firstName)
}
```

For more information about Functional Bean Configurations, including sections on strongly-typed bean references, how to import XML files and @Configuration classes and how to wrap bean definitions in profiles, refer to the [relevant section](https://github.com/SpringSource/spring-scala/wiki/Functional-Bean-Configuration) of the Spring Scala documentation wiki.

### Using Spring Templates in Scala

Spring's templates are helpful utility classes that facilitate any sort of data access, or resource handling in general. Spring Scala contains wrappers that adapt the (Java) templates to be more Scala friendly. In general, these Scala template wrapper contain three improvements over the Java version when in comes to usage in the Scala language:

-   Use of functions instead of callback interfaces
-   Use of `Option` where the Java version could return `null`
-   Use class manifests instead of class parameters

With these three improvements, you can use the `JmsTemplate`, for example, as follows:

```scala
Copy
val connectionFactory : ConnectionFactory = ...
val template = new JmsTemplate(connectionFactory)

template.send("queue") {
    session: Session => session.createTextMessage("Hello World")
}

template.receive("queue") match {
    case Some(textMessage: TextMessage) => println(textMessage.getText)
    case _ => println("No text message received")
}
```

In general, the Scala version of the template wrappers live in the same package as their Java counterparts, except that there is a `scala` package in between. So the Scala version of the `JmsTemplate` lives in `org.springframework.scala.jms.core`, for instance. As of writing this post, the following Scala-friendly templates exist:

-   SimpleJdbcTemplate
-   JmsTemplate
-   RestTemplate
-   TransactionTemplate

For more information about using the Spring Templates in Scala, refer to the [relevant section](https://github.com/SpringSource/spring-scala/wiki/Using-Spring-Templates-in-Scala) of the Spring Scala documentation wiki.

## Availability

A first milestone of Spring Scala is available for download at our milestone repository, [http://repo.springsource.org/libs-milestone](http://repo.springsource.org/libs-milestone). For Maven users:

```xml
Copy
<repositories>
    <repository>
        <id>milestone.repo.springsource.org</id>
        <name>repo.springsource.org-milestone</name>
        <url>https://repo.springsource.org/libs-milestone</url>
    </repository>
</repositories>
<dependency>
    <groupId>org.springframework.scala</groupId>
    <artifactId>spring-scala</artifactId>
    <version>1.0.0.M2</version>
</dependency>
```

The project itself is available at [GitHub](https://github.com/SpringSource/spring-scala). If you would like to contribute, you can do so by filing a [JIRA](https://jira.springsource.org/browse/SCALA) for a feature request, or by leaving a pul request at GitHub.

**Note** that as of 2013-04-02, a new milestone has been published. Read [the forum announcement](http://forum.springsource.org/showthread.php?136036-Spring-Scala-1-0-0-M2-has-been-released).