---
title: Updates to Spring Versions
source: https://spring.io/blog/2020/04/30/updates-to-spring-versions
scraped: 2026-02-23T13:39:25.502Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  April 30, 2020 | 4 Comments
---

# Updates to Spring Versions

_Engineering | Rob Winch |  April 30, 2020 | 4 Comments_

The Spring team has decided to change the versioning scheme for both [release trains](#release-train-version-changes) and [project modules](#project-module-version-changes). These changes will be coming in the next release train and minor releases for each project. In fact, the changes are already present in [Spring Cloud 2020.0.0-M1](https://spring.io/blog/2020/04/17/spring-cloud-2020-0-0-m1-released). Maven and Gradle do not provide the exact same version ordering, but we are working with the Gradle team to ensure the Spring scheme ends up sorted in the same way with both tools.

# [](#release-train-version-changes)[](#release-train-version-changes)Release Train Version Changes

Spring has been using alphabetically ordered, themed [release train](https://spring.io/blog/2013/02/13/spring-data-release-train-arora-available) versions since 2013. Release trains contain a group of project versions that work well together but make no guarantees about the underlying libraries’ backward compatibility when upgrading to the next release train.

Since then, the [community has raised some concerns about the version names](https://github.com/spring-cloud/spring-cloud-release/issues/168), and we have listened. A primary concern is that the scheme could be challenging for non-native English speakers to sort alphabetically. Additionally, themed names could be challenging to remember version names. Finally, some of the theme names could be challenging to spell.

To solve these concerns, the Spring team has decided to switch to [Calendar Versioning (calver)](https://calver.org/), using a scheme of `YYYY.MINOR.MICRO[-MODIFIER]`, such that:

-   `YYYY` is the full year.
    
-   `MINOR` is an incremented, 0-based number for each year.
    
-   `MICRO` is the patch version.
    
-   `MODIFIER` is an optional modifier such that `<COUNT>` is an incremented 1-based number:
    
    -   For milestones, we will use `M<COUNT>`.
        
    -   For release candidates, we will use `RC<COUNT>`.
        
    -   For snapshots, we will use `-SNAPSHOT`. Note that `.BUILD` that was present in our previous scheme has been removed.
        
    -   For releases, there will be no modifier.
        

An example of versions in order would be `2020.0.0-M1`, `2020.0.0-M2`, `2020.0.0-RC1`, `2020.0.0-SNAPSHOT`, `2020.0.0`, `2020.0.1-SNAPSHOT`, `2020.0.1`, `2020.1.0-M1`, `2020.1.0-M2`, `2020.1.0-RC1`, `2020.1.0-SNAPSHOT`, `2020.1.0`, and so on.

This solves the problem of concerns around implications of backward compatibility, eases sorting for non-native english speakers, is easier to remember than name based releases, and eliminates challenges of spelling. Like many other projects that use calver, the Spring team may also keep referring to each train with a code name that follows the old conventions for their versions.

# [](#project-module-version-changes)[](#project-module-version-changes)Project Module Version Changes

The Spring team has been using the same versions that are compatible with [OSGi Semantic Versioning](https://www.osgi.org/wp-content/uploads/SemanticVersioning.pdf) since [Spring Framework 3.0.0.M1](https://spring.io/blog/2008/12/05/first-spring-framework-3-0-milestone-released) back in 2008. We felt that, since we were revisiting the release train versioning scheme, it would be good to revisit our project module versions.

While it is convenient to have OSGi compatible versions, there is no need to do so for the Maven version to be compatible with OSGi, since the bundle metadata can specify an OSGi-compatible version in it. We decided the new versioning scheme would follow the grammar defined in [Semantic Versioning](https://semver.org/) to help with parsing the version number. We also wanted our versions to be familiar to Java developers. Given the above information, we decided on switching to a version scheme of `MAJOR.MINOR.PATCH[-MODIFIER]`, such that:

-   `MAJOR`, if incremented, may involve a significant amount of work to upgrade.
    
-   `MINOR`, if incremented, should involve little to no work to upgrade.
    
-   `PATCH`, if incremented, should involve no work.
    
-   `MODIFIER` is an optional modifier such that `<COUNT>` is an incremented 1-based number:
    
    -   For milestones, we will use `M<COUNT>` .
        
    -   For release candidates, we will use `RC<COUNT>` .
        
    -   For snapshots, we will use `-SNAPSHOT`. Note that `.BUILD` that was present in our previous scheme has been removed.
        
    -   For releases, there will be no modifier.
        

An example of versions in order would be `2.3.0-M1`, `2.3.0-M2`, `2.3.0-RC1`, `2.3.0-RC2`, `2.3.0-SNAPSHOT`, `2.3.0`, `2.3.1-SNAPSHOT`, `2.3.1`, `2.4.0-M1`, `2.4.0-M2`, `2.4.0-RC1`, `2.4.0-SNAPSHOT`, `2.4.0`, and so on.

# [](#conclusion)[](#conclusion)Conclusion

We want to thank you, the community, for your feedback, and we hope these changes will improve your experience with Spring!