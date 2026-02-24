---
title: Acegi Security 1.0.0 is released
source: https://spring.io/blog/2006/05/30/acegi-security-1-0-0-is-released
scraped: 2026-02-24T09:37:07.186Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Ben Alex |  May 30, 2006 | 0 Comments
---

# Acegi Security 1.0.0 is released

_Releases | Ben Alex |  May 30, 2006 | 0 Comments_

After more than two and a half years of development, I am delighted to announce that Acegi Security 1.0.0 is now officially released.  

[Download](http://sourceforge.net/project/showfiles.php?group_id=104215&package_id=112001&release_id=420961) | [Documentation](http://acegisecurity.org/docbook/acegi.html) | [Changelog](http://opensource.atlassian.com/projects/spring/secure/ReleaseNote.jspa?projectId=10040&styleName=Html&version=10360) 

In addition to more than 80 improvements and fixes since 1.0.0 RC2, this new release includes several changes to help new users. This entails a significant restructure and expansion of the reference guide (now at more than 90 pages) and a new "bare bones" tutorial sample application.

Furthermore, many of the frequently-identified problems experienced by new users have been addressed, such as:

-   custom 403 messages (as opposed to using the Servlet Container's error handler)
-   detecting corrupt property input following the reformatting of XML files
-   a new logout filter. 

We've also refactored our LDAP services, made the SecurityContextHolder a pluggable strategy (especially useful for rich clients who wish to avoid ThreadLocal), and improved CAS support.

Please visit [here](http://opensource.atlassian.com/projects/spring/secure/ReleaseNote.jspa?projectId=10040&styleName=Html&version=10360) for a detailed changelog. As always, detailed upgrade instructions are included in the release ZIP file.

The project's web site at [http://acegisecurity.org](http://acegisecurity.org) provides additional information on Acegi Security's features, access to online documentation, and links to download the latest release. I will also be providing a presentation on Acegi Security at SpringOne next month, so I hope to see you there.