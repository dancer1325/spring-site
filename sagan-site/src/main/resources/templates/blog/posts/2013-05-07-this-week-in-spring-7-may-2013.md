---
title: This Week in Spring - 7 May, 2013
source: https://spring.io/blog/2013/05/07/this-week-in-spring-7-may-2013
scraped: 2026-02-24T08:05:43.449Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  May 07, 2013 | 0 Comments
---

# This Week in Spring - 7 May, 2013

_Engineering | Josh Long |  May 07, 2013 | 0 Comments_

Welcome to *An Epic Week in Spring*! Lots of new sessions have been posted to SpringOne Conference, so head over to the [site](http://www.springone2gx.com) and check out the featured sessions! We'll have the agenda grid online before the end of May.

Featured SpringOne2GX 2013 sessions accepted!

```
Copy<li><a href="http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29165">Tackling Big Data Complexity with Spring</a> (Mark Fisher and Mark Pollack)</li>
    <li><a href="http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29395">Reactor - an asynch  framework for distributed web and enterprise architectures</a> (Jon Brisbin)</li>
```

-   [Spring for Snowboarders](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29409) (Dave Syer and Phil Webb)

Many other new sessions accepted as well:

-   [Taming client-server Communication](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29168) (Scott Andrews)
-   [Tuning Large Scale Java Platforms](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29396) (Emad Benjamin - VMware)
-   [AOP-ing your JavaScript](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29408) (Brian Cavalier)
-   [Integrating Splunk into your Spring Applications](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29405) (Damien Dallimore - Splunk)
-   [](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29165)[REST-ful API Evolution](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29167) (Ben Hale)
-   [Free Yourself with CloudFoundry: A Private Cloud Experience](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29404) (Mike Heath - LDS Church)
-   [Integrating Spring Batch and Spring Integration](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29169) (Gunnar Hillert and Michael Minella)
-   [Your Data, Your Search, Elasticsearch](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29406) (Costin Leau - ElasticSearch)
-   [Multi Environment Spring Applications](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29339) (Josh Long and Kevin Nilson)
-   [JSR-352, Spring Batch and You](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29170) (Michael Minella)
-   [Spring Scala](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29402) (Arjen Poutsma)
-   [Open/Closed Software - Developing freemium application using Spring Framework](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29340) (Baruch Sadogursky - jFrog)
-   [Spring Testing](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29407) (Mattias Severson - Jayway)
-   [The Pitfalls of Building Enterprise Applications](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29341) (Jeffrey Sogolov - ADP Dealer Services)
-   [](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29409)[How Not to Measure Latency](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29411) (Gil Tene - Azul)
-   [Building Reactive Apps](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29403) (James Ward - TypeSafe)

And now, back to our regularly scheduled week in Spring... as usual, we've got a lot to cover, so let's get to it!

1.  Juergen Hoeller and Marius Bogoevici's talk, [*Java EE services for Spring applications*](http://www.springsource.org/node/22604), from [SpringOne2GX 2012](http://www.twitter.com/SpringOne2GX) is now available in HD on YouTube!
2.  John Davies's talk, [*Spring Integration in the Wild*](http://www.springsource.org/node/22604), from [SpringOne2GX 2012](http://www.twitter.com/SpringOne2GX) is now available HD on YouTube!
3.  Kim Saabye Pedersen has written a small example [on using `@Transactional` on an interface with Spring's transaction management infrastructure](http://kim.saabye-pedersen.org/2013/05/spring-annotation-on-interface-or-class.html). Nice job, Kim!
4.  Would it be possible to take Spring Petclinic as it is now and scale it up to 1000 requests per second on a single server instance? Julien Dubois from Ippon Technologies has written a great series of five blog entries on that topic. If you missed them from the previous roundups, check out the whole series, starting [here](http://blog.ippon.fr/2013/03/11/improving-the-performance-of-the-spring-petclinic-sample-application-part-1-of-5/)!
5.  Petri Kainulainen has written a great post introducing how to sort data using [Spring Data SOLR](http://www.petrikainulainen.net/programming/solr/spring-data-solr-tutorial-sorting/).
6.  By the by, I know I've mentioned this before, but it *really* is handy. Have you checked out [Alvaro Videla's](http://twitter.com/old_sound) [RabbitMQ simulator](https://github.com/RabbitMQSimulator/RabbitMQSimulator)?
7.  Spring Data ninja [Oliver Gierke](https://twitter.com/olivergierke) has written a [great response](http://stackoverflow.com/questions/16325606/making-spring-data-mongodb-multi-tenant/16326023#16326023) to the question, *How do I use Spring Data MongoDB in a multi-tenant fashion?* Be sure to check it out. Generally, his advice is applicable to many such scenarios.
8.  Serkan ÖZAL has put together [an awesome, bytecode-based `RowMapper`](http://serkan-ozal.github.io/spring-jdbc-roma/) that can be used with Spring's JDBC infrastructure (like `JdbcTemplate`) and that can handle relationships like an ORM might. Because it's bytecode-based, it's very fast and not given to the same reflection-based performance limitations of Spring's own `BeanPropertyRowMapper`. I haven't tried this out yet, but it looks *very* promising!
9.  Our friend Roger Hughes is back with a tutorial (of two posts, thus far). The first, [*RESTful Ajax with Spring MVC*](http://www.captaindebug.com/2013/04/spring-mvc-ajax-and-json-part-1-setting.html#.UYlw6StAQQQ), establishes an application (*without* REST and Ajax) and the second then [introduces serializing data objects using Jackson](http://www.captaindebug.com/2013/05/spring-mvc-ajax-and-json-part-2-server.html#.UYlxEStAQQQ), a JSON serializer.
10.  Bharat Sharma *also* [wrote a nice post on serializing to JSON](http://bharatonjava.wordpress.com/2013/05/05/spring-3-mvc-and-json-response/) with Spring MVC this week!
11.  Blogger [Kal](http://www.blogger.com/profile/00139250878494043682) wrote up a nice post on how [Spring MVC simplifies file-uploads with Spring MVC and `commons-fileupload`](http://runkalrun.blogspot.com/2013/05/simple-file-upload-with-spring-mvc.html).