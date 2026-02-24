---
title: Spring Data release train reaches RC station
source: https://spring.io/blog/2012/08/24/spring-data-release-train-reaches-rc-station
scraped: 2026-02-24T08:17:42.430Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  August 24, 2012 | 0 Comments
---

# Spring Data release train reaches RC station

_Releases | Oliver Drotbohm |  August 24, 2012 | 0 Comments_

Dear Spring community, I am pleased to announce the next Spring Data release train stop, including Spring Data JPA, MongoDB, Neo4j, Gemfire as well as its foundation Spring Data Commons. The release is the final one before bringing all the modules into GA state of their next major version. Here are the highlights:

**All modules**

-   Depend on Spring 3.1.2 by default. The modules are still fully compatible with Spring 3.0.7 but users have to manually declare Spring dependencies in they Maven pom.xml files if they'd like to use the older version. Note that some of the features included in this release (e.g. the usage of `@EnableRepositories`) require Spring 3.1.0 at least.

**Spring Data Book** We're currently working on a Spring Data book with O'Reilly, which is available [free for public review](http://ofps.oreilly.com/titles/9781449323950). If you would like to help shaping the book or maybe point people to a general introduction into Spring Data, feel free to spread the link.

**Spring Data Commons** - 1.4.0.RC1

-   Improvements in mapping metadata API

[Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-commons-core/1.4.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/data-commons/docs/1.4.0.RC1/api/) - [Reference documentation](http://static.springsource.org/spring-data/data-commons/docs/1.4.0.RC1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/data-commons/docs/1.4.0.RC1/changelog.txt)

**Spring Data JPA** - 1.2.0.RC1

-   General fixes and improvements

[Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-jpa/1.2.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/data-jpa/docs/1.2.0.RC1/api/) - [Reference documentation](http://static.springsource.org/spring-data/data-jpa/docs/1.2.0.RC1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/data-jpa/docs/1.2.0.RC1/changelog.txt)

**Spring Data MongoDB** - 1.1.0.RC1

-   Improved query mapping regarding `@DBRef` mapped properties
-   `AbstractMongoConfiguration.getMappingBasePackage()` defaults to config class' package

[Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-mongodb/1.1.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/data-mongodb/docs/1.1.0.RC1/api/) - [Reference documentation](http://static.springsource.org/spring-data/data-mongodb/docs/1.1.0.RC1/reference/html/) - [Changelog](http://static.springsource.org/spring-data/data-mongodb/docs/1.1.0.RC1/changelog.txt)

**Spring Data Neo4j** - 2.1.0.RC3

-   Updates to stable versions of Neo4j 1.8.M07, transaction manager compatibility (1.7 - 1.8)
-   Added support for `@EnableNeo4jRepositories`

[Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-neo4j/2.1.0.RC3/) - [JavaDocs](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.RC3/api/) - [Reference documentation](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.RC3/reference/html/) - [Changelog](http://static.springsource.org/spring-data/data-neo4j/docs/2.1.0.RC3/changelog.txt)

**Spring Data Gemfire** - 1.2.0.RC1

-   Project renamed to Spring Data Gemfire to align with other Spring Data projects.
-   Spring namespace support on par with cache.xml
-   Support for `@EnableGemfireRepositories`

[Maven artifacts](http://repo.springsource.org/libs-milestone/org/springframework/data/spring-data-gemfire/1.2.0.RC1/) - [JavaDocs](http://static.springsource.org/spring-data/gemfire/docs/1.2.0.RC1/api/) - [Reference documentation](http://static.springsource.org/spring-data/gemfire/docs/1.2.0.RC1/reference/html/) - [Changelog](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10462&version=12833)

The Spring data team is currently working on a book with O'Reilly. It is due to be released in autumn and can currently be reviewed at [OFPS](http://ofps.oreilly.com/titles/9781449323950). So if you'd like to get a general introduction to the project or even help shaping the book, give it a spin.

Along side the release candidates we released bugfix releases for Spring Data JPA (1.1.2.RELEASE) as well as MongoDB (1.0.4.RELEASE). Looking forward to your feedback in the [forums](http://forum.springsource.org) or the [bug tracker](https://jira.springsource.org).