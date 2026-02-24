---
title: Spring Data Elasticsearch 1.0 M1 Released
source: https://spring.io/blog/2014/02/11/spring-data-elasticsearch-1-0-m1-released
scraped: 2026-02-24T07:42:11.082Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 11, 2014 | 2 Comments
---

# Spring Data Elasticsearch 1.0 M1 Released

_Releases | Oliver Drotbohm |  February 11, 2014 | 2 Comments_

On behalf of the development team around [Mohsin Husen](https://twitter.com/mohsin_husen) at [BioMed Central](http://www.biomedcentral.com/) I am happy to announce the first milestone of the Spring Data Elasticsearch community module.

The release of the module implements the well-known Spring Data programming model on top of [Elasticsearch](http://www.elasticsearch.org/) includes support for dynamic mapping (nested type, object, parent child), index and search API, facets, highlighting, aliasing, more-like-this, scan & scroll etc.

From a Spring Data perspective this release features support for templates, repositories, CDI, Java and XML-style configuration. Entities will be automatically converted into JSON documents and indexed to Elasticsearch, which can be queried using template and repositories.

The artifacts are available in our [milestone repository](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-elasticsearch/1.0.0.M1/). The change log can be found [here](http://docs.spring.io/spring-data/elasticsearch/docs/1.0.0.M1/changelog.txt). Find out more about the on the project on its GitHub page: [https://github.com/spring-projects/spring-data-elasticsearch](https://github.com/spring-projects/spring-data-elasticsearch)