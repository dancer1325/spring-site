---
title: Announcing dm Server 2.0 M1
source: https://spring.io/blog/2009/04/02/announcing-dm-server-2-0-m1
scraped: 2026-02-24T09:09:22.336Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Harrop |  April 02, 2009 | 0 Comments
---

# Announcing dm Server 2.0 M1

_Engineering | Rob Harrop |  April 02, 2009 | 0 Comments_

Development work on dm Server 2.0 has been fully underway for some time now and I'm pleased to announce that the first milestone is available for download. Downloads are [available from our home page](http://www.springsource.org/dmserver). You can find more information about the features in this release and the coming release in my [previous entry](http://blog.springsource.com/2009/04/01/springsource-dm-server-roadmap/).

In this blog entry I'll outline:

-   what is new in 2.0 M1
-   building dm Server directly from SVN

## We're using Scrum

For the development of the 2.0 release, the dm Server team have adopted Scrum. You can see our current sprint and release backlogs in our [JIRA](https://issuetracker.springsource.com/browse/DMS). As ever, the development of dm Server is driven by the requirements of our users. If you see an item on the backlog that you'd like us to implement, please take the time to vote for it. Equally, if you'd like dm Server to be able to do something that isn't currently covered by an item on the backlog, please open a new user story describing what you'd like to be able to do.

## New and Noteworthy

#### Initial support for Plans

Plans are similar to PARs in that they are a way of describing a collection of bundles to loaded together as an application. Where they differ is that a plan is a simple XML file that defines a collection of artifacts rather actually containing them. In this milestone there is initial support for plans enabling you to create a plan with the same semantics as a PAR file.

The syntax of a plan file is very simple. The outer **<plan/>** tag defines a **name** and **version**, as well as scoping and atomicity requirements. (For this milestone, only plans that are both scoped and atomic are supported). Inside the tag is at least one tag which defines the **type**, **name**, and **version** of the artifact in the plan.

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<plan name="multi-artifact.plan" version="1.0.0" scoped="true" atomic="true"
        xmlns="http://www.springsource.org/schema/dm-server/plan"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springsource.org/schema/dm-server/plan 
            http://www.springsource.org/schema/dm-server/plan/springsource-dm-server-plan.xsd">

    <artifact type="bundle" name="simple.bundle.one" version="[1.0.0, 2.0.0)"/>
    <artifact type="bundle" name="simple.bundle.two" version="[1.0.0, 2.0.0)"/>
</plan>
```

To use a plan, copy the bundles that make up the plan to the **$DMS\_HOME/repository/bundles/usr** directory and restart the dm Server. Once the server has started, drop a plan file (with a **.plan** file extension) into the **$DMS\_HOME/pickup** directory. This will cause the plan to deploy with the same semantics as a PAR file. Deleting the plan file from the pickup directory will cause the plan to undeploy.

#### Initial support for Cloning

M1 contains the first phase of the support for cloning. See the [roadmap](http://blog.springsource.com/2009/04/01/springsource-dm-server-roadmap/) for an overview of cloning.

There are still a fair few user stories to implement and some issues to resolve, but much of the infrastructure to support cloning is in place and passes basic tests.

Cloning is triggered automatically when a scoped application, that is a PAR file or a scoped plan, fails to resolve due to a uses constraint. The bundle specifying the failing uses constraint is cloned into the application's scope, resolution is attempted and this process is repeated until resolution succeeds or there are no more candidate bundles left to clone, in which case deployment of the application fails.

Cloning can also be triggered manually on import-bundle or import-library using a new "sharing" directive. For example:

```java
Copy
Import-Bundle: org.foo.mybundle;sharing:=clone
```

or

```java
Copy
Import-Library: org.springframework.spring;sharing:=clone
```

If automatic or manual cloning causes any dependencies of the Spring DM extender to be cloned, then the extender is also cloned into the application's scope. Some of dm Server's code that deals directly with Spring and Spring DM types needed to be changed to cope when Spring bundles are cloned. In some cases, code that used such types was packaged into small bundles which are then cloned. In other cases, the code was changed to dispatch to such types via (non-cloned) interfaces based on the draft OSGi [blueprint service](http://www.osgi.org/Download/File?url=/download/osgi-4.2-early-draft3.pdf).

#### Initial support for shared repositories

M1 contains the first phase of support for shared repository. A dm Server node can be configured to host a shared repository by ensuring that the hosted repository PAR file is in the pickup directory, and that the configuration in config/hostedRepository.config is appropriate. For example:

```java
Copy
{
    "my-hosted-repo" : {
        "type" : "external",
        "searchPattern" : "repository/hosted/*"
    }
}
```

This configuration will create a hosted repository, named my-hosted-repo, that is populated with the contents of the repository/hosted directory. A dm Server node can then be configured to access this hosted repository by updating its config/repository.config file to add a remote repository entry. For example, assuming that the hosted repository node is running on my-host and that it has Tomcat configured to listen on port 8080:

```java
Copy
{
    ...

    "remote-repo" : {
        "type" : "remote",
        "uri" : "http://my-host:8080/com.springsource.server.repository/my-hosted-repo",
        "indexRefreshInterval" : 30,
    },
    "repositoryChain" : [
        "bundles-subsystems",
        "bundles-ext",
        "bundles-usr",
        "libraries-ext",
        "libraries-usr",
        "remote-repo"
    ]
}
```

Shared repositories, and dm Server 2.0's repository support in general, will be described in more detail in a follow-up blog entry.

#### Miscellaneous

-   Improved failure detection and handling during startup
-   Improved constraint satisfaction algorithms including garbage collection of unneeded dependencies
-   Service scoping improvements
-   Findbugs build support (and fixes to problems it detected)
-   Various small enhancements and bugs fixes

## Subversion repositories

To better reflect dm Server's modular nature, we've split the dm Server codebase into a number of new Subversion repositories which are now publicly accessible:

Repository URL

Contents

[https://anonsvn.springsource.org/svn/dm-server-util](https://anonsvn.springsource.org/svn/dm-server-util)

General-purpose utility code

[https://anonsvn.springsource.org/svn/dm-server-repository](https://anonsvn.springsource.org/svn/dm-server-repository)

Artifact repository

[https://anonsvn.springsource.org/svn/dm-server-osgi](https://anonsvn.springsource.org/svn/dm-server-osgi)

OSGi extensions and Equinox hooks

[https://anonsvn.springsource.org/svn/dm-server-kernel](https://anonsvn.springsource.org/svn/dm-server-kernel)

dm Kernel

[https://anonsvn.springsource.org/svn/dm-server-servlet](https://anonsvn.springsource.org/svn/dm-server-servlet)

Servlet subsystem

[https://anonsvn.springsource.org/svn/dm-server-web](https://anonsvn.springsource.org/svn/dm-server-web)

Web subsystem

[https://anonsvn.springsource.org/svn/dm-server](https://anonsvn.springsource.org/svn/dm-server)

Packaging

[https://anonsvn.springsource.org/svn/dm-server-documentation](https://anonsvn.springsource.org/svn/dm-server-documentation)

Documentation

Each repository is divided into a common folder structure, with three directories at the root of the repository. Let's take a look at the kernel's repository as an example:

```java
Copy
svn ls https://anonsvn.springsource.org/svn/dm-server-kernel
development-branches/
main-branches/
tags/
```

It's the main-branches and tags directories that will be of most interest. The tags directory contains a directory for each tagged release of the kernel, e.g. it currently contains a single tag for the M1 release. The main-branches directory contains a directory for each main branch, i.e. release, that we're currently working on. The 2.0 release is code-named Jersey (named after the [island](http://en.wikipedia.org/wiki/Jersey)) and, as you can see below, the main-branches directory contains a directory for the jersey (2.0) release:

```java
Copy
svn ls https://anonsvn.springsource.org/svn/dm-server-kernel/main-branches
jersey/
```

## Building dm Server from source

If you simply want to create a dm Server install binary, the simplest way to do so is to package the existing binaries. Alternatively if you're interested in modifying or adding to the dm Server codebase it's also possible to compile all of the dm Server codebase from source and package them into an install binary.

#### Setup

Before you can build dm Server from source, the following will have to be setup on your machine:

-   Java 6 installed and the JAVA\_HOME environment variable configured to point to it
-   Ant 1.7.0 or later installed
-   An ANT\_OPTS environment variable configured to provide a max heap of at least 512MB, e.g. ANT\_OPTS=Xmx512m

With this setup complete you're ready to build dm Server.

#### Packaging existing binaries

Packaging the existing published binaries is straightforward. Simply checkout the packaging repository

```java
Copy
svn co https://anonsvn.springsource.org/svn/dm-server/tags/2.0.0.M1
```

Then move into the build-dm-server directory and use Ant to run the jar and package targets

```java
Copy
cd 2.0.0.M1/build-dm-server
ant jar package
```

The build will download all of the bundles that comprise the 2.0.0.M1 release of dm Server and package them into a install binary. You can find this binary in the target/artifacts directory.

#### Building entirely from source

To build dm Server entirely from source, you'll have to checkout a few more repositories so that you have the entire codebase on your machine. The names of the directories into which the various repositories are checked out, and their locations relative to each other, are important, so please use the directory names shown below and perform all the checkouts from the same directory:

```java
Copy
svn co https://anonsvn.springsource.org/svn/dm-server-util/main-branches/jersey util
svn co https://anonsvn.springsource.org/svn/dm-server-repository/main-branches/jersey repository
svn co https://anonsvn.springsource.org/svn/dm-server-osgi/main-branches/jersey osgi-extensions
svn co https://anonsvn.springsource.org/svn/dm-server-kernel/main-branches/jersey kernel
svn co https://anonsvn.springsource.org/svn/dm-server-servlet/main-branches/jersey servlet
svn co https://anonsvn.springsource.org/svn/dm-server-web/main-branches/jersey web
svn co https://anonsvn.springsource.org/svn/dm-server-documentation/main-branches/jersey documentation
svn co https://anonsvn.springsource.org/svn/dm-server/main-branches/jersey packaging
```

Next, move into the packaging/build-dm-server directory:

```java
Copy
cd packaging/build-dm-server
```

Now run the src-build Ant target:

```java
Copy
ant src-build
```

Once the build has completed, a timestamped dm Server install binary, in the form of a zip file, can now be found in target/artifacts. Its name will be in the form springsource-dm-server-2.0.0.BUILD-.zip

## Further Resources

-   [dm Server forums](http://forum.springframework.org/forumdisplay.php?f=53)