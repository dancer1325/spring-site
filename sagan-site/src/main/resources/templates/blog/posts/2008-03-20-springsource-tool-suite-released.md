---
title: SpringSource Tool Suite Released
source: https://spring.io/blog/2008/03/20/springsource-tool-suite-released
scraped: 2026-02-24T09:20:02.930Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  March 20, 2008 | 0 Comments
---

# SpringSource Tool Suite Released

_Engineering | Christian Dupuis |  March 20, 2008 | 0 Comments_

This year's [EclipseCon](http://www.eclipsecon.org/2008/) was the first that we attended as a company. We had quite a few talks, which were all well received and we announced the [beta program](http://www.covalent.net/beta/STS/membershipform.php) for [SpringSource Tool Suite](http://www.springsource.com/web/guest/products/sts). Overall we all had a very great time and we got lots of feedback from the Eclipse community about the projects in the Spring Portfolio and especially what we are doing in the web space. I'll make sure to forward all the feedback to the project leads in the coming weeks. Since EclipseCon is coming to its end today, I finally found time to sit down and write about what we introduced at the conference.

We unveiled the Personal Use Edition of SpringSource Tool Suite (STS) during our [BoF](http://www.eclipsecon.org/2008/index.php?page=sub/&id=574) on Monday and I have spent a lot of time talking and mailing to people about what extra value it brings. In this blog I will outline the features of the SpringSource Tool Suite in more detail. First of all, I have heard quite a few times that people think that the announcement of the SpringSource Tool Suite means that we will stop improving and shaping [Spring IDE](http://springide.org). Please let me make the point that this absolutely not the case; actually the opposite is true and already evident by taking a look at the Spring IDE JIRA and Subversion repository. In fact since I joined SpringSource in January, I was able to increase the amount of time that I spent on Spring IDE while working on the tool suite in parallel.

The goal of the SpringSource Tool Suite is to give you the **most sophisticated development tools** for doing enterprise development with the Spring Portfolio on the Eclipse platform - sounds like marketing slang but that is the mission statement the tools team is committed to. STS certainly builds on top of the proven Spring IDE but it ties deeply into Eclipse [Mylyn](http://www.eclipse.org/mylyn) and already extends both open source tools to bring enterprise level extensions into your IDE. With the effort to provide the best Spring tooling available we already started and continue to add tooling related features, hooks and extension points into the Spring core framework and other Spring projects.

So with the tool suite you finally get all the benefits of Mylyn's Task-Focused User Interface for doing Spring development. You get context management and focusing while working on Spring application blueprints. Additionally we took the Task-Focused UI approach to a new level and introduced a new technology that we named **Task-Focused Tutorials**. Task-Focused Tutorials extend the Eclipse Cheat Sheet framework and add task-focusing to each step of the tutorial. With a Task-Focused Tutorial a user - someone new to Spring or someone who wants to learn a certain feature or Spring project - will be able to import a running sample application with a single click and start exploring the sample. Each tutorial step will then provide an explanation of a certain aspect of the tutorial and show only those Java and Spring elements that are relevant to understand and explore the explanation.

[![Task-Focused Tutorials](http://blog.springsource.com/main/wp-content/uploads/2008/03/task-focused-tutorials-thumb.png)](http://blog.springsource.com/main/wp-content/uploads/2008/03/task-focused-tutorials.png)

From the above screenshot you can see how that looks in Eclipse. The tutorial brought the PetClinic sample application into the Eclipse workspace and focused the workspace to show only the @Autowired annotation and how it is applied to application components. On the right side you can see the expanded step that explains how and why you should use the @Autowired annotation. At the very end of the tutorial the user is able to launch the sample application on a bundled Tomcat server that is automatically installed and configured; again just with a single click.

We think that this way of introducing new features and products is a very powerful approach and makes it really easy for people to explore the Spring Portfolio. Everything a developer needs to have and know when getting started is right where it should be: inside the IDE. When you download the Personal Use Edition Beta you will have instant access to around 20 tutorials that have all been created by either project leads or experienced consultants that directly work with clients. Most notable [Adrian Colyer](http://blog.springsource.com/main/author/adrianc/) took time to create 7 tutorials that introduce OSGi concepts, Equinox and [Spring Dynamic Modules](http://www.springframework.org/osgi). These tutorials are really cool if you want to jump on the OSGi train right now. The tool suite contains a automatic OSGi bundle update/refresh mechanism that finally allows working on applications and get instant redeploy semantics based on the power of the OSGi runtime (have you ever tried that with EJBs; I did).

The next feature I would like to talk about is called **Runtime Error Analysis**: the SpringSource Tool Suite is able to provide information on how to solve runtime problems by analyzing Java stack traces. To make that happen we created a online knowledge base that is integrated into the suite and which is being queried right inside the Eclipse IDE. The knowledge base is open for everybody using the tool and we even encourage people to contribute their own analyses by using build-in rich editing features. Take a look at the following screenshot.

[![Runtime Error Analysis](http://blog.springsource.com/main/wp-content/uploads/2008/03/runtime-error-analysis-thumb.png)](http://blog.springsource.com/main/wp-content/uploads/2008/03/runtime-error-analysis.png)

With the tool suite you don't only get support for analyzing runtime errors but also the tool will help to **find common pitfalls** and **Spring best-practice violations**. Especially while working on XML bean definition files this feature becomes really handy as it will inform the developer right inside the XML editor that there is something in the file that he/she might want to revise. For example the tool will detect and recommend the usage of bean inheritance under certain circumstances. Also it will recommend the usage of the constantly improving namespace elements instead of using traditional style bean definitions. Here is an example:

[![Runtime Error Analysis](http://blog.springsource.com/main/wp-content/uploads/2008/03/best-practice-rules-thumb.png)](http://blog.springsource.com/main/wp-content/uploads/2008/03/best-practice-rules.png)

So lets see what we got:

-   Spring Development Tools
-   Mylyn's Task-Focused User Interface for Java, Resources and Spring application blueprints
-   Task-Focused Tutorials
-   Runtime Error Analysis
-   Best Practice and Architecture Review tools

There are more features that I haven't touched on. Do you see the main theme in this feature line-up? The last three listed features provide invaluable assistance to develop powerful Spring-based applications. Internally we started to use a metaphor for that feature set: Consultant in a Box. With the SpringSource Tool Suite we want to give access to SpringSource knowledge as if you had a consultant sitting next to you!

I would like to encourage everybody to head over to the [beta registration page](http://www.covalent.net/beta/STS/membershipform.php) and give the Tool Suite a try. In closing I also want to say thanks to everybody who has already submitted feedback, issues and suggestions. I will get back to all of you as soon as this overwhelming week at EclipseCon has ended.