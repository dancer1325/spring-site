---
title: Paketo Buildpacks Bionic End Of Support
source: https://spring.io/blog/2023/09/22/paketo-buildpacks-bionic-end-of-support
scraped: 2026-02-23T09:20:30.052Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Scott Frederick |  September 22, 2023 | 0 Comments
---

# Paketo Buildpacks Bionic End Of Support

_Engineering | Scott Frederick |  September 22, 2023 | 0 Comments_

The Spring Boot plugins for Maven and Gradle provide the ability to [build Docker images using Cloud Native Buildpacks](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#container-images.buildpacks). By default, Spring Boot uses the CNB builders provided by the [Paketo Buildpacks](https://paketo.io/) project.

# [](#whats-changed)What's Changed

The Paketo Buildpacks project has announced that Ubuntu 18.04 Bionic-based builders are no longer supported, in favor of Ubuntu 22.04 Jammy-based builders. See the [Paketo announcement](https://blog.paketo.io/posts/bionic-eos/) for more details on the builders that are affected by this change.

The Maven and Gradle plugins for Spring Boot versions 3.1 and earlier use the Bionic Base Builder by default when building images to run applications on a JVM, and the Bionic Tiny Builder by default when building images from native executables using GraalVM. Paketo Jammy builders will be the default starting with Spring Boot 3.2.

Users of Spring Boot 3.1 and earlier should make changes to their build configurations to migrate to the Paketo Jammy builders in order to receive regular updates to buildpacks and the dependencies that buildpacks install.

**Update November 23 2023:** The Paketo team [has announced](https://blog.paketo.io/posts/paketo-bionic-builder-is-unsafe/) that they will remove access to the Paketo Bionic builders in January 2024. To make this transition easier, Spring Boot has changed the default builder to the Paketo Jammy builder in the maintenance release for versions `2.7.18`, `3.0.13`, and `3.1.6`.

# [](#migration)Migration

## [](#maven)Maven

To use the Paketo Jammy builder in a Spring Boot build using Maven, the builder should be configured as shown in this example:

```xml
Copy<project>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <image>
                        <builder>paketobuildpacks/builder-jammy-base:latest</builder>
                    </image>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

See the Spring Boot Maven plugin [documentation](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/htmlsingle/#build-image.customization) for more information on configuring the plugin.

## [](#gradle)Gradle

When using Gradle with Groovy, the builder should be configured as shown in this example:

```groovy
Copytasks.named("bootBuildImage") {
	builder = "paketobuildpacks/builder-jammy-base:latest"
}
```

When using Gradle with Kotlin, the builder should be configured as shown in this example:

```kotlin
Copytasks.named<BootBuildImage>("bootBuildImage") {
	builder.set("paketobuildpacks/builder-jammy-base:latest")
}
```

See the Spring Boot Gradle plugin [documentation](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/htmlsingle/#build-image.customization) for more information on configuring the plugin.