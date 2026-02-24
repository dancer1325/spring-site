---
title: Spring YARN Application Model
source: https://spring.io/blog/2014/02/06/spring-yarn-application-model
scraped: 2026-02-24T07:42:42.877Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Janne Valkealahti |  February 06, 2014 | 2 Comments
---

# Spring YARN Application Model

_Engineering | Janne Valkealahti |  February 06, 2014 | 2 Comments_

Now that Thomas has just [released](https://spring.io/blog/2014/02/06/spring-for-apache-hadoop-2-0-m5-released) a fifth milestone for Spring for Apache Hadoop, I'd like to use this opportunity to talk about recent development in its new feature, Spring YARN.

One strength in our [Spring IO Platform](https://spring.io/platform) is interoperability of its technologies. Great example of this is how Spring Boot and Spring YARN are able work together to create a better model for Hadoop YARN application development. In this blog post I'd like to show an example of a new Spring Yarn Application model which is heavily based on [Spring Boot](http://projects.spring.io/spring-boot).

# [](#spring-yarn-intro)Spring YARN Intro

Development life cycle from a moment when a developer starts his work to a point when someone actually executes an application on a Hadoop cluster is a bit more complicated than just creating a few lines of code. Lets see what needs to be considered:

-   What is a project structure for an application code
-   How project is build and packaged
-   How packaged application is configured
-   How application is executed

We believe that Spring YARN and Spring Boot provides a simple programming model to develop applications than can easily be test and deployed as either a YARN application or a traditional application.

At a high level, Spring YARN provides three components, `YarnClient`, `YarnAppmaster` and `YarnContainer` that mirror the key processes in the YARN architecture. Taken together, these three components provide the foundation of the Spring YARN application model.

It has always been a cumbersome process to get your own code packaged and executed on a Hadoop cluster. One need to put compiled package in Hadoop's classpath or let Hadoop's tools to copy your package into Hadoop during a job submission. Once you get past WordCount, your code will depend on third party libraries that are not present in Hadoop's default classpath. How should you package you dependent libraries? Furthermore, what if your dependencies collide with libraries already part of Hadoop's default classpath.

Spring Boot helps to provide an elegant solution to these build and packaging issues. You either create an executable jar(sometimes called as uber or fat jar) which bundles your application code and all its dependencies into a single .jar file or create a zip file which can be exploded before code is about to be executed. The main difference between the two packaging formats is that the latter lets you re-use jars that are already available on Hadoop's default classpath.

In this guide we are going to show how these 3 components, `YarnClient`, `YarnAppmaster` and `YarnContainer` are packaged into executable jars using Spring Boot. Internally Spring Boot rely heavy on application auto-configuration and Spring YARN adds its own auto-configuration magic. User can then concentrate on his or her own code and application configuration instead of spending a lot of time trying to understand how all the components should integrate with each others.

We will now show you how simple it is to create and deploy a custom application to a Hadoop cluster. Notice that there are no need to use XML.

# [](#create-a-yarn-container)Create a Yarn Container

Here you create `ContainerApplication` and `HelloPojo` classes.

```java
Copy@Configuration
@EnableAutoConfiguration
public class ContainerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContainerApplication.class, args);
	}

	@Bean
	public HelloPojo helloPojo() {
		return new HelloPojo();
	}

}
```

In above `ContainerApplication`, notice how we added `@Configuration` in a class level itself and `@Bean` for a `helloPojo()` method. We previously mentioned `YarnContainer` component which is an interface towards what you'd execute in your containers. You could define your custom `YarnContainer` to implement this interface and wrap all logic inside of that implementation.

However, Spring YARN defaults to a `DefaultYarnContainer` if none is defined and this default implementation expects to find a specific bean having the real logic what container is supposed to do. This effectively creates a simple model where, at minimum, only a simple `POJO` is needed.

```java
Copy@YarnContainer
public class HelloPojo {

	private static final Log log = LogFactory.getLog(HelloPojo.class);

	@Autowired
	private Configuration configuration;

	@OnYarnContainerStart
	public void publicVoidNoArgsMethod() {
		log.info("Hello from HelloPojo");
		log.info("About to list from hdfs root content");
		FsShell shell = new FsShell(configuration);
		for (FileStatus s : shell.ls(false, "/")) {
			log.info(s);
		}
	}

}
```

`HelloPojo` class is a simple `POJO` in a sense that it doesn't extend any Spring YARN base classes. What we did in this class:

-   We've added a class level `@YarnContainer` annotation.
-   We've added a method level `@OnYarnContainerStart` annotation
-   We've `@Autowired` a Hadoop's `Configuration` class

`@YarnContainer` is a stereotype annotation itself having a Spring's `@Component` defined in it. This is automatically marking a class to be a candidate having a `@YarnContainer` functionality.

Within this class we can use `@OnYarnContainerStart` annotation to mark a public method having no return type or arguments act as something what needs to be executed on Hadoop.

To demonstrate that we actually have some real functionality in this class, we simply use Spring Hadoop's `@FsShell` to list entries from a root of a `HDFS` file system. For this we need to have access to Hadoop's `Configuration` which is prepared for you so that you can just autowire it.

# [](#create-a-yarn-client)Create a Yarn Client

Here you create a `ClientApplication` class.

```java
Copy@EnableAutoConfiguration
public class ClientApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClientApplication.class, args)
			.getBean(YarnClient.class)
			.submitApplication();
	}

}
```

-   `@EnableAutoConfiguration` tells Spring Boot to start adding beans based on classpath setting, other beans, and various property settings.
-   Specific auto-configuration for Spring YARN components takes place since Spring YARN is on the classpath.

The `main()` method uses Spring Boot's `SpringApplication.run()` method to launch an application. From there we simply request a bean of type `YarnClient` and execute its `submitApplication()` method. What happens next depends on application configuration, which we go through later in this guide.

# [](#create-a-yarn-appmaster)Create a Yarn Appmaster

Here you create an `AppmasterApplication` class.

```java
Copy@EnableAutoConfiguration
public class AppmasterApplication {

	public static void main(String[] args) {
		SpringApplication.run(AppmasterApplication.class, args);
	}

}
```

Application class for `YarnAppmaster` looks even simpler than what we just did for `ClientApplication`. Again the `main()` method uses Spring Boot's `SpringApplication.run()` method to launch an application.

One might argue that if you use this type of dummy class to basically fire up your application, could we just use a generic class for this? Well simple answer is yes, we even have a generic `SpringYarnBootApplication` class just for this purpose. You'd define that to be your main class for an executable jar and you'd accomplish this during the gradle build.

In real life, however, you most likely need to start adding more custom functionality to your application component and you'd do that by start adding more beans. To do that you need to define a Spring `@Configuration` or `@ComponentScan`. `AppmasterApplication` would then act as your main starting point to define more custom functionality.

# [](#create-an-application-configuration)Create an Application Configuration

Create a new `yaml` configuration file.

```yaml
Copyspring:
  yarn:
    appName: yarn-boot-simple
    applicationDir: /app/yarn-boot-simple/
    fsUri: hdfs://localhost:8020
    rmAddress: localhost:8032
    schedulerAddress: localhost:8030
    client:
      appmasterFile: yarn-boot-simple-appmaster-0.1.0.jar
      files:
       - "file:build/libs/yarn-boot-simple-container-0.1.0.jar"
       - "file:build/libs/yarn-boot-simple-appmaster-0.1.0.jar"
    appmaster:
      containerCount: 1
      containerFile: yarn-boot-simple-container-0.1.0.jar
```

Final part for your application is its runtime configuration which glues all the components together which then can be called as a Spring YARN application. This configuration act as source for Spring Boot's `@ConfigurationProperties` and contains relevant configuration properties which cannot be auto-discovered or otherwise needs to have an option to be overwritten by an end user.

You can then write your own defaults for your own environment. Because these `@ConfigurationProperties` are resolved at runtime by Spring Boot, you even have an easy option to overwrite these properties either by using command-line options or provide additional configuration property files.

# [](#build-the-application)Build the application

Sample code used in this blog can be found from our [spring-hadoop-samples](https://github.com/spring-projects/spring-hadoop-samples) repo on GitHub.

Once you checkout our samples, issue a gradle build command from `boot/yarn-boot-simple` directory.

```text
Copy$ cd boot/yarn-boot-simple
$ ./gradlew clean build
```

For this sample we wanted to keep the project structure simple. We don't go through the gradle build file in this blog but the sort story is that we will create three different jar files from one project. In reality, one would probably use a multi-project model where each sub-project creates its own jar file.

# [](#run-the-application)Run the application

Now that you've successfully compiled and packaged your application, it's time to do the fun part and execute it on a Hadoop YARN.

Below listing shows files after a succesfull gradle build.

```text
Copy$ ls -lt build/libs/
-rw-r--r-- 1 hadoop hadoop 35975001 Feb  2 17:39 yarn-boot-simple-container-0.1.0.jar
-rw-r--r-- 1 hadoop hadoop 35973937 Feb  2 17:39 yarn-boot-simple-client-0.1.0.jar
-rw-r--r-- 1 hadoop hadoop 35973840 Feb  2 17:39 yarn-boot-simple-appmaster-0.1.0.jar
```

Simply run your executable client jar.

```text
Copy$ java -jar build/libs/yarn-boot-simple-client-0.1.0.jar
```

Using a Resource Manager UI you can see status of an application.

![Resource Manager UI](https://raw.github.com/spring-projects/spring-hadoop-samples/master/boot/yarn-boot-simple/rm-ui.png)

To find Hadoop's application logs, do a little find within a configured userlogs directory.

```text
Copy$ find hadoop/logs/userlogs/|grep std
hadoop/logs/userlogs/application_1391348442831_0001/container_1391348442831_0001_01_000002/Container.stdout
hadoop/logs/userlogs/application_1391348442831_0001/container_1391348442831_0001_01_000002/Container.stderr
hadoop/logs/userlogs/application_1391348442831_0001/container_1391348442831_0001_01_000001/Appmaster.stdout
hadoop/logs/userlogs/application_1391348442831_0001/container_1391348442831_0001_01_000001/Appmaster.stderr
```

Grep output logged by `HelloPojo` class.

```text
Copy$ grep HelloPojo hadoop/logs/userlogs/application_1391348442831_0001/container_1391348442831_0001_01_000002/Container.stdout
[2014-02-02 17:40:38,314] boot - 11944  INFO [main] --- HelloPojo: Hello from HelloPojo
[2014-02-02 17:40:38,315] boot - 11944  INFO [main] --- HelloPojo: About to list from hdfs root content
[2014-02-02 17:40:41,134] boot - 11944  INFO [main] --- HelloPojo: FileStatus{path=hdfs://localhost:8020/; isDirectory=true; modification_time=1390823919636; access_time=0; owner=root; group=supergroup; permission=rwxr-xr-x; isSymlink=false}
[2014-02-02 17:40:41,135] boot - 11944  INFO [main] --- HelloPojo: FileStatus{path=hdfs://localhost:8020/app; isDirectory=true; modification_time=1391203430490; access_time=0; owner=jvalkealahti; group=supergroup; permission=rwxr-xr-x; isSymlink=false}
```

Congratulations! You've just developed a Spring YARN application!