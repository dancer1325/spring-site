---
title: A Big Hop Forward: Spring Roo 1.1.0 Is Released!
source: https://spring.io/blog/2010/10/27/a-big-hop-forward-spring-roo-1-1-0-is-released
scraped: 2026-02-24T08:52:10.615Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Alex |  October 27, 2010 | 0 Comments
---

# A Big Hop Forward: Spring Roo 1.1.0 Is Released!

_Engineering | Ben Alex |  October 27, 2010 | 0 Comments_

After more than ten months of development and nearly 900 individual improvements, [Spring Roo](http://www.springsource.org/roo) 1.1.0 has been released ([download here](http://www.springsource.com/download/community?project=Spring%20Roo))! Coinciding with the Spring Roo 1.1.0 GA release, the [Google Web Toolkit](http://code.google.com/webtoolkit/), [SpringSource Tool Suite](http://www.springsource.com/developer/sts), [AspectJ](http://www.eclipse.org/aspectj/) and [AJDT](http://www.eclipse.org/ajdt/) teams have completed supporting GA releases so that you can enjoy the latest versions of these tools all working nicely together.

We've introduced so many new features in Spring Roo 1.1.0 that it's difficult to decide what to highlight. Nevertheless, let's take a brief tour over some of the goodies we've added for your Java programming pleasure.

## Incremental Database Reverse Engineering

It's now possible to reverse engineer an existing relational database and automatically create Roo entities with corresponding fields. But hasn't it been possible to do that using JPA tools for a long time? Yes, absolutely. The key difference is Roo's database reverse engineering is **incremental**. This means that when Roo reverse engineers a database, it places all of the fields it discovers into inter-type declarations (ITDs). This is consistent with the rest of Roo, and allows Roo to easily deliver round-trip maintenance of the reverse engineered entity. In particular, you can re-introspect a database repeatedly to identify any changes while ensuring any code you've written in the .java sources is preserved. Roo will even delete entities that no longer exist (unless of course you've asked Roo not to) and Roo automatically handles complex situations like composite primary keys (complete with identifier class creation and maintenance). Best of all, Roo's reverse engineering feature completes without asking you a single question. This new feature brings the Roo usability experience to a task that until now had been tedious, time-consuming and yielded cluttered .java files that could not offer incremental refresh capabilities.

Incremental reverse engineering was the single most [popular](https://jira.springframework.org/browse/ROO#selectedTab=com.atlassian.jira.plugin.system.project%3Apopularissues-panel) feature request we've ever had for Roo, earning some [129 community votes](https://jira.springframework.org/browse/ROO-435). It's had a lot of testing through the 1.1.0 development cycle, and we've found the community's feedback invaluable. We've even had people successfully reverse engineering schemas with over 440 tables, and we've tweaked Roo to deliver solid performance in such cases.

To produce a new project and reverse engineer a relational database, only three question-free commands are required (which all offer Roo's normal tab assist to save you typing)

```code
Copyproject --topLevelPackage com.foo.rootest
persistence setup --provider HIBERNATE --database POSTGRES --userName rootest --password rootest
database reverse engineer --package ~.domain --schema dbretest 
```

Of course you can repeat the "database reverse engineer" command as frequently as you like, and Roo will carefully update your entities with only the changes that have taken place to the schema. If repeating the command, you don't need to repeat the "package" or "schema" options, as Roo remembers those from your initial command.

In terms of JDBC drivers that Roo will need to connect to your database to perform the introspection, we've shipped drivers for some common production open source databases (eg Postgres, MySql) with the Roo distribution. If you have another database, just type "[script install-jdbc-drivers.roo](http://forum.springsource.org/showthread.php?t=97129)" and restart Roo to gain access to Oracle, Microsoft SQL Server, HSQLDB, H2, Derby etc.

## Spring MVC Enhancements

We've incorporated your feedback from Roo 1.0 and significantly enhanced the Spring MVC capabilities available in Roo 1.1.0. For example, it's now possible to automatically round-trip a JSPX file. What this means is you can now edit a scaffolded JSPX file at any time and in any way, and Roo will automatically detect what you have changed. If Roo needs to edit the file for some reason (eg you have added a new field to the entity, deleted one etc), Roo will merge its changes with any of your changes automatically and safely. If you have made any edits to a given HTML element, Roo will always leave your changes in place and they will take priority - just as you'd expect.

A related improvement to the JSPX round-tripping support is the far more elegant use of tag libraries to encapsulate markup creation. This means a 200 line JSPX file in Roo 1.0 is now just 12 lines in Roo 1.1.0. The repetition of markup has now been moved into a JSPX-based tag, allowing you to easily make edits that impact all pages in your application. Therefore, you now have easier maintenance, automatic round-trips, and concise, focused, clutter-free JSPX pages! You can read more about how all of this works in the [Web MVC Add-On section](http://static.springsource.org/spring-roo/reference/html/base-web.html) of our reference guide.

Other enhancements to the Spring MVC support include the elimination of the URL rewrite filter, as this capability has now been baked into Spring itself. Extra localization packs can now be installed from third-party add-ons using the "[web mvc install language](https://jira.springframework.org/browse/ROO-1046)" command. This is especially useful as it allows external developers to maintain the localization (we've even created an add-on creation command to make [producing these localization add-ons](https://jira.springframework.org/browse/ROO-1028) easy).

The Spring MVC scaffolding now also supports embedding content from 16 social media sites. It's as easy as using the new "[web mvc embed](https://jira.springframework.org/browse/ROO-1161)" command to add content from the likes of YouTube, Google Video, Vimeo, Viddler, Screenr, UStream, LiveStream, Flickr, Picasa, Google Presentations, Scribd, SlideShare, Google Maps, Google Wave, Twitter and Wikinvest.

Rounding out these extensive improvements to the Spring MVC features is [automatic JSON REST support](https://jira.springframework.org/browse/ROO-1239). To see this in action, run the "script clinic.roo" command, followed by the "json all" command, create an owner using the web UI, and then use this command to list all of the owners: `curl -v -H 'Accept: application/json' -X GET [http://localhost:8080/petclinic/owners/](http://localhost:8080/petclinic/owners/)`.

## Google Web Toolkit (GWT) 2.1

We started [collaborating with Google](http://googlecode.blogspot.com/2010/05/enabling-cloud-portability-with-google.html) in late 2009, and our engineering teams have been working closely together to deliver an integrated set of developer technologies. During the [Google I/O Day 1 Keynote](http://code.google.com/events/io/2010/) in May 2010 we demonstrated our early work on Spring Roo and [Google Web Toolkit](http://code.google.com/webtoolkit/) interoperability. We've continued enhancing this interoperability, and now you can use Roo to build complete GWT applications that use the latest GWT 2.1 features such as [RequestFactory](http://code.google.com/webtoolkit/doc/trunk/DevGuideRequestFactory.html), [MVP framework](http://code.google.com/webtoolkit/doc/trunk/DevGuideMvpActivitiesAndPlaces.html), [data-binding widgets](http://code.google.com/webtoolkit/doc/trunk/DevGuideUiCellWidgets.html) etc.

Related to these features is the new Google plugin support in SpringSource Tool Suite 2.5.0. Not only does SpringSource Tool Suite have extensive Spring Roo 1.1.0 support (such as an embedded Roo shell), it also offers out-of-the-box support for Google Web Toolkit development through inclusion of the [Google Plugin for Eclipse](http://code.google.com/eclipse/).

You can try out the latest GWT support by using our expenses sample. You can find this in the /samples directory of the Spring Roo download. Or you can simply create the project and run it via these commands

```code
Copymkdir expenses
cd expenses
roo
roo> script expenses.roo
roo> quit
mvn gwt:run
```

## Google App Engine (GAE)

Also as part of the aforementioned collaboration with Google we've ensured Roo applications can be built for deployment to [Google App Engine](http://code.google.com/appengine/). GAE offers a scalable approach to building applications, and includes options such as a [free usage quota](http://code.google.com/appengine/docs/quotas.html) and [Google App Engine for Business](http://code.google.com/appengine/business/).

Enhancements have also been made in SpringSource Tool Suite to better support Roo-created Google App Engine projects. For example, STS manages the lifecycle of the [Data Nucleus 1 enhancer](http://www.datanucleus.org/products/accessplatform/enhancer.html) plugin that is necessary for GAE persistence. This all integrates with inbuilt support for [m2eclipse](http://m2eclipse.sonatype.org/), which is the typical way Roo projects are managed in Eclipse-based IDEs such as STS.

You can try out the latest [GAE support](https://jira.springframework.org/browse/ROO-146) by using the expenses-gae.roo sample script. Once again you can find this in Roo's /samples distribution directory. You'll see [further improvements](https://jira.springframework.org/browse/ROO-941) to our GAE support in the forthcoming Roo 1.1.1.

## Apache Solr Search Server

[Apache Solr](http://lucene.apache.org/solr/) is a search server based on Apache Lucene. Solr allows you to have a dedicated search server indexing your objects and query for them over a REST API (with JSONP support as well).

Roo 1.1.0 adds Solr integration, ensuring that whenever an entity is created, updated or deleted, the Solr search server is automatically notified. It also adds various Solr-related convenience methods to your entities, such as a `search(String)` method that will automatically dispatch a free-text search query to your Solr server and locate matching entities. There are other similar search and index-management related methods also added to entities via a Roo ITD.

To learn how to setup your Solr server and use it in Roo-based applications, just visit the [Solr section](http://static.springsource.org/spring-roo/reference/html/base-solr.html) of the reference guide.

## JSON Support

[JavaScript Object Notation (JSON)](http://json.org/) is an appealing serialization format for many reasons, such as its optimized browser "eval" support, light human-readable encoding format, and significant cross-platform library support.

In Roo 1.1.0 we've [added support](https://jira.springframework.org/browse/ROO-1239) for allowing any Java object to be easily converted to and from JSON representations. New methods such as `toJson()`, `fromJson(String)` and array-related JSON handling methods are automatically managed via a Roo ITD. Simply add a @RooJson annotation to your Java class and you'll have this support automatically.

## Serializable Add-On

Most Java developers would have experienced the tedious task of maintaining the `serialVersionUID` of your java.io.Serializable classes.

With Roo 1.1.0 you don't need to worry about serialization warnings. Just pop @RooSerializable on your Java class and forget about it. Roo will implement Serializable for you, plus automatically maintain the version UID on your behalf.

## Library Updates

Naturally we've kept up-to-date with the latest library versions so your Roo-based projects always have access to the latest features and bug fixes. Roo-based projects now default to new versions of

-   JPA 2 (with the corresponding updates to the JPA implementations)
-   Spring Framework
-   Spring Security
-   Spring Web Flow
-   Log4J
-   Apache ActiveMQ
-   AspectJ
-   GWT

## Usability

We've continued to make usability improvements aimed at making your development fun and easy. Some of our latest usability enhancements include

-   Console messages are now [more meaningful](https://jira.springframework.org/browse/ROO-686), telling you, for example, which dependencies are being added to your pom.xml
-   Command options are now [case insensitively matched](https://jira.springframework.org/browse/ROO-1036), ensuring you can type in a more relaxed manner (of course if you use TAB the case will always be correct)
-   We now use dependency identifiers from [Maven Central](https://jira.springframework.org/browse/ROO-713) where possible (no more Enterprise Bundle Repository IDs as we had in Roo 1.0)
-   Upgrades are now easier because Roo will [automatically update the Roo annotation JAR](https://jira.springframework.org/browse/ROO-264) to the current Roo version
-   There's a new "[flash message area](https://jira.springframework.org/browse/ROO-1102)" which displays status updates for long-running operations at the top of the Roo command window (where operating system supported; we recommend any Linux, Windows or OSX's iTerm shell for the best experience)
-   Your operating system's [window title](https://jira.springframework.org/browse/ROO-1593) will automatically show the Roo version or project identifier (not available on Windows at this time, but will be soon)
-   OSGi-related messages are [now logged](https://jira.springframework.org/browse/ROO-1100) for easier debugging
-   Comments can now start with a "[#](https://jira.springframework.org/browse/ROO-1116)" as per configuration file and shell script conventions
-   TAB assist is now provided for "[hint](https://jira.springframework.org/browse/ROO-877)" topics
-   There's now a [reminder](https://jira.springframework.org/browse/ROO-1257) in the AspectJ ITD files not to edit them
-   Enhanced Windows support of [Cygwin](https://jira.springframework.org/browse/ROO-561) and [native Windows startup scripts](https://jira.springframework.org/browse/ROO-1014)

## Roo is now built on OSGi

A major - yet largely indistinguishable - change between Roo 1.0 and 1.1.0 is the transition to an [OSGi foundation](https://jira.springframework.org/browse/ROO-728). We're using [Apache Felix](http://felix.apache.org/site/index.html) as our OSGi framework, together with [Service Component Runtime](http://felix.apache.org/site/apache-felix-service-component-runtime.html) (SCR) for component management, and [OSGi Bundle Repository](http://felix.apache.org/site/apache-felix-osgi-bundle-repository.html) (OBR) for bundle resolution. These key changes occurred so we could ensure Roo's add-on infrastructure would be based on a modular, proven, remote dependency-resolvable classpath management model. Modern IDEs such as Eclipse are also built on OSGi, so this approach for tooling modularity and extensibility is well established.

Related to this change we needed to "wrap" many of the dependencies that Roo itself requires to run. We therefore established a [wrapping module](https://jira.springframework.org/browse/ROO-977) that addresses this requirement, while also providing an example of the technique for Roo add-on developers.

Those interested in having a dig around Roo's OSGi internals can do so interactively by typing "osgi" and pressing TAB. There are many new OSGi commands now included in Roo. Most of these will be of interest to add-on developers as opposed to normal Roo users. You can even dispatch commands directly to the Felix runtime by typing "[osgi framework command](https://jira.springframework.org/browse/ROO-1600)" and then the normal Felix command.

## Add-On Creation, Publication, RooBot and PGP Signature Security

One of the reasons we added OSGi support was so we could support a community of third-party add-ons developing around Roo. It's one thing to write an add-on, but you also need an easy way for the community to locate an add-on of interest and install it. You also need a robust and proven security model so that only developers you trust can write add-ons that are installed onto your computer. You also need a way for add-on developers to be able to develop and host the add-on anywhere they like, while still offering them some sensible defaults so they can get results quickly.

To help people quickly start developing an add-on, we've added an add-on creator to Roo. Just use the new "[addon create](https://jira.springframework.org/browse/ROO-1028)" command. This command won't only create an add-on skeleton for you, but it will also configure it for out-of-the-box hosting on [Google Code](http://code.google.com/) and ensure your project's [OSGi Bundle Repository](http://felix.apache.org/site/apache-felix-osgi-bundle-repository.html) (OBR) file is automatically updated when you use the deploy goals. The OBR file even uses "httppgp://" as the protocol so your add-on ties into our decentralized [PGP](http://en.wikipedia.org/wiki/Pretty_Good_Privacy)\-based security infrastructure. So you can go from an empty directory to a properly-hosted, OBR-listed, security model compatible add-on in just minutes.

Of course, you can give out the OBR repository URL to your friends and fans, and they can use the "osgi obr url add" command to add it. However, there's a much better way. Just shoot an email with OBR repository URL to [s2-roobot@vmware.com](mailto:s2-roobot@vmware.com). Our RooBot server will then visit your OBR file and regularly monitor it for changes. It will then update the [roobot.xml](http://spring-roo-repository.springsource.org/roobot.xml) file on [http://spring-roo-repository.springsource.org](http://spring-roo-repository.springsource.org) with valid, security model compatible add-ons. All Roo instances will then discover your add-on, because they will have downloaded a copy of roobot.xml when they run.

Roo users can then install your add-on simply by typing the "[addon install](https://jira.springframework.org/browse/ROO-1543)" command. TAB assist even completes your add-on's name. Once they press ENTER, your OBR file will be added to their Roo installation and a download will be attempted. However, because of the [httppgp://](https://jira.springframework.org/browse/ROO-1092) protocol, Roo will only permit the download to complete if [your PGP key is trusted](https://jira.springframework.org/browse/ROO-1091) by the user (or they've typed "pgp automatic trust" if they trust everybody).

Another way that Roo users can discover your add-on is to simply type a command your add-on offers. Roo will automatically list all known [add-ons that offer that command](https://jira.springframework.org/browse/ROO-1094). There's also the "addon list" command to help people find your add-ons.

Writing add-ons has also been made easier in Roo 1.1.0. We've added the new ["Joey" infrastructure](https://jira.springframework.org/browse/ROO-1372) and better abstractions to help you [edit common files](https://jira.springframework.org/browse/ROO-62).

## Project Changes

Other changes we've made in Roo 1.1.0 include

-   [Moving to Git](https://jira.springframework.org/browse/ROO-817)
-   Freshening up our [web site](http://www.springsource.org/roo)
-   Establishing a new logo
-   Setting up the [@SpringRoo](http://twitter.com/springroo) Twitter ID and list of [our engineers](http://twitter.com/SpringRoo/roo-team/members)
-   Giving away [free kangaroos and t-shirts](http://forum.springsource.org/showthread.php?t=95416)

## Conclusion

If you're new to Spring Roo and would like to take advantage of all these features, simply [download Roo](http://www.springsource.com/download/community?project=Spring%20Roo) and follow the [introductory chapter](http://static.springsource.org/spring-roo/reference/html/intro.html) of the reference guide. We've also prepared [upgrade notes](http://static.springsource.org/spring-roo/reference/html/upgrade.html) for those existing users who'd like to upgrade their projects to this new version. You might also like to consider [downloading SpringSource Tool Suite 2.5.0](http://www.springsource.com/landing/best-development-tool-enterprise-java) (STS), as it has many Roo and Google-specific features that will make your development life easier. Indeed if you download STS, you can skip downloading Roo, as STS 2.5.0 embeds Roo 1.1.0 for your convenience.

Next month we'll be releasing Roo 1.1.1. There's quite a few little improvements we're currently finishing off and including in Roo 1.1.1, so check back soon. Following [@SpringRoo](http://twitter.com/springroo) and the [engineering team](http://twitter.com/SpringRoo/roo-team/members) on Twitter is the easiest way to keep informed of development and new versions. We also encourage you to participate on the [Spring Roo forum](http://forum.springsource.org/forumdisplay.php?f=67) for advice and questions related to Roo. On the forums you'll find help from a friendly Roo community, plus the engineers from the Roo and GWT teams.

We hope that you enjoy using Spring Roo 1.1.0 as much as we've enjoyed building it.