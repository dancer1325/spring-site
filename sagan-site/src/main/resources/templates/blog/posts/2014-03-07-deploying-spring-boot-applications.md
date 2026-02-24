---
title: Deploying Spring Boot Applications
source: https://spring.io/blog/2014/03/07/deploying-spring-boot-applications
scraped: 2026-02-24T07:38:48.646Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 07, 2014 | 109 Comments
---

# Deploying Spring Boot Applications

_Engineering | Josh Long |  March 07, 2014 | 109 Comments_

[Spring Boot 1.0 RC4 just dropped](http://projects.spring.io/spring-boot/) and 1.0 can't be too far behind, and there are *all sort of cool features* coming!

One of the many questions I get around this concerns deployment strategies for Boot applications. Spring Boot builds on top of Spring and serves wherever Spring can serve. It enjoys Spring's portability. Spring Boot lets the developer focus on the application's development first, and removes the need to be overly concerned with every other aspect of its lifecycle, including deployment and management.

It aims to be *production ready*, out of the box. As part of this, Spring Boot does a few things differently, by default, that may be at first alien to some. In this post, I hope to briefly cover some of the common strategies for deploying a Spring Boot applications. I'll ever so briefly introduce it, and some sample code, before we dive deeper. Feel free to skip this section and start at the *Embedded Web Server Deployment* section.

## [](#getting-started-with-spring-boot)Getting Started with Spring Boot

If you haven't used Spring Boot yet, do! There are many ways to get started, including the [Spring Initializr at start.spring.io](http://start.spring.io) webservice and - if you're using [Spring Tool Suite](http://spring.io/tools) - there's a more familiar, integrated wizard that ultimately invokes that same webservice. I usually start by checking the *Actuator*, and *Web* checkboxes, then choosing to generate a *Maven Project*. This will give you two starter classes, *Application.java*, and *ApplicationTests.java*, as well as a ready-to-use Maven `pom.xml` file.

Here is the unzipped starter project:

```sh
Copy➜  pwd
/Users/jlong/Downloads/starter
➜  starter  tree
.
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── demo
    │           └── Application.java
    └── test
        └── java
            └── demo
                └── ApplicationTests.java

7 directories, 3 files
➜  starter  
```

The Maven build *depends* on Spring Boot started dependencies. These dependencies are *opinionated*. They bring in known, ready-to-use stacks aligned with the the task before you, not the technology stacks you *might* use: put another way, if you want to build a web application, then simple depend on the Spring Boot starter web dependency, like this:

```xml
Copy <dependency> 
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-web</artifactId>
 </dependency>
```

The Maven build *inherits* information about which dependency versions to use from its parent `pom`, also provided by Spring Boot. You don't need to worry about lining up common Spring project versions and third party dependencies.

The generated Java classes are boilerplate (this is why they're *generated*!). You won't often change the classes themselves, though you can. By the end of this blog you'll have a common recipe for deploying Spring Boot applications. This is (hopefully!) the only boilerplate you'll encounter in Spring Boot. Here is the `Application.java` class that Spring Boot provides:

```java
Copypackage demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

```

For the purpose of demonstration during post, we'll add in a RESTful Spring MVC controller. Here's the revised `Application.java` code page complete with a Spring MVC REST controller that responds with "Hello, **World**" when a request to `/hello/World` is made:

```java
Copypackage demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

@RestController
class GreetingController {
    
    @RequestMapping("/hello/{name}")
    String hello(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
}

```

## [](#embedded-web-server-deployment)Embedded Web Server Deployment

Out of the box, Spring Boot uses a `public static void main` entry-point that launches an embedded web server for you.

If you use the Maven build (`mvn clean install`) provided by the Spring Boot Initialzr, you'll get a *fat jar*. This `jar` is handy because it includes all the other dependencies and things like your web server inside the archive. You can give anybody this one `.jar` and they can run your entire Spring application with no fuss: no build tool required, no setup, no web server configuration, etc: just `java -jar ...your.jar`.

### [](#tomcat)Tomcat

When you run your application, Spring Boot will detect that you have a Spring MVC controller and start up an embedded Apache Tomcat 7 instance, by default. You should be able to test the REST endpoint by opening up your browser and hitting `http://localhost:8080/hello/World`.

There are lots of configuration options for the embedded Tomcat. You can enable HTTPS (SSL/TLS termination) for your webservice fairly easily by [providing an `EmbeddedServletContainerCustomizer`, as I do in this example](https://github.com/joshlong/the-spring-rest-stack/blob/master/code/web/oauth/src/main/java/com/jl/crm/web/Application.java). The module described there is a turnkey web application that can run on HTTPS, requires only a SSL/TLS certificate, and embeds its own webserver. Running that particular application is dead simple: ` java -Dspring.profiles.active=production -Dkeystore.file=file:///$PWD/src/main/resources/keystore.p12 -jar target/oauth-1.0.0.BUILD-SNAPSHOT.jar`.

This `EmbeddedServletContainerCustomizer` configuration SPI lets you tap most of the power of explicit XML configuration for a standalone Apache Tomcat instance. Smaller things, like which port the server runs on, can be configured by specifying properties either through the command line (as `--D`\-style arguments) or through a loaded property file (Spring Boot will automatically consult any properties in a file named `application.properties` on the `CLASSPATH`, for example). Thus, to change the port on which Tomcat listens, you might specify `--Dserver.port=8081`, to have it listen on port 8081. If you specify `server.port=0`, it'll automatically find an unused port to listen on, instead.

By default, Spring Boot uses Tomcat 7. If you want to use Tomcat 8, just *say so*! You need only override the Maven build's `tomcat.version` property and this will trigger the resolution of later builds of Apache Tomcat.

```xml
Copy<properties>
  <tomcat.version>8.0.3</tomcat.version>
</properties>
```

### [](#jetty)Jetty

Of course, some of you may want to use the [Jetty embedded servlet container](http://www.eclipse.org/jetty/). Jetty's a fine choice, as well. You can simply exclude the Spring Boot starter Tomcat module and then import the Spring Boot Starter Jetty module. Spring Boot will automatically delegate to that, instead. Here's the revised `dependencies` section of our Maven build:

```xml
Copy	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
            </exclusions>
		</dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jetty</artifactId>
        </dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
		</dependency>
	</dependencies>
```

If you want to switch to Jetty 9, that's easy as well. Ensure you have the following `properties` in your Maven build.

```xml
Copy<properties>
    <java.version>1.7</java.version>
    <jetty.version>9.1.0.v20131115</jetty.version>
    <servlet-api.version>3.1.0</servlet-api.version>
</properties>
```

## [](#what-about-the-java-ee-application-server)What about the Java EE Application Server?

But, I imagine you wondering, "how do I deploy it to an *existing* Tomcat installation, or to the classic Java EE application servers (some of which cost a lot of money!) like WebSphere, WebLogic, or JBoss?" Easy! It's still just Spring, after all, so very little else is required. You'll need to make three intuitive changes: [move from a `jar` build to a `war` build in Maven](https://spring.io/guides/gs/convert-jar-to-war/): comment out the declaration of the `spring-boot-maven-plugin` plugin in your `pom.xml` file, then change the Maven `packaging` type to `war`. Finally, add a web entry point into your application. Spring configures almost everything for you using Servlet 3 Java configuration. You just need to give it the opportunity. Modify your `Application` entry-point class thusly:

```java
Copypackage demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Configuration
@ComponentScan
@EnableAutoConfiguration
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(applicationClass, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(applicationClass);
    }

    private static Class<Application> applicationClass = Application.class;
}

@RestController
class GreetingController {

    @RequestMapping("/hello/{name}")
    String hello(@PathVariable String name) {
        return "Hello, " + name + "!";
    }
} 
```

This new base class - `SpringBootServletInitializer` - taps into a Servlet 3 style Java configuration API which lets you describe in code what you could only describe in `web.xml` before. Such configuration classes are discovered and invoked at application startup. This gives Spring Boot a chance to tell the web server about the application, including the reqired `Servlet`s, `Filter`s and `Listener`s typically required for the various Spring projects.

This new class can now be used to run the application using embeddedd Jetty or Tomcat, internally, and it can be deployed to any Servlet 3 container. You may experience issues if you have classes that conflict with those that ship as parter of a larger application server. In this case, use your build tool's facilities for excluding or making `optional` the relevant APIs. Here are the changes to the Maven build that I had to make to get the starter Spring Boot REST service up and running on JBoss WildFly (the AS formerly known as JBoss AS):

```xml
Copy<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>org.demo</groupId>
	<artifactId>demo</artifactId>
	<version>0.0.1-SNAPSHOT</version>

    <packaging>war</packaging>
	<description>Demo project</description>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>1.0.0.BUILD-SNAPSHOT</version>
	</parent>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>org.springframework.boot</groupId>
                    <artifactId>spring-boot-starter-tomcat</artifactId>
                </exclusion>
            </exclusions>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
		</dependency>
	</dependencies>

	<properties>
        <start-class>demo.Application</start-class>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.7</java.version>
	</properties>
	<repositories>
		<repository>
			<id>spring-snapshots</id>
			<name>Spring Snapshots</name>
			<url>http://repo.spring.io/snapshot</url>
			<snapshots>
				<enabled>true</enabled>
			</snapshots>
		</repository>
		<repository>
			<id>spring-milestones</id>
			<name>Spring Milestones</name>
			<url>http://repo.spring.io/milestone</url>
			<snapshots>
				<enabled>false</enabled>
			</snapshots>
		</repository>
	</repositories>
	<pluginRepositories>
		<pluginRepository>
			<id>spring-snapshots</id>
			<name>Spring Snapshots</name>
			<url>http://repo.spring.io/snapshot</url>
			<snapshots>
				<enabled>true</enabled>
			</snapshots>
		</pluginRepository>
		<pluginRepository>
			<id>spring-milestones</id>
			<name>Spring Milestones</name>
			<url>http://repo.spring.io/milestone</url>
			<snapshots>
				<enabled>false</enabled>
			</snapshots>
		</pluginRepository>
	</pluginRepositories>
</project>

```

I was then able to re-run the build and `cp` the built `.war` to the `$WILDFLY_HOME/standalone/deployments` directory.

Start the application server if it's not already running, and you should then be able to bring the application up at `http://localhost:8080/$YOURAPP/hello/World`. Again, I've substituted `$YOURAPP` for the name of your application, as built.

## [](#to-the-cloud)To the Cloud!

No story about deployments would be complete without touching on the fastest growing deployment target today: the cloud! Of course, when we talk about cloud it helps to be specific: if you're talking about deploying to an Amazon Web Services or a Google Compute Engine, directly, then it's business as usual, just as though you were running the application on a Linux box on your own datacenter. Because, basically, that's what you're doing.

### [](#paas-deployment-on-cloud-foundry-and-heroku)PaaS Deployment on Cloud Foundry and Heroku

If you're trying to deploy the application to a Platform-as-a-service, Spring's vaunted portability buys you a lot of options here. Deployment to Heroku, especially with the fat-jar approach, is the status quo for Heroku since that platform as a service expects you to bring-your-own-container, anyway! Simply put the `java -jar` incantation in your `Procfile` and you're off to the races.

With Cloud Foundry you can deploy the application either standalone *or* as a `.war`\-style web application. Once you've built your application (using, for example, `mvn clean install`) and [installed the `cf` command line tool](http://docs.cloudfoundry.org/devguide/installcf/), simply answer the `cf push` command's prompts as I have below:

```sh
Copy➜  cf push --path target/demo-0.0.1-SNAPSHOT.jar

Name> $YOURAPP

Instances> 1

1: 128M
2: 256M
3: 512M
4: 1G
Memory Limit> 256M

Creating $YOURAPP... OK

1: $YOURAPP
2: none
Subdomain> $YOURAPP

1: cfapps.io
2: none
Domain> cfapps.io

Creating route $YOURAPP.cfapps.io... OK
Binding $YOURAPP.cfapps.io to $YOURAPP... OK

Create services for application?> n

Bind other services to application?> n

Save configuration?> y

Saving to manifest.yml... OK
Uploading $YOURAPP... OK
Preparing to start $YOURAPP... OK
-----> Downloaded app package (8.7M)
-----> Java Buildpack source: system
-----> Downloading Open JDK 1.7.0_51 from http://d2vm4m9hl67ira.cloudfront.net/openjdk/lucid/x86_64/openjdk-1.7.0_51.tar.gz (1.4s)
       Expanding Open JDK to .java-buildpack/open_jdk (1.3s)
-----> Downloading Spring Auto Reconfiguration 0.8.7 from http://d2vm4m9hl67ira.cloudfront.net/auto-reconfiguration/auto-reconfiguration-0.8.7.jar (0.0s)
-----> Uploading droplet (43M)
Checking status of app '$YOURAPP'...
  0 of 1 instances running (1 starting)
  0 of 1 instances running (1 starting)
  1 of 1 instances running (1 running)
Push successful! App '$YOURAPP' available at http://$YOURAPP.cfapps.io

```

The application shoud be up and running, and accessible from `http://$YOURAPP.cfapps.io/hello/Cloud%20Foundry` where, again, I've used `$YOURAPP` as a placeholder for the name of your application.

## [](#conclusion)Conclusion

Not bad for one little `Application` class and a few tweaks to a build-file!

Spring Boot aims to be production ready, by default. This means that it ships with useful defaults out of the box that may be overriden, if necessary. By default, Spring Boot provides an embedded Apache Tomcat build. By default, Spring Boot configures everything for you in a way that's most natural from development to production in today's platforms, as well as in the leading platforms-as-a-service.

Spring Boot provides plenty of opportunities to override the configuration, including configurable properties and customization callbacks.

Looking forward, I can already see another few posts continuing this discussion into things like management of Spring Boot applications via monitoring and management tools (JMX and JConsole, New Relic, etc.) as well as security concerns. Spring Boot, happily, provides answers for all of these concerns, and more.

## [](#your-next-steps-with---boot)Your Next Steps with Boot

The Spring Boot documentation is coming together rapidly as it moves to 1.0, and in the meantime there are many great resources to continue exploring. Check out [one of my favorite grab bag pages for tips 'n tricks, the *How To* document](https://github.com/spring-projects/spring-boot/blob/master/docs/howto.md) and don't forget to [check out the Spring IO guides](http://spring.io/guides), most of which build on Spring Boot!

I'd love to [carry this discussion forward online](http://twitter.com/starbuxman). I want to know what other questions you want answered in your investigation of Spring Boot, so don't be shy. I'll be doing [a virtual JUG on Spring Boot](http://www.meetup.com/virtualJUG/events/164640872/) on April 9th, 2014, live! The event is worldwide and interactive, so please bring your questions, comments and feedback.