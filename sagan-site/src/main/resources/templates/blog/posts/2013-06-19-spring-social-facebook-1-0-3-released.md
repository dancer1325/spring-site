---
title: Spring Social Facebook 1.0.3 Released
source: https://spring.io/blog/2013/06/19/spring-social-facebook-1-0-3-released
scraped: 2026-02-24T08:03:44.154Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Craig Walls |  June 19, 2013 | 6 Comments
---

# Spring Social Facebook 1.0.3 Released

_Releases | Craig Walls |  June 19, 2013 | 6 Comments_

Dear Spring Community,

I'm happy to announce the release of Spring Social Facebook 1.0.3.RELEASE.

Spring Social is an extension of the Spring Framework that enables you to connect your Java applications to Software-as-a-Service (SaaS) providers such as Facebook and Twitter.

Spring Social Facebook 1.0.3.RELEASE is made available to address [breaking changes](https://developers.facebook.com/roadmap/#q3_2013) forthcoming in Facebook's Graph API to be applied on July 10, 2013. Specifically, the following breaking changes have been addressed:

-   The removal of the 'count' property in a list of comments.
-   Deprecation of checkins via the /checkins resource. All checkins should be done as posts with a location now.
-   Removal of the 'version' property for groups.
-   The Graph API no longer returns images for photos with sizes larger than the original image size.

In addition, a handful of small improvements were made to Spring Social Facebook's API binding. See the [changelog](http://static.springsource.org/spring-social-facebook/docs/1.0.x/changelog.txt) for details.

To get the software, download the [release distribution](http://www.springsource.org/download/community?project=Spring%2520Social%2520Facebook&version=1.0.3.RELEASE) or change the Spring Social Facebook dependency in your build file to reference 1.0.3.RELEASE.

**Important**: This release includes changes to enable Spring Social Facebook to work after the [July 2013 Breaking Changes](https://developers.facebook.com/roadmap/#q3_2013). In order for this version of Spring Social Facebook to work prior to July 10, 2013, you'll need to configure your application at Facebook to enable the July 2013 Breaking Changes. Within Facebook's application configuration, go to "Settings->Advanced" and click the "Enabled" radio button next to "July 2013 Breaking Changes".

We invite you to discuss this release as well as the continuing work toward Spring Social 1.1.0 in the [Spring Social Forum](http://forum.springsource.org/forumdisplay.php?82-Social) and to report any bugs or improvements in the [Spring Social Facebook issue tracker](https://jira.springsource.org/browse/SOCIALFB).