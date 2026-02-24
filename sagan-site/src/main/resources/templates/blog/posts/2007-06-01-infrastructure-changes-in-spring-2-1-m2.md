---
title: Infrastructure changes in Spring 2.1-m2
source: https://spring.io/blog/2007/06/01/infrastructure-changes-in-spring-2-1-m2
scraped: 2026-02-24T09:29:07.067Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Ben Hale |  June 01, 2007 | 0 Comments
---

# Infrastructure changes in Spring 2.1-m2

_Engineering | Ben Hale |  June 01, 2007 | 0 Comments_

With the release of Spring 2.1-m2, some significant changes have been made to the infrastructure of the Spring distribution. Please see the [announcement](http://www.springframework.org/node/473) and [changelog](http://static.springframework.org/spring/docs/2.1.0-m2/changelog.txt) for the complete list of changes.

## Distribution

The distribution has been trimmed from 26 JARs in 2.1-m1 to 17 JARs in 2.1-m2. Take a look at the [changelog](http://fisheye1.cenqua.com/changelog/springframework?cs=MAIN:jhoeller:20070528093003&csize=17) for the list of files that changed, but from the commit message, here's what's new:

-   spring-context.jar includes JMX support and core remoting support (no spring-jmx and spring-remoting jars anymore)
-   spring-orm.jar combines all ORM support packages (replaces spring-hibernate, spring-ibatis, spring-jdo, spring-jpa, and spring-toplink jars)
-   spring-web.jar contains web-related remoting and ORM classes (for proper use in J2EE EAR deployment structures)
-   renamed spring-dao.jar to spring-tx.jar, also containing the JCA support now
-   renamed spring-support.jar to spring-context-support.jar
-   renamed spring-portlet.jar to spring-webmvc-portlet.jar
-   module jar files contain module-specific "spring.handlers" and "spring.schemas" files now

## Maven Artifacts

I'm also pleased to announce that starting with the 2.1-m2 release, each Spring module will now have source jars in the Maven repository. The 2.1-m2 Maven artifacts are located in a private snapshot repository at this point, but the final release will be in the main Maven repo. If you would like to start using 2.1-m2 in your Maven project add a repository location to your POM that points at https://springframework.svn.sourceforge.net/svnroot/springframework/repos/repo-snapshots/. If you are using any Maven IDE support, please also download the source jars and open any issues with them at our [JIRA](http://opensource.atlassian.com/projects/spring).