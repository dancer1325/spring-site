---
title: First Eclipse Gemini Blueprint Milestone Ships
source: https://spring.io/blog/2010/07/01/first-eclipse-gemini-blueprint-milestone-ships
scraped: 2026-02-24T08:56:10.766Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  July 01, 2010 | 0 Comments
---

# First Eclipse Gemini Blueprint Milestone Ships

_Engineering | Costin Leau |  July 01, 2010 | 0 Comments_

Hot on the heels of the [STS](http://blog.springsource.com/2010/07/01/sts-on-eclipse-3-6/) on Eclipse 3.6 and Gemini [Web](http://blog.springsource.com/2010/06/30/first-eclipse-gemini-web-milestone-ships/) milestone announcements, I am glad to report that the first milestone of Gemini Blueprint is available for [download](http://www.eclipse.org/gemini/blueprint/download). Part of the [Gemini](http://www.eclipse.org/gemini) project, Blueprint builds on top of the Spring Dynamic Modules v2 code base and is the Reference Implementation for the OSGi 4.2 Blueprint specification. Besides the changes reflecting the [transition](http://blog.springsource.com/2009/11/24/gemini-project-proposal-at-eclipse-org/) to the Eclipse Foundation, 1.0.0.M1 code base has been upgraded to the [latest](http://blog.springsource.com/2010/06/15/spring-framework-3-0-3-released/) Spring framework release. Gemini Blueprint is dual licensed under Apache [License](http://www.apache.org/licenses/LICENSE-2.0.html) and Eclipse Public [License](http://www.eclipse.org/legal/epl-v10.html).

While the migration of existing Spring DM applications to Gemini Blueprint should be straight forward, a [guide](http://www.eclipse.org/gemini/blueprint/documentation/migration/) has been made available to speed the process.

## Maven changes

Maven users can get a hold of the milestone from the zodiac repository:

```xml
Copy
  <repository>
    <id>zodiac-repository</id>
    <name>Zodiac Milestone Repository</name>
    <url>http://zodiac.springsource.com/maven/bundles/milestone </url>
  </repository>
```

Note that the groupId has changed from org.springframework.osgi to org.eclipse.gemini.blueprint and the artifactId from spring-osgi- *to gemini-blueprint-*. See belowan example on how the Maven dependency on Blueprint core (formerly Spring DM core) looks like under the new naming:

```xml
Copy
    <dependency>
      <groupId>org.eclipse.gemini.blueprint</groupId>
      <artifactId>gemini-blueprint-core</artifactId>
      <version>1.0.0.M1</version>
    </dependency>
```

Feedback is welcome!