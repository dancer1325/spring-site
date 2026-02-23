---
title: Spring Cloud Greenwich Service Release 5 (SR5) is available.
source: https://spring.io/blog/2020/02/01/spring-cloud-greenwich-service-release-5-sr5-is-available
scraped: 2026-02-23T14:13:00.653Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Spencer Gibb |  February 01, 2020 | 1 Comment
---

# Spring Cloud Greenwich Service Release 5 (SR5) is available.

_Releases | Spencer Gibb |  February 01, 2020 | 1 Comment_

On behalf of the community, I am pleased to announce that the Service Release 5 (SR5) of the [Spring Cloud Greenwich](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Greenwich.SR5/). You can check out the Greenwich [release notes](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes) or the [Spring Cloud Project](https://github.com/orgs/spring-cloud/projects/35) for more information.

## [](#notable-changes-in-the-greenwich-release-train)Notable Changes in the Greenwich Release Train

This release contains bug fixes, minor enhancements and documentation updates.

This is the final scheduled release for the Greenwich Release Train (see [here](https://github.com/spring-cloud/spring-cloud-release/wiki/Supported-Versions#supported-releases) for more details). We reccomend you upgrade to Hoxton as soon as possible. Greenwich.SR5 is based on Spring Boot 2.1.12.

### [](#spring-cloud-commons)Spring Cloud Commons

In order to support merging lists from YAML in config client, a [change was made](https://github.com/spring-cloud/spring-cloud-commons/issues/611) so that each `PropertySource` is added to the environment individually rather than to a composite.

---

The following modules were updated as part of Greenwich.SR5:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Build | 2.1.10.RELEASE |  
| Spring Cloud Sleuth | 2.1.7.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/71?closed=1)) | Spring Cloud Consul | 2.1.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/45?closed=1)) | Spring Cloud Gateway | 2.1.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/33?closed=1)) | Spring Cloud Contract | 2.1.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/60?closed=1)) | Spring Cloud Netflix | 2.1.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/87?closed=1)) | Spring Cloud Gcp | 1.1.5.RELEASE |  
| Spring Cloud Config | 2.1.6.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/73?closed=1)) | Spring Cloud Openfeign | 2.1.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-openfeign/milestone/20?closed=1)) | Spring Cloud Commons | 2.1.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/69?closed=1)) | Spring Cloud Aws | 2.1.4.RELEASE |  
| Spring Cloud Vault | 2.1.5.RELEASE |  
| Spring Cloud Bus | 2.1.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-bus/milestone/41?closed=1)) | Spring Cloud Kubernetes | 1.0.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-kubernetes/milestone/17?closed=1))

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Greenwich.SR5</version>
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
Copyplugins {
  id 'org.springframework.boot' version '2.1.12.RELEASE'
  id 'io.spring.dependency-management' version '1.0.8.RELEASE'
  id 'java'
}
group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'
repositories {
  mavenCentral()
}
dependencies {
  implementation 'org.springframework.cloud:spring-cloud-starter-config'
  implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
  // ...
}
```