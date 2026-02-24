---
title: Spring Integration 2.2.4 and 2.1.6 Releases Available
source: https://spring.io/blog/2013/06/11/spring-integration-2-2-4-and-2-1-6-releases-available
scraped: 2026-02-24T08:03:57.508Z
description: Level up your Java code and explore what Spring can do for you.
meta: Releases | Gary Russell |  June 11, 2013 | 0 Comments
---

# Spring Integration 2.2.4 and 2.1.6 Releases Available

_Releases | Gary Russell |  June 11, 2013 | 0 Comments_

We are pleased to announce the availability of Spring Integration 2.2.4 and 2.1.6 maintenance releases.

Spring Integration's Twitter module uses Spring Social Twitter, which has been updated to version 1.0.5 in anticipation of the Twitter v1.0 API retirement. The Spring Social Twitter 1.0.4.RELEASE \[1\] and 1.0.5.RELEASE \[2\] announcements provide more information about the recent updates to that project. For anyone using Twitter search adapters, the underlying search API in v1.1 requires authorization, so you will need to update the configuration for any TwitterTemplate (if not already configured) with authentication details. The Spring Integration Twitter sample application \[3\] has been updated to reflect this change.

While the Twitter change is the main driver for these Spring Integration releases, they do also resolve a small number of important issues that may be of interest to other users.

Please see the release notes for 2.2.4 \[4\] and the release notes for 2.1.6 \[5\] for more information.

While we have provided this important update to the 2.1.x stream in 2.1.6, all users are encouraged to upgrade to 2.2.4.

The project page \[6\] has links to documentation and downloads and the artifacts are available in the SpringSource maven repository and maven central.

1.  [http://www.springsource.org/spring-social/news/spring-social-twitter-1.0.4-released](http://www.springsource.org/spring-social/news/spring-social-twitter-1.0.4-released)
2.  [http://www.springsource.org/spring-social/news/spring-social-twitter-1.0.5-released](http://www.springsource.org/spring-social/news/spring-social-twitter-1.0.5-released)
3.  [https://github.com/SpringSource/spring-integration-samples/tree/master/basic/twitter](https://github.com/SpringSource/spring-integration-samples/tree/master/basic/twitter)
4.  [https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10121&version=14100](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10121&version=14100)
5.  [https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10121&version=14035](https://jira.springsource.org/secure/ReleaseNote.jspa?projectId=10121&version=14035)
6.  [http://www.springsource.org/spring-integration](http://www.springsource.org/spring-integration)