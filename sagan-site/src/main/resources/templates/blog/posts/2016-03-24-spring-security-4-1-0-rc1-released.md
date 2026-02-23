---
title: Spring Security 4.1.0.RC1 Released
source: https://spring.io/blog/2016/03/24/spring-security-4-1-0-rc1-released
scraped: 2026-02-23T19:22:12.843Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rob Winch |  March 24, 2016 | 2 Comments
---

# Spring Security 4.1.0.RC1 Released

_Releases | Rob Winch |  March 24, 2016 | 2 Comments_

On behalf of the community, I'm pleased to announce the release of Spring Security 4.1.0.RC1. This release resolved over [100 tickets](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/#new). You can find some of the highlights below:

-   [Path Variables in Web Security Expressions](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/#el-access-web-path-variables)
-   [Content Security Policy (CSP)](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/#headers-csp)
-   [HTTP Public Key Pinning (HPKP)](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/#headers-hpkp%22)
-   Added `ForwardAuthenticationFailureHandler` & `ForwardAuthenticationSuccessHandler`
-   SCrypt support with `SCryptPasswordEncoder`
-   [Simplified UserDetailsService Java Configuration](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/#jc-authentication-userdetailsservice)
-   [Simplified AuthenticationProvider Java Configuration](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/#jc-authentication-authenticationprovider)
-   Moved to GitHub issues
-   [Test Meta Annotations](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/#test-method-meta-annotations)
-   [Method Security Meta Annotations](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/#method-security-meta-annotations)

# [](#contributions)Contributions

Without the community we couldn't be the successful project we are today. I'd like to thank everyone that created issues & provided feedback. A special thanks to the following people who provided pull requests for this release:

-   [#199](https://github.com/spring-projects/spring-security/pull/199) - Fix a broken link to a blog posting on the Spring website Thanks [Yi EungJun](https://github.com/npcode)
-   [#230](https://github.com/spring-projects/spring-security/pull/230) - Fix formatting error in documentation Thanks [Martin Macko](https://github.com/LinkedList)
-   [#248](https://github.com/spring-projects/spring-security/pull/248) - SEC-3175: Migrate to assertj Thanks [Billy Korando](https://github.com/wkorando)
-   [#257](https://github.com/spring-projects/spring-security/pull/257) - Use XML Namespace for PreAuth Samples Thanks [Michael Osipov](https://github.com/michael-o)
-   [#258](https://github.com/spring-projects/spring-security/pull/258) - SEC-2746: Fix keys in messages bundle Thanks [Karol Lewandowski](https://github.com/karollewandowski)
-   [#259](https://github.com/spring-projects/spring-security/pull/259) - Rename HeaderWriter loop variable name Thanks [bax1989](https://github.com/bax1989)
-   [#3699](https://github.com/spring-projects/spring-security/pull/3699) - Fix \` in documentation Thanks [drdamour](https://github.com/drdamour)
-   [#3700](https://github.com/spring-projects/spring-security/pull/3700) - Allow override of SwitchUserFilter.ROLE\_PREVIOUS\_ADMINISTRATOR Thanks [Andrei Ivanov](https://github.com/andrei-ivanov)
-   [#3707](https://github.com/spring-projects/spring-security/pull/3707) - HTTP Public Key Pinning Thanks [Tim Ysewyn](https://github.com/TYsewyn)
-   [#3717](https://github.com/spring-projects/spring-security/pull/3717) - Add SCryptPasswordEncoder Thanks [Shazin Sadakath](https://github.com/shazin)
-   [#3724](https://github.com/spring-projects/spring-security/pull/3724) - Fix Javadoc on ProviderManager.authenticate Thanks [hmolsen](https://github.com/hmolsen)
-   [#3729](https://github.com/spring-projects/spring-security/pull/3729) - ForwardAuthenticationFailureHandler & ForwardAuthenticationSuccessHandler Thanks [Shazin Sadakath](https://github.com/shazin)
-   [#3731](https://github.com/spring-projects/spring-security/pull/3731) - Sort ObjectPostProcessors prior to invoking them Thanks [Wallace Wadge](https://github.com/wwadge)
-   [#3734](https://github.com/spring-projects/spring-security/pull/3734) - Upgrade Apache Commons Collections to v3.2.2 Thanks [Justine Tunney](https://github.com/jart)
-   [#3740](https://github.com/spring-projects/spring-security/pull/3740) - Forward after authentication attempt configuration support (#3728) Thanks [Shazin Sadakath](https://github.com/shazin)
-   [#3749](https://github.com/spring-projects/spring-security/pull/3749) - Add RememberMeConfigurer set domain Thanks [Eddú Meléndez Gonzales](https://github.com/eddumelendez)
-   [#3750](https://github.com/spring-projects/spring-security/pull/3750) - Upgrade to Sonarqube plugin Thanks [Eddú Meléndez Gonzales](https://github.com/eddumelendez)

# [](#feedback-please)Feedback Please

If you have feedback on this release, I encourage you to reach out via [StackOverflow](http://stackoverflow.com/questions/tagged/spring-security), [GitHub Issues](https://github.com/spring-projects/spring-security/issues), or via the comments section. You can also ping me [@rob\_winch](https://twitter.com/rob_winch) or Joe (our latest full time Spring Security team member) [@joe\_grandja](https://twitter.com/joe_grandja) on Twitter.

Of course the best feedback comes in the form of [contributions](https://github.com/spring-projects/spring-security/blob/master/CONTRIBUTING.md).

[Project Site](http://projects.spring.io/spring-security/) | [Reference](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/reference/htmlsingle/) | [Guides](http://docs.spring.io/spring-security/site/docs/4.1.0.RC1/guides/html5/) | [Help](http://stackoverflow.com/questions/tagged/spring-security)