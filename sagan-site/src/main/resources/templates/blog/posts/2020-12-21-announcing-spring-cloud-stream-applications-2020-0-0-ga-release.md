---
title: Announcing  Spring Cloud Stream Applications 2020.0.0 GA Release
source: https://spring.io/blog/2020/12/21/announcing-spring-cloud-stream-applications-2020-0-0-ga-release
scraped: 2026-02-23T13:36:42.836Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  December 21, 2020 | 0 Comments
---

# Announcing  Spring Cloud Stream Applications 2020.0.0 GA Release

_Engineering | Soby Chacko |  December 21, 2020 | 0 Comments_

We are glad to announce the GA release of the newly redesigned Spring Cloud Stream applications - [2020.0.0](https://github.com/spring-cloud/stream-applications/releases/tag/v2020.0.0).

We would like to use this release announcement as an opportunity to wrap up the blog series that we started in the summer. Therefore, consider this as part 15 of the blog series. In this blog, we are going to give a rundown of all the previous episodes in the series, but first, let us go through some release details.

### [](#release-overview)[](#release-overview)Release Overview

[2020.0.0 GA](https://github.com/spring-cloud/stream-applications/releases/tag/v2020.0.0) release contains the completely revamped functional foundation for the event-streaming applications. The old structure was based on an [app starter](https://github.com/spring-cloud-stream-app-starters) model in which the critical logic for the applications is provided as part of a starter module. The starters then form the foundation for the applications. While it worked for the previous four generations of these app starters (Avogadro, Bacon, Celsius, Darwin, and Einstein), it deemed necessary to rewrite these starters as reusable functions so that they can be used for a wide array of use cases beyond what is required in the out of the box applications. Therefore, many of the old app starters were refactored and redesigned as functions, suppliers, and consumers. For the out of the box Spring Cloud Stream binder based applications, we take these functional components and use them as the base to build them. Other custom applications, even non-streaming use cases, can be designed using these functional components as a foundation. The functions can be [composed](https://github.com/spring-cloud/stream-applications/blob/master/docs/FunctionComposition.adoc) together to implement many other data integration use cases.

There is a new single [mono repository](https://github.com/spring-cloud/stream-applications) that hosts all the stream application components. The source for all the currently available functions and applications can be found there. These collections comprise components that satisfy a wide spectrum of use cases such as data ingestion, ETL, machine learning, analytics, file processing, etc. among many others. Take a look at the [README](https://github.com/spring-cloud/stream-applications/blob/master/README.adoc) to get more information on what is available.

### [](#version-changes)[](#version-changes)Version Changes

Starting with this release, we are moving to a [Calendar](https://calver.org/) based versioning scheme. This is different from the old release train names which used the alphabetical scheme (scientists names). The new version is named `2020.0.0`. It follows from the pattern `YYYY.MINOR.MICRO`, where `MINOR` is an incrementing number that starts at zero each year. The MICRO segment represents the suffixes previously used, where .0 is the first GA release, `.1` analogous to `.SR1`, `.2` analogous to `.SR2`, so on and so forth. It is worth noting that although the release train is following the calendar versioning, the individual components (functions and applications) in it are named using a numbering scheme. For example, the functions are starting from `1.0.0` and the applications are starting from `3.0.0`.

Here is the project site for the new [Stream Applications](https://spring.io/projects/spring-cloud-stream-applications). The [reference docs](https://docs.spring.io/stream-applications/docs/2020.0.0/reference/html/) contain more details on the various aspects of the applications.

Although noted on the release page, it is worth mentioning that the new applications are built using Spring Boot `2.3.7.RELEASE`, Spring Cloud Stream `3.0.10.RELEASE`, Spring Integration `5.3.4.RELEASE`, and Spring Cloud Function `3.0.12.RELEASE`.

### [](#using-the-applications-on-spring-cloud-data-flow)[](#using-the-applications-on-spring-cloud-data-flow)Using the Applications on Spring Cloud Data Flow

The [out of the box applications](https://github.com/spring-cloud/stream-applications/blob/master/README.adoc) in the release are primarily used to build data pipelines on [Spring Cloud Data Flow](https://dataflow.spring.io/).

For those who are using Spring Cloud Data Flow, here are the bulk update links for these new applications.

-   [https://dataflow.spring.io/kafka-maven-latest-v2](https://dataflow.spring.io/kafka-maven-latest-v2) - Maven artifacts for Kafka
    
-   [https://dataflow.spring.io/rabbitmq-maven-latest-v2](https://dataflow.spring.io/rabbitmq-maven-latest-v2) - Maven artifacts for RabbitMQ
    
-   [https://dataflow.spring.io/kafka-docker-latest-v2](https://dataflow.spring.io/kafka-docker-latest-v2) - Docker artifacts for Kafka
    
-   [https://dataflow.spring.io/rabbitmq-docker-latest-v2](https://dataflow.spring.io/rabbitmq-docker-latest-v2) - Docker artifacts for Kafka
    

Note that these new links have a `-v2` attached to them, but that is temporary. As many users are still using the [Einstein](https://github.com/spring-cloud-stream-app-starters/app-starters-release/releases/tag/vEinstein.SR9) version of the applications, we want them to continue accessing them using the old links. Eventually, in a few months, we will switch these `-v2` links as the main links.

These applications can also run as standalone deployments. Here are some handy links to use these applications as standalone. This is good for testing something really quick for example. You can just copy the URL for the application you want and download it using `wget`, `curl` etc.

-   [Kafka based maven applications](https://repo.maven.apache.org/maven2/org/springframework/cloud/stream/app/stream-applications-descriptor/2020.0.0/stream-applications-descriptor-2020.0.0.kafka-apps-maven-repo-url.properties)
    
-   [RabbitMQ based maven applications](https://repo.maven.apache.org/maven2/org/springframework/cloud/stream/app/stream-applications-descriptor/2020.0.0/stream-applications-descriptor-2020.0.0.rabbit-apps-maven-repo-url.properties)
    

### [](#maven-plugin-for-generating-applications)[](#maven-plugin-for-generating-applications)Maven Plugin for Generating Applications

We use a [maven plugin](https://github.com/spring-cloud/spring-cloud-dataflow-apps-plugin/tree/master/spring-cloud-dataflow-apps-generator-plugin) to generate out of the box applications. This plugin is also redesigned from the ground up for this release. This [README](https://github.com/spring-cloud/spring-cloud-dataflow-apps-plugin/blob/master/spring-cloud-dataflow-apps-generator-plugin/README.adoc) contains instructions for how to use the plugin to generate applications.

### [](#building-custom-applications-using-a-github-template-repository)[](#building-custom-applications-using-a-github-template-repository)Building Custom Applications Using a GitHub Template Repository

We provide [GitHub template repositories](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template), using which we can build custom stream applications that provide all the necessary infrastructure needed to run these applications on Spring Cloud Data Flow. In other words, when you use the template repositories for creating a custom application, you can take the application and run it on Spring Cloud Data Flow in the same way as the out of the box applications work.

Here are the links to the template repositories.

-   [GitHub template repositories for Kafka binder based applications](https://github.com/spring-cloud/dataflow-app-kafka)
    
-   [GitHub template repositories for RabbitMQ binder based applications](https://github.com/spring-cloud/dataflow-app-rabbit).
    

You can click on the `Use this template` at the top of the repository to create a new custom repository for the new application.

### [](#wrapping-up-the-blog-series)[](#wrapping-up-the-blog-series)Wrapping up the Blog Series

Now that we covered all the `2020.0.0` release details, as mentioned before, let us use this as an opportunity to wrap up the blog series that we started in the summer. The series covered many different topics and use cases. Below, you can find links to all of them and a summary description of what was covered in each blog.

**Blog 1**: [Introducing Java Functions for Spring Cloud Stream Applications - Part 0](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)

The first blog in this series gives us an overall vision and direction for this project. It starts with some historical context of how we got here. It then set the stage for these new functions and the Spring Cloud Stream applications based on them.

**Blog 2**: [Introducing Java Functions for Spring Cloud Stream Applications - Part 1](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)

This episode gives a detailed analysis of functional composition and then delved deep into how function composition works in Spring Cloud Stream. This blog provides us some good directions on how we can use the existing source applications to make use of other functions bundled with them and auto-configured. It also demonstrates how task launch requests can be made from a source application.

**Blog 3**: [Creating a Supplier Function and generating Spring Cloud Stream Source](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)

In this part, we see how to write a new Supplier function from the ground up and use it to build a Spring Cloud Stream source. We used the existing RSS feed adapter in Spring Integration as an example to create a feed-supplier which we then used to build a feed source. This blog gives enough templates for new suppliers and sources.

**Blog 4**: [Creating a function for consuming data and generating Spring Cloud Stream Sink applications](https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications)

Similar to blog `#3`, this one demonstrates writing a new consumer function and using that to build a Spring Cloud Stream sink application. We used RSocket as an example and built a consumer function using the fire-and-forget strategy in RSocket. This blog also gives enough recipes for creating new consumer functions and sinks.

**Blog 5**: [Case Study: Build and Run a Streaming Application Using an HTTP Source and a JDBC Sink](https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink)

In this blog, we demonstrate a data pipeline using `HTTP | JDBC`. This is a very detailed blog that shows invoking an HTTP POST endpoint and then inserts the data posted through the endpoint into a relational database. This one also is very interesting in that it demonstrates the full gamut of the lifecycle of these applications by going all the way from functions, applications and then finally showing how to deploy this pipeline on Spring Cloud Data Flow.

**Blog 6**: [Case Study: HTTP Request Function and Processor](https://spring.io/blog/2020/08/17/case-study-http-request-function-and-processor)

This is a very intriguing blog in which we see how HTTP request functions are used. HTTP request function is a generic component that can be used to satisfy many different use cases that require the invocation of an HTTP endpoint. The function gives many different configuration options. This blog shows how this function works standalone and as part of a pipeline. The blog explores some image processing use cases and file sources.

**Blog 7**: [Case Study: Reading from a file and writing to MongoDB](https://spring.io/blog/2020/08/25/case-study-reading-from-a-file-and-writing-to-mongodb)

This one looks at a simple data pipeline for `File | MongoDB`. Data is received through a file source and then inserted into a MongoDB database. The blog looks at the underlying file supplier/source and MongoDB consumer/sink. Then it shows how to run the pipeline as standalone deployments. Finally, it shows how to orchestrate and run the pipeline on Spring Cloud Data Flow.

**Blog 8**: [Case Study: Relational Database Source and File Sink](https://spring.io/blog/2020/09/10/case-study-relational-database-source-and-file-sink)

This blog looks at another use case in which a database is used as a source and the information extracted from it is sent to a destination file. It explores the supporting functions - JDBC supplier and file consumer — and then shows us its configuration options. Then it shows, how the applications (JDBC source and File sink) from these components are used standalone. The blog ends by showing how commercial JDBC drivers can be added to customize the existing JDBC source application.

**Blog 9**: [Case Study: Remote File Ingest with Spring Cloud Data Flow](https://spring.io/blog/2020/09/29/case-study-remote-file-ingest-with-spring-cloud-data-flow)

In this part, we looked at another popular use case that we see in Spring Cloud Data Flow applications pipelines. It shows us how remote file ingest workloads are deployed on Spring Cloud Data Flow. As part of the use case, the blog touches on a handful of different functions and applications such as FTP and SFTP suppliers and sources, Amazon S3 supplier and source, task launcher function and its sink, etc. This blog teaches us several insights into how various components can be chained together to build powerful applications with demanding use cases. This blog ends by demonstrating the remote file ingest use case on Spring Cloud Data Flow using S3 buckets as an example.

**Blog 10**: [Case Study: Aggregator Function and Processor](https://spring.io/blog/2020/10/26/case-study-aggregator-function-and-processor)

Data aggregation is yet another widely popular use case in data integration workloads. In this blog, we see how the aggregator function can act as a conduit to build applications that require data aggregation. It shows us how the aggregator pattern works using the support for this in Spring Integration. The blog teaches us how this function is configured using various options and how it is pre-loaded with the support for many different persistent stores for aggregation. This blog also demonstrates how the aggregator function can be composed with other functions such as splitter and other custom functions.

**Blog 11**: [Case Study: Elasticsearch sink](https://spring.io/blog/2020/11/16/case-study-elasticsearch-sink)

In this episode, we look at the consumer function for Elasticsearch and its corresponding sink application. It looks at the various configuration options and explains how the consumer can be used standalone in custom applications. The blog ends by demonstrating how the Elasticsearch sink can run as a standalone application deployment.

**Blog 12**: [Case Study: Change Data Capture (CDC) Analysis with CDC Debezium source and Analytics sink in Real-Time](https://spring.io/blog/2020/12/14/case-study-change-data-capture-cdc-analysis-with-cdc-debezium-source-and-analytics-sink-in-real-time)

This is a very detailed blog in which we see the change data capture (CDC) pattern in live-action. The author gives us an analysis of how CDC works by diving deep into the CDC-debezium supplier and its internal intricacies. It then explains, how the CDC-debezium source is made from the supplier and used, by going over the various configuration options. This blog also looks at the analytics consumer function and its corresponding sink application. Finally, this blog goes into the depths of how the data pipeline of `CDC | analytics` works on Spring Cloud Data Flow. Once deployed on Spring Cloud Data Flow and the pipeline is activated, it shows how the analytics from the CDC source application is displayed on a Grafana dashboard. This blog ends by giving us some pointers on the future direction of these particular classes of functions and applications.

**Blog 13**: [Testing Spring Cloud Stream Applications - Part 1](https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-1)

This is also another very detailed blog with two parts (series within a series) that expounds all things related to how testing works with the functions and applications. It jumps deep into the heart of testing by explaining various testing strategies and demonstrating how it works with [testcontainers](https://www.testcontainers.org/) which is a technology we use a lot in testing the components in stream-applications. The blog demonstrates the concepts by developing a consumer for `Couchbase` and its analogous sink. It ends the discussion by showing how Spring Cloud Stream test binder can function as a good testing strategy to integration test the sink application.

**Blog 14**: [Testing Spring Cloud Stream Applications - Part 2](https://spring.io/blog/2020/12/15/testing-spring-cloud-stream-applications-part-2)

This is a continuation of blog #13 in which we now see how we can do the integration and acceptance testing for the sink application developed (Couchbase sink) with real environments rather than using the test binder. Reading together, blog #13 and #14 can give us a lot of invaluable insights into using good testing strategies not only for stream application components but to a greater extent for generic data integration use cases as well.

**Blog 15**: The very blog that you are reading. If you are reading up to this point, you are now about to finish reading the 15th part of this blog series. This blog goes over the `2020.0.0` release of the stream-applications that contain all the components and applications we discussed. As you see, we are also giving a rundown through all the blogs in the series in this final edition.

### [](#in-conclusion)[](#in-conclusion)In Conclusion

There are many other functions, applications, components, and use cases that we did not cover as part of this blog series. You can find them certainly in the [stream-applications repository](https://github.com/spring-cloud/stream-applications).

Thank you for coming with us on this journey through this blog series. We hope you enjoyed it. We certainly value your suggestions, opinions, and ideas. Please continue to engage with us by creating bug reports and feature requests on the [Github repository](https://github.com/spring-cloud/stream-applications) and asking questions on StackOverflow using the [spring-cloud-stream](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [spring-cloud-dataflow](https://stackoverflow.com/questions/tagged/spring-cloud-dataflow) tag. Here are some [contribution guidelines](https://github.com/spring-cloud/stream-applications/blob/master/docs/Contributing.adoc) for adding new features and components to the repository or modifying the existing ones. Speaking of contributions to the repository, we welcome any pull requests from the community.