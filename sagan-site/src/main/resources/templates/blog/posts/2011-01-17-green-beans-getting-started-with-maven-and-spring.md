---
title: Green Beans: Getting Started with Maven and Spring
source: https://spring.io/blog/2011/01/17/green-beans-getting-started-with-maven-and-spring
scraped: 2026-02-24T08:48:56.562Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  January 17, 2011 | 0 Comments
---

# Green Beans: Getting Started with Maven and Spring

_Engineering | Josh Long |  January 17, 2011 | 0 Comments_

Apache Maven is a popular open source tool that offers a convention-over-configuration approach to project build management. Indeed the Eclipse Community Surveys show Maven increased its adoption from [8% in 2009](http://www.eclipse.org/org/press-release/Eclipse_Survey_2009_final.pdf) to [28% in 2010](http://www.eclipse.org/org/community_survey/Summary_Data_2010.xls), underscoring its usefulness in a wide range of project settings. Even though you can use Spring without using Maven, there are many reasons to recommend its use to Spring developers. In this post I'll show you how to get started using Maven, and how to use it successfully with Spring libraries, repositories and tooling like [SpringSource Tool Suite](http://www.springsource.com/developer/sts) and [Spring Roo.](http://www.springsource.org/roo)

Maven handles project builds. Maven can provide a lot of power and sophistication with relative ease if your project follows Maven's conventions. It is declarative; you describe *what* you want done, not *how* you want it done. This approach will seem different if you've come from venerable build tools like Make, or Ant.

You declare your project's dependencies in the Maven project configuration. These dependencies are then resolved on your behalf and downloaded for you. This is similar to the package system found in many different operating systems. Suppose you're using OS X's `fink` or `ports` command line tools. To update an operating system's a functionality, a user selects a package (say, the latest security patches, or a new version of the `glib` library) to install in an administration client and then instruct the client to downloaded and install it from well-known servers, referred to as package repositories. When the package is downloaded, the package manager consults the package's manifest which enumerates all the libraries (found in other packages) that the package depends on - its transitive dependencies. Those too are downloaded.

There are several ways to install Maven If you haven't already got it installed. Download it from the [Apache web site](http://maven.apache.org/download.html). Choose a more recent version. Currently, many people are using Maven 2.21, or the recently released Maven 3. Download the version you'd like to use and then unzip it to a directory of your choice. Alternatively, several operating systems provide Maven 2 builds (and soon, Maven 3 builds) in the package system. For example, on Ubuntu, you can run `sudo apt-get install maven2 `. If you're using the SpringSource Tool Suite (available [here for download for free](http://www.springsource.com/developer/sts)), then you don't need to worry, Maven's already downloaded and included in your STS installation folder. Regardless of how you get the Maven binaries on your system, ensure that the binary is on your operating system's search path. Usually, this is just a matter of adding the Maven installation's `bin` folder to your operating system's `PATH` variable. It's also a good practice to create a system variable for the Maven installation itself, called `MAVEN_HOME`. On a Unix (including OS X) or Linux machine, this setup looks about the same. On my machine (an Ubuntu Linux machine), it looks like this:

export MAVEN\_HOME=/home/jlong/bin/springsource/maven-2.2.1.RELEASE 
export PATH=$PATH:$MAVEN\_HOME/bin

To test it, open up a new shell and issue the following command:

mvn --version

You should see some output confirming the command presence on your system, like this:

jlong@jlong-mbp:~/Desktop/code$ mvn --version 
Apache Maven 2.2.1 (r801777; 2009-08-06 12:16:01-0700) 
Java version: 1.6.0\_22 
Java home: /usr/lib/jvm/java-6-sun-1.6.0.22/jre 
Default locale: en\_US, platform encoding: UTF-8 
OS name: "linux" version: "2.6.35-22-generic" arch: "amd64" Family: "unix" 
jlong@jlong-mbp:~/Desktop/code$ 

## Getting Started With Maven

Maven projects assume a standard directory structure, which looks - at a minimum - like this:

./pom.xml
./src
./src/main
./src/main/java
./src/main/resources
./src/test
./src/test/java
./src/test/resources

At the root of the directory structure is a XML file (always called pom.xml) that Maven expects. The `pom.xml` (POM is short for Project Object Model) describes the things specific to your project that can't be inferred automatically like dependencies, the name of the project, etc.

Directory

Description Directory's Contents (relative to the project root)

src/main/java

Contains the Java source code for your project

src/main/resources

Contains any classpath-relative resources for your project (like, a Spring application context .xml file)

src/test/java

Contains the java source code for your test classes. This directory will not be included in the final build. All tests herein will be compiled and all tests will be run. If the tests fail, it aborts the build.

src/test/resources

This directory will not be included in the final Java build. This folder contains any classpath-relative resources for your test code (like, a Spring application context .xml file).

Let's build a simple Maven project that uses the Spring Framework. Setup a directory structure like the above on your hard disk. If you're on a Unix-like operating system, you can use commands like the following to take care of setting up the directories inside a directory for your project:

mkdir spring-example1; 
cd spring-example1; 
mkdir -p src/{test,main}/{java,resources} 

Create a text file called `pom.xml`. Enter the following in the file:

```xml
Copy<?xml version="1.0" encoding="UTF-8"?> 
<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd" xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> 
  <modelVersion>4.0.0</modelVersion> 

  <groupId>org.springsource.greenbeans.maven</groupId> 
  <artifactId>example1</artifactId> 
  <version>1.0-SNAPSHOT</version> 
 
  <name>Our Simple Project</name> 
   
</project>
```

Let's ignore for now the contents of this file. All we need to know is that the contents of that file is enough to uniquely identify the project to Maven, and to let Maven do its work. Let's skip straight to the payoff: in the root folder of the project - in the same folder as `pom.xml` - run the following on a command line:

mvn install

This might take a (quite) a while on the first run. You'll see lots of download progress numbers scroll quickly on the screen. These progress numbers indicate that Maven's dependencies and plugins are being downloaded. Maven doesn't have a concept of build "targets." Instead, Maven has a notion of a set of lifecycle phases. Here, `install` is a phase. The phases are invoked in order, one before the other. For each phase, there are prepackaged plugins that are registered and invoked on each phase. Maven already has good, default plugins configured, so you usually don't need to deal with this much, but it's helpful to know what's going on. Users may override or add plugins and configure them to run on any phase desired. When a phase is invoked, all phases that precede it are invoked first. Here are the standard phases, and an explanation of the intent of each phase. Remember, different projects might configure different plugins for these phases.

Phase

Description

validate

Runs a sanity check on the project itself

compile

Compiles source code

test

Runs the compiled test classes (delegating to a particular unit testing plugin runner, like jUnit or TestNG)

package

Produces an artifact from the compiled code and classpath resources and stores it in the `target` folder, at the root of the project

integration-test

Process and deploy the packaged artifact into an integration testing environment

verify

Run checks to confirm that the package is valid

install

Installs the packaged artifact in your local repository. Your local repository is a folder where all the downloaded dependencies are kept and cached. Subsequent builds that try to resolve a dependency already in the cache will not redownload the dependency, instead using the one in the local repository. Normally, it's in your home directory, under `.m2`, in a folder called `repository.` Thus, on my system, this would be `/home/jlong/.m2/repository`

deploy

Copies the final artifact to another environment. Typically, a shared server so that different teams can share a shared dependency.

So, Maven builds follow phases, and each project ultimately produces an artifact by running through those phases. You can change the type of the produced artifact by specifying an `<packaging>` element in the pom.xml file. In the example above, we omitted the `packaging` element, which leaves it as a packaging of type `jar`. Other packaging types include `war`, and `ear`.

With all of this in mind, our simple invocation from above should seem pretty powerful!

`mvn install` instructs Maven to - among other things - download all plugins and dependencies (if not already downloaded and cached), compile the source code, run the unit tests, build a .jar, install the resulting .jar into the target folder relative to the project root, and install the resulting .jar into the local repository `~/.m2/repository`. As the phases are standard, and the directories are standard, and the default, configured plugins are standard, you should be able to take any Maven project, and run `mvn install` and predictably get a tested, usable binary.

Sometimes you want Maven to throw away everything in the "target" folder and start clean. To do this, you can use the "clean" command before the "install" command. This will remove any pre-built binaries and then install the artifact.

mvn clean install

## Identify Yourself!

All Maven projects can be uniquely identified through a combination of their `artifactId`, `groupId` and `version` elements. This information provides a project's "coordinates." The information we specified in the `pom.xml` file tells Maven what our project's coordinates are. Maven can automatically add other artifacts (dependencies) to a project's classpath during compilation and execution by specifying a dependency with unique coordinates. Here's a look at the three most important parts of a coordinate.

Coordinate Element

Description

groupId

A groupId could be anything. Think of it like a Java package for your build. Usually, its a combination of your organisation's domain, as well as the project. The Spring Integration project, for example, has a `groupId` of: `org.springframework.integration `

artifactId

The artifactId is the name of this particular artifact in the `groupId.` A `groupId` might be common to many different artifacts which, together, describe a whole system. ArtifactIds can be named by purpose, or module name, or any other discriminator. The Spring Integration File support has the following `artifactId`: `spring-integration-file`

Version

This is the version of the project. Maven versions can be fixed numbers, or SNAPSHOTs. A final, GA version of a project might have a version of 1.0, or 3.5, etc. In development, however, those same projects would be said to be snapshots of the final release. Maven can accommodate this using the SNAPSHOT suffix, which tells Maven to"get the latest build." An example version might be 1.0-SNAPSHOT, which translates into"the latest build of 1.0."

Our project uniquely identifies itself:

  

<groupId>**org.springsource.greenbeans.maven**</groupId>:<artifactId>**example1**</artifactId>:<version>**1.0-SNAPSHOT**</version>

Once you've `installed`'d this project, any other project can depend on it by adding it as a dependency to your Maven pom.xml file. This works for other projects too. Lets modify the pom.xml to depend on the Spring Framework. Your new pom.xml file will look like this:

```xml
Copy

<?xml version="1.0" encoding="UTF-8"?> 
<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd" xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> 
  <modelVersion>4.0.0</modelVersion> 

  <groupId>org.springsource.greenbeans.maven</groupId> 
  <artifactId>example2</artifactId> 
  <version>1.0-SNAPSHOT</version> 
 
  <name>Our Simple Project</name> 

  <dependencies> 
       <dependency> 
            <groupId>org.springframework</groupId> 
            <artifactId>spring-context</artifactId> 
            <version>3.0.5.RELEASE</version>
       </dependency>
  </dependencies>
</project>

```

Rerun ` mvn install`, and you should start to see the Spring Framework libraries - as well as the libraries it depends on - come down. Inspect the output, and you'll see that Maven's downloading the dependencies from a public repository, `http://repo1.maven.org`. There are many public repositories, and a few that Maven consults by default. These repositories are just HTTP servers with directories. You can usually inspect them in a browser to search for specific dependencies that you want. For example, if I wanted to see all the available Spring Framework dependencies, you might browse to the URL `[http://repo1.maven.org/maven2/org/springframework/](http://repo1.maven.org/maven2/org/springframework/)`. To see all the Spring Integration dependencies, browse to `[http://repo1.maven.org/maven2/org/springframework/integration/](http://repo1.maven.org/maven2/org/springframework/integration/)`. To see all the Spring Batch dependencies, browse to `[http://repo1.maven.org/maven2/org/springframework/batch/](http://repo1.maven.org/maven2/org/springframework/integration/)`, etc. SpringSource also maintains several Maven repositories containing our latest dependencies, such as `[http://maven.springframework.org](http://maven.springframework.org)` and `[spring-roo-repository.springsource.org](spring-roo-repository.springsource.org)`

These repositories all follow a common layout, and they all contain metadata about each artifact stored in a standard location. This repository structure has become a de-facto standard, and now its very common for other tools to consume them. There are other, more specialized build tools besides Maven that now consume and produce the same metadata as Maven does.

Maven's defaults are good enough for most builds, but on occasion you'll find it necessary to tailor the behavior of Maven during the build phases, or, on occasion to add functionality that can be invoked independent of any phase. In Maven, you use plugins to change these things. One thing I often change is the language support of the compiler. I usually want to use Java 5 or greater, where as the default behavior in Maven 2 is 1.4. We'll override the default Maven compiler behavior and configure a specific language compatibility. Presented below is the updated Maven project file.

```xml
Copy

<?xml version="1.0" encoding="UTF-8"?> 
<project xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd" xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> 
  <modelVersion>4.0.0</modelVersion> 

  <groupId>org.springsource.greenbeans.maven</groupId> 
  <artifactId>example2</artifactId> 
  <version>1.0-SNAPSHOT</version> 
 
  <name>Our Simple Project</name> 

  <dependencies> 
       <dependency> 
            <groupId>org.springframework</groupId> 
            <artifactId>spring-context</artifactId>
            <version>3.0.5.RELEASE</version>
       </dependency>
  </dependencies>

  <build>

    <plugins>

      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>2.3.2</version>

        <configuration>
          <source>1.5</source>
          <target>1.5</target>
        </configuration>

      </plugin>
    </plugins>
  </build>
</project>
```

There are lots of plugins available, and many others still contributed by various community projects. One common use case of a plugin is adding the `aspectj-compiler` plugin to the compile phase to make sure that AspectJ aspects are compiled correctly. Another common requirement is generating Java interfaces for WSDL-based web-service contracts. Often, a plugin is useful on its own, and not tied to any specific build phase. Maven lets you invoke individual plugins, without invoking the whole build. Plugins usually provide several specific commands that they provide. To invoke a plugin, you use the following form:

mvn \[plugin-name\]:\[command-name\]

The plugin name can be aliased, or it can be a fully qualified plugin name. Plugins that come from Maven-project repositories are aliased, and are easy to use. One very useful plugin is the Maven dependency plugin. The dependency plugin supports many commands. A common requirement people have is to get an inventory of all the dependencies (transitive or otherwise) that are attached to a given project. The Maven dependency plugin can print a tree that that shows all dependencies for a project. Invoke it like this:

 mvn dependency:tree 

NB: this plugin's output is unreliable in Maven 3 and that STS includes a visual graph of the interellated dependencies, too. On my system, the output looks like this:

jlong@jlong-mbp:~/Desktop/mavenspring/code/example1$ mvn dependency:tree 
\[INFO\] Scanning for projects... 
\[INFO\] Searching repository for plugin with prefix: 'dependency'. 
\[INFO\] ------------------------------------------------------------------------ 
\[INFO\] Building Our Simple Project 
\[INFO\]    task-segment: \[dependency:tree\] 
\[INFO\] ------------------------------------------------------------------------ 
\[INFO\] \[dependency:tree {execution: default-cli}\] 
\[INFO\] org.springsource.greenbeans.maven:example1:jar:1.0-SNAPSHOT 
\[INFO\] +- log4j:log4j:jar:1.2.16:compile 
\[INFO\] +- org.springframework:spring-jdbc:jar:3.0.5.RELEASE:compile 
\[INFO\] |  +- org.springframework:spring-beans:jar:3.0.5.RELEASE:compile 
\[INFO\] |  +- org.springframework:spring-core:jar:3.0.5.RELEASE:compile 
\[INFO\] |  |  \\- commons-logging:commons-logging:jar:1.1.1:compile 
\[INFO\] |  \\- org.springframework:spring-tx:jar:3.0.5.RELEASE:compile 
\[INFO\] |     \\- aopalliance:aopalliance:jar:1.0:compile 
\[INFO\] +- org.springframework:spring-context:jar:3.0.5.RELEASE:compile 
\[INFO\] |  +- org.springframework:spring-aop:jar:3.0.5.RELEASE:compile 
\[INFO\] |  +- org.springframework:spring-expression:jar:3.0.5.RELEASE:compile 
\[INFO\] |  \\- org.springframework:spring-asm:jar:3.0.5.RELEASE:compile 
\[INFO\] \\- junit:junit:jar:4.5:compile 
\[INFO\] ------------------------------------------------------------------------ 
\[INFO\] BUILD SUCCESSFUL 
\[INFO\] ------------------------------------------------------------------------ 
\[INFO\] Total time: 4 seconds 
\[INFO\] Finished at: Wed Jan 10 02:07:36 PST 2011 
\[INFO\] Final Memory: 22M/279M 
\[INFO\] ------------------------------------------------------------------------ 
jlong@jlong-mbp:~/Desktop/mavenspring/code/example1$ 

Now you know how the dependency graph looks. Another common question is how to assemble all the dependencies in a single folder. This is particularly common for users of the Spring Framework of late. The core Spring Framework no longer ships with all the dependencies provided, because tools like Maven make it easier to get all the dependencies. The `dependency` plugin, in particular, makes this easier. Run the mvn `dependency:copy-dependencies` command, and all the dependencies will be put into the project's `target/dependency/` folder. Here's the output on my system:

jlong@jlong-mbp:~/Desktop/mavenspring/code/example1$ mvn dependency:copy-dependencies 
\[INFO\] Scanning for projects... 
\[INFO\] Searching repository for plugin with prefix: 'dependency'. 
\[INFO\] ------------------------------------------------------------------------ 
\[INFO\] Building Our Simple Project 
\[INFO\]    task-segment: \[dependency:copy-dependencies\] 
\[INFO\] ------------------------------------------------------------------------ 
\[INFO\] \[dependency:copy-dependencies {execution: default-cli}\] 
\[INFO\] Copying aopalliance-1.0.jar to /home/jlong/...example1/target/dependency/aopalliance-1.0.jar 
\[INFO\] Copying commons-logging-1.1.1.jar to /home/jlong/...example1/target/dependency/commons-logging-1.1.1.jar 
\[INFO\] Copying junit-4.5.jar to /home/jlong/...example1/target/dependency/junit-4.5.jar 
\[INFO\] Copying log4j-1.2.16.jar to /home/jlong/...example1/target/dependency/log4j-1.2.16.jar 
\[INFO\] Copying spring-aop-3.0.5.RELEASE.jar to /home/jlong/...example1/target/dependency/spring-aop-3.0.5.RELEASE.jar 
\[INFO\] Copying spring-asm-3.0.5.RELEASE.jar to /home/jlong/...example1/target/dependency/spring-asm-3.0.5.RELEASE.jar 
\[INFO\] Copying spring-beans-3.0.5.RELEASE.jar to /home/jlong/...example1/target/dependency/spring-beans-3.0.5.RELEASE.jar 
\[INFO\] Copying spring-context-3.0.5.RELEASE.jar to /home/jlong/...example1/target/dependency/spring-context-3.0.5.RELEASE.jar 
\[INFO\] Copying spring-core-3.0.5.RELEASE.jar to /home/jlong/...example1/target/dependency/spring-core-3.0.5.RELEASE.jar 
\[INFO\] Copying spring-expression-3.0.5.RELEASE.jar to /home/jlong/...example1/target/dependency/spring-expression-3.0.5.RELEASE.jar 
\[INFO\] Copying spring-jdbc-3.0.5.RELEASE.jar to /home/jlong/...example1/target/dependency/spring-jdbc-3.0.5.RELEASE.jar 
\[INFO\] Copying spring-tx-3.0.5.RELEASE.jar to /home/jlong/...example1/target/dependency/spring-tx-3.0.5.RELEASE.jar 
\[INFO\] ------------------------------------------------------------------------ 
\[INFO\] BUILD SUCCESSFUL 
\[INFO\] ------------------------------------------------------------------------ 
\[INFO\] Total time: 3 seconds 
\[INFO\] Finished at: Wed Jan 12 02:18:02 PST 2011 
\[INFO\] Final Memory: 22M/279M 
\[INFO\] ------------------------------------------------------------------------ 
jlong@jlong-mbp:~/Desktop/mavenspring/code/example1$ 

## Using Maven with SpringSource Tool Suite

Maven encourages reproducible builds. The commands are standard, the phases, the plugin configuration and project types, all standard. Any developer with Maven installed should be able to take a project's source code, along with its pom.xml file, and rebuild it exactly as the original developer builds it on his or her private workstation. In theory, there should be no need to skulk around the build file trying to debug build logic, little or no need to do tricks to setup the environment (property files, shell variables, etc.) that the build requires. This

A Maven `pom.xml` file specifies everything required to build a project. It specifies which libraries need to be available for compilation, it knows which compiler to use, it knows which source code goes where. It knows everything about your project. It should be no surprise then that good tools like [SpringSource Tool Suite](http://www.springsource.com/products/springsource-tool-suite-download) include functionality (namely, the `M2Eclipse` plugin, which provides fantastic Maven support for Eclipse derivatives) to import Maven projects directly. First, we need to get the project into STS. To do so: go to File > Import > Maven > General, and browse to the folder containing your `pom.xml`  

[![](http://blog.springsource.com/wp-content/uploads/2011/01/maven-projects-root-discovered1.png "maven-projects-root-discovered")](http://blog.springsource.com/wp-content/uploads/2011/01/maven-projects-root-discovered1.png)

In this example, we've imported a Maven project into the STS environment, but you can also create Maven-based projects from within STS. STS comes with many template projects that use Maven that you can access. Simply go to `File > New > Spring Template Project` and choose one of those projects. They're Maven based as well, so they're a great way to get started quickly.

You've now got a working Maven project in STS and you can start coding right away. Browse "Package Explorer." You'll see a "Maven Dependencies" library in your project which will contain the dependencies specified in the Maven pom, as well as the transitive dependencies. You'll also note that the M2Eclipse plugin has correctly added the four source code roots in STS that Maven requires.

At this point, we have a working STS project that already has a classpath setup and builds correctly. I don't know about you, but my first inclination at this point - this project feels like a clean, white canvas just *begging* to be painted on - is to start writing code. After all, I've got work to do! Normally, I'll add jUnit and save the pom.xml file.

```xml
Copy<dependency>
  <groupId>junit</groupId>
  <artifactId>junit</artifactId>
  <version>4.5</version>
</dependency>
```

At this point, STS automatically updates the Maven dependencies in the project.

Then, I'll typically add a logging framework, and save it:

\`\`\`xml log4j log4j 1.2.16 \`\`\`

Then, I'll start in on adding the dependencies I need specific to my task. Suppose I've read last week's post on [Green Beans](http://blog.springsource.com/2011/01/07/green-beans-getting-started-with-spring-in-your-service-tier/) and want to leverage JDBC and Spring's `JdbcTemplate`, I add that:

\`\`\`xml org.springframework spring-jdbc 3.0.5.RELEASE \`\`\`

And we're off! Let's write some code. This is where one of my personal favorite features of the `M2Eclipse` Maven integration kicks in. You see, dear reader, I make a lot of mistakes in my code. :-) I spend a *lot* of time running, and debugging, code. I'll typically break something and need to debug the interplay between my code and the framework. Maven dependencies are often deployed with accompanying source code, and so the M2Eclipse plugin can automatically download the source code for you. To see this in action, let's take a look at the code for` JdbcTemplate.` In STS, go to `Navigate > Open Type`. Type `JdbcTemplate` and then click `Enter`. STS will at first open the `.class` (the default behavior) then try to download the source code in the background. A few seconds later, you should be staring at the correct source code for `JdbcTemplate`. Then, you can inspect the code and set breakpoints which you can then step through in the debugger. Convenient, eh?  
[![](http://blog.springsource.com/wp-content/uploads/2011/01/dependency-jdbc-template.png "dependency-jdbc-template")](http://blog.springsource.com/wp-content/uploads/2011/01/dependency-jdbc-template.png)

## Let Spring Roo Do It

We've seen that SpringSource Tool Suite is an ideal environment for working with Java (and by extension, Spring and Maven) code. It's easy to get started with Spring-based applications using only Maven and STS. [Spring Roo](http://www.springsource.org/roo), however, is even easier and is both already included with STS and easy to use from within STS. I make it a personal policy to let "Spring Roo do it" whenever possible. Spring Roo sets up an elegant Maven build for every Spring Roo project, so the very act of creating a Spring Roo project buys you a lot. Let's create a Spring Roo project (using STS's wizard, of course!), and then see how Spring Roo's support for Maven simplifies configuring a Maven build.

In STS, go to `File > New > Spring Roo Project`. This will launch the Spring Roo wizard. Youll note that the Wizard lets you specify how involved you want Maven to be. Leave the default - `Full Maven Build` - specified.  
[![](http://blog.springsource.com/wp-content/uploads/2011/01/roo-new-project-screen.png "roo-new-project-screen")](http://blog.springsource.com/wp-content/uploads/2011/01/roo-new-project-screen.png)

This will leave you with a new Maven project, simialar to our first example. You'll need repeat the step where we included the resource folders from the previous example. As before, you have all of STS's support for Maven, but now you can also iteract and modify the Maven project configuration using the Spring Roo shell. For starters, you can install the newly created project using the Roo shell:

perform command --mavenCommand install

This is equivalent to running `mvn install` as we did before. You should run it for any newly created Spring Roo project. Spring Roo provides convenient, scriptable shell commands for adding and removing Maven dependencies, as well. To add the Spring Integration framework (and in particular, the filesystem-specific support), you might issue the following commands.

dependency add --groupId org.springframework.integration --artifactId spring-integration-file --version 2.0.0.RELEASE 
perform package

The `perform package` command produces a fully built artifact, so a `.war` project (for example) built using this command would be ready for instant deployment to your container. There's another command, `dependency remove`, which can be used to remove dependencies from the Maven project.

## Summary

In this post, we've explored Apache Maven, a build and project comprehension tool. We looked at how Maven's convention-over-configuration philosophy and declarative dependency management can simplify project builds. To simplify things, we then used STS, which comes with prepackaged with Apache Maven, the `M2Eclipse` plugin, and Spring Roo, as well.