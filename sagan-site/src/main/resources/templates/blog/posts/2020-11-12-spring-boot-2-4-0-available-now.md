---
title: Spring Boot 2.4.0 available now
source: https://spring.io/blog/2020/11/12/spring-boot-2-4-0-available-now
scraped: 2026-02-23T13:41:49.198Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  November 12, 2020 | 18 Comments
---

# Spring Boot 2.4.0 available now

_Releases | Andy Wilkinson |  November 12, 2020 | 18 Comments_

On behalf of the Spring Boot team and everyone that has contributed, I am pleased to announce that Spring Boot 2.4.0 has been released and is available from Maven Central. `2.4.0` is the first generally available Spring Boot release that uses [the new versioning scheme](https://spring.io/blog/2020/04/30/updates-to-spring-versions). Please note that the version is `2.4.0` rather than `2.4.0.RELEASE` that you may have expected based on previous releases.

This release adds a significant number of new features and improvements. For full [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.4-Release-Notes#upgrading-from-spring-boot-23) and [new and noteworthy](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.4-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.4-Release-Notes).

## [](#whats-new-in-24)What's new in 2.4

### [](#config-file-processing-application-properties-and-yaml-files)Config File Processing (application properties and YAML files)

Spring Boot 2.4 has improved the way that `application.properties` and `application.yml` files are processed. If you only have a simple `application.properties` or `application.yml file`, your upgrade should be seamless. If, however, you’ve have a more complex setup (with profile-specific properties, or profile activation properties) you may need to [make some changes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-Config-Data-Migration-Guide) if you want to use the new features.

### [](#volume-mounted-config-directory-trees)Volume Mounted Config Directory Trees

A new `spring.config.import` property can be used to import configuration trees that are commonly used with Kubernetes. A configuration tree is an alternative way of providing key/value pairs. Each pair is declared in its own file, with the filename forming the property key, and the file contents providing the value.

For a complete example, see the [updated reference documentation](https://docs.spring.io/spring-boot/docs/2.4.0/reference/html/spring-boot-features.html#boot-features-external-config-files-configtree).

### [](#startup-endpoint)Startup Endpoint

A new [`startup` actuator endpoint](https://docs.spring.io/spring-boot/docs/2.4.0/actuator-api/htmlsingle/#startup) is now available that shows information about your applications startup. The endpoint can help you identify beans that are taking longer than expected to start.

This work builds on the application startup tracking feature that was recently added to Spring Framwork 5.3. You can read more about the feature in the [Spring Framework reference documentation](https://docs.spring.io/spring-framework/docs/5.3.x/reference/html/core.html#context-functionality-startup).

### [](#origin-chains)Origin Chains

The `Origin` interface has been updated with a new `getParent()` method. This allows us to provide a full origin chain that can show exactly where an item originated from.

For example, you might use `spring.config.import` in your `application.properties` to import a second file. The `Origin` of properties loaded from this second file will have a parent that points back to the original import declaration.

You can try this yourself by looking at the output of the `actuator/env` or `actuator/configprops` actuator endpoints.

### [](#dockerbuildpack-support)Docker/Buildpack Support

#### [](#publishing-images)Publishing Images

The Maven plugin's `spring-boot:build-image` goal and the Gradle plugin's `bootBuildImage` task now have the ability to publish the generated image to a Docker registry. See the [Maven](https://docs.spring.io/spring-boot/docs/2.4.0/maven-plugin/reference/htmlsingle/#build-image-example-publish) and [Gradle](https://docs.spring.io/spring-boot/docs/2.4.0/gradle-plugin/reference/htmlsingle/#build-image-example-publish) plugin documentation for more details on configuring the plugins for publishing images.

#### [](#authentication)Authentication

When using Spring Boot’s buildpack support, you can now use a private authenticated Docker registry for your builder or run image. Both username/password and token based authentication are supported.

The [Maven](https://docs.spring.io/spring-boot/docs/2.4.0/maven-plugin/reference/htmlsingle/#build-image-docker-registry) and [Gradle](https://docs.spring.io/spring-boot/docs/2.4.0/maven-plugin/reference/htmlsingle/#build-image-docker-registry) documentation has been updated to show the new configuration.

### [](#java-15-support)Java 15 support

Spring Boot 2.4 supports Java 15 while also remaining compatible with Java 11 and 8.

### [](#dependency-upgrades)Dependency upgrades

Spring Boot 2.4 moves to new versions of several Spring projects:

-   [Spring AMQP 2.3](https://docs.spring.io/spring-amqp/docs/2.3.0/reference/html/#changes-in-2-3-since-2-2)
-   [Spring Batch 4.3](https://docs.spring.io/spring-batch/docs/4.3.0/reference/html/whatsnew.html#whatsNew)
-   [Spring Data 2020.0](https://spring.io/blog/2020/11/10/spring-data-2020-0-new-and-noteworthy-in-spring-data-jdbc-2-1)
-   [Spring Framework 5.3](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-5.x#whats-new-in-version-53)
-   [Spring HATEOAS 1.2](https://docs.spring.io/spring-hateoas/docs/1.2.0/reference/html/#migrate-to-1.0)
-   [Spring Integration 5.4](https://docs.spring.io/spring-integration/docs/current/reference/html/whats-new.html#whats-new)
-   [Spring Kafka 2.6](https://docs.spring.io/spring-kafka/docs/2.6.2/reference/html/#spring-kafka-intro-new)
-   Spring Retry 1.3
-   [Spring Security 5.4](https://docs.spring.io/spring-security/site/docs/5.4.0/reference/html5/#new)
-   Spring Session 2020.0

We’ve also upgraded to the latest stable releases of other third-party libraries wherever possible. Please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.4-Release-Notes#dependency-upgrades) for details.

### [](#other-changes)Other changes

There's a whole host of other changes and improvements that are documented in the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.4-Release-Notes). You can also find a list of deprecated classes and methods that we plan to remove in the next version.

## [](#thank-you)Thank you

We want to take this opportunity to again thank all our users and contributors. We've now had over [760 people](https://github.com/spring-projects/spring-boot/graphs/contributors) submit code, and there have been over [29000 commits](https://github.com/spring-projects/spring-boot/commits/master) to the project.

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot) or chat with the community [on Gitter](https://gitter.im/spring-projects/spring-boot).

[Project Page](https://spring.io/projects/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/2.4.0/reference/html) | [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-boot) | [Gitter](https://gitter.im/spring-projects/spring-boot)