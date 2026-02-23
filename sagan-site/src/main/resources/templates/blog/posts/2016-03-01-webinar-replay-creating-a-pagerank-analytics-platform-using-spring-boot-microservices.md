---
title: Webinar Replay: Creating a PageRank Analytics Platform Using Spring Boot Microservices
source: https://spring.io/blog/2016/03/01/webinar-replay-creating-a-pagerank-analytics-platform-using-spring-boot-microservices
scraped: 2026-02-23T19:25:25.392Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  March 01, 2016 | 0 Comments
---

# Webinar Replay: Creating a PageRank Analytics Platform Using Spring Boot Microservices

_News | Pieter Humphrey |  March 01, 2016 | 0 Comments_

Speaker: Kenny Bastani Slides: [https://speakerdeck.com/kbastani/creating-a-pagerank-analytics-platform-using-spring-boot-microservices](https://speakerdeck.com/kbastani/creating-a-pagerank-analytics-platform-using-spring-boot-microservices) Guided Tutorial from webinar content: [http://www.kennybastani.com/2016/01/spring-boot-graph-processing-microservices.html](http://www.kennybastani.com/2016/01/spring-boot-graph-processing-microservices.html) Reference Application from Webinar: [https://github.com/kbastani/spring-boot-graph-processing-example](https://github.com/kbastani/spring-boot-graph-processing-example) Graph processing platform: [https://github.com/neo4j-contrib/neo4j-mazerunner](https://github.com/neo4j-contrib/neo4j-mazerunner)

This webinar introduces you to a sample application that combines multiple microservices with a graph processing platform to rank communities of users on Twitter. The problem we’re going to solve is how to discover communities of influencers on Twitter using a set of seed profiles as inputs. To solve this problem without a background in machine learning or social network analytics might be a bit of a stretch, but we’re going to take a stab at it using a little bit of computer science history. We’re going to use a collection of popular tools as a part of this article’s sample application. The tools we’ll use, in the order of importance, will be: Spring Boot, Neo4j, Apache Spark, Docker, RabbitMQ. While there are some missing pieces, such as securing REST API access, and mapping device volumes to the containers, these kinds of important topics will be covered in future webinars.