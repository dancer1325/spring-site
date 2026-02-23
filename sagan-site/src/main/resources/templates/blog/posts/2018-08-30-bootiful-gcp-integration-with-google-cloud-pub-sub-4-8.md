---
title: Bootiful GCP: Integration with Google Cloud Pub/Sub (4/8)
source: https://spring.io/blog/2018/08/30/bootiful-gcp-integration-with-google-cloud-pub-sub-4-8
scraped: 2026-02-23T15:15:32.213Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 30, 2018 | 0 Comments
---

# Bootiful GCP: Integration with Google Cloud Pub/Sub (4/8)

_Engineering | Josh Long |  August 30, 2018 | 0 Comments_

> Hi Spring fans! In this brief 8 part series we’re going to look at the Spring Cloud integration for Google Cloud Platform, called Spring Cloud GCP. [Spring Cloud GCP](https://cloud.spring.io/spring-cloud-gcp/) represents a joint effort between Google and Pivotal that endeavors to provide a first class experience for Spring Cloud developers when using the Google Cloud Platform. Pivotal Cloud Foundry users will enjoy an even [easier integration with the GCP service broker](https://docs.pivotal.io/partners/gcp-sb/index.html). I wrote these installments with input from Google Cloud Developer Advocate, and my buddy, [Ray Tsang](http://twitter.com/saturnism). You can also catch a walkthrough of Spring Cloud GCP in our Google Next 2018 session, [Bootiful Google Cloud Platform](https://www.youtube.com/watch?v=2Jo3vy7iQf8). Thanks buddy! As always, [I'd love to hear from you if you have feedback](http://twitter.com/starbuxman).

There are eight posts in the series. Here they all are:

-   [Bootiful GCP: Getting Started with Spring Cloud for Google Cloud Platform (1/8)](https://spring.io/blog/2018/08/20/bootiful-gcp-getting-started-with-spring-cloud-for-google-cloud-platform-1-8)
-   [Bootiful GCP: Relational Data Access with Spring Cloud GCP (2/8)](https://spring.io/blog/2018/08/23/bootiful-gcp-relational-data-access-with-spring-cloud-gcp-2-8)
-   [Bootiful GCP: Globally Consistent Data Access with Spanner (3/8)](https://spring.io/blog/2018/08/27/bootiful-gcp-globally-consistent-data-access-with-spanner-3-8)
-   [Bootiful GCP: Integration with Google Cloud Pub/Sub (4/8)](https://spring.io/blog/2018/08/30/bootiful-gcp-integration-with-google-cloud-pub-sub-4-8)
-   [Bootiful GCP: Runtime Configuration with Spring Cloud GCP Runtime Config (5/8)](https://spring.io/blog/2018/09/03/bootiful-gcp-runtime-configuration-with-spring-cloud-gcp-runtime-config-5-8)
-   \[Bootiful GCP: Supporting Observability with Spring Cloud GCP Stackdriver Trace (6/8)

\]([https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8](https://spring.io/blog/2018/09/06/bootiful-gcp-supporting-observability-with-spring-cloud-gcp-stackdriver-trace-6-8))

-   \[Bootiful GCP: Use Spring Cloud GCP to Connect to Other GCP Services (7/8)

\]([https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8](https://spring.io/blog/2018/09/10/bootiful-gcp-use-spring-cloud-gcp-to-connect-to-other-gcp-services-7-8))

-   [Bootiful GCP: To Production! (8/8)](https://spring.io/blog/2018/09/13/bootiful-gcp-to-production-8-8)

Let’s look at application integration with Google Cloud Pub/Sub. Google Cloud Pub/Sub supports a number of classic enterprise application integration use cases at Google scale. The [Google Cloud website for Pub/Sub](https://cloud.google.com/pubsub/docs/overview) lists some:

-   **Balancing workloads in network clusters**. For example, a large queue of tasks can be efficiently distributed among multiple workers, such as Google Compute Engine instances.
    
-   **Implementing asynchronous workflows**. For example, an order processing application can place an order on a topic, from which it can be processed by one or more workers.
    
-   **Distributing event notifications**. For example, a service that accepts user signups can send notifications whenever a new user registers, and downstream services can subscribe to receive notifications of the event.
    
-   **Refreshing distributed caches**. For example, an application can publish invalidation events to update the IDs of objects that have changed.
    
-   **Logging to multiple systems**. For example, a Google Compute Engine instance can write logs to the monitoring system, to a database for later querying, and so on.
    
-   **Data streaming from various processes or devices**. For example, a residential sensor can stream data to backend servers hosted in the cloud.
    
-   **Reliability improvement**. For example, a single-zone Compute Engine service can operate in additional zones by subscribing to a common topic, to recover from failures in a zone or region.
    

The flow when using Google Cloud Pub/Sub is exactly as you’d expect: a message is sent to a topic in the Pub/Sub broker (hosted in the cloud by GCP) which then persists it for you. Subscribers can either have messages pushed to it (through a webhook) or they can poll for the mesages from the broker. The subscriber receives messages from the broker and acknowledges each one. When a subscriber acknowledges a message it is removed from the subscriber’s subscription queue. Any client that can speak HTTPS can use this service. There’s no other API required.

The domain model is fairly straightforward if you’ve ever used any other messaging system (JMS, AMQP, Apache Kafka, Kestrel): a topic is the thing to which messages are published. A subscription represents the stream of messages from a specific topic that are to be delivered to a specific client application. A topic can have multiple subscriptions. A subscription can have many subscribers. If you want to distribute different messages around to different subscribers, then all the subscribers must be subscribing to the same subscription. If you want to publish the same messages to all the subscribers, then each subscriber needs to subscribe to its own subscription.

Pub/Sub delivery is at-least once. Hence, you must deal with idempotency and/or de-duplicate messages if you cannot process the same message more than once.

A message stores a combination of data and (optional) attributes that are conducted by Google Cloud Pub/Sub from a publisher to a subscriber. A message attribute, which you might better understand as a *header*, is a key value pair in a message. You might have a header the describes the language of the payload. You might have a header that describes the content-type.

Let’s add Google Cloud Pub/Sub to an application and tie them together.

As before, we need to enable the Google Cloud Pub/Sub API for use.

```shell
Copygcloud services enable pubsub.googleapis.com
```

You’ll then need to create a new topic, `reservations`.

```shell
Copygcloud pubsub topics create reservations
```

The topic represents where we will send messages. We still need to create a subscription that consumes messages from that topic. The following command creates a subscription, `reservations-subscription`, to connect to the `reservations` topic.

```shell
Copygcloud pubsub subscriptions create reservations-subscription --topic=reservations
```

Those pieces in place, we can use them from our application. Add the Spring Cloud GCP Pub/Sub starter, `org.springframework.cloud` : `spring-cloud-gcp-starter-pubsub`, to your build. This introduces auto-configuration for the Google Cloud `PubSubTemplate`. The `PubSubTemplate` should feel familiar if you’ve ever used the `JmsTemplate` or `KafkaTemplate`. It’s an easy-to-use client for producing and consuming messages with Google Cloud Pub/Sub. If you’re just getting started with GCP Pub/Sub and messaging in general, a `*Template` object in the Spring universe is a good place to start.

Let’s look at a simple example that publishes a message whenever you issue HTTP `POST` calls to an HTTP endpoint running in the Spring Boot application. Then we’ll setup a subscriber to consume the messages sent.

```java
Copypackage com.example.gcp.pubsub.template;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gcp.pubsub.core.PubSubTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@RestController
class PublisherConfig {

        private final PubSubTemplate template;
        private final String topic;

        PublisherConfig(PubSubTemplate template, @Value("${reservations.topic:reservations}") String t) {
                this.template = template;
                this.topic = t;
        }

        
        @PostMapping("/publish/{name}")
        void publish(@PathVariable String name) {
                this.template.publish(this.topic, "Hello " + name + "!");
        }
}
```

-   we use the injected `PubSubTemplate` to send a message - a String - to the configured topic.

Now, let’s look at a simple application that might as easily run in another node that consumes messages from the subscription linked to the topic.

```java
Copypackage com.example.gcp.pubsub.template;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.gcp.pubsub.core.PubSubTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

@Slf4j
@Configuration
class SubscriberConfig {

        private final PubSubTemplate template;
        private final String subscription;

        SubscriberConfig(PubSubTemplate template, @Value("${reservations.subscription:reservations-subscription}") String s) {
                this.template = template;
                this.subscription = s;
        }

        @EventListener(ApplicationReadyEvent.class)
        public void start() {
                
                this.template.subscribe(this.subscription, (pubsubMessage, ackReply ) -> {
                        log.info("consumed new message: [" + pubsubMessage.getData().toStringUtf8() + "]");
                        ackReply.ack();
                });
        }
}
```

-   Once the application is up and running we explicitly subscribe, connecting our client to the right endpoint.

This example uses the `PubSubTemplate` (to great effect). It’s simple, short and sweet. As integration becomes more complex, however, it becomes useful to decouple components involved in the flow of messages from one system to another. We introduce stages - links in a chain of components - through which messages must pass to arrive at downstream components. This staging allows us to write handling code that can be swapped out, indifferent to the origin or destination of a given message. This promotes testing, because components need only be written in terms of their immediate pre- and post-conditions: a component can say it only accepts Spring Framework `Message<File>` types, and nothing else. This interface indirection is *very* handy, especially as we start to tie together real world systems that may handle work at different cadences. It becomes trivial to introduce a broker to buffer work before it reaches downstream components where it may otherwise bottleneck. This approach - of isolating components involved in a messaging flow and introducing a buffer to protect downstream components - is called a *staged event driven architecture* (SEDA), and it is more valuable now as the world moves to microservices and highly distributed systems than ever.

Spring Integration is a framework that’s designed to promote this indirection. It has at its heart the concept of a `MessageChannel`, which you can think of us an in-memory `Queue`; a pipe through which messages flow. On each side of the `MessageChannel` are sat components. You can imagine one component outputting messages of a certain type and sending them into this `MessageChannel`, oblivious to where it’ll go. On the other end is another component that consumes messages of a certain type, utterly oblivious to the origin of any given message. Today there may be one service involved in the production of the message. Tomorrow there may be ten! The upstream and downstream components need not change. This indirection gives us a lot of possibilities. We change routing for a given message, stringing it through different services, splitting it, aggregating it, etc. We can transform other sources of data and adapt them to the messaging flow upstream (that’s called an inbound adapter). We can introduce new sinks for the data, adapting the Spring Framework `Message<T>` into the right type (that’s called an *outbound adapter*).

Let’s look at Spring Integration and the Google Cloud Pub/Sub inbound and outbound adapters. We’ll keep the same approach as before: an HTTP endpoint will publish messages which then get delivered to Google Cloud Pub/Sub. The code could run in different nodes. You’ll also need the Spring Integration types on the classpath for this example to work. Add `org.springframework.boot` : `spring-boot-starter-integration` to the build.

Let’s look at a publisher that publishes messages whenever an HTTP POST is made. In this case, the publisher sends requests into a `MessageChannel` which then delivers it to a `PubSubMessageHandler`. Today it’s going directly to Pub/Sub, but tomorrow it could go to a database, an FTP server, XMPP, Salesforce, or literally anything else, and *then* off to Pub/Sub.

```java
Copypackage com.example.gcp.pubsub.integration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gcp.pubsub.core.PubSubTemplate;
import org.springframework.cloud.gcp.pubsub.integration.outbound.PubSubMessageHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.dsl.channel.MessageChannels;
import org.springframework.messaging.SubscribableChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@Configuration
class PublisherConfig {

        private final String topic;
        private final PubSubTemplate template;

        public PublisherConfig(
            @Value("${reservations.topic:reservations}") String t,
            PubSubTemplate template) {
                this.topic = t;
                this.template = template;
        }

        @Bean
        IntegrationFlow publisherFlow() {
                return IntegrationFlows
                    .from(this.outgoing()) 
                    .handle(this.pubSubMessageHandler()) 
                    .get();
        }

        @PostMapping("/publish/{name}")
        void publish(@PathVariable String name) {
                
                outgoing().send(MessageBuilder.withPayload(name).build());
        }

        @Bean
        SubscribableChannel outgoing() {
                return MessageChannels.direct().get();
        }

        @Bean
        PubSubMessageHandler pubSubMessageHandler() {
                return new PubSubMessageHandler(template, this.topic);
        }
}
```

-   the `IntegrationFlow` describes, well, the *flow* of messages in an integration. Messages sent into the `outgoing` `MessageChannel` are delivered to the `PubSubMessageHandler` which then writes it to Google Cloud Pub/Sub using the specified `topic`
    
-   In the Spring MVC HTTP endpint we obtain a reference to the `MessageChannel` and publish a message (which we build with the `MessageBuilder`) into it. NB: calling `outgoing()` as I do in this example is fine because Spring memoizes the result of the method invocation; I’ll always obtain the same pre-instantiated singleton of the `MessageChannel` bean.
    

On the consumer side, we do the same thing in reverse, adapting incoming messages and then logging them in an `IntegrationFlow`.

```java
Copypackage com.example.gcp.pubsub.integration;

import com.google.cloud.pubsub.v1.AckReplyConsumer;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gcp.pubsub.core.PubSubTemplate;
import org.springframework.cloud.gcp.pubsub.integration.AckMode;
import org.springframework.cloud.gcp.pubsub.integration.inbound.PubSubInboundChannelAdapter;
import org.springframework.cloud.gcp.pubsub.support.GcpPubSubHeaders;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;
import org.springframework.integration.dsl.channel.MessageChannels;
import org.springframework.messaging.MessageChannel;

@Slf4j
@Configuration
class SubscriberConfig {

        private final String subscription;
        private final PubSubTemplate template;

        SubscriberConfig(
            @Value("${reservations.subscription:reservations-subscription}") String s,
            PubSubTemplate t) {
                this.subscription = s;
                this.template = t;
        }

        @Bean 
        public PubSubInboundChannelAdapter messageChannelAdapter() {
                PubSubInboundChannelAdapter adapter = new PubSubInboundChannelAdapter(
                    template, this.subscription);
                adapter.setOutputChannel(this.incoming());
                adapter.setAckMode(AckMode.MANUAL);
                return adapter;
        }

        @Bean
        MessageChannel incoming() {
                return MessageChannels.publishSubscribe().get();
        }

        @Bean
        IntegrationFlow subscriberFlow() {
                return IntegrationFlows
                    .from(this.incoming()) 
                    .handle(message -> { 
                            log.info("consumed new message: [" + message.getPayload() + "]");
                            AckReplyConsumer consumer = message.getHeaders()
                                .get(GcpPubSubHeaders.ACKNOWLEDGEMENT, AckReplyConsumer.class);
                            consumer.ack();
                    })
                    .get();
        }
}
```

-   the `PubSubInboundChannelAdapter` adapts messages from the subscription and sends them into the `incoming` `MessageChannel`.
    
-   the `IntegrationFlow` takes incoming messages and routes them to a `MessageHandler` (which we’ve contributed with lambda syntax) that a) logs the incoming message and b) manually acknowledges the receipt of the message.
    

The nice thing about `IntegrationFlow` in both examples is that you can chain calls together. Here, we specify only where a message comes from (`.from()`) and what handles it (`.handle()`), but we could as easily after the `.handle()` call also route, split, transform, etc., the messages. The message sent as the output of one component (the adapters, the message handlers, transformers, etc.) become the input to any downstream components.