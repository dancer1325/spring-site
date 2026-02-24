---
title: Introducing Spring Integration Scala DSL
source: https://spring.io/blog/2012/03/05/introducing-spring-integration-scala-dsl
scraped: 2026-02-24T08:25:28.548Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  March 05, 2012 | 0 Comments
---

# Introducing Spring Integration Scala DSL

_Engineering | Oleg Zhurakousky |  March 05, 2012 | 0 Comments_

### Introduction

The Spring Integration team is happy to announce the first milestone release (1.0.0.M1) of the **[Spring Integration Scala DSL](https://github.com/SpringSource/spring-integration-dsl-scala)** - one of the newest additions to [Spring Integration](http://www.springsource.org/spring-integration) portfolio.

> What is the Spring Integration Scala DSL?

The [Spring Integration Scala DSL](https://github.com/SpringSource/spring-integration-dsl-scala) is a Domain Specific Language written in [Scala](http://www.scala-lang.org/) with the goals of:

-   *providing a strongly-typed alternative to XML configuration for Spring Integration*
-   *raising awareness about Spring Integration in Scala community*
-   *providing first class integration with various Scala frameworks and products such as [Akka](http://akka.io/)*
-   *providing seamless integration with Java where Scala developers can still leverage their existing Java investments*

One thing we would like to point out is that the [Spring Integration Scala DSL](https://github.com/SpringSource/spring-integration-dsl-scala/wiki) is not itself a new [EIP](http://www.eaipatterns.com/) framework. Rather, it's a Scala-based DSL that sits on top of the Java-based [Spring Integration framework](http://www.springsource.org/spring-integration), and, in the first milestone, the DSL itself still relies heavily on Java types from the [Spring Integration API](http://static.springsource.org/spring-integration/api/). However, as it progresses through subsequent milestones, the DSL will evolve to become increasingly *Scala-esque*. We do believe that such close integration with the existing java API provides instant reusability, but we also recognize the benefit of providing Scala wrappers and converters over those types in the future.

### Show me

Here is a quick glimpse into the DSL itself:

```scala
Copyval messageFlow =
     filter{payload: String => payload == "World"} -->
     transform{ payload: String => "Hello " + payload} -->
     handle{ payload: String => println(payload) }
    
messageFlow.send("World")
```

. . . and that is all!

Compare this to its Java/XML equivalent:

XML Configuration (config.xml):

```xml
Copy<int:gateway service-interface="foo.bar.MyGateway"
                     default-request-channel="inChannel"/>

<int:filter input-channel="inChannel" 
                expression="payload.equals('World')" 
	        output-channel="transformingChannel"/>
	            
<int:transformer input-channel="transformingChannel" 
                           expression="'Hello ' + payload"
                           output-channel="loggingChannel"/>
                     
<int:service-activator input-channel="loggingChannel" 
              expression="T(java.lang.System).out.println(payload)"/>
```

Java:

```java
Copypublic class SpringIntegrationIntro {

    public static void main(String... strings ){
       ApplicationContext context = 
         new ClassPathXmlApplicationContext("config.xml");
       MyGateway gateway = context.getBean(MyGateway.class);
       gateway.send("World");
    }
	
     public static interface MyGateway {
       public void send(String value);
     }
}
```

The first and perhaps obvious thing you should notice is how much quicker it is to wire something like this using the Scala DSL. But that is not the only benefit. Strong typing and the ability to benefit from other features of a functional language like Scala (e.g., using Scala functions as message processors) are just a few to mention. You can get more information and details from the project's [GitHub website](https://github.com/SpringSource/spring-integration-dsl-scala/wiki) which contains a comprehensive [Introduction](https://github.com/SpringSource/spring-integration-dsl-scala/wiki/Introduction) as well as [How to get started](https://github.com/SpringSource/spring-integration-dsl-scala/wiki/Getting-Started), [DSL Reference](https://github.com/SpringSource/spring-integration-dsl-scala/wiki/Reference) and more.

### Screen-casts

To help you along the way we have also released 2 screen-casts.

The first screen-cast is a short (~15 min) introduction to Spring Integration Scala DSL which also covers the ideas and motivation behind the project - [\[Intro-SI-Scala.mov\]](http://www.youtube.com/watch?v=0Hg9K6ixxzM)

Another screen-cast (~10 min) is a visual supplement to [How to get Started](https://github.com/SpringSource/spring-integration-dsl-scala/wiki/Getting-Started) with Spring Integration Scala DSL which includes a demonstration on how to get started with **Eclipse** based development environment, as well as **IntelliJ IDEA**. - [\[Getting-Started-SI-Scala.mov\]](http://www.youtube.com/watch?v=pOIJEhEn6MU)

### Roadmap

The initial project road-map is available [here](https://github.com/SpringSource/spring-integration-dsl-scala/wiki/Current-Roadmap)

### Feedback

Let us know what you think by using [Spring Integration Forums](http://forum.springsource.org/forumdisplay.php?42-Integration) and [Spring Integration Scala DSL JIRA](https://jira.springsource.org/browse/INTSCALA) or by posting your comments here.