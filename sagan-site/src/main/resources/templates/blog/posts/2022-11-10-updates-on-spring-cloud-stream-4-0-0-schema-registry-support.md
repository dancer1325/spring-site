---
title: Updates on Spring Cloud Stream 4.0.0 Schema Registry Support
source: https://spring.io/blog/2022/11/10/updates-on-spring-cloud-stream-4-0-0-schema-registry-support
scraped: 2026-02-23T10:34:14.373Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  November 10, 2022 | 1 Comment
---

# Updates on Spring Cloud Stream 4.0.0 Schema Registry Support

_Engineering | Soby Chacko |  November 10, 2022 | 1 Comment_

This blog gives an update on the Schema Registry support that is part of Spring Cloud Stream version 4.0.x.

Many enterprises use a schema registry for schema evolution use cases, such as the [Confluent Schema Registry](https://docs.confluent.io/platform/current/schema-registry/index.html). Starting with version `1.1.x` of Spring Cloud Stream until `3.0.0`, we provided a schema registry server and AVRO-based schema registry client converters that can reconcile the schema from the schema registry server. Spring Cloud Stream version 3.0.0 moved the Schema Registry components into a top-level [spring-cloud project](https://spring.io/projects/spring-cloud-schema-registry), and Spring Cloud Stream included those in its [BOM](https://github.com/spring-cloud/spring-cloud-stream-starters/blob/vHorsham.RELEASE/spring-cloud-stream-dependencies/pom.xml#L41) for the end user applications to consume them. However, this didn't scale well, and with the 3.2 version, we decided to stop having them as part of the [Spring Cloud Stream BOM](https://github.com/spring-cloud/spring-cloud-stream-starters/blob/v3.2.0/spring-cloud-stream-dependencies/pom.xml).

The schema registry use cases are compelling in streaming applications, and the community has been keen on having a solution from the core Spring Cloud Stream. We are glad to inform you that the schema registry components are back in the [4.0.0 version of Spring Cloud Stream](https://github.com/spring-cloud/spring-cloud-stream/tree/main/schema-registry). This path is a full-circle journey for these schema registry components. Below, we will re-introduce these components and briefly overview their features.

## [](#spring-cloud-stream-schema-registry-server)Spring Cloud Stream Schema Registry Server

Spring Cloud Stream `4.0.x` versions ship a standalone Schema Registry server tailored exclusively for the use cases that Spring Cloud Stream addresses. These use cases encompass schema evolution across multiple schema versions. The main gist of these use cases is that a producer application publishes using a previous schema version. Still, the consumer works against all the schema versions in a backward-compatible manner. These workflows include schema validation and using the validated schema as a contract and the basis for data serialization by the message converters. We do not recommend using this Schema Registry server outside Spring Cloud Stream. By default, this Schema Registry Server uses an in-memory H2 database as the backend store. However, you can use either Postgres or MySQL as the backend databases. Spring Cloud Stream provides this Schema Registry server as a full-blown Spring Boot application. Therefore you can download this from maven central directly (when Spring Cloud Stream `4.0.0` will be generally available). If you want to try this on snapshots or milestones, you can download this from the relevant Artifactory repository. Following are the maven coordinates for `4.0.0-SNAPSHOT` version. You can also use `4.0.0-M5` or `4.0.0-RC1` if you prefer not to use a snapshot to test.

```
Copy<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-stream-schema-registry-server</artifactId>
	<version>4.0.0-SNAPSHOT</version>
</dependency>
```

Suppose you want to use something other than the standalone Schema Registry server but a custom one. In that case, you can include the server module as a dependency in your application and create a custom Spring Boot application by enabling `@EnableSchemaRegistryServer.` If you have an unsupported backend store, you should use this strategy.

## [](#spring-cloud-stream-schema-registry-client)Spring Cloud Stream Schema Registry Client

Spring Cloud Stream `4.0.0` also provides a Schema Registry client module that provides AVRO-based message converters. These converters are Schema Registry aware and communicate with a Schema Registry server to reconcile the schema while converting the payload for serialization purposes. Applications need to use an annotation `@EnableSchemaRegistryClient` to make them aware of the schema registry server through the `SchemaRegistryClient` bean. Spring Boot auto-configures the AVRO-based message converters that are schema-registry aware.

Following are the maven coordinates of the schema registry client module for version `4.0.0-SNAPSHOT`. You may use `4.0.0-M5` or `4.0.0-RC1` as well.

```
Copy<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-stream-schema-registry-client</artifactId>
	<version>4.0.0-SNAPSHOT</version>
</dependency>
```

## [](#using-the-confluent-schema-registry-server-with-spring-cloud-stream-schema-registry-client)Using the Confluent Schema Registry Server with Spring Cloud Stream Schema Registry Client

Confluent Schema Registry is a popular commercial solution for schema evolution for Kafka-based applications. Spring Cloud Stream AVRO message converters mentioned above can work with the Confluent Schema Registry. For this to work, the application needs to override the `SchemaRegistryClient` bean and provide an implementation for `ConfluentSchemaRegistryClient.`

## [](#resources)Resources

We provide a set of sample applications demonstrating all the concepts described in this blog [here](https://github.com/spring-cloud/spring-cloud-stream/tree/main/samples/spring-cloud-stream-schema-registry-integration). Please see the [README](https://github.com/spring-cloud/spring-cloud-stream/blob/main/samples/spring-cloud-stream-schema-registry-integration/README.adoc) for more details.

[Here](https://docs.spring.io/spring-cloud-stream/docs/4.0.0-SNAPSHOT/reference/html/spring-cloud-stream-schema-registry.html#spring-cloud-stream-schema-registry-referenc) is the Schema Registry reference documentation.

## [](#conclusion)Conclusion

Spring Cloud Stream `4.0.0` brings back the Schema Registry components from previous versions of Spring Cloud Stream. This blog examined the motivations and overview of the re-introduced support. The support available in Spring Cloud Stream may only cover some of the schema evolution use cases. However, the provided schema registry components can support many schema evolution use cases that come under the purview of Spring Cloud Stream applications with a transport-neutral value add.