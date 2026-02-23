---
title: Ongoing support for Java 7 (and even Java 6)
source: https://spring.io/blog/2015/04/01/ongoing-support-for-java-7-and-even-java-6
scraped: 2026-02-23T21:08:34.979Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Juergen Hoeller |  April 01, 2015 | 4 Comments
---

# Ongoing support for Java 7 (and even Java 6)

_Engineering | Juergen Hoeller |  April 01, 2015 | 4 Comments_

You might have heard about the end of public updates for Java 7, coming up in just a few days with the release of Java 7 update 80. See the following Oracle pages for a reference:

[https://blogs.oracle.com/java-platform-group/entry/future\_updates\_of\_java\_7](https://blogs.oracle.com/java-platform-group/entry/future_updates_of_java_7) [http://www.oracle.com/technetwork/java/eol-135779.html](http://www.oracle.com/technetwork/java/eol-135779.html)

Let's clarify what it really is: **the end of public updates**, and by no means an end of life (EOL). With the second link above, scroll down to the "Oracle Java SE Support Roadmap" section and you'll find the actual **EOL dates: Dec 2018 for Java 6 and Jul 2022 for Java 7.** Yes, that's another 3.5 years for Java 6 from now, and even another 7 years (!) for Java 7.

IBM's EOL timeframes are similar, although an even longer Java 6 support timeline is to be expected there. **It's generally worth noting that any end-of-updates statements from Oracle are completely irrelevant for IBM users:** The IBM JDK is an independent product that just happens to be based on the same open source project (OpenJDK) in recent years.

So please, if you see any statements about Java 7 getting EOL'ed these days, take them with a large grain of salt. **The end of public updates is just the point of time when Oracle starts to charge for maintenance releases, that's all.** Java 7 remains with us for another 7 years.

In case you're wondering about the Spring perspective: We designed [Spring Framework 4.x](http://projects.spring.io/spring-framework/) to support Java 6, 7 and 8 in the same framework generation. **That's a unified programming model to cover three generations of Java, allowing you to upgrade at your own pace while at the same time getting the maximum out of the JDK that you're currently using!**

The clue is that Spring Framework 4.x feels like a Java 8 based framework, out of the box, when using it on JDK 8. With the same framework version and framework jars, you'll also get a fine experience on JDK 6 and 7: **You'll just be restricted by the Java language and API level but will otherwise find the same 2015-era framework features at your fingertips.**

Stay tuned for a follow-up blog post on how we go about supporting multiple JDK generations in our codebase...

Juergen

P.S.: Note that the [Spring IO platform](http://platform.spring.io/platform/), including its wide arrangement of dependencies, is only supported on Java 7 and 8. At the same time, many of our Spring portfolio projects are still compatible with Java 6... and JDK 6 based application servers such as WebSphere 7.0 / 8.0.