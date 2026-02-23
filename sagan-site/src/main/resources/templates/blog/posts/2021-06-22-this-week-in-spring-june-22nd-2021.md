---
title: This Week in Spring - June 22nd, 2021
source: https://spring.io/blog/2021/06/22/this-week-in-spring-june-22nd-2021
scraped: 2026-02-23T13:20:58.821Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Josh Long |  June 22, 2021 | 0 Comments
---

# This Week in Spring - June 22nd, 2021

_Engineering | Josh Long |  June 22, 2021 | 0 Comments_

Hi, Spring fans! How're y'all doing? Can you believe we're almost halfway through this crazy little thing called 2021? Time sure flies when you're having fun! This week was no exception. I joined the my buddy Matt Raible and Brian Demeers today for the OktaDev Twitch channel and we hacked on making the Spring Boot starter for Okta work with Spring Native. The goal is that you should be able to bring your application unchanged with Spring Native, and this is yet another example of that working. We didn't know what issues we were going to face, but we managed to figure out the relatively minor things required to make it work within an hour and within two hours we had most a working, standalone "hints" `.jar` dependency that users can add to their `spring-aot` plugins dependencies. Hopefully they'll polish that off and publish the bits soon.

This Okta starter is in *addition* to the already integrated, and already working, Spring Security OAuth 5 resource server and OIDC connect support, which already work flawlessly with native images. The TL;DR: if you want an OAuth secured HTTP service in your Spring Native and GraalVM native image, then you're just about all set.

Also, the video should be online on YouTube soon, so look for that if you want to watch us work. We had a few assists from Spring Native cofounder and lead Andy Clement who contributed from the peanut gallery.

I also built some Spring Native hints [for the Jetbrains Exposed ORM framework for Kotlin](https://github.com/joshlong/jetbrains-exposed-orm-native-hints). It's the same idea: build the code, then depend on the code from your project's `spring-aot` plugin. Exposed is an awesome, uber-typesafe object mapper or object relationship mapper that is a nice alternative to raw SQL with something like the `JdbcTemplate` or declaratie repositories with something like iBatis or Spring Data repositories. And now, along with so much else in the Kotlin community when built with Spring Boot, it works nicely with Spring Native. We hope you'll check it out! There are so many opportunities here, people, all we have to do is embrace them!

And, there's a ton to get to in this week's roundup so let's dive right in!

-   [A Bootiful Podcast: Azure Developer Advocate Rory Preddy on Spring, Java, Azure Spring Cloud and more](https://spring.io/blog/2021/06/17/a-bootiful-podcast-azure-developer-advocate-rory-preddy-on-spring-java-azure-spring-cloud-and-more)
-   [Big news: we are looking for someone to join the Spring team to work on Spring Native, @GraalVM and @SpringFramework / @SpringBoot native support. Remote work possible.](https://twitter.com/sdeleuze/status/1407331230618685451?s=21)
-   [Blog: Writing a Controller for Pod Labels](https://kubernetes.io/blog/2021/06/21/writing-a-controller-for-pod-labels/)
-   [I love this new Spring HATEOS Siren release!](https://twitter.com/d0gb0t666/status/1405594681409519623?s=12)
-   [In which I talk about Spring, the JVM and things: "being happy helps everything else work better." — Josh Long - DEV Community](https://dev.to/konfy/being-happy-helps-everything-else-work-better-josh-long-2ghn)
-   [Say hello to Microsoft Build of #OpenJDK! New Long-Term Support distribution of @OpenJDK for your @Java workloads from Microsoft...](https://twitter.com/JavaAtMicrosoft/status/1405650196210409476)
-   [Spring Boot loves Tanzu Observability with Madhura Bhave & Stéphane Nicoll | VMware Tanzu Developer Center](https://tanzu.vmware.com/developer/tv/tanzu-tuesdays/0057/)
-   [Spring Data 2021.0.2 and 2020.0.10 released](https://spring.io/blog/2021/06/22/spring-data-2021-0-2-and-2020-0-10-released)
-   [Spring Security 5.5.1, 5.4.7, 5.3.10 and 5.2.11 released](https://spring.io/blog/2021/06/22/spring-security-5-5-1-5-4-7-5-3-10-and-5-2-11-released)
-   [Spring Tools 4.11.0 released](https://spring.io/blog/2021/06/21/spring-tools-4-11-0-released)
-   [The SpringHow blog has a nice post on using the startup Actuator endpoint in Spring Boot](https://springhow.com/spring-boot-startup-actuator-endpoint/)
-   [The JVM ecosystem report, by Snyk, is out with all the usual tidbits (Spring and Spring Boot continue to dominate the market, for one..). I even wrote a little piece on Reactive Spring for it-check it out!](https://snyk.io/jvm-ecosystem-report-2021/)