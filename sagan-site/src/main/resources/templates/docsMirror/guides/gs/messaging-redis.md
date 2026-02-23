---
title: Getting Started | Messaging with Redis
source: https://spring.io/guides/gs/messaging-redis
scraped: 2026-02-19T07:55:00.027Z
description: Learn how to use Redis as a message broker.
---

# Messaging with Redis

This guide walks you through the process of using Spring Data Redis to publish and subscribe to messages sent with Redis.

## What You Will Build

You will build an application that uses `StringRedisTemplate` to publish a string message and has a POJO subscribe for the message by using `MessageListenerAdapter`.

It may sound strange to be using Spring Data Redis as the means to publish messages, but, as you will discover, Redis provides not only a NoSQL data store but a messaging system as well.

## What You Need

-   About 15 minutes
    
-   A favorite text editor or IDE
    
-   [Java 17](https://www.oracle.com/java/technologies/downloads/) or later
    

## How to Complete This Guide

Like most Spring [Getting Started guides](https://spring.io/guides) you can start from scratch and complete each step, or you can jump straight to the solution, by viewing the code in [this repository](https://github.com/spring-guides/gs-messaging-redis).

To **see the end result in your local environment**, you can do one of the following:

-   [Download](https://github.com/spring-guides/gs-messaging-redis/archive/main.zip) and unzip the source repository for this guide
    
-   Clone the repository using Git: `git clone [https://github.com/spring-guides/gs-messaging-redis.git](https://github.com/spring-guides/gs-messaging-redis.git)`
    
-   Fork the repository which lets you request changes to this guide through submission of a pull request
    

## Setting up the Redis server

Before you can build a messaging application, you need to set up the server that will handle receiving and sending messages. This guide assumes that you use [Spring Boot Docker Compose support](https://docs.spring.io/spring-boot/reference/features/dev-services.html#features.dev-services.docker-compose). A prerequisite of this approach is that your development machine has a Docker environment, such as [Docker Desktop](https://www.docker.com/products/docker-desktop/), available. Add a dependency `spring-boot-docker-compose` that does the following:

-   Search for a `compose.yml` and other common compose filenames in your working directory
    
-   Call `docker compose up` with the discovered `compose.yml`
    
-   Create service connection beans for each supported container
    
-   Call `docker compose stop` when the application is shutdown
    

To use Docker Compose support, you need only follow this guide. Based on the dependencies you pull in, Spring Boot finds the correct `compose.yml` file and start your Docker container when you run your application.

If you choose to run the Redis server yourself instead of using Spring Boot Docker Compose support, you have a few options: - [Download the server](https://redis.io/download) and manually run it - Install with Homebrew, if you use a Mac - Manually run the `compose.yaml` file with `docker compose up`

If you go with any of these alternate approaches, you should remove the `spring-boot-docker-compose` dependency from the Maven or Gradle build file. You also need to add configuration to an `application.properties` file, as described in greater detail in the [Preparing to Build the Application](#_preparing_to_build_the_application) section. As mentioned earlier, this guide assumes that you use Docker Compose support in Spring Boot, so additional changes to `application.properties` are not required at this point.

## Starting with Spring Initializr

You can use this [pre-initialized project](https://start.spring.io/#!type=maven-project&groupId=com.example&artifactId=messaging-redis&name=messaging-redis&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.messaging-redis&dependencies=data-redis,docker-compose) and click Generate to download a ZIP file. This project is configured to fit the examples in this tutorial.

To manually initialize the project:

1.  Navigate to [https://start.spring.io](https://start.spring.io). This service pulls in all the dependencies you need for an application and does most of the setup for you.
    
2.  Choose either Gradle or Maven and the language you want to use. This guide assumes that you chose Java.
    
3.  Click **Dependencies** and select **Spring Data Redis** and **Docker Compose Support**.
    
4.  Click **Generate**.
    
5.  Download the resulting ZIP file, which is an archive of an application that is configured with your choices.
    

If your IDE has the Spring Initializr integration, you can complete this process from your IDE.

## Create a Redis Message Receiver

In any messaging-based application, there are message publishers and messaging receivers. To create the message receiver, implement a receiver with a method to respond to messages, as the following example (from `src/main/java/com/example/messagingredis/Receiver.java`) shows:

```
Copypackage com.example.messagingredis;

import java.util.concurrent.atomic.AtomicInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Receiver {
    private static final Logger LOGGER = LoggerFactory.getLogger(Receiver.class);

    private AtomicInteger counter = new AtomicInteger();

    public void receiveMessage(String message) {
        LOGGER.info("Received <" + message + ">");
        counter.incrementAndGet();
    }

    public int getCount() {
        return counter.get();
    }
}
```

The `Receiver` is a POJO that defines a method for receiving messages. When you register the `Receiver` as a message listener, you can name the message-handling method whatever you want.

For demonstration purposes, the receiver is counting the messages received. That way, it can signal when it has received a message.

## Register the Listener and Send a Message

Spring Data Redis provides all the components you need to send and receive messages with Redis. Specifically, you need to configure:

-   A connection factory
    
-   A message listener container
    
-   A Redis template
    

You will use the Redis template to send messages, and you will register the `Receiver` with the message listener container so that it will receive messages. The connection factory drives both the template and the message listener container, letting them connect to the Redis server.

This example uses Spring Boot’s default `RedisConnectionFactory`, an instance of `LettuceConnectionFactory` that is based on the [Lettuce](https://github.com/redis/lettuce) Redis library. The connection factory is injected into both the message listener container and the Redis template, as the following example (from `src/main/java/com/example/messagingredis/MessagingRedisApplication.java`) shows:

```
Copypackage com.example.messagingredis;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

@SpringBootApplication
public class MessagingRedisApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(MessagingRedisApplication.class);

	@Bean
	RedisMessageListenerContainer container(RedisConnectionFactory connectionFactory,
			MessageListenerAdapter listenerAdapter) {

		RedisMessageListenerContainer container = new RedisMessageListenerContainer();
		container.setConnectionFactory(connectionFactory);
		container.addMessageListener(listenerAdapter, new PatternTopic("chat"));

		return container;
	}

	@Bean
	MessageListenerAdapter listenerAdapter(Receiver receiver) {
		return new MessageListenerAdapter(receiver, "receiveMessage");
	}

	@Bean
	Receiver receiver() {
		return new Receiver();
	}

	@Bean
	StringRedisTemplate template(RedisConnectionFactory connectionFactory) {
		return new StringRedisTemplate(connectionFactory);
	}

	public static void main(String[] args) throws InterruptedException {

		ApplicationContext ctx = SpringApplication.run(MessagingRedisApplication.class, args);

		StringRedisTemplate template = ctx.getBean(StringRedisTemplate.class);
		Receiver receiver = ctx.getBean(Receiver.class);

		while (receiver.getCount() == 0) {

			LOGGER.info("Sending message...");
			template.convertAndSend("chat", "Hello from Redis!");
			Thread.sleep(500L);
		}

		System.exit(0);
	}
}
```

The bean defined in the `listenerAdapter` method is registered as a message listener in the message listener container defined in `container` and will listen for messages on the `chat` topic. Because the `Receiver` class is a POJO, it needs to be wrapped in a message listener adapter that implements the `MessageListener` interface (which is required by `addMessageListener()`). The message listener adapter is also configured to call the `receiveMessage()` method on `Receiver` when a message arrives.

The connection factory and message listener container beans are all you need to listen for messages. To send a message, you also need a Redis template. Here, it is a bean configured as a `StringRedisTemplate`, an implementation of `RedisTemplate` that is focused on the common use of Redis, where both keys and values are `String` instances.

The `main()` method kicks off everything by creating a Spring application context. The application context then starts the message listener container, and the message listener container bean starts listening for messages. The `main()` method then retrieves the `StringRedisTemplate` bean from the application context and uses it to send a `Hello from Redis!` message on the `chat` topic. Finally, it closes the Spring application context, and the application ends.

## Run the Application

You can run the main method through your IDE. Note that, if you have cloned the project from the solution repository, your IDE may look in the wrong place for the `compose.yaml` file. You can configure your IDE to look in the correct place or you could use the command line to run the application. The `./gradlew bootRun` and `./mvnw spring-boot:run` commands launch the application and automatically find the compose.yaml file.

You should see the output:

```
Copyyyyy-mm-ddT07:08:48.646-04:00  INFO 18338 --- [main] c.e.m.MessagingRedisApplication: Sending message...
yyyy-mm-ddT07:08:48.663-04:00  INFO 18338 --- [container-1] com.example.messagingredis.Receiver      : Received <Hello from Redis!>
```

## Preparing to Build the Application

To run the code without Spring Boot Docker Compose support, you need a version of Redis running locally. To do this, you can use Docker Compose, but you must first make two changes to the `compose.yaml` file. First, modify the `ports` entry in `compose.yaml` to be `'6379:6379'`. Second, add a `container_name`.

The `compose.yaml` should now be:

services:
  redis:
    container\_name: 'guide-redis'
    image: 'redis:latest'
    ports:
      - '6379:6379'

You can now run `docker compose up` to start the Redis server. Now you should have an external Redis server that is ready to accept requests. You can rerun the application and see the same output using your external Redis server.

No configuration is required in the `application.properties` file because the default values match the Redis server configuration in `compose.yaml`. Specifically, the properties `spring.data.redis.host` and `spring.data.redis.port` default to `localhost` and `6379` respectively. More information about connecting to Redis can be found in the [Spring Boot documentation](https://docs.spring.io/spring-boot/reference/data/nosql.html#data.nosql.redis.connecting).

## Building the Application

This section describes different ways to run this guide:

1.  [Building and executing a JAR file](https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems)
    
2.  [Building and executing a Docker container using Cloud Native Buildpacks](https://docs.spring.io/spring-boot/docs/current/reference/html/container-images.html#container-images.buildpacks)
    

Regardless of how you choose to run the application, the output should be the same.

To run the application, you can package the application as an executable jar. The `./mvnw clean package` command compiles the application to an executable jar. You can then run the jar with the `java -jar target/messaging-redis-0.0.1-SNAPSHOT.jar` command.

Alternatively, if you have a Docker environment available, you could create a Docker image directly from your Maven or Gradle plugin, using buildpacks. With [Cloud Native Buildpacks](https://docs.spring.io/spring-boot/docs/current/reference/html/container-images.html#container-images.buildpacks), you can create Docker compatible images that you can run anywhere. Spring Boot includes buildpack support directly for both Maven and Gradle. This means you can type a single command and quickly get a sensible image into a locally running Docker daemon. To create a Docker image using Cloud Native Buildpacks, run the `./mvnw spring-boot:build-image` command. With a Docker environment enabled, you can run the application with the `docker run --network container:guide-redis docker.io/library/messaging-redis:0.0.1-SNAPSHOT` command.

The `--network` flag tells Docker to attach our guide container to the existing network that our external container is using. You can find more information in the [Docker documentation](https://docs.docker.com/network/#container-networks).

## Summary

Congratulations! You have just developed a publish-and-subscribe application with Spring and Redis.

## See Also

The following guides may also be helpful:

-   [Messaging with RabbitMQ](https://spring.io/guides/gs/messaging-rabbitmq/)
    
-   [Messaging with JMS](https://spring.io/guides/gs/messaging-jms/)
    
-   [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
    

Want to write a new guide or contribute to an existing one? Check out our [contribution guidelines](https://github.com/spring-guides/getting-started-guides/wiki).

All guides are released with an ASLv2 license for the code, and an [Attribution, NoDerivatives creative commons license](https://creativecommons.org/licenses/by-nd/3.0/) for the writing.

## Get the Code

[Go To Repo](https://github.com/spring-guides/gs-messaging-redis)