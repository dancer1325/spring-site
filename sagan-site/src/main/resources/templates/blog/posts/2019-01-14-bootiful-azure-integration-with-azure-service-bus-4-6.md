---
title: Bootiful Azure: Integration with Azure Service Bus (4/6)
source: https://spring.io/blog/2019/01/14/bootiful-azure-integration-with-azure-service-bus-4-6
scraped: 2026-02-23T15:00:28.206Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 14, 2019 | 3 Comments
---

# Bootiful Azure: Integration with Azure Service Bus (4/6)

_Engineering | Josh Long |  January 14, 2019 | 3 Comments_

> This is part 4 of a 6 part series, with new posts Mondays and Thursdays, introducing Microsoft Azure for Spring developers. I couldn't have put this together without input from Microsoft's Asir Vedamuthu Selvasingh, Yitao Dong, Bruno Borges, Brian Benz and Theresa Nguyen. You can find the code for this series [on Github](https://github.com/joshlong/bootiful-azure-article). Hit me up on [Twitter (@starbuxman)](http://twitter.com/Starbuxman) as you're reading the installments with any feedback or questions. You can also learn more about Microsoft Azure in my [Spring Tips (@SpringTipsLive)](http://twitter.com/SpringTipsLive) installment, [*Bootiful Azure*](https://spring.io/blog/2018/12/05/spring-tips-bootiful-microsoft-azure)

Here are all the installments:

-   [Bootiful Azure: Taking Your First Steps with Microsoft Azure](https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6)
-   [Bootiful Azure: SQL-based data access with Microsoft SQL Server](https://spring.io/blog/2019/01/07/bootiful-azure-sql-based-data-access-with-microsoft-sql-server-2-6)
-   [Bootiful Azure: Global Scale Data Access with CosmosDB](https://spring.io/blog/2019/01/10/bootiful-azure-global-scale-data-access-with-cosmosdb-3-6)
-   [Bootiful Azure: Integration with Azure Service Bus](https://spring.io/blog/2019/01/14/bootiful-azure-integration-with-azure-service-bus-4-6)
-   [Bootiful Azure: Object Storage Service](https://spring.io/blog/2019/01/17/bootiful-azure-object-storage-service-5-6)
-   [Bootiful Azure: To Production!](https://spring.io/blog/2019/01/21/bootiful-azure-to-production-6-6)

Azure Service Bus is a cloud messaging as a service and integration technology. It is, just like CosmosDB, as flexible as possible. It [supports the AMQP 1.0 protocol](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-java-how-to-use-jms-api-amqp), like RabbitMQ. AMQP is a flexible wire protocol. The protocol itself includes instructions for administering the broker, beyond just interacting with it. AMQP brokers are ideal for integration because they are language- and platform-agnostic. In an AMQP broker producers send messages to *exchanges* which then route the messages to *queues*, from which consumers then read the messages. The exchange is responsible for deciding to which queue the message should be sent. It does this in any of a number of ways but it usually involves looking at a key in the message headers called the *routing key*.

This indirection between the exhcange and the queues makes AMQP a bit more flexible than JMS-based brokers where producers send messages directly to `Destination` objects that consumers then read from. This means that producers and consumers are coupled by their choice of `Destination`. Additionally, JMS is an API for the JVM, it is not a wire protocol. As such, producers and consumers are dependent on the version of the library they're using being correct. That said, [you can also use Azure Service Bus through the JMS API](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-java-how-to-use-jms-api-amqp).

Like I said, Azure Service Bus is nothing if not flexible!

The AMQP model is illustrative because, basically, the native model for Azure Service Bus looks like AMQP. In Azure Service Bus you have topics or queues to which you send messages. Messages are then connected to subscriptions, from which consumers read. Let's build a simple example that sends and then consumes messages. We won't use AMQP or JMS, just the regular Microsoft Azure ServiceBus API.

## [](#configuring-azure-service-bus-on-microsoft-azure)Configuring Azure Service Bus on Microsoft Azure

You'll need to provision a servicebus namespace, a topic (top which we send messages and from which multiple consumers may listen) and a subscription (a consumer to either a topic or a queue) to connect to the topic. Here's an example script that does just that.

```shell
Copy#!/usr/bin/env bash

destination=messages
topic=${destination}-topic
subscription=${destination}-subscription
namespace=bootiful
rg=$1

az servicebus namespace create --resource-group $rg \
    --name ${namespace}

az servicebus topic create --resource-group $rg \
    --namespace-name ${namespace} \
    --name ${topic}

az servicebus topic subscription create --resource-group $rg  \
    --namespace-name ${namespace} --topic-name ${topic} \
    --name ${subscription}
```

You'll need a connection string in order to connect your Spring application to the servicebus. Run this command and note the `primaryConnectionString` attribute value for later.

```shell
Copyaz servicebus namespace authorization-rule keys list --resource-group bootiful --namespace-name bootiful --name RootManageSharedAccessKey
```

## [](#introducing-azure-service-bus-into-your-spring-application)Introducing Azure Service Bus into your Spring Application

Add the following dependency to your build: `com.microsoft.azure` : `azure-servicebus-spring-boot-starter`.

We'll write two components: one a producer and the other a consumer. In a *real* application these things would naturally live in separate applications and separate processes. Messaging serves to support the integration of disparate applications, after all. We'll look at the consumer first. The consumer needs to register a subscriber *before* something else has produced the message, so we'll make these beans *ordered* - the Spring container will order their initialization one before the other based on the `Ordered` value we give it.

```java
Copypackage com.example.bootifulazure;

import com.microsoft.azure.servicebus.ExceptionPhase;
import com.microsoft.azure.servicebus.IMessage;
import com.microsoft.azure.servicebus.IMessageHandler;
import com.microsoft.azure.servicebus.ISubscriptionClient;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Log4j2
@Component
class ServiceBusConsumer implements Ordered {

    private final ISubscriptionClient iSubscriptionClient;

    ServiceBusConsumer(ISubscriptionClient isc) {
        this.iSubscriptionClient = isc;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void consume() throws Exception {

        this.iSubscriptionClient.registerMessageHandler(new IMessageHandler() {

            @Override
            public CompletableFuture<Void> onMessageAsync(IMessage message) {
                log.info("received message " + new String(message.getBody()) + " with body ID " + message.getMessageId());
                return CompletableFuture.completedFuture(null);
            }

            @Override
            public void notifyException(Throwable exception, ExceptionPhase phase) {
                log.error("eeks!", exception);
            }
        });

    }

    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
```

When a message arrives, we log its `body` and `messageId` .

Now, let's look at the producer.

```java
Copypackage com.example.bootifulazure;

import com.microsoft.azure.servicebus.ITopicClient;
import com.microsoft.azure.servicebus.Message;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Log4j2
@Component
class ServiceBusProducer implements Ordered {

    private final ITopicClient iTopicClient;

    ServiceBusProducer(ITopicClient iTopicClient) {
        this.iTopicClient = iTopicClient;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void produce() throws Exception {
        this.iTopicClient.send(new Message("Hello @ " + Instant.now().toString()));
    }

    @Override
    public int getOrder() {
        return Ordered.LOWEST_PRECEDENCE;
    }
}
```

Pretty straightforward right? The meat of the classes are in the `consume()` and `produce()` methods. The consumer runs first, then the producer. If you've ever done any work with messaging technoogies you might find the lack of a mention of any sort of *destination* - the topic or queue - a bit puzzling. That configuration all lives in the properties (such as those in your `application.properties` file) and are used when auto-configuring the `ITopicClient` and `ISubscriptionClient`. If you want to send messages or consume messages from multiple destinations, simply define the relevant beans yourself and make sure to *not* specify `azure.service-bus.connection-string` in your application's properties, otherwise the default Spring Boot auto-configuration will kick in and try to create these beans for you.