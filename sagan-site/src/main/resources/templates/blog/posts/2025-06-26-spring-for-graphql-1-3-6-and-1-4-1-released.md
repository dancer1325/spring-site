---
title: Spring for GraphQL 1.3.6 and 1.4.1 released
source: https://spring.io/blog/2025/06/26/spring-for-graphql-1-3-6-and-1-4-1-released
scraped: 2026-02-23T07:37:35.701Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  June 26, 2025 | 0 Comments
---

# Spring for GraphQL 1.3.6 and 1.4.1 released

_Releases | Brian Clozel |  June 26, 2025 | 0 Comments_

I am pleased to announce that Spring for GraphQL 1.3.6 and 1.4.1 maintenance releases are now available on Maven Central.

-   1.4.1 closes [15 issues](https://github.com/spring-projects/spring-graphql/releases/tag/v1.4.1). This version will ship with Spring Boot 3.5.4, [to be released on July 24th](https://spring.io/projects#release-calendar).
-   1.3.6 closes [15 issues](https://github.com/spring-projects/spring-graphql/releases/tag/v1.3.6). This version will ship with Spring Boot 3.4.8, [to be scheduled soon](https://github.com/spring-projects/spring-boot/milestone/390).

Both releases ship two important changes:

1.  a performance improvement of our cancellation support; see [gh-1242](https://github.com/spring-projects/spring-graphql/issues/1242).

Thank you so much to our community for spotting this in production! 2. a much-needed GraphiQL upgrade for the GraphQL explorer, as the former CDN setup was recently broken; see [gh-1209](https://github.com/spring-projects/spring-graphql/issues/1209)

Iqn the meantime, you can override the spring-graphql version in your Spring Boot project by editing the [Gradle build file](https://docs.spring.io/spring-boot/gradle-plugin/managing-dependencies.html#managing-dependencies.dependency-management-plugin.customizing):

```groovy
Copyext['spring-graphql.version'] = '1.4.1'
```

There is similar support for [Maven POMs](https://docs.spring.io/spring-boot/maven-plugin/using.html#using.parent-pom):

```xml
Copy<properties>
  <spring-graphql.version>1.4.1</spring-graphql.version>
  <!-- ... -->
</properties>
```

### [](#how-can-you-help)How can you help?

If you have general questions, please ask on [stackoverflow.com](https://stackoverflow.com) using the [`spring-graphql` tag](https://stackoverflow.com/tags/spring-graphql).

[Project Page](https://spring.io/projects/spring-graphql/) | [GitHub](https://github.com/spring-projects/spring-graphql) | [Issues](https://github.com/spring-projects/spring-graphql/issues) | [Documentation](https://docs.spring.io/spring-graphql/reference) | [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-graphql)