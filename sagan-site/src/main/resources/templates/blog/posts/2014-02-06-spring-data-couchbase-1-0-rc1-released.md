---
title: Spring Data Couchbase 1.0 RC1 released
source: https://spring.io/blog/2014/02/06/spring-data-couchbase-1-0-rc1-released
scraped: 2026-02-24T07:42:51.599Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  February 06, 2014 | 0 Comments
---

# Spring Data Couchbase 1.0 RC1 released

_Releases | Oliver Drotbohm |  February 06, 2014 | 0 Comments_

On behalf of [Michael Nitschinger](https://twitter.com/daschl) I'm pleased to announce the availability of the first release candidate of the Spring Data module for Couchbase.

The highlights of this release are (usual bugfixes and stability improvements aside) the support for custom repository queries backed by views, the possibility to customize view queries through the `@View` annotation and `@Version` support on entities for optimistic locking. Also - when XML configs are used - the beans can now be configured through SpEL expressions. This RC1 release is available from the [Spring IO milestone repository](http://repo.spring.io/libs-milestone/org/springframework/data/spring-data-couchbase/1.0.0.RC1/). The complete changelog can be found [here](http://docs.spring.io/spring-data/couchbase/docs/1.0.0.RC1/changelog.txt).

Since we are now feature complete for the 1.0 GA version, we are now concentrating on performance, stability and documentation. Let us know about any bugs found so we can fix them before the final release.

If you want to learn more about Couchbase in general and the Spring Data Couchbase module in particular, join Michael Nitschinger's [webinar](http://info.couchbase.com/webinar-couchbase-springdata-feb-2014.html) on February 27th.

Fore more project specific information please see the project page at [https://github.com/spring-projects/spring-data-couchbase](https://github.com/spring-projects/spring-data-couchbase).