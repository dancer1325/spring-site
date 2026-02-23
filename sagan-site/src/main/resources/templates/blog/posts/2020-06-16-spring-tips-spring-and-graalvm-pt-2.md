---
title: Spring Tips: Spring and GraalVM (pt. 2)
source: https://spring.io/blog/2020/06/16/spring-tips-spring-and-graalvm-pt-2
scraped: 2026-02-23T13:57:12.340Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 16, 2020 | 5 Comments
---

# Spring Tips: Spring and GraalVM (pt. 2)

_Engineering | Josh Long |  June 16, 2020 | 5 Comments_

speaker: [Josh Long (@starbuxman)](http://twitter.com/starbuxman)

Hi Spring fans! Welcome to a very special, interregnum episode of Spring Tips where we revisit Spring and GraalVM native images. I wanted to get this video out in light of the recent [Spring Graal 0.7.1](https://spring.io/blog/2020/06/10/the-path-towards-spring-boot-native-applications) release which *drastically* simplifies things even compared to the last time we looked at Spring and Graal *waaay* [back in April 2020](https://spring.io/blog/2020/04/16/spring-tips-the-graalvm-native-image-builder-feature).

TL;DR: GraalVm is a JIT replacement that you can use with a stock-standard JVM, and that's worth looking into in its own right. GraalVM *also* offers a separate feature supporting native image compilation. This `native-image` builder takes bytecode and turns it into an architecture-specific binary that sheds the JVM and embeds something called SubstrateVM. Native images are *fast* to startup and they take *way* less memory at runtime. These qualities make it desirable in a containerized, cloud-centric environment.

In the April installment, I had to write out heaps of hand-crafted artisanal configuration. In this latest edition, it's possible to get a huge swath of applications working without variable configuration. In the video, I demonstrated how to get a Spring Data JPA (with Hibernate) and Apache Tomcat working. I also demonstrated how to get a reactive application working. Let's look at the reactive application first and then we'll look at the JPA example. The steps we'll take in the first example are common to most applications.

We're going to use GraalVM and Java 8 for this project. I'm using SDKManager to install various versions of Java: `sdk install java 20.1.0.r8-grl`. Then, you can optionally make it the default: `sdk default java 20.1.0.r8-grl`. You'll also need to install the native image builder into your GraalVM installation. Use `gu install native-image`. Now we can build the application.

## [](#a-reactive-example)A Reactive Example

First, go to [the Spring Initializr](http://start.Spring.io) and generate a new project with `R2DBC`, `Lombok`, `H2`, `Reactive Web` and use Java 8.

You've seen the Java code before:

```java
Copypackage com.example.reactive;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.data.annotation.Id;
import org.springframework.data.r2dbc.core.DatabaseClient;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@SpringBootApplication(
        exclude = SpringDataWebAutoConfiguration.class,
        proxyBeanMethods = false
)
public class ReactiveApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReactiveApplication.class, args);
    }

}

@RestController
@RequiredArgsConstructor
class CustomerRestController {

    private final CustomerRepository customerRepository;

    @GetMapping("/customers")
    Flux<Customer> customers() {
        return this.customerRepository.findAll();
    }
}

@Component
@RequiredArgsConstructor
class Initializer implements ApplicationListener<ApplicationReadyEvent> {

    private final CustomerRepository customerRepository;

    private final DatabaseClient databaseClient;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        Flux<Customer> save = Flux.just("Madhura", "Dr. Syer")
                .map(name -> new Customer(null, name))
                .flatMap(this.customerRepository::save);

        String sql = "create table CUSTOMER(id serial primary key, name varchar(255))";

        this.databaseClient
                .execute(sql)
                .fetch()
                .rowsUpdated()
                .thenMany(save)
                .thenMany(this.customerRepository.findAll())
                .subscribe(System.out::println);
    }
}

interface CustomerRepository extends ReactiveCrudRepository<Customer, Integer> {

}

@Data
@AllArgsConstructor
@NoArgsConstructor
class Customer {

    @Id
    private Integer id;
    private String name;

}
```

The only thing worth noting, as it pertains to Graal and native images anyway, is that we've disabled the creation of proxies for `@Configuration` class (using `proxyBeanMethods = false`) and excluded the `SpringDataWebAutoConfiguration.class` Java autoconfiguration. Hopefully, that last bit will be irrelevant in the near-term future.

That's the application. Start it and you'll see it works. We need to change the build a smidge to accommodate Graal as well. You'll need the snapshot and milestone Spring artifact repositories in your build.

```xml
Copy    <repositories>
        <repository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
        </repository>
        <repository>
            <id>spring-snapshots</id>
            <name>Spring Snapshots</name>
            <url>https://repo.spring.io/snapshot</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
    </repositories>
    <pluginRepositories>
        <pluginRepository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
        </pluginRepository>
        <pluginRepository>
            <id>spring-snapshots</id>
            <name>Spring Snapshots</name>
            <url>https://repo.spring.io/snapshot</url>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </pluginRepository>
    </pluginRepositories>
```

Then, add these three Maven dependencies.

```xml
Copy    <dependency>
        <groupId>org.springframework.experimental</groupId>
        <artifactId>spring-graalvm-native</artifactId>
        <version>0.7.1</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context-indexer</artifactId>
    </dependency>
```

That's it! In the code for this repository, [I've also got a Spring Data MongoDB demonstration as well](https://github.com/spring-tips/spring-and-graal-part-2/tree/master/mongodb). It is a trivial Spring Data MongoDB application that uses Spring MVC. This example requires the exact same dependencies and attributes as the reactive one I've just shown you.

Now we'll need to compile it. First, run the normal `mvn clean package`. Then, we'll need to pass the `.jar` into the Graal `native-image` builder. I have a script, `compile.sh`, that I reuse for all three examples. Here it is.

```shell
Copy#!/usr/bin/env bash

ARTIFACT=${1}
MAINCLASS=${2}
VERSION=${3}

JAR="${ARTIFACT}-${VERSION}.jar"

rm -rf target
mkdir -p target/native-image
mvn -ntp package  
rm -f $ARTIFACT
cd target/native-image
jar -xvf ../$JAR  
cp -R META-INF BOOT-INF/classes

LIBPATH=`find BOOT-INF/lib | tr '\n' ':'`
CP=BOOT-INF/classes:$LIBPATH
GRAALVM_VERSION=`native-image --version`

time native-image \
  --verbose \
  -H:EnableURLProtocols=http \
  -H:+RemoveSaturatedTypeFlows \
  -H:Name=$ARTIFACT \
  -Dspring.native.verbose=true \
  -Dspring.native.remove-jmx-support=true \
  -Dspring.native.remove-spel-support=true \
  -Dspring.native.remove-yaml-support=true \
  -cp $CP $MAINCLASS  
```

When you use this script, you need to provide three things: the build artifact, the main-class name, and the version. So, for this application, we can run it like this in the same directory:

```shell
Copy./compile.sh reactive com.example.reactive.ReactiveApplication 0.0.1-SNAPSHOT
```

And then go make a cup of coffee. A quick one. Because this will take at least three minutes.

## [](#jpa)JPA

Done? Good. Let's build another example, this time using Spring Data JPA (Hibernate) and Spring MVC (with Apache Tomcat).

Go to the Spring Initializr, generate another project. This time, specify `JPA`, `H2`, `Web` and then click `Generate`. Here's the code.

```java
Copypackage com.example.jpa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Collection;
import java.util.stream.Stream;

@SpringBootApplication(
        exclude = SpringDataWebAutoConfiguration.class,
        proxyBeanMethods = false
)
public class JpaApplication {

    public static void main(String[] args) {
        SpringApplication.run(JpaApplication.class, args);
    }

}

@RestController
@RequiredArgsConstructor
class CustomerRestController {

    private final CustomerRepository customerRepository;

    @GetMapping("/customers")
    Collection<Customer> customers() {
        return this.customerRepository.findAll();
    }
}

@Component
@RequiredArgsConstructor
class Initializer implements ApplicationListener<ApplicationReadyEvent> {

    private final CustomerRepository customerRepository;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {
        Stream.of("Madhura", "Dr. Syer")
                .map(name -> new Customer(null, name))
                .map(this.customerRepository::save)
                .forEach(System.out::println);
    }
}

interface CustomerRepository extends JpaRepository<Customer, Integer> {

}

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
class Customer {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;

}
```

Now, this application uses JPA (and Hibernate). Hibernate, like Spring, can do a lot of dynamic things at runtime. Graal *hates* that. So we need to get Hibernate to enhance the entities in our application at build time. Add the following Maven plugin to your build.

```xml
Copy<plugin>
    <groupId>org.hibernate.orm.tooling</groupId>
    <artifactId>hibernate-enhance-maven-plugin</artifactId>
    <version>${hibernate.version}</version>
    <executions>
        <execution>
            <configuration>
                <failOnError>true</failOnError>
                <enableLazyInitialization>true</enableLazyInitialization>
                <enableDirtyTracking>true</enableDirtyTracking>
                <enableExtendedEnhancement>false</enableExtendedEnhancement>
            </configuration>
            <goals>
                <goal>enhance</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

The last thing we'll need to do is to tell Hibernate, at runtime, to *not* do any enhancement. Create a file, `src/main/resources/hibernate.properties`:

```properties
Copyhibernate.bytecode.provider=none
```

Now you can compile the application, the same as you did the reactive one, swapping out the main-class. Give it a few minutes. Now you should have two different applications in the `target/native-image` directory of each application. Run them.

On my machine, the `reactive` application spins up in 0.106 seconds. The `jpa` application starts up in 0.181. Fast startup and - the best part - at runtime, these applications will take *tens* of megabytes, not *hundreds* (or *thousands*) as a typical JVM-based application might.

## [](#the-next-steps)The Next Steps

I can't wait until the Spring Graal 0.8.0 release which will, among other things, baseline on some of the many improvements in Spring Framework 5.3, and possibly include a facility to convert `@Configuration`\-centric Java configurations into Spring's "functional configuration," which requires no proxies or reflection and which is more resource-efficient. I looked at functional configuration in another Spring Tips installment [more than three years ago](https://www.youtube.com/watch?v=Q_P28p7XsbQ&t=1s).