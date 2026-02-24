---
title: First Release Candidate of Spring Data Release Train Evans Available
source: https://spring.io/blog/2014/08/13/first-release-candidate-of-spring-data-release-train-evans-available
scraped: 2026-02-23T22:17:51.604Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Christoph Strobl |  August 13, 2014 | 0 Comments
---

# First Release Candidate of Spring Data Release Train Evans Available

_Releases | Christoph Strobl |  August 13, 2014 | 0 Comments_

We are happy to announce the first release candidate of the Spring Data release train [Evans](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Evans). We ship the following modules:

-   Spring Data Commons 1.9 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-commons/1.9.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/commons/docs/1.9.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/commons/docs/1.9.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/commons/docs/1.9.0.RC1/changelog.txt)
-   Spring Data JPA 1.7 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-jpa/1.7.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/jpa/docs/1.7.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/jpa/docs/1.7.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/jpa/docs/1.7.0.RC1/changelog.txt)
-   Spring Data MongoDB 1.6 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-mongodb/1.6.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/mongodb/docs/1.6.0.RC1/changelog.txt)
-   Spring Data Neo4j 3.2 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-neo4j/3.2.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/neo4j/docs/3.2.0.RC1/changelog.txt)
-   Spring Data Solr 1.3 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-solr/1.3.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/solr/docs/1.3.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/solr/docs/1.3.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/solr/docs/1.3.0.RC1/changelog.txt)
-   Spring Data Couchbase 1.2 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/1.2.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/couchbase/docs/1.2.0.RC1/changelog.txt)
-   Spring Data Cassandra 1.1 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-cassandra/1.1.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/cassandra/docs/1.1.0.RC1/changelog.txt)
-   Spring Data Elasticsearch 1.1 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/1.1.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/elasticsearch/docs/1.1.0.RC1/changelog.txt)
-   Spring Data Gemfire 1.5 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-gemfire/1.5.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/gemfire/docs/1.5.0.RC1/changelog.txt)
-   Spring Data Redis 1.4 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-redis/1.4.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/redis/docs/1.4.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/redis/docs/1.4.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/redis/docs/1.4.0.RC1/changelog.txt)
-   Spring Data REST 2.2 RC1 - [Artifacts](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-rest-webmvc/2.2.0.RC1) - [JavaDocs](http://docs.spring.io/spring-data/rest/docs/2.2.0.RC1/api) - [Documentation](http://docs.spring.io/spring-data/rest/docs/2.2.0.RC1/reference/html) - [Changelog](http://docs.spring.io/spring-data/rest/docs/2.2.0.RC1/changelog.txt)

Some of the highlights that happened since the [first milestone](https://spring.io/blog/2014/07/10/first-milestone-of-spring-data-release-train-evans-available) are:

-   Enhanced [multistore support](https://jira.spring.io/browse/DATACMNS-526) in case you want to use different stores side by side.
-   Support for [custom repository implementations when using CDI](https://jira.spring.io/browse/DATACMNS-557).
-   Text search integration for MongoDB repositories.
-   [Configuration options](https://github.com/spring-projects/spring-data-redis/blob/fd361a186899c2aef124d2801fb78ef733d05baa/src/main/java/org/springframework/data/redis/connection/jedis/JedisConnectionFactory.java#L119) for Redis sentinels.
-   [Geo queries](https://jira.spring.io/browse/DATAES-89) for Elasticsearch.
-   We moved the reference documentation from Docbook to Asciidoctor.

Overall [95 tickets](https://jira.spring.io/issues/?filter=14750) have be processed so make sure you've booked your place for [SpringOne](http://springone2gx.com/) in Dallas to find out firsthand what's new in Spring Data. Meanwhile watch out for upcoming blog posts on selected features of this release. The [release train wiki page](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Evans) might be a good start to find out about relevant new stuff as well.

Got questions? Have feedback? Found a bug? Don't hesitate to contact us! We're looking forward to getting in touch via [Twitter](http://twitter.com/springdata), [StackOverflow](http://stackoverflow.com/questions/tagged/spring-data) or [JIRA](http://jira.spring.io).