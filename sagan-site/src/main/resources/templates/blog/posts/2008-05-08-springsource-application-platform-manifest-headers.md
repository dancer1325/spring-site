---
title: SpringSource Application Platform Manifest Headers
source: https://spring.io/blog/2008/05/08/springsource-application-platform-manifest-headers
scraped: 2026-02-24T09:17:38.310Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Glyn Normington |  May 08, 2008 | 0 Comments
---

# SpringSource Application Platform Manifest Headers

_Engineering | Glyn Normington |  May 08, 2008 | 0 Comments_

The SpringSource Application Platform is constructed from OSGi bundles and supports applications which are also constructed from OSGi bundles. The Platform supports the standard features of OSGi, but it also supports some additional manifest headers. Several people have asked Why did SpringSource add proprietary headers? and What are the semantics of the new headers?, so this post explains the background motivation and the semantics of Import-Library and Import-Bundle.

## Standard OSGi Bundle Support

The Platform is built on the [OSGi R4.1](http://www.osgi.org/Specifications/HomePage) standard, or [JSR 291](http://jcp.org/en/jsr/detail?id=291) if you prefer, and uses [Equinox](http://www.eclipse.org/equinox/) as its OSGi implementation. The result is that you can develop standard OSGi bundles using the Platform's tooling and deploy those bundles on the Platform, as a number of users have been doing since the Platform's launch.

So OSGi savvy developers can use the Platform as a standard OSGi container and benefit from Platform features such as:

-   the ability to deploy bundles using the Admin Console or by dropping bundles in the Platform's pickup directory,
-   diagnostics such as resolution failure diagnosis, application specific trace, and automatic deadlock detection,
-   strong integration with Spring and Spring Dynamic Modules, for developers who want to use these frameworks, and
-   automatic provisioning of dependencies from a repository.

However, the Platform also aims to make it easy for enterprise application developers with little or no prior exposure to OSGi to benefit from OSGi, which places some extra requirements on the Platform.

## Additional Requirements of Enterprise Applications

As Sam's recent [blog](http://blog.springsource.com/main/2008/05/06/springsource-application-platform-deployment-options/) on the Platform's deployment options explains, you can deploy existing monolithic WAR files on the Platform with no need to understand OSGi - the Platform takes care of everything for you. But to benefit from shared libraries, shared services and, ultimately, PAR file scoping, it is necessary to break monolithic WAR files into OSGi bundles. How hard can that be?

Well, some steps in the process are relatively easy, especially if good software engineering practices have been followed and the code has been organised into service, domain, and infrastructure components. These components can be converted into bundles and the dependencies between them expressed using standard OSGi Import-Package and Export-Package headers in META-INF/MANIFEST.MF.

A more difficult step is expressing dependencies on enterprise frameworks such as Spring and Hibernate. It is entirely possible to express these dependencies using standard OSGi Import-Package and Require-Bundle headers, and this is exactly what you should do if your aim is to create OSGi bundles which will run in other OSGi containers, but this approach has some hidden costs.

Firstly, the developer has to decide precisely which packages comprise a given framework. It isn't sufficient merely to import the packages the application code uses, as several enterprise frameworks weave further dependencies into the bytecode of the application when the application is loaded. The developer has to discover, probably by trial and error, which additional implementation packages to import to ensure correct behaviour of the woven application.

Then there is the chore of migrating from one version of a framework to the next where the precise set of packages comprising the framework has changed. The additional packages required for weaving are typically not defined by a public contract and so are subject to change.

Additionally, the resultant package imports don't properly capture the design intent, which makes maintaining or extending the application more difficult in the future.

We really don't want to impose these burdens on our users, so we created some additional SpringSource Application Platform specific manifest headers, Import-Library and Import-Bundle, as convenient ways of expressing dependencies on enterprise frameworks. As you'll see below, these headers are really just syntactic sugar which are expressed in terms of standard OSGi package imports.

## Import-Library

The basic syntax is similar to that of other manifest headers:

    Import-Library: <librarySymbolicName>;version=<versionRange>

where <librarySymbolicName> is the symbolic name of the library and <versionRange> is a range of acceptable versions of the library using OSGi version range notation. A library definition specifies the library's symbolic name and version and these together uniquely identify the library to the Platform.

If you are unfamiliar with OSGi version range notation, by far the most commonly used forms are minimum version ranges such as 2, meaning version 2 or later, and half-open ranges such as \[2.2.1,2.2.2), meaning any version between 2.2.1 inclusive and 2.2.2 exclusive. If version=<versionRange> is omitted, together with the semicolon delimiter of course, then the default range includes all versions.

For each library import, the Platform selects the library with the given symbolic name and the highest version in the given version range available in the Platform's repository. The Platform then replaces the library import with a set of package imports which match all the packages exported by the bundles of the library. The Platform detects the situation where a bundle imports two or more libraries which export a common package, issues an appropriate log message, and fails to install the importing bundle.

So, for example, the following header imports some version of the [Spring Framework library](http://www.springsource.com/repository/app/library/version/detail?name=org.springframework.spring&version=2.5.4.A) between 2.5.4 inclusive and 2.5.5 exclusive:

    Import-Library: org.springframework.spring;version="\[2.5.4,2.5.5)"

### Optional Library Import

You can indicate that a library import is optional using the following syntax. Note the special separator := which indicates a directive that modifies the semantics of the manifest header, as opposed to the separator \= which indicates a matching attribute, like version.

    Import-Library: <librarySymbolicName>;version=<versionRange>;**resolution:=optional**

If resolution is not specified, or is specified as mandatory, the bundle containing the import library header will fail to install if there is no library with the given symbolic name and a version in the given range. But if resolution:=optional is specified, the library import will be ignored if no suitable library is available.

So, for example, the following header imports some version of the Spring Framework library from 2.5 onwards, but is ignored if no suitable library is available:

    Import-Library: org.springframework.spring;version="2.5";resolution:=optional

### Importing More than One Library

If you need to import more than one library, then specify a comma-separated list of library imports in a single Import-Library manifest header as in the following example:

    Import-Library: org.foo.p;version="\[1,2)"**,**org.bar.q;version="\[2,3)"

## Import-Bundle

Import-Bundle is a further convenience for cases where a library would consist of only a single bundle and a library definition is inconvenient to create. The syntax is very similar to that of Import-Library except that it refers to a bundle's symbolic name and version instead of those of a library.

As you would expect, for each imported bundle, the Platform selects the bundle with the given symbolic name and the highest version in the given version range available in the Platform's repository. The Platform then replaces the bundle import with a set of package imports matching the packages exported by the bundle.

So, for example, the following header imports the [Hibernate Object-Relational Mapper](http://www.springsource.com/repository/app/bundle/version/detail?name=com.springsource.org.hibernate&version=3.2.6.ga) bundle:

    Import-Bundle: com.springsource.org.hibernate;version="\[3.2.6,3.2.7)"

### Why not Overload Require-Bundle?

If you are familiar with OSGi, you may be asking yourself why we didn't overload Require-Bundle instead of introducing Import-Bundle.

Well, we wanted Require-Bundle to retain its standard semantics, including the ability to marry together pieces of a split package. But we wanted Import-Library and Import-Bundle to have the same underlying semantics as Import-Package which avoid the complexities of split packages.

We also anticipate that, as the Platform evolves over time, we'll need to add further directives to Import-Library and Import-Bundle which would not be appropriate to add to Require-Bundle.

## What Next?

The Platform [beta program](http://www.springsource.com/beta/s2ap) is in progress and we'll be listening to all feedback on Platform features, including the new manifest headers.

For users who want to take advantage of the Platform's headers, but who need to produce bundles which will run on other OSGi containers, we plan to produce a tool which will replace the Import-Library and Import-Bundle syntactic sugar with equivalent standard package imports.

We'll also be discussing the new manifest headers with our colleagues in the OSGi Alliance to determine if there are general requirements which would be appropriate for OSGi to address in the future.