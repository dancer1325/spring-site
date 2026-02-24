---
title: Grails and Maven: a Marriage of Inconvenience
source: https://spring.io/blog/2007/07/14/grails-and-maven-a-marriage-of-inconvenience
scraped: 2026-02-24T09:25:46.256Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  July 14, 2007 | 0 Comments
---

# Grails and Maven: a Marriage of Inconvenience

_Engineering | Dave Syer |  July 14, 2007 | 0 Comments_

## Introduction

[Grails](http://grails.codehaus.org) seems to be going from strength to strength, and it looks like it definitely "has legs", as they say. I am quite interested in stretching those legs a little outside the web application arena. If you are aware of my work on [Spring Batch](http://www.springframework.org/spring-batch), you will probably be able to guess where that might take me. But for this article I wanted to just share some experiences I've had with the basic, low-level deployment and build of a Grails application.

I have a love/hate relationship with Maven 2, and I am learning to love Grails, but sadly the two do not play particularly well together. It would be really nice to see tighter integration. Maven is not always everything we want it to be, but there are some things that really make it worthwhile. It is a standard of sorts (love it or hate it) so when I download a project from somewhere I already know how to build it, what its dependencies are and where the documentation is. Grails has some of the same features, and in fact includes its own quite sophisticated build tool based on Groovy scripting of Ant. Maybe there is a middle way, where we can have the best of both worlds?

I am also aware of some other activities in this area, and I hope we can coalesce around something (maybe driven from the discussion in this forum and in the Grails JIRA). For instance see Frederick Verbist's [blog](http://blog.ithron.be/?p=5) and Arnaud Heritier's maven [integration project](http://forge.octo.com/confluence/display/MTG/Home) (only barely underway at this point). The Grails team is traditionally unimpressed with Maven (e.g. see [here]([http://graemerocher.blogspot.com/2006/09/vote-to-stop-maven-infesting-spring.html)), but I had a chat with Graeme Rocher, and he is open to suggestion, so I hope we can make some progress here.

## Prototype Dependency Management for Grails using Maven

In the spirit of taking some simple steps towards maven integration, I have attached a set of [poms](http://blog.interface21.com/main/wp-content/uploads/2007/07/grails-maven.zip) that describe (roughly) the dependency structure of Grails as I am aware of it in Grails 0.5.6. Ignore or change the Spring version number if you have issues with it - Grails 0.5.6 uses Spring 2.0, but I needed 2.1 for a project I am working on. Graham says Grails might not work properly with later versions of Spring so your mileage may vary. That's the beauty of Maven right? You can see the project dependencies explicitly, and transitively, and you can tweak them in ways that you control to suit your own needs and appetite for risk.

Aside to Maveners: the dependency plugin is working much better than it used to, and you can get a print out of the dependency tree with "mvn dependency:tree". This only works with a brand new plugin so make sure that the apache-snapshots repo is in your plugin repositories:

```xml
Copy
<pluginRepositories>
	<pluginRepository>
		<id>apache-snapshots</id>
		<url>http://people.apache.org/maven-snapshot-repository</url>
	</pluginRepository>
</pluginRepositories>
```

Much more convenient than having to build the whole site and looking in the dependency report, which is what I used to do a lot of.

### A POM, a POM, my Kingdom for a POM...

This is the cry of a demented Maven user when first faced with a Grails project and trying to understand how it all fits together. Hopefully we will show here how to calm down the poor demented individual. To do this we present some simple steps to create a Maven project for an existing Grails project.

In the enclosed sandbox archive, there are three poms, each in its own project:

-   base = base POM for dependencies not related to web application. I have been quite lenient with this (including Spring Weblfow for instance). You should be able to launch grails console with just these dependencies is the goal.
-   web = additional dependencies required to create a WAR file for a web application. This might be platform dependent to some extent, but the dependencies included here will work in a Servlet 2.4 container like Jetty 5.1 (which is what Grails uses traditionally).
-   launch = Jetty and JSP dependencies used just for launching the web application in a standalone or development environment

To install the Grails poms you should not need to add any artifacts manually to your local repositiry. There are also a couple of "funnies" (not available in any standard public repo that I could find), which I have included in the "spring-ext" repo (defined in the pom). It should work out of the box if you connected to the internet.

### Prerequisites for Running the Sample

You will need Maven (2.0.\*) and Grails (0.5.6) to run the sample application. I'm using Maven 2.0.7. The "grails" and "mvn" launch scripts need to be on your path, and you need to define GRAIL\_HOME env variable to run Grails (standard install procedure).

### Test Project

There is also a test project which uses the above poms to manage a web application. I have decided to stick with the Grails directory layout. Graham tells me that nearly all of the "variable" content in web-app/WEB-INF is targeted for removal in Grails 1.0, so I think using the structure layed down by Grails is the best way forward (least likely to be fragile, easily understood by other Grails developers).

To launch from Grails command line

```code
Copy$ cd test
$ mvn package
$ grails run-app
```

To add additional dependencies to the test project, just add them to the pom and repeat the exercise (or in Eclipse do nothing, see below). Isn't Maven wonderful?

Note that the Grails dependencies have scope=provided in the project pom. That should mean they are in the classpath for Maven and Eclipse, but do not get included in any Maven packaging (if it was implemented).

### Eclipse Users Only

The test project also includes Eclipse project artifacts - use the Maven Eclipse extensions for best results (http://m2eclipse.codehaus.org/update-dev/). Using this Eclipse extension you will be able to work on other projects in the workspace which are Maven artifacts, and if they are dependencies for the Grails project they will be automatically added to the classpath, and dynamically updated when you make changes.

If you don't use the Maven Eclipse extensions then you can probably work with the Eclipse Maven plugin (otherwise known as maven-eclipse-plugin). Use "mvn eclipse:eclipse" to update the .classpath and refresh and then you should be OK, but won't be able to synchronize automatically with changes in other Eclipse projects.

You will need to do "grails package" from the command line first (once only):

```code
Copy$ cd test
$ grails package
```

This generates a web.xml for you, and copies and filters over some properties files from grails-app/conf. Apparently the likely long-term outlook is that web.xml will be the only generated file in web-app/WEB-INF (so only one svn:ignore in everyone's scource control system).

In Eclipse you can import the test project. Then you can do Run... and select the "test" launcher form Java Applications. You can debug, and you can change code dynamically, both in the Grails application and in dependent projects.

## What's Next

There are some things that are missing / uncomfortable about the tools I attached. They are very much work in progress. If anyone tries them out they will undoubtedly have suggestions about how to do it better. Please post back here, or on the [Grails JIRA](http://jira.codehaus.org/browse/GRAILS)

Here are some known issues or irritations:

### Duplicate Jars with Grails Packaging

Some Grails dependencies from the core might be different or just differently named than dependencies in the poms (Grails poms or project pom). When you do "grails package" it will copy jars from GRAILS\_HOME/lib into web-app/WEB-INF/lib, and there is no way to prevent the duplication. For instance wherever Grails does not use the fully-qualified jar name, you will see duplicates in WEB-INF/lib.

The problem is compounded by the fact that the Maven dependency plugin doesn't allow us to exclude provided dependencies (at the moment anyway), so all the Grails dependencies end up in ./lib when you do "mvn package". This would not be comfortable for a Grails developer because they are normally copied from GRAILS\_HOME/lib. Ideally this kind of tussle will be resolved before we can say we really have Maven-Grails integration.

### Lack of Other Maven Lifecycle Phases

The simple demo has a clean and a package lifecycle enhancement for Grails. We would linke to be able to use Maven to do more of the development and continuous integration work for us.

For instance we would like to build a WAR file from the Grails project layout. That wouldn't be too difficult to achieve with Ant and Maven. Ideally it would be implemented as a Maven plugin - this is Arnaud's project pretty much, so I hope he makes some progress, but also that he can learn from the experience here.

Other useful lifecycle phases are also missing. For example, tests cannot be driven from Maven in the sample.

### Grails Package Cycle

Grails and Maven have their own respective "package" cycles. Generally the Grails one only has to happen once (between cleans), but it is still irritating to have to remember to do it.

### Groovy Plugin for Eclipse

It's nice to have syntax highlighting in .groovy source, but otherwise it seems like the Groovy plugin just gets in the way. This is nothing to do with either Maven or Grails really, but it is known to cause problems for other Grails Eclipse users. For instance, you are likely to see a nasty warning message asking you if you want to terminate the application if you edit a controller or service. The Groovy plugin has detected the change and Eclipse can't deal with the change to teh classpath. But Grails can, so usually you can click the "Continue" button. But not always. It is safe to switch off Groovy compilation in the project properties, but then you lose the dynamic compilation for non-grails-app classes.

---

The attachment again: click [here](http://blog.interface21.com/main/wp-content/uploads/2007/07/grails-maven.zip).