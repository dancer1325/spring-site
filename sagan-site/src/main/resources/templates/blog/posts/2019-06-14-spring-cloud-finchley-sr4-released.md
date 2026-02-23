---
title: Spring Cloud Finchley SR4 Released
source: https://spring.io/blog/2019/06/14/spring-cloud-finchley-sr4-released
scraped: 2026-02-23T14:44:39.243Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  June 14, 2019 | 1 Comment
---

# Spring Cloud Finchley SR4 Released

_Releases | Marcin Grzejszczak |  June 14, 2019 | 1 Comment_

On behalf of the community, I am pleased to announce that the Service Release 4 (SR4) of the [Spring Cloud Finchley](https://cloud.spring.io) Release Train is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-dependencies/Finchley.SR4/). You can check out the Finchley [release notes for more information](https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes).

## [](#notable-changes-in-the-finchley-release-train)Notable Changes in the Finchley Release Train

### [](#spring-cloud-commons)Spring Cloud Commons

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-commons/milestone/60?closed=1)

### [](#spring-cloud-vault)Spring Cloud Vault

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-vault/milestone/32?closed=1)

### [](#spring-cloud-config)Spring Cloud Config

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-config/milestone/65?closed=1)

### [](#spring-cloud-gateway)Spring Cloud Gateway

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-gateway/milestone/23?closed=1)

### [](#spring-cloud-netflix)Spring Cloud Netflix

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-netflix/milestone/78?closed=1)

### [](#spring-cloud-sleuth)Spring Cloud Sleuth

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/61?closed=1)

### [](#spring-cloud-consul)Spring Cloud Consul

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-consul/milestone/36?closed=1)

### [](#spring-cloud-contract)Spring Cloud Contract

[Bug Fixes](https://github.com/spring-cloud/spring-cloud-contract/milestone/52?closed=1)

The following modules were updated as part of Finchley.SR4:

| Module | Version | Issues |--- |--- |--- |--- | Spring Cloud Commons | 2.0.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-commons/milestone/60?closed=1)) | Spring Cloud Openfeign | 2.0.4.RELEASE |   | Spring Cloud Dependencies | Finchley.SR4 |   | Spring Cloud Release | Finchley.SR4 |   | Spring Cloud Starter | Finchley.SR4 |   | Spring Cloud Stream | Elmhurst.SR3 |   | Spring Cloud Cloudfoundry | 2.0.2.RELEASE |   | Spring Cloud Task | 2.0.2.RELEASE |   | Spring Cloud Build | 2.0.6.RELEASE |   | Spring Cloud Vault | 2.0.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-vault/milestone/32?closed=1)) | Spring Cloud Zookeeper | 2.0.2.RELEASE |   | Spring Cloud Config | 2.0.5.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-config/milestone/65?closed=1)) | Spring Cloud Aws | 2.0.3.RELEASE |   | Spring Cloud Bus | 2.0.2.RELEASE |   | Spring Cloud | Finchley.SR4 |   | Spring Cloud Security | 2.0.2.RELEASE |   | Spring Cloud Gateway | 2.0.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-gateway/milestone/23?closed=1)) | Spring Cloud Netflix | 2.0.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-netflix/milestone/78?closed=1)) | Spring Cloud Sleuth | 2.0.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-sleuth/milestone/61?closed=1)) | Spring Cloud Consul | 2.0.3.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-consul/milestone/36?closed=1)) | Spring Cloud Contract | 2.0.4.RELEASE | ([issues](https://github.com/spring-cloud/spring-cloud-contract/milestone/52?closed=1)) | Spring Cloud Function | 1.0.2.RELEASE |  

As always, we welcome feedback on [GitHub](https://github.com/spring-cloud/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Finchley.SR4</version>
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
        mavenBom 'org.springframework.cloud:spring-cloud-dependencies:Finchley.SR4'
    }
}

dependencies {
    compile 'org.springframework.cloud:spring-cloud-starter-config'
    compile 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'
    ...
}
```