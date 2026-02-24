---
title: Spring Security 3.2.0.M2 Released
source: https://spring.io/blog/2013/07/01/spring-security-3-2-0-m2-released
scraped: 2026-02-24T08:03:08.242Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  July 01, 2013 | 0 Comments
---

# Spring Security 3.2.0.M2 Released

_Releases | Rob Winch |  July 01, 2013 | 0 Comments_

The second milestone release toward Spring Security 3.2 is now available from the SpringSource repository at [http://repo.springsource.org](http://repo.springsource.org). See [here](https://github.com/SpringSource/spring-framework/wiki/Downloading-Spring-artifacts#wiki-resolving-spring-artifacts) for a quick tutorial on resolving these artifacts via Maven.

I'd like to extend a special thanks to all those that contributed to this release by submitting bugs, pull requests, and feedback.

The highlights of this release include:

-   Spring Security Java Configuration Support
-   [SEC-2111](https://jira.springsource.org/browse/SEC-2111) resolves an issue with Async support when a timeout occurs and the same Thread handles both the original request and the timeout.
-   Added support for configuring the remember me parameter via the XML namespace. Special thanks to [Oliver Becker](https://github.com/obecker) for submitting a pull request for this feature!
-   [SEC-2002](https://jira.springsource.org/browse/SEC-2002) Added SessionFixationProtectionEvent. Special thanks to [Nick Williams](https://github.com/beamerblvd) for submitting a pull request for this feature!
-   Improvements to the Embedded LDAP container

Stay tuned to the [SpringSource Blog](http://blog.springsource.com) over the coming week for more information about Spring Security Java Configuration.

[Changelog](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10040&version=13796) | [Download](http://www.springsource.com/download/community?project=Spring%20Security&version=3.2.0.M2) | [Reference Manual](http://static.springsource.org/spring-security/site/docs/3.2.x/reference/springsecurity-single.html) | [FAQ](http://static.springsource.org/spring-security/site/faq.html)