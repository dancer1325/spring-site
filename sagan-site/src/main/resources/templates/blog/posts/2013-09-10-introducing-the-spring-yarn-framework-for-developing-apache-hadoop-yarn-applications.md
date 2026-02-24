---
title: Introducing the Spring YARN framework for developing Apache Hadoop YARN applications
source: https://spring.io/blog/2013/09/10/introducing-the-spring-yarn-framework-for-developing-apache-hadoop-yarn-applications
scraped: 2026-02-24T07:58:43.257Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  September 10, 2013 | 5 Comments
---

# Introducing the Spring YARN framework for developing Apache Hadoop YARN applications

_Releases | Janne Valkealahti |  September 10, 2013 | 5 Comments_

We're super excited to let the cat out of the bag and release support for writing YARN based applications as part of the [Spring for Apache Hadoop 2.0 M1 release](http://www.springsource.org/node/22687). In this blog post I’ll introduce you to [YARN](http://hadoop.apache.org/docs/r2.0.6-alpha/hadoop-yarn/hadoop-yarn-site/YARN.html), what you can do with it, and how Spring simplifies the development of YARN based applications.

If you have been following the Hadoop community over the past year or two, you’ve probably seen a lot of discussions around YARN and the next version of Hadoop's MapReduce called MapReduce v2. YARN (Yet Another Resource Negotiator) is a component of the MapReduce project created to overcome some performance issues in Hadoop's original design. The fundamental idea of MapReduce v2 is to split the functionalities of the JobTracker, Resource Management and Job Scheduling/Monitoring, into separate daemons. The idea is to have a global Resource Manager (RM) and a per-application Application Master (AM). A generic diagram for YARN component dependencies can be found from [YARN architecture](http://hadoop.apache.org/docs/current/hadoop-yarn/hadoop-yarn-site/yarn_architecture.gif).

MapReduce Version 2 is an application running on top of YARN. It is also possible to make similar custom YARN based application which have nothing to do with MapReduce, it is simply running YARN application. However, writing a custom YARN based application is difficult. The YARN APIs are low-level infrastructure APIs and not developer APIs. Take a look at the [documentation](http://static.springsource.org/spring-hadoop/docs/2.0.0.M1/reference/html/yarn.html) for writing a YARN application to get an idea of what is involved.

Starting with the 2.0 version, Spring for Apache Hadoop introduces the Spring YARN sub-project to provide support for building Spring based YARN applications. This support for YARN steps in by trying to make development easier. “Spring handles the infrastructure so you can focus on your [application](http://static.springsource.org/spring/docs/3.2.x/spring-framework-reference/html/overview.html)” applies to writing Hadoop applications as well as other types of Java applications. Spring’s YARN support also makes it easier to test your YARN application.

With Spring’s YARN support, you're going to use all familiar concepts of Spring Framework itself, including configuration and generally speaking what you can do in your application. At a high level, Spring YARN provides three different components, *YarnClient*, *YarnAppmaster* and *YarnContainer* which together can be called a Spring YARN Application. We provide default implementations for all components while still giving the end user an option to customize as much as he or she wants. Lets take a quick look at a very simplistic Spring YARN application which runs some custom code in a Hadoop cluster.

The *YarnClient* is used to communicate with YARN's Resource Manager. This provides management actions like submitting new application instances, listing applications and killing running applications. When submitting applications from the *YarnClient*, the main concerns relate to how the Application Master is configured and launched. Both the *YarnAppmaster* and *YarnContainer* share the same common launch context config logic so you'll see a lot of similarities in YarnClient and YarnAppmaster configuration. Similar to how the *YarnClient* will define the launch context for the *YarnAppmaster*, the *YarnAppmaster* defines the launch context for the *YarnContainer*. The Launch context defines the commands to start the container, localized files, command line parameters, environment variables and resource limits(memory, cpu).

The *YarnContainer* is a worker that does the heavy lifting of what a YARN application will actually do. The YarnAppmaster is communicating with YARN Resource Manager and starts and stops YarnContainers accordingly.

You can create a Spring application that launches an ApplicationMaster by using the YARN XML namespace to define a Spring Application Context. Context configuration for YarnClient defines the launch context for YarnAppmaster. This includes resources and libraries needed by YarnAppmaster and its environment settings. An example of this is shown below.

```xml
Copy<yarn:configuration />

<yarn:localresources>
  <yarn:hdfs path="/path/to/my/libs/*.jar"/>
</yarn:localresources>

<yarn:environment>
  <yarn:classpath/>
</yarn:environment>

<yarn:client app-name="my-yarn-app">
  <yarn:master-runner />
</yarn:client>
```

Note: Future releases will provide a Java based API for configuration, [similar to what is done in Spring Security 3.2](http://blog.springsource.org/2013/07/02/spring-security-java-config-preview-introduction/).

The purpose of *YarnAppmaster* is to control the instance of a running application. The *YarnAppmaster* is responsible for controlling the lifecycle of all its *YarnContainers*, the whole running application after the application is submitted, as well as itself.

```xml
Copy<yarn:configuration />

<yarn:localresources>
  <yarn:hdfs path="/path/to/my/libs/*.jar"/>
</yarn:localresources>

<yarn:environment>
  <yarn:classpath/>
</yarn:environment>

<yarn:master>
  <yarn:container-allocator/>
  <yarn:container-runner/>
</yarn:master>
```

The example above is defining a context configuration for the *YarnAppmaster*. Similar to what we saw in *YarnClient* configuration, we define local resources for the *YarnContainer* and its environment. The classpath setting picks up hadoop jars as well as your own application jars in default locations, change the setting if you want to use non-default directories. Also within the *YarnAppmaster* we define components handling the container allocation and bootstrapping. Allocator component is interacting with YARN resource manager handling the resource scheduling. Runner component is responsible for bootstrapping of allocated containers.

```xml
Copy<yarn:container container-class="org.example.MyCustomYarnContainer"/>
```

Above example defines a simple *YarnContainer* context configuration.

To implement the functionality of the container, you implement the interface YarnContainer. The YarnContainer interface is similar to Java’s Runnable interface, its has a run() method, as well as two additional methods related to getting environment and command line information.

Below is a simple hello world application that will be run inside of a YARN container:

```java
Copypublic class MyCustomYarnContainer implements YarnContainer {

  private static final Log log = LogFactory.getLog(MyCustomYarnContainer.class);

  @Override
  public void run() {
    log.info("Hello from MyCustomYarnContainer");
  }

  @Override
  public void setEnvironment(Map<String, String> environment) {}

  @Override
  public void setParameters(Properties parameters) {}

}
```

We just showed the configuration of a Spring YARN Application and the core application logic so what remains is how to bootstrap the application to run inside the Hadoop cluster. The utility class, CommandLineClientRunner provides this functionality.

You can you use CommandLineClientRunner either manually from a command line or use it from your own code.

```
Copy# java -cp <mile long classpath> org.springframework.yarn.client.CommandLineClientRunner application-context.xml yarnClient -submit
```

A Spring YARN Application is packaged into a jar file which then can be transferred into HDFS with the rest of the dependencies. A YarnClient can transfer all needed libraries into HDFS during the application submit process but generally speaking it is more advisable to do this manually in order to avoid unnecessary network I/O. Your application wont change until new version is created so it can be copied into HDFS prior the first application submit. You can i.e. use Hadoop's *hdfs dfs -copyFromLocal* command.

Below you can see an example of a typical project setup.

```
Copysrc/main/java/org/example/MyCustomYarnContainer.java
src/main/resources/application-context.xml
src/main/resources/appmaster-context.xml
src/main/resources/container-context.xml
```

As a wild guess, we'll make a bet that you have now figured out that you are not actually configuring YARN, instead you are configuring Spring Application Contexts for all three components, *YarnClient*, *YarnAppmaster* and *YarnContainer*.

We have just scratched the surface of what we can do with Spring YARN. While we’re preparing more blog posts, go ahead and check existing samples in [GitHub](https://github.com/SpringSource/spring-hadoop-samples/tree/master/yarn). Basically, to reflect the concepts we described in this blog post, see the [multi-context](https://github.com/SpringSource/spring-hadoop-samples/tree/master/yarn/yarn/multi-context) example in our samples repository.

Future blog posts will cover topics like [Unit Testing](http://static.springsource.org/spring-hadoop/docs/2.0.0.M1/reference/html/yarn.html#yarn:testing) and more advanced YARN application development.