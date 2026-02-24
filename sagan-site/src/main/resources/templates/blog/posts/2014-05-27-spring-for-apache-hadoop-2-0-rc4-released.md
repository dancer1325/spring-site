---
title: Spring for Apache Hadoop 2.0 RC4 released
source: https://spring.io/blog/2014/05/27/spring-for-apache-hadoop-2-0-rc4-released
scraped: 2026-02-23T22:29:41.864Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  May 27, 2014 | 0 Comments
---

# Spring for Apache Hadoop 2.0 RC4 released

_Releases | Thomas Risberg |  May 27, 2014 | 0 Comments_

We are happy to announce that Spring for Apache Hadoop version 2.0 RC4 is now available.

---

> ***Now includes simplified support for building YARN applications***

---

We are getting close to a GA release of Spring for Apache Hadoop 2.0. Based on feedback from using the Spring Boot support for YARN in the Spring XD project, we have refined the programming model we use for developing YARN applications.

### [](#the-challenge)The challenge

We keep challenging [Janne](http://blog.gopivotal.com/pivotal/pivotal-people/pivotal-people-janne-valkealahti-spring-yarn-master-and-open-source-software-engineer) to make the model simpler. The latest challenge was to make it possible to write a single Java source file plus one configuration file and keep it under 50 lines. I think we came pretty close:

```java
Copy@ComponentScan
@EnableAutoConfiguration
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @YarnComponent
    @Profile("container")
    public static class HelloPojo {

        private static final Log log = LogFactory.getLog(HelloPojo.class);

        @OnContainerStart
        public void onStart() throws Exception {
            log.info("Hello from YARN!");
        }
    }

}
```

```yml
Copyspring:
    hadoop:
        fsUri: hdfs://localhost:8020
        resourceManagerHost: localhost
    yarn:
        appName: yarn-demo
        applicationDir: /apps/yarn-demo/
        client:
            startup:
                action: submit
            localizer:
                patterns:
                  - "yarn-demo*jar"
            files:
              - "file:target/yarn-demo-0.1.0.jar"
            launchcontext:
                archiveFile: yarn-demo-0.1.0.jar
        appmaster:
            localizer:
                patterns:
                  - "yarn-demo*jar"
            containerCount: 1
            launchcontext:
                archiveFile: yarn-demo-0.1.0.jar
                arguments:
                    --spring.profiles.active: container
```

Using the `spring-boot-maven-plugin` the build creates a single jar containing all the dependencies. This jar is then uploaded to HDFS and localized when the application is submitted to YARN. The `@Profile("container")` annotation makes sure this bean is only used for the actual YARN container and not when the YARN client or YARN appmaster is executed.

The source code, including a Maven build script, and instructions for running the app are available in [my GitHub repo](https://github.com/trisberg/yarn-demo).

###The release

The default distribution for the Spring for Apache Hadoop 2.0 releases is the current Apache Hadoop 2 stable release which is 2.2.0.

We continue to provide version specific artifacts with their respective transitive dependencies in the Spring IO milestone repository:

-   2.0.0.RC4 (default - Apache Hadoop stable 2.2.0)
-   2.0.0.RC4-hadoop12 (Apache Hadoop stable 1.2.1)
-   2.0.0.RC4-phd1 (Pivotal HD 1.1)
-   2.0.0.RC4-phd20 (Pivotal HD 2.0)
-   2.0.0.RC4-cdh4 (Cloudera CDH4 MR1)
-   2.0.0.RC4-cdh5 (Cloudera CDH5 YARN)
-   2.0.0.RC4-hdp13 (Hortonworks HDP 1.3)
-   2.0.0.RC4-hdp20 (Hortonworks HDP 2.0)
-   2.0.0.RC4-hdp21 (Hortonworks HDP 2.1)

For instructions on how to build with these versions see the [project wiki](https://github.com/spring-projects/spring-hadoop/wiki#building-using-supported-distributions).

For more project specific information please see the [project page](http://projects.spring.io/spring-hadoop/).