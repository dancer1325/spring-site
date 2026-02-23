---
title: Spring XD 1.2 GA, Spring XD 1.1.3 and Flo for Spring XD Beta released.
source: https://spring.io/blog/2015/06/17/spring-xd-1-2-ga-spring-xd-1-1-3-and-flo-for-spring-xd-beta-released
scraped: 2026-02-23T19:48:58.631Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  June 17, 2015 | 2 Comments
---

# Spring XD 1.2 GA, Spring XD 1.1.3 and Flo for Spring XD Beta released.

_Releases | Mark Pollack |  June 17, 2015 | 2 Comments_

Today, we are pleased to announce the general availability of Spring XD 1.2, Spring XD 1.1.3 and the release of Flo for Spring XD Beta.

-   1.2.0.GA: [zip](https://repo.spring.io/libs-release/org/springframework/xd/spring-xd/1.2.0.RELEASE/spring-xd-1.2.0.RELEASE-dist.zip)
-   1.1.3.RELEASE: [zip](https://repo.spring.io/release/org/springframework/xd/spring-xd/1.1.3.RELEASE/spring-xd-1.1.3.RELEASE-dist.zip)
-   [Flo for Spring XD Beta](https://network.pivotal.io/products/p-spring-flo)

You can also install XD 1.2 using [brew](http://docs.spring.io/spring-xd/docs/1.2.0.RELEASE/reference/html/#osx-homebrew-installation) and [rpm](http://docs.spring.io/spring-xd/docs/1.2.0.RELEASE/reference/html/#redhatcentos-installation)

The 1.2 release includes a wide range of new features and improvements. The release journey was an eventful one, mainly due to Spring XD’s popularity with so many different groups, each with their respective request priorities. However the Spring XD team rose to the challenge and it is rewarding to look back and review the amount of innovation delivered to meet our commitments toward simplifying big data complexity.

Here is a summary of what we have been busy with for the last 3 months and the value created for the community and our customers.

##Flo for Spring XD and UI improvements

Flo for Spring XD is an HTML5 canvas application that runs on top of the Spring XD runtime, offering a graphical interface for creation, management and monitoring streaming data pipelines. Here is a short screencast showing you how to build an advanced stream definition.

You can browse the [documentation](http://docs.pivotal.io/spring-flo/index.html) for additional information and links to additional screen casts of Flo in action.

The XD admin screen also includes a [new Analytics section](http://docs.spring.io/spring-xd/docs/1.2.0.RELEASE/reference/html/#adminui-analytics) that allows you to easily view gauges, counters, field-value counters and aggregate counters.

##Performance Improvements

Anticipating increased high-throughput and low-latency IoT requirements, we’ve made several performance optimizations within the underlying message-bus implementation to deliver several million messages per second transported between Spring XD containers using Kafka as a transport. With these optimizations, we are now on par with the performance from Kafka’s own testing tools. However, we are using the more feature rich [Spring Integration Kafka](https://github.com/spring-projects/spring-integration-kafka) client instead of Kafka’s high level consumer library.

For anyone who is interested in reproducing these numbers, please refer to the [XD benchmarking blog](http://spring.io/blog/2015/06/17/spring-xd-benchmarks-part-1), which describes the tests performed and infrastructure used in detail.

##Apache Ambari and Pivotal HD

To help automate the deployment of Spring XD on an Apache HadoopⓇ cluster, we added an [Apache AmbariⓇ plugin for Spring XD](http://spring.io/blog/2015/06/02/apache-ambari-meets-spring-xd). The plugin is supported on both Pivotal HD 3.0 and Hortonworks HDP 2.2 ​distributions. We also added support in Spring XD for [Pivotal HD 3.0](http://pivotal.io/big-data/pivotal-hd), bringing the total number of [Hadoop versions supported](http://docs.spring.io/spring-xd/docs/1.2.0.RELEASE/reference/html/#using-hadoop) to five.

##New Sources, Processors, Sinks, and Batch Jobs

One of Spring XD’s biggest value propositions is its complete set of out-of-the-box data connectivity adapters that can be used to create real-time and batch-based data pipelines, and these require little to no user-code for common use-cases. With the help of community contributions, we now have [MongoDB](http://docs.spring.io/spring-xd/docs/1.2.0.RELEASE/reference/html/#mongodb-source), [VideCap](https://github.com/spring-projects/spring-xd-modules/tree/master/videocap), and [FTP](http://docs.spring.io/spring-xd/docs/1.2.0.RELEASE/reference/html/#sftp) as source modules, an [XSLT-transformer processor](https://github.com/spring-projects/spring-xd-modules/tree/master/xslt-transformer), and [FTP](https://github.com/spring-projects/spring-xd-modules/tree/master/xslt-transformer) sink module. The XD team also developed a [Cassandra sink](https://github.com/spring-projects/spring-xd-modules/tree/master/cassandra-sink) and a [language-detection processor](https://github.com/spring-projects/spring-xd-modules/tree/master/spring-xd-lang-detector).

Recognizing the important role in the [Pivotal Big Data portfolio](http://pivotal.io/big-data/pivotal-big-data-suite/#Features), we have also added native integration with [Pivotal Greenplum Database](http://pivotal.io/big-data/pivotal-greenplum-database) and [Pivotal HAWQ](http://pivotal.io/big-data/pivotal-hawq) through [gpfdist sink](http://docs.spring.io/spring-xd/docs/1.2.0.RELEASE/reference/html/#gpfdist) for real-time streaming and also support for [gpload based batch jobs](http://docs.spring.io/spring-xd/docs/1.2.0.RELEASE/reference/html/#gpload).

Adding to our developer productivity theme and the use of Spring XD in production for high-volume data ingest use-cases, we are delighted to recognize Simon Tao and Yu Cao (EMC² Office of The CTO & Labs China), who have been operationalizing Spring XD data pipelines in production since 2014 and also for the VideCap source module contribution. Their use-case and implementation specifics (in their own words) are below.

> “There are significant demands to extract insights from large magnitude of unstructured video streams for the video surveillance industry. Prior to being analyzed by data scientists, the video surveillance data needs to be ingested in the first place. To tackle this challenge, we built a highly scalable and extensible video-data ingestion platform using Spring XD. This platform is operationally ready to ingest different kinds of video sources into a centralized Big Data Lake. Given the out-of-the-box features within Spring XD, the platform is designed to allow rich video content processing capabilities such as video transcoding and object detection, etc.
> 
> The platform also supports various types of video sources—data processors and data exporting destinations (e.g. HDFS, Gemfire XD and Spark)—which are built as custom modules in Spring XD and are highly reusable and composable. With a declarative DSL, a video ingestion stream will be handled by a video ingestion pipeline defined as Directed Acyclic Graph of modules. The pipeline is designed to be deployed in a clustered environment with upstream modules transferring data to downstream ones efficiently via the message bus. The Spring-XD distributed runtime allows each module in the pipeline to have multiple instances that run in parallel on different nodes. By scaling out horizontally, our system is capable of supporting large scale video surveillance deployment with high volume of video data and complex data processing workloads.”

##Custom Module Registry and HA Support

Though we have had the flexibility to configure shared network location for distributed availability of custom modules (via: xd.customModule.home), we also recognized the importance of having the module-registry resilient under failure scenarios—hence, we have an HDFS backed module registry. Having this setup for production deployment provides consistent availability of custom module bits and the flexibility of choices, as needed by the business requirements.

##Pivotal Cloud Foundry Integration

Furthering the Pivotal Cloud Foundry integration efforts, we have made several foundation-level changes to the Spring XD runtime, so we are able to run Spring XD modules as cloud-native Apps in [Lattice](http://lattice.cf) and [Diego](https://github.com/cloudfoundry-incubator/diego-release)​­. We have aggressive roadmap plans to launch Spring XD on Diego proper. While studying [Diego’s Receptor API](https://github.com/cloudfoundry-incubator/receptor) (written in Go!), we created a [Java Receptor API](https://github.com/markfisher/receptor-client), which is now proposed to Cloud Foundry for incubation.

##Next Steps

We have some very interesting developments on the horizon. Perhaps the most important, we will be launching new projects that focus on message-driven and batch-oriented "data microservices". These will be built directly on Spring Boot as well as Spring Integration and Spring Batch, respectively. Our main goal is to provide the simplest possible developer experience for creating cloud-native, data-centric microservice apps. In turn, Spring XD 2.0 will be refactored as a layer above those projects, to support the composition of those data microservices into streams and jobs as well as all of the "as a service" aspects that it provides today, but it will have a major focus on deployment to Cloud Foundry and Lattice. We will be posting more on these new projects soon, so stay tuned!

Feedback is very important, so please get in touch with questions and comments via

-   [StackOverflow](http://stackoverflow.com/questions/tagged/spring-xd) `spring-xd` tag
-   [Spring JIRA](https://jira.spring.io/browse/XD/?selectedTab=com.atlassian.jira.jira-projects-plugin:summary-panel) or [GitHub Issues](https://github.com/spring-projects/spring-xd/issues)

*Editor’s Note: ©2015 Pivotal Software, Inc. All rights reserved. Pivotal, Pivotal HD, Pivotal Greenplum Database, Pivotal Gemfire and Pivotal Cloud Foundry are trademarks and/or registered trademarks of Pivotal Software, Inc. in the United States and/or other countries. Apache, Apache Hadoop, Hadoop and Apache Ambari are either registered trademarks or trademarks of the Apache Software Foundation in the United States and/or other countries.*