---
title: Spring Session BOM Bean-RC1 Released
source: https://spring.io/blog/2018/09/24/spring-session-bom-bean-rc1-released
scraped: 2026-02-23T15:13:06.416Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  September 24, 2018 | 0 Comments
---

# Spring Session BOM Bean-RC1 Released

_Releases | Rob Winch |  September 24, 2018 | 0 Comments_

*This post was authored by [Vedran Pavić](https://github.com/vpavic)*

On behalf of the community, I’m pleased to announce the release of Spring Session BOM `Bean-RC1`. This release is based on Spring Session `2.1.0.RC1` which resolves a total of [13 issues](https://github.com/spring-projects/spring-session/milestone/42?closed=1). Please read on for the highlights of the release.

## [](#support-for-java-11)[](#support-for-java-11)Support for Java 11

Spring Session now supports Java 11, while the required version of course stays at Java 8. Our CI pipeline has been enhanced so that the project is now continuously verified against Java 8, 10 and 11.

## [](#dependency-upgrades)[](#dependency-upgrades)Dependency Upgrades

Spring Session `2.1.0.RC1` builds on the following latest and greatest releases of key dependencies:

-   Spring Framework `5.1.0.RELEASE`
    
-   Spring Data `Lovelace-RELEASE`
    
-   Spring Security `5.1.0.RELEASE`
    
-   Project Reactor `Californium-RELEASE`
    
-   Hazelcast `3.10.5`
    

## [](#other)[](#other)Other

The release also provide a few bug fixes and performance improvements, most notably:

-   Improved `JdbcOperationsSessionRepository` performance by deserializing attributes lazily: [#1133](https://github.com/spring-projects/spring-session/pull/1133)
    
-   Improved `HazelcastSessionRepository#save` performance by leveraging Hazelcast’s `Offloadable`: [#1204](https://github.com/spring-projects/spring-session/issues/1204)
    
-   Fixed `RedisOperationsSessionRepository` incorrect `HttpSessionEvent` handling when using multiple databases within the same Redis instance: [#1128](https://github.com/spring-projects/spring-session/issues/1128)
    

## [](#feedback-please)[](#feedback-please)Feedback Please

With the release of its first release candidate, the Spring Session `Bean` is now considered mostly feature-complete, and we turn to you, our community, to provide us with feedback before releasing a stable `Bean-RELEASE`. This is expected in mid-October, shortly before Spring Boot `2.1.0.RC1` is released.

You can give Spring Session `Bean-RC1` a spin by configuring your dependency management as follows:

With Maven:

```
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework.session</groupId>
			<artifactId>spring-session-bom</artifactId>
			<version>Bean-RC1</version>
			<type>pom</type>
			<scope>import</scope>
		</dependency>
	</dependencies>
</dependencyManagement>
```

With Gradle:

```
Copyplugins {
	id 'io.spring.dependency-management' version '1.0.6.RELEASE'
}

dependencyManagement {
	imports {
		mavenBom 'org.springframework.session:spring-session-bom:Bean-RC1'
	}
}
```

Spring Boot early adopters will be happy to learn that the upcoming `2.1.0.M4` will pick up Spring Session `Bean-RC1`, while Spring Boot `2.0.x` users can simply update `spring-session-bom.version` property as follows:

With Maven:

```
Copy<properties>
	<sspring-session-bom.version>Bean-RC1</spring-session-bom.version>
</properties>
```

With Gradle:

```
Copyext['spring-session-bom.version'] = 'Bean-RC1'
```

[Project Page](https://projects.spring.io/spring-session/) | [Documentation](https://docs.spring.io/spring-session/docs/2.1.0.RC1/reference/html5/) | [Issues](https://github.com/spring-projects/spring-session/issues) | [Gitter](https://gitter.im/spring-projects/spring-session) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-session)