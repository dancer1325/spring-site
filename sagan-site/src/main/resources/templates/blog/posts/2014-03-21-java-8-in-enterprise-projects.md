---
title: Java 8 in Enterprise Projects
source: https://spring.io/blog/2014/03/21/java-8-in-enterprise-projects
scraped: 2026-02-24T07:35:48.168Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Juergen Hoeller |  March 21, 2014 | 2 Comments
---

# Java 8 in Enterprise Projects

_News | Juergen Hoeller |  March 21, 2014 | 2 Comments_

With the GA release of Java 8 finally having arrived this week, let's all rejoice and celebrate - and then wake up and wonder how to introduce this to our everyday work environments...

This is easy enough to do for prototyping purposes: grab a JDK 8 download, IntelliJ IDEA or Eclipse's recently completed Java 8 support, and off you go. The challenging part comes a step later: You need to figure out how to deploy your app to a Java 8 enabled environment.

Of course, in practice, that consideration probably comes much earlier: Before you're willing or allowed to try Java 8, you need to have a plan for Java 8 enabled deployment to begin with. And in many cases, you're not even going to bother, since you know upfront that it's impossible to introduce Java 8 to your production systems at this point.

Impossible? Really? Let's reconsider against specific deployment environments...

## [](#java-8-and-established-java-ee-6-application-servers)Java 8 and established Java EE 6 application servers

With Java EE servers, there is usually an upgrade showstopper in the form of a bundled JDK version. With WebSphere, even on WAS 8.5, the default JDK is still Java 6, with Java 7 as an opt-in choice. With WebLogic, recent releases are more strongly Java 7 based already. However, neither of those servers lets you freely choose the JDK generation to use.

As deeply integrated as an application server stack typically is with a specific JDK version, it's not advisable to simply run it against a different JDK installation. A current-generation application server is not likely to survive even a startup smoke test against JDK 8.

With flexible offerings such as GlassFish and JBoss AS, you'll probably be able to point them to a JDK 8 installation and get the server up and running. However, that is typically only true when using "-target 1.7"; once you start using Java 8 language features, some parts of the server and some integrated service providers are going to choke on "-target 1.8"...

## [](#java-8-and-recently-released-java-ee-7-application-servers)Java 8 and recently released Java EE 7 application servers

WildFly 8, the successor of JBoss AS 7, is actually the first EE server that comes with basic JDK 8 compatibility. Its open source version is generally available already. However, there is no official Red Hat support for it yet in the form of a JBoss EAP edition based on WildFly 8.

As for GlassFish 4, Oracle discontinued commercial support last year, with no maintenance releases having happened since then, and no official support contracts available. Nevertheless, basic JDK 8 support might come in a GlassFish 4.0.1 release later this year.

UPDATE (Sep 30): Half a year later, GlassFish 4.1 is now available with JDK 8 support. In addition, Oracle also certified the recently released WebLogic 12.1.3 - with support for a few EE 7 specifications but not a full EE 7 platform server yet - on JDK 8 now.

## [](#java-8-and-tomcat--jetty)Java 8 and Tomcat / Jetty

Lean web application servers such as Tomcat and Jetty have a clear advantage here in that they are not dependent on the specifics of any JDK version. Tomcat 8 and Jetty 9 have been tested against OpenJDK 8 for half a year already and are generally declared compatible with Java 8. Even Tomcat 7 joins that club, receiving an upgraded Eclipse compiler etc as well.

So both Tomcat and Jetty present themselves as immediate production-quality options for use with JDK 8. From Pivotal's side, we're doing the best we can to support Tomcat on JDK 8, through our involvement in Apache Tomcat itself as well as through our tc Server offering.

Of course, you typically won't use plain Tomcat or Jetty but rather add specific frameworks and libraries of choice to your deployment units. Obviously, each of those libraries needs to be Java 8 compatible as well. Many of them naturally are, but double-check your persistence providers and binding frameworks since they might not support Java 8 bytecode quite yet.

## [](#java-8-and-spring)Java 8 and Spring

The Spring Framework 4 generation has been designed in a Java 8 compatible fashion right from the start. In fact, we released Spring Framework 4.0 GA with comprehensive Java 8 development support even before the first OpenJDK 8 release candidate became available.

From our perspective, Spring Framework 4 on Java 8 is a great combination in many environments, not just with Tomcat, Jetty or WildFly but also with recent embedded engines such as Reactor or Undertow, and other kinds of custom application architectures.

The best time to try such a Spring-based arrangement on Java 8 is now, as JDK 8 goes GA! You'll be surprised how far you can take this already. In combination with recent Java 8 compatible tooling in IntelliJ IDEA or Eclipse, you might find all you need right there, right now.

So please, don't wait until 2016 to give Java 8 a try...

## [](#events)Events

Let me invite you to join my Spring Framework 4 on Java 8 webinar next week, covering key feature themes with a focus on the use of Java 8 features in a Spring-based application: [https://spring.io/blog/2014/02/11/webinar-spring-framework-4-0-on-java-8-march-25](https://spring.io/blog/2014/02/11/webinar-spring-framework-4-0-on-java-8-march-25)

You'll also find me speaking about Spring on Java 8 at several conferences this year, e.g. at Berlin Expert Days, JAX Germany, QCon New York, GOTO Amsterdam, ÜberConf Europe, and of course our very own SpringOne in September, this year happening in Dallas, Texas!