---
title: SpringOne2GX 2015 replay: Implementing a Highly Scalable Stock Prediction System with R, Apache Geode and Spring XD
source: https://spring.io/blog/2016/02/02/springone2gx-2015-replay-implementing-a-highly-scalable-stock-prediction-system-with-r-apache-geode-and-spring-xd
scraped: 2026-02-23T19:29:30.784Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  February 02, 2016 | 0 Comments
---

# SpringOne2GX 2015 replay: Implementing a Highly Scalable Stock Prediction System with R, Apache Geode and Spring XD

_News | Pieter Humphrey |  February 02, 2016 | 0 Comments_

Recorded at SpringOne2GX 2015. Presenters: Fred Melo & William Markito Oliveira Big Data Track Slides: [http://www.slideshare.net/SpringCentral/implementing-a-highly-scalable-stock-prediction-system-with-r-apache-geode-and-spring-xd](http://www.slideshare.net/SpringCentral/implementing-a-highly-scalable-stock-prediction-system-with-r-apache-geode-and-spring-xd)

Finance market prediction has always been one of the hottest topics in Data Science and Machine Learning. However, the prediction algorithm is just a small piece of the puzzle. Building a data stream pipeline that is constantly combining the latest price info with high volume historical data is extremely challenging using traditional platforms, requiring a lot of code and thinking about how to scale or move into the cloud. This session is going to walk-through the architecture and implementation details of an application built on top of open-source tools that demonstrate how to easily build a stock prediction solution with no source code - except a few lines of R and the web interface that will consume data through a RESTful endpoint, real-time. The solution leverages in-memory data grid technology for high-speed ingestion, combining streaming of real-time data and distributed processing for stock indicator algorithms.