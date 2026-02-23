---
title: java-cfenv 1.0 GA Released
source: https://spring.io/blog/2019/03/04/java-cfenv-1-0-ga-released
scraped: 2026-02-23T14:56:31.330Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mark Pollack |  March 04, 2019 | 0 Comments
---

# java-cfenv 1.0 GA Released

_Releases | Mark Pollack |  March 04, 2019 | 0 Comments_

The java-cfenv library is a new library for accessing Cloud Foundry Services. For Spring Boot users, it extracts service credentials from the `VCAP_SERVICES` environment variable and sets well known Spring Boot auto-configuration properties.

You can find more about it in the [1.0 M1 release blog](https://spring.io/blog/2019/02/15/introducing-java-cfenv-a-new-library-for-accessing-cloud-foundry-services) as well as the [README](https://github.com/pivotal-cf/java-cfenv/blob/master/README.adoc).

In this release the following Cloud Foundry Services are supported

-   Databases - DB2, MySQL, Oracle, Postgresql, SqlServer
    
-   RabbitMQ
    
-   Cassandra
    
-   MongoDB
    
-   Redis
    
-   Pivotal Single Sign On
    

Of note, there is a new interface, [CfEnvProcessor](https://github.com/pivotal-cf/java-cfenv/blob/master/java-cfenv-boot/src/main/java/io/pivotal/cfenv/spring/boot/CfEnvProcessor.java) that simplifies what you need to write in order to provide integration with other Cloud Foundry services. The docs on [supporting other services](https://github.com/pivotal-cf/java-cfenv#supporting-other-services) has the details.

The 1.0 release is available in maven central through the dependency

```
Copy<dependency>
  <groupId>io.pivotal.cfenv</groupId>
  <artifactId>java-cfenv-boot</artifactId>
  <version>1.0.0.RELEASE</version>
</dependency>
```

We will be releasing a 1.0.1.RELEASE shortly to fix issues in config server client configuration when using Pivotal Spring Cloud Services tile.

Thanks to [Scott Frederick](https://spring.io/team/scottfrederick) and [David Turanski](https://spring.io/team/dturanski) for their contributions!