---
title: Bootiful GCP: Globally Consistent Data Access with Spanner (3/8)
source: https://spring.io/blog/2018/08/27/bootiful-gcp-globally-consistent-data-access-with-spanner-3-8
scraped: 2026-02-23T15:15:43.089Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  August 27, 2018 | 2 Comments
---

# Bootiful GCP: Globally Consistent Data Access with Spanner (3/8)

_Engineering | Josh Long |  August 27, 2018 | 2 Comments_

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

MySQL and PostgreSQL are familiar friends in an unfamiliar land, but they’re not why we’re here. No no. Were I you, I’d look at a platform like GCP and take from it the best bits; the parts that have no analog elsewhere. The things that separate it from the other platforms. One such distinguishing feature is [Google Spanner](https://en.wikipedia.org/wiki/Spanner_\(database\)). Spanner is.. something else entirely. In this installment we're going to look at Google Cloud Spanner.

Google first revealed Spanner when they introduced F1, a SQL database engine that the Adwords team moved to, *away* from MySQL ("But Josh!,"I hear you exclaim, "Didn’t we just deploy to MySQL??"), in 2012. Spanner provides low latency reads, and to a lesser extent writes, globally. Google announced it [in 2012 in a research paper](http://static.googleusercontent.com/media/research.google.com/en//archive/spanner-osdi2012.pdf) in which it called Spanner "the first system to distribute data at global scale and support externally-consistent distributed transactions."

"Spanner is impressive work on one of the hardest distributed systems problems - a globally replicated database that supports externally consistent transactions within reasonable latency bounds," [said Andy Gross](https://www.zdnet.com/article/google-reveals-spanner-the-database-tech-that-can-span-the-planet/), principal architect at Basho.

Spanner is able to offer such a broad amount of geographic redundancy thanks to a method Google has developed of being able to give precise times to applications to let them write, read and replicate data without making mistakes. Spanner’s "TrueTime" API depends upon GPS receivers and atomic clocks that have been installed in Google’s datacentres to let applications get accurate time readings locally without having to sync globally.

There are a number of database technologies at Google, such as [Bigtable](https://ai.google/research/pubs/pub27898) (columnar database, great for high throughput writes), and [Megastore](https://ai.google/research/pubs/pub36971%3E) (NoSQL Database). Bigtable only supported eventually consistent replication across datacenters. According to the paper: "At least 300 applications within Google use Megastore (despite its relatively low performance) because its data model is simpler to manage than Bigtable’s and because of its support for synchronous replication across datacenters." At the time, applications like GMail, Picasa, Calendar, Android Market and AppEngine relied on Megastore.

Spanner was designed to be "scalable, multi-version, globally distributed, and synchronously-replicated database". Transactions are a first-class concept in Spanner driven, in part, by their absence in Bigtable.

"The lack of cross-row transactions in Bigtable led to frequent complaints; Percolator was in part built to address this failing. Some authors have claimed that general two-phase commit is too expensive to support, because of the performance or availability problems that it brings. We believe it is better to have application programmers deal with performance problems due to overuse of transactions as bottlenecks arise, rather than always coding around the lack of transactions. Running two-phase commit over Paxos mitigates the availability problems."

Each of the databases have their use cases. Bigtable (on GCP as [Cloud Bigtable](https://cloud.google.com/bigtable/) is great for consistent low latency and high throughput workload. While Megastore (on GCP as [Cloud Datastore](https://cloud.google.com/datastore/) can be used as a managed NoSQL data store with ACID transactions. Spanner (on GCP as [Cloud Spanner](https://cloud.google.com/spanner/), is meant for horizontalliy scalable, highly available, and strongly consistent RDBMs workloads.

Well alright! I’m simultaneously interested and intimidated! I *want* Spanner, but I *don’t* want to have to rack and stack servers and synchronize GPS recivers and atomic clocks. But, *something* tells me Google’d be happy to do that for me, so let’s try it out.

As before, you’ll need to enable the API for Google Cloud GCP Spanner before you can use it:

```shell
Copygcloud services enable spanner.googleapis.com
```

Then, create a new Google Cloud Spanner instance:

```shell
Copygcloud spanner instances create reservations --config=regional-us-central1 \
  --nodes=1 --description="Reservations for everybody"
```

Then, create the database instance:

```shell
Copygcloud spanner databases create reservations --instance=reservations
```

Confirm the Spanner instance is available:

```shell
Copygcloud spanner databases list --instance=reservations
```

Once the instance is `READY`, it’s time to create the table. Here’s the Spanner DDL. If this looks uncannily like SQL, that’s good! It should. Put this DDL into a separate file. I’ve called it `schema.ddl`.

**schema.ddl.**

```sql
CopyCREATE TABLE reservations (
  id        STRING (36) NOT NULL,
  name      STRING (255) NOT NULL
) PRIMARY KEY (id );
```

Register the schema with the database.

```shell
Copygcloud spanner databases ddl update reservations \
  --instance=reservations --ddl="$(./gcp/src/main/resources/db/schema.ddl )"
```

Now we can read the data from Spanner in our Spring application. The auto-configuration needs a little bit of configuration in order to talk to the right database.

**application.properties.**

```properties
Copyspring.cloud.gcp.spanner.instance-id=reservations-demo
spring.cloud.gcp.spanner.database=reservations
```

We’ll use the brand new Spring Data Spanner module that supports common Spring Data idioms when working with Spanner. Add `org.springframework.cloud` : `spring-cloud-gcp-starter-data-spanner` to your Maven build. Let’s use a Spring Data repository to make short work of reading with our database.

```java
Copypackage com.example.gcp.spanner;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.cloud.gcp.data.spanner.core.mapping.PrimaryKey;
import org.springframework.cloud.gcp.data.spanner.core.mapping.Table;
import org.springframework.context.event.EventListener;
import org.springframework.data.annotation.Id;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;
import java.util.stream.Stream;

@Slf4j
@SpringBootApplication
public class SpannerApplication {

        private final ReservationRepository reservationRepository;

        SpannerApplication(ReservationRepository reservationRepository) {
                this.reservationRepository = reservationRepository;
        }

        @EventListener(ApplicationReadyEvent.class)
        public void setup() {

                
                this.reservationRepository.deleteAll();

                Stream
                    .of("josh", "ray")
                    .map(name -> new Reservation(UUID.randomUUID().toString(), name))
                    .forEach(this.reservationRepository::save);
                this.reservationRepository.findAll().forEach(r -> log.info(r.toString()));
        }

        public static void main(String args[]) {
                SpringApplication.run(SpannerApplication.class, args);
        }
}

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reservations")
class Reservation {

        @Id
        @PrimaryKey
        private String id;
        private String name;
}

@RepositoryRestResource
interface ReservationRepository extends PagingAndSortingRepository<Reservation, String> {
}
```

-   We kick off the application, delete existing data and then write some new data to the database using our Spring Data Spanner-powered repository.
    
-   We define the Spring Data Spanner entity using custom mapping annotations, `@Table` and `@PrimaryKey`.
    
-   We create a Spring Data repository that is also exposed using Spring Data REST as a REST API.
    

This example should look familiar if you’ve ever used Spring Data. Spring Data Spanner builds upon familiar concepts and patterns - templates, repositories, and entities - to support familiar data access patterns with a very different kind of database.