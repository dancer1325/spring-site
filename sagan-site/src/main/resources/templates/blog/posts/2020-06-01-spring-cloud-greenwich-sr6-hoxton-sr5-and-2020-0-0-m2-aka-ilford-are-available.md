---
title: Spring Cloud Greenwich.SR6, Hoxton.SR5 and 2020.0.0-M2 (aka Ilford) are Available
source: https://spring.io/blog/2020/06/01/spring-cloud-greenwich-sr6-hoxton-sr5-and-2020-0-0-m2-aka-ilford-are-available
scraped: 2026-02-23T13:58:52.370Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  June 01, 2020 | 1 Comment
---

# Spring Cloud Greenwich.SR6, Hoxton.SR5 and 2020.0.0-M2 (aka Ilford) are Available

_Releases | Spencer Gibb |  June 01, 2020 | 1 Comment_

On behalf of the community, I am pleased to announce that the following releases are available today: Service Release 6 (SR6) of the [Spring Cloud](https://cloud.spring.io) Greenwich Release Train, Service Release 5 (SR5) of the Spring Cloud Hoxton Release Train and Milestone 2 (M2) of the [Spring Cloud 2020.0](https://cloud.spring.io) (code name `Ilford`) Release Train. The Greenwich and Hoxton releases can be found in Maven Central [here](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Greenwich.SR6/) and [here](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Hoxton.SR5/). The `Ilford` milestone can be found in the [Spring Milestone](https://repo.spring.io/milestone/) repository. You can check out the individual release notes for more information: [Greenwich.SR6](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes), [Hoxton.SR5](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Hoxton-Release-Notes) and [2020.0.0-M2](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-2020.0-Release-Notes).

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), [Gitter](https://gitter.im/spring-cloud/spring-cloud), [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or [Twitter](https://twitter.com/SpringCloud).

---

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

[Github project](https://github.com/orgs/spring-cloud/projects/40)

Greenwich is compatible with Spring Boot 2.1.x.

### [](#spring-cloud-config)Spring Cloud Config

[CVE-2020-5410: Directory Traversal with spring-cloud-config-server](https://tanzu.vmware.com/security/cve-2020-5410)

### [](#spring-cloud-commons)Spring Cloud Commons

Backports bootstrap property source ordering fix.

The following modules were updated as part of Greenwich.SR6:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Config | 2.1.8.RELEASE |  
| Spring Cloud Commons | 2.1.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/74?closed=1))

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Greenwich.SR6</version>
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
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:1.0.9.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Greenwich.SR6'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```

---

## [](#notable-changes-in-the-hoxton-release-train)Notable Changes in the Hoxton Release Train

[Github project](https://github.com/orgs/spring-cloud/projects/38).

Hoxton.SR5 is compatible with both Spring Boot 2.3.x and 2.2.x. Previous Hoxton releases are only compatible with Spring Boot 2.2.x.

Spring Cloud CLI was not released as part of Hoxton.SR5, look for a release with Hoxton.SR6.

### [](#spring-cloud-contract)Spring Cloud Contract

Support was added for Spring Cloud LoadBalancer. Please see [release notes](https://github.com/spring-cloud/spring-cloud-contract/releases/tag/v2.2.3.RELEASE) for information on upgrades and a minor API change in the Spring Cloud Contract Gradle Plugin.

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

Labels were added to the health endpoint.

### [](#spring-cloud-commons-1)Spring Cloud Commons

Builders were added to configure Spring Cloud LoadBalancer as well as pre-configured loadBalancers. LoadBalancer caching mechanism was adjusted to support `HealthCheckInstanceListSupplier`. Support was added for non-enumerable property sources. Support was added for a cached random property source so service instance ids with random values will not be redefined during a refresh event. Please see [release notes](https://github.com/spring-cloud/spring-cloud-commons/releases/tag/v2.2.3.RELEASE) for information on changes in two property value defaults.

### [](#spring-cloud-netflix)Spring Cloud Netflix

Eureka Client now uses the Eureka HTTP API during bootstrap so that instances are not registered then deregistered.

### [](#spring-cloud-consul)Spring Cloud Consul

Support was added for Consul metadata rather than metadata in tags.

### [](#spring-cloud-config-1)Spring Cloud Config

Updated support for Vault Azure MSI authentication.

### [](#spring-cloud-gateway)Spring Cloud Gateway

Added support for custom Host headers.

### [](#spring-cloud-zookeeper)Spring Cloud Zookeeper

Added a `CuratorFrameworkCustomizer` to allow users to customize Curator after auto-configuration.

### [](#spring-cloud-bus)Spring Cloud Bus

`@RemoteApplicationEventsScan` results are now cumulative. `RefreshRemoteApplicationEvent` is only processed locally if targeted.

### [](#spring-cloud-openfeign)Spring Cloud Openfeign

Support was added for sorting Spring Data pagination. Support was added to disable parent context of individual feign clients. An `ErrorDecoderFactory` was added.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

The `ExceptionLoggingFilter` was disabled by default.

The following modules were updated as part of Hoxton.SR5:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Contract | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/64?closed=1)) | Spring Cloud Kubernetes | 1.1.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/19?closed=1)) | Spring Cloud Cloudfoundry | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-cloudfoundry/milestone/15?closed=1)) | Spring Cloud Commons | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/73?closed=1)) | Spring Cloud Starter Build | Hoxton.SR5 |  
| Spring Cloud Netflix | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/89?closed=1)) | Spring Cloud Consul | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/48?closed=1)) | Spring Cloud Config | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/76?closed=1)) | Spring Cloud Gateway | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/37?closed=1)) | Spring Cloud Gcp | 1.2.3.RELEASE |  
| Spring Cloud Zookeeper | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/29?closed=1)) | Spring Cloud Vault | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/39?closed=1)) | Spring Cloud Circuitbreaker | 1.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/5?closed=1)) | Spring Cloud Bus | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/44?closed=1)) | Spring Cloud Security | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-security/milestone/24?closed=1)) | Spring Cloud Openfeign | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/24?closed=1)) | Spring Cloud Aws | 2.2.2.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-aws/milestone/28?closed=1)) | Spring Cloud Sleuth | 2.2.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/75?closed=1))

To get started with Maven with a BOM (dependency management only):

```xml
Copy<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR5</version>
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
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:1.0.9.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Hoxton.SR5'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```

---

## [](#notable-changes-in-the-20200-release-train)Notable Changes in the 2020.0 Release Train

[Github project](https://github.com/orgs/spring-cloud/projects/39)

### [](#spring-cloud-netflix-1)Spring Cloud Netflix

Eureka Client now uses `WebClient` or `RestTemplate` by default rather than Jersey.

### [](#spring-cloud-sleuth-1)Spring Cloud Sleuth

Zipkin dependency was dropped from core.

### [](#spring-cloud-gateway-1)Spring Cloud Gateway

The Java Route DSL was enhanced to not leak the Route methods. This helps avoid confusion over how the DSL should be used.

### [](#spring-cloud-commons-2)Spring Cloud Commons

The `spring.cloud.loadbalancer.health-check.initial-delay` configuration was changed from `int` to `Duration`.

### [](#spring-cloud-openfeign-1)Spring Cloud Openfeign

The `Targeter` interface and `FeignClientFactoryBean` were made public.

The following modules were updated as part of 2020.0.0-M2:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Netflix | 3.0.0-M2 |  
| Spring Cloud Sleuth | 3.0.0-M2 |  
| Spring Cloud Consul | 3.0.0-M2 |  
| Spring Cloud Kubernetes | 2.0.0-M2 |  
| Spring Cloud Gateway | 3.0.0-M2 | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/38?closed=1)) | Spring Cloud Circuitbreaker | 2.0.0-M2 |  
| Spring Cloud Contract | 3.0.0-M2 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/65?closed=1)) | Spring Cloud Starter Build | 2020.0.0-M2 |  
| Spring Cloud Config | 3.0.0-M2 |  
| Spring Cloud Build | 3.0.0-M2 |  
| Spring Cloud Cloudfoundry | 3.0.0-M2 |  
| Spring Cloud Security | 3.0.0-M2 |  
| Spring Cloud Bus | 3.0.0-M2 |  
| Spring Cloud Cli | 3.0.0-M2 |  
| Spring Cloud Vault | 3.0.0-M2 |  
| Spring Cloud Zookeeper | 3.0.0-M2 |  
| Spring Cloud Commons | 3.0.0-M2 |  
| Spring Cloud Openfeign | 3.0.0-M2 |

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
            <version>2020.0.0-M2</version>
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.0-M2'
  }
}

dependencies {
  compile 'org.springframework.cloud:spring-cloud-starter-config'
  compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  //...
}
```