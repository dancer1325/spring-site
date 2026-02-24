---
title: Creating OSGi bundles
source: https://spring.io/blog/2008/02/18/creating-osgi-bundles
scraped: 2026-02-24T09:20:48.668Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Costin Leau |  February 18, 2008 | 6 Comments
---

# Creating OSGi bundles

_Engineering | Costin Leau |  February 18, 2008 | 6 Comments_

When approaching OSGi, one of the first concepts that have to be learned is the notion of a *bundle*. In this entry, I'd like to take a closer look of what a bundle actually is and how a vanilla jar can be transformed into an OSGi bundle.  So, without further ado,

## What is a bundle?

The OSGi spec describes the bundle as a "unit of modularization" that "is comprised of Java classes and other resources which together can provide functions to end users.". So far so good, but what *exactly* is a bundle? Quoting the spec again:

> a bundle is a JAR file that:
> 
> -   Contains \[...\] resources
> -   Contains a manifest file describing the contents of the JAR file and providing information about the bundle
> -   Can contain optional documentation in the OSGI-OPT directory of the JAR file or one of its sub-directories

In short, a bundle = jar + OSGI information (specified in the JAR manifest file - META-INF/MANIFEST.MF), no extra files or predefined folder layout are required. This means that all it takes to create a bundle from a jar, is to add some entries to the JAR manifest.

## OSGi metadata

The OSGi metadata is represented by manifest entries that dictate to the OSGi framework what the bundle provides or/and requires. The specification indicates around 20 manifest headers but we will just take a look at the ones you are most likely to use.

##### Export-Package

As the name implies, this header indicates what packages (available in the bundle) are exported so they can be imported by other bundles. *Only* the packages specified by the header will be exported, the rest will be private and will not be seen outside the containing bundle.

##### Import-Package

Similar to Export-Package, this header indicates the packages that are imported by a bundle. As well, *only* the packages specified by this header will be imported. By default, imported packages are mandatory - the importing bundle will fail to start, if the imported package is not available.

##### Bundle-SymbolicName

The only required header, this entry specifies a unique identifier for a bundle, based on the reverse domain name convention (used also by the java packages).

##### Bundle-Name

Defines a human-readable name, without spaces, for this bundle. Setting this header is recommend since it can provide a shorter, more meaningful information about the bundle content then Bundle-SymbolicName.

##### Bundle-Activator

The [BundleActivator](http://www.osgi.org/javadoc/r4/org/osgi/framework/BundleActivator.html) is an OSGi specific interface that allows Java code to be notified when a bundle is started or stopped by the OSGi framework. The value of this header should contain a fully qualified name of the activator class which should be public and contain a public constructor without any arguments.

##### Bundle-Classpath

This header is handy when the jar contains embedded libraries or class packages under various folders, by extending the default bundle classpath (which expects the classes to be available directly under the jar root).

##### Bundle-ManifestVersion

This little known header indicates the OSGi specification to use for reading this bundle. 1 indicates OSGi release 3 while 2 OSGi release 4 and later. Since 1 is the default version, it is strongly recommended to specify this header since an OSGi release 4 bundle will not work as expected under OSGi release 3.

Below is an example, taken from Spring 2.5.x core bundle manifest that uses some of the headers mentioned above:

```code
Copy 
Bundle-Name: spring-core 
Bundle-SymbolicName: org.springframework.bundle.spring.core 
Bundle-ManifestVersion: 2 
Export-Package:org.springframework.core.task;uses:="org.springframework.core,org.springframework.util";version=2.5.1 org.springframework.core.type;uses:=org.springframework.core.annotation;version=2.5.1[...] 
Import-Package:org.apache.commons.logging,edu.emory.mathcs.backport.java.util.concurrent;resolution:=optional[...] 
```

Most of the time used on OSGi metadata is likely to be spent on Export/Import package entries as they describe the relationship between bundles (that is, between your modules). When it comes to packages, nothing is implicit - only packages that are mentioned are imported/exported, the rest aren't. This applies also to sub-packages: exporting org.mypackage will export **just** this package and nothing else (like org.mypackage.util). Same goes for importing - even if a package is available inside the OSGi space, it will not be seen by a certain bundle unless it is explicitly imported by it.

To summarize, if a bundle A exports package org.mypackage and bundle B wants to consume it, then the META-INF/MANIFEST.MF for bundle A should specify the package inside its Export-Package header, while bundle B should include it in its Import-Package entry.

## Package consideration

While exporting is fairly straight forward, importing is slightly more complex. It is common for applications to degrade nicely by searching the environment for certain libraries and using only what is available, or for libraries to include code that is not used by the user. Such examples include logging (using JDK 1.4 or Log4j), regular expressions ([Jakarta ORO](http://jakarta.apache.org/oro/) or JDK 1.4+) or concurrent utilities (java.util in JDK 5 or [backport-util-concurrent](http://backport-jsr166.sourceforge.net/) library for JDK 1.4).

In OSGi terms, relying on a package based on its availability translates to an *optional* Package-Import. You have already seen such a package in the previous example:

\`\`\`code Import-Package: \[...\]edu.emory.mathcs.backport.java.util.concurrent;resolution:=optional \`\`\`

Since in OSGi, multiple versions of the same class can exist, it is best practice to specify the version of the class package both when exporting and importing a package. This is done through the version attribute which is added after each package declaration. The version format supported by OSGi is <major>.<minor>.<micro>.<qualifier> where major, minor and micro are numbers and qualifier is alphanumeric.

The [meaning of the version](http://en.wikipedia.org/wiki/Version_numbering) is completely up to the bundle provider however, it is recommend to use a popular numbering scheme such as the [one](http://apr.apache.org/versioning.html) from Apache APR project where:

-   <major> - indicates a significant update which doesn't guarantee any compatibility
-   <minor> - indicates an update which preserves compatibility with older minor versions
-   <micro> - represents an insignificant update from the user point of view which is perfectly compatible both forwards and backwards
-   <qualifier> - is a user defined string - it is not widely used and can provide an additional label to the version number, such as the build number or target platform without a standardized meaning

The default version (if the attribute is missing) is "0.0.0".

While the exported packages have to indicate a specific version, the importers can indicate a range using the mathematical interval notation - for example

\[1.0.4, 2.0) will match version 1.0.42 and upwards up to 2.0 (excluding). Note that an specifying only a version instead of an interval will match all packages that are at greater or equal then the specified version, that is :

Import-Package: com.mypackage;version="1.2.3"

is equivalent to

Import-Package: com.mypackage;version="\[1.2.3, ∞)"

As a last tip, make sure to *always* use quotes when specifying an version, whether it is a range or not.

## Working with OSGi metadata

Now that we have some information on what bundles are, let's see what tools we can use for osgi-fying an existing jar:

### by hand

This do-it-yourself approach is discouraged as typos and extra spaces can easily sneak in and render the manifest useless. Even when working with a smart editor, the manifest format itself can cause some problems since it has a limit of 72 spaces per line which, if broken, can cause some cryptic problems. Manually creating or updating the jar is not a good idea since the jar format requires the META-INF/MANIFEST.MF entry to be the first one in the archive - if it's not, even though it's present in the jar, the manifest file will not be read. The manual approach is really recommended for cases where there are no other alternatives.

However, if one really wants/needs to work directly with the manifest, then a editor that can deal with UNIX/DOS spaces should be used along with a proper jar creation utility (such as the jar tool that comes with the JDK) to cope with all the MANIFEST requirements.

### Bnd

[Bnd](http://www.aqute.biz/Code/Bnd) stands for BuNDle tool and is a nice utility created by Peter Kriens (OSGi Technical Officer) that "helps \[...\] create and diagnose OSGi R4 bundles". Bnd parses the java classes to understand the available and imported packages so it can create the equivalent OSGi entries. Bnd offers a series of directives and options which can customize the resulting artifact. The nice thing about bnd.jar itself is that is can be run from [command line](http://www.aqute.biz/Code/Bnd#cmd), by Ant through dedicated [tasks](http://www.aqute.biz/Code/Bnd#ant) or integrated into Eclipse as a [plug-in](http://www.aqute.biz/Code/Bnd#eclipse).

Bnd can create jars from the classes available on the classpath or inside Eclipse projects or can osgi-fy existing jars by adding the needed OSGi artifacts. Additionally, it can print and verify the OSGi information about the given jar making it quite a powerful, yet simple to use tool.

First time users, can use Bnd to see what OSGi manifest will be added to a vanilla jar. Let's pick a vanilla jar such as [c3p0](http://sourceforge.net/projects/c3p0) (which is an excellent connection pool library) and issue a print command:

\`\`\`code java -jar bnd.jar print c3p0-0.9.1.2.jar \`\`\`

The output is fairly big and contains of several sections:

1.  Generic manifest information:
    
    ```code
    Copy[MANIFEST c3p0-0.9.1.2.jar]
    Ant-Version Apache Ant 1.7.0
    Created-By 1.5.0_07-87 ("Apple Computer, Inc.")
    Extension-Name com.mchange.v2.c3p0
    Implementation-Vendor Machinery For Change, Inc.
    Implementation-Vendor-Id com.mchange
    Implementation-Version 0.9.1.2
    Manifest-Version 1.0
    Specification-Vendor Machinery For Change, Inc.
    Specification-Version 1.0
    ```
    
2.  Package Information:
    
    ```java
    Copy
    com.mchange.v2.c3p0.management   com.mchange.v1.lang com.mchange.v2.c3p0
                                                                   com.mchange.v2.c3p0.impl com.mchange.v2.debug
                                                                   com.mchange.v2.log com.mchange.v2.management
                                                                   java.sql
                                                                   javax.management
                                                                   javax.sql
    ```
    
    which indicates specifies the packages discovered in the jar (on the left side) and its imports (on the right side).
    
3.  Possible Errors - normally these indicate the packages that were not found in the classpath but were referenced by other classes:
    
    ```code
    Copy One error 1 : Unresolved references to 
    [javax.management, javax.naming, javax.naming.spi, javax.sql, javax.xml.parsers, org.apache.log4j, org.w3c.dom] 
    by class(es) on the Bundle-Classpath[Jar:c3p0-0.9.1.2.jar]: [...] 
    ```
    
    . This section is a good indication on what packages the given jar imports.
    

Let's OSGify the artifact by using

```code
Copyjava -jar bnd.jar wrap c3p0-0.9.1.2.jar 
```

this will create a new archive with the exact content as the original jar but with a modified MANIFEST.MF that will contain the OSGi imports marked as optional. The current Bnd tool saves the archive with a .jar$ extension while previous versions used .bar instead.

We might chose to tweak the jar by adding versioning, excluding some exported packages and marking some imported packages as mandatory (such as javax.sql in this case). To do that, we'll create a c3p0-0.9.1.2.bnd file as follows:

```code
Copyversion=0.9.1.2
Export-Package: com.mchange*;version=${version}
Import-Package: java.sql*,javax.sql*,*;resolution:=optional
Bundle-Version: ${version}
Bundle-Description: c3p0 connection pool
Bundle-Name: c3p0
```

Notice that for version we used variable substitution. To hook in the properties file, use the following command line:

\`\`\`code java -jar bnd.jar wrap -properties c3p0-0.9.1.2.bnd c3p0-0.9.1.2.jar \`\`\`

I've used the .bnd extension since by default, the Bnd ant tasks will look for this file during execution.

To use Bnd tool with ant, one can just import the tasks provided out-of-the-box and invoke them during jar creation:

```xml
Copy
<taskdef resource="aQute/bnd/ant/taskdef.properties" classpath="${lib.dir}/bnd/bnd.jar"/>
...
<bndwrap definitions="${basedir}/osgi/bnd" output="${dist.dir}">
   <fileset dir="${dist.dir}" includes="*.jar"/>    
</bndwrap>
```

Note that usually, a move task follows to copy the .jar$ or .bar artifact over the original jar.

### Bundle plug-in for Maven

For Maven, [Apache Felix Bundle Plug-in](http://felix.apache.org/site/maven-bundle-plugin-bnd.html) provides nice integration between Bnd and Maven 2. Since the Maven POM contains additional information about the project, the Bnd plug-in can populate other fields of the manifest automatically, such as Bundle-License or Bundle-Version, using the the project properties.

The official [documentation](http://felix.apache.org/site/maven-bundle-plugin-bnd.html) explains the usage in detail so I will not replicate it here.

To convert our c3p0 library, I will use a simple Maven 2 pom which will download the original artifact and then wrap it as a bundle:

```xml
Copy
<?xml version="1.0" encoding="UTF-8"?>
<project
        xmlns="http://maven.apache.org/POM/4.0.0"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

    <modelVersion>4.0.0</modelVersion>
    <groupId>my.company</groupId>
    <artifactId>c3p0.osgi</artifactId>
    <packaging>bundle</packaging>
    <version>0.9.1.2-SNAPSHOT</version>
    <name>c3p0.osgi</name>

    <properties>
        <export.packages>${export.package}*;version=${unpack.version}</export.packages>
        <import.packages>*</import.packages>
        <private.packages>!*</private.packages>
        <symbolic.name>${pom.groupId}.${pom.artifactId}</symbolic.name>
        <embed-dep>*;scope=provided;type=!pom;inline=true</embed-dep>
        <unpack-bundle>false</unpack-bundle>
    </properties>

    <build>
    <plugins>
     <plugin>
        <groupId>org.apache.felix</groupId>
        <artifactId>maven-bundle-plugin</artifactId>
        <version>1.2.0</version>
        <configuration>
            <unpackBundle>${unpack.bundle}</unpackBundle>
            <instructions>
                <Bundle-Name>${artifactId}</Bundle-Name>
                <Bundle-SymbolicName>${symbolic.name}</Bundle-SymbolicName>
                <Bundle-Description>${pom.name}</Bundle-Description>
                <Import-Package>${import.packages}</Import-Package>
                <Private-Package>${private.packages}</Private-Package>
                <Include-Resource>${include.resources}</Include-Resource>
                <Embed-Dependency>${embed-dep}</Embed-Dependency>
                <_exportcontents>${export.packages}</_exportcontents>
            </instructions>
        </configuration>
        <extensions>true</extensions>
     </plugin>
    </plugins>
    </build>

    <dependencies>
      <dependency>
        <groupId>c3p0</groupId>
        <artifactId>c3p0</artifactId>
        <version>0.9.1.2</version>
        <scope>provided</scope>
      </dependency>
    </dependencies>
</project>
```

Packaging the project will create an OSGi bundle, identical in content with the original one expect for the MANIFEST.MF which will contain the OSGi entries.

Notice the usage of properties for externalizing the plug-in configuration. When working with multiple project inside a module, the properties allow the generic plug-in configuration to be placed inside the top level pom and for each sub-module to override it by specifying different properties values. A live [example](https://springframework.svn.sourceforge.net/svnroot/springframework/osgi-repo/trunk) of such a setup is the Spring-DM osgi repository.

It is important to know that Bnd considers all the classes available on the classpath when creating a bundle. When using Bnd from the command line, as in the previous example, the classpath is formed only by a jar so no extra classes besides c3p0 exist. However, when using a building tool such as Maven or Ant, the classpath is considerably larger - in this case, based on your Export/Import package directives, Bnd might add or discard classes from the resulting jar. To prevent this, make sure to use patterns matching just the actual package included, i.e: com.mchange.\* instead of \*.

### Custom, in-house tool

Another approach, though not likely to be encountered, is to create a customized tool, usually based on bytecode analysis. Such an utility can be highly customized for certain environments to gain speed or minimize the memory print or to support additional heuristics or configuration files. Spring Dynamic Modules contains such an internal, [ASM](http://asm.objectweb.org/)\-based byte-code parser for its test framework, to efficiently create on-the-fly MANIFEST.MFs.

For generic use however, Bnd tool (either vanilla or through its Maven integration) provides much more options and works quite fast. In fact, the more general the usage becomes, the more likely Bnd will fit the bill through its high customizability.

## Using existing OSGi repository

These being said, before wrapping existing libraries as OSGi bundles, check whether somebody already did it for you. You can do that by checking one of the existing OSGi repositories:

[OSGi Bundle Repository (ORB)](http://www.osgi.org/Repository/HomePage) - OSGi Alliance bundles repository which provides "a federated collection of bundles".

[Eclipse Orbit](http://www.eclipse.org/orbit/) - which contains artifacts usable inside Eclipse environment. Since Eclipse uses Equinox, the artifacts might contain Equinox specific Manifest entries

[Apache Felix Commons](http://felix.apache.org/site/apache-felix-commons.html) - which aims at "sharing \[...\] bundlized artifacts"

[Apache OSGified projects](http://wiki.apache.org/commons/CommonsOsgi) - a simple page that indicates the Apache Commons projects that have or are about to include the OSGi manifest entries into their official distribution.

Hopefully, with the community help, many of the popular Java libraries out there will be OSGi-friendly by default and using a separate repository or wrapping the jar will not be necessary. Until then you can help out by providing patches to the projects you use or by simply asking for this feature.

Before ending this post, I would like to invite all of you interested in OSGi and Spring Dynamic Modules to an upcoming [webinar](http://www.springsource.com/web/guest/webinars) next week, on Wednesday Feb 27th, that will cover the core OSGi concepts and Spring DM fundamentals.