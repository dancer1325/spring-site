---
title: Introducing the SpringSource Application Platform
source: https://spring.io/blog/2008/04/30/introducing-the-springsource-application-platform
scraped: 2026-02-24T09:18:15.363Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  April 30, 2008 | 0 Comments
---

# Introducing the SpringSource Application Platform

_Engineering | Rob Harrop |  April 30, 2008 | 0 Comments_

After many months of feverish coding, I am pleased to announce the beta release of the SpringSource Application Platform 1.0.

At the beginning of 2007 we began discussing possible alternatives to the monolithic and heavyweight application servers with which Enterprise Java has become synonymous. Customers were looking for a platform that was lightweight, modular and flexible enough to meet their development and deployment needs.

The Spring and Tomcat pairing demonstrates that developers and operators can successfully use a lightweight platform in production. Despite the success of this combination, the lack of modularity and explicit support for non-web applications limits its applicability and flexibility.

We set about building the SpringSource Application Platform to address these requirements and remove these limitations.

At the heart of the Platform is the Dynamic Module Kernel (DMK). The DMK is an OSGi-based kernel that takes full advantage of the modularity and versioning of the OSGi platform. The DMK builds on Equinox and extends its capabilities for provisioning and library management, as well as providing core function for the Platform.

![SpringSource Application Platform Architecture](http://blog.springsource.com/main/wp-content/uploads/2008/04/architecture.png)

To maintain a minimal runtime footprint, OSGi bundles are installed on demand by the DMK provisioning subsystem. This allows for an application to be installed into a running Platform and for its dependencies to be satisfied from an external repository. Not only does this remove the need to manually install all your application dependencies, which would be tedious, but it keeps memory usage to a minimum.

The DMK itself requires a minimal set of bundles to run, and is configured with a **profile** to control exactly the set of additional modules that are loaded. For example, the DMK does not require Tomcat to be present, but the default Platform profile includes Tomcat to allow web applications to be deployed. If you want to run a Platform without Tomcat, you can simply edit the profile and it won’t be installed. (If you try this - remember that removing web support means that web modules will no longer deploy, so delete the contents of the pickup directory so the platform won’t attempt to install the Admin and splash screen applications when it starts.) The default Platform configuration with the admin console installed takes only 15MB of memory.

One frustration I have always had with Enterprise Java is that applications are often shoe-horned into contrived silos, and that explicit support for different application types is lacking. Consider an application for an online store. This application has a web front-end, a message-driven order processing module, a batch-driven stock reordering module and a B2B web service module. Today, many applications like this would be packaged as a WAR or an EAR and the modules would look very similar, with little support for the differences in the module types. Interestingly, many people would refer to this as a web application, rather than an application with a web module.

In the SpringSource Application Platform, applications are modular and each module has a **personality** that describes what kind of module it is: web, batch, web service, etc. The Platform deploys modules of each personality in a personality-specific manner. For example, web modules are configured in Tomcat with web context. Each module in the application can be updated independently of the other modules whilst retaining the identity of being part of the larger application. Whatever kind of application you are building, the programming model remains standard Spring and Spring DM.

In the 1.0 Platform release we support the **web** and **bundle** personalities, which enable you to build sophisticated web applications. Future releases will include support for more personalities as detailed later.

## Building Applications

The Platform supports applications packaged in three forms:

1.  Java EE WAR
2.  Raw OSGi bundles
3.  Platform Archive (PAR)

Standard WAR files are supported directly in the Platform. At deployment time, the WAR file is transformed into an OSGi bundle and installed into Tomcat. All the standard WAR contracts are honoured, and your existing WAR files should just drop in and deploy without change.

Any OSGi-compliant bundle can be deployed directly into the Platform, and can take full advantage of on-the-fly provisioning for any dependencies referred to by Import-Package and Require-Bundle.

The PAR format is the recommended approach for packaging and deploying applications for the Platform. A PAR is simply a collection of OSGi bundles (modules) grouped together in a standard JAR file, along with a name and a version that uniquely identify the application. The PAR file is deployed as a single unit into the Platform. The Platform will extract all the modules from the PAR and install them. Third-party dependencies will be installed on-the-fly as needed.

The PAR format has three main benefits over deploying the bundles directly into the Platform. Firstly, it’s just easier. An average-sized enterprise application might contain 12+ bundles - deploying these by hand will be far too cumbersome. Secondly, the PAR file forms an explicit scope around all the bundles in the application which prevents applications that use overlapping types or services from clashing with each other. This scope is also used by some advanced features such as load-time weaving to ensure that weaving of one application doesn’t interfere with weaving of another. Lastly, the PAR forms a logical grouping to define what modules are part of an application and what third-party dependencies the application has. This grouping is used by the management tools to provide a detailed view of the application. A typical PAR application looks like this:

![PAR File Structure](http://blog.springsource.com/main/wp-content/uploads/2008/04/par-structure.png)

Dependencies between modules in an application are typically expressed using Import-Package and Export-Package. Dependencies on third-party libraries can be expressed in the same way, but for many libraries this can be error-prone and time-consuming. When using a library such as Hibernate, you will typically have to import more packages than you initially expect. To get around this you *could* use Require-Bundle, but this has some semantic rough edges such as split packages where a logical package is split across two or more class loaders causing problems at runtime. The Platform introduces two new mechanisms for referring to third-party dependencies: Import-Bundle and Import-Libary. Import-Bundle is analogous to Require-Bundle except it prevents split packages and the other problems with Require-Bundle. Import-Library provides a mechanism to refer to all the packages exported by a group of bundles, for instance all bundles in the Spring Framework, in a single declaration:

```code
CopyBundle-SymbolicName: com.myapp.dao.jdbc
Bundle-Version: 1.0.0
Import-Bundle: org.apache.commons.dbcp;version="1.2.2.osgi"
Import-Library: org.springframework.spring;version="2.5.4.A"
```

Here I have a module bundle that depends on the Commons DBCP bundle and the Spring Framework library. The Spring Framework library contains all the bundles needed to use Spring in your application.

Import-Library and Import-Bundle expand under the covers into Import-Package and are therefore consistent with standard OSGi semantics.

The Platform understands the personality of a module, and from this can infer how to configure the module’s execution environment. When deploying a web module, all the servlet infrastructure needed for a typical Spring MVC application is created automatically, removing the need to recreate this boilerplate code across applications. In the 1.0 final release, more smarts will be added to the web module personality to support additional technologies such as Spring Web Flow.

Whatever packaging format you choose, the programming model is simply Spring Framework and Spring Dynamic Modules, with the other Spring Portfolio products running on top.

## Serviceability

Serviceability was a critical consideration for the whole engineering team. We have spent an inordinate amount of time worrying about the format of log messages and the size of stack traces to make sure that diagnosing problems with your applications is as easy as possible. Any time we find a task that is repetitive and time-consuming we look for a way to automate it or remove it altogether.

To aid with problem diagnosis the Platform has a strong split between log and trace messages. Log messages are intended for end-user consumption and allow you to get access to the most important failure information without having to trawl through gigabytes of trace content. All application failures are displayed and coded in the log output - the codes serving as a convenient way to access knowledge base or support content. To understand why this is so useful, consider the following output from Platform startup:

```code
Copy[2008-04-29 12:12:01.124] main                     <SPKB0001I> Platform starting.
[2008-04-29 12:12:04.037] main                     <SPKE0000I> Boot subsystems installed.
[2008-04-29 12:12:06.013] main                     <SPKE0001I> Base subsystems installed.
[2008-04-29 12:12:07.396] platform-dm-1            <SPPM0000I> Installing profile 'web'.
[2008-04-29 12:12:07.674] platform-dm-1            <SPPM0001I> Installed profile 'web'.
[2008-04-29 12:12:07.721] platform-dm-14           <SPSC0000I> Creating ServletContainer on port 8080
[2008-04-29 12:12:08.036] platform-dm-10           <SPPM0002I> Platform open for business with profile 'web'.
[2008-04-29 12:12:09.405] fs-watcher               <SPSC1000I> Creating web application '/admin'
[2008-04-29 12:12:09.652] async-delivery-thread-1  <SPSC1001I> Deploying web application '/admin'
```

Gone are the pages and pages of output detailing the inner workings of every single type in the startup call chain. Instead, you get messages that *actually mean something*. Of course, this doesn’t mean you can’t find out what every type is doing: we still maintain an extensive trace. Indeed, because we split out the most important log messages from trace, our trace can be more verbose because it is intended to be read less often.

Critical failures in the Platform generate a service dump that can be passed to support personnel to aid in the diagnosis process. This dump contains state from all the major subsystems in the Platform and is hooked in via AspectJ to make sure we pick up every possible site where an unchecked Exception can be raised.

The Platform also actively monitors for problems in the JVM and triggers a dump. In the 1.0 release this is limited to deadlock monitoring only, but will include memory, lock contention and CPU contention in future releases.

## Roadmap

This beta release is only the start for the SpringSource Application Platform. We have tentatively defined a roadmap to cover the 2.0 release with a focus on five main areas: the Admin Console, middleware integration, additional personalities, clustering and DMK 2.0.

With the Admin Console we want to exploit all the application knowledge that the Platform has, and make this available to the end-user. The Admin Console will allow for detailed inspection of applications starting at the module level and running right down to the bean level. Applications will be linked to the libraries and bundles they depend on, and the Admin Console will provide the ability to upgrade these libraries dynamically. By understanding the different types of beans that an application contains, the Admin Console will provide for detailed insight into application internals and allow for dynamic reconfiguration of certain application components.

To support typical enterprise deployment scenarios, the 2.0 version of the Platform will provide explicit support for common enterprise middleware components such as Oracle, TIBCO EMS and IBM MQSeries. Integration with the Admin Console will allow for connections to these middleware providers to be established in minutes rather than hours or days. Applications will be able to access these connections using the OSGi service registry and Spring DM’s <osgi:reference>.

The 2.0 release will introduce additional personalities to cover batch, web services and SOA applications.

Clustering is an important feature for the 2.0 release, with cluster-wide Single System Image (SSI) being the critical piece, and load-balancing and clustered caching being on the roadmap as well. Using the SSI support, administration and deployment operations will be propagated across the cluster. Ultimately, we want to support per-module updates across the cluster, with full cluster-rollback if the upgrade breaks a deployed application.

DMK 2.0 will include improvements to the concurrency subsystem to support large numbers of bundles that change frequently and to support larger numbers of modules with more complex interdependencies. Also included will be updates to the provisioning subsystem and integrated resource management and monitoring for memory, threads, IO and CPU.

## What next?

Please download the Platform and try it out. We are keen to hear about your experiences building new applications and deploying existing ones. All feedback, positive or negative, is welcome. We are particularly interested to hear how we can make the process of building and deploying applications easier and more enjoyable.

The binary releases and forums can be found [here](http://www.springsource.com/beta/s2ap). Both the [user's guide](http://static.springsource.com/projects/s2ap/1.0.0.beta/user-guide/html/) and [programmer's guide](http://static.springsource.com/projects/s2ap/1.0.0.beta/programmer-guide/html/) are available online. We have a JIRA instance set up [here](http://issuetracker.springsource.com/browse/PLATFORM).