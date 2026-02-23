---
title: Spring Session Apple SR2
source: https://spring.io/blog/2018/05/08/spring-session-apple-sr2
scraped: 2026-02-23T15:26:03.836Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  May 08, 2018 | 1 Comment
---

# Spring Session Apple SR2

_Releases | Rob Winch |  May 08, 2018 | 1 Comment_

On behalf of the community I’m pleased to announce the release of Spring Session BOM `Apple-SR2`. This release includes an update to the [core modules](https://github.com/spring-projects/spring-session/issues?q=is%3Aclosed+milestone%3A2.0.3) and adds support for [Spring Session for Apache Geode](https://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.2.RELEASE/reference/html5/). You can use the BOM

With Maven:

```
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework.session</groupId>
			<artifactId>spring-session-bom</artifactId>
			<version>Apple-SR2</version>
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
		mavenBom 'org.springframework.session:spring-session-bom:Apple-SR2'
	}
}

dependencies {
	compile 'org.springframework.session:spring-session-data-redis'
	...
}
```

[Project Page](https://projects.spring.io/spring-session/) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-session) | [Gitter](https://gitter.im/spring-projects/spring-session)