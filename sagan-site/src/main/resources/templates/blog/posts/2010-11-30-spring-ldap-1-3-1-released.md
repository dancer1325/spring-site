---
title: Spring LDAP 1.3.1 released
source: https://spring.io/blog/2010/11/30/spring-ldap-1-3-1-released
scraped: 2026-02-24T08:50:33.708Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ulrik Sandberg |  November 30, 2010 | 0 Comments
---

# Spring LDAP 1.3.1 released

_Releases | Ulrik Sandberg |  November 30, 2010 | 0 Comments_

Dear Spring Community,

We are pleased to announce that Spring LDAP version 1.3.1 has been released. This is an update release that adds a new LDIF parsing library, an Object-Directory Mapping (ODM) framework, and fixes a few problems that were in 1.3.0. [Download](http://www.springsource.com/download/community?project=Spring%20LDAP) | [ChangeLog](http://static.springsource.org/spring-ldap/docs/1.3.x/changelog.txt)

A summary of the more important changes:

-   Added an Object-Directory Mapping (ODM) framework for annotation-based mapping between LDAP and Java objects; much like Hibernate or JPA, but for LDAP. Thanks to Paul Harvey for this contribution. ([Docs](http://static.springsource.org/spring-ldap/docs/1.3.x/reference/html/odm.html))
-   Added an LDIF parsing library with an optional integration with Spring Batch. Thanks to Keith Barlow for this contribution. ([Docs](http://static.springsource.org/spring-ldap/docs/1.3.x/reference/html/ldif-parsing.html))
-   Added an extension to ContextMapperCallbackHandler that can provide the associated mapper with an indication that the response is different for each search result. ([LDAP-185](http://opensource.atlassian.com/projects/spring/browse/LDAP-185))
-   DIGEST-MD5 SASL authentication mechanism is now supported. Contributed by Marvin S. Addison. ([LDAP-173](http://opensource.atlassian.com/projects/spring/browse/LDAP-173))
-   AbstractTlsDirContextAuthenticationStrategy now provides a setter for customizing SSLSocketFactory used for TLS negotiation. ([LDAP-180](http://opensource.atlassian.com/projects/spring/browse/LDAP-180))
-   Added authentication methods that provide a possible authentication exception through an AuthenticationErrorCallback. ([LDAP-192](http://opensource.atlassian.com/projects/spring/browse/LDAP-192))

## Get the latest Spring LDAP releases here

-   Spring LDAP **1.3.1.RELEASE** is the current production release:

-   [Download](http://www.springsource.com/download/community?project=Spring%20LDAP) | [Changelog](http://static.springframework.org/spring-ldap/docs/1.3.x/changelog.txt) | [Documentation (HTML)](http://static.springframework.org/spring-ldap/docs/1.3.x/reference/html/)  | [Documentation (PDF)](http://static.springframework.org/spring-ldap/docs/1.3.x/reference/pdf/spring-ldap-reference.pdf)  | [API](http://static.springframework.org/spring-ldap/docs/1.3.x/apidocs/)

-   Spring LDAP **1.3.x nightly snapshots** are available for testing and development purposes:

-   **[Download](http://static.springframework.org/spring-ldap/downloads/1.3-snapshot-download.php)**

Ulrik Sandberg and Mattias Hellborg-Arthursson, [Jayway](http://www.jayway.com)  
Spring LDAP Team

## About

Spring LDAP is a Java library for simplifying LDAP operations, based on the pattern of Spring's JdbcTemplate. The framework relieves the user of common chores, such as looking up and closing contexts, looping through results, encoding/decoding values and filters, and more.

The LdapTemplate class encapsulates all the plumbing work involved in traditional LDAP programming, such as creating a DirContext, looping through NamingEnumerations, handling exceptions and cleaning up resources. This leaves the programmer to handle the important stuff - where to find data (DNs and Filters) and what do do with it (map to and from domain objects, bind, modify, unbind, etc.), in the same way that JdbcTemplate relieves the programmer of all but the actual SQL and how the data maps to the domain model.

In addition to this, Spring LDAP provides transaction support, a pooling library, an Object-Directory Mapping (ODM) framework, an LDIF parsing library with Spring Batch integration, exception translation from NamingExceptions to a mirrored unchecked Exception hierarchy, as well as several utilities for working with filters, LDAP paths and Attributes.

Spring LDAP requires J2SE 1.4 or higher to run, and works with Spring Framework 2.0.x, 2.5.x as well as 3.0.x. J2SE 1.4 or higher is required for building the release binaries from sources. For release 1.2.1, an installation of [JavaCC 4.0](https://javacc.dev.java.net/) is also required when building from source. That is not necessary for release 1.3.x, since it uses Maven2, which handles all such dependencies behind the scenes.

***Where to start***

Download the distribution from the link above. The distribution contains extensive JavaDoc documentation as well as full reference documentation and a sample application illustrating different ways to use Spring LDAP.

***Support***

Support is available on [the Spring LDAP support forum](http://forum.springframework.org/forumdisplay.php?f=40)  
Bug reports, enhancement requests and patches should be submitted to [the JIRA issue tracker](http://jira.springframework.org/browse/LDAP)  

***Sources***

Sources are available in the Spring Framework Subversion repository:  
[http://src.springframework.org/svn/spring-ldap/trunk](http://src.springframework.org/svn/spring-ldap/trunk) (latest sources)  
[http://src.springframework.org/svn/spring-ldap/tags/spring-ldap-1.3.1.RELEASE](http://src.springframework.org/svn/spring-ldap/tags/spring-ldap-1.3.1.RELEASE) (1.3.1 sources)  

***Maven Users***

Artifacts for all production releases will be available from the central Maven repository. Alternatively, you can specify the SpringSource release repository:

<repositories>
    <repository>
        <id>spring-release</id>
        <url>http://maven.springframework.org/release</url>
    </repository>
</repositories>

The dependencies in 1.3.1.RELEASE are:

<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-core</artifactId>
    <version>1.3.1.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-core-tiger</artifactId>
    <version>1.3.1.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-odm</artifactId>
    <version>1.3.1.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-ldif-core</artifactId>
    <version>1.3.1.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-ldif-batch</artifactId>
    <version>1.3.1.RELEASE</version>
</dependency>

Release candidates and milestones are available from the Spring Source milestone repository:

<repositories>
    <repository>
        <id>spring-milestone</id>
        <url>http://maven.springframework.org/milestone</url>
    </repository>
</repositories>

  

Nightly snapshots are available from the Spring Source snapshot repository:

<repositories>
    <repository>
        <id>spring-snapshot</id>
        <url>http://maven.springframework.org/snapshot</url>
    </repository>
</repositories>

  
The dependencies for 1.3.2.CI-SNAPSHOT are:

<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-core</artifactId>
    <version>1.3.2.CI-SNAPSHOT</version>
</dependency>
<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-core-tiger</artifactId>
    <version>1.3.2.CI-SNAPSHOT</version>
</dependency>
<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-odm</artifactId>
    <version>1.3.2.CI-SNAPSHOT</version>
</dependency>
<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-ldif-core</artifactId>
    <version>1.3.2.CI-SNAPSHOT</version>
</dependency>
<dependency>
    <groupId>org.springframework.ldap</groupId>
    <artifactId>spring-ldap-ldif-batch</artifactId>
    <version>1.3.2.CI-SNAPSHOT</version>
</dependency>