---
title: Spring Web Flow Java One 2007 Demo
source: https://spring.io/blog/2007/05/18/spring-web-flow-java-one-2007-demo
scraped: 2026-02-24T09:29:29.938Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  May 18, 2007 | 0 Comments
---

# Spring Web Flow Java One 2007 Demo

_Engineering | Keith Donald |  May 18, 2007 | 0 Comments_

When Sun scheduled my JavaOne 2007 session on [Spring Web Flow](http://www.springframework.org/webflow) for Friday, the last day of the conference, I wasn't sure what to expect. I was honored to have been accepted again this year, but I wondered what I would see in terms of attendance presenting on the last day of the 4-day conference.

I could not have been more pleased with how things transpired. When I checked in at speaker setup on Thursday 800 people had pre-registered for my Friday session. Fifteen minutes before my talk was to begin the room had reached that number. In the end, 1000 JavaOne attendees came to room 307-310 of the Moscone center to experience an adrenaline-powered Spring Web Flow test drive.

### Spring Web Flow Test Drive

In this blog I am hoping to re-create some the most exciting parts of my JavaOne Web Flow presentation. Checkout the screen cast below to see what was personally the most exhiliterating part of the presentation for me--building out a search flow from the ground up for deployment in a Java Server Faces (JSF) environment.

 

This search flow lets you enter some search criteria, see some results, execute a new search, and browse a result's details if you choose (existing WebFlowians will recognize this as the JSF version of the familiar [Phonebook sample application](http://www.ervacon.com/products/swf/intro/index.html)).

When watching the screen cast note how Web Flow manages all navigation and state for the application, while standard JSF components care for view rendering and model data binding. Also note even when I screw something up I can quickly fix it and get back to work because I never need to restart my server or switch my editor.

The Spring IDE visualization of this flow is below:

![Search flow](http://blog.interface21.com/main/wp-content/uploads/2007/05/search-flow.png)

Get the code for this demo [here](http://static.springframework.org/spring-webflow/resources/phonebook-jsf/phonebook-webflow-jsf.zip). If you are using Eclipse with Web Tools you can import phonebook as an Dynamic Web Project and fire up the webapp inside your IDE.

### Spring Web Flow at Spring One

Be sure to catch Erwin's talks on Spring Web Flow at [SpringOne](http://www.springframework.org/springone) on June 20th-22nd. He'll be presenting two very interesting sessions that show how to put this product to work.