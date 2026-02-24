---
title: Is it a Tomcat, or the Elephant in the Room?
source: https://spring.io/blog/2007/12/24/is-it-a-tomcat-or-the-elephant-in-the-room
scraped: 2026-02-24T09:22:18.433Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  December 24, 2007 | 0 Comments
---

# Is it a Tomcat, or the Elephant in the Room?

_Engineering | Rod Johnson |  December 24, 2007 | 0 Comments_

Sometimes important changes sneak up. Such changes aren't driven by marketing campaigns, but by many individual decisions; there's no fanfare; by the time they're observed, they have surprising momentum. I mentioned one such development in my opening keynote at the recent [Spring Experience](http://www.thespringexperience.com) conference: the steady rise of Tomcat.

Recently we've begun running polls on [SpringFramework.org](http://www.springframework.org), and some of the results are interesting. The question *Which application server(s) do you use?* produced the following results: BEA WebLogic (various versions) and JBoss AS shared first place among Java EE app servers on 16% each, with IBM WebSphere just behind on 15% and Glassfish putting in a creditable performance on 5%. But the easy winner was Tomcat, on 37%.

Research firm [BZ Research's](http://www.bzresearch.com/) [6th Annual Java Use & Awareness Study](http://ztrek.blogspot.com/2007/10/bea-oracle-market-share.html), from December 2006, asked a similar question:*Which Java application servers are currently in use at your company?*. Multiple answers were permitted, hence the total added up to more than 100%. The clear leader was again Tomcat, on 64.3%, ahead of WebSphere on 36.9%, JBoss on 32% and WebLogic on 23.7%.

The difference between the surveys can probably be explained partly by the fact that Spring has been particularly successful in large enterprise customers. Thus we see the big-iron products over-represented among Spring users.

However, there is little doubt about the leadership of Tomcat, which is consistent in both results. Other analyst firms who are researching the area, such as [the 451 Group](http://www.the451group.com/), are finding similar results.

Some interesting takeaways:

-   IBM's WebSphere is very strong in adoption. We see that in customer accounts.

```
Copy<li>Tomcat is a clear leader. It may well be the elephant in the room. This is particularly interesting given that <i>no large (or even medium sized) vendor is promoting Tomcat.</i> The Tomcat numbers aren't driven by vendor marketing, but by thousands of companies making similar decisions.</li>
```

-   Also from our observations in customer accounts, I would expect that a large part of the JBoss numbers are actually Tomcat. Many users who think they're using JBoss are actually using a less efficient form of Tomcat. One example--the French Tax Office's online taxation service--is a public reference for both JBoss and Spring.
-   Part of Tomcat's popularity is due to the fact that it's lighter and simpler than traditional Java EE servers. This doesn't mean that it's just a dumbed down EE server--it means that it may be better equipped for an environment where SOA is breaking down the silos within companies that once had traditional stovepipe architectures. One of the most prominent analysts in the open source space was [recently quoted in an interesting comment on this](http://www.sdtimes.com/article/LatestNews-20071101-11.html):
    
    > Michael Goulde, senior analyst with Forrester Research, said that he's seen Tomcat uptake rise since 2005. But it's not just Web developers listening to Tomcat's meow; SOA developers are lending an ear as well. “Java EE servers are not the be all and end all of SOA today. There are a lot of other options,” said Goulde.
    

Of course, Tomcat is not a complete alternative to WebSphere or WebLogic. It still lacks a number of important enterprise features that those products have, although it is making progress in important areas such as clustering, and its performance is much improved compared to a few years ago. At this point, it's not an apples-to-apples comparison, but more analogous to Oracle vs MySQL. If you need some of the things Oracle excels at, such as its transaction model, MySQL isn't compelling. (I'm the sort of guy who does value those things.) OTOH, if you are implementing many of the applications that drive the Internet, MySQL may be a *better* technical fit, cost aside.

However, this raises an interesting question: **Will Tomcat get there?** Is there enough momentum in the market to ensure that one or more vendors start adding the missing features? An interesting force is that the highest performing grid/clustering solutions are not the app servers themselves, but specialist solutions such as GigaSpaces, Oracle Coherence and IBM ObjectGrid. There is no reason that HA features need to be associated with Java EE servers.

The differences mean that you can run a huge deployment on WebLogic easier than on Tomcat are nothing to do with the Java EE specifications, but to do with QoS and manageability. For the vast majority of users, for example, WebLogic is not superior because of EJB (which they don't want) or JCA or a host of other largely irrelevant Java EE specifications. It's all about stuff beyond the specs that comes from the demands of the BEA customer base. BEA's positioning over the last couple of years has reflected awareness of this, stressing that WebLogic can accommodate multiple programming models, and provides "the Rock-Solid Foundation for SOA". IBM has hardly been API-chasing, still being some way away from a certified implementation of Java EE 5.0, and making similar positioning statements about SOA more than Java EE on the WebSphere product pages.

In the era of open source, the traditional API-led sale for application servers has been replaced by a QoS sale. Java EE 6 "profiles" may help to formalize this. Interestingly, the app server vendor with the most to worry about here may well be Red Hat. If an app server is a QoS sale rather than an API sale, the fact that JBoss AS matches BEA and IBM on APIs but not on QoS may not be enough to justify its use over Tomcat.