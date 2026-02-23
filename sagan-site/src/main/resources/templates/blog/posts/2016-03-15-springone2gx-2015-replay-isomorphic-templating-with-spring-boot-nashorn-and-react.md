---
title: SpringOne2GX 2015 replay:  Isomorphic templating with Spring Boot, Nashorn and React
source: https://spring.io/blog/2016/03/15/springone2gx-2015-replay-isomorphic-templating-with-spring-boot-nashorn-and-react
scraped: 2026-02-23T19:23:36.472Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Pieter Humphrey |  March 15, 2016 | 0 Comments
---

# SpringOne2GX 2015 replay:  Isomorphic templating with Spring Boot, Nashorn and React

_News | Pieter Humphrey |  March 15, 2016 | 0 Comments_

Recorded at SpringOne2GX 2015. Speaker: Sebastian Deleuze Web / JavaScript Track Slides: [http://www.slideshare.net/SpringCentral/isomorphic-templating-with-spring-boot-nashorn-and-react](http://www.slideshare.net/SpringCentral/isomorphic-templating-with-spring-boot-nashorn-and-react) The first part of this talk introduces the upcoming Spring Framework 4.2 Script Templating support, showing how you can use Nashorn, Jython or JRuby to render templates with Javascript, Python or Ruyby based template engines. We will see how easy you can extend out of the box capabilities on the scripting side. Based on benchmarks, features available and code samples, we will see if this can be a production ready alternative to templating technologies usually used with Spring MVC like JSP, Velocity, FreeMarker or Thymeleaf. The second part of the talk will explain how to build an isomorphic application that performs the same templates rendering on client AND server based on Spring Boot, Nashorn and React, the the latest game changer Javascript library released by Facebook. The rendering of Javascript templates is performed initially on server-side thanks to a Spring MVC + Nashorn integration, then enriched on client side with a Server-Sent Events push mechanism. This kind of isomorphic templating + the disruptive innovation brought by React with his virtual DOM mechanism make it possible to build a new kind of applications : responsive, with a great UX while being accessible.