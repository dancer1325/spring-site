---
title: SpringOne Platform 2016 Replay: Implementing Config Server and extending it
source: https://spring.io/blog/2017/01/23/springone-platform-2016-replay-implementing-config-server-and-extending-it
scraped: 2026-02-23T18:42:31.644Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  January 23, 2017 | 0 Comments
---

# SpringOne Platform 2016 Replay: Implementing Config Server and extending it

_News | Pieter Humphrey |  January 23, 2017 | 0 Comments_

Recorded at SpringOne Platform 2016. Speaker: Clint Checketts, Domo.com Slides: [http://www.slideshare.net/SpringCentral/implementing-config-server-and-extending-it](http://www.slideshare.net/SpringCentral/implementing-config-server-and-extending-it)

Spring Cloud Config Server is a great tool for getting your application configuration under source control. We'll start with the quick overview of Spring's Environment and properties and how config server enhances those, while keeping the same model.

Next we'll discuss what concerns you need to take into account when rolling out config server like security, encryption, and location of your repositories (if using Git).

Finally we'll discuss Config Server's extensibility, particularly dealing with security (since config server serves up properties decrypted) and even going so far as adding 'Filtering' to allow for capability akin to CloudFoundry 'Services' for making shared configs that are available across many applications, even accounting for how you might test those extensions.