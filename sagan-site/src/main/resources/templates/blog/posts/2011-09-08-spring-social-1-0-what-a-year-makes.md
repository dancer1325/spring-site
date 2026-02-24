---
title: Spring Social 1.0: What a Year Makes
source: https://spring.io/blog/2011/09/08/spring-social-1-0-what-a-year-makes
scraped: 2026-02-24T08:34:57.883Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Craig Walls |  September 08, 2011 | 0 Comments
---

# Spring Social 1.0: What a Year Makes

_Engineering | Craig Walls |  September 08, 2011 | 0 Comments_

Show of hands: Who’s on Facebook? Any Twitter users reading this?

Almost everyone I know is on Facebook, Twitter, LinkedIn, or some other social network site. In fact, most people I know maintain a presence on multiple social network sites. According to recent numbers thrown about, Facebook has over 750 million users and Twitter has over 200 million users. Even my mom is on Facebook.

Okay, you can put your hands down now.

With such a large audience, it can be easy to find business-led motives for building applications that target those users. From a more personal, individual perspective, working with a social networking service is also fun. It can be very rewarding to develop something that your friends and family will recognize, understand, and maybe even use. In addition to the “fun” factor, there’s also a “wow” factor when you tell people you write programs that target those platforms. When you say “Facebook” or “Twitter” everyone—even my mom—understands at least some part of what your app does.

For a little over a year, I’ve been lucky enough to be able to have a lot of fun working with Facebook, Twitter, and other similar services. Last May, [Keith Donald](http://blog.springsource.com/author/keithd/), [Roy Clarkson](http://blog.springsource.com/author/rclarkson/), and I started exploring what building social and mobile applications entails. That led us to develop the [Greenhouse](http://www.springsource.org/greenhouse) reference application, from which we extracted reusable components that became the [Spring Social](http://www.springframework.org/spring-social), [Spring Mobile](http://www.springframework.org/spring-mobile), and [Spring Android](http://www.springframework.org/spring-android) projects.

Today I’m excited to announce the [release of Spring Social 1.0](http://www.springsource.org/spring-social/news/1.0.0-released), an extension to the Spring Framework that enables applications to connect to Software-as-a-Service providers on behalf of their users. Now that 1.0 is out, I'd like to take a moment to reflect on the work we’ve done in the past year and highlight a few things that I’m most excited about.

## A Connection Framework

Almost all service providers use [OAuth](http://oauth.net/) to secure their APIs. But not all providers implement the same version of OAuth. There are three versions of OAuth (1.0, 1.0a, and 2). Moreover, OAuth 2 still isn’t final yet and there are currently 21 drafts of the specification, any of which a provider may have based their implementation on. For example, Twitter is an OAuth 1.0a provider while Facebook implements OAuth 2-draft 12.

No matter which version of OAuth is in play, a consuming application must obtain an access token from the provider and send it along with each request to the provider’s API. But the specifics of how to obtain an access token and use it vary with each version of OAuth.

I don’t think that writing code that wrangles OAuth versions and access tokens is a good use of your time. That’s why we developed Spring Social to free you from dealing with the intricacies of OAuth. [Spring Social’s connection framework](http://static.springsource.org/spring-social/docs/1.0.x/reference/html/serviceprovider.html) is unique in that you simply configure it with your application’s key and secret (received when you register your application with the provider) and it will take care of the rest. You needn’t concern yourself with which version of OAuth is in play, how to send an access token on a request, or how to store the access token for long-term use.

## API Bindings

Once your application has authorized with a service provider, it can access the provider’s API with the permissions granted by the user. Each provider exposes its platform through some form of RESTful service and, for the most part, the resources in the API are well-documented. So you could use Spring's [RestTemplate](http://static.springsource.org/spring/docs/3.0.x/javadoc-api/org/springframework/web/client/RestTemplate.html) to consume those resources from your application. But you’d still need to ensure that each request carries the access token. You’d also need to deal with binding the data returned from the provider’s API to Java objects. And, when things go sour, you’d also need to handle any errors returned from the API.

But if you’re using Spring Social, those details are handled for you. Spring Social offers Java-based APIs bound to service provider REST APIs. This not only enables you to interact with a provider API in Java terms, but also makes sure that each request to the REST API carries the access token and signature. Spring Social provides complete API bindings for both [Facebook](http://static.springsource.org/spring-social-facebook/docs/1.0.x/reference/html/overview.html) and [Twitter](http://static.springsource.org/spring-social-twitter/docs/1.0.x/reference/html/overview.html) and there are also API bindings started for other providers such as [LinkedIn](https://github.com/SpringSource/spring-social-linkedin), [TripIt](https://github.com/SpringSource/spring-social-tripit), [GitHub](https://github.com/SpringSource/spring-social-github), and [Gowalla](https://github.com/SpringSource/spring-social-gowalla).

The API bindings also handle the error messages returned from the provider APIs. Under the covers of each API binding is an error handler that converts any error message from the provider into a meaningful exception that you can catch and handle in your application code. The error handling is especially valuable when you consider that the errors returned from the provider APIs can be quirky. Facebook errors are especially baffling, often reporting OAuth errors when the problem isn’t even remotely OAuth-related.

For example, if your application gets a little overzealous posting messages to a user’s Facebook wall, Facebook will return the following JSON object with an HTTP 400 status code in the response:

```javascript
Copy
{"error":{"type":"OAuthException","message":"(#341) Feed action request limit reached"}}
```

Neither the HTTP status code nor the “type” field are useful in knowing what went wrong. If it weren’t for the Facebook module’s error handler, you’d be left to parse the “message” field to know what the problem is. But if you’re using Spring Social’s Facebook API binding, a [RateLimitExceededException](http://static.springsource.org/spring-social/docs/1.0.x/api/org/springframework/social/RateLimitExceededException.html) will be thrown. You can report the problem to the user, log it, or simply ignore it. But you won’t have to deal directly with the enigmatic error coming back from Facebook.

## An Extensible Framework

One of the things that has always impressed me about the Spring Framework (as well as all of the other SpringSource projects) is that its capabilities don’t end with what comes in the JAR files. If the framework doesn’t do quite what you want it to do, you can implement some interface or extend some class and make it do what you need it to do. Keeping with that tradition of extensibility, Spring Social offers several opportunities to customize and add capabilities that exceed what comes out-of-the-box.

For instance, when it comes to persisting connection data, Spring Social provides a JDBC-based connection repository implementation. But if the out-of-the-box implementation doesn’t meet your needs, you may write your own. Look no further than the Spring Android project to see how Spring Social can be extended to support SQLite-based connection persistence.

Another way you may extend Spring Social is to [add support for a new service provider](http://static.springsource.org/spring-social/docs/1.0.x/reference/html/implementing.html). All you need to do is write the API binding and configure the connection support and you're done. There are already a number of community-led projects that are extending Spring Social to add support for new SaaS providers.

Speaking of the Spring Social community…

## An Active and Growing Community

The connection framework, API bindings, and extensibility are powerful features of Spring Social and enable your Spring applications to plug into your users’ social graphs. But features aside, it’s important that Spring Social have a strong community if it is to be successful. Therefore, I’m especially proud of the fact that we have an active and growing community forming around the Spring Social project.

Taking advantage of Spring Social’s extensibility, a number of community members have authored extensions, including…

-   Matt Wright has developed [Spring Social Instagram](https://github.com/mattupstate/spring-social-instagram) and [Spring Social Foursquare](https://github.com/mattupstate/spring-social-foursquare)
-   Morton Andersen-Gott has developed [Spring Social Yammer](https://github.com/magott/spring-social-yammer)
-   Bryce Fischer has started working on [Spring Social Dropbox](https://github.com/vbfischer/spring-social-dropbox)
-   Gabriel Axel has started work on [Spring Social Google](https://github.com/guznik/spring-social-google)
-   Marc Schipperheyn has developed a [JPA-based connection repository](https://github.com/mschipperheyn/spring-social-jpa)
-   Vincent Devillers has started work on [Spring Social Viadeo](https://github.com/Treydone/spring-social-viadeo)
-   Stefan Fussenegger has created a [security module for Spring Social](https://github.com/molindo/spring-social/tree/security) for tighter integration with Spring Security
-   SynergJ has created a [Spring Social plugin for Grails](https://github.com/synergyj/grails-spring-social-core)

In addition to these code contributions, we're now up to [seven sample applications](https://github.com/SpringSource/spring-social-samples), each illustrating different features and use cases. There has been some great discussion in the forum as well as ideas and bug reports in the issue tracker. I’d like to thank everyone involved for their participation thus far.

## In Summary

It’s been an exciting year leading up to Spring Social 1.0, and there is a lot to be excited about with this big release. Now that we have a strong, stable foundation, I’m looking forward to seeing where Spring Social goes from here. I'd love to see streaming support for the Twitter and Facebook API bindings, user management capabilities, an invitation system, enhanced OAuth provider support, tighter Spring Security integration, and more. What do you want to see?

I hope you are having as much fun with Spring Social as we are. Please do share in a comment how the framework is working out for you. I also invite you to join me for a webinar I'll be hosting on September 29th ([North America](http://www.springsource.org/node/3230) | [Europe](http://www.springsource.org/node/3229)) where I will perform a live walkthrough of the Spring Social project. I hope to see you then!