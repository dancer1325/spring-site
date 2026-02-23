---
title: Spring Cloud Sleuth OpenTelemetry (OTel) 1.1.0 Has Been Released
source: https://spring.io/blog/2022/09/16/spring-cloud-sleuth-opentelemetry-otel-1-1-0-has-been-released
scraped: 2026-02-23T10:41:17.221Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Marcin Grzejszczak |  September 16, 2022 | 2 Comments
---

# Spring Cloud Sleuth OpenTelemetry (OTel) 1.1.0 Has Been Released

_Releases | Marcin Grzejszczak |  September 16, 2022 | 2 Comments_

On behalf of the community, I am pleased to announce that the release of the [Spring Cloud Sletuh OTel 1.1.0](https://github.com/spring-cloud-incubator/spring-cloud-sleuth-otel/) project is available today. The release can be found in [Maven Central](https://repo1.maven.org/maven2/org/springframework/cloud/spring-cloud-sleuth-otel-dependencies/1.1.0/). You can check out the [reference documentation for more information](https://spring-projects-experimental.github.io/spring-cloud-sleuth-otel/docs/1.1.0/reference/html/index.html).

## [](#what-is-this)What is this?

Spring Cloud Sleuth OTel is an extension project to [Spring Cloud Sleuth](https://projects.spring.io/spring-cloud-sleuth/) that comes with an [OpenTelemetry](https://opentelemetry.io) tracer.

As always, we welcome feedback on [GitHub](https://github.com/spring-projects-experimental/spring-cloud-sleuth-otel/), on [Gitter](https://gitter.im/spring-cloud/spring-cloud), on [Stack Overflow](https://stackoverflow.com/questions/tagged/spring-cloud-sleuth), or on [Twitter](https://twitter.com/SpringCloud).

To get started with Maven with a BOM (dependency management only):

```
Copy
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2021.0.4</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-sleuth-otel-dependencies</artifactId>
            <version>1.1.0</version>
            <scope>import</scope>
            <type>pom</type>
        </dependency>
    </dependencies>
</dependencyManagement>
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-sleuth</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-sleuth-brave</artifactId> <!-- We want to exclude the default tracer coming from Sleuth... -->
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-sleuth-otel-autoconfigure</artifactId>  <!-- ... and we want to include the one coming from Spring Cloud Sleuth OTel -->
    </dependency>
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
mavenBom 'org.springframework.cloud:spring-cloud-dependencies:2021.0.4'
mavenBom 'org.springframework.cloud:spring-cloud-sleuth-otel-dependencies:1.1.0'
}
}

dependencies {
implementation('org.springframework.cloud:spring-cloud-starter-sleuth') {
    exclude group: 'org.springframework.cloud', module: 'spring-cloud-sleuth-brave' //  We want to exclude the default tracer coming from Sleuth...
}
implementation 'org.springframework.cloud:spring-cloud-sleuth-otel-autoconfigure' // ... and we want to include the one coming from Spring Cloud Sleuth OTel
}
```