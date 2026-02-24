---
title: SpringOne2GX 2013 Replay: Virtualizing and Tuning Large Scale Java Platforms
source: https://spring.io/blog/2014/05/20/springone2gx-2013-replay-virtualizing-and-tuning-large-scale-java-platforms
scraped: 2026-02-23T22:32:09.188Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  May 20, 2014 | 0 Comments
---

# SpringOne2GX 2013 Replay: Virtualizing and Tuning Large Scale Java Platforms

_News | Pieter Humphrey |  May 20, 2014 | 0 Comments_

Recorded at SpringOne2GX 2013 in Stana Clara, CA

Speakers: Emad Benjamin and Guillermo Tantachuco

The session will cover various GC tuning techniques, in particular focus on tuning large scale JVM deployments. Come to this session to learn about GC tuning recipe that can give you the best configuration for latency sensitive applications. While predominantly most enterprise class Java workloads can fit into a scaled-out set of JVM instances of less than 4GB JVM heap, there are workloads in the in memory database space that require fairly large JVMs. In this session we take a deep dive into the issues and the optimal tuning configurations for tuning large JVMs in the range of 4GB to 128GB. In this session the GC tuning recipe shared is a refinement from 15 years of GC engagements and an adaptation in recent years for tuning some of the largest JVMs in the industry using plain HotSpot and CMS GC policy. You should be able to walk away with the ability to commence a decent GC tuning exercise on your own. The session does summarize the techniques and the necessary JVM options needed to accomplish this task. Naturally when tuning large scale JVM platforms, the underlying hardware tuning cannot be ignored, hence the session will take detour from the traditional GC tuning talks out there and dive into how you optimally size a platform for enhanced memory consumption. Lastly, the session will also cover vfabric reference architecture where a comprehensive performance study was done. Learn more about

!{iframe width="560" height="315" src="//www.youtube.com/embed/htxkAMiAD58" frameborder="0" allowfullscreen}{/iframe}