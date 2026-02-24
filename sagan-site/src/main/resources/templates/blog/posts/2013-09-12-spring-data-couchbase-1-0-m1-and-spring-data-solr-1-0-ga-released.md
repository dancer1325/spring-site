---
title: Spring Data Couchbase 1.0 M1 and Spring Data Solr 1.0 GA released
source: https://spring.io/blog/2013/09/12/spring-data-couchbase-1-0-m1-and-spring-data-solr-1-0-ga-released
scraped: 2026-02-24T07:58:13.187Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  September 12, 2013 | 0 Comments
---

# Spring Data Couchbase 1.0 M1 and Spring Data Solr 1.0 GA released

_Releases | Oliver Drotbohm |  September 12, 2013 | 0 Comments_

Hot on the heals of the Spring Data Babbage GA release I am happy to announce the availability of two community driven Spring Data modules, namely the first milestone of Spring Data Couchbase lead by Michael Nitschinger and the 1.0 GA of Spring Data Solr lead by Christoph Strobl.

The first milestone release of the Couchbase module contains lots of features that allow you to build content driven and scalable applications on top of Couchbase and spring-data very quickly. This release features support for templates, repositories, Java and XML-style configuration. Entities are automatically converted into JSON documents, which can be queried from Couchbase and exported through scalable map/reduce views. In addition to that, the release contains support for `@Cacheable` annotations, which allow you to cache any kind of binary data (for example serialized java objects) inside Couchbase in a transparent manner.

Find more on that on the project on the [project website](https://github.com/spring-projects/spring-data-couchbase).

The Spring Data Solr GA release is also based on the latest core release in Babbage. The release concludes a trail of milestones and release candidates and finally adds these bits and pieces:

-   Boost query terms via `@Boost`
-   Support for `@Highlight` and `@Facet`
-   Extensible document converter
-   Enhanced multicore support

For the full release information have a look at the [changelog](http://docs.spring.io/spring-data/data-solr/docs/current/changelog.txt) and on the [project website](https://github.com/spring-projects/spring-data-solr).