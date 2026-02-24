---
title: Spring Data Graph 1.0 with Neo4j support released
source: https://spring.io/blog/2011/04/18/spring-data-graph-1-0-with-neo4j-support-released
scraped: 2026-02-24T08:42:51.237Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Hunger |  April 18, 2011 | 0 Comments
---

# Spring Data Graph 1.0 with Neo4j support released

_Releases | Michael Hunger |  April 18, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the [first release](http://github.com/springsource/spring-data-graph) (1.0.0.RELEASE) of the Spring Data Graph 1.0 project with [Neo4j](http://neo4j.org) support is now available! This marks the first in a series of releases of the Spring Data subprojects over the next few months.

The primary goal of the [Spring Data](/spring-data) project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services.

A guest blog post detailing the release has been published on the [SpringSource Blogs](http://blog.springsource.com/2011/04/18/spring-data-graph-1-0-neo4j-support-released).

The Graph Neo4j module provides integration with the [Neo4j](http://neo4j.org) graph database. Back in 2010, Rod Johnson and Emil Eifrem started brainstorming about Spring and Neo4j integration including transparent persistence and cross-store support. After an initial prototype it has been further developed in close cooperation between the VMware and Neo Technology development teams.

To learn more about the project, visit the [Spring Data Graph Project Homepage](http://www.springsource.org/spring-data/neo4j) and make sure to attend the webinar "[Getting Started With Spring Data Graph"](http://app.connect.vmware.com/e/es.aspx?s=524&e=18891291&elq=f06ea6af3abc4df6a06f327458e8dca0&sa=D&sntz=1&usg=AFQjCNH7JGeQTYbSnd8FZve4JWssFrGZMQ) hosted by VMware and presented by Neo Technology's CEO Emil Eifrem.

The key features in Spring Data Graph 1.0.0.RELEASE include:

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

We are looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAGRAPH).

Project resources: [Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.RELEASE) | [JavaDocs](http://static.springsource.org/spring-data/data-graph/docs/1.0.0.RELEASE/api/) | [Spring Data Graph Guide Book](http://static.springsource.org/spring-data/data-graph/docs/1.0.0.RELEASE/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-graph/docs/1.0.0.RELEASE/changelog.txt)