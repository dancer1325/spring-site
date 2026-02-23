---
title: Spring Cloud 2020.0.0-M1 Released
source: https://spring.io/blog/2020/04/17/spring-cloud-2020-0-0-m1-released
scraped: 2026-02-23T14:03:07.881Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  April 17, 2020 | 2 Comments
---

# Spring Cloud 2020.0.0-M1 Released

_Releases | Spencer Gibb |  April 17, 2020 | 2 Comments_

On behalf of the community, I am pleased to announce that the Milestone 1 (M1) of the [Spring Cloud 2020.0.0](https://cloud.spring.io) (Code Name: `Ilford`) Release Train is available today. The release can be found in the [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the 2020 [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2020.0.0-Release-Notes).

## [](#notable-changes-in-the-2020-release-train)Notable Changes in the 2020 Release Train

We have changed our release train versioning scheme. We now follow [Calendar Versioning](https://calver.org/) or calver for short. We will follow the `YYYY.MINOR.MICRO` [scheme](https://calver.org/#scheme) where `MINOR` is an incrementing number that starts at zero each year. The `MICRO` segment corresponds to suffixes previously used: `.0` is analogous to `.RELEASE` and `.2` is analogous to `.SR2`. Pre-release suffixes will also change from using a `.` to a `-` for the separator, for example `2020.0.0-M1` and `2020.0.0-RC2`. We will also stop prefixing snapshots with `BUILD-` -- for example `2020.0.0-SNAPSHOT`.

We will continue to use London Tube Station names for code names. The current codename is `Ilford`. These names will no longer be used in versions published to maven repositories.

Spring Cloud AWS and Spring Cloud GCP are no longer part of the release train. They will continue to be part of Hoxton as long as it is supported -- at least thru June of 2021. Spring Cloud GCP will continue on as a separate project in [https://github.com/GoogleCloudPlatform](https://github.com/GoogleCloudPlatform).

Initial milestones are based on Spring Boot 2.3.x but will shift to 2.4.x once that line has started.

The `2020.0` Release Train will be available on [https://start.spring.io](https://start.spring.io) once development has started on the next feature release of Spring Boot (2.4.0). Please see [Getting Started](#gettingstarted), below, for instructions on including this release in your project.

In all, a total of 183 issues, enhancements, bugs and pull requests were included in this release. See the [GitHub project](https://github.com/orgs/spring-cloud/projects/32) for details.

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   All of the maintence mode projects have been removed and all dependent projects were updated accordingly.
-   Added zoned loadBalancer implementation support [#3720](https://github.com/spring-cloud/spring-cloud-netflix/pull/3720)
-   Removed deprecated EurekaDiscoveryClient.EurekaServiceInstance [#3742](https://github.com/spring-cloud/spring-cloud-netflix/issues/3742)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

Updated to support the latest version of Brave.

### [](#spring-cloud-consul)Spring Cloud Consul

Support was added for Consul Service Metadata rather than using tags as metadata.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Service Instance metadata is now added to Route metadata. Support was added for modifying request or response bodies even if the body was empty. An option to ignore route definition errors was added.

### [](#spring-cloud-circuitbreaker)Spring Cloud CircuitBreaker

-   Upgraded Resilience4J to 1.3.1

### [](#spring-cloud-contract)Spring Cloud Contract

Support was added for incremental test generation in the Maven plugin. Support was added for Spring Cloud Loadbalancer in stubrunner.

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

-   Switch Ribbon-based functionalities were added to Spring Cloud LoadBalancer [#240](https://github.com/spring-cloud/spring-cloud-zookeeper/pull/240)

### [](#spring-cloud-commons)Spring Cloud Commons

-   Added a property source that produces a random value that is cached [#719](https://github.com/spring-cloud/spring-cloud-commons/pull/719)
-   Removed Spring Cloud LoadBalancer Ribbon integration [#691](https://github.com/spring-cloud/spring-cloud-commons/pull/691)

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

-   Adjusted to LoadBalancer implementation changes [#300](https://github.com/spring-cloud/spring-cloud-openfeign/pull/300)

### [](#included-modules)Included Modules

The following modules were updated as part of 2020.0.0-M1:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Netflix | 3.0.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/88?closed=1)) | Spring Cloud Function | 3.1.0.M1 |  
| Spring Cloud Sleuth | 3.0.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/74?closed=1)) | Spring Cloud Consul | 3.0.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/47?closed=1)) | Spring Cloud Kubernetes | 2.0.0.M1 |  
| Spring Cloud Gateway | 3.0.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/36?closed=1)) | Spring Cloud Circuitbreaker | 2.0.0.M1 |  
| Spring Cloud Contract | 3.0.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/63?closed=1)) | Spring Cloud Config | 3.0.0.M1 |  
| Spring Cloud Build | 3.0.0.M1 |  
| Spring Cloud Cloudfoundry | 3.0.0.M1 |  
| Spring Cloud Security | 3.0.0.M1 |  
| Spring Cloud Bus | 3.0.0.M1 |  
| Spring Cloud Vault | 3.0.0.M1 |  
| Spring Cloud Zookeeper | 3.0.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/28?closed=1)) | Spring Cloud Commons | 3.0.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/72?closed=1)) | Spring Cloud Openfeign | 3.0.0.M1 | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/23?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), and on [Twitter](https://twitter.com/SpringCloud).

## [](#getting-started)Getting Started

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
            <version>2020.0.0-M1</version>
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
    <!-- ... -->
</dependencies>
```

To get started with Gradle:

```groovy
Copyplugins {
  id 'org.springframework.boot' version '2.3.0.M4'
  id 'io.spring.dependency-management' version '1.0.9.RELEASE'
  id 'java'
}

repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
}

ext {
  set('springCloudVersion', "2020.0.0-M1")
}

dependencyManagement {
  imports {
    mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```