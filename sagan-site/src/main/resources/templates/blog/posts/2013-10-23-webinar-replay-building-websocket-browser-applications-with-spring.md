---
title: Webinar Replay: Building WebSocket Browser Applications with Spring
source: https://spring.io/blog/2013/10/23/webinar-replay-building-websocket-browser-applications-with-spring
scraped: 2026-02-24T07:55:23.889Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Chloe Jackson |  October 23, 2013 | 0 Comments
---

# Webinar Replay: Building WebSocket Browser Applications with Spring

_News | Chloe Jackson |  October 23, 2013 | 0 Comments_

Speaker: Rossen Stoyanchev

Slides: [https://github.com/rstoyanchev/webinar-websocket-spring](https://github.com/rstoyanchev/webinar-websocket-spring)

Code: [https://github.com/rstoyanchev/spring-websocket-portfolio](https://github.com/rstoyanchev/spring-websocket-portfolio)

So, you've written a "Hello world!" WebSocket application or perhaps even a chat sample. You're able to exchange messages even in pre-Servlet 3.1 containers and pre-IE 10 browsers (that don't yet support WebSocket) thanks to the SockJS protocol and Spring's support for it. However a message is a blank page that can have any content. Whatever message format you choose, proprietary or standard, both client and server need to understand it as well as distinguish different kinds of messages. You need support for the publish-subscribe pattern central to messaging applications so you can broadcast messages to one or more subscribers. You need to incorporate security, validation, and so on. In short you need to build a real-world application. If you're used to web applications (and Spring MVC annotated controllers) you are familiar with the foundation that HTTP provides including URLs (nouns), HTTP methods (verbs), headers, parameters, and others. Imagine building an application without HTTP, just a socket. WebSocket gives you this brand new, exciting capability -- full duplex, two-way communication -- yet you no longer have an application-level protocol. Can an entire application be built around a single Endpoint class processing all messages, assuming a single WebSocket connection between browser and server? Join Rossen Stoyanchev as he demonstrates that, thankfully, the WebSocket protocol has a built-in sub-protocol mechanism.

!{iframe width="420" height="315" src="//www.youtube.com/embed/mmIza3L64Ic" frameborder="0" allowfullscreen}{/iframe}