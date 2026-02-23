---
title: A Groovy DSL For Spring Integration
source: https://spring.io/blog/2012/11/06/a-groovy-dsl-for-spring-integration
scraped: 2026-02-23T12:57:47.473Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | David Turanski |  November 06, 2012 | 3 Comments
---

# A Groovy DSL For Spring Integration

_Engineering | David Turanski |  November 06, 2012 | 3 Comments_

Spring Integration implements [Enterprise Integration Patterrns](http://http://www.eaipatterns.com/) using the Spring programming model to enable messaging in Spring-based applications. Spring Integration also provides integration with external systems using declarative adapters supporting jms, http, amqp, tcp, ftp(s), smtp, and so on. Currently, configuring message flows is primarily done via Spring XML and Spring Integration supports several namespaces to make this as succinct as possible. Earlier this year, SpringSource released a [Scala DSL](http://blog.springsource.org/2012/03/05/introducing-spring-integration-scala-dsl/) for Spring Integration. Now, we are pleased to announce the first milestone release (1.0.0.M1) of a [Groovy DSL](https://github.com/SpringSource/spring-integration-dsl-groovy).

Both of these DSLs share a common goal - to provide a powerful and flexible alternative to XML configuration for Spring Integration. The two languages are also semantically similar since the Groovy DSL draws from concepts introduced by the Scala DSL. Additionally, both are essentially a facade atop [Spring Integration](www.springsource.org/spring-integration). However the similarities end here. Many of the differences can be attributed to language differences between Scala and Groovy, most notably, static vs dynamic typing. The Groovy DSL is targeted primarily at Groovyists, who are comfortable with the hierarchical syntax of the [builder pattern](http://groovy.codehaus.org/Builders) on which the DSL is based. This should also appeal to Java developers who can take advantage of the rich features a DSL has to offer and will find the syntax very approachable.

## Hello World

Let's start at the beginning with a Groovy example:

```groovy
Copy
def builder = new IntegrationBuilder()

def flow = builder.messageFlow {
   transform {"hello, $it"}
   handle {println it}
}

flow.send('world')
```

This creates a Spring application context, constructs a Spring Integration message flow consisting of a transformer (transform) and a service activator (handle) and wires these endpoints with direct channels so that they will be executed in sequence. The transformer appends the message payload ("world" in this case) to the string "hello, " and the service activator prints the result to STDOUT. Voila! Here we see a simple instance of the builder pattern. For those who are not familiar with Groovy, this is valid Groovy syntax. *messageFlow*, *transform*, and *handle* are all methods defined by the DSL. The {} is Groovy syntax for a closure. Since parentheses and semicolons are optional in Groovy, this is equivalent to :

```groovy
Copy
def flow = builder.messageFlow({
   transform({"hello, $it"});
   handle({println(it)});
});
```

Also, I should mention that, by default Groovy closures expect a single argument named 'it'. Closure arguments may be named and optionally typed. For example:

```groovy
Copy
   transform {String payload -> "hello,  $payload"}
```

One more thing. Groovy allows you to embed variable expressions in double quoted Strings. This is not intended to be a Groovy tutorial, but suffice it to say that all Groovy's syntactic sugar makes for very sweet, concise and readable code. By the way, the equivalent XML for this is

```xml
Copy
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:si="http://www.springframework.org/schema/integration" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/integration http://www.springframework.org/schema/integration/spring-integration.xsd">
   
   <si:transformer id="t1" input-channel="flow1.inputChannel" output-channel="sa1.inputChannel" expression="'Hello,' + payload"/>
   <si:service-activator id="sa1" input-channel="sa.inputChannel" expression = "T(java.lang.System).out.println(payload)"/>
</beans>
```

And then we would have to write about ten lines of code to initialize the Spring application context and send a message.

To run the DSL example in Java, there are a few options. One way is to load and run an external DSL script:

HelloWorld.groovy

```groovy
Copy
 messageFlow {
    transform {"hello, $it"}
    handle {println it}
 }
 
```

Main.java

```java
Copy
public class Main {
    public static void main(String[] args) {
          IntegrationBuilder builder = new IntegrationBuilder();
          MessageFlow flow = (MessageFlow) builder.build(new File("HelloWorld.groovy"));
          flow.send("world");
    }
}
```

In addition to a File instance, as shown above, the build() method also accepts an InputStream, GroovyCodeSource, Spring Resource, even a groovy.lang.Script. So if you compile your project with the Groovy compiler, you can do something like this, where HelloWorld is an instance of groovy.lang.Script.

```java
Copy
public class Main {
    public static void main(String[] args) {
          IntegrationBuilder builder = new IntegrationBuilder();
          MessageFlow flow = (MessageFlow) builder.build(new HelloWorld()));
          flow.send("world");
    }
}
```

## Next Steps

Hopefully, this brief introduction illustrates how easy the DSL is to use. If you want to take it to the next level, the [spring-integration-dsl-groovy Github repository](https://github.com/SpringSource/spring-integration-dsl-groovy) includes a [DSL User's Guide](https://github.com/SpringSource/spring-integration-dsl-groovy/wiki/DSL-User's-Guide) which describes the DSL's features in more detail with lots of examples.