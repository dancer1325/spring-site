---
title: Spring Initializr: new UI
source: https://spring.io/blog/2019/03/05/spring-initializr-new-ui
scraped: 2026-02-23T14:54:39.659Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Damien Vitrac |  March 05, 2019 | 35 Comments
---

# Spring Initializr: new UI

_Engineering | Damien Vitrac |  March 05, 2019 | 35 Comments_

On behalf of the team and everyone who has contributed, I’m happy to announce that **Spring Initializr** has been updated and is now available on [start.spring.io](https://start.spring.io).

## [](#a-short-history-of-spring-initializr)A short history of Spring Initializr

The project started out as a minimal HTML form, letting you generate a Spring Boot application with a few options. It's been well received by the Spring community, so the team added new ways to interact with it, through the command-line or your favorite IDE.

After a while, we decided to work on a first revision of the UI. We simplified the form, leaving the essential parts front and center and pushing others in a section hidden by default. Given the number of dependencies, we created a search box to look for available starters.

The project is now a popular service and even a library that you can use and extend for your own needs. These days, the Web UI is not even the most popular client, but we're still committed to work and improve the service.

## [](#rationale-behind-the-new-web-design)Rationale behind the new Web design

Let's take a look at the updated design.

![](https://i.imgur.com/SBl70J1.png)

The Spring Initializr team has been tempted many times to add new features and options, or solve new problems. Should we generate complex builds to work around projects' limitations? Should we add more opinions around how to build, distribute or run your Spring Boot application in production? Should we turn it in a full-blown Spring Boot starter marketplace?

With this new revision, the design in general had a (much needed) refresh and we chose to not display anymore the full list of available dependencies. One could see that list as a way to work around poor project metadata ([we should](https://github.com/spring-io/start.spring.io/commit/359770b9e1e2e92be623788f3bdaecc515af84ee) [improve those!](https://github.com/spring-io/start.spring.io/commit/ed082500830091e415cba6b2a99961037de97ed9)) or a lack of discovery mechanism on the spring.io website ([we should fix that!](https://github.com/spring-io/sagan/issues/893)).

While we recognize its current limitations, we feel that "quickly bootstrapping a Spring Boot application that just runs" is still the core promise of our service and developers should know what type of application they want to build when creating a project. Still, we think that the Spring Boot team could do more about helping developers to grow and update their applications, so we're working on expanding what Spring Initializr can do (see our [previous blog post](https://spring.io/blog/2019/02/20/what-s-new-with-spring-initializr)).

This new revision is a new step towards more changes on [start.spring.io](https://start.spring.io), so stay tuned!