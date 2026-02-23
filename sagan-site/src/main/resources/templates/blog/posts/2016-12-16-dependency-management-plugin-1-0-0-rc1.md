---
title: Dependency Management Plugin 1.0.0.RC1
source: https://spring.io/blog/2016/12/16/dependency-management-plugin-1-0-0-rc1
scraped: 2026-02-23T18:41:45.910Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  December 16, 2016 | 0 Comments
---

# Dependency Management Plugin 1.0.0.RC1

_Releases | Andy Wilkinson |  December 16, 2016 | 0 Comments_

It's my pleasure to announce that 1.0.0.RC1 of the [Dependency Management Plugin](https://github.com/spring-gradle-plugins/dependency-management-plugin) has been released. It's available from [Gradle's Plugin Portal](https://plugins.gradle.org/plugin/io.spring.dependency-management) as well as Maven Central and Bintray.

## [](#whats-new)What's new?

The plugin's been rewritten in Java and its API has been formalised. A clear separation between that API and the plugin's internals has been introduced. This has required a few breaking changes but you are unlikely to be affected if you were using the Groovy DSL.

Converting to Java and formalising the API has also enabled a couple of enhancements:

### Official support for Gradle 3

Previously, the plugin was written in Groovy and attempted to support Gradle 1, 2, and 3. This [proved to be overly ambitious](https://github.com/spring-gradle-plugins/dependency-management-plugin/issues/112). The two main problems were binary incompatibilities across the three different Groovy runtimes (1.8, 2.3, and 2.4) and breaking changes across the three versions of Gradle. To address these, the Gradle team's recommendation was to rewrite the plugin in Java and to drop support for Gradle 1.x. This release does just that, with the plugin's main code now being 100% Java and Gradle 2.9 now being the minimum supported version. As a result, Gradle 3.x is now officially supported and it should be easier to support new versions of Gradle in the future. A welcome side-effect is a 13% reduction in the size of the plugin's jar file.

### [](#better-support-for-gradle-script-kotlin)Better support for Gradle Script Kotlin

Previously, the plugin's API was heavily influenced by the fact that it was written in Groovy and its API and DSL were rather Groovy-centric. For example, Groovy Closures were used in a number of places without providing a non-Groovy alternative. This required Kotlin scripts to adapt a function to a closure, for example:

```kotlin
Copyconfigure<DependencyManagementExtension> {
    imports(delegateClosureOf<ImportsHandler> {
        mavenBom("io.spring.platform:platform-bom:Athens-SR1")
    })
}
```

The conversion to Java highlighted the problem and, taking a lead from Gradle's own API, 1.0 overloads a number of methods that previously only took a Groovy `Closure` to also take a Gradle `Action`. The overloaded methods allow you to neaten things up a bit, for example:

```kotlin
Copyconfigure<DependencyManagementExtension> {
    imports {
        it.mavenBom("io.spring.platform:platform-bom:Athens-SR1")
    }
}
```

## [](#whats-next)What's next?

With the API having been formalised and the plugin nearing 1.0, now is a great time to take it for a spin and let us know on [GitHub](https://github.com/spring-gradle-plugins/dependency-management-plugin/issues) or [Gitter](https://gitter.im/spring-gradle-plugins/dependency-management-plugin) of any problems you find or improvements that you'd like to see.

Thank you for all of the feedback and suggestions that you have contributed to the plugin thus far.