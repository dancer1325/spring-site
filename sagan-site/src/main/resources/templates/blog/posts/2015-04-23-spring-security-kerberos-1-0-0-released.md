---
title: Spring Security Kerberos 1.0.0 Released
source: https://spring.io/blog/2015/04/23/spring-security-kerberos-1-0-0-released
scraped: 2026-02-23T21:05:30.576Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Janne Valkealahti |  April 23, 2015 | 0 Comments
---

# Spring Security Kerberos 1.0.0 Released

_Releases | Janne Valkealahti |  April 23, 2015 | 0 Comments_

We are pleased to announce the release of [Spring Security Kerberos](http://projects.spring.io/spring-security-kerberos/) 1.0.0.RELEASE. I would like to start by saying thank you for all community members who helped us by either creating PR's for new features or simply providing feedback.

Here is a guick summary of changes what went through with two release candidates and a GA release:

-   We did a lot of housekeeping to put a whole project up-to-date due to a long overdue from a first milestone.
-   Spring team added *KerberosRestTemplate* while all other new features came from a community.
-   Community contributions are:
    -   *KerberosLdapContextSource* which allows to authenticate against Windows AD with existing Kerberos credentials to get more info about a logged-in user.
    -   Tweaks to Kerberos negotiation which allows better interoperability with WinRM.
    -   Changes how *SpnegoEntryPoint* is used which allows to fallback to other authentication methods if Kerberos negotiation fails.
-   Samples has been re-written from scratch and are now Bootified to give better user exprerience.

Now that we completed this long journey and got first GA release out it's time to think where we are going from here. New features are driven by demand from a community so keep those PR's coming(we already have something lined up which didn't get into this release). Some of the new planned features will be done on a lower level where Kerberos is traditionally used(Web, Spnego, AD) due to demand of adding better security features to *Spring for Apache Hadoop* for example. Hadoop is already a heavy user of Kerberos so it makes sense to support same concepts in our own Spring libraries.

We'd love to hear back what people think by participating in a project or simply creating issues or feature requests at [GitHub](https://github.com/spring-projects/spring-security-kerberos).