---
title: Spring LDAP 1.2.1 released
source: https://spring.io/blog/2007/12/08/spring-ldap-1-2-1-released
scraped: 2026-02-24T09:22:45.028Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ulrik Sandberg |  December 08, 2007 | 0 Comments
---

# Spring LDAP 1.2.1 released

_Releases | Ulrik Sandberg |  December 08, 2007 | 0 Comments_

Dear Spring Community,

We are pleased to announce that Spring LDAP version 1.2.1 has been released. This is an update release that adds a new pooling library and fixes a few problems that were in 1.2. [Download](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=202038) | [ChangeLog](http://sourceforge.net/project/shownotes.php?group_id=73357&release_id=560004)

A summary of the more important changes:

-   Added pooling library which features flexible connection validation and better configuration than the built-in pooling. Many thanks to Eric Dalquist for this contribution. ([LDAP-85](http://opensource.atlassian.com/projects/spring/browse/LDAP-85))
-   Fixed a problem in AbstractContextSource which led to an unnecessary reference to the LDAP Booster Pack (ldapbp). ([LDAP-88](http://opensource.atlassian.com/projects/spring/browse/LDAP-88), [LDAP-89](http://opensource.atlassian.com/projects/spring/browse/LDAP-89))
-   Fixed bug in SimpleLdapTemplate where the wrong target method was being called. ([LDAP-93](http://opensource.atlassian.com/projects/spring/browse/LDAP-93))
-   Made createContext in AbstractContextSource protected rather than package private. ([LDAP-94](http://opensource.atlassian.com/projects/spring/browse/LDAP-94))

**About Spring LDAP**  
Spring LDAP is a Java library for simplifying LDAP operations, based on the pattern of Spring's JdbcTemplate. The framework relieves the user of the burden of looking up and closing contexts, looping through results, encoding/decoding values and filters, and more.

The LdapTemplate class encapsulates all the plumbing work involved in traditional LDAP programming, such as creating a DirContext, looping through NamingEnumerations, handling Exceptions and cleaning up resources. This leaves the programmer to handle the important stuff - where to find data (DNs and Filters) and what do do with it (map to and from domain objects, bind, modify, unbind, etc.), in the same way that JdbcTemplate relieves the programmer of all but the actual SQL and how the data maps to the domain model.

In addition to this, Spring LDAP provides transaction support, a pooling library, exception translation from NamingExceptions to a mirrored unchecked NamingException hierarchy, as well as several utilities for working with filters, LDAP paths and Attributes.

Spring-LDAP requires J2SE 1.4. J2SE 1.4 is required for building. J2EE 1.4 (Servlet 2.3, JSP 1.2) is required for running the example.

**Where to start**  
Download the distribution from the link above. The distribution contains extensive JavaDoc documentation as well as full reference documentation and a sample application illustrating different ways to use Spring LDAP.

**Home**  
The permanent home of Spring LDAP is at [http://www.springframework.org/ldap](/ldap).

**History**  
Spring LDAP is based on the SourceForge LdapTemplate project. Users of LdapTemplate are advised to switch to Spring LDAP.

Mattias Arthursson & Ulrik Sandberg  
Spring LDAP Project Team