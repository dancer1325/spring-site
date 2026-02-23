---
title: Announcing General Availability of Spring Cloud Stream - Elmhurst.RELEASE (2.0.0.RELEASE)
source: https://spring.io/blog/2018/04/10/announcing-general-availability-of-spring-cloud-stream-elmhurst-release-2-0-0-release
scraped: 2026-02-23T15:26:59.827Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  April 10, 2018 | 0 Comments
---

# Announcing General Availability of Spring Cloud Stream - Elmhurst.RELEASE (2.0.0.RELEASE)

_Engineering | Oleg Zhurakousky |  April 10, 2018 | 0 Comments_

After a long and exciting journey, we are pleased to announce the General Availability release of the [Spring Cloud Stream](https://github.com/spring-cloud/spring-cloud-stream) Elmhurst release train - Elmhurst.RELEASE/2.0.0.RELEASE.

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-stream-dependencies</artifactId>
            <version>Elmhurst.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Spring Cloud Stream Elmhurst (2.0.0.RELEASE) is available for use in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-stream/2.0.0.RELEASE/) and the [Spring Repo](http://repo.spring.io/libs-release/org/springframework/cloud/spring-cloud-stream/2.0.0.RELEASE/). The [release notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.RELEASE) include relevant information about version compatibility with Spring Boot, Spring Cloud, Spring AMQP, and Spring for Apache Kafka.

---

\# New Features, Enhancements, and Improvements While more details are available in the \[What's new in 2.0?\](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#\_what\_s\_new\_in\_2\_0) section of the updated \[reference guide\](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/), we'd like to call out a few items.

### [](#improved-content-type-negotiation-and-message-conversion)Improved Content Type Negotiation and Message Conversion

Spring Cloud Stream 2.0 includes a complete revamp of content-type negotiation functionality to address performance, flexibility, and, most importantly, consistency. The recently published [blog](https://spring.io/blog/2018/02/26/spring-cloud-stream-2-0-content-type-negotiation-and-transformation) touches on some of the key points around what has been done, what to expect, and how it may help you. More information can be found in the [Content Type Negotiation](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#content-type-management) section of the reference guide.

### [](#user-defined-message-converters)User-defined Message Converters

As described in the previous section, a significant amount of work went into simplifying content-type negotiation and Message Conversion. As a result of this work, we now support user-defined message converters (through Spring's standard `org.springframework.messaging.converter.MessageConverters`) being registered for cases where the provided message conversion functionality isn't enough. You can register custom a message converter by using `@StreamMessageConverter`, as shown below:

```
Copy@Bean
@StreamMessageConverter
public FooBarMessageConverter fooBarMessageConverter() {
	return new FooBarMessageConverter(MimeType.valueOf("foo/bar"));
}

public static class FooBarMessageConverter extends AbstractMessageConverter {
. . .
}
```

More information can be found in the [User-defined Message Converters](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#spring-cloud-stream-overview-user-defined-message-converters) section of the reference guide.

### [](#introduced-polling-consumer)Introduced Polling Consumer

Polling Consumer feature lets you control the rate of message consumption, and the recently published [blog](https://spring.io/blog/2018/02/27/spring-cloud-stream-2-0-polled-consumers) from [Gary Russell](https://spring.io/team/grussell) provides additional information, which could be boiled down to two simple steps:

1.  Define a *PollableMessageSource* binding:

```
Copy@Input
PollableMessageSource inputSource();
```

2.  Start using it in your application:

```
Copy@Autowire
PollableMessageSource inputSource;
. . .
inputSource.poll(System.out::println);
```

More information can be found in the [Using Polled Consumers](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#spring-cloud-streams-overview-using-polled-consumers) section of the reference guide.

### [](#actuator-and-web-are-now-optional)Actuator and Web Are Now Optional

To simplify the footprint and to provide greater flexibility with regard to the choice of web frameworks (imperative versus webflux), we've made both Spring Boot Actuator and Web optional dependencies and do not include them by default. However, you can add them as application dependencies if you need to, by including the following dependency elements:

```
Copy<dependency>
     <groupId>org.springframework.boot</groupId>
     <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### [](#new-binding-actuator-endpoints)New Binding Actuator Endpoints

You can now both visualize as well as control bindings by using new actuator endpoints.

Set the `management.endpoints.web.exposure.include=bindings` Boot property and enable one of the web frameworks and actuator by including their respective starters as dependencies in your project (as described in [Actuator and Web Are Now Optional](https://spring.io/admin/blog/3238-announcing-spring-cloud-stream-elmhurst-release-2-0-0-release#actuator-and-web-are-now-optional))

Start your application and access the following URL to visualize the current bindings: [http://localhost:8080/actuator/bindings](http://localhost:8080/actuator/bindings)

From that URL, you can receive output similar to the following:

```text
Copy[
  {
    name: "myDestination",
    group: "myGroup",
    pausable: false,
    state: "running",
    extendedInfo: {
      bindingDestination: "RabbitConsumerDestination{queue=Queue [name=myDestination.myGroup, durable=true, . . .}",
      ExtendedConsumerProperties: {
        concurrency: 1,
        instanceCount: 1,
        maxAttempts: 3,
        backOffInitialInterval: 1000,
        backOffMaxInterval: 10000,
        backOffMultiplier: 2,
        extension: {
          exchangeType: "topic",
          declareExchange: true,
          . . .
```

You can also visualize individual bindings as well as control their lifecycle (such as stop, start, pause, and resume). More details can be found in the [Binding Visualization and Control](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#_binding_visualization_and_control) section of the user guide.

### [](#micrometer-support)Micrometer support

Since Boot 2.0, the metrics support has been based on [Micrometer](https://github.com/micrometer-metrics/micrometer). While Micrometer captures application metrics, Spring Cloud Stream provides support for publishing those application metrics to a predefined destination (such as a Rabbit exchange or a Kafka topic). By setting the `spring.cloud.stream.bindings.applicationMetrics.destination=myMetricDestination` property, you are requesting to publish metric messages to `myMetricDestination`. The published message is in JSON format and looks similar to the following:

```text
Copy{
  "name": "application",
  "createdTime": "2018-03-23T14:48:12.700Z",
  "properties": {
  },
  "metrics": [
    {
      "id": {
        "name": "spring.integration.send",
        "tags": [
          . . .
          {
            "key": "name",
            "value": "input"
          },
          . . .
          {
            "key": "type",
            "value": "channel"
          }
        ],
        "type": "TIMER",
        "description": "Send processing time",
        "baseUnit": "milliseconds"
      },
      "timestamp": "2018-03-23T14:48:12.697Z",
      "sum": 130.340546,
      "count": 6,
      "mean": 21.72342433333333,
      "upper": 116.176299,
      "total": 130.340546
      }
  ]
}
```

One of the consumers of this information is [Spring Cloud Dataflow](https://cloud.spring.io/spring-cloud-dataflow/) and its UI, which shows message rates as well as other metric data. More details can be found in the [Metrics Emitter](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#spring-cloud-stream-overview-metrics-emitter) section of the reference guide.

### [](#streaming-with-apache-kafka-streams)Streaming with Apache Kafka Streams

Our own [Soby Chacko](https://spring.io/team/sobychacko) has done amazing work to provide enhanced support for building streaming applications with [Apache Kafka Streams](https://kafka.apache.org/documentation/streams/). Some of the core features worth mentioning are:

-   Interoperability between Kafka Streams and Kafka channel-based bindings
-   Multiple Kafka Streams types (such as `KStream` and `KTable`) as bindable components
-   Branching support
-   Interactive-query support
-   and more. . .

Just as we were finishing up with this new feature, our relentless colleague and friend, [Josh Long](https://spring.io/team/jlong), compiled a quick demo/tutorial demonstrating some of the tips and tricks of building streaming applications with Kafka Streams and Spring Cloud Stream.

### [](#new-and-improved-quick-start-guide-and-samples)New and Improved Quick Start Guide and Samples

This new [Quick Start](https://docs.spring.io/spring-cloud-stream/docs/Elmhurst.RELEASE/reference/htmlsingle/#_quick_start) guide was specifically designed to take no more then 5 min and requires little to no prior knowledge or experience with Spring Cloud Stream. It also showcases some of the [Spring Initializr](http://start.spring.io/) updates related to Spring Cloud Stream 2.0 and Spring Boot 2.0.

Once comfortable with the core concepts, feel free to venture out and use our extensive and ever growing library of [samples](https://github.com/spring-cloud/spring-cloud-stream-samples) showcasing conventional as well as reactive style streaming applications.

If you want to learn about the role of Spring Cloud Stream as a building block of the directional data pipelines in [Spring Cloud Dataflow](https://cloud.spring.io/spring-cloud-dataflow/), we highly recommend [Real-time Object-Detection With Spring Cloud Stream](https://content.pivotal.io/blog/real-time-object-detection-with-spring-cloud-stream) from our own [Christian Tzolov](https://spring.io/team/tzolov).

---

\# New Release Train Naming Theme Given that most of the Spring Cloud Stream's team resides in the beautiful and historic city of Philadelphia, PA (USA), we are changing the release train naming theme to reflect the rich history and heritage of its neighborhoods. Therefore, the next release train name is \[Fishtown\](https://en.wikipedia.org/wiki/Fishtown,\_Philadelphia) (formerly the center of the shad fishing industry on the Delaware River), identifying with the 2.1.0 version of the Spring Cloud Stream. \`\`\` Fishtown.BUILD-SNAPSHOT \`\`\`

---

# [](#community-contributions)Community contributions

Our community has grown. Whether its participation in the public forum discussion (such as [Stack Overflow](https://stackoverflow.com/tags/spring-cloud-stream), [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream), and others) or code contributions in GitHub, your participation is invaluable and much appreciated. Consequently, we would like to take this opportunity to recognize the following GitHub users and their contributions that came in a form of the GutHib pull requests: `@jmax01`, `@JacobASeverson`, `@davidkalosi`, `@oatesp`, `@aldex32`, `@bewithvk`, `@rzukow`, `@iNikem`, `@Delmonte3161`, `@hekonsek`, and many more.

We would also like to call out a community effort led by our own [Artem Bilan](https://spring.io/team/artembilan) for doing their part in supporting the [AWS Kinesis](https://github.com/spring-cloud/spring-cloud-stream-binder-aws-kinesis) binder.

---

\# Partners Special thanks to Google for providing resources and working with us on integrating \[Google cloud\](https://github.com/spring-cloud/spring-cloud-gcp) technologies with Spring Cloud. Because of their effort, you can now use \[Google PubSub Binder\](https://github.com/spring-cloud/spring-cloud-gcp/tree/master/spring-cloud-gcp-pubsub-stream-binder) to integrate Spring Cloud Stream applications with \[Google Pub/Sub\](https://cloud.google.com/pubsub/docs/overview).

---

As always, we welcome feedback and contributions, so please reach out to us on \[Stack Overflow\](https://stackoverflow.com/tags/spring-cloud-stream) and \[Gitter\](https://gitter.im/spring-cloud/spring-cloud-stream).

If you want to raise issues or make a contribution feel free to reach us at the GitHub project sites:

-   [Spring Cloud Stream](https://github.com/spring-cloud/spring-cloud-stream)
-   [Rabbit Binder](https://github.com/spring-cloud/spring-cloud-stream-binder-rabbit)
-   [Kafka Binder](https://github.com/spring-cloud/spring-cloud-stream-binder-kafka)