---
title: Spring for Apache Hadoop 2.1 Released
source: https://spring.io/blog/2015/02/09/spring-for-apache-hadoop-2-1-released
scraped: 2026-02-23T21:56:34.698Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  February 09, 2015 | 0 Comments
---

# Spring for Apache Hadoop 2.1 Released

_Releases | Thomas Risberg |  February 09, 2015 | 0 Comments_

It was about six months ago that we started work on the 2.1 version of Spring for Apache Hadoop. We are now pleased to announce the general availability of version 2.1.0.

Beginning with the Spring for Apache Hadoop 2.1 version, we now only support Hadoop 2.0 APIs and no longer provide backwards compatibility with older Hadoop v1 distributions. If you need support for older Hadoop versions please use the 2.0.4 or 1.1.0 versions of Spring for Apache Hadoop.

The main new features for the 2.1 version are:

**Configuration and Boot support**:

-   New @Configuration changes and improvements to the Boot auto configuration features. A good example of this support can be seen in the `boot-fsshell` `DemoApplication` example app

```
Copy@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	@Autowired
	private FsShell shell;

	@Override
	public void run(String... args) {
		for (FileStatus s : shell.lsr("/tmp")) {
			System.out.println("> " + s.getPath());
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
```

For the full sample, go to [https://github.com/spring-projects/spring-hadoop-samples/blob/master/boot/boot-fsshell](https://github.com/spring-projects/spring-hadoop-samples/blob/master/boot/boot-fsshell)

**Store**:

-   Added support for append mode in the HDFS store writers.
-   The Kite SDK dataset support updated to 0.17.0. This means there are some changes to the API. The use of a namespace in addition to the basePath is now mandatory. The DatasetTemplate now also uses ViewCallbacks instead of a partition expression for querying the data.

**YARN**:

-   Support for container grouping and clustering in Spring YARN, which brings functionality for running multiple container types within a single YARN application.
-   A new REST API for submitted apps and an improved application model with new client side commands and a command line shell.
-   To see examples of these features look at the `yarn-store-groups` [example app](https://github.com/spring-projects/spring-hadoop-samples/tree/master/boot/yarn-store-groups) or at the Spring XD implementation for [running on YARN](https://github.com/spring-projects/spring-xd/tree/master/spring-xd-yarn).

We continue to update support for the latest Hadoop versions. We now provide “flavored” versions for the following distributions:

-   Apache Hadoop 2.4.1 (2.1.0.RELEASE-hadoop24)
-   Apache Hadoop 2.5.2 (2.1.0.RELEASE-hadoop25)
-   Apache Hadoop 2.6.0 (2.1.0.RELEASE)
-   Pivotal HD 2.1 (2.1.0.RELEASE-phd21)
-   Cloudera CDH5 5.3.0 (2.1.0.RELEASE-cdh5)
-   Hortonworks HDP 2.2 (2.1.0.RELEASE-hdp22)

The default distribution version is now Apache Hadoop 2.6.0.

**Going forward**

With the Hadoop ecosystem moving at a rapid pace, we hope that more frequent releases will help us keep up. For the next version we are planning on adding the following:

-   Better Java Configuration support.
-   Add better support for for Hiveserver2 including a batch tasklet.
-   Basic support for a batch tasklet to run Spark apps.
-   Better boot support throughout the different modules.
-   Improved security support (i.e. the YARN Boot CLI interaction, etc).
-   Enhancements to have seamless integration with spring-cloud components (i.e. spring-cloud-cluster).

Please provide feedback and feature requests via JIRA issues or GitHub issues (see project page for links).

The project page is at - [http://projects.spring.io/spring-hadoop/](http://projects.spring.io/spring-hadoop/)