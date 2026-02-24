---
title: Getting started with SpringSource dm Server
source: https://spring.io/blog/2008/10/22/getting-started-with-springsource-dm-server
scraped: 2026-02-24T09:13:48.460Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  October 22, 2008 | 0 Comments
---

# Getting started with SpringSource dm Server

_Engineering | Rob Harrop |  October 22, 2008 | 0 Comments_

**Updated 28-Oct-2008**: Added up-to-date sample links and link to third sample

Last night I presented 'Introduction to SpringSource dm Server' at the [Philadelphia Spring User's Group](http://phillyspring.org/). During this presentation I created a small application called GreenPages, demonstrating all the major aspects of dm Server. I promised the attendees that I would post the application and the slides here.

In the last few weeks since the GA release of dm Server many people have been asking about the best way to get started with dm Server, so I'm using this entry to collect all the relevant information together, including the Introduction to SpringSource dm Server presentation.

## Blog Entries

The best place to start is with the series of blog entries we posted during the milestone phases (back when the product was called SpringSource Application Platform):

1.  [Introducing the SpringSource Application Platform](http://blog.springsource.com/2008/04/30/introducing-the-springsource-application-platform/)
2.  [Working with the SpringSource Application Platform Repository](http://blog.springsource.com/2008/05/09/working-with-springsource-application-platforms-provisioning-repository/)
3.  [SpringSource Application Platform Deployment Options](http://blog.springsource.com/2008/05/06/springsource-application-platform-deployment-options/)
4.  [Using EclipseLink on the SpringSource Application Plaform](http://blog.springsource.com/2008/07/17/using-eclipselink-on-the-springsource-application-platform/)
5.  [Understanding the OSGi "uses" directive](http://blog.springsource.com/2008/10/20/understanding-the-osgi-uses-directive/)

## Downloads

The SpringSource dm Server and the dm Server tools for Eclipse can both be downloaded from the [dm Server download page](http://www.springsource.com/download/dmserver).

## Documentation and Samples

There are two components to the dm Server documentation: the [User's Guide](http://static.springsource.com/projects/applicationplatform/1.0.x/user-guide/html/) which is intended to provide an overview of dm Server concepts and day-to-day operation, and the [Programmer's Guide](http://static.springsource.com/projects/applicationplatform/1.0.x/programmer-guide/html/) which is focused on application development.

We provide three samples: [Petclinic](http://dist.springsource.com/release/SAMPL/petclinic-1.5.0.RELEASE.zip), [FormTags](http://dist.springsource.com/release/SAMPL/formtags-1.4.0.RELEASE.zip) and [Spring Travel](http://dist.springsource.com/release/SAMPL/spring-travel-1.1.0.RELEASE.zip). If you are looking for examples of how to build applications for dm Server then I recommend that you download these samples and familiarize yourself with the structure and approach.

## Forums

We have a very active community forum that provides a lot of useful content. The dm Server forums are accessible [here](http://forum.springframework.org/forumdisplay.php?f=53).

## Introduction to SpringSource dm Server

The slide deck for the 'Introduction to SpringSource dm Server' presentation can be downloaded from [here](http://blog.springsource.com/wp-content/uploads/2008/10/introduction.pdf).

The most interesting part of the presentation is the GreenPages app. When I give the presentation I build the application live, starting with an empty Eclipse workspace and finishing with a fully running, modular web application. I've packaged the completed application code for download [here](http://blog.springsource.com/wp-content/uploads/2008/10/greenpages.zip).

To get GreenPages running, you need to install some extra libraries into the repository/bundles/usr directory of dm Server. I've packaged these for download [here](http://dl.getdropbox.com/u/267619/springsource/dmserver/usr.zip).

Also, you need to start the H2 database using the scripts supplied in the db directory. I've also supplied a script to pre-populate the database with some sample data.

I run GreenPages from within Eclipse, so currently there are no Ant build scripts - you'll need an Eclipse installation with the dm Server tools installed. My recommendation is to download the Personal Use Edition of the [SpringSource Tool Suite](http://www.springsource.com/products/suite/sts) and use that - I run with this for all my dm Server demos.

## Webinars

Ben Hale is giving a webinar on dm Server on October 29th. For information and to access the previous webinars on dm Server visit [](http://www.springsource.com/webinars)[http://www.springsource.com/webinars](http://www.springsource.com/webinars).

## Conference Presentations

I'll be presenting on dm Server at a few conferences over the next eight weeks:

-   [SpringSource dm Server Tutorial](http://qconsf.com/sf2008/presentation/Building+Modular+Applications+with+the+SpringSource+Application+Platform) @ [QCon](http://qconsf.com/sf2008/conference/) (Monday, 17th November)
-   [Introduction to SpringSource dm Server](http://americas.springone.com/speaker_topic_view.jsp?topicId=1594) @ [SpringOne](http://americas.springone.com/) (Tuesday, 2nd December)
-   [Advanced SpringSource dm Server](http://americas.springone.com/speaker_topic_view.jsp?topicId=1595) @ [SpringOne](http://americas.springone.com/) (Tuesday, 2nd December)