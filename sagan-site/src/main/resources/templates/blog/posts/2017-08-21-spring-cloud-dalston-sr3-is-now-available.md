---
title: Spring Cloud Dalston SR3 Is Now Available
source: https://spring.io/blog/2017/08/21/spring-cloud-dalston-sr3-is-now-available
scraped: 2026-02-23T16:24:13.057Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  August 21, 2017 | 0 Comments
---

# Spring Cloud Dalston SR3 Is Now Available

_Releases | Ryan Baxter |  August 21, 2017 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 3 (SR3) of the [Spring Cloud Dalston](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Dalston.SR3/). You can check out the Dalston [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes).

This release is primarily a bug fix release and users are encouraged to upgrade.

The following modules were updated as part of Dalston.SR3:

Module

Version

Spring Cloud Zookeeper

1.1.2.RELEASE

Spring Cloud Sleuth

1.2.4.RELEASE

Spring Cloud Netflix

1.3.4.RELEASE

Spring Cloud Contract

1.1.3.RELEASE

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only)

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Dalston.SR3</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Dalston.SR3'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```