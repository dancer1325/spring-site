---
title: Spring Data REST 1.0.0.RC2 Released
source: https://spring.io/blog/2012/07/31/spring-data-rest-1-0-0-rc2-released
scraped: 2026-02-24T08:18:58.868Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Jon Brisbin |  July 31, 2012 | 0 Comments
---

# Spring Data REST 1.0.0.RC2 Released

_Releases | Jon Brisbin |  July 31, 2012 | 0 Comments_

I'm pleased to announce the release of Spring Data REST 1.0.0.RC2! Beyond a number of bug fixes, this release adds support for JSONPE (JSONP with error handling), the ability to turn off CRUD methods with the @RestResource annotation, and is now built and tested against the Servlet 3.0 API (though it is not yet 3.0 specific, so will still work fine in Servlet 2.5 containers).

New functionality includes:

-   JSONPE - Simply add a URL parameter to have the results wrapped in a call to the Javascript function you specify. Also handles server errors by translating an error to HTTP 200 and passing the original status code as the first parameter of your error handler.
-   Turn off CRUD methods - The exporter now respects @RestResource annotations on CRUD methods. Just override the method from `CrudRepository` you want to turn off and annotate it with `@RestResource(exported = false)`.
-   Better integration with existing Spring MVC applications - Simplified the internal Spring MVC configuration to make it even easier to integrate with your existing Spring MVC application. Simply including the RepositoryRestMvcConfiguration bean into your own configuration should Just Work.

New or updated documentation includes:

-   [JSONP Support](https://github.com/SpringSource/spring-data-rest/wiki/JSONP-Support-in-Spring-Data-REST)
-   [Configuring the REST URL path](https://github.com/SpringSource/spring-data-rest/wiki/Configuring-the-REST-URL-path)
-   [Adding Spring Data REST to an existing Spring MVC Application](https://github.com/SpringSource/spring-data-rest/wiki/Adding-Spring-Data-REST-to-an-existing-Spring-MVC-Application)

[Starter Web Application](https://github.com/springsource/spring-data-rest-webmvc) | [Wiki](https://github.com/SpringSource/spring-data-rest/wiki/) | [Release Notes](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10901&version=13203)

To learn more about the project, visit the Spring Data REST [homepage](http://www.springsource.org/spring-data/rest), or visit [the Github repository](https://github.com/SpringSource/spring-data-rest) to download the source.