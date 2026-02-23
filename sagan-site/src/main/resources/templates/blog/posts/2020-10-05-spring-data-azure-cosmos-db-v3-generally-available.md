---
title: Spring Data Azure Cosmos DB V3 – Generally Available
source: https://spring.io/blog/2020/10/05/spring-data-azure-cosmos-db-v3-generally-available
scraped: 2026-02-23T13:46:19.388Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Clement |  October 05, 2020 | 2 Comments
---

# Spring Data Azure Cosmos DB V3 – Generally Available

_Engineering | Andy Clement |  October 05, 2020 | 2 Comments_

The Spring on Azure team, in partnership with the Azure Cosmos DB team, are proud to have just made the [Spring Data Azure Cosmos DB v3](https://docs.microsoft.com/en-ca/azure/cosmos-db/sql-api-sdk-java-spring-v3?tabs=explore) generally available. This is the latest version of Azure Cosmos DB’s SQL API Spring Data connector.

Azure Cosmos is a highly-available globally-distributed multi-model database with competitive performance SLAs. With Spring Data Azure Cosmos DB, developers may use Spring Data natively on top of the Azure Cosmos DB SQL API to manipulate documents and issue custom or derived queries.

With the launch of the v3 connector, and its deep integration with Spring on Azure, a new wave of innovations are unleashed to help Spring developers be even more productive and leverage even more Spring abstractions on top of Azure Cosmos DB. Spring Data Azure Cosmos DB v3 now supports Java 11. Additionally Spring Data Azure Cosmos DB v3 adds support for new annotations (@Query, @Version, and @GeneratedValue), multi-database applications, whilst also bringing improved performance.

## [](#powerful-new-features-and-spring-abstraction-support)[](#powerful-new-features-and-spring-abstraction-support)Powerful new features and Spring abstraction support

### [](#query-annotation-support)[](#query-annotation-support)@Query annotation support

In general, Spring Data simplifies query constructs with derived query methods for point-reads, point-writes, and basic queries. For the flexibility to write complex queries, the @Query annotation in Spring Data Azure Cosmos DB v3 supplements derived query methods by offering full customizability and flexibility when implementing Spring data repositories.

```
Copypublic interface AnnotatedQueriesUserRepositoryCodeSnippet extends CosmosRepository<User, String> {
    @Query(value = "select * from c where c.firstName = @firstName and c.lastName = @lastName")
    List<User> getUsersByTitleAndValue(@Param("firstName") int firstName, @Param("lastName") String lastName);

    @Query(value = "select * from c offset @offset limit @limit")
    List<User> getUsersWithOffsetLimit(@Param("offset") int offset, @Param("limit") int limit);
}
```

### [](#support-for-multi-database-applications)[](#support-for-multi-database-applications)Support for multi-database applications

With Spring Data Azure Cosmos DB v3, you may use multiple databases and/or multiple unique Azure Cosmos DB accounts. Your Spring Data application may have a similar architecture to what is shown here:

![multi database setup](https://static.spring.io/blog/aclement/20201005/multi-database.png)

Augmenting your `application.properties` file with additional credentials pulls in the second Azure Cosmos DB account endpoint:

```
Copy# primary account cosmos config
azure.cosmos.primary.uri=your-primary-cosmosDb-uri
azure.cosmos.primary.key=your-primary-cosmosDb-key
...
# secondary account cosmos config
...
```

And your application code can specify one or more Azure Cosmos DB database to connect to at each account endpoint.

Spring Data Azure Cosmos DB v3 enables full configurability of each endpoint client by exposing the Azure Cosmos DB Java SDK v4 CosmosClientBuilder class:

```
Copy @Bean
 public CosmosClientBuilder appCosmosClientBuilder() {
     return new CosmosClientBuilder()
        .key(secondaryProperties.getKey())
        .endpoint(secondaryProperties.getUri());
 }
```

This provides full configurability of the Azure Cosmos DB clients, including throttling retry policies and other capabilities.

### [](#version-annotation-for-optimistic-locking)[](#version-annotation-for-optimistic-locking)@Version annotation for optimistic locking

With the addition of @Version annotation users can now map any field to \_etag, facilitating easy use of optimistic concurrency control.

Optimistic concurrency control allows you to prevent lost updates and deletes. Concurrent, conflicting operations are subjected to regular pessimistic locking - when two concurrent operations attempt to update the latest version of an item, one of them will succeed and the other will fail. However, if one or two operations attempting to concurrently update the same item are performing a read-modify-write, the database doesn’t know if the previously read value by either or both the conflicting operations was indeed the latest value of the item. Fortunately, Optimistic Concurrency Control (OCC) detects this situation before either operation enters the transaction boundary inside the database engine. Under the hood, Azure Cosmos DB facilitates access conditions by tagging each document with an HTTP ETag field (\_etag in the JSON documents) that changes on each modification. With the new @Version annotation, the Spring Data Azure Cosmos DB v3 connector takes optimistic locking a step further – any object field in your Spring application can now be mapped to \_etag, allowing for greater concurrency control and improved clarity of meaning in your code. With OCC you can protect your updates from accidentally overwriting others’ changes and prevent others from accidentally overwriting your own changes.

## [](#spring-boot-actuator)[](#spring-boot-actuator)Spring Boot actuator

Monitor the health status of each Azure Cosmos DB live repository object via Spring Boot actuator endpoint. This will be enabled in the `azure-cosmosdb-spring-boot-starter` by mid-October, as a part of the monthly Azure Spring Boot starters release cadence.

### [](#substantial-performance-improvements)[](#substantial-performance-improvements)Substantial performance improvements

Spring Data Azure Cosmos DB v3, underpinned by the Azure Cosmos DB Java SDK v4, which has itself been improved based on substantial user feedback from Java users. As a result Java SDK v4 optimizes request throughput and stability under load. Currently Java SDK v4 has a 20% performance boost over older Java SDKs (v3 and v2) with more improvement expected in the future.

![performance figures](https://static.spring.io/blog/aclement/20201005/performance.png)

Follow these [performance tips](https://docs.microsoft.com/en-ca/azure/cosmos-db/performance-tips-java-sdk-v4-sql?tabs=api-async) and [troubleshooting docs](https://docs.microsoft.com/en-ca/azure/cosmos-db/troubleshoot-java-sdk-v4-sql) to make sure you have fully optimized your application. Review Azure Cosmos DB best practices for [data modeling](https://docs.microsoft.com/en-ca/azure/cosmos-db/modeling-data) and [partitioning](https://docs.microsoft.com/en-ca/azure/cosmos-db/partitioning-overview). In the long-term these factors can be as impactful as client setup when it comes to performance!

### [](#other-notable-features-in-this-release)[](#other-notable-features-in-this-release)Other notable features in this release

-   **@GeneratedValue** annotation for automated ID generation.
    
-   **Auditing framework support** to auto-populate createdBy, createdDate, lastModifiedBy, and lastModifiedDate fields
    
-   **Support for nested fields as partition keys**
    
-   **Ability to obtain the [Request Units](https://docs.microsoft.com/en-ca/azure/cosmos-db/request-units) consumed** by each Azure Cosmos DB request
    

See our [Release notes](https://docs.microsoft.com/en-ca/azure/cosmos-db/sql-api-sdk-java-spring-v3?tabs=explore) and [Change log](https://github.com/Azure/azure-sdk-for-java/blob/master/sdk/cosmos/azure-spring-data-cosmos/CHANGELOG.md) for the complete list of changes.

### [](#get-started-today)[](#get-started-today)Get started today

Use Spring Data Azure Cosmos DB in your project

If you’ve already set up your Azure Cosmos DB and Spring project, simply include the following dependency in your existing POM file or try out our [getting started sample here](https://docs.microsoft.com/en-ca/azure/cosmos-db/create-sql-api-spring-data).

```
Copy<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-spring-data-cosmos</artifactId>
    <version>3.0.0</version>
</dependency>
```

If you are new to Azure Cosmos DB and Azure Spring Starters, you can learn more about [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction), and follow our [step-by-step guide](https://docs.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-cosmos-db) to get started.