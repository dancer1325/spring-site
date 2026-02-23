---
title: Spring Cloud Edgware.SR1 Released
source: https://spring.io/blog/2018/01/16/spring-cloud-edgware-sr1-released
scraped: 2026-02-23T16:11:22.305Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  January 16, 2018 | 0 Comments
---

# Spring Cloud Edgware.SR1 Released

_Releases | Ryan Baxter |  January 16, 2018 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 1 (SR1) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Edgware.SR1/). You can check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

The following modules were updated as part of Edgware.SR1:

Module

Version

Spring Cloud Gateway

1.0.1.RELEASE

Spring Cloud Stream

Ditmars.SR3

Spring Cloud Config

1.4.1.RELEASE

Spring Cloud Netflix

1.4.2.RELEASE

Spring Cloud Commons

1.3.1.RELEASE

Spring Cloud Consul

1.3.1.RELEASE

Spring Cloud Sleuth

1.3.1.RELEASE

Spring Cloud Security

1.2.2.RELEASE

Spring Cloud Contract

1.2.2.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.SR1</version>
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
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.SR1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```