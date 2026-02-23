---
title: This Week in Spring  - February 27th, 2018
source: https://spring.io/blog/2018/02/28/this-week-in-spring-february-27th-2018
scraped: 2026-02-23T16:07:26.958Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  February 28, 2018 | 4 Comments
---

# This Week in Spring  - February 27th, 2018

_Engineering | Josh Long |  February 28, 2018 | 4 Comments_

Hi Spring fans and welcome to another installment of *Spring Tips*! This is a *super* exciting week! [Spring Boot 2.0](http://twitter.com/SpringBoot) is coming! Keep your eyes [on the Spring Initializr](http://start.spring.io) or you'll miss it! :D

Today I was at the Okta Iterate conference talking to developers who are using Spring and Okta, thanks to [my buddy Matt Raible](https://twitter.com/mraible). High point? I got to meet [Jeff Atwood](http://twitter.com/CodingHorror), the co-creator of Stack Overflow!

![](https://pbs.twimg.com/media/DXEoZzJV4AAo8sk.jpg:large)

Tomorrow, I begin a whirlwind tour over the next two weeks. First, it's off to Glasgow, Scotland; then Sydney, Australia; then Dubai; then Bangalore, India ([for Agile India 2018](https://2018.agileindia.org/)); and then it's off to Boston, Massachusetts [for the SpringOne Tour event on March 13th](https://springonetour.io/2018/boston). If you're in any of those places, [don't hesitate to reach out](http://twitter.com/Starbuxman)! I'm elated to see and hear from you!

-   I love this [blog introducing Project Riff](https://content.pivotal.io/blog/building-functions-with-riff) - the function-as-a-service from Pivotal.
-   Spring Cloud Stream lead Oleg Zhurakousky [just announced Spring Cloud Stream Elhurst RC1 and 2.0.0.RC1](https://spring.io/blog/2018/02/23/spring-cloud-stream-elmhurst-rc1-2-0-0-rc1-release-announcement). The new release brings in a whole slew of features (pollable consumers, `@StreamListener` message conversion configuration, and much more) and several enhancements (optionally supports Spring WebFlux or Servlet-based autoconfiguration, more approachable arrangement of options on the Spring Initializr, and a saner default for logging).
-   Spring Security ninja [Joe Grandja has just announced Spring Security 2.3.0.RC1](https://spring.io/blog/2018/02/27/spring-security-oauth-2-3-0-rc1-released) which adds new support for Elliptic Curve signature verification in `JwkTokenStore`. This release also includes a few minor enhancements and bug fixes.
-   Want to learn more [about using Spring Cloud Contract with Kotlin](https://github.com/spring-cloud/spring-cloud-contract/issues/434), check out the issue that started it all. Presently, Spring Cloud Kotlin definitions are authored in Groovy. This new DSL grows the audience. This is a nice addition to the recent support for Spring Cloud Contract and `.yml` properties.
-   Spring Integration ninja [Artem Bilan has a nice post on the latest release, 5.0.2, of Spring Integration which now supports Micrometer-metrics publication](https://spring.io/blog/2018/02/21/spring-integration-5-0-2-available), an updated `UnicastReceivingChannelAdapter`, support for the `IntegrationGraphController`, and dynamic filter configuration on `MessageChannel`s. Check it out!
-   Spring Boot legend Andy Wilkinson has just announced Spring Boot 2.0.0.RC2. This is the last release before the *VERY* imminent 2.0.GA release. Get the bits and try it out now! Or.. just wait a matter of hours or days and you'll [be able to use Spring Boot 2.0.GA](https://spring.io/blog/2018/02/21/spring-boot-2-0-0-rc2)
-   Spring Security lead Rob Winch has [just announced Spring Security 5.0.2](https://spring.io/blog/2018/02/20/spring-security-5-0-2-released)), complete with bug fixes aplenty
-   Spring Data ninja and Spring Vault lead Mark Paluch [just announced Spring Vault 2.0.GA](https://spring.io/blog/2018/02/20/spring-vault-2-0-ga-released). The release upgrades to Java 8 and Spring Framework 5, reactive support, improved null-safety by providing JSR-305 annotated API, Vault repository support through Spring Data KeyValue repositories, Kubernetes / AWS ECS/IAM authentication, `RoleId`/`SecretId` unwrapping for `AppId` authentication, Spring Security integration with `VaultBytesEncryptor` and `VaultRandomBytesKeyGenerator` and more!
-   Matt Raible updated [his screencast](https://www.youtube.com/watch?v=kBaitgdcNWo) on how to get started with Spring Boot, SAML, and @okta. As he says: "Thanks to @SpringSecurity's SAML DSL project, you can do it in minutes!"
-   Make sure you check out the early acess builds to [Java 11](http://jdk.java.net/11/)
-   [Spring Cloud Finchley.M7](https://twitter.com/springcloud/status/968582057411665920) has been released. This new release sees enhancements to Spring Cloud Gateway, Feign gets a top level project and more.
-   This is an [interesting thread](https://twitter.com/olivergierke/status/968503357882105856?s=12) from Spring Data lead Oliver Gierke: too much focus on distribution and not on decentralization. Might be worth watching this thread for replies.
-   We'd love your feedback on [Cloud Foundry distributions](https://twitter.com/i/web/status/968577741669978113)
-   The [SpringOne Tour](http://springonetour.io/2018/boston) is stopping in Boston, MA March 13 and 14. Do *not* miss it!
-   Check out the latest features in the latest [release of Spring Tool Suite 4](https://twitter.com/springcentral/status/968541178403504128)
-   Check out this InfoQ review of the AxonDB event store. It works perfectly with Axon, a

[Spring-based framework supporting CQRS](https://www.infoq.com/news/2018/02/axondb-event-store-cqrs)

-   Our short-awards nominated podcast, [*The Moment*, is now available on Spotify](https://open.spotify.com/show/1MODQCggYv8Yo6IKLL76JC)
-   Check out this quick-read slidedeck on [the value of Spring Cloud Contract](https://speakerdeck.com/bertzzie/spring-cloud-contract-introduction)
-   It's a bummer to see [Spring legend Vinicius Carvalho](https://twitter.com/springcentral/status/968252418717700096) depart for other horizons, but we wish him luck!
-   [Zipkin 2.5](https://twitter.com/springcentral/status/968248640618680320) - which supports distributed tracing - looks awesome! Zipkin 2.5 formalizes the tag "http.route", used for metrics correlation and span naming conventions. It also presents `zipkin-gcp` (formerly known as `stackdriver-zipkin`) for continued progress towards Google Cloud Platform. Finally, it includes a number of updates you may not have noticed!
-   The [SpringCon.Tech conference](https://twitter.com/SpringConTech/status/968157465157275648), in amazing New Orleans, has extended their CFP. Submit now!
-   Keyhole Software's Billy Korando has a [nice post on what's new in JUnit 5](https://twitter.com/springcentral/status/968239369118035968)
-   The new Spring Cloud Stream 2.0 release includes a complete revamp of content-type negotiation for the channel-based binders to address performance, flexibility and most importantly consistency. This [blog by Oleg Zhurakousky](https://twitter.com/springcentral/status/968186967790796800) has the details.
-   Mark Heckler does a great job [introducing Spring Cloud Services for Spring developers](https://twitter.com/springcentral/status/968186042548240384)
-   [#CloudFoundry Day](https://www.cloudfoundry.org/event/cfdaykccnceu18/) at #KubeCon + #CloudNativeCon is an educational event designed for the best minds of the cloud-native world. Join us May 1 to learn about the platform, connect with local end users and engineers, and exchange knowledge.
-   Check out this Baeldung blog on [feature flags with Spring Boot and Spring Cloud](http://www.baeldung.com/spring-feature-flags)
-   This is interesting: [Open Policy Agent now has support for the Spring Security `AccessDecisionVoter`](https://twitter.com/sometorin/status/966402867950059520)
-   Want to use [Spring Cloud services from .NET?](https://channel9.msdn.com/Shows/On-NET/Dave-Tillman-and-Zach-Brown-Resilient-Microservices-with-Steeltoe)
-   Some good advice on architecture [from Arun Gupta and Matt Stine](https://twitter.com/springcentral/status/967506640009220097)
-   Check out how to use health check [endpoints with Cloud Foundry's Diego](https://www.cloudfoundry.org/blog/swimming-pool-containers-lifeguards-duty-part-ii/)
-   I wrote a little thing about how to [use project Reactor and Spring to build reactive applications for the Java Magazine](http://www.javamagazine.mozaicreader.com/JanFeb2018/Twitter#&pageSet=61&page=0&contentItem=0)
-   This is super exciting: [a Spring Cloud Contract definition](https://github.com/soudmaijer/spring-cloud-contract/blob/cb087c0f7d3815624dc20a8417e748318c6231a8/spring-cloud-contract-tools/spring-cloud-contract-spec-kotlin/src/test/resources/contracts/shouldMarkClientAsFraud.kts) written in *Kotlin*! (Coming soon!)
-   Not a lot about Spring in this one, but it's a very useful article on various [command line tools that are useful for developers](https://jaxenter.com/command-line-tools-developers-141637.html)
-   the Java Code Geeks blog has a nice post on [messaging with RabbitMQ and Spring Boot](https://www.javacodegeeks.com/2018/02/springboot-messaging-rabbitmq.html)
-   A good introduction to [method constraints with the bean validation 2.0 API](http://www.baeldung.com/javax-validation-method-constraints)
-   The SivaLabs blog has a nice post on why Spring Boot is so popular - worth a read if you're not already [convinced it's worth learning](https://sivalabs.in/2018/02/why-springboot-so-popular-how-to-learn-springboot/)
-   [Software engineering daily podcast on cloudfoundry](https://itunes.apple.com/us/podcast/software-engineering-daily/id1019576853?mt=2&i=1000403214905)
-   I'm honored to have been included in this [list of most influential folks in cloud](http://www.onalytica.com/blog/posts/top-influential-developers-in-ai-cloud-iot-cybersecurity-and-vr-ar-mr/). Lots of good people in that list, besides yours truly!
-   Pivotal Cloud Foundry legend Mike Dalessio was a recent guest on the [Software Daily podcast](https://www.softwaredaily.com/post/5a8d7c5f549ae10004734d03/Cloud-Foundry-Overview-with-Mike-Dalessio). It's a *great* listen!
-   [https://twitter.com/springcloud/status/966351370340257792](https://twitter.com/springcloud/status/966351370340257792)
-   Join me in [welcoming Josh Cummings to the Spring team](https://twitter.com/springcentral/status/966333008029532160)
-   The Riff project has just [announced Riff 0.0.4](https://projectriff.io/blog/announcing-riff-0-0-4/). Riff is a function-as-a-service offering from Pivotal that runs on top of Kubernetes.
-   The Asimo Tech blog has a nice post on [using a microservices Sidecar pattern implementation using Postgres, Spring Cloud Netflix and Docker](http://tech.asimio.net/2018/02/20/Microservices-Sidecar-pattern-implementation-using-Postgres-Spring-Cloud-Netflix-and-Docker.html)
-   [Micrometer 1.0 is now GA](https://twitter.com/micrometerio/status/966096809721507840)!
-   This post introduces [TLS from Gorouter](https://lists.cloudfoundry.org/g/cf-dev/message/7741) to app containers in Cloud Foundry