---
title: Spring Cloud Brixton.RC1 is now available
source: https://spring.io/blog/2016/03/24/spring-cloud-brixton-rc1-is-now-available
scraped: 2026-02-23T19:21:12.726Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Spencer Gibb |  March 24, 2016 | 0 Comments
---

# Spring Cloud Brixton.RC1 is now available

_Engineering | Spencer Gibb |  March 24, 2016 | 0 Comments_

On behalf of the team, I am pleased to announce that the first release candidate for the [Spring Cloud Brixton](http://cloud.spring.io) Release Train is out. The milestone is available today and can be found in our [Spring Milestone repository](http://repo.spring.io/milestone).

#### [](#highlights)Highlights

Some of the highlights of the Brixton [Release Train](https://spring.io/blog/2015/06/26/spring-cloud-service-release-angel-sr3#release-train) are:

-   Spring Boot 1.3.x and Spring 4.2.x support
-   Cluster Leadership election and locks via Spring Cloud Cluster
-   Hashicorp Consul support for service registration/discovery & configuration via Spring Cloud Consul
-   Apache Zookeeper support for service registration/discovery, configuration via Spring Cloud Zookeper and leader election in Spring Cloud Cluster
-   Distributed tracing through the Spring Cloud Sleuth abstraction with two out of the box implementations: one supporting logging (ideal for log collectors and multiplexers like Logstash and Loggregator) and one supporting Twitter's Zipkin
-   Netflix [Atlas Telemetry System](http://techblog.netflix.com/2014/12/introducing-atlas-netflixs-primary.html) and the next generation [Spectator Metrics library](https://github.com/Netflix/spectator/wiki) are available in Spring Cloud Netflix
-   Spring Cloud Bus is now powered by the recently released [Spring Cloud Stream](https://spring.io/blog/2016/03/23/spring-cloud-stream-1-0-0-rc1-is-now-available)

#### [](#the-following-modules-are-part-of-brixtonrc1)The following modules are part of Brixton.RC1:

-   [Spring Cloud Commons](https://github.com/spring-cloud/spring-cloud-commons) 1.1.0.RC2
-   [Spring Cloud Config](http://cloud.spring.io/spring-cloud-config/) 1.1.0.RC1
-   [Spring Cloud Netflix](http://cloud.spring.io/spring-cloud-netflix/) 1.1.0.RC1
-   [Spring Cloud Security](http://cloud.spring.io/spring-cloud-security/) 1.1.0.RC1
-   [Spring Cloud AWS](http://cloud.spring.io/spring-cloud-aws/) 1.1.0.RC1
-   [Spring Cloud Bus](http://cloud.spring.io/spring-cloud-bus/) 1.1.0.RC1
-   [Spring Cloud Cloud Foundry](http://cloud.spring.io/spring-cloud-cloudfoundry/) 1.0.0.RC1
-   [Spring Cloud Cluster](https://github.com/spring-cloud/spring-cloud-cluster) 1.0.0.RC1
-   [Spring Cloud Consul](http://cloud.spring.io/spring-cloud-consul/) 1.0.0.RC1
-   [Spring Cloud Sleuth](http://cloud.spring.io/spring-cloud-sleuth/) 1.0.0.RC1
-   [Spring Cloud Stream](http://cloud.spring.io/spring-cloud-stream/) 1.0.0.RC1
-   [Spring Cloud Zookeeper](http://cloud.spring.io/spring-cloud-zookeeper/) 1.0.0.RC1

We are looking forward to a Brixton.RELEASE towards the beginning of April.

And, as always, we welcome feedback: either in [GitHub](https://github.com/spring-cloud), on [Stack Overflow](http://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloudOSS).

#### [](#notes)Notes:

A `@LoadBalanced` `RestTemplate` is no longer created by default. See the [updated documentation for details](https://github.com/spring-cloud/spring-cloud-commons/blob/master/docs/src/main/asciidoc/spring-cloud-commons.adoc#spring-resttemplate-as-a-load-balancer-client). You need to create it in your applications configuration. For example:

```java
Copy@Configuration
public class MyConfiguration {

    @LoadBalanced
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

Please note the correct BOM to use is `spring-cloud-dependencies` not `spring-cloud-starter-parent` (see Getting Started below).

#### [](#getting-started)Getting Started

The easiest way to get started with Brixton.RC1 is to head to [http://start.spring.io](http://start.spring.io). If you want to write your build file by hand with Maven with a BOM (dependency management only):

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
    <artifactId>spring-cloud-dependencies</artifactId>
    <version>Brixton.RC1</version>
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
    classpath "io.spring.gradle:dependency-management-plugin:0.5.6.RELEASE"
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
    mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Brixton.RC1'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```

If you happen to be in Barcelona mid-May, don’t miss the chance to join the [Spring I/O conference](http://www.springio.net) where there will be [various presentations](http://lanyrd.com/2016/springio16/) on Spring Cloud. Also, the registration for [SpringOne Platform](http://springoneplatform.io) (early August, Las Vegas) has opened recently, in case you want to benefit from early bird ticket pricing. The latter is also still open for [talk proposals](http://springoneplatform.io/submit) (but only until March 24, so hurry up!). So if you’re interested to give a talk about Spring or Pivotal-related technologies, feel free to submit!