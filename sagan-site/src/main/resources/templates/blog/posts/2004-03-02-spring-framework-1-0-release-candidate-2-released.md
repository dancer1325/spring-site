---
title: Spring Framework 1.0 Release Candidate 2 Released
source: https://spring.io/blog/2004/03/02/spring-framework-1-0-release-candidate-2-released
scraped: 2026-02-24T09:41:20.126Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Thomas Risberg |  March 02, 2004 | 1 Comment
---

# Spring Framework 1.0 Release Candidate 2 Released

_Releases | Thomas Risberg |  March 02, 2004 | 1 Comment_

We are pleased to announce that Spring Framework 1.0 Release Candidate 2 has just been released. RC2 covers all features targeted for 1.0 final, which should be released soon.  

  
Changes since Release Candidate 1 include:

-   scheduling support via Quartz and Timer
-   support for the SqlMapClient API of iBATIS SQL Maps 2
-   JdbcTemplate convenience methods, taking prepared statement arguments as Object array
-   support for custom RMI socket factories and additional RMI invocation parameters
-   PreferencesPlaceholderConfigurer, resolving placeholders via J2SE 1.4 Preferences
-   optional "type" attribute for "constructor-arg" tag in XML bean definitions
-   revised BeanFactoryLocator implementations
-   simplified AOP Advisor interface hierarchy
-   revised DataFieldMaxValueIncrementer implementation hierarchy
-   extended mapping configuration options in LocalSessionFactoryBean
-   metadata support uses latest Commons Attributes snapshot
-   VelocityView supports Velocity Tools 1.1

A full list of changes is included in the the [changelog](/docs/changelog-rc2.txt).  
  
The release can be downloaded [here](http://sourceforge.net/project/showfiles.php?group_id=73357)  
  
On a side note: after the 1.0 release, we will be focussing on new features, some of which can be found in our [JIRA](../../../../undefined/http://drupal.springframework.org). Please have a look, but note that list is still subject to change. \[2004-03-01\]