---
title: Spring Cloud Dalston SR1
source: https://spring.io/blog/2017/05/24/spring-cloud-dalston-sr1
scraped: 2026-02-23T16:30:58.447Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  May 24, 2017 | 0 Comments
---

# Spring Cloud Dalston SR1

_Releases | Spencer Gibb |  May 24, 2017 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 1 (SR1) of the [Spring Cloud Dalston](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Dalston.SR1/). It is mostly a bugfix and documentation update. You can check out the Dalston [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes).

The following modules were updated as part of Dalston.SR1:

Module

Version

Spring Cloud Aws

1.2.1.RELEASE

Spring Cloud Bus

1.3.1.RELEASE

Spring Cloud Commons

1.2.2.RELEASE

Spring Cloud Config

1.3.1.RELEASE

Spring Cloud Consul

1.2.1.RELEASE

Spring Cloud Contract

1.1.1.RELEASE

Spring Cloud Netflix

1.3.1.RELEASE

Spring Cloud Security

1.2.1.RELEASE

Spring Cloud Sleuth

1.2.1.RELEASE

Spring Cloud Stream

Chelsea.SR2

Spring Cloud Vault

1.0.1.RELEASE

Spring Cloud Zookeeper

1.1.1.RELEASE

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only)

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Dalston.SR1</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Dalston.SR1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```