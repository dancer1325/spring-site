---
title: Spring Boot 1.5.1 released
source: http://spring.io/blog/2017/01/30/spring-boot-1-5-1-released
scraped: 2026-02-23T18:40:08.102Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Andy Wilkinson |  January 30, 2017 | 37 Comments
---

# Spring Boot 1.5.1 released

_Releases | Andy Wilkinson |  January 30, 2017 | 37 Comments_

On behalf of the Spring Boot team, and everyone that has contributed, I am pleased to announce that Spring Boot 1.5.1 has been released and is available now from [repo.spring.io](http://repo.spring.io/release/), [Maven Central](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.springframework.boot%22) and [Bintray](https://bintray.com/bintray/jcenter/org.springframework.boot%3Aspring-boot/view). This release adds a significant number of new features and improvements. For full [upgrade instructions](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.5-Release-Notes#upgrading-from-spring-boot-14) and ["new and noteworthy"](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.5-Release-Notes#new-and-noteworthy) features please see the [release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.5-Release-Notes).

# [](#whats-new-in-15)What's new in 1.5

## [](#apache-kafka-support)Apache Kafka Support

Spring Boot 1.5 includes auto-configuration support for Apache Kafka via the spring-kafka project. To use Kafka simply include the `spring-kafka` dependency and configure the appropriate `spring.kafka.*` application properties.

## [](#cloud-foundry-actuator-extensions)Cloud Foundry actuator extensions

Spring Boot’s actuator module now includes additional support that is activated when you deploy to a compatible Cloud Foundry instance. The `/cloudfoundryapplication` path provides an alternative secured route to all `NamedMvcEndpoint` beans.

Cloud Foundry management UIs can make use of the endpoint to display additional actuator information. For example, Pivotal Cloud Foundry shows health information next to the application status. Please see [this blog post](https://content.pivotal.io/blog/pivotal-cloud-foundry-1-9-sets-the-bar-on-massive-scale) about Pivotal Cloud Foundry 1.9 for further details.

## [](#spring-data-ingalls)Spring Data Ingalls

Spring Boot 1.5 ships with the recently announced Spring Data Ingalls. Please refer to the [announcement blog post](https://spring.io/blog/2017/01/26/spring-data-release-train-ingalls-goes-ga) to learn about all its new features.

## [](#ldap-support)LDAP support

Spring Boot now offers auto-configuration for any compliant LDAP server as well as support for the embedded in-memory LDAP server from [UnboundID](https://www.ldap.com/unboundid-ldap-sdk-for-java). Please see the [documentation](http://docs.spring.io/spring-boot/docs/1.5.0.RELEASE/reference/htmlsingle/#boot-features-ldap) for more details.

## [](#loggers-endpoint)Loggers endpoint

A new actuator loggers endpoint allows you to view and change application logging levels on the fly. Both JMX and MVC endpoints are available. For example, to change the logging level with the MVC endpoint, you can issue a POST to /loggers/com.yourcorp.application with the following JSON:

```
Copy{
  "configuredLevel": "DEBUG"
}
```

To update the logger using the JMX endpoint you would use the `setLogLevel` operation. Please see the [documentation](http://docs.spring.io/spring-boot/docs/1.5.0.RELEASE/reference/htmlsingle/#production-ready-loggers) for further details.

## [](#other-changes)Other changes

There's a whole host of other changes and improvements that are documented in the [Release Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-1.5-Release-Notes). You can also find a list of deprecated classes and methods that we plan to remove in the next version.

# [](#thank-you)Thank you

  

We want to take this opportunity to again thank all our users and contributors. We've now had over [320 people](https://github.com/spring-projects/spring-boot/graphs/contributors) submit code, and there have been over [10000 commits](https://github.com/spring-projects/spring-boot/commits/master) to the project.

If you're interested in helping out, check out the ["ideal for contribution" tag](https://github.com/spring-projects/spring-boot/labels/status%3A%20ideal-for-contribution) in the issue repository. If you have general questions, please ask at [stackoverflow.com](http://stackoverflow.com) using the [`spring-boot` tag](http://stackoverflow.com/tags/spring-boot) or chat with the community [on Gitter](https://gitter.im/spring-projects/spring-boot).

### [](#what-happened-to-150)What happened to 1.5.0?

We noticed [a problem](https://github.com/spring-projects/spring-boot/issues/8136) with 1.5.0.RELEASE after it had been synced to Maven Central. Rather than requiring an exclusion for the incorrectly scoped dependency, we opted to fix it and release 1.5.1.RELEASE instead.

[Project Page](http://projects.spring.io/spring-boot/) | [GitHub](https://github.com/spring-projects/spring-boot) | [Issues](https://github.com/spring-projects/spring-boot/issues) | [Documentation](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle)