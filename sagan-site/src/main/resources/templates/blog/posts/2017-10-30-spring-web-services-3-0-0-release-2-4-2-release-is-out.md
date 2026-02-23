---
title: Spring Web Services 3.0.0.RELEASE / 2.4.2.RELEASE is out!
source: https://spring.io/blog/2017/10/30/spring-web-services-3-0-0-release-2-4-2-release-is-out
scraped: 2026-02-23T16:17:21.950Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Greg L. Turnquist |  October 30, 2017 | 0 Comments
---

# Spring Web Services 3.0.0.RELEASE / 2.4.2.RELEASE is out!

_Engineering | Greg L. Turnquist |  October 30, 2017 | 0 Comments_

Greetings Spring community,

[Spring Web Services](http://projects.spring.io/spring-ws/) has released 3.0.0 for general availability as well as released a minor patch, 2.4.2.RELEASE.

As stated in the [previous blog post](https://spring.io/blog/2017/10/17/spring-web-services-2-4-1-release-3-0-0-rc1-released), the 2.x series will be maintained as long as Spring Framework 4.x is supported, yet any new work will be conducted on the master branch.

The links below include related tickets.

[2.4.2 Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10060&version=16502) | [2.4.2 Documentation](http://docs.spring.io/spring-ws/docs/2.4.2.RELEASE/reference/).

[3.0.0.RELEASE Release Notes](https://jira.spring.io/jira/secure/ReleaseNote.jspa?projectId=10060&version=16498) | [3.0.0.RELEASE Documentation](http://docs.spring.io/spring-ws/docs/3.0.0.RELEASE/reference/).

-   3.0.0.RELEASE:
    
    -   Better handling of large attachments to avoid **OutOfMemory** exceptions.
        
    -   Wss4jSecurityInterceptor enhancements including SAML callbacks
        
    -   SpringSecurityPasswordValidationCallbackHandler improvement to avoid NPE from lack of a logged-in user
        
    -   Fixes to SOAP 1.1/SOAP 1.2 message header handling
        
    -   Fix content-type for Axiom SOAP 1.2
        
    -   Upgrade to latest versions of AspectJ
        
    -   Support for up-and-coming Axiom 1.3 (community contributor who wants to ensure Spring WS and Axiom 1.3 work together).
        
-   2.4.2.RELEASE:
    
    -   Backporting of the same SpringSecurityPasswordValidationCallbackHandler fix
        
    -   Accidentally moved wss4j 2.x version too far forward to ensure stable compatibility. If you wish to use the very latest wss4j, you must move to the 3.0 version.
        

I wish to stress that this release was heavily driven by community involvement. In fact, **75% of this latest release** of the 3.0 branch were from community contributors.

[Project Page](http://projects.spring.io/spring-ws/) | [GitHub](https://github.com/spring-projects/spring-ws) | [Issues](https://jira.spring.io/browse/SWS)

The artifacts are staged on maven central and [http://repo.spring.io/](http://repo.spring.io/).

Important

I along with most of my colleagues on the Spring team will be at [Spring One Platform](https://springoneplatform.io). So sign up now!

Cheers!