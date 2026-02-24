---
title: Using Bundlor in Eclipse
source: https://spring.io/blog/2009/03/26/using-bundlor-in-eclipse
scraped: 2026-02-24T09:09:47.310Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  March 26, 2009 | 0 Comments
---

# Using Bundlor in Eclipse

_Engineering | Christian Dupuis |  March 26, 2009 | 0 Comments_

In an earlier [blog](http://blog.springsource.com/2009/03/20/getting-started-with-bundlor/), Ben introduced Bundlor, the concepts behind it and how to use it from the command line as well as from within ANT and Maven. In this post I'll show how Bundlor can be used in an Eclipse environment.

When developing OSGi-based applications, some users don't want to spend time constantly updating their MANIFEST.MF, but instead want to focus on actual business logic in their application components: in such a scenario the Bundlor Eclipse integration will ensure that the MANIFEST.MF file reflects actual dependencies expressed by code artifacts in the project and removes the need to manually manage classpath settings in Eclipse. Additionally BundlorEclipse can help to cleanly separate runtime dependencies from test dependencies by introducing *test-only* source folders in Eclipse and a second manifest file called TEST.MF to specify dependencies of your unit test classes.

## Background

If Bundlor runs within Eclipse, it will use source code scanning based on Abstract Syntax Trees created with [Eclipse JDT](http://www.eclipse.org/articles/article.php?file=Article-JavaCodeManipulation_AST/index.html) to process Java source files. This allows Bundlor to create manifest files without an existing project classpath and from non-compiling, partial Java code. Additionally all other resources supported by Bundlor (currently Spring configuration files, Hibernate and JPA mapping files) are also processed within Eclipse.

When used inside Eclipse, Bundlor supports incremental creation and updating of manifest files. This is useful during development when only a set of source code artifacts has changed. Bundlor will then only update those header values that belong to the changed resources instead of re-processing the complete project.

If you don't want to have Bundlor running in the background to automatically update the manifest on resource changes or you want to have more control over when the manifest should be updated, the Eclipse integration provides an action that launches Bundlor on-demand.

In addition to generating the main MANIFEST.MF, BundlorEclipse is also capable of creating a TEST.MF for pure test dependencies. To support this, source folders in an Eclipse Java project can be marked as being *test-only*. Bundlor will then process those *test-only* folders and add the detected dependencies to a TEST.MF.

## Usage

BundlorEclipse can be used on any Eclipse Java project that has the *SpringSource OSGi Bundle* project nature. Please note that this does not require using the *Bundle Classpath Container*.

To test Bundlor you can create a new project with the *New Bundle Project Wizard*. The wizard will ensure that all prerequisites to run Bundlor are met. If you want to use or test Bundlor on an existing project go through the following steps:

-   Make sure that the project has the *SpringSource OSGi Bundle* project nature. To enable the nature bring up the context menu of the project and select: *Spring Tools -> Add OSGi Bundle Project Nature*  
      
    
    [![add-osgi-bundle-nature-thumbs](http://blog.springsource.com/wp-content/uploads/2009/03/add-osgi-bundle-nature-thumbs.png "add-osgi-bundle-nature-thumbs")](http://blog.springsource.com/wp-content/uploads/2009/03/add-osgi-bundle-nature.png "Add OSGi Bundle Nature")
    
-   Optionally define *test-only* source folders in the properties dialog of the project. Open the context menu on the project and select *Properties -> Spring -> Java Test Folders*  
      
    
    [![java-test-folders-thumb](http://blog.springsource.com/wp-content/uploads/2009/03/java-test-folders-thumb.png "java-test-folders-thumb")](http://blog.springsource.com/wp-content/uploads/2009/03/java-test-folders.png "Define Java test-only source folders")
    
-   Optionally check that you have a Bundlor template called template.mf in the project's root directory
-   Trigger Bundlor manifest generation process from the project's context menu: select *Spring Tools -> Run generation of MANIFEST.MF file*. Alternatively enable incremental manifest generation by using *Enable incremental generation of MANIFEST.MF file* from the context menu.  
      
    
    [![run-manifest-generation-thumb](http://blog.springsource.com/wp-content/uploads/2009/03/run-manifest-generation-thumb.png "run-manifest-generation-thumb")](http://blog.springsource.com/wp-content/uploads/2009/03/run-manifest-generation.png "Run generation of MANIFEST.MF file")
    

The same actions are also available from the *Overview Page* of the manifest editor that comes with the dm Server Tools.

BundlorEclipse can be used together with the Bundle Classpath Container from the dm Server Tools. The classpath container can be enabled and disabled from the context menu of any OSGi bundle project. In this setup the container will automatically update the classpath when the MANIFEST.MF or TEST.MF files have been changed by Bundlor. A typical developer workflow can look as follows:

1.  Developer changes a Java source file or Spring configuration and adds a new dependency (we will provide repository-driven content assist for Java and Spring XML soon to make adding new dependencies easier)
2.  Developer saves the changed resources
3.  BundlorEclipse - in incremental mode - automatically detects those changes and processes the changed resources
4.  BundlorEclipse updates the MANIFEST.MF or TEST.MF to reflect the new dependency that has been introduced by the developer
5.  Bundle Classpath Container updates the classpath because a change to the MANIFEST.MF or TEST.MF occurred
6.  Java sources will automatically be re-compiled with the new dependency on the classpath; Spring configuration files will be re-validated

Steps 4 to 6 will only execute if a dependency has been added or removed from the source code artifact or the source code artifact itself has been removed/moved.

Certainly BundlorEclipse can be used alongside any other classpath container (e.g. Maven Classpath Container): if you want to use a Maven plugin, like m2eclipse or Q4E, you can remove the *Bundle Classpath Container* (*Spring Tools -> Disable Bundle Classpath Container*) and enable the Maven support for the project. In this Artifact-First approach, Bundlor will only manage the MANIFEST.MF; the classpath will be controlled by the Maven plugin.

Please note that at this stage Bundlor does not have any synchronization features between detected dependencies, the MANIFEST.MF and a pom.xml: Bundlor will not automatically add detected dependencies to the pom.xml. This is on the product backlog and will very likely be addressed in a later release.

## Installation

BundlorEclipse is available as part of the dm Server Tools 1.1.3.M1 which are licensed under the Eclipse Public License v1.0. You can install the dm Server Tools from our consolidated update site at:

[http://www.springsource.org/update/e3.4](http://www.springsource.org/update/e3.4)

If you encounter any problem please feel free to open a [JIRA](https://issuetracker.springsource.com/browse/DMST) in the [Bundlor project](https://issuetracker.springsource.com/browse/DMST). As Bundlor and BundlorEclipse are new products we are happy to discuss those over at our dm Server Tools [community forum](http://forum.springsource.org/forumdisplay.php?f=56).