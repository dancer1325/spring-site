---
title: WebLogic 10 Tech Preview Ships - Builds on Spring Framework
source: https://spring.io/blog/2007/02/11/weblogic-10-tech-preview-ships-builds-on-spring-framework
scraped: 2026-02-24T09:32:02.476Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rod Johnson |  February 11, 2007 | 0 Comments
---

# WebLogic 10 Tech Preview Ships - Builds on Spring Framework

_Engineering | Rod Johnson |  February 11, 2007 | 0 Comments_

Congratulations to the WebLogic team on [shipping a preview of WebLogic 10](http://www.infoq.com/news/2007/02/weblogic-10), which passes the Java EE 5 CTS. It's good to see BEA getting back to their tradition of being quick off the mark, after their aberration with J2EE 1.4.

This is interesting news for the Spring community, because WebLogic 10 uses [Pitchfork](http://www.interface21.com/pitchfork) internally. The Pitchfork Project is an open source project led by Interface21 and collaboratively developed with BEA that implements EJB 3.0 interception and JSR-250 injection on top of Spring. It is used inside the WebLogic 10 EJB container and in other parts of the server to meet new spec requirements, but is not tied to WebLogic. Pitchfork can be used standalone (although that's not its primary goal) or could be adopted by other application servers.

Btw, the Pitchfork Project should not be confused with [Project Pitchfork](http://www.pitchfork.de/page_en.php), a German band. Stop Press: I just discovered that they have a song called *[It's Spring](http://www.last.fm/music/Project+Pitchfork/_/It's+spring)*. Can't say I'm a fan, though...

The use of Pitchfork means that from a runtime perspective in WebLogic 10, every EJB 3.0 session or message bean is also a Spring bean. BEA's motivation for this choice was to achieve rapid time to market and base the implementation of new spec features on proven code as far as possible. The fact that Spring already did so much of what they needed helped them with their aggressive timescales. It should also help ensure a safe upgrade path. Much of the new functionality is supplied by Pitchfork on top of proven Spring code; the vast majority of the proven existing WebLogic EJB code base is unchanged. Of course, adopting this approach underlines BEA's trust in the quality of Spring.

In the longer term, the fact that Spring is used beneath the surface should benefit Spring users running WebLogic, allowing Spring components to be managed at a deep level by the server (which already effectively "natively" understands them), and enabling the Spring component model to be used to supplement Java EE. Patrick Linskey, EJB lead, recently hinted at some of these features:

> This architecture also provides us with some opportunities down the road to expose Spring artifacts to WebLogic Server developers at a more integrated level... \[For example\]...deployment of Spring beans in a WebLogic Server cluster; Spring session replication (piggybacking on WebLogic HTTP session replication); WebLogic security integration with Spring beans; WebLogic-based clustered remoting of Spring beans; and management of Spring beans in the WebLogic Server administration console. Additionally, we've laid the groundwork internally for some compelling new externally-facing Spring integration capabilities, but we aren't exposing these just yet in WebLogic Server 10.

In previous previews, it was possible to get at the Spring-ness inside the server and actually program with it. The energetic Christian Dupuis of the Spring IDE team [blogged](http://springide.org/project/wiki/JeeWithSpringAndBea) about this when the first preview came out, showing how every EJB 3.0 session or message bean was also a Spring bean, and that it was possible to apply more powerful Spring injection and true AOP to those components just by providing a Spring bean definition with the same name as the EJB--a simple and elegant method. I am not sure if this mechanism works in the current preview, and haven't yet had time to check; I know that BEA's goal is first to ship a compliant server and then look at how best to package and document value added extensions.

It was fun working with the WebLogic EJB team on Pitchfork and its use in WebLogic--in particular Michael Chen and Patrick Linskey. Inevitably, with Patrick, some of the work together occurred over a beer.

Obviously I'm particularly excited about the Spring angle (especially as I and Costin Leau had a hand in it), but there is also of course plenty of other important stuff in WebLogic 10: in particular, the incorporation of Kodo/OpenJPA as JPA persistence provider. The core of that product is Apache License open source. It's good to see continued emphasis on QOS features, rather than just API chasing: for example, automatic JMS failover. Large enterprise customers in particular are often more concerned about operations and uptime than spec levels.

The filtering class loader sounds particularly welcome (if overdue). J2EE class loading in complex applications has traditionally been hell on earth--painful and a real barrier to porting applications even if they code to the standards and use portable frameworks. As servers (including WebLogic and WebSphere) make increasing use of open source internally, conflicts have become increasingly common, demanding hacks to fix. (As with the ANTRL conflict with Hibernate 3 and WebLogic 8.1, which could be fixed by making libraries in a WAR take precedence over those in the server.) It seems that WebLogic 10 will have a solid solution here, which enables particular apps to filter out classes the server depends on in a more flexible manner.