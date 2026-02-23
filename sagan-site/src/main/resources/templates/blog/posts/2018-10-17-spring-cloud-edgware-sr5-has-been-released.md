---
title: Spring Cloud Edgware.SR5 Has Been Released
source: https://spring.io/blog/2018/10/17/spring-cloud-edgware-sr5-has-been-released
scraped: 2026-02-23T15:10:00.196Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  October 17, 2018 | 0 Comments
---

# Spring Cloud Edgware.SR5 Has Been Released

_Releases | Ryan Baxter |  October 17, 2018 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 5 (SR5) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. You can find the release in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Edgware.SR5/). You can also check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

## [](#notable-changes-in-the-edgware-release-train)Notable Changes in the Edgware Release Train

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-commons/issues?q=is%3Aclosed+milestone%3A1.3.5.RELEASE)

### [](#spring-cloud-config)Spring Cloud Config

-   [Documentation and Bug fixes](https://github.com/spring-cloud/spring-cloud-config/issues?q=is%3Aclosed+milestone%3A1.4.5.RELEASE)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=is%3Aclosed+milestone%3A1.2.6.RELEASE)

Via [#707](https://github.com/spring-cloud/spring-cloud-contract/pull/707) we've a test listener that handles issues with closing and starting WireMock servers. Thanks to this change you no longer need to set the `@DirtiesContext` on your tests if you want to reuse the same ports for your stubs.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A1.3.5.RELEASE)

Via [#1077](https://github.com/spring-cloud/spring-cloud-sleuth/issues/1077) we've added support for single header B3 propagation.

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=is%3Aclosed+milestone%3A1.4.6.RELEASE)

### [](#spring-cloud-vault)Spring Cloud Vault

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-vault/issues?q=is%3Aclosed+milestone%3A1.1.2)

### [](#spring-cloud-consul)Spring Cloud Consul

-   [Bug fixes](https://github.com/spring-cloud/spring-cloud-consul/issues?q=is%3Aclosed+milestone%3A1.3.5.RELEASE)

The following modules were updated as part of Edgware.SR5:

Module

Version

Spring Cloud AWS

1.2.3.RELEASE

Spring Cloud Contract

1.2.6.RELEASE

Spring Cloud Consul

1.3.5.RELEASE

Spring Cloud Zookeeper

1.2.2.RELEASE

Spring Cloud Sleuth

1.3.5.RELEASE

Spring Cloud Config

1.4.5.RELEASE

Spring Cloud Netflix

1.4.6.RELEASE

Spring Cloud Commons

1.3.5.RELEASE

Spring Cloud Bus

1.3.4.RELEASE

Spring Cloud Security

1.2.3.RELEASE

Spring Cloud Cloudfoundry

1.1.2.RELEASE

Spring Cloud Function

1.0.1.RELEASE

Spring Cloud Vault

1.1.2.RELEASE

Spring Cloud Gateway

1.0.2.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.SR5</version>
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

Or, with Gradle:

```
Copybuildscript {
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.SR5'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```