---
title: Spring Cloud 2022.0.0 Release Candidate 3 (codename Kilburn) Has Been Released
source: https://spring.io/blog/2022/12/02/spring-cloud-2022-0-0-release-candidate-3-codename-kilburn-has-been-released
scraped: 2026-02-23T10:25:22.279Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Olga Maciaszek-Sharma |  December 02, 2022 | 0 Comments
---

# Spring Cloud 2022.0.0 Release Candidate 3 (codename Kilburn) Has Been Released

_Releases | Olga Maciaszek-Sharma |  December 02, 2022 | 0 Comments_

On behalf of the community, I am pleased to announce that the Release Candidate 3 (RC3) of the [Spring Cloud 2022.0](https://cloud.spring.io) Release Train is available today. The release can be found in [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2022.0 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes).

## [](#notable-changes-in-the-202200-rc3-release)Notable Changes in the 2022.0.0 RC3 release

Click [here](https://github.com/orgs/spring-cloud/projects/89/) to see all issues in this release.

Spring Cloud 2022.0.0-RC3 requires Spring Boot 3.0.0.

### [](#spring-cloud-contract)Spring Cloud Contract

-   Removes Gradle's support for `src/test/resources/contracts` checking ([#1848](https://github.com/spring-cloud/spring-cloud-contract/issues/1848))

Check the [latest migration guide entry](https://github.com/spring-cloud/spring-cloud-contract/wiki/Spring-Cloud-Contract-4.0-Migration-Guide#spring-cloud-contract-400-rc3) for more information.

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   Added the possibility to disable global CORS configuration ([#2779](https://github.com/spring-cloud/spring-cloud-gateway/pull/2779))

### [](#spring-cloud-openfeign)Spring Cloud OpenFeign

-   Support for AOT and native images has been added ([#794](https://github.com/spring-cloud/spring-cloud-openfeign/pull/794))
-   Support for Micrometer Observation API has been added (\[#793\][https://github.com/spring-cloud/spring-cloud-openfeign/pull/793](https://github.com/spring-cloud/spring-cloud-openfeign/pull/793)))
-   Feign has been upgraded to Feign `12.1` ([#792](https://github.com/spring-cloud/spring-cloud-openfeign/pull/792))

### [](#spring-cloud-commons)Spring Cloud Commons

-   Switched to lazily initializing child contexts in AOT mode ([#1176](https://github.com/spring-cloud/spring-cloud-commons/pull/1176))

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Filter service discovery by namespace ((#1000)\[[https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1000](https://github.com/spring-cloud/spring-cloud-kubernetes/issues/1000)\])

### [](#spring-cloud-config)Spring Cloud Config

-   Spring Vault upgraded to 3.0.0 ([2193](https://github.com/spring-cloud/spring-cloud-config/issues/2193))

### [](#spring-cloud-vault)Spring Cloud Vault

-   Spring Vault upgraded to 3.0.0 ([665](https://github.com/spring-cloud/spring-cloud-vault/issues/665))

### [](#spring-cloud-stream)Spring Cloud Stream

-   The test binder in Spring Cloud Stream moved to a separate artifact from the core Spring Cloud Stream module. Before this release, the test binder was part of the core module, and users used it using the `test-binder` classifier, which was inconvenient. With this release, the test binder is now moved and available through `spring-cloud-stream-test-binder` module. You can add it as a dependency in your application and get all the previous test binder components.
    
-   Improved error handling docs in core Spring Cloud Stream
    
-   Spring Cloud Stream Schema Registry AVRO-based converters are updated to AVRO `1.11.1`
    
-   Starting from this release, the AWS Kinesis binder is no longer part of the Spring Cloud Stream release train and will be released separately.
    

The following modules were updated as part of 2022.0.0-RC3:

Module

Version

Issues

Spring Cloud Task

3.0.0-RC3

([issues](https://github.com/spring-cloud/spring-cloud-task/milestone/68?closed=1))

Spring Cloud Bus

4.0.0-RC3

Spring Cloud Contract

4.0.0-RC3

([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/97?closed=1))

Spring Cloud Circuitbreaker

3.0.0-RC3

Spring Cloud Function

4.0.0-RC3

Spring Cloud OpenFeign

4.0.0-RC3

([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/58?closed=1))

Spring Cloud Zookeeper

4.0.0-RC3

Spring Cloud Commons

4.0.0-RC3

([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/108?closed=1))

Spring Cloud Vault

4.0.0-RC3

([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/54?closed=1))

Spring Cloud Kubernetes

3.0.0-RC3

([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/54?closed=1))

Spring Cloud Stream

4.0.0-RC3

Spring Cloud Starter Build

2022.0.0-RC3

Spring Cloud Consul

4.0.0-RC3

Spring Cloud Config

4.0.0-RC3

([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/111?closed=1)

Spring Cloud Build

4.0.0-RC3

Spring Cloud Gateway

4.0.0-RC3

([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/73?closed=1))

Spring Cloud Netflix

4.0.0-RC3

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```xml
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
      <version>2022.0.0-RC3</version>
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

```groovy
Copyplugins {
  id 'java'
  id 'org.springframework.boot' version '3.0.0'
  id 'io.spring.dependency-management' version '1.1.0'
}

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2022.0.0-RC3")
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
}
```