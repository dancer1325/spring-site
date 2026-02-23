---
title: Spring Session Bean-M1 and Apple-SR4 Released
source: https://spring.io/blog/2018/08/17/spring-session-bean-m1-and-apple-sr4-released
scraped: 2026-02-23T15:16:33.328Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  August 17, 2018 | 0 Comments
---

# Spring Session Bean-M1 and Apple-SR4 Released

_Releases | Rob Winch |  August 17, 2018 | 0 Comments_

*This post was authored by [Vedran Pavić](https://github.com/vpavic)*

On behalf of the community I’m pleased to announce the releases of Spring Session BOM `Bean-M1` and `Apple-SR4`. Spring Boot users will be happy to learn that these release were picked up in recent `2.1.0.M1` and `2.0.4.RELEASE` releases of Spring Boot, respectively.

## [](#spring-session-bean-m1)[](#spring-session-code-bean-m1-code)Spring Session `Bean-M1`

The `Bean-M1` is first milestone release that is based on Spring Session `2.1.0.M1`.

The following table provides an overview of all the included modules and their respective versions:

Module

Version

Spring Session Core

`2.1.0.M1`

Spring Session Data GemFire

`2.0.3.RELEASE`

Spring Session Data Geode

`2.0.3.RELEASE`

Spring Session Data MongoDB

`2.0.2.RELEASE`

Spring Session Data Redis

`2.1.0.M1`

Spring Session Hazelcast

`2.1.0.M1`

Spring Session JDBC

`2.1.0.M1`

### [](#spring-session-210m1)[](#spring-session-code-2-1-0-m1-code)Spring Session `2.1.0.M1`

The `2.1.0.M1` is the first milestone release in `2.1.x` lifecycle. Highlights of this release are support for Same-Site Cookie, which is another mechanism that [helps developers to protect from Cross-Site Request Forgery](https://scotthelme.co.uk/csrf-is-dead/), and support for [`HttpSessionBindingListener`](https://javaee.github.io/javaee-spec/javadocs/javax/servlet/http/HttpSessionBindingListener.html). The release also includes the usual dependency upgrades, including picking up Spring Framework `5.1.0.RC1` as a baseline. You can find the complete details of the release in the [changelog](https://github.com/spring-projects/spring-session/milestone/29?closed=1).

### [](#using-the-bom)[](#using-the-bom)Using the BOM

With Maven:

```
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework.session</groupId>
			<artifactId>spring-session-bom</artifactId>
			<version>Bean-M1</version>
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
	id 'io.spring.dependency-management' version '1.0.6.RELEASE'
}

dependencyManagement {
	imports {
		mavenBom 'org.springframework.session:spring-session-bom:Bean-M1'
	}
}

dependencies {
	compile 'org.springframework.session:spring-session-data-redis'
	...
}
```

## [](#spring-session-apple-sr4)[](#spring-session-code-apple-sr4-code)Spring Session `Apple-SR4`

The `Apple-SR4` is a maintenance release includes an update of Spring Session core modules (which include Data Redis, Hazelcast and JDBC) to `2.0.5.RELEASE` and Spring Session Data Geode to `2.0.3.RELEASE`.

The following table provides an overview of all the included modules and their respective versions:

Module

Version

Spring Session Core

`2.0.5.RELEASE`

Spring Session Data GemFire

`2.0.3.RELEASE`

Spring Session Data Geode

`2.0.3.RELEASE`

Spring Session Data MongoDB

`2.0.2.RELEASE`

Spring Session Data Redis

`2.0.5.RELEASE`

Spring Session Hazelcast

`2.0.5.RELEASE`

Spring Session JDBC

`2.0.5.RELEASE`

### [](#spring-session-205release)[](#spring-session-code-2-0-5-release-code)Spring Session `2.0.5.RELEASE`

The `2.0.5.RELEASE` maintenance release contains a couple of bug fixes for reactive Redis session store, improved support for Hazelcast client-server topology as well as dependency upgrades. You can find the complete details of the release in the [changelog](https://github.com/spring-projects/spring-session/milestone/38?closed=1).

### [](#using-the-bom-1)[](#using-the-bom-2)Using the BOM

With Maven:

```
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework.session</groupId>
			<artifactId>spring-session-bom</artifactId>
			<version>Apple-SR4</version>
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
	id 'io.spring.dependency-management' version '1.0.6.RELEASE'
}

dependencyManagement {
	imports {
		mavenBom 'org.springframework.session:spring-session-bom:Apple-SR4'
	}
}

dependencies {
	compile 'org.springframework.session:spring-session-data-redis'
	...
}
```

[Project Page](https://projects.spring.io/spring-session/) | [Documentation](https://docs.spring.io/spring-session/docs/2.0.5.RELEASE/reference/html5/) | [GitHub](https://github.com/spring-projects/spring-session) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-session) | [Gitter](https://gitter.im/spring-projects/spring-session)