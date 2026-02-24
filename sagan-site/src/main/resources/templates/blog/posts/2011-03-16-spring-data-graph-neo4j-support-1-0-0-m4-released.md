---
title: Spring Data Graph - Neo4j Support 1.0.0.M4 Released
source: https://spring.io/blog/2011/03/16/spring-data-graph-neo4j-support-1-0-0-m4-released
scraped: 2026-02-24T08:44:42.178Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  March 16, 2011 | 0 Comments
---

# Spring Data Graph - Neo4j Support 1.0.0.M4 Released

_Releases | Thomas Risberg |  March 16, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that a new milestone release (1.0.0.M4) of the Spring Data Graph 1.0 project with Neo4j support is now available!

The primary goal of the **Spring Data** project is to make it easier to build Spring-powered applications that use new data access technologies such as non-relational databases, map-reduce frameworks, and cloud based data services.

The Graph Neo4j module provides integration with the [Neo4j](http://neo4j.org) graph database.

[Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=1.0.0.M4) | [JavaDocs](http://static.springsource.org/spring-data/data-graph/docs/1.0.0.M4/api/) | [Reference Documentation](http://static.springsource.org/spring-data/data-graph/docs/1.0.0.M4/reference/html/) | [Changelog](http://static.springframework.org/spring-data/data-graph/docs/1.0.0.M4/changelog.txt)

To learn more about the project, visit the [Spring Neo4j Homepage](http://www.springsource.org/spring-data/neo4j).

The new features in Spring Data Graph 1.0.0.M4 include:

-   update to Neo4j-1.3.M04
-   simplification of detached/attached state
-   all node entities are detached at creation, must call persist()
-   attach() renamed to persist()
-   separate indices per domain class
-   support for fulltext indices
-   fixed direct lookup of numerically indexed values
-   relationships via relateTo are now also restricted to one per type,direction and target
-   added EntityPath/EntityPathMapper for entity based Neo4jTemplate callbacks
-   added EntityEvaluator for entity based path evaluation
-   error handling for node type strategy called on non type nodes
-   FieldTraversalDescriptionBuilder build method parametrization
-   re-enabled, updated and fixed cross-store persistence
-   graph managed fields no longer have to be annotated with @Transient (the aspect takes care of that)
-   removed the need to mark graph managed fields with @Transient for a cross store entity
-   changed documentation format to guidebook, added tutorial as first part

Looking forward to your feedback on the [forum](http://forum.springsource.org/forumdisplay.php?f=80) or in the [issue tracker](https://jira.springsource.org/browse/DATAGRAPH).