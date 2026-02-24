---
title: Spring Data Graph 1.0 with Neo4j support released today
source: https://spring.io/blog/2011/04/19/spring-data-graph-1-0-with-neo4j-support-released-today
scraped: 2026-02-24T08:42:46.840Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Michael Hunger |  April 19, 2011 | 0 Comments
---

# Spring Data Graph 1.0 with Neo4j support released today

_Engineering | Michael Hunger |  April 19, 2011 | 0 Comments_

*This announcement post is a guest contribution by the developers of the Neo4j team that worked closely with SpringSource's Spring Data team to provide the Spring Data Graph integration library.*

[![Spring Data Graph Logo](http://blog.springsource.com/wp-content/uploads/2011/04/image02.png "Spring Data Graph Logo")](http://springsource.org/spring-data/neo4j)

*For a friendly introduction to Spring Data Graph we’re hosting a free [webinar](http://app.connect.vmware.com/e/es.aspx?s=524&e=18891291&elq=f06ea6af3abc4df6a06f327458e8dca0&sa=D&sntz=1&usg=AFQjCNH7JGeQTYbSnd8FZve4JWssFrGZMQ) with VMware presented by Neo Technology’s CEO Emil Eifrem on April 20 at two convenient times for the Americas and Europe. \[Update: The webinar [video](http://youtu.be/9qVs9vxx8lk) is now available on youtube in the [SpringSourceDev](http://www.youtube.com/user/SpringSourceDev) channel.\]*

Now that Spring is in the air, the [Neo4j](http://neo4j.org) and Spring Data teams are happy that almost a year’s worth of work has produced our [1.0 version](http://github.com/springsource/spring-data-graph) of the [Spring Data Graph](http://www.springsource.org/spring-data/neo4j) library. The [Spring Data](http://springsource.org/spring-data) project aims to bring the convenient programming model of the Spring Framework to [NOSQL](http://en.wikipedia.org/wiki/NoSQL_\(concept\)) databases. Spring Data Graph supports [graph databases](http://en.wikipedia.org/wiki/Graph_Database) within Spring Data and includes support for Neo4j as its first supported implementation.

The best way of getting to know Spring Data Graph is by using it, so we’d like to encourage you to read our [Spring Data Graph Guide Book](http://bit.ly/sdg-book), check out the [examples](http://github.com/springsource/spring-data-graph-examples) and [sources](http://github.com/springsource/spring-data-graph) on github and tell us what you think.

Spring Data Graph provides simple and convenient access to graph databases from any Spring application. Originally, Spring Data Graph was the brainchild of SpringSource CEO Rod Johnson and Neo Technology CEO Emil Eifrem. Together Rod and Emil refined the design philosophy, and some foundation technologies like AspectJ (used to transparently map POJOs to an underlying graph).

[![Graph Database Visualization](http://blog.springsource.com/wp-content/uploads/2011/04/image01.png "Graph Database Visualization")](http://wiki.neo4j.org/content/Neoclipse_Guide)

Spring Data Graph debuted publicly at a presentation at JAOO Aarhus 2010, when Rod invited Michael Hunger of Neo Technology to demonstrate cross-store persistence as part of his SpringSource presentation. Later in October there were several sessions at the SpringOne conference that discussed different aspects of the Spring Data and Spring Data Graph projects.

Throughout the last year, we’ve taken regular feedback from our community and have responded with frequent iterative releases, each release improving and extending the scope and functionality of the library. In all, we’ve built support for detached entities, in-graph type representation strategies, repository support and a Neo4jTemplate implementation. We’ve also developed preliminary support for Spring Roo as an add-on.

Here is an overview of Spring Data Graph features:

-   Support for property graphs (nodes connected via relationships, each with arbitrary properties)
-   Transparent mapping of annotated POJO entities
-   Neo4jTemplate with convenient API, exception translation and optional transaction management
-   Different type representation strategies for keeping type information in the graph
-   Dynamic type projections (duck typing)
-   Spring Data Commons Repositories Support
-   Cross-store support for partial JPA - Graph Entities
-   Neo4j Traversal support on dynamic fields and via repository methods
-   Neo4j Indexing support (including full-text and numeric range queries)
-   Support for JSR-303 (Bean Validation)
-   Support for the Neo4j Server
-   Support for running as extensions in the Neo4j Server

We’re very pleased with our Spring Data Graph Guide Book “[Good Relationships](http://bit.ly/sdg-book)” that comes as a [Duplex Book](http://martinfowler.com/bliki/DuplexBook.html) with a [narrative tutorial](http://bit.ly/sdg-html) and a [reference](http://bit.ly/sdg-html#reference), with forewords by both Rod and Emil.

[![cineasts.net](http://blog.springsource.com/wp-content/uploads/2011/04/image00.png "cineasts.net")](http://cineasts.net)

Another highlight is the social movie database [cineasts.net](http://cineasts.net) which is part of an extensive tutorial in building real-world systems with Spring and Spring Data Graph. The [cineasts.net](http://cineasts.net) application runs on the Spring Framework, Spring Data Graph and the Neo4j Graph Database, and uses movie data from the free and open [themoviedb.org](http://themoviedb.org).

Our community has also been busy building productive and interesting systems atop Spring Data Graph. For example Spring Data Graph has been used for a large and sophisticated energy market simulation at the Technical University of Delft.

Spring Data Graph is released under the Apache Software License. Its source code is hosted on [github](http://bit.ly/sdg-repo). Several examples can also be found [there](http://bit.ly/sdg-ex). [Issue tracker](http://jira.springsource.org/browse/DATAGRAPH) and [forums](http://forum.springsource.org/forumdisplay.php?f=80) are provided at [springsource.org](http://springsource.org). You can follow [@SpringData](http://twitter.com/SpringData) and [@Neo4j](http://twitter.com/Neo4j) on twitter and also subscribe to the [Neo4j mailing list](http://lists.neo4j.org/mailman/listinfo/user) for more information.

Thanks to all the people that supported the development of Spring Data Graph with their experience, skills and time!