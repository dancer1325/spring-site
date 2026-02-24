---
title: Spring Security Java Config Preview: Introduction
source: https://spring.io/blog/2013/07/02/spring-security-java-config-preview-introduction
scraped: 2026-02-24T08:03:03.881Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  July 02, 2013 | 0 Comments
---

# Spring Security Java Config Preview: Introduction

_Engineering | Rob Winch |  July 02, 2013 | 0 Comments_

Yesterday I announced the [release of Spring Security Java Configuration support](http://www.springsource.org/node/22640) and the [release of Spring Security 3.2.0.M2](http://www.springsource.org/node/22639) which contains Java Configuration support.

Spring Security's Java Configuration support is intended to provide a complete replacement of the [XML namespace configuration](http://static.springsource.org/spring-security/site/docs/3.1.x/reference/appendix-namespace.html). It is also designed to be extensible, so that Spring Security's extension projects can work nicely with the Java Configuration support.

In this first post of a [five](http://blog.springsource.org/2013/07/03/spring-security-java-config-preview-web-security/) [part](http://blog.springsource.org/2013/07/04/spring-security-java-config-preview-method-security/) Spring Security Java Configuration [blog](http://blog.springsource.org/2013/07/05/spring-security-java-config-preview-oauth/) [series](http://blog.springsource.org/2013/07/11/spring-security-java-config-preview-readability/), I discuss the logistics of the Spring Security Java Configuration project.

\[callout title="Required Versions"\]Regardless of how you decide to integrate with Spring Security, it is important to ensure you are using Spring 3.2.3.RELEASE+ to ensure that you avoid [SPR-10546](https://jira.springsource.org/browse/SPR-10546).\[/callout\]

### Availability

Before we get started, I'd like to talk about the two modules that Spring Security's Java Configuration can be found.

#### Availability in Spring Security 3.2.0.M2+

Spring Security Java Configuration has been copied into the Spring Security 3.2.0.M2+ code base. This means if you are using Spring Security 3.2.0.M2+ you should ensure to have the spring-security-config jar on your classpath. For example, you might have the following entries in your Maven pom.xml:

```xml
Copy
<dependency>
  <groupId>org.springframework.security</groupId>
  <artifactId>spring-security-config</artifactId>
  <version>3.2.0.M2</version>
</dependency>
…
<repository>
  <id>repository.springsource.milestone</id>
  <name>SpringSource Milestone Repository</name>
  <url>http://repo.springsource.org/milestone</url>
</repository>
```

\[callout title="Future Availability"\]Currently there are no plans to provide any updates to spring-security-javaconfig. Instead, users will be encouraged to update to Spring Security 3.2 when it is released.\[/callout\]

#### Availability for Spring Security 3.1.4.RELEASE+

In order to encourage users to try Spring Security Java Configuration, it is also available as a standalone module called spring-security-javaconfig. For example, you might have the following entries in your Maven pom.xml:

```xml
Copy
<dependency>
  <groupId>org.springframework.security</groupId>
  <artifactId>spring-security-javaconfig</artifactId>
  <version>1.0.0.M1</version>
</dependency>
…
<repository>
  <id>repository.springsource.milestone</id>
  <name>SpringSource Milestone Repository</name>
  <url>http://repo.springsource.org/milestone</url>
</repository>
```

\[callout title=SpringOne2GX 2013\]Want to learn more about Spring Security 3.2 release? Register for [SpringOne2GX 2013, September 9-12 in Santa Clara, California](http://www.springone2gx.com/conference/santa_clara/2013/09/register) where I will be [discussing Spring Security 3.2](http://www.springone2gx.com/conference/santa_clara/2013/09/session?id=29451) in more detail! There conference will have [tons of great sessions](http://www.springone2gx.com/conference/santa_clara/2013/09/schedule) to quickly catch you up with everything that is happening in the Spring, Groovy, and Grails communities! Don't forget to register by Aug 9th to save $200 with the Early discount! \[/callout\]

### Feedback Please

If you encounter a bug, have an idea for improvement, etc please do not hesitate to bring it up! We want to hear your thoughts so we can ensure we get it right before the code is generally available. Trying out new features early is a good and simple way to give back to the community. This also ensures that the features you want are present and working as you think they should.

Please log any issues or feature requests to the [Spring Security JIRA](https://jira.springsource.org/browse/SEC) under the category "Java Config". After logging a JIRA, we encourage (but do not require) you to submit your changes in a pull request. You can read more about how to do this in the [Contributor Guidelines](https://github.com/SpringSource/spring-security/blob/master/CONTRIBUTING.md)

If you have questions on how to do something, please use the [Spring Security forums](http://forum.springsource.org/forumdisplay.php?33-Security) or [Stack Overflow with the tag spring-security](http://stackoverflow.com/questions/tagged/spring-security) (I will be monitoring them closely). If you have specific comments questions about this blog, feel free to leave a comment. Using the appropriate tools will help make it easier for everyone.

### Conclusion

You should now have a clear idea of why Spring Security Java Configuration exists it multiple places, where you will find updates, and where to log issues to. In the [next post](http://blog.springsource.org/2013/07/03/spring-security-java-config-preview-web-security/), we will walk through using Spring Security Java configuration in a web application.