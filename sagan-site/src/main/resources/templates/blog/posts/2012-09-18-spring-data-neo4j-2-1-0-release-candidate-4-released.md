---
title: Spring Data Neo4j 2.1.0 Release Candidate 4 released
source: https://spring.io/blog/2012/09/18/spring-data-neo4j-2-1-0-release-candidate-4-released
scraped: 2026-02-24T08:16:46.294Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Hunger |  September 18, 2012 | 0 Comments
---

# Spring Data Neo4j 2.1.0 Release Candidate 4 released

_Releases | Michael Hunger |  September 18, 2012 | 0 Comments_

Shortly before the Spring Data GA release train arrives, we would like to gather some feedback on fixes and updates in [Spring Data](http://springsource.org/spring-data/neo4j) - [Neo4j](http://neo4j.org). That's why we released an Release Candidate 4.

Here is a quick overview of the changes that made it into this release candidate, much longer than we intended to, but still very useful.

## Changes in version 2.1.0.RC4 (2012-08-19)

-   DATAGRAPH-296 Updates to stable versions of Neo4j 1.8.RC1, spatial, cypher-dsl and java-rest-binding, adopted to API changes
-   DATAGRAPH-285 adding application events for save and delete
-   DATAGRAPH-263, DATAGRAPH-212, DATAGRAPH-272, DATAGRAPH-147 refactored derived query creation, added support for multiple indexed fields and all query keywords
-   DATAGRAPH-294 derived finder methods for numerically indexed values
-   DATAGRAPH-293 find objects by graph-id
-   DATAGRAPH-275 non graceful fallback on empty graph for TypeRepresentationStrategyFactory
-   DATAGRAPH-246 allowing entity as parameter to derived finders
-   DATAGRAPH-281 Added support for Enums and Dates as parameters to Cypher

Just point your dependency version to `2.1.0.RC4`. For now the online resources have not been updated due to manual effort and time constraints. Those will be available for the 2.1.0.RELEASE.