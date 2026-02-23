---
title: $ diff -q spring-data-gemfire spring-data-geode
source: https://spring.io/blog/2017/10/26/diff-q-spring-data-gemfire-spring-data-geode
scraped: 2026-02-23T16:17:37.115Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | John Blum |  October 26, 2017 | 3 Comments
---

# $ diff -q spring-data-gemfire spring-data-geode

_Engineering | John Blum |  October 26, 2017 | 3 Comments_

Greetings Spring Community and Pivotal GemFire/Apache Geode Users-

One question I constantly get asked is, "*What is the difference between Spring Data GemFire and Spring Data Geode?*"

Now that *Spring Data Geode* is part of the *Spring Data Release Train*, beginning with [*Kay*](https://github.com/spring-projects/spring-data-commons/wiki/Release-Train-Kay#participating-modules) (see the [official release announcement](https://spring.io/blog/2017/10/02/spring-data-release-train-kay-goes-ga) for more details), the timing is finally right to answer this question in an open forum.

To help answer this question, I set 2 simple objectives for both *Spring Data GemFire* and *Spring Data Geode* (collectively known as SDG^2 now):

1.  First, and most importantly, allow users to seamlessly interchange *Spring Data Geode* with *Spring Data GemFire*, and vice versa.
    
2.  Next, help users migrate their *Spring Boot*, Pivotal GemFire or Apache Geode based applications from their local development environment to a managed environment, like [Pivotal CloudFoundry](https://pivotal.io/platform), with little to no code changes at all.
    

Let’s take a look at each of these objectives a bit closer and what they mean.

## [](#interchangeable-dependencies)[](#interchangeable-dependencies)Interchangeable Dependencies

The first objective is all about *choice*.

It simply means that a user can switch from `spring-data-geode` to `spring-data-gemfire` and expect **not** to have to change a single line of code in her *Spring Boot* application that is using either Pivotal GemFire or Apache Geode.

Simply change the *dependency declaration* from this…​

Maven

```
Copy<dependency>
  <groupId>org.springframework.data</groupId>
   <artifactId>spring-data-geode</artifactId>
   <version>2.0.0.RELEASE</version>
</dependency>
```

***Gradle***

`compile 'org.springframework.data:spring-data-geode:2.0.0.RELEASE'`

To this…​

Maven

```
Copy<dependency>
  <groupId>org.springframework.data</groupId>
   <artifactId>spring-data-gemfire</artifactId>
   <version>2.0.0.RELEASE</version>
</dependency>
```

***Gradle***

`compile 'org.springframework.data:spring-data-gemfire:2.0.0.RELEASE'`

And, you are done!

It is even possible to switch from `spring-data-gemfire` back to `spring-data-geode` again and everything just works. The entire Pivotal GemFire codebase and all its features is in the open source version that is Apache Geode.

Functionally and behaviorally, they are the same. The only discernable difference is, you get a different set of transitive dependencies, i.e. GemFire vs. Geode. Try saying that with any other IMDG, particularly between the OS offering and the enterprise grade solution.

#### [](#packaging-and-class-names)[](#packaging-and-class-names)Packaging and Class Names

*But wait! What about package and class names?* *Aren’t they different in Pivotal GemFire and Apache Geode?* *Won’t you change the names of packages and classes*, like `org.springframework.data.gemfire.GemfireTemplate` in *Spring Data GemFire* to `org.springframework.data.geode.GeodeTemplate` in *Spring Data Geode*?

No; most definitely not!

By way of example, consider the following GemFire/Geode interface, `org.apache.geode.cache.GemFireCache`.

In Pivotal GemFire 9.0 and later, the interface is [`org.apache.geode.cache.GemFireCache`](http://gemfire-91-javadocs.docs.pivotal.io/org/apache/geode/cache/GemFireCache.html), using the `org.apache.geode` package namespace. In Apache Geode, the same interface is [`org.apache.geode.cache.GemFireCache`](http://geode.apache.org/releases/latest/javadoc/org/apache/geode/cache/GemFireCache.html) where the "GemFire" name is still used. This is true of other classes and interfaces as well.

This is actually quite important for interoperability purposes in addition to migration reasons, particularly in GemFire/Geode’s distribution layer where proprietary messages are sent between clients and servers, and between peer members in a cluster.

#### [](#versions)[](#versions)Versions

*Spring Data GemFire* 2.0 (*Kay*) is [based on](https://github.com/spring-projects/spring-data-gemfire/blob/2.0.0.RELEASE/pom.xml#L22) Pivotal GemFire 9.1.1, which is itself based on Apache Geode 1.2.0.

*Spring Data Geode* 2.0 (*Kay*) is [based on](https://github.com/spring-projects/spring-data-geode/blob/2.0.0.RELEASE/pom.xml#L23) Apache Geode 1.2.1.

So effectively, SDG^2 libs are interchangeable with no application code changes necessary.

Now that *Spring Data Geode* is officially part of the *Spring Data Release Train*, both *Spring Data Geode* and *Spring Data GemFire* align on version number and their version numbers will remain the same from this point forward.

Tip

We recommended that you either use the *Spring Data* BOM file, i.e. `org.springframework.data:spring-data-releasetrain:Kay-RELEASE` (as *Spring Boot* does in its [dependency declaration](https://github.com/spring-projects/spring-boot/blob/v2.0.0.M4/spring-boot-dependencies/pom.xml#L2232-L2238) and [version](https://github.com/spring-projects/spring-boot/blob/v2.0.0.M4/spring-boot-dependencies/pom.xml#L164)), or [inherit from the *Spring Boot* starter parent POM](https://docs.spring.io/spring-boot/docs/2.0.0.M4/reference/htmlsingle/#using-boot-maven-parent-pom). Alternatively, you can use the [*Spring IO Platform*](http://platform.spring.io/platform/), which provides a curated and harmonized set of dependencies that have been tested to all work together.

## [](#from-local-to-managed-environments)[](#from-local-to-managed-environments)From Local To Managed Environments

The second objective is all about helping users on their journey to the cloud by utilizing [*Cloud Native* software design patterns](https://pivotal.io/cloud-native), and employing cloud-ready solutions, like Pivotal GemFire, in *Spring* fashion.

Back in 2003, a colleague of mine once said to me, “*Think Global, Build Local*”. He was being sarcastic, but I had just joined the company and was inquiring how to build, run and test our enterprise Java application locally, from my IDE.

At the time, our team was busy trying to centralize all development activities. This was due in part to how complex it had become to setup a developer’s local development environment, installing IBM WebSphere locally since our application had to be run on WebSphere.

Well, as it turns out, his comment was actually right!

It is imperative that operational contracts don’t impair development, especially during development since they are likely to change overtime anyway. One of the primary reasons to have CI/CD is to bridge this gap.

During development, developers need full control of their environment to deliver on the application’s requirements. Being able to build, spin up, test, debug and profile the application using lightweight processes is essential to being *Agile*. As the journey progresses from inception to production, CI/CD becomes essential in responding to change in a timely manner. However, nothing should impede a developer’s ability to deliver working code, and that begins inside the IDE.

From the very beginning *Spring* has been all about developer productivity, providing developers with the right framework(s) and tools to address any enterprise application concern quickly, reliably and with high quality. And now, given technologies like [*Spring Boot*](http://projects.spring.io/spring-boot/) and [*Spring Cloud*](http://projects.spring.io/spring-cloud/), the path is quite clear, it’s all about "*Cloud Native*". This isn’t just *common sense* development, it is *smart* development.

So, the main intent in objective #2 is to take these same concepts and apply them to data using *Spring Data GemFire* or *Spring Data Geode* for Pivotal GemFire or Apache Geode, respectively. By using SDG’s new [Annotation-based configuration approach](https://docs.spring.io/spring-data/gemfire/docs/current/reference/html/#bootstrap-annotation-config) along with [auto-configuration support for Pivotal GemFire/Apache Geode](https://github.com/spring-projects/spring-boot-data-geode) in users' *Spring Boot* applications, it won’t matter whether users are using Apache Geode locally or [PCC](https://docs.pivotal.io/p-cloud-cache/1-0/index.html) / [SSC](https://docs.pivotal.io/ssc-gemfire/index.html) (backed by Pivotal GemFire) in PCF globally, users will have a consistent experience with little to no code changes.

This means less surprises and more focus on what actually matters, delivering value to end users. After all, this is the whole point of a framework or tool, to simplify the process and handle the boilerplate that, while necessary, is non-essential to the end user.

## [](#summary)[](#summary)Summary

*So, what is the difference?*

Absolutely nothing! At least, there should be no apparent difference in practice, even across different contexts.

I hope this post has helped people fundamentally understand and appreciate the scope of what is trying to be achieved here, that it extends well beyond functional, behavioral and superficial differences in *Spring Data GemFire* and *Spring Data Geode*. It also includes having a consistent experience from inception all the way to delivery, in production, in the most simple, easiest manner possible.

As always, feedback is much appreciated, whether by filing a ticket in [JIRA](https://jira.spring.io/browse/SGF), submitting a [PR](https://github.com/spring-projects/spring-data-gemfire/pulls) or simply asking a question in [*StackOverflow*](https://stackoverflow.com/questions/tagged/spring-data-gemfire).

Important

Be sure to get to [SpringOne Platform](https://springoneplatform.io/) this year. There is so much great content planned and new things to learn, particularly on the new Reactive Spring. This will be an event for the ages.