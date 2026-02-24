---
title: Getting Started with Bundlor
source: https://spring.io/blog/2009/03/20/getting-started-with-bundlor
scraped: 2026-02-24T09:09:56.161Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  March 20, 2009 | 0 Comments
---

# Getting Started with Bundlor

_Engineering | Ben Hale |  March 20, 2009 | 0 Comments_

As [Rob's post](http://blog.springsource.com/2009/03/18/our-plans-for-building-osgi-applications/) points out, over the last few months we've learned quite a bit about how people want to manage their own OSGi applications.

We found that some developers want to manage their own bundle manifests, but need a bit of help to automate the details such as specifying package versions across a range of imports. Other developers want to have manifests generated based on the content of their project and the dependencies specified in their build files. In addition, both kinds of developers need to work with existing libraries that do not have the necessary OSGi metadata that enable them to be used in an OSGi Service Platform.

Bundlor provides a solution to all of these cases and is the tool that we've been using internally for some time to manage the bundles published to the SpringSource Enterprise Bundle Repository. Bundlor automates the detection of dependencies and the creation of OSGi manifest directives for JARs after their creation. It takes as input a JAR and a template consisting of a superset of the standard OSGi manifest headers. It then analyses the source code and support files contained in the JAR, applies the template to the results, and generates a manifest.

## The Templating Mechanism

The Bundlor templating mechanism uses the standard Java manifest format and consists of a superset of the standard OSGi manifest headers. The following table lists all of the Bundlor specific manifest template headers and their usage.

Header

Description

Excluded-Exports

A comma-separated list of packages that must not be added to the manifest's Export-Package header.

Excluded-Imports

By default, Bundlor will add imports for every package which it determines is referenced by the code or special files in the jar. This header allows a comma-separated list of packages for which imports will not be generated to be specified.

Export-Template

By default, Bundlor versions all exported packages at the specified Bundle-Version. This header allows individual exported packages to be exported at different versions. E.g. Export-Template com.foo.\*;version="1.5" will cause any Export-Package entries for com.foo or its subpackages to be versioned at 1.5.

Ignored-Existing-Headers

For cases where the JAR for which a manifest is being generated already contains an OSGi-compliant manifest, this header can be used to list headers in the original manifest which Bundlor should ignore.

Import-Template

This header is used to augment package imports that Bundlor generates via bytecode and special file analysis. Typically this will be to version the import and, in some cases, to mark them as optional. The header's value is in the form of a comma-separated list of package names and attributes.

A wilcard '\*' at the end of the package name is supported to match multiple packages. E.g. Import-Template: com.foo;version=\[1.0,2.0);resolution:=optional,com.bar.\*;version="\[1.5,1.6)" will cause any import generated for the com.foo package to be versioned at 1.0 inclusive to 2.0 exclusive and to be considered optional, and for any import of com.bar or its sub-packages to be versioned at 1.5 inclusive to 1.6 exclusive.

The following is an example Bundlor manifest template from the Spring Binding bundle showing the use of both wildcarding and explicit Import-Package statements.

```java
CopyBundle-ManifestVersion: 2
Bundle-SymbolicName: org.springframework.binding
Bundle-Name: Spring Binding
Bundle-Vendor: SpringSource
Import-Package:
 ognl;version="[2.6.9, 3.0.0)";resolution:=optional,
 org.jboss.el;version="[2.0.0, 3.0.0)";resolution:=optional
Import-Template:
 org.springframework.*;version="[2.5.4.A, 3.0.0)",
 org.apache.commons.logging;version="[1.1.1, 2.0.0)",
 javax.el;version="[2.1.0, 3.0.0)";resolution:=optional
```

## Detection Criteria

Given a JAR file, Bundlor can detect candidate imports from a variety of sources. For a complete listing and examples of what can be detected, please see the [user guide](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html).

Bundlor scans for the following types

-   Java classes
    -   Declared Type Superclass Types
    -   Declared Type Implemented Interfaces Types
    -   Declared Type Annotation Types
    -   Declared Field Types
    -   Declared Field Values Types
    -   Declared Method Argument Types
    -   Declared Method Return Types
    -   Declared Method Exception Types
    -   Declared Method Annotation Types
    -   Reference To Field Owner Type
    -   Reference To Field Type
    -   Declared Local Variable Type
    -   Reference to Method Declaring Type
    -   Reference to Method Return Type
    -   Reference to Method Argument Types
    -   Allocation of Array Type
    -   Declared Parameter Annotation Types
    -   Caught Exception Type
    -   Instantiated Type
    -   Cast Target Type
    -   Instanceof Type
    -   Declared Constant Type
-   Spring context configuration files
    -   Specified class names and in the future will be improved with knowledge of Spring schemas
-   JPA
    -   provider and class tags from the persistence.xml file
-   Hibernate Mapping Files
    -   //class/@name
    -   //id/@type
    -   //generator/@class
    -   //composite-id/@class
    -   //discriminator/@type
    -   //property/@type
    -   //many-to-one/@class
    -   //one-to-one/@class
    -   //one-to-many/@class
    -   //many-to-many/@class
    -   //version/@type
    -   //component/@class
    -   //dynamic-component/@class
    -   //subclass/@name
    -   //joined-subclass/@name
    -   //union-subclass/@name
    -   //import/@class
-   Properties files
    -   Classes defined as a property value

## Getting Bundlor

Bundlor is available as a zip download from the [Bundlor page](http://www.springsource.org/bundlor). It is also accessible in the SpringSource Enterprise Bundle Repository as both Ivy and Maven artifacts. In addition, there is a detailed [user guide](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html) available.

## Using Bundlor

Bundlor has four different forms

-   A plugin for Apache Maven
-   A Task for Apache ANT
-   A command line application
-   An Eclipse plugin (more information on a separate blog)

The following instructions only describe simple usage of Bundlor in each environment. Please see the [user guide](http://static.springsource.org/s2-bundlor/1.0.x/user-guide/html) for complete information on the syntax for Bundlor.

### Maven

The Maven plugin allows Bundlor to be run from inside a Maven project. With this task a JAR can be transformed into a bundle or a manifest can be written out to the filesystem.

Add the SpringSource Enterprise Bundle Repository to the pom.xml file.

```xml
Copy<pluginRepositories>
  <pluginRepository>
    <id>com.springsource.repository.bundles.milestone</id>
    <name>SpringSource Enterprise Bundle Repository</name>
    <url>http://repository.springsource.com/maven/bundles/milestone</url>
  </pluginRepository>
...
</pluginRepositories>
```

Add the bundlor plugin to the pom.xml file

```xml
Copy<build>
  <plugins>
    <plugin>
      <groupId>com.springsource.bundlor</groupId>
      <artifactId>com.springsource.bundlor.maven</artifactId>
      <version>1.0.0.M2</version>
      <executions>
        <execution>
          <id>bundlor</id>
          <goals>
            <goal>transform</goal>
          </goals>
        </execution>
      </executions>
    </plugin>
  ...
  </plugins>
...
</build>
```

Finally, build a bundle with the package command.

mvn install package

### ANT

he ANT task allows Bundlor to be run from inside any ANT based build system. With this task a JAR can be transformed into a bundle.

To run Bundlor from inside of ANT, you start by defining a bundlor namespace.

```xml
Copy<project name="bundlor-sample-ant"
    xmlns:bundlor="antlib:com.springsource.bundlor.ant">
```

Then you import the bundlor task into the build.

```xml
Copy<target name="bundlor.init">
  <taskdef resource="com/springsource/bundlor/ant/antlib.xml"
      uri="antlib:com.springsource.bundlor.ant">
    <classpath id="bundlor.classpath">
      <fileset dir="${bundlor.home}/dist"/>
      <fileset dir="${bundlor.home}/lib"/>
    </classpath>
  </taskdef>
</target>
```

Finally, use the bundlor task.

```xml
Copy<bundlor:bundlor
    bundlePath="${basedir}/org.springframework.integration.jar"
    outputPath="${basedir}/target/org.springframework.integration.jar"
    bundleVersion="1.0.2.BUILD-${timestamp}"
    manifestTemplatePath="${basedir}/template.mf"/>
```

### Command Line

The command line interface is a quick way to use a manifest template to either show the Bundlor-generated OSGi manifest for a bundle or actually transform the bundle.

To run the Bundlor from the command line change directory to the $BUNDLOR\_HOME/bin directory and run either bundlor.sh or bundlor.bat.

% ./bundlor.sh transform \\
--bundle ./org.springframework.integration.jar \\
--manifest ./template.mf \\
--outputfile ./target/org.springframework.integration.jar

Transformed bundle written to ./target/org.springframework.integration.jar
%

## Future Bundlor

Bundlor is a new product and has a lot of room to grow. Bundlor is now using Scrum for planning which we hope to give the community more visibility into the development process. The current sprint and release backlogs are available on the [Bundlor JIRA](https://issuetracker.springsource.com/browse/BNDLR). The future path of Bundlor is determined by our users, so please take the time to vote on existing issues and create new issues for things that are not currently covered by the backlog.