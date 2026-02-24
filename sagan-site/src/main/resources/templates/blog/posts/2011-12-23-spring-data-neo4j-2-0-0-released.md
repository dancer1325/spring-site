---
title: Spring Data Neo4j 2.0.0 Released
source: https://spring.io/blog/2011/12/23/spring-data-neo4j-2-0-0-released
scraped: 2026-02-24T08:29:14.371Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Michael Hunger |  December 23, 2011 | 0 Comments
---

# Spring Data Neo4j 2.0.0 Released

_Releases | Michael Hunger |  December 23, 2011 | 0 Comments_

### Dear Spring Developers and Graphistas,

We're happy to present you with the release of [Spring Data Neo4j 2.0](http://springsource.org/spring-data/neo4j) as a small Christmas gift from our side. Spring Data Neo4j is based on [Neo4j 1.6.M02](http://neo4j.org).

The major feature of this release is the addition of a [simple mapping mode](http://static.springsource.org/spring-data/data-graph/snapshot-site/reference/html/#reference:simple-mapping) (spring-data-neo4j). Just annotate your POJOs and use a [GraphRepository](http://static.springsource.org/spring-data/data-graph/snapshot-site/reference/html/#reference:programming-model:repositories) for the usual CRUD and advanced query operations.

For graph-attached POJOs and high performance use-cases, you can employ the [advanced mapping mode](http://static.springsource.org/spring-data/data-graph/snapshot-site/reference/html/#reference:aspectj) (spring-data-neo4j-aspects), which leverages AspectJ to enhance your domain class.

Both mapping modes use the same underlying code, which is now based on the [Spring Data Commons](http://springsource.org/spring-data/commons) mapping infrastructure.

We improved the [Cypher graph query language](http://video.neo4j.org/ybMbf/querying-stanley-kubrick-an-intro-to-cypher/) support by supporting new Cypher features, adding queries derived from finder-methods to the repositories and extended the result handling conversions to include projections to mapping-interfaces, Pages and more.

Besides also adding preliminary [geospatial support](http://static.springsource.org/spring-data/data-graph/snapshot-site/reference/html/#reference:spatial) provided by the Neo4j-spatial project, we also support new, type-safe [Cypher-DSL](http://rickardoberg.wordpress.com/2011/11/14/creating-a-dsl-for-cypher-graph-queries/) which can also be used in conjunction with [Query-DSL](http://www.querydsl.com/).

The [example project](http://spring.neo4j.org/examples) are now included with the main source tree so that they are always up-to-date. The [cineasts tutorial app](http://spring.neo4j.org/tutorial) is also included in the examples in 3 versions (simple mapping, advanced mapping, REST).

Thanks to the recent public availability of the Neo4j Add-On on [Heroku](http://addons.heroku.com/neo4j), we included a chapter on how to deploy a Spring Data Neo4j application into the Heroku cloud. Youll also find an accompanying example application called todos that is ready for deployment.

Special Thanks to *James* and *Werner* from Junisphere for all the code contributions and fixes.

In the last few weeks we got a lot more feedback on the [Spring Forums](http://spring.neo4j.org/discussions), on [JIRA](http://spring.neo4j.org/issues) and on the [Neo4j Mailing list](http://neo4j.org/forums). We used your help to remove bugs, improve behaviour and documentation. Thanks a lot to everyone who reported issues and contributed insights.

To learn more about Spring Data Neo4j make sure to watch the [introductory webinar](http://video.neo4j.org/YbYN/webinar-introduction-to-spring-data-neo4j/) by the project lead Michael Hunger and have a look at the extensive [guide book](http://spring.neo4j.org/guide). The [detailed presentation](http://www.infoq.com/presentations/Introduction-to-Spring-Data-Neo4j) from the Spring One conference is available on InfoQ.

And then please get your hands dirty and include [Spring Data Neo4j](http://spring.neo4j.org) in your holiday project which you could use to look at your domain with a fresh perspective.

Happy Holidays!  
The Spring-Data and Neo4j Team

Project resources:  
[Downloads](http://www.springsource.com/download/community?project=Spring%20Data%20Neo4j&version=2.0.0.RELEASE) | [Reference Card](http://spring.neo4j.org/notes) | [JavaDocs](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.RELEASE/api/) | [Spring Data Graph Guide Book](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.RELEASE/reference/html/) | [Changelog](http://static.springsource.org/spring-data/data-neo4j/docs/2.0.0.RELEASE/changelog.txt) | [GitHub Repository](http://spring.neo4j.org/source)