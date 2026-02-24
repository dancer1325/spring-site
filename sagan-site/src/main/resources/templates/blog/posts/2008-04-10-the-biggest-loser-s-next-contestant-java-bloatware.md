---
title: The Biggest Loser\'s Next Contestant: Java Bloatware
source: https://spring.io/blog/2008/04/10/the-biggest-loser-s-next-contestant-java-bloatware
scraped: 2026-02-24T09:18:59.427Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  April 10, 2008 | 0 Comments
---

# The Biggest Loser's Next Contestant: Java Bloatware

_Engineering | Rod Johnson |  April 10, 2008 | 0 Comments_

If the tech community were to host their own version of the popular TV show *The Biggest Loser* (or maybe *Celebrity Fit Club*) you would see enterprise Java front and center---bloated, overweight, tired, and drained.

The future of enterprise Java is becoming clear. The morbidly obese legacy platforms are in decline, with [leaner solutions increasingly used in production as well as in development](http://blog.springsource.com/main/2007/12/24/is-it-a-tomcat-or-the-elephant-in-the-room/). [Legacy technologies such as EJB are becoming less and less relevant](http://blog.springsource.com/main/2008/01/23/spring-overtakes-ejb-as-a-skills-requirement/).The lukewarm takeup of Java EE 5 leaves it looking increasingly like the last gasp of traditional J2EE bloatware. Meanwhile, the Java EE 6 specification is finally set to allow for [greater modularity](http://weblogs.java.net/blog/robc/archive/2008/02/profiles_in_the_1.html), in a radical change which will have important implications for developers and is likely to rejuvenate competition among implementations. As the standards and the products based upon them have gathered pound after pound of cellulite, SOA, Web 2.0 and other infrastructural changes continually impose new requirements that were not foreseen when J2EE was conceived a decade ago, as a chubby but cute baby.

So much for the past. What does the future hold?

I think the big picture is one of an exciting period of change. Analysts at Gartner Group agree, writing in the report [Trends in Platform Middleware](http://www.gartner.com/DisplayDocument?id=525420) that

> The popular Java Platform, Enterprise Edition (Java EE) and .NET platform middleware technologies are increasingly inadequate to cover needs for extensive scalability and performance, event-based programming styles, advanced service-oriented architecture (SOA) and dynamic application developments.

Here are my predictions:

-   *We will once more see real competition in the application server space, rather than a continued monopoly of a decreasing number of large vendors.* Through version 5, Java EE did not serve the needs of the developers and their organizations so much as the needs of vendors who were protected from competition by the many cumbersome and irrelevant legacy APIs that needed to be implemented by any new entrant. With Java EE 6 needing to embrace modularity to remain relevant, renewed competition is likely.
-   *Tomorrow's application server will have a dramatically smaller footprint than the [Jabba the Hut](http://en.wikipedia.org/wiki/Jabba_the_hut) of today.* The patients must lose hundreds of pounds or perish. Consider another [analyst comment](http://www.cmswatch.com/Trends/1144-The-Stackless-Stack):
    
    > Consider the trend (over the past year or two) by Web CMS vendors toward embedding, bundling, or otherwise targeting Tomcat as a runtime framework instead of, say, JBoss. If all you need is a servlet engine and web server, why bring along EJB runtimes, a JMX framework, JAAS/JACC, and all the other scaffolding that comes with a full-blown J2EE appserver?
    
-   *The application server of tomorrow will not merely implement JCP specifications.* With the rise of OSGi on the server side and the emergence of SCA, the JCP is no longer the sole source of specifications relevant to enterprise Java. The ubiquity of open source and the emergence of open source de facto standards introduces another element in the mix. A small number of open source projects are now more relevant to the majority of enterprise Java applications than the majority of the specifications that make up Java EE. This must ultimately begin to affect the characteristics of application servers.
-   *The market will need to address the gap between Tomcat and WebLogic/WebSphere*. Currently an important part of the market is neglected. The majority of Java web applications are most at home on Tomcat. A minority actually want some of the more esoteric functionality of a full-blown application server, such as JCA, or specialized capabilities such as distributed transaction management. But a larger minority need some of the operational and management features of those products, but are not interested in the esoteric APIs and the bloat they bring along with them. As more and more end user companies look to phase out legacy application servers in favor of better suited technologies, there will inevitably be a response to market demand, with products that hit the sweet spot and bridge this gap.
-   *The gap between application servers and ESBs will be bridged.* This is a logical consequence of the rise of POJO middleware. The same underlying platform should be able to address web and SOA requirements. Spring already provides a consistent component model across different deployment scenarios (something that Gartner have also repeatedly mentioned); a similar consistency of the rest of the platform is overdue, and likely to develop quickly as the dead hand of legacy J2EE ceases to hold back progress.

  
In my next blog on this topic, I’ll look at some of the technologies likely to play a role in tomorrow’s lean and powerful platform infrastructure.