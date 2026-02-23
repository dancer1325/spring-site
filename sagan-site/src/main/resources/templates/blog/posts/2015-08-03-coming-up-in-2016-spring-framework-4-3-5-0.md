---
title: Coming up in 2016: Spring Framework 4.3 & 5.0
source: https://spring.io/blog/2015/08/03/coming-up-in-2016-spring-framework-4-3-5-0
scraped: 2026-02-23T19:45:44.339Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  August 03, 2015 | 11 Comments
---

# Coming up in 2016: Spring Framework 4.3 & 5.0

_Releases | Juergen Hoeller |  August 03, 2015 | 11 Comments_

As a follow-up to the [Spring Framework 4.2 GA announcement](https://spring.io/blog/2015/07/31/spring-framework-4-2-goes-ga) and also to my earlier post on [Spring Framework 5 system requirements](https://spring.io/blog/2015/06/10/feedback-welcome-spring-5-system-requirements), I'd like to take the opportunity to summarize our core framework plans for next year:

#Spring Framework 4.3

First up will be Spring Framework 4.3 in Q2 2016, as a final feature release in the 4.x series. As mentioned, this will still be designed for the general Spring 4 system requirements (Java 6+, Servlet 2.5+) and getting prepared for an extended 4.3.x support life until 2019, in particular for users on JDK 6 and 7 but also for applications deployed to older app servers on JDK 8.

A key part of our 4.3 plan is to selectively upgrade our third-party dependency arrangement: e.g. fully embracing [JUnit 4.12](https://github.com/junit-team/junit/blob/master/doc/ReleaseNotes4.12.md), the [Jackson 2.5+ APIs](https://github.com/FasterXML/jackson/wiki/Jackson-Release-2.5), the new [JasperReports Exporter API](http://sourceforge.net/projects/jasperreports/files/jasperreports/JasperReports%205.5.2/)... in order to make our corresponding integration classes forward-compatible with future generations of those libraries (through avoiding the use of deprecated types and methods).

Of course, there is also the opportunity to fine-tune recent framework features, in the core configuration model as well as across the various messaging endpoint variants. Check the current [4.3 Backlog on JIRA](https://jira.spring.io/issues/?jql=fixVersion%20%3D%20%224.3%20Backlog%22%20AND%20project%20%3D%20SPR%20ORDER%20BY%20issuetype%20DESC) for a list of candidate improvements. Make sure you're voicing your opinion on the importance of specific issues through comments and votes on JIRA!

#Spring Framework 5.0

At the same time, we plan towards a Spring Framework 5 generation, with 5.0 GA in Q4 2016. A key step is to require Java 8+, allowing us to apply the Java 8 language level to the entire framework codebase. Currently, we auto-adapt to many Java 8 constructs in your application components but cannot use them ourselves in the core framework codebase yet; in particular, we cannot expose them in core interfaces yet. 5.0 will be an important enabler in that respect.

While Java 8 is the minimum requirement, Spring Framework 5.0 will be built on [JDK 9](http://openjdk.java.net/projects/jdk9/) right from the start, providing comprehensive support for the upcoming generation of the JDK: including the [new HTTP client API](http://openjdk.java.net/jeps/110), [concurrency enhancements](http://cs.oswego.edu/pipermail/concurrency-interest/2015-January/013641.html), etc. We will also track the planned JSR-330 (Dependency Injection for Java) revision and provide early support for EE 8 level specs such as [Servlet 4.0](https://www.jcp.org/en/jsr/detail?id=369) and [JMS 2.1](https://java.net/projects/jms-spec/pages/JMS21) (as far as feasible against the upcoming previews).

Our [5.0 Backlog on JIRA](https://jira.spring.io/issues/?jql=project%20%3D%20SPR%20AND%20fixVersion%20%3D%20%225.0%20Backlog%22%20ORDER%20BY%20issuetype%20DESC) indicates various key steps already. This is still in its early planning stages, but nevertheless, feel free to voice your opinion there as well...