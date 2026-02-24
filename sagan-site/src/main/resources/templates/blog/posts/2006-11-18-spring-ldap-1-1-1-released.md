---
title: Spring LDAP 1.1.1 Released
source: https://spring.io/blog/2006/11/18/spring-ldap-1-1-1-released
scraped: 2026-02-24T09:33:34.442Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ulrik Sandberg |  November 18, 2006 | 0 Comments
---

# Spring LDAP 1.1.1 Released

_Releases | Ulrik Sandberg |  November 18, 2006 | 0 Comments_

Dear Spring Community,

We are pleased to announce that Spring LDAP version 1.1.1 has been released. This is an update release that adds several new features and fixes a few problems that were in 1.1. [Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=202038) | [ChangeLog](http://sourceforge.net/project/shownotes.php?release_id=442804&group_id=73357) | [Documentation](http://static.springframework.org/spring-ldap/docs/1.1.1/reference/) | [API](http://static.springframework.org/spring-ldap/docs/1.1.1/api/)

A summary of the more important changes:

-   Added capability to use server-side controls in search.
-   DirContextAdapter.getNameInNamespace() now returns the full DN.
-   DistinguishedName now supports multi-valued RDNs separated by a '+' sign, like "cn=Rod+sn=Johnson", for example.
-   Added lookup methods that take an array of return attribute names.
-   Upgraded Spring to 2.0 internally. Spring 1.2.8 is still supported.

**About Spring LDAP**  
Spring LDAP is a Java library for simplifying LDAP operations, based on the pattern of Spring's JdbcTemplate. The framework relieves the user of the burden of looking up and closing contexts, looping through NamingEnumerations, encoding/decoding values and filters, and more.

The LdapTemplate class encapsulates all the plumbing work involved in traditional LDAP programming, such as creating, looping through NamingEnumerations, handling Exceptions and cleaning up resources. This leaves the programmer to handle the important stuff - where to find data (DNs and Filters) and what do do with it (map to and from domain objects, bind, modify, unbind, etc.), in the same way that JdbcTemplate relieves the programmer of all but the actual SQL and how the data maps to the domain model.

In addition to this, Spring LDAP provides Exception translation from NamingExceptions to DataAccessExceptions, as well as several utilities for working with filters, LDAP paths and Attributes.

Spring-LDAP requires J2SE 1.4. J2SE 1.4 is required for building. J2EE 1.4 (Servlet 2.3, JSP 1.2) is required for running the example.

**Where to start**  
Download the distribution from the link above. The distribution contains extensive JavaDoc documentation as well as full reference documentation and a sample application illustrating different ways to use Spring LDAP.

**Home**  
The permanent home of Spring LDAP is at [http://www.springframework.org/ldap](/ldap).

**History**  
Spring LDAP is based on the SourceForge LdapTemplate project. Users of LdapTemplate are advised to switch to Spring LDAP.

Mattias Arthursson & Ulrik Sandberg  
Spring LDAP Project Team