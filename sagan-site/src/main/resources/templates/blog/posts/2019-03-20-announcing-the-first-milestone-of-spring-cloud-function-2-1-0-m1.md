---
title: Announcing the first milestone of Spring Cloud Function - 2.1.0.M1
source: https://spring.io/blog/2019/03/20/announcing-the-first-milestone-of-spring-cloud-function-2-1-0-m1
scraped: 2026-02-23T14:54:49.541Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Oleg Zhurakousky |  March 20, 2019 | 0 Comments
---

# Announcing the first milestone of Spring Cloud Function - 2.1.0.M1

_Engineering | Oleg Zhurakousky |  March 20, 2019 | 0 Comments_

We are pleased to announce first milestone of the Spring Cloud Function - 2.1.0.M1.

Individual modules of Spring Cloud Function 2.1.0.M1 are available for use in the [Spring Milestone](https://repo.spring.io/libs-snapshot/org/springframework/cloud/) repository. This release encompasses the following:

-   Some of the features that has always been available in *bean factory based* function catalog are now part of the ***functional form*** (see [Dave Syer's blog](https://spring.io/blog/2018/10/22/functional-bean-registrations-in-spring-cloud-function) for more details on *functional form*) :
    -   *Multiple endpoint support* - ability to map multiple HTTP endpoints the same way one would expect in conventional context configuration.
    -   *Function composition* - ability to compose function (e.g., `foo|bar` or `foo,bar`).
-   Ability to communicate and retain meta-information via Message headers for cases where Message function is composed with non-Message (e.g., `Function<Message<?>>, Message<?>>` is composed with `Function<?, ?>`).
-   Support for implicit function composition where `catalog.lookup("")`, `catalog.lookup("|")`, `catalog.lookup("foo|")` or `catalog.lookup("|bar")` are all valid lookups providing container with enough information to determine your intentions. For example, *empty string* simply implies there is only one Function in catalog and no explicit name should be provided.
-   Creating Supplier from remote HTTP endpoint where one can define the *sink url* (destination) and the *source url* (source) and use the app as a pipeline for events from/to HTTP.
-   AWS [Custom Runtime](https://cloud.spring.io/spring-cloud-static/spring-cloud-function/2.1.0.M1/aws.html#_custom_runtime) feature.
-   Other minor [enhancements and bug-fixes](https://github.com/spring-cloud/spring-cloud-function/milestone/16?closed=1).

Also, there was a major update to both the [project's home page](https://spring.io/projects/spring-cloud-function) as well as [documentation](https://cloud.spring.io/spring-cloud-static/spring-cloud-function/2.1.0.M1/home.html).

> *Spring Cloud Function 2.1.x is dependent on spring-boot 2.1.x.*

### [](#how-can-you-help)How can you help?

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-cloud/spring-cloud-function/labels/ideal-for-contribution) in the issue repository. If you have general questions, please ask on [stackoverflow.com](http://stackoverflow.com) using the [`spring-cloud-function` tag](http://stackoverflow.com/tags/spring-cloud-function).

[Project Page](https://cloud.spring.io/spring-cloud-function/) | [GitHub](https://github.com/spring-cloud/spring-cloud-function) | [Issues](https://github.com/spring-cloud/spring-cloud-function/issues) | [Documentation](http://cloud.spring.io/spring-cloud-static/spring-cloud-function/2.0.0.RELEASE/)