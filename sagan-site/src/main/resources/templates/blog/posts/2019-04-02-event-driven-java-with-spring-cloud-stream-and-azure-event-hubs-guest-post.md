---
title: Event-driven Java with Spring Cloud Stream and Azure Event Hubs [Guest Post]
source: https://spring.io/blog/2019/04/02/event-driven-java-with-spring-cloud-stream-and-azure-event-hubs-guest-post
scraped: 2026-02-23T14:53:41.472Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  April 02, 2019 | 2 Comments
---

# Event-driven Java with Spring Cloud Stream and Azure Event Hubs [Guest Post]

_Engineering | Ben Wilcock |  April 02, 2019 | 2 Comments_

> Asir Selvasingh | Principal PM Architect | Microsoft – Java on Azure

Spring Cloud Stream Binder for Azure Event Hubs is now generally available.

It is simple to build highly scalable event-driven Java apps using Spring Cloud Stream with Event Hubs, a fully managed, real-time data ingestion service on Azure that is resilient and reliable service for any situation; this includes emergencies, thanks to its geo-disaster recovery and geo-replication features.

Spring Cloud Stream provides a binder abstraction for popular message broker implementations. It provides a flexible programming model built on already established and familiar Spring idioms and best practices, including support for persistent pub/sub semantics, consumer groups, and stateful partitions. Now, developers can use the same patterns for building Java apps with Event Hubs.

![Diagram showing Spring Apps inputting to Azure Event Hubs and outputting to other Spring apps, using the Azure event hubs binder and channels.](https://static.spring.io/blog/bwilcock/20190328/%5B001%5D-Guest-Post_Event-driven-Java-with-Spring-Cloud-Stream-and-Azure-Event-Hubs.png "Spring Apps inputting to Azure Event Hubs and outputting to other Spring apps, using the Azure event hubs binder and channels")

## [](#getting-started)Getting Started

Check out [this tutorial](https://docs.microsoft.com/en-us/java/azure/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub?view=azure-java-stable) and build a Java-based Spring Cloud Stream Binder application using the Spring Boot Initializer with Azure Event Hubs. Go to the Azure portal and create a new Event Hubs namespace. Add the following Maven dependency into your Java project.

```xml
Copy<dependency> 
    <groupId>com.microsoft.azure</groupId> 
	<artifactId>spring-cloud-azure-eventhubs-stream-binder</artifactId> 
    <version>1.1.0.RC2</version> 
</dependency>
```

## [](#publish-messages)Publish messages

Use `@EnableBinding(Source.class)` to annotate a source class and publish messages to Event Hubs with Spring Cloud Stream patterns. You can customize the output channel for the Source with configurations.

-   Destination: specify which Event Hub to connect with the output channel
-   Sync/Async: specify the mode to produce the messages

## [](#subscribe-to-messages)Subscribe to messages

Use `@EnableBinding(Sink.class)` to annotate a sink class and consume messages from Event Hubs. You can also customize the input channel with configurations. Please refer to this [tutorial](https://docs.microsoft.com/en-us/java/azure/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub) for the full list.

-   Destination: specify an Event Hub to bind with the input channel
-   Customer Group: specify a [Consumer Group](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features#consumer-groups) to receive messages

Try building event-driven Java apps using Spring Cloud Stream Binder for Event Hubs

## [](#try-out-a-java-app-using-spring-cloud-stream-binder-on-azure-event-hubs-and-let-us-know-what-you-think-via-e-mail-or-comments-below)Try out a Java app using [Spring Cloud Stream Binder on Azure Event Hubs](https://docs.microsoft.com/en-us/java/azure/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub?view=azure-java-stable) and let us know what you think via e-mail or comments below.

## [](#additional-resources)Additional Resources

-   Tutorial: [How to create a Spring Cloud Stream Binder application with Azure Event Hubs](https://docs.microsoft.com/en-us/java/azure/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub?view=azure-java-stable)
-   Tutorial: [Spring on Azure Developer Hub](https://docs.microsoft.com/en-us/java/azure/spring-framework)
-   Tutorial: [Java on Azure Developer Hub](https://docs.microsoft.com/en-us/java/azure/)
-   GitHub: [Spring Cloud for Azure](https://github.com/Microsoft/spring-cloud-azure)
-   Learn more: [Azure Event Hubs](https://azure.microsoft.com/en-us/services/event-hubs/)

### [](#about-the-author)About the Author

Asir started his software engineering career in the early days of Java, in 1995, and built enterprise products, applications and open source projects for many years. Now, he is a Principal PM Architect at Microsoft focusing on a full gamut of services and tools for developers to build and scale Java workloads on Azure. He works closely with the community, delivering sessions at Java conferences and fostering strategic relations that enrich the Java ecosystem.

In his free-time, Asir loves to tinker with Java apps on Azure, which serves as a creative outlet from his day job. He’s passionate about cooking and photography and enjoys quality family time traveling the world.