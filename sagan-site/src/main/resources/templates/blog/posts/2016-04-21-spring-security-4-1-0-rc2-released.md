---
title: Spring Security 4.1.0.RC2 Released
source: https://spring.io/blog/2016/04/21/spring-security-4-1-0-rc2-released
scraped: 2026-02-23T19:18:40.750Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  April 21, 2016 | 0 Comments
---

# Spring Security 4.1.0.RC2 Released

_Releases | Rob Winch |  April 21, 2016 | 0 Comments_

On behalf of the community, I'm pleased to announce the release of Spring Security 4.1.0.RC2. This release resolved over [60 tickets](https://github.com/spring-projects/spring-security/milestones/4.1.0%20RC2).

# [](#whats-new-in-41)What's New in 4.1

You can find a good summary of [What's New in Spring Security 4.1](http://docs.spring.io/spring-security/site/docs/4.1.0.RC2/reference/htmlsingle/#new) in the reference documentation.

# [](#contributions)Contributions

Without the community we couldn't be the successful project we are today. I'd like to thank everyone that created issues & provided feedback. A special thanks to the following people who provided pull requests for this release:

-   [#51](https://github.com/spring-projects/spring-security/pull/51) - SEC-1932 Add Pbkdf2PasswordEncoder Thanks [Rob Worsnop](https://github.com/rworsnop)
-   [#180](https://github.com/spring-projects/spring-security/pull/180) - Allow setting alwaysRemember from RememberMeConfigurer Thanks [Leon Radley](https://github.com/leon)
-   [#183](https://github.com/spring-projects/spring-security/pull/183) - Remove duplicate test. Thanks [Johnny Lim](https://github.com/izeye)
-   [#193](https://github.com/spring-projects/spring-security/pull/193) - Fix corrupted character and add formatting per the duplicated text block Thanks [Art O Cathain](https://github.com/artbristol)
-   [#196](https://github.com/spring-projects/spring-security/pull/196) - SEC-2978: fix typos in documentation Thanks [Soeun Park](https://github.com/skyhills13)
-   [#197](https://github.com/spring-projects/spring-security/pull/197) - Update HttpSecurity.java logout() sample code Thanks [Jeffrey Walraven](https://github.com/JTWalraven)
-   [#228](https://github.com/spring-projects/spring-security/pull/228) - Fix typos Thanks [Johnny Lim](https://github.com/izeye)
-   [#3764](https://github.com/spring-projects/spring-security/pull/3764) - Authentication Success and Failure Handlers in AbstractPreAuthenticatedProcessingFilter Thanks [Shazin Sadakath](https://github.com/shazin)
-   [#3777](https://github.com/spring-projects/spring-security/pull/3777) - Content Negotiating Logout Success Handler #3282 Thanks [Shazin Sadakath](https://github.com/shazin)
-   [#3779](https://github.com/spring-projects/spring-security/pull/3779) - BouncyCastle implementation of "AES/CBC/PKCS5Padding" and "AES/GCM/NoPadding" Thanks [Will Tran](https://github.com/william-tran)
-   [#3782](https://github.com/spring-projects/spring-security/pull/3782) - SpEL variables can be referenced in the expression using the syntax #… Thanks [Kamill Sokol](https://github.com/ksokol)
-   [#3785](https://github.com/spring-projects/spring-security/pull/3785) - Fix typo in xsd Thanks [Quinten De Swaef](https://github.com/Qkyrie)
-   [#3793](https://github.com/spring-projects/spring-security/pull/3793) - SecurityMockMvcResultMatchers.withAuthorities(Collection<? extends GrantedAuthority>) Thanks [Eddú Meléndez Gonzales](https://github.com/eddumelendez)
-   [#3800](https://github.com/spring-projects/spring-security/pull/3800) - Add GitHub Pull Request template Thanks [Vedran Pavić](https://github.com/vpavic)
-   [#3803](https://github.com/spring-projects/spring-security/pull/3803) - Fix typo in setMessageExpessionHandler Thanks [Nicolai Ehemann](https://github.com/McNetic)
-   [#3807](https://github.com/spring-projects/spring-security/pull/3807) - Update ExpressionUrlAuthorizationConfigurer.java Thanks [Matthias Merdes](https://github.com/mmerdes)
-   [#3811](https://github.com/spring-projects/spring-security/pull/3811) - Update TestNG Thanks [Marten Deinum](https://github.com/mdeinum)
-   [#3813](https://github.com/spring-projects/spring-security/pull/3813) - HeaderWriterFilter: Fix Javadoc. Thanks [Simon Olofsson](https://github.com/simono)
-   [#3816](https://github.com/spring-projects/spring-security/pull/3816) - Skip tests when AesBytesEncryptor can't be created in CBC or GCM mode. Thanks [Will Tran](https://github.com/william-tran)
-   [#3817](https://github.com/spring-projects/spring-security/pull/3817) - Refactor test assumptions about JCE to common class. Thanks [Will Tran](https://github.com/william-tran)
-   [#3819](https://github.com/spring-projects/spring-security/pull/3819) - Fix HpkpHeaderWriter Javadoc formatting Thanks [Andrew NS Yeow](https://github.com/ansyeow)
-   [#3822](https://github.com/spring-projects/spring-security/pull/3822) - Only use methods present in Bouncy Castle 1.47. Thanks [Will Tran](https://github.com/william-tran)
-   [#3826](https://github.com/spring-projects/spring-security/pull/3826) - Remove duplicate words Thanks [Johnny Lim](https://github.com/izeye)

# [](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-security), [GitHub Issues](https://github.com/spring-projects/spring-security/issues), or via the comments section. You can also ping me [@rob\_winch](https://twitter.com/rob_winch) or Joe (our latest full time Spring Security team member) [@joe\_grandja](https://twitter.com/joe_grandja) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-security/blob/master/CONTRIBUTING.md).

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/4.1.0.RC2/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/4.1.0.RC2/guides/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)