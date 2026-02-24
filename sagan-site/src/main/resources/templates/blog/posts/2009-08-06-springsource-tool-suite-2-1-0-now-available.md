---
title: SpringSource Tool Suite 2.1.0 Now Available
source: https://spring.io/blog/2009/08/06/springsource-tool-suite-2-1-0-now-available
scraped: 2026-02-24T09:05:02.790Z
description: Level up your Java code and explore what Spring can do for you.
meta: Engineering | Christian Dupuis |  August 06, 2009 | 0 Comments
---

# SpringSource Tool Suite 2.1.0 Now Available

_Engineering | Christian Dupuis |  August 06, 2009 | 0 Comments_

I'm happy to announce that we just released the final version of SpringSource Tool Suite 2.1.0; the first GA version with major enhancements since making STS [freely available](http://blog.springsource.com/2009/05/07/springsource-tool-suite-now-free/).

The release comes with brand-new installers for all supported platforms and bundles latest versions of SpringSource [tc](http://www.springsource.com/products/tcserver) and [dm Server](http://www.springsource.com/products/dmserver) as well as [Spring Roo](http://www.springsource.org/roo). Additionally you can choose between distributions based on Eclipse 3.4 and the recently released 3.5 aka Eclipse Galileo.

Because we've seen lots of interest in the [new Groovy tools](http://blog.springsource.com/2009/07/30/a-groovier-eclipse-experience/) we also offer a bundled download of STS and the Groovy Eclipse Plugin.

## Features

The list of new features in STS is long and we already covered some of them in previous blog posts. Review the [New & Noteworthy](http://www.springsource.com/files/uploads/all/pdf_files/product/STS-new_and_noteworthy-2.1.0.RELEASE.pdf) for more details.

In summary here are the highlights:

-   Support for milestones of Spring 3.0 including XML editing and validation, support for @Configuration and @Bean annotations
-   Visual editing of Spring Batch configurations
-   Integration of Spring Roo for rapid application development
-   Deployment to single instances of tc or dm Server and to tc Server groups through SpringSource AMS
-   Deployment into virtualized environments like Amazon EC2 or VMware Lab Manager
-   Support for milestones of SpringSource dm Server 2.0, RFC66 web modules and SpringSource Bundlor integration
-   Overall performance improvements and reduced memory consumption
-   and a lot of smaller enhancements and bug fixes

## Future

The team has already started to work on the next release iteration. You can closely follow our progress in [JIRA](https://issuetracker.springsource.com/browse/STS). The major work items for upcoming STS versions include:

-   Complete Spring 3.0 support including tools for developing RESTful web applications
-   Support for Grails development including integrated shell, classpath and plugin management
-   Support for dm Server 2.0 including plan file deployment, hosted repository browsing and provisiong, dump inspection

If you think there is something missing or you'd like to see certain features in the above areas head over to the STS [JIRA](https://issuetracker.springsource.com/browse/STS) and file a new user story or defect. We are especially interested in your thoughts about first-class Grails tooling.

And finally here is the link to the [downloads](http://www.springsource.com/products/springsource-tool-suite-download). The download page also has instructions on how to install STS from an Eclipse update site.

**Update:** We released a service release for STS 2.1.0.RELEASE which is available from the download page. Users can also use the update manager to update to 2.1.0.SR01. Please update at your earliest convenience for the best possible usage experience.