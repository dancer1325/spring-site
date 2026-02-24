---
title: Working with SpringSource Application Platform\'s provisioning repository
source: https://spring.io/blog/2008/05/09/working-with-springsource-application-platform-s-provisioning-repository
scraped: 2026-02-24T09:17:29.547Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Andy Wilkinson |  May 09, 2008 | 0 Comments
---

# Working with SpringSource Application Platform's provisioning repository

_Engineering | Andy Wilkinson |  May 09, 2008 | 0 Comments_

One of the main advantages of the SpringSource Application Platform is its ability to provision dependencies on an as-needed basis. The benefits of this are two-fold: it ensures that the Platform's memory footprint is as small as possible and it allows applications to be deployed without encapsulating all of their dependencies in a monolithic deployment unit, e.g. a WAR file. To take advantage of these capabilities you will require an understanding of the Platform's provisioning repository and this blog intends to provide just that.

## Where is the provisioning repository and how does it work?

By default the Platform's provisioning repository can be found in the repository directory at the root of the installation: ![Directory structure of the provisioning repository](http://blog.springsource.com/main/wp-content/uploads/2008/05/repository-directory-structure.png) As you can see, there are three main directories: bundles, installed and libraries. installed is for the Platform's internal use so we'll focus on the bundles and libraries directories here. Each contains a number of subdirectories to separate the different types of dependencies:

-   ext contains external dependencies that are provided with the Platform but are not part of the Platform itself.
-   subsystems contains all of the subsystems that comprise the Platform.
-   usr is initially empty and is intended to contain user-added dependencies, i.e. anything upon which your applications depend that is not already provided by the Platform.

The Platform searches the repository directory structure for both bundles and libraries during its initial startup. I'll talk about how this searching can be configured later on in this entry. As bundles and libraries are found within the repository, details of their symbolic names, exported packages etc. are added to an in-memory index of the repository. Upon completing the scan the in-memory indexes are cached to disk. Minimising the Platform's startup time was a priority for us during development. This caching allows the Platform to save some time during startup: it can skip the scan unless it detects that the contents of the repository have changed.

## Runtime provisioning

In a plain OSGi environment a bundle's dependencies can only be satisfied by other bundles which have already been installed in the environment. For example, installing and starting a bundle that imports the org.apache.commons.dbcp package will fail if no bundle which exports that package has already been installed. This can be a real pain for users as they have to manually install all of a bundle's dependencies. Thankfully, the SpringSource Application Platform improves upon this significantly by dynamically installing dependencies on an as-needed basis.

When a deployed application is started by the Platform its bundles are installed into Equinox. The Platform then asks Equinox for a list of all of the bundles' unsatisfied dependencies and tries to satisfy them. Let's analyse this process by walking through a simple example scenario:

1.  A bundle which imports org.apache.commons.dbcp is installed by the Platform into Equinox.
2.  The Platform asks Equinox for the bundle's unsatisfied dependencies and is told that the import of org.apache.commons.dbcp cannot be satisfied.
3.  The Platform searches its index of the provisioning repository for a bundle which exports org.apache.commons.dbcp
4.  The Platform installs the bundle which exports org.apache.commons.dbcp into Equinox
5.  Having satisfied the original bundle's dependencies the Platform successfully starts the original bundle.

We hope that this will make our users' lives much easier: as long as your application's dependencies are available to the Platform you can simply deploy your application and go! There's no need to get your hands dirty with the time consuming process of manually installing all of your application's dependencies. One great thing about this process is that dependencies are only installed when they're needed. You can add as many bundles as you wish to the provisioning repository with almost no impact upon the Platform's memory footprint.

If the Platform's unable to satisfy a dependency from its repository a log message is generated that details the dependency that could not be satisfied. Armed with this information you can use the [SpringSource Enterprise Bundle Repository](http://www.springsource.com/repository) to get hold of what you need. We'd like the repository to provide as complete a set of bundles as possible: if there's a dependency that you need and it's not available then please [let us know](http://www.springsource.com/repository/app/faq#q9).

## Adding items to the provisioning repository

So you've downloaded a dependency or two and now you want to add them to the Platform. All you need to do is copy them to the appropriate directory in the repository. For example, a new bundle would typically be added to the repository/bundles/usr directory and a new library descriptor would typically be added to the repository/libraries/usr directory.

As described above, the Platform uses an in-memory index of its provisioning repository that's populated during startup. In addition to this, the Platform will also check that its view of the repository is up-to-date whenever an application is deployed. When you want to install an application with new dependencies simply copy the dependencies to the appropriate locations in the repository and then deploy your application. During its deployment processing, the Platform will notice that the repository has been updated and will refresh its view of it. This means that you don't need to spend time restarting the Platform every time you want to install an application with new dependencies.

## Sharing the provisioning repository between installations

The locations where the Platform searches for items in the provisioning repository can be easily configured to suit your needs. For example, it's possible for multiple Platform instances to share some or all of a provisioning repository so you don't need to waste effort maintaining duplicate sets of bundles between Platform installations.

The locations which are scanned by the Platform when creating its provisioning repository can be configured in the config/platform.config file. The default configuration, which is used in the absence of any specific configuration, is:

```javascript
Copy
"provisioning" : {
    "searchPaths": [ 
        "repository/bundles/subsystems/{name}/{bundle}.jar",
        "repository/bundles/ext/{bundle}",
        "repository/bundles/usr/{bundle}",
        "repository/libraries/ext/{library}",
        "repository/libraries/usr/{library}"
    ]
}
```

Any relative paths are interpreted by the Platform as being relative to its installation root, with absolute paths being supported too. The entries in the search paths within curly braces are simply wildcards, e.g. the subsystems search path repository/bundles/subsystems/{name}/{bundle}.jar will find any file with a name ending in .jar in any of the subsystems directory's immediate sub-directories.

Hopefully you can see that it's a trivial change to share some or all of a provisioning repository between Platforms. For example, to make the Platform search a directory named shared-bundles in the root of the filesystem as well as in its own subsystems and ext directories, all you need to do is add the following snippet of [JSON](http://www.json.org) (JavaScript Object Notation) to the platform.config file:

```javascript
Copy
"provisioning" : {
    "searchPaths": [
        "repository/bundles/subsystems/{name}/{bundle}.jar",
        "repository/bundles/ext/{bundle}",
        "/shared-bundles/{bundle}",
        "repository/libraries/ext/{library}",
        "repository/libraries/usr/{library}"
    ]
}
```

By configuring two or more Platform installations with this configuration they can be made to share the bundles in /shared-bundles. This can easily be taken one step further by configuring all of the search paths to point to shared locations so you wouldn't need to manage a per-Platform provisioning repository at all.

## What's next?

We're planning to make it simpler to run multiple instances of the Platform from the same set of binaries by providing some tooling or scripts. These will do most of the work for you, providing a sensible default configuration that you can then tweak to meet your specific needs.

We also intend to combine the power of the Platform's on-demand provisioning and the SpringSource Enterprise Bundle Repository by allowing the Platform to be configured to optionally search a remote repository when it's trying to satisfy a dependency. If a dependency is found in a remote repository the Platform will handle its download and installation automatically. Hopefully this'll make developers' lives a lot easier, especially in the initial stages of an application's development as new dependencies are being added on a regular basis.

We'd love to hear your suggestions as we work on the above-described enhancements and the Platform in general: please don't hesitate to comment on this blog entry, [raise a JIRA](http://issuetracker.springsource.com/secure/CreateIssue!default.jspa), or post on our [forums](http://www.springsource.com/beta/applicationplatform/).