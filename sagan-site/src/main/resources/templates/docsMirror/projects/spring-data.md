---
title: Spring Data
source: https://spring.io/projects/spring-data
scraped: 2026-02-19T07:49:09.347Z
description: Level up your Java code and explore what Spring can do for you.
---

[All projects](/projects)

-   [Spring Boot](/projects/spring-boot)
-   [Spring Framework](/projects/spring-framework)
-   [Spring Data](/projects/spring-data)
    -   [Spring Data JDBC](/projects/spring-data-jdbc)
    -   [Spring Data JPA](/projects/spring-data-jpa)
    -   [Spring Data LDAP](/projects/spring-data-ldap)
    -   [Spring Data MongoDB](/projects/spring-data-mongodb)
    -   [Spring Data Redis](/projects/spring-data-redis)
    -   [Spring Data R2DBC](/projects/spring-data-r2dbc)
    -   [Spring Data REST](/projects/spring-data-rest)
    -   [Spring Data for Apache Cassandra](/projects/spring-data-cassandra)
    -   [Spring Data Couchbase](/projects/spring-data-couchbase)
    -   [Spring Data Elasticsearch](/projects/spring-data-elasticsearch)
    -   [Spring Data Envers](/projects/spring-data-envers)
    -   [Spring Data Neo4j](/projects/spring-data-neo4j)
-   [Spring Cloud](/projects/spring-cloud)
-   [Spring Cloud Data Flow](/projects/spring-cloud-dataflow)
-   [Spring gRPC](/projects/spring-grpc)
-   [Spring Security](/projects/spring-security)
-   [Spring Authorization Server](/projects/spring-authorization-server)
-   [Spring for GraphQL](/projects/spring-graphql)
-   [Spring Session](/projects/spring-session)
-   [Spring Integration](/projects/spring-integration)
-   [Spring HATEOAS](/projects/spring-hateoas)
-   [Spring Modulith](/projects/spring-modulith)
-   [Spring REST Docs](/projects/spring-restdocs)
-   [Spring AI](/projects/spring-ai)
-   [Spring Batch](/projects/spring-batch)
-   [Spring AMQP](/projects/spring-amqp)
-   [Spring CredHub](/projects/spring-credhub)
-   [Spring for Apache Kafka](/projects/spring-kafka)
-   [Spring LDAP](/projects/spring-ldap)
-   [Spring for Apache Pulsar](/projects/spring-pulsar)
-   [Spring Shell](/projects/spring-shell)
-   [Spring Statemachine](/projects/spring-statemachine)
-   [Spring Vault](/projects/spring-vault)
-   [Spring Web Flow](/projects/spring-webflow)
-   [Spring Web Services](/projects/spring-ws)

# ![Spring Data](/img/projects/spring-data.svg)Spring Data2025.1.3[](http://github.com/spring-projects/spring-data "Github")[](https://stackoverflow.com/questions/tagged/spring-data,spring-data-jpa,spring-data-neo4j,spring-data-mongodb,spring-data-rest,spring-data-elasticsearch,spring-data-couchbase,spring-data-cassandra,spring-data-redis "Stack Overflow")

-   [Overview](#overview)
-   [Learn](#learn)
-   [Support](#support)

Spring Data’s mission is to provide a familiar and consistent, Spring-based programming model for data access while still retaining the special traits of the underlying data store.

It makes it easy to use data access technologies, relational and non-relational databases, map-reduce frameworks, and cloud-based data services. This is an umbrella project which contains many subprojects that are specific to a given database. The projects are developed by working together with many of the companies and developers that are behind these exciting technologies.

## [](#features)[](#features)Features

-   Powerful repository and custom object-mapping abstractions
-   Dynamic query derivation from repository method names
-   Implementation domain base classes providing basic properties
-   Support for transparent auditing (created, last changed)
-   Possibility to integrate custom repository code
-   Easy Spring integration via JavaConfig and custom XML namespaces
-   Advanced integration with Spring MVC controllers
-   Experimental support for cross-store persistence

## [](#main-modules)[](#main-modules)Main modules

-   [Spring Data Commons](https://github.com/spring-projects/spring-data-commons) - Core Spring concepts underpinning every Spring Data module.
-   [Spring Data JDBC](https://spring.io/projects/spring-data-jdbc) - Spring Data repository support for JDBC.
-   [Spring Data R2DBC](https://spring.io/projects/spring-data-r2dbc) - Spring Data repository support for R2DBC.
-   [Spring Data JPA](https://spring.io/projects/spring-data-jpa) - Spring Data repository support for JPA.
-   [Spring Data KeyValue](https://github.com/spring-projects/spring-data-keyvalue) - `Map` based repositories and SPIs to easily build a Spring Data module for key-value stores.
-   [Spring Data LDAP](https://spring.io/projects/spring-data-ldap) - Spring Data repository support for [Spring LDAP](https://github.com/spring-projects/spring-ldap).
-   [Spring Data MongoDB](https://spring.io/projects/spring-data-mongodb) - Spring based, object-document support and repositories for MongoDB.
-   [Spring Data Redis](https://spring.io/projects/spring-data-redis) - Easy configuration and access to Redis from Spring applications.
-   [Spring Data REST](https://spring.io/projects/spring-data-rest) - Exports Spring Data repositories as hypermedia-driven RESTful resources.
-   [Spring Data for Apache Cassandra](https://spring.io/projects/spring-data-cassandra) - Easy configuration and access to Apache Cassandra or large scale, highly available, data oriented Spring applications.

## [](#community-modules)[](#community-modules)Community modules

-   [Spring Data Aerospike](https://github.com/aerospike-community/spring-data-aerospike) - Spring Data module for Aerospike.
-   [Spring Data ArangoDB](https://github.com/arangodb/spring-data) - Spring Data module for ArangoDB.
-   [Spring Data Couchbase](https://spring.io/projects/spring-data-couchbase) - Spring Data module for Couchbase.
-   [Spring Data Azure Cosmos DB](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/spring/azure-spring-data-cosmos) - Spring Data module for Microsoft Azure Cosmos DB.
-   [Spring Data Cloud Datastore](https://github.com/GoogleCloudPlatform/spring-cloud-gcp) - Spring Data module for Google Datastore.
-   [Spring Data Cloud Spanner](https://github.com/GoogleCloudPlatform/spring-cloud-gcp) - Spring Data module for Google Spanner.
-   [Spring Data DynamoDB](https://github.com/prasanna0586/spring-data-dynamodb/) - Spring Data module for DynamoDB.
-   [Spring Data Elasticsearch](https://spring.io/projects/spring-data-elasticsearch) - Spring Data module for Elasticsearch.
-   [Spring Data Hazelcast](https://github.com/hazelcast/spring-data-hazelcast) - Provides Spring Data repository support for Hazelcast.
-   [Spring Data Neo4j](https://spring.io/projects/spring-data-neo4j) - Spring-based, object-graph support and repositories for Neo4j.
-   [Oracle NoSQL Database SDK for Spring Data](https://github.com/oracle/nosql-spring-sdk) - Spring Data module for Oracle NoSQL Database and Oracle NoSQL Cloud Service.
-   [Spring Data Reindexer](https://github.com/evgeniycheban/spring-data-reindexer) - Spring Data module for the [Reindexer](https://reindexer.io/) database.
-   [Spring Data Vault](https://spring.io/projects/spring-vault/) - Vault repositories built on top of [Spring Data KeyValue](https://github.com/spring-projects/spring-data-keyvalue).
-   [Spring Data Valkey](https://github.com/valkey-io/spring-data-valkey) - Spring Data module for [Valkey](https://valkey.io/).

## [](#archived-modules)[](#community-modules)Archived modules

-   [Spring Data for Apache Geode](https://spring.io/projects/spring-data-geode) - Easy configuration and access to Apache Geode for highly consistent, low latency, data oriented Spring applications.
-   [Spring Data for GemFire](https://spring.io/projects/spring-data-gemfire) - Easy configuration and access to GemFire for highly consistent, low latency, data oriented Spring applications.

## [](#release-train)[](#release-train)Release train

Spring Data is an umbrella project consisting of independent projects with, in principle, different release cadences. To manage the portfolio, a BOM (Bill of Materials - see this example) is published with a curated set of dependencies on the individual project. The release trains follow [Calver](https://calver.org/) versioning.

Currently, the release train contains the following modules:

-   Spring Data Commons
-   Spring Data JPA
-   Spring Data JDBC/R2DBC
-   Spring Data KeyValue
-   Spring Data LDAP
-   Spring Data MongoDB
-   Spring Data Redis
-   Spring Data REST
-   Spring Data for Apache Cassandra
-   Spring Data Couchbase (community module)
-   Spring Data Elasticsearch (community module)
-   Spring Data Neo4j (community module)

![Spring Initializr](/img/logos/spring-initializr.svg)

## Quickstart Your Project

Bootstrap your application with [Spring Initializr](https://start.spring.io/).

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