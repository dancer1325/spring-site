---
title: Spring Data Neo4j 2.1.0 Milestone 1 Released
source: https://spring.io/blog/2012/03/02/spring-data-neo4j-2-1-0-milestone-1-released
scraped: 2026-02-24T08:25:37.322Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Hunger |  March 02, 2012 | 0 Comments
---

# Spring Data Neo4j 2.1.0 Milestone 1 Released

_Releases | Michael Hunger |  March 02, 2012 | 0 Comments_

Dear Spring-NOSQL Community,

Since the last release of [Spring Data](http://springsource.org/spring-data/neo4j) - [Neo4j](http://neo4j.org) we worked on a number of issues that you raised as important improvements and extensions.

Thanks to Mark Spitzler, Oliver Gierke, Rajaram Ganeshan, Laurent Pireyn for their contributions and all the other community members for the feedback and discussions.

We want to encourage you to give it a try, especially the new things and send us your feedback.

We are aware of the of issues that are still open and want to address them by the 2.1 release which is planned for the end of March - aligned with Neo4j 1.7.

If you have any questions or suggestions don't hesitate to ask on the [Spring Forums](http://spring.neo4j.org/discussions), the [Neo4j Google Group](http://neo4j.org/forums) or by raising an issue in [JIRA](http://spring.neo4j.org/issues).

Please also check out the [Spring Data Neo4j Guidebook](http://www.infoq.com/minibooks/good-relationships-spring-data) on InfoQ. It is available as PDF and ePUB and soon also in print.

Enjoy!

## Changes in version 2.1.M1 (2012-03-02)

-   DATAGRAPH-181 added support for unique entities with template.getOrCreateNode and @Indexed(unique=true)
-   DATAGRAPH-198 added support for custom target type, e.g. storing a Date converted to a Long @GraphProperty(propertyType=Long.class)
-   DATAGRAPH-102 fixed type representation in graph with support for @TypeAlias to allow shorter type-identifiers in the graph
-   DATAGRAPH-204 pom.xml cleanup (repositories) and dependency to SFW is now range from 3.0.7.RELEASE - 3.2
-   DATAGRAPH-185 cypher queries for single fields return null on no results
-   DATAGRAPH-182 allow @RelatedTo on Single RelationshipEntity fields + internal refactorings
-   DATAGRAPH-202 provide a getRelationshipsBetween() method in Neo4jTemplate
-   GH-#34 Fix for using Neo4j High-Availability
-   DATAGRAPH-176 Added debug log output for cypher and gremlin query as well as derived query methods
-   DATAGRAPH-186 default value for readonly relationship collections
-   DATAGRAPH-173 fixed verify method for interfaces, added interface support for type-representation strategies
-   DATAGRAPH-169 Backquoting all variable parts of derived finder queries to accommodate for non-identifier names.
-   DATAGRAPH-164 Added methods to determine stored java type to neo4j-template and crud-repository
-   DATAGRAPH-166 fixed multiple sort parameters
-   documentation updates

Project resources: [Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Neo4j) | [Reference Card](http://spring.neo4j.org/notes) | [JavaDocs](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.M1/api/) | [Spring Data Neo4j Guide Book](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.M1/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.M1/changelog.txt) | [GitHub Repository](http://spring.neo4j.org/source)