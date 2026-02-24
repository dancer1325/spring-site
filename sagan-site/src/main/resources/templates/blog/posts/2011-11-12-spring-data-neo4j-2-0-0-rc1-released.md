---
title: Spring Data Neo4j 2.0.0.RC1 released
source: https://spring.io/blog/2011/11/12/spring-data-neo4j-2-0-0-rc1-released
scraped: 2026-02-24T08:32:27.212Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Hunger |  November 12, 2011 | 0 Comments
---

# Spring Data Neo4j 2.0.0.RC1 released

_Releases | Michael Hunger |  November 12, 2011 | 0 Comments_

Dear Spring Community,  

The [Spring Data Team](http://springsource.org/spring-data/neo4j) and [Neo Technology](http://neotechnology.com) have just released the Release Candidate 1 of [Spring Data Neo4j](http://spring.neo4j.org), the integration library for [Neo4j](http://neo4j.org) the Enterprise NOSQL database.

Integrating the feedback from the very successful [SpringOne 2011](http://springone2gx.com/conference/chicago/2011/10/session?id=24028) and our [community](http://spring.neo4j.org/discussions) we exended the previous Milestone release with new functionality and took care of reported issues.

If you'd like to get an Introduction to Spring Data Neo4j, watch out for our [presentations/webinars](http://spring.neo4j.org/presentations).

### Changes

-   Updated Neo4j to 1.5 AspectJ to 1.6.12
-   Added repository support for the new [Cypher-DSL](http://github.com/neo4j/cypher-dsl) (1.5.M1) (with [QueryDSL](http://www.querydsl.com/) support)
-   Updated cypher syntax changes for 1.5
-   Extended result-handling-dsl to allow changes of container classes
-   Added examples for hello-worlds and cypher for both mapping options
-   @RelationshipEntity has an fallback relationship-type attribute
-   Support for (mutable) @RelatedToVia collections (like Set)
-   Relationship-Entities can now be directly instantiated and persisted
-   Introduced the concept of a MappingPolicy for the POJO mapping mode (currently @Fetch)
-   Simplified cineasts using annotated and derived queries on repositories
-   Added repository for access of relationship-related methods
-   Improved support for collection properties
-   List, Set, Collection, Page as return types on derived and annotated query methods

This is the last step before the final release of the new major version, so we're looking for even more feedback to provide an excellent GA release of Spring Data Neo4j. Please provide it in the [forum](http://spring.neo4j.org/discussions) or the [issue tracker](http://spring.neo4j.org/issues).

Project resources: [Downloads](http://www.springsource.com/download/community?project=Spring%20Data&version=2.0.0.RC1) | [Reference Card](http://spring.neo4j.org/notes) | [JavaDocs](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.RC1/api/) | [Spring Data Graph Guide Book](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.RC1/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.RC1/changelog.txt) | [GitHub Repository](http://spring.neo4j.org/source)