---
title: Enterprise Java and the American Motors Gremlin
source: https://spring.io/blog/2009/04/15/enterprise-java-and-the-american-motors-gremlin
scraped: 2026-02-24T09:09:02.814Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  April 15, 2009 | 0 Comments
---

# Enterprise Java and the American Motors Gremlin

_Engineering | Rod Johnson |  April 15, 2009 | 0 Comments_

You may remember the [AMC Gremlin](http://en.wikipedia.org/wiki/Amc_gremlin)\--a strong claimant for ugliest car ever. The Gremlin was produced back in the 70s, but there are still a few around, like this one, which I photographed last year in San Francisco.

![AMC Gremlin](http://blog.springsource.com/wp-content/uploads/2009/04/amc_gremlin.jpg)

The enterprise Java experience today reminds me of this piece of American motoring heritage. The Gremlin was a desperate response to the oil shock. AMC needed a “compact” car, so they took the smallest car they had and chopped it in half. The end result sold surprisingly well, but showed unmistakable signs of the fact that its front and rear were produced by different teams and hastily cobbled together. Needless to say, it was Japanese and European manufacturers who triumphed in the shift toward smaller cars.

## Gremlins in Java

Today, enterprise Java feels a lot like the Gremlin, and it's a major issue in terms of productivity. Both up and down the stack and throughout the application lifecycle, the parts are cobbled together from different sources. While most of the parts are perfectly fine, others are gross overkill for typical scenarios. Sadly, we've come to regard this as normal and become resigned to the productivity consequences. For example, it's usual to build applications with an open source build tool (Ant or Maven); use an IDE from a different project or vendor, manually integrating numerous plugins; architect applications around open source frameworks; yet deploy to an application server from yet another vendorâwith the integration often relatively superficial.

A few parts of the picture are pretty much givens: like Spring and Hibernate, an Eclipse-based tool suite, and (increasingly) Apache Tomcat. But the whole relies both on developers making numerous choices for each project, and substantial in-house glue and supportâthe latter, another area in which we ignore or become resigned to the cost consequences.

## It doesn't have to be that way

Experience on other platforms shows the benefit of joined up thinking. Much of the productivity achieved by Ruby on Rails is due to the fact that it provides an integrated experience; choices are made for the developer and, for example, build is addressed hand in hand with the application framework. The fact that Rails begins from the premise of the application framework establishing the programming model helps provide a basis for a coherent philosophy.

Microsoft also provides a case in point. Microsoft considers everything from Visual Studio through to SQL Server (and even, with Azure, cloud) as part of a single vision, and, while not all the constituent parts are ideal, the result is a far more integrated experience than is provided by enterprise Java.

Of course, neither example is perfect. Ruby on Rails achieves productivity partly by sacrificing the ability to deal with complex scenarios, such as working with legacy databases. Microsoft's success is achieved through monopoly. It's easier to achieve an integrated result when one company controls all the parts.

Fortunately, open source provides the opportunity to achieve the same results, but in a far more open manner. While no individual open source project addresses the full application lifecycle, it is possible for a vendor to build an integrated experience drawing heavily on open source and hence minimize vendor lock in. Building on open source also allows a vendor to choose market-leading solutions in each area, rather than cobble together a product from its in-house parts bin (a la AMC).

## More than just Open Source

However, open source *alone* is not a solution. Open source projects are often brilliant at addressing specific problems in the software stack or lifecycle; they are far less good at (and less interested in) integrating all the pieces. A modern solution that addresses the big picture, throughout the application lifecycle, will inevitably rest on open source, but require the backing and support of a vendor.

Surprisingly, in the Java space, no vendor seems to have risen to the challenge, and few have even tried. Despite its control of the Java specifications, Sun has never been a strong enterprise Java vendor, and has never seemed to fully understand the productivity problem in Java. (Furthermore, productivity problems are typically solved by *products* rather than specifications. Only recently, and arguably too late, has Sun started to realize this in the Java space.) IBM does have solutions spanning the entire lifecycle, but in IBM's case, having a joined up vision does not make up for the poor productivity characteristics of most of the constituent parts. Any solution to the software lifecycle that starts with Rational Application Developer and has WebSphere at its core is unlikely to provide a modern productivity experience, or make Java competitive with competing platforms. Microsoft, for all its faults, understands the needs and desires of developers at a far deeper level than any traditional enterprise Java vendor.

The established vendors in enterprise Java are also responsible for creating the complexity that produced many of the productivity problems in the first place, and hence are not the likeliest candidates to resolve them. Plus, especially after the industry's recent consolidation, they are huge companies. Huge companies usually don't get simplicityâand, often, it's not in their interests to do so.

## Moving forward

Java needs a new flag bearer, and it will not be one of the incumbents. SpringSource is dedicated to transforming the enterprise Java experienceâand we are well positioned to deliver.

Spring, and SpringSource, has always been focused on eliminating enterprise Java complexity. Appropriately, “Eliminating Enterprise Java complexity” is now our company tagline. To this end, we've been working hard for over 6 years. While Spring began by minimizing enterprise Java API complexity through innovation, it has long since moved to address broader challenges--such as security, batch, integration and web servicesâwhile SpringSource as a company has become broader than Spring. With Spring, [Grails](http://www.grails.org/), [Spring Dynamic Modules](http://www.springsource.org/osgi) and [SpringSource dm Server](http://www.springsource.com/products/dmserver) and the simplification of OSGi, SpringSource has long set the agenda for enterprise Java productivity.

Eliminating enterprise Java complexity means considering every stage of the application lifecycle. It means more than just a server or application framework, no matter how good. It's hard to imagine any modern fully integrated solution that does not rely heavily on Spring, but Spring is only part of the picture.

## Build, Run, Manage

Enhancing productivity overall involves considering three keys stages of the lifecycle: the **Build** stage, when applications are developed; the **Run** stage, when applications are deployed to a server; and the **Manage** stage, when applications are kept in production and maintained in an operational setting.

This focus explains why we are now the company behind Grails--the most productive technology on the JVM; and why we built the [SpringSource Tool Suite](http://www.springsource.com/products/sts) to help speed up enterprise Java development with Spring.

It explains why we have moved into other areas, such as the application server spaceâtaking a leading position in the industry's leading application server (Tomcat) and building SpringSource dm Server, a next-generation modular application server. It explains why [SpringSource tc Server](http://www.springsource.com/products/tcserver) and [SpringSource AMS](http://www.springsource.com/products/ams) (Application Management Suite) provide powerful management capabilities for applications deployed to the data center.

The Build/Run/Manage lifecycle is central to how we see the world. You will see major announcements in the next weeks and months about product and build initiatives to strengthen our story throughout the lifecycle. You will see us extend our technology in order to pursue it.

I'm confident that SpringSource will become a major middleware vendor as a result of solving these problems. However, the real winner is you. Enterprise Java can be (and needs to be) much more productive. SpringSource is focused on this goal, has the ability to deliver, and the community both underpins and stands to benefit greatly from our efforts.