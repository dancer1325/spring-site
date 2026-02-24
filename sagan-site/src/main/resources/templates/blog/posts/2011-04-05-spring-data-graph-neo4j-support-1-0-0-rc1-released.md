---
title: Spring Data Graph - Neo4j Support 1.0.0.RC1 Released
source: https://spring.io/blog/2011/04/05/spring-data-graph-neo4j-support-1-0-0-rc1-released
scraped: 2026-02-24T08:43:53.034Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  April 05, 2011 | 0 Comments
---

# Spring Data Graph - Neo4j Support 1.0.0.RC1 Released

_Releases | Thomas Risberg |  April 05, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the first release candidate (1.0.0.RC1) of the Spring Data Graph 1.0 project with Neo4j support is now available!

The primary goal of the **Spring Data** project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services.

The Graph Neo4j module provides integration with the [Neo4j](http://neo4j.org) graph database.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.RC1) | [JavaDocs](http://static.springsource.org/spring-data/data-graph/docs/1.0.0.RC1/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-graph/docs/1.0.0.RC1/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-graph/docs/1.0.0.RC1/changelog.txt)

To learn more about the project, visit the [Spring Neo4j Homepage](http://www.springsource.org/spring-data/neo4j).

The new features in Spring Data Graph 1.0.0.RC1 include:

-   replaced finders with composable spring-data-commons repositories
-   added rest-client support for consuming Neo4j-REST server with Spring Data Graph
-   re-added OSGi bundlor metainformation
-   relationship entity creation aligned to node entity creation
-   added TypeRepresentation Strategies for Relationships, enabling RelationshipEntity-Repositories
-   lots of performance improvements
-   fixed removal of relationship entities
-   added a GraphDatabase abstraction to be used with Neo4jTemplate
-   Neo4jTemplate API udpates
-   added aspect-introduced methods to NodeBacked and RelationshipBacked interfaces (with javadocs)
-   removed fullIndex annotation attribute
-   moved @Indexed annotation to org.springframework.data.graph.neo4j.annotation package
-   many documentation updates

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAGRAPH).

Here is a [link](http://blog.neo4j.org/2011/04/spring-data-graph-100rc1-released.html) to Michael Hunger's blog post on the Neo4j Blog.