---
title: Feedback welcome: Spring 5 system requirements
source: https://spring.io/blog/2015/06/10/feedback-welcome-spring-5-system-requirements
scraped: 2026-02-23T19:45:53.158Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  June 10, 2015 | 21 Comments
---

# Feedback welcome: Spring 5 system requirements

_Engineering | Juergen Hoeller |  June 10, 2015 | 21 Comments_

As you might have gathered from my [Java EE 7 blog post](https://spring.io/blog/2015/06/04/happy-second-birthday-java-ee-7-how-is-it-going-in-production), we are planning for a Spring Framework 5.0 generation with a 2016 availability horizon. We'll be tracking JDK 9's release candidates then since one of our key themes is comprehensive JDK 9 support.

The feature planning for Spring 5 is still in the works. We are going to present a more in-depth plan at [SpringOne](http://www.springone2gx.com/) this year, so stay tuned! Nevertheless, I would like to take this opportunity to reach out to you for feedback about our intended system requirements:

**We will definitely raise our minimum to JDK 8+.** This is a prerequisite since it allows us to have a cleaner codebase across the framework, to introduce default method implementations in our core interfaces, and to depend on JDK 8 API types (e.g. CompletableFuture, java.util.function interfaces) in our core abstractions.

**We intend to softly upgrade the EE baseline as well.** Now, this is a bit tricky since we effectively have individual requirements here - and we need to consider the enterprise adoption levels in production environments:

-   We'll definitely raise to Servlet 3.0+ (from our present Servlet 2.5 runtime compatibility) but no higher since we'd like Spring 5 applications to run on EE 6 baselined servers still. See [my previous blog post](https://spring.io/blog/2015/06/04/happy-second-birthday-java-ee-7-how-is-it-going-in-production) for a discussion on why this is unavoidable, given the market situation with Java EE 7 and the multitude of servers which is still based on the Servlet 3.0 API.
-   We'll keep our JMS 1.1+ compatibility since, aside from the EE 7 issue, we expect message brokers in the corporate world which are not necessarily upgraded to JMS 2.0 yet. Spring's JMS support automatically adapts to JMS 2.0 anyway, so there shouldn't be any lack in functionality. It's just a shame that we have to keep supporting the 2002-era JMS 1.1 API...
-   We'd like to raise to JPA 2.1+ and Bean Validation 1.1+ but our hands seem to be tied: TomEE 1.7 and JBoss EAP 6.4 have hard JPA 2.0 and Bean Validation 1.0 APIs in them, and WebLogic 12.1.3 has JPA 2.1 but no Bean Validation 1.1 API (despite them being related).
-   *This means we'll have to keep detecting JPA 2.1 / BV 1.1, automatically adapting to them - or we'll require local bundling of the JPA 2.1 / BV 1.1 API jars and corresponding providers. A likely outcome is that we'll streamline our setup towards JPA 2.1, just tolerating JPA 2.0 at runtime through fallback checks, similar to how we handle Servlet 3.0 vs 2.5 at present.*

Are the assumptions above feasible from your perspective? Do you have experience with individually upgrading EE 6 servers to JPA 2.1 / Bean Validation 1.1, e.g. through locally shipping the corresponding APIs and providers in the application? Any feedback welcome!

**Please note:** If you are stuck on JDK 6 or 7, no need to worry: We are also planning towards a Spring Framework 4.3 release early next year, within the general Spring 4 system requirements. However, this will then be the last feature release in that line, with Spring Framework 4.x entering a plain maintenance phase afterwards.