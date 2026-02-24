---
title: Spring Mobile 1.0.0.RC2 Released
source: https://spring.io/blog/2012/04/26/spring-mobile-1-0-0-rc2-released
scraped: 2026-02-24T08:23:31.681Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Roy Clarkson |  April 26, 2012 | 0 Comments
---

# Spring Mobile 1.0.0.RC2 Released

_Releases | Roy Clarkson |  April 26, 2012 | 0 Comments_

Dear Spring Community,

We are pleased to announce that the second release candidate of the [Spring Mobile](http://www.springsource.org/spring-mobile) project is now available!

Spring Mobile provides extensions to Spring MVC that aid in the development of cross-platform mobile web applications.

Here is an overview of the new features and functionality:

-   Tablets are no longer recognized as mobile devices
-   Added support for resolving tablet devices in LiteDeviceResolver.
-   Added a new DeviceType enumeration consisting of NORMAL, MOBILE, and TABLET values.
-   The Device interface now includes isNormal(), and isTablet() methods in addition to the existing isMobile() method.
-   WebOS devices are now recognized as a mobile device in LiteDeviceResolver
-   Improved the SiteSwitcherHandlerInterceptor by adding an URL path alternative to "dotMobi" and "mDot" for site switching. The switcher is now capable of switching between "normal" and "mobile" URL paths within the same domain. For example an about page for a normal site may be "http://www.domain.com/about", and the mobile site may be "http://www.domain.com/m/about"
-   You can now configure a list of "normal" User-Agent keywords in the LiteDeviceResolver. It may happen that a device is falsely identified as mobile. This list of keywords takes precedence over the mobile and tablet keywords, effectively overriding the default behavior.

See the [changelog](http://static.springsource.org/spring-mobile/docs/1.0.0.RC2/changelog.txt) and [reference manual](http://static.springsource.org/spring-mobile/docs/1.0.0.RC2/reference/html/) for more information.

To retrieve the software, [download](http://www.springsource.com/download/community?project=Spring%20Mobile) the release distribution, or add the [maven artifacts](http://static.springsource.org/spring-mobile/docs/1.0.x/reference/html/device.html#spring-mobile-device-howtoget) to your project. Sample apps are available at [github.com/SpringSource/spring-mobile-samples](https://github.com/SpringSource/spring-mobile-samples)

We want to thank Scott Rossillo for his contributions to this release, and we look forward to working with him and the rest of the Spring community on future releases. If you are building a mobile web app, we encourage you try out 1.0.0.RC2 and [collaborate](http://forum.springsource.org/forumdisplay.php?f=85) with us on the next iteration of the project.