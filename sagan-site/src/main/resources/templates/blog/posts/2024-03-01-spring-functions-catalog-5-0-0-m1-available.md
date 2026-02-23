---
title: Spring Functions Catalog 5.0.0‐M1 Available
source: https://spring.io/blog/2024/03/01/spring-functions-catalog-5-0-0-m1-available
scraped: 2026-02-23T08:53:47.989Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Artem Bilan |  March 01, 2024 | 1 Comment
---

# Spring Functions Catalog 5.0.0‐M1 Available

_Releases | Artem Bilan |  March 01, 2024 | 1 Comment_

On behalf of Spring Cloud Dataflow team, it is my pleasure to introduce you to Spring Functions Catalog. The project's primary focus is to provide a set of standalone Java functions that can be useful in the end-user applications as-is. All the published artifacts are, essentially, auto-configurations for some specific `Supplier`, `Function` or `Consumer`.

We have just released `5.0.0-M1` into [https://repo.spring.io/milestone](https://repo.spring.io/milestone) repository, and all you need is to include this BOM into your Gradle (or Maven) configuration:

```groovy
Copyorg.springframework.cloud.fn:spring-function-dependencies:5.0.0-M1
```

and choose respective function as dependency for your project.

The Spring Functions Catalog is a rebranding (and next generation) of the `functions` sub-module of [Stream Applications](https://github.com/spring-cloud/stream-applications) project. That's why we chose a version as `5.0` from the start since all the functions in this project do the same what they have in Stream Applications. Therefore, the next our natural step is to migrate Stream Applications to use this new Spring Functions Catalog.

However, the goal of Spring Functions Catalog is not only to feed Stream Applications. Because all of them are independent artifacts of an auto-configuration for a single `Supplier`, `Function` or `Consumer` with specific job to do, these functions can simply be added into classpath and used in the target project as-is or composed with other tasks. Most of these functions provide an auto-configuration for specific Spring Integration [Channel Adapter](https://docs.spring.io/spring-integration/reference/endpoint-summary.html#endpoint-summary).

Here are just a few examples:

-   the `sftpSupplier` connects to a SFTP server and polls files from a remote directory and "supplies" the files to your application
-   the `kafkaPublisher` (the `java.util.function.Consumer` implementation) produces records into an Apache Kafka topic
-   the `aggregatorFunction` groups multiple inputs into one according to some correlation key

After being auto-configured into the `ApplicationContext`, these function can be injected into to the target service and composed with plain Java API (see `Function.andThen(Function)`). However, better (and more natural for Spring applications) way is to use [Spring Cloud Function](https://spring.io/projects/spring-cloud-function) project capabilities. For example, the `FunctionFlowBuilder` from [Spring Cloud Function Integration](https://docs.spring.io/spring-cloud-function/docs/current/reference/html/spring-integration.html#spring-integration) module can be used to compose an `IntegrationFlow` for any complex solution. Another way is to compose them by names via `spring.cloud.function.definition` configuration property.

As a proof of concept the [time-spel-log](https://github.com/spring-cloud/spring-functions-catalog/tree/main/samples/time-spel-log) sample in the project repository has these dependencies:

```groovy
Copyimplementation 'org.springframework.cloud.fn:spring-time-supplier'
implementation 'org.springframework.cloud.fn:spring-spel-function'
implementation 'org.springframework.cloud.fn:spring-log-consumer'
```

The `application.yml` has this property:

```yaml
Copyspring:
  cloud:
    function:
      definition: timeSupplier|spelFunction|logConsumer
```

The application logic is just like this:

```java
Copy@Scheduled(fixedDelay = 1000)
void scheduleFunctionCall() {
  this.composedFunction.run();
}
```

Where `composedFunction` is a `Runnable` from `FunctionCatalog` and it is that mentioned above composition in the `application.yml`. The application emits into logs the current time after some transformation every second.

Give Spring Functions Catalog a shot, and any feedback or contribution are welcome!

From here we are heading for `RC1` in the end of March and `GA` in April.

See more information in [GitHub repository](https://github.com/spring-cloud/spring-functions-catalog) for Spring Functions Catalog.

Cheers, + Artem