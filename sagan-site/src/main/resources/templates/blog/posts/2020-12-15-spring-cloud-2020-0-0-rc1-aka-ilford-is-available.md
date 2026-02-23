---
title: Spring Cloud 2020.0.0-RC1 (aka Ilford) Is Available
source: https://spring.io/blog/2020/12/15/spring-cloud-2020-0-0-rc1-aka-ilford-is-available
scraped: 2026-02-23T13:37:14.477Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  December 15, 2020 | 2 Comments
---

# Spring Cloud 2020.0.0-RC1 (aka Ilford) Is Available

_Releases | Ryan Baxter |  December 15, 2020 | 2 Comments_

On behalf of the community, I am pleased to announce that Release Candidate 1 (RC1) of the [Spring Cloud 2020](https://cloud.spring.io) Release Train is available today. You can find the release in the [Spring Milestone](https://repo.spring.io/milestone/) repository. See the 2020 [release notes for more information](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes).

## [](#notable-changes-in-the-2020-release-train)Notable Changes in the 2020 Release Train

This release requires Spring Boot 2.4.0.

See the [wiki](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#breaking-changes) for a list of all breaking changes in this release train.

See all of the included issues and pull requests at the [Github project](https://github.com/orgs/spring-cloud/projects/50).

### [](#spring-cloud-contract)Spring Cloud Contract

The Gradle plugin [creates a separate classpath when executing tasks](https://github.com/spring-cloud/spring-cloud-contract/pull/1558).

### [](#spring-cloud-kubernetes)Spring Cloud Kubernetes

-   Packages and starters have been refactored to [accommodate new Kubernetes Java Client implementations](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes#spring-cloud-kubernetes)
-   Starters have been added for Kubernetes Java Client implementations ([PR](https://github.com/spring-cloud/spring-cloud-kubernetes/pull/687))

### [](#spring-cloud-commons)Spring Cloud Commons

-   LoadBalancer - you can now use a custom health verification function and a RestTemplate-based mechanism with `HealthcheckServiceInstanceListSupplier` ([PR](https://github.com/spring-cloud/spring-cloud-commons/pull/866)
-   LoadBalancerProperties [have been repackaged](https://github.com/spring-cloud/spring-cloud-commons/issues/830)
-   Support has been added for `LoadBalancer` selecting same instance if available ([PR](https://github.com/spring-cloud/spring-cloud-gateway/pull/2066))
-   Support has been added for \`LoadBalancer selecting the instance specified by a cookie, if available ([PR](https://github.com/spring-cloud/spring-cloud-gateway/pull/2066))

### [](#spring-cloud-function)Spring Cloud Function

Spring Cloud Function introduces two new features: support for [RSocket](https://rsocket.io/) and [Cloud Events](https://cloudevents.io/). While we’re in the process of updating documentation with details on these features, you can check out samples and integration test cases to get additional information now. For Cloud Events support, you can look at the [Cloud Events samples](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-samples/function-sample-cloudevent) as well as a recently published [blog post](https://spring.io/blog/2020/12/10/cloud-events-and-spring-part-1). For RSocket support, you can look at [some of the test cases](https://github.com/spring-cloud/spring-cloud-function/tree/master/spring-cloud-function-rsocket/src/test/java/org/springframework/cloud/function/rsocket) demonstrating how functions can be invoked via RSocket.

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

#### [](#moving-opentelemetry-support-to-incubator)Moving OpenTelemetry support to incubator

As OpenTelemetry continues to evolve, we have decided to move OpenTelemetry support from Spring Cloud Sleuth to an [incubator project](https://github.com/spring-cloud-incubator/spring-cloud-sleuth-otel/) . To continue using OpenTelemetry with Spring Cloud Sleuth, you will need to add the Spring repositories, the `spring-cloud-sleuth-otel-dependencies` BOM, and the `spring-cloud-sleuth-otel-autoconfigure` dependency.

We have released a `1.0.0-M1` of Spring Cloud Sleuth OTel that is compatible with the `2020.0.0-RC1` release train. The following listings show how to use it in Maven and Gradle:

Maven

```xml
Copy <properties>
   <spring-cloud-sleuth-otel.version>1.0.0-M1</spring-cloud-sleuth-otel.version>
   <spring-cloud.version>2020.0.0-RC1</spring-cloud.version>
 </properties>

 <dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-dependencies</artifactId>
				<version>${spring-cloud.version}</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-sleuth-otel-dependencies</artifactId>
				<!-- Provide the version of the Spring Cloud Sleuth OpenTelemetry project -->
				<version>${spring-cloud-sleuth-otel.version}</version>
				<scope>import</scope>
				<type>pom</type>
			</dependency>
		</dependencies>
	</dependencyManagement>

    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-sleuth</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-sleuth-brave</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-sleuth-otel-autoconfigure</artifactId>
    </dependency>

		<repositories>
			<repository>
				<id>spring-snapshots</id>
				<url>https://repo.spring.io/snapshot</url>
				<snapshots><enabled>true</enabled></snapshots>
			</repository>
			<repository>
				<id>spring-milestones</id>
				<url>https://repo.spring.io/milestone</url>
			</repository>
		</repositories>
		<pluginRepositories>
			<pluginRepository>
				<id>spring-snapshots</id>
				<url>https://repo.spring.io/snapshot</url>
			</pluginRepository>
			<pluginRepository>
				<id>spring-milestones</id>
				<url>https://repo.spring.io/milestone</url>
			</pluginRepository>
		</pluginRepositories>
```

Gradle

```
Copyext {
  springCloudSleuthOtelVersion = "1.0.0-M1"
  springCloudVersion = "2020.0.0-RC1"
}

dependencyManagement {
    imports {
        mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"
        mavenBom "org.springframework.cloud:spring-cloud-sleuth-otel-dependencies:${springCloudSleuthOtelVersion}"
    }
}

dependencies {
    implementation("org.springframework.cloud:spring-cloud-starter-sleuth") {
        exclude group: 'org.springframework.cloud', module: 'spring-cloud-sleuth-brave'
    }
    implementation "org.springframework.cloud:spring-cloud-sleuth-otel-autoconfigure"
}

repositories {
    mavenCentral()
    maven {
            url "https://repo.spring.io/snapshot"
    }
    maven {
            url "https://repo.spring.io/milestone"
    }
    maven {
            url "https://repo.spring.io/release"
    }
}
```

### [](#spring-cloud-task)Spring Cloud Task

-   Added ability for the user to utilize external DBs for Multi-DB [sample](https://github.com/spring-cloud/spring-cloud-task/issues/690)
-   Spring Cloud Task now supports [`JobApplicationRunner`](https://github.com/spring-cloud/spring-cloud-task/issues/645)
-   Single-step Batch Job sample now supports [AMQP and Kafka](https://github.com/spring-cloud/spring-cloud-task/issues/745)

### [](#spring-cloud-gateway)Spring Cloud Gateway

-   LoadBalancer Lifecycle support has been added ([PR](https://github.com/spring-cloud/spring-cloud-gateway/pull/2066))

The following modules were updated as part of 2020.0.0-RC1:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Circuitbreaker | 2.0.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-circuitbreaker/milestone/7?closed=1)) | Spring Cloud Contract | 3.0.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/73?closed=1)) | Spring Cloud Kubernetes | 2.0.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/27?closed=1)) | Spring Cloud Commons | 3.0.0-RC1 |  
| Spring Cloud Openfeign | 3.0.0-RC1 |  
| Spring Cloud Cloudfoundry | 3.0.0-RC1 |  
| Spring Cloud Security | 3.0.0-RC1 |  
| Spring Cloud Bus | 3.0.0-RC1 |  
| Spring Cloud Cli | 3.0.0-RC1 |  
| Spring Cloud Zookeeper | 3.0.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-zookeeper/milestone/32?closed=1)) | Spring Cloud Sleuth | 3.0.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/85?closed=1)) | Spring Cloud Consul | 3.0.0-RC1 |  
| Spring Cloud Gateway | 3.0.0-RC1 |  
| Spring Cloud Netflix | 3.0.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/97?closed=1)) | Spring Cloud Vault | 3.0.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/43?closed=1)) | Spring Cloud Config | 3.0.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/83?closed=1)) | Spring Cloud Task | 2.3.0-RC1 | ([issues](https://github.com/spring-cloud/spring-cloud-task/releases/tag/2.3.0-RC1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

The following listings show how to get started with Maven with a BOM (dependency management only) or with Gradle:

Maven with BOM:

```
Copy
    <repositories>
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
            <version>2020.0.0-RC1</version>
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

Gradle:

```
Copybuildscript {
dependencies {
classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2020.0.0-RC1'
}
}

dependencies {
compile 'org.springframework.cloud:spring-cloud-starter-config'
compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
...
}
```