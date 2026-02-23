---
title: Spring Initializr updates
source: https://spring.io/blog/2019/03/21/spring-initializr-updates
scraped: 2026-02-23T14:54:34.680Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Damien Vitrac |  March 21, 2019 | 2 Comments
---

# Spring Initializr updates

_Engineering | Damien Vitrac |  March 21, 2019 | 2 Comments_

On behalf of the team and everyone who has contributed, I'm happy to announce that **Spring Initializr** has been updated and is now available on [start.spring.io](https://start.spring.io).

## [](#ui-changes---listening-to-your-feedback)UI changes - listening to your feedback

Following the last revision, the [main feedback](https://spring.io/blog/2019/03/05/spring-initializr-new-ui) we received was about the missing list of dependencies. Some community members seemed to be looking at this list for information purposes (not necessarily using the website to generate a new app), while others would just like to see what's available.

![](https://static.spring.io/blog/damienvitrac/20190318/initializr.png)

While [start.spring.io](https://start.spring.io) seems like a very simple service, generating applications with a simple HTML form, there's much more to it - this round of feedback taught us that we need to double-down on product discovery and user centered design.

We brought the **dependency list** back to the page but in a way that will help us to better understand how the website is being used and how to improve it. We hope that the community will find in that list what was missing in the previous version.

Of course, we fixed a few HTML/CSS issues and improved version incompatibility messages to help you select the appropriate Spring Boot version.

## [](#architecture)Architecture

This application is still made of two parts:

-   The [Initializr library](https://github.com/spring-io/initializr) that contains the project generation logic and the Web API
-   The [start.spring.io](https://github.com/spring-io/start.spring.io) service instance, with the specifics behind the instance running in production

Because the **Web UI** changes will be more and more involved, we've decided to move all Web UI-specific code to the start.spring.io project. This will hopefully clarify things. If you're interested in running a service very similar to start.spring.io, you should now fork the start.spring.io project. If you'd like to write your own Web UI or work on core changes, then using the **Initializr library** is a good starting point.

## [](#whats-next)What's next?

Over the next couple of weeks we will be conducting **user interviews** to gain better insights on how to improve the website experience and a deeper understanding of the **"whys"** behind how users are interacting with the service.

As we cannot interview all of our users (we appreciate you all!), we invite you to leave your input and thoughts with our optional [anonymous survey](https://docs.google.com/forms/d/1CsQaJAYFntD8FkBz-2zjtew8maj2JWxV2Fv2ugea_VA/viewform?ts=5c8f9ee0&edit_requested=true). This will allow us to build a larger picture of how people are using the service and the expectations and wants from the community.

Thank you for your feedback and support as we continue on this journey.