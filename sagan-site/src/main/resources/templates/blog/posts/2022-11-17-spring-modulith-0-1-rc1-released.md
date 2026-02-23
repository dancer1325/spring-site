---
title: Spring Modulith 0.1 RC1 released
source: https://spring.io/blog/2022/11/17/spring-modulith-0-1-rc1-released
scraped: 2026-02-23T10:33:38.702Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Oliver Drotbohm |  November 17, 2022 | 2 Comments
---

# Spring Modulith 0.1 RC1 released

_Releases | Oliver Drotbohm |  November 17, 2022 | 2 Comments_

I am pleased to announce the first and final release candidate of Spring Modulith 0.1. The release primarily is a preparation for the GA one to follow Spring Boot 3.0 GA some time next week. That said, we managed to sneak [a couple of improvements](https://github.com/spring-projects-experimental/spring-modulith/releases/tag/0.1.0-RC1) into the Application Module Canvas that will surely be helpful. The Canvas now lists Spring bean references into other modules explicitly and thus documents the required interface of the module, just like constructor arguments describe the dependencies of a class.

![202445150 8c5422b9 031e 441f a5dc 4184b78d65f8](https://user-images.githubusercontent.com/128577/202445150-8c5422b9-031e-441f-a5dc-4184b78d65f8.png)

Figure 1. Spring bean references in the Application Module Canvas

Also, the Canvas now includes value types exposed by a module. These types are identified by either the annotations or interfaces provided by the [jMolecules DDD library](https://github.com/xmolecules/jmolecules#use-case-express-ddd-concepts).

![202445176 da02018e f1bd 4f2c 9e81 ccfbbf307b4c](https://user-images.githubusercontent.com/128577/202445176-da02018e-f1bd-4f2c-9e81-ccfbbf307b4c.png)

Figure 2. Value types exposed by the Application Module in the Application Module Canvas

We are currently planning to release 0.1 GA on top of Spring Boot 3.0 GA mid next week.