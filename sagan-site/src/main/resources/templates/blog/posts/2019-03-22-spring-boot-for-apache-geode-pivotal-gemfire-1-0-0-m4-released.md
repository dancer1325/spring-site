---
title: Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M4 Released!
source: https://spring.io/blog/2019/03/22/spring-boot-for-apache-geode-pivotal-gemfire-1-0-0-m4-released
scraped: 2026-02-23T14:54:28.309Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | John Blum |  March 22, 2019 | 0 Comments
---

# Spring Boot for Apache Geode & Pivotal GemFire 1.0.0.M4 Released!

_Releases | John Blum |  March 22, 2019 | 0 Comments_

On behalf of the Spring, Apache Geode and Pivotal GemFire communities, I am pleased to announce the release of *Spring Boot for Apache Geode & Pivotal GemFire* (SBDG) `1.0.0.M4`.

Special appreciation goes out to [@starbuxman](https://spring.io/team/jlong) for his invaluable feedback after *SpringOne Platform* 2018. And, if you have not seen Josh’s Spring Tip [video](https://spring.io/blog/2019/02/13/spring-tips-apache-geode) on Apache, please check it out.

## [](#whats-new)[](#new)What’s New

Among a few minor updates, Milestone 4 adds the following new capabilities:

-   Externalized configuration support with *Spring Boot’s* Configuration Processor and SBDG provided `@ConfigurationProperties` classes (Read [here](https://docs.spring.io/autorepo/docs/spring-boot-data-geode-build/1.0.0.BUILD-SNAPSHOT/reference/htmlsingle/#geode-configuration) for more details). Inside STS or IJ Enterprise addition, developers will have the added convenience of auto-completion and content assist.
    
-   GemFire/Geode nodes can now be named with the `spring.application.name` property.
    
-   The GemFire/Geode Spring Boot starters now include Spring Shell as a runtime dependency, which is convenient when enabling and using GemFire/Geode’s management services.
    
-   Provided a workaround to an [issue](https://github.com/spring-cloud/spring-cloud-commons/issues/476) in Spring Cloud Commons .
    

For complete list of changes, see the [changelog](https://github.com/spring-projects/spring-boot-data-geode/blob/1.0.0.M4/spring-geode/src/main/resources/changelog.txt#L7-L21).

You can acquire the bits from the Spring `libs-milestone` repository:

Maven

```
Copy<repositories>
    <repository>
        <id>spring-libs-milestone</id>
        <name>Spring Milestone Maven Repository</name>
        <url>https://repo.spring.io/libs-milestone</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>org.springframework.geode</groupId>
        <artifactId>spring-geode-starter</artifactId>
        <version>1.0.0.M4</version>
    </dependency>
</dependencies>
```

Gradle

```
Copyrepository {
  maven { url "https://repo.spring.io/libs-milestone" }
}

dependencies {
  compile 'org.springframework.geode:spring-geode-starter:1.0.0.M4'
}
```

To switch from Apache Geode to Pivotal GemFire simply, change the Spring Boot starter from `spring-geode-starter` to `spring-gemfire-starter`.

## [](#whats-next)[](#next)What’s Next

Next up will be SBDG `1.0.0.RC1`. In this release we will be adding samples demonstrating how to effectively use Apache Geode or Pivotal GemFire in a Spring context with Spring Boot. We will be spicing up the documentation in preparation for the final GA to ensure that users are successful with SBDG in all their UCs.

The `1.0.0.GA` will follow shortly after RC1 as will `1.1.0.M1`, which will rebase SBDG on Spring Boot 2.1, Spring Framework 5.1 and Spring Data Lovelace.

## [](#conclusion)[](#conclusion)Conclusion

As always feedback is appreciated and welcomed. Please give this release a try and let us know if you have any ideas, issues or recommendations.

[Issues](https://github.com/spring-projects/spring-boot-data-geode/issues) | [PR](https://github.com/spring-projects/spring-boot-data-geode/pulls) | [StackOverflow](https://stackoverflow.com/questions/tagged/spring-boot)