---
title: This Week in Spring - April 23rd, 2013
source: https://spring.io/blog/2013/04/23/this-week-in-spring-april-23rd-2013
scraped: 2026-02-24T08:05:56.537Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  April 23, 2013 | 0 Comments
---

# This Week in Spring - April 23rd, 2013

_Engineering | Josh Long |  April 23, 2013 | 0 Comments_

Welcome back to another installment of *This Week in Spring*! Here in San Francisco, we're experiencing the first fits of life and beautiful weather typical of *spring* time. Fitting, too, as things are busy-as-can-be in the Pivotal open source communities - including [Cloud Foundry](http://www.cloudfoundry.com) and [SpringSource](http://springsource.org) - as we march towards [the Pivotal Initiative launch on April 24th](http://www.gopivotal.com/). See you then!

Without further ado, let's get into this week's roundup:

1.  Have you guys seen the amazing [Java configuration support in Spring Batch 2.2.0.RC1](https://gist.github.com/joshlong/5441496)? The code I've just linked you to demonstrates a complete working Spring Batch job that reads in a `.csv` file and then writes the records to a data source, all of which are configured in the class, entirely in Java. This demonstrates the `@EnableBatchProcessing` annotation in 2.2.0. [Check it out](http://www.springsource.org/node/9666)!
2.  New SpringOne2GX replays now available in HD on YouTube: [Implementing Domain Driven Design with Spring and vFabric](http://www.springsource.org/node/22581), [Batch Processing and Integration on Cloud Foundry](http://www.springsource.org/node/22581) and a bonus session, [Understanding Java Garbage Collection and what you can do about it](http://www.youtube.com/watch?v=we_enrM7TSY).
3.  The [FuzzyDB open source project](https://twitter.com/fuzzydb/status/325188720510767104) tweeted that they'd [released a new version](http://fuzzydb.blogspot.com/2013/04/fuzzydb-110-released.html?utm_medium=twitter&utm_campaign=fuzzydb+blog&utm_source=twitterfeed) of FuzzyDB with Spring Data bindings aligned with the Spring Data Arora release train. Congratulations, guys!
4.  Have you had a chance to play with [Thymeleaf, the HTML5 and Spring MVC-friendly templating engine](http://www.thymeleaf.org/)? If you'd like to learn *even more*, you'll probably like this presentation called [*Thymeleaf, Will it Blend?*](http://www.slideshare.net/jasha1/thymeleaf-will-it-blend)
5.  [David Welch put together a quick demo of Spring Data Mongo](https://github.com/dwelch2344/spring-data-mongo-demo) and made the work available. He tweets that [he went from working demo in 8 minutes with 4 classes and a `pom.xml`](https://twitter.com/david_welch/status/324277624434200576). Nice work man!
6.  Check out [Ramnivas Laddad's](http://twitter.com/laddad) awesome talk [CloudFoundry Architecture talk at SpringOne2GX](http://www.springsource.org/node/22417) up live on [the SpringSource YouTube channel SpringSourceDev](http://www.youtube.com/SpringSourceDev).
7.  [Spring HATEOAS lead Oliver Gierke](http://twitter.com/olivergierke) tweeted a link to this post, ["*How I Explained REST to my wife*"](http://www.eioba.com/a/1htn/how-i-explained-rest-to-my-wife), which would seem at first to be just one person's attempt at explaining a fairly deep technology concept to a person who didn't have the same technical background, but quickly turns into a (I think *really* insightful) look at the applicability of REST. Check out [Spring HATEOAS](http://github.com/SpringSource/spring-hateoas) if you want to take your REST-fu to the next level.
8.  I'm personally enamored of the new Java configuration APIs, both those recently released and those currently available in preview releases. I showed a *very* simple example of the Spring Batch API above. I also took a moment last week to [write about the powerful Spring Social Java configuration API](http://www.joshlong.com/jl/blogPost/java_configuration_with_spring_social.html) soon to be available in the 1.1.0.M2 release.
9.  You can have Spring perform a sort of pre-condition check by using the [@Required annotation](http://static.springsource.org/spring/docs/3.0.2.RELEASE/spring-framework-reference/html/metadata.html) to *insist* at runtime that a property be satisfied with a non-`null` value, or Spring will abort the construction of the object. This helps avoid any silent `NullPointerException`s. This [JavaBeat post](http://www.javabeat.net/2013/04/required-annotation-spring/) does a nice job explaining how to use `@Required`.
10.  The *how to do in java* blog has a nice posting on how to [create a custom `UserDetailsService` in Spring Security 3](http://howtodoinjava.com/2013/04/16/custom-userdetailsservice-example-for-spring-3-security/).
11.  The *JavaCodeGeeks* blog has a nice post on [how to create RESTful services with Spring MVC](http://www.javacodegeeks.com/2013/04/spring-mvc-easy-rest-based-json-services-with-responsebody.html).
12.  *Brian's Java Blog* has a nice post on [using Spring AOP with both annotation and XML-centric configuration](http://briansjavablog.blogspot.co.uk/2013/04/spring-aop-tutorial.html) options.