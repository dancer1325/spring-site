---
title: Better dependency management for Gradle
source: https://spring.io/blog/2015/02/23/better-dependency-management-for-gradle
scraped: 2026-02-23T19:34:07.230Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  February 23, 2015 | 5 Comments
---

# Better dependency management for Gradle

_Engineering | Andy Wilkinson |  February 23, 2015 | 5 Comments_

Maven's [dependency management](http://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) includes the concept of a bill-of-materials (bom). A bom is a special kind of pom that is used to control the versions of a project's dependencies and provides a central place to define and update those versions.

A number of Spring projects including Spring Framework, Spring Cloud, Spring Boot, and the Spring IO Platform provide boms to make things easier for Maven users. Unfortunately, things haven't been quite so easy if you're using Gradle.

## [](#dependency-management-in-gradle)Dependency management in Gradle

[Gradle's dependency management](https://gradle.org/docs/current/userguide/dependency_management.html) uses a [`ResolutionStrategy`](https://gradle.org/docs/current/dsl/org.gradle.api.artifacts.ResolutionStrategy.html) to take control of a project's dependency versions. This offers a lot of power and flexibility but doesn't provide a way to reuse the dependency management that's already been declared in a Maven bom. As a result, you have to do so manually. Depending on the bom, this can easily equate to tens of additional lines in your `build.gradle` script just to reuse some existing configuration.

## [](#reusing-a-bom-in-gradle)Reusing a bom in Gradle

One of Gradle's key strengths is that it can be easily extended and its behaviour customized through the use of plugins. We've taken advantage of this and written a [dependency management plugin for Gradle](https://plugins.gradle.org/plugin/io.spring.dependency-management). It's compatible with both Gradle 1.x and 2.x. This plugin allows you to use a Maven bom to control your build's dependencies in a handful of lines. The first step is to apply the plugin:

```groovy
Copybuildscript {
  repositories {
    jcenter()
  }
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:0.5.1.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"
```

Once the plugin's been applied you can use it to import a Maven bom:

```groovy
CopydependencyManagement {
  imports {
    mavenBom 'io.spring.platform:platform-bom:1.1.1.RELEASE'
  }
}
```

With this configuration in place you can declare dependencies on anything in the bom without specifying a version:

```groovy
Copydependencies {
    compile 'org.springframework:spring-core'
}
```

The imported bom will control the version of the dependency. It will also control the version of its transitive dependencies if they're listed in the bom.

## [](#exclusions-in-gradle)Exclusions in Gradle

Gradle can retrieve dependencies from a Maven repository and it uses the metadata in Maven pom files to do so. However, rather than obeying Maven's rules, it applies its own, subtly different semantics to the metadata. One area where this can cause problems is with the exclusion of transitive dependencies. This is best illustrated with a simple example.

Imagine a module that depends on a couple of Spring Framework modules,`spring-core` and `spring-beans`, and that uses SLF4J rather than Commons Logging. The dependencies in its pom would look something like this:

```xml
Copy<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-core</artifactId>
  <version>4.1.4.RELEASE</version>
  <exclusions>
    <exclusion>
      <groupId>commons-logging</groupId>
      <artifactId>commons-logging</artifactId>
    </exclusion>
  </exclusions>
</dependency>
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-beans</artifactId>
  <version>4.1.4.RELEASE</version>
</dependency>
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>jcl-over-slf4j</artifactId>
  <version>1.7.10</version>
</dependency>
```

If a Maven build depends on this module its dependency tree will look like this:

```
Copy\- com.example:my-library:jar:0.0.1-SNAPSHOT:compile
   +- org.springframework:spring-core:jar:4.1.4.RELEASE:compile
   +- org.springframework:spring-beans:jar:4.1.4.RELEASE:compile
   \- org.slf4j:jcl-over-slf4j:jar:1.7.10:compile
      \- org.slf4j:slf4j-api:jar:1.7.10:compile
```

`commons-logging` isn't listed as the only module that depends upon it is `spring-core` where it has been excluded.

The dependency tree of the equivalent Gradle build looks like this:

```
Copy\--- com.example:my-library:0.0.1-SNAPSHOT
     +--- org.springframework:spring-core:4.1.4.RELEASE
     |    \--- commons-logging:commons-logging:1.2
     +--- org.springframework:spring-beans:4.1.4.RELEASE
     |    \--- org.springframework:spring-core:4.1.4.RELEASE (*)
     \--- org.slf4j:jcl-over-slf4j:1.7.10
          \--- org.slf4j:slf4j-api:1.7.10
```

Despite the exclusion, `commons-logging` is listed this time. This can be problematic as it leaves your classpath polluted with dependencies that should not be there. You can work around the problem by manually configuring the required exclusions in your Gradle build, but first of all you have to know what the exclusions should be, and then you have to go through the tedious and error-prone process of configuring them.

## [](#honoring-a-poms-exclusions)Honoring a pom's exclusions

The dependency management plugin changes Gradle's handling of a pom's exclusions so that they behave as they do in Maven. With the plugin applied to the example project, it no longer pulls in `commons-logging`:

```
Copy\--- com.example:my-library:0.0.1-SNAPSHOT
     +--- org.springframework:spring-core:4.1.4.RELEASE
     +--- org.springframework:spring-beans:4.1.4.RELEASE
     |    \--- org.springframework:spring-core:4.1.4.RELEASE
     \--- org.slf4j:jcl-over-slf4j:1.7.10
          \--- org.slf4j:slf4j-api:1.7.10
```

## [](#using-the-plugin-with-spring-boot)Using the plugin with Spring Boot

There are some similarities between this plugin and Spring Boot's Gradle plugin. For example, the Spring Boot plugin also [allows dependencies to be declared without a version](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#build-tool-plugins-gradle-dependencies-without-versions), however it doesn't affect transitive dependencies and doesn't honor Maven exclusions.

In the forthcoming Spring Boot 1.3 we have [removed Boot's own dependency management and started using the dependency management plugin instead](https://github.com/spring-projects/spring-boot/issues/2133). For users of earlier versions of Spring Boot, the two plugins will happily co-exist and you can configure the dependency management plugin to use Spring Boot's starter bom:

```groovy
Copybuildscript {
  repositories {
    jcenter()
  }
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:0.5.1.RELEASE"
    classpath "org.springframework.boot:spring-boot-gradle-plugin:1.2.3.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"
apply plugin: "spring-boot"

repositories {
  jcenter()
}

dependencyManagement {
  imports {
    mavenBom 'org.springframework.boot:spring-boot-starter-parent:1.2.1.RELEASE'
  }
}

dependencies {
  compile "org.springframework.boot:spring-boot-starter-web"
}
```

## [](#learning-more)Learning more

In addition to the features described above, the plugin has support for working with a bom's properties (both overriding them and using them in your Gradle build), automatically including dependency management metadata in Gradle-generated pom files, and more. Take a look at the [README](https://github.com/spring-gradle-plugins/dependency-management-plugin/blob/master/README.md) for further details.

The plugin is Apache-licensed and is on [GitHub](https://github.com/spring-gradle-plugins/dependency-management-plugin). GitHub's also used for [issue tracking](https://github.com/spring-gradle-plugins/dependency-management-plugin/issues). Feature suggestions, pull requests, and bug reports are always welcome.