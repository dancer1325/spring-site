---
title: Bootiful GCP: Getting Started with Spring Cloud for Google Cloud Platform (1/8)
source: https://spring.io/blog/2018/08/20/bootiful-gcp-getting-started-with-spring-cloud-for-google-cloud-platform-1-8
scraped: 2026-02-23T15:16:24.493Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 20, 2018 | 0 Comments
---

# Bootiful GCP: Getting Started with Spring Cloud for Google Cloud Platform (1/8)

_Engineering | Josh Long |  August 20, 2018 | 0 Comments_

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

In this installment we’re going to introduce Spring Cloud GCP and then setup a trivial project using Spring Cloud GCP.

The Google Cloud Platform is [*vast*](https://cloud.google.com/products/)! It has a ton of features. But so do the other platforms. So, why Google Cloud Platform? I’d say there are two big reasons to use GCP. First, Google’s datacenters are undoubtedly the world’s most sophisticated, and their operations acumen second to none. Let Google operate and secure your datacenter. Beyond that, Google have had to solve some amazing problems at their scale, through GCP, we can benefit from those developments on GCP. The data services, those unique to Google, are legendary. [Google’s Tensorflow](https://opensource.google.com/projects/tensorflow), for example, represents the cutting edge in machine learning, and GCP even features access to specialized An Application-Specific Integrated Circuit (ASICs) *tensor processing units* (TPUs) that are optimized for running TensorFlow workfloads. [Google’s Spanner](https://cloud.google.com/spanner/) is the only enterprise-grade, globally-distributed, and strongly consistent database service built for the cloud specifically to combine the benefits of relational database structure with non-relational horizontal scale.

## [](#authentication)Authentication

You’ll need to sign up for [a GCP account](https://console.cloud.google.com/). In order to use the Spring Cloud GCP project on your local machine, you’ll want to [setup a project on GCP and have the `gcloud` CLI installed](https://cloud.google.com/pubsub/docs/quickstart-cli) locally.

There are a few things to know and do before starting any work with GCP. First, you’ll need to login. Run the following command to login to GCP:

```shell
Copygcloud auth application-default login
```

This will make it easy to provide default credentials supporting work your interactions with the platform. In this case, you’re saying that you want to allow certain operations on *your* behalf.

Some operations endure independent of a particular user. They might need granular permissions that represent a subset of your privilege. They might be run independent of a given user, as in a batch job or something that runs nightly. In this case, it makes sense to use a *service account*. We’ll need to configure a *service account* later when we look at tracing.

It’s useful to know your *Project ID*. You’ll find a lot of incantations need to know this value. I have a little script like this that is run in my `~/.bashrc` and is contributed to every shell.

```shell
Copyexport PROJECT_ID=$(gcloud config list --format 'value(core.project)')
```

I tend to stick to the CLI in these examples, but most everything you want to do can be done from the web console, too.

## [](#getting-started-with-spring-cloud-gcp)Getting Started with Spring Cloud GCP

You’ll need, at least for now, the Spring Cloud *and* Spring Cloud GCP bill of materials (BOM) artifacts. The easiest way to get a new Spring Cloud GCP project going is to generate a new project from the [Spring Initializr](http://start.spring.io) and choose `GCP Support`. Here’s what a minimal `pom.xml` artifact looks like.

**A basic `pom.xml` for Spring Cloud GCP.**

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>demo</name>
    <description>Demo project for Spring Boot</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.4.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
        <spring-cloud-gcp.version>1.0.0.RELEASE</spring-cloud-gcp.version>
        <spring-cloud.version>Finchley.SR1</spring-cloud.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-gcp-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-gcp-dependencies</artifactId>
                <version>${spring-cloud-gcp.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

    <repositories>
        <repository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
        </repository>
    </repositories>

</project>
```

In this installment we've looked at how to setup a basic Spring Cloud GCP project. In the next installment, this Thursday, we'll look at using Spring Cloud CCP to talk to a SQL database like MySQL or PostgreSQL.