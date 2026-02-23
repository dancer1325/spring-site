---
title: Bootiful GCP: Relational Data Access with Spring Cloud GCP (2/8)
source: https://spring.io/blog/2018/08/23/bootiful-gcp-relational-data-access-with-spring-cloud-gcp-2-8
scraped: 2026-02-23T15:15:47.492Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 23, 2018 | 0 Comments
---

# Bootiful GCP: Relational Data Access with Spring Cloud GCP (2/8)

_Engineering | Josh Long |  August 23, 2018 | 0 Comments_

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

In this installment we’re going to look at how to connect a Spring Boot-based application to a SQL datastore, like PostgreSQL or MySQL, running on Google Cloud Platform. GCP offers managed SQL services including MySQL and PostgreSQL. Let’s provision a MySQL instance and use that from a Spring Boot-based application. You’ll need to first enable the SQL APIs in Google Cloud:

```
Copy gcloud services enable sqladmin.googleapis.com
```

Then, you’ll need to provision a new Google Cloud SQL instance in a particular region. The default is MySQL. (This could take several minutes!)

```
Copygcloud sql instances create reservations --region=us-central1
```

Then, provision a new database in that Google Cloud SQL instance:

```
Copygcloud sql databases create reservations --instance reservations
```

There are a couple of ways to establish a secured connection to this CloudSQL instance, e.g. configure the JDBC driver [with a SSL Socket Factory and/or using SQL Proxy](https://cloud.google.com/sql/docs/mysql/connect-external-app#proxy). To make all the configuration easier though, you can add the GCP MySQL starter: `org.springframework.cloud` : `spring-cloud-gcp-starter-sql-mysql`. This starter, and a dash of configuration, can connect your application to the platform.

What configuration, you say? Well, Spring applications have bean definitions (in Java code) and property definitions (in any number of different property sources, including `.yaml` and `.properties` files and, as we’ll see later, GCP’s RuntimeConfig mechanism). You can selectively activate particular bean definitions and property definitions with *profiles*. Spring profiles are arbitrary labels that identify distinct bean and property configurations that could be selectively *activated*. In this example, we’re using the `mysql` profile.

Let’s look at the configuration for the `mysql` profile, in `src/main/resources/application.properties`:

**application.properties.**

```properties
Copyspring.cloud.gcp.sql.database-name=reservations
spring.cloud.gcp.sql.instance-connection-name=pgtm-jlong:us-central1:reservations

spring.datasource.initialization-mode=always
spring.datasource.hikari.maximum-pool-size=2
```

-   these properties identify to which GCP SQL instance and database the client should connect
-   tells Spring to initialize the schema by running `src/main/resources/schema.sql`, if present

`src/main/resources/schema.sql` contains DDL to create a reservations table.

In this example, we’re letting Spring Boot configure the database. There are alternative approaches. We could use `gcloud sql connect $GCP_SQL_INSTANCE` where `$GCP_SQL_INSTANCE` should be replaced with your GCP SQL instance name. In this case, the SQL instance name is `reservations`. This will dump you into a MySQL session connected to the remote database in which you can interactively issue the relevant schema DDL.

This is a demo, so let’s install some sample data as well. You can create a file, `src/main/resources/data.sql`, and Spring will execute that on applicaton startup, or you can use `gcloud sql connect`. Either way, run the following statements.

```sql
Copyinsert into reservations(name) values('ray');
insert into reservations(name) values('josh');
```

Now you can talk to the database from your Spring application like you would any other SQL database.

```java
Copypackage com.example.gcp.mysql;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.Collection;

@SpringBootApplication
public class MySqlApplication {

        private final Log log = LogFactory.getLog(getClass());

        private final JdbcTemplate template;

        private final RowMapper<Reservation> rowMapper =
            (rs, rowNum) -> new Reservation(rs.getLong("id"), rs.getString("name"));

        MySqlApplication(JdbcTemplate template) {
                this.template = template;
        }

        @EventListener(ApplicationReadyEvent.class)
        public void ready() {
                Collection<Reservation> reservations = this.template
                    .query("select * from reservations", this.rowMapper);
                reservations.forEach(reservation -> log.info("reservation: " + reservation.toString()));
        }

        public static void main(String args[]) {
                SpringApplication.run(MySqlApplication.class, args);
        }
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Reservation {
        private Long id;
        private String reservationName;
}
```

Run the application and confirm that the results are reflected in the output.

At this point you should be on familiar footing; you can use Spring Data JPA and Spring Data REST, JOOQ, MyBatis, or any of the various JDBC-based technologies, along with Spring Boot, to work with this GCP-managed MySQL instance.

In this post, we’ve used MySQL as managed by Google Cloud. This isn’t particularly interesting; it’s not why you should be using GCP. Anybody can run MySQL! In the next installment, we’ll look at using Google Cloud Spanner with Spring Cloud GCP. Be sure to check back next Monday for the next installment.