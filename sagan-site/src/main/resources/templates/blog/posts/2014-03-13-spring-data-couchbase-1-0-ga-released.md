---
title: Spring Data Couchbase 1.0 GA Released
source: https://spring.io/blog/2014/03/13/spring-data-couchbase-1-0-ga-released
scraped: 2026-02-24T07:37:25.790Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  March 13, 2014 | 0 Comments
---

# Spring Data Couchbase 1.0 GA Released

_Releases | Oliver Drotbohm |  March 13, 2014 | 0 Comments_

On behalf of [Michael Nitschinger](https://twitter.com/daschl), I'm happy to announce the 1.0 GA release of the Couchbase Spring Data module.

Between the last release candidate and the final release, several bugs have been fixed and new features have been added. Notable additions are the support for custom converters, JSR-303 Validation support and built-in support for temporal objects like Dates, Calendars and similar JodaTime variants.

The release artifacts are available via [Maven Central](http://search.maven.org/#artifactdetails%7Corg.springframework.data%7Cspring-data-couchbase%7C1.0.0.RELEASE%7Cjar). You can find the [reference documentation](http://docs.spring.io/spring-data/couchbase/docs/1.0.0.RELEASE/reference/htmlsingle), [JavaDoc](http://docs.spring.io/spring-data/couchbase/docs/1.0.0.RELEASE/api) and a [change log](http://docs.spring.io/spring-data/couchbase/docs/1.0.0.RELEASE/changelog.txt) at the usual expected places.

From now on, the Couchbase module will be part of the official Spring Data release trains, starting with [Dijkstra](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Dijkstra). Now that the first GA release is out of the door, we will put more focus on integrations with sister-projects like Spring Boot or Spring XD.