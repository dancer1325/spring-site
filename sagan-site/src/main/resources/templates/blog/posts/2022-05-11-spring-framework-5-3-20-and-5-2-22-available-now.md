---
title: Spring Framework 5.3.20 and 5.2.22 available now
source: https://spring.io/blog/2022/05/11/spring-framework-5-3-20-and-5-2-22-available-now
scraped: 2026-02-23T12:42:59.154Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Brian Clozel |  May 11, 2022 | 67 Comments
---

# Spring Framework 5.3.20 and 5.2.22 available now

_Releases | Brian Clozel |  May 11, 2022 | 67 Comments_

On behalf of the team and everyone who has contributed, I am pleased to announce that Spring Framework `5.3.20` and `5.2.22` are available now.

Spring Framework `5.3.20` includes [14 fixes and improvements](https://github.com/spring-projects/spring-framework/releases/tag/v5.3.20). Spring Framework `5.2.22` includes [2 backports](https://github.com/spring-projects/spring-framework/releases/tag/v5.2.22.RELEASE).

In addition, these releases include fixes for 2 vulnerabilities:

-   **[CVE-2022-22970](https://tanzu.vmware.com/security/cve-2022-22970)** *"Spring Framework DoS via Data Binding to MultipartFile or Servlet Part"* Denial of Service (DoS) attack in Spring MVC or Spring WebFlux applications that handle file uploads and rely on data binding to set a `MultipartFile` or `javax.servlet.Part` to a field in a model object. Severity: [Medium](https://www.first.org/cvss/calculator/3.0#CVSS:3.0/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:H)
    
-   **[CVE-2022-22971](https://tanzu.vmware.com/security/cve-2022-22971)** *"Spring Framework DoS with STOMP over WebSocket"*  
    Denial of service (DoS) attack by authenticated users in Spring applications with a STOMP over WebSocket endpoint. Severity: [Medium](https://www.first.org/cvss/calculator/3.0#CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H)
    

These new versions are recommended upgrades for all Spring production scenarios.

[Project Page](https://projects.spring.io/spring-framework/) | [GitHub](https://github.com/spring-projects/spring-framework) | [Issues](https://github.com/spring-projects/spring-framework/issues) | [Documentation](https://docs.spring.io/spring-framework/docs/5.3.20/reference/html/)