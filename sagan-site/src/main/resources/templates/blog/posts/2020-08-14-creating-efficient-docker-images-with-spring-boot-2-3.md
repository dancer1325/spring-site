---
title: Creating Efficient Docker Images with Spring Boot 2.3
source: https://spring.io/blog/2020/08/14/creating-efficient-docker-images-with-spring-boot-2-3
scraped: 2026-02-23T13:50:57.014Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Madhura Bhave |  August 14, 2020 | 18 Comments
---

# Creating Efficient Docker Images with Spring Boot 2.3

_Engineering | Madhura Bhave |  August 14, 2020 | 18 Comments_

This is an update to the original blog post about [creating docker images with Spring Boot 2.3](https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1). There were a few things related to image creation that changed between the first milestone of Spring Boot 2.3 and the GA release.

The two new features introduced in Spring Boot 2.3 to help improve image creation techniques were: layered jars and buildpack support.

## [](#layered-jars)Layered Jars

The layered jar feature evolved quite a bit as we started adding support for custom layers. While the need to express layers that the jar should be split into for image creation was evident, changing the format of the jar to do so no longer seemed necessary. Spring Boot 2.3 includes support for layering a jar using a `layers.idx` file. The layers index file provides a list of layers and the parts of the jar that should be contained within them. Layers are written in the order that they should be added to the Docker/OCI image.

By default, the following layers are defined:

-   `dependencies` for any dependency whose version does not contain `SNAPSHOT`.
-   `spring-boot-loader` for the jar loader classes.
-   `snapshot-dependencies` for any dependency whose version contains `SNAPSHOT`.
-   `application` for application classes and resources.

The corresponding `layers.idx` file looks like this:

```
Copy  - "dependencies":
    - "BOOT-INF/lib/dependency1.jar"
    - "BOOT-INF/lib/dependency2.jar"
  - "spring-boot-loader":
    - "org/"
  - "snapshot-dependencies":
    - "BOOT-INF/lib/dependency3-SNAPSHOT.jar"
    - "BOOT-INF/lib/dependency4-SNAPSHOT.jar"    
  - "application":
    - "BOOT-INF/classes/"
    - "META-INF/"
```

The layers order is important as it determines how likely previous layers are to be cached when part of the application changes. The default order is `dependencies`, `spring-boot-loader`, `snapshot-dependencies`, `application`. Content that is least likely to change should be added first, followed by layers that are more likely to change.

To use this feature with Spring Boot 2.3, the layering feature must be explicitly enabled. The following example shows how to enable layering with the Maven plugin:

```
Copy  <project>
    <build>
      <plugins>
        <plugin>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-maven-plugin</artifactId>
          <version>{gradle-project-version}</version>
          <configuration>
            <layers>
              <enabled>true</enabled>
            </layers>
          </configuration>
        </plugin>
      </plugins>
    </build>
  </project>
```

NOTE: In the latest Spring Boot 2.4 snapshots, layering is [enabled by default](https://github.com/spring-projects/spring-boot/issues/20983).

Once a jar containing the `layers.idx` file has been created, the `layertools` jarmode can be used to craft a Dockerfile using those layers. Details on how to use the jarmode with a Dockerfile can be found in the [previous blog post](https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1).

## [](#cloud-native-buildpacks-support)Cloud Native Buildpacks Support

Support for Cloud Native Buildpacks via the Spring Boot Maven and Gradle plugin has not changed since the last blog post and the details on that can be found [here](https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1).

## [](#custom-layers)Custom Layers

While we think that the layers that we provide out-of-the-box will work for most Spring Boot applications, there might be a need to tune them based on your application's needs. For example, you might have some organization-wide dependencies that change at a different cadence than regular dependencies. This might warrant splitting those dependencies out into a separate layer. The `layers.idx` file can be customized using the Maven and Gradle plugins. The following example shows how to do so using a separate `layers.xml` file with the Maven plugin:

```
Copy<layers xmlns="http://www.springframework.org/schema/boot/layers"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.springframework.org/schema/boot/layers
              https://www.springframework.org/schema/boot/layers/layers-{spring-boot-xsd-version}.xsd">
    <application>
      <into layer="spring-boot-loader">
        <include>org/springframework/boot/loader/**</include>
      </into>
      <into layer="application" />
    </application>
    <dependencies>
      <into layer="snapshot-dependencies">
        <include>*:*:*SNAPSHOT</include>
      </into>
      <into layer="company-dependencies">
        <include>com.acme:*</include>
      </into>
      <into layer="dependencies"/>
    </dependencies>
    <layerOrder>
      <layer>dependencies</layer>
      <layer>spring-boot-loader</layer>
      <layer>snapshot-dependencies</layer>
      <layer>company-dependencies</layer>
      <layer>application</layer>
    </layerOrder>
</layers>
```

The configuration above creates an additional `company-dependencies` layer with all libraries with the `com.acme` groupId.

The [Paketo Spring Boot buildpack](https://github.com/paketo-buildpacks/spring-boot) has also been updated to support the `layers.idx` file so any customization that is applied to it will be reflected in the image created by the buildpack.

For more details on how to use layering and the buildpack integration to create optimized docker images, you can take a look at the reference documentation for the [Maven](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/html/) and [Gradle](https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/html/) plugins.