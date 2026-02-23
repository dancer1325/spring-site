---
title: Spring Data 2020.0 - New and Noteworthy in Spring Data Neo4j 6.0
source: https://spring.io/blog/2020/11/20/spring-data-2020-0-new-and-noteworthy-in-spring-data-neo4j-6-0
scraped: 2026-02-23T13:40:46.141Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christoph Strobl |  November 20, 2020 | 0 Comments
---

# Spring Data 2020.0 - New and Noteworthy in Spring Data Neo4j 6.0

_Engineering | Christoph Strobl |  November 20, 2020 | 0 Comments_

Spring Data Neo4j is a Spring Data community project that is maintained and developed by Neo4j, Inc. On behalf of the team working on the module at Neo4j, we are happy to share their insights about recent changes and new features shipped with the [2020.0.0 release](https://spring.io/blog/2020/11/06/spring-data-2020-0-new-and-noteworthy-a-general-overview).

Neo4j users who use Spring Boot 2.3 require special attention because the configuration infrastructure for Spring Data Neo4j 6.0 has changed in an incompatible way.

That said, not only has the configurational infrastructure changed, but the whole project changed.

The module has some history and went through several major changes. For about four years now, it followed the Spring Data JPA principle: Using Spring Data as a thin layer to orchestrate an underlying object mapper.

With Neo4j, that mapper is called Neo4j-OGM. While Neo4j-OGM is quite flexible, it comes with a price. It not only abstracts over our query language like any object mapper would do, but it also abstracts over the transport. It can be used to bring up Neo4j embedded, use HTTP or our own Bolt protocol. Last but not least, it re-creates many abstracts of the graph on the client side. That is, it creates a local graph model during mapping and builds objects by iterating from that model, instead of working in a record-oriented way.

With that many abstractions in place, various things became increasingly hard:

-   Supporting the reactive programming paradigm in such a way that it is more than a fake reactive layer on top
    
-   Supporting immutable objects
    
-   Providing a composable stack
    
-   Making it easy to use Cypher and custom queries - with or without mapping
    

The new Spring Data Neo4j 6.0 major release addresses all of this.

We started that endeavor around March of 2019, very much inspired by the great work of the Spring Data Team around Spring Data JDBC. SDN 6 started as a side project named SDN/RX. With SDN/RX, we gathered feedback from customers and early adaptors, among them JHipster users.

Eventually, it became SDN 6, and we announced it during Spring One 2020:

Slides: [https://speakerdeck.com/michaelsimons/spring-up-your-graph](https://speakerdeck.com/michaelsimons/spring-up-your-graph)

What is in it for you:

-   Full support for reactive programming, from the mapping layer up to the database (Neo4j required).
    
-   Compatibility with a wide range of the Neo4j Java Driver versions: From 4.0 to 4.2 and future versions, thus supporting Neo4j 3.5 to 4.2 (not yet released).
    
-   JDK 8 baseline in accordance with Spring Framework and Spring Data, but it also runs great in JDK 15, including using the Records-preview as domain classes.
    
-   Speaking of records, the mapping is record-oriented, so pipelined and mapped data can be retrieved fully immutable. This applies to Kotlin-Data classes, to Java 15 records, and, of course, to "data" classes with withers, either manually created or through Lombok.
    
-   For the first time with Spring Data Neo4j, support for `findByExample`\-based methods.
    
-   Introduction of our new [https://github.com/neo4j-contrib/cypher-dsl](https://github.com/neo4j-contrib/cypher-dsl). We use this internally but you can create custom queries with it, too.
    
-   Support for the experimental Spring Native project, Spring Data Neo4j. The Cypher-DSL and the Neo4j Java driver are fully compatible with GraalVMs native image.
    
-   The return of the Neo4j template.
    
-   Well defined multiple levels of abstractions:
    
    -   SDN 6 is not responsible for creating a database connection any more. Nor it can be hold responsible for bringing up an embedded instance. Instead, you bring the driver (or let Spring Boot handle this for you).
        
    -   Do whatever you want with the driver. Manage your transactions the way you need.
        
    -   SDN 6 gives you a thin client over the driver. We hope that client has some nice and usable hooks for your own mapping. At least we are happy with it and use it under the hood. The client is integrated with Springs transaction managers.
        
    -   On top of the client sits the Neo4j template. It knows your domain model.
        
    -   The template is used by the repository abstraction.
        

One point that is very dear to us: The support for Neo4j is embedded. While Neo4j-OGM can not only start an embedded instance but also use the Graphdatabase API directly, we do not recommend that approach at all. Starting any database from the object mapping layer opens a world full of problems. This begins at the sheer amount of dependencies a database brings into your application and continues with the synchronization of multiple instances of the same service, and possibly ends with shutdown timing issues, especially when something is run on Kubernetes, which has a tendency to kill things quickly.

If you are aware of those drawbacks, you can still bring up an embedded Neo4j. [Here](https://gist.github.com/michael-simons/d3137f64ac0b13713fae8e7e1a69367e) is an example that can be turned into a Spring bean.

This embedded instance can then be used by SDN 6. You can open up a local Bolt connection to it.

Spring Boot’s infrastructure has the following changes:

-   There are new properties on the top level: `spring.neo4j.*` is now used to configure the database connection.
    
-   `spring.data.neo4j.*` has new properties to configure the database name being used.
    
-   Better health and (hopefully soon) great Micrometer metrics support.
    
-   `@DataNeo4jTest` no longer starts an embedded instance.
    

Regarding that last point, we recommend [Testcontainers Neo4j](https://www.testcontainers.org/modules/databases/neo4j/) or the manual creation and management of an embedded instance.

What do you need to do? The annotations have changed, and we offer a dedicated page in the [documentation](https://docs.spring.io/spring-data/neo4j/docs/6.0.0/reference/html/#Migrating) to describe which annotation of OGM has been replaced by a Spring Data Neo4j annotation. The mapping is a bit opinionated, and you might need to rework your domain model in a couple of places.

We think that we managed to lay the groundwork for a stable framework for the coming years, and we look forward to your feedback.

Our thanks go out to Mark Paluch, team lead of the Spring Data team. Mark had incredible patience for all the questions we had about the internal workings of Spring Data commons and an open ear for any discussions.

Also, kudos to Sergei Egorov, from Project Reactor: Not only is Sergei one of the friendliest folks in the Java ecosystem, but he is also a hot stream of all things reactive.

And, of course, thanks to Stéphane Nicoll, who worked with us over the last two years to improve the Neo4j support in Spring Boot in many ways: By challenging our ideas, polishing our code, and leading to an integration that is now much cleaner and hopefully more attractive for our shared user base.

[Michael Simons](https://twitter.com/rotnroll666), on behalf of the Spring Data Neo4j team.