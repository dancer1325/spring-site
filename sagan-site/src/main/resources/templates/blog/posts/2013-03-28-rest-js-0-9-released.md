---
title: Rest.js 0.9 Released
source: https://spring.io/blog/2013/03/28/rest-js-0-9-released
scraped: 2026-02-24T08:06:50.859Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jeremy Grelle |  March 28, 2013 | 0 Comments
---

# Rest.js 0.9 Released

_Releases | Jeremy Grelle |  March 28, 2013 | 0 Comments_

Dear Spring Community,

Today were excited to announce that rest.js is now part of [Cujo.js](http://cujojs.com/) and that rest.js 0.9 has been released.

[](https://github.com/cujojs/rest)[https://github.com/cujojs/rest](https://github.com/cujojs/rest)

rest.js is a RESTful HTTP client. It goes far beyond the typical XMLHttpRequest abstraction developers are accustomed to in other frameworks. rest.js is built upon composable interceptors that incrementally add new functionality to a client. Configured clients are tamper proof and can be safely shared within an application. If a portion of the application needs specific behavior, it can chain further interceptors on the common client creating a new client thats independent of the remainder of the application.

As a quick example, if your application requires basic authentication, you can configure the basicAuth interceptor with the username and password once, rather then being forced to add the credentials to every place in the application that makes a request. When your application adds new authentication requirements, such as oAuth, you only need to replace the basicAuth interceptor with the oAuth interceptor in one place. All requests made with the resulting client get the new behavior automatically.

Out of the box rest.js works in every major browser (and then some) plus Node.js. There are interceptors for content negotiation, HATEOAS, basic auth, oAuth (the implicit flow), error detection, retries, timeouts, JSONP and of course fall backs for IEs XHR and cross domain request support. Its dirt easy to create new interceptors to apply your own behavior.