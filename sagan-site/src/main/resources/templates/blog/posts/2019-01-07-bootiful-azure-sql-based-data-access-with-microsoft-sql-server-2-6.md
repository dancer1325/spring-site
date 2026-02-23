---
title: Bootiful Azure: SQL-based data access with Microsoft SQL Server  (2/6)
source: https://spring.io/blog/2019/01/07/bootiful-azure-sql-based-data-access-with-microsoft-sql-server-2-6
scraped: 2026-02-23T15:00:19.452Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 07, 2019 | 2 Comments
---

# Bootiful Azure: SQL-based data access with Microsoft SQL Server  (2/6)

_Engineering | Josh Long |  January 07, 2019 | 2 Comments_

> This is part 2 of a 6 part series, with new posts Mondays and Thursdays, introducing Microsoft Azure for Spring developers. I couldn't have put this together without input from Microsoft's Asir Vedamuthu Selvasingh, Yitao Dong, Bruno Borges, Brian Benz and Theresa Nguyen. You can find the code for this series [on Github](https://github.com/joshlong/bootiful-azure-article). Hit me up on [Twitter (@starbuxman)](http://twitter.com/Starbuxman) as you're reading the installments with any feedback or questions. You can also learn more about Microsoft Azure in my [Spring Tips (@SpringTipsLive)](http://twitter.com/SpringTipsLive) installment, [*Bootiful Azure*](https://spring.io/blog/2018/12/05/spring-tips-bootiful-microsoft-azure)

Here are all the installments:

-   [Bootiful Azure: Taking Your First Steps with Microsoft Azure](https://spring.io/blog/2019/01/03/bootiful-azure-taking-your-first-steps-with-microsoft-azure-1-6)
-   [Bootiful Azure: SQL-based data access with Microsoft SQL Server](https://spring.io/blog/2019/01/07/bootiful-azure-sql-based-data-access-with-microsoft-sql-server-2-6)
-   [Bootiful Azure: Global Scale Data Access with CosmosDB](https://spring.io/blog/2019/01/10/bootiful-azure-global-scale-data-access-with-cosmosdb-3-6)
-   [Bootiful Azure: Integration with Azure Service Bus](https://spring.io/blog/2019/01/14/bootiful-azure-integration-with-azure-service-bus-4-6)
-   [Bootiful Azure: Object Storage Service](https://spring.io/blog/2019/01/17/bootiful-azure-object-storage-service-5-6)
-   [Bootiful Azure: To Production!](https://spring.io/blog/2019/01/21/bootiful-azure-to-production-6-6)

Let's start with something short and sweet, the legendary Microsoft SQL Server. Microsoft SQL Server is an interesting beast. Sure, you can run it yourself, but wouldn't you rather Microsoft, who build the product itself, do that for you? Now *that* is a full-service solution! Imagine how nice that is? You don't often see that sort of solution in other contexts. Imagine buying a car that you can drive as fast as you'd like, and on which the the manufacturer will guarantee any and all maintenance and repairs? Forever? Even if the car is hit with an asteroid? This is why running Microsoft SQL Server on Microsoft Azure is so appealing: the drudgery of the ownership is removed.

Don't get me wrong. There's plenty to recommend SQL Server in its own right. SQL Server has been around since 1989! It's routinely ranked up there with the likes of Oracle DB and PostgreSQL as being among the most feature-filled database options out there. It's been built over decades to serve enterprise use cases. It's even got things that other databases, including the venerable PostgreSQL, sometimes lack, like Transparent Data Encryption wherein data is transparenly encrypted at rest.

SQL Server has its origins as an enterprise-grade database that ran on one operating system.... OS/2! Wait, OS/2? Surely you meant Microsoft Windows? Nope! Microsoft joined Ashton-Tate and Sybase in the late 1980s to create a variant of Sybase SQL Server for IBM OS/2 (developed jointly with Microsoft at the time), which was released the following year.

This was the first version of Microsoft SQL Server, and served as Microsoft's entry to the enterprise-level database market, competing against Oracle, IBM, and later, Sybase. SQL Server 6.0 was the first version designed for NT without direction from Sybase.

Windows NT was released in July 1993 and Sybase and Microsoft took differing directions. Each pursued its own design and marketing schemes. Microsoft negotiated exclusive rights to all versions of SQL Server written for Microsoft operating systems. Sybase and Microsoft SQL Server are two very different things today, with radically different codebases. Now, Microsoft maintain several editions of SQL Server for different usecases and workloads. It's hard to qualify why Microsoft SQL Server is so amazing, so I'll instead refer you to this [pretty exhaustive Wikipedia page demonstrating](https://en.wikipedia.org/wiki/Comparison_of_relational_database_management_systems) different features acrosss various SQL database engines. Microsoft SQL Server fares pretty well!

## [](#configuring-sql-server-on-microsoft-azure)Configuring SQL Server on Microsoft Azure

So, it was my hope to show you how to follow these instructions in the user interface in terms of screenshots but that seemed less than ideal because things in the Azure portal tend to be... squirmy. Things move around. Also, these things are infinitely less scriptable. So, we're going to use the `az` CLI. Trouble is, it's ... tedious.

Logically, what we want to do is trivial. We want to:

-   create a SQL Server server instance
-   create a SQL Server database in the server. Our Spring Boot application will preload this with a sample schema and data.
-   expose the SQL Server instance to client accesses from our computer

We're going to use a script to do this work:

```shell
Copy#!/bin/bash

# Set an admin login and password for your database
export adminlogin=bootiful
export password=B00t1ful

# The logical server name has to be unique in the system
export servername=${1}-server

# The ip address range that you want to allow to access your DB
export startip=0.0.0.0
export endip=223.255.255.255

# the name of the resource group
export rg=$1

# Create a logical server in the resource group
az sql server create \
    --name $servername \
    --resource-group $rg \
    --admin-user $adminlogin \
    --admin-password $password

# Configure a firewall rule for the server
az sql server firewall-rule create \
    --resource-group $rg \
    --server $servername \
    -n AllowYourIp \
    --start-ip-address $startip \
    --end-ip-address $endip

# Create a database in the server with zone redundancy as true
az sql db create \
    --resource-group $rg \
    --server $servername \
    --name ${1}-sample-db \
    --service-objective Basic
```

This should dump out a *wall* of JSON! Yikes! I culled this example from the Azure documentation and thank goodness, too! I don't think I would want to have to arrive at this solution by myself. You're going to want to note the `name` attribute in the first JSON stanza printed to the console. We used the `$RANDOM` variable to generate a, well, *random* name, so it'll be different on your machine. On my machine the value was `bootiful-22952`.

Now, you've got a working server and a working database within the server. If you poke around the Azure Portal you'll gleam all the connection information required to connect to the database. *Or*, you could use this *one simple trick*.

```shell
Copyaz sql db show-connection-string --client jdbc --name bootiful-sample-db
```

This command gives you client connection strings for a number of technologies, including the Windows ADO subsystem, Java's JDBC driver interface, and PHP's PDO interface. You'll need to replace the `<server>`, `<username>` and `<password>` section of the URI with the appropriate values, in this case `bootiful-server`, `bootiful` and `B00t1ful` respectively. Alternatively, as we'll see in a moment, you can define properties and use property placeholder resolution to parameterize this part of the connection string.

## [](#introducing-sql-server-into-your-spring-application)Introducing SQL Server into your Spring Application

Now that we've got a freshly confiugured SQL Server instrance up and running we need only use it like we would any other JDBC dependency in our codde. If you're using the Spring Initialzir you can select `SQL Server` and the appropriate dependency will be added to your Maven or Gradle build. Or, you can add it manually to your build using the following coordinates: `com.microsoft.sqlserver` : `mssql-jdbc`. You don't need to specify the version; that's done for you by Spring Boot itself. This particular dependency and itnegration with Microosft technologies doesn't even require a particular Maven bill-of-materials dependency - it just works.

Then, you'll need to specify the usual confiuguration properites so that Spring can instnantiate a connection to the `DataSource` for you.

```properties;
Copy
sql-db=bootiful-sample-db
sql-username=bootiful
sql-password=B00t1ful
sql-servername=bootiful-server

spring.datasource.url=jdbc:sqlserver://${sql-servername}.database.windows.net:1433;database=${sql-db};user=${sql-username}@${sql-servername};password=${sql-password};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30
spring.datasource.username=${sql-username}
spring.datasource.password=${sql-password}

spring.datasource.initialization-mode=always

```

I've encoded the username and password here, in the property file. This is a **bad** idea. Generally, this is exactly the sort of thing you will want to live in an environment variable or in a configuration service like Spring Cloud Config Server. That setup out of the way, it's trivial to use the resulting connection with any technology that supports both JDBC, generally, and Microsoft SQL Server, specifically.

Our application will consume data that needs to be installed in the database beforehand. Spring can help us out here. Spring Boot can automatically execute `src/main/resources/schema.sql` and `src/main/resources/data.sql` against the configured `DataSource` if you specify `spring.datasource.initialization-mode=always` in your properties. `schema.sql` is an ideal place in which to put database DDL, and `data.sql` is an ideal place in which to put sample data.

Our Spring blog software won't let me capture SQL DDL in this post for, em, *security* reasons? So, here is the [`src/main/resources/schema.sql`](https://github.com/joshlong/bootiful-azure-article/blob/master/bootiful-azure/src/main/resources/schema.sql) file on Github. Please consult that.

Here is our `src/main/resources/data.sql`:

```sql
Copyinsert into customer(first_name, last_name)
values ('james', 'watters'),
       ('bob', 'lee'),
       ('trisha', 'gee'),
       ('mario', 'gray'),
       ('spencer', 'gibb'),
       ('yitao', 'dong');
```

Both will have been executed before our various event listeners. Let's look at an event listener that pulls that data back out using a `JdbcTemplate`.

```java
Copypackage com.example.bootifulazure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Log4j2
class SqlServerDemo {

        private final JdbcTemplate jdbcTemplate;

        SqlServerDemo(JdbcTemplate jdbcTemplate) {
                this.jdbcTemplate = jdbcTemplate;
        }

        @EventListener(ApplicationReadyEvent.class)
        public void demo() {
                String query = " select TOP 3 * from customer ";
                RowMapper<Customer> rowMapper =
                    (rs, rowNum) -> new Customer(rs.getLong("id"), rs.getString("first_name"), rs.getString("last_name"));
                List<Customer> customerList = this.jdbcTemplate.query(query, rowMapper);
                customerList.forEach(log::info);
        }

        @Data
        @AllArgsConstructor
        @NoArgsConstructor
        private static class Customer {
                private Long id;
                private String firstName, lastName;
        }
}
```

SQL Server is a compelling database for a number of use cases and the fact that Microsoft Azure makes scaling it so easy is a win for everyone. It's worth mentioning that R2DBC, an effort at reactive SQL datastore access, already offers a Microsoft SQL Server implementation, in addition to H2 and PostgreSQL. You can even do reactive SQL Server access for even faster applications. All, seemingly, at the push of a button (or at least a tedious deployment script).