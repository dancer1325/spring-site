---
title: Gradle dependency management plugin 0.5.4 released
source: https://spring.io/blog/2015/12/03/gradle-dependency-management-plugin-0-5-4-released
scraped: 2026-02-23T19:34:02.900Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  December 03, 2015 | 0 Comments
---

# Gradle dependency management plugin 0.5.4 released

_Releases | Andy Wilkinson |  December 03, 2015 | 0 Comments_

I am pleased to announce that [Gradle dependency management plugin](https://github.com/spring-gradle-plugins/dependency-management-plugin) 0.5.4.RELEASE is now available from Maven Central, JCenter, and the [Gradle Plugin Portal](https://plugins.gradle.org/plugin/io.spring.dependency-management).

This maintenance release includes a significant improvement in the performance of applying Maven-style exclusions to your Gradle builds. [The change](https://github.com/spring-gradle-plugins/dependency-management-plugin/commit/3ca43491495769e511f1d051ccd1a3cf59da7425) provides a 20x speed up, reducing the overhead, even with very complex dependency graphs, to 50ms or less.

For more information about how the plugin can improve your Gradle builds, please read the [introductory blog post](https://spring.io/blog/2015/02/23/better-dependency-management-for-gradle).