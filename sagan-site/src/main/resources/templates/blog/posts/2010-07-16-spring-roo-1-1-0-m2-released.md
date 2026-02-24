---
title: Spring Roo 1.1.0.M2 Released
source: https://spring.io/blog/2010/07/16/spring-roo-1-1-0-m2-released
scraped: 2026-02-24T08:55:30.822Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Alex |  July 16, 2010 | 0 Comments
---

# Spring Roo 1.1.0.M2 Released

_Engineering | Ben Alex |  July 16, 2010 | 0 Comments_

I'm pleased to announce we've just released [Spring Roo](http://www.springsource.org/roo) 1.1.0.M2 ([download here](http://www.springsource.com/download/community?project=Spring%20Roo)). We've also concurrently released [SpringSource Tool Suite](http://www.springsource.com/products/springsource-tool-suite-download) 2.3.3.M2, which offers the latest integration with this new Spring Roo release. For production use we recommend you continue to use Spring Roo 1.0.2, although we know a very large number of people are happily using the Roo 1.1.0 development releases as well.

## What's New?

So, what's included in the new Spring Roo 1.1.0 Milestone 2? Well, there's [140 fixes, improvements and enhancements](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10340&version=11438) since [Milestone 1](http://blog.springsource.com/2010/05/19/spring-roo-1-1-0-m1-released/). Some of the highlights include:

-   Performance has [improved by a factor of three](https://jira.springsource.org/browse/ROO-1045) since Milestone 1
-   Upgrades to [Spring Framework 3.0.3](https://jira.springsource.org/browse/ROO-1005), [GWT 2.1.0.M2](https://jira.springsource.org/browse/ROO-1051), [AspectJ 1.6.10.M1](https://jira.springsource.org/browse/ROO-1096), [OpenJPA 2.0.0](https://jira.springsource.org/browse/ROO-997), [Log4J 1.2.16](https://jira.springsource.org/browse/ROO-1019) etc
-   Better GWT support, such as eliminating the GWT 2.1 "[bikeshed](https://jira.springsource.org/browse/ROO-1007)" JAR
-   Greatly [improved Windows](https://jira.springsource.org/browse/ROO-1014) startup scripts
-   Improved shell usability, such as [case insensitive option matching](https://jira.springsource.org/browse/ROO-1036)
-   A new "[web mvc view](https://jira.springsource.org/browse/ROO-820)" command to simplify creation of MVC views
-   Support for user-definable web locales via the "[web mvc install language]( https://jira.springsource.org/browse/ROO-1046)" command
-   Extra [data on demand](https://jira.springsource.org/browse/ROO-733) capabilities
-   Google App Engine [integration test support](https://jira.springsource.org/browse/ROO-879)
-   Commands to help you [easily create](http://jira.springframework.org/browse/ROO-1028) simple, advanced and internationalization add-ons
-   Numerous add-on infrastructure improvements (see below)

## More Add-On Discovery and Management Features

Spring Roo 1.1.0.M2 also features a large number of enhancements in preparation for the all-important add-on discovery and management features. The Roo team is highly committed to helping build a vibrant add-on ecosystem for Roo, which will benefit the many users who'd like functionality not included in the core Roo distribution.

As part of this work, Roo now automatically downloads an [OBR](http://felix.apache.org/site/apache-felix-osgi-bundle-repository.html) index from our new repository, [](http://spring-roo-repository.springsource.org/repository.xml)[http://spring-roo-repository.springsource.org/repository.xml](http://spring-roo-repository.springsource.org/repository.xml). As a Roo user you're unlikely to see much of the OBR infrastructure (as it just works!), but it's good to know that OBR provides Roo with an OSGi-standardised way to discover available add-ons, resolve their dependencies, download them to your Roo environment and automatically start them up. This means Roo users benefit from an industrial-strength, OSGi-standardised way to manage add-ons and we won't hit a barrier as increasingly complex add-ons are made available to the Roo community.

Roo has also extended the OBR capabilities by integrating OBR metadata directly into shell command resolution. This means if you type a command that is part of a presently uninstalled add-on, Roo will automatically suggest to you which add-on(s) can provide that command! I'm happy to acknowledge this particular feature was inspired by my use of [Ubuntu](http://www.ubuntu.com/), as it's tremendously useful to just type any random command and have the system inform you the one-line installation command you need to type to have that command installed.

While this new OBR support and shell command discovery is certainly very nice, we also wanted to ensure we could offer convenient add-on hosting for the Roo community. But to do this properly means we needed to carefully consider security implications.

We tackled add-on security by adding extensive [PGP](http://en.wikipedia.org/wiki/Pretty_Good_Privacy) key management features to Roo 1.1.0.M2. These allow you to indicate exactly which developers you trust to sign software that Roo will download to your computer. Roo itself is now also PGP signed in every release. To support these capabilities we've introduced a new protocol handler called [httppgp://](http://jira.springframework.org/browse/ROO-1092) into Roo. This tells Roo a given HTTP URL also has a PGP armour detached signature available.

By requiring PGP signatures for all add-ons, we're able to conveniently and safely host all Roo add-ons for the community. It's up to you to decide if you trust a given PGP key, and without trusting that key, Roo will refuse to even spend time downloading the httppgp:// resource. We also implemented this architecture so we didn't need to change [Apache Felix](http://felix.apache.org/site/index.html)'s OBR infrastructure nor force everyone to use our central add-on hosting feature. This means we benefit from future improvements to OBR in newer Felix releases, plus it's perfectly fine for you to use httppgp:// URLs in your own OBR repository.xml files. Roo's approach also means you can also use standalone PGP tools like [GnuPG](http://en.wikipedia.org/wiki/GNU_Privacy_Guard) to perform signature-related operations to independently verify Roo's correct operation. As you can tell, I'm very happy about the new PGP OBR infrastructure (but I guess my geeky [Acegi Security](http://blog.springsource.com/2007/01/24/why-the-name-acegi/)/[Spring Security](http://en.wikipedia.org/wiki/Spring_Security) past is shining through there!).

I'll talk more about how this new infrastructure works when we announce Milestone 3, as that will incorporate the full add-on end user interface. Plus we'll also be introducing our new backend tool that helps automate add-on publication to the central repository (called RooBot). If you can't wait for the new end user interface, try the "pgp list trusted keys" command to see which keys Roo trusts by default. Also try typing "welcome property" at the Roo prompt to see how Roo advises the currently-uninstalled add-ons which provide the "welcome property" command. If you really want to see the httppgp:// infrastructure in operation, try untrusting my PGP key (pgp untrust --keyId [00B5050F](http://pgp.mit.edu:11371/pks/lookup?op=vindex&search=0x9580063200B5050F)) and then try installing the welcome add-on (osgi obr start --bundleSymbolicName org.springframework.samples.roo.welcome).

## 1.1.0 Roadmap

Despite all the neat new features in Roo 1.1.0.M2, we've also been very busy preparing other features which didn't make it into the Milestone 2 release.

One feature many people are keenly waiting for is [incremental database reverse engineering](https://jira.springsource.org/browse/ROO-435). This feature request now has over 113 votes and the implementation already supports Java compilation unit lifecycle management, incremental field maintenance, composite primary keys and most relationship types (1:M, M:M, 1:1). We anticipate this feature will be included in Roo 1.1.0.M3, but if you want to live on the bleeding edge, you can experiment by [building Roo](http://www.springsource.org/roo/community) from Git.

Some other interesting features we've been working on include an [Op4J add-on](https://jira.springsource.org/browse/ROO-812), a very nice [automatic Git add-on](http://jira.springframework.org/browse/ROO-911), and some web embedding commands. The Op4J add-on allows you to dramatically reduce the amount of code you need to write, without loosing the type safety, code assist and performance benefits of Java. The automatic Git add-on turns each Roo command you execute into an individual Git commit, which is fantastic for viewing what Roo is doing and being able to selectively rollback etc. The web embedding commands are very nice and allow you to incorporate resources like YouTube videos, SlideShare presentations, Google Maps, Flikr photos and similar media into your web views with just one Roo command (in all there are 15 different resource types currently supported, covering everything from photo sharing to finance updates and everything in between).

If you're curious about our release dates, you can track them by visiting [](http://tinyurl.com/rooroadmap)[http://tinyurl.com/rooroadmap](http://tinyurl.com/rooroadmap). Of course these dates are amended as our development progresses (and dependent projects similarly amended their dates), but they give you a good indication.

## Other Community News

A few other interesting announcements for the Roo community:

-   There is now a dedicated Spring Roo podcast at [http://roopodcast.com/](http://roopodcast.com/), already with two audio interviews
-   Manning are publishing a [Spring Roo in Action](http://manning.com/dickens/) book, which is already available via the early access program (with the first chapter being free - there's even a limited-time 40% discount if you use code "ju1540")
-   [SpringOne 2GX](http://www.springone2gx.com/) will be featuring a number of Spring Roo sessions, so if you're in North America (or even further away!) why not come along and hear about Roo directly from the people who wrote it
-   There will also be Roo coverage at other major conferences like [JavaOne](http://www.oracle.com/us/javaonedevelop/index.html) and [Devoxx](http://www.devoxx.com/) later this year
-   You can always hear the latest Roo news by following [@SpringRoo](http://twitter.com/SpringRoo) and the engineering team ([Ben](http://twitter.com/benalexau), [Alan](http://twitter.com/alankstewart), [Stefan](http://twitter.com/schmidtstefan)) on Twitter (if you Tweet about Roo, please include @SpringRoo in your tweets so people can search for them)

We hope you enjoy this new release! Please let us know what you think via [@SpringRoo](http://twitter.com/SpringRoo) or the [community forums](http://forum.springsource.org/forumdisplay.php?f=67).