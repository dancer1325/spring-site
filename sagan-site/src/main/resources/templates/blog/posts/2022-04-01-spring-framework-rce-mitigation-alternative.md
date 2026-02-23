---
title: Spring Framework RCE, Mitigation Alternative
source: https://spring.io/blog/2022/04/01/spring-framework-rce-mitigation-alternative
scraped: 2026-02-23T12:45:17.008Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Rossen Stoyanchev |  April 01, 2022 | 5 Comments
---

# Spring Framework RCE, Mitigation Alternative

_Engineering | Rossen Stoyanchev |  April 01, 2022 | 5 Comments_

Yesterday we [announced](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement) a Spring Framework RCE vulnerability [CVE-2022-22965](https://tanzu.vmware.com/security/cve-2022-22965), listing Apache Tomcat as one of several preconditions. The Apache Tomcat team has since released versions **10.0.20**, **9.0.62**, and **8.5.78** all of which close the attack vector on Tomcat's side. While the vulnerability is not in Tomcat itself, in real world situations, it is important to be able to choose among multiple upgrade paths that in turn provides flexibility and layered protection.

Upgrading to Spring Framework **5.3.18+** or **5.2.20+** continues to be our main recommendation not only because it addresses the root cause and prevents other possible attack vectors, but also because it adds protection for other CVEs addressed since the current version in use.

For older, unsupported versions of the Spring Framework, the Tomcat releases provide an adequate solution for the reported attack vector. Nevertheless, we must stress that this should only be seen as a tactical solution, while the main goal should still be to upgrade to a currently [supported Spring Framework version](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Versions) as soon as possible.

Last but not least, it's worth mentioning that downgrading to Java 8 provides another viable workaround, which may be another tactical solution option.