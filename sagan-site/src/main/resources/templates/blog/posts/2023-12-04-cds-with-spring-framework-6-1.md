---
title: CDS with Spring Framework 6.1
source: https://spring.io/blog/2023/12/04/cds-with-spring-framework-6-1
scraped: 2026-02-23T08:19:17.098Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Sébastien Deleuze |  December 04, 2023 | 3 Comments
---

# CDS with Spring Framework 6.1

_Engineering | Sébastien Deleuze |  December 04, 2023 | 3 Comments_

As a follow-up to the [Runtime efficiency with Spring](https://spring.io/blog/2023/10/16/runtime-efficiency-with-spring) blog post, I am happy to share that our exploration of Project Leyden optimizations has led to some interesting discoveries regarding the JDK's little-used CDS ("Class Data Sharing") feature and has materialized into a new feature that we have been able to ship in Spring Framework 6.1.

As stated in [the official documentation](https://docs.oracle.com/en/java/javase/21/vm/class-data-sharing.html), Class Data Sharing (CDS) helps reduce the startup time and memory footprint of JVMs by caching class metadata in an archive file so that it can be quickly pre-loaded into a newly launched JVM. This accelerates class loading, a significant contributor to startup time. A default CDS archive is pre-packaged with most recent JDK distributions to contain metadata for common JDK classes. You can also create customized CDS archives to speed up the loading of classes in your own applications.

Both [GraalVM native image](https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html#native-image) and [Project CRaC](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment.efficient.checkpoint-restore) allow Spring Boot applications to start in a few dozens of milliseconds. So why should we care about CDS? I think we should care for three main reasons:

-   It is a mature and production-ready technology in the OpenJDK mainline that is significantly more approachable, as it comes with fewer constraints and side-effects than GraalVM and Project CRaC.
-   As mentioned by Brian Goetz in [his Project Leyden talk at Devoxx](https://www.youtube.com/watch?v=O1Oz2-AXKKM): “Most people don’t use CDS today but probably should since they can get a reasonable startup improvement for relatively little work”.
-   The technology keeps getting better and better in each new JVM release, and Project Leyden aims to add even more benefits in the near future.

Let’s discover what CDS can bring to your Spring applications!

## [](#initial-cds-support-introduced-in-spring-framework-61)Initial CDS support introduced in Spring Framework 6.1

Spring Framework 6.1 brings a new [Class Data Sharing documentation section](https://docs.spring.io/spring-framework/reference/integration/class-data-sharing.html) explaining the 2 steps process of optimizing an application:

1.  Creating the CDS archive via a training run is possible thanks to the new `-Dspring.context.exit=onRefresh` JVM system property, which does not require starting the beans or having access to the remote services for most use cases.
2.  Using the archive to optimize the startup on production.

For CDS optimizations to be fully effective, you have to make sure that the JDK and classpath used by the commands that create the archive and start the application are identical. Note also that, to effectively cache classes:

-   The classpath should be specified as a list of regular non-nested JARs.
-   Avoid the usage of directories.
-   Avoid `*` wildcard character expansion.

As Spring Boot executable JARs or documented [unpacked deployments](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment.efficient) for now do not fulfill all those conditions, they do not allow optimal CDS performances yet.

That’s why, without making any assumption on what [may be done in Spring Boot to support CDS](https://github.com/spring-projects/spring-boot/issues/34115) in a more integrated fashion, we have been working with Stéphane Nicoll on a CDS-friendly unpacked deployment, to be able to get relevant data points and provide a way for Spring developers to explore CDS support. See more details in the related [spring-boot#38276](https://github.com/spring-projects/spring-boot/issues/38276) issue.

If you want to use CDS on your application and provide feedback, you can try and take inspiration from the [spring-cds-demo](https://github.com/sdeleuze/spring-cds-demo) repository, which contains a self-contained [unpack-executable-jar.sh](https://github.com/sdeleuze/spring-cds-demo/blob/main/unpack-executable-jar.sh) script that unpacks a Spring Boot executable JAR in a way that allows optimal CDS performances. You can also try the great [cds-log-parser](https://github.com/snicoll/cds-log-parser) tools created by Stéphane, to generate reports indicating which classes are loaded from the CDS cache.

## [](#cds-data-points-with-spring-petclinic)CDS data points with Spring Petclinic

Let’s see what we can learn from data points of the famous [Spring Petclinic application deployed with those CDS optimizations](https://github.com/sdeleuze/spring-petclinic-data-jdbc/tree/cds) running on Java 21 and optionally combined with Spring AOT optimizations.

![Executable JAR, Unpacked, CDS and CDS + Spring AOT](https://static.spring.io/blog/contentful/20240923/Executable_JAR__Unpacked__AppCDS_and_AppCDS___Spring_AOT.png)

The first takeaway is unrelated to CDS and already well-known and [documented](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment.efficient), but it is worth highlighting: production deployment of Spring Boot applications should be unpacked for optimal startup time. If you are using Buildpacks, that’s already the case. If not, you may want to check and potentially refine your custom deployment.

CDS optimizations reduce the startup time by 30% to 35% compared to unpack deployment, with only the small constraints to create a CDS archive of a few dozens of Mb and to ship it along to your application. Of course, the gain is not as dramatic as it is with GraalVM or Project CRaC, but you also don't have to do a lot of work to get this benefit. So, properly integrated, CDS may have great potential for wide adoption. If you combine CDS with Spring AOT optimizations, you can reduce the startup time of Petclinic by 36% to 42%.

## [](#conclusion)Conclusion

As usual, we are looking for feedback from the Spring community to feed our reflection about the potential next steps for a more integrated experience. For example, would you be interested in the ability to automatically build Spring Boot optimized containers with a CDS cache?

On a more forward looking note, the Spring team continues to collaborate with the Java Platform team to see how we can leverage those improvements and findings with [Project Leyden premain optimizations](https://spring.io/blog/2023/10/16/runtime-efficiency-with-spring#a-glimpse-into-openjdks-future-with-spring-aot-and-project-leyden), to push the boundaries of what is possible in terms of runtime efficiency on the JVM while reducing as much as possible the constraints for Spring developers and operators.

Cheers!