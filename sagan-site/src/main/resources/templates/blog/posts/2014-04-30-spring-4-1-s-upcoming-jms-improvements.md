---
title: Spring 4.1\'s Upcoming JMS Improvements
source: http://spring.io/blog/2014/04/30/spring-4-1-s-upcoming-jms-improvements
scraped: 2026-02-24T07:25:15.000Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Stéphane Nicoll |  April 30, 2014 | 5 Comments
---

# Spring 4.1's Upcoming JMS Improvements

_Engineering | Stéphane Nicoll |  April 30, 2014 | 5 Comments_

Spring Framework 4.0 introduced a new `spring-messaging` module, adding a selection of Spring Integration types such as the core `Message` abstraction. Spring 4.1 aligns its JMS support to allow you to benefit from that abstraction. But before diving into that, I'd like to show you in details how we further improved the infrastructure for listener endpoints.

# [](#annotation-driven-listener-endpoints)Annotation-driven listener endpoints

You are probably used to the `<xyz:annotation-driven>` element or the `@Enable*` counterpart and perhaps you were looking for something similar for JMS. Look no further: the next major release of the Spring framework will allow you to define JMS listeners with a simple annotation.

```java
Copy@Component
public class MyService {

    @JmsListener(containerFactory = "myContainerFactory", destination = "myQueue")
    public void processOrder(String data) { ... }

}
```

The following configuration (ignoring the JMS infrastructure setup) creates a JMS message listener container under the covers on the `myQueue` destination and will call `processOrder` whenever a message is available:

```java
Copy@Configuration
@EnableJms
public class AppConfig {
	
    @Bean
    public DefaultJmsListenerContainerFactory myContainerFactory() {
        DefaultJmsListenerContainerFactory factory =
                new DefaultJmsListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory());
        factory.setDestinationResolver(destinationResolver());
        factory.setConcurrency("3-10");
        return factory;
    }
}
```

This is the equivalent using the XML namespace:

```xml
Copy<jms:annotation-driven/>

<bean id="myContainerFactory"
        class="org.springframework.jms.config.DefaultJmsListenerContainerFactory">
    <property name="connectionFactory" ref="connectionFactory"/>
    <property name="destinationResolver" ref="destinationResolver"/>
    <property name="concurrency" value="3-10"/>
</bean>
```

As usual, `@JmsListener` can be placed directly on the method or indirectly using a meta-annotation. The annotation has the usual options that are provided for quite some time by the `jms:listener` XML element. The `containerFactory` is new however and refers to the name of the `JmsListenerContainerFactory`, an equivalent of what you've been used to configure in the `<jms:listener-container>` element.

If you want to smoothly transition from your existing configuration, we have added a `factory-id` attribute to that element. When it is present, the configuration is automatically exposed as a `JmsListenerContainerFactory` bean with that name. This XML configuration is the equivalent of the `myJmsContainerFactory` bean above:

```xml
Copy<jms:listener-container factory-id="myContainerFactory" 
               connection-factory="connectionFactory"
               destination-resolver="destinationResolver"
               concurrency="3-10"/>
```

As a single container factory setup can be fairly common, the `containerFactory` attribute can be omitted if a default one has either been set or discovered. By default, we look up for a bean named `jmsListenerContainerFactory`.

The configuration of this infrastructure can be customized in several ways by implementing the `JmsListenerConfigurer` interface. Like we just mentioned, the default container factory to use can be specified explicitly but this callback interface also allows you to register JMS endpoints programmatically!

```java
Copy@Configuration
@EnableJms
public class AppConfig implements JmsListenerConfigurer {

    @Override
    public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {
        registrar.setDefaultContainerFactory(defaultContainerFactory());

        SimpleJmsListenerEndpoint endpoint = new SimpleJmsListenerEndpoint();
        endpoint.setDestination("anotherQueue");
        endpoint.setMessageListener(message -> {
            // processing
        });
        registrar.registerEndpoint(endpoint);
    }

    @Bean
    public DefaultJmsListenerContainerFactory defaultContainerFactory() {
        ...
    }

```

The sample above sets the default `JmsListenerContainerFactory` and also configures an additional endpoint on `anotherQueue`. `JmsListenerEndpoint` models your endpoint and is responsible for configuring the container for that model. In the example above, we used `SimpleJmsListenerEndpoint` which provides the actual `MessageListener` to invoke but you could just as well build your own endpoint variant describing a custom invocation mechanism. `MethodJmsListenerEndpoint` is another example that is used by all endpoints annotated with `@JmsListener`.

# [](#messaging-abstraction)Messaging abstraction

So far, we have been injecting a simple `String` in our endpoint but it can actually have a very flexible method signature. Let's rewrite it to inject the `Order` with a custom header:

```java
Copy@Component
public class MyService {

    @JmsListener(destination = "myQueue")
    public void processOrder(Order order,  @Header("order_type") String orderType) {
        ...
    }
}
```

These are the main elements you can inject in JMS listener endpoints:

-   The raw `javax.jms.Message` or any of its subclasses (provided of course that it matches the incoming message type).
-   The `javax.jms.Session` for optional access to the native JMS API e.g. for sending a custom reply.
-   The `org.springframework.messaging.Message` representing the incoming JMS message. Note that this message holds both the custom and the standard headers (as defined by `JmsHeaders`).
-   `@Header`\-annotated method arguments to extract a specific header value, including standard JMS headers.
-   `@Headers`\-annotated argument that must also be assignable to `java.util.Map` for getting access to all headers.
-   A non-annotated element that is not one of the supported types (i.e. `Message` and `Session`) is considered to be the payload. You can make that explicit by annotating the parameter with `@Payload`. You can also turn on validation by adding an extra `@Validated`.

The ability to inject Spring's `Message` abstraction is particularly useful to benefit from all the information stored in the transport-specific message without relying on transport-specific API.

```java
Copy@JmsListener(destination = "myQueue")
public void processOrder(Message<Order> order) { ... }
```

These features are provided under the covers for all annotated elements. It is possible to customize the validation and conversion service or even add additional method argument resolvers for your custom use case. The following example sets a custom `Validator` so that a `@Validated` annotated payload is first validated with it before invoking the listener method:

```java
Copy@Configuration
@EnableJms
public class AppConfig implements JmsListenerConfigurer {

    @Override
    public void configureJmsListeners(JmsListenerEndpointRegistrar registrar) {
        registrar.setJmsHandlerMethodFactory(myJmsHandlerMethodFactory());
    }

    @Bean
    public DefaultJmsHandlerMethodFactory myJmsHandlerMethodFactory() {
        DefaultJmsHandlerMethodFactory factory = new DefaultJmsHandlerMethodFactory();
        factory.setValidator(myValidator());
        return factory;
    }
}
```

# [](#reply-management)Reply management

The existing support in `MessageListenerAdapter` already allows your method to have a non-`void` return type. When that's the case, the result of the invocation is encapsulated in a `javax.jms.Message` sent either in the destination specified in the `JMSReplyTo` header of the original message or in the default destination configured on the listener. That default destination can now be set using the `@SendTo` annotation of the messaging abstraction.

Assuming our `processOrder` method should now return an `OrderStatus`, it is possible to write it as follow to automatically send a reply:

```java
Copy@JmsListener(destination = "myQueue")
@SendTo("queueOut")
public OrderStatus processOrder(Order order) {
    // order processing
    return status;
}
```

If you need to set additional headers in a transport-independent manner, you could return a `Message` instead, something like:

```java
Copy@JmsListener(destination = "myQueue")
@SendTo("queueOut")
public Message<OrderStatus> processOrder(Order order) {
    // order processing
    return MessageBuilder
            .withPayload(status)
            .setHeader("code", 1234)
            .build();
}
```

# [](#wrapping-up)Wrapping up

Spring Framework 4.1 is due this July and includes several improvements in the JMS area: JMS listener methods can be simply annotated and can use a very flexible method signature. The messaging abstraction introduced in Spring 4.0 is now also supported for JMS listeners.