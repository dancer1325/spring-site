---
title: Spring Session Data Geode/GemFire 2.0.0.M1 now available.
source: https://spring.io/blog/2017/07/27/spring-session-data-geode-gemfire-2-0-0-m1-now-available
scraped: 2026-02-23T16:25:16.099Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  July 27, 2017 | 0 Comments
---

# Spring Session Data Geode/GemFire 2.0.0.M1 now available.

_Engineering | John Blum |  July 27, 2017 | 0 Comments_

Greetings Spring Community!

It is my pleasure to announce the first milestone release of both *Spring Session Data Geode* for Apache Geode and *Spring Session Session Data GemFire* for Pivotal GemFire.

Both artifacts can be downloaded from *Spring’s* `libs-milestone` Repository using *Maven* …​

```
Copy  <dependency>
    <groupId>org.springframework.session</groupId>
    <artifactId>spring-session-data-geode</artifactId>
    <version>2.0.0.M1</version>
  </dependency>
```

Or with *Gradle*…​

```
Copy  compile 'org.springframework.session:spring-session-data-geode:2.0.0.M1'
```

To use *Spring Session* with Pivotal GemFire, just switch the artifact from `spring-session-data-geode` to `spring-session-data-gemfire`.

# [](#backstory)[](#backstory)Backstory

[Sometime ago](https://spring.io/blog/2017/05/11/spring-session-2-0-0-m1-released), [@rob\_winch](https://twitter.com/rob_winch), *Spring Session Core* creator and project lead, reorganized the *Spring Session* project by breaking out previously supported data stores into separate modules.

The primary driver for this split was to enable supported *Spring Session* data store providers to progress independently based on both the community’s as well as customer needs.

Well, *Pivotal GemFire* was 1 of the supported data stores that was separated from the core *Spring Session* project. Along with *Pivotal GemFire*, support for *Apache Geode* was also under development.

So today rounds out the supported *Spring Session* data stores to now officially include *Apache Geode* and *Pivotal GemFire*, in addition to Redis, MongoDB, JDBC, and Hazelcast, in the 2.0 release line.

# [](#in-the-release)[](#in-the-release)In The Release

Both *Spring Session Data Geode* and *Spring Session Data GemFire* include the following improvements…​

-   Compatible with *Spring Framework* 5.0.0.RC3.
    
-   Runs with *Spring Boot* 2.0.0.M2.
    
-   Based on [*Spring Session* core 2.0.0.M3](https://spring.io/blog/2017/07/25/spring-session-2-0-m3-released).
    
-   Based on [*Spring Data* Kay RC2](https://spring.io/blog/2017/07/25/spring-data-release-train-kay-rc1-rc2-released), which includes \_Spring Data Geode 2.0.0.RC2 and \_Spring Data GemFire 2.0.0.RC2.
    
-   Based on [Apache Geode 1.2.0](http://geode.apache.org/) and [Pivotal GemFire 9.1.0](https://pivotal.io/pivotal-gemfire), respectively.
    
-   Revised [documentation](http://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.0.M1/reference/htmlsingle/).
    
-   Greatly simplified configuration using *Spring Data Geode/GemFire’s* **new** Annotation based configuration model. See the [samples](http://docs.spring.io/autorepo/docs/spring-session-data-geode-build/2.0.0.M1/reference/htmlsingle/#samples).
    

For instance, to build a *Spring Boot* application that uses *Spring Session Data Geode* to manage the `HttpSession`, all a developer need do is…​

```
Copy@SpringBootApplication
@ClientCacheApplication
@EnableGemFireHttpSession
class MyApplication {

  public static void main(String[] args) {
    SpringApplication.run(MyApplication.class, args);
  }
}
```

Both, *Spring Data Geode’s* `@ClientCacheApplication` and *Spring Session Data Geode’s* `@EnableGemFireHttpSession` annotations are all that are needed to turn your *Spring Boot* application into a Geode cache client capable of managing the HTTP Session state by distributing data to a cluster of Geode servers for fast and reliable (replicated) access thereby ensuring your users experience with your application is uninterrupted and first class.

When combined with the power of [Pivotal Cloud Foundry’s,](https://pivotal.io/platform) [Pivotal Cloud Cache](https://content.pivotal.io/blog/supercharging-your-scale-cube-caching-microservices-on-pivotal-cloud-foundry) tile and the **new** [Session State Caching](https://docs.pivotal.io/ssc-gemfire/index.html) plan, you have a recipe for success!

# [](#feedback)[](#feedback)Feedback

If you have feedback on this release, I encourage you to reach out via [StackOverflow](https://stackoverflow.com/questions/tagged/spring-session), [GitHub Issues](https://github.com/spring-projects/spring-session-data-geode/issues), or via the comments section. You can also ping me [@john\_blum](https://twitter.com/john_blum) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-session-data-geode/blob/2.0.0.M1/CONTRIBUTING.adoc).