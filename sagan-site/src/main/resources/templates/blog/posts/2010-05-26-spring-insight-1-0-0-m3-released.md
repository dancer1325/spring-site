---
title: Spring Insight 1.0.0.M3 Released
source: https://spring.io/blog/2010/05/26/spring-insight-1-0-0-m3-released
scraped: 2026-02-24T08:57:27.057Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Jon Travis |  May 26, 2010 | 0 Comments
---

# Spring Insight 1.0.0.M3 Released

_Engineering | Jon Travis |  May 26, 2010 | 0 Comments_

The Spring Insight team is proud to announce the release of [Spring Insight 1.0.0.M3](http://springsource.org/insight "Spring Insight 1.0.0.M3").  This release contains a ton of new enhancements to give you **more productivity** and get your application to production even faster.  Spring Insight is available as part of [tc Server Developer Edition](http://www.springsource.com/products/tcserver/devedition) and [SpringSource Tool Suite](http://www.springsource.com/products/sts) but you can snag the new developer release at [](http://springsource.org/insight)[http://springsource.org/insight](http://springsource.org/insight).  Setup time will take you the usual 10 seconds.

[![Spring Insight 1.0.0.M3 Screencast](http://springsource.com/files/uploads/all/images/product/tcServerDevEdScreencastIcon.png "Spring Insight 1.0.0.M3 Screencast")](http://s3.springsource.com/MRKT/spring-metrics/Spring_Insight-Milestone_3-Screencast.mp4)

### Speed Tracer

The most-publicized new feature is our integration with Google [Speed Tracer](http://code.google.com/webtoolkit/speedtracer/ "Google Speed Tracer"), which was announced at last week's [Google IO conference](http://www.youtube.com/watch?v=a46hJYtsP-8&feature=player_embedded).  This innovative combination gives developers a full view into all the work performed in a web request --  from CSS styling and view rendering to JDBC queries and JSP render times.  It was a real thrill to work with Google's engineers to come up with some cutting-edge use of this technology.  You'll love this feature!  It's a seamless integration that's trivial to work with and gives you a great deal of visibility you've never had before.

### Simpler UI

We've also added a lot of information to the application: throughput and error rate metrics, health zones, deeper visibility into Spring controllers, deeper JDBC support, application health and more.  This new information should not be overwhelming, however, because we have also invested a lot of time in **simplicity**, making our UI obvious and easy to navigate.

### Development Kit

Finally, we published our [Insight Development Kit](http://www.springsource.org/insight/develop) (IDK).  We've heard from many users that they want the ability to customize their application in Insight or want to add additional metrics.  Insight now provides this capability with its @InsightOperation and @InsightEndPoint annotations as well as the IDK and tutorials for creating deeper plugins.  The IDK includes the source for all the plugins that come with Insight (Apache 2.0 licensed) as well as the IDK APIs -- great examples and instructions for writing your own application.

The Spring Insight team is cranking on the next release, our train is cruising down the track, and we can't wait to hear your feedback and suggestions.  Go grab the release off [](http://springsource.org/insight)[http://springsource.org/insight](http://springsource.org/insight) and leave us a comment in the [community forums](http://forum.springsource.org/forumdisplay.php?f=71)!