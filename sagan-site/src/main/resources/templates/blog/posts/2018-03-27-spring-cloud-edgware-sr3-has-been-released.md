---
title: Spring Cloud Edgware.SR3 Has Been Released
source: https://spring.io/blog/2018/03/27/spring-cloud-edgware-sr3-has-been-released
scraped: 2026-02-23T15:30:27.426Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  March 27, 2018 | 0 Comments
---

# Spring Cloud Edgware.SR3 Has Been Released

_Releases | Ryan Baxter |  March 27, 2018 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 3 (SR3) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Edgware.SR3/). You can check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

## [](#notable-changes-in-the-edgware-release-train)Notable Changes in the Edgware Release Train

### [](#spring-cloud-contract)Spring Cloud Contract

-   Updated Wiremock to 2.15.0
-   By setting a system property `stubrunner.snapshot-check-skip` or environment variable `STUBRUNNER_SNAPSHOT_CHECK_SKIP` equal to `true` you can disable the SNAPSHOT assertion of downloaded stubs jar, e.g. in a CI server.
-   Bug fixes

### [](#spring-cloud-consul)Spring Cloud Consul

-   Bug fixes

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   Bug fixes

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   Bug fixes

### [](#spring-cloud-config)Spring Cloud Config

-   Bug fixes

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   Updated Eureka to 1.7.2
-   Updated XStream to 1.4.10
-   Bug fixes

### [](#spring-cloud-commons)Spring Cloud Commons

-   Bug fixes

The following modules were updated as part of Edgware.SR3:

Module

Version

Spring Cloud Contract

1.2.4.RELEASE

Spring Cloud Consul

1.3.3.RELEASE

Spring Cloud Zookeeper

1.2.1.RELEASE

Spring Cloud Sleuth

1.3.3.RELEASE

Spring Cloud Config

1.4.3.RELEASE

Spring Cloud Netflix

1.4.4.RELEASE

Spring Cloud Commons

1.3.3.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.SR3</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.SR3'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```