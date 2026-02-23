---
title: Case Study: Relational Database Source and File Sink
source: https://spring.io/blog/2020/09/10/case-study-relational-database-source-and-file-sink
scraped: 2026-02-23T13:38:04.286Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Soby Chacko |  September 10, 2020 | 2 Comments
---

# Case Study: Relational Database Source and File Sink

_Engineering | Soby Chacko |  September 10, 2020 | 2 Comments_

This article is part of a blog series that explores the newly redesigned Spring Cloud Stream applications based on Java Functions. In this episode, we are exploring the JDBC supplier and the source based on Spring Cloud Stream. We will see how we can export data from a relational database and dump it into a file using a File Consumer and the corresponding Spring Cloud Stream File sink. We will look at a few different ways in which we can run JDBC Source and send the data to a file.

Here are all the previous parts of this blog series.

-   [Introducing Function Based Streaming Applications](https://spring.io/blog/2020/07/13/introducing-java-functions-for-spring-cloud-stream-applications-part-0)
    
-   [Function Composition with Streaming Applications](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1)
    
-   [How to Build a Supplier and Source Application](https://spring.io/blog/2020/07/27/creating-a-supplier-function-and-generating-spring-cloud-stream-source)
    
-   [How to Build a Consumer and Sink Application](https://spring.io/blog/2020/08/03/creating-a-function-for-consuming-data-and-generating-spring-cloud-stream-sink-applications)
    
-   [Build and Run a Simple Stream Application](https://spring.io/blog/2020/08/10/case-study-build-and-run-a-streaming-application-using-an-http-source-and-a-jdbc-sink)
    
-   [Case Study: HTTP Request Function and Processor](https://spring.io/blog/2020/08/17/case-study-http-request-function-and-processor)
    
-   [Case Study: File Source and MongoDB Sink](https://spring.io/blog/2020/08/25/case-study-reading-from-a-file-and-writing-to-mongodb)
    

## [](#getting-data-out-of-an-rdbms)[](#getting-data-out-of-an-rdbms)Getting data out of an RDBMS

Querying a database and processing the results is a very basic enterprise use case. Going even back to the mainframe days of the information technology revolution, we can see that this pattern was in wide use. For the last many decades, SQL has established as the quintessential language of communicating with databases. Java, from its initial versions, added enterprise-level support for database-based applications using a library called [Java Database Connectivity](https://en.wikipedia.org/wiki/Java_Database_Connectivity), popularly known as JDBC. In the initial days of Java, many applications were written using the vanilla JDBC library. Spring Framework, from its outset, has been supporting this core use case of working with databases by providing a template pattern - [JdbcTemplate](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/jdbc/core/JdbcTemplate.html) - that is based on the JDBC library in JDK. The [Spring Data](https://spring.io/projects/spring-data-jdbc) project adds many additional features around this template. When Spring Integration came on, it took this support in Spring and provided [many additional components](https://docs.spring.io/spring-integration/reference/html/jdbc.html) so that the data is available through channel adapters, gateway, etc. In its latest incarnation, which is the topic for this blog, we realized that we can take these Spring Integration components and then provide them as simple [Java supplier](https://github.com/spring-cloud/stream-applications/tree/master/functions/supplier/jdbc-supplier) to query databases. We are going to take a look at all the details of how this supplier can be accessed, reused in custom applications, and used as a Spring Cloud Stream source.

## [](#jdbc-supplier)[](#jdbc-supplier)JDBC Supplier

[JDBC Supplier](https://github.com/spring-cloud/stream-applications/tree/master/functions/supplier/jdbc-supplier) is a component that is implemented as a `java.util.function.supplier` bean. When invoked, this will deliver the data from a database table. The JDBC supplier has the following signature.

```
CopySupplier<Flux<Message<?>>> jdbcSupplier()
```

By default, the JDBC supplier splits the data based on the rows of the database table, where each row of the database is represented as a `java.util.Map` data structure. For example, here is a database table with some data populated.

ID

Name

1

Bob

2

Jane

3

John

When we invoke the JDBC supplier against this table, we get a [Flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/Flux.html) of [Message](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/messaging/Message.html) objects that contain a `Map` as the payload. The first message will have a map with the keys `ID` and `NAME` and values `1` and `Bob` respectively. The second message will have the map with the same keys, but values of `2` and `Jane` and so on and so forth. We can also demand that the data be supplied without having them split into separate messages. For that, we can use the property, `jdbc.supplier.split`, and set that to `false` (default is `true`). When we disable split, there is an important difference from the above JDBC supplier signature. Its signature then becomes `Supplier<Message<?>>` and instead of having separate `Message<Map>`, we get a single `Message<List<Map>`. If we apply this to the example given above, we get a single list with 3 elements in it and each element will hold a `Map` that contains each of the rows of the database table.

JDBC Supplier needs an SQL query to execute on each invocation. This query is mandatory and must be provided through the property `jdbc.supplier.query`. We can also use the property, `jdbc.supplier.update` to force the supplier to ignore rows that have already been read. We will see examples of how this is done, later on in this article.

## [](#reusing-jdbc-supplier-in-custom-applications)[](#reusing-jdbc-supplier-in-custom-applications)Reusing JDBC Supplier in custom applications

Both types of `Supplier` beans mentioned above — the one we saw as the default with data split and the other one in which we disabled splitting the data — are named as `jdbcSupplier`. We can inject them in our custom applications qualified with that name. We need to make sure to use the correct type based on whether we are splitting the data. For example, if we go by the defaults, i.e. splitting the data, then we can autowire the JDBC supplier as below.

```
Copy@Autowired
Supplier<Flux<Message<?>>> jdbcSupplier;
```

On the other hand, if we disable splitting, using the property `jdbc.supplier.split`, then we need to inject it with the type `Supplier<Message<?>`.

Once injected, we can call the `get` method of the `Supplier` and then start receiving the data.

## [](#file-consumer)[](#file-consumer)File Consumer

Similar to the File Supplier we saw in the [previous blog](https://spring.io/blog/2020/08/25/case-study-reading-from-a-file-and-writing-to-mongodb), the [File Consumer](https://github.com/spring-cloud/stream-applications/tree/master/functions/consumer/file-consumer) is also a reusable bean that we can inject into our custom applications and use it to create new files in a directory. The bean is implemented as a `java.util.function.Consumer`. Often it might lead to some confusion for the novice reader, why it is called a consumer, but not actually consuming anything from a file. Although named and implemented as a consumer, file consumer is not a consumer of files in which it polls or reads files, but a consumer that accepts data and then writes to files. The use case of “consuming” files is handled by the file supplier.

Here is the type signature for the file consumer.

```
CopyConsumer<Message<?>> fileConsumer()
```

Since it is a consumer, it only makes sense to use this component at the end of your data processing pipeline. The consumer accepts incoming data and uses that to write to a file. When we combine the file consumer with Spring Cloud Stream through a binder implementation, it becomes a sink application where it consumes data from a middleware destination such as a Kafka topic or RabbitMQ exchange.

There are several enterprise use cases, where a file consumer is useful. A file consumer is useful for any business case that creates, or appends to a file whenever new data becomes available.

When using the file consumer, we can provide it with a directory and name of the file to write using the properties, `file.consumer.directory` and `file.consumer.name` respectively. If we don’t set them, it will use the defaults set by the consumer. By default, the data will be appended to the file which can be changed through the property `file.consumer.mode`. For more details, see configuration options for [FileConsumerProperties](https://github.com/spring-cloud/stream-applications/blob/master/functions/consumer/file-consumer/src/main/java/org/springframework/cloud/fn/consumer/file/FileConsumerProperties.java).

## [](#running-the-applications)[](#running-the-applications)Running the applications

The functional components above become more powerful when combining them with Spring Cloud Stream. The functions can be used in messaging applications and Spring Cloud Stream makes it easier to use them in a middleware agnostic manner. JDBC Supplier is used for building a [JDBC source](https://github.com/spring-cloud/stream-applications/tree/master/applications/source/jdbc-source) that can work with many different middleware systems. Similarly, File Consumer is used as the backbone of [File Sink](https://github.com/spring-cloud/stream-applications/tree/master/applications/sink/file-sink) application which can also work with different messaging systems.

In the following sections, we are going to run these applications standalone and verify that they work as expected.

### [](#setting-up-apache-kafka-and-the-mysql-database)[](#setting-up-apache-kafka-and-the-mysql-database)Setting up Apache Kafka and the MySQL database

First of all, create a new directory `jdbc-file-demo`.

`mkdir jdbc-file-demo && cd jdbc-file-demo`

We will run the Kafka variant of both jdbc-souce and file-sink applications. We will run these applications using Apache Kafka as the middleware. For JDBC source we will use, MySQL as the database. We provide a convenient docker-compose script for both Kafka and MySQL

```
Copywget -O docker-compose.yml https://raw.githubusercontent.com/spring-cloud/stream-applications/gh-pages/files/kafka-mysql-only.yml
```

Start the docker containers

```
Copydocker-compose up
```

Do `docker ps` and make sure that you see all three components are up and running (Kafka, Zookeeper, and MySQL).

Now that we have the necessary infrastructure ready, let’s go ahead and setup our MySQL database before we run our applications.

```
Copydocker exec -it jdbc-file-blog-mysql mysql -uroot -p
```

Use `rootpw` as the password. On the terminal, enter the following commands to setup the database and the table.

```
CopyCREATE DATABASE IF NOT EXISTS Demo;
USE Demo;
CREATE TABLE IF NOT EXISTS People (
	 id INT NOT NULL AUTO_INCREMENT,
	 name VARCHAR(255) NOT NULL,
	 street VARCHAR(255) NOT NULL,
	 city VARCHAR(255) NOT NULL,
	 tag CHAR(1),
	 PRIMARY KEY (id));
```

This schema above is pretty self explanatory, but the `tag` column needs some explanation. It is used for avoiding reading duplicate data from the table that we already read. The idea is that we update the `tag` column for each row returned by the query so it will not be included in subsequent queries. We will see details of it below.

Leave the terminal session into MySQL open, as we will come back to it later.

### [](#running-file-sink-as-standalone)[](#running-file-sink-as-standalone)Running file sink as standalone

Let’s run the out of the box file sink stand-alone.

```
Copywget https://repo.spring.io/libs-snapshot-local/org/springframework/cloud/stream/app/file-sink-kafka/3.0.0-SNAPSHOT/file-sink-kafka-3.0.0-SNAPSHOT.jar
```

Then run it as below.

```
Copyjava -jar file-sink-kafka-3.0.0-SNAPSHOT.jar --file.consumer.directory=/tmp/processed-file --file.consumer.name=output.txt --spring.cloud.stream.bindings.input.destination=jdbc-file-demo
```

Let’s go over the details about what we are trying to do. We are asking the file sink application to consume data from a kafka topic `jdbc-file-demo` and then generate a file named `output.txt` in the directory `/tmp/processed-file` on the file system. By default, each incoming Kafka topic record is appended to the file as a new line. If you enable, `file.consumer.binary` value to `true`, then the file is written as binary. You can find all the available configurations [here](https://github.com/spring-cloud/stream-applications/blob/master/applications/sink/file-sink/README.adoc).

### [](#running-jdbc-source)[](#running-jdbc-source)Running JDBC Source

Similar to how we run the file sink, we will grab and run the Kafka based jdbc source application now.

```
Copywget https://repo.spring.io/libs-snapshot-local/org/springframework/cloud/stream/app/jdbc-source-kafka/3.0.0-SNAPSHOT/jdbc-source-kafka-3.0.0-SNAPSHOT.jar
```

Then run,

```
Copyjava -jar jdbc-source-kafka-3.0.0-SNAPSHOT.jar --spring.datasource.url=jdbc:mariadb://localhost:3306/Demo --spring.datasource.username=root --spring.datasource.password=rootpw --jdbc.supplier.query="select id, name, street, city from People where tag is NULL order by id" --spring.cloud.stream.bindings.output.destination=jdbc-file-demo --jdbc.supplier.update="update People set tag='1' where id in (:id)" --server.port=0
```

We are providing the following configuration information to JDBC Source.

-   Datasouce URL - in this case the JDBC URL for the MySQL variant we are running.
    
-   Datasource user credentials
    
-   The SQL Query for the source application to run
    
-   The Kafka topic where the data is sent (This is set to the same topic where file-sink is consuming data from)
    
-   An update SQL statement to tag the records
    

Note that, when we created the table earlier, we added a column named `tag` to avoid reading duplicate records that we already read. Our main SQL query ( through the property `jdbc.supplier.query`) will only read those records where the `tag` value is not null. Then each time, the source reads a record, the tag is updated with the value `1`, so that the next time the query is executed, that record is omitted. Without providing an update statement through `jdbc.supplier.update`, as we have done above, each query will provide all the records in the table. If we don’t provide this and still want to avoid duplicates, then we need to use some complex strategy of using some [metadata store](https://docs.spring.io/spring-integration/reference/html/meta-data-store.html) to track what we consumed so far. Providing a schema with support for a flag (like `tag` in our example) and then update it on each read is a much easier strategy for avoiding duplicates.

### [](#polling-jdbc-source)[](#polling-jdbc-source)Polling JDBC Source

JDBC Source is invoked using a poller. This is different from using the JDBC Supplier directly in custom non Spring Cloud Stream applications, in which case, the supplier must be manually invoked. By default, Spring Cloud Stream provides a poller for JDBC Source which it polls every second. This schedule can be changed by using the property `spring.cloud.stream.poller.fixedDelay`. More controls on polling can be found [here](https://github.com/spring-cloud/spring-cloud-stream/blob/master/spring-cloud-stream/src/main/java/org/springframework/cloud/stream/config/DefaultPollerProperties.java).

### [](#verify-the-flow)[](#verify-the-flow)Verify the flow

Now that we are running both applications, let’s insert data into the table.

Go to your MySQL terminal session and enter the following insert statement.

```
Copymysql> insert into People values (1, 'Bob', 'First Street', 'First City', NULL);
```

Now go the directory `/tmp/processed-file` where the file-sink is writing the file and look for a file named `output.txt`. Open the file and verify it’s content. It should contain the following.

```
Copy {"id":1,"name":"Bob","street":"First Street","city":"First City"}
```

Populate some more data into the table.

```
Copymysql> insert into People values (2, 'Jane', 'First Street', 'First City', NULL);
mysql> insert into People values (3, 'Mary', 'First Street', 'First City', NULL);
```

Verify that we are seeing the new data in the `output.txt` file.

### [](#running-jdbc-source-with-a-filter)[](#running-jdbc-source-with-a-filter)Running JDBC Source with a filter

Stop running the JDBC Source application and rerun as below.

```
Copyjava -jar jdbc-source-kafka-3.0.0-SNAPSHOT.jar --spring.cloud.stream.function.definition="jdbcSupplier|filterFunction" --spring.datasource.url=jdbc:mariadb://localhost:3306/Demo --spring.datasource.username=root --spring.datasource.password=rootpw --jdbc.supplier.query="select id, name, street, city from People where tag is NULL order by id" --spring.cloud.stream.bindings.output.destination=jdbc-file-demo --jdbc.supplier.update="update People set tag='1' where id in (:id)" --server.port=0 --filter.function.expression="#jsonPath(payload,'$.id')%2!=0"
```

As we have seen in the [prior blogs](https://spring.io/blog/2020/07/20/introducing-java-functions-for-spring-cloud-stream-applications-part-1) and as explained [here](https://github.com/spring-cloud/stream-applications/blob/master/docs/FunctionComposition.adoc), all the out of the box sources are autoconfigured with many useful functions so that you can activate them through a property. While running with the new configuration options above, we are composing the [filterFunction](https://github.com/spring-cloud/stream-applications/tree/master/functions/function/filter-function) with `jdbcSupplier`, thus adding filtering capabilities to the data produced by JDBC Supplier. We are composing it using the property, `spring.cloud.stream.function.definition` and give it the value `jdbcSupplier|filterFunction`. Then through the property, `filter.function.expression`, we provide a [JSONPath](https://github.com/json-path/JsonPath) expression to filter out all even id’s.

Now, if you insert more data into the table, you will see only records with odd ID’s are written to the file.

Try entering these records into the table.

```
Copymysql> insert into People values (200, 'John', 'First Street', 'First City', NULL);
mysql> insert into People values (201, 'Mary', 'First Street', 'First City', NULL);
mysql> insert into People values (202, 'Alice', 'First Street', 'First City', NULL);
mysql> insert into People values (203, 'Bob', 'First Street', 'First City', NULL);
mysql> insert into People values (204, 'Jane', 'First Street', 'First City', NULL);
mysql> insert into People values (205, 'Doe', 'First Street', 'First City', NULL);
```

We will see that the file does not contain records with ID’s 200, 202 and 204 since they got filtered out.

## [](#running-jdbc-source-with-other-databases)[](#running-jdbc-source-with-other-databases)Running JDBC Source with other databases.

JDBC supplier is shipped with popular open source JDBC drivers. Currently, it contains drivers for MySQL, PostgreSQL, and Microsoft SQL Server databases. This gives us the ability to quickly switch the same JDBC Source application that is running against a particular database, say MySQL to run against PostgreSQL without making any code changes, but only configuration changes at deployment. Let’s take our JDBC Source that we ran against MySQL and run this time against PostgreSQL.

First, we will run PostgreSQL in a docker container.

```
Copydocker run --rm   --name pg-docker -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -e POSTGRES_DB=demo  -d -p 5432:5432  postgres
```

Log in to a `psql` session (or use a UI tool like PGAdmin).

```
Copydocker run -it --rm --network host postgres psql -h localhost -d demo -U test
```

Use `test` as the password.

Then create this table:

```
CopyCREATE TABLE IF NOT EXISTS People (
id INT NOT NULL,
name VARCHAR(255) NOT NULL,
street VARCHAR(255) NOT NULL,
city VARCHAR(255) NOT NULL,
tag CHAR(1),
PRIMARY KEY (id));
```

Stop the current JDBC Source and re-run it with the following configuration options:

```
Copyjava -jar jdbc-source-kafka-3.0.0-SNAPSHOT.jar --spring.cloud.stream.function.definition="jdbcSupplier|filterFunction" --spring.datasource.url=jdbc:postgresql://localhost:5432/demo --spring.datasource.username=test --spring.datasource.password=test --jdbc.supplier.query="select id, name, street, city from people where tag is NULL order by id" --spring.cloud.stream.bindings.output.destination=jdbc-file-demo --jdbc.supplier.update="update people set tag='1' where id in (:id)" --server.port=0 --filter.function.expression="#jsonPath(payload,'$.id')%2!=0"
```

This pretty much follows the same configuration options as the second time we ran the JDBC source against MySQL, but this time the datasource properties are changed for running against the PostgreSQL database.

Insert the same data as before with MySQL at the psql prompt. You will notice that only ID’s with odd numbers are getting appended to the file.

## [](#adding-commercial-database-drivers-to-jdbc-supplier)[](#adding-commercial-database-drivers-to-jdbc-supplier)Adding commercial database drivers to JDBC Supplier

If we want to add JDBC drivers for commercial databases, then we need to make those changes manually. The steps for doing so are straightforward and given below.

-   Clone the [stream-application](https://github.com/spring-cloud/stream-applications) repository
    
-   Add the driver we want (for e.g. Oracle JDBC driver) in the [maven configuration](https://github.com/spring-cloud/stream-applications/blob/master/functions/supplier/jdbc-supplier/pom.xml) as a dependency. Set its scope to `runtime`.
    
-   From the root of the repository: `./mvnw clean install -pl :jdbc-supplier`
    
-   Generate the applications with the supplier changes: `./mvnw clean install -pl :jdbc-source`
    
-   `cd applications/source/jdbc-source/apps` - Here, we can find both Kafka and RabbitMQ based jdbc-source applications
    
-   Build the application variant that we want.
    

## [](#conclusion)[](#conclusion)Conclusion

This blog walked through the details of JDBC Supplier and how this supplier is used in the Spring Cloud Stream JDBC Source. We also saw the file consumer and its sink counterpart in Spring Cloud Stream. We then took a deep dive into running these applications standalone using a few variants, exploring various features along the way. Finally, we saw how we can easily switch JDBC Source between various databases and how we can add new database drivers.

## [](#stay-tuned)[](#stay-tuned)Stay tuned

This series is going to continue. In the next coming weeks, we will look at more functions and applications.