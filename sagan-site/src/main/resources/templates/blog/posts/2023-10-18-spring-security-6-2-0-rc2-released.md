---
title: Spring Security 5.8.8, 6.0.8, 6.1.5 and 6.2.0-RC2 released
source: https://spring.io/blog/2023/10/18/spring-security-6-2-0-rc2-released
scraped: 2026-02-23T09:16:02.392Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Steve Riesenberg |  October 18, 2023 | 0 Comments
---

# Spring Security 5.8.8, 6.0.8, 6.1.5 and 6.2.0-RC2 released

_Releases | Steve Riesenberg |  October 18, 2023 | 0 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that the Spring Security `5.8.8`, `6.0.8`, `6.1.5` and `6.2.0-RC2` versions are available now.

Please refer to the [releases page](https://github.com/spring-projects/spring-security/releases) for more detail on what is included in each release. In particular, you can review the release notes for each milestone that will make up the `6.2.0` release ([`6.2.0-M1`](https://github.com/spring-projects/spring-security/releases/tag/6.2.0-M1), [`6.2.0-M2`](https://github.com/spring-projects/spring-security/releases/tag/6.2.0-M2), [`6.2.0-M3`](https://github.com/spring-projects/spring-security/releases/tag/6.2.0-M3), [`6.2.0-RC1`](https://github.com/spring-projects/spring-security/releases/tag/6.2.0-RC1), [`6.2.0-RC2`](https://github.com/spring-projects/spring-security/releases/tag/6.2.0-RC2)) next month.

We encourage you to take the latest release candidate for a spin and provide any feedback you have! Some notable changes available in the 6.2 release candidate include:

-   Add with() method to apply SecurityConfigurerAdapter [#13432](https://github.com/spring-projects/spring-security/pull/13432)
-   Automatically enable .cors() if CorsConfigurationSource bean is present [#5011](https://github.com/spring-projects/spring-security/issues/5011)
-   Simplify configuration of OAuth2 Client component model [#13587](https://github.com/spring-projects/spring-security/pull/13587) ([blog post](https://spring.io/blog/2023/08/22/tackling-the-oauth2-client-component-model-in-spring-security/), [docs](https://docs.spring.io/spring-security/reference/6.2-SNAPSHOT/servlet/oauth2/index.html))
-   Add OIDC Back-channel Logout Support [#7845](https://github.com/spring-projects/spring-security/issues/7845) ([docs](https://docs.spring.io/spring-security/reference/6.2-SNAPSHOT/reactive/oauth2/login/logout.html#configure-provider-initiated-oidc-logout))
-   Test coverage for virtual threads [#12790](https://github.com/spring-projects/spring-security/issues/12790), [#12791](https://github.com/spring-projects/spring-security/issues/12791)
-   Add servlet pattern support to AuthorizeHttpRequests [#13857](https://github.com/spring-projects/spring-security/pull/13857) ([docs](https://docs.spring.io/spring-security/reference/6.2-SNAPSHOT/servlet/authorization/authorize-http-requests.html#match-by-mvc))

To update your project to use the release candidate for Gradle builds, add the following to `build.gradle`:

```groovy
Copyext['spring-security.version'] = '6.2.0-RC2'

repositories {
    ...
    maven { url 'https://repo.spring.io/milestone' }
}
```

Or for Maven builds, add the following to `pom.xml`:

```xml
Copy<properties>
  <spring-security.version>6.2.0-RC2</spring-security.version>
</properties>
<repositories>
  ...
  <repository>
    <id>spring-milestones</id>
    <name>Spring Milestones</name>
    <url>https://repo.spring.io/milestone</url>
    <snapshots>
      <enabled>false</enabled>
    </snapshots>
  </repository>
</repositories>
```

**Note:** Spring Security `6.2.0-RC2` requires Spring Framework `6.1.0-RC1`.

## [](#support)[](#support)Support

As always, we look forward to hearing your [feedback on GitHub](https://github.com/spring-projects/spring-security/issues) and your [questions on StackOverflow](https://stackoverflow.com)!

[Project Page](https://projects.spring.io/spring-security/) | [GitHub](https://github.com/spring-projects/spring-security) | [Issues](https://github.com/spring-projects/spring-security/issues) | [Documentation](https://docs.spring.io/spring-security/reference/)