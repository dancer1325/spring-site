---
title: Using an OSGi Profile with Bundlor
source: https://spring.io/blog/2009/05/18/using-an-osgi-profile-with-bundlor
scraped: 2026-02-24T09:07:56.647Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  May 18, 2009 | 0 Comments
---

# Using an OSGi Profile with Bundlor

_Engineering | Ben Hale |  May 18, 2009 | 0 Comments_

When managing and transforming as many bundles as are included in the the [SpringSource Enterprise Bundle Repository](http://www.springsource.com/repository), it becomes very difficult to remember what packages are boot delegated, exported from the system bundle, or from other bundles in your system. This information is important because you probably don't want to import packages that are boot delegated, you probably do want to import system bundle packages at "0", and you want to define custom imports for all others. Remembering which packages are in each of these categories ends up being a bit error prone and defining template entries for them can be time-consuming.

With the release of [1.0.0.M4](http://www.springsource.org/bundlor), Bundlor has gained the ability to take an OSGi profile as input and automatically add template entries for boot delegated packages and system bundles. This input is taken as a properties file and can be used with the command line, ANT, and Maven.

## OSGi Profile

An OSGi profile defines the packages that are exported from the system bundle and the packages that are delegated to the boot class loader. This profile isn't a particular file, but rather two properties that are well known to an OSGi runtime. The property `org.osgi.framework.system.packages` defines the packages exported from the system bundle and `org.osgi.framework.bootdelegation` defines the packages that are boot delegated. For more information on the syntax of the values of these properties please see the OSGi specification §3.8.3 and §3.8.5.

For Bundlor, these properties are defined in a standard .properties file such as the following.

```plain
Copyorg.osgi.framework.system.packages = \
 javax.accessibility,\
 javax.activation,\
 javax.activation;version="1.1.0",\
 javax.activity,\
 javax.annotation,\
...

org.osgi.framework.bootdelegation = \
 com_cenqua_clover,\
 com.cenqua.*,\
 com.yourkit.*,\
...
```

## Effects

As an example of how this works I've taken a slightly modified Bundlor template for Apache Log4J. The template I'm using looks like this

```plain
CopyBundle-SymbolicName: com.springsource.org.apache.log4j
Bundle-Name: Apache Log4J
Bundle-Vendor: SpringSource
Bundle-ManifestVersion: 2
Import-Template: 
 com.sun.jdmk.*;version="[5.1.0, 5.1.0]";resolution:=optional,
 javax.jms.*;version="[1.1.0, 2.0.0)";resolution:=optional,
 javax.mail.*;version="[1.4.0, 2.0.0)";resolution:=optional
```

When run against Bundlor without a profile I get the following warnings

```plain
CopySB0001W: The import of package javax.management does not specify a version.
SB0001W: The import of package javax.naming does not specify a version.
SB0001W: The import of package javax.swing does not specify a version.
SB0001W: The import of package javax.swing.border does not specify a version.
SB0001W: The import of package javax.swing.event does not specify a version.
SB0001W: The import of package javax.swing.table does not specify a version.
SB0001W: The import of package javax.swing.text does not specify a version.
SB0001W: The import of package javax.swing.tree does not specify a version.
SB0001W: The import of package javax.xml.parsers does not specify a version.
SB0001W: The import of package org.w3c.dom does not specify a version.
SB0001W: The import of package org.xml.sax does not specify a version.
SB0001W: The import of package org.xml.sax.helpers does not specify a version.
```

To satisfy these warnings, I could add a number of `Import-Template` entries. Instead, I'll run Bundlor again with the [dm Server OSGi profile](https://fisheye.springsource.org/browse/dm-server/main-branches/jersey/com.springsource.server.launch/java6-server.profile?r=2). This profile exports each of these packages from the system bundle. This run returns with no warnings and imports each of these packages at `version="0"`. This bundle did not depend on any package that is boot delegated so there are no ignore imports in our manifest.

## Usage

### ANT

The ANT task has gained a new optional `osgiProfilePath` attribute.

```xml
Copy<bundlor:bundlor
    bundlePath="${basedir}/org.springframework.integration.jar"
    outputPath="${basedir}/target/org.springframework.integration.jar"
    bundleVersion="1.0.2.BUILD-${timestamp}"
    osgiProfilePath="java6-server.profile"
    manifestTemplatePath="${basedir}/template.mf"/>
```

### Maven

The Maven plugin has gained a new optional `osgiProfilePath` configuration.

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
          <configuration>
            <osgiProfilePath>java6-server.profile</osgiProfilePath>
          </configuration>
        </execution>
      </executions>
    </plugin>
  ...
  </plugins>
...
</build>
```

### Command Line

The command line interface has gained a new optional `-p, --profile` parameter for both the `manifest` and `transform` executions.

```plain
Copybin/bundlor.sh transform
    -b com.springsource.org.apache.log4j.jar
    -m com.springsource.org.apache.log4j.mf
    -p java6-server.profile 
```

The ability to read in an OSGi profile as input greatly simplifies content of manifest templates. If there are more areas that you can think of improvements, please open an issue or vote on an existing one at the [Bundlor JIRA](https://issuetracker.springsource.com/BNDLR).