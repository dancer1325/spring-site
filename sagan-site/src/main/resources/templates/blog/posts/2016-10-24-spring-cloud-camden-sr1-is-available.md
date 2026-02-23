---
title: Spring Cloud Camden SR1 is available
source: https://spring.io/blog/2016/10/24/spring-cloud-camden-sr1-is-available
scraped: 2026-02-23T19:00:25.686Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  October 24, 2016 | 0 Comments
---

# Spring Cloud Camden SR1 is available

_Releases | Marcin Grzejszczak |  October 24, 2016 | 0 Comments_

On behalf of the team, I am happy to announce the new service release of the [Spring Cloud Camden](https://cloud.spring.io) Release Train. `Camden.SR1` can be found in our [Spring Release](https://repo.spring.io/release/) repository or in Maven Central. You can check out the Camden [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Camden-Release-Notes#camdensr1).

## [](#highlights-of-the-camden-sr1-release-train)Highlights of the Camden SR1 Release Train

The following modules form Camden.SR1:

Module

Version

Spring Cloud AWS

1.1.3.RELEASE

Spring Cloud Bus

1.2.1.RELEASE

Spring Cloud Commons

1.1.4.RELEASE

Spring Cloud Contract

1.0.1.RELEASE

Spring Cloud Config

1.2.1.RELEASE

Spring Cloud Netflix

1.2.1.RELEASE

Spring Cloud Security

1.1.3.RELEASE

Spring Cloud Sleuth

1.0.10.RELEASE

Spring Cloud Stream

Brooklyn.RELEASE

Spring Cloud Task

1.0.3.RELEASE

Spring Cloud Zookeeper

1.0.3.RELEASE

The combined release train documentation is available [here](http://cloud.spring.io/spring-cloud-static/Camden.SR1/).

Also Spring Cloud CLI `1.2.1.RELEASE` got released. You can check out the project page [here](http://cloud.spring.io/spring-cloud-cli/)

Spring Cloud Consul did not get updated in this release, however version `1.1.1.RELEASE` was released shortly after Camden.SR1 and contains a couple of [fixes](https://github.com/spring-cloud/spring-cloud-consul/milestone/12?closed=1) user's might be interested in. If you would like to upgrade the version of Consul used in your application you will have to manually specify the version number in your Maven or Gradle project.

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloudOSS).

To get started with Maven with a BOM (dependency management only):

```
Copy<dependencyManagement>
  <dependencies>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>Camden.SR1</version>
    <type>pom</type>
    <scope>import</scope>
  </dependencies>
</dependencyManagement>
<dependencies>
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-eureka</artifactId>
  </dependency>
  ...
</dependencies>
```

or with Gradle:

```
Copybuildscript {
  dependencies {
    classpath "org.springframework.boot:spring-boot-gradle-plugin:1.4.1.RELEASE"
  }
}

apply plugin: "spring-boot"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Camden.SR1'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```