---
title: First milestone of Spring Data release train Babbage arrived
source: https://spring.io/blog/2013/06/10/first-milestone-of-spring-data-release-train-babbage-arrived
scraped: 2026-02-24T08:04:06.243Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oliver Drotbohm |  June 10, 2013 | 0 Comments
---

# First milestone of Spring Data release train Babbage arrived

_Engineering | Oliver Drotbohm |  June 10, 2013 | 0 Comments_

I am pleased to announce the first service milestone release for the Spring Data release train named [Babbage](http://en.wikipedia.org/wiki/Babbage). It includes the following modules:

-   Spring Data Commons 1.6 M1 - [Changelog](http://static.springsource.org/spring-data/commons/docs/1.6.0.M1/changelog.txt)
-   Spring Data JPA 1.4 M1 - [Changelog](http://static.springsource.org/spring-data/jpa/docs/1.4.0.M1/changelog.txt)
-   Spring Data MongoDB 1.3 M1 - [Changelog](http://static.springsource.org/spring-data/mongodb/docs/1.3.0.M1/changelog.txt)
-   Spring Data Neo4j 2.3 M1 - [Changelog](http://static.springsource.org/spring-data/neo4j/docs/2.3.0.M1/changelog.txt)

The first milestone includes quite a few new features as well as all the bug fixes already released in the [service release for Arora](http://blog.springsource.org/2013/04/25/spring-data-arora-sr1-released/).

## A quick tour through the release

Most of the changes of this release have made it into Spring Data Commons to build a solid foundation for the next generation of Spring Data projects and make sure that foundation matures fastly. The other modules released in this train station have been adapted to these changes and thus benefit from them as well.

We've upgraded to Querydsl 3.x APIs to accomodate the changes introduced in their major release. The repositories abstraction has added support for ordering ignoring case as well as `count…By…(…)` projection for derived queries. We also gave the mapping metadata implementation a serious performance overhaul so that especially the MongoDB and Neo4j modules should see a ~20% performance increase for mapping operations.

Another big chunk of work went into the overhaul of the pagination and web support, especially in combination with Spring HATEOAS. Creating paginated resource representations for you Spring MVC controllers has never been easier, as you can see in the [reference documentation](http://static.springsource.org/spring-data/commons/docs/1.6.0.M1/reference/htmlsingle/#d0e896). The changes in Spring Data Commons are rounded off by some improvements in the CDI integration as well as the move of the `ChainedTransactionManager` from Spring Data Neo4j into the core module.

In Spring Data MongoDB we added support for customizing the field names through a global strategy and ship a `CamelCaseAbbreviatingFieldNamingStrategy` out of the box. We've introduced XML namespace elements for `MongoTemplate` and `GridFsTemplate`, added support for the background attributes for indexing and now also support `DBRef`s in `Map` values. The Neo4j module brings updates to the latest Neo4j and Cypher releases.

## Outlook

The next station for the release train will contain a few more new features in the store modules. We're currently working on support for the aggregation framework in MongoDB, CDI integration for the Neo4j module and much more. We'll also have Spring Data REST join the release train going forward as well as a few (new) community modules. For a high level overview of what's shipped and is coming, have a look at this [wiki page](https://github.com/SpringSource/spring-data-commons/wiki/Release-Train-Babbage). Suggestions, feedback and feature requests are always highly welcome in our [JIRA](jira.springsource.org/)s.