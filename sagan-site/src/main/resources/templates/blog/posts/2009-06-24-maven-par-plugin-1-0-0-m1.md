---
title: Maven PAR Plugin 1.0.0.M1
source: https://spring.io/blog/2009/06/24/maven-par-plugin-1-0-0-m1
scraped: 2026-02-24T09:06:18.824Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  June 24, 2009 | 0 Comments
---

# Maven PAR Plugin 1.0.0.M1

_Engineering | Ben Hale |  June 24, 2009 | 0 Comments_

Shortly after the introduction of SpringSource dm Server (Application Platform at the time), Thorsten Maus created a [Maven plugin for creating PAR files](http://blog.steademy.com/2008/05/29/maven-par-plugin/). This was a great community contribution and we even used it in the [Getting Started Guide](http://static.springsource.com/projects/dm-server/1.0.x/getting-started/html/ch07s04.html) for dm Server 1.0.x.

As dm Server's 2.0 milestones have progressed we've been adding new functionality to the PAR file. The most interesting feature is that now a PAR file can contain more than just JAR files. With the introduction of [OSGi RFC 66](http://blog.springsource.com/2009/05/27/introduction-to-the-osgi-web-container/), the dm Server has [deprecated Web Modules](http://blog.springsource.com/2009/06/01/what-the-osgi-web-container-means-for-dm-server/) in favor of the standard Web Container files using a .war extension.  Because of this, the PAR plugin needed to be updated to support these different types as dependencies.  Thorsten graciously agreed to donate his code to SpringSource and I'm pleased to announce the 1.0.0.M1 release of the Apache Licensed Maven PAR Plugin.

-   Git - [git://git.springsource.org/maven-par-plugin/maven-par-plugin.git](git://git.springsource.org/maven-par-plugin/maven-par-plugin.git)

## Usage

Use of the plugin has changed only slightly and can now default all of the information needed.

#### Repository

To get the plugin, you'll need to reference the SpringSource Enterprise Bundle Repository as a <pluginRepository/>

```xml
Copy<pluginRepositories>
    <pluginRepository>
          <id>com.springsource.repository.bundles.milestone</id>
          <name>SpringSource Enterprise Bundle Repository - SpringSource Bundle Milestones</name>
          <url>http://repository.springsource.com/maven/bundles/milestone </url>
     </pluginRepository>
</pluginRepositories>
```

#### Build Plugin

Next you will need to set your packaging type to par and add the plugin to your build plugin list.

```xml
Copy<build>
     <plugins>
          <plugin>
               <groupId>org.apache.maven.plugins</groupId>
               <artifactId>maven-par-plugin</artifactId>
               <version>1.0.0.M1</version>
          </plugin>
     </plugins>
</build>
```

By default all of the PAR manifest headers are populated using defaults from the POM but can be overridden with configuration.

Header

POM Element

Application-SymbolicName

${project.artifactId}

Application-Name

${project.name}

Application-Description

${project.description}

Application-Version

${project.version}

```xml
Copy<build>
     <plugins>
          <plugin>
               <groupId>org.apache.maven.plugins</groupId>
               <artifactId>maven-par-plugin</artifactId>
               <version>1.0.0.M1</version>
               <configuration>
                   <applicationSymbolicName>override.symbolic.name</applicationSymbolicName>
                   <applicationName>Override Name</applicationName>
                   <applicationDescription>Override Description</applicationDescription>
                   <applicationVersion>1000.0.0.override</applicationVersion>
               </configuration>
          </plugin>
     </plugins>
</build>
```

There is also a <fullyQualifiedNames/> configuration tag that selects between ${groupId}.${artifactId}-${version}.${type} and ${artifactId}.${type} for the file names of the files contained within the PAR file. This value defaults to false.

#### PAR

Next, add your list of dependencies. The plugin packages all of the direct dependencies listed in the POM. It does not care about scopes or transitive dependencies.

```xml
Copy<dependencies>
    <dependency>
        <groupId>com.springsource.dmserver</groupId>
        <artifactId>greenpages.app-solution</artifactId>
        <version>${project.version}</version>
    </dependency>
    <dependency>
        <groupId>com.springsource.dmserver</groupId>
        <artifactId>greenpages.jpa-solution</artifactId>
        <version>${project.version}</version>
    </dependency>
    <dependency>
        <groupId>com.springsource.dmserver</groupId>
        <artifactId>greenpages.db-solution</artifactId>
        <version>${project.version}</version>
    </dependency>
    <dependency>
        <groupId>com.springsource.dmserver</groupId>
        <artifactId>greenpages.web-solution</artifactId>
        <version>${project.version}</version>
        <type>war</type>
    </dependency>
</dependencies>
```

#### Build

Run mvn package.

```plain
Copy[INFO] [par:par]
[INFO] Assembling Artifacts for PAR 'solution/greenpages/target/greenpages-solution-1.0.0.SNAPSHOT.par'
[INFO]   Added 'greenpages.app-solution.jar'
[INFO]   Added 'greenpages.jpa-solution.jar'
[INFO]   Added 'greenpages.db-solution.jar'
[INFO]   Added 'greenpages.web-solution.war'
```

## The Future

Please clone the source code and give me feedback in the comments and suggestions at the [dm Server JIRA](https://issuetracker.springsource.com/browse/DMS).