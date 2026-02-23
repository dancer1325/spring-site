---
title: Has there ever been a better time to become a Java developer?
source: https://spring.io/blog/2019/03/07/has-there-ever-been-a-better-time-to-become-a-java-developer
scraped: 2026-02-23T14:55:59.976Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Wilcock |  March 07, 2019 | 1 Comment
---

# Has there ever been a better time to become a Java developer?

_Engineering | Ben Wilcock |  March 07, 2019 | 1 Comment_

**Surely there’s never been a better time to become a Java developer?**

There are productivity tools available these days that would have been mind-blowing just five years ago.

Take **[Spring Boot](https://spring.io/projects/spring-boot)** for example. Many people reading this on the Spring website may be familiar with Spring Boot. But let’s take a moment to acknowledge its awesomeness.

Years ago, if you were going to use the Spring Framework in your application, you had to be OK with a certain amount of configuration toil creeping into your day. But it wasn’t nice friendly configuration like, (ah, actually, sorry, I can’t think of an example of ‘friendly configuration’), it was nasty XML configuration with a side order of XSD, eww!

Later, Spring did come along with more developer friendly configuration options (like Java-based configuration), but what Spring Boot did so successfully when it arrived on the scene in 2013, was relieve Spring Framework developers of much of this responsibility. This was thanks largely to its innovative ‘auto-configuration’ features.

With Spring Boot’s ‘starters' your Spring application could simply configure itself. You no longer had to have an encyclopedic knowledge of the nuts and bolts of the platform to get started. You could still take control if you wanted to, but it wasn't a requirement anymore. This flattened the Spring learning curve significantly and was terrifically liberating for Spring developers. All those hours spent reading docs, configuring stuff, troubleshooting errors, could be put to better use. Utterly brilliant!

**And then there’s Spring Boot’s superior application packaging.**

Java’s “write once run anywhere” promise was a cruel joke for enterprise Java developers. You’d spend hours bundling up your application’s WAR file, messing about trying to get your deployment descriptor to work, only to discover later that it “only runs on your machine.” Grrrrr!

Spring Boot’s executable JAR packaging fixed all that nonsense. By bundling the web container in with the binary, your application can run anywhere where there’s a compatible JVM. Total genius. No wonder Spring Boot’s become [the world’s most popular Java web framework](https://snyk.io/blog/jvm-ecosystem-report-2018-platform-application/).

**But to get even this far you needed buildable Java project.**

And frankly, starting any new Java project was a chore. Maven and Gradle are both excellent build tools. We couldn’t live without them. But, IDE support for them was patchy, and who wants to spend their time editing POM’s and figuring out what’s the latest goings-on with the Gradle DSL? Not me. I’m too impatient. Life’s too short.

So thank goodness for the **[Spring Initializr](https://start.spring.io/)**. With Spring Initializr, you can instantly download a ready-made Spring Boot project using the language and build tool of your choice. You don’t even need a browser! You can use the Spring Initializr straight from the command line with either `curl` or the [Spring CLI](https://docs.spring.io/spring-boot/docs/current/reference/html/cli-using-the-cli.html#cli-init).

**Seriously, if you’ve never tried it before, give it a try it now. It’s really rather straightforward:**

All you need is a command line with `curl` and Java. With this first simple command, you can ask the Spring Initializr for a Zip archive, which you can then unzip, and away you go. Just load the unzipped project into your favorite IDE, and you can start coding with it immediately.

```bash
Copycurl https://start.spring.io/starter.zip -d dependencies=web,actuator -d baseDir=demo -o demo.zip
unzip demo.zip
```

> I’ve used assumed Linux here, but you can get `curl` for Windows and Mac too.

Now that it's downloaded and unpacked, let's run our app and try out Spring Boot’s brilliant JAR packaging at the same time. Simply type the following to start it up using your Java VM…

```bash
Copycd demo
./mvnw package # Use mvnw.cmd on Windows
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

> If you don't have Java, head over to [https://adoptopenjdk.net/](https://adoptopenjdk.net/releases.html) for an installer or installation instructions.

That’s it. Spring Boot will start the application for you. Now open your favorite browser and go to `http://localhost:8080/actuator/health`, and you will see a JSON message confirming that the application is alive and well and ready to go.

```json
Copy{"status":"UP"}
```

**This is all excruciatingly simple compared to how things used to be.**

In fact, it’s so simple, I bet a child could do it. If you've got one of those handy, why not ask them to sit down and give it a try right now? What better way is there to start someone's coding journey than with Spring Boot and Spring Initializr? Why not let us know how you get on in the comments below or tweet your screenshots or photos to [@springcentral](https://twitter.com/springcentral) with the hashtag `#SpringFTW`.

### [](#next-time)Next time

In my next installment, I’ll take this simple application and run it in a “production-like” environment, imitating what you might do on day one of your new startup gig :D

### [](#would-you-like-a-bit-more)Would you like a bit more?

> If that task was too easy, or you have a bit more time, why not add the “thymeleaf” and “devtools” dependencies to your Spring Initializr `curl` request from earlier and follow this tutorial to build your own simple web application: [https://spring.io/guides/gs/serving-web-content/](https://spring.io/guides/gs/serving-web-content/)