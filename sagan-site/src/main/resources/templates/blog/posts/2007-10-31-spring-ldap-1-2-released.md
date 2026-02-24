---
title: Spring LDAP 1.2 Released
source: https://spring.io/blog/2007/10/31/spring-ldap-1-2-released
scraped: 2026-02-24T09:24:01.482Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Mattias Arthursson |  October 31, 2007 | 0 Comments
---

# Spring LDAP 1.2 Released

_Releases | Mattias Arthursson |  October 31, 2007 | 0 Comments_

Dear Spring Community,

We are pleased to announce the release of Spring LDAP version 1.2. This is a major release that introduces a number of features and bugfixes.

            [Download](https://sourceforge.net/project/showfiles.php?group_id=73357&package_id=202038&release_id=550670) | [ChangeLog](https://sourceforge.net/project/shownotes.php?group_id=73357&release_id=550670) | [Documentation (HTML)](http://static.springframework.org/spring-ldap/docs/1.2.0/reference/) | [Documentation (PDF)](http://static.springframework.org/spring-ldap/docs/1.2.0/pdf/spring-ldap-reference.pdf) | [API](http://static.springframework.org/spring-ldap/docs/1.2.0/api/)

A summary of the more important changes:

-   Java 5 Generics support is now provided with the SimpleLdapTemplate and ParameterizedContextMapper classes.
-   Client-side LDAP transactions.
-   Several additional API methods, simplifying a number of common tasks.

**About Spring LDAP**  
Spring LDAP is a Java library for simplifying LDAP operations, based on the pattern of Spring's JdbcTemplate. The framework relieves the user of the burden of looking up and closing contexts, looping through NamingEnumerations, encoding/decoding values and filters, and more.

The LdapTemplate class encapsulates all the plumbing work involved in traditional LDAP programming, such as creating, looping through NamingEnumerations, handling Exceptions and cleaning up resources. This leaves the programmer to handle the important stuff - where to find data (DNs and Filters) and what do do with it (map to and from domain objects, bind, modify, unbind, etc.), in the same way that JdbcTemplate relieves the programmer of all but the actual SQL and how the data maps to the domain model.

In addition to this, Spring LDAP provides Exception translation from NamingExceptions to a mirrored, unchecked Exception hirearchy, as well as several utilities for working with filters, LDAP paths and Attributes.

Spring-LDAP requires J2SE 1.4 for running. J2SE 1.4 and javacc is required for building the distribution binaries from sources. J2EE 1.4 (Servlet 2.3, JSP 1.2) is required for running the example.

**Where to start**  
Download the distribution from the link above. The distribution contains extensive JavaDoc documentation as well as full reference documentation and a sample application illustrating different ways to use Spring LDAP.

**Home**  
The permanent home of Spring LDAP is at [http://www.springframework.org/ldap](/ldap).

Mattias Arthursson & Ulrik Sandberg, Spring LDAP Project Team