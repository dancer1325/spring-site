---
title: First Milestone of Spring Cloud Brixton Release Train is Available
source: https://spring.io/blog/2015/09/16/first-milestone-of-spring-cloud-brixton-release-train-is-available
scraped: 2026-02-23T19:42:30.535Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  September 16, 2015 | 11 Comments
---

# First Milestone of Spring Cloud Brixton Release Train is Available

_Releases | Spencer Gibb |  September 16, 2015 | 11 Comments_

On behalf of the Spring Cloud team, I am pleased to announce the first milestone of the [Spring Cloud](http://projects.spring.io/spring-cloud/) Brixton release train. The milestone is available today and can be found in our [Spring Milestone repository](http://repo.spring.io/milestone). We’ve made numerous enhancements and bug fixes, some of the highlights include:

-   Spring Boot 1.3.x and Spring 4.2.x support
-   Cluster Leadership election and locks
-   Hashicorp Consul support for service registration/discovery, configuration and bus
-   Apache Zookeeper support for service registration/discovery, configuration and leader election
-   Lattice support for service registration/discovery
-   Distributed tracing support

The following are new modules in Brixton.M1:

-   Spring Cloud for Cloud Foundry 1.0.0.M1
-   Spring Cloud Cluster 1.0.0.M1
-   Spring Cloud Consul 1.0.0.M2
-   Spring Cloud Lattice 1.0.0.M1
-   Spring Cloud Sleuth 1.0.0.M1
-   Spring Cloud Zookeeper 1.0.0.M1

The following modules have been updated:

-   Spring Cloud Commons 1.1.0.M1
-   Spring Cloud Config 1.1.0.M1
-   Spring Cloud Netflix 1.1.0.M1
-   Spring Cloud Security 1.1.0.M1

Spring Cloud AWS and Spring Cloud Bus did not get a new release in this milestone.

To get started with Maven with a parent POM:

```xml
Copy<parent>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-parent</artifactId>
  <version>Brixton.M1</version>
</parent>
<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>http://repo.spring.io/milestone</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>
```

or as a BOM (dependency management only)

```xml
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
    <artifactId>spring-cloud-starter-parent</artifactId>
    <version>Brixton.M1</version>
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

or with gradle:

```
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:0.5.3.RELEASE"
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
    mavenBom 'org.springframework.cloud:spring-cloud:Brixton.M1'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```

#SpringOne 2GX 2015 is here! [SpringOne2GX in Washington, DC](http://www.springone2gx.com) is going on right now. It's simply the best opportunity to find out first hand all that's going on and to provide direct feedback.

#Spring Cloud talks at SpringOne

-   [Getting Started with Spring Cloud](https://2015.event.springone2gx.com/schedule/sessions/getting_started_with_spring_cloud.html) by [Josh Long](https://spring.io/team/jlong) and [Dave Syer](https://spring.io/team/dsyer)
-   [Developer Experience with Spring Cloud](https://2015.event.springone2gx.com/schedule/sessions/developer_experience_with_spring_cloud.html) by [Dave Syer](https://spring.io/team/dsyer) and [Spencer Gibb](https://spring.io/team/spencergibb)
-   [Spring Cloud at Netflix](https://2015.event.springone2gx.com/schedule/sessions/spring_cloud_at_netflix.html) by [Jon Schneider](https://2015.event.springone2gx.com/presenters/jon_schneider.html) and [Taylor Wicksell](https://2015.event.springone2gx.com/presenters/taylor_wicksell.html) from Netflix
-   [Cloud Native Java with Spring Cloud Services](https://2015.event.springone2gx.com/schedule/sessions/cloud_native_java_with_spring_cloud_services.html) by [Scott Frederick](https://spring.io/team/scottfrederick) and [Craig Walls](https://spring.io/team/cwalls)
-   [Securing Microservices with Spring Cloud Security](https://2015.event.springone2gx.com/schedule/sessions/securing_microservices_with_spring_cloud_security.html) by [Willl Tran](https://2015.event.springone2gx.com/presenters/will_tran.html)
-   [Spring Cloud \*: Exploring Alternative Spring Cloud Implementations](https://2015.event.springone2gx.com/schedule/sessions/spring_cloud_exploring_alternative_spring_cloud_implementations.html) by [Spencer Gibb](https://spring.io/team/spencergibb)
-   [Getting started with Spring Cloud (DCJUG)](http://www.meetup.com/dc-jug/events/225238964/) by [Spencer Gibb](https://spring.io/team/spencergibb)