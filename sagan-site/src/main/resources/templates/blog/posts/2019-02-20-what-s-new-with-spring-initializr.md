---
title: What\'s new with Spring Initializr
source: https://spring.io/blog/2019/02/20/what-s-new-with-spring-initializr
scraped: 2026-02-23T14:31:49.379Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Madhura Bhave |  February 20, 2019 | 10 Comments
---

# What's new with Spring Initializr

_Engineering | Madhura Bhave |  February 20, 2019 | 10 Comments_

The quickest way to generate Spring Boot projects is through [start.spring.io](https://start.spring.io). The site provides a curated list of dependencies that you can add to your application based on the selected Spring Boot version. You can also choose the language, build system and JVM version for the project. Over the years, the popularity of start.spring.io as the tool for generating Spring projects has grown exponentially and millions of projects are generated every year using the site.

For the past few months, we’ve been working on a complete overhaul of the project generation API. To better understand the motivation behind this, take a look at the project structure below: ![Old Structure](https://raw.githubusercontent.com/mbhave/initializr/cd9582d6a0b092e311d0b255d6f767723d47fa44/initializr-structure-old.png)

-   `initializr-generator` is the library that contains the core of the project generation API.
-   `initializr-web` contains the the REST endpoints and everything related to the web UI.
-   `initializr-site` contains all the customizations that are available on start.spring.io.

The problem with the existing API was that for anyone who wanted to customize project generation, the only sensible way to do that was to fork the library and extend or modify the `ProjectGenerator` class. This made for quite a clunky developer experience.

## [](#new-project-generation-api)New Project Generation API

The main goal of the new API is to allow customizing the generated project without forking the library. To allow a contribution model for various aspects of the project, there is an abstraction for each of them. These include:

-   A build abstraction with Maven and Gradle implementations that enables customization of the build file
-   A language abstraction with Java, Groovy and Kotlin implementations
-   A more high-level model for text resources, `.gitignore` and basic configuration files

These abstractions are made available via several hook points that you can use to customize project assets:

-   `BuildCustomizer` to add dependencies, plugins or other configuration items
-   Source file customizer to add annotations, methods or additional classes to a project
-   `ProjectContributor`, a high-level hook-point to add assets to a directory structure

The library provides several conditions so that customizers can be applied based on the requested project. The following example illustrates how the Gradle build can be tuned to apply the `war` plugin when a `war` packaging is requested:

```java
Copy@Bean
@ConditionalOnPackaging(WarPackaging.ID)
public BuildCustomizer<GradleBuild> warPluginContributor() {
    return (build) -> build.addPlugin("war");
}
```

The idea is that customizers can be defined in external modules (a bit similar to auto-configurations in Spring Boot) with no change to the library necessary.

As part of the refactoring, we've also refined the project structure. ﻿![New Structure](https://raw.githubusercontent.com/mbhave/initializr/10f4f0470135197c18300db6b5e93bce680b9249/initializr-image-new.png)

The top-level concepts such as `ProjectContributor`, `BuildCustomizer` are in `initializr-generator`. This module also contains the minimum infrastructure necessary to actually generate a project. `initializr-generator-spring` provides the contributors for the project structure that we would like to generate for Spring projects. Additionally, the code is now split into two repositories on GitHub, one for [the library](https://github.com/spring-io/initializr) and the other for [`start-site`](https://github.com/spring-io/start.spring.io) that represents our production instance on [start.spring.io](https://start.spring.io).

## [](#new-features-on-startspringio)New features on start.spring.io

The new project generation API has enabled us to easily add quite a few features to start.spring.io. We've merged them today so you can use those right away.

### [](#help-document)Help Document

The generated project now contains a `HELP.md` file at the root of the project. The file is tailored according to the dependencies present in the application. Currently, it contains links to guides and reference docs related to the selected dependencies. In the future, we plan to customize the HELP.md file further to provide next steps that will help you grow your application.

### [](#spring-rest-docs-build-configuration)Spring Rest Docs Build Configuration

If a project is generated with the `restdocs` dependency, the build is configured with the Asciidoctor plugin using a `BuildCustomizer`.

### [](#auto-generation-of-directory-structure-for-flyway)Auto-generation of directory structure for Flyway

For a generated project that uses `Flyway`, a `src/main/resources/db/migration` is now automatically created. To illustrate how easy this can be done with the API, here is the contributor for that feature:

```java
Copy@Bean
@ConditionalOnRequestedDependency("flyway")
public ProjectContributor flywayProjectContributor() {
  return (directory) -> {
     Path migrationDirectory = directory
           .resolve("src/main/resources/db/migration");
     Files.createDirectories(migrationDirectory);
  };
}
```

## [](#whats-coming)What’s coming

We’ve barely scratched the surface of what is possible with the new API and we want to bring new features while still keeping a balance between an improved developer experience and non intrusive changes.

Typically, we want to bring more content to HELP.md where dedicated tips can be provided based on selected dependencies and, more importantly, dependencies you could have selected to bring awareness of what you might not know yet.

We are also working on a new Web UI for start.spring.io and ways to help you expand your applications, stay tuned!