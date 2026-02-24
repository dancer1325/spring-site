---
title: SpringSource dm Server 1.0.0 reaches GA
source: https://spring.io/blog/2008/09/30/springsource-dm-server-1-0-0-reaches-ga
scraped: 2026-02-24T09:14:33.371Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Peter Cooper-Ellis |  September 30, 2008 | 0 Comments
---

# SpringSource dm Server 1.0.0 reaches GA

_Engineering | Peter Cooper-Ellis |  September 30, 2008 | 0 Comments_

You may have noticed that SpringSource [announced](http://www.springsource.com/node/597) the general availability of the [SpringSource dm Server™](http://www.springsource.com/products/suite/dmserver) today. The dm Server is part of the [SpringSource Application Platform](http://www.springsource.com/products/suite/applicationplatform). Since this is the first time out for the dm Server, I want to make a couple of short comments about the product.

We believe that the dm Server overall will change the way enterprise Java software is developed and deployed. In particular, the dm Server is designed from the ground up, to be lightweight (the dm Kernel has a footprint of about 3 megabytes), flexible, and fast. It is also designed to facilitate modular development and simplify dependency management. On the operational side, the dm Server is designed to provision, deploy, start and stop services at runtime. As services are increasingly deployed in grid, virtualized, and cloud environments, the ability to initially provision the kernel only and load additional services on the fly in response to service requests will become a significant differentiator.

Congratulations to [Rob Harrop](http://blog.springsource.com/author/robh/) and the engineering team for getting this very substantial release out. The team had to solve some [tricky issues](http://blog.springsource.com/2008/05/02/running-spring-applications-on-osgi-with-the-springsource-application-platform/) to make deployment of standard WAR files on the dm Server seamless. In particular, I commend the team for sticking with their vision for creating a superior platform for deploying Spring applications. The product provides true application and infrastructure modularity unavailable in other product stacks. It provides developers with tangible benefits in dealing with some of the complexities inherent in enterprise Java development such as dealing with shared libraries and dependencies. In addition, the Server establishes a new bar in the area of serviceability with advanced logging and tracing functions.

Looking forward, our vision is to provide a full-service platform designed from the ground up, for deploying enterprise Java applications into a modern data center environment. There is still plenty of work to do but the team has made a great start and they have built some very interesting technology here. SpringSource is actually delivering on the vision that other commercial vendors such as BEA and [IBM have struggled to fulfill](http://www.devwebsphere.com/devwebsphere/2008/05/springsource-ap.html).

The feedback we have received from some of the [beta users](http://www.springframework.org/node/772) and a few [analysts](http://www.springsource.com/node/461) who have looked at the release is that we are on the right track. We encourage you to [download](http://www.springsource.com/download/dmserver) the dm Server and kick the tires on it yourself. And, of course, please give us feedback. The team is architecting the next release now so the timing is good for incorporating user feedback.

Thanks for your interest in the SpringSource dm Server!