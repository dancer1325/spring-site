---
title: This Week in Spring - December  10th , 2013
source: https://spring.io/blog/2013/12/10/this-week-in-spring-december-10th-2013
scraped: 2026-02-24T07:49:49.360Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  December 10, 2013 | 0 Comments
---

# This Week in Spring - December  10th , 2013

_Engineering | Josh Long |  December 10, 2013 | 0 Comments_

![](https://pbs.twimg.com/media/BbKWJseCIAAcBqg.png ) Welcome to another installation of *This Week in Spring*! This week I'm going to be in Los Angeles, talking to developers at Disney about Spring. If you're in the area, I'd love to see you all there, too. We're hosting a user-group meeting on December 11th. Here are [some details](http://www.meetup.com/Pivotal-Open-Source-Hub/events/149121902/) on the event, which takes place tomorrow! I look forward to seeing you there!

Can you believe we're already staring down the end of the year? @\_@

That means it's time for the annual release of Spring Framework, 4.0! We look forward to your feedback on the release.

[![Spring Framework](https://pbs.twimg.com/media/BbKU5huCIAAvE5C.png)](https://spring.io/blog/2013/12/06/webinar-introduction-to-spring-framework-4-0)

1.  Don't miss the [Spring Framework 4.0 launch webinar, "Introduction to Spring Framework 4.0](https://spring.io/blog/2013/12/06/webinar-introduction-to-spring-framework-4-0)", with none other than Juergen Hoeller, on Jan 9th, 2014, first major Spring Framework release since 2009!
2.  Be sure to check out the webinar by busiest guy in code-business and Spring Security lead [Rob Winch](@rob_winch) on Jan 16, 2014 to hear about [Spring Security 3.2](http://bit.ly/1d5IHC8).
3.  Spring Framework committer and co-lead of Spring Boot Phil Webb introduces Spring 4's new support for [Java generics in Spring 4](http://spring.io/blog/2013/12/03/spring-framework-4-0-and-java-generics).
4.  Thomas Darimont introduces what's new in [Spring Data MongoDB 1.4 M1](https://spring.io/blog/2013/12/04/what-s-new-in-spring-data-mongodb-1-4-m1), including the phenomenal new projection framework and SpEL integration.
5.  If you're a user of the Spring-powered [Broadleaf e-commerce engine](http://twitter.com/broadleaf), then you might want to register for [the v3.1 web event](http://bit.ly/1aAb7Sd).
6.  Our pal Tobias Flohre is back with yet another awesome post, [Batch processing and the Java Enterprise Edition (JSR-352, JEE7, Spring Batch)](https://blog.codecentric.de/en/2013/11/batch-processing-java-enterprise-edition-jsr-352-jee7-spring-batch/). The title speaks for itself - its a good quick overview of where the technologies sit.
7.  And, [Petri Kainulainen](http://twitter.com/petrikainulaine) is back at it again with an awesome followup to his series on adding social features to a Spring MVC Web Application with Spring Social. This post is on [unit testing that integration](http://t.co/tbfF4DBzAW).
8.  The [@GoPivotal blog](http://blog.gopivotal.com) has an interesting case study of [RabbitMQ's deployment at Norwegian Broadcast corporation](http://blog.gopivotal.com/case-studies-2/case-study-how-norwegian-broadcasting-corporation-uses-rabbitmq).
9.  Speaking of Phil Webb and Rob Winch, one of the amazing things included in last week's announcement of Spring Framework RC2 was their wonderful addition of a "bill of materials" Maven POM: `spring-framework-bom`. Use it like this:
    
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-framework-bom</artifactId>
                <version>4.0.0.RC2</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
    Then, simply import the version of the Spring dependency that you want without specifying the version in your `pom.xml`.
    
10.  There's *another* case study on the GoPivotal blog, this on now [Hulu scaled serving 4 billion videos using Redis](http://blog.gopivotal.com/case-studies-2/case-study-how-hulu-scaled-serving-4-billion-videos-using-redis#!). That's awesome!
     
11.  Sudhir Dharmadhikari put together an interesting post [on using Spring Roo's aspect approach the AndroMDA project](http://java2js.blogspot.com/2013/12/if-you-love-code-generation-you-must.html)
12.  [Bozhidar Bozhanov](https://twitter.com/bozhobg), who I loved getting to see again last week in Sofia, has moved the [Spring Social Google+ code to GitHub](https://github.com/Glamdring/google-plus-java-api).
13.  ![](https://pbs.twimg.com/media/BbKW3tRCAAATE3Q.png)

```
CopyLast but not least, It's Pivotal day at Manning!  
```

All Spring and Groovy books half price on special deal days, to celebrate the Spring Framework 4.0 launch, Pivotal is sponsoring Spring and Groovy day in Manning's Countdown to 2014! On certain deal days like Monday Dec 9,10; Thursday Dec 12, 13; Monday Dec 23, 24; and Thursday Dec 26, 27, you can get any of Manning's Spring and Groovy books for half off-eBook, pBook, or MEAP. Just go to [Manning.com](http://manning.com) and choose any (or all) of these selected books. Enter `gpivdotd13` in the Promotional Code box when you check out to get the discount. BONUS: [If you register for *Manning's Countdown to 2014*](http://deals.manningpublications.com/countdown2014.htm), you'll have a chance to win one of two eBooks given away daily and a shot at the grand prize, an iPad Air. [Click for details](http://deals.manningpublications.com/countdown2014.html). This offer applies to *Spring in Action, Fourth Edition*, *Spring in Practice*, *Spring Batch in Action*, *Spring Integration in Action*, *Groovy in Action, Second edition*, *Grails in Action, Second Edition*, *Griffon in Action*, *Gradle in Action*, *RabbitMQ in Action*, and *RabbitMQ in Depth*. You'll find complete descriptions of all these books, along with sample chapters and other resources, at manning.com.