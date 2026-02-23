---
title: Spring Cloud Data Flow 1.3 GA released
source: https://spring.io/blog/2018/02/01/spring-cloud-data-flow-1-3-ga-released
scraped: 2026-02-23T16:09:56.562Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gunnar Hillert |  February 01, 2018 | 1 Comment
---

# Spring Cloud Data Flow 1.3 GA released

_Releases | Gunnar Hillert |  February 01, 2018 | 1 Comment_

On behalf of the team, I am pleased to announce the general availability of Spring Cloud Data Flow 1.3 across a range of platforms

Follow the Getting Started guides for [Local Server](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.RELEASE/reference/htmlsingle/#getting-started), [Cloud Foundry](https://docs.spring.io/spring-cloud-dataflow-server-cloudfoundry/docs/1.3.0.RELEASE/reference/htmlsingle/#getting-started), and [Kubernetes](https://docs.spring.io/spring-cloud-dataflow-server-kubernetes/docs/1.3.0.RELEASE/reference/htmlsingle/#kubernetes-getting-started)

# [](#release-highlights)[](#release-highlights)Release Highlights

## [](#stream-updates-and-rollback)[](#stream-updates-and-rollback)Stream updates and rollback

A streaming data pipeline orchestrated as a series of microservice applications has always been the core value of Spring Cloud Data Flow’s design. In Data Flow 1.3 we have provided the ability to update sources, processors, and sinks independently without having to undeploy and redeploy the entire stream.

The stream update and rollback functionality is implemented by delegating the deployment process to a new Spring Cloud project called [Skipper](https://cloud.spring.io/spring-cloud-skipper/). Skipper is a lightweight Spring Boot application, purpose-built to fill this feature gap in Data Flow. Skipper defines a package format, much like `helm` or `brew` and can also deploy/undeploy applications to multiple cloud platforms: Local, Cloud Foundry, and Kubernetes. It uses the same Spring Cloud Deployer libraries that have been part of Data Flow since the beginning. Recent presentations at SpringOne 2017 [introduces Skipper](https://content.pivotal.io/springone-platform-2017/continuous-deployment-made-easy-with-skipper-mark-pollack) and the [integration with Data Flow](https://content.pivotal.io/springone-platform-2017/orchestrating-data-microservices-with-spring-cloud-data-flow-mark-pollack) in more depth.

When deploying a Stream, Data Flow creates Skipper package describing the Stream and the applications that are part of the Stream definition. Skipper then deploys the applications to the desired platform. When requesting a stream update, only the application or applications that need to be changed are automatically redeployed. A simple strategy managed by a Spring Statemachine instance performs the update or rollback steps.

Data Flow includes new stream commands to make upgrade and rollback operations.

dataflow:>app register --name transform --type processor --uri maven://com.eg:transformer:0.0.1

dataflow:>stream create mystream --definition "jdbc | transform | mongodb"

dataflow:>app register --name transform --type processor --uri maven://com.eg:transformer:0.0.2

dataflow:>stream update mystream --properties “version.transform=0.0.2”

dataflow:>stream rollback mystream

In this series of commands, the stream is deployed using version 0.0.1 of the transformer. The `jdbc` and `mongodb` source and sink are already registered. The stream is then updated to use version 0.0.2 of the transformer. Only the `transform` application is updated, with version 0.0.2 being deployed and version 0.0.1 being undeployed. The `jdbc` and `mongodb` applications are left as-is. The rollback command does the opposite, bringing the stream back to the state with version 0.0.1 of the transformer.

Note: To use Data Flow and Skipper, Data Flow’s [feature toggle for Skipper](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.RELEASE/reference/htmlsingle/#getting-started-deploying-spring-cloud-dataflow) must be enabled in both the Data Flow Server and shell.

## [](#javadsl)[](#javadsl)JavaDSL

The [DataFlowTemplate](https://github.com/spring-cloud/spring-cloud-dataflow/blob/v1.3.0.RELEASE/spring-cloud-dataflow-rest-client/src/main/java/org/springframework/cloud/dataflow/rest/client/DataFlowTemplate.java) class has been the workhorse of deploying streams and tasks programmatically. However, it is a fairly low level API. We have added a new fluent style API to create, deploy, or launch streams that is easier to use and also and enables the reuse of [StreamApplication](https://github.com/spring-cloud/spring-cloud-dataflow/blob/v1.3.0.RELEASE/spring-cloud-dataflow-rest-client/src/main/java/org/springframework/cloud/dataflow/rest/client/dsl/StreamApplication.java) instances across multiple streams.

StreamApplication source = new StreamApplication("http") .addProperty("server.port", 9900);

StreamApplication processor = new StreamApplication("filter") .addProperty("expression", "payload=='good'");

StreamApplication sink = new StreamApplication("log");

Stream simpleStream = streamBuilder.name("simpleStream") .source(source) .processor(processor) .sink(sink) .create() .deploy();

With a Stream instance you can ask for the stream’s status, undeploy, or destroy the stream.

The [Java DSL section](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-stream-java-dsl) of the reference guide provides a more complete introduction to the DSL and the Spring Data Flow Samples repository provides an [example](https://github.com/spring-cloud/spring-cloud-dataflow-samples/tree/master/javadsl) for you to get started using it in your projects.

## [](#angular-4)[](#angular-4)Angular 4

The Data Flow Dashboards has been updated to take advantage of Angular 4 and align with the [Pivotal UI](https://github.com/pivotal-cf/pivotal-ui) styling. A major focus is the consistent use of domain model classes vs. straight JSON strings. This allows for finer-grained control over the state of the application, e.g. when transitioning from a paginated list to a details page and back. There is also improved [documentation for the UI](https://cloud.spring.io/spring-cloud-dataflow-ui/index.html) using [Compodoc](https://compodoc.github.io/website/).

## [](#fan-in-and-fan-out-visualization)[](#fan-in-and-fan-out-visualization)Fan-in and Fan-out visualization

Fan-in refers to when multiple sources all send data to the same messaging destination. Fan-out refers to determining the messaging destination at runtime. This video shows the UI in action for streams with these topologies.

There is a new UI control to directly branch out from a specific node to ["tap a stream"](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-stream-dsl-tap) and another new UI control to manage [named destinations](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-stream-dsl-named-destinations). These new features make building a complex stream topology easier.

## [](#application-registry-improvements)[](#application-registry-improvements)Application Registry Improvements

Users who [register applications as maven artifacts](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.RELEASE/reference/htmlsingle/#spring-cloud-dataflow-register-stream-apps) can now take advantage of the “update-policy” feature to override and refresh Spring Cloud Data Flow’s internal maven cache. For instance, in development, you can continuously resolve SNAPSHOT versions of the maven artifact by setting `update-policy=always`, which will force the download of the latest version of the streaming or batch/task application that’s in use in the DSL/Dashboard.

Based on user feedback, applications registered using an `http` resource will always be downloaded and not cached. This facilitates the development lifecycle of updating the code, but not the name, of an application’s uberjar hosted on a web server.

When in Skipper mode, [multiple application versions can be registered](https://docs.spring.io/spring-cloud-dataflow/docs/1.3.0.RELEASE/reference/htmlsingle/#_register_a_versioned_stream_app). A default version is used when deploying the stream. You can set the default version using the new command `app default`. However, when upgrading an application version in a stream, you must first register it in Data Flow.

## [](#shell-improvements)[](#shell-improvements)Shell improvements

This release adds “autocompletion” for stream and task/batch names and other metadata. No more guessing - everything is a TAB press away! Check out the following [screencast](https://youtu.be/uyN8ttlTvUM) to learn more about the advanced shell features, tips, and tricks.

## [](#function-runners)[](#function-runners)Function Runners

Initial support for running functions in SCDF is provided by the use of a function-runner application. When creating a stream with Spring Cloud Function application, you pass in the function’s classname and jar location.

dataflow:> stream create foo --definition "http | function-runner --function.className=com.example.functions.CharCounter --function.location=file:///home/john/myfunction.jar | log"

There is a [sample](https://docs.spring.io/spring-cloud-dataflow-samples/docs/current/reference/htmlsingle/#_functions_in_spring_cloud_data_flow) you can use to experiment with this feature. Simplifying the deployment of Spring Cloud Functions by not requiring explicit user invocation of the `function-runner` is on our roadmap.

## [](#applications)[](#applications)Applications

[MQTT source](https://github.com/spring-cloud-stream-app-starters/mqtt/blob/master/spring-cloud-starter-stream-source-mqtt/README.adoc) and [MQTT sink](https://github.com/spring-cloud-stream-app-starters/mqtt/blob/master/spring-cloud-starter-stream-sink-mqtt/README.adoc) applications can interact with IoT devices.

The [TensorFlow processor](https://github.com/spring-cloud-stream-app-starters/tensorflow) can help with real-time predictive model evaluations. Checkout the [Twitter-sentiment](https://github.com/spring-cloud-stream-app-starters/tensorflow/tree/master/spring-cloud-starter-stream-processor-twitter-sentiment) model-prediction use of it to get an idea.

Improving upon the data science capabilities, Python-HTTP and Python-Jython processors are now also available.

The new bit.ly links, [Celsius.SR1](https://cloud.spring.io/spring-cloud-stream-app-starters/#stream-app-starters-and-spring-cloud-data-flow-) and [Clark.GA](https://cloud.spring.io/spring-cloud-task-app-starters/#task-app-starters-and-spring-cloud-data-flow-), are available to bulk import and register all the out-of-the-box applications in SCDF.

Simplifying the deployment of Spring Cloud Functions by not requiring explicit user invocation of the `function-runner` is on our roadmap.

## [](#spring-cloud-data-flow-tile-for-pcf)[](#spring-cloud-data-flow-tile-for-pcf)Spring Cloud Data Flow Tile for PCF

Spring Cloud Data Flow’s Cloud Foundry tile has been in a closed-BETA state for the last few months. We have iterated on customer and field feedback and it is set to graduate out of BETA to a 1.0 GA status officially. This release automates the provisioning (including the metrics-collector, skipper, database, and message-broker) along with end-to-end OAuth/SSO integration in Cloud Foundry. There are a lot of other value-adds, so stay tuned for a more focused discussion, [documentation](https://docs.pivotal.io/scdf/), and pointers to the tile-page in [Pivotal Network](https://network.pivotal.io/products/p-dataflow).

## [](#helm-chart-for-kubernetes)[](#helm-chart-for-kubernetes)Helm Chart for Kubernetes

[Spring Cloud Data Flow’s helm-chart](https://hub.kubeapps.com/charts/incubator/spring-cloud-data-flow) will be updated to the latest 1.3 GA release once the [pull-request is merged](https://github.com/kubernetes/charts/pull/3525). With this chart, the latest release of SCDF along with the companion components (metrics-collector, skipper, database, and message-broker) can be automatically provisioned with the following helm-commands.

helm repo add incubator [http://storage.googleapis.com/kubernetes-charts-incubator](http://storage.googleapis.com/kubernetes-charts-incubator) helm repo update helm install --name scdf incubator/spring-cloud-data-flow --set rbac.create=tru

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) or [GitHub](https://github.com/spring-cloud/spring-cloud-dataflow/issues) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).

Please try it out, share your feedback, and consider contributing to the project!