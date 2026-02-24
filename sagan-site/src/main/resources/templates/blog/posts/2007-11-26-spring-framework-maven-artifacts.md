---
title: Spring Framework Maven Artifacts
source: https://spring.io/blog/2007/11/26/spring-framework-maven-artifacts
scraped: 2026-02-24T09:23:25.092Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  November 26, 2007 | 0 Comments
---

# Spring Framework Maven Artifacts

_Engineering | Ben Hale |  November 26, 2007 | 0 Comments_

By [popular demand](http://opensource.atlassian.com/projects/spring/browse/SPR-3229), the Spring Framework Maven artifacts are now being uploaded to the Spring Snapshot Maven Repository. You can find details about all of the Spring Portfolio Maven repositories in my [previous post](http://blog.interface21.com/main/2007/09/18/maven-artifacts-2) but I'll reprint the details for the Spring snapshot repository here.

The Spring Snapshot Maven Repository is located at [http://s3.amazonaws.com/maven.springframework.org/snapshot](http://s3.amazonaws.com/maven.springframework.org/snapshot). Using this repository requires you to add an entry to the <repositories/> element in your POM. It should look like this:

```xml
Copy
<repository>
    <id>spring-snapshot</id>
    <name>Spring Portfolio Snapshot Repository</name>
    <url>http://s3.amazonaws.com/maven.springframework.org/snapshot</url>
</repository>
```

The artifacts in this repository **do not** follow expected repository behaviors and will be removed regularly. At least the last 10 snapshot builds for a given artifact will be retained. If an artifact is removed from a distribution its snapshot builds will be removed immediately. On the release of a milestone or a final release, all snapshots for an artifact will be removed and a new snapshot for the next release created.