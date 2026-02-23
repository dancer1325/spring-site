---
title: Spring Framework 5.2.3, 5.1.13, 5.0.16, and 4.3.26 releases
source: https://spring.io/blog/2020/01/16/spring-framework-5-2-3-5-1-13-5-0-16-and-4-3-26-releases
scraped: 2026-02-23T14:14:41.711Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Rossen Stoyanchev |  January 16, 2020 | 4 Comments
---

# Spring Framework 5.2.3, 5.1.13, 5.0.16, and 4.3.26 releases

_Releases | Rossen Stoyanchev |  January 16, 2020 | 4 Comments_

After unfavorable weather on Maven central caused service disruption much of today, skies have finally cleared up, and I am pleased to announce a full round of Spring Framework releases: the [5.2.3 release](https://github.com/spring-projects/spring-framework/releases/tag/v5.2.3.RELEASE) on the current production branch, along with maintenance branch releases [5.1.13](https://github.com/spring-projects/spring-framework/releases/tag/v5.1.13.RELEASE), [5.0.16](https://github.com/spring-projects/spring-framework/releases/tag/v5.0.16.RELEASE), and [4.3.26](https://github.com/spring-projects/spring-framework/releases/tag/v4.3.26.RELEASE) with selected backports.

Please note that the 5.0.x and 4.3.x lines have reached the end of active maintenance, with just one final wrap-up release expected on each branch before the official EOL date at the end of this year. The 5.1.x line remains active but will be updated less frequently (~ once a quarter) than the 5.2.x line (~ every six weeks) throughout 2020. For more details, please check the [2020 Roadmap](https://spring.io/blog/2019/12/03/spring-framework-maintenance-roadmap-in-2020-including-4-3-eol) blog post. TL;DR: Please upgrade to 5.2+ at your earliest convenience!

### [](#important-security-advisory)Important Security Advisory:

Spring Framework 5.2.3, 5.1.13, and 5.0.16 include fixes for [CVE-2020-5398](https://pivotal.io/security/cve-2020-5398) while Spring Framework 5.2.3 also includes a fix for [CVE-2020-5397](https://pivotal.io/security/cve-2020-5397). The corresponding Spring Boot [2.2.3](https://spring.io/blog/2020/01/16/spring-boot-2-2-3-released) and [2.1.12](https://spring.io/blog/2020/01/16/spring-boot-2-1-12-released) releases are now also available.