---
title: Spring Framework maintenance roadmap in 2020 (including 4.3 EOL)
source: https://spring.io/blog/2019/12/03/spring-framework-maintenance-roadmap-in-2020-including-4-3-eol
scraped: 2026-02-23T14:14:50.478Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Juergen Hoeller |  December 03, 2019 | 4 Comments
---

# Spring Framework maintenance roadmap in 2020 (including 4.3 EOL)

_Releases | Juergen Hoeller |  December 03, 2019 | 4 Comments_

Dear Spring community,

With [Spring Framework 5.2.2 and 5.1.12 being available now](https://spring.io/blog/2019/12/03/spring-framework-5-2-2-and-5-1-12-available-now), let me take the opportunity to provide an update on the maintenance roadmap in 2020.

*Most importantly, Spring Framework 4.3.x and therefore Spring Framework 4 overall will reach its end-of-life next year: Our EOL cut-off is December 31st, 2020, with no further support on 4.3.x beyond that point. At the same time, we are also phasing out 5.0.x and 5.1.x for good.*

As for planned releases, first up is a full round in mid January: with 5.2.3 and 5.1.13 accompanied by 5.0.16 and 4.3.26. The latter are the last maintenance releases in the 5.0.x and 4.3.x lines. We may do critical patches in case of vulnerabilities but otherwise no further releases are planned in those lines until the final cut-off at the end of 2020.

The 5.1.x line will receive general maintenance throughout 2020 but just with infrequent releases (~ once a quarter). The primary active branch is 5.2.x now, with frequent releases planned (~ once a month), supporting not only the current Spring Boot 2.2 generation but also the upcoming Spring Boot 2.3 (April 2020) for its entire lifetime.

Last but not least, the next Spring Framework feature release will be 5.3, with GA planned for October 2020, aligned with Spring Boot 2.4. This is expected to be the last 5.x feature branch, enjoying an extended support life. We intend to wrap up all 5.x themes for 5.3, including our runtime tuning efforts (startup performance, memory consumption).

*TL;DR: By the end of 2020, the only active Spring Framework branches are going to be 5.2.x and the then-new 5.3.x line (which is expected to receive long-term support, effectively superseding 4.3.x from that perspective). Please upgrade to 5.2+ at your earliest convenience.*

Cheers, Juergen

P.S.: See the [versions page](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Versions#supported-versions) for support timeframes and the [milestones page](https://github.com/spring-projects/spring-framework/milestones) for release dates.