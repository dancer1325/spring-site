---
title: Spring Cloud Edgware.SR6 Released
source: https://spring.io/blog/2019/05/29/spring-cloud-edgware-sr6-released
scraped: 2026-02-23T14:46:10.744Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ryan Baxter |  May 29, 2019 | 0 Comments
---

# Spring Cloud Edgware.SR6 Released

_Releases | Ryan Baxter |  May 29, 2019 | 0 Comments_

On behalf of the community, I am pleased to announce that the Service Release 6 (SR6) of the [Spring Cloud Edgware](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Edgware.SR6/). You can check out the Edgware [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes).

## [](#edgware-end-of-life-reminder)Edgware End Of Life Reminder

As a reminder, the [Edgware release train will reach EOL status](https://spring.io/blog/2018/07/30/spring-cloud-edgware-eol-aug-1st-2019) on August 1st, 2019.

## [](#notable-changes-in-the-edgware-release-train)Notable Changes in the Edgware Release Train

### [](#spring-cloud-netflix)Spring Cloud Netflix

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=is%3Aclosed+milestone%3A1.4.7.RELEASE)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A1.3.6.RELEASE)

### [](#spring-cloud-config)Spring Cloud Config

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/milestone/56?closed=1)

### [](#spring-cloud-commons)Spring Cloud Commons

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/issues?q=is%3Aclosed+milestone%3A1.3.6.RELEASE)

### [](#spring-cloud-contract)Spring Cloud Contract

-   [Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/issues?q=is%3Aclosed+milestone%3A1.2.7.RELEASE)

### [](#spring-cloud-vault)Spring Cloud Vault

-   Upgraded to Vault 1.1.3

The following modules were updated as part of Edgware.SR6:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Starter | Edgware.SR6 |   | Spring Cloud Release | Edgware.SR6 |   | Spring Cloud Security | 1.2.4.RELEASE |   | Spring Cloud Bus | 1.3.5.RELEASE |   | Spring Cloud Stream | Ditmars.SR5 |   | Spring Cloud Task | 1.2.4.RELEASE |   | Spring Cloud Netflix | 1.4.7.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/issues?q=is%3Aclosed+milestone%3A1.4.7.RELEASE)) | Spring Cloud Sleuth | 1.3.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/issues?q=is%3Aclosed+milestone%3A1.3.6.RELEASE)) | Spring Cloud Config | 1.4.7.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/56?closed=1)) | Spring Cloud | Edgware.SR6 |   | Spring Cloud Dependencies | Edgware.SR6 |   | Spring Cloud Commons | 1.3.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/56?closed=1)) | Spring Cloud Build | 1.3.13.RELEASE |   | Spring Cloud Vault | 1.1.3.RELEASE |   | Spring Cloud Zookeeper | 1.2.3.RELEASE |   | Spring Cloud Contract | 1.2.7.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/issues?q=is%3Aclosed+milestone%3A1.2.7.RELEASE)) | Spring Cloud Aws | 1.2.4.RELEASE |   | Spring Cloud Consul | 1.3.6.RELEASE |   | Spring Cloud Cloudfoundry | 1.1.3.RELEASE |   | Spring Cloud Function | 1.0.2.RELEASE |   | Spring Cloud Gateway | 1.0.3.RELEASE |  

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Edgware.SR6</version>
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

```
Copybuildscript {
    dependencies {
        classpath "io.spring.gradle:dependency-management-plugin:1.0.2.RELEASE"
    }
}

apply plugin: "io.spring.dependency-management"

dependencyManagement {
    imports {
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Edgware.SR6'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```