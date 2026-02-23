---
title: Creating Docker images with Spring Boot 2.3.0.M1
source: https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1
scraped: 2026-02-23T13:51:24.458Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Phil Webb |  January 27, 2020 | 90 Comments
---

# Creating Docker images with Spring Boot 2.3.0.M1

_Engineering | Phil Webb |  January 27, 2020 | 90 Comments_

Spring Boot 2.3.0.M1 has just been released and it brings with it some interesting new features that can help you package up your Spring Boot application into Docker images. In this blog post we’ll take a look at the typical ways developers create Docker images, and show how they can be improved by using these new features.

## [](#common-docker-techniques)[](#common-docker-techniques)Common Docker Techniques

Although it’s always been possible to convert the fat jars produced by Spring Boot into Docker images, it’s pretty easy to make less than optimal results. If you do a web search for "dockerize spring boot app", the chances are high you’ll find an article or blog post suggesting you create a dockerfile that looks something like this:

```
CopyFROM openjdk:8-jdk-alpine
EXPOSE 8080
ARG JAR_FILE=target/my-application.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

Whilst this approach works fine, and it’s nice and concise, there are a few things that are sub-optimal.

The first problem with above file is that the jar file is not unpacked. There’s always a certain amount of overhead when running a fat jar, and in a containerized environment this can be noticeable. It’s generally best to unpack your jar and run in an exploded form.

The second issue with the file is that it isn’t very efficient if you frequently update your application. Docker images are built in layers, and in this case your application and all its dependencies are put into a single layer. Since you probably recompile your code more often than you upgrade the version of Spring Boot you use, it’s often better to separate things a bit more. If you put jar files in the layer before your application classes, Docker often only needs to change the very bottom layer and can pick others up from its cache.

Two new features are introduced in Spring Boot 2.3.0.M1 to help improve on these existing techniques: buildpack support and layered jars.

## [](#buildpacks)[](#buildpacks)Buildpacks

If you’ve ever used an application platform such as Cloud Foundry or Heroku then you’ve probably used a buildpack, perhaps without even realizing it! Buildpacks are the part of the platform that takes your application and converts it into something that the platform can actually run. For example, Cloud Foundry’s Java buildpack will notice that you’re pushing a `.jar` file and automatically add a relevant JRE.

Until relatively recently buildpacks were tightly coupled to the platform and you couldn’t easily use them independently. Thankfully they’ve now broken free, and with [Cloud Native Buildpacks](https://buildpacks.io/) you can use them to create Docker compatible images that you can run anywhere.

Spring Boot 2.3.0.M1 includes buildpack support directly for both Maven and Gradle. This means you can just type a single command and quickly get a sensible image into your locally running Docker daemon. For Maven you can type `mvn spring-boot:build-image`, with Gradle it’s `gradle bootBuildImage`. The name of the published image will be your application name and the tag will be the version.

Let’s have a look at an example using Maven:

First create a new Spring Boot project using start.spring.io:

$ curl [https://start.spring.io/starter.zip](https://start.spring.io/starter.zip) -d bootVersion=2.3.0.M1 -d dependencies=web -o demo.zip $ unzip demo.zip

Next ensure you have a local Docker installed and running, then type:

$ ./mvnw spring-boot:build-image

It will take a little time to run the first time around, but subsequent calls will be quicker. You should see something like this in the build log:

\[INFO\] Building image 'docker.io/library/demo:0.0.1-SNAPSHOT' \[INFO\] \[INFO\] > Pulling builder image 'docker.io/cloudfoundry/cnb:0.0.43-bionic' 100% \[INFO\] > Pulled builder image 'cloudfoundry/cnb@sha256:c983fb9602a7fb95b07d35ef432c04ad61ae8458263e7fb4ce62ca10de367c3b' \[INFO\] > Pulling run image 'docker.io/cloudfoundry/run:base-cnb' 100% \[INFO\] > Pulled run image 'cloudfoundry/run@sha256:ba9998ae4bb32ab43a7966c537aa1be153092ab0c7536eeef63bcd6336cbd0db' \[INFO\] > Executing lifecycle version v0.5.0 \[INFO\] > Using build cache volume 'pack-cache-5cbe5692dbc4.build' \[INFO\] \[INFO\] > Running detector \[INFO\] \[detector\] 6 of 13 buildpacks participating ... \[INFO\] \[INFO\] > Running restorer \[INFO\] \[restorer\] Restoring cached layer 'org.cloudfoundry.openjdk:2f08c469c9a8adea1b6ee3444ba2a8242a7e99d87976a077faf037a9eb7f884b' ... \[INFO\] \[INFO\] > Running cacher \[INFO\] \[cacher\] Reusing layer 'org.cloudfoundry.openjdk:2f08c469c9a8adea1b6ee3444ba2a8242a7e99d87976a077faf037a9eb7f884b' \[INFO\] \[cacher\] Reusing layer 'org.cloudfoundry.jvmapplication:executable-jar' \[INFO\] \[cacher\] Caching layer 'org.cloudfoundry.springboot:spring-boot' \[INFO\] \[cacher\] Reusing layer 'org.cloudfoundry.springautoreconfiguration:46ab131165317d91fd4ad3186abf755222744e2d277dc413def06f3ad45ab150' \[INFO\] \[INFO\] Successfully built image 'docker.io/library/demo:0.0.1-SNAPSHOT'

That’s it! Your application has been compiled, packaged and converted to a Docker image. You can test it using:

$ docker run -it -p8080:8080 demo:0.0.1-SNAPSHOT

Note

Unfortunately `M1` does not support Windows but it should work fine on a Mac or in a Linux VM. If you’re using Windows, please use `2.3.0.BUILD-SNAPSHOT` for the time being.

The built-in support provided by Spring Boot provides a great way to get started with buildpacks. Since it’s an implementation of the buildpack platform specification, it’s also easy to migrate to more powerful buildpack tools such as [`pack`](https://github.com/buildpacks/pack) or [`kpack`](https://github.com/pivotal/kpack) with confidence that the same image will be produced.

## [](#layered-jars)[](#layered-jars)Layered Jars

It’s possible that you might not want to use buildpacks to create your images. Perhaps you have existing tools that are built around dockerfiles, or perhaps you just prefer them. Either way, we wanted to make it also easier to create optimized Docker images that can be built with a regular dockerfile so we’ve added support for "layered jars".

Spring Boot has always supported its own "fat jar" format that allows you to create an archive that you can run using `java -jar`. If you’ve ever looked into the contents of that jar, you’d see a structure that looks like this:

META-INF/ MANIFEST.MF org/ springframework/ boot/ loader/ ... BOOT-INF/ classes/ ... lib/ ...

The jar is organized into three main parts:

-   Classes used to bootstrap jar loading
    
-   Your application classes in `BOOT-INF/classes`
    
-   Dependencies in `BOOT-INF/lib`
    

Since this format is unique to Spring Boot, it’s possible for us to evolve it in interesting ways. With Spring Boot `2.3.0.M1` we’re providing a new `layout` type called `LAYERED_JAR`.

If you opt-in to the layered format and peek at the jar structure, you’ll see something like this:

META-INF/ MANIFEST.MF org/ springframework/ boot/ loader/ ... BOOT-INF/ layers/ / classes/ ... lib/ ... / classes/ ... lib/ ... layers.idx

You still see the bootstrap loader classes (you can still run `java -jar`) but now the `lib` and `classes` folders have been split up and categorized into layers. There’s also a new `layers.idx` file that provides the order in which layers should be added.

Initially, we’re providing the following layers out-of-the box:

-   `dependencies` (for regular released dependencies)
    
-   `snapshot-dependencies` (for snapshot dependencies)
    
-   `resources` (for static resources)
    
-   `application` (for application classes and resources)
    

This layering is designed to separate code based on how likely it is to change between application builds. Library code is less likely to change between builds, so it is placed in its own layers to allow tooling to re-use the layers from cache. Application code is more likely to change between builds so it is isolated in a separate layer.

### [](#extracting-layers)[](#extracting-layers)Extracting layers

Even with the new format, there are still a few hoops you need to jump though in order to extract the files so that they can be copied by your `dockerfile`. Those loader classes need to be in the root of your jar, but you probably want them in an actual layer when you build the image. Of course, you can do this with some combination of `unzip` and `mv`, but we’ve tried to make it even easier by introducing the idea of "jar modes".

A `jarmode` is a special system property that you can set when you launch the jar. It allows the bootstrap code to run something entirely different from your application. For example, something that extracts the layers.

Here’s how you can launch your jar with a `layertools` jar mode:

$ java -Djarmode=layertools -jar my-app.jar

This will provide the following output:

Usage: java -Djarmode=layertools -jar my-app.jar

Available commands: list List layers from the jar that can be extracted extract Extracts layers from the jar for image creation help Help about any command

In this mode you can either `list` or `extract` layers.

### [](#writing-the-dockerfile)[](#writing-the-dockerfile)Writing the `dockerfile`

Let’s continue with the sample application that we generated above and add a `dockerfile` to it.

Start by editing the `pom.xml` and add the following:

```
Copy<build>
	<plugins>
		<plugin>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-maven-plugin</artifactId>
			<configuration>
				<layout>LAYERED_JAR</layout>
			</configuration>
		</plugin>
	</plugins>
</build>
```

Then rebuild the jar:

$ mvn clean package

All being well, we should now have a layered jar with `jarmode` support. Test it with the following:

$ java -Djarmode=layertools -jar target/demo-0.0.1-SNAPSHOT.jar list

You should see the following output which tells us the layers and the order that they should be added:

dependencies snapshot-dependencies resources application

We can now craft a `dockerfile` that extracts and copies each layer. Here’s an example:

FROM adoptopenjdk:11-jre-hotspot as builder WORKDIR application ARG JAR\_FILE=target/\*.jar COPY ${JAR\_FILE} application.jar RUN java -Djarmode=layertools -jar application.jar extract

FROM adoptopenjdk:11-jre-hotspot WORKDIR application COPY --from=builder application/dependencies/ ./ COPY --from=builder application/snapshot-dependencies/ ./ COPY --from=builder application/resources/ ./ COPY --from=builder application/application/ ./ ENTRYPOINT \["java", "org.springframework.boot.loader.JarLauncher"\]

This is a multi-stage dockerfile. The `builder` stage extracts the folders that are needed later. Each of the `COPY` commands relates to the layers that we listed earlier.

To build the image we can run:

$ docker build . --tag demo

Then we can test it:

$ docker run -it -p8080:8080 demo:latest

## [](#summary)[](#summary)Summary

With buildpacks, dockerfiles and existing plugins such as [jib](https://github.com/GoogleContainerTools/jib), there’s certainly no shortage of ways to create Docker images. Each approach has pros and cons, but hopefully the new features we’re shipping in Spring Boot 2.3 will be helpful no matter which approach you choose.

Spring Boot 2.3 is currently scheduled to be released at the end of April and we’re very interested in feedback on the Docker images before then (raise issues, comment here or chat on Gitter).

Happy containerizing!