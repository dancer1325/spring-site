---
title: Logging Dependencies in Spring
source: https://spring.io/blog/2009/12/04/logging-dependencies-in-spring
scraped: 2026-02-24T09:01:45.316Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  December 04, 2009 | 8 Comments
---

# Logging Dependencies in Spring

_Engineering | Dave Syer |  December 04, 2009 | 8 Comments_

This article deals with the choices that Spring makes and the options that developers have for logging in applications built with Spring. This is timed to coincide with the imminent release of Spring 3.0 not because we have changed anything much (although we are being more careful with dependency metadata now), but so that you can make an informed decision about how to implement and configure logging in your application. First we look briefly at what the mandatory dependencies are in Spring, and then go on to discuss in more detail how to set your application up to use some examples of common logging libraries. As an example I'll show the dependency configuration using Maven Central style artifact naming conventions.

## Spring Dependencies and Depending on Spring

Although Spring provides integration and support for a huge range of enterprise and other external tools, it intentionally keeps its mandatory dependencies to an absolute minimum: you shouldn't have to locate and download (even automatically) a large number of jar libraries in order to use Spring for simple use cases. For basic dependency injection there is only one mandatory external dependency,and that is for logging (see below for a more detailed description of logging options). If you are using Maven for dependency management you don't even need to supply the logging dependency explicitly. For example, to create an application context and use dependency injection to configure an application, your Maven dependencies will look like this:

```xml
Copy<dependencies>
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>3.1.2.RELEASE</version>
      <scope>runtime</scope>
   </dependency>
</dependencies>
```

That's it. Note the scope can be declared as runtime if you don't need to compile against Spring APIs, which is typically the case for basic dependency injection use cases.

We used the Maven Central naming conventions in the example above, so that works with Maven Central or the SpringSource S3 Maven repository. To use the S3 Maven repository (e.g. for milestones or developer snapshots), you need to specify the repository location in your Maven configuration. For full releases:

```xml
Copy<repositories>
   <repository>
      <id>com.springsource.repository.maven.release</id>
      <url>http://maven.springframework.org/release/</url>
      <snapshots><enabled>false</enabled></snapshots>
   </repository>
</repositories>
```

For milestones:

```xml
Copy<repositories>
   <repository>
      <id>com.springsource.repository.maven.milestone</id>
      <url>http://maven.springframework.org/milestone/</url>
      <snapshots><enabled>false</enabled></snapshots>
   </repository>
</repositories>
```

And for snapshots:

```xml
Copy<repositories>
   <repository>
      <id>com.springsource.repository.maven.snapshot</id>
      <url>http://maven.springframework.org/snapshot/</url>
      <snapshots><enabled>true</enabled></snapshots>
   </repository>
</repositories>
```

To use the SpringSource EBR you would need to use a different naming convention for the dependencies. The names are usually easy to guess, e.g. in this case it is:

```xml
Copy<dependencies>
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>org.springframework.context</artifactId>
      <version>3.0.0.RELEASE</version>
      <scope>runtime</scope>
   </dependency>
</dependencies>
```

You also need to declare the location of the repository explicitly (only the URL is important):

```xml
Copy<repositories>
   <repository>
      <id>com.springsource.repository.bundles.release</id>
      <url>http://repository.springsource.com/maven/bundles/release/</url>
   </repository>
</repositories>
```

If you are managing your dependencies by hand, the URL in the repository declaration above is not browseable, but there is a user interface at <ahref="[http://www.springsource.com/repository">http://www.springsource.com/repository](http://www.springsource.com/repository%22%3Ehttp://www.springsource.com/repository) that can be used to search for and download dependencies. It also has handy snippets of Maven and Ivy configuration that you can copy and paste if you are using those tools.

If you prefer to use [Ivy](http://ant.apache.org/ivy) to manage dependencies then there are similar names and configuration options there (refer to the documentation of your dependency management system, or look at some sample code - Spring itself uses Ivy to manage dependencies when it is building).

## Logging

Logging is a very important dependency for Spring because a) it is the only mandatory external dependency, b) everyone likes to see some output from the tools they are using, and c) Spring integrates with lots of other tools all of which have also made a choice of logging dependency. One of the goals of an application developer is often to have unified logging configured in a central place for the whole application, including all external components. This is more difficult than it might have been since there are so many choices of logging framework.

The mandatory logging dependency in Spring is the Jakarta Commons Logging API (JCL). We compile against JCL and we also make JCL Log objects visible for classes that extend the Spring Framework. It's important to users that all versions of Spring use the same logging library: migration is easy because backwards compatibility is preserved even with applications that extend Spring.The way we do this is to make one of the modules in Spring depend explicitly on commons-logging (the canonical implementation of JCL), and then make all the other modules depend on that at compile time. If you are using Maven for example, and wondering where you picked up the dependency on commons-logging, then it is from Spring and specifically from the central module calledspring-core.

The nice thing about commons-logging is that you don't need anything else to make your application work. It has a runtime discovery algorithm that looks for other logging frameworks in well known places on the classpath and uses one that it thinks is appropriate (or you can tell it which one if you need to). If nothing else is available you get pretty nice looking logs just from the JDK (java.util.logging or JUL for short). You should find that your Spring application works and logs happily to the console out of the box in most situations, and that's important.

Not Using Commons Logging

Unfortunately, the worst thing about commons-logging, and what has made it unpopular with new tools, is also the runtime discovery algorithm. If we could turn back the clock and start Spring now as a new project it would use a different logging dependency. Probably the first choice would be the Simple Logging Facade for Java ([SLF4J](http://www.slf4j.org)), which is also used by a lot of other tools that people use with Spring inside their applications.

To switch off commons-logging is easy: just make sure it isn't on the classpath at runtime. In Maven terms you exclude the dependency, and because of the way that the Spring dependencies are declared, you only have to do that once.

```xml
Copy<dependencies>
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>3.1.2.RELEASE</version>
      <scope>runtime</scope>
      <exclusions>
         <exclusion>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
         </exclusion>
      </exclusions>
   </dependency>
</dependencies>
```

Now this application is probably broken because there is no implementation of the JCL API on the classpath, so to fix it a new one has to be provided. In the next section we show you how to provide an alternative implementation of JCL using SLF4J as an example.

### Using SLF4J

SLF4J is a cleaner dependency and more efficient at runtime than commons-logging because it uses compile-time bindings instead of runtime discovery of the other logging frameworks it integrates. This also means that you have to be more explicit about what you want to happen at runtime, and declare it or configure it accordingly. SLF4J provides bindings to many common logging frameworks, so you can usually choose one that you already use, and bind to that for configuration and management.

SLF4J provides bindings to many common logging frameworks,including JCL, and it also does the reverse: bridges between other logging frameworks and itself. So to use SLF4J with Spring you need to replace the commons-logging dependency with the SLF4J-JCL bridge. Once you have done that then logging calls from within Spring will be translated into logging calls to the SLF4J API, so if other libraries in your application use that API, then you have a single place to configure and manage logging.

A common choice might be to bridge Spring to SLF4J, and then provide explicit binding from SLF4J to Log4J. You need to supply 4 dependencies (and exclude the existing commons-logging): the bridge, theSLF4J API, the binding to Log4J, and the Log4J implementation itself. In Maven you would do that like this

```xml
Copy<dependencies>
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>3.1.2.RELEASE</version>
      <scope>runtime</scope>
      <exclusions>
         <exclusion>
           <groupId>commons-logging</groupId>
           <artifactId>commons-logging</artifactId>
         </exclusion>
      </exclusions>
   </dependency>
   <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>jcl-over-slf4j</artifactId>
      <version>1.7.0</version>
      <scope>runtime</scope>
   </dependency>
   <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>1.7.0</version>
      <scope>runtime</scope>
   </dependency>
   <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-log4j12</artifactId>
      <version>1.7.0</version>
      <scope>runtime</scope>
   </dependency>
   <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.14</version>
      <scope>runtime</scope>
   </dependency>
</dependencies>
```

That might seem like a lot of dependencies just to get some logging. Well it is, but it is optional, and it should behave better than the vanilla commons-logging with respect to class loader issues, notably if you are in a strict container like an OSGi platform. Allegedly there is also a performance benefit because the bindings are at compile-time not runtime.

A more common choice amongst SLF4J users, which uses fewer step sand generates fewer dependencies, is to bind directly to [Logback](http://logback.qos.ch/). This removes the extra binding step because Logback implements SLF4J directly, so you only need to depend on two libaries not four (jcl-over-slf4j and logback). If you do that you might also need to exclude the slf4j-api dependency from other external dependencies (not Spring), because you only want one version of that API on the classpath.

### Using Log4J

Many people use <ahref="[http://logging.apache.org/log4j">Log4j](http://logging.apache.org/log4j%22%3ELog4j) as a logging framework for configuration and management purposes. It's efficient and well established, and in fact it's what we use at runtime when we build and test Spring. Spring also provides some utilities for configuring and initializing Log4j, so it have an optional compile time dependency on Log4j in some modules.

To make Log4j work with the default JCL dependency (commons-logging) all you need to do is put Log4j on the classpath, and provide it with a configuration file(log4j.properties or log4j.xml in the root of the classpath). So for Maven users this is your dependency declaration:

```xml
Copy<dependencies>
   <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>3.1.2.RELEASE</version>
      <scope>runtime</scope>
   </dependency>
   <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.14</version>
      <scope>runtime</scope>
   </dependency>
</dependencies>
```

And here's a sample log4j.properties for logging to the console:

```xml
Copylog4j.rootCategory=INFO, stdout

log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{ABSOLUTE} %5p %t %c{2}:%L - %m%n

log4j.category.org.springframework.beans.factory=DEBUG
```

### Runtime Containers with Native JCL

Many people run their Spring applications in a container that itself provides an implementation of JCL. IBM Websphere Application Server (WAS) is the archetype. This often causes problems, and unfortunately there is no silver bullet solution; simply excluding commons-logging from your application is not enough inmost situations.

To be clear about this: the problems reported are usually not with JCL per se, or even with commons-logging: rather they are to do with binding commons-logging to another framework (often Log4J). This can fail because commons-logging changed the way they do the runtime discovery in between the older versions (1.0) found in some containers and the modern versions that most people use now (1.1). Spring does not use any unusual parts of the JCL API, so nothing breaks there, but as soon as Spring or your application tries to do any logging you can find that the bindings to Log4J are not working.

In such cases with WAS the easiest thing to do is to invert the classloader hierarchy (IBM calls it "parent last") so that the application controls the JCL dependency, not the container. That option isn't always open, but there are plenty of other suggestions in the public domain for alternative approaches, and your mileage may vary depending on the exact version and feature set of the container.

(Note: the Spring and slf4j versions have been updated from the original article to keep them copy-pasteable.)