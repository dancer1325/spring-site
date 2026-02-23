---
title: Spring Cloud Dalston.SR5 Released
source: https://spring.io/blog/2017/12/28/spring-cloud-dalston-sr5-released
scraped: 2026-02-23T16:11:51.293Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 28, 2017 | 1 Comment
---

# Spring Cloud Dalston.SR5 Released

_Releases | Ryan Baxter |  December 28, 2017 | 1 Comment_

On behalf of the community, I am pleased to announce that the Service Release 5 (SR5) of the [Spring Cloud Dalston](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Dalston.SR5/). You can check out the Dalston [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes).

## [](#notable-changes-in-the-dalston-release-train)Notable Changes in the Dalston Release Train

### [](#spring-cloud-contract)Spring Cloud Contract

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/milestone/22?closed=1)

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-cloudfoundry/milestone/7?closed=1)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/35?closed=1)

### [](#spring-cloud-consul)Spring Cloud Consul

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-consul/milestone/24?closed=1)

### [](#spring-cloud-config)Spring Cloud Config

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/milestone/38?closed=1)

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/16?closed=1)

### [](#spring-cloud-netflix)Spring Cloud Netflix

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/milestone/51?closed=1)

### [](#spring-cloud-commons)Spring Cloud Commons

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/milestone/35?closed=1)

The following modules were updated as part of Dalston.SR5:

Module

Version

Spring Cloud Contract

1.1.5.RELEASE

Spring Cloud Cloudfoundry

1.1.1.RELEASE

Spring Cloud Task

1.1.2.RELEASE

Spring Cloud Sleuth

1.2.6.RELEASE

Spring Cloud Consul

1.2.3.RELEASE

Spring Cloud Stream

Chelsea.SR2

Spring Cloud Aws

1.2.1.RELEASE

Spring Cloud Security

1.2.1.RELEASE

Spring Cloud Bus

1.3.1.RELEASE

Spring Cloud Config

1.3.4.RELEASE

Spring Cloud Zookeeper

1.1.3.RELEASE

Spring Cloud Netflix

1.3.6.RELEASE

Spring Cloud Vault

1.0.2.RELEASE

Spring Cloud Commons

1.2.5.RELEASE

Spring Boot

1.5.9.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Dalston.SR5</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Dalston.SR5'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```