---
title: What\'s new in Spring Cloud GCP 1.0.0 Milestone 3
source: https://spring.io/blog/2018/04/16/what-s-new-in-spring-cloud-gcp-1-0-0-milestone-3
scraped: 2026-02-23T15:27:24.896Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  April 16, 2018 | 0 Comments
---

# What's new in Spring Cloud GCP 1.0.0 Milestone 3

_Releases | Artem Bilan |  April 16, 2018 | 0 Comments_

Dear Spring Community!

The [Spring Cloud GCP](http://cloud.spring.io/spring-cloud-gcp/) is a set of Spring Boot starters that is designed to help you leverage Google Cloud Platform managed services directly from Spring Boot, allowing you to use Spring Messaging for Cloud Pub/Sub, Spring Resource for Cloud Storage, Spring Cloud Sleuth for Stackdriver Trace, Spring Data with Cloud SQL, and more.

We’ve just released Spring Cloud GCP `1.0.0.M3`. Check out what’s new since the previous [Milestone 2](https://spring.io/blog/2018/02/07/spring-cloud-for-google-cloud-platform-1-0-milestone-2-available)!

## [](#spring-boot-20-ga-support)[](#spring-boot-2-0-ga-support)Spring Boot 2.0 GA Support

Spring Cloud GCP `1.0.0.M3` is now up to date to work with Spring Boot `2.0.1.RELEASE` and Spring Cloud `Finchley.M9`.

To use Spring Cloud GCP `1.0.0.M3`, simply import the BOM in your Spring Boot `2.0` project:

```
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-gcp-dependencies</artifactId>
            <version>1.0.0.M3</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

## [](#spring-initializr)[](#spring-initializr)Spring Initializr

You can now find Spring Cloud GCP in the Spring Initializr! Head to [http://start.spring.io/](http://start.spring.io/) and look for "GCP" related starters.

For example, to use Cloud Pub/Sub for messaging, simply add the GCP Messaging dependencies in the Initializr. This starter also contains the Spring Integration channel adapters, as well as the Spring Cloud Stream Pub/Sub binder.

![GCP%20on%20Spring%20Initializr](https://raw.githubusercontent.com/spring-cloud/spring-cloud-gcp/master/spring-cloud-gcp-docs/src/main/asciidoc/images/GCP%20on%20Spring%20Initializr.png)

Currently, only the base support, messaging, and storage are in the Initializr menu. Refer to the [Spring Cloud GCP Reference](https://docs.spring.io/spring-cloud-gcp/docs/1.0.0.M3/reference/htmlsingle/) documentation to add other starters. We are working to add more to Initializr.

## [](#spring-data-spanner)[](#spring-data-spanner)Spring Data Spanner

You can now build multi-regional Spring Boot applications backed by [Google Cloud Spanner](https://cloud.google.com/spanner/) - a globally-distributed, strongly consistent, relational database. With [Spring Data Spanner](https://docs.spring.io/spring-cloud-gcp/docs/1.0.0.M3/reference/htmlsingle/#_spring_data_spanner), you can now annotate your POJOs for object mapping to Spanner tables. It supports:

-   Spanner Transactions
    
-   Paging and Sorting Repository
    
-   REST Repository
    
-   Query by method name convention, annotation, and named queries!
    
    @Table(name = "traders") public class Trader { @PrimaryKey @Column(name = "trader\_id") String traderId;
    
    ```
    Copy    String firstName;
    
        String lastName;
    ```
    
    }
    
    public interface TraderRepository extends PagingAndSortingRepository<Trader, String> { }
    

## [](#pivotal-cloud-foundry-service-broker)[](#pivotal-cloud-foundry-service-broker)Pivotal Cloud Foundry Service Broker

If you are using [Pivotal Cloud Foundry](https://pivotal.io/platform) and the [Google Cloud Platform Service Broker](https://docs.pivotal.io/partners/gcp-sb/index.html), Spring Boot GCP Starters can automatically consume GCP Service Broker bindings and credentials to configure your application. The following services are supported:

-   Cloud Storage
    
-   Cloud Pub/Sub
    
-   Cloud Spanner
    
-   Stackdriver Trace
    

If you are not familiar with Spring Boot on Cloud Foundry, checkout the [Spring Boot Cloud Foundry Deployment](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#cloud-deployment-cloud-foundry) documentation.

For example, you can provision and bind Stackdriver Trace service credentials via the Service Broker:

$ cf create-service google-stackdriver-trace default mytrace $ cf bind-service myapp mytrace

In your application, add the Spring Cloud GCP Trace starter:

```
Copy<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-gcp-starter-trace</artifactId>
</dependency>
```

When you deploy your application into PCF with this service binding, the starter will automatically read the configuration from the `VCAP_SERVICES` environment variable. The Spring Cloud Trace starter will automatically forward distributed trace data to Stackdriver Trace.

$ cf push myapp -p path/to/my.jar

![Stackdrive Trace](https://raw.githubusercontent.com/spring-cloud/spring-cloud-gcp/master/spring-cloud-gcp-docs/src/main/asciidoc/images/Stackdrive%20trace.png)

Stackdriver Trace is part of Stackdriver Application Performance Management (APM) tools. Learn more from the [Stackdriver APM announcement](https://cloudplatform.googleblog.com/2018/03/introducing-Stackdriver-APM-and-Stackdriver-Profiler-Distributed-tracing-debugging-and-profiling-for-your-performance-sensitive-applications.html) blog.

## [](#try-it-out)[](#try-it-out)Try it out!

Check out the [code samples](https://github.com/spring-cloud/spring-cloud-gcp/tree/master/spring-cloud-gcp-samples) in the [Spring Cloud GCP GitHub repository](https://github.com/spring-cloud/spring-cloud-gcp/), read the Spring Cloud GCP Reference documentation for more details, and try it hands on with [code labs](https://codelabs.developers.google.com/spring). Most importantly, let us know your feedback and report any issues.

From the Spring Cloud GCP Team

[Project Page](https://cloud.spring.io/spring-cloud-gcp) | [issues](https://github.com/spring-cloud/spring-cloud-gcp/issues) | [Documentation](https://docs.spring.io/spring-cloud-gcp/docs/1.0.0.M3/reference/htmlsingle)