---
title: Spring Data Graph - Neo4j Support 1.0.0.M5 Released
source: https://spring.io/blog/2011/03/25/spring-data-graph-neo4j-support-1-0-0-m5-released
scraped: 2026-02-24T08:44:20.161Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  March 25, 2011 | 0 Comments
---

# Spring Data Graph - Neo4j Support 1.0.0.M5 Released

_Releases | Thomas Risberg |  March 25, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that a new milestone release (1.0.0.M5) of the Spring Data Graph 1.0 project with Neo4j support is now available!

The primary goal of the **Spring Data** project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services.

The Graph Neo4j module provides integration with the [Neo4j](http://neo4j.org) graph database.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M5) | [JavaDocs](http://static.springsource.org/spring-data/data-graph/docs/1.0.0.M5/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-graph/docs/1.0.0.M5/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-graph/docs/1.0.0.M5/changelog.txt)

To learn more about the project, visit the [Spring Neo4j Homepage](http://www.springsource.org/spring-data/neo4j).

The new features in Spring Data Graph 1.0.0.M5 include:

-   fixed docbook build to include images
-   added tutorial section to book
-   clarified in documentation what AspectJ does
-   fail on startup if transaction manager is misconfigured
-   fail early at runtime if 1:N field is missing the RelatedTo.elementClass
-   added new default NodeTypeStrategy based on indexing
-   fixed Bacon path issue in IMDB example
-   fixed bug with stale EntityManagers in a cross-store scenario
-   @NodeEntities are no longer @Configurable
-   update to Neo4j 1.3.M05, AspectJ 1.6.11.RELEASE
-   better integration support for Neo4j Server unmanaged extensions
-   made type attribute of @RelatedTo optional
-   many performance improvements
-   ability to register StateBackedCreators to NodeEntityInstantiator to forgo instantiation via reflection
-   fixed test context leakage into other tests via aspects, added cleaning TestExecutionListener

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAGRAPH).