---
title: A Java 17 and Jakarta EE 9 baseline for Spring Framework 6
source: https://spring.io/blog/2021/09/02/a-java-17-and-jakarta-ee-9-baseline-for-spring-framework-6
scraped: 2026-02-23T10:45:33.531Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  September 02, 2021 | 24 Comments
---

# A Java 17 and Jakarta EE 9 baseline for Spring Framework 6

_Engineering | Juergen Hoeller |  September 02, 2021 | 24 Comments_

As announced at SpringOne yesterday, Spring Framework 6 and Spring Boot 3 are planned towards a high-end baseline for their general availability in Q4 2022:

-   **Java 17+** (from Java 8-17 in the Spring Framework 5.3.x line)
-   **Jakarta EE 9+** (from Java EE 7-8 in the Spring Framework 5.3.x line)

This forward-looking baseline will provide significant benefits in our API design and integration efforts, shining through to your application code and future-proofing the framework as well as your applications for many years to come. However, it comes at a cost, of course: Spring Framework 6 and Spring Boot 3 based applications will require a minimum of JDK 17 at runtime, as well as a minimum of Tomcat 10 / Jetty 11 (for Jakarta EE 9 compatibility). Even more importantly, there might be some changes required in your application source code: e.g. the *javax* to *jakarta* namespace change in Jakarta EE 9 wherever you're touching the Servlet API, JPA, Bean Validation, etc.

While this may sound aggressive at first, keep in mind that we're talking about a Q4 2022 release: By that time, not only will JDK 17 have superseded JDK 11 as the next Long-Term Support release for more than a year, it will itself have been superseded by JDK 18 and JDK 19 as then-available feature releases, with JDK 20 approaching its feature freeze already. Same for Jakarta EE 9: We expect Jakarta EE 10 to be out by then, and yet another generation of Tomcat, Jetty and co to be supported as runtime options. Keeping up the baseline above as a minimum, this allows for picking up further Java evolution in the Spring Framework 6.x generation, with Java 17 and Jakarta EE 9 only being the start.

In parallel, Spring Framework 5.3.x and Spring Boot 2.x remain in active development for the time being, with Spring Boot 2.6 coming up this November and then Spring Boot 2.7 in May 2022. Once the final Spring Boot 2.x feature branch has been reached (it has yet to be determined whether this will be 2.7 or possibly a later release), that branch will turn into an extended open source maintenance phase along with Spring Framework 5.3.x, with several years of overlap in parallel to Spring Framework 6 and Spring Boot 3. Consider our previous handling of the Spring Framework 3.2.x and 4.3.x maintenance branches to understand how this will turn out in practice.

So if you intend to stay on JDK 8 or 11 for a further few years, or even if you intend to stay on the Spring Framework 5.3 infrastructure on JDK 17 for several years, rest assured that our extended maintenance of Spring Framework 5.3.x and Spring Boot 2.x will keep you covered. Once you are ready to prepare your applications for the next generation of the Java ecosystem, feel free to upgrade to Spring Framework 6 and Spring Boot 3 at your own pace, along with Tomcat, Jetty and co - with new infrastructural benefits and new architectural options becoming available to you. We hope that you will appreciate those choices over the next few years.

*P.S.: In case you're wondering about JDK 11 as an LTS generation, please note that the commercial support timeframes for JDK 11 are shorter than for JDK 8, with JDK 11 LTS phasing out in late 2023 already. JDK 17 as the next LTS generation will provide support timeframes until 2026 at least. We consider JDK 8 to have a unique role in the ecosystem; in comparison, JDK 11 is a transitional release. Also, JDK 17 provides an accumulated set of recent language, API and JVM enhancements, making it a more compelling upgrade. Last but not least, within the same Spring Framework 6.x generation, there'll be JDK releases up until 29 LTS (in 2027) to support still, turning the eventual support range into a rather broad JDK 17-29 anyway.*