---
title: All together now: Spring Boot 3.2, GraalVM native images, Java 21, and virtual threads with Project Loom,
source: https://spring.io/blog/2023/09/09/all-together-now-spring-boot-3-2-graalvm-native-images-java-21-and-virtual
scraped: 2026-02-23T09:24:46.379Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 09, 2023 | 7 Comments
---

# All together now: Spring Boot 3.2, GraalVM native images, Java 21, and virtual threads with Project Loom,

_Engineering | Josh Long |  September 09, 2023 | 7 Comments_

This has been a very long time in coming, but finally we can create GraalVM native images that use Spring Boot (via Spring Boot 3.2) and Java 21's virtual threads (Project Loom)!

Why does all this matter? Each of these individual things, Project Loom, and GraalVM native images, offer compelling runtime characteristics. I've waited so very long for these to converge! Let's talk about them each in turn.

## [](#graalvm-native-images)GraalVM Native Images

GraalVM is an OpenJDk distribution that provides some extra utilities, including a utility called `native-image` that does ahead-of-time (AOT) compilation on your code. We're not going to get into all of its utility here, but basically it takes your code, throws away stuff that you don't need, and then compiles the rest into blazing-fast, operating-system and architecture specific native code. The results are breathtaking, akin to what you'd get if you compiled a C or Go program, for example. The resulting binaries start up in no time at all and take a lot less RAM at runtime. Imagine being able to deploy an existing Spring Boot application and have it take tens, not hundreds, of megabytes of RAM and startup in a few hundred milliseconds. Now you can. Just run `./gradlew nativeCompile` or `./mvnw -Pnative native:compile` and stand back. Spring Boot has supported GraalVM native images in production since Spring Boot 3.0 came out in November of 2022.

## [](#project-loom)Project Loom

Project Loom brings transparent fibers to the JVM. As things stand today, in Java 20 or earlier, IO is *blocking*. Call `int InputStream#read()` and you might have to wait for the next byte to finally arrive. In `java.io.File` IO, there's very rarely much of a delay. On the network, however, you just don't really ever know. Clients might disconnect. Clients might be going through a tunnel. Again, it's just very hard to say. During this time, the program flow is said to be *blocked* from proceeding on the thread of execution. In the following snippet, we have no way of knowing when we'll see the word `after` printed. Might be a nanosecond from now. Might be a week from now. It's *blocking*.

```java
CopyInputStream in = ... 
System.out.println("before");
int next = in.read(); 
System.out.println("after");
```

This is bad enough, but it's made worse by the current architecture of threading in Java prior to Java 21. Presently, each thread maps, more or less, to a native operating system thread. It's expensive to create more threads, too, taking about two megabytes of RAM.

There are ways around this, of course. You could use non-blocking IO, as enabled by Java NIO (`java.nio.\*`). In this model, you ask for bytes and register a callback that executes only when there are actually bytes available. No waiting, no blocking. This approach has the significant benefit of keeping us off threads when there's nothing to be done, allowing others to use those threads in the meantime. It's a bit tedious, however, and low-level. Spring has amazing support for reactive programming, which offers a functional-style programming model on top of non-blocking IO. It works well. But, it requires changing the way you write code. Wouldn't it be nice if you could just take that existing code, as demonstrated above, and have it do the right thing, transparently moving the flow of execution off the thread when there's nothing happening, and then resuming the flow of execution when there is? Absolutely it would. That's the promise of Project Loom. Take the code above, and make sure you execute it in a *virtual* thread (easy enough, you can use `ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()`), and *it just works*!

## [](#spring-boot-32)Spring Boot 3.2

Your typical Spring Boot application uses thread pools (`Executor` and `ExecutorService` instances) all over the place! In your web services, in your messaging logic, etc. And now, in the new Spring Boot 3.2 milestones (the final release is due November 2023), you can have Spring Boot use virtual executors, with only a single, simple, property: `spring.threads.virtual.enabled=true`.

## [](#all-together-now)All Together Now

Bear in mind: Spring Boot 3.2 is not yet GA. Java 21 is not yet GA. GraalVM supporting Java 21 is not GA. Things are a bit rough, but I've been yearning to try everything all together: a GraalVM native image, with virtual threads, in a Spring Boot application. When everything looked like it was in place to try, I found a small bug in the [GraalVM compiler to overcome](https://twitter.com/fniephaus/status/1699344224523518060)! Nothing the fantastic GraalVM team couldn't handle, of course, but as I said: things are a little *rough*. Worth it, though! Let's get all the pieces in place so you can try it out.

### [](#installing-graalvm-for-java-21)Installing GraalVM for Java 21

First, we need to install GraalVM and Java 21. I'm on a Mac with the Apple Silicon / ARM architecture, so I chose `graalvm-community-java21-darwin-aarch64-dev.tar.gz` from [the latest release (as of this writing)](https://github.com/graalvm/graalvm-ce-dev-builds/releases/tag/24.0.0-dev-20230907_0337). You could just download and unzip it, being sure to configure key environment variables like `JAVA_HOME` and `PATH` correctly. I'm a fan of the [SDKMan project](https://sdkman.io), so I wanted to use it to manage this newly downloaded release. I unzipped the `.tar.gz` to a folder called - `~/bin/graalvm-community-openjdk-21/`, and then ran the following command.

```shell
Copysdk install java graalvm-ce-21 $HOME/bin/graalvm-community-openjdk-21/Contents/Home
```

Then, to make sure it's available for everything:

```shell
Copysdk default java graalvm-ce-21
```

Open up a new shell and confirm it's worked:

```shell
Copy> native-image --version 
native-image 21 2023-09-19
GraalVM Runtime Environment GraalVM CE 21-dev+35.1 (build 21+35-jvmci-23.1-b14)
Substrate VM GraalVM CE 21-dev+35.1 (build 21+35, serial gc)

```

### [](#configuring-a-spring-boot-project-to-use-java-21)Configuring a Spring Boot project to use Java 21

Go to the [Spring Initializr (start.spring.io)](https://start.spring.io), specify version `3.2.0 (M2)` (or later, obviously), add `GraalVM` and `Web`, and then download the archive, open it, and load it into your IDE. We still need to configure the build to work with Java 21. This isn't ideal, yet, as Gradle doesn't really know about Java 21. But it will work. Basically. My prowess with Gradle is basically non-existent, but this configuration seems to work:

```gradle
Copyplugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.0-M2'
    id 'io.spring.dependency-management' version '1.1.3'
    id 'org.graalvm.buildtools.native' version '0.9.24'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '21'
}

graalvmNative {

    binaries {
        main {
            buildArgs.add('--enable-preview')
        }
    }
}

java {
    toolchain { languageVersion = JavaLanguageVersion.of(21) }
}

repositories {
    mavenCentral()
    maven { url 'https://repo.spring.io/snapshot' }
    maven { url 'https://repo.spring.io/milestone' }
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}

```

Re-import that into build configuration into your IDE.

Add the following property to `application.properties`:

```properties
Copyspring.threads.virtual.enabled=true
```

And then change your `main(String[] args)` class to look like this:

```java
Copypackage com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Set;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}

@RestController
class CustomersHttpController { 

    @GetMapping("/customers")
    Collection<Customer> customers() {
        return Set.of(new Customer(1, "A"), new Customer(2, "B"), new Customer(3, "C"));
    }

    record Customer(Integer id, String name) {
    }

}
```

You can run the program as usual: `./gradlew bootRun`. And it's using Project Loom! But for the real fun stuff: let's build a GraalVM native image! `./gradlew nativeCompile`. This might take a minute or two..

Once it's done, you can run the native binary in the `build` directory: `./build/native/nativeCompile/demo`. Now we're cookin' with gas!

We're basically at the finish line for this litle adventure, but let me just remind you - *one more time* - this is still not yet GA software! It will be by the end of November 2023, if everything goes to plan, but it's not yet. That's why getting this blog out is so valuable for me: I want you to try things out. Even Project Loom, which will land in part in Java 21, due in less than two weeks - on September 19th, 2023 - is not strictly speaking *all done*. We'll get part of it in this release, but there are two other columns of the support that you can try out today as preview featues, and if you find something, it's worth feeding that information back into the process so that these issues can be stamped out now, not later. After all, I just found a bug in the GraalVM compiler not two weeks ago! So, go try things out. It has never been a better time to be a Java developer. And these two things - Loom and GraalVM - are like free money. Implemented successfully, you'll get better runtime scalability, energy efficiency, startup time, RAM consumption, and more, in your Spring Boot workloads. Upgrade, try things out. I'll bet you'll love it.