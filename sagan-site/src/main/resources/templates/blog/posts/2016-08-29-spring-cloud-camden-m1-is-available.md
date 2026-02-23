---
title: Spring Cloud Camden M1 is available
source: https://spring.io/blog/2016/08/29/spring-cloud-camden-m1-is-available
scraped: 2026-02-23T19:06:42.616Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  August 29, 2016 | 0 Comments
---

# Spring Cloud Camden M1 is available

_Releases | Marcin Grzejszczak |  August 29, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce that Milestone 1 of the [Spring Cloud Camden](https://cloud.spring.io) Release Train is available today. The release can be found in our [Spring Milestone](https://repo.spring.io/milestone/) repository. We’ve made numerous enhancements and bug fixes! You can check out the `Camden.M1` [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Camden-Release-Notes).

The following modules were updated as part of Camden.M1:

```
CopySpring Cloud Build        1.2.0.RELEASE
Spring Cloud Stream       Brooklyn.M1
Spring Cloud Bus          1.2.0.M1
Spring Cloud Config       1.2.0.M1
Spring Cloud Netflix      1.2.0.M1
Spring Cloud Consul       1.1.0.M1
Spring Cloud Contract     1.0.0.M2
Spring Cloud CLI          1.2.0.M1
```

The combined release train docs are available [here](http://cloud.spring.io/spring-cloud-static/spring-cloud.html)

And, as always, we welcome feedback: either on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on Stack Overflow, or on Twitter.

To get started with Maven with a BOM (dependency management only)

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
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>Camden.M1</version>
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
    classpath "io.spring.gradle:dependency-management-plugin:0.6.0.RELEASE"
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Camden.M1'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```