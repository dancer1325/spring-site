---
title: Spring gRPC Next Steps for 1.0.0
source: https://spring.io/blog/2025/11/05/spring-grpc-next-steps
scraped: 2026-02-22T22:07:54.463Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Dave Syer |  November 05, 2025 | 0 Comments
---

# Spring gRPC Next Steps for 1.0.0

_Engineering | Dave Syer |  November 05, 2025 | 0 Comments_

This is a new blog post in the [Road to GA series](https://spring.io/blog/2025/09/02/road_to_ga_introduction), this time updating everyone on the plans to integrate [Spring gRPC](https://github.com/spring-projects/spring-grpc) with [Spring Boot](https://github.com/spring-projects/spring-boot) 4. The original plan was to move the autoconfiguration from Spring gRPC into Spring Boot in time for the 4.0 release. Unfortunately we haven't been able to find the time to merge that change, but the good news is that we have instead added support for Spring Boot 4 to the existing Spring gRPC project, and are planning a 1.0 release in the coming days. This arrangement will continue until the merge can finally happen, most likely in an early milestone of Spring Boot 4.1. Users of Spring gRPC who are looking for longer term support will find it through this path, and as long as they continue to upgrade Spring Boot it should be a very straighforward process.

For the transition period (Spring gRPC 1.0 and Spring Boot 4.0), the BOM (bill of materials), autoconfiguration and starters, which are the recommended mechanism for consuming Spring gRPC, will stay at their current co-ordinates, i.e. with a groupId of `org.springframework.grpc`. So if you have been using Spring gRPC 0.12.0, you most likely can just change the version in your dependency management. The autoconfiguration classes themselves will have a package name change, so if you happen to be using those explicitly anywhere (probably a minority use case) you might have to change the imports as well. There might be other changes you have to make to your application to do with the migration from [Spring Boot 3.x to 4.x](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide).

Once the autoconfiguration is merged (projected to be in Spring Boot 4.1) you won't need a separate BOM and all you need do is change the co-ordinates in your dependency management for the starters. We will publish explicit guidance on that when the time comes.

## [](#a-simple-example)A simple example

Suppose you had a gRPC server based on the old 0.12.0 release. With Maven it would look like this:

```xml
Copy<dependencyManagement>
	<dependencies>
		<dependency>
			<groupId>org.springframework.grpc</groupId>
			<artifactId>spring-grpc-dependencies</artifactId>
			<version>0.12.0</version>
			<type>pom</type>
			<scope>import</scope>
		</dependency>
	</dependencies>
</dependencyManagement>
<dependencies>
	<dependency>
		<groupId>org.springframework.grpc</groupId>
		<artifactId>spring-grpc-spring-boot-starter</artifactId>
	</dependency>
...
```

To upgrade to 1.0.0 you would just change the `<version>`. The same would work for Gradle - just change the version of the dependency management in

```groovy
CopydependencyManagement {
    imports {
        mavenBom 'org.springframework.grpc:spring-grpc-dependencies:0.12.0'
    }
}
dependencies {
    implementation 'org.springframework.grpc:spring-grpc-spring-boot-starter'
...
```

from `0.12.0` to `1.0.0`.

If you used the starters to manage dependencies, like in the sample above and in the samples in Spring gRPC, the rest of your application code should not need any changes.

If you refer to the autoconfiguration classes directly the package imports will change, for instance with a server you might have a `GrpcServerFactoryCustomizer`. None of the samples in the project need to do this, so you might not need to do anything either.

## [](#immediate-deprecations)Immediate Deprecations

The autoconfiguration and starter dependencies in Spring gRPC will be immediately deprecated on release. This is intentional and really nothing to worry about. It just makes it clear that we plan to supercede them with the next minor release (1.1.0 and Spring Boot 4.1), so the deprecations are all just to anticipate name changes in the dependency co-ordinates. There shouldn't be any need to deprecate classes or methods - we want the migration to the next release to be as easy as possible. The deprecation will come in the form of a repeat of this announcement when the 1.0.0 release is published.

## [](#summary)Summary

Spring gRPC 1.0 is coming soon with the usual OSS and commercial support arrangements. There are snapshots to try in the usual respository location, and also a 1.0.0-RC1 (as of 2025/11/12) to tide you over to 1.0.0. The new release will be dependent on Spring Boot 4.0, instead of being a dependency *of* Spring Boot as originally planned. There should be minimal disruption for projects already using version 0.x of Spring gRPC.