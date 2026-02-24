---
title: Spring Roo 1.1.0.M1 Released
source: https://spring.io/blog/2010/05/19/spring-roo-1-1-0-m1-released
scraped: 2026-02-24T08:57:40.835Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Alex |  May 19, 2010 | 0 Comments
---

# Spring Roo 1.1.0.M1 Released

_Engineering | Ben Alex |  May 19, 2010 | 0 Comments_

I'm delighted to announce that we've just released [Spring Roo](http://www.springsource.org/roo) 1.1.0.M1. Spring Roo is the fastest way for Java developers to build Spring-based applications in the Java programming language. With the Roo 1.1.0.M1 you can build working web applications - complete with a [Google Web Toolkit](http://code.google.com/webtoolkit/) (GWT) front end - in as little as 200 keystrokes! Plus as usual we've concurrently released a new version of [SpringSource Tool Suite](http://www.springsource.com/products/springsource-google-download) (STS 2.3.3.M1) which is optimised for the latest and greatest Roo goodies!

There are over [200 fixes, enhancements and new features](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10340&version=11238) since our 1.0.2 release three months ago. Some of the highlights include:

-   **Significant Spring MVC integration improvements:** These improvements mean that a 130 line JSPX file in Roo 1.0.2 is now just 12 lines. Even better, there's now full round-tripping. Roo can automatically detect what you've changed in a managed JSPX file and ensure it preserves your changes. This is a very significant improvement in round-tripping of the web tier, but it doesn't stop there! We've also added the ability to write new tags directly in JSPX, automatic workflow services, richer default scaffolding, and better extension points.
-   **[Google Web Toolkit](http://code.google.com/webtoolkit/) (GWT) Support:** I've always been a huge fan of GWT, and I'm delighted we've now started our journey to full GWT support in Roo. For those unaccustomed to GWT, it's an impressive piece of technology which allows you to write Java code and have it automatically compiled into heavily optimised JavaScript for browser execution (without needing special plugins). It's a great way to write snappy web applications with visually-rich, easily developed and easily maintained UI code. The GWT philosophy of a first-class development experience in Java is also entirely aligned with the Roo philosophy of a first-class development experience in Java, so it was only natural this integration was added. The new "gwt setup" command will give you a working web application with a scaffolded desktop and mobile device entry point, plus round-trip changes as you modify your entities. It even builds on the latest GWT 2.1 features like new binding widgets and remoting support. Check it out and have some fun!
-   **[Google App Engine](http://code.google.com/appengine/) (GAE) Support:** We've been busily adding support for more and more cloud platforms into the Spring platform ecosystem in recent times. In this new version of Roo, I'm pleased to share we now have support for Google App Engine. As such now you can use a "persistence setup --provider DATANUCLEUS --database GOOGLE\_APP\_ENGINE" Roo command and automatically receive complete GAE-compatible configuration. Deployment is extremely easy as well, just "mvn gae:deploy". Plus STS 2.3.3.M1 has available from the "Extensions" tab complete integration with Google Plugin for Eclipse (GPE) to make your Roo-STS-GAE-GWT experience extremely smooth.
-   **[Apache Solr](http://lucene.apache.org/solr/) Search Server:** One exciting new feature is the automatic indexing of entities via Solr. This allows you to have a dedicated search server indexing your objects and query for them over a REST API (with JSONP support as well).
-   **Maven Central Dependencies:** We're pleased to have responded to community preferences that Roo-produced projects use Maven Central group IDs, artifact IDs and version numbers.
-   **Java Persistence API (JPA) 2 Support:** Roo 1.1.0 changes our default dependencies to the latest released Hibernate and OpenJPA versions.
-   **Composite key support:** Also new to Roo 1.1.0 is the ability to define composite keys. This is the precursor to our database reverse engineering features.
-   **Serializable add-on:** A cute new add-on is the Serializable add-on. It means Roo will automatically compute a correct serialVersionUID for your entities.
-   **OSGi foundation:** We've changed the Roo infrastructure so it is entirely based on OSGi. So when you start "roo" at the command line (or via SpringSource Tool Suite), an OSGi container starts and loads all of the Roo bundles. This means we will have a significantly simpler way of supporting complex add-ons in the near future.
-   **[Cygwin](http://www.cygwin.com/) support:** We've ensured Roo operates on Cygwin, both the "roo" standalone client and also the "roo-dev" development scripts for those building from source. Of course Roo still works perfectly well on Windows standlone, plus Mac and (my favourite) Linux.
-   **Improved console messages:** Roo will now output more meaningful console messages as it works on your project. For example, you can see which dependencies are being added to your pom.xml.
-   **Latest Spring platform projects and common dependencies:** Projects now use newer versions of the Spring platform and common dependencies like Log4J, ActiveMQ etc. One particularly noteworthy enhancement is AspectJ 1.6.9, which now compiles even nicer .class files with ITD members.
-   **Numerous improvements to make add-on development easier:** It's now easier to write a Roo add-on. We've added new hooks into popular components (like the MVC add-on) to enable customisation, new abstractions to simplify interaction with common files like web.xml, easier incremental file changes and dozens of other small improvements.

So what else has been happening with Roo over the past three months? Quite a bit:

-   We've shifted from Subversion to Git (don't worry, we preserved all the version histories, tags etc)
-   A [freshened web site](http://www.springsource.org/roo)
-   Adopted a new Spring Roo logo
-   Created the [@SpringRoo](http://twitter.com/SpringRoo) Twitter ID which people can follow for Roo news and find a convenient list of the [Roo engineers' twitter IDs](http://twitter.com/SpringRoo/roo-team/members)
-   Gave away lots of [free kangaroos](http://forum.springsource.org/showthread.php?t=84905&page=2)
-   Held a series of webinars, with over 800 people attending
-   Featured Roo at many conferences and JUGs

As a milestone release, Roo 1.1.0.M1 isn't intended for mission-critical use. Over the next few months we'll be adding plenty of other new features to the 1.1.0 release, including:

-   Incremental database reverse engineering
-   User interface support for the new Solr and composite key features
-   More Spring MVC UI polishing, such as deeper JavaScript library integrations
-   Moving to an OBR-based model for add-on discovery, resolution, downloading and installation
-   Performance tuning of Roo itself
-   Documentation
-   Ant/Ivy (subject to time availability)

This is already a long post, so I'll defer writing about how you can use some of these new features for a future post (update: my colleagues Christian Dupuis and Jon Travis have blogged about [using STS to make a new GWT project](http://blog.springsource.com/2010/06/02/using-springsource-tool-suite-2-3-3-m1-with-roo-and-gwt/) and [Spring Insight Google improvements](http://blog.springsource.com/2010/05/26/spring-insight-1-0-0-m3-released/)). In the meantime I hope you enjoy downloading Roo 1.1.0.M1 and trying it out. We'd love to hear from you - just include @SpringRoo in your tweets or visit the [community forums](http://forum.springsource.org/forumdisplay.php?f=67). Have fun!