---
title: Spring Boot\'s new Gradle plugin
source: https://spring.io/blog/2017/04/05/spring-boot-s-new-gradle-plugin
scraped: 2026-02-23T16:31:50.641Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  April 05, 2017 | 11 Comments
---

# Spring Boot's new Gradle plugin

_Engineering | Andy Wilkinson |  April 05, 2017 | 11 Comments_

One of the main themes of Spring Boot 2.0 M1 is a [range of significant improvements to its Gradle plugin](https://github.com/spring-projects/spring-boot/issues?utf8=%E2%9C%93&q=label%3A%22theme%3A%20gradle-plugin%22%20milestone%3A2.0.0.M1%20). Many of those improvements have just been merged and are available in the latest Spring Boot snapshots. There's a few weeks until Spring Boot 2.0.0.M1 will be released at the beginning of May and we'd love to hear your early feedback on the new plugin before then.

You can read more about the plugin's capabilities in its [reference](https://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/gradle-plugin/reference) and [API](https://docs.spring.io/spring-boot/docs/2.0.0.BUILD-SNAPSHOT/gradle-plugin/api) documentation.

## [](#trying-the-new-plugin)Trying the new plugin

The new plugin requires Gradle 3.4 or later. Like the rest of Spring Boot, snapshots are published to [https://repo.spring.io/libs-snapshot](https://repo.spring.io/libs-snapshot). The easiest way to use a snapshot is to [create a new Gradle project on start.spring.io](https://start.spring.io/#!type=gradle-project) and select Spring Boot 2.0 snapshots.

Alternatively, your `build.gradle` should look something like this:

```groovy
Copybuildscript {
    ext {
        springBootVersion = '2.0.0.BUILD-SNAPSHOT'
    }
    repositories {
        mavenCentral()
        maven { url 'https://repo.spring.io/libs-snapshot' }
    }
    dependencies {
        classpath "org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}"
    }
}

apply plugin: 'java'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'
```

### [](#building-executable-jars-and-wars)Building executable jars and wars

The `bootRepackage` task has been replaced with `bootJar` and `bootWar` tasks for building executable jars and wars respectively. Both tasks extend their equivalent standard Gradle jar or war task, giving you access to all of the usual configuration options and behaviour.

### [](#dependency-management)Dependency management

Spring Boot's Gradle plugin no longer automatically applies the [dependency management plugin](https://github.com/spring-gradle-plugins/dependency-management-plugin). Instead, Spring Boot's plugin now reacts to the dependency management plugin being applied by importing the correct version of the `spring-boot-dependencies` bom. This gives you more control over how and when dependency management is configured. For most applications applying the dependency management plugin will be sufficient:

```
Copyapply plugin: 'io.spring.dependency-management'
```

Please note that the dependency management plugin remains a transitive dependency of `spring-boot-gradle-plugin` so there's no need for it to be listed as a `classpath` dependency in your `buildscript` configuration

## [](#providing-feedback)Providing feedback

As I said above, there's a few weeks until Spring Boot 2.0.0.M1 is released so now's an excellent opportunity to take the new plugin for a spin and then please let us know what you think.

The plugin is still a work in progress. Many things that were not possible with the previous version are made possible by the new version. Also, a few things that were previously possible may no longer be possible, or may require a different approach. In particular, the plugin's DSL has been deliberately stripped back to only cover functionality that we're certain we want.

If you'd like to discuss the new capabilities please do so in the comments below or [on Gitter](https://gitter.im/spring-projects/spring-boot). If you find a bug or have an idea for some further improvements then please [open an issue on GitHub](https://github.com/spring-projects/spring-boot/issues/new).