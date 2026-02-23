---
title: Spring Security OAuth2 - Client Authentication Issue
source: https://spring.io/blog/2016/08/31/spring-security-oauth2-client-authentication-issue
scraped: 2026-02-23T19:06:20.610Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Joe Grandja |  August 31, 2016 | 1 Comment
---

# Spring Security OAuth2 - Client Authentication Issue

_Engineering | Joe Grandja |  August 31, 2016 | 1 Comment_

Issue [#808](https://github.com/spring-projects/spring-security-oauth/issues/808) was recently reported that allowed a user to authenticate as a client and obtain an access token via the client\_credentials or password grant flow.

This unique scenario occurs when a client and user have the same identifier (clientId and username). The user’s credentials are used for client authentication during a client\_credentials or password grant flow and is successful in obtaining an access token with the authorities of the client.

## [](#the-fix)[](#the-fix)The Fix

This bug has been fixed in [1ed986a](https://github.com/spring-projects/spring-security-oauth/commit/1ed986a8486ab4e84295ee5d0260c790c573e7d7) and released in 2.0.11.RELEASE.

If you’re using Java-based configuration, please update to 2.0.11.RELEASE.

However, if you’re using XML-based configuration, please take the following actions:

-   Update to 2.0.11.RELEASE
    
-   Look at this [JUnit test](https://github.com/spring-projects/spring-security-oauth/blob/master/spring-security-oauth2/src/test/java/org/springframework/security/oauth2/config/xml/AuthorizationServerClientCredentialsPasswordValidXmlTests.java) and it’s associated [XML configuration](https://github.com/spring-projects/spring-security-oauth/blob/master/spring-security-oauth2/src/test/resources/org/springframework/security/oauth2/config/xml/authorization-server-client-credentials-password-valid.xml) to ensure the `AuthenticationManager` for **client authentication** and the `AuthenticationManager` for **user authentication** is setup the same in your configuration.
    
-   As a precautionary step, make sure your XML configuration is **NOT** setup the same as in this [JUnit test](https://github.com/spring-projects/spring-security-oauth/blob/master/spring-security-oauth2/src/test/java/org/springframework/security/oauth2/config/xml/AuthorizationServerClientCredentialsPasswordInvalidXmlTests.java) and associated [XML configuration](https://github.com/spring-projects/spring-security-oauth/blob/master/spring-security-oauth2/src/test/resources/org/springframework/security/oauth2/config/xml/authorization-server-client-credentials-password-invalid.xml) as it demonstrates the original issue.
    

## [](#credit)[](#credit)Credit

Thank you for reporting this issue [Michael Pridemore](https://github.com/socket70) and [Ben Kiefer](https://github.com/benkiefer).