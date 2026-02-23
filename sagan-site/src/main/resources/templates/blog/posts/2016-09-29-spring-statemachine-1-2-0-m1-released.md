---
title: Spring Statemachine 1.2.0.M1 Released
source: https://spring.io/blog/2016/09/29/spring-statemachine-1-2-0-m1-released
scraped: 2026-02-23T19:02:26.939Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  September 29, 2016 | 0 Comments
---

# Spring Statemachine 1.2.0.M1 Released

_Releases | Janne Valkealahti |  September 29, 2016 | 0 Comments_

We’re pleased to announce a first milestone release of [Spring Statemachine 1.2.0.M1](http://projects.spring.io/spring-statemachine). Artifacts are available from [Spring Repository](http://repo.spring.io/libs-milestone/org/springframework/statemachine/).

What we got into this first milestone:

-   Usual bug fixes and small enhancements
-   Support for UML submachines
-   New Repository abstraction keeping machine configuration in an external repository
-   New support for state actions.
-   New transition error action concepts

There has been a support for complex state hierarchy from a day one but trouble was that everything had to be defined in a same state configuration. New submachine support adds a feature where a state can be associated with other machine which allows some level of re-use and makes configuration more clean.

States can now have their own actions which are executed while being on a state. Execution happens after entry actions and before exit actions and can be cancelled if state exit happens before action completes.

Common topic among enhacement requests has been to add ways to keep machine state configuration externally from a static configuration defined either via JavaConfig or imported UML sources. Base support for this has been out there starting from 1.1.0 release but its use has been relatively awkward. For this we added a new abstraction via Spring Data Repositories and first implementation supports JPA and there is a [JPA sample](http://docs.spring.io/spring-statemachine/docs/1.2.0.M1/reference/htmlsingle/#statemachine-examples-datajpa) using embedded H2 database. Work we got into this first milestone is very basic(i.e. substates are not supported) but plan is to make it fully compatible with rest of a framework and add more OOB repository implementations(i.e. mongo/redis) in coming milestone releases.

Full changes as usual are available from [changelog](https://github.com/spring-projects/spring-statemachine/blob/master/docs/src/info/changelog.txt).

Thank you for all who have contributed in any way either via Stack Overflow, GitHub Issues or other channels. Driving force for changes really has been a community and requests from it.