---
title: Spring Framework 4.0 RC2 available
source: http://spring.io/blog/2013/12/03/spring-framework-4-0-rc2-available
scraped: 2026-02-24T07:51:05.552Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Phil Webb |  December 03, 2013 | 0 Comments
---

# Spring Framework 4.0 RC2 available

_Releases | Phil Webb |  December 03, 2013 | 0 Comments_

Spring 4.0 RC2 has been released and is now available from the [SpringSource repository](http://github.com/spring-projects/spring-framework/wiki/Downloading-Spring-artifacts#wiki-resolving-spring-artifacts).

This will be the final release candidate before GA, so please give it a try and [let us know](https://jira.springsource.org) if you find any issues.

If you are [Maven](http://maven.apache.org/) user you may be interested in the new "bill of materials" POM that we have published with this release. You can import the `spring-framework-bom` project in your dependency management section to ensure that you get consistent Spring Framework dependencies. This is particularly useful when you work with other projects that may have transitive dependencies to earlier versions of Spring.

To use the BOM, add the following to your `<dependencyManagement>` section:

```xml
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-framework-bom</artifactId>
			<version>4.0.0.RC2</version>
			<type>pom</type>
			<scope>import</scope>
		</dependency>
	</dependencies>
</dependencyManagement>
```

You can then simply declare your usual Spring Framework dependencies without needing to specify a `<version>`:

```xml
Copy<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-context</artifactId>
</dependency>
```

Spring 4.0 GA is scheduled for release on December 12th so this really is your last chance to provide feedback!