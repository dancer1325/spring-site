---
title: Spring Cloud Dalston SR2 is available now
source: https://spring.io/blog/2017/07/21/spring-cloud-dalston-sr2-is-available-now
scraped: 2026-02-23T16:26:49.176Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  July 21, 2017 | 0 Comments
---

# Spring Cloud Dalston SR2 is available now

_Releases | Spencer Gibb |  July 21, 2017 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 2 (SR2) of the [Spring Cloud Dalston](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Dalston.SR2/). You can check out the Dalston [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes).

This release is primarily a bug fix release and users are encouraged to upgrade.

## [](#end-of-life-for-angel-and-brixton-release-trains)End of Life for Angel and Brixton release trains

The Angel and Brixton release trains have reached their end of life. As such, there will be no more releases to those trains. The community is encouraged to upgrade to Camden.SR7 or Dalston.SR2.

The following modules were updated as part of Dalston.SR2:

Module

Version

Spring Cloud Commons

1.2.3.RELEASE

Spring Cloud Config

1.3.2.RELEASE

Spring Boot

1.5.4.RELEASE

Spring Cloud Task

1.1.2.RELEASE

Spring Cloud Build

1.3.3.RELEASE

Spring Cloud Zookeeper

1.1.1.RELEASE

Spring Boot Starter

1.5.4.RELEASE

Spring Cloud Cloudfoundry

1.1.0.RELEASE

Spring Cloud Stream

Chelsea.SR2

Spring Cloud Aws

1.2.1.RELEASE

Spring Cloud Dependencies

1.3.3.RELEASE

Spring Cloud Security

1.2.1.RELEASE

Spring Cloud Bus

1.3.1.RELEASE

Spring Cloud Sleuth

1.2.2.RELEASE

Spring Cloud Netflix

1.3.2.RELEASE

Spring Cloud Contract

1.1.2.RELEASE

Spring Cloud Vault

1.0.2.RELEASE

Spring Cloud Consul

1.2.1.RELEASE

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only)

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Dalston.SR2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-config</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka</artifactId>
    </dependency>
    ...
</dependencies>
```

or with Gradle:

```
Copybuildscript {
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Dalston.SR2'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```