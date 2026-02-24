---
title: Spring Data Graph 1.1.0.M2 with Neo4j support Released
source: https://spring.io/blog/2011/07/20/spring-data-graph-1-1-0-m2-with-neo4j-support-released
scraped: 2026-02-24T08:38:24.071Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  July 20, 2011 | 0 Comments
---

# Spring Data Graph 1.1.0.M2 with Neo4j support Released

_Releases | Thomas Risberg |  July 20, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that a new milestone release (1.1.0.M2) of the Spring Data Graph project with Neo4j support is now available!

The primary goal of the **Spring Data** project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services.

The Graph Neo4j module provides integration with the [Neo4j](http://neo4j.org) graph database. Back in 2010, Rod Johnson and Emil Eifrem started brainstorming about Spring and Neo4j integration including transparent persistence and cross-store support. After an initial prototype it has been further developed in close cooperation between the VMware and Neo Technology development teams.

To learn more about the project, visit the [Spring Data Graph Project Homepage](http://www.springsource.org/spring-data/neo4j).

The key changes in the Spring Data Graph 1.1.0.M2 milestone release include:

-   updated dependency to Neo4j 1.4
-   API updates to Neo4j 1.4 changes
-   repackaging to org.springframework.data.neo4j.\*
-   added cypher queries to Neo4j-Template
-   Neo4j-Template API overhaul
-   fluent query, traversal, lookup methods in the Neo4j-Template
-   Integrated remote REST-Cypher Plugin
-   fixed lingering client connections for the REST module (ClientResponse.close())
-   fixed NotFoundException with GraphRepository.exists()

We are looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAGRAPH).

Project resources: [Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Neo4j) | [JavaDocs](http://static.springsource.org/spring-data/data-graph/docs/1.1.0.M2/api/) | [Spring Data Graph Guide Book](http://static.springsource.org/spring-data/data-graph/docs/1.1.0.M2/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-graph/docs/1.1.0.M2/changelog.txt)