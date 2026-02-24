---
title: Completing the picture: Spring, OSGi, and the SpringSource Application Platform
source: https://spring.io/blog/2008/05/01/completing-the-picture-spring-osgi-and-the-springsource-application-platform
scraped: 2026-02-24T09:18:10.752Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Adrian Colyer |  May 01, 2008 | 0 Comments
---

# Completing the picture: Spring, OSGi, and the SpringSource Application Platform

_Engineering | Adrian Colyer |  May 01, 2008 | 0 Comments_

\*\* Updated May 2nd with case study :- see the bottom of this post for details \*\* I'm sure most of you reading this blog will have seen the announcement of the SpringSource Application Platform yesterday. If not, be sure to check out [Rob's blog post](http://blog.springsource.com/main/2008/04/30/introducing-the-springsource-application-platform/) which describes some of the motivation, programming model, and roadmap.

A couple of common questions are being asked that I'd like to address straight away in this post. After that I'll describe two other exciting announcements that complement the SpringSource Application Platform itself but that didn't grab the headlines yesterday: the SpringSource Enterprise Bundle Repository and the Application Platform tools for Eclipse. Together these complete the story around OSGi-based enterprise application development with Spring.

The question I've heard several times over the last 24 hours is: what's wrong with OSGi - why can't we just use a vanilla OSGi Service Platform (such as Equinox, Felix, or Knopflerfish) instead of the SpringSource Application Platform?

*There is absolutely nothing wrong with OSGi.*

OSGi is a great foundation and service platform - that's why we and many others have chosen to build upon it. It's [proven in a wide range of industries and applications](http://www.osgi.org/Markets/HomePage), and underpins applications such as Eclipse and IBM's WebSphere as well as the middleware stacks of several other vendors.

Programming straight to the the OSGi specification APIs lacks some of the qualities we have come to expect for enterprise applications - such as the ability to use dependency injection and create applications that are easily unit and integration testable outside of the container. Programming straight to the OSGi specification APIs also forces you to deal at a relatively low level with the dynamics of the OSGi platform - what do you do when modules and services you depend on are stopped, started, installed, and updated at runtime? But there's no fundamental obstacle here that we weren't able to overcome with the [Spring Dynamic Modules](http://www.springframework.org/osgi) project. Applications built using Spring Dynamic Modules can run on any standard OSGi Service Platform, and we test all our builds against Equinox, Felix, and Knopflerfish. We are committed to ensuring that Spring Dynamic Modules and the Spring based programming model remain runtime neutral. That position will not change with the introduction of the SpringSource Application Platform.

*There is also absolutely nothing wrong with existing enterprise libraries.*

Well, ok. There are some cases that leave a little to be desired, but by and large we know how to make them work for enterprise application development needs.

*So what's the problem then?*

If OSGi works so well, and existing enterprise libraries are meeting our needs, then where's the problem? The difficulty comes when you try to *combine* an OSGi Service Platform with a set of existing enterprise libraries that weren't written with OSGi in mind. That's not the fault of OSGi, it's got a great model that provides for excellent modularity, versioning, and operational control. It's not the fault of the enterprise libraries either - they weren't written to run under OSGi. But the very things that make OSGi so attractive break assumptions that the developers of those enterprise libraries made. The modularity model of OSGi for example stops you seeing the private parts of other people's bundles. That's exactly what you want, until you realise that your enterprise library can no longer see your application types. Lots of things can break: from commons logging to jsps, tag libraries to data sources, load-time weaving to component scanning, resource loading to orm mapping. The list goes on... (Yes, you can get many of these things to work when you package your application code and all of the libraries it needs into a single bundle, but that's very much missing the point!).

This is why you see lots of people building on top of OSGi, but very few cases of passing OSGi benefits on into the application programming model (Eclipse RCP is a rare exception). When you build on top of OSGi, but don't necessarily expose that model for end user application development, you can build to the OSGi model and make things work. When you need to provide a platform on which large numbers of existing enterprise libraries can be used it's a different ball game. If we could just throw all that away and start again with libraries written explicitly for OSGi we'd be fine. We've made sure for example that the Spring Framework is fully able to run inside an OSGi Service Platform. But that's not a realistic proposition. Alternatively we could wait for the developers of existing libraries to convert them all to run under OSGi out of the box (as we have done with Spring). But what's the motivation for them to do that unless everyone else does it too? So we seem to be stuck in a chicken-and-egg situation. It's a problem that the OSGi Enterprise Expert Group has spent a lot of time discussing over the past year. *This* is the problem that the SpringSource Application Platform solves :- it bootstraps enterprise application development into the world of OSGi by making standard OSGi bundles with standard OSGi semantics work with existing enterprise application libraries.

I'd also like to re-emphasize that the platform is not just about OSGi : the OSGi support is one of the features we're most excited about, but the SpringSource Application Platform is also an excellent server platform for deploying standard war files. We'll describe the benefits the platform offers in such scenarios in later postings.

Hopefully this post has helped to clear up some of the confusion surrounding exactly how the SpringSource Application Platform relates to OSGi. If you've been following along so far, you might have picked up on another lurking problem: it's all well and good to make existing enterprise libraries work under OSGi, but don't you need to turn all of their jar files into OSGi bundles in order to be able to deploy them? Yes you do. And it turns out that's a lot of work if you want to correctly version all of the imports and exports and ensure that you have correct symbolic names etc.. The good news is that for hundreds of commonly used enterprise applications libraries, we've done the hard work for you and made the OSGi-ready versions available in the SpringSource Enterprise Bundle Repository...

## SpringSource Enterprise Bundle Repository

The SpringSource Enterprise Bundle Repository is both a repository that can be used from Ivy and Maven, and also an online searchable database of enterprise libraries. You'll find it at [www.springsource.com/repository](http://www.springsource.com/repository). You can browse for bundles by name, or just type in a search term to find bundles with matching names, exported packages, classes, or resources. You can also see the minimal (satisfying only the required dependencies) and maximal (satisfying as many of the optional dependencies as possible) transitive dependencies of any bundle.

From the FAQ:

"The SpringSource Enterprise Bundle Repository is a collection of open source libraries commonly used for developing enterprise Java applications with the Spring Framework. The repository contains jar files (bundles) and library definition (".libd") files. A library defines a collection of bundles that are often used together for some purpose (e.g. the "Spring Framework" library). There are hundreds of bundles contained in the repository." The repository meets the following criteria:

-   Every jar file in the repository is a valid OSGi bundle. Any jar you download from the repository can be deployed as-is into an OSGi Service Platform and the SpringSource Application Platform. It can also be used as a regular jar file outside of OSGi.
-   Every bundle and library has full version information associated with it. The package export information for a bundle contains version information, and the package import information for a bundle contains full version range compatibility information.
-   The repository is transitively complete. The mandatory dependencies of any bundle are guaranteed to also be in the repository. Most of the optional dependencies of any bundle in the repository will also be present. The bundles listed in any library definition are guaranteed to be in the repository.
-   The repository is self-consistent. Before any artefact is uploaded to the repository, we verify that it can be installed, resolved, and started in an OSGi Service Platform (using the same profile as the SpringSource Application Platform) alongside all of the other bundles in the repository.
-   The repository can be used from Ivy and Maven based builds.

To maintain these guarantees we have put in place a governance model around the publishing of artefacts to the repository. There is a JIRA instance against which you can raise requests for additional libraries to be included and to report any problems (relating to OSGi manifests etc.) with existing published artefacts.

## Application Development Tools:

So far we've discussed the Spring-based programming model for developing applications as OSGi bundles, the availability of enterprise libraries to deploy into an OSGi Service Platform, and a runtime (the SpringSource Application Platform) that enables these legacy libraries to work in an OSGi runtime. The missing piece of the puzzle is the developer tools that make the creation of OSGi-based applications easy.

Eclipse already has OSGi development tools built-in. Since every Eclipse plugin is also an OSGi bundle, the Eclipse PDE tools (Plugin Development Environment tools) can be used for OSGi application development. However, the fact that these tools were primarily designed for the development of Eclipse plugins shows through and there are a couple of common frustrations when using them for OSGi application development. One is that the META-INF/MANIFEST.MF file can only be placed at the root of the project - which doesn't work well with build tools such as Ivy and Maven, and the other is that you are restricted to a single target platform (collection of bundles to develop against) for your whole workspace. What *is* great about the PDE tools, and which you really need, is that they build the compilation classpath for your project from the OSGi manifest - so that you don't have differences in classpath and class visibility between compile, test, and runtimes.

Alongside the SpringSource Application Platform we've also released a set of Eclipse plugins (available from the SpringSource Application Platform download page) that makes the development of OSGi applications easier, especially applications targeted at the SpringSource Application Platform. Your META-INF/MANIFEST.MF file can be in any source directory, and the tools build the compilation classpath from the manifest entries. Instead of a single target platform though, you can associate your project with a SpringSource Application Platform server defined to Eclipse (using the WTP facilities). The classpath for your project is then derived from the import statements in your manifest, resolved against other bundle projects in your workspace and the bundles installed in the associated server. You get the exact same interpretation of your classpath and dependencies at compile time as you do at runtime. And of course, the normal "deploy to server" options work too.

Here's how the server looks when it's running inside Eclipse: ![](http://static.springsource.com/projects/s2ap/1.0.0.beta/programmer-guide/html/images/ToolingDeployedApplication.png)

And this screenshot shows how the classpath is managed with a "Bundle Dependencies" classpath container. Notice how packages that you have not imported in your manifest file are greyed out to indicate that you can't currently access them.

![](http://static.springsource.com/projects/s2ap/1.0.0.beta/programmer-guide/html/images/ToolingClasspath.png)

Even better is how we're able to take advantage of OSGi's modularity. A set of projects (one per bundle) make up your application. When you change anything in the project, an additional incremental builder analyses the resources deltas and does a live update of the running bundle in the SpringSource Application Platform - so you're continually running with the latest code : every time, all the time. That's a great productivity boost and a great development experience.

## Case Study

Matt Raible posted a [blog entry](http://raibledesigns.com/rd/entry/running_spring_mvc_web_applications "Running Spring MCV Web Applications") about his adventures trying to get a Spring web application working under OSGi using Freemarker - without using the SpringSource Application Platform. This seemed like a good challenge application to test out what I said above about making existing enterprise libraries work. The good news is, this application runs very happily on the SpringSource Application Platform. Here are the steps I followed to make it work (total time, about 10 minutes):

-   Download the zip file from Matt's blog
-   Run 'mvn'
-   cp target/mpapp.war to the pickup directory of the Platform
-   Startup the platform: bin/startup.sh.

I got the following output to the console:

com.springsource.platform.deployer.core.DeploymentException: Unable to satisfy constraints of 'myapp' version '0.0.0':

Cannot resolve: myapp  Unsatisfied leaf constraints:

Bundle: myapp\_0.0.0 - Import-Package: org.springframework.osgi.web.context.support; version="0.0.0"

Did you mean: 'org.springframework.osgi.context.support'?

Bundle: myapp\_0.0.0 - Import-Package: freemarker.ext.servlet; version="0.0.0"

Did you mean: 'javax.servlet'?

Bundle: myapp\_0.0.0 - Import-Package: freemarker.core; version="0.0.0"

Did you mean: 'org.hamcrest.core'?

Bundle: myapp\_0.0.0 - Import-Package: freemarker.template; version="0.0.0"

Did you mean: 'org.antlr.tool'?

Bundle: myapp\_0.0.0 - Import-Package: freemarker.cache; version="0.0.0"

Did you mean: 'org.apache'?

These are expected messages since I don't have freemarker or the osgi.web.context support bundles installed in the platform.

-   Go to http://www.springsource.com/repository. Type "freemarker" into the search box, find the one matching entry and click on the link to download it. Copy the downloaded bundle in repository/bundles/usr
-   Simplify the manifest to point to the new bundles and libraries on the platform. The original manifest looked like this:

Import-Package: javax.servlet,javax.servlet.http,javax.servlet.resources,javax.swing.tree,

javax.naming,org.w3c.dom,org.apache.commons.logging,javax.xml.parsers;resolution:=optional,

org.xml.sax;resolution:=optional,org.xml.sax.helpers;resolution:=optional,

org.springframework.osgi.web.context.support, org.springframework.context.support,

org.springframework.web.context, org.springframework.web.context.support,

org.springframework.web.servlet, org.springframework.web.servlet.mvc,

org.springframework.web.servlet.mvc.support, org.springframework.web.servlet.view,

org.springframework.ui, org.springframework.web.servlet.view.

freemarker, freemarker.cache,freemarker.core,freemarker.template,freemarker.ext.servlet

and I took it down to:

Import-Package: org.apache.commons.logging

Import-Library: org.springframework.spring;version="\[2.5.4,3.0.0)"

Import-Bundle: com.springsource.freemarker;version="2.3.12"

When we know you are deploying a web application, the commonly required imports are automatically added at deployment time. Import-Library and Import-Bundle allow you to conveniently refer to libraries and bundles in a single statement. I also deleted the "Bundle-Classpath" entry as the application platform will automatically detect libraries in WEB-INF/lib and add them to the bundle classpath.

-   I edited web.xml and commented out the context-param declaration since there is no need to use a custom application context type here
-   Run 'mvn' again, and copy the myapp.war into the pickup directory.
-   The Application Platform automatically redeployed the application
-   Point a browser at http://localhost:8080/myapp/ .... SUCCESS!

I think this is a nice demonstration of the value proposition of the platform in smoothing the path of making enterprise libraries work under OSGi.