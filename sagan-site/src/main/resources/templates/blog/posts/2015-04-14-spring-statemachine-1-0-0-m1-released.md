---
title: Spring Statemachine 1.0.0.M1 Released
source: https://spring.io/blog/2015/04/14/spring-statemachine-1-0-0-m1-released
scraped: 2026-02-23T21:06:43.270Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  April 14, 2015 | 12 Comments
---

# Spring Statemachine 1.0.0.M1 Released

_Releases | Janne Valkealahti |  April 14, 2015 | 12 Comments_

We're pleased to announce a first milestone release of **Spring Statemachine 1.0.0.M1**. This blog also acts as introductory for this new project.

While it'd be nice to write a blog post introducing new cutting edge technology hot from a press, finite statemachines has been around longer than readers of this post(grandpa you can now lower your hand). There are technologies which come and go and then there are these fundamental technologies which stick around simply because they are proven to work.

Every programmer is most likely already using concepts of states of some sort in their applications. Having a simple boolean flag is already a simple statemachine on its own when application is making a decision based on that flag. Programmer then throws in more flags, enums and a bunch of if/else/break structures which is perfectly all right with simple use cases.

Problem with baking state and application logic together is that over time when application gets more complex code is usually starting to look like a plate full of spaghetti and every time programmer changes one part, some other parts gets broken.

**Spring Statemachine** is a framework for application developers to use [Statemachine](http://en.wikipedia.org/wiki/UML_state_machine) concepts with Spring applications and aims to provide features like:

-   Easy to use flat one level state machine for simple use cases.
-   Hierarchical state machine structure to ease complex state configuration.
-   State machine regions to provide even more complex state configurations.
-   Usage of triggers, transitions, guards and actions.
-   Type safe configuration adapter.
-   State machine event listeners.
-   Spring IOC integration to associate beans with a statemachine.

Proper state handling is very important in applications where something can happen asynchronously. This is especially important concept in cloud environments where it is easy to get into trouble with concurrency. **Spring Statemachine** is another flavour of state handling what i.e. **Spring Cloud Cluster** projects aims to provide with its features like *distributed locks* and *leader election*.

[Project Page](http://projects.spring.io/spring-statemachine/) contains a simple example to get an idea how Spring Statemachine works. We've also made few [Samples](https://github.com/spring-projects/spring-statemachine/tree/master/spring-statemachine-samples) which are explained more detailed in our reference documentation. These samples are packaged with **Spring Boot** and uses **Spring Shell** to fire up interactive shell you use to interact with a statemachine. Great way to play with things without a need to recompile to see different behaviour.

We'd love to hear back what people think by participating in a [Spring Statemachine Project](http://projects.spring.io/spring-statemachine/) or simply creating issues or feature requests at [GitHub](https://github.com/spring-projects/spring-statemachine).