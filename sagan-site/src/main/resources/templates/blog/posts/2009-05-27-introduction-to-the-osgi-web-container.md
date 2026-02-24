---
title: Introduction to the OSGi Web Container
source: https://spring.io/blog/2009/05/27/introduction-to-the-osgi-web-container
scraped: 2026-02-24T09:07:43.465Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  May 27, 2009 | 0 Comments
---

# Introduction to the OSGi Web Container

_Engineering | Rob Harrop |  May 27, 2009 | 0 Comments_

**Updated:** added version control instructions for Git.

For the last few months I've been working with Subbarao Meduri, Graham Charters, Hal Hildebrand and others from the OSGi Enterprise Expert Group on the RFC66 Web Container specification. The Web Container specification defines how WAR files can be deployed on an OSGi service platform in a standard way.

This is extremely interesting for us, because dm Server has supported WAR files for nearly 18 months now and we are excited to be able to work towards a standard model. As an end user, you'll be able to deploy WAR files on OSGi without depending on proprietary APIs or features.

SpringSource is responsible for writing the Web Container reference implementation, and I've been working on this over the last few weeks. In this blog, I'll describe the main features of the Web Container specification and discuss the steps you need to get started with the RI code. I am not permitted to post the specification document, but I'll outline the most important points.

At the moment, there is no binary distribution for the RI, but it is really easy to get started by building from source.

### Main Features in Web Container

The most interesting features supported by the Web Container are:

-   Installation of WAR files
-   Installation of Web Application Bundles (WABs)
-   Web application lifecycle control using an extender
-   Control of configuration properties using URL parameters

### Installing WAR Files

For me, the most exciting feature of the Web Container is the ability to deploy WAR files directly into OSGi \*without having to change your code\*. (WAR files that use JNDI cannot be used without changes to your code, because JNDI is not currently part of the specification. There is work underway to fix this, so I don't expect this limitation to exist forever.)

To install a WAR file into OSGi, you simply prepend webbundle: to the file location when calling BundleContext.installBundle or when using your platform's console. For example, in Equinox I can do this:

`  	install webbundle:file:formtags.war  `

Of course, this requires that you have a Web Container implementation installed into your OSGi platform.

The Web Container performs various transformations on the WAR to ensure that is has a symbolic name, version and the necessary imports for it to work. The Web Container will also update the bundle classpath to add WEB-INF/classes and every JAR file in WEB-INF/lib.

### Installing Web Application Bundles (WABs)

If you don't want to rely on Web Container to transform your WAR files, then you can bypass the transformation stage entirely. Simply, add the appropriate manifest headers yourself and install the bundle directly, omitting the webbundle protocol.

WABs cannot have any entries on the bundle class path that are not under WEB-INF. This is to prevent any of your application classes being visible as resources in your web application. It is likely that other restrictions will arise for WABs, but these are yet to be finalized.

### Lifecycle control using an extender

The Web Container uses the [extender model](http://www.osgi.org/blog/2007/02/osgi-extender-model.html) to control web application lifecycle. Web applications are started when the corresponding bundle is started, and stopped when that bundle is stopped.

In Equinox, this means I can start and stop my web application directly from the console. For example, if the formtags.war bundle above is given bundle ID 50:

`  	start 50 	... Tomcat output ... 	stop 50  `

### Controlling configuration using URL parameters

WAR file configuration can be controlled by appending certain supported configuration properties to the install URL.

For example, to control the context path of the web application, you can add the Web-ContextPath option:

`  	install webbundle:file:formtags.war?Web-ContextPath=ftags  `

Or to control the generated Bundle-SymbolicName header:

`  	install webbundle:file:formtags.war?Bundle-SymbolicName=ftags.bundle  `

### Web Container and dm Server

The code in the Web Container RI is mostly taken from and inspired by the code in dm Server, However, the RI *does not* require full dm Server. We'll be replacing the current web code in dm Server with the Web Container RI and we'll also be adopting Web Container as the recommended approach for building web applications on OSGi.

### Introduction to the Reference Implementation

The Web Container RI uses Tomcat as the servlet container implementation. The RI itself is made up of four bundles. The core bundle contains all the code that is servlet container-independent. The tomcat bundle contains the Tomcat specific code. The tomcat.fragment bundle contains the default Tomcat configuration and is attached to the Tomcat Catalina bundle as a fragment. The extender bundle contains all the extender behaviour and can be removed if you prefer to manage web application lifecycle manually.

### Building the Reference Implementation

To get running with the RI you need to build it from source. The source can be obtained directly from Git:

`  	git clone git://git.springsource.org/osgi-web-container/osgi-web-container.git  `

Once the code is checked out, you can build it and test it using the commands below:

`  	cd build-web-container 	ant clean test collect  `

If the tests fail for you, please raise a [JIRA](https://issuetracker.springsource.com). After a successful build you can run the Web Container and install some WAR files.

### Running the Reference Implementation

I'm using [PAX Runner](http://paxrunner.ops4j.org/display/paxrunner) to run the Web Container RI. My PAX Runner configuration runs the Web Container using the built binaries and Ivy-managed dependencies.

In the build-web-container directory you'll find a file called runner.bundles. This file can be used to instruct PAX Runner to install all the bundles needed by the Web Container:

`  	pax-run --platform=equinox --snapshot runner.bundles  `

This command starts Equinox using PAX Runner. The \--snapshot flag tells PAX Runner to download the latest stream stable build of Equinox - one that implements the latest known OSGi 4.2 specification.

Once Equinox starts issue the ss command to verify that the bundles are installed, you should see around 45 bundles installed and running.

### Installing an application

I'm using the FormTags WAR sample from dm Server for testing. You can download this from [here](http://www.springsource.org/dmserver).

If I try to install the FormTags application directly, things don't quite work out as expected:

`  	install webbundle:file:formtags.war 	Bundle id is 48 	start 48  `

After running start, I get an error complaining about ClassNotFoundException for some class in the org.xml.sax package. The issue here is that WAR files are only given 4 imports by default: javax.servlet, javax.servlet.http, javax.servlet.jsp and javax.servlet.tagext.

It is relatively easy to get around this using the Import-Package URL parameter:

`  	uninstall 48 	install webbundle:file:/Users/robharrop/tmp/formtags.war?Import-Package=org.xml.sax,org.xml.sax.helpers,javax.xml.parsers,org.w3c.dom 	Bundle id is 49 	start 49  `

Here I'm specifying the extra package imports needed by the FormTags application. This time, this application starts successfully and can be accessed from within the web browser at [](http://localhost:8080/formtags)[http://localhost:8080/formtags](http://localhost:8080/formtags).

In dm Server, the WAR file gets an import for every package exported by the system bundle, which means common system types are automatically available. I think this is a useful feature and I'm interested in knowing if you agree or if you prefer manually controlling access to system packages.

### What next?

The Web Container specification is still moving and I'm trying to keep the RI in sync. I'm working on moving dm Server to use the Web Container RI in place of its own web support and I'll have more to say on that in the coming weeks.