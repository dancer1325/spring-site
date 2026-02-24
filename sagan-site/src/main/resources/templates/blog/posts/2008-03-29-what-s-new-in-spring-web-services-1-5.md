---
title: What\'s New in Spring Web Services 1.5?
source: https://spring.io/blog/2008/03/29/what-s-new-in-spring-web-services-1-5
scraped: 2026-02-24T09:19:35.865Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Arjen Poutsma |  March 29, 2008 | 0 Comments
---

# What's New in Spring Web Services 1.5?

_Engineering | Arjen Poutsma |  March 29, 2008 | 0 Comments_

After being in the works for about six months, I'm happy to announce that Spring Web Services 1.5.0 has been released! In this post, I'd like to go over some of the major new features.

## New Transports

The 1.5 release includes two new transports: JMS and email. Using these new transports requires no Java code changes: just add a bit of configuration, and you're off! The JMS transport integrates nicely with Spring 2's [Message-Driven POJO](http://static.springframework.org/spring/docs/2.5.x/reference/jms.html#jms-receiving) model, as indicated by the following piece of configuration taken from the airline sample application:

```xml
Copy
<jms:listener-container connection-factory="connectionFactory">
  <jms:listener destination="RequestQueue" ref="messageListener"/>
</jms:listener-container>

<bean id="messageListener" class="org.springframework.ws.transport.jms.WebServiceMessageListener">
  <property name="messageFactory" ref="messageFactory"/>
  <property name="messageReceiver" ref="messageReceiver"/>
</bean>
```

Besides the standard JMS configuration (connection factory and destination name to listen to), you only have to define a WebServiceMessageListener, and give it a reference to the message factory you're using (typically the SaajSoapMessageFactory), and the message dispatcher. If you're still stuck in EJB land, there's even a MessageDrivenBean for you to use! Check the airline sample or [reference documentation](http://static.springframework.org/spring-ws/site/reference/html/server.html#d0e1926) for more details.

On the client side, it's just as easy. Configure the WebServiceTemplate to use a JmsMessageSender, and specify a jms: URL to send the message to. Here's an example, once again taken from the airline sample:

```xml
Copy
<bean id="jmsClient" class="org.springframework.ws.samples.airline.client.jms.JmsClient">
  <property name="defaultUri" value="jms:RequestQueue"/>
  <property name="messageSenders">
    <bean class="org.springframework.ws.transport.jms.JmsMessageSender">
      <property name="connectionFactory" ref="connectionFactory"/>
    </bean>
  </property>
</bean>
```

Besides the JMS transport, Spring Web Services 1.5 introduces an email transport, thereby conforming to [Zawinski's Law of Software Envelopment](http://en.wikipedia.org/wiki/Jamie_Zawinski) ;). This transport will poll your POP3 or IMAP server for new messages, or—if your server supports it—use the IMAP IDLE command to receive new messages asynchronously.

## WSS4J-based WS-Security implementation

Another new feature is the [Apache WSS4J](http://ws.apache.org/wss4j/)\-based WS-Security implementation. In 1.0, Spring Web Services already had a WS-Security implementation based on [SUN XWSS](https://xwss.dev.java.net/), but that required Java 1.5, and only worked on SUN JDKs. The WSS4J-based solution works on JDK 1.4 (as does the rest of Spring-WS), and also IBM JDKs used for WebSphere.

See the [reference documentation](http://static.springframework.org/spring-ws/site/reference/html/security.html#security-wss4j-security-interceptor) for more details.

## WS-Addressing support

WS-Addressing is a W3C specification that defines a transport-neutral routing mechanism. It is based on a To and Action SOAP header, which indicate the destination and intent of the SOAP message, respectively. Spring Web Services 1.5.0 implements both the 1.0 (May 2006) version of the WS-Addressing specification, as well as the August 2004 version, which is still in wide use.

You can configure WS-Addressing either through XML, in an application context, or through annotations:

```java
Copy
package samples;

import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.soap.addressing.server.annotation.Action

@Endpoint
public class AnnotationOrderEndpoint {
  private final OrderService orderService;

  public AnnotationOrderEndpoint(OrderService orderService) {
    this.orderService = orderService;
  }

  @Action("http://samples/RequestOrder")
  public Order getOrder(OrderRequest orderRequest) {
    return orderService.getOrder(orderRequest.getId());
  }

  @Action("http://samples/CreateOrder")
  public void order(Order order) {
    orderService.createOrder(order);
  }

}
```

In this case, if a WS-Addressing message comes in with a Action header value [http://samples/RequestOrder](http://samples/RequestOrder) it will invoke the getOrder() method. You can check the stockquote sample or [reference documentation](http://static.springframework.org/spring-ws/site/reference/html/server.html#server-ws-addressing) for more details.

Another neat new feature is that @Endpoints are now annotated with @Component, so if you are using Spring 2.5 [component scanning](http://blog.springsource.com/main/2007/05/14/annotation-driven-dependency-injection-in-spring-21/), **your endpoints are picked up automatically**, and require no XML configuration! For configuration of Spring-WS components, we now offer two new namespaces, to configure OXM marshallers and other common constructs. For example, here is the configuration of a JAXB2 marshaller:

```xml
Copy
<oxm:jaxb2-marshaller id="marshaller" contextPath="org.springframework.ws.samples.airline.schema"/>
```

## Other New Features

Spring Web Services 1.5 also introduce the following other new features:

-   Native support for Java 6, including JAXP 1.4, and the bundled SAAJ 1.3 and JAXB 2.0, as well as the [embedded HTTP server](http://java.sun.com/javase/6/docs/jre/api/net/httpserver/spec/index.html). See the stockquote sample for more details,
-   Spring-WS jars are now OSGi bundles, making them easier to use in your OSGi-based application,
-   A new and improved XSD-to-WSDL generator that inlines included and imported XSDs, thus making your WSDL easier to serve for clients which don't follow these references,
-   A new, client-side interception mechanism, including WS-Security support, and
-   Support for Spring Security

## More Information

If you want to give Spring Web Services 1.5 a shot, you can go to the [site](http://static.springframework.org/spring-ws/site/), or directly to the [download section](http://static.springframework.org/spring-ws/site/downloads/releases.html).

Update 2008-04-18: changed JMS configuration to use namespace.