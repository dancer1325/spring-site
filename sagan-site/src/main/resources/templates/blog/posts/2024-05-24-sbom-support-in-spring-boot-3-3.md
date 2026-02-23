---
title: SBOM support in Spring Boot 3.3
source: https://spring.io/blog/2024/05/24/sbom-support-in-spring-boot-3-3
scraped: 2026-02-23T08:37:26.800Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Moritz Halbritter |  May 24, 2024 | 5 Comments
---

# SBOM support in Spring Boot 3.3

_Engineering | Moritz Halbritter |  May 24, 2024 | 5 Comments_

Spring Boot 3.3.0 [has been released](https://spring.io/blog/2024/05/23/spring-boot-3-3-0-available-now), and it contains support for SBOMs. [SBOM](https://en.wikipedia.org/wiki/Software_supply_chain) stands for "Software Bill of Materials" and describes the components used to build a software artifact. In the context of this blog post, that's your Spring Boot application. These SBOMs are useful because they describe exactly what your application contains. With that information, you can assess if a security vulnerability affects your application, or use automated security tools to scan your applications and alert you on security vulnerabilities.

There are multiple SBOM formats out there, the most widely used ones are [CycloneDX](https://cyclonedx.org/), [SPDX](https://spdx.dev/), and [Syft](https://github.com/anchore/syft). Spring Boot 3.3.0 supports CycloneDX out of the box. The support consists of three pillars:

-   The configuration of the CycloneDX plugin to generate the SBOM when the application is built
-   The packaging of the generated SBOM file into the uber jar
-   An actuator endpoint to expose the generated SBOM (if enabled)

Let's see how this works in action:

First, generate a new project on [start.spring.io](https://start.spring.io) (make sure to select Spring Boot 3.3.0), and include the following dependencies:

-   Spring Web
-   Actuator

Now open the generated project in your IDE, and, if you're using Gradle, put this in your `build.gradle`:

```groovy
Copyplugins {
  id 'org.cyclonedx.bom' version '1.8.2'
}
```

This applies the [CycloneDX Gradle plugin](https://github.com/CycloneDX/cyclonedx-gradle-plugin) to your build. Spring Boot detects this and takes care of the configuration of the plugin, no further changes are needed on your side.

If you're using Maven, put this in your `pom.xml`:

```xml
Copy<plugins>
  <plugin>
    <groupId>org.cyclonedx</groupId>
    <artifactId>cyclonedx-maven-plugin</artifactId>
  </plugin>
</plugins>
```

This adds the [CycloneDX Maven plugin](https://github.com/CycloneDX/cyclonedx-maven-plugin) to your build. Spring Boot automatically manages the version of this plugin through its parent and also takes care of configuring the plugin.

Now build your uber jar with `gradle build` or `mvn package`. During the build, Spring Boot generates an SBOM with the help of the CycloneDX plugins and includes the SBOM in the uber jar. If you take a look at the contents of the uber jar, you'll find the SBOM in `META-INF/sbom/application.cdx.json`. Spring Boot also adds the location and the format to the jar manifest so that scanning tools can find it:

```
CopySbom-Location: META-INF/sbom/application.cdx.json
Sbom-Format: CycloneDX
```

Now, wouldn't it be nice if you could ask your running application to give you the SBOM so that you know exactly what's running on your servers?

## [](#exposing-the-sbom-via-the-actuator)Exposing the SBOM via the actuator

For that, we need to expose the SBOM actuator endpoint, which by default is not exposed. That's quite easy, though. Add the following to your application configuration file:

```properties
Copymanagement.endpoints.web.exposure.include=health,sbom
```

Now rebuild the application and run it from the jar file. After startup is complete, you can query the SBOM actuator endpoint:

```
Copycurl http://localhost:8080/actuator/sbom

HTTP/1.1 200
Content-Type: application/vnd.spring-boot.actuator.v3+json

{"ids":["application"]}
```

This will return some JSON containing the ids of all SBOMs. There can be multiple SBOMs: one describing your application, one describing your JVM, one describing your operating system, etc. By default, there's only one SBOM named `application`, describing your Spring Boot application.

Take a look at the `application` SBOM:

```
Copycurl -i http://localhost:8080/actuator/sbom/application

HTTP/1.1 200
Content-Type: application/vnd.cyclonedx+json
Content-Length: 161738

{
  "bomFormat" : "CycloneDX",
  "specVersion" : "1.5",
  "serialNumber" : "urn:uuid:3842be09-b12e-45ed-8038-babb72a53750",
  "version" : 1,
  ...
```

This will return a big JSON document describing the contents of your application. It contains information about all dependencies of your application with their hashes and licenses, websites and issue tracker URLs, etc. It also contains data about your application, e.g. the version number, when the SBOM has been generated, etc. With that information, you'll know exactly what's running on your servers. This covers the basic usage of the SBOM support. Let's now look at the more advanced features.

## [](#application-sbom-in-a-different-format)Application SBOM in a different format

In case you don't want to use a CycloneDX SBOM for your application, but prefer a different format, you can do that too. However, you then have to configure the plugin which creates the SBOM yourself. Spring Boot, at the time of writing, only automatically configures the CycloneDX plugin.

After you have configured the build to create the SBOM, you can then point Spring Boot to this SBOM with the `management.endpoint.sbom.application.location` property. If the referenced SBOM is in CycloneDX, SPDX, or Syft format, Spring Boot will automatically detect its type, which will be used for the `Content-Type` header of the actuator response. If you're using a different format, you can explicitly specify the media type of the SBOM with the `management.endpoint.sbom.application.media-type` property. This example shows how to use an SBOM in the SPDX format:

```properties
Copymanagement.endpoint.sbom.application.location=classpath:/sbom/application.spdx.json
```

For that to work, the SPDX SBOM has to be stored in `src/main/resources/sbom/application.spdx.json`.

## [](#include-additional-sboms)Include additional SBOMs

Spring Boot supports multiple SBOMs per application. If you want to include additional SBOMs, you can use the configuration properties under `management.endpoint.sbom.additional`. For example, adding an SBOM named `jvm` works like this:

```properties
Copymanagement.endpoint.sbom.additional.jvm.location=file:/path/to/sbom.json
```

This `jvm` SBOM is stored on the filesystem in `/path/to/sbom.json`. You'll need to generate this SBOM yourself or your JVM vendor needs to provide one.

As with the application SBOM, if the referenced SBOM is in CycloneDX, SPDX, or Syft format, Spring Boot will automatically detect its type. Otherwise, you can use the following property to set the media type yourself:

```properties
Copymanagement.endpoint.sbom.additional.jvm.media-type=application/json
```

After starting the application with this configuration, you can run the following curl command again:

```
Copycurl -i http://localhost:8080/actuator/sbom

HTTP/1.1 200
Content-Type: application/vnd.spring-boot.actuator.v3+json

{"ids":["application","jvm"]}
```

Now the endpoint returns two SBOMs: `application` and `jvm`. You can access the `jvm` SBOM with this curl command:

```
Copycurl -i http://localhost:8080/actuator/sbom/jvm

HTTP/1.1 200
Content-Type: application/spdx+json
Content-Length: 48739

<content of the jvm SBOM>
```

You can include as many SBOMs as you like, they will all be exposed on the actuator endpoint.

## [](#optional-sboms)Optional SBOMs

Note that the referenced SBOM file or resource from the configuration must exist, otherwise the startup fails. You can prefix the SBOM location with `optional:` to prevent startup failure - if the file isn't there, Spring Boot will just ignore it.

## [](#wrapping-up)Wrapping up

We hope you like that feature and that it helps you to secure your software supply chain.

Please let us know what you think about this new feature and, as always, if you find any issues, please don't hesitate to [visit our issue tracker](https://github.com/spring-projects/spring-boot/issues).