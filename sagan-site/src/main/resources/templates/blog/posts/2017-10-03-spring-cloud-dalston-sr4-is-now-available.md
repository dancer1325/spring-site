---
title: Spring Cloud Dalston SR4 Is Now Available
source: https://spring.io/blog/2017/10/03/spring-cloud-dalston-sr4-is-now-available
scraped: 2026-02-23T16:19:56.238Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  October 03, 2017 | 1 Comment
---

# Spring Cloud Dalston SR4 Is Now Available

_Releases | Ryan Baxter |  October 03, 2017 | 1 Comment_

On behalf of the community, I am pleased to announce that Service Release 4 (SR4) of the [Spring Cloud Dalston](https://cloud.spring.io) Release Train is available today. The release can be found in the [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/) repository. You can check out the Dalston [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes).

The following modules were updated as part of Dalston.SR4:

Module

Version

Spring Cloud Contract

1.1.4.RELEASE

Spring Cloud Config

1.3.3.RELEASE

Spring Cloud Commons

1.2.4.RELEASE

Spring Cloud Netflix

1.3.5.RELEASE

Spring Cloud Sleuth

1.2.5.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Dalston.SR4</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Dalston.SR4'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```