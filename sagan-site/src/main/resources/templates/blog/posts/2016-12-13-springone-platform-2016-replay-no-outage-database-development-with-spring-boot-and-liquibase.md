---
title: SpringOne Platform 2016 Replay: No outage database development with Spring Boot and Liquibase
source: https://spring.io/blog/2016/12/13/springone-platform-2016-replay-no-outage-database-development-with-spring-boot-and-liquibase
scraped: 2026-02-23T18:55:12.254Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  December 13, 2016 | 0 Comments
---

# SpringOne Platform 2016 Replay: No outage database development with Spring Boot and Liquibase

_News | Pieter Humphrey |  December 13, 2016 | 0 Comments_

Recorded at SpringOne Platform 2016. Speakers: Barrington-Hughes, Ramaswamy, Premier Healthcare Inc Slides: [http://www.slideshare.net/SpringCentral/no-outage-database-development-with-spring-boot-and-liquibase](http://www.slideshare.net/SpringCentral/no-outage-database-development-with-spring-boot-and-liquibase)

Pavi and I work on a project in Premier where we've embedded Liquibase into the start of our Spring Boot applications to upgrade our database in-direct coupling with the code we are deploying.

Using a measured and planned approach to agile database development and careful refactoring of the database with more frequent but smaller changes, we facilitate having no outage deployments along with database schema upgrades.

This talk touches on some key concepts in agile database refactoring with working examples of embedded Liquibase change sets within a Spring Boot application, demonstrating a no outage deployment using nginx to simulate a blue green deployment. While upgrading blue, green would still be available and functioning. Performing the cutover etc.

Tying these concepts together was very cool for us and greatly reduced the friction and risk of deploying a code update.