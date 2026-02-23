---
title: Spring Security 6.3 Adds Passive JDK Serialization/Deserialization for Seamless Upgrades
source: https://spring.io/blog/2024/01/19/spring-security-6-3-adds-passive-jdk-serialization-deserialization-for/
scraped: 2026-02-23T09:00:02.191Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Marcus Hert Da Coregio |  January 19, 2024 | 0 Comments
---

# Spring Security 6.3 Adds Passive JDK Serialization/Deserialization for Seamless Upgrades

_Engineering | Marcus Hert Da Coregio |  January 19, 2024 | 0 Comments_

In the early versions of Spring Security, a deliberate decision was made to avoid providing any guarantee of compatibility for serialized classes (via JDK serialization) between different versions of the project. This decision primarily took into account the context of [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation), with the recommendation being that both the server and client should use the same version of Spring Security.

As more apps depend on persistent sessions and technologies like [Spring Session](https://spring.io/projects/spring-session/), the problem with inconsistent serialization becomes a bigger deal. Persistent sessions mean saving user sessions by turning them into a format that can be stored and used later on various requests, servers, or even if the application restarts. In these situations, if JDK serialization isn't passive, it could cause problems when trying to use objects saved in an older or newer version of Spring Security.

A shared `serialVersionUID` was defined for any serializable Spring Security class. However, this common identifier was updated with each minor version release. Consequently, objects serialized in, for instance, version 6.0 couldn't be deserialized in version 6.1, and vice versa—even if the object's structure remained unchanged. This meant that a seemingly straightforward minor version upgrade could lead to issues.

Although Spring Security's policy is generally not to introduce any breaking changes between minor versions, this has not been the case for Java serialization.

Beginning with Spring Security 6.3, this concern becomes a thing of the past. The serialization of classes will now undergo testing for compatibility with the preceding minor version. This enhancement assures users that upgrading to newer versions won't inadvertently disrupt serialized objects, offering a more robust and seamless experience.

In case you encounter any issues related to serialization compatibility, please report it on the [project's issue tracker](https://github.com/spring-projects/spring-security/issues). We look forward to receiving your input and appreciate your collaboration in making Spring Security even more reliable and user-friendly.

For more details, you can refer to the following links:

-   [https://github.com/spring-projects/spring-security/issues/9204](https://github.com/spring-projects/spring-security/issues/9204)
-   [https://github.com/spring-projects/spring-security/issues/3737](https://github.com/spring-projects/spring-security/issues/3737)
-   [https://github.com/spring-projects/spring-security/issues/1945](https://github.com/spring-projects/spring-security/issues/1945)
-   [https://github.com/spring-projects/spring-boot/issues/38959](https://github.com/spring-projects/spring-boot/issues/38959)