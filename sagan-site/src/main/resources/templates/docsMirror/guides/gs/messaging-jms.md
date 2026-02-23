---
title: Getting Started | Messaging with JMS
source: https://spring.io/guides/gs/messaging-jms
scraped: 2026-02-19T07:56:35.518Z
description: Learn how to publish and subscribe to messages using a JMS broker.
---

# Messaging with JMS

This guide walks you through the process of publishing and subscribing to messages using a JMS broker.

## What You Will build

You will build an application that uses Spring’s `JmsTemplate` to post a single message and subscribes to it with a `@JmsListener` annotated method of a managed bean.

## What You need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    
-   [Gradle 7.5+](https://gradle.org/install/) or [Maven 3.5+](https://maven.apache.org/download.cgi)
    
-   You can also import the code straight into your IDE:
    
    -   [Spring Tool Suite (STS)](/guides/gs/sts)
        
    -   [IntelliJ IDEA](/guides/gs/intellij-idea/)
        
    -   [VSCode](/guides/gs/guides-with-vscode/)
        
    

## How to complete this guide

Like most Spring [Getting Started guides](/guides), you can start from scratch and complete each step or you can bypass basic setup steps that are already familiar to you. Either way, you end up with working code.

To **start from scratch**, move on to [Starting with Spring Initializr](#scratch).

To **skip the basics**, do the following:

-   [Download](https://github.com/spring-guides/gs-messaging-jms/archive/main.zip) and unzip the source repository for this guide, or clone it using Git: `git clone [https://github.com/spring-guides/gs-messaging-jms.git](https://github.com/spring-guides/gs-messaging-jms.git)`
    
-   cd into `gs-messaging-jms/initial`
    
-   Jump ahead to [\[initial\]](#initial).
    

**When you finish**, you can check your results against the code in `gs-messaging-jms/complete`.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.1.0&packaging=jar&groupId=com.example&artifactId=messaging-jms&dependencies=artemis) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring for Apache ActiveMQ Artemis**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of an application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

You can also fork the project from Github and open it in your IDE or other editor.

## Create a Message Receiver

Spring provides the means to publish messages to any POJO (Plain Old Java Object).

This guide describes how to send a message out over a JMS message broker. To start things off, create a simple POJO that embodies the details of an email message. Note that we are not sending an email message. We send the details from one place to another about WHAT to send in a message.

`src/main/java/hello/Email.java`

```
Copypackage hello;

public class Email {

  private String to;
  private String body;

  public Email() {
  }

  public Email(String to, String body) {
    this.to = to;
    this.body = body;
  }

  public String getTo() {
    return to;
  }

  public void setTo(String to) {
    this.to = to;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  @Override
  public String toString() {
    return String.format("Email{to=%s, body=%s}", getTo(), getBody());
  }

}
```

This POJO is quite simple, containing two fields (**to** and **body**), along with the presumed set of getters and setters.

From here, you can define a message receiver:

`src/main/java/hello/Receiver.java`

```
Copypackage hello;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
public class Receiver {

  @JmsListener(destination = "mailbox", containerFactory = "myFactory")
  public void receiveMessage(Email email) {
    System.out.println("Received <" + email + ">");
  }

}
```

`Receiver` is also known as a **message-driven POJO**. As the code shows, there is no need to implement any particular interface or for the method to have any particular name. Besides, the method may have a [flexible signature](https://docs.spring.io/spring-framework/reference/integration/jms/annotated.html#jms-annotated-method-signature). Note, in particular, that this class has no import of the JMS API.

The `JmsListener` annotation defines the name of the `Destination` that this method should listen to and the reference to the `JmsListenerContainerFactory` to use to create the underlying message listener container. Strictly speaking, that last attribute is not necessary unless you need to customize the way the container is built, as Spring Boot registers a default factory if necessary.

The [reference documentation](https://docs.spring.io/spring-framework/reference/integration/jms/annotated.html#jms-annotated-support) covers this in more detail.

## Send and receive JMS messages with Spring

Next, wire up a sender and a receiver.

`src/main/java/hello/Application.java`

```
Copypackage hello;

import jakarta.jms.ConnectionFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jms.DefaultJmsListenerContainerFactoryConfigurer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.config.DefaultJmsListenerContainerFactory;
import org.springframework.jms.config.JmsListenerContainerFactory;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.support.converter.MappingJackson2MessageConverter;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.jms.support.converter.MessageType;

@SpringBootApplication
@EnableJms
public class Application {

  @Bean
  public JmsListenerContainerFactory<?> myFactory(ConnectionFactory connectionFactory,
                          DefaultJmsListenerContainerFactoryConfigurer configurer) {
    DefaultJmsListenerContainerFactory factory = new DefaultJmsListenerContainerFactory();
    // This provides all auto-configured defaults to this factory, including the message converter
    configurer.configure(factory, connectionFactory);
    // You could still override some settings if necessary.
    return factory;
  }

  @Bean // Serialize message content to json using TextMessage
  public MessageConverter jacksonJmsMessageConverter() {
    MappingJackson2MessageConverter converter = new MappingJackson2MessageConverter();
    converter.setTargetType(MessageType.TEXT);
    converter.setTypeIdPropertyName("_type");
    return converter;
  }

  public static void main(String[] args) {
    // Launch the application
    ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);

    JmsTemplate jmsTemplate = context.getBean(JmsTemplate.class);

    // Send a message with a POJO - the template reuse the message converter
    System.out.println("Sending an email message.");
    jmsTemplate.convertAndSend("mailbox", new Email("info@example.com", "Hello"));
  }

}
```

`@SpringBootApplication` is a convenience annotation that adds all of the following:

-   `@Configuration`: Tags the class as a source of bean definitions for the application context.
    
-   `@EnableAutoConfiguration`: Tells Spring Boot to start adding beans based on classpath settings, other beans, and various property settings. For example, if `spring-webmvc` is on the classpath, this annotation flags the application as a web application and activates key behaviors, such as setting up a `DispatcherServlet`.
    
-   `@ComponentScan`: Tells Spring to look for other components, configurations, and services in the `hello` package, letting it find the controllers.
    

The `main()` method uses Spring Boot’s `SpringApplication.run()` method to launch an application. Did you notice that there was not a single line of XML? There is no `web.xml` file, either. This web application is 100% pure Java and you did not have to deal with configuring any plumbing or infrastructure.

For clarity, we have also defined a `myFactory` bean that is referenced in the `JmsListener` annotation of the receiver. Because we use the `DefaultJmsListenerContainerFactoryConfigurer` infrastructure provided by Spring Boot, that `JmsMessageListenerContainer` is identical to the one that Spring Boot creates by default.

The default `MessageConverter` can convert only basic types (such as `String`, `Map`, `Serializable`), and our `Email` is not `Serializable` on purpose. We want to use Jackson and serialize the content to JSON in text format (that is, as a `TextMessage`). Spring Boot detects the presence of a `MessageConverter` and associates it to both the default `JmsTemplate` and any `JmsListenerContainerFactory` created by `DefaultJmsListenerContainerFactoryConfigurer`. Our JSON converter needs the following dependency: `org.springframework.boot:spring-boot-starter-json`.

`JmsTemplate` makes it simple to send messages to a JMS destination. In the `main` runner method, after starting things up, you can use `jmsTemplate` to send an `Email` POJO. Because our custom `MessageConverter` has been automatically associated to it, a JSON document is generated in a `TextMessage` only.

Two beans that you do not see defined are `JmsTemplate` and `ConnectionFactory`. These are created automatically by Spring Boot. Spring Boot also automatically discovers the `@JmsListener`\-annotated methods when the JMS infrastructure is available, that is there is no need to add `@EnableJms`.

By default, Spring Boot tries to connect to an artemis broker running on the local machine. It is also possible to embed the broker by adding the following configuration property:

```
Copyspring.artemis.mode=embedded
```

You also need to add a dependency to `org.apache.activemq:artemis-jakarta-server`.

By default, Spring Boot creates a `JmsTemplate` configured to [transmit to queues](https://docs.spring.io/spring-framework/reference/integration/jms/sending.html) by having `pubSubDomain` set to `false`. The `JmsMessageListenerContainer` is also configured the same way. To override, set `spring.jms.pub-sub-domain=true` through Spring Boot’s property settings (either inside `application.properties` or by setting an environment variable). Then make sure the receiving container has the same setting.

Spring’s `JmsTemplate` can receive messages directly through its `receive` method, but that works only synchronously, meaning that it blocks. That is why we recommend that you use a listener container such as `DefaultMessageListenerContainer` with a cache-based connection factory, so you can consume messages asynchronously and with maximum connection efficiency.

### Build an executable JAR

You can run the application from the command line with Gradle or Maven. You can also build a single executable JAR file that contains all the necessary dependencies, classes, and resources and run that. Building an executable jar makes it easy to ship, version, and deploy the service as an application throughout the development lifecycle, across different environments, and so forth.

If you use Gradle, you can run the application by using `./gradlew bootRun`. Alternatively, you can build the JAR file by using `./gradlew build` and then run the JAR file, as follows:

java -jar build/libs/gs-messaging-jms-0.0.1-SNAPSHOT.jar

If you use Maven, you can run the application by using `./mvnw spring-boot:run`. Alternatively, you can build the JAR file with `./mvnw clean package` and then run the JAR file, as follows:

java -jar target/gs-messaging-jms-0.0.1-SNAPSHOT.jar

When it runs, buried amidst all the logging, you should see these messages:

Sending an email message.
Received <Email{to=info@example.com, body=Hello}>

## Summary

Congratulations! You have developed a publisher and consumer of JMS-based messages.

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-messaging-jms)