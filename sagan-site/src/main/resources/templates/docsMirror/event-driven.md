---
title: Spring | Event Driven
source: https://spring.io/event-driven
scraped: 2026-02-19T07:47:49.707Z
description: Level up your Java code and explore what Spring can do for you.
---

![](/img/extra/event-driven-7.svg)

# [](#event-driven)Event Driven

Event-driven systems reflect how modern businesses actually work–thousands of small changes happening all day, every day. Spring’s ability to handle events and enable developers to build applications around them, means your apps will stay in sync with your business. Spring has a number of event-driven options to choose from, from integration and streaming all the way to cloud functions and data flows.

### Event-driven microservices

When combined with microservices, event streaming opens up exciting opportunities—event-driven architecture being one common example. Spring simplifies the production, processing, and consumption of events, providing several useful abstractions.

### Streaming data

Streaming data represents a constant flow of events. One example might be a stock ticker. Every time a stock price changes, a new event is created. It’s called “streaming data” because there are thousands of these events resulting in a constant stream of data.

### Integration

The bedrock of any event-driven system is message handling. Connecting to message platforms, routing messages, transforming messages, processing messages. With Spring you can solve these integration challenges quickly.

![](/img/extra/event-driven-1.svg)

# Spring Cloud Stream

Spring Cloud Stream improves your productivity when working with Apache Kafka, RabbitMQ, Azure Event Hub, and more, providing three key abstractions to simplify your code. “Binders” integrate with external messaging systems. “Bindings” bridge the gap between the messaging systems and your code. “Messages” provide the structure that your code uses to send and receive data.

Spring Cloud Stream also provides support for provisioning, content conversion, error handling, configuration management, consumer groups, partitioning, monitoring, and health checks.

[Getting Started with Stream Processing](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/current/reference/html/spring-cloud-stream.html#_quick_start)

[![Event driven](/img/extra/event-driven-2.jpg)](https://www.youtube.com/watch?v=khzC-VwpFVM)

Spring \[Cloud\] Stream and Spring solutions help us to have a cohesive solution for both imperative and reactive needs.ANIL GURSEL, SOFTWARE ENGINEER, PAYPAL

# Spring Cloud Function

Spring Cloud Function, enables you to write functions once and run them anywhere (AWS, Azure, etc.), while continuing to use all the familiar and comprehensive Spring APIs. You can chain multiple functions together to create new capabilities. Support for multiple inputs and outputs brings merging, joining, and other more advanced use cases within easy reach.

```
@SpringBootApplicationpublic class Application {public static void main(String[] args) {SpringApplication.run(Application.class, args);}@Beanpublic  Function<String, String> uppercase() {return value -> value.toUpperCase();}}
```

# Spring Cloud Data Flow

![Data Flow](/img/extra/event-driven-3.png)

Spring Cloud Data Flow offers developers a range of tools and automation for working with all kinds of data sources and destinations. Spring Cloud Data Flow helps you to develop, deploy, manage, and scale high-throughput streaming data pipelines across multiple cloud-native platforms. It also features a rich user interface for building and monitoring your applications.

[Learn more](https://dataflow.spring.io/)

# Spring Cloud Kafka Streams

Spring Cloud Stream provides a second, more specific binder solely for working with Kafka Streams. This special binder still focuses on developer productivity but adds support for Kafka-specific features like KStream, KTable, and GlobalKTable. As with regular Spring Cloud Stream, the binder also takes care of connecting to Kafka, as well as creating, configuring, and maintaining the streams and topics.

[Learn more](https://www.confluent.io/blog/spring-for-apache-kafka-deep-dive-part-2-apache-kafka-spring-cloud-stream/)

![Kafka](/img/logos/apache-kakfa.svg)

# Spring AMQP and Spring for Apache Kafka

With the Spring AMQP and Spring for Apache Kafka projects, you can apply core Spring concepts to the development of Kafka- or RabbitMQ-based messaging solutions.

Both include "template" as a high-level message handling abstraction, and support message-driven POJOs with a "listener container."

[Spring AMQP](/projects/spring-amqp)  
[Spring for Apache Kafka](/projects/spring-kafka)

# Spring Integration

Application integration is a challenge for every enterprise. Spring Integration eases this burden by extending the popular Spring programming model to include all the most common integration patterns. There are ready made connectors for messaging platforms, communications protocols, file systems, and service providers, as well as implementations of common patterns like message routing, data transformation, and filters.

[Get Started with Spring Integration](/gs/integration/)

## Ready to get started?

## More resources

[![Kafka Summit 2019 Keynote](/img/extra/event-driven-4.png)](https://www.youtube.com/watch?v=9I3CDfHKfNY)

# [Kafka Summit 2019 Keynote](https://www.youtube.com/watch?v=9I3CDfHKfNY)

James Watters

[![Boosting Microservice Performance with Kafka](/img/extra/event-driven-5.png)](https://content.pivotal.io/webinars/jun-6-boosting-microservice-performance-with-kafka-rabbitmq-and-spring-webinar)

# [Boosting Microservice Performance with Kafka](https://content.pivotal.io/webinars/jun-6-boosting-microservice-performance-with-kafka-rabbitmq-and-spring-webinar)

Mark Heckler

[![Getting Started With Spring Cloud Stream](/img/extra/event-driven-6.png)](https://content.pivotal.io/content-developers/getting-started-with-spring-cloud-stream)

# [Getting Started With Spring Cloud Stream](https://content.pivotal.io/content-developers/getting-started-with-spring-cloud-stream)

Ben Wilcock and Brian McClain

![](/img/extra/footer.svg)

## Get ahead

VMware offers training and certification to turbo-charge your progress.

[Learn more](https://spring.academy/)

## Get support

Tanzu Spring offers support and binaries for OpenJDK™, Spring, and Apache Tomcat® in one simple subscription.

[Learn more](/support)

## Upcoming events

Check out all the upcoming events in the Spring community.

[View all](/events)