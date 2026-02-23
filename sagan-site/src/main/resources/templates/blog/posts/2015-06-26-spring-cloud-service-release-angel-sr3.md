---
title: Spring Cloud service release: Angel.SR3
source: http://spring.io/blog/2015/06/26/spring-cloud-service-release-angel-sr3
scraped: 2026-02-23T19:48:28.291Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Dave Syer |  June 26, 2015 | 3 Comments
---

# Spring Cloud service release: Angel.SR3

_Releases | Dave Syer |  June 26, 2015 | 3 Comments_

The latest version of [Spring Cloud](http://projects.spring.io/spring-cloud/) is "Angel.SR3" and it is available now from the usual repositories (note the new naming convention, more detail below). Most components are now at 1.0.2.RELEASE, but spring-cloud-netflix is at 1.0.3.RELEASE. The starters and cli and also at 1.0.3.RELEASE, reflecting their dependency on Netflix. Angel.SR3 is a bugfix release for Angel.SR2 (formerly known as 1.0.2) and all existing projects are encouraged to upgrade to take advantage.

There are a few new features, the biggest of which is the new naming convention for the starter parent project (see below). Highlights include:

-   Support for slashes in git labels (via a special character sequence in the HTTP resource paths)
    
-   Optional git initialization on Config Server startup
    
-   Additional options for config clients to handle decryption themselves, including the ability to decrypt properties in `bootstrap.yml`.
    
-   Additional cryptography configuration options for new RSA and AES algorithms
    
-   A strategy for key rotation with a `TextEncryptorLocator` strategy that users can implement to look up keys dynamically.
    

## [](#release-train)Release Train

Spring Cloud is an umbrella project consisting of independent projects with, in principle, different release cadences. To manage the portfolio a BOM (Bill of Materials) is published with a curated set of dependencies on the individual project (see below). The release trains have names, not versions, to avoid confusion with the sub-projects. The names are an alphabetic sequence (so you can sort them chronologically) with names of London Tube stations ("Angel" is the first release, "Brixton" is the second). When point releases of the individual projects accumulate to a critical mass, or if there is a critical bug in one of them that needs to be available to everyone, the release train will push out "service releases" with names ending ".SRX", where "X" is a number.

The release train is a new thing with this release (Angel.SR3) but the older releases have been re-released (same artifact, different version) as "Angel,\[RELEASE,SR1,SR2\]" corresponding to 1.0.0, 1.0.1, 1.0.2 respectively. The release train label is actually only used explicitly in one artifact: "spring-cloud-starter-parent" (all the others have normal "Spring" release labels tied to their parent project). The starter parent is the one you can use as a BOM for dependency management or as a parent POM (Maven only). Example using the latest version with the config client and eureka (change the artifact ids to pull in other starters), with Maven with a parent POM:

```xml
Copy<parent>
  <groupId>org.springframework.cloud</groupId>
  <artifactId>spring-cloud-starter-parent</artifactId>
  <version>Angel.SR3</version>
</parent>
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

or as a BOM (dependency management only):

```xml
Copy<dependencyManagement>
  <dependencies>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-parent</artifactId>
    <version>Angel.SR3</version>
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

```groovy
Copybuildscript {
  dependencies {
    classpath "io.spring.gradle:dependency-management-plugin:0.4.0.RELEASE"
  }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
  imports {
    mavenBom 'org.springframework.cloud:spring-cloud:Angel.SR3'
  }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-eureka'
    ...
}
```

## [](#springone-2015)SpringOne 2015

I’ll be talking about Spring Cloud at this year’s SpringOne in Washington, DC. I’d love to see you there.

### [](#discounts)Discounts

The Early Bird price tier (June 13th - August 14th) is discounted $150. Register 4 and get the 5th pass free. Contact us with the names of your first 4 registrants for your complimentary pass code (conference admission only). Alumni, contact us for your discount code ($150 off any option).