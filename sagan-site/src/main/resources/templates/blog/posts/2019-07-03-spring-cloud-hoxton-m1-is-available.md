---
title: Spring Cloud Hoxton.M1 is available.
source: https://spring.io/blog/2019/07/03/spring-cloud-hoxton-m1-is-available
scraped: 2026-02-23T14:42:18.527Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  July 03, 2019 | 2 Comments
---

# Spring Cloud Hoxton.M1 is available.

_Releases | Spencer Gibb |  July 03, 2019 | 2 Comments_

On behalf of the community, I am pleased to announce that Milestone 1 (M1) of the [Spring Cloud Hoxton](https://spring.io/projects/spring-cloud) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the [Hoxton release notes](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes) for more information.

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

This milestone release is compatible with Spring Boot 2.2.0.M4.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Spring Cloud Gateway has added support for [RSocket](http://rsocket.io). Look for more in an upcoming blog post.

### [](#spring-cloud-contract)Spring Cloud Contract

Gradle support has been updated to 5.5, and Groovy to version 2.5. A major refactoring has happened, simplifying and rewriting to Java where possible.

### [](#spring-cloud-cloudfoundry)Spring Cloud Cloudfoundry

An option to use Cloud Foundry DNS-based discovery was added. This is useful for container-to container-networking.

### [](#spring-cloud-config)Spring Cloud Config

Support was added for Google Cloud Source (a Git host) and a new Redis environment repository.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Sleuth now imports the Brave BOM.

## [](#roadmap)Roadmap

The Spring Cloud Circuit Breaker project will move out of Incubator status. Spring Cloud Loadbalancer will be updated to plug holes left by Ribbon being placed in maintenance mode in Spring Cloud Netflix. Spring Cloud Gateway RSocket support will continue to improve.

---

The following modules were updated as part of Hoxton.M1:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Commons | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/59?closed=1)) | Spring Cloud Contract | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/50?closed=1)) | Spring Cloud Cloudfoundry | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-cloudfoundry/milestone/13?closed=1)) | Spring Cloud Openfeign | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/13?closed=1)) | Spring Cloud Security | 2.2.0.M1 |   | Spring Cloud Config | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/63?closed=1)) | Spring Cloud Stream | Horsham.M2 |   | Spring Cloud Aws | 2.2.0.M1 |   | Spring Cloud Bus | 2.2.0.M1 |   | Spring Cloud Zookeeper | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/26?closed=1)) | Spring Cloud Task | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/35?closed=1)) | Spring Cloud Gateway | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/25?closed=1)) | Spring Cloud Sleuth | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/57?closed=1)) | Spring Cloud Consul | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/40?closed=1)) | Spring Cloud Netflix | 2.2.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/77?closed=1)) | Spring Cloud Gcp | 1.2.0.M1 |   | Spring Cloud Function | 3.0.0.M1 |   | Spring Cloud Vault | 2.2.0.M1 |   | Spring Cloud Kubernetes | 1.1.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/12?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>https://repo.spring.io/milestone</url>
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
            <version>Hoxton.M1</version>
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
        classpath "io.spring.gradle:dependency-management-plugin:1.0.9.RELEASE"
    }
}

repositories {
    maven {
        url 'https://repo.spring.io/milestone'
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.M1'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```