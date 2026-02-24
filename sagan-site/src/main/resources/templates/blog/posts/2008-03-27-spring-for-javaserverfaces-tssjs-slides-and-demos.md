---
title: Spring For JavaServerFaces - TSSJS Slides and Demos
source: https://spring.io/blog/2008/03/27/spring-for-javaserverfaces-tssjs-slides-and-demos
scraped: 2026-02-24T09:19:54.022Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Keith Donald |  March 27, 2008 | 0 Comments
---

# Spring For JavaServerFaces - TSSJS Slides and Demos

_Engineering | Keith Donald |  March 27, 2008 | 0 Comments_

Today I am delivering a presentation entitled [Spring for Java Server Faces](http://javasymposium.techtarget.com/lasvegas/frameworks.html#KDonaldSpring) at TSSJS in Las Vegas. The presentation looks at how JSF and Spring fit together, and walks the audience through approaches to integrating these two technologies.

The [slides](http://blog.springsource.com/main/wp-content/uploads/2008/03/TSSJS2008-Donald-SpringForJavaServerFaces1.pdf) are available for your viewing pleasure, and for you to use as you see fit.

In the presentation, I outline two approaches to integrating JSF and Spring. The first approach is what I call "JSF-centric", which is the integration approach most folks with a traditional JSF background employ today. The second approach is what I call "Spring-centric", which is a new, groundbreaking approach to JSF integration driven by the work done in the Web Flow 2 distribution.

There are two demos in this presentation, one showing an example of a "JSF-centric" Spring web application, and another showing a "Spring-centric" application that uses JSF as the UI component model. There is also a comparison of the two demos at the end of the presentation.

To review and run the demos mentioned in the slides:

1.  Use SVN to checkout [https://springframework.svn.sourceforge.net/svnroot/springframework/spring-webflow/trunk](https://springframework.svn.sourceforge.net/svnroot/springframework/spring-webflow/trunk/).
2.  Access the build-spring-webflow directory and run ant. You'll need ant 1.7 to build.
3.  After the build completes, fire up Eclipse and import the spring-webflow-samples projects into your workspace. The booking-jsf project shows the "JSF-centric" approach. The swf-booking-faces project shows the "Spring-centric" approach.

Enjoy!