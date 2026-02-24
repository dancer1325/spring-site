---
title: Spring Data Neo4j 2.1.0 Release Candidate 1 Released
source: https://spring.io/blog/2012/05/07/spring-data-neo4j-2-1-0-release-candidate-1-released
scraped: 2026-02-24T08:23:18.151Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Hunger |  May 07, 2012 | 0 Comments
---

# Spring Data Neo4j 2.1.0 Release Candidate 1 Released

_Releases | Michael Hunger |  May 07, 2012 | 0 Comments_

Dear Spring-NOSQL Community,

The new Release Candidate 1 of [Spring Data](http://springsource.org/spring-data/neo4j) - [Neo4j](http://neo4j.org) comes with a number of long requested improvements and additions.

First of all, SDN has been updated to [Neo4j 1.7.GA](http://blog.neo4j.org/2012/04/neo4j-17-ga-bastutrask-bank-released.html) which includes operational improvements and new grammar to the Cypher graph query language. To complement the added language features, this release of SDN integrates a new version of the cypher-dsl with an improved API.

By popular request, support for not only unique node entities but also for relationships is now available. This works using either the remote REST-Server or an embedded Neo4j database.

Spring Data Neo4j was refactored to streamline the internal setup allowing you to construct Neo4j-Template instance directly.

If you have any questions or suggestions don't hesitate to ask on the [Spring Forums](http://spring.neo4j.org/discussions), the [Neo4j Google Group](http://neo4j.org/forums) or by raising an issue in [JIRA](http://spring.neo4j.org/issues).

Please also check out the [Spring Data Neo4j Guidebook](http://www.infoq.com/minibooks/good-relationships-spring-data) on InfoQ. It is available as PDF and ePUB and soon also in print.

Enjoy!

## Changes in version 2.1.RC1 (2012-05-07)

-   DATAGRAPH-228 update to Neo4j 1.7, SD-Commons 1.3.0.RC2, Neo4j-Spatial 0.8, Neo4j-Java-Rest-Binding 1.7
-   DATAGRAPH-206 Neo4jTemplate can now also be instantiated directly, MappingInfrastructureFactoryBean takes care of providing dependencies
-   DATAGRAPH-219, DATAGRAPH-210 unique relationships with annotation and via template, and documentation for unique entities
-   DATAGRAPH-221 indexed needed by the persistent entities are now created upfront by an MappingContextListener to satisfy cypher checks
-   DATAGRAPH-214 numeric fields can be indexed non-numerically
-   DATAGRAPH-181 fix for creating unique entities with numeric unique fields
-   DATAGRAPH-213 support inheritance (querying) of relationship-entities

Project resources: [Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Neo4j) | [Reference Card](http://spring.neo4j.org/notes) | [JavaDocs](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.RC1/api/) | [Spring Data Neo4j Guide Book](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.RC1/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.RC1/changelog.txt) | [GitHub Repository](http://spring.neo4j.org/source)