---
title: Spring Session Apple SR3 Released
source: https://spring.io/blog/2018/06/14/spring-session-apple-sr3-released
scraped: 2026-02-23T15:22:33.919Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  June 14, 2018 | 0 Comments
---

# Spring Session Apple SR3 Released

_Releases | Rob Winch |  June 14, 2018 | 0 Comments_

*This post was authored by [Vedran Pavić](https://github.com/vpavic)*

On behalf of the community I’m pleased to announce the release of Spring Session BOM `Apple-SR3`. This release includes an update of Spring Session core modules (which include Data Redis, Hazelcast and JDBC) to `2.0.4.RELEASE`.

The following table provides an overview of all the included modules and their respective versions:

Module

Version

Spring Session Core

`2.0.4.RELEASE`

Spring Session Data GemFire

`2.0.2.RELEASE`

Spring Session Data Geode

`2.0.2.RELEASE`

Spring Session Data MongoDB

`2.0.2.RELEASE`

Spring Session Data Redis

`2.0.4.RELEASE`

Spring Session Hazelcast

`2.0.4.RELEASE`

Spring Session JDBC

`2.0.4.RELEASE`

### [](#spring-session)[](#spring-session)Spring Session

The `2.0.4.RELEASE` maintenance release contains a couple of bug fixes for Hazelcast and JDBC session stores, as well as dependency upgrades. You can find the complete details of the release in the [changelog](https://github.com/spring-projects/spring-session/milestone/37?closed=1).

# [](#using-the-bom)[](#using-the-bom)Using the BOM

With Maven:

```
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework.session</groupId>
			<artifactId>spring-session-bom</artifactId>
			<version>Apple-SR3</version>
			<type>pom</type>
			<scope>import</scope>
		</dependency>
	</dependencies>
</dependencyManagement>
<dependencies>
	<dependency>
		<groupId>org.springframework.session</groupId>
		<artifactId>spring-session-data-redis</artifactId>
	</dependency>
	...
</dependencies>
```

With Gradle:

```
Copyplugins {
	id 'io.spring.dependency-management' version '1.0.5.RELEASE'
}

dependencyManagement {
	imports {
		mavenBom 'org.springframework.session:spring-session-bom:Apple-SR3'
	}
}

dependencies {
	compile 'org.springframework.session:spring-session-data-redis'
	...
}
```

[Project Page](https://projects.spring.io/spring-session/) | [Documentation](https://docs.spring.io/spring-session/docs/2.0.4.RELEASE/reference/html5/) | [GitHub](https://github.com/spring-projects/spring-session) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-session) | [Gitter](https://gitter.im/spring-projects/spring-session)