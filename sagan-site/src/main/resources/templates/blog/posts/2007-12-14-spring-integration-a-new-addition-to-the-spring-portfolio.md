---
title: Spring Integration: a new addition to the Spring portfolio
source: https://spring.io/blog/2007/12/14/spring-integration-a-new-addition-to-the-spring-portfolio
scraped: 2026-02-24T09:22:36.153Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  December 14, 2007 | 0 Comments
---

# Spring Integration: a new addition to the Spring portfolio

_Engineering | Mark Fisher |  December 14, 2007 | 0 Comments_

Yesterday morning I presented a 2-part session at [The Spring Experience](http://www.thespringexperience.com) entitled "Enterprise Integration Patterns with Spring". The first presentation included an overview of core Spring support for enterprise integration - including JMS, remoting, JMX, scheduling, and email. That presentation also included a high-level discussion of several of the [Enterprise Integration Patterns](http://www.eaipatterns.com) introduced in the book of the same name by Gregor Hohpe and Bobby Woolf. In the second presentation, I officially unveiled "Spring Integration" - a new addition to the Spring portfolio. Spring Integration builds upon Spring's core support while providing a higher level of abstraction largely inspired by those patterns. Here I would like to provide a brief overview of the topics I discussed in that session. You can also read two articles about Spring Integration that appeared yesterday on [eWeek](http://www.eweek.com/article2/0,1895,2233544,00.asp) and [InfoWorld](http://www.infoworld.com/article/07/12/13/spring-integration_1.html).

First I described the goals and motivations of Spring Integration - namely that the implementation model should be simple and non-invasive - providing philosophical consistency with core Spring principles. Business components should be decoupled from the underlying messaging infrastructure and therefore testable in isolation. The framework should hide the complexities of thread-management while still enabling full configurability of thread pools, queue capacities, and scheduling parameters. Custom extension points should be provided as well-defined strategy interfaces. It should be possible to use dynamic languages for integration logic, such as routing and transformation. Configuration options should include generic XML, domain-specific namespace support, and annotations. While building upon these core Spring principles, the implementation will be leveraging core Spring features including lifecycle management, task execution, aspect-oriented programming, transaction management, dynamic language support, JMS, remoting, mail, and scheduling.

By following those goals and motivations, Spring Integration will simplify development of enterprise integration solutions. Since the concepts and implementations are so consistent, it will facilitate incremental adoption for existing Spring users who are beginning to explore SOA and EDA. Finally, as a member of the Spring portfolio, it will provide seamless compatibility and timely co-evolution with other products in the Spring portfolio.

After discussing those goals and motivations, I walked through the API. The core components are the Message, MessageChannel, and MessageEndpoint. A Message is a container for any type of data as well as a header that provides common messaging properties (id, correlation id, expiration, return address, sequence info, etc.). A MessageChannel provides send and receive methods, and those methods accept a timeout. The receive methods also accept a MessageSelector with a single method: *boolean accept(Message message)*. Here is the basic interface definition for a MessageChannel

```java
Copy
public interface MessageChannel {
    boolean send(Message message);
    boolean send(Message message, long timeout);
    Message receive();
    Message receive(long timeout);
    Message receive(MessageSelector selector);
    Message receive(MessageSelector selector, long timeout); 
}
```

A MessageEndpoint connects a MessageHandler to an inbound MessageChannel and/or an outbound MessageChannel. The MessageHandler is a generic interface that provides a foundation for transformers, routers, and any other component that *handles* an incoming Message.

```java
Copy
public interface MessageHandler {
    Message handle(Message message);
}
```

Channel Adapters are used for sending to and receiving from external data sources. For example, to send a JMS message, an OutboundJmsChannelAdapter is provided. When configuring the messaging system, that adapter can be sent messages as if it were just another channel. A MessageBus wires together the various endpoints and channels. This is consistent with the way that a Spring ApplicationContext wires together objects. In fact, the MessageBus is itself an ApplicationContextAware object and detects the various messaging components from its context. This is very similar to the behavior of a DispatcherServlet in a Spring MVC application. Spring Integration's namespace support provides a concise way to configure the components:

```xml
Copy
<integration:message-bus/>

<integration:channel id="quotes"/>

<integration:endpoint input-channel="quotes" handler-ref="logger" handler-method="log">
   <integration:consumer period="1000"/>
</integration:endpoint>
```

Alternatively, there is support for annotations:

```java
Copy
@MessageEndpoint(input=&ldquo;inputChannel&rdquo;, defaultOutput=&ldquo;outputChannel&rdquo;)&rdquo;
public class SimpleAnnotatedEndpoint {

    @Handler
    public String sayHello(String name) {
        return "Hello " + name;
    }
}
```

Annotations for transformation and routing (e.g. @Router, @Splitter, and @Aggregator) will also be supported. Additionally, "channel adapters" can be created with annotations, such as @Polled for input and @DefaultOutput for output if the handler returns a message and that message does not provide its own 'return address'. For example, the following endpoint would print out "Hello World" every 5 seconds:

```java
Copy
@MessageEndpoint
public class SampleAnnotatedEndpoint {

    @Polled(period=5000)&rdquo;
    public String getName() {
        return "World";
    }

    @Handler
    public String sayHello(String name) {
        return "Hello " + name;
    }

    @DefaultOutput
    public void display(String message) {
        System.out.println(message);
    }
}
```

The @MessageEndpoint also works "out of the box" with Spring 2.5's new component-detection capabilities. Therefore the above example would not require any XML configuration at all. For an even simpler way to create an endpoint for a single method, you can use the @Subscriber annotation on that method:

```java
Copy
@Subscriber(channel=&ldquo;testChannel&rdquo;)&rdquo;
public void test(String s) {
    â¦
}
```

That annotation and a corresponding @Publisher are both enabled with a single 'annotation-driven' element from the Spring Integration namespace. The @Publisher builds upon Spring AOP in order to publish the return-value of a method. It will also support other advice types, such as 'before' and 'after-throwing'.

The examples above are based on a 0.5 version of Spring Integration. Therefore, these interfaces and annotations are subject to change. In fact, we are particularly interested in feedback during this early phase. I have already had several interesting discussions with attendees here at [The Spring Experience](http://www.thespringexperience.com) who are very excited by the possibilities of this new offering. The 1.0 Milestone 1 release will be available in early January, and the 1.0 Final release will be available by Q2 2008. The 1.0 Final version will support multiple configuration formats (XML, namespace, and annotations), point-to-point and publish/subscribe channels, and several adapters (minimally: JMS, RMI, HttpInvoker, Hessian/Burlap, File, EMail, JDBC, stream, and Spring ApplicationEvents). It will also work seamlessly with Spring's transaction management and dynamic language support. Finally, it will integrate with other Spring portfolio products such as Spring Web Services, Spring Web Flow, Spring MVC, Spring Batch, and Spring Security. Of course, we will also be working closely with the Spring Dynamic Modules project to OSGi-enable the messaging components.

Stay tuned to this blog for more information in the coming days including the public availability of the code repository. Also, be sure to read those articles that appeared yesterday at [eWeek](http://www.eweek.com/article2/0,1895,2233544,00.asp) and [InfoWorld](http://www.infoworld.com/article/07/12/13/spring-integration_1.html).