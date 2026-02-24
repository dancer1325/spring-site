---
title: Spring Data Neo4j 2.0.0.M1 Released
source: https://spring.io/blog/2011/10/21/spring-data-neo4j-2-0-0-m1-released
scraped: 2026-02-24T08:33:25.771Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Hunger |  October 21, 2011 | 0 Comments
---

# Spring Data Neo4j 2.0.0.M1 Released

_Releases | Michael Hunger |  October 21, 2011 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the [first milestone release](http://springsource.org/spring-data/neo4j) (2.0.0.M1) of the new Spring Data [Neo4j](http://neo4j.org) major version 2.0 is now available!

In the last few weeks the engineers have been busy transforming the existing library under a new name to make it fit for its presentation  
at [Spring One 2GX](http://www.springone2gx.com) next week.

A major internal refactoring split the framework into several submodules, each addressing a different concern.

-   spring-data-neo4j: Neo4jTemplate for easy, copying object-graph-mapping, and Spring Data Repositories using persistence entity meta information
-   spring-data-neo4j-aspects: transparent object-graph-mapping using AspectJ
-   spring-data-neo4j-cross-store: AspectJ based cross-store-persistence between JPA and Neo4j
-   spring-data-neo4j-rest: transparent access of a remote Neo4j REST-Server

As part of the refactoring, the source repository was also renamed and re-organized. The previously separated examples and the tutorial project [are now included directly in the same](http://cineasts.net) [github project](http://spring.neo4j.org/examples).

We are especially pleased that the support for Spring Data Commons Repositories has been extended so much, with the integration of derived finder methods and parameter passing to annotated queries. We also provided the means for integrating spatial queries with the advanced [Neo4j-Spatial library](https://github.com/neo4j/spatial).

At Spring One next week Platinum sponsor [Neo Technology](http://neotechnology.com) will hold a release party for Spring Data Neo4j 2.0, and then present two [talks](http://www.springone2gx.com/conference/chicago/2011/10/session?id=24028) covering the NOSQL landscape and the special place of Neo4j with Spring Data Neo4j.

We are looking forward to your feedback on the [forum](http://spring.neo4j.org/discussions) or in the [issue tracker](http://spring.neo4j.org/issues).

Project resources: [Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=2.0.0.M1) | [Reference Card](http://spring.neo4j.org/notes) | [JavaDocs](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.M1/api/) | [Spring Data Graph Guide Book](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.M1/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.M1/changelog.txt) | [GitHub Repository](http://spring.neo4j.org/source)