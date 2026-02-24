---
title: Spring LDAP 2.0.0.M1 Released
source: https://spring.io/blog/2013/11/01/spring-ldap-2-0-0-m1-released
scraped: 2026-02-24T07:54:31.738Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  November 01, 2013 | 0 Comments
---

# Spring LDAP 2.0.0.M1 Released

_Releases | Rob Winch |  November 01, 2013 | 0 Comments_

I'm pleased to announce that Spring LDAP 2.0.0.M1 is now available from the SpringSource repository at [http://repo.springsource.org](http://repo.springsource.org). See [here](https://github.com/spring-projects/spring-framework/wiki/Downloading-Spring-artifacts#wiki-resolving-spring-artifacts) for a quick tutorial on resolving these artifacts via Maven.

# [](#whats-new)What's New?

The release adds [lots of new functionality](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10071&version=11383)! Some of the highlights can be found below:

-   Spring Data Repository and QueryDSL support is now included in Spring LDAP.
-   Fluent LDAP query support has been added.
-   A custom XML namespace is now provided to simplify configuration of Spring LDAP.
-   Spring LDAP core has been updated with Java 5 features such as generics and varargs.
-   The ODM (Object-Directory Mapping) functionality has been moved to core and there are new methods in LdapOperations/LdapTemplate that uses this automatic translation to/from ODM-annotated classes.

Refer to the [What's new in Spring LDAP 2.0](http://docs.spring.io/spring-ldap/docs/2.0.0.M1/reference/#what-s-new-in-spring-ldap-2-0) to find the full details of this release.

# [](#feedback-please)Feedback Please

As always, your feedback is critical to the success of Spring. If you have questions, please post to [stackoverflow with the spring-ldap tag](https://stackoverflow.com/questions/tagged/spring-ldap). If you find issues, please log them in our [JIRA](https://jira.springsource.org/browse/LDAP).