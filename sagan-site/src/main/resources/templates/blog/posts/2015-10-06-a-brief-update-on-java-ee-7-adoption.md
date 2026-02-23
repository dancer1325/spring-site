---
title: A brief update on Java EE 7 adoption
source: http://spring.io/blog/2015/10/06/a-brief-update-on-java-ee-7-adoption
scraped: 2026-02-23T19:40:46.300Z
description: Level up your Java code and explore what Spring can do for you.
meta: News | Juergen Hoeller |  October 06, 2015 | 4 Comments
---

# A brief update on Java EE 7 adoption

_News | Juergen Hoeller |  October 06, 2015 | 4 Comments_

A reminder: Every time somebody shows you a survey result with a Java EE 7 usage column, in particular when talking about production usage, double-check what they actually asked for. Does Hibernate 4.3 usage count as Java EE 7, just because it's JPA 2.1 (EE 7 level but run standalone)? Does Tomcat 8 usage count as Java EE 7, just because it's Servlet 3.1? And of course, does running a Spring application with any such individual providers count as EE 7?

Take such statistics with a big grain of salt: They typically do not ask for "native Java EE 7 platform usage" but are being presented that way eventually. Why is it a safe assumption that they did not ask for full Java EE 7 platform usage in production? Well, remember my [blog post from back in June](https://spring.io/blog/2015/06/04/happy-second-birthday-java-ee-7-how-is-it-going-in-production), which is still as valid in late 2015. In the meantime, the only real news is that there is no news since IBM released their EE 7 support in WebSphere's Liberty Profile. All in all, responders to such survey questions are likely to answer based on "I'm using one or more specifications from that umbrella", not on "I'm using the full platform in its intended form".

FWIW, we decided to raise our [Spring Framework 5 system requirements](https://spring.io/blog/2015/06/10/feedback-welcome-spring-5-system-requirements) not only to JDK 8+ but also to JPA 2.1+ and Bean Validation 1.1+. After all, by Q4 2016 (our Spring 5 GA target), those specs will be 3.5 years old already, so we're willing to require them at that point. And we'll still support Servlet 3.0+, so EE 6 baselined servers with JPA 2.1 mixed in will be alright.

*To avoid any misunderstandings: Spring 4.x has been shipping full support for JPA 2.1 and other EE 7 level specs since 2013, side by side with our JPA 2.0 / EE 6 support. The above is just referring to requiring JPA 2.1+ as of Spring Framework 5.0 towards the end of 2016, making it incompatible with underlying server infrastructure that remains bound to JPA 2.0.*