---
title: Spring Cloud Edgware.SR2 Released
source: https://spring.io/blog/2018/02/09/spring-cloud-edgware-sr2-released
scraped: 2026-02-23T16:09:34.868Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  February 09, 2018 | 0 Comments
---

# Spring Cloud Edgware.SR2 Released

_Releases | Ryan Baxter |  February 09, 2018 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 2 (SR2) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Edgware.SR2/). You can check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

## [](#notable-changes-in-the-edgware-release-train)Notable Changes in the Edgware Release Train

### [](#spring-cloud-commons)Spring Cloud Commons

[Issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/41?closed=1)

### [](#spring-cloud-contract)Spring Cloud Contract

[Issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/29?closed=1)

### [](#spring-cloud-config)Spring Cloud Config

[Issues](https://github.com/spring-cloud/spring-cloud-config/milestone/43?closed=1)

### [](#spring-cloud-consul)Spring Cloud Consul

[Issues](https://github.com/spring-cloud/spring-cloud-config/milestone/43?closed=1)

### [](#spring-cloud-netflix)Spring Cloud Netflix

[Issues](https://github.com/spring-cloud/spring-cloud-config/milestone/43?closed=1)

### [](#spring-cloud-bus)Spring Cloud Bus

[Issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/26?closed=1)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

[Issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/41?closed=1)

The following modules were updated as part of Edgware.SR2:

Module

Version

Spring Cloud Commons

1.3.2.RELEASE

Spring Cloud Contract

1.2.3.RELEASE

Spring Cloud Config

1.4.2.RELEASE

Spring Cloud Build

1.3.8.RELEASE

Spring Boot

1.5.10.RELEASE

Spring Cloud Consul

1.3.2.RELEASE

Spring Cloud Netflix

1.4.3.RELEASE

Spring Cloud Bus

1.3.3.RELEASE

Spring Cloud Sleuth

1.3.2.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.SR2</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.SR2'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```