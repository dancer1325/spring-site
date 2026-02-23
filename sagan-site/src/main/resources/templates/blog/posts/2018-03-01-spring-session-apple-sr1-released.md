---
title: Spring Session Apple SR1 Released
source: https://spring.io/blog/2018/03/01/spring-session-apple-sr1-released
scraped: 2026-02-23T16:07:07.338Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  March 01, 2018 | 0 Comments
---

# Spring Session Apple SR1 Released

_Releases | Rob Winch |  March 01, 2018 | 0 Comments_

*This post was authored by [Vedran Pavić](https://github.com/vpavic)*

On behalf of the community I’m pleased to announce the release of Spring Session BOM `Apple-SR1`. With the changes to Spring Session modules described in [`2.0.0.RELEASE` announcement](https://spring.io/blog/2018/01/16/spring-session-2-0-0-released#spring-session-modules), the addition of [bill of materials](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html#Importing_Dependencies) (BOM) module was a logical next step.

Note

The originally released `Apple-RELEASE` contained a glitch in published BOM so make sure you use `Apple-SR1`.

The BOM provides dependency management for Spring Session core modules (which include Data Redis, Hazelcast and JDBC) and Spring Session Data MongoDB. The following table provides an overview of all the included modules and their respective versions:

Module

Version

Spring Session Core

`2.0.2.RELEASE`

Spring Session Data MongoDB

`2.0.2.RELEASE`

Spring Session Data Redis

`2.0.2.RELEASE`

Spring Session Hazelcast

`2.0.2.RELEASE`

Spring Session JDBC

`2.0.2.RELEASE`

### [](#spring-session)[](#spring-session)Spring Session

The `2.0.2.RELEASE` maintenance release contains a few bug fixes and dependency upgrades. You can find the complete details of the release in the [changelog](https://github.com/spring-projects/spring-session/milestone/32?closed=1).

[GitHub](https://github.com/spring-projects/spring-session) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Documentation](https://docs.spring.io/spring-session/docs/2.0.2.RELEASE/reference/html5/)

### [](#spring-session-data-mongodb)[](#spring-session-data-mongodb)Spring Session Data MongoDB

The `2.0.2.RELEASE` maintenance release contains Jackson serialization support improvements and dependency upgrades.

[GitHub](https://github.com/spring-projects/spring-session-data-mongodb) | [Issues](https://github.com/spring-projects/spring-session-data-mongodb/issues) | [Documentation](https://docs.spring.io/spring-session-data-mongodb/docs/2.0.2.RELEASE/reference/htmlsingle/)

# [](#using-the-bom)[](#using-the-bom)Using the BOM

With Maven:

```
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework.session</groupId>
			<artifactId>spring-session-bom</artifactId>
			<version>Apple-SR1</version>
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
	id 'io.spring.dependency-management' version '1.0.4.RELEASE'
}

dependencyManagement {
	imports {
		mavenBom 'org.springframework.session:spring-session-bom:Apple-SR1'
	}
}

dependencies {
	compile 'org.springframework.session:spring-session-data-redis'
	...
}
```

[Project Page](https://projects.spring.io/spring-session/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-session) | [Gitter](https://gitter.im/spring-projects/spring-session)