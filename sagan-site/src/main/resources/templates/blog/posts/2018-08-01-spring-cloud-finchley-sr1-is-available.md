---
title: Spring Cloud Finchley.SR1 Is Available
source: https://spring.io/blog/2018/08/01/spring-cloud-finchley-sr1-is-available
scraped: 2026-02-23T15:17:08.713Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  August 01, 2018 | 0 Comments
---

# Spring Cloud Finchley.SR1 Is Available

_Releases | Ryan Baxter |  August 01, 2018 | 0 Comments_

On behalf of the community, I am pleased to announce that SR1 (Service Release) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](http://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Finchley.SR1/). You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-gateway/milestone/15?closed=1). Those dealing with an empty body and no content type are of note.
-   Supports CORS Configuration [#229](https://github.com/spring-cloud/spring-cloud-gateway/issues/229)
-   Response Timeout Configuration [#371](https://github.com/spring-cloud/spring-cloud-gateway/issues/371)
-   Auto configuration and DSL support for Cloud Foundry route services [#294](https://github.com/spring-cloud/spring-cloud-gateway/pull/294)
-   Better error messages and error logging in certain cases.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.0.1.RELEASE)

### [](#spring-cloud-config)Spring Cloud Config

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/issues?q=is%3Aclosed+milestone%3A2.0.1.RELEASE)

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=milestone%3A2.0.1.RELEASE+is%3Aclosed)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/issues?q=is%3Aclosed+milestone%3A2.0.1.RELEASE)

### [](#spring-cloud-contract)Spring Cloud Contract

[Fixed the ordering of parsing YAML based contracts](https://github.com/spring-cloud/spring-cloud-contract/pull/684). Now your custom parsers will be read first.

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=is%3Aclosed+milestone%3A2.0.1.RELEASE)

### [](#spring-cloud-stream)Spring Cloud Stream

-   [Release Notes](https://github.com/spring-cloud/spring-cloud-stream-starters/releases/tag/vElmhurst.SR1)

### [](#spring-cloud-vault)Spring Cloud Vault

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-vault/issues?q=is%3Aclosed+milestone%3A2.0.1)

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-openfeign/issues?q=is%3Aclosed+milestone%3A2.0.1.RELEASE)

### [](#spring-cloud-consul)Spring Cloud Consul

-   Adds support for configuring Consul Client `TLSConfig` [#360](https://github.com/spring-cloud/spring-cloud-consul/issues/360)

The following modules were updated as part of Finchley.SR1

Module

Version

Spring Cloud Consul

2.0.1.RELEASE

Spring Cloud Gateway

2.0.1.RELEASE

Spring Cloud Sleuth

2.0.1.RELEASE

Spring Cloud Config

2.0.1.RELEASE

Spring Cloud Netflix

2.0.1.RELEASE

Spring Cloud Commons

2.0.1.RELEASE

Spring Cloud Contract

2.0.1.RELEASE

Spring Cloud Stream

Elmhurst.SR1

Spring Cloud Vault

2.0.1.RELEASE

Spring Cloud Openfeign

2.0.1.RELEASE

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.SR1</version>
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
        classpath "io.spring.gradle:dependency-management-plugin:1.0.5.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.SR1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```