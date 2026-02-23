---
title: Gradle Dependency Management Plugin 0.6.0 released
source: https://spring.io/blog/2016/06/30/gradle-dependency-management-plugin-0-6-0-released
scraped: 2026-02-23T19:12:04.999Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  June 30, 2016 | 0 Comments
---

# Gradle Dependency Management Plugin 0.6.0 released

_Releases | Andy Wilkinson |  June 30, 2016 | 0 Comments_

I am pleased to announce that [Gradle dependency management plugin](https://github.com/spring-gradle-plugins/dependency-management-plugin) 0.6.0.RELEASE is now available from Maven Central, JCenter, and the [Gradle Plugin Portal](https://plugins.gradle.org/plugin/io.spring.dependency-management).

### [](#gradle-30-compatibility)Gradle 3.0 compatibility

This new release is compatible with Gradle 3.0. At the time of writing it's tested against 3.0 M2 and the 0.6.x line will continue to track Gradle 3.0 development to maintain compatibility if at all possible.

### [](#finer-control-over-bom-property-overrides)Finer control over bom property overrides

Previously, an imported bom's properties could be overridden using project properties. This new release adds support for overriding a property as part of the import. `bomProperty` can be used to override properties one at a time (and can be used multiple times to override multiple properties):

```groovy
CopydependencyManagement {
    imports {
        mavenBom('com.example:example-bom:1.2.0') {
            bomProperty 'foo.version', '1.1.1'
            bomProperty 'bar.version', '2.0.3'
        }
    }
}
```

Alternatively, `bomProperties` can be used along with a map of property overrides:

```groovy
CopydependencyManagement {
    imports {
        mavenBom('com.example:example-bom:1.2.0') {
            bomProperties([
                'foo.version': '1.1.1',
                'bar.version': '2.0.3'
            ])
        }
    }
}
```

## [](#learning-more)Learning more

For more information about how the plugin can improve your Gradle builds, please read the [introductory blog post](https://spring.io/blog/2015/02/23/better-dependency-management-for-gradle).