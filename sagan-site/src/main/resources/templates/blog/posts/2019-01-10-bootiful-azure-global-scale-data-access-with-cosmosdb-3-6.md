---
title: Bootiful Azure: Global Scale Data Access with CosmosDB (3/6)
source: https://spring.io/blog/2019/01/10/bootiful-azure-global-scale-data-access-with-cosmosdb-3-6
scraped: 2026-02-23T15:00:23.839Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 10, 2019 | 0 Comments
---

# Bootiful Azure: Global Scale Data Access with CosmosDB (3/6)

_Engineering | Josh Long |  January 10, 2019 | 0 Comments_

> This is part 3 of a 6 part series, with new posts Mondays and Thursdays, introducing Microsoft Azure for Spring developers. I couldn't have put this together without input from Microsoft's Asir Vedamuthu Selvasingh, Yitao Dong, Bruno Borges, Brian Benz and Theresa Nguyen. You can find the code for this series [on Github](https://github.com/joshlong/bootiful-azure-article). Hit me up on [Twitter (@starbuxman)](http://twitter.com/Starbuxman) as you're reading the installments with any feedback or questions. You can also learn more about Microsoft Azure in my [Spring Tips (@SpringTipsLive)](http://twitter.com/SpringTipsLive) installment, [*Bootiful Azure*](https://spring.io/blog/2018/12/05/spring-tips-bootiful-microsoft-azure)

Here are all the installments:

-   [Bootiful Azure: Taking Your First Steps with Microsoft Azure](https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6)
-   [Bootiful Azure: SQL-based data access with Microsoft SQL Server](https://spring.io/blog/2019/01/07/bootiful-azure-sql-based-data-access-with-microsoft-sql-server-2-6)
-   [Bootiful Azure: Global Scale Data Access with CosmosDB](https://spring.io/blog/2019/01/10/bootiful-azure-global-scale-data-access-with-cosmosdb-3-6)
-   [Bootiful Azure: Integration with Azure Service Bus](https://spring.io/blog/2019/01/14/bootiful-azure-integration-with-azure-service-bus-4-6)
-   [Bootiful Azure: Object Storage Service](https://spring.io/blog/2019/01/17/bootiful-azure-object-storage-service-5-6)
-   [Bootiful Azure: To Production!](https://spring.io/blog/2019/01/21/bootiful-azure-to-production-6-6)

I can hear you thinking - yes, not even your feintest thoughts escape me! - that while you like Microsoft SQL Server as much as the next developer, it's something you could've run yourself, on any platform (cloud or otherwise!). You don't *need* Microsoft to run it for you. To which I say, "yep!" (but it sure is nice that Microsoft runs it for us, isn't it?)

I concede the point. What can Azure do for you? You don't need to look much further than Microsoft Azure CosmosDB. CosmosDB refers to a suite of technologies. It describes a single product that can be used in multiple ways. It's a single, multi-model, multi-modal database that supports document data, SQL queries, graph data access, and more.

Per [the product web page](https://azure.microsoft.com/en-us/services/cosmos-db/): CosmosDB was built from the ground up with global distribution and horizontal scale at its core. guarantees single-digit-millisecond read and write latencies at the 99th percentile, and guarantees 99.999 high availability with multi-homing anywhere in the world—all backed by industry-leading, comprehensive service level agreements (SLAs).

## [](#items-and-containers)Items and Containers

Internally, CosmosDB stores "items" in "containers." But you don't necessarily deal with items or containers as the concepts will surfaced in the language oft he data model you're using to consume the data. If you're using it as a document store, like MongoDB, then items would be mapped to documents in collections, for example.

Containers are grouped into databases, which are a sort of namespace above containers. Containers enforce unique key constraints to ensure integrity of the data. But containers do so much more. You can ask each container for a feed of what's changed; you could power Change Data Capture (CDC) schemes using this feed. You could use the feed for event sourcing. The feed is itself persisted so you can *replay* changes, if you like.

You can specify time-to-live (TTL) values for the containers, as well, letting CosmosDB automatically expunge existing records after a certain period. You could also override the TTL for specific items, too.

## [](#a-mutli-model-multi-paradigm-datastore)A Mutli-Model, Multi-Paradigm Datastore

First of all, CosmosDB is schemaless. Keep that mind when using it - it can have some important ramifications if you're not prepared.

CosmosDB supports a multi-model, multi-paradigm approach to building applications. Clients can talk to the HTTP REST API and drive it using a SQL-like language for queries. You can create, update and delete containers using the SQL API, too.

You can talk to CosmosDB using the MongoDB API, supporting collections as container and documents as items.

You can talk to it using the Gremlin API supporting graphs and containers and nodes and edges as items. According to the Gremlin website, "Gremlin is the graph traversal language of Apache TinkerPop. Gremlin is a functional, data-flow language that enables users to succinctly express complex traversals on (or queries of) their application's property graph." So, it's basically a way to traverse data in a graph.

You can talk to CosmosDB using the Cassandra API supporting tables as containers and rows as items. The Cassandra API even supports the Cassandra query language (CQL).

You can *also* talk to it using the Azure Table Storage API supporting tables as containers and items as... well.. *items*.

CosmosDB also embeds a JavaScript engine so you can use JavaScript to define triggers, user-defined functions that can be called from, and augment, the SQL query language, and stored procedures. Stored procedures can manage a number of actions in a single ACID-compliant transaction.

## [](#configuring-cosmosdb-on-microsoft-azure)Configuring CosmosDB on Microsoft Azure

You'll need to first create a (potentially geographically distributed) instance of CosmosDB and then create a database instance within. Then, you'll need to create a collection to store the records. Here's a script. The only notable thing is that we don't have to specify the firewall exemptions as we did in the SQL Server example. It just works (TM).

```shell
Copy#!/bin/bash

# the name of the resource group
export rg=$1
export adminlogin=${rg}-cosmosdb

location='southcentralus'
accountname=${adminlogin}
databasename=bootiful
containername=reservations

# Create a SQL API Cosmos DB account with session consistency and multi-master enabled
az cosmosdb create \
    --resource-group $rg \
    --name $adminlogin \
    --kind GlobalDocumentDB \
    --default-consistency-level "Session" 

# Create a database
az cosmosdb database create \
    --resource-group $rg \
    --name $adminlogin \
    --db-name $databasename

# Create a SQL API container with a partition key and 1000 RU/s
az cosmosdb collection create \
    --resource-group $rg \
    --collection-name $containername \
    --name $adminlogin \
    --db-name $databasename \
    --partition-key-path /id \
    --throughput 1000
```

In this script we could've specified the regions in which want the new database made available. You can also do this conveniently from the Azure Portal, through a handy map. Just click a region and it'll take care of the rest!

Also, note the resulting `$adminlogin` value for later.

Now, you'll need to lay hands on the required configuration strings to connect your application to your new database and its data. You could sift through the output of the previous commands, but the following incantation is so much easier.

```shell
Copyaz cosmosdb list-keys --resource-group bootiful --name bootiful-cosmosdb
```

You'll need to note the value of the resulting `primaryMasterKey` attribute from the previous command in order to later connect to CosmosDB.

## [](#introducing-cosmosdb-into-your-spring-application)Introducing CosmosDB into your Spring Application

Let's look at CosmosDB's use in a Spring application. You *could*, in theory, talk to CosmosDB through the appropriate abstractions for the aforementioned technologies (like MongoDB and Cassandra). I prefer to use the Spring Data CosmosDB abstraction, whose starter dependency you'll need to add to the build file.

CosmosDB was historically called DocumentDB. If you see those names, they are almost interchangeable. For historical reasons, you'll need to add the Maven starter dependency that references that old project name, `com.microsoft.azure`:`azure-documentdb-spring-boot-starter`, to your build file.

Then you'll have to configure the relevant connection information. You could add something like the following to your application's `application.properties` file.

```java
Copyazure.documentdb.database=bootiful
azure.documentdb.key=THIS_IS_THE_KEY_FROM_BEFORE
azure.documentdb.uri=https://ADMINLOGIN.documents.azure.com:443/
```

The `database` property refers to the database (`bootiful`, because we used the resource group name as the database name) within the logical CosmosDB instance (`bootiful-cosmosdb`, which is what we specified with `$adminlogin` in our script). The key refers to the `primaryMasterKey` value from the `az cosmosdb list-keys` command. Replace the property values with the relevant and appropriate string values.

I ran this project just fine on a macOS based system, but I hit an odd issue when running it on my Ubuntu 18.10-based system. There's an oddity in the way that the Spring client libraries for CosmosDB gather telemetry that results in a NPE. If you encounter this, add the following to `src/main/resources/application.properties` to disable the telemetry.

```properties
Copycosmosdb.telemetryAllowed=false 
```

Next, you should define a Spring Data entity to map to the records in the CosmosDB collection, `reservations`.

```java
Copypackage com.example.bootifulazure;

import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "reservations")
class Reservation {

        @PartitionKey
        private String id;
        private String name;
}
```

Mostly, this looks like any other Lombok-annotated POJO you've ever seen. Of particular note is that the entity uses `@Document` from the Spring Data CosmosDB module to specify the `reservations` collection to which this entity maps. The entity uses a CosmosDB-specific annotation, `@PartitionKey`, to signal to the database which field to use when deciding to partition (logically or physically) possibly related data in a container. It's good practice to use a `String` for the partition key. Monotonically incrementing primary keys aren't a great idea in planet-scale distributed systems!

Now, define the Spring Data repository building on the `DocumentDbRepository`.

```java
Copypackage com.example.bootifulazure;

import com.microsoft.azure.spring.data.cosmosdb.repository.DocumentDbRepository;

interface ReservationRepository extends DocumentDbRepository<Reservation, String> {
}
```

The `DocumentDbRepository` might be new, but this should be otherwise straightforward.

```java
Copypackage com.example.bootifulazure;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.stream.Stream;

@Log4j2
@Component
class CosmosDbDemo {

    private final ReservationRepository rr;

    CosmosDbDemo(ReservationRepository rr) {
        this.rr = rr;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void demo() throws Exception {

        this.rr.deleteAll();

        Stream.of("A", "B", "C")
            .map(name -> new Reservation(UUID.randomUUID().toString(), name))
            .map(this.rr::save)
            .forEach(log::info);

    }
}
```