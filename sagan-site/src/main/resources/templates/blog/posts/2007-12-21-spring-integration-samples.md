---
title: Spring Integration Samples
source: https://spring.io/blog/2007/12/21/spring-integration-samples
scraped: 2026-02-24T09:22:22.851Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Mark Fisher |  December 21, 2007 | 0 Comments
---

# Spring Integration Samples

_Engineering | Mark Fisher |  December 21, 2007 | 0 Comments_

In my [recent post](http://blog.interface21.com/main/2007/12/14/spring-integration-a-new-addition-to-the-spring-portfolio), I had mentioned that the Subversion repository for Spring Integration would be publicly accessible soon, and I'm pleased to provide that link now. You can checkout the project with the following command:

```code
Copysvn co https://anonsvn.springframework.org/svn/spring-integration/base/trunk spring-integration
```

If the checkout is successful, you should see the following directory structure:

```code
Copyspring-integration/
  +--build-spring-integration/
  +--spring-build/
  +--spring-integration-core/
  +--spring-integration-samples/
```

I would like to take this opportunity to walk through a couple of the samples that are in 'spring-integration-samples'. Keep in mind this project is definitely a work-in-progress (currently a 0.5 SNAPSHOT), but the samples should give you an idea of how the programming model is taking shape, and I'm very much looking forward to getting some feedback.

## Hello World

The first sample is the obligatory "Hello World" demo. This one demonstrates the main components: Message Channel and Message Endpoint. This demo also reveals how the Spring Integration approach is non-invasive - providing a complete separation of concerns between business logic and messaging. In this case, the "business logic" is a simple *HelloService*:

```java
Copy
public class HelloService {

    public String sayHello(String name) {
        return "Hello " + name;
    }
}
```

This example uses an XML-based configuration for the Message Endpoint (we'll see the annotation approach next):

```xml
Copy
<endpoint input-channel="inputChannel"
               default-output-channel="outputChannel"
               handler-ref="helloService"
               handler-method="sayHello"/>
```

There you see that 'handler-ref' simply points to a Spring-managed bean. If you have used Spring's *MessageListenerAdapter* for asynchronous JMS reception, then this should look familiar - especially if you are using Spring 2.5's new *jms* namespace and the "jms:listener" element. Finally, the *HelloWorldDemo* starts the application context and then interacts with the channels:

```java
Copy
ChannelRegistry channelRegistry = (ChannelRegistry) context.getBean(MessageBusParser.MESSAGE_BUS_BEAN_NAME);
MessageChannel inputChannel = channelRegistry.lookupChannel("inputChannel");
MessageChannel outputChannel = channelRegistry.lookupChannel("outputChannel");
inputChannel.send(new StringMessage(1, "World"));
System.out.println(outputChannel.receive().getPayload());
```

That example involves lookup of the MessageBus bean - which implements the ChannelRegistry interface. However, in a non-demo "real world" scenario, any component that would access channels can have the registry provided via dependency injection. All it needs to do is implement *ChannelRegistryAware* (or use @Autowired). This is the same approach used elsewhere in Spring - such as *ApplicationEventPublisherAware*.

## Annotation-driven Endpoint and Subscriber

The next example shows how to configure a Message Endpoint with annotations. In fact, this particular endpoint even provides the data that is translated (behind the scenes) into Message payload content with the @Polled method annotation. It could alternatively provide an input channel for receiving messages asynchronously.

```java
Copy
@MessageEndpoint(defaultOutput="quotes")
public class QuotePublisher {

    @Polled(period=300)
    public Quote getQuote() {
        BigDecimal price = new BigDecimal(new Random().nextDouble() * 100);
        return new Quote(generateTicker(), price.setScale(2, RoundingMode.HALF_EVEN));
    }

    private String generateTicker() {
        // randomly generates 3-letter tickers
    }
}
```

On the receiving side, there is a @Subscriber annotation:

```java
Copy
public class QuoteSubscriber {

    @Subscriber(channel="quotes")
    public void log(Object o) {
        System.out.println(o);
    }
}
```

Here is the XML which registers the annotation post-processor and the 2 Spring-managed beans (notice that this example is using the 'spring-integration' schema as the primary namespace.

```xml
Copy
<beans:beans xmlns="http://www.springframework.org/schema/integration"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:beans="http://www.springframework.org/schema/beans"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
                http://www.springframework.org/schema/beans/spring-beans-2.5.xsd
                http://www.springframework.org/schema/integration
                http://www.springframework.org/schema/integration/spring-integration-1.0.xsd">

    <message-bus/>

    <annotation-driven/>

    <channel id="quotes"/>

    <beans:bean id="publisher" class="org.springframework.integration.samples.quote.QuotePublisher"/>

    <beans:bean id="subscriber" class="org.springframework.integration.samples.quote.QuoteSubscriber"/>

</beans:beans>
```

By the way, the 'annotation-driven' element also enables the @Publisher annotation which triggers the creation of AOP advice for asynchronously sending the return value of any annotated method to a channel.

## Simple Routing

The routing sample features a Message Endpoint that produces an incrementing integer every 3 seconds and a router that resolves the target channel name (note that a router method can also return more than one result and can return actual MessageChannel instances rather than names).

```java
Copy
@MessageEndpoint
public class Counter {

    private AtomicInteger count = new AtomicInteger();

    @Polled(period=3000)
    public int getNumber() {
        return count.incrementAndGet();
    }

    @Router
    public String resolveChannel(int i) {
        if (i % 2 == 0) {
            return "even";
        }
        return "odd";
    }
}
```

On the receiving end of these channels, we have 2 different methods that simply log the message payload:

```java
Copy
@Component
public class NumberLogger {

    @Subscriber(channel="even")
    public void even(int i) {
        System.out.println("even: " + i);
    }

    @Subscriber(channel="odd")
    public void odd(int i) {
        System.out.println("odd:  " + i);
    }
}
```

By the way, notice that the *NumberLogger* is annotated with Spring's @Component. The @MessageEndpoint annotation also contains @Component as a meta-annotation. Both are therefore "stereotypes" and eligible for autodetection with Spring 2.5's classpath-scanning. The XML for this example is extremely simple:

```xml
Copy
<context:component-scan base-package="org.springframework.integration.samples.oddeven"/>

<message-bus auto-create-channels="true"/>

<annotation-driven/>
```

---

Hopefully this provides a decent introduction to the Spring Integration programming model. Feel free to checkout the code and try out these samples yourself. I am currently working on a "Getting Started" guide that I will make available after the holidays. If you do checkout the code, please be sure to update frequently. The code is constantly evolving, and in particular I am refactoring much of the core consumer/dispatcher code with the goal of providing the simplest possible extension points for adding either polling or event-driven message sources. In the next blog post, I plan to show some new additions to the 'spring-integration-samples' featuring those extension points.