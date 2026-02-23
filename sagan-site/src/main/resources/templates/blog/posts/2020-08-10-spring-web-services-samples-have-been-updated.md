---
title: Spring Web Services Samples have been updated!
source: https://spring.io/blog/2020/08/10/spring-web-services-samples-have-been-updated
scraped: 2026-02-23T13:52:48.857Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  August 10, 2020 | 2 Comments
---

# Spring Web Services Samples have been updated!

_Engineering | Greg L. Turnquist |  August 10, 2020 | 2 Comments_

Dear Spring community,

Spring Web Services Samples ([spring-ws-samples](https://github.com/spring-projects/spring-ws-samples)) has been upgraded!

You might have known this, but many parts of this collection of samples goes all the way back to 2006. Today, I am happy to report it has been updated in a multitude of ways.

-   Introduction to Spring Boot
    
-   Introduction to Spring Data
    
-   Removal of outdated technologies
    
-   Removal of redundant samples
    

This was a hard-won task that took me several weeks, but based on the incredible persistence of SOAP, it was something that had to be done to serve the Spring community.

### [](#introduction-to-spring-boot)[](#introduction-to-spring-boot)Introduction to Spring Boot

One of the biggest glaring things missing from this repository was an appearance of Spring Boot.

If you’ve been on this blog site for long, you’re aware of how cool and popular Spring Boot is. These samples were created long before Spring Boot arrived, and they needed to be updated to take full advantage of the state of the art. But not because we’re merely "dogfooding" our own stuff.

Spring Boot introduces key concepts that any project should embrace. One of the most important is keeping up with stable, secure versions. Anytime a vulnerability is reported against the Spring portfolio, our team assesses the impact, develops a plan, rolls out the change, and informs the community so everyone can safely upgrade.

Upgrading applications by simply bumping the version of Spring Boot is incredible. Coupled with the Spring team’s dedication to backwards compatibility, you know you have a solid stack when you pick up Spring Boot, and that you won’t be left in the dust.

Pulling all of these samples onto Spring Boot is a pivotal change that will allow us to make future updates even easier.

But that is not all.

The other magic of Spring Boot is a reduction in the amount of code you personally have to write. As I once said at a SpringOne conference, the code you don’t write has no bugs. Being able to pitch chunks of infrastructure that are instead handled by Spring Boot is a mega-relief.

Of course, this must be hedged by the fact that Spring Boot doesn’t have *a lot* of Spring WS-based code in it. But it does have some bits and pieces. But that isn’t the only thing at stake.

The older version of this repository was loaded with code used to spin up servers. Essentially, DIY (Do It Yourself) variants of baking a WAR file and lauching it with Tomcat.

Yikes!

As Josh Long, a.k.a. @starbuxman, likes to say, "make JAR not WAR." By upgrading to a JAR-based approach and leaning on Spring Boot’s Apache Tomcat autoconfiguration, were were able to drop any such stuff from the build system and the code base.

Now, almost everything runs on the proper version of Apache Tomcat, out-of-the-box.

### [](#introduction-to-spring-data)[](#introduction-to-spring-data)Introduction to Spring Data

The **airline** samples were based upon a flight reservation system where you look up flights and then make your reservation request. And it used JPA to store all this data.

When’s the last time you rolled JPA by hand? I mean, *all* of it. By hand.

By migrating toward Spring Data JPA’s repository-based solution, probably around half of that custom code was scrapped in favor of interfaces with finder methods and `@Query` -annotated methods. (See earlier comment about code you don’t write!)

And it’s not just about throwing out unnecessary code. It’s deeper than that. By using modern framework approaches, you also know that resources are being managed properly. Transactions are handled correctly. Data stores are better used per industry standards.

It’s a win.

### [](#removal-of-outdated-technologies)[](#removal-of-outdated-technologies)Removal of outdated technologies

A lot of SOAP-based tools back in the early 2000s were based on Ant, which has been overtaken by Maven and Gradle.

When you work with a low-level build system like Ant, you find yourself spending more than a fair share of time *in* that build system. By pulling things up to Maven, with a touch of embedded Ant jobs, it’s a lot easier to make project-level changes.

On top of that, migrating to Spring Boot 2.3.1.RELEASE exposed that the samples were running on Spring Framework 3.

Wow! Talk about a blast from the past. It was nice to know that *everything* operated quite smoothly when I bumped it all up to Spring Framework 5, with but one exception (a marshalling component from Apache’s XML Beans that had been deprecated and removed long ago).

Turns out, Apache XML Beans is *still* alive, but the three people probably using it *already* know how to integrate their apps together.

Moving over to the JAXB marshaller solved that, and away we went.

I was also able to drop OpenJPA and switch to the more popular Hibernate. Moving everything to modern day JPA + Hibernate lets us rejoin a vast community. If anyone in the community needs help, it will now be much easier for the whole community to respond on places like StackOverflow.

### [](#removal-of-redundant-samples)[](#removal-of-redundant-samples)Removal of redundant samples

This update wasn’t just about bumping versions. It also included assessing all the modules we had.

After updating the **airline** example, which includes demonstrating SAAJ, Axis1, JAX-WS, JMS, and Spring WS, it became apparent that *each* demo had multiple SOAP providers demonstrated. There are also demos that include the SOAP-based security providers as well as MTOM (Message Transmission Optimization Mechanism).

At a certain point, you have covered all the bases and don’t need any more. And that’s why the Stock Quoting demo was pulled. It didn’t offer much that was different in integrating technologies together, so I pulled it.

Having delegated much to Spring Boot and Spring Data, the number of samples we need to upkeep slims down and makes it easier to serve the community with up-to-date, cohesive examples.

## [](#introspection-on-soap-and-rest)[](#introspection-on-soap-and-rest)Introspection on SOAP and REST

There is a certain irony in being both the project lead for Spring Web Services (SOAP) and a key contributor to Spring HATEOAS (REST). I’ve worked with members of both communities for several years.

Working hip deep in a contract-based paradigm really highlighted (for me) the differences between SOAP and REST.

SOAP is about capturing the contract that connected two systems. While it sounds nice to hammer out the details of the comm traffic between two sytems, there is a side effect. The consequence of such a well-defined and detailed contract is that the interface becomes quite brittle. The slightest change can break things, i.e. require an update to ALL parties involved. And this is something that gets magnified when your business goes international and hits modern-day scale.

REST on the other hand is based on system-level transitions and flexibly serving these options. With the lack of a contract, it’s possible to send MORE than the user needs, offering a way to put backwards compatibility into your messaging. Users have the discretion to only consume the parts they want. And if you keep old links while offering new ones, you can achieve what is known as Postel’s Law or the Robustness Principle. "Be conservative in what you send and liberal in what you accept."

We’ve seen the success of the web, built heavily on HTML and the fact that you don’t have to update your browser every time a website gets updated. There have even been studies showing that flexible APIs that are backwards compatible have an overall reduced cost to both clients and server teams, over the lifetime of the API.

I felt this lack of flexibility as I updated each and every demo. Each demo seemed to require the same effort as aligning an array of mirrors to pinpoint a laser beam. I missed the ease of creating JSON-based services combined with hypermedia. (And maybe I’ll produce a video some day on this very subject!)

Nevertheless, some systems are tied to SOAP and you need all the help you can get. Spring Web Services aims to reduce the complexity as much as is possible. And we’re with you every step of the way.

## [](#we-need-your-help)[](#we-need-your-help)We need your help!

Despite all these changes and updates, I’m sure there are parts that got overlooked. Or sections that could use even more love and care.

And we need your help to do it!

If you spot issues anywhere in the samples, or things you feel are way out of align, don’t hesitate to [open a ticket](https://github.com/spring-projects/spring-ws-samples/issues).

And speaking of community, this effort would not have been complete without [Gyula Szalai](https://github.com/vanioinformatika/spring-ws-mtom-example), who had grabbed a copy of our MTOM sample back in 2014, Maven-ized it, and pushed it to Github. Battling SOAP demons at 2:00 AM can be tricky. Having this working example really paved the way toward getting this release to you.

Cheers,

\-Greg Turnquist