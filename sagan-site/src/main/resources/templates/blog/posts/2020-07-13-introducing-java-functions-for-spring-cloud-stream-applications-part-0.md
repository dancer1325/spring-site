---
title: Introducing Java Functions for Spring Cloud Stream Applications - Part 0
source: https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0
scraped: 2026-02-23T13:37:29.873Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | David Turanski |  July 13, 2020 | 5 Comments
---

# Introducing Java Functions for Spring Cloud Stream Applications - Part 0

_Releases | David Turanski |  July 13, 2020 | 5 Comments_

We are happy to announce the release of [Spring Cloud Stream applications 2020.0.0-M2](https://github.com/spring-cloud/stream-applications/releases/tag/v2020.0.0-M2). This release is a complete overhaul of the legacy [Spring Cloud Stream App Starters](https://github.com/spring-cloud-stream-app-starters). Starting with this release, we are moving away from theme-oriented release train names (famous scientists in alphabetical order) to calendar based versioning. The current GA release is called *Einstein*, and we are pleased to introduce *2020.0.0-M2*. We are also moving away from the app starters. Having reorganized, repackaged, and (in some cases) rewritten the underlying code, we now have a new Git repository: [spring-cloud/stream-applications: Functions and Spring Cloud Stream Applications for data driven microservices](https://github.com/spring-cloud/stream-applications).

## [](#how-did-we-get-here)[](#how-did-we-get-here)How Did We Get Here?

The Spring team has maintained pre-packaged applications, built on [Spring Cloud Stream](https://spring.io/projects/spring-cloud-stream), since the inception of [Spring Cloud Data Flow](https://spring.io/projects/spring-cloud-dataflow) in 2016. These are production-ready applications, built on the proven capabilities of Spring and Spring Integration to provide out-of-the-box integration with commonly used open source data stores, message brokers, online services, and communication protocols. In fact, we have been providing the underlying components, used by enterprise developers to build business-critical systems, for more than a decade now. The timeline below summarizes the evolution from [Spring Integration](https://spring.io/projects/spring-integration) components to pre-packaged applications.

![Stream Applications Timeline](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/stream-applications-history.png?raw=true)

These applications give you a jump start when orchestrating data streaming pipelines with Data Flow or using them directly as Data microservices. As always, in keeping with the Spring philosophy, we do the heavy lifting for you, letting you focus on business logic.

At the heart of it, a Spring Cloud Stream application is a Spring Boot application (uber jar) that includes a Spring Cloud Stream binder dependency. The binder exposes a service provider interface to abstract implementations that utilize underlying messaging middleware (such as Apache Kafka, RabbitMQ, Amazon Kinesis, Google Pub Sub, and Solace) for distributed communications, hiding the specific details of the middleware from the application. Therefore, the application has no knowledge of the underlying middleware it is using to communicate.

This architecture enabled us to implement the core functionality without a binder, as [Spring Cloud Stream App Starters](https://github.com/spring-cloud-stream-app-starters). A custom Maven plugin was used to generate Maven poms (one each for the Apache Kafka binder and the RabbitMQ binder) and a generic Spring Boot main class that imports the app starter configuration. The pom also includes [monitoring](https://dataflow.spring.io/docs/feature-guides/streams/monitoring/) and security support. The pre-packaged stream applications work with either Apache Kafka or RabbitMQ and are published to public repositories as Spring Boot executable jars and Docker images.

In many respects, the pre-packaged stream applications can be compared with Kafka Connect. Although this is not a direct apples to apples comparison, the stream applications can be used in place of Kafka connect applications. Kafka Connect applications require Apache Kafka to produce and consume data, whereas the Spring Cloud Stream applications work with a wide variety of middleware technologies, including Kafka, as previously mentioned. Note that all of our pre-packaged applications are free and open source, whereas many of the Kafka connectors are commercially licensed.

## [](#what-has-changed)[](#what-has-changed)What Has Changed?

### [](#java-functions)[](#java-functions)Java Functions

Continual advances in the Java and Spring ecosystem have driven us to rethink our approach. The most significant change is that we have implemented a layered architecture in which the core functionality, previously provided by the app starters, are now provided as Java functions, implementing the standard interfaces found in the *java.util.function* package.

The functional components in this release can be exposed as standard Spring beans and then used for your data integration needs by directly embedding them in an application. By injecting these functions in a custom application, you immediately benefit from the features provided by underlying libraries. For example, Spring Integration adapters are used in many of these functions. You can invoke the function directly, use [Spring Cloud Function](https://spring.io/projects/spring-cloud-function) to invoke it through a REST endpoint, or use it in a serverless environment. Unlike the app starters, the functional components have no dependency on Spring Cloud Stream. They are now, however, the core components of the stream applications. The following image shows the relationship between the components and the applications:

![Stream Applications Layered Architecture](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/stream-applications-layered-architecture.png?raw=true)

### [](#stream-applications)[](#stream-applications)Stream Applications

By using Spring Cloud Stream, we can exploit the logical equivalence of the java.util.function types (Supplier, Function, Consumer) to the Spring Cloud Stream concepts (source, processor, and sink, respectively). As before, we use a new and improved [Maven plugin](https://github.com/spring-cloud/spring-cloud-app-starters-maven-plugins/tree/master/spring-cloud-stream-app-maven-plugin) to generate the Spring Boot main class, application.properties file, and binder-specific Maven poms with built-in [monitoring](https://dataflow.spring.io/docs/feature-guides/streams/monitoring/) and security support. With few exceptions, we can build the Spring Cloud Stream applications with no additional code.

The new approach offers several advantages:

-   Spring Cloud Stream v3.x introduced a powerful [Functional programming model](https://cloud.spring.io/spring-cloud-static/spring-cloud-stream/current/reference/html/spring-cloud-stream.html#spring_cloud_function) based on [Spring Cloud Function](https://spring.io/projects/spring-cloud-function). This approach is favored over the legacy annotation-based model (*@EnableBinding*, *@StreamListener*). Spring Cloud Stream can bind directly to the input(s) and output(s) of a Function *@Bean*. With this model, neither the legacy Spring Cloud Stream annotations nor the Source, Processor, and Sink interfaces are needed.

The figure below illustrates this concept by using simple functions packaged as Spring Cloud Stream applications. The binder implementation and external configuration properties enable the applications to communicate through a message broker, but the application code is not concerned with any of this. Spring Cloud Stream invokes the *helloTime* Function in the ProcessorApplication whenever a message arrives on the *time* topic and directs its output to the *hello* topic. Likewise, the *printTime* Consumer in the SinkApplication is triggered by a message arriving on the *hello* topic. But what triggers the SourceApplication? As you may have guessed, Spring Cloud Stream auto-configures a poller, which invokes the *currentTime* Supplier every second (by default). Of course, this is configurable.

![Spring Cloud Stream Example](https://github.com/spring-cloud/stream-applications/blob/gh-pages/img/spring-cloud-stream-example.png?raw=true)

-   The functional components are available to be packaged and deployed in a wide range of uses other than Spring Cloud Stream, particularly in FaaS environments.
    
-   The functional components are built with [Project Reactor](https://projectreactor.io/), where appropriate, to enable non-blocking reactive streaming.
    
-   The stream applications (or any Spring Boot application built with the functional components) can take advantage of Spring Cloud Function’s declarative function composition features. This means that the pre-packaged stream applications can be configured to perform common transformation and filtering operations with no customization required.
    
-   The new [stream-applications](https://github.com/spring-cloud/stream-applications) Git repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo). Unlike *stream-cloud-app-starters*, where each app has its own repository, the new *stream-applications* repository contains everything (functions, applications, and common components) in a single repository. This simplifies dependency management and allows for atomic commits. The hope is that this change, along with other ongoing efforts, will make it easier for developers and help encourage community contributions.
    

## [](#what-does-this-release-contain)[](#what-does-this-release-contain)What Does this Release Contain?

The following is a partial list of the various functions and applications available in this release:

-   **Suppliers and sources**: File, FTP, SFTP, AWS S3, HTTP, Geode, TCP, TIme, Twitter, Websocket, JDBC, JMS, RabbitMQ, MQTT.
    
-   **Consumers and sinks**: Analytics, Cassandra, File, FTP, Geode, JDBC, Log, Mongodb, MQTT, Rabbit, Redis, AWS S3, SFTP, TCP, Twitter, Wavefront, Websocket.
    
-   **Functions and processors**: Filter, Header Enricher, HTTP Request, Tensorflow (image recognition, object detection and semantic segmentation), SpEL, Splitter, Task Launch Request, Task Launcher, Twitter.
    

See the [Stream Applications README](https://github.com/spring-cloud/stream-applications/blob/master/README.adoc) for a complete list.

## [](#what-does-this-mean-for-current-users)[](#what-does-this-mean-for-current-users)What does this mean for current users?

In many cases, the new applications provide the equivalent functionality as the previous releases. In some cases (such as Twitter), we have significantly enhanced the functionality. We also have merged and renamed some of the applications. In short, there are some breaking changes. Notably, many of the configuration property names have changed, where appropriate, to reflect an association with the functional components (for example, *s3.supplier.remoteDir*). Also, these applications may not work with stream applications that are built with older releases of Spring Cloud Stream. For example, a source built with an older version of Spring Cloud Stream is not guaranteed to work with a sink from this release. If you are already using pre-packaged applications from a previous release, there is no need to upgrade immediately, unless you are compelled to take advantage of some of the new features. The *Einstein* release train will go into maintenance mode, so it will include only bug fixes going forward. All new development will be applied to future releases.

## [](#how-do-i-contribute-a-new-function-or-application)[](#how-do-i-contribute-a-new-function-or-application)How do I contribute a new function or application?

If you cannot find what you are looking for in the existing catalog of functions and applications, please consider [contributing](https://github.com/spring-cloud/stream-applications/blob/master/docs/Contributing.adoc). This way, the entire open source community will benefit. In a subsequent post, we will walk through a real-world example of developing a function and stream application.

We encourage the community to get involved with this project. We have several open issues labelled [ideal for contribution](https://github.com/spring-cloud/stream-applications/labels/ideal-for-contribution). In addition to code contributions, we really appreciate documentation improvements, creating issues, and starring the repository.

## [](#stay-tuned)[](#stay-tuned)Stay tuned…​

This blog is the first in a weekly series that will cover topics introduced here in a lot more detail. Look for more deep dives and focused topics in the coming weeks. We will take you through the entire landscape of components included in this repository and surrounding processes.

### [](#more-posts-in-this-series)[](#more-posts-in-this-series)More posts in this series

[Introducing Java Functions for Spring Cloud Stream Applications - Part 1](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)