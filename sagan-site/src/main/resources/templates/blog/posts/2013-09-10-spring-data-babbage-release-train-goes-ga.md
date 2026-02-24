---
title: Spring Data Babbage release train goes GA
source: https://spring.io/blog/2013/09/10/spring-data-babbage-release-train-goes-ga
scraped: 2026-02-24T07:58:47.605Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  September 10, 2013 | 0 Comments
---

# Spring Data Babbage release train goes GA

_Releases | Oliver Drotbohm |  September 10, 2013 | 0 Comments_

Dear Spring community, just in time for SpringOne 2013, we are happy to announce the availability of the GA version of the Spring Data release train code named Babbage. The release concludes the development of a pile of new features and improvements for the Spring Data Core, [JPA](http://projects.spring.io/spring-data-jpa/), [MongoDB](http://projects.spring.io/spring-data-mongodb/) and [Neo4j](http://projects.spring.io/spring-data-neo4j/) modules and will serve as foundation for upcoming releases of a bunch of community modules. Here are the most important features of the release.

## [](#general-upgrades--spring-data-commons)General upgrades / Spring Data Commons:

-   Spring 4 and JDK 8 compatibility improvements in Spring Data Core to leak into all modules
-   Extended `Pageable`/`Page` APIs
-   Advanced web and hypermedia integration for Spring MVC
-   Support for `count…By` in derived query method names of repositories
-   Upgrade to Querydsl 3.x timeline
-   Improved CDI extensions for all modules

## [](#spring-data-jpa)Spring Data JPA

-   Support for SpEL expressions in manually defined queries
-   Support for `TemporalType` on query parameter binding

## [](#spring-data-mongodb)Spring Data MongoDB

-   Support for the MongoDB aggregation framework
-   `FieldNamingStrategy` with a turn-key option for camel case abbreviation

## [](#spring-data-neo4j)Spring Data Neo4j

-   Upgrade to latest version of Neo4j
-   Performance improvements in the persistence metadata subsystem

For more information about the release content, have a look at the [Babbage wiki page](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Babbage) or the run the [JIRA query](https://jira.springsource.org/issues/?filter=14333) listing all of the over 200 tickets fixed in this release train.

This release concludes the work of the last 6 month and we're especially happy about the increased amount of community contributions that made it into the release train. The train will be part of the upcoming, orchestrated Spring IO platform release and serve as a foundation for the upcoming releases of the Spring Data community modules for Solr, Couchbase and Elasticsearch.