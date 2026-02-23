---
title: Spring Cloud Greenwich.RC2 is now available
source: https://spring.io/blog/2018/12/21/spring-cloud-greenwich-rc2-is-now-available
scraped: 2026-02-23T15:03:45.411Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 21, 2018 | 7 Comments
---

# Spring Cloud Greenwich.RC2 is now available

_Releases | Ryan Baxter |  December 21, 2018 | 7 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 2 (RC2) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the Greenwich [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes).

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

For a complete list of issues in this release across all projects see the [project page on GitHub](https://github.com/orgs/spring-cloud/projects/12).

### [](#spring-cloud-contract)Spring Cloud Contract

-   Added support for binary payloads ([GH-818](https://github.com/spring-cloud/spring-cloud-contract/pull/818))

### [](#spring-cloud-security)Spring Cloud Security

-   Spring Cloud Gateway Filter added to support OAuth2 ([GH-141](https://github.com/spring-cloud/spring-cloud-security/issues/141)). A sample application demonstrating its use is available [here](https://github.com/spring-cloud-samples/sample-gateway-oauth2login).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Added a module to detect the presence of Istio ([GH-233](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/233))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Upgrade to OpenFeign 10.1.0 ([GH-85](https://github.com/spring-cloud/spring-cloud-openfeign/issues/85))

### [](#spring-cloud-task)Spring Cloud Task

[Blog Post](https://spring.io/blog/2018/12/20/spring-cloud-task-2-1-0-m2-is-now-available)

### [](#spring-cloud-config)Spring Cloud Config

-   Added `EnvironmentRepository` to support a CredHub backend ([GH-1211](https://github.com/spring-cloud/spring-cloud-config/pull/1211))

The following modules were updated as part of Greenwich.RC2:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Security | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-security/issues?q=is%3Aclosed+milestone%3A2.1.0.RC3)) | Spring Cloud Vault | 2.1.0.RC1 |   | Spring Cloud Contract | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/46?closed=1)) | Spring Cloud Kubernetes | 1.0.0.RC2 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/8?closed=1)) | Spring Cloud Commons | 2.1.0.RC2 |   | Spring Cloud Zookeeper | 2.1.0.RC2 |   | Spring Cloud Openfeign | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/issues?q=is%3Aclosed+milestone%3A2.1.0.RC3)) | Spring Cloud Aws | 2.1.0.RC1 |   | Spring Cloud Starter | Greenwich.RC2 |   | Spring Cloud Bus | 2.1.0.RC3 |   | Spring Cloud Sleuth | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A2.1.0.RC3)) | Spring Cloud Netflix | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/73?closed=1)) | Spring Cloud Stream | Fishtown.RC4 | ([issues](https://github.com/spring-cloud/spring-cloud-stream/milestone/52?closed=1)) | Spring Cloud Gcp | 1.1.0.RC2 |   | Spring Cloud Cloudfoundry | 2.1.0.RC2 |   | Spring Cloud Build | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-build/milestone/21?closed=1)) | Spring Cloud Dependencies | Greenwich.RC2 |   | Spring Cloud Task | 2.1.0.M2 |   | Spring Cloud Release | Greenwich.RC2 |   | Spring Cloud Function | 2.0.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-function/milestone/15?closed=1)) | Spring Cloud | Greenwich.RC2 |   | Spring Cloud Consul | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/37?closed=1)) | Spring Cloud Config | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/59?closed=1)) | Spring Cloud Gateway | 2.1.0.RC3 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/20?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>http://repo.spring.io/milestone</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Greenwich.RC2</version>
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

repositories {
    maven {
        url 'http://repo.spring.io/milestone'
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.RC2'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```