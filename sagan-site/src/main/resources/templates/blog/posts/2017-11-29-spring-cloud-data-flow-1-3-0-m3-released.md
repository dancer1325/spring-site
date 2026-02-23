---
title: Spring Cloud Data Flow 1.3.0.M3 released
source: https://spring.io/blog/2017/11/29/spring-cloud-data-flow-1-3-0-m3-released
scraped: 2026-02-23T16:13:19.133Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  November 29, 2017 | 0 Comments
---

# Spring Cloud Data Flow 1.3.0.M3 released

_Releases | Mark Pollack |  November 29, 2017 | 0 Comments_

We are pleased to announce the 1.3.0.M3 release of the Spring Cloud Data Flow and its associated ecosystem of projects.

Local Server: [Getting Started Guide](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M3/reference/htmlsingle/#getting-started)

# [](#release-highlights)[](#release-highlights)Release Highlights

## [](#stream-updates-and-rollback)[](#stream-updates-and-rollback)Stream updates and rollback

A streaming data pipeline orchestrated as a series of microservice applications has always been the core value of Spring Cloud Data Flow’s design. In 1.3.0.M3 we have provided the ability to update sources, processors, and sinks independently without having to undeploy and redeploy the entire stream.

The stream update feature is implemented by delegating the deployment process to a new Spring Cloud project called Skipper. Introduced in [this blog](https://spring.io/blog/2017/10/30/spring-cloud-skipper-1-0-m1-released), Spring Cloud Skipper is a standalone server that deploys Spring Boot applications to multiple cloud platforms. It also keeps track of the application version, application properties, and deployment properties of the deployed application or applications so that the changes to any of these properties can be calculated upon an update request.

When a request is made to update applications in a Stream, only the application or applications that need to be changed are updated. A simple red/black update is performed and the design relies on Spring Boot’s health endpoint associated with the new application(s). By keeping track of the deployments, Skipper can also rollback to previous versions of the stream.

The following new Data Flow commands show the basic lifecycle of updating the log sink from version 1.1.0 to version 1.2.0 and then rolling back to 1.1.0. This assumes that both version 1.1.0 and 1.2.0 of the log sink were deployed as maven artifacts. Note that the HTTP source application remains deployed throughout the changes to the log sink.

dataflow:> app register --name http --type source --uri maven://org.springframework.cloud.stream.app:http-source-rabbit:1.2.0.RELEASE

dataflow:> app register --name log --type sink --uri maven://org.springframework.cloud.stream.app:log-sink-rabbit:1.1.0.RELEASE

dataflow:> stream create --name httptest --definition "http --server.port=9000 | log"

dataflow:> stream skipper deploy --name httptest

dataflow:> stream skipper update --name httptest --properties version.log=1.2.0.RELEASE

dataflow:> stream skipper rollback --name httptest

The [Getting Started](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M3/reference/htmlsingle/#getting-started) and [Streams with Skipper](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.M3/reference/htmlsingle/#spring-cloud-dataflow-streams-skipper) sections of the documentation walk through the process in much greater detail.

## [](#javadsl)[](#javadsl)JavaDSL

An an alternative to using the Shell, the newly added JavaDSL provides a programmatic way to create, deploy, or launch streams using a fluent API. Instead of having to deploy streams into production by passing a script file to the shell, you can now write an application and manage it under version control along with other code artifacts.

The JavaDSL offers two styles to create StreamDefinitions.

-   The “definition” style keeps the feel of using the pipes and filters textual DSL in the shell. This style is selected by using the definition method after setting the stream name, e.g.
    
    StreamDefinition streamDefinition = Stream.builder(dataFlowOperations) .name("ticktock") .definition("time | log") .create()
    
-   The “fluent” style lets you chain together sources, processors and sinks by passing in an instance of a StreamApplication, e.g.
    
    StreamApplication timeSource = new StreamApplication("time"); StreamApplication logSink = new StreamApplication("log"); StreamDefinition streamDefinition = Stream.builder(dataFlowOperations) .name("ticktock") .source("timeSource") .sink("logSink");
    

While this approach might not seem at first glance significantly different from the definition style, it allows you reuse StreamApplication instances across multiple streams by declaring them as Spring Beans in an application context.

With the StreamDefinition instance, you can then deploy the stream.

```
CopyStream stream = streamDefinition.deploy();
```

With a Stream instance you can ask for the stream’s status, undeploy, or destroy the stream.

The [Java DSL section](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.BUILD-SNAPSHOT/reference/htmlsingle/#spring-cloud-dataflow-stream-java-dsl) of the reference guide provides a more complete introduction to the DSL and Spring Data Flow Samples repository provides a [working example](https://github.com/spring-cloud/spring-cloud-dataflow-samples/tree/master/javadsl) for you to get started using in your own projects.

## [](#app-resolution-of-http-based-resources)[](#app-resolution-of-http-based-resources)App Resolution of HTTP based resources

Previously any application registered as HTTP resources were downloaded once and then cached by the Data Flow server. While in theory, this optimized the deployment time, since an existing application would not be downloaded multiple times, in practice HTTP resources were commonly used in the early stages of developing custom stream applications. In this mode of operation, the file name of the artifact, which contains the version number, would not change even though application code would change. Seeing the new code run would then require you to increment the version number, which was not intuitive in these early stages of development.

To accommodate this use-case, the Data Flow server now always downloads an HTTP based resource. To ensure that disk space does not grow unchecked, a LRU cache is used to delete downloaded resources. This feature also lets you download SNAPSHOT named artifacts from a maven repository via an HTTP resource reference and always get the latest code. In conclusion, this further simplifies the development experience; especially, when the business-logic is actively being iterated over.

## [](#dashboard--flo)[](#dashboard-flo)Dashboard / Flo

We are excited to announce that this release brings feature-parity on the SCDF’s Dashboard. All the feature capabilities that were supported in the older UI-stack are ported and upgraded to the Angular 4.0 stack. The stream, task, job, analytics, runtime, and apps tabs are fully featured. The Spring Flo designer for streams and composed-task is operational and functionally complete. For the curious, we have also published the Spring Flo’s [core library](https://github.com/spring-projects/spring-flo) as an [NPM package](https://www.npmjs.com/package/spring-flo).

## [](#version-compatibility)[](#version-compatibility)Version Compatibility

This release brings the Spring Boot 1.5.8 compatibility and the underlying Spring Cloud infrastructure is updated to Edgware.RELEASE. For more details, please review the [1.3.0.M3](https://github.com/spring-cloud/spring-cloud-dataflow/releases) release notes.

Looking ahead, we are aiming for 1.3.0 RC1 in a few weeks followed by the general availability release by end of January 2018.

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).

Please try it out, share your feedback, and consider contributing to the project!