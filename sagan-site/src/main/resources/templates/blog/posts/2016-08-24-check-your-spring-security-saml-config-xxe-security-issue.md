---
title: Check your Spring Security SAML config - XXE security issue
source: https://spring.io/blog/2016/08/24/check-your-spring-security-saml-config-xxe-security-issue
scraped: 2026-02-23T19:07:09.350Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rob Winch |  August 24, 2016 | 1 Comment
---

# Check your Spring Security SAML config - XXE security issue

_Engineering | Rob Winch |  August 24, 2016 | 1 Comment_

It was brought to our attention that the [spring-security-saml sample](https://github.com/spring-projects/spring-security-saml/tree/10fdc14bbc4bb9c2516cf6e8f71000b2243016c7/sample) application contained an [XML External Entity (XXE) vulnerability](https://www.owasp.org/index.php/XML_External_Entity_\(XXE\)_Processing). This meant that a malicious user could view any file that the Spring Application’s process had access to.

The issue was a direct result of [OpenSAML Java ParserPool and Decrypter Vulnerable To XML Attacks](https://shibboleth.net/community/advisories/secadv_20131213.txt). The default behavior of the `ParserPool` implementations is fixed in OpenSAML 2.6.1+ (which Spring Security SAML uses). However, the vulnerability is still possible if users construct their own `ParserPool` without the proper settings.

Note

We did not consider this a [CVE](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures) because the exploit was only found in the sample application which is not considered production code. However, we expect that our users may have copied this code to create their own applications. For this reason, we wanted to be transparent and communicate the issue and the fix.

## [](#the-fix)[](#the-fix)The Fix

The sample application has been fixed in [925c892](https://github.com/spring-projects/spring-security-saml/commit/925c8925fa0d0645d7b177b6e65cfb920fc6782f) by removing the customizations to the `ParserPool`.

Users should ensure that any applications using OpenSAML have been fixed according to the **Recommendations** section within the [OpenSAML Security Advisory](https://shibboleth.net/community/advisories/secadv_20131213.txt). Commit [925c892](https://github.com/spring-projects/spring-security-saml/commit/925c8925fa0d0645d7b177b6e65cfb920fc6782f) can be used as a model of one way of conforming to the **Recommendations** section.

## [](#additional-information)[](#additional-information)Additional Information

-   [OWASP XXE Prevention Cheat Sheet](https://www.owasp.org/index.php/XML_External_Entity_\(XXE\)_Prevention_Cheat_Sheet)
    
-   [OpenSAML Security Advisory](https://shibboleth.net/community/advisories/secadv_20131213.txt)
    

## [](#credit)[](#credit)Credit

This issue was responsibly disclosed by Max Justicz and Nick Freeman of Bishop Fox ([https://www.bishopfox.com](https://www.bishopfox.com)).