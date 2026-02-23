---
title: Spring HATEOAS 1.4 released
source: https://spring.io/blog/2021/11/22/spring-hateoas-1-4-released
scraped: 2026-02-23T13:03:30.713Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  November 22, 2021 | 0 Comments
---

# Spring HATEOAS 1.4 released

_Releases | Oliver Drotbohm |  November 22, 2021 | 0 Comments_

I am excited to announce that Spring HATEOAS 1.4 GA has been part of the cascade of releases that lead to the Spring Boot 2.6 last week. The release ships a couple of new features and all bug fixes we have incorporated in the 1.3.x line. The most notable new features are:

-   Full support for level 4 URI templates
    
-   Support for non-composite request parameter rendering
    
-   Improved HAL-FORMS support (additional property constraints, custom media types)
    
-   Additional HTML input types (checkbox, radio, file)
    
-   General dependency upgrades, including Spring Framework 5.3.13 and Jackson 2.13.9.
    

Find more detailed information about all changes made in the 1.4 line in the release’s [change log](https://docs.spring.io/spring-hateoas/docs/1.4.0/changelog.txt). The release was included in the Spring Boot 2.6 release [announced last week](https://spring.io/blog/2021/11/19/spring-boot-2-6-is-now-available). In other words, if you have upgraded to that, you’ve already successfully upgraded to Spring HATEOAS 1.4.

We have also released maintenance versions for the [1.3](https://github.com/spring-projects/spring-hateoas/releases/tag/1.3.6) and [1.2](https://github.com/spring-projects/spring-hateoas/releases/tag/1.2.11) lines. Please note, that [1.2.11](https://github.com/spring-projects/spring-hateoas/releases/tag/1.2.11) is the last release of that branch and 1.2 is going out of OSS maintenance. Find more about the support timelines for each branch in the [newly introduced tab](https://spring.io/projects/spring-hateoas#support) of our project homepage.

Also note, that due to a typo during the release procedure for 1.2.11, a 1.12.11 release has made it onto Maven Central. The binaries are logically equivalent to 1.2.11, but their presence is likely to cause trouble with tools automating library upgrades. We’re currently working with Sonatype to investigate options to potentially remove the invalid artifacts.