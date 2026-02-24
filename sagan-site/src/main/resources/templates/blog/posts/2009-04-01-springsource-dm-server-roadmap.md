---
title: SpringSource dm Server Roadmap
source: https://spring.io/blog/2009/04/01/springsource-dm-server-roadmap
scraped: 2026-02-24T09:09:27.747Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  April 01, 2009 | 0 Comments
---

# SpringSource dm Server Roadmap

_Engineering | Rob Harrop |  April 01, 2009 | 0 Comments_

We get a lot of questions from dm Server users about what to expect in the next few releases. In this blog entry, I will outline the main features that we have on our roadmap. We are following Scrum practices so you can expect to see reasonably frequent milestones as output from our sprints, and we are flexible in handling new requirements and changes in priorities.

#### Shared repositories

Shared repositories allow you to have a centralized location for managing the artifacts that are available to be installed in your dm Server instances. These shared repositories can then be added to a dm Server configuration at any point in its repository chain.

A **shared repository** is simply a dm Server node that manages a file system repository and makes it available for use by other nodes. These repository hosting nodes are called **dm Repository nodes**. The number of shared repositories and their ordering is not fixed - you are free to choose whatever repository structure makes sense for your environment.

Client dm Server nodes communicate with a repository node using a REST API. This REST API will be documented and made available so that third-party tools can integrate with the shared repository infrastructure. We imagine scenarios whereby tools are created to manage the repository and other scenarios that implement the REST API on top of third-party repository products.

We'll be upgrading the software for our Enterprise Bundle Repository to run as a full dm Repository, complete with REST API access.

#### Repository and provisioning enhancements

The dm Server provisioning system has been upgraded to deal with a generalized artifact abstraction, rather than dealing specifically with bundles. The main reason for this is that dm Server 2.0 will support many different deployment units, not just bundles and WAR files.

The repository infrastructure has been extended to enable artifacts of different types to be managed by a single repository. Your dm Server nodes can then query the repository for all the artifacts that it needs.

#### Plan Files

The support for PAR files in dm Server allows you to group bundles together as a single logical unit. Within a PAR, bundles and services are placed into a **scope** that isolates them from the rest of the system. This scoping ensures that the bundles wire to each other and see each other's services in preference to services from outside the scope. Scoping also prevents application code from leaking into the global scope or the scopes of other applications.

Plan files (or simply, plans) generalize PARs to support:

-   artifacts other than bundles
-   optional scoping
-   control of artifact lifecycle

Plans also remove the need for the extra packaging step required by PARs - a plan simply refers to other artifacts in your repository:

```xml
Copy<plan name="greenpages" version="1.0.0" scoped="true" atomic="true">
  <artifact type="bundle" name="greenpages.db" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.app" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.jpa" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.web" version="${plan.version}"/>
</plan>
```

In this example you can see a plan named **greenpages** with version **1.0.0** that references 4 bundles.

The **scoped** attribute of the plan controls whether or not the artifacts in the plan should be installed into a plan-specific scope. When scoping is disabled, the artifacts are deployed into the global scope and are available for access by all other artifacts.

The **atomic** attribute controls whether the lifecycle of the artifacts in the plan should be tied together. Making a plan atomic means that install, start, stop and uninstall events for a single artifact in the plan will be escalated to all artifacts in the plan. Also, in an atomic plan, dm Server prevents artifacts from being in inconsistent states. For example, if one artifact should fail to start, then dm Server will stop all artifacts in the plan.

The order of artifact declarations inside the plan is important. To support ordering constraints, dm Server will broadcast lifecycle events to artifacts in the order they are defined in the plan. This allows you to create bundles that have ordering dependencies during start without worrying about how to control the deploy-time ordering.

Plans generalize many constructs available in dm Server today. A PAR is equivalent to a scoped, atomic plan, while a library is equivalent to an unscoped, non-atomic plan. The dm Server-internal construct of a subsystem is simply an uscoped, atomic plan.

#### Configuration provisioning

One of the most exciting new deployment artifacts that will be supported by dm Server 2.0 is configuration files. A configuration file is simply a properties file which is made available at runtime using the OSGi Config Admin service.

Configuration files have full lifecycle support and can be updated and refreshed at runtime. Your application can subscribe for notification of a refresh to its configuration files and adapt accordingly.

When combined with plans, configuration files provide an excellent mechanism for managing external configuration data for your applications. Consider this JDBC configuration file:

```java
Copy
jdbc.url=jdbc:h2:tcp://localhost/~/greenpages
jdbc.user=greenpages
jdbc.password=pass
jdbc.driverClassName=org.h2.Driver
```

This configuration file can be published into the repository under the name **greenpages.jdbc.dev** at version **1.0**. In our plan, we can then refer to this configuration file:

```xml
Copy<plan name="greenpages.dev" version="1.0.0" scoped="true" atomic="true">
  <artifact type="properties" name="greenpages.jdbc.dev" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.db" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.app" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.jpa" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.web" version="${plan.version}"/>
</plan>
```

Here a plan called **greenpages.dev** references the **greenpages.jdbc.dev** configuration file. We can now construct a plan called **greenpages.prod** that references a different configuration file.

To reduce the amount of duplication needed in this scenario, plans themselves are artifacts in the repository and can therefore be referenced from within other plans

```java
Copy<plan name="greenpages.bundles" version="1.0.0" abstract="true">
  <artifact type="bundle" name="greenpages.db" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.app" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.jpa" version="${plan.version}"/>
  <artifact type="bundle" name="greenpages.web" version="${plan.version}"/>
</plan>

<plan name="greenpages.dev" version="1.0.0" scoped="true" atomic="true">
  <artifact type="properties" name="greenpages.jdbc.dev" version="${plan.version}"/>
  <artifact type="plan" name="greenpages.bundles" version="${plan.version}"/>
</plan>

<plan name="greenpages.prod" version="1.0.0" scoped="true" atomic="true">
  <artifact type="properties" name="greenpages.jdbc.prod" version="${plan.version}"/>
  <artifact type="plan" name="greenpages.bundles" version="${plan.version}"/>
</plan>
```

Here a plan called **greenpages.bundles** is referenced by the **greenpages.prod** and **greenpages.dev** plans. The **greenpages.bundles** plan is declared to be abstract preventing it from being deployed into dm Server on its own.

#### Build enhancements

We [recently announced our Bundlor tool](http://blog.springsource.com/2009/03/20/getting-started-with-bundlor/) that simplifies the creation of OSGi manifests in Maven, Ant and Eclipse. We'll be releasing a number of enhancements to Bundlor alongside dm Server 2.0 including:

-   Automatic version detection from Maven and Ivy files
-   Support for bnd-style version range expressions
-   Bulk bundle processing

Automatic version detection enables Bundlor to determine the version of a package or bundle dependency using the information in your Maven or Ivy files. Currently, this information is contained in the **TEMPLATE.MF** file or in an external properties file.

Using version range expressions, you can expand an input version into a version range. This allows for versions defined in Maven or Ivy files to be expanded into ranges when mapped on to package dependencies.

Bulk bundle processing will allow for large numbers of JARs to be turned into bundles automatically. The relationships between the JARs is used to infer version information so you have less code to write in your templates.

#### Modular web applications

One of the most exciting features we have planned for the future is support for modular web applications. Currently, in dm Server 1.0, it is possible to split most tiers of your application into bundles, but the web tier tends to pose problems. Static resource resolution, session sharing and the need to compose a UI from multiple contributors make this feature a problem for plain OSGi.

Using the modular web application support in dm Server you will be able to split your web content across multiple bundles, referred to as **web fragments**. All web fragments in an application share the same **ServletContext** session state. Each web fragment is assigned to handle a sub-portion of the URL space for the application, much like web context mapping is done with WAR applications. As an example, consider the diagram below:

![mwa-example](http://blog.springsource.com/wp-content/uploads/2009/04/mwa-example.png "mwa-example")

This diagram represents a single web application, Spring Travel, which is mapped to the **/springtravel** context path. The Spring Travel application is made up of three web fragments, each of which is mapped to a sub-path of **/springtravel**. For example, the **flights** web fragment services requests to **/springtravel/flights/\***.

Web fragments can be added to an application dynamically, and the application can adapt as these fragments are installed and uninstalled.

The most interesting feature of modular web applications is support for UI composition. The web master bundle can define the basic templates, layout, styles and images of your web application. A web fragment can then contribute sections to existing pages or whole new pages that fit into one of the templates supplied by the master.

We are still in the process of defining exactly what this UI model will look like, but I hope that initially we will be able to support JSF as one means of defining templates and contributions.

#### Distributed Management

The AMS team will be extending their dm Server support to allow the following operations to be performed across a group of dm Server nodes:

-   Artifact install/uninstall
-   Artifact start/stop
-   Artifact refresh
-   Repository publish/remove

AMS lead Jennifer Hickey will be talking more about this in an upcoming blog entry.

#### Cloning

Cloning is a feature that we are introducing to solve a number of thorny problems that our advanced users are facing.

The first problem that cloning solves is the issue of sharing bundles that have static state. Static state is coupled to the class in which the static field is defined. In OSGi, bundles that consume classes that have static state **do not** get their own version of that class. As an example of this problem, consider the use of Log4J in an application.

Log4J stores its configuration state in static variables. When you deploy your application as a WAR file this is not likely to be a problem. Log4J will be deployed in **WEB-INF/lib** and your application will have its own private copy of the Log4J classes. In OSGi however, you are likely to have many bundles sharing the same Log4J bundle and therefore, the same Log4J classes.

The second problem that cloning aims to solve is something called **pinning**. Pinning prevents you from installing two bundles that depend on the same third-party bundle but at different versions. Pinning arises when the two bundles you are installing have dependency graphs that partially overlap, with the non-overlapping pieces breaking a uses constraint. Consider the case in the diagram below:

![cloning-start](http://blog.springsource.com/wp-content/uploads/2009/04/cloning-start.png "cloning-start")

Here **Bundle A** depends on **Spring 2.5.6** and **EclipseLink 1.0.0**. This dependency profile is fine and the bundle will install correctly assuming all the other dependencies are satisfied.

Now consider what happens when we want to introduce a second bundle, **Bundle B**, and we want this bundle to depend on **Spring 2.5.6** and we want to upgrade the version of EclipseLink to 1.0.1:

![cloning-full](http://blog.springsource.com/wp-content/uploads/2009/04/cloning-full.png "cloning-full")

You can see that the dependency between **Bundle B** and **EclipseLink 1.0.1** is satisfiable, but **Bundle B** cannot be wired to **Spring 2.5.6**. The reason for this is that Spring has a **uses** constraint for all **org.eclipse.persistence** packages. This constraint prevents **Bundle B** from wiring to **Spring 2.5.6** *and* an EclipseLink bundle, unless it wires to the same EclipseLink bundle as **Spring 2.5.6**. More on uses can be found in Glyn's [introduction blog](http://blog.springsource.com/2008/10/20/understanding-the-osgi-uses-directive/) and my blog on [diagnosing uses failures](http://blog.springsource.com/2008/11/22/diagnosing-osgi-uses-conflicts/).

To solve these problems cloning provides the ability to create a managed clone of a bundle and for this clone to be bound into the scope of your application. Cloning can be invoked manually when referencing a bundle using **Import-Bundle**. You can use this to create a clone of Log4J for your application bundles:

```java
Copy
Manifest-Version: 1
Bundle-ManifestVersion: 2.0
Bundle-SymbolicName: app.bundle
Bundle-Version: 1.0.0
Import-Bundle: com.springsource.org.apache.log4j;bundle-version="1.3.4";sharing:=clone
```

When this is installed into dm Server you will get something like this:

![cloning-log4j](http://blog.springsource.com/wp-content/uploads/2009/04/cloning-log4j.png "cloning-log4j")

Here, a clone of the Log4J bundle is created in the scope (denoted by the dashed line) of **app.bundle**.

Cloning will fire automatically during provisioning if dm Server encounters a uses constraint violation. Revisiting the earlier example of **Bundle B** and **EclipseLink 1.0.1**, cloning will give the following:

![cloning-auto-fixed](http://blog.springsource.com/wp-content/uploads/2009/04/cloning-auto-fixed-2.png "cloning-auto-fixed")

During provisioning, dm Server detects that the dependencies for **Bundle B** cannot be satisfied and creates a clone of **Spring 2.5.6** to solve this.

The dm Server runtime management model will fully understand clones. You can query for the clones that are attached to a given bundle, and updates and refreshes to a bundle affect that bundle's clones as well.

#### Improved logging and tracing support

We've had a lot of feedback about logging and tracing support in dm Server 1.0, and in 2.0 we'll be addressing the most pressing of the issues raised by our users.

For dm Server 2.0, we'll be overhauling all our tracing to run on top of SLF4J with the LogBack implementation underneath. In addition, our logging framework will be reworked to sit as a thin layer on top of SLF4J.

We'll be providing a series of LogBack (and possibly Log4J) appenders that will route user and application-specific trace into the dm Server trace files. Of most interest here is probably the ability to selectively choose which bundles you want to write application-specific trace. It is also important to note that when using application-specific trace, the application destination is chosen dynamically based on the current work unit inside dm Server. This means that the same shared library can write its trace into different application trace files depending on its usage.

One feature I am excited about is support for deploying LogBack configurations from the repository. Once a configuration is installed into dm Server, bundles can choose to bind to that configuration as their logging configuration source. This provides an easy mechanism for supporting multiple different log configurations side-by-side and for sharing logging configuration across multiple bundles.

#### Enterprise OSGi

This year should see the first release of OSGi specifications targeted specifically at enterprise usage. We are actively involved in this process and we intend for dm Server 2.0 to be the best place to run Enterprise OSGi applications. We'll be supporting:

-   RFC66 - Web Container for OSGi
-   RFC119 - Distributed OSGi
-   RFC124 - Blueprint Service (spawned from work in Spring Dynamic Modules)
-   RFC139 - JMX interface for OSGi
-   RFC142 - JNDI and OSGi integration

The reference implementation for RFC124 is being created by SpringSource based on the work done in Spring Dynamic Modules. We are also building the reference implementation for RFC66 using the web application support that is already present in dm Server 1.0.

#### Administration shell

The administration shell provides secure, command-line access to dm Server administration functionality. Using the administration shell you can:

-   manage the configured repositories
-   install/uninstall artifacts
-   start/stop artifacts
-   update/refresh artifacts
-   query the artifact dependency graph
-   query running services
-   diagnose dependency resolution problems

The administration shell is fully pluggable allowing for custom commands to be added in easily.

#### Tomcat configuration

Due to popular demand we'll be switching from the dm Server-specific mechanism for configuring Tomcat back to using Tomcats own configuration file format.

## What's next?

In the next few days, we'll be releasing dm Server 2.0 M1 which will include a preview of our plan and shared repository functionality. From then on, we hope to be able to publish regular milestone releases along the way to our final release which we are planning for some time in July.