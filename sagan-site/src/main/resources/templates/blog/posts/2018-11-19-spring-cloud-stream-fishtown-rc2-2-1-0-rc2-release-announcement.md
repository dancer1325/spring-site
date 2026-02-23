---
title: Spring Cloud Stream Fishtown.RC2 /2.1.0.RC2 Release Announcement
source: https://spring.io/blog/2018/11/19/spring-cloud-stream-fishtown-rc2-2-1-0-rc2-release-announcement
scraped: 2026-02-23T15:06:56.179Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  November 19, 2018 | 0 Comments
---

# Spring Cloud Stream Fishtown.RC2 /2.1.0.RC2 Release Announcement

_Engineering | Oleg Zhurakousky |  November 19, 2018 | 0 Comments_

We are pleased to announce the second Release Candidate of the Spring Cloud Stream Fishtown release train - Fishtown.RC2/2.1.0.RC2.

Spring Cloud Stream Fishtown 2.1.0.RC2 is available for use in the [Spring Milestone](http://repo.spring.io/libs-milestone-local/org/springframework/cloud/spring-cloud-stream/2.1.0.RC2/) repository.

As a follow up to 2.0.0.RC2, this release primarily encompasses minor enhancements and bug fixes. As it stands now this should be the final Release Candidate before General Availability release 2.0.0.RELEASE in several weeks.

> NOTE:

If the applications are created from Spring Initializr, they need to add this BOM snippet in maven dependency management before the spring-cloud BOM declaration, otherwise you'll end up with the latest snapshot:

```
Copy<dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-stream-dependencies</artifactId>
           <version>Fishtown.RC2</version>
           <type>pom</type>
           <scope>import</scope>
</dependency>
```

#### [](#next-steps)Next Steps

As always, we welcome feedback and contributions, so please reach out to us on [Stackoverflow](https://stackoverflow.com/questions/tagged/spring-cloud-stream) or [GitHub](https://github.com/spring-cloud/spring-cloud-stream/) or via [Gitter](https://gitter.im/spring-cloud/spring-cloud-stream).