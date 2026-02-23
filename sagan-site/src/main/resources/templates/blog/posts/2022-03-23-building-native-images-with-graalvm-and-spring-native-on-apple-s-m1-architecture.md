---
title: Building Native Images with GraalVM and Spring Native on Apple\'s M1 Architecture
source: https://spring.io/blog/2022/03/23/building-native-images-with-graalvm-and-spring-native-on-apple-s-m1-architecture
scraped: 2026-02-23T12:47:14.858Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  March 23, 2022 | 7 Comments
---

# Building Native Images with GraalVM and Spring Native on Apple's M1 Architecture

_Engineering | Josh Long |  March 23, 2022 | 7 Comments_

It finally happened! They did it! They did it just in time for me to get on the road and start building applications on the road with my shiny new laptop, too! JOY!! Oracle and the GraalVM team released GraalVM and the GraalVM native image capability for Apple M1! I've been waiting for this day for so, so, *so* long! I bought the first Apple M1 the day of the announcement way back in 2020 (does anybody remember that far back? That was, meteorologically speaking, the early pandemic period).

Apple's M1 devices are insanely fast, energy-efficient beasts of machines that run circles around all but the beefiest and latest-and-greatest Intel/NVidia configurations *while* also consuming a pittance of the power that other configuration does. In short, I'm a big fan. But the move to this new architecture hasn't been without its troubles.

Some Adobe applications (like Adobe Premiere and Adobe After Effects), Docker, and GraalVM were the biggest hurdles to making my M1 machine (which I have since upgraded from the first 13" MacBook Pro 2020 M1 to the 16" MacBook Pro 2021 M1 Max model) my daily-driver. Docker's gotten better. Adobe Premiere's gotten better, and After Effects isn't too far behind (but still no joy there). And now, as of yesterday, at long last, [GraalVM](https://twitter.com/fniephaus/status/1506192466705326082?cxt=HHwWhIC51a-EiecpAAAA) has gotten better.

However, it's not yet GA, and it's not even in the fantastic [SDKman](https://sdkman.io/) project. So installing it could've been tedious. Do you all remember adding things to your `PATH` manually? I do, and I don't like it! So I Googled but came up empty. Then, just when I'd resigned myself to having to *work*, I realized my incredible friend and community legend [Matt Raible (@mraible)](https://twitter.com/mraible) had already figured it out. So I pinged him, and he sent me this [ticket he'd filed against the M1 build and Spring Native](https://github.com/spring-projects-experimental/spring-native/issues/1538#issue-1177367637) detailing how he got it working and how to verify the break.

Here are his steps as they applied to me. NB: I think they've since released a newer version of GraalVM even since one day ago when Matt wrote the blog, so as a result, my version numbers are `.1` off from his.

First, you'll need [to download the developer preview build](https://github.com/graalvm/graalvm-ce-dev-builds/releases/tag/22.2.0-dev-20220323_0052). I'm using `22.2.0-dev` for Java 17. So I chose to [download this binary](https://github.com/graalvm/graalvm-ce-dev-builds/releases/download/22.2.0-dev-20220323_0052/graalvm-ce-java17-darwin-aarch64-dev.tar.gz).

I put that `.tgz` file on my `$HOME/Desktop` and then ran this script to get it installed and usable for `SDKMan`. These are the same steps as Matt details in his original ticket.

```shell
Copy#!/usr/bin/env bash 
BUILD=22.2.0
INSTALLED_PATH=$HOME/.sdkman/candidates/java/${BUILD}.dev.r17-grl
cd $HOME/Desktop/  
rm -rf graalvm-ce-java17-${BUILD}-dev  || echo "no directory to delete."
tar zxpf graalvm-ce-java17-darwin-aarch64-dev.tar.gz 
rm -rf $INSTALLED_PATH || echo "no directory to delete."
mv $HOME/Desktop/graalvm-ce-java17-${BUILD}-dev/Contents/Home $INSTALLED_PATH
sudo xattr -r -d com.apple.quarantine ~/.sdkman/candidates/java/${BUILD}.dev.r17-grl
```

Put all of those instructions in a text file called `install.sh` on your `$HOME/Desktop`, then run `chmod a+x $HOME/Desktop/install.sh` to make it executable and then run it with `$HOME/Desktop/install.sh`.

Youll need to make this newly installed version the default one for your operating system, so issue the following command:

```shell
CopyBUILD=22.2.0 
sdk default java ${BUILD}.dev.r17-grlz
```

Once that's done, you'll need to install the `native-image` compiler command with the `gu` utility in the GraalVM distribution:

```shell
Copygu install native-image
```

Open a new shell and verify that everything's working:

```shell
Copy➜  java --version 
openjdk 17.0.3 2022-04-19
OpenJDK Runtime Environment GraalVM CE 22.2.0-dev (build 17.0.3+4-jvmci-22.1-b03)
OpenJDK 64-Bit Server VM GraalVM CE 22.2.0-dev (build 17.0.3+4-jvmci-22.1-b03, mixed mode, sharing)
```

With that, you should be all set. Then you need an application against which to test. So go to my second favorite place on the internet, [start dot spring dot io](https://start.spring.io), and generate a new application [with everything pre-configured](https://start.spring.io/#!type=maven-project&language=java&platformVersion=2.6.4&packaging=jar&jvmVersion=17&groupId=com.example&artifactId=m1native&name=m1native&description=Demo%20project%20for%20Spring%20Boot&packageName=com.example.m1native&dependencies=h2,postgresql,webflux,data-r2dbc,native). Click `Generate` and then unzip and open the resulting `pom.xml` in your Java IDE of choice.

Replace the `M1NativeApplication.java` with the following contents:

```java
Copypackage com.example.m1native;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.annotation.Id;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@SpringBootApplication
public class M1nativeApplication {

    public static void main(String[] args) {
        SpringApplication.run(M1nativeApplication.class, args);
    }

    @Bean
    RouterFunction<ServerResponse> routes(CustomerRepository repository) {
        return route()
                .GET("/customers", request -> ok().body(repository.findAll(), Customer.class))
                .build();
    }

    @Bean
    ApplicationRunner runner(CustomerRepository repository) {
        return args -> repository.findAll().subscribe(System.out::println);
    }
}

interface CustomerRepository extends ReactiveCrudRepository<Customer, Integer> {
}

record Customer(@Id Integer id, String name) {
}
```

Add `src/main/resources/data.sql`:

```sql
Copyinsert into customer (name ) values('Josh');
insert into customer (name ) values('Mario');
insert into customer (name ) values('Amey');
```

Add `src/main/resources/schema.sql`:

```sql
Copycreate table if not exists customer
(
    id   serial primary key,
    name varchar(255) not null
);
```

There ya go: you have a reactive, non-blocking web application talking to an embedded, in-memory SQL database. Let's turn this thing into a native image. On the command line, run the following incantation:

```shell
Copymvn -Pnative -DskipTests clean package 
```

That'll take about 45 seconds to finish. Have a few sips of coffee and then run the application in your target/ directory:

```shell
Copy➜ target/m1native
...
2022-03-23 16:24:15.063  INFO 13901 --- [ ... ] Started M1nativeApplication in 0.036 seconds (JVM running for 0.038)
Customer[id=1, name=Josh]
Customer[id=2, name=Mario]
Customer[id=3, name=Amey]
```

Hell yeah! Rock on GraalVM! This is amazing! I know there are bound to be bugs or issues, but the fact that this works so well for nothing but a developer preview build? That's dope.

Now to figure out what to do with my creakingly old and irrelevant Intel MacBook Pro...