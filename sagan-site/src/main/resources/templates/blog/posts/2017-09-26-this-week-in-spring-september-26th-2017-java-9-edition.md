---
title: This Week in Spring - September 26th, 2017 (Java 9 Edition)
source: https://spring.io/blog/2017/09/26/this-week-in-spring-september-26th-2017-java-9-edition
scraped: 2026-02-23T16:21:00.198Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  September 26, 2017 | 7 Comments
---

# This Week in Spring - September 26th, 2017 (Java 9 Edition)

_Engineering | Josh Long |  September 26, 2017 | 7 Comments_

Hi Spring fans! What a crazy wonderful week it's been! I'm back in San Francisco talking to customers and local partners about all things Pivotal and, also, just enjoying some fun in the San Francisco Sun while playing [with Java 9](https://docs.oracle.com/javase/9/whatsnew/toc.htm#JSNEW-GUID-C23AFD78-C777-460B-8ACE-58BE5EA681F6) . There's so much to like in this new release and so much to look forward to and, of course, Spring Framework 5 is Java 9 ready out of the box.

-   Spring IO Platform lead Andy Wilkinson just announced [Spring IO Platform Brussels SR5](https://spring.io/blog/2017/09/19/spring-io-platform-brussels-sr5). The new release includes Spring AMQP 1.7.4, Spring Boot 1.5.7, Spring Data Ingalls SR7, Spring Framework 4.3.11, Spring Integration 4.3.12, Spring Loaded 1.2.8, and Spring Web Flow 2.4.6. Lots to like in this new release so get the bits now!
-   Spring Tool Suite lead Martin Lippert just posted on how to overcome some issues when running STS [on macOS High Sierra 10.13](https://spring.io/blog/2017/09/21/how-to-get-sts-eclipse-running-on-macos-high-sierra-10-13).
-   Spring Cloud Task lead Michael Minella just [announced Spring Cloud Task 1.2.2.RELEASE](https://spring.io/blog/2017/09/25/spring-cloud-task-1-2-2-release-is-now-available). The new release adds support for Spring Framework’s recent added support for db engines other than MYISAM for the sequence tables when using MySQL.
-   The classic Spring PetClinic has changed a lot over the years! This version [demonstrates the PetClinic with Spring and Kotlin](https://github.com/spring-petclinic/spring-petclinic-kotlin). It's a very concise little application to behold if you've ever seen any of the original PetClinics (many of which predate Spring itself!)
-   Want an [overview of the capabilities of Spring Boot](https://content.pivotal.io/analyst-reports/spring-boot-simplifies-end-to-end-development?_lrsc=7c3f3dc7-c1fa-4e7b-863f-615b5abb2c52)? This analyst report might just be what the doctor ordered!
-   [Spring Cloud Pipelines now supports Kubernetes](http://cloud.spring.io/spring-cloud-pipelines/multi/multi_jenkins-pipeline-k8s.html#_connecting_to_a_kubo_cluster), as well
-   Oracle released Java 9! This is a big deal! There's so much goodness to try in Java 9. If you're not using Java 9, [give it a try](https://www.infoq.com/news/2017/09/Java-9-release-sept-21). Spring Framework 5 runs on Java 9 (both module- and classpaths) with no problems.
-   [Alex Falappa on Twitter: "Next NBSpringBoot plugin: java editor hints for detecting and fixing missing pom dependencies. https://t.co/n7w22q4sMK"](https://twitter.com/aless_falappa/status/912735050093010944)
-   Recently, I was asked about an example demonstrating mTLS authentication in a Spring Boot application for Cloud Foundry. I didn't know, so - as I often do - I asked Spring Security lead Rob Winch who shared this [amazing example by Java Cloud Foundry experience lead Ben Hale](https://github.com/nebhale/mtls-sample). Very interesting!
-   I liked this podcast with Pivotal field CTO Josh McKenty [on all things cloud and Cloud Foundry](https://www.youtube.com/watch?v=OfwDTYeqHcI)
-   The new [RebelLabs developer productivity report is out](https://zeroturnaround.com/rebellabs/developer-productivity-report-2017-why-do-you-use-java-tools-you-use/) and it shows continued strong growth for Spring. Spring had a plurality of users, with 46%, while Java EE came in at 33%. It also shows incredible growth for Java 8, with 72% of the respondants using it. Hurray to both bits of good news!
-   The new Microsoft, and [the new Microsoft SQL Server 2017 edition](https://arstechnica.com/gadgets/2017/09/microsoft-ignite-2017-azure-sql/?amp=1), is here and it runs on Linux! I never thought I'd see the day. What does this have to do with Spring? Absolutely nothing. Just.. really cool!
-   Did you see this July webinar by [reactive Spring ninja Arjen Poutsma](https://www.brighttalk.com/webcast/14893/263393?_lrsc=b02b5b66-1acb-44bc-8a09-1f23cdc47bf2) on the functional web framework in Spring Framework 5?
-   Speaking of *reactive*, you might also enjoy this talk by Evgeny Poberezkin [on the evolution of reactive programming](https://www.infoq.com/presentations/reactive-programming-evolution).
-   Oracle have a nice selection of [content introducing new features in Java 9](https://www.oracle.com/java/java9-screencasts.html). Check it out!
-   Spring community friend Michael Simons' [new German-language book introducing Spring Boot is now available](https://www.amazon.de/dp/3864905257/ref=cm_sw_r_tw_api_1.zXzbGMMWCEC). Check it out!
-   The latest release of the [Camunda BPM system has Spring Boot integration](https://github.com/camunda/camunda-bpm-spring-boot-starter/).
-   .NET ninja Richard Seroter says that Java and Spring Cloud users shouldn't have *all* the fun: learn how [to integrate a circuit breaker into a .NET application with Pivotal's Steeltoe framework](https://seroter.wordpress.com/2017/09/21/adding-circuit-breakers-to-your-net-applications/amp/).
-   Loom Systems put together a look [that contextualizes Pivotal Cloud Foundry and Pivotal Container Service (which is based on Kubernetes](https://www.loomsystems.com/blog/everything-you-need-to-know-about-pks-in-3-acts?_lrsc=ae2c4d5a-294e-4484-8ea8-e6beccfc4caa)).
-   Jenn Strater - an expert on Spring REST Docs, among many other things - put together a [nice presentation introducing test-driven documentation](https://speakerdeck.com/jlstrater/test-driven-docs-apiconf-de-2017) (in terms of Spring REST Docs, natch.)
-   IBM recently open-sourced their J9 JVM. [This post](https://medium.com/@rservant/how-did-the-j9-in-openj9-get-its-name-95a6416b4cb9?source=userActivityShare-a17df5ec14a4-1505939701) gives a bit of insight into the peculiar history behind the name, *J9*.
-   This post, [on ten good ideas for API documentation](https://alistapart.com/article/the-ten-essentials-for-good-api-documentation), doesn't specifically have anything to do with Spring but it does seem to reinforce the obvious: Spring REST Docs is a good idea (TM)!