---
title: Spring LDAP 1.2 RC1 released
source: https://spring.io/blog/2007/05/13/spring-ldap-1-2-rc1-released
scraped: 2026-02-24T09:29:47.624Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ulrik Sandberg |  May 13, 2007 | 0 Comments
---

# Spring LDAP 1.2 RC1 released

_Releases | Ulrik Sandberg |  May 13, 2007 | 0 Comments_

Dear Spring community,

We are pleased to announce the first release candidate of Spring LDAP 1.2, with a number of features and bug fixes. Only the most important are listed here. For a complete listing, please see the [changelog](http://sourceforge.net/project/shownotes.php?release_id=507937&group_id=73357). The release is available for [download here](http://sourceforge.net/project/showfiles.php?group_id=73357&package_id=202038&release_id=507937).

-   Implemented client-side transaction support for Spring LDAP. See reference documentation for further information ([LDAP-29](http://opensource.atlassian.com/projects/spring/browse/LDAP-29)).
-   Changed the exception hierarchy to be an unchecked mirror of the JNDI NamingException hierarchy ([LDAP-4](http://opensource.atlassian.com/projects/spring/browse/LDAP-4)).
-   Exceptions thrown by Spring LDAP are now always Serializable, regardless of whether the wrapped NamingException is (which is not always the case) ([LDAP-14](http://opensource.atlassian.com/projects/spring/browse/LDAP-14)).
-   Rewrote LdapEncoder.nameDecode() to solve problem with national characters and remove regular expression used in parsing, drastically improving Distinguished Name parsing performance as a bonus ([LDAP-30](http://opensource.atlassian.com/projects/spring/browse/LDAP-30)).
-   Upgraded to Spring 2.0.4 internally. Spring 1.2.x is still supported ([LDAP-35](http://opensource.atlassian.com/projects/spring/browse/LDAP-35), [LDAP-51](http://opensource.atlassian.com/projects/spring/browse/LDAP-51)).

Note that a number of API-breaking changes have been made in this release, mainly package restructuring stuff. Consequently, this is NOT a drop-in replacement for Spring LDAP 1.1.2, though upgrading should not present all that much work. Please see the supplied upgrade guide for details.

The Spring LDAP Team